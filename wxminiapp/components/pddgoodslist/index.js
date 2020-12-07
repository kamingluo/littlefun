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
      let mall_type = e.currentTarget.dataset.data.mall_type;
      if (mall_type ==2){
        let num_iids = e.currentTarget.dataset.data.goods_id;
        let url = encodeURIComponent(e.currentTarget.dataset.data.search_id);
        wx.navigateTo({
          url: '/pages/extension/taobao/goodsdetails/goodsdetails?num_iids=' + num_iids + '&url=' + url
        })
        return;
      }
      let goods_id = e.currentTarget.dataset.data.goods_id;
      let search_id = e.currentTarget.dataset.data.search_id;
      if (!search_id){
        console.log("没有搜索id,商品id作为搜索id")
        search_id = goods_id;
      }
      console.log("跳转到商品详情页")
      wx.navigateTo({
        url: '/pages/extension/pdd/goodsdetails/goodsdetails?goods_id=' + goods_id + '&search_id=' + search_id
      })



    }
  }
})