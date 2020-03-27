
const app = getApp()
const {
  request
} = require('./../../../utils/request.js');
const scoreOperation = require('./../../../utils/score.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    setInter: '',
    time: 0,
    num: 0,
    gametype:2,
    gamenum:0,
    gamescore:100,
    todaynum:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // this.startSetInter()

  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.usergamedata()
  },

  //用户今日数据
  usergamedata: function () {
    var that=this
    wx.login({
      success: res => {
        request({
          service: 'game/tenseconds/usertensecondsdata',
          data: {
            code: res.code,
          },
          success: res => {
            console.log(res)
            that.setData({
              gamenum: res.gamenumber,
              gamescore: res.score,
              todaynum: res.todaynum
            });
            that.gametype()
          },
        })
      }
    })
  },



  //开始游戏
  startgame:function(){
    this.reduce()
    this.setData({
      gametype: 1,
      time: 0,
      num: 0,
    });

    this.startSetInter()

  },

  //用户减次数
  reduce: function () {
    var that = this
    wx.login({
      success: res => {
        request({
          service: 'game/tenseconds/reduce',
          data: {
            code: res.code,
          },
          success: res => {
            that.setData({
              gamenum: res.gamenumber,
            });
          },
        })
      }
    })
  },

  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        if (that.data.time >15){
          that.endSetInter()
        }
        if (that.data.num == 100) {
          var numVal = 0
          var timeVal = that.data.time + 1;
        }
        else {
          var numVal = that.data.num + 1;
          var timeVal = that.data.time;
        }
        that.setData({
           num: numVal,
           time: timeVal
         });
        // console.log('setInterval==' + that.data.num);
      }
      , 10);
  },


  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
    that.gametype()
    that.result()
  },



  onUnload: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

  insufficient:function(){
    wx.showToast({
      title: '挑战次数不足',
      icon:'none',
    })
  },

  result:function(){
    var that = this;
    if (that.data.time === 10 && that.data.num === 0 )
    {

      that.gamewin()
      wx.showToast({
        title: '挑战成功,增加金币',
        icon: 'none',
        duration: 3000
      })
    }
    else{
      wx.showToast({
        title: '挑战失败',
        icon: 'none',
        duration: 3000
      })
    }
  },

  //挑战成功获得金币
  gamewin: function () {
    wx.login({
      success: res => {
        request({
          service: 'game/tenseconds/addscore',
          data: {
            code: res.code,
          },
          success: res => {
          },
        })
      }
    })
  },

  gametype:function(){
    if (this.data.gamenum>0)
    {
      this.setData({
        gametype: 0,
      });

    }
    else{
      this.setData({
        gametype: 2,
      });
    }

  },

  clickvideoad:function(){
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('十秒看视频', userdata);
    var that = this;
    // 在页面中定义激励视频广告
    let videoAd = null
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-0560e4c071403ecd'
      })
      videoAd.onLoad(() => {
      })
      videoAd.onError((err) => {
      })
      videoAd.onClose((res) => {
        //console.log("点击关闭视频广告", res)
        if (res && res.isEnded || res === undefined) {
          that.add()
          //console.log("正常播放结束，可以下发游戏奖励")
        } else {
          that.wxshowToast("观看完成才能获得次数哦！")
          //console.log("播放中途退出，不下发游戏奖励")
        }
      })
    }
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        //console.log("失败重试")
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            //console.log('激励视频 广告显示失败')
            that.wxshowToast("暂无广告,等会再试试！")
          })
      })
    }

  },



  wxshowToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2500
    })
  },

  //观看视频完成给用户加挑战次数

  add:function(){
    var that=this
    wx.login({
      success: res => {
        request({
          service: 'game/tenseconds/add',
          data: {
            code: res.code,
          },
          success: res => {
            that.setData({
              gametype: 0,
              gamenum: res.gamenumber,
              todaynum: res.todaynum,
            });
            that.wxshowToast("观看完成,增加次数！")
          },
        })
      }
    })
  },

  gdtbanneradclick: function (e) {
    //console.log("点击广点通banner广告", e.currentTarget)
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('十秒挑战banner', data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})