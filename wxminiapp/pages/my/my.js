
const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
var Page = require('../../utils/sdk/xmad/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告

Page({

  data: {
    userdata:'',
    display: false, //是否展示
    gdtaddisplay: false, //视频是否展示展示
    xmad: {//小盟广告
      adData: {},
      ad: {
        banner3: "xm285e32d8abf77e8ba321f97005d8f2",
        banner4: "xm4b6fd7c45bfc80a4e057693272702b",
        banner5: "xm478c5c0e15def0abcb93ccd2d57194",
      },
    },

  },

  onLoad: function (options) {
    this.addisplay()
  },

  onShow: function () {
    this.userdata()

  },





  addisplay: function () {

    this.setData({
      display: app.globalData.display || false
    })

    let userchannel = wx.getStorageSync('userdata').channel
    let scene = wx.getStorageSync('userdata').scene
    if (userchannel == null || userchannel == 0 && scene == 1047) {
      this.setData({
        gdtaddisplay: false
      })
    } else {
      this.setData({
        gdtaddisplay: true
      })
    }

  },

 //获取用户信息
  userdata:function(){
    wx.login({
      success: res => {
        request({
          service: 'user/userdata',
          data: {
            code: res.code,
          },
          success: res => {
           // console.log('我的页面获取用户信息', res);
            this.setData({
              userdata: res.userdata,
            })
            wx.setStorageSync('userdata', res.userdata)
          },
          fail: res => {
            //console.log('错误捕捉', res);
          },
        })
      }
    })

  },


  tenmiao:function(){
    wx.navigateTo({
      url: '/pages/game/tenseconds/tenseconds'
    })
  },
  exchange:function(){
    wx.navigateTo({
      url: '/pages/exchange/exchange'
    })

  },
 
  qrcode:function(){
    wx.navigateTo({
      url: '/pages/my/qrcode/qrcode'
    })

  },

  userscorerecord:function(){
    wx.navigateTo({
      url: '/pages/my/score_detailed/score_detailed'
    })
  },

  userchangelist:function(){
    wx.navigateTo({
      url: '/pages/my/exchange_detailed/exchange_detailed'
    })

  },

  testpages: function () {
    console.log("long tap")
    wx.navigateTo({
      url: '/pages/test/test'
    })

  },

  gdtbanneradclick: function (e) {
    //console.log("点击广点通banner广告", e.currentTarget)
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('我的页面点击广点通banner广告', data);
  },

  gdtvideoadclick: function (e) {
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('我的页gdt视频ad', data);
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('点击我的页面分享', userdata);
    if (options.from == 'button') {
      return share(1);
    } else {
      return share(2);
    }
  }
})