/**
 * 《测测你的灵魂对应哪位中国历史人物》核心交互、评分引擎与海报导出模块
 * 纯前端零依赖运行，支持 file:// 直接打开，兼容手机与电脑端
 */

(function (global) {
  "use strict";

  const DATA = global.SOUL_TEST_DATA;
  if (!DATA) {
    throw new Error("未加载题库数据 data.js");
  }

  const { DIMENSIONS, ARCHETYPES, QUESTIONS, CHARACTERS } = DATA;
  const STORAGE_KEY = "historical_soul_test_state_v1";

  // ==================== 1. 评分与匹配引擎 ====================

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  /**
   * 解析计算每个维度的理论最小/最大分及随机答题均值与标准差
   * 用于消除题库权重细微差异带来的偏差，确保 7 大维度绝对公平
   */
  function computeDimensionStats() {
    const stats = {};
    DIMENSIONS.forEach((dim) => {
      let minSum = 0;
      let maxSum = 0;
      let meanSum = 0;
      let varSum = 0;

      QUESTIONS.forEach((q) => {
        const vals = q.options.map((opt) => (opt.scores && opt.scores[dim.key]) || 0);
        const qMin = Math.min(...vals);
        const qMax = Math.max(...vals);
        const qMean = vals.reduce((a, b) => a + b, 0) / vals.length;
        const qVar = vals.reduce((acc, v) => acc + Math.pow(v - qMean, 2), 0) / vals.length;

        minSum += qMin;
        maxSum += qMax;
        meanSum += qMean;
        varSum += qVar;
      });

      stats[dim.key] = {
        min: minSum,
        max: maxSum,
        mean: meanSum,
        std: Math.sqrt(varSum) || 1
      };
    });
    return stats;
  }

  const DIM_STATS = computeDimensionStats();

  function centerAndNormalize(vec) {
    const mean = vec.reduce((a, b) => a + b, 0) / vec.length;
    const centered = vec.map((v) => v - mean);
    const norm = Math.sqrt(centered.reduce((acc, v) => acc + v * v, 0));
    if (norm < 1e-8) {
      return centered.map(() => 0);
    }
    return centered.map((v) => v / norm);
  }

  /**
   * 根据用户的 40 题答案索引数组计算综合性格维度与匹配的历史人物
   * @param {number[]} answers 长度为 40 的选项索引数组 (0-3)
   */
  function evaluateQuiz(answers) {
    const rawScores = {};
    DIMENSIONS.forEach((d) => {
      rawScores[d.key] = 0;
    });

    QUESTIONS.forEach((q, idx) => {
      const optIdx = answers[idx];
      if (typeof optIdx === "number" && q.options[optIdx]) {
        const sc = q.options[optIdx].scores || {};
        Object.keys(sc).forEach((k) => {
          if (rawScores[k] !== undefined) {
            rawScores[k] += sc[k];
          }
        });
      }
    });

    // 计算标准化 Z-score 与 0-100 展示分
    const zScores = {};
    const displayScores = {};
    const zVector = [];
    const fallbackVector = [];

    DIMENSIONS.forEach((d) => {
      const st = DIM_STATS[d.key];
      const raw = rawScores[d.key];
      const z = (raw - st.mean) / st.std;
      zScores[d.key] = z;
      zVector.push(z);
      fallbackVector.push(st.max > st.min ? (raw - st.min) / (st.max - st.min) : 0.5);

      // 映射到视觉友好且忠实反映强弱的百分制（18 ~ 98）
      const pct = Math.round(clamp(56 + z * 16.5, 18, 98));
      displayScores[d.key] = pct;
    });

    let userNorm = centerAndNormalize(zVector);
    const isFlat = userNorm.every((v) => v === 0);
    if (isFlat) {
      userNorm = centerAndNormalize(fallbackVector);
    }

    // 与 14 位历史人物目标画像计算中心化余弦相似度（Pearson相关）
    const ranked = CHARACTERS.map((char) => {
      const charVec = DIMENSIONS.map((d) => char.profile[d.key] || 0);
      const charNorm = centerAndNormalize(charVec);
      let sim = 0;
      for (let i = 0; i < DIMENSIONS.length; i++) {
        sim += userNorm[i] * charNorm[i];
      }
      return {
        character: char,
        similarity: sim
      };
    }).sort((a, b) => b.similarity - a.similarity);

    const best = ranked[0];
    const runnerUp = ranked[1];

    // 将相似度映射为更具仪式感且单调递增的灵魂契合度（82% ~ 98%）
    const matchPercent = Math.round(clamp(81 + Math.max(0, best.similarity) * 17.5, 82, 98));

    // 按维度得分从高到低排序
    const sortedDimensions = DIMENSIONS.map((d) => ({
      ...d,
      raw: rawScores[d.key],
      z: zScores[d.key],
      score: displayScores[d.key]
    })).sort((a, b) => b.z - a.z);

    return {
      character: best.character,
      runnerUp: runnerUp.character,
      similarity: best.similarity,
      matchPercent,
      rawScores,
      zScores,
      displayScores,
      sortedDimensions,
      ranking: ranked
    };
  }

  // 暴露引擎供测试脚本直接验证
  global.SOUL_TEST_ENGINE = {
    evaluateQuiz,
    DIM_STATS
  };

  // 若在 Node 环境下仅做评分逻辑校验，直接退出 DOM 初始化
  if (typeof document === "undefined") {
    return;
  }

  // ==================== 2. DOM 引用与状态管理 ====================

  const screens = {
    home: document.getElementById("screen-home"),
    quiz: document.getElementById("screen-quiz"),
    loading: document.getElementById("screen-loading"),
    result: document.getElementById("screen-result")
  };

  const els = {
    btnStart: document.getElementById("btn-start"),
    btnResume: document.getElementById("btn-resume"),
    resumeQNum: document.getElementById("resume-q-num"),
    btnBackHome: document.getElementById("btn-back-home"),

    quizChapter: document.getElementById("quiz-chapter"),
    quizCounter: document.getElementById("quiz-counter"),
    progressBarRole: document.getElementById("progress-bar-role"),
    progressFill: document.getElementById("progress-fill"),
    progressPercent: document.getElementById("progress-percent"),
    progressHint: document.getElementById("progress-hint"),
    questionCard: document.getElementById("question-card"),
    qNumBadge: document.getElementById("q-num-badge"),
    questionText: document.getElementById("question-text"),
    optionsList: document.getElementById("options-list"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),
    btnNextLabel: document.getElementById("btn-next-label"),

    loadingStatus: document.getElementById("loading-status"),

    resultCard: document.getElementById("result-capture-card"),
    resMatchScore: document.getElementById("res-match-score"),
    resArchetype: document.getElementById("res-archetype"),
    resDynasty: document.getElementById("res-dynasty"),
    resName: document.getElementById("res-name"),
    resAlias: document.getElementById("res-alias"),
    resArchetypeTag: document.getElementById("res-archetype-tag"),
    resSeal: document.getElementById("res-seal"),
    resQuote: document.getElementById("res-quote"),
    resKeywords: document.getElementById("res-keywords"),
    radarSvg: document.getElementById("radar-svg"),
    dimensionBars: document.getElementById("dimension-bars"),
    resSummary: document.getElementById("res-summary"),
    resTraits: document.getElementById("res-traits"),
    resMatchReasons: document.getElementById("res-match-reasons"),
    resStrengths: document.getElementById("res-strengths"),
    resEasterEgg: document.getElementById("res-easter-egg"),

    btnPoster: document.getElementById("btn-poster"),
    btnCopy: document.getElementById("btn-copy"),
    btnGallery: document.getElementById("btn-gallery"),
    btnRetake: document.getElementById("btn-retake"),

    posterModal: document.getElementById("poster-modal"),
    posterPreviewImg: document.getElementById("poster-preview-img"),
    btnDownloadPoster: document.getElementById("btn-download-poster"),

    galleryModal: document.getElementById("gallery-modal"),
    galleryList: document.getElementById("gallery-list"),

    toast: document.getElementById("toast")
  };

  let state = {
    currentIndex: 0,
    answers: new Array(QUESTIONS.length).fill(null),
    isTransitioning: false,
    lastResult: null,
    posterDataUrl: null
  };

  let toastTimer = null;

  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toast.classList.remove("show");
    }, 2400);
  }

  function saveProgress() {
    try {
      const payload = {
        currentIndex: state.currentIndex,
        answers: state.answers
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      // 忽略无痕模式或隐私限制
    }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.answers) &&
        parsed.answers.length === QUESTIONS.length &&
        typeof parsed.currentIndex === "number"
      ) {
        const answeredCount = parsed.answers.filter((a) => typeof a === "number").length;
        if (answeredCount > 0 && answeredCount < QUESTIONS.length) {
          return parsed;
        }
      }
    } catch (_) {
      return null;
    }
    return null;
  }

  function clearProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  }

  function switchScreen(targetKey) {
    Object.keys(screens).forEach((key) => {
      screens[key].classList.toggle("screen-active", key === targetKey);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function refreshHomeResumeButton() {
    const saved = loadProgress();
    if (saved) {
      const nextUnanswered = saved.answers.findIndex((a) => a === null);
      const qDisplay = nextUnanswered >= 0 ? nextUnanswered + 1 : QUESTIONS.length;
      els.resumeQNum.textContent = String(qDisplay);
      els.btnResume.classList.remove("hidden");
    } else {
      els.btnResume.classList.add("hidden");
    }
  }

  // ==================== 3. 答题渲染与交互 ====================

  const CHAPTER_HINTS = {
    "卷一 · 日常起居": "从最放松的日常习惯里，看见真实的自己",
    "卷二 · 处事之道": "面对选择与风浪时的本能反应，最能照见风骨",
    "卷三 · 社交百态": "在人群与独处之间，藏着你的灵魂舒适区",
    "卷四 · 情绪潮汐": "情绪起伏的纹理，决定了你如何与世界相处",
    "卷五 · 志趣雅好": "你偏爱的风景与向往，正是灵魂深处的回响"
  };

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function renderQuestion(animate) {
    const q = QUESTIONS[state.currentIndex];
    const total = QUESTIONS.length;
    const currentNum = state.currentIndex + 1;
    const answeredCount = state.answers.filter((a) => typeof a === "number").length;
    const pct = Math.max(2, Math.round((currentNum / total) * 100));

    els.quizChapter.textContent = q.chapter;
    els.quizCounter.textContent = `${pad2(currentNum)} / ${total}`;
    els.progressFill.style.width = `${(currentNum / total) * 100}%`;
    els.progressBarRole.setAttribute("aria-valuenow", String(pct));
    els.progressPercent.textContent = `${Math.round((answeredCount / total) * 100)}% 已答`;
    els.progressHint.textContent = CHAPTER_HINTS[q.chapter] || "请凭第一直觉选择最贴近你的选项";

    els.qNumBadge.textContent = `第 ${pad2(currentNum)} 题`;
    els.questionText.textContent = q.text;

    const selectedIdx = state.answers[state.currentIndex];
    els.optionsList.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn" + (selectedIdx === idx ? " selected" : "");
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", selectedIdx === idx ? "true" : "false");

      const keySpan = document.createElement("span");
      keySpan.className = "option-key";
      keySpan.textContent = opt.label;

      const textSpan = document.createElement("span");
      textSpan.className = "option-text";
      textSpan.textContent = opt.text;

      btn.appendChild(keySpan);
      btn.appendChild(textSpan);
      btn.addEventListener("click", () => handleSelectOption(idx));
      els.optionsList.appendChild(btn);
    });

    els.btnPrev.disabled = state.currentIndex === 0;

    if (typeof selectedIdx === "number") {
      els.btnNext.classList.remove("hidden");
      els.btnNextLabel.textContent = state.currentIndex === total - 1 ? "生成结果" : "下一题";
    } else {
      els.btnNext.classList.add("hidden");
    }

    if (animate) {
      els.questionCard.classList.remove("switching-out", "switching-in");
      void els.questionCard.offsetWidth;
      els.questionCard.classList.add("switching-in");
    }
  }

  function handleSelectOption(optionIdx) {
    if (state.isTransitioning) return;

    state.answers[state.currentIndex] = optionIdx;
    saveProgress();

    // 立即更新选中视觉态
    const buttons = els.optionsList.querySelectorAll(".option-btn");
    buttons.forEach((btn, i) => {
      const active = i === optionIdx;
      btn.classList.toggle("selected", active);
      btn.setAttribute("aria-checked", active ? "true" : "false");
    });

    state.isTransitioning = true;
    const isLast = state.currentIndex === QUESTIONS.length - 1;

    setTimeout(() => {
      if (isLast) {
        state.isTransitioning = false;
        finishQuiz();
      } else {
        els.questionCard.classList.add("switching-out");
        setTimeout(() => {
          state.currentIndex += 1;
          saveProgress();
          renderQuestion(true);
          state.isTransitioning = false;
        }, 180);
      }
    }, 220);
  }

  function goPrevQuestion() {
    if (state.isTransitioning || state.currentIndex <= 0) return;
    state.currentIndex -= 1;
    renderQuestion(true);
  }

  function goNextQuestion() {
    if (state.isTransitioning) return;
    if (typeof state.answers[state.currentIndex] !== "number") return;
    if (state.currentIndex === QUESTIONS.length - 1) {
      finishQuiz();
    } else {
      state.currentIndex += 1;
      renderQuestion(true);
    }
  }

  function finishQuiz() {
    // 若有任何遗漏题目，定位到第一道未答题
    const missingIdx = state.answers.findIndex((a) => typeof a !== "number");
    if (missingIdx !== -1) {
      state.currentIndex = missingIdx;
      renderQuestion(true);
      showToast(`请先完成第 ${missingIdx + 1} 题`);
      return;
    }

    clearProgress();
    switchScreen("loading");

    const messages = [
      "正在综合 40 道生活切面，校准你的七维性格星图…",
      "正在比对谋士、帝王、文人、侠客、诗人、将领、隐士七大原型…",
      "千年共鸣已锁定，正在为你钤印专属灵魂档案…"
    ];

    let step = 0;
    els.loadingStatus.textContent = messages[0];

    const stepInterval = setInterval(() => {
      step += 1;
      if (step < messages.length) {
        els.loadingStatus.textContent = messages[step];
      }
    }, 420);

    setTimeout(() => {
      clearInterval(stepInterval);
      const result = evaluateQuiz(state.answers);
      state.lastResult = result;
      state.posterDataUrl = null;
      renderResult(result);
      switchScreen("result");
    }, 1250);
  }

  // ==================== 4. 结果页渲染与七维雷达图 ====================

  function createSvgEl(tag, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((k) => el.setAttribute(k, String(attrs[k])));
    return el;
  }

  function renderRadarChart(svgEl, displayScores, accentColor) {
    svgEl.innerHTML = "";
    const cx = 140;
    const cy = 132;
    const maxR = 86;
    const count = DIMENSIONS.length;
    const startAngle = -Math.PI / 2;

    const getPoint = (index, ratio) => {
      const angle = startAngle + (index * 2 * Math.PI) / count;
      return {
        x: cx + Math.cos(angle) * maxR * ratio,
        y: cy + Math.sin(angle) * maxR * ratio
      };
    };

    // 4层同心七边形网格
    [0.25, 0.5, 0.75, 1].forEach((level) => {
      const pts = DIMENSIONS.map((_, i) => {
        const p = getPoint(i, level);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      }).join(" ");
      svgEl.appendChild(
        createSvgEl("polygon", {
          points: pts,
          fill: level === 1 ? "rgba(180, 138, 70, 0.05)" : "none",
          stroke: "rgba(124, 102, 72, 0.25)",
          "stroke-width": level === 1 ? "1.2" : "0.9"
        })
      );
    });

    // 放射轴线
    DIMENSIONS.forEach((_, i) => {
      const p = getPoint(i, 1);
      svgEl.appendChild(
        createSvgEl("line", {
          x1: cx,
          y1: cy,
          x2: p.x.toFixed(1),
          y2: p.y.toFixed(1),
          stroke: "rgba(124, 102, 72, 0.22)",
          "stroke-width": "0.9"
        })
      );
    });

    // 用户数据多边形
    const dataPts = DIMENSIONS.map((d, i) => {
      const ratio = clamp((displayScores[d.key] || 50) / 100, 0.15, 1);
      return getPoint(i, ratio);
    });

    svgEl.appendChild(
      createSvgEl("polygon", {
        points: dataPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "),
        fill: accentColor,
        "fill-opacity": "0.22",
        stroke: accentColor,
        "stroke-width": "2.2",
        "stroke-linejoin": "round"
      })
    );

    // 顶点与文字标注
    DIMENSIONS.forEach((d, i) => {
      const pt = dataPts[i];
      svgEl.appendChild(
        createSvgEl("circle", {
          cx: pt.x.toFixed(1),
          cy: pt.y.toFixed(1),
          r: "3.6",
          fill: accentColor,
          stroke: "#fbf7ef",
          "stroke-width": "1.4"
        })
      );

      const labelPos = getPoint(i, 1.24);
      const text = createSvgEl("text", {
        x: labelPos.x.toFixed(1),
        y: (labelPos.y + 4).toFixed(1),
        "text-anchor": "middle",
        fill: "#3c352e",
        "font-size": "11.5",
        "font-weight": "600",
        "font-family": "'Noto Serif SC','Songti SC',serif"
      });
      text.textContent = d.shortName;
      svgEl.appendChild(text);
    });
  }

  function renderResult(result) {
    const { character, runnerUp, matchPercent, displayScores, sortedDimensions } = result;
    const accent = character.accentColor || "#a63429";

    document.documentElement.style.setProperty("--accent-dynamic", accent);

    els.resMatchScore.textContent = `${matchPercent}%`;
    els.resArchetype.textContent = character.archetype;
    els.resDynasty.textContent = character.dynasty;
    els.resName.textContent = character.name;
    els.resAlias.textContent = character.alias;
    els.resArchetypeTag.textContent = character.archetypeTag;
    els.resSeal.textContent = character.sealText;
    els.resQuote.textContent = character.signatureQuote;

    // 关键词标签
    els.resKeywords.innerHTML = "";
    character.keywords.forEach((kw) => {
      const span = document.createElement("span");
      span.className = "keyword-tag";
      span.textContent = `# ${kw}`;
      els.resKeywords.appendChild(span);
    });

    // 七维雷达图 & 右侧分数条
    renderRadarChart(els.radarSvg, displayScores, accent);

    els.dimensionBars.innerHTML = "";
    sortedDimensions.forEach((dim) => {
      const item = document.createElement("div");
      item.className = "dim-bar-item";
      item.innerHTML = `
        <div class="dim-bar-label">
          <span class="dim-bar-name">${dim.name}</span>
          <span class="dim-bar-val">${dim.score}</span>
        </div>
        <div class="dim-bar-track">
          <div class="dim-bar-fill" style="width:${dim.score}%"></div>
        </div>
      `;
      els.dimensionBars.appendChild(item);
    });

    // 性格特点
    els.resSummary.textContent = character.summary;
    els.resTraits.innerHTML = "";
    character.traits.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      els.resTraits.appendChild(li);
    });

    // 匹配理由（结合用户实测最高维度动态生成）
    const top1 = sortedDimensions[0];
    const top2 = sortedDimensions[1];
    const top3 = sortedDimensions[2];
    els.resMatchReasons.innerHTML = `
      <p>${character.matchReasonIntro}</p>
      <p>在 40 道生活情景作答中，你最突出的三大性格底色分别是 <strong>${top1.name}（${top1.score}分）</strong>、<strong>${top2.name}（${top2.score}分）</strong> 与 <strong>${top3.name}（${top3.score}分）</strong>——你在日常起居、处事判断与情绪回血中的自然倾向，与 <strong>${character.name}</strong> 的精神坐标高度重合（灵魂契合度 ${matchPercent}%）。</p>
      <p>此外，你的潜意识里还隐约带着一丝 <strong>${runnerUp.name}（${runnerUp.archetype}）</strong> 的第二灵魂回响，让你的性格更具层次感与反差魅力。</p>
    `;

    // 隐藏优势
    els.resStrengths.innerHTML = "";
    character.hiddenStrengths.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      els.resStrengths.appendChild(li);
    });

    // 趣味彩蛋
    const egg = character.easterEgg;
    const eggItems = [
      { label: "若活在当代的身份", value: egg.modernIdentity },
      { label: "TA 的微信朋友圈签名", value: `“${egg.wechatBio}”` },
      { label: "高频摸鱼与充电方式", value: egg.modernHobby },
      { label: "天选历史灵魂挚友", value: egg.soulmate },
      { label: "最容易互怼的灵魂冤家", value: egg.rival }
    ];

    els.resEasterEgg.innerHTML = "";
    eggItems.forEach((entry) => {
      const box = document.createElement("div");
      box.className = "easter-item";
      box.innerHTML = `
        <span class="easter-label">${entry.label}</span>
        <p class="easter-value">${entry.value}</p>
      `;
      els.resEasterEgg.appendChild(box);
    });
  }

  // ==================== 5. 纯前端高清小红书/朋友圈分享海报生成 ====================

  function wrapCanvasText(ctx, text, maxWidth) {
    const noLineStart = new Set(["，", "。", "！", "？", "、", "；", "：", "”", "’", "》", "）", "】", "…", ",", ".", "!", "?"]);
    const lines = [];
    let current = "";
    for (const ch of text) {
      const next = current + ch;
      if (ctx.measureText(next).width > maxWidth && current.length > 0) {
        if (noLineStart.has(ch)) {
          lines.push(current + ch);
          current = "";
        } else {
          lines.push(current);
          current = ch;
        }
      } else {
        current = next;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function generatePosterDataUrl(result) {
    const { character, runnerUp, matchPercent, displayScores, sortedDimensions } = result;
    const accent = character.accentColor || "#a63429";
    const W = 1080;
    const H = 1690;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const serif = "'Noto Serif SC', 'Songti SC', 'STSong', Georgia, serif";
    const sans = "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif";

    // 1. 宣纸底色与水墨晕染
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#f8f3e8");
    bgGrad.addColorStop(0.55, "#f2eadb");
    bgGrad.addColorStop(1, "#f7f1e5");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 顶部水墨光晕
    const radTop = ctx.createRadialGradient(W * 0.88, 180, 20, W * 0.88, 180, 420);
    radTop.addColorStop(0, "rgba(166, 52, 41, 0.12)");
    radTop.addColorStop(1, "rgba(166, 52, 41, 0)");
    ctx.fillStyle = radTop;
    ctx.fillRect(0, 0, W, H);

    const radBottom = ctx.createRadialGradient(W * 0.14, H - 220, 20, W * 0.14, H - 220, 440);
    radBottom.addColorStop(0, "rgba(50, 84, 81, 0.12)");
    radBottom.addColorStop(1, "rgba(50, 84, 81, 0)");
    ctx.fillStyle = radBottom;
    ctx.fillRect(0, 0, W, H);

    // 2. 古籍双层边框与四角回纹
    ctx.strokeStyle = "rgba(124, 102, 72, 0.45)";
    ctx.lineWidth = 2.5;
    drawRoundedRect(ctx, 42, 42, W - 84, H - 84, 24);
    ctx.stroke();

    ctx.strokeStyle = "rgba(180, 138, 70, 0.36)";
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, 56, 56, W - 112, H - 112, 18);
    ctx.stroke();

    // 四角金线角标
    const corners = [
      [74, 74, 1, 1],
      [W - 74, 74, -1, 1],
      [74, H - 74, 1, -1],
      [W - 74, H - 74, -1, -1]
    ];
    ctx.strokeStyle = "#b48a46";
    ctx.lineWidth = 3.5;
    corners.forEach(([x, y, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(x, y + dy * 28);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * 28, y);
      ctx.stroke();
    });

    // 3. 顶部栏
    ctx.fillStyle = "#8a7f71";
    ctx.font = `500 24px ${sans}`;
    ctx.fillText("灵魂鉴古 · 历史人格测试档案", 96, 126);

    // 契合度胶囊
    drawRoundedRect(ctx, W - 344, 92, 248, 50, 25);
    ctx.fillStyle = "rgba(166, 52, 41, 0.1)";
    ctx.fill();
    ctx.strokeStyle = "rgba(166, 52, 41, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#a63429";
    ctx.font = `600 24px ${sans}`;
    ctx.textAlign = "center";
    ctx.fillText(`灵魂契合度  ${matchPercent}%`, W - 220, 125);
    ctx.textAlign = "left";

    // 分隔线
    ctx.strokeStyle = "rgba(124, 102, 72, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(96, 166);
    ctx.lineTo(W - 96, 166);
    ctx.stroke();

    // 4. 人物标题与印章
    drawRoundedRect(ctx, 96, 202, 104, 42, 8);
    ctx.fillStyle = accent;
    ctx.fill();
    ctx.fillStyle = "#fcf8f2";
    ctx.font = `700 24px ${serif}`;
    ctx.textAlign = "center";
    ctx.fillText(character.archetype, 148, 232);
    ctx.textAlign = "left";

    ctx.fillStyle = "#585047";
    ctx.font = `500 24px ${sans}`;
    ctx.fillText(`${character.dynasty}  ·  ${character.archetypeTag}`, 218, 232);

    ctx.fillStyle = "#1f1b18";
    ctx.font = `900 94px ${serif}`;
    ctx.fillText(character.name, 94, 344);

    const nameWidth = ctx.measureText(character.name).width;
    ctx.fillStyle = "#b48a46";
    ctx.font = `600 32px ${serif}`;
    ctx.fillText(character.alias, 114 + nameWidth, 336);

    // 朱砂方印
    ctx.save();
    ctx.translate(W - 156, 282);
    ctx.rotate(-0.07);
    drawRoundedRect(ctx, -56, -56, 112, 112, 12);
    ctx.fillStyle = "#a63429";
    ctx.fill();
    drawRoundedRect(ctx, -48, -48, 96, 96, 8);
    ctx.strokeStyle = "rgba(251, 247, 239, 0.78)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = "#fbf7ef";
    ctx.font = `900 36px ${serif}`;
    ctx.textAlign = "center";
    const sealChars = Array.from(character.sealText);
    if (sealChars.length >= 2) {
      ctx.fillText(sealChars[0], 0, -10);
      ctx.fillText(sealChars[1], 0, 34);
    } else {
      ctx.fillText(character.sealText, 0, 12);
    }
    ctx.restore();
    ctx.textAlign = "left";

    // 5. 专属记忆点文案卡片
    const quoteLines = wrapCanvasText(ctx, `“${character.signatureQuote}”`, W - 270);
    const quoteBoxH = Math.max(116, 48 + quoteLines.length * 46);
    drawRoundedRect(ctx, 96, 392, W - 192, quoteBoxH, 16);
    ctx.fillStyle = "rgba(180, 138, 70, 0.13)";
    ctx.fill();

    ctx.fillStyle = "#a63429";
    ctx.fillRect(96, 392, 8, quoteBoxH);

    ctx.fillStyle = "#1f1b18";
    ctx.font = `700 30px ${serif}`;
    quoteLines.forEach((line, idx) => {
      ctx.fillText(line, 134, 444 + idx * 46);
    });

    // 关键词胶囊
    let yCursor = 392 + quoteBoxH + 28;
    let xTag = 96;
    ctx.font = `500 24px ${sans}`;
    character.keywords.forEach((kw) => {
      const label = `# ${kw}`;
      const tw = ctx.measureText(label).width + 38;
      drawRoundedRect(ctx, xTag, yCursor, tw, 44, 22);
      ctx.fillStyle = "rgba(180, 138, 70, 0.12)";
      ctx.fill();
      ctx.strokeStyle = "rgba(180, 138, 70, 0.42)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.fillText(label, xTag + 19, yCursor + 30);
      xTag += tw + 14;
    });

    // 6. 中部：左侧七维雷达图 + 右侧高光维度
    yCursor += 86;
    const radarCx = 290;
    const radarCy = yCursor + 178;
    const radarR = 132;
    const dimCount = DIMENSIONS.length;
    const startA = -Math.PI / 2;

    const rPoint = (idx, ratio) => {
      const a = startA + (idx * 2 * Math.PI) / dimCount;
      return {
        x: radarCx + Math.cos(a) * radarR * ratio,
        y: radarCy + Math.sin(a) * radarR * ratio
      };
    };

    [0.25, 0.5, 0.75, 1].forEach((lvl) => {
      ctx.beginPath();
      DIMENSIONS.forEach((_, i) => {
        const p = rPoint(i, lvl);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.strokeStyle = "rgba(124, 102, 72, 0.28)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    DIMENSIONS.forEach((_, i) => {
      const p = rPoint(i, 1);
      ctx.beginPath();
      ctx.moveTo(radarCx, radarCy);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = "rgba(124, 102, 72, 0.24)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // 多边形数据面
    ctx.beginPath();
    DIMENSIONS.forEach((d, i) => {
      const p = rPoint(i, clamp((displayScores[d.key] || 50) / 100, 0.16, 1));
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.24;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // 雷达标注
    ctx.fillStyle = "#3c352e";
    ctx.font = `600 22px ${serif}`;
    ctx.textAlign = "center";
    DIMENSIONS.forEach((d, i) => {
      const p = rPoint(i, 1.25);
      ctx.fillText(d.shortName, p.x, p.y + 8);
    });
    ctx.textAlign = "left";

    // 右侧维度得分条
    const barX = 528;
    const barW = 456;
    ctx.fillStyle = "#1f1b18";
    ctx.font = `700 28px ${serif}`;
    ctx.fillText("七维灵魂星图", barX, yCursor + 24);

    sortedDimensions.forEach((dim, idx) => {
      const by = yCursor + 64 + idx * 42;
      ctx.fillStyle = "#3c352e";
      ctx.font = `600 21px ${sans}`;
      ctx.fillText(dim.name, barX, by);

      ctx.fillStyle = "#a63429";
      ctx.font = `700 22px ${serif}`;
      ctx.textAlign = "right";
      ctx.fillText(`${dim.score}`, barX + barW, by);
      ctx.textAlign = "left";

      drawRoundedRect(ctx, barX, by + 10, barW, 10, 5);
      ctx.fillStyle = "rgba(124, 102, 72, 0.18)";
      ctx.fill();

      drawRoundedRect(ctx, barX, by + 10, (barW * dim.score) / 100, 10, 5);
      ctx.fillStyle = accent;
      ctx.fill();
    });

    // 7. 灵魂画像摘要 + 隐藏优势
    yCursor += 390;
    ctx.strokeStyle = "rgba(124, 102, 72, 0.25)";
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(96, yCursor);
    ctx.lineTo(W - 96, yCursor);
    ctx.stroke();
    ctx.setLineDash([]);

    yCursor += 44;
    ctx.fillStyle = "#1f1b18";
    ctx.font = `700 28px ${serif}`;
    ctx.fillText("灵魂画像与隐藏优势", 96, yCursor);

    yCursor += 40;
    ctx.fillStyle = "#474038";
    ctx.font = `400 24px ${sans}`;
    const summaryLines = wrapCanvasText(ctx, character.summary, W - 192).slice(0, 4);
    summaryLines.forEach((line) => {
      ctx.fillText(line, 96, yCursor);
      yCursor += 38;
    });

    yCursor += 14;
    ctx.fillStyle = "#a63429";
    ctx.font = `600 24px ${sans}`;
    const strengthLines = wrapCanvasText(ctx, `★ ${character.hiddenStrengths[0]}`, W - 192).slice(0, 2);
    strengthLines.forEach((line) => {
      ctx.fillText(line, 96, yCursor);
      yCursor += 36;
    });

    // 8. 当代彩蛋卡片
    yCursor += 20;
    const eggH = 196;
    drawRoundedRect(ctx, 96, yCursor, W - 192, eggH, 16);
    ctx.fillStyle = "#f4ecdc";
    ctx.fill();
    ctx.strokeStyle = "rgba(124, 102, 72, 0.26)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#a63429";
    ctx.font = `700 24px ${serif}`;
    ctx.fillText("趣味彩蛋 · 若活在当代", 126, yCursor + 42);

    ctx.fillStyle = "#2b2622";
    ctx.font = `500 22px ${sans}`;
    const bioLine = wrapCanvasText(ctx, `朋友圈签名：“${character.easterEgg.wechatBio}”`, W - 252)[0];
    const mateLine = wrapCanvasText(ctx, `灵魂挚友：${character.easterEgg.soulmate}`, W - 252)[0];
    const secondLine = `第二灵魂回响：${runnerUp.name}（${runnerUp.archetype}）`;

    ctx.fillText(bioLine, 126, yCursor + 86);
    ctx.fillText(mateLine, 126, yCursor + 126);
    ctx.fillStyle = "#6c6257";
    ctx.fillText(secondLine, 126, yCursor + 164);

    // 9. 底部注脚与右下角 songfeng 水印
    ctx.fillStyle = "#8a7f71";
    ctx.font = `500 21px ${sans}`;
    ctx.fillText("《测测你的灵魂对应哪位中国历史人物》", 96, H - 88);
    ctx.textAlign = "right";
    ctx.fillText("趣味文化人格测试  ·  by songfeng", W - 96, H - 88);
    ctx.textAlign = "left";

    return canvas.toDataURL("image/png");
  }

  // ==================== 6. 14位灵魂图鉴渲染 ====================

  function renderGalleryModal() {
    const currentId = state.lastResult ? state.lastResult.character.id : null;
    els.galleryList.innerHTML = "";

    ARCHETYPES.forEach((arch) => {
      const group = document.createElement("div");
      group.className = "gallery-group";

      const title = document.createElement("h4");
      title.className = "gallery-group-title";
      title.innerHTML = `${arch.name} <small>${arch.subtitle}</small>`;
      group.appendChild(title);

      const cardsWrap = document.createElement("div");
      cardsWrap.className = "gallery-cards";

      CHARACTERS.filter((c) => c.archetype === arch.name).forEach((char) => {
        const card = document.createElement("div");
        card.className = "gallery-card" + (char.id === currentId ? " is-current" : "");
        card.innerHTML = `
          <div class="gallery-card-head">
            <span class="gallery-card-name">${char.name}</span>
            <span class="gallery-card-tag">${char.id === currentId ? "★ 你的结果" : char.dynasty}</span>
          </div>
          <div class="gallery-card-tag">${char.archetypeTag}</div>
          <p class="gallery-card-quote">“${char.signatureQuote}”</p>
        `;
        cardsWrap.appendChild(card);
      });

      group.appendChild(cardsWrap);
      els.galleryList.appendChild(group);
    });
  }

  // ==================== 7. 复制文案与弹窗控制 ====================

  async function copyResultText() {
    if (!state.lastResult) return;
    const { character, matchPercent, sortedDimensions } = state.lastResult;
    const topDims = sortedDimensions.slice(0, 3).map((d) => `${d.name}${d.score}`).join(" / ");
    const shareText = [
      `我在《测测你的灵魂对应哪位中国历史人物》中测出了：【${character.archetype} · ${character.name}】（灵魂契合度 ${matchPercent}%）！`,
      `专属文案：“${character.signatureQuote}”`,
      `核心性格星图：${topDims}`,
      `当代彩蛋签名：“${character.easterEgg.wechatBio}”`,
      `#中国历史人物人格测试 #国风人格测试 #灵魂鉴古`
    ].join("\n");

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        showToast("已复制专属文案，快去分享吧！");
        return;
      }
    } catch (_) {}

    // 兼容 file:// 或旧浏览器剪贴板回退
    const ta = document.createElement("textarea");
    ta.value = shareText;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("已复制专属文案，快去分享吧！");
    } catch (_) {
      showToast("复制失败，请手动截图或复制页面文字");
    }
    document.body.removeChild(ta);
  }

  function openModal(modalEl) {
    modalEl.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalEl) {
    modalEl.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // ==================== 8. 事件绑定与初始化 ====================

  function startNewQuiz() {
    state.currentIndex = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    state.isTransitioning = false;
    state.lastResult = null;
    state.posterDataUrl = null;
    clearProgress();
    switchScreen("quiz");
    renderQuestion(true);
  }

  function resumeSavedQuiz() {
    const saved = loadProgress();
    if (!saved) {
      startNewQuiz();
      return;
    }
    state.answers = saved.answers;
    const firstNull = saved.answers.findIndex((a) => a === null);
    state.currentIndex = firstNull >= 0 ? firstNull : saved.currentIndex;
    state.isTransitioning = false;
    switchScreen("quiz");
    renderQuestion(true);
  }

  els.btnStart.addEventListener("click", startNewQuiz);
  els.btnResume.addEventListener("click", resumeSavedQuiz);

  els.btnBackHome.addEventListener("click", () => {
    saveProgress();
    refreshHomeResumeButton();
    switchScreen("home");
  });

  els.btnPrev.addEventListener("click", goPrevQuestion);
  els.btnNext.addEventListener("click", goNextQuestion);

  els.btnPoster.addEventListener("click", () => {
    if (!state.lastResult) return;
    try {
      if (!state.posterDataUrl) {
        state.posterDataUrl = generatePosterDataUrl(state.lastResult);
      }
      els.posterPreviewImg.src = state.posterDataUrl;
      openModal(els.posterModal);
    } catch (err) {
      console.error(err);
      showToast("海报生成遇到异常，可直接截图保存上方卡片");
    }
  });

  els.btnDownloadPoster.addEventListener("click", () => {
    if (!state.posterDataUrl || !state.lastResult) return;
    const a = document.createElement("a");
    a.href = state.posterDataUrl;
    a.download = `我的历史灵魂-${state.lastResult.character.name}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("高清分享海报已开始下载！");
  });

  els.btnCopy.addEventListener("click", copyResultText);

  els.btnGallery.addEventListener("click", () => {
    renderGalleryModal();
    openModal(els.galleryModal);
  });

  els.btnRetake.addEventListener("click", startNewQuiz);

  // 关闭弹窗监听
  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-close-modal");
      const modal = document.getElementById(id);
      if (modal) closeModal(modal);
    });
  });

  [els.posterModal, els.galleryModal].forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // 键盘快捷键支持
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!els.posterModal.classList.contains("hidden")) closeModal(els.posterModal);
      if (!els.galleryModal.classList.contains("hidden")) closeModal(els.galleryModal);
      return;
    }

    if (!screens.quiz.classList.contains("screen-active")) return;

    const key = e.key.toUpperCase();
    const map = { A: 0, B: 1, C: 2, D: 3, "1": 0, "2": 1, "3": 2, "4": 3 };
    if (map[key] !== undefined) {
      e.preventDefault();
      handleSelectOption(map[key]);
    } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
      e.preventDefault();
      goPrevQuestion();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNextQuestion();
    }
  });

  // 初始化首页恢复按钮状态
  refreshHomeResumeButton();
})(window);
