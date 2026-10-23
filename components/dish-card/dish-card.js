Component({
  properties: {
    dish: { type: Object, value: {} }
  },
  data: {
    qty: 1,
    spicy: '',
    flavor: '',
    note: '',
    imgError: false
  },
  // 切换菜品时重置选择（同 key 复用组件也会触发）
  observers: {
    'dish': function (dish) {
      if (dish && dish.spicy) {
        this.setData({
          qty: 1,
          spicy: (dish.spicy && dish.spicy[0]) || '',
          flavor: (dish.flavor && dish.flavor[0]) || '',
          note: '',
          imgError: false
        });
      }
    }
  },
  methods: {
    selectSpicy(e) { this.setData({ spicy: e.currentTarget.dataset.v }); },
    selectFlavor(e) { this.setData({ flavor: e.currentTarget.dataset.v }); },
    onNoteInput(e) { this.setData({ note: e.detail.value }); },
    stepQty(e) {
      const d = Number(e.currentTarget.dataset.d);
      // 最少 1 份
      const qty = Math.max(1, this.data.qty + d);
      this.setData({ qty });
    },
    onImgError() {
      // 图片缺失则回退到 emoji 占位
      this.setData({ imgError: true });
    },
    onAdd() {
      if (this.data.qty < 1) return;
      // 只把变化的数据传给父页面，符合 setData 最优写法
      this.triggerEvent('add', {
        id: this.data.dish.id,
        name: this.data.dish.name,
        emoji: this.data.dish.emoji,
        cover: this.data.dish.cover,
        calories: this.data.dish.calories,
        qty: this.data.qty,
        spicy: this.data.spicy,
        flavor: this.data.flavor,
        note: this.data.note
      });
    }
  }
});
