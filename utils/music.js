// 背景音乐播放（单例）
// 曲目由用户稍后提供：把 mp3 放进 assets/audio，并在 app.js 的 globalData.musicList 配置
// 例如 musicList: [{ name:'轻音乐1', src:'/assets/audio/track1.mp3' }, ...]
let audio = null;

function getAudio() {
  if (!audio) {
    audio = wx.createInnerAudioContext();
    audio.onError(() => { wx.showToast({ title: '播放失败，请检查音频文件', icon: 'none' }); });
  }
  return audio;
}

function getList() {
  return getApp().globalData.musicList || [];
}

// 播放指定下标（循环）；无曲目返回 -1
function play(index) {
  const list = getList();
  if (!list.length) {
    wx.showToast({ title: '请先添加曲目', icon: 'none' });
    return -1;
  }
  const i = (index + list.length) % list.length;
  const item = list[i];
  const a = getAudio();
  a.src = item.src;
  if (typeof a.volume !== 'number') a.volume = 0.6;
  a.play();
  return i;
}

function pause() {
  if (audio) audio.pause();
}

function setVolume(v) {
  getAudio().volume = v;
}

function isPlaying() {
  return audio ? !audio.paused : false;
}

module.exports = { play, pause, setVolume, isPlaying, getList };
