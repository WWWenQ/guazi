// pages/mangeCarsInfo/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carsArray:[],
    windowHeight: '',
    windowWidth: '',
    buttonLeft:''
  },


  bindSwitchToAddCarInfo(e) {
    const index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../addCarInfo/index?index='+index+'&isFromEdit=isFromEdit',
    })
  },


  
  bindDeleteCarInfo(e){
    const index = e.currentTarget.dataset.index;
    const self = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该车辆',
      confirmColor:'#07c160',
      success(res){
        if(res.confirm){
          
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })


          let carsArray = wx.getStorageSync('carsArray');
          carsArray.splice(index,1);
          self.setData({
            carsArray:carsArray
          });
          wx.setStorageSync('carsArray', carsArray)
        }
      }
    })
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
   const carsArray = wx.getStorageSync('carsArray');
   this.setData({
     carsArray:carsArray
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