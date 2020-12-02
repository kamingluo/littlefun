// pages/task/extension/extension.js
const app = getApp()
const {
  request
} = require('./../../../utils/request.js');
var Page = require('../../../utils/sdk/xmad/xmadx_sdk.min.js').xmad(Page).xmPage; 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadModal:true,
    state:false,
    extensiondata:null,
    tiaozhuan:false,

  },

  index:function(){
    app.aldstat.sendEvent('单页推广点击更多好玩');
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.state==0){
      this.setData({
        state: true,
      })
    }
    this.extension()

  },


  //查询推广配置
  extension: function () {

    if (!app.globalData.display) {
      this.setData({
        loadModal: false,
      })
      return;
    }
    request({
      service: 'ad/miniappad/extension',
      method: 'GET',
      success: res => {
        //console.log('extension配置数据', res.extensiondata);
        this.setData({
          extensiondata: res.extensiondata,
          loadModal: false,
        })
      }
    })
  },


  clickjump:function(){
    //console.log("点击跳转")

    wx.navigateToMiniProgram({
      appId: this.data.extensiondata.appid,
      path: this.data.extensiondata.Jump,
      extraData: this.data.extensiondata.extradata,
      success: res => {
        this.setData({
          tiaozhuan: true,
        })
        //console.log("跳转miniappad成功")
        let userdata = wx.getStorageSync('userdata')
        app.aldstat.sendEvent('单页推广跳转小程序成功', userdata);
      },
    })

  },




  gdtbanneradclick: function (e) {
    addata= e.currentTarget.dataset;//这里就能触发点击事件并且能拿到广告id
    let userdata = wx.getStorageSync('userdata')//拿到用户信息
    let data = Object.assign(userdata, addata); //将用户信息和广告数据合并

    //我这里下面是上传阿拉丁统计，你也可以通过接口上传到你的统计
    app.aldstat.sendEvent('单页推广点击广点通banner广告', data);
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
    if (this.data.tiaozhuan && this.data.extensiondata.onshowjump !=0 ){
      let userdata = wx.getStorageSync('userdata')
      app.aldstat.sendEvent('单页推广跳转首页', userdata);
      wx.switchTab({
        url: '/pages/index/index'
      })

    }
    else{
      return ;
      //console.log("不跳转")
    }

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
  onShareAppMessage: function () {

  }
})