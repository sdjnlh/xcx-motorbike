// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 3,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindGetUserInfo(e) {
    let _this = this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      console.log("用户按了允许授权按钮")

      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            let param = e.detail.userInfo
            param.code = res.code
            param.appid = 'wx0a159bf1ae8eadbf'
            wx.request({
              url: 'http://localhost:8888/api/v1/wx/login',
              data: param,
              success(res) {
                console.log('登录成功', res.data)
                wx.setStorageSync('user', res.data)
                _this.setData({
                  user: res.data
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      console.log("//用户按了拒绝按钮")
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let cache = wx.getStorageSync('user')
    this.setData({
      user: cache
    })
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
    if (event.detail === 1) {
      wx.navigateTo({
        url: pages[event.detail],
      })
    } else {
      wx.reLaunch({
        url: pages[event.detail],
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})