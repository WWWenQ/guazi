// pages/freight/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mark:"D",
    regionD: ["北京市", "北京市", "朝阳区"],
    regionA: ["上海市", "上海市", "上海市"],
    options:{
      fromCity: "",
      toCity:"",
      price:1400,
    },
    hotLines:[
      {
        fromName:"上海市",
        toName:"成都市",
        promotion:"限时",
        price:"2300"
      },
      {
        fromName: "重庆市",
        toName: "上海市",
        promotion: "特价",
        price: "1700"
      },
      {
        fromName: "武汉市",
        toName: "北京市",
        promotion: "限时",
        price: "2090"
      },
      {
        fromName: "西安市",
        toName: "武汉市",
        promotion: "活动",
        price: "980"
      },
    ]
  },

  changeMark(e){
    const mark = e.currentTarget.dataset.mark;
    this.setData({
      mark:mark
    })
  },

  bindRegionChange: function (e) {
    const mark = this.data.mark;
    if(mark === "d"){
      this.setData({
        regionD: e.detail.value
      })
    }else{
      this.setData({
        regionA: e.detail.value
      })
    }
   
  },

  reverseCity(){
    const regionC = this.data.regionD;
    const regionB = this.data.regionA;
    this.setData({
      regionD:regionB,
      regionA:regionC
    })
  },
  
  checkHotLine(e){
    const index = e.currentTarget.dataset.index;
    const hotFromName = this.data.hotLines[index].fromName;
    const hotToName = this.data.hotLines[index].toName;
    const price = this.data.hotLines[index].price;
    this.setData({
      regionD: ["", hotFromName, hotFromName],
      regionA: ["", hotToName, hotToName],
      options:{
        fromCity: hotFromName,
        toCity: hotToName,
        price:price
      }
    })
    wx.navigateTo({
      url: '../checkFee/index?options=' + JSON.stringify(this.data.options),
    })

    wx.setStorage({
      key: 'cityInfo',
      data: this.data.options,
    })
  },
  switchToCheckFee() {
    const fromCity = this.data.regionD[1];
    const toCity = this.data.regionA[1];
    const price = this.data.options.price;
    this.setData({
      options: {
        fromCity: fromCity,
        toCity: toCity,
        price: price
      }
    })
    wx.navigateTo({
      url: '../checkFee/index?options=' + JSON.stringify(this.data.options),
    })

    wx.setStorage({
      key: 'cityInfo',
      data: this.data.options,
    })
  },









  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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