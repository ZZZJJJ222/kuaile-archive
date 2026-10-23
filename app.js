const { THEMES } = require('./utils/theme.js');

App({
  globalData: {
    themeKey: 'cream',
    cart: [],
    // 背景音乐歌单：把对应 mp3 放进 assets/audio，文件名与下面 src 一致即可
    // 命名用 music01~music05.mp3 纯 ASCII，避免中文文件名编码问题
    // 注意：音频版权归原作者所有，仅个人学习使用，正式发布请确认授权。
    musicList: [
      { name: '舌尖上的中国', src: '/assets/audio/music01.mp3' },
      { name: '舌尖上的中国', src: '/assets/audio/music02.mp3' },
      { name: '舌尖上的中国', src: '/assets/audio/music03.mp3' },
      { name: '舌尖上的中国', src: '/assets/audio/music04.mp3' },
      { name: '舌尖上的中国', src: '/assets/audio/music05.mp3' }
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
