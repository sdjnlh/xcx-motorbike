import Dialog from '../../path/to/@vant/weapp/dist/dialog/dialog.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0,
    detail: '',
    oid: '',
    au: {
      maxHeight: 100,
      minHeight: 50
    }
  },
  rateChange(event) {
    this.setData({
      value: event.detail
    });
  },
  commentChange(event) {
    console.log(event.detail);
    this.setData({
      detail: event.detail
    });
  },
  createComment() {
    if (this.data.value === 0) {
      wx.showToast({
        title: '请选择评分！',
        icon: 'none',
        duration: 1500
      })
    } else {
      let comment = {}
      let user = wx.getStorageSync('user')
      comment.detail = this.data.detail === '' ? '该用户很懒，什么都没留下/(ㄒoㄒ)/~~' : this.data.detail
      comment.rate = this.data.value
      comment.nickname = user.nickName
      comment.coverUrl = user.avatarUrl
      comment.uid = user.id
      comment.oid = this.data.oid
      // todo 
      console.log('创建了一条评论', comment)

      wx.request({
        url: app.globalData.baseUrl + '/comments', 
        method: 'post',
        data: [comment],
        success(res) {
          wx.showToast({
            title: '创建成功',
            icon: 'none',
            duration: 1500
          })
          wx.navigateTo({
            url: '/pages/order/order',
          })
        }
      })

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      oid: options.oid
    })
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