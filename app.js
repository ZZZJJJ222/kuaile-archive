const { THEMES } = require('./utils/theme.js');

App({
  globalData: {
    themeKey: 'cream',
    cart: [],
    // 背景音乐歌单：音频改为网络地址（本地 mp3 已排除出包以减小体积）
    // 域名 xcx1-1516011251.cos.ap-shanghai.myqcloud.com 需在小程序后台
    // 「开发设置 → downloadFile 合法域名」添加；开发者工具可勾「不校验合法域名」本地测。
    // 注意：音频版权归原作者所有，仅个人学习使用，正式发布请确认授权。
    musicList: [
      { name: '舌尖上的中国', src: 'https://xcx1-1516011251.cos.ap-shanghai.myqcloud.com/music01.mp3' },
      { name: '舌尖上的中国', src: 'https://xcx1-1516011251.cos.ap-shanghai.myqcloud.com/music02.mp3' },
      { name: '舌尖上的中国', src: 'https://xcx1-1516011251.cos.ap-shanghai.myqcloud.com/music03.mp3' }
    ]
  },

  onLaunch() {
    const t = wx.getStorageSync('themeKey');
    if (t) this.globalData.themeKey = t;

    const cart = wx.getStorageSync('cart');
    if (Array.isArray(cart)) this.globalData.cart = cart;
  },

  // 切换主题：写入全局 + 本地存储，并刷新当前可见页面
  applyTheme(key) {
    if (!THEMES.some(t => t.key === key)) return;
    this.globalData.themeKey = key;
    wx.setStorageSync('themeKey', key);
    const pages = getCurrentPages();
    if (pages.length) {
      pages[pages.length - 1].setData({ themeKey: key });
    }
  }
});
