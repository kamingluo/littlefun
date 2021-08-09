const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const common = require('./../../utils/common.js') //公共函数

let preventShake = 0;

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    tips: {
      type: String, //属性的类型
      value: "暂无数据" // 提示语
    },
  },


  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //阻止冒泡
    catchtap(e) {
      return false
    },
  
  }
})