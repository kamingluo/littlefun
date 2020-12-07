const app = getApp();
const {
  request
} = require('./../../../../utils/request.js');
Page({
  data: {
    goodsdata: {},
    taokouling: null,//淘口令
    ifcollection: false,
    num_iids: null,
    url: null,
    coupondata:{},
    display:true
  },

  onLoad: function (options) {
    console.log(options)
    let num_iids = options.num_iids;
    let url = decodeURIComponent(options.url) ;
    let display=app.globalData.display || false;
    this.setData({
      num_iids: num_iids,
      url: url,
      display:display
    })
    this.goodsdata(num_iids) //查询商品详情和优惠券放
    this.miniappurl(url) //获取淘口令
    this.whethercollection(num_iids) //查询用户是否有收藏
  },



  //复制淘口令
  purchase: function () {
    var that=this;
    let taokouling = this.data.taokouling
    wx.setClipboardData({
      data: taokouling,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000,
        })
        that.commercestatistics()
      }
    })

  },

    //用户跳转成功统计
    commercestatistics: function () {
      let user_id = wx.getStorageSync('userdata').id || 0;
      let channel = wx.getStorageSync('channel').id || 0;
      let mall_type = 2;
      let goods_image_url = this.data.goodsdata.pict_url;
      let goods_name = this.data.goodsdata.title;
      let sales_tip = this.data.goodsdata.volume;
      let min_group_price = this.data.goodsdata.zk_final_price;
      let coupon_discount = this.data.coupondata.coupon_amount;
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
  goodsdata: function (num_iids) {
    request({
      service: 'taobao/Search/goodsdetail',
      method: 'GET',
      data: {
        num_iids: num_iids,
      },
      success: res => {
        //  console.log("商品详情", res)
        console.log("商品详情", res.goodsdetail.tbk_item_info_get_response.results.n_tbk_item[0])
        console.log("优惠券详情", res.coupondata)
        let coupondata = res.coupondata.tbk_coupon_get_response;
        if (coupondata){
          console.log("有优惠券")
          this.setData({
            goodsdata: res.goodsdetail.tbk_item_info_get_response.results.n_tbk_item[0],
            coupondata: res.coupondata.tbk_coupon_get_response.data
          })

        }
        else{
          console.log("无优惠券")
          this.setData({
            goodsdata: res.goodsdetail.tbk_item_info_get_response.results.n_tbk_item[0],
            coupondata: {}
          })

        }
        
      },
    })
  },


  //获取跳转链接
  miniappurl: function (url) {
    request({
      service: 'taobao/Search/tpwdcreate',
      method: 'GET',
      data: {
        url: url,
      },
      success: res => {
        console.log("生成淘口令", res.tpwddata.tbk_tpwd_create_response.data.password_simple)
        this.setData({
          taokouling: res.tpwddata.tbk_tpwd_create_response.data.password_simple
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
    let goods_id = this.data.num_iids;
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
    let goods_id = this.data.num_iids;
    let search_id = this.data.url;
    let mall_type = 2;
    let goods_image_url = this.data.goodsdata.pict_url;
    let goods_name = this.data.goodsdata.title;
    let mall_name = this.data.goodsdata.nick;
    let sales_tip = this.data.goodsdata.volume;

    let min_group_price = this.data.goodsdata.zk_final_price * 100;
    let coupon_discount = this.data.coupondata.coupon_amount * 100;
    if (!coupon_discount || coupon_discount==null ) {
      coupon_discount = 0;
    }
    let has_coupon=0;
    let ifcoupon = this.data.coupondata.coupon_amount;
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
    let num_iids = this.data.num_iids;
    let url = this.data.url;
    let goods_image_url = this.data.goodsdata.pict_url;
    let goods_name = this.data.goodsdata.title;
    let mall_type = 1;
    return {
      title:goods_name,
      desc:goods_name,
      imageUrl: goods_image_url,
      path: '/pages/extension/extension?channel=1006&mall_type=2&num_iids=' + num_iids + '&url=' + url, // 分享传递商品id和生成淘口令链接，加上商城类型。
    }
   
  }




});