
const app = getApp()
const {
  request
} = require('./../../../utils/request.js');
const scoreOperation = require('./../../../utils/score.js');
const addata = require('./../../../utils/addata.js')

const {
  share
} = require('./../../../utils/share.js');


var sysind=0;
var time='';
Page({
  data: {
    imgs:['jiandao.png', 'shitou.png', 'bu.png'],
    userimg:'souces/dian.svg',
    liveimg:'souces/bu.png',
    start:true,
    stop:false,
    result:'',
    jifen:"",
    word:'开始',
    coin:'',
    display:false,
    moban: {},
    banneradlist: {},
    gdtaddisplay: false
   
  },

  onLoad: function () {
    let moban = addata.havemobansome()
    let banneradlist = addata.havebannersome()
    this.setData({
      moban: moban,
      banneradlist: banneradlist
    })
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var jifen = wx.getStorageSync("jifen");
    // this.setData({
    //   jifen: jifen
    // })
    // 
    this.userdata()
    this.addisplay()
    
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
              coin: res.userdata.score,
            })
            wx.setStorageSync('userdata', res.userdata)
          },
          fail: res => {
            console.log('错误捕捉', res);
          },
        })
      }
    })

  },


  again:function(){
      var that = this;
      if (sysind < 2) {
        sysind++;
      } else {
        sysind = 0;
      }
      that.setData({
        liveimg: 'souces/' + that.data.imgs[sysind]
      })
  },
  chooseimg:function(e){
    var that =this
    if (that.data.stop){
      return;
    }
    //还未开始
    if (that.data.start) {
      return;
    }
    clearInterval(time);
    var userind = e.currentTarget.dataset.id;
    var resulttxt='';
    var coin=that.data.coin;
    if (sysind ==userind){
      resulttxt='平局'
    } else if (sysind == 0 && userind == 2 || sysind == 1 && userind == 0 || sysind == 2 && userind == 1){   //剪刀是0，石头是1，布是2
       resulttxt='你输了'
       scoreOperation.reduce(100, "猜拳输了")//输了扣除积分
       that.wxshowToast("扣除金币-100")
       coin=that.data.coin - 100
    }else{
      resulttxt ='你赢了';
      scoreOperation.increase(100, "猜拳赢得")//赢了添加积分,传入加积分的数值以及提示
      that.wxshowToast("赢得金币+100")
      coin=that.data.coin + 100
    }
    that.setData({
      stop:true,
      userimg: 'souces/' + that.data.imgs[userind],
      result:resulttxt,
      coin: coin
    })
    
  },

   wxshowToast:function(title){
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 3000
    })

  },

  exchange:function(){
    wx.navigateTo({
      url: '/pages/exchange/exchange'
    })
  },
  havecoin:function(){
    wx.switchTab({
      url: '/pages/task/task'
    })

  },

  continuego:function(){

    let userdata = wx.getStorageSync('userdata')
      app.aldstat.sendEvent('点击猜拳', userdata);

    if(this.data.coin < 100 ){
       this.wxshowToast("金币不足,先去赚金币吧！")
       return;
    }

    if(this.data.stop){  
      console.log("1111111")   
      time=setInterval(this.again, 100);
      this.setData({
        stop:false,
        result:'',
        userimg:'souces/dian.svg',
      })
    }
    if (this.data.start){   
      console.log("22222222")  
      time = setInterval(this.again, 100);
      this.setData({
        start: false,
        word:'继续',
        userimg: 'souces/dian.svg',
      })
    }
  },



  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function (options) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('点击猜拳页面分享', userdata);
    if (options.from == 'button') {
      return share(1);
    } else {
      return share(2);
    }
  }





})
