// pages/comments/comments.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:'600dd1e9-5a39-4c45-bfe3-1b68490f7ec9',
    goodsId:'',
    comments:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    this.setData({
      oid: options.oid
    })

    this.setData({
      oid: options.goodsId
    })
    let params = {}
    if (this.data.oid != ''){
      params.oid = this.data.oid
    }

    if (this.data.goodsId != '') {
      params.goodsId = this.data.goodsId
    }
    
    wx.request({
      url: app.globalData.baseUrl + '/comments',
      method: 'get',
      data: params,
      success(res) {
        console.log(res)
        _this.setData({ comments:res.data.page.records})
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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