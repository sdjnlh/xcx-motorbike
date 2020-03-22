const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    orders: []
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/order-detail/detail',
    })
  },
  tagChange(e) {
    console.log(e.detail.title)
    let status = e.detail.title
    if (status === '全部') {
      status = ''
    }
    this.loadData(status)
  },
  loadData(status) {
    let user = wx.getStorageSync('user')
    let _this = this

    wx.request({
      url: app.globalData.baseUrl + '/order', // 拼接接口地址(前面为公共部分)
      method: 'get',
      data: {
        status: status,
        uid: user.id
      },
      success(res) {
        console.log('res', )
        let orders = res.data.page.records
        for (let o of orders) {
          o.meta = JSON.parse(o.meta)
        }
        console.log('所有的订单', orders)
        _this.setData({
          orders: orders
        })
      }
    })
  },

  confirm(e) {
    let _this = this
    let item = e.currentTarget.dataset.item
    // item 确认取货
    console.log(item)
    item.status = '已完成'
    item.meta = JSON.stringify(item.meta)
    wx.request({
      url: app.globalData.baseUrl + '/order', // 拼接接口地址(前面为公共部分)
      method: 'put',
      data: [item],
      success(res) {
        console.log('res')
        _this.loadData('')
      }
    })

  },

  toComment(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/comment-creator/creator?oid=' + item.id,
    })
    console.log(item.id)
  },
  scanComments(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/comments/comments?oid=' + item.id,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.loadData('')
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