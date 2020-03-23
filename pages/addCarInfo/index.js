// pages/addCarInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandName: "",
    carValue: '',
    moveAble: false,
    ifHasPlate: false,
    plateNumber: '',
    vinNumber: '',
    ifAddInsurance: false,
    addInsurance: 0,
    insurance: 0,
    disabled: true,
    insuranceLimit: 0,
    carsArray: [],
    isFromEdit: false,
    index: ''
  },
  switchToBrands() {
    wx.navigateTo({
      url: '../brands/index',
    })
  },

  bindIfMoveAble(e) {
    this.setData({
      moveAble: e.detail.value
    })
  },

  bindIfHasPlate(e) {
    this.setData({
      ifHasPlate: e.detail.value
    })
    if (!e.detail.value) {
      this.setData({
        plateNumber: ""
      })
    }
  },

  bindPlateNumber(e) {
    if (this.data.ifHasPlate) {
      this.setData({
        plateNumber: e.detail.value
      })
    }

  },

  bindVinNumber(e) {
    this.setData({
      vinNumber: e.detail.value
    })
  },

  //是否追加保险
  bindIfAddInsurance(e) {
    if (this.data.carValue > 10) {
      this.setData({
        ifAddInsurance: e.detail.value,
        disabled: false
      })
    } else {
      this.setData({
        ifAddInsurance: false,
        disabled: true
      })
    }

    if (e.detail.value == false) {
      this.setData({
        addInsurance: 0,
        insurance: 0
      })
    }

  },

  bindAddInsuranceLimit(e) {
    let value = e.detail.value; //输入的追加额度
    let insuranceLimit = this.data.carValue - 10; //限值
    let insurance = Math.ceil(value / 10) * 50
    let minInsurance = Math.ceil(insuranceLimit / 10) * 50
    if (value && value >= 0) {
      if (value > insuranceLimit) {
        wx.showToast({
          title: '最多可以追加' + insuranceLimit + '万',
          icon: 'none'
        })
        this.setData({
          addInsurance: insuranceLimit,
          insurance: minInsurance,
          insuranceLimit: insuranceLimit
        })
      } else {
        this.setData({
          addInsurance: value,
          insurance: insurance
        })
      }
    } else {
      this.setData({
        addInsurance: '',
        insurance: 0
      })
    }


  },
  bindAddInsuranceBlur() {
    if (this.data.addInsurance <= 0) {
      this.setData({
        ifAddInsurance: false
      })
    }
  },

  bindIfHasBrand(e) {
    if (!this.data.brandName) {
      wx.showToast({
        title: '请先选择车系',
        icon: 'none'
      })
    }
  },
  bindCarValueInput(e) {
    const value = e.detail.value;
    if (value && value > 10) {
      this.setData({
        carValue: value,
        disabled: false
      })
    } else if (value > 0 && value <= 10) {
      this.setData({
        carValue: value,
        disabled: true
      })
    } else if (value && value == 0) {
      this.setData({
        carValue: value,
        disabled: true
      })
    } else if (!value) {
      this.setData({
        carValue: '',
        disabled: true
      })
    } else {
      this.setData({
        disabled: true
      })
    }

  },
  bindCarValueBlur(e) {
    if (e.detail.value >= 70) {
      wx.showModal({
        title: '提示',
        content: '车辆估值超过70万，联系客服下单',
        confirmColor: '#07c160',
        confirmText: '联系客服',
        success(res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: '13032288308',
            })
          }
        }
      })
    }
  },
  // 点击事件 判断是否先填了车辆估值
  bindIfHasCarValue() {
    if (!this.data.carValue) {
      wx.showToast({
        title: '请先填写车辆估值',
        icon: 'none'
      })
      this.setData({
        disabled: true
      })
    } else if (this.data.carValue <= 10) {
      wx.showToast({
        title: '估值10w以内，不能追加保险',
        icon: 'none'
      })
      this.setData({
        disabled: true
      })
    } else {
      this.setData({
        disabled: false
      })
    }
  },

  bindSave() {
    if (!this.data.brandName) {
      wx.showToast({
        title: '请选择车系',
        icon: "none"
      })
    } else if (!this.data.carValue || this.data.carValue <= 0) {
      wx.showToast({
        title: '请选择车辆估值',
        icon: "none"
      })
    } else if (this.data.ifHasPlate && !this.data.plateNumber) {
      wx.showToast({
        title: '请输入车牌号',
        icon: "none"
      })
    } else if (this.data.carValue >= 70) {
     wx.showToast({
       title: '车辆估值超过70万，联系客服下单',
       icon:'none'
     })
    } else {
      wx.navigateBack({
        delta: 1
      })
      const carInfo = {
        brandName: "大牛",
        carValue: this.data.carValue,
        moveAble: this.data.moveAble,
        ifHasPlate: this.data.ifHasPlate,
        plateNumber: this.data.plateNumber,
        vinNumber: this.data.vinNumber,
        ifAddInsurance: this.data.ifAddInsurance,
        addInsurance: this.data.addInsurance,
        insurance: this.data.insurance,
      }

      const self = this;
      let carsArray = this.data.carsArray;
      carsArray.push(carInfo)




      let storageData = wx.getStorageSync("carsArray");
      if (storageData == []) {
        wx.setStorageSync("carsArray", carsArray)
      } else {
        if (self.data.isFromEdit) {
          storageData.splice(self.data.index, 1, carInfo)
          wx.setStorageSync("carsArray", storageData)
          self.setData({
            isFromEdit: false
          })
        } else {
          carsArray = storageData;
          carsArray.push(carInfo)
          wx.setStorageSync("carsArray", carsArray)
        }

      }

    }









    // if (this.data.brandName && this.data.carValue&&!this.data.ifHasPlate&&!this.data.ifAddInsurance) {
    //   wx.switchTab({
    //     url: '../transport/index',
    //   })

    //   const carInfo={
    //     brandName: "大牛",
    //     carValue: this.data.carValue,
    //     moveAble: this.data.moveAble,
    //     ifHasPlate: this.data.ifHasPlate,
    //     plateNumber: this.data.plateNumber,
    //     vinNumber: this.data.vinNumber,
    //     ifAddInsurance: this.data.ifAddInsurance,
    //     addInsuranceLimit: this.data.addInsuranceLimit,
    //     insurance: this.data.insurance,
    //   }
    //   wx.setStorage({
    //     key: 'carInfo',
    //     data: carInfo,
    //   })
    // } else if (this.data.brandName && this.data.carValue && this.data.ifHasPlate &&!this.data.plateNumber){
    //   wx.showToast({
    //     title: '请输入车牌号',
    //     icon: "none"
    //   })
    // } else if (this.data.brandName && this.data.carValu&& this.data.ifAddInsurance&&!this.data.addInsuranceLimit){
    //   wx.showToast({
    //     title: '请输入追加额度',
    //     icon: "none"
    //   })
    // }else {
    //   if (!this.data.brandName) {
    //     wx.showToast({
    //       title: '请选择车系',
    //       icon: "none"
    //     })
    //   } else if (!this.data.carValue) {
    //     wx.showToast({
    //       title: '请选择车辆估值',
    //       icon: "none"
    //     })
    //   }
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.index) {
      const index = options.index;
      const carInfo = wx.getStorageSync('carsArray')[index]
      this.setData({
        isFromEdit: true,
        index: index,
        brandName: carInfo.brandName,
        carValue: carInfo.carValue,
        moveAble: carInfo.moveAble,
        ifHasPlate: carInfo.ifHasPlate,
        plateNumber: carInfo.plateNumber,
        vinNumber: carInfo.vinNumber,
        ifAddInsurance: carInfo.ifAddInsurance,
        addInsurance: carInfo.addInsurance,
        insurance: carInfo.insurance,
      })
      if (this.data.carValue > 0) {
        this.setData({
          disabled: false
        })
      }
    }
  if(options.brandName){
    this.setData({
      brandName:options.brandName
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