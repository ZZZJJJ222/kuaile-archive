// 热量 → 运动消耗换算（参考估算，以 60kg 成年人为参考）
// 每分钟消耗(kcal/min) ≈ MET × 3.5 × 体重(kg) / 200 = MET × 1.05（按 60kg）
const RATES = [
  { key: 'run',  name: '跑步(8km/h)', emoji: '🏃', kcalPerMin: 8.4 },
  { key: 'rope', name: '跳绳',         emoji: '🪢', kcalPerMin: 11.5 },
  { key: 'swim', name: '游泳(休闲)',    emoji: '🏊', kcalPerMin: 6.3 },
  { key: 'bike', name: '骑车(中速)',    emoji: '🚴', kcalPerMin: 7.3 },
  { key: 'walk', name: '快走(6km/h)',   emoji: '🚶', kcalPerMin: 4.5 }
];

// totalKcal: 总热量；返回各运动所需分钟数（向上取整，至少为 1）
function calc(totalKcal) {
  if (!totalKcal || totalKcal <= 0) return [];
  return RATES.map(r => ({
    key: r.key,
    name: r.name,
    emoji: r.emoji,
    minutes: Math.max(1, Math.ceil(totalKcal / r.kcalPerMin))
  }));
}

module.exports = { calc, RATES };
