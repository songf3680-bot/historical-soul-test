/**
 * 《测测你的灵魂对应哪位中国历史人物》核心题库与人物图谱数据
 * 7大性格维度 × 40道生活情景题 × 14位历史灵魂（覆盖谋士、帝王、文人、侠客、诗人、将领、隐士七大原型）
 */

window.SOUL_TEST_DATA = (function () {
  const DIMENSIONS = [
    {
      key: "strategy",
      name: "谋略度",
      shortName: "谋略",
      desc: "洞察局势、推演因果与长远布局的能力"
    },
    {
      key: "leadership",
      name: "格局力",
      shortName: "格局",
      desc: "统筹全局、凝聚人心与承担大局的气度"
    },
    {
      key: "literature",
      name: "雅致心",
      shortName: "雅致",
      desc: "品味生活、通达自洽与细腻审美的底色"
    },
    {
      key: "chivalry",
      name: "侠义气",
      shortName: "侠义",
      desc: "重情守诺、嫉恶如仇与快意敢为的风骨"
    },
    {
      key: "romance",
      name: "诗意感",
      shortName: "诗意",
      desc: "丰沛共情、天马行空与捕捉微光的浪漫"
    },
    {
      key: "valor",
      name: "决断力",
      shortName: "决断",
      desc: "迎难而上、干脆利落与破局开路的魄力"
    },
    {
      key: "solitude",
      name: "松弛感",
      shortName: "松弛",
      desc: "不随流俗、享受独处与守住本心的自在"
    }
  ];

  const ARCHETYPES = [
    { name: "谋士", subtitle: "运筹帷幄 · 洞察幽微" },
    { name: "帝王", subtitle: "气吞万里 · 执棋定局" },
    { name: "文人", subtitle: "清风入怀 · 烟火自洽" },
    { name: "侠客", subtitle: "一诺千金 · 快意恩仇" },
    { name: "诗人", subtitle: "揽月入梦 · 浪漫不羁" },
    { name: "将领", subtitle: "披荆斩棘 · 锐不可当" },
    { name: "隐士", subtitle: "山林清欢 · 绝不内耗" }
  ];

  // 40道生活化单选题，分为5个篇章（每篇8题）
  const QUESTIONS = [
    // ==================== 卷一 · 日常起居（日常习惯 Q1-Q8） ====================
    {
      id: 1,
      chapter: "卷一 · 日常起居",
      text: "周末难得没有任何安排，一觉醒来阳光刚好，你最想怎么度过这一天？",
      options: [
        { label: "A", text: "把下周要办的事和备忘录先理顺，心里踏实了再慢慢享受午后", scores: { strategy: 3, leadership: 1 } },
        { label: "B", text: "不看手机也不赶时间，泡杯热茶发呆、晒太阳，顺其自然过完一天", scores: { solitude: 3, literature: 1 } },
        { label: "C", text: "临时起意去没去过的老街、展馆或山顶，顺着当下的心情走走停停", scores: { romance: 3, solitude: 1 } },
        { label: "D", text: "约上铁哥们或闺蜜吃顿硬菜、打场球，或者来一场说走就走的短途自驾", scores: { chivalry: 2, valor: 2 } }
      ]
    },
    {
      id: 2,
      chapter: "卷一 · 日常起居",
      text: "观察一下你平时最常待的书桌或房间角落，它通常呈现什么状态？",
      options: [
        { label: "A", text: "分区明确、顺手高效，常用物件都在固定位置，绝不耽误找东西", scores: { strategy: 2, leadership: 2 } },
        { label: "B", text: "带着生活气息的雅致感，可能有香薰、绿植、几本翻了一半的好书", scores: { literature: 3, solitude: 1 } },
        { label: "C", text: "有点随性甚至略显凌乱，但堆满了我喜欢的周边、手账或灵感碎片", scores: { romance: 3, chivalry: 1 } },
        { label: "D", text: "极简干练，不需要的东西果断断舍离，只留下真正能派上用场的", scores: { valor: 3, solitude: 1 } }
      ]
    },
    {
      id: 3,
      chapter: "卷一 · 日常起居",
      text: "平时点外卖或者去餐厅吃饭，你翻看菜单时的习惯更像哪种人？",
      options: [
        { label: "A", text: "先看评分、分量和搭配，选出一顿性价比和口味最稳妥的组合", scores: { strategy: 3, literature: 1 } },
        { label: "B", text: "只要一起吃的人开心就行，顺便照顾大家的忌口，迅速拍板定菜", scores: { leadership: 3, chivalry: 1 } },
        { label: "C", text: "偏爱那些名字好听、有季节限定或老板独门手艺的小众菜品", scores: { literature: 2, romance: 2 } },
        { label: "D", text: "三秒钟决定，想吃哪口直接下单，绝不在“吃什么”上浪费生命", scores: { valor: 3, chivalry: 1 } }
      ]
    },
    {
      id: 4,
      chapter: "卷一 · 日常起居",
      text: "出门旅行收拾行李箱时，你的真实写照是？",
      options: [
        { label: "A", text: "提前列好清单，连创可贴、备用充电线和雨伞都准备得滴水不漏", scores: { strategy: 3, valor: 1 } },
        { label: "B", text: "只带最精简的衣物和证件，轻装上阵，缺什么当地买就是了", scores: { chivalry: 2, solitude: 2 } },
        { label: "C", text: "衣服可能没带几件，但相机、好看的配饰或想读的书一定要塞进去", scores: { romance: 3, literature: 1 } },
        { label: "D", text: "出发前一晚半小时高效打包完毕，顺便确认好全程交通和酒店衔接", scores: { leadership: 2, valor: 2 } }
      ]
    },
    {
      id: 5,
      chapter: "卷一 · 日常起居",
      text: "如果手机突然没电又忘了带充电宝，接下来两小时都在地铁或咖啡馆，你会？",
      options: [
        { label: "A", text: "正好趁机在脑海里复盘最近的工作或生活，理清几个待解的问题", scores: { strategy: 3, solitude: 1 } },
        { label: "B", text: "观察窗外流动的风景和形形色色的路人，脑补出好几个小故事", scores: { romance: 3, literature: 1 } },
        { label: "C", text: "瞬间觉得世界清静了，反而很享受这种彻底“失联”的自由感", scores: { solitude: 3, chivalry: 1 } },
        { label: "D", text: "果断先找附近商铺借个充电宝，万一有急事找我可不能掉链子", scores: { leadership: 2, valor: 2 } }
      ]
    },
    {
      id: 6,
      chapter: "卷一 · 日常起居",
      text: "关于每天的作息和日程安排，你内心最舒服的状态是？",
      options: [
        { label: "A", text: "自己掌控节奏，重要事项排在精力最好的时段，井井有条", scores: { leadership: 3, strategy: 1 } },
        { label: "B", text: "早睡早起或随季微调，三餐规律，把日子过出细水长流的熨帖感", scores: { literature: 3, solitude: 1 } },
        { label: "C", text: "容易在深夜灵感爆棚，兴致来了能熬到凌晨，累了就痛快补觉", scores: { romance: 3, chivalry: 1 } },
        { label: "D", text: "该冲刺时雷厉风行、效率拉满，搞定任务后就彻底撒手放飞", scores: { valor: 3, strategy: 1 } }
      ]
    },
    {
      id: 7,
      chapter: "卷一 · 日常起居",
      text: "买一件价格不菲、但你很心动的物品（比如大衣、耳机或家具）时，你会怎么决定？",
      options: [
        { label: "A", text: "横评参数、口碑和保值率，确定它物超所值再出手", scores: { strategy: 3, literature: 1 } },
        { label: "B", text: "看它能不能长久提升生活品质，耐看、有质感、经得起时间推敲就值", scores: { literature: 3, solitude: 1 } },
        { label: "C", text: "第一眼击中灵魂就买！千金难买我喜欢，错过了会念念不忘", scores: { romance: 2, chivalry: 2 } },
        { label: "D", text: "评估一下预算和实用场景，够用且能帮我省时间，当场拿下", scores: { valor: 2, leadership: 2 } }
      ]
    },
    {
      id: 8,
      chapter: "卷一 · 日常起居",
      text: "清晨醒来发现外面突然下起了瓢泼大雨，而你本来要出门办事，第一反应是？",
      options: [
        { label: "A", text: "立刻查路况和备选路线，预留提前量，确保不会被堵在半路", scores: { strategy: 3, leadership: 1 } },
        { label: "B", text: "套上防水外套踩着雨点直接出发，这点天气拦不住我的行程", scores: { valor: 3, chivalry: 1 } },
        { label: "C", text: "先在窗边听两分钟雨声，觉得雨天其实别有一番清冷诗意", scores: { romance: 2, literature: 2 } },
        { label: "D", text: "顺势看看能不能改成线上办，如果能赖在屋里煮茶听雨就太棒了", scores: { solitude: 3, strategy: 1 } }
      ]
    },

    // ==================== 卷二 · 处事之道（处事方式 Q9-Q16） ====================
    {
      id: 9,
      chapter: "卷二 · 处事之道",
      text: "团队接了一个时间紧、要求高的棘手项目，大家面面相觑时，你通常会怎么做？",
      options: [
        { label: "A", text: "主动站出来拆解目标、分配角色，先把大方向和节奏稳住", scores: { leadership: 3, valor: 1 } },
        { label: "B", text: "迅速分析核心卡点和隐藏风险，给出一套最省力又稳妥的破局方案", scores: { strategy: 3, leadership: 1 } },
        { label: "C", text: "二话不说直接认领最硬核的那块骨头，用行动带大家冲出僵局", scores: { valor: 3, chivalry: 1 } },
        { label: "D", text: "先帮大家缓解焦虑，把自己的部分做到极致，绝不拖任何人的后腿", scores: { literature: 2, solitude: 2 } }
      ]
    },
    {
      id: 10,
      chapter: "卷二 · 处事之道",
      text: "面对一个规则繁琐、明显拖慢效率的旧流程，你的内心态度是？",
      options: [
        { label: "A", text: "先摸清规则背后的利益关系，再找巧办法绕开阻力、推动改良", scores: { strategy: 3, literature: 1 } },
        { label: "B", text: "不合理就该改！如果我有话语权，直接立新规，干脆利落推翻重来", scores: { leadership: 3, valor: 1 } },
        { label: "C", text: "最烦形式主义，如果没人敢提，我不介意当那个直接戳破窗户纸的人", scores: { chivalry: 3, valor: 1 } },
        { label: "D", text: "尽量不跟愚蠢的规则硬耗精力，能远离这套系统就远离，图个清净", scores: { solitude: 3, romance: 1 } }
      ]
    },
    {
      id: 11,
      chapter: "卷二 · 处事之道",
      text: "做人生重大选择（比如换城市、转行或拒绝一份高薪但不喜欢的工作）时，你最看重什么？",
      options: [
        { label: "A", text: "未来三到五年的势能和上限，选一条能让我施展抱负的大路", scores: { leadership: 3, strategy: 1 } },
        { label: "B", text: "是否忠于内心、活得舒展体面，绝不为了迎合别人委屈自己", scores: { solitude: 3, chivalry: 1 } },
        { label: "C", text: "能不能点燃我的热情和想象力，人生就一次，我想选有故事感的路", scores: { romance: 3, valor: 1 } },
        { label: "D", text: "进退有据，既有底线兜底，也能在不断精进中找到长久的踏实感", scores: { literature: 2, strategy: 2 } }
      ]
    },
    {
      id: 12,
      chapter: "卷二 · 处事之道",
      text: "当你答应帮别人办一件事，结果中途发现难度比预想大得多，你会？",
      options: [
        { label: "A", text: "既然开了口就绝不食言，哪怕通宵达旦、贴钱贴力也要扛到底", scores: { chivalry: 3, valor: 1 } },
        { label: "B", text: "立刻重新盘点资源和人脉，想方设法找更聪明的路径把事办成", scores: { strategy: 3, leadership: 1 } },
        { label: "C", text: "坦诚告知对方当前难点，一起商量调整预期，既负责又不盲目硬撑", scores: { literature: 2, leadership: 2 } },
        { label: "D", text: "咬牙啃下最难的部分，以后接事之前会更冷静地评估边界", scores: { valor: 2, solitude: 2 } }
      ]
    },
    {
      id: 13,
      chapter: "卷二 · 处事之道",
      text: "开会讨论方案时，大家的意见明显分成两派吵得不可开交，你更倾向于？",
      options: [
        { label: "A", text: "听完两边核心论据后，提炼出折中但更优的第三方案，一锤定音", scores: { leadership: 3, strategy: 1 } },
        { label: "B", text: "等吵得差不多了，用一句直击要害的话点出双方都忽略的盲区", scores: { strategy: 3, solitude: 1 } },
        { label: "C", text: "明确站队我认为对的那一方，观点鲜明，不搞和稀泥", scores: { valor: 2, chivalry: 2 } },
        { label: "D", text: "用一点恰到好处的幽默化解火药味，让大家先冷静下来再谈正事", scores: { literature: 3, romance: 1 } }
      ]
    },
    {
      id: 14,
      chapter: "卷二 · 处事之道",
      text: "如果一件事情你已经倾尽全力，最后结果依然不尽如人意，你会怎么复盘？",
      options: [
        { label: "A", text: "冷静拆解每一步变量，记下教训，确保下次遇到同类局稳赢", scores: { strategy: 3, valor: 1 } },
        { label: "B", text: "拍拍灰尘往前看，成败乃兵家常事，大不了重头再来一次", scores: { valor: 3, leadership: 1 } },
        { label: "C", text: "自嘲一笑，觉得过程已经足够尽兴，得失随缘，顺手写段感悟翻篇", scores: { literature: 3, solitude: 1 } },
        { label: "D", text: "可能会难过一阵子，但只要无愧于心、没辜负信任我的人就够了", scores: { chivalry: 2, romance: 2 } }
      ]
    },
    {
      id: 15,
      chapter: "卷二 · 处事之道",
      text: "遇到一个从未接触过的新领域任务，你的学习与上手方式通常是？",
      options: [
        { label: "A", text: "先搭整体知识框架，搞清楚底层逻辑，再逐个击破细节", scores: { strategy: 2, literature: 2 } },
        { label: "B", text: "边干边学！先上手跑通第一个版本，在实战碰撞中飞速成长", scores: { valor: 3, leadership: 1 } },
        { label: "C", text: "找这个领域最顶尖的人请教或观察，站在高手肩膀上看清门道", scores: { leadership: 2, chivalry: 2 } },
        { label: "D", text: "先凭直觉和兴趣去探索最迷人的切入点，有了感觉自然学得飞快", scores: { romance: 3, solitude: 1 } }
      ]
    },
    {
      id: 16,
      chapter: "卷二 · 处事之道",
      text: "你身边有人正在用明显不公平的手段欺负弱小或抢功劳，你会如何处理？",
      options: [
        { label: "A", text: "忍不了一点！直接当场硬刚，帮对方把公道讨回来", scores: { chivalry: 3, valor: 1 } },
        { label: "B", text: "不动声色留存证据，选最致命的时机精准反击，让对方彻底长记性", scores: { strategy: 3, leadership: 1 } },
        { label: "C", text: "若在我管辖范围内，立刻立规矩纠偏，绝不纵容歪风邪气", scores: { leadership: 3, chivalry: 1 } },
        { label: "D", text: "用机智犀利的言辞让对方下不来台，既护住了人又保住了体面", scores: { literature: 3, strategy: 1 } }
      ]
    },

    // ==================== 卷三 · 社交百态（社交模式 Q17-Q24） ====================
    {
      id: 17,
      chapter: "卷三 · 社交百态",
      text: "被拉进一场大多数人都不太熟的聚会饭局，你通常会处于什么位置？",
      options: [
        { label: "A", text: "很快能和几个人聊出火花，顺便照顾被冷落的角落，让全场都舒服", scores: { leadership: 3, literature: 1 } },
        { label: "B", text: "坐在视野不错的位子安静观察，三言两语就能看出谁才是真正的关键人物", scores: { strategy: 3, solitude: 1 } },
        { label: "C", text: "只找一两个气场相投的人深聊，聊投机了甚至能相见恨晚", scores: { chivalry: 2, romance: 2 } },
        { label: "D", text: "礼貌露个面、喝完这杯就找借口撤退，回家独处比无效社交香多了", scores: { solitude: 3, valor: 1 } }
      ]
    },
    {
      id: 18,
      chapter: "卷三 · 社交百态",
      text: "你在朋友圈或社交平台发动态的频率和风格，最接近以下哪一种？",
      options: [
        { label: "A", text: "分享生活里的细碎美好：一顿好饭、晚霞、书摘或一段俏皮的感悟", scores: { literature: 3, romance: 1 } },
        { label: "B", text: "很少发，发也多半是阶段性里程碑、干货思考或值得纪念的大事", scores: { leadership: 2, strategy: 2 } },
        { label: "C", text: "看心情暴走式更新：突然被某句歌词、某片夜空击中就发一条，过两天又想锁掉", scores: { romance: 3, solitude: 1 } },
        { label: "D", text: "基本是“朋友圈隐身人”，有事直接私聊，懒得向全世界汇报行踪", scores: { solitude: 3, valor: 1 } }
      ]
    },
    {
      id: 19,
      chapter: "卷三 · 社交百态",
      text: "好朋友深夜突然给你发长消息倾诉感情或职场烦心事，你的第一反应是？",
      options: [
        { label: "A", text: "一边帮TA把利弊局势捋得明明白白，一边给出切实可行的下一步建议", scores: { strategy: 3, leadership: 1 } },
        { label: "B", text: "先全情共情，陪TA骂完委屈，告诉TA“不管怎么选我都站你这边”", scores: { chivalry: 3, romance: 1 } },
        { label: "C", text: "温柔安抚之余，用豁达通透的话帮TA换个视角，不知不觉把心结解开", scores: { literature: 3, solitude: 1 } },
        { label: "D", text: "“别想太多，出来吃宵夜/直接打语音！”用行动把TA从情绪漩涡里拉出来", scores: { valor: 2, chivalry: 2 } }
      ]
    },
    {
      id: 20,
      chapter: "卷三 · 社交百态",
      text: "你交朋友最看重对方身上哪一种特质？",
      options: [
        { label: "A", text: "真诚仗义，关键时刻不掉链子、不在背后捅刀子", scores: { chivalry: 3, valor: 1 } },
        { label: "B", text: "聪明通透、能同频对话，很多话不用说透彼此就能秒懂", scores: { strategy: 2, literature: 2 } },
        { label: "C", text: "有灵气、有趣味，能一起聊奇思妙想，也能一起欣赏无用之美", scores: { romance: 3, literature: 1 } },
        { label: "D", text: "有分寸感、各自独立，半年不联系再见面依然自在无压力", scores: { solitude: 3, leadership: 1 } }
      ]
    },
    {
      id: 21,
      chapter: "卷三 · 社交百态",
      text: "如果发现一个曾经很要好的朋友，如今三观渐行渐远甚至有些功利，你会？",
      options: [
        { label: "A", text: "不撕破脸也不再交心，保持礼貌距离，把这段缘分体面留在过去", scores: { literature: 2, strategy: 2 } },
        { label: "B", text: "干脆利落退出对方的世界，道不同不相为谋，绝不勉强维持表面客套", scores: { solitude: 2, chivalry: 2 } },
        { label: "C", text: "心里会替这段情谊惋惜很久，但也不会强求对方变回从前的样子", scores: { romance: 3, solitude: 1 } },
        { label: "D", text: "各自走好各自的路，如果以后在正事上有交集，依然可以公事公办", scores: { leadership: 3, valor: 1 } }
      ]
    },
    {
      id: 22,
      chapter: "卷三 · 社交百态",
      text: "在亲密关系或核心好友眼里，大家最常用来夸（或吐槽）你的一个词是？",
      options: [
        { label: "A", text: "“军师/定海神针”——遇事问你总能得到靠谱答案，就是操心太多", scores: { strategy: 3, leadership: 1 } },
        { label: "B", text: "“人间清醒/气氛担当”——跟你待在一起特别松弛，总能被你逗笑或治愈", scores: { literature: 3, solitude: 1 } },
        { label: "C", text: "“热血笨蛋/护短狂魔”——嘴硬心软，对认可的人好得掏心掏肺", scores: { chivalry: 3, valor: 1 } },
        { label: "D", text: "“浪漫怪才/自由灵魂”——脑洞大、审美绝，有时候像抓不住的一阵风", scores: { romance: 3, solitude: 1 } }
      ]
    },
    {
      id: 23,
      chapter: "卷三 · 社交百态",
      text: "当你在众人面前被公开夸奖或推到聚光灯下时，你的真实感受是？",
      options: [
        { label: "A", text: "坦然接住这份认可，顺手把功劳也分给并肩作战的伙伴们", scores: { leadership: 3, chivalry: 1 } },
        { label: "B", text: "面上淡定谦逊，心里已经在想下一步怎么把优势稳住或趁机退居幕后", scores: { strategy: 3, solitude: 1 } },
        { label: "C", text: "开心得藏不住，甚至想顺势即兴发挥两句，享受高光时刻的酣畅", scores: { romance: 2, valor: 2 } },
        { label: "D", text: "略微脚趾抠地，更喜欢作品或结果自己说话，夸完赶紧让我坐回角落", scores: { solitude: 3, literature: 1 } }
      ]
    },
    {
      id: 24,
      chapter: "卷三 · 社交百态",
      text: "有人阴阳怪气地暗讽你一句，周围还有几个同事或熟人在场，你会？",
      options: [
        { label: "A", text: "微笑着用更高级的幽默四两拨千斤地顶回去，让对方有苦说不出", scores: { literature: 3, strategy: 1 } },
        { label: "B", text: "直接看着对方眼睛反问：“你这话具体是指什么？”把尴尬原样还回去", scores: { valor: 3, chivalry: 1 } },
        { label: "C", text: "云淡风轻带过，懒得在嘴上争一时输赢，回头用实力碾压更有意思", scores: { leadership: 3, strategy: 1 } },
        { label: "D", text: "内心翻个白眼直接屏蔽，根本不接茬，绝不把情绪浪费在无聊的人身上", scores: { solitude: 3, romance: 1 } }
      ]
    },

    // ==================== 卷四 · 情绪潮汐（情绪反应 Q25-Q32） ====================
    {
      id: 25,
      chapter: "卷四 · 情绪潮汐",
      text: "连续高压忙碌了一周，你感觉情绪快到临界点时，最有效的“回血方式”是？",
      options: [
        { label: "A", text: "彻底断网独处一晚，泡澡、喝茶、听雨或去公园散步，把自己清空", scores: { solitude: 3, literature: 1 } },
        { label: "B", text: "大汗淋漓地运动一场、开车兜风，或者痛痛快快打几局竞技游戏", scores: { valor: 3, chivalry: 1 } },
        { label: "C", text: "看一部后劲很大的电影、听几首击中灵魂的歌，允许自己狠狠释放情绪", scores: { romance: 3, literature: 1 } },
        { label: "D", text: "把压在心头的烦心事列成清单逐一解决，掌控感回来了焦虑自然消失", scores: { strategy: 2, leadership: 2 } }
      ]
    },
    {
      id: 26,
      chapter: "卷四 · 情绪潮汐",
      text: "如果你被人严重误解，且一时半会儿根本解释不清，你通常怎么熬过去？",
      options: [
        { label: "A", text: "“懂我的人不用解释，不懂的懒得废话”，时间自会证明一切", scores: { solitude: 2, chivalry: 2 } },
        { label: "B", text: "表面稳如泰山，暗中收集关键事实，等合适的契机一举翻盘澄清", scores: { strategy: 3, leadership: 1 } },
        { label: "C", text: "当下会非常委屈甚至眼眶发酸，但睡一觉或写点文字倾诉完又能满血复活", scores: { romance: 3, literature: 1 } },
        { label: "D", text: "当面把话说清楚，信不信由你，我绝不背莫须有的黑锅", scores: { valor: 3, chivalry: 1 } }
      ]
    },
    {
      id: 27,
      chapter: "卷四 · 情绪潮汐",
      text: "面对突如其来的变故（比如临行前航班取消、重要文件突然丢失），你前三分钟的状态是？",
      options: [
        { label: "A", text: "肾上腺素飙升但大脑异常冷静，三秒内启动 Plan B 和止损措施", scores: { strategy: 3, valor: 1 } },
        { label: "B", text: "迅速安抚同行人的慌乱，接管局面，有条不紊联系改签或补救", scores: { leadership: 3, strategy: 1 } },
        { label: "C", text: "先吐槽一句“绝了”，然后既来之则安之，顺便看看滞留的城市有什么好吃的", scores: { literature: 3, solitude: 1 } },
        { label: "D", text: "瞬间火大或沮丧一下，但发泄完立刻干脆地重新做决定，绝不原地内耗", scores: { valor: 2, chivalry: 2 } }
      ]
    },
    {
      id: 28,
      chapter: "卷四 · 情绪潮汐",
      text: "夜深人静失眠的时候，你脑海里最容易冒出来的是哪种念头？",
      options: [
        { label: "A", text: "反复推演某件还没尘埃落定的事：如果当时那样说、下一步那样走会怎样？", scores: { strategy: 3, leadership: 1 } },
        { label: "B", text: "飘向很远的诗意画面：某年夏天吹过的晚风、未竟的远方或一段动人的回忆", scores: { romance: 3, literature: 1 } },
        { label: "C", text: "冒出一股宏大的野心或计划：明天起我要怎么破局、干成一件大事！", scores: { leadership: 2, valor: 2 } },
        { label: "D", text: "“算了想这么多干嘛，天地这么大，先睡好觉最要紧”", scores: { solitude: 3, literature: 1 } }
      ]
    },
    {
      id: 29,
      chapter: "卷四 · 情绪潮汐",
      text: "哪种场景最容易让你在心里瞬间燃起一股“不服输”的劲头？",
      options: [
        { label: "A", text: "别人轻描淡写地说：“这事太难了，你肯定搞不定”", scores: { valor: 3, leadership: 1 } },
        { label: "B", text: "遇到一个棋逢对手的强敌，彼此过招的感觉让我血液沸腾", scores: { strategy: 2, valor: 2 } },
        { label: "C", text: "看到自己在乎的人受了委屈，或者珍视的原则被人践踏", scores: { chivalry: 3, romance: 1 } },
        { label: "D", text: "其实我不太跟别人较劲，唯一想赢的只有昨天的自己", scores: { solitude: 2, literature: 2 } }
      ]
    },
    {
      id: 30,
      chapter: "卷四 · 情绪潮汐",
      text: "当你真心感到极度快乐、情绪高涨时，你通常会怎么表达？",
      options: [
        { label: "A", text: "立刻想和最亲近的人分享，请大家吃饭小酌，快乐要翻倍才过瘾", scores: { chivalry: 2, leadership: 2 } },
        { label: "B", text: "哼着歌走路带风，脑子里冒出好多浪漫句子，觉得连路边的树都在发光", scores: { romance: 3, literature: 1 } },
        { label: "C", text: "嘴角微扬，心里明澈舒畅，可能会奖励自己一顿好茶好菜静静回味", scores: { literature: 2, solitude: 2 } },
        { label: "D", text: "趁着这股势头再多攻克一个目标，顺风局就要乘胜追击！", scores: { valor: 3, strategy: 1 } }
      ]
    },
    {
      id: 31,
      chapter: "卷四 · 情绪潮汐",
      text: "你对“情绪稳定”这件事的真实看法是？",
      options: [
        { label: "A", text: "真正强大的定力，是胸有惊雷而面如平湖，大事当前不乱方寸", scores: { leadership: 3, strategy: 1 } },
        { label: "B", text: "不必刻意压抑喜怒，该大笑时大笑、该落泪时落泪，活得鲜活才动人", scores: { romance: 3, chivalry: 1 } },
        { label: "C", text: "情绪是给自己看的，只要内心足够丰盈豁达，外界风浪很难伤到我", scores: { literature: 2, solitude: 2 } },
        { label: "D", text: "有情绪很正常，但绝不能让情绪耽误我做出正确、果断的行动", scores: { valor: 3, strategy: 1 } }
      ]
    },
    {
      id: 32,
      chapter: "卷四 · 情绪潮汐",
      text: "如果能一键删除你性格里偶尔带来困扰的小缺点，你最想优化哪一个？",
      options: [
        { label: "A", text: "想得太周全、习惯把责任往自己肩上扛，有时候活得太累", scores: { strategy: 2, leadership: 2 } },
        { label: "B", text: "太重感情或太容易感性上头，偶尔会被回忆或氛围牵着走", scores: { romance: 3, chivalry: 1 } },
        { label: "C", text: "性子太直、眼里揉不得沙子，偶尔因为不肯圆滑而吃点暗亏", scores: { chivalry: 2, valor: 2 } },
        { label: "D", text: "对不感兴趣的事提不起半点胜负欲，显得太佛系、太爱躲进小世界", scores: { solitude: 3, literature: 1 } }
      ]
    },

    // ==================== 卷五 · 志趣雅好（兴趣偏好 Q33-Q40） ====================
    {
      id: 33,
      chapter: "卷五 · 志趣雅好",
      text: "刷视频、看剧或读小说时，哪类题材最容易让你熬夜一口气追完？",
      options: [
        { label: "A", text: "高智商博弈、悬疑反转、权谋商战，看各方势力的精彩暗战", scores: { strategy: 3, leadership: 1 } },
        { label: "B", text: "热血逆袭、大女主/大男主成长、披荆斩棘杀出重围的爽感故事", scores: { valor: 2, leadership: 2 } },
        { label: "C", text: "细腻动人的文艺片、江湖侠义、或者余韵悠长的宿命美学", scores: { romance: 2, chivalry: 2 } },
        { label: "D", text: "美食纪录片、山野慢生活、人文访谈，看着就让人心里安静又踏实", scores: { literature: 2, solitude: 2 } }
      ]
    },
    {
      id: 34,
      chapter: "卷五 · 志趣雅好",
      text: "如果可以免费拥有一处专属“精神秘密基地”，你最想选哪一处？",
      options: [
        { label: "A", text: "能俯瞰整座城市霓虹灯火的顶层书房，视野开阔，尽收眼底", scores: { leadership: 3, strategy: 1 } },
        { label: "B", text: "半山腰带小院的竹林茶室，春看花、秋听雨，养一只猫和满院青苔", scores: { solitude: 3, literature: 1 } },
        { label: "C", text: "停在海边或草原上的改装房车，随时点火就能追着日落和银河走", scores: { romance: 3, chivalry: 1 } },
        { label: "D", text: "设备齐全的实战工作室/训练馆，随时能打磨技艺、挥洒汗水", scores: { valor: 3, strategy: 1 } }
      ]
    },
    {
      id: 35,
      chapter: "卷五 · 志趣雅好",
      text: "逛博物馆或艺术展时，你最容易在哪个展柜前久久驻足？",
      options: [
        { label: "A", text: "古代青铜礼器、玉玺印章或疆域舆图，扑面而来的厚重与气魄", scores: { leadership: 3, valor: 1 } },
        { label: "B", text: "流光溢彩的书画长卷、温润瓷器，细看笔墨纹理和器物线条", scores: { literature: 3, romance: 1 } },
        { label: "C", text: "寒光犹存的佩剑盔甲、骏马石刻，仿佛听见金戈铁马的回响", scores: { valor: 2, chivalry: 2 } },
        { label: "D", text: "精巧绝伦的机关木器、星象仪，或者隐逸名士留下的古琴竹简", scores: { strategy: 2, solitude: 2 } }
      ]
    },
    {
      id: 36,
      chapter: "卷五 · 志趣雅好",
      text: "戴上耳机时，你的常用歌单底色最偏向哪种氛围？",
      options: [
        { label: "A", text: "节奏铿锵、鼓点带劲的摇滚、说唱或史诗配乐，一听就充满斗志", scores: { valor: 3, chivalry: 1 } },
        { label: "B", text: "歌词如诗、旋律抓心的民谣、国风或独立流行，听着听着就进了画里", scores: { romance: 3, literature: 1 } },
        { label: "C", text: "轻音乐、爵士、古琴白噪音或经典老歌，耐听不吵，适合思考和独处", scores: { solitude: 2, strategy: 2 } },
        { label: "D", text: "随场景切换：工作听专注纯音乐，聚会听氛围金曲，绝不被单一风格框住", scores: { leadership: 2, literature: 2 } }
      ]
    },
    {
      id: 37,
      chapter: "卷五 · 志趣雅好",
      text: "假如现在给你一张不限时间地点的单程机票，你最向往哪一种风景？",
      options: [
        { label: "A", text: "苍茫壮阔的西北大漠、雪山草原，策马扬鞭感受天地辽阔", scores: { valor: 2, chivalry: 2 } },
        { label: "B", text: "烟雨朦胧的江南古镇或千年古城，在青石板与茶烟里慢品人间", scores: { literature: 3, romance: 1 } },
        { label: "C", text: "人迹罕至的海岛渔村或深山秘境，看潮起潮落、彻底远离喧嚣", scores: { solitude: 3, romance: 1 } },
        { label: "D", text: "世界最繁华的国际大都会，去感受时代脉搏和最前沿的风云变幻", scores: { leadership: 3, strategy: 1 } }
      ]
    },
    {
      id: 38,
      chapter: "卷五 · 志趣雅好",
      text: "如果必须选一项技能练到登峰造极，你最心动的是？",
      options: [
        { label: "A", text: "一眼看穿复杂博弈局势的洞察力，下棋如神，决胜千里", scores: { strategy: 3, solitude: 1 } },
        { label: "B", text: "一呼百应的号召力与演说力，能让无数优秀的人愿意追随共事", scores: { leadership: 3, chivalry: 1 } },
        { label: "C", text: "妙笔生花或琴画双绝的艺术天赋，把平凡日子写成流传百年的美", scores: { literature: 2, romance: 2 } },
        { label: "D", text: "一身利落好身手或极致执行力，无论身处何种绝境都能杀出一条路", scores: { valor: 3, chivalry: 1 } }
      ]
    },
    {
      id: 39,
      chapter: "卷五 · 志趣雅好",
      text: "挑一句最击中你心坎的生活信条，你会选哪一句？",
      options: [
        { label: "A", text: "“凡事预则立，不预则废——把底牌攥在手里，才配谈从容。”", scores: { strategy: 3, leadership: 1 } },
        { label: "B", text: "“人生得意须尽欢——爱恨都要浓烈，别把好光阴过得小心翼翼。”", scores: { romance: 3, chivalry: 1 } },
        { label: "C", text: "“一蓑烟雨任平生——顺境吃肉，逆境喝汤，哪儿都能过成好日子。”", scores: { literature: 3, solitude: 1 } },
        { label: "D", text: "“想一千次不如干一次——路是自己闯出来的，不是等出来的。”", scores: { valor: 3, leadership: 1 } }
      ]
    },
    {
      id: 40,
      chapter: "卷五 · 志趣雅好",
      text: "最后一题：如果此刻穿越回古代，你只能随身带走一件象征物，你会挑？",
      options: [
        { label: "A", text: "一柄轻摇定乾坤的羽扇，或一卷藏尽世事机变的锦囊", scores: { strategy: 3, literature: 1 } },
        { label: "B", text: "一方沉甸甸的玄铁虎符或玉印，手握话语权，改写一方天地", scores: { leadership: 3, valor: 1 } },
        { label: "C", text: "一壶烈酒加三尺青锋，快意走四方，不负满腔少年意气", scores: { chivalry: 2, romance: 2 } },
        { label: "D", text: "一张古琴与一盏素茶，管他庙堂风波起，且听松风明月来", scores: { solitude: 3, literature: 1 } }
      ]
    }
  ];

  // 14位中国历史人物档案（7大原型 × 2种灵魂底色）
  // profile 为 7 维度目标画像（0~10分，算法基于标准化余弦相似度与主维度契合度综合匹配）
  const CHARACTERS = [
    // ==================== 1. 谋士 ====================
    {
      id: "zhugeliang",
      name: "诸葛亮",
      archetype: "谋士",
      archetypeTag: "全能布局型谋士",
      dynasty: "三国 · 蜀汉",
      alias: "卧龙先生",
      sealText: "卧龙",
      accentColor: "#2C4F54",
      signatureQuote: "别人走一步看一步，你早就把未来三步的退路与胜算，安静地铺好了。",
      keywords: ["审慎周全", "远见卓识", "责任如山", "理性温柔"],
      summary: "你的灵魂深处住着一位羽扇纶巾的定海神针。表面上温和克制、不争一时风头，实则脑海里永远装着一张高清全局沙盘。无论是职场攻坚还是人生规划，你总能敏锐嗅到潜在风险，提前备好锦囊妙计，让人只要有你在场就莫名安心。",
      traits: [
        "拥有极强的结构化思维与预判能力，习惯把复杂局面拆解成清晰可控的步骤。",
        "外冷内热、重情重诺，一旦认可了某个人或某件事，就会倾尽全力做到极致。",
        "对自己要求极高，有时会因为太替大家操心、凡事力求完美而悄悄透支精力。"
      ],
      matchReasonIntro: "你的测试画像呈现出鲜明的「高谋略 × 高格局 × 沉稳克制」结构，既能俯瞰全局，又能落到细节。",
      hiddenStrengths: [
        "【逆风翻盘体质】越是突发混乱的局面，你的大脑反而越冷静，常常在别人慌乱时一锤定音。",
        "【隐形信任磁场】你从不靠大声喧哗刷存在感，但关键时刻，身边人第一个想请教的永远是你。",
        "【降维打击的耐心】懂得延迟满足，愿意为真正重要的长期目标默默蓄力。"
      ],
      easterEgg: {
        modernIdentity: "顶级战略顾问 / 团队里永远备着 Plan B 和 Plan C 的全能操盘手",
        wechatBio: "淡泊明志，但日程表已排到下个月。",
        modernHobby: "睡前复盘清单、研究各种效率神器、偷偷给朋友当人生军师",
        soulmate: "李世民（你出奇谋，TA给舞台，堪称神仙搭档）",
        rival: "李白（你刚做好完美攻略，TA已经临时改签去看海了）"
      },
      profile: {
        strategy: 10,
        leadership: 7.5,
        literature: 6,
        chivalry: 4,
        romance: 3,
        valor: 5.5,
        solitude: 4.5
      }
    },
    {
      id: "zhangliang",
      name: "张良",
      archetype: "谋士",
      archetypeTag: "破局隐逸型谋士",
      dynasty: "秦末汉初",
      alias: "留侯 · 谋圣",
      sealText: "留侯",
      accentColor: "#3D5A58",
      signatureQuote: "你看透了牌桌上的所有算计，赢完最精彩的那一局，便笑着起身离席。",
      keywords: ["点到即止", "借力打力", "清醒抽离", "举重若轻"],
      summary: "你拥有极高的智识敏锐度，却完全没有沉重的控制欲。你看问题一针见血，最擅长四两拨千斤——别人焦头烂额硬碰硬的事，你往往换个角度、借一股巧力就轻巧化解。更难得的是你懂进退、知分寸，功成名就时也绝不贪恋虚名。",
      traits: [
        "观察力极其细腻，在热闹场合常安静旁观，却能三秒钟看透人情世故与利益走向。",
        "极度厌恶低效内耗，喜欢用最轻盈的成本撬动最大的结果。",
        "骨子里带着一份清醒的疏离感，入世能定乾坤，出世能守清欢。"
      ],
      matchReasonIntro: "你的得分兼具「高谋略」与「高松弛感」，既有操盘手的智慧，又不愿被世俗名利捆绑。",
      hiddenStrengths: [
        "【精准识局力】总能避开无意义的消耗战，在众人盲目跟风前提前抽身或精准卡位。",
        "【高情商留白】说话点到即止，既保全对方体面，又能让对方顺着你的思路走。",
        "【顶级反脆弱】不把自我价值绑定在单一头衔上，随时具备换赛道重启的底气。"
      ],
      easterEgg: {
        modernIdentity: "事了拂衣去的幕后军师 / 从不加班却总拿最高绩效的松弛智囊",
        wechatBio: "看破不说破，喝完这杯就下班。",
        modernHobby: "在咖啡馆安静观察人类、研究心理博弈、攒够自由资金计划提前退休",
        soulmate: "红拂女（同样眼里带光、懂进退，不用多说就能默契联手）",
        rival: "霍去病（你还在布精妙连环局，TA已经一脚把大门踹开了）"
      },
      profile: {
        strategy: 10,
        leadership: 4.5,
        literature: 6,
        chivalry: 5.5,
        romance: 4,
        valor: 4,
        solitude: 8.5
      }
    },

    // ==================== 2. 帝王 ====================
    {
      id: "lishimin",
      name: "李世民",
      archetype: "帝王",
      archetypeTag: "盛世包容型帝王",
      dynasty: "唐朝",
      alias: "天可汗 · 唐太宗",
      sealText: "贞观",
      accentColor: "#9A3426",
      signatureQuote: "你天生自带聚人心的磁场，不靠喧嚣压人，却总能让群星甘愿环绕。",
      keywords: ["格局宏阔", "兼听则明", "刚柔并济", "御众有道"],
      summary: "你的灵魂带着盛唐般的开阔气象。你既敢于在关键时刻亲自下场拍板扛责，又懂得欣赏不同人的闪光点，哪怕别人提出尖锐的反对意见，只要有道理你都听得进去。和你共事或相处，总能感受到一种蓬勃向上、被托举的安全感。",
      traits: [
        "天然具备大局观和组织力，习惯站在更高的维度平衡多方需求，把散沙聚成团队。",
        "自信而不刚愎自用，既有冲锋的胆识，也有容人的雅量与审美。",
        "骨子里有很强的成就动机，渴望打造出让自己和身边人都引以为傲的“盛世”。"
      ],
      matchReasonIntro: "你在「格局力」上表现亮眼，同时拥有扎实的「谋略度」与「雅致心」，是天生的领航者配置。",
      hiddenStrengths: [
        "【识人用人直觉】总能一眼看出别人的天赋所在，让不同性格的人在你身边发挥最大价值。",
        "【情绪稳压器】越是大场面越从容得体，自带令人信服的领袖气场。",
        "【快速迭代胸怀】错了就认、认了就改，从不因为死要面子错失成长机会。"
      ],
      easterEgg: {
        modernIdentity: "让全组心甘情愿追随的项目灵魂人物 / 聚会时自然控场的满分组织者",
        wechatBio: "海纳百川，有容乃大，欢迎提意见（有理必听）。",
        modernHobby: "组局请客、研究历史与商业人物传记、把生活和事业都经营得热气腾腾",
        soulmate: "诸葛亮（明君贤相的双向奔赴，一起能把小项目干成传奇）",
        rival: "嵇康（你诚意满满邀TA共创大业，TA回你一句“谢邀，我想在家打铁”）"
      },
      profile: {
        strategy: 7.5,
        leadership: 10,
        literature: 6.5,
        chivalry: 5.5,
        romance: 4,
        valor: 6.5,
        solitude: 3
      }
    },
    {
      id: "wuzetian",
      name: "武则天",
      archetype: "帝王",
      archetypeTag: "破格革新型帝王",
      dynasty: "武周 · 盛唐",
      alias: "一代女皇",
      sealText: "日月",
      accentColor: "#8B1E2B",
      signatureQuote: "既然旧规则里没有你的位置，那便亲手改写规则，把名字刻进苍穹。",
      keywords: ["果决凌厉", "破界立新", "掌控全局", "无惧流言"],
      summary: "你有一颗极其强大、绝不被世俗模板驯服的灵魂。别人还在犹豫“这样合不合常规”时，你已经看准核心目标，果断出手打破天花板。你不怕争议，也不靠讨好谁换取认可——实力、结果与话语权，才是你最信任的底牌。",
      traits: [
        "目标感极强，执行起来雷厉风行，遇到阻力不是退缩，而是瞬间激发斗志。",
        "反感一切陈腐低效的条条框框，擅长大刀阔斧地推动变革。",
        "心理承受力超群，能够坦然消化外界的非议，把质疑统统变成登顶的台阶。"
      ],
      matchReasonIntro: "你的测试结果呈现出强烈的「高格局 × 高决断 × 强谋略」组合，极具破局主宰的能量。",
      hiddenStrengths: [
        "【顶配抗压心脏】在高压竞争和复杂博弈中越战越勇，绝不轻易崩溃退场。",
        "【极速止损魄力】发现人和事不值得投入时，能快刀斩乱麻，从不拖泥带水。",
        "【野心落地的能力】不仅敢想别人不敢想的事，更能一步步把野心变成现实。"
      ],
      easterEgg: {
        modernIdentity: "打破行业潜规则的狠角色 / 永远把命运方向盘攥在自己手里的气场王者",
        wechatBio: "功过留与后人评，当下只需赢。",
        modernHobby: "制定年度跃迁计划、研究强者思维、干完漂亮一仗后奖励自己顶级大餐",
        soulmate: "花木兰（强者惜强者，一起做事效率直接拉满）",
        rival: "陶渊明（你正准备再攀高峰，TA劝你“不如早点辞职种花”）"
      },
      profile: {
        strategy: 7.5,
        leadership: 10,
        literature: 4,
        chivalry: 4,
        romance: 3,
        valor: 9.5,
        solitude: 2.5
      }
    },

    // ==================== 3. 文人 ====================
    {
      id: "sushi",
      name: "苏轼",
      archetype: "文人",
      archetypeTag: "烟火旷达型文人",
      dynasty: "北宋",
      alias: "东坡居士",
      sealText: "东坡",
      accentColor: "#546B53",
      signatureQuote: "就算生活给你泼了一瓢冷水，你也能顺手煮一锅热汤，笑称此味绝佳。",
      keywords: ["人间松弛", "逆境生花", "幽默通透", "热爱烟火"],
      summary: "你是人群里最难得的“顶级生活家”。你既懂阳春白雪的审美与思考，又深深热爱着一碗红烧肉、一场晚霞雨的人间烟火。无论顺境还是低谷，你总能用一点恰到好处的幽默和豁达，把苦日子过出回甘，让靠近你的人瞬间被治愈。",
      traits: [
        "拥有罕见的心理弹性，允许自己短暂难过，但很快就能笑着把生活重新调成暖色调。",
        "审美在线、趣味丰盈，能从最寻常的日常里发现别人忽略的小确幸。",
        "真诚随和、不端架子，上能聊哲学星河，下能聊巷口哪家小吃最正宗。"
      ],
      matchReasonIntro: "你在「雅致心」上遥遥领先，并融合了温暖的「诗意感」与「松弛感」，像极了一蓑烟雨任平生的东坡先生。",
      hiddenStrengths: [
        "【高级钝感与自愈力】能把挫折转化成段子和故事，极少陷入长期精神内耗。",
        "【跨界灵感体质】兴趣广泛且触类旁通，常常在不经意间冒出惊艳众人的创意。",
        "【天然好人缘】跟你在一起毫无紧绷感，是朋友们最想约去吃饭散心的首选。"
      ],
      easterEgg: {
        modernIdentity: "美食探店隐藏博主 / 朋友圈文案总让人忍不住点赞的人间开心果",
        wechatBio: "人间有味是清欢，今天吃点什么好？",
        modernHobby: "研发拿手菜、收藏冷门好店、雨天煮茶顺便发一条俏皮朋友圈",
        soulmate: "陶渊明（一个爱吃爱闹，一个爱静爱花，凑在一起就是神仙日子）",
        rival: "武则天（你觉得开心最要紧，TA觉得“格局打开，我们还可以再冲一波”）"
      },
      profile: {
        strategy: 4.5,
        leadership: 4,
        literature: 10,
        chivalry: 5,
        romance: 7.5,
        valor: 4,
        solitude: 7.5
      }
    },
    {
      id: "wangyangming",
      name: "王阳明",
      archetype: "文人",
      archetypeTag: "知行合一型文人",
      dynasty: "明朝",
      alias: "阳明先生",
      sealText: "阳明",
      accentColor: "#465866",
      signatureQuote: "外界喧嚣千百重，你只向内寻一盏明灯，想清楚了，便提剑去做。",
      keywords: ["知行合一", "内心笃定", "文武兼修", "清醒实干"],
      summary: "你不是只会在书斋里空谈的理想主义者，而是把“想明白”和“干漂亮”完美融合的清醒实干家。你的内心有一套极其稳固的坐标体系，不轻易被外界的焦虑和潮流带偏。既能静下来深度思考，也能在需要时卷起袖子解决最棘手的现实难题。",
      traits: [
        "逻辑清晰、自省力强，遇到问题习惯先向内找解法，而不是抱怨环境。",
        "兼具书卷气与行动力，温和的外表下藏着一股不动声色的硬核执行力。",
        "厌恶空洞内卷，追求真正有价值、能落地、让自己内心坦荡的成果。"
      ],
      matchReasonIntro: "你的画像兼具「雅致心」「谋略度」与「决断力」，既有深邃的思辨底色，又有破局落地的魄力。",
      hiddenStrengths: [
        "【抗焦虑内核】因为内在标准清晰，极少被社交媒体或他人的评价体系裹挟。",
        "【跨维度破局】既懂理论规律又懂实战落地，往往能成为团队里的核心支柱。",
        "【越挫越明】每一次低谷都会成为你的“龙场悟道”，让你蜕变得更强大。"
      ],
      easterEgg: {
        modernIdentity: "一边写深度长文一边带队打硬仗的六边形战士 / 朋友圈里的清醒哲学家",
        wechatBio: "此心光明，亦复何言。",
        modernHobby: "深度阅读、写思考笔记、复盘人性规律并直接用到实战里",
        soulmate: "诸葛亮（两位顶级清醒派坐下来喝茶，能把半个世界的逻辑盘明白）",
        rival: "李白（你讲知行合一、步步扎实，TA一拍桌子说“先喝完这坛再说”）"
      },
      profile: {
        strategy: 8.5,
        leadership: 6.5,
        literature: 9.5,
        chivalry: 4.5,
        romance: 3.5,
        valor: 7.5,
        solitude: 5.5
      }
    },

    // ==================== 4. 侠客 ====================
    {
      id: "jingke",
      name: "荆轲",
      archetype: "侠客",
      archetypeTag: "赤诚孤勇型侠客",
      dynasty: "战国",
      alias: "燕赵游侠",
      sealText: "易水",
      accentColor: "#7A2E28",
      signatureQuote: "世人多爱权衡利弊，唯有你还肯为一句承诺、一腔热忱，义无反顾。",
      keywords: ["一诺千金", "赤诚热烈", "嫉恶如仇", "孤勇担当"],
      summary: "你的灵魂里流淌着滚烫的侠气。在这个人人精于算计的时代，你依然珍视“信义”和“真心”这些最朴素也最珍贵的东西。平时或许话不多、甚至有些慢热，但只要朋友有难或触及你心底的公道，你绝不会退后半步。",
      traits: [
        "爱憎分明，眼里揉不得虚伪和算计，交朋友只看人品不看身价。",
        "重承诺到近乎固执，答应别人的事，再难也会拼尽全力兑现。",
        "外表可能沉静克制，内心却藏着一团足以照亮黑夜的炽热火焰。"
      ],
      matchReasonIntro: "你在「侠义气」与「决断力」上得分突出，并带着深沉的「诗意感」，是重情重义的赤诚灵魂。",
      hiddenStrengths: [
        "【生死之交体质】你或许不会泛泛之交满天下，但认定的挚友都会把你当成最硬的靠山。",
        "【关键时刻的爆发力】平时不显山露水，一旦到了真正要扛事的关口，胆气无人能及。",
        "【纯粹的感染力】你的真诚和热血，常常能让周围麻木的人重新找回勇气。"
      ],
      easterEgg: {
        modernIdentity: "聚餐永远抢着买单的护短狂魔 / 凌晨两点朋友求助二话不说开车去接的真兄弟",
        wechatBio: "莫问前程凶吉，但求落幕无悔。",
        modernHobby: "听燃向或苍凉感音乐、和铁哥们深夜撸串小酌、看热血侠义电影",
        soulmate: "李白（一壶酒、一把剑、两颗滚烫的灵魂，能从天黑聊到天亮）",
        rival: "张良（你觉得该正面硬刚讨回公道，TA拉住你“冷静，我们智取行不行”）"
      },
      profile: {
        strategy: 2.5,
        leadership: 3.5,
        literature: 3.5,
        chivalry: 10,
        romance: 6.5,
        valor: 9,
        solitude: 4
      }
    },
    {
      id: "hongfunv",
      name: "红拂女",
      archetype: "侠客",
      archetypeTag: "慧眼飒爽型侠客",
      dynasty: "隋末唐初",
      alias: "风尘三侠 · 慧眼游侠",
      sealText: "红拂",
      accentColor: "#9E3B33",
      signatureQuote: "你有一双能穿透平庸的慧眼，认准了人和路，便敢拎起行囊夜奔远方。",
      keywords: ["慧眼识珠", "敢爱敢走", "飒爽清醒", "机敏果敢"],
      summary: "你是江湖里最飒、最清醒的那一类侠客——既有快意恩仇的胆识，又有极准的看人眼光和判断力。你绝不会把青春耗在一段不对的关系或一份僵化的生活里；一旦看准真正值得奔赴的人与方向，你比谁都干脆、比谁都勇敢。",
      traits: [
        "直觉与洞察力双双在线，看人极准，一眼就能分辨谁是草包、谁是潜力股。",
        "不恋旧巢、敢于破局，拥有随时推倒重来、奔赴新天地的爽利劲儿。",
        "重情却不恋爱脑，讲义气却有头脑，是把自由和清醒握在手心的现代侠女/游侠。"
      ],
      matchReasonIntro: "你的测试呈现出「高侠义 × 高谋略 × 独立松弛」的独特组合，既有江湖胆气，又有识人智慧。",
      hiddenStrengths: [
        "【顶级识人雷达】极少看走眼，总能在人群中精准锁定真正有才华、有品格的同路人。",
        "【断舍离王者】离开消耗自己的人和环境绝不拖泥带水，自带清爽的边界感。",
        "【逆境破局的韧性】哪怕开局拿的不是最好的牌，也能凭胆识和眼界改写剧本。"
      ],
      easterEgg: {
        modernIdentity: "一语道破渣男/烂项目的闺蜜军师 / 说辞职就辞职、说看海就出发的飒爽行动派",
        wechatBio: "山高水长，只和同频的人同行。",
        modernHobby: "说走就走的独自旅行、帮朋友精准鉴人、在关键节点果断换赛道升级",
        soulmate: "张良（双商在线的默契搭子，一起闯江湖绝对所向披靡）",
        rival: "李清照（你劝TA“不合适就立刻潇洒翻篇”，TA说“让我再伤春悲秋写两首词”）"
      },
      profile: {
        strategy: 8.5,
        leadership: 4.5,
        literature: 4.5,
        chivalry: 10,
        romance: 4.5,
        valor: 5,
        solitude: 7
      }
    },

    // ==================== 5. 诗人 ====================
    {
      id: "libai",
      name: "李白",
      archetype: "诗人",
      archetypeTag: "浪漫不羁型诗人",
      dynasty: "盛唐",
      alias: "青莲居士 · 诗仙",
      sealText: "青莲",
      accentColor: "#2F5C75",
      signatureQuote: "世俗的尺子量不出你的边界，你生来就该去追明月、烈酒与滚烫的远方。",
      keywords: ["天马行空", "热烈自由", "骄傲赤子", "浪漫至死"],
      summary: "你的灵魂装着整片盛唐的星河与清风。你天生对枯燥的条条框框过敏，骨子里带着一股明朗的傲气和少年感——得意时大笑畅饮，失意时挥毫寄月，哪怕走过千山万水，依然保有一颗对世界充满好奇与悸动的赤子之心。",
      traits: [
        "想象力极其丰沛，灵感一来挡都挡不住，总能用惊艳的视角重新诠释平凡生活。",
        "讨厌虚与委蛇的弯弯绕绕，宁可直爽率真地活，也不愿弯腰讨好不喜欢的人。",
        "情绪浓度高，爱得坦荡、玩得尽兴，是自带生命力光环的氛围点燃者。"
      ],
      matchReasonIntro: "你在「诗意感」上光芒万丈，同时叠加了奔放的「侠义气」与「松弛感」，是不折不扣的浪漫浪子。",
      hiddenStrengths: [
        "【天赋级创造力】不按常理出牌的思维方式，让你总能想到别人想破头都想不出的绝妙点子。",
        "【永不褪色的少年感】岁月很难把你磨成油腻大人，你总能给身边人带来久违的心动与自由感。",
        "【极致情绪感染力】你的热情、幽默和真诚，拥有让人一秒卸下防备的魔力。"
      ],
      easterEgg: {
        modernIdentity: "凌晨三点突发奇想去海边看日出的浪漫策划师 / 聚会微醺后金句频出的灵感之神",
        wechatBio: "且放白鹿青崖间，下一站去哪儿全看风往哪吹。",
        modernHobby: "听着歌夜跑或兜风、收集奇怪又浪漫的冷知识、随时准备开启一场奇遇",
        soulmate: "荆轲（一个浪漫如风，一个赤诚如火，凑一起就是最酷的江湖组合）",
        rival: "诸葛亮（你兴冲冲要来场即兴冒险，TA掏出三页风险评估表让你签字）"
      },
      profile: {
        strategy: 2.5,
        leadership: 3.5,
        literature: 6.5,
        chivalry: 8.5,
        romance: 10,
        valor: 5.5,
        solitude: 7
      }
    },
    {
      id: "liqingzhao",
      name: "李清照",
      archetype: "诗人",
      archetypeTag: "清绝深情型诗人",
      dynasty: "两宋之交",
      alias: "易安居士",
      sealText: "易安",
      accentColor: "#6B4C62",
      signatureQuote: "你能接住一朵海棠坠落的轻响，也能在时代风暴里守住一身清绝风骨。",
      keywords: ["细腻敏感", "审美绝佳", "深情傲骨", "灵气逼人"],
      summary: "你拥有极其敏锐的情感天线与高挑的审美眼光。别人匆匆掠过的晚风、光影、语气停顿，在你心里都能泛起千层涟漪。但千万别把你的细腻当成脆弱——你温柔的外表下藏着极硬的傲骨，爱的时候全情投入，该决绝时也绝不自轻自贱。",
      traits: [
        "共情力与审美品位极高，对文字、音乐、色彩和氛围有着天生的捕捉能力。",
        "内心世界无比丰富，既能欣赏细碎的精致美好，也有着“生当作人杰”的凛然气节。",
        "对感情与知己标准极高，宁缺毋滥，绝不为了凑合而降低灵魂的含金量。"
      ],
      matchReasonIntro: "你的测试结果在「诗意感」与「雅致心」上双双领跑，兼具纤尘不染的审美与深沉的精神力量。",
      hiddenStrengths: [
        "【高阶共情与表达力】总能精准说出别人心里说不出的感受，拥有直击人心的文字或审美天赋。",
        "【绝佳直觉雷达】对人际关系中的微妙变化洞察入微，很难有人能在你面前演戏。",
        "【外柔内刚的韧性】经历过风雨也不会丢掉优雅与自尊，反而沉淀出更动人的光芒。"
      ],
      easterEgg: {
        modernIdentity: "歌单和穿搭审美封神的质感生活家 / 表面文艺温柔其实打牌/博弈超狠的隐藏王者",
        wechatBio: "沉醉不知归路，但是非对错心里清清楚楚。",
        modernHobby: "逛小众画展与书店、收藏绝美句子、深夜听歌写下后劲十足的随笔",
        soulmate: "苏轼（同样才情满腹、懂生活之美，聊诗词美食能聊到天明）",
        rival: "霍去病（你正感慨夕阳斜照别有愁绪，TA说“天快黑了赶紧回营吃烤羊”）"
      },
      profile: {
        strategy: 4,
        leadership: 3,
        literature: 9.5,
        chivalry: 5,
        romance: 10,
        valor: 3.5,
        solitude: 6.5
      }
    },

    // ==================== 6. 将领 ====================
    {
      id: "huoqubing",
      name: "霍去病",
      archetype: "将领",
      archetypeTag: "破风锐进型将领",
      dynasty: "西汉",
      alias: "冠军侯",
      sealText: "冠军",
      accentColor: "#B33928",
      signatureQuote: "别人还在纸上反复推演风险，你已经策马越过山丘，把旗帜插在了终点。",
      keywords: ["锐气逼人", "行动王者", "直球果敢", "少年封神"],
      summary: "你是一阵势不可挡的疾风。你最受不了拖泥带水、瞻前顾后的精神内耗——想清楚方向就立刻开干，遇到硬骨头就正面撞碎！你自带一种生猛鲜活的胜负欲和生命力，越是大家觉得“不可能”的硬仗，越能激发你一骑绝尘的爆发力。",
      traits: [
        "行动力和决断力拉满，别人还在开会讨论可行性时，你已经跑出第一份战果了。",
        "直爽坦荡，不爱玩阴谋诡计，喜欢凭真本事在阳光下堂堂正正赢回来。",
        "自带锐利锋芒，不甘平庸，渴望不断突破自己的极限边界。"
      ],
      matchReasonIntro: "你在「决断力」上独占鳌头，同时兼具「侠义气」与「格局力」，拥有一往无前的破风能量。",
      hiddenStrengths: [
        "【破冰核武器】在团队陷入停滞和犹豫时，你是那个能瞬间撕开突破口的关键人物。",
        "【超高实战学习率】不在纸上空谈，总能在高速行动和即时反馈中飞速进化。",
        "【纯粹的赢家心态】很少被过去的小失败绊住脚步，眼里永远盯着下一座要拿下的山头。"
      ],
      easterEgg: {
        modernIdentity: "DDL前绝地反杀的效率战神 / 健身房和职场双双开挂的直球行动派",
        wechatBio: "少废话，干就完了。",
        modernHobby: "高燃竞技运动、挑战高难度目标、赢下一场硬仗后爽快庆祝",
        soulmate: "武则天（同样果敢锐利、慕强实干，强强联手直接横扫全场）",
        rival: "陶渊明（你问TA要不要一起卷个大的，TA问你今天院子里的桂花香不香）"
      },
      profile: {
        strategy: 4.5,
        leadership: 7.5,
        literature: 2.5,
        chivalry: 8,
        romance: 6,
        valor: 10,
        solitude: 2.5
      }
    },
    {
      id: "huamulan",
      name: "花木兰",
      archetype: "将领",
      archetypeTag: "刚柔守护型将领",
      dynasty: "北朝",
      alias: "巾帼将军",
      sealText: "木兰",
      accentColor: "#3A544B",
      signatureQuote: "披上铠甲你能替最爱的人挡住万丈风雪，脱下战袍你依然笑得明朗温柔。",
      keywords: ["沉稳担当", "刚柔并济", "靠谱天花板", "守护之力"],
      summary: "你的勇敢从不是为了炫耀锋芒，而是源于内心深沉的爱与责任。平时你可以很柔和、很体贴，但只要家人、朋友或团队需要有人顶上去，你会毫不犹豫披甲上阵，把最难的担子稳稳扛在肩上，不喊苦、不邀功，守住一方安宁。",
      traits: [
        "极度靠谱、执行力扎实，属于“把后背交给你就绝对放心”的铁壁型伙伴。",
        "刚柔并济，外有独当一面的英气，内有细腻柔软的同理心与烟火情怀。",
        "低调务实，不贪恋虚浮的荣耀，打完硬仗最想做的事往往是回家好好吃顿饭。"
      ],
      matchReasonIntro: "你的测试结果呈现出「高决断 × 高松弛 × 沉稳克制」的刚柔结构，关键时刻能披甲独当一面，功成之后也能淡然回归烟火。",
      hiddenStrengths: [
        "【超强环境适应力】无论被丢进怎样陌生的环境，你都能迅速稳住阵脚、练出真本事。",
        "【顶级抗压与保密能力】能忍常人不能忍的枯燥和压力，关键时刻绝不掉链子。",
        "【反差感魅力】工作时飒爽干练、生活里温暖松弛，让人越了解越佩服。"
      ],
      easterEgg: {
        modernIdentity: "公司和家里的双料顶梁柱 / 出门旅游永远默默把所有人照顾周全的靠谱担当",
        wechatBio: "该扛的事一步不退，该过的日子一样不少。",
        modernHobby: "徒步露营、学一项硬核实用技能、忙完大事后回家给家人做顿好饭",
        soulmate: "王阳明（同样务实笃定、不爱虚名，相处起来踏实又默契）",
        rival: "嵇康（你觉得责任在肩不能任性，TA觉得“人活着首先得让自己痛快”）"
      },
      profile: {
        strategy: 6.5,
        leadership: 5,
        literature: 6,
        chivalry: 5.5,
        romance: 2,
        valor: 10,
        solitude: 8
      }
    },

    // ==================== 7. 隐士 ====================
    {
      id: "taoyuanming",
      name: "陶渊明",
      archetype: "隐士",
      archetypeTag: "田园自洽型隐士",
      dynasty: "东晋",
      alias: "五柳先生",
      sealText: "东篱",
      accentColor: "#4E6E58",
      signatureQuote: "不必挤进别人的喧闹赛道，你把自己的小日子过成桃花源，已是赢家。",
      keywords: ["温暖自洽", "拒绝内卷", "慢享清欢", "心安即归"],
      summary: "你是喧嚣时代里最稀缺的“精神桃花源”。你很早就看透了无意义攀比的虚幻，比起在紧绷的赛道上争个你死我活，你更在意今天微风是否和煦、饭菜是否合口、心里是否舒坦。你的淡泊不是躺平逃避，而是清醒知道自己真正想要什么。",
      traits: [
        "精神世界非常丰盈，独处从不觉得寂寞，反而是你最高效的充电时刻。",
        "对物质名利看得通透，不为了“五斗米”委屈尊严，守得住自己的一方小天地。",
        "气质温和宁静，像一杯温润的清茶，让人跟你待在一起就自动卸下焦虑。"
      ],
      matchReasonIntro: "你在「松弛感」上高居榜首，搭配温润的「雅致心」与「诗意感」，是天生自带桃源结界的灵魂。",
      hiddenStrengths: [
        "【免疫外界焦虑】当周围人都被恐慌和攀比裹挟时，你依然能稳稳守住自己的节奏。",
        "【极致生活感知力】花很少的钱也能把日子过得充满质感与幸福感。",
        "【长线幸福体质】懂得细水长流的快乐，往往是人群里活得最舒展、最持久开心的人。"
      ],
      easterEgg: {
        modernIdentity: "下班秒变失联人士的反内卷大师 / 阳台种满花草、热衷逛公园和菜市场的慢生活家",
        wechatBio: "久在樊笼里，复得返自然（勿催，在发呆）。",
        modernHobby: "逛公园20分钟效应、养植物或小猫、研究手冲茶与舒适居家布置",
        soulmate: "苏轼（一个在桃源种菊，一个带着好酒好菜来串门，神仙友情）",
        rival: "武则天（你只想早点收工看夕阳，TA正在为你规划三年晋升路线）"
      },
      profile: {
        strategy: 3.5,
        leadership: 2.5,
        literature: 8.5,
        chivalry: 4,
        romance: 7,
        valor: 2.5,
        solitude: 10
      }
    },
    {
      id: "jikang",
      name: "嵇康",
      archetype: "隐士",
      archetypeTag: "魏晋风骨型隐士",
      dynasty: "三国 · 曹魏",
      alias: "竹林名士",
      sealText: "广陵",
      accentColor: "#3D4959",
      signatureQuote: "宁在自己的世界里弹一曲广陵散，也不向虚伪的规则低半寸头颅。",
      keywords: ["绝不讨好", "忠于本心", "清冷孤傲", "魏晋反骨"],
      summary: "你的灵魂自带清绝不驯的魏晋风骨。你极度反感虚伪的客套、无聊的权威和强加于人的“应该”。你不屑于为了合群而伪装自己——懂我的人自然会来听我弹琴，不懂我的人请便。那份敢于对全世界说“不”的酷与纯粹，正是你最迷人的光芒。",
      traits: [
        "主体性极强，拥有清晰的个人审美与精神领地，绝不随波逐流。",
        "厌恶虚伪与权谋客套，宁愿少几个泛泛之交，也要保住灵魂的干净和痛快。",
        "外表可能有些清冷难接近，其实对真正同频的灵魂热烈又赤诚，甚至带着一点孩子气的固执。"
      ],
      matchReasonIntro: "你的画像呈现「极高松弛独立 × 高侠义风骨 × 诗意审美」，是不肯向平庸妥协的孤傲名士。",
      hiddenStrengths: [
        "【顶级防PUA体质】任何情绪勒索、画大饼和道德绑架在你面前都会瞬间失效。",
        "【深耕热爱的专注力】一旦迷上某件真正喜欢的事，能沉浸其中打磨出惊人水准。",
        "【不可替代的个人魅力】你越是不刻意迎合，反而越容易吸引真正有品位的人欣赏你。"
      ],
      easterEgg: {
        modernIdentity: "拒绝一切无效团建的清冷酷盖 / 下班后沉浸在音乐、手作或小众爱好的灵魂玩家",
        wechatBio: "非汤武而薄周孔，别教我做事。",
        modernHobby: "沉迷小众音乐/乐器/手作、在深夜享受绝对自由、优雅回怼一切说教",
        soulmate: "李白（同样傲骨天生、拒绝讨好，在一起只需大笑与自由）",
        rival: "李世民（TA想把你招进核心班底大展宏图，你连夜写了封礼貌但绝情的绝交信）"
      },
      profile: {
        strategy: 3,
        leadership: 2,
        literature: 6,
        chivalry: 8.5,
        romance: 7,
        valor: 5.5,
        solitude: 10
      }
    }
  ];

  return {
    DIMENSIONS,
    ARCHETYPES,
    QUESTIONS,
    CHARACTERS
  };
})();
