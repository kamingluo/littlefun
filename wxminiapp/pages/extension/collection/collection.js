const {
  request
} = require('./../../../utils/request.js');
Page({

  data: {
    pages:1,
    count:0,
    goodslist:[]

  },

  onLoad: function (options) {
    this.getcollection(1)
  },

  getcollection:function(pages){
    var that = this
    let user_id = wx.getStorageSync('userdata').id;
    request({
      service: 'pdd/collection/usercollection',
      method: 'GET',
      data: {
        pages: pages,
        user_id: user_id
      },
      success: res => {
        console.log("查询商品结果", res.goodslist)
        let goodslist = this.data.goodslist;
        var newgoodslist = [...goodslist, ...res.goodslist];
        console.log(newgoodslist.length)
        that.setData({
          goodslist: newgoodslist,
          count: res.count
        })
      },
    })
  },


  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this
    var count = that.data.count;//拿到总数
    var pages = that.data.pages;
    if (pages * 20 >= count) {
      return;
    }
    else {
      let newpages = pages + 1;
      that.setData({
        pages: newpages
      })
      that.getcollection(newpages)
    }
  }







})