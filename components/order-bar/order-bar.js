Component({
  properties: {
    count: { type: Number, value: 0 },
    calories: { type: Number, value: 0 }
  },
  methods: {
    goOrder() {
      wx.switchTab({ url: '/pages/order/order' });
    }
  }
});
