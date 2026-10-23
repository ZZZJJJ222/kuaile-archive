const { THEMES } = require('../../utils/theme.js');

Component({
  properties: {
    show: { type: Boolean, value: false }
  },
  data: {
    themes: THEMES,
    current: ''
  },
  lifetimes: {
    attached() {
      this.setData({ current: getApp().globalData.themeKey });
    }
  },
  methods: {
    pick(e) {
      const key = e.currentTarget.dataset.key;
      getApp().applyTheme(key); // 写入全局 + 本地 + 刷新当前页
      this.setData({ current: key });
    },
    close() {
      this.triggerEvent('close');
    },
    noop() {}
  }
});
