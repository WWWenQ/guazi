// pages/normalInvoice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tax: '',
    address: '',
    phone: '',
    bank: '',
    account: '',
    isFromRevised:false
  },

  bindName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindTax(e) {
    this.setData({
      tax: e.detail.value
    })

  },
  bindTaxBlur(e) {
    const value = e.detail.value;

    if (value && value.length < 18) {
      wx.showToast({
        title: '税号长度为18位',
        icon: 'none'
      })
    } else if (!value) {
      wx.showToast({
        title: '请填写税号',
        icon: 'none'
      })
    }
  },

  bindAddress(e) {
    this.setData({
      address:e.detail.value
    })
  },
  bindPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },

  bindBank(e){
    this.setData({
      bank: e.detail.value
    })
  },

  bindAccount(e){
    this.setData({
      account: e.detail.value
    })
  },


  switchToTransport() {
    if (!this.data.name) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
    } else if (!this.data.tax) {
      wx.showToast({
        title: '请填写税号',
        icon: 'none'
      })
    } else if (this.data.tax.length !== 18) {
      wx.showToast({
        title: '税号长度为18位',
        icon: 'none'
      })
    } else {
      if(this.data.isFromRevised){
        wx.navigateTo({
          url: '../revisedTransportInfo/index',
        })
      }else{
        wx.switchTab({
          url: '../transport/index',
        })
      }
     
      // 存储数据
      const invoiceInfo = {
        name: this.data.name,
        tax: this.data.tax,
        address: this.data.address,
        phone: this.data.phone,
        bank: this.data.bank,
        account: this.data.account,
        invoiceIndex: 0
      }
      let storageData = wx.getStorageSync('invoiceInfo');
      if (!storageData) {
        wx.setStorageSync('invoiceInfo', invoiceInfo)
      } else {
        wx.removeStorageSync('invoiceInfo')
        wx.setStorageSync('invoiceInfo', invoiceInfo)
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   if(options.isFromRevised){
     this.setData({
       isFromRevised:true
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
    // 获取发票信息
    const invoiceInfo = wx.getStorageSync('invoiceInfo');
    if (invoiceInfo) {
      this.setData({
        name: invoiceInfo.name,
        tax: invoiceInfo.tax,
        address: invoiceInfo.address,
        phone: invoiceInfo.phone,
        bank: invoiceInfo.bank,
        account: invoiceInfo.account
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