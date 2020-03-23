// pages/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: '',
    windowWidth: '',
    addressBookArray:[],
    isFromFaChe:false,
    isFromShouChe:false
  },
  // 从添加按钮跳转到发车信息
  bindSwitchTofaCheInfoOrShouCheInfo(){
    if(this.data.isFromFaChe){
      wx.redirectTo({
        url: '../faCheInfo/index?isFromAddButton=isFromAddButton',
      })
    }else if(this.data.isFromShouChe){
      wx.redirectTo({
        url: '../shouCheInfo/index?isFromAddButton=isFromAddButton',
      })
    }
    
  },
  // 地址选择后 从整行跳转到发车信息
  switchToFaCheInfoOrShouCheInfoFromConfirm(e){
    const indexFromConfirm = e.currentTarget.dataset.indexfromconfirm;
    console.log(e.currentTarget.dataset)
    if(this.data.isFromFaChe){
      wx.navigateTo({
        url: '../faCheInfo/index?indexFromConfirm=' + indexFromConfirm + '&isFromConfirm=isFromConfirm',
      })
    }else if(this.data.isFromShouChe){
      wx.navigateTo({
        url: '../shouCheInfo/index?indexFromConfirm=' + indexFromConfirm + '&isFromConfirm=isFromConfirm',
      })
    }
    
  },

  bindDeleteAddress(e){
    const index = e.currentTarget.dataset.index;
    const self = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该地址',
      confirmColor: '#07c160',
      success(res) {
        if (res.confirm) {

          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })


          let addressBookArray = wx.getStorageSync('addressBookArray');
          addressBookArray.splice(index, 1);
          self.setData({
            addressBookArray: addressBookArray
          });
          wx.setStorageSync('addressBookArray', addressBookArray)
        }
      }
    })
  },

  // bindSwitchTofacheInfo(e){
  //   const index = e.currentTarget.dataset.index;
  //   wx.navigateTo({
  //     url: '../faCheInfo/index?index=' + index + '&isFromAddButton=isFromAddButton',
  //   })
  // },
  // 点击编辑进入发车信息
  bindSwitchTofacheInfoOrShouCheInfoFromEdit(e){
    const index = e.currentTarget.dataset.index;
    if(this.data.isFromFaChe){
      wx.redirectTo({
        url: '../faCheInfo/index?index=' + index + '&isFromEdit=isFromEdit',
      })
    }else if(this.data.isFromShouChe){
      wx.redirectTo({
        url: '../shouCheInfo/index?index=' + index + '&isFromEdit=isFromEdit',
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        // 屏幕宽度、高度
        // console.log('height=' + res.windowHeight);
        // console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          buttonLeft: res.windowWidth - 40
        })
      }
    })

   if(options.isFromFaChe){
     this.setData({
       isFromFaChe:true,
       isFromShouChe:false,
     })
   }else if(options.isFromShouChe){
     this.setData({
       isFromFaChe: false,
       isFromShouChe: true,
     })
   }
  console.log(this.data.isFromFaChe)
  console.log(this.data.isFromShouChe)
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
     // 获取地址簿数据
     const addressBookArray = wx.getStorageSync('addressBookArray');
      this.setData({
        addressBookArray: addressBookArray
      })
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