
let startPoint;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    windowHeight:{
      type:String,
      value:""
    },
    windowWidth: {
      type:String,
      value:""
    },
    buttonLeft:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    buttonTop: 200,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    buttonStart: function (e) {
      startPoint = e.touches[0]
    },
    buttonMove: function (e) {
      let endPoint = e.touches[e.touches.length - 1]
      let translateX = endPoint.clientX - startPoint.clientX
      let translateY = endPoint.clientY - startPoint.clientY
      startPoint = endPoint
      let buttonTop = this.data.buttonTop + translateY
      let buttonLeft = this.data.buttonLeft + translateX
      //判断是移动否超出屏幕
      if (buttonLeft + 40 >= this.data.windowWidth) {
        buttonLeft = this.data.windowWidth - 40;
      }
      if (buttonLeft <= 0) {
        buttonLeft = 0;
      }
      if (buttonTop <= 0) {
        buttonTop = 0
      }
      if (buttonTop + 40 >= this.data.windowHeight) {
        buttonTop = this.data.windowHeight - 40;
      }
      this.setData({
        buttonTop: buttonTop,
        buttonLeft: buttonLeft
      })
    },
    buttonEnd: function (e) {

    },

  }
})