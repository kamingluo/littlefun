// pages/friends/friends.js

const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const scoreOperation = require('./../../utils/score.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendsdata: "",
    scoresum: 0,
    display: false, //是否展示
    gdtaddisplay: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.friendsdata()
    this.display()
    this.addisplay()

  },




  friendsdata: function () {
    var userid = wx.getStorageSync('userdata').id || 0
    request({
      service: 'friends/friendslist',
      data: {
        userid: userid
      },
      success: res => {
        this.setData({
          friendsdata: res.friendsdata,
          scoresum: res.scoresum,
        })
      },
    })
  },


  qrcode: function () {
    wx.navigateTo({
      url: '/pages/my/qrcode/qrcode'
    })

  },

  gdtbanneradclick: function (e) {
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('好友页面点击banner广告', data);
  },


  display: function () {
    this.setData({
      display: app.globalData.display || false
    })
  },



  addisplay: function () {
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    if (app.globalData.display) {
      let userdata = wx.getStorageSync('userdata')
      app.aldstat.sendEvent('点击好友页面分享', userdata);
      if (options.from == 'button') {
        return share(1);
      } else {
        return share(2);
      }
    } else {
      return;
    }

  }




})