// 菜单数据（本地静态 JSON，直接改文字即可增删菜品）
// 字段说明：
//   id        唯一ID
//   category  分类
//   name      菜名
//   emoji     占位图（cover 为空时显示；生成卡通图后填 cover 即可）
//   cover     菜品卡通图路径，如 '/assets/images/hn1.jpg'（空字符串=用 emoji）
//   desc      一句话简介
//   calories  每份热量(kcal)，参考估算值，可按真实食谱修改
//   spicy     辣度选项（空数组表示不需要）
//   flavor    口味选项
//   ingredients 食材用量 [{name, amount}]
//   steps     做法步骤 [字符串]
//   noteAllowed 是否允许备注特殊要求

const SPICY = ['不辣', '微辣', '中辣', '特辣'];
const FLAVOR = ['原味', '偏甜', '偏咸', '偏酸'];
const DRINK_FLAVOR = ['正常糖', '少糖', '无糖'];

const MENU = [
  // ===== 湘菜 =====
  {
    id: 'hn1', category: '湘菜', name: '剁椒鱼头', emoji: '🐟', cover: '',
    desc: '鲜辣开胃，湘菜招牌', calories: 350,
    spicy: SPICY, flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '鱼头', amount: '1个' }, { name: '剁椒', amount: '200g' },
      { name: '姜', amount: '20g' }, { name: '蒜', amount: '30g' }, { name: '蒸鱼豉油', amount: '2勺' }
    ],
    steps: ['鱼头剖开，用料酒和盐腌10分钟去腥', '盘底铺姜蒜，放鱼头，表面铺满剁椒', '水开后上锅蒸12分钟', '出锅淋蒸鱼豉油，撒葱花即可']
  },
  {
    id: 'hn2', category: '湘菜', name: '辣椒炒肉', emoji: '🌶️', cover: '',
    desc: '下饭神器，香辣过瘾', calories: 420,
    spicy: SPICY, flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '五花肉', amount: '200g' }, { name: '青椒', amount: '3个' },
      { name: '蒜末', amount: '适量' }, { name: '生抽', amount: '1勺' }
    ],
    steps: ['五花肉切片，煸炒出油盛出', '下蒜末和青椒翻炒断生', '回锅肉片，加生抽和盐炒匀']
  },
  {
    id: 'hn3', category: '湘菜', name: '农家小炒黄牛肉', emoji: '🥩', cover: '',
    desc: '嫩滑鲜香，辣而不燥', calories: 480,
    spicy: SPICY, flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '黄牛肉', amount: '200g' }, { name: '小米辣', amount: '5个' },
      { name: '香菜', amount: '1把' }, { name: '蚝油', amount: '1勺' }
    ],
    steps: ['牛肉切薄片，用淀粉生抽腌10分钟', '热油快炒至变色盛出', '爆香小米辣，下牛肉和香菜翻炒出锅']
  },

  // ===== 热菜 =====
  {
    id: 'hot1', category: '热菜', name: '红烧肉', emoji: '🍖', cover: '',
    desc: '肥而不腻，入口即化', calories: 560,
    spicy: ['不辣'], flavor: ['偏甜', '偏咸'], noteAllowed: true,
    ingredients: [
      { name: '五花肉', amount: '500g' }, { name: '冰糖', amount: '30g' },
      { name: '生抽', amount: '2勺' }, { name: '老抽', amount: '1勺' }, { name: '姜', amount: '3片' }
    ],
    steps: ['五花肉焯水切块', '冰糖炒糖色，下肉块上色', '加生抽老抽姜葱和热水炖40分钟', '大火收汁至浓稠']
  },
  {
    id: 'hot2', category: '热菜', name: '糖醋里脊', emoji: '🍤', cover: '',
    desc: '外酥里嫩，酸甜可口', calories: 480,
    spicy: ['不辣'], flavor: ['偏甜', '偏酸'], noteAllowed: true,
    ingredients: [
      { name: '里脊肉', amount: '300g' }, { name: '番茄酱', amount: '3勺' },
      { name: '白醋', amount: '1勺' }, { name: '白糖', amount: '2勺' }, { name: '淀粉', amount: '适量' }
    ],
    steps: ['里脊切条裹淀粉，炸两遍至金黄', '番茄酱加糖醋调汁熬稠', '倒入里脊快速翻匀出锅']
  },
  {
    id: 'hot3', category: '热菜', name: '宫保鸡丁', emoji: '🍗', cover: '',
    desc: '酸甜微辣，花生脆香', calories: 430,
    spicy: SPICY, flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '鸡胸肉', amount: '250g' }, { name: '花生米', amount: '50g' },
      { name: '干辣椒', amount: '8个' }, { name: '宫保汁', amount: '生抽醋糖淀粉调匀' }
    ],
    steps: ['鸡丁用淀粉生抽腌好滑炒盛出', '爆香干辣椒，下花生米', '回锅鸡丁，淋宫保汁翻炒收汁']
  },

  // ===== 素菜 =====
  {
    id: 'veg1', category: '素菜', name: '干煸四季豆', emoji: '🫛', cover: '',
    desc: '干香入味，爽脆下饭', calories: 210,
    spicy: SPICY, flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '四季豆', amount: '300g' }, { name: '肉末', amount: '50g' },
      { name: '芽菜', amount: '30g' }, { name: '干辣椒', amount: '3个' }
    ],
    steps: ['四季豆炸至表面起皱盛出', '炒香肉末、芽菜和干辣椒', '下四季豆调味翻炒均匀']
  },
  {
    id: 'veg2', category: '素菜', name: '蒜蓉西兰花', emoji: '🥦', cover: '',
    desc: '清淡爽口，蒜香十足', calories: 120,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '西兰花', amount: '1颗' }, { name: '蒜末', amount: '适量' }, { name: '盐', amount: '少许' }
    ],
    steps: ['西兰花掰小朵焯水1分钟', '爆香蒜末，下西兰花', '加盐快速翻炒出锅']
  },
  {
    id: 'veg3', category: '素菜', name: '地三鲜', emoji: '🍆', cover: '',
    desc: '咸鲜软糯，东北家常', calories: 260,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '土豆', amount: '1个' }, { name: '茄子', amount: '1根' },
      { name: '青椒', amount: '1个' }, { name: '酱油', amount: '1勺' }
    ],
    steps: ['土豆茄子切滚刀块炸好', '爆香下青椒和炸好的三鲜', '调酱汁焖煮收汁']
  },

  // ===== 凉菜 =====
  {
    id: 'cold1', category: '凉菜', name: '拍黄瓜', emoji: '🥒', cover: '',
    desc: '清爽解腻，三分钟搞定', calories: 90,
    spicy: ['不辣', '微辣', '中辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '黄瓜', amount: '2根' }, { name: '蒜', amount: '3瓣' },
      { name: '生抽香醋', amount: '各1勺' }, { name: '辣椒油', amount: '适量' }
    ],
    steps: ['黄瓜拍裂切段', '蒜剁蓉加生抽香醋调汁', '淋汁拌匀腌5分钟入味']
  },
  {
    id: 'cold2', category: '凉菜', name: '凉拌木耳', emoji: '🍄', cover: '',
    desc: '爽脆酸辣，开胃佳品', calories: 80,
    spicy: ['不辣', '微辣', '中辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '木耳', amount: '100g' }, { name: '洋葱', amount: '半个' },
      { name: '香菜', amount: '1把' }, { name: '香醋', amount: '1勺' }
    ],
    steps: ['木耳泡发焯熟过凉', '配洋葱丝香菜段', '调酸辣汁拌匀']
  },
  {
    id: 'cold3', category: '凉菜', name: '皮蛋豆腐', emoji: '🥚', cover: '',
    desc: '嫩滑鲜香，零失败', calories: 150,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '嫩豆腐', amount: '1盒' }, { name: '皮蛋', amount: '2个' },
      { name: '生抽', amount: '1勺' }, { name: '香油', amount: '几滴' }
    ],
    steps: ['豆腐切块摆盘', '皮蛋切瓣放在豆腐上', '淋生抽香油撒葱花']
  },

  // ===== 小吃 =====
  {
    id: 'snack1', category: '小吃', name: '炸薯条', emoji: '🍟', cover: '',
    desc: '外脆里软，蘸番茄酱绝配', calories: 320,
    spicy: ['不辣'], flavor: ['原味', '偏咸'], noteAllowed: true,
    ingredients: [
      { name: '土豆', amount: '2个' }, { name: '盐', amount: '少许' }, { name: '番茄酱', amount: '适量' }
    ],
    steps: ['土豆切条泡水去淀粉', '煮2分钟沥干冷冻变硬', '油炸至金黄撒盐']
  },
  {
    id: 'snack2', category: '小吃', name: '春卷', emoji: '🥟', cover: '',
    desc: '酥脆鲜香，一口一个', calories: 280,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '春卷皮', amount: '10张' }, { name: '韭菜豆芽肉末', amount: '适量' }, { name: '油', amount: '适量' }
    ],
    steps: ['馅料炒熟放凉', '包入春卷皮封口', '油炸至金黄']
  },
  {
    id: 'snack3', category: '小吃', name: '章鱼小丸子', emoji: '🐙', cover: '',
    desc: '软糯弹牙，日式风味', calories: 250,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '低筋粉', amount: '100g' }, { name: '章鱼粒', amount: '适量' },
      { name: '高汤', amount: '150ml' }, { name: '木鱼花', amount: '适量' }
    ],
    steps: ['低粉加高汤调面糊', '模具放章鱼粒倒入面糊', '翻面烤熟，挤酱撒木鱼花']
  },

  // ===== 主食 =====
  {
    id: 'stap1', category: '主食', name: '米饭', emoji: '🍚', cover: '',
    desc: '粒粒分明，百搭主角', calories: 230,
    spicy: ['不辣'], flavor: ['原味'], noteAllowed: false,
    ingredients: [ { name: '大米', amount: '1杯' }, { name: '水', amount: '米量的1.2倍' } ],
    steps: ['米洗净', '加水（米:水≈1:1.2）', '电饭煲煮熟焖5分钟']
  },
  {
    id: 'stap2', category: '主食', name: '蛋炒饭', emoji: '🍳', cover: '',
    desc: '粒粒裹蛋，简单满足', calories: 350,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '米饭', amount: '1碗' }, { name: '鸡蛋', amount: '2个' },
      { name: '葱', amount: '适量' }, { name: '盐', amount: '少许' }
    ],
    steps: ['蛋液炒散盛出', '下米饭炒散至粒粒分明', '回锅加蛋、葱、盐翻炒']
  },
  {
    id: 'stap3', category: '主食', name: '阳春面', emoji: '🍜', cover: '',
    desc: '清汤挂面，朴素暖胃', calories: 300,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '细面', amount: '1把' }, { name: '葱', amount: '适量' },
      { name: '生抽猪油', amount: '各1勺' }, { name: '高汤', amount: '1碗' }
    ],
    steps: ['碗里放生抽、猪油、葱花', '冲入热高汤', '面煮熟捞入汤中']
  },

  // ===== 饮料 =====
  {
    id: 'drink1', category: '饮料', name: '可乐', emoji: '🥤', cover: '',
    desc: '冰爽气泡，快乐水', calories: 140,
    spicy: [], flavor: DRINK_FLAVOR, noteAllowed: false,
    ingredients: [ { name: '可乐', amount: '1罐' }, { name: '冰块', amount: '适量' } ],
    steps: ['杯中加冰', '倒入可乐即可']
  },
  {
    id: 'drink2', category: '饮料', name: '鲜榨橙汁', emoji: '🍊', cover: '',
    desc: '维C满满，天然清甜', calories: 110,
    spicy: [], flavor: DRINK_FLAVOR, noteAllowed: false,
    ingredients: [ { name: '橙子', amount: '3个' }, { name: '冰糖水', amount: '少许' } ],
    steps: ['橙子榨汁', '加少许冰糖水搅匀']
  },
  {
    id: 'drink3', category: '饮料', name: '柠檬茶', emoji: '🍋', cover: '',
    desc: '酸甜解腻，冰镇更佳', calories: 90,
    spicy: [], flavor: DRINK_FLAVOR, noteAllowed: false,
    ingredients: [ { name: '红茶', amount: '1包' }, { name: '柠檬', amount: '2片' }, { name: '蜂蜜', amount: '1勺' } ],
    steps: ['红茶泡浓放凉', '加柠檬片和蜂蜜', '冷藏后饮用']
  },

  // ===== 海鲜 =====
  {
    id: 'sea1', category: '海鲜', name: '清蒸鲈鱼', emoji: '🐠', cover: '',
    desc: '鲜嫩原味，宴客硬菜', calories: 220,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '鲈鱼', amount: '1条' }, { name: '姜葱', amount: '适量' }, { name: '蒸鱼豉油', amount: '2勺' }
    ],
    steps: ['鱼改刀铺姜葱', '蒸8分钟倒掉腥水', '淋蒸鱼豉油和热油']
  },
  {
    id: 'sea2', category: '海鲜', name: '蒜蓉粉丝虾', emoji: '🦐', cover: '',
    desc: '蒜香扑鼻，鲜掉眉毛', calories: 260,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '基围虾', amount: '10只' }, { name: '粉丝', amount: '1把' },
      { name: '蒜蓉', amount: '适量' }, { name: '蒸鱼豉油', amount: '1勺' }
    ],
    steps: ['粉丝泡软垫底，摆上开背虾', '铺金银蒜蓉', '蒸6分钟淋豉油和热油']
  },
  {
    id: 'sea3', category: '海鲜', name: '辣炒花蛤', emoji: '🦪', cover: '',
    desc: '鲜辣入味，一口一个', calories: 180,
    spicy: SPICY, flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '花蛤', amount: '500g' }, { name: '干辣椒', amount: '5个' },
      { name: '蒜', amount: '适量' }, { name: '豆瓣酱', amount: '1勺' }
    ],
    steps: ['花蛤吐沙焯至开口', '爆香辣椒蒜和豆瓣酱', '下花蛤翻炒调味出锅']
  },

  // ===== 烧烤 =====
  {
    id: 'bbq1', category: '烧烤', name: '烤羊肉串', emoji: '🍢', cover: '',
    desc: '孜然飘香，外焦里嫩', calories: 300,
    spicy: ['微辣', '中辣', '特辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '羊肉', amount: '300g' }, { name: '孜然粉', amount: '适量' },
      { name: '辣椒面', amount: '适量' }, { name: '盐', amount: '少许' }
    ],
    steps: ['羊肉切块串签', '炭火烤至变色', '撒孜然、辣椒面和盐']
  },
  {
    id: 'bbq2', category: '烧烤', name: '烤茄子', emoji: '🌑', cover: '',
    desc: '蒜香软糯，烧烤摊必点', calories: 160,
    spicy: ['不辣', '微辣', '中辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '茄子', amount: '2根' }, { name: '蒜蓉', amount: '适量' },
      { name: '生抽', amount: '1勺' }, { name: '葱花', amount: '适量' }
    ],
    steps: ['茄子烤软剖开', '铺蒜蓉酱', '回炉烤香撒葱花']
  },
  {
    id: 'bbq3', category: '烧烤', name: '烤韭菜', emoji: '🌿', cover: '',
    desc: '翠绿鲜香，越吃越香', calories: 110,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '韭菜', amount: '1把' }, { name: '孜然', amount: '适量' },
      { name: '盐', amount: '少许' }, { name: '油', amount: '少许' }
    ],
    steps: ['韭菜洗净串签刷油', '烤软撒孜然和盐']
  },

  // ===== 新疆菜 =====
  {
    id: 'xj1', category: '新疆菜', name: '大盘鸡', emoji: '🍗', cover: '',
    desc: '土豆软糯，辣香过瘾', calories: 450,
    spicy: SPICY, flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '鸡块', amount: '500g' }, { name: '土豆', amount: '2个' },
      { name: '青椒', amount: '1个' }, { name: '干辣椒', amount: '适量' }, { name: '生抽', amount: '2勺' }
    ],
    steps: ['鸡块炒香上色', '加土豆辣椒和调料炖煮', '收汁撒青椒出锅']
  },
  {
    id: 'xj2', category: '新疆菜', name: '烤馕', emoji: '🫓', cover: '',
    desc: '外脆内软，麦香十足', calories: 280,
    spicy: [], flavor: ['原味'], noteAllowed: false,
    ingredients: [ { name: '面粉', amount: '300g' }, { name: '酵母', amount: '3g' }, { name: '芝麻', amount: '适量' } ],
    steps: ['和面发酵', '擀饼戳花撒芝麻', '贴馕坑烤至金黄']
  },
  {
    id: 'xj3', category: '新疆菜', name: '羊肉手抓饭', emoji: '🍚', cover: '',
    desc: '油亮喷香，羊肉软烂', calories: 400,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '羊肉', amount: '300g' }, { name: '胡萝卜', amount: '2根' },
      { name: '洋葱', amount: '1个' }, { name: '大米', amount: '2杯' }, { name: '孜然', amount: '适量' }
    ],
    steps: ['炒羊肉与蔬菜出香', '加米和水焖煮', '熟透拌匀']
  },

  // ===== 陕西菜 =====
  {
    id: 'sx1', category: '陕西菜', name: '肉夹馍', emoji: '🥙', cover: '',
    desc: '腊汁肉香，馍脆汁浓', calories: 350,
    spicy: ['不辣', '微辣', '中辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '白吉馍', amount: '1个' }, { name: '腊汁肉', amount: '150g' }, { name: '青椒', amount: '适量' }
    ],
    steps: ['腊汁肉炖烂剁碎', '夹入掰开的馍', '加青椒提香']
  },
  {
    id: 'sx2', category: '陕西菜', name: '凉皮', emoji: '🍜', cover: '',
    desc: '筋道爽滑，酸辣开胃', calories: 220,
    spicy: ['不辣', '微辣', '中辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '凉皮', amount: '1份' }, { name: '面筋', amount: '适量' },
      { name: '黄瓜', amount: '半根' }, { name: '辣椒油', amount: '1勺' }, { name: '香醋', amount: '1勺' }
    ],
    steps: ['凉皮切条', '配面筋黄瓜丝', '淋醋辣油汁拌匀']
  },
  {
    id: 'sx3', category: '陕西菜', name: '羊肉泡馍', emoji: '🍲', cover: '',
    desc: '汤浓馍香，暖身饱腹', calories: 380,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '馍', amount: '1个' }, { name: '羊肉汤', amount: '1碗' },
      { name: '粉丝', amount: '适量' }, { name: '黄花菜', amount: '适量' }
    ],
    steps: ['馍掰碎', '羊肉汤煮粉丝黄花', '浇汤撒葱花']
  },

  // ===== 河南菜 =====
  {
    id: 'hd1', category: '河南菜', name: '胡辣汤', emoji: '🥣', cover: '',
    desc: '辛香滚烫，晨起一碗', calories: 120,
    spicy: ['微辣', '中辣', '特辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '牛肉', amount: '100g' }, { name: '木耳', amount: '适量' },
      { name: '黄花菜', amount: '适量' }, { name: '胡椒', amount: '1勺' }, { name: '淀粉', amount: '适量' }
    ],
    steps: ['熬煮牛肉高汤', '下木耳黄花', '勾芡加胡椒调味']
  },
  {
    id: 'hd2', category: '河南菜', name: '烩面', emoji: '🍜', cover: '',
    desc: '汤鲜面筋，河南名片', calories: 330,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '面', amount: '1团' }, { name: '羊肉汤', amount: '1碗' },
      { name: '木耳', amount: '适量' }, { name: '豆腐丝', amount: '适量' }
    ],
    steps: ['拉面成片', '入羊肉汤煮熟', '加木耳豆腐丝']
  },
  {
    id: 'hd3', category: '河南菜', name: '灌汤包', emoji: '🥟', cover: '',
    desc: '皮薄汤多，一口爆汁', calories: 280,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '面粉', amount: '200g' }, { name: '猪肉馅', amount: '200g' },
      { name: '皮冻', amount: '100g' }, { name: '姜', amount: '适量' }
    ],
    steps: ['调馅拌入皮冻', '包成提褶小包', '蒸8分钟']
  },

  // ===== 四川菜 =====
  {
    id: 'sc1', category: '四川菜', name: '麻婆豆腐', emoji: '🌶️', cover: '',
    desc: '麻香辣嫩，经典川味', calories: 250,
    spicy: ['微辣', '中辣', '特辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '豆腐', amount: '1块' }, { name: '牛肉末', amount: '80g' },
      { name: '豆瓣酱', amount: '1勺' }, { name: '花椒', amount: '适量' }
    ],
    steps: ['炒肉末豆瓣出红油', '下豆腐烧入味', '撒花椒粉葱花']
  },
  {
    id: 'sc2', category: '四川菜', name: '水煮鱼', emoji: '🐟', cover: '',
    desc: '鱼片滑嫩，麻辣鲜香', calories: 420,
    spicy: ['中辣', '特辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '鱼片', amount: '300g' }, { name: '豆芽', amount: '200g' },
      { name: '干辣椒', amount: '适量' }, { name: '花椒', amount: '适量' }, { name: '豆瓣', amount: '1勺' }
    ],
    steps: ['鱼片滑熟垫豆芽', '铺辣椒花椒', '浇热油激香']
  },
  {
    id: 'sc3', category: '四川菜', name: '夫妻肺片', emoji: '🥩', cover: '',
    desc: '红油透亮，麻辣鲜香', calories: 300,
    spicy: ['微辣', '中辣', '特辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '牛杂', amount: '300g' }, { name: '红油', amount: '2勺' },
      { name: '花椒', amount: '适量' }, { name: '芝麻', amount: '适量' }
    ],
    steps: ['牛杂卤熟切薄片', '淋红油花椒', '撒芝麻葱花']
  },

  // ===== 海南菜 =====
  {
    id: 'hi1', category: '海南菜', name: '文昌鸡', emoji: '🐔', cover: '',
    desc: '皮爽肉滑，蘸料一绝', calories: 320,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '文昌鸡', amount: '半只' }, { name: '姜葱', amount: '适量' }, { name: '盐', amount: '少许' }
    ],
    steps: ['整鸡浸熟过冰水', '斩件摆盘', '配姜葱蘸料']
  },
  {
    id: 'hi2', category: '海南菜', name: '椰子鸡', emoji: '🥥', cover: '',
    desc: '清甜滋补，汤鲜肉嫩', calories: 300,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '鸡肉', amount: '500g' }, { name: '椰子水', amount: '2个' },
      { name: '红枣', amount: '适量' }, { name: '枸杞', amount: '适量' }
    ],
    steps: ['椰子水入锅', '下鸡块红枣枸杞', '清炖20分钟']
  },
  {
    id: 'hi3', category: '海南菜', name: '清补凉', emoji: '🥥', cover: '',
    desc: '椰香清甜，消暑首选', calories: 180,
    spicy: [], flavor: DRINK_FLAVOR, noteAllowed: false,
    ingredients: [
      { name: '椰奶', amount: '1杯' }, { name: '红豆', amount: '适量' },
      { name: '绿豆', amount: '适量' }, { name: '水果', amount: '适量' }, { name: '薏米', amount: '适量' }
    ],
    steps: ['配料煮熟放凉', '碗里加椰奶', '拌匀即可']
  },

  // ===== 广东菜 =====
  {
    id: 'gd1', category: '广东菜', name: '白切鸡', emoji: '🐔', cover: '',
    desc: '原汁原味，皮爽骨香', calories: 300,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '三黄鸡', amount: '半只' }, { name: '姜葱', amount: '适量' }, { name: '盐', amount: '少许' }
    ],
    steps: ['浸鸡至熟过冰', '斩件', '蘸姜葱蓉']
  },
  {
    id: 'gd2', category: '广东菜', name: '虾饺', emoji: '🥟', cover: '',
    desc: '晶莹剔透，鲜虾弹牙', calories: 200,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '虾仁', amount: '200g' }, { name: '澄粉', amount: '150g' }, { name: '笋丁', amount: '适量' }
    ],
    steps: ['虾仁剁泥调味', '澄粉包成弯梳饺', '蒸8分钟']
  },
  {
    id: 'gd3', category: '广东菜', name: '肠粉', emoji: '🍥', cover: '',
    desc: '滑嫩米香，酱汁鲜甜', calories: 220,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '米浆', amount: '1碗' }, { name: '虾仁/牛肉', amount: '适量' }, { name: '酱油', amount: '1勺' }
    ],
    steps: ['米浆蒸成薄皮', '卷入馅料', '淋酱油']
  },

  // ===== 内蒙菜 =====
  {
    id: 'nm1', category: '内蒙菜', name: '手把肉', emoji: '🍖', cover: '',
    desc: '原味羊肉，手抓蘸盐', calories: 480,
    spicy: ['不辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '羊肉', amount: '500g' }, { name: '盐', amount: '少许' }, { name: '葱', amount: '适量' }
    ],
    steps: ['羊肉冷水下锅', '撇沫煮熟', '手把蘸盐吃']
  },
  {
    id: 'nm2', category: '内蒙菜', name: '蒙古奶茶', emoji: '🥛', cover: '',
    desc: '咸香醇厚，草原风味', calories: 150,
    spicy: [], flavor: ['原味', '咸口'], noteAllowed: false,
    ingredients: [
      { name: '砖茶', amount: '适量' }, { name: '牛奶', amount: '1杯' }, { name: '盐', amount: '少许' }
    ],
    steps: ['熬煮砖茶', '加牛奶煮沸', '加盐调味']
  },
  {
    id: 'nm3', category: '内蒙菜', name: '莜面窝窝', emoji: '🍲', cover: '',
    desc: '筋道莜面，浇臊子香', calories: 260,
    spicy: ['不辣', '微辣'], flavor: FLAVOR, noteAllowed: true,
    ingredients: [
      { name: '莜面', amount: '200g' }, { name: '羊肉臊子', amount: '适量' }
    ],
    steps: ['莜面推成卷蒸', '蒸熟摆盘', '浇羊肉臊子']
  }
];

// 自动推导菜品图路径：约定按「菜品id.jpg」放在 assets/images/ 下。
// 例如 剁椒鱼头(id=hn1) 对应 assets/images/hn1.jpg。
// 文件不存在时，渲染处会自动回退到 emoji，无需改代码；你把图放进去即生效。
MENU.forEach(d => {
  if (!d.cover) d.cover = '/assets/images/' + d.id + '.jpg';
});

// 分类顺序（点餐窗口分类 tab 按此排列）
const CATEGORIES = [
  '湘菜', '热菜', '素菜', '凉菜', '小吃', '主食', '饮料', '海鲜', '烧烤',
  '新疆菜', '陕西菜', '河南菜', '四川菜', '海南菜', '广东菜', '内蒙菜'
];

module.exports = { MENU, CATEGORIES };
