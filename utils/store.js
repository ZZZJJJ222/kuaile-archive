// 购物车（纯前端，存本地 Storage）
// 同一道菜，口味/备注完全一致才合并数量，否则作为独立条目
function getCart() {
  return getApp().globalData.cart || [];
}

function saveCart(cart) {
  getApp().globalData.cart = cart;
  wx.setStorageSync('cart', cart);
}

function addToCart(item) {
  const cart = getCart();
  const key = `${item.id}__${item.spicy}__${item.flavor}__${item.note || ''}`;
  const exist = cart.find(i => i._key === key);
  if (exist) {
    exist.qty += item.qty;
  } else {
    cart.push(Object.assign({ _key: key }, item));
  }
  saveCart(cart);
  return cart;
}

function updateQty(key, qty) {
  const cart = getCart();
  const i = cart.find(c => c._key === key);
  if (i) {
    if (qty <= 0) {
      cart.splice(cart.indexOf(i), 1);
    } else {
      i.qty = qty;
    }
  }
  saveCart(cart);
  return cart;
}

function clearCart() {
  saveCart([]);
  return [];
}

function getCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

module.exports = { getCart, saveCart, addToCart, updateQty, clearCart, getCount };
