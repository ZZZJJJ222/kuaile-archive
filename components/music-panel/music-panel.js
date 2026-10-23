const music = require('../../utils/music.js');

Component({
  properties: {
    show: { type: Boolean, value: false }
  },
  data: {
    list: [],
    playing: false,
    volume: 0.6,
    currentIndex: -1
  },
  lifetimes: {
    attached() {
      this.setData({ list: music.getList(), volume: 0.6 });
    }
  },
  methods: {
    togglePlay() {
      if (this.data.playing) {
        music.pause();
        this.setData({ playing: false });
      } else {
        const i = music.play(this.data.currentIndex >= 0 ? this.data.currentIndex : 0);
        if (i >= 0) this.setData({ playing: true, currentIndex: i });
      }
    },
    onVolume(e) {
      const v = e.detail.value / 100;
      music.setVolume(v);
      this.setData({ volume: v });
    },
    pick(e) {
      const i = Number(e.currentTarget.dataset.i);
      const idx = music.play(i);
      if (idx >= 0) this.setData({ playing: true, currentIndex: idx });
    },
    close() {
      this.triggerEvent('close');
    },
    noop() {}
  }
});
