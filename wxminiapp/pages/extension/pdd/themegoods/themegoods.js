const app = getApp()
const {
  request
} = require('./../../../../utils/request.js');
Page({
  data: {
    goodslist:[],
    name:"主题名称"
  },

  onLoad: function (options) {
    var that = this
    let theme_id = options.theme_id;
    let name = options.name;
    request({
      service: 'pdd/themegoods/themegoodssearch',
      method: 'GET',
      data: {
        theme_id: theme_id,
      },
      success: res => {
        console.log("查询商品结果", res.goodsdata.theme_list_get_response.goods_list)
        let goodslist = res.goodsdata.theme_list_get_response.goods_list;
        that.setData({
          goodslist: goodslist,
          name:name
        })
      },
    })
  },
})