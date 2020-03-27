// pages/test/test.js


const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const task = require('./../../utils/task.js');

const scoreOperation = require('./../../utils/score.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    setInter: '',
    num: 0,
    zxad: {
      adData: {},
      ad: {
        banner: ["banner"], //是否展示 banner 广告，如不展示删掉即可
        insert: "insert", //是否展示插屏广告，如不展示删掉即可
        fixed: "fixed" //是否展示右下悬浮广告，如不展示删掉即可
      }
    }
  },


  increaseScore: function () {
    scoreOperation.increase(80, "积分增加测试")

  },

  reduceScore: function () {
    scoreOperation.reduce(80, "积分减少测试")

  },


  havecode: function () {
    wx.login({
      success: function (res) {
        console.log("用户code：：：：：：", res.code)
      }
    })

  },

  testjumpminiapp: function () {
    wx.navigateToMiniProgram({
      appId: 'wxdb8afdceb2e24d7a',
      path: 'pages/index/index?pakey=551066f6',
      extraData: '',
      success(res) {
        console.log("跳转成功", e.currentTarget.dataset.data.Jump)
      }
    })
  },

  lookvideoad: function () {
    task.lookvideoad(1111, 100)

  },



  clickbannerad: function () {
    task.clickbannerad(2222, 90)
  },

  clickminiappad: function () {
    let taskstuta = task.clickminiappad(3333, 80, "点击clickminiappad")
    console.log(taskstuta)
  },

  clickwlad: function () {
    let taskstuta = task.clickwlad(4444, 70, "点击clickwlad")
    console.log(taskstuta)
  },

  signin: function () {
    let taskstuta = task.signin(60)
    console.log(taskstuta)
  },

  signdouble: function () {
    let taskstuta = task.signdouble()
    console.log(taskstuta)
  },


  share: function () {
    let taskstuta = task.share(50)
    console.log(taskstuta)

  },


  buttonzujian: function (e) {
    console.log("测试组件", e)
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
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
    console.log('onShow时间==' + this.data.num);
    clearInterval(this.data.setInter)
    this.setData({
      num: 0
    });

  },


  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var numVal = that.data.num + 1;
        that.setData({
          num: numVal
        });
        console.log('setInterval==' + that.data.num);
      }, 1000);
  },
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },







  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.startSetInter()

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