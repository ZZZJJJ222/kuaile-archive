// 原创可爱风主题皮肤（无第三方 IP，规避版权风险）
// 想加新皮肤：往 THEMES 里加一项即可，页面用 class="theme-{key}" 自动换肤
const THEMES = [
  { key: 'cream',      name: '奶油黄', decor: '🧁', desc: '温暖治愈' },
  { key: 'strawberry', name: '草莓粉', decor: '🍓', desc: '甜美少女' },
  { key: 'mint',       name: '薄荷绿', decor: '🌿', desc: '清爽自然' },
  { key: 'starry',     name: '星空蓝', decor: '🌟', desc: '安静高级' }
];

function getTheme(key) {
  return THEMES.find(t => t.key === key) || THEMES[0];
}

module.exports = { THEMES, getTheme };
