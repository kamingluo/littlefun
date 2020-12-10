// pages/exchange/exchange.js

const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const addata = require('./../../utils/addata.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist1: [],
    goodslist2: [],
    coin: '',
    alipayName:"",
    alipayNumber:"",
    exchangegood:{},
    fram:false,
    fram2: false,
    display: false, //是否展示
    moban: {},
    banneradlist: {}


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.goodsdata()
    let moban = addata.havemobansome()
    let banneradlist = addata.havebannersome()
    this.setData({
      moban: moban,
      banneradlist: banneradlist,
      display: app.globalData.display || false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.userdata()

  },


  //获取用户信息
  userdata: function () {
    wx.login({
      success: res => {
        request({
          service: 'user/userdata',
          data: {
            code: res.code,
          },
          success: res => {
            //console.log('获取用户信息', res);
            this.setData({
              coin: res.userdata.score,
            })
            wx.setStorageSync('userdata', res.userdata)
          },
        })
      }
    })
  },


  goodsdata: function() {
    request({
      service: 'exchange/goodslist',
      method: 'GET',
      success: res => {
        //console.log('兑换商品列表', res);
        this.setData({
          goodslist1: res.goodslist1,
          goodslist2: res.goodslist2,
        })
      }
    })

  },

  clickgoods: function(e) {

     let userdata = wx.getStorageSync('userdata')
      app.aldstat.sendEvent('点击商品兑换', userdata);

    var that =this
    console.log(e.currentTarget.dataset.goodsdata)
    if (that.data.coin < e.currentTarget.dataset.goodsdata.goodsPrice ){
      wx.showToast({
        title: "金币不足，快去赚金币吧！",
        icon: 'none',
        duration: 3000
      })
      return;
    }
    else if (e.currentTarget.dataset.goodsdata.goodsType != 0) {
      this.setData({
        exchangegood: e.currentTarget.dataset.goodsdata,
        fram2: true,
      })

    }
    else{
      this.setData({
        exchangegood: e.currentTarget.dataset.goodsdata,
        fram:true,
      })

    }


  },


  alipayName: function (e) {
    //console.log("姓名", e.detail.value)
    this.setData({
      alipayName: e.detail.value
    })
  },

  alipayNumber: function (e) {
    //console.log("账号", e.detail.value)
    this.setData({
      alipayNumber: e.detail.value
    })
  },
  submitexchangdata:function(e){
    var that =this
    //console.log("提交信息")
    if (that.data.alipayName.length < 2 || that.data.alipayNumber.length <6){
      wx.showToast({
        title: "信息错误，请重新填写！",
        icon: 'none',
        duration: 3000
      })
      return;
    }
    else{
      //console.log("开始兑换")
      that.exchange()
    }

  },

  closefram:function(){
    this.setData({
      fram: false,
      fram2: false,
    })
  },

  exchange:function(){
    wx.login({
      success: res => {
        let goodsid = this.data.exchangegood.id
        let alipayName = this.data.alipayName
        let alipayNumber = this.data.alipayNumber
        request({
          service: 'exchange/userexchange',
          data: {
            code: res.code,
            goodsid: goodsid,
            alipayName: alipayName,
            alipayNumber: alipayNumber,
          },
          success: res => {
            console.log('兑换成功', res);
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 3000
            })
            this.setData({
              fram: false
            }) 
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/my/exchange_detailed/exchange_detailed'
              })
            }, 2000);
           
          },
        })
      }
    })

  },


  gdtbanneradclick: function (e) {
    //console.log("点击广点通banner广告", e.currentTarget)
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('兑换页面点击广点通banner广告', data);
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})