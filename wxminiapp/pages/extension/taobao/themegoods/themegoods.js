const app = getApp()
const {
  request
} = require('./../../../../utils/request.js');
Page({
  data: {
    goodslist: [],
    name: "主题名称",
    page:1,
    material_id:null
  },

  onLoad: function (options) {
    var that = this
    let material_id = options.material_id;
    let name = options.name;
    this.setData({
      material_id: material_id,
      name: name
    })
    this.getgoodslist()
  },

  getgoodslist:function(){
    var that=this;
    let material_id = this.data.material_id;
    let page =this.data.page;
    request({
      service: 'taobao/search/optimusmaterial',
      method: 'GET',
      data: {
        material_id: material_id,
        page:page
      },
      success: res => {
        console.log("淘宝物料精选商品流", res.goodsdata.tbk_dg_optimus_material_response.result_list.map_data)
        // let goodslist = res.goodsdata.theme_list_get_response.goods_list;
        // that.setData({
        //   goodslist: goodslist,
        //   name:name
        // })

        let goodslist = that.data.goodslist;
        let newgoodslist = [...goodslist, ...res.goodsdata.tbk_dg_optimus_material_response.result_list.map_data];
        that.setData({
          goodslist: newgoodslist,
        })
      },
    })

  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    //console.log(e)
    if (e.scrollTop > 1000) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },


  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this
    let page = that.data.page;
    let newpage = page + 1;
    that.setData({
      page: newpage
    })
    that.getgoodslist()
  }


})