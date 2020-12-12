const app = getApp();
const {
  request
} = require('./../../../../utils/request.js');
const addata = require('./../../../../utils/addata.js')
Page({
  data: {
    goodsdata: {},
    miniappurldata: {},
    ifcollection: false,
    goods_id: null,
    search_id: null,
    moban: {},
    banneradlist: {},
  },
  onLoad: function (options) {
    console.log(options)
    let search_id = options.search_id || 0;
    let goods_id = Number(options.goods_id);
    this.setData({
      goods_id: goods_id,
      search_id: search_id
    })
    let newgoodsid = [goods_id];

    let moban = addata.havemobansome()
    let banneradlist = addata.havebannersome()
    this.setData({
      moban: moban,
      banneradlist: banneradlist
    })

    this.goodsdata(newgoodsid)
    this.miniappurl(newgoodsid, search_id)
    this.whethercollection(goods_id)
  },



  //点击购买
  purchase: function () {
    var that=this;
    let jumpurl = this.data.miniappurldata.page_path
    let appid = this.data.miniappurldata.app_id
    wx.navigateToMiniProgram({
      appId: appid,
      path: jumpurl,
      success(res) {
        console.log("跳转小程序成功")
        that.commercestatistics()
      }
    })

  },

    //用户跳转成功统计
    commercestatistics: function () {
      let user_id = wx.getStorageSync('userdata').id || 0;
      let channel = wx.getStorageSync('channel').id || 0;
      let mall_type = 1;
      let goods_image_url = this.data.goodsdata.goods_thumbnail_url;
      let goods_name = this.data.goodsdata.goods_name;
      let sales_tip = this.data.goodsdata.sales_tip;
      let min_group_price = this.data.goodsdata.min_group_price;
      let coupon_discount = this.data.goodsdata.coupon_discount;
      if (!coupon_discount) {
        coupon_discount = 0;
      }
      request({
        service: 'statistics/commercestatistics',
        method: 'GET',
        data: {
          user_id: user_id,
          channel:channel,
          mall_type: mall_type,
          goods_image_url: goods_image_url,
          goods_name: goods_name,
          sales_tip: sales_tip,
          min_group_price: min_group_price,
          coupon_discount: coupon_discount,
        },
        success: res => {
          console.log("统计成功", res)
        },
      })
    },




  //获取商品详情
  goodsdata: function (goodsid) {
    request({
      service: 'pdd/Search/goodsdetail',
      method: 'GET',
      data: {
        goods_id: goodsid,
      },
      success: res => {
        console.log("商品详情", res.goodsdetails.goods_detail_response.goods_details[0])
        this.setData({
          goodsdata: res.goodsdetails.goods_detail_response.goods_details[0],
        })
      },
    })
  },


  //获取跳转链接
  miniappurl: function (goodsid, search_id) {
    request({
      service: 'pdd/Search/goodspromotion',
      method: 'GET',
      data: {
        goods_id: goodsid,
        search_id: search_id
      },
      success: res => {
        //console.log("跳转信息", res.goodsurldata.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info)
        this.setData({
          miniappurldata: res.goodsurldata.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info,
        })
      },
    })
  },

  //回到首页
  gohome:function(){
    wx.switchTab({
      url: '/pages/extension/extension'
    })

  },



  //查询用户有没有收藏该商品
  whethercollection: function (goodsid) {
    let user_id = wx.getStorageSync('userdata').id || 0;
    request({
      service: 'pdd/collection/whethercollection',
      method: 'GET',
      data: {
        goods_id: goodsid,
        user_id: user_id
      },
      success: res => {
        console.log("收藏信息", res)
        this.setData({
          ifcollection: res.ifcollection,
        })
      },
    })
  },


  //用户取消收藏
  deletecollection: function (goodsid) {
    
    let user_id = wx.getStorageSync('userdata').id || 0;
    let goods_id = this.data.goods_id;
    request({
      service: 'pdd/collection/deletecollection',
      method: 'GET',
      data: {
        goods_id: goods_id,
        user_id: user_id
      },
      success: res => {
        console.log("取消收藏", res)
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          duration: 2000,
        })
        this.setData({
          ifcollection: false,
        })
      },
    })
  },


  //用户收藏商品
  goodscollection: function () {
    let user_id = wx.getStorageSync('userdata').id || 0;
    let goods_id = this.data.goods_id;
    let search_id = this.data.search_id || 0;
    let mall_type = 1;
    let goods_image_url = this.data.goodsdata.goods_thumbnail_url;
    let goods_name = this.data.goodsdata.goods_name;
    let mall_name = this.data.goodsdata.mall_name;
    let sales_tip = this.data.goodsdata.sales_tip;
    let min_group_price = this.data.goodsdata.min_group_price;
    let coupon_discount = this.data.goodsdata.coupon_discount;
    if (!coupon_discount) {
      coupon_discount = 0;
    }
    let has_coupon=0;
    let ifcoupon = this.data.goodsdata.has_coupon;
    if (ifcoupon){
      has_coupon=1;
    }
    request({
      service: 'pdd/collection/goodscollection',
      method: 'GET',
      data: {
        user_id: user_id,
        goods_id: goods_id,
        search_id: search_id,
        mall_type: mall_type,
        goods_image_url: goods_image_url,
        goods_name: goods_name,
        mall_name: mall_name,
        sales_tip: sales_tip,
        min_group_price: min_group_price,
        coupon_discount: coupon_discount,
        has_coupon:has_coupon
      },
      success: res => {
        console.log("收藏成功", res)
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 2000,
        })
        this.setData({
          ifcollection: true,
        })
      },
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let goods_id = this.data.goods_id;
    let search_id = this.data.search_id || 0;
    let goods_image_url = this.data.goodsdata.goods_thumbnail_url;
    let goods_name = this.data.goodsdata.goods_name;
    let mall_type = 1;
    return {
      title:goods_name,
      desc:goods_name,
      imageUrl: goods_image_url,
      path: '/pages/extension/extension?channel=1006&mall_type=1&goods_id='+goods_id+'&search_id='+search_id, // 分享传递商品id和搜索id，加上商城类型。
    }
   
  }




});