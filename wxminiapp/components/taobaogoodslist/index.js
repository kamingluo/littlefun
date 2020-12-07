const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const common = require('./../../utils/common.js') //公共函数
let preventShake = 0;
Component({
  properties: {
    goodslist: {
      type: Object, //属性的类型
      value: [] // 数据
    },
  },
  data: {
  },
  methods: {
    clickgoods: function (e) {
     console.log("点击商品",e)
      // let goodsdata = e.currentTarget.dataset.data;
      // wx.setStorageSync('taobaogoodsdata', goodsdata)//将点击的淘宝商品存入缓存
      let num_iids = e.currentTarget.dataset.data.item_id;//商品id
      var url = encodeURIComponent(e.currentTarget.dataset.data.coupon_share_url);
      console.log("点击商品的跳转链接",url)
      if (url == null || url == '' || url == undefined || url =='undefined'){
        console.log("券合一链接不存在")
        var url = encodeURIComponent(e.currentTarget.dataset.data.coupon_click_url);
        if (url == null || url == '' || url == undefined || url == 'undefined'){
          console.log("coupon_click_url不存在")
          var url = encodeURIComponent(e.currentTarget.dataset.data.click_url);
          if (url == null || url == '' || url == undefined || url == 'undefined') {
            console.log("click_url不存在")
            var url = encodeURIComponent(e.currentTarget.dataset.data.url);
          }
        }
      }else{
        console.log("券合一链接存在")
      }
      console.log("跳转url",url)
      wx.navigateTo({
        url: '/pages/extension/taobao/goodsdetails/goodsdetails?num_iids=' + num_iids + '&url=' + url 
      })


    }
  }
})