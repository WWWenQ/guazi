// pages/brands/index.js
const interfaces = require("../../utils/urlConfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curLetter: "A",
    showThisBrandCars: false,
    thisBrandCars: [],
    allOfTheCars: [],
    brandLists: [{
        letter: "A",
        brands: []
      },
      {
        letter: "B",
        brands: []
      },
      {
        letter: "C",
        brands: []
      },
      {
        letter: "D",
        brands: []
      },
      {
        letter: "F",
        brands: []
      },
      {
        letter: "G",
        brands: []
      },
      {
        letter: "H",
        brands: []
      },
      {
        letter: "I",
        brands: []
      },
      {
        letter: "G",
        brands: []
      },
      {
        letter: "K",
        brands: []
      },
      {
        letter: "L",
        brands: []
      },
      {
        letter: "M",
        brands: []
      },
      {
        letter: "N",
        brands: []
      },
      {
        letter: "O",
        brands: []
      },
      {
        letter: "P",
        brands: []
      },
      {
        letter: "Q",
        brands: []
      },
      {
        letter: "R",
        brands: []
      },
      {
        letter: "S",
        brands: []
      },
      {
        letter: "T",
        brands: []
      },
      {
        letter: "W",
        brands: []
      },
      {
        letter: "X",
        brands: []
      },
      {
        letter: "Y",
        brands: []
      },
      {
        letter: "Z",
        brands: []
      }

    ],

  },

  // 点击字母跳转到该选项
  scrollTo(e) {

    this.setData({
      curLetter: e.currentTarget.dataset.letter
    })
  },
  // 点击选择车型
  bindChooseCar(e) {
    // 匹配该品牌的所有车型
    // const brandID = e.currentTarget.dataset.brandid;
    // let thisBrandCars = this.data.allOfTheCars.filter((item) => {
    //   return item.brand_id === brandID
    // })
    // this.setData({
    //   thisBrandCars: thisBrandCars,
    //   showThisBrandCars: true
    // })
    const brandName = e.currentTarget.dataset.brandname
 wx.navigateTo({
   url: '../addCarInfo/index?brandName='+brandName,
 })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const self = this;
    wx.showLoading({
      title: "加载中..."
    })
    wx.request({
      url: interfaces.carBrands,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        const brandLists = res.data.info
        const brandListsA = brandLists.filter((item) => {
          return item.firstletter === "A"
        })
        const brandListsB = brandLists.filter((item) => {
          return item.firstletter === "B"
        })
        const brandListsC = brandLists.filter((item) => {
          return item.firstletter === "C"
        })
        const brandListsD = brandLists.filter((item) => {
          return item.firstletter === "D"
        })
        const brandListsF = brandLists.filter((item) => {
          return item.firstletter === "F"
        })
        const brandListsG = brandLists.filter((item) => {
          return item.firstletter === "G"
        })
        const brandListsH = brandLists.filter((item) => {
          return item.firstletter === "H"
        })
        const brandListsI = brandLists.filter((item) => {
          return item.firstletter === "I"
        })
        const brandListsJ = brandLists.filter((item) => {
          return item.firstletter === "J"
        })
        const brandListsK = brandLists.filter((item) => {
          return item.firstletter === "K"
        })
        const brandListsL = brandLists.filter((item) => {
          return item.firstletter === "L"
        })
        const brandListsM = brandLists.filter((item) => {
          return item.firstletter === "M"
        })
        const brandListsN = brandLists.filter((item) => {
          return item.firstletter === "N"
        })
        const brandListsO = brandLists.filter((item) => {
          return item.firstletter === "O"
        })
        const brandListsP = brandLists.filter((item) => {
          return item.firstletter === "P"
        })
        const brandListsQ = brandLists.filter((item) => {
          return item.firstletter === "Q"
        })
        const brandListsR = brandLists.filter((item) => {
          return item.firstletter === "R"
        })
        const brandListsS = brandLists.filter((item) => {
          return item.firstletter === "S"
        })
        const brandListsT = brandLists.filter((item) => {
          return item.firstletter === "T"
        })
        const brandListsW = brandLists.filter((item) => {
          return item.firstletter === "W"
        })
        const brandListsX = brandLists.filter((item) => {
          return item.firstletter === "X"
        })
        const brandListsY = brandLists.filter((item) => {
          return item.firstletter === "Y"
        })
        const brandListsZ = brandLists.filter((item) => {
          return item.firstletter === "Z"
        })

        const brandListsIndata = self.data.brandLists;
        brandListsIndata[0].brands = brandListsA
        brandListsIndata[1].brands = brandListsB
        brandListsIndata[2].brands = brandListsC
        brandListsIndata[3].brands = brandListsD
        brandListsIndata[4].brands = brandListsF
        brandListsIndata[5].brands = brandListsG
        brandListsIndata[6].brands = brandListsH
        brandListsIndata[7].brands = brandListsI
        brandListsIndata[8].brands = brandListsJ
        brandListsIndata[9].brands = brandListsK
        brandListsIndata[10].brands = brandListsL
        brandListsIndata[11].brands = brandListsM
        brandListsIndata[12].brands = brandListsN
        brandListsIndata[13].brands = brandListsO
        brandListsIndata[14].brands = brandListsP
        brandListsIndata[15].brands = brandListsQ
        brandListsIndata[16].brands = brandListsR
        brandListsIndata[17].brands = brandListsS
        brandListsIndata[18].brands = brandListsT
        brandListsIndata[19].brands = brandListsW
        brandListsIndata[20].brands = brandListsX
        brandListsIndata[21].brands = brandListsY
        brandListsIndata[22].brands = brandListsZ

        self.setData({
          brandLists: brandListsIndata
        })
        wx.hideLoading()
      }
    })

    // 请求所有车型
    // wx.request({
    //   url: interfaces.carTypes,
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     self.setData({
    //       allOfTheCars: res.data.info
    //     })


    //   }
    // })
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