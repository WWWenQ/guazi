// pages/advice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0
  },
  bindTextInputChange(e){
    const count = e.detail.value.length;
    this.setData({
      count:count
    })
  },
  switchToMe(){
    if(this.data.count>0){
      wx.switchTab({
        url: '../me/index',
      })
    }else{
      wx.showToast({
        title: '请输入您的反馈',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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