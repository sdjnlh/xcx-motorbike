//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    active: 0,
    show: true,
    items:[]
  },
  onLoad() {
    console.log('app.globalData.baseUrl', app.globalData.baseUrl)
    let _this = this
    wx.request({
      url: app.globalData.baseUrl + '/goods', // 拼接接口地址(前面为公共部分)
      method: 'get',
      success(res) {
        if (res) {
          console.log(res.data) // 打印查看是否请求到接口数据
          _this.setData({ items: res.data.page.records})

        } else {
          console.log('没有数据')
        }
      }
    })
  },
  toShop() {
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  toQueue() {

  },
  toAll() {
    wx.navigateTo({
      url: '/pages/all/all',
    })
  },
  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({
      close: false
    });
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
    if (event.detail === 1){
      wx.navigateTo({
        url: pages[event.detail],
      })
    }else{
      wx.reLaunch({
        url: pages[event.detail],
      })
    }
   
  }
});