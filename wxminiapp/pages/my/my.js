
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
    gdtmobanposition:{}//模板广告

  },

  onLoad: function (options) {
    this.addisplay()
    this.gdtmobanposition()
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

  gdtmobanadclick: function (e) {
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('我的页模板ad', data);
  },


  gdtmobanposition: function () {
    var that = this
    let number = Math.floor(Math.random() * 3)
    if (number == 1) {
      var gdtmobanposition = {
        mobanadposition1: 'adunit-ac1e750ff9040266',
        mobanadposition2: 'adunit-cdf3dc40b4cbaaeb',
        mobanadposition3: 'adunit-f99bb8a5241c5dff',
      }

    } else if (number == 2) {
      var gdtmobanposition = {
        mobanadposition1: 'adunit-cdf3dc40b4cbaaeb',
        mobanadposition2: 'adunit-f99bb8a5241c5dff',
        mobanadposition3: 'adunit-ac1e750ff9040266',
      }
    } else {
      var gdtmobanposition = {
        mobanadposition1: 'adunit-f99bb8a5241c5dff',
        mobanadposition2: 'adunit-ac1e750ff9040266',
        mobanadposition3: 'adunit-cdf3dc40b4cbaaeb',
      }
    }

    this.setData({
      gdtmobanposition: gdtmobanposition
    })


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