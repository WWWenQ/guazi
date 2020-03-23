// pages/me/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "../../img/avatar.png",
    nickName: '点击登录/注册',
    isLogin: false,
    orderNumbers:0
  },
  switchToLogin() {
    console.log(this.data.isLogin)
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '../login/index',
      })
    }
  },


  switchToMyCode() {
    if(this.data.isLogin) {
      wx.navigateTo({
        url: '../myCode/index',
      })
    }
  },


  switchToAdvice() {
    wx.navigateTo({
      url: '../advice/index',
    })
  },
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '13032288308',
    })
  },
  bindExit() {
    app.globalData.userInfo = null;
    this.setData({
      avatar: "../../img/avatar.png",
      nickName: '点击登录/注册',
      isLogin: false
    })
    wx.showToast({
      title: '退出成功',
      icon: 'none'
    })
    // wx.getSetting({
    //   success(res) {
    //    res.authSetting['scope.userInfo']
    //     console.log(res.authSetting['scope.userInfo'])

    //   }
    // })
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
    const confirmedOrders = wx.getStorageSync('confirmedOrders');
    const orderNumbers = confirmedOrders.length;

    if (app.globalData.userInfo) {
      this.setData({
        avatar: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        isLogin: true,
        orderNumbers:orderNumbers
      })
    } else {
      this.setData({
        avatar: "../../img/avatar.png",
        nickName: '点击登录/注册'
      })
    }


    // const self = this;
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function(res) {
    //           self.setData({
    //             avatar: res.userInfo.avatarUrl,
    //             nickName: res.userInfo.nickName
    //           })
    //         }
    //       })
    //     } else {
    //       self.setData({
    //         avatar: "../../img/avatar.png",
    //         nickName: '点击登录/注册'
    //       })
    //     }
    //   }
    // })
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