// pages/transport/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    mark: "D",
    regionD: ["", "北京市", ""],
    regionA: ["", "上海市", ""],
    fromCityArray: [],
    toCityArray: [],
    nowDate: '',
    departureDate: '',
    latestDate: '',
    arriveDate: '',
    descInfo: {},
    invoiceArray: ["普通发票", "增值税发票", "不开发票"],
    invoiceIndex: 2,
    carsArray: [],
    faCheInfo: {},
    shouCheInfo: {},
    invoiceInfo: {},
    cityInfo: {},
    dateInfo: {},
    tax: 0,
    price: 0
  },
  changeMark(e) {
    const mark = e.currentTarget.dataset.mark;
    this.setData({
      mark: mark
    })
  },
  bindRegionChange: function(e) {
    const self = this;
    const mark = this.data.mark;
    if (mark === "d") {
      this.setData({
        regionD: e.detail.value,
        fromCityArray:e.detail.value
      })
      wx.getStorage({
        key: 'cityInfo',
        success: function(res) {
          let selectedFromCity = "";
          e.detail.value.forEach((item, index) => {
            selectedFromCity += item
          })
          let storageData = res.data;
          storageData.fromCity = selectedFromCity;
          storageData.fromCityArray = e.detail.value;
          wx.setStorage({
            key: 'cityInfo',
            data: storageData,
          })
        },
        fail: function() {
          const cityInfo = {
            fromCity: self.data.regionD[1],
            fromCityArray: e.detail.value,
            toCity: self.data.regionA[1],
            toCityArray: self.data.toCityArray,
            price: 0
          }
          wx.setStorageSync('cityInfo', cityInfo)
        }
      })



    } else {
      this.setData({
        regionA: e.detail.value,
        toCityArray:e.detail.value
      })

      wx.getStorage({
        key: 'cityInfo',
        success: function(res) {
          let selectedToCity = "";
          e.detail.value.forEach((item, index) => {
            selectedToCity += item
          })
          let storageData = res.data;
          storageData.toCity = selectedToCity;
          storageData.toCityArray = e.detail.value;
          wx.setStorage({
            key: 'cityInfo',
            data: storageData,
          })
        },
        fail: function() {
          const cityInfo = {
            fromCity: self.data.regionD[1],
            fromCityArray: self.data.fromCityArray,
            toCity: self.data.regionA[1],
            toCityArray: e.detail.value,
            price: 0
          }
          wx.setStorageSync('cityInfo', cityInfo)
        }
      })
    }
  },
  bindDateChange: function(e) {
    let dateArray = e.detail.value.split('-')
    let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])


    let arriveDate = new Date(date.setDate(date.getDate() + 3));

    let month = arriveDate.getMonth() + 1;
    month = month <= 9 ? '0' + month : month;
    let day = arriveDate.getDate() <= 9 ? '0' + arriveDate.getDate() : arriveDate.getDate();

    arriveDate = arriveDate.getFullYear() + '-' + month + '-' + day;


    const dateInfo = {
      departureDate: e.detail.value,
      arriveDate: arriveDate
    }
    this.setData({
      departureDate: e.detail.value,
      arriveDate: arriveDate,
      dateInfo: dateInfo
    })
    // 存储时间信息
    const storageData = wx.getStorageSync('dateInfo');
    if (storageData) {
      wx.removeStorageSync('dateInfo')
      wx.setStorageSync('dateInfo', dateInfo)
    } else {
      wx.setStorageSync('dateInfo', dateInfo)
    }

  },
  switchToAddCarInfo() {
    wx.navigateTo({
      url: '../addCarInfo/index',
    })
  },

  switchToFaCheInfo() {
    wx.navigateTo({
      url: '../faCheInfo/index?isFromTransport=isFromTransport',
    })
  },
  switchToShouCheInfo() {
    wx.navigateTo({
      url: '../shouCheInfo/index?isFromTransport=isFromTransport',
    })
  },
  bindInvoiceChange(e) {
    this.setData({
      invoiceIndex: e.detail.value
    });
    if (e.detail.value == 0) {
      wx.navigateTo({
        url: '../normalInvoice/index',
      })
    } else if (e.detail.value == 1) {
      wx.navigateTo({
        url: '../vatInvoice/index',
      })
    }
  },
  bindCall() {
    wx.makePhoneCall({
      phoneNumber: '13032288308',
    })
  },
  switchToMangeCarsInfo() {
    wx.navigateTo({
      url: '../mangeCarsInfo/index',
    })
  },


  // 保存订单
  bindSaveOrder() {
    if (this.data.carsArray.length <= 0) {
      wx.showToast({
        title: '添加车辆信息',
        icon: 'none'
      })
    } else if (!this.data.faCheInfo) {
      wx.showToast({
        title: '添加发车信息',
        icon: 'none'
      })
    } else if (!this.data.shouCheInfo) {
      wx.showToast({
        title: '添加收车信息',
        icon: 'none'
      })
    } else if (!this.data.fromCityArray && this.data.regionD[1] !== this.data.faCheInfo.regionArray[1]) {
      wx.showModal({
        title: '提示',
        content: '出发城市与发车地址不一致，请重新输入',
      })

    } else if (this.data.fromCityArray && (this.data.fromCityArray.toString().split(',').join('')) !== (this.data.faCheInfo.regionArray.toString().split(',').join(''))) {
      wx.showModal({
        title: '提示',
        content: '出发城市与发车地址不一致，请重新输入',
      })

    } else if (!this.data.toCityArray && this.data.regionA[1] !== this.data.shouCheInfo.regionArray[1]) {
      wx.showModal({
        title: '提示',
        content: '到达城市与收车地址不一致，请重新输入',
      })
    } else if (this.data.toCityArray && this.data.toCityArray.toString().split(',').join('') !== this.data.shouCheInfo.regionArray.toString().split(',').join('')) {
      wx.showModal({
        title: '提示',
        content: '到达城市与收车地址不一致，请重新输入',
      })
    } else if (this.data.invoiceIndex == 0 && !this.data.invoiceInfo.tax) {
      wx.showToast({
        title: '如需开发票，请添加发票信息',
        icon: 'none'
      })
    } else if (this.data.invoiceIndex == 1 && !this.data.invoiceInfo.account) {
      wx.showToast({
        title: '如需开发票，请添加发票信息',
        icon: 'none'
      })
    } else {
      const cityInfo = wx.getStorageSync('cityInfo');
      const dateInfo = wx.getStorageSync('dateInfo');
      const carsArray = wx.getStorageSync('carsArray');
      const faCheInfoArray = wx.getStorageSync('faCheInfoArray');
      const shouCheInfoArray = wx.getStorageSync('shouCheInfoArray');
      const invoiceInfo = wx.getStorageSync('invoiceInfo');
      const orderNumber = Math.round(Math.random() * 100000000)
      const orderInfo = {
        orderNumber,
        status:"待确认",
        cityInfo,
        dateInfo,
        carsArray,
        faCheInfoArray,
        shouCheInfoArray,
        invoiceInfo
      }
      const storageData = wx.getStorageSync('savedOrders');
      if (storageData) {
        storageData.unshift(orderInfo)
        wx.setStorageSync('savedOrders', storageData)
      } else {
        const savedOrders = [];
        savedOrders.unshift(orderInfo)
        wx.setStorageSync('savedOrders', savedOrders)
      }

      //删除添加车辆信息
      wx.removeStorageSync('carsArray')


      wx.switchTab({
        url: '../order/index?isFromSaveOrder=isFromSaveOrder',
      })
      // 判断一下是哪个按钮跳转过去的
      app.globalData.isFromConfirmed = false;
      app.globalData.isFromSaved = true;
    }
  },


// 确认下单
  bindConfirmOrder(){
    if (this.data.carsArray.length <= 0) {
      wx.showToast({
        title: '添加车辆信息',
        icon: 'none'
      })
    } else if (!this.data.faCheInfo) {
      wx.showToast({
        title: '添加发车信息',
        icon: 'none'
      })
    } else if (!this.data.shouCheInfo) {
      wx.showToast({
        title: '添加收车信息',
        icon: 'none'
      })
    } else if (!this.data.fromCityArray && this.data.regionD[1] !== this.data.faCheInfo.regionArray[1]) {
      wx.showModal({
        title: '提示',
        content: '出发城市与发车地址不一致，请重新输入',
      })

    } else if (this.data.fromCityArray && (this.data.fromCityArray.toString().split(',').join('')) !== (this.data.faCheInfo.regionArray.toString().split(',').join(''))) {
      wx.showModal({
        title: '提示',
        content: '出发城市与发车地址不一致，请重新输入',
      })

    } else if (!this.data.toCityArray && this.data.regionA[1] !== this.data.shouCheInfo.regionArray[1]) {
      wx.showModal({
        title: '提示',
        content: '到达城市与收车地址不一致，请重新输入',
      })
    } else if (this.data.toCityArray && this.data.toCityArray.toString().split(',').join('') !== this.data.shouCheInfo.regionArray.toString().split(',').join('')) {
      wx.showModal({
        title: '提示',
        content: '到达城市与收车地址不一致，请重新输入',
      })
    } else if (this.data.invoiceIndex == 0 && !this.data.invoiceInfo.tax) {
      wx.showToast({
        title: '如需开发票，请添加发票信息',
        icon: 'none'
      })
    } else if (this.data.invoiceIndex == 1 && !this.data.invoiceInfo.account) {
      wx.showToast({
        title: '如需开发票，请添加发票信息',
        icon: 'none'
      })
    } else {
      const cityInfo = wx.getStorageSync('cityInfo');
      const dateInfo = wx.getStorageSync('dateInfo');
      const carsArray = wx.getStorageSync('carsArray');
      const faCheInfoArray = wx.getStorageSync('faCheInfoArray');
      const shouCheInfoArray = wx.getStorageSync('shouCheInfoArray');
      const invoiceInfo = wx.getStorageSync('invoiceInfo');
      const orderNumber = Math.round(Math.random() * 100000000)
      const orderInfo = {
        orderNumber,
        status: "待运输",
        cityInfo,
        dateInfo,
        carsArray,
        faCheInfoArray,
        shouCheInfoArray,
        invoiceInfo
      }
      const storageData = wx.getStorageSync('confirmedOrders');
      if (storageData) {
        storageData.unshift(orderInfo)
        wx.setStorageSync('confirmedOrders', storageData)
      } else {
        const confirmedOrders = [];
        confirmedOrders.unshift(orderInfo)
        wx.setStorageSync('confirmedOrders', confirmedOrders)
      }

      //删除添加车辆信息
      wx.removeStorageSync('carsArray')


      wx.switchTab({
        url: '../order/index',
      })

      // 判断一下是哪个按钮跳转过去的
      app.globalData.isFromConfirmed = true;
      app.globalData.isFromSaved = false;

    }
  },











  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let nowTime = new Date();
    let latestDate = new Date(nowTime.setDate(nowTime.getDate() + 3));

    let date = new Date();

    let month = date.getMonth() + 1;
    month = month <= 9 ? '0' + month : month;
    let latestMonth = latestDate.getMonth() + 1;
    latestMonth = latestMonth <= 9 ? '0' + latestMonth : latestMonth;
    let day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    let latestDay = latestDate.getDate() <= 9 ? '0' + latestDate.getDate() : latestDate.getDate();

    let nowDate = date.getFullYear() + '-' + month + '-' + day
    let departureDate = date.getFullYear() + '-' + month + '-' + day
    latestDate = latestDate.getFullYear() + '-' + latestMonth + '-' + latestDay


    const dateInfo = {
      departureDate: departureDate,
      arriveDate: latestDate
    }
    this.setData({
      nowDate: nowDate,
      departureDate: departureDate,
      latestDate: latestDate,
      arriveDate: latestDate,
      dateInfo: dateInfo
    })
    // 存储时间信息
    const storageData = wx.getStorageSync('dateInfo');
    if (storageData) {
      this.setData({
        departureDate: storageData.departureDate,
        arriveDate: storageData.arriveDate
      })
    } else {
      wx.setStorageSync('dateInfo', dateInfo)
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
    if(app.globalData.userInfo){
      this.setData({
        isLogin:true
      })
    }else{
      this.setData({
        isLogin: false
      })
    }
    const descInfo = app.globalData.descInfofromCheckFee;
    app.globalData.descInfofromCheckFee = "";
    if (descInfo) {
      this.setData({
        descInfo: descInfo,
        regionD: [descInfo.fromCity, "",""],
        regionA: [descInfo.toCity, "",""]
      })
    }



    let carsArray = wx.getStorageSync("carsArray");
    this.setData({
      carsArray: carsArray
    })

    // 获取城市信息

    const cityInfo = wx.getStorageSync('cityInfo');
    if (cityInfo) {
      this.setData({
        cityInfo: cityInfo,
        regionD: ["", cityInfo.fromCity, ""],
        regionA: ["", cityInfo.toCity, ""],
        fromCityArray:cityInfo.fromCityArray,
        toCityArray:cityInfo.toCityArray,
        toCity: cityInfo.toCity,
        price: Math.round(cityInfo.price),
        tax: Math.round(parseInt(cityInfo.price) * 0.09)
      })
    }


    // 获取发车信息
    const faCheInfo = wx.getStorageSync('faCheInfoArray');
    this.setData({
      faCheInfo: faCheInfo
    })



    // 获取收车信息
    const shouCheInfo = wx.getStorageSync('shouCheInfoArray');
    this.setData({
      shouCheInfo: shouCheInfo
    })



    // 获取发票信息
    const invoiceInfo = wx.getStorageSync('invoiceInfo')
    if (invoiceInfo) {
      this.setData({
        invoiceInfo: invoiceInfo,
        invoiceIndex: invoiceInfo.invoiceIndex,
        tax: Math.round(parseInt(this.data.cityInfo.price) * 0.09)
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