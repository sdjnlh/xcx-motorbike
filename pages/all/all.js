const app = getApp()
Page({
  data: {
    order:{total:0},
    activeKey: 0,
    type: '特色推荐',
    items: [],
    menus: ['特色推荐', '港式奶茶', '泰式奶茶', '热销']
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/goods-detail/goods',
    })
  },
  onLoad() {
    console.log('app.globalData.baseUrl', app.globalData.baseUrl)
    this.loadData()
  },
  stepChange(res) {
    let item = res.currentTarget.dataset.item
    let index = res.currentTarget.dataset.index
    this.doAdd(item, index, res.detail)
  },
  syncCart(){
    let cart = wx.getStorageSync('cart') || []
    console.log('this.cart', cart, 'this.data.items', this.data.items)
    for (let item of this.data.items) {
      let has = false
      for (let c of cart) {
        if (c.id === item.id) {
          item.count = c.count
          item.showStep = true
          has = true
        }
        if(!has){
          delete item.showStep
        }
      }
    }
    let total = 0
    for (let item of cart) {
      total += item.price * 100 * item.count
    }

    this.data.order.total = total
    this.setData({ order: this.data.order })
    this.setData({ items: this.data.items })
  },
  onSubmit() {
    wx.navigateTo({
      url: '/pages/order-creator/creator',
    })
  },
  doAdd(item,index,currentCount){
    let cart = wx.getStorageSync('cart') || []
    if(currentCount === 0){
      // 删除缓存  并且隐藏step
      let newCart = []
      for(let c of cart){
          if(c.id !== item.id){
            newCart.push(c)
          }
      }
      wx.setStorageSync('cart', newCart)
      this.syncCart()
      return
    }
    let has = false
    for (let c of cart) {
      if (c.id === item.id) {
        has = true
        c.count = currentCount
        item.count = currentCount
      }
    }
    if (!has) {
      // 不存在
      item.count = currentCount
      cart.push(item)
    }
    wx.setStorageSync('cart', cart)
    // 显示步进器
    item.showStep = true
    this.data.items[index] = item
    this.setData({ items: this.data.items })

    let total = 0
    // 计算订单价格
    for (let item of cart) {
      total += item.price * 100 * item.count
    }
    this.data.order.total = total
    this.setData({ order: this.data.order })
  },
  addToCart(res){
    let item = res.currentTarget.dataset.item
    let index = res.currentTarget.dataset.index
    this.doAdd(item, index,1)

  },
  loadData() {
    console.log('app.globalData.baseUrl', app.globalData.baseUrl)
    let _this = this
    wx.request({
      url: app.globalData.baseUrl + '/goods', // 拼接接口地址(前面为公共部分)
      method: 'get',
      data: {
        type: this.data.type
      },
      success(res) {
        if (res) {
          console.log(res.data) // 打印查看是否请求到接口数据
          _this.setData({
            items: res.data.page.records
          })
          _this.syncCart()

        } else {
          console.log('没有数据')
        }
      }
    })
  },
  onChange(event) {
    let type = this.data.menus[event.detail]
    this.setData({
      type: type
    })
    this.loadData()
  }
});