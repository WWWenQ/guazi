// pages/faCheInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstName: '',
    nameValue: '',
    phoneValue: '',
    styleArray: ["自提", "送车上门", "拖车上门"],
    styleIndex: 1,
    region: ["", "", ""],
    detailAddress: '',
    isFromAddButton: false,
    isFromEdit: false,
    indexFromEdit: '',
    doItBySelf: false,
    isFromTransport: false,
    phoneValid: false,
    isFromRevised:false
  },

  bindNameValue(e) {
    const firstName = e.detail.value.split('')[0]
    this.setData({
      nameValue: e.detail.value,
      firstName: firstName
    })

  },

  checkPhone: function(phoneValue) {
    var phone = phoneValue
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return false;
    } else {
      return true
    }
  },
  bindPhoneValue(e) {
    const phoneValue = e.detail.value;
    const valid = this.checkPhone(phoneValue);
    if (!e.detail.value) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      this.setData({
        phoneValue: ''
      })
    } else {
      if (!valid) {
        wx.showToast({
          title: '手机格式不正确',
          icon: 'none'
        })
        this.setData({
          phoneValid: false,
          phoneValue: phoneValue,
        })
      } else {
        this.setData({
          phoneValue: phoneValue,
          phoneValid: true
        })
      }
    }


  },

  bindStyleChange(e) {
    this.setData({
      styleIndex: e.detail.value,
      detailAddress: ''
    })
    if (e.detail.value === "0") {
      this.setData({
        doItBySelf: true,
        detailAddress: "将台路15号楼898创新空间物流园区送车上门",
        region: ["北京市","北京市","朝阳区"]
      })
    } else {
      this.setData({
        doItBySelf: false,
      })
    }
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

  bindBlurDetailAddress(e) {
    this.setData({
      detailAddress: e.detail.value
    })
  },

  switchToAddCarInfo() {
    console.log("保存")
    // 从添加地址簿跳转过来的或者从点击编辑跳转过来的
    if (this.data.isFromAddButton || this.data.isFromEdit) {
      if (!this.data.nameValue) {
        wx.showToast({
          title: '联系人不能为空',
          icon: 'none'
        })
      } else if (!this.data.phoneValue) {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none'
        })
      } else if (!this.data.phoneValid) {
        wx.showToast({
          title: '手机格式不正确',
          icon: 'none'
        })
      } else if (this.data.region[0] === "" && !this.data.doItBySelf) {
        wx.showToast({
          title: '地址不能为空',
          icon: 'none'
        })
      } else if (!this.data.detailAddress) {
        wx.showToast({
          title: '地址不能为空',
          icon: 'none'
        })
      } else {
        const storageData = wx.getStorageSync('addressBookArray');
        let regionString = "";
        this.data.region.forEach((item) => {
          regionString += item + ''
        })
        let addressBook = {
          firstName: this.data.firstName,
          nameValue: this.data.nameValue,
          phoneValue: this.data.phoneValue,
          regionArray: this.data.region,
          region: regionString,
          detailAddress: this.data.detailAddress
        }
        let addressBookArray = [];

        if (storageData == []) {
          addressBookArray.push(addressBook)
          wx.setStorageSync('addressBookArray', addressBookArray)
          wx.navigateTo({
            url: '../address/index?isFromShouChe',
          })
        } else {
          let flag = false;
          storageData.forEach((item) => {
            if (JSON.stringify(item) === JSON.stringify(addressBook)) {
              flag = true
            }
          })
          if (!flag) {
            // 不重复 且从编辑页面过来的
            if (this.data.isFromEdit) {
              storageData.splice(this.data.indexFromEdit, 1, addressBook)
            } else {
              storageData.push(addressBook)
            }
            wx.setStorageSync('addressBookArray', storageData)
            wx.redirectTo({
              url: '../address/index?isFromShouChe',
            })
          } else {
            wx.showToast({
              title: '该地址已存在',
              icon: 'none'
            })
          }
        }
      }
    }


    // 从地址确认后跳转过来的或者直接从运车页面跳转过来的 点击保存后 跳转到运车页面
    if (this.data.isFromTransport || this.data.isFromConfirm) {
      if (!this.data.nameValue) {
        wx.showToast({
          title: '联系人不能为空',
          icon: 'none'
        })
      } else if (!this.data.phoneValue) {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none'
        })
      } else if (!this.data.phoneValid) {
        wx.showToast({
          title: '手机格式不正确',
          icon: 'none'
        })
      } else if (this.data.region[0] === "" && !this.data.doItBySelf) {
        wx.showToast({
          title: '地址不能为空',
          icon: 'none'
        })
      } else if (!this.data.detailAddress) {
        wx.showToast({
          title: '地址不能为空',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        });
        wx.removeStorageSync("shouCheInfoArray");
        let regionString = "";
        this.data.region.forEach((item) => {
          regionString += item + ''
        })
        let shouCheInfo = {
          firstName: this.data.firstName,
          nameValue: this.data.nameValue,
          phoneValue: this.data.phoneValue,
          style: this.data.styleArray[this.data.styleIndex],
          regionArray: this.data.region,
          region: regionString,
          detailAddress: this.data.detailAddress
        }

        wx.setStorageSync('shouCheInfoArray', shouCheInfo)
        if (this.data.isFromRevised) {
          wx.navigateTo({
            url: '../revisedTransportInfo/index',
          })
        } else {
          wx.switchTab({
            url: '../transport/index',
          })
        }
        

        // 如果不是自送 那么信息保存到地址簿
        if (!this.data.doItBySelf) {
          const storageData = wx.getStorageSync('addressBookArray');
          let regionString2 = "";
          this.data.region.forEach((item) => {
            regionString2 += item + ''
          })
          let addressBook = {
            firstName: this.data.firstName,
            nameValue: this.data.nameValue,
            phoneValue: this.data.phoneValue,
            regionArray: this.data.region,
            region: regionString2,
            detailAddress: this.data.detailAddress
          }
          let addressBookArray = [];

          if (storageData == []) {
            addressBookArray.push(addressBook)
            wx.setStorageSync('addressBookArray', addressBookArray)
            if (this.data.isFromRevised) {
              wx.navigateTo({
                url: '../revisedTransportInfo/index',
              })
            } else {
              wx.switchTab({
                url: '../transport/index',
              })
            }
          } else {
            let flag = false;
            storageData.forEach((item) => {
              console.log(item)
              console.log(addressBook)
              if (JSON.stringify(item) === JSON.stringify(addressBook)) {
                flag = true
              }
            })
            console.log(flag)
            if (!flag) {
              // 不重复 
              storageData.push(addressBook)

              wx.setStorageSync('addressBookArray', storageData)
              if (this.data.isFromRevised) {
                wx.navigateTo({
                  url: '../revisedTransportInfo/index',
                })
              } else {
                wx.switchTab({
                  url: '../transport/index',
                })
              }
            }
          }
        }







      }
    }
  },


  bindSwitchToAddress() {
    wx.navigateTo({
      url: '../address/index?isFromShouChe',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    // 点击添加按钮过来的
    if (options.isFromAddButton) {
      this.setData({
        isFromAddButton: true
      })
    } else {
      this.setData({
        isFromAddButton: false
      })
    }

    // 从编辑页面来到发车信息
    if (options.isFromEdit) {
      console.log(options)
      this.setData({
        isFromEdit: true
      })
      const addressBook = wx.getStorageSync('addressBookArray')[options.index]
      this.setData({
        firstName: addressBook.firstName,
        nameValue: addressBook.nameValue,
        phoneValue: addressBook.phoneValue,
        region: [addressBook.region, "", ""],
        detailAddress: addressBook.detailAddress,
        indexFromEdit: options.index,
        phoneValid: true
      })
    }
    // 如果是从地址确认后跳转过来的
    if (options.isFromConfirm) {
      let addressBook = wx.getStorageSync('addressBookArray')[options.indexFromConfirm];
      this.setData({
        firstName: addressBook.firstName,
        nameValue: addressBook.nameValue,
        phoneValue: addressBook.phoneValue,
        region: [addressBook.region, "", ""],
        detailAddress: addressBook.detailAddress,
        isFromConfirm: true,
        phoneValid: true
      })
    }

    // 从运车跳转过来的
    if (options.isFromTransport) {
      this.setData({
        isFromTransport: true
      })
      const shouCheInfo = wx.getStorageSync('shouCheInfoArray');
      if (shouCheInfo) {
        this.setData({
          firstName: shouCheInfo.firstName,
          nameValue: shouCheInfo.nameValue,
          phoneValue: shouCheInfo.phoneValue,
          styleArray: ["自提", "送车上门", "拖车上门"],
          styleIndex: this.data.styleArray.indexOf(shouCheInfo.style),
          region: [shouCheInfo.region, "", ""],
          detailAddress: shouCheInfo.detailAddress,
          phoneValid: true

        })
      }

      // 从修改运车信息页面跳转过来的
      if(options.isFromRevised){
        this.setData({
          isFromRevised:true
        })
      }

      if (shouCheInfo.style === "自提") {
        this.setData({
          doItBySelf: true
        })
      }
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