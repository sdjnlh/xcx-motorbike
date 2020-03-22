const util = require('../../utils/util.js')
const app = getApp()
// pages/order-creator/creator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    order: {
      total: 0
    },
    show: false,
    actions: [{
        name: '带走'
      },
      {
        name: '单人桌'
      },
      {
        name: '双人桌'
      },
      {
        name: '三人桌'
      },
      {
        name: '四人桌'
      },
    ]
  },
  showActionSheet() {
    this.setData({
      show: true
    })
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

  prepare() {

    let params = {
      queueType: this.data.order.queueType
    }
    let _this = this
    // 查询后台排队算法
    wx.request({
      url: app.globalData.baseUrl + '/order/prepare', // 拼接接口地址(前面为公共部分)
      method: 'get',
      data: params,
      success(res) {
        if (res) {
          let queue = res.data.data.count
          _this.data.order.queue = queue
          _this.setData({
            order: _this.data.order
          })
        } else {
          console.log('没有数据')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let cart = wx.getStorageSync('cart')

    this.setData({
      cart: cart
    })
    this.data.order.created = util.formatTime(new Date())
    let total = 0
    for (let c of cart) {
      total += c.price * c.count
    }
    total = total.toFixed(2)
    this.data.order.total = total
    this.data.order.queueType = '带走'

    this.setData({
      order: this.data.order
    })
    this.prepare()



  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    console.log(event.detail);
    this.data.order.queueType = event.detail.name
    this.setData({
      order: this.data.order
    })
    this.prepare()
  },

  createOrder() {
    let user = wx.getStorageSync('user')
    // 创建订单
    let _this = this
    delete _this.data.order.created
    this.data.order.number = this.data.cart.length + 1
    this.data.order.meta = JSON.stringify(this.data.cart)
    this.data.order.uid = user.id
    // 查询后台排队算法
    wx.request({
      url: app.globalData.baseUrl + '/order', // 拼接接口地址(前面为公共部分)
      method: 'post',
      data: [_this.data.order],
      success(res) {
        console.log('订单创建成功')
        wx.setStorageSync('cart', [])
        wx.reLaunch({
          url: '/pages/order/order',
        })
      }
    })
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