const store = require('../../utils/store.js');
const ex = require('../../utils/exercise.js');
const app = getApp();

Page({
  data: {
    themeKey: 'cream',
    cart: [],
    totalCount: 0,
    totalCalories: 0,
    exercises: []
  },

  onShow() {
    this.setData({ themeKey: app.globalData.themeKey });
    this.load();
  },

  load() {
    const cart = store.getCart().map(i => ({ ...i, imgError: false }));
    const totalCount = cart.reduce((s, i) => s + i.qty, 0);
    const totalCalories = cart.reduce((s, i) => s + i.qty * (i.calories || 0), 0);
    this.setData({
      cart,
      totalCount,
      totalCalories,
      exercises: ex.calc(totalCalories) // 用总热量换算运动消耗
    });
  },

  stepQty(e) {
    const k = e.currentTarget.dataset.k;
    const d = Number(e.currentTarget.dataset.d);
    const item = this.data.cart.find(i => i._key === k);
    if (item) store.updateQty(k, item.qty + d);
    this.load();
  },

  onOrderImgError(e) {
    // 订单图片缺失则回退到 emoji
    const k = e.currentTarget.dataset.k;
    const key = 'cart[' + this.data.cart.findIndex(i => i._key === k) + '].imgError';
    this.setData({ [key]: true });
  },

  clearAll() {
    wx.showModal({
      title: '清空订单',
      content: '确定清空所有已点菜品？',
      success: (r) => {
        if (r.confirm) {
          store.clearCart();
          this.load();
        }
      }
    });
  }
});
