// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    total:0,
    cart:[]
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
    let pages = [
      '/pages/index/index',
      '/pages/cart/cart',
      '/pages/order/order',
      '/pages/mine/mine'
    ]
    wx.reLaunch({
      url: pages[event.detail],
    })
    this.syncCart()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  stepChange(res){
    let item = res.currentTarget.dataset.item
    let index = res.currentTarget.dataset.index
    let cart = this.data.cart
    if(res.detail===0){
      // 删除
      cart.splice(index,1)
    }else{
      for (let c of cart){
        if(c.id === item.id){
          c.count = res.detail
        }
      }

    }
    this.setData({cart:cart})
    wx.setStorage({
      key: 'cart',
      data: cart,
    })
    this.syncCart(cart)
  },
  onSubmit(){
    wx.navigateTo({
      url: '/pages/order-creator/creator',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cart = wx.getStorageSync('cart') || []
    this.setData({cart:cart})
    this.syncCart(cart)
  },
  syncCart(cart){
    let total = 0
    for (let c of cart){
      total += c.count * c.price * 100
    }
    this.setData({total:total})
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})