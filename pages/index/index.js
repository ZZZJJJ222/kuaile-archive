const { MENU, CATEGORIES } = require('../../data/menu.js');
const store = require('../../utils/store.js');
const app = getApp();

Page({
  data: {
    themeKey: 'cream',
    mode: 'order',          // order=点餐窗口, make=制作窗口
    categories: CATEGORIES,
    activeCat: CATEGORIES[0],
    list: [],
    // 制作窗口
    makeKeyword: '',
    makeResult: null,
    makeImgError: false,
    // 面板
    showTheme: false,
    showMusic: false,
    // 底部购物条
    cartCount: 0,
    cartCalories: 0
  },

  onLoad() {
    this.setData({
      themeKey: app.globalData.themeKey,
      list: MENU.filter(d => d.category === CATEGORIES[0])
    });
  },

  onShow() {
    // 每次回到首页都同步主题与购物车（主题可能在订单页无变化，这里统一刷新）
    this.setData({ themeKey: app.globalData.themeKey });
    this.refreshCart();
  },

  switchMode(e) {
    this.setData({ mode: e.currentTarget.dataset.m });
  },

  switchCat(e) {
    const c = e.currentTarget.dataset.c;
    // 路径更新，避免整表重传
    this.setData({
      activeCat: c,
      list: MENU.filter(d => d.category === c)
    });
  },

  onAdd(e) {
    store.addToCart(e.detail);
    this.refreshCart();
    wx.showToast({ title: '已加入订单', icon: 'success' });
  },

  refreshCart() {
    const cart = store.getCart();
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const cal = cart.reduce((s, i) => s + i.qty * (i.calories || 0), 0);
    this.setData({ cartCount: count, cartCalories: cal });
  },

  // ===== 制作窗口 =====
  onMakeInput(e) {
    this.setData({ makeKeyword: e.detail.value });
  },
  onMakeSearch() {
    const kw = this.data.makeKeyword.trim();
    if (!kw) {
      this.setData({ makeResult: null });
      return;
    }
    const hit = MENU.find(d => d.name.indexOf(kw) >= 0 || d.category.indexOf(kw) >= 0);
    this.setData({ makeResult: hit || null, makeImgError: false });
    if (!hit) wx.showToast({ title: '没找到这道菜', icon: 'none' });
  },

  onMakeImgError() {
    // 制作窗口图片缺失则回退到 emoji
    this.setData({ makeImgError: true });
  },

  // ===== 面板 =====
  openTheme() { this.setData({ showTheme: true }); },
  openMusic() { this.setData({ showMusic: true }); },
  closeTheme() { this.setData({ showTheme: false }); },
  closeMusic() { this.setData({ showMusic: false }); }
});
