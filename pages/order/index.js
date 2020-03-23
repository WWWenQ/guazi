// pages/order/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    navTitleList: ['待确认', '待运输', '待收车', '全部订单'],
    curIndex: 0,
    isFromSaveOrder: false,
    readyToConfirmOrder: [],
    confirmedOrders: [],
    readyToReceivedOrders: [],
    allOfOrders: [],
    canceledConfirmedOrders: []
  },

  changeTitle(e) {
    this.setData({
      curIndex: e.currentTarget.dataset.index
    })
  },
  // 滑动切换
  bindChange: function(e) {
    this.setData({
      curIndex: e.detail.current
    });
  },

  // 点击确认下单按钮
  bindConfirmOrder(e) {
    const index = e.currentTarget.dataset.index;
    const nowStorageData = wx.getStorageSync('savedOrders');
    const storageData = wx.getStorageSync('savedOrders');
    storageData.splice(index, 1);
    this.setData({
      readyToConfirmOrder: storageData
    })
    wx.setStorage({
      key: 'savedOrders',
      data: storageData,
      success: function() {
        wx.showToast({
          title: '下单成功',
        })
      }
    })
    // 确认的订单存储到confirmedOrders里
    const confirmedOrder = nowStorageData[index];
    const confirmedOrdersInStorage = wx.getStorageSync('confirmedOrders');
    if (confirmedOrdersInStorage) {
      confirmedOrdersInStorage.unshift(confirmedOrder)
      wx.setStorageSync('confirmedOrders', confirmedOrdersInStorage)
    } else {
      const confirmedOrders = [];
      confirmedOrders.unshift(confirmedOrder)
      wx.setStorageSync('confirmedOrders', confirmedOrders)
    }
    this.setData({
      confirmedOrders: wx.getStorageSync('confirmedOrders')
    })
  },

  // 待运输订单里 点击取消下单按钮 
  bindCancelOrder(e) {
    const index = e.currentTarget.dataset.index;
    const nowStorageData = wx.getStorageSync('confirmedOrders');
    const storageData = wx.getStorageSync('confirmedOrders');
    storageData.splice(index, 1);
    this.setData({
      confirmedOrders: storageData
    })
    wx.setStorage({
      key: 'confirmedOrders',
      data: storageData,
      success: function() {
        wx.showToast({
          title: '删除成功',
        })
      }
    })
    // 取消的订单存储到全部订单里 并标记已取消
    const canceledConfirmedOrder = nowStorageData[index];
    const canceledConfirmedOrdersInStorage = wx.getStorageSync('canceledConfirmedOrders');
    if (canceledConfirmedOrdersInStorage) {
      canceledConfirmedOrdersInStorage.unshift(canceledConfirmedOrder)
      canceledConfirmedOrdersInStorage.forEach((item) => {
        item.status = "已取消"
      })
      wx.setStorageSync('canceledConfirmedOrders', canceledConfirmedOrdersInStorage)
    } else {
      const canceledConfirmedOrders = [];
      canceledConfirmedOrders.unshift(canceledConfirmedOrder)
      canceledConfirmedOrders.forEach((item) => {
        item.status = "已取消"
      })
      wx.setStorageSync('canceledConfirmedOrders', canceledConfirmedOrders)
    }
    this.setData({
      canceledConfirmedOrders: wx.getStorageSync('canceledConfirmedOrders')
    })
  },

  // 待确认订单里 点击取消订单 直接删除订单
  bindCancelSavedOrder(e) {
    const index = e.currentTarget.dataset.index;
    const savedOrdersInStorage = wx.getStorageSync('savedOrders');
    savedOrdersInStorage.splice(index, 1)
    wx.setStorageSync('savedOrders', savedOrdersInStorage)
    this.setData({
      readyToConfirmOrder: savedOrdersInStorage
    })
  },

  // 待确认订单里 点击修改下单 
  bindReviseOrder(e) {
    const index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定修改订单',
      confirmColor: '#07c160',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../revisedTransportInfo/index?index=' + index,
          })
          // 把存储里的订单数据换成要修改订单的数据
          const cityInfo = wx.getStorageSync('savedOrders')[index].cityInfo;
          wx.setStorageSync('cityInfo', cityInfo)
          const invoiceInfo = wx.getStorageSync('savedOrders')[index].invoiceInfo;
          wx.setStorageSync('invoiceInfo', invoiceInfo)
          const dateInfo = wx.getStorageSync('savedOrders')[index].dateInfo;
          wx.setStorageSync('dateInfo', dateInfo)
          const faCheInfoArray = wx.getStorageSync('savedOrders')[index].faCheInfoArray;
          wx.setStorageSync('faCheInfoArray', faCheInfoArray)
          const shouCheInfoArray = wx.getStorageSync('savedOrders')[index].shouCheInfoArray;
          wx.setStorageSync('shouCheInfoArray', shouCheInfoArray)



        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let app = getApp()
    if (app.globalData.isFromSaved) {
      this.setData({
        curIndex: 0
      })
    } else if (app.globalData.isFromConfirmed) {
      this.setData({
        curIndex: 1
      })
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
    // 判断是否登录状态
    app = getApp()
    if (app.globalData.userInfo) {
      this.setData({
        isLogin: true
      })
    } else {
      this.setData({
        isLogin: false
      })
    }

    // 获取待确认订单
    const readyToConfirmOrder = wx.getStorageSync('savedOrders');
    this.setData({
      readyToConfirmOrder: readyToConfirmOrder,
    })
    // 获取待运输订单
    const confirmedOrders = wx.getStorageSync('confirmedOrders');
    this.setData({
      confirmedOrders: confirmedOrders,
    })
    // 获取已取消订单
    const canceledConfirmedOrders = wx.getStorageSync('canceledConfirmedOrders');
    this.setData({
      canceledConfirmedOrders: canceledConfirmedOrders,
    })

    // 获取全部订单
    const readyAndConfirmedOrders = readyToConfirmOrder.concat(confirmedOrders)
    const allOfOrders = readyAndConfirmedOrders.concat(canceledConfirmedOrders)
    this.setData({
      allOfOrders: allOfOrders
    })

    // 判断一下从哪个按钮进入的 跳转到哪个页面
    let app = getApp()
    if (app.globalData.isFromSaved) {
      this.setData({
        curIndex: 0
      })
    } else if (app.globalData.isFromConfirmed) {
      this.setData({
        curIndex: 1
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