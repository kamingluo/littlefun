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
    adid: {
      type: String, //属性的类型
      value: "adunit-a090166402a1c55e" // 广告id
    },
    adtype:{
      type: String, //属性的类型
      value: "1" // 广告类型
    },
    position:{
      type: String, //属性的类型
      value: "广告位置" // 广告位置
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    url: '',
    title: '',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //阻止冒泡
    catchtap(e) {
      return false
    },
    adclick(e) {
      console.log("点击组件广告")
      console.log(e.currentTarget.dataset.position)
      console.log(e.currentTarget.dataset.adtype)
      let data={
        'adtype':e.currentTarget.dataset.adtype,
        'position':e.currentTarget.dataset.position
      };
      common.clickgdtadstatistics(data)

    },

    adsuccess: function (e) {
       console.log("广告加载成功",e)
      // console.log(e.currentTarget.dataset.position)
      // console.log(e.currentTarget.dataset.adtype)
      let data = {
        'adtype': e.currentTarget.dataset.adtype,
        'position': e.currentTarget.dataset.position,
        'state':0
      };//state=0成功1失败
      //common.adloadstatistics(data)
    },

    aderr: function (e) {
      console.log("广告加载失败", e)
      let data = {
        'adtype': e.currentTarget.dataset.adtype,
        'position': e.currentTarget.dataset.position,
        'state': 1
      };//state=0成功1失败
      //common.adloadstatistics(data)
    },


    //点击事件
    tapEvent(e) {
      防止快速多次触发
      const nowTime = Date.now();
      if (nowTime - preventShake < 500) {
        return
      }
      preventShake = nowTime;

      //触发点击回调
      this.triggerEvent('click', e, {});
    },

  }
})