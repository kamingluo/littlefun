//index.js
//获取应用实例
const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const common = require('./../../utils/common.js') //公共函数
const task = require('./../../utils/task.js');
var Page = require('../../utils/sdk/xmad/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告

Page({
  data: {
    display: false,
    "swiperdata": [],
    "informationdata": [],
    "miniappaddata": [],
    "indexconfig": "",
    addapptips: false,
    gdtaddisplay: false,
    adid: '',
    setInter: '',
    num: 0,
    taskid: '', //任务id
    tasktime: null, //任务时间
    taskscore: null, //任务奖励
    adname: "", //AD名称
    gdtbannerposition: '', //广点通位置
    wlad: {
      adData: {},
      ad: {
        banner: ["banner0", "banner1", "banner2", "banner3"], //是否展示banner⼴广告，如不不需展示删掉该字段即可
      }
    },
    wladlist: null,
    xmad: { //小盟广告
      adData: {},
      ad: {
        banner1: "xma416450d58bf78f56f0b54c487624b",
        banner2: "xm68259e5bc52f94b364e86e1ee8aaaa",
        banner3: "xm285e32d8abf77e8ba321f97005d8f2",
        banner4: "xm4b6fd7c45bfc80a4e057693272702b",
        banner5: "xm478c5c0e15def0abcb93ccd2d57194",
      },
    },

  },
  onLoad: function(e) {
    this.indexData()
    this.indexconfig()
    this.miniappadData()
    this.gdtbannerposition()
    this.addisplay()
    this.setData({
      addapptips: app.globalData.addapptips || false, //添加小程序提示
      display: app.globalData.display //全局控制
    })

  },
  onShow: function() {
    this.playtask()
  },


  addisplay: function() {
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


  //查询首页数据
  indexData: function() {
    request({
      service: 'index/indexdata',
      method: 'GET',
      success: res => {
        //console.log('首页轮播图数据', res.swiperdata);
        //console.log('首页信息流数据', res.informationdata);
        this.setData({
          swiperdata: res.swiperdata,
          informationdata: res.informationdata
        })
      }
    })
  },

  //查询首页配置
  indexconfig: function() {
    request({
      service: 'index/indexconfig',
      method: 'GET',
      success: res => {
        console.log('首页配置数据', res.indexconfig);
        this.setData({
          indexconfig: res.indexconfig,
        })
        this.wladlist(res.indexconfig.wladnum)
      }
    })
  },


  //微量广告展示
  wladlist: function(number) {

    if (!app.globalData.display) {
      return;
    }

    var that = this
    var wladnumber = number
    // console.log("微量ad配置数量", wladnumber)
    var newwladlist = []
    for (var wl = 0; wl < wladnumber; wl++) {
      newwladlist.push([wl]);
    }
    that.setData({
      wladlist: newwladlist,
    });
    //console.log("微量newwladlist", newwladlist)
  },

  //点击轮播图
  clickSwiper: function(e) {
    //console.log("点击轮播图数据", e.currentTarget.dataset.data)
    common.insidejump(e.currentTarget.dataset.data)
  },

  clickInformation: function(e) {
    //console.log("点击信息流数据", e.currentTarget.dataset.data)
    common.insidejump(e.currentTarget.dataset.data)

  },




  miniappadData: function() {
    if (!app.globalData.display) {
      return;
    }
    request({
      service: 'index/miniappad',
      method: 'GET',
      success: res => {
        //console.log('首页miniapp数据', res.miniappdata);
        this.setData({
          miniappaddata: res.miniappdata
        })
      }
    })

  },
  clickminiappad: function(e) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('首页点击miniappad', userdata);
    var that = this
    //console.log("点击miniappadclick", e.currentTarget.dataset.data)
    var jumptype = e.currentTarget.dataset.data.type
    if (jumptype == 0) {
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.data.appid,
        path: e.currentTarget.dataset.data.Jump,
        extraData: e.currentTarget.dataset.data.extradata,
        success(res) {
          //console.log("跳转miniappad成功", e.currentTarget.dataset.data.Jump)
          that.startSetInter()
          that.setData({
            taskid: 0,
            taskscore: e.currentTarget.dataset.data.score,
            tasktime: e.currentTarget.dataset.data.playtime,
            adid: e.currentTarget.dataset.data.id,
            adname: e.currentTarget.dataset.data.name,
          })
        }
      })
    } else {
      //console.log("打开图片")
      let path = e.currentTarget.dataset.data.Jump
      wx.previewImage({
        urls: [path],
      })
      that.startSetInter()
      that.setData({
        taskid: 0,
        taskscore: e.currentTarget.dataset.data.score,
        tasktime: e.currentTarget.dataset.data.playtime,
        adid: e.currentTarget.dataset.data.id,
        adname: e.currentTarget.dataset.data.name,
      })

    }
  },

  clickwlad: function(e) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('首页点击微量广告', userdata);
    console.log("点击微量广告", e.target.dataset.id)
    var that = this
    that.startSetInter()
    var adname = "微量" + e.target.dataset.id
    var tasktime = that.data.indexconfig.wladtime || 15
    var taskscore = that.data.indexconfig.wladscore || 60
    that.setData({
      taskid: 1,
      taskscore: taskscore,
      tasktime: tasktime,
      adid: 999,
      adname: adname,
    })

  },

  startSetInter: function() {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function() {
        if (that.data.num > 40) {
          //console.log('大于40啦');
          clearInterval(that.data.setInter)
        }
        var numVal = that.data.num + 1;
        that.setData({
          num: numVal
        });
        //console.log('当前计时时间==' + that.data.num);
      }, 1000);
  },
  endSetInter: function() {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

  playtask: function() {
    var that = this
    clearInterval(that.data.setInter) //清除计时器
    //console.log("onshow展示任务id", that.data.taskid)
    if (that.data.taskid == null || that.data.num == 0) {
      //console.log("时间等于0或者任务id等于空")
      return;
    }
    var adid = that.data.adid || 1
    var score = that.data.taskscore || 60
    var adname = that.data.adname || "任务名称空"
    var tasktime = that.data.tasktime || 15


    if (that.data.num >= tasktime) {
      if (that.data.taskid == 0) {
        task.clickminiappad(adid, score, adname)
      } else if (that.data.taskid == 1) {
        task.clickwlad(adid, score, adname)
      } else {
        task.clickbannerad(adid, score)
      }

    } else {
      that.wxshowToast("体验满时间成功才能获得奖励哦！")

    }
    //console.log("将时间恢复0")
    this.setData({
      num: 0,
      taskid: "",
    });

  },


  wxshowToast: function(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2500
    })

  },


  nobannerad: function() {
    //console.log("没有广告源")
    this.wxshowToast("暂无广告")
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('首页banner暂无广告源', userdata);

  },



  gdtbannerposition: function() {
    var that = this
    let number = Math.floor(Math.random() * 3)
    if (number == 1) {
      var gdtbannerposition = {
        banneradposition1: 'adunit-fde1086480d42cdc',
        banneradposition2: 'adunit-67a9b0ba2506718f',
        banneradposition3: 'adunit-146df4b99bbc1595',
      }

    } else if (number == 2) {
      var gdtbannerposition = {
        banneradposition1: 'adunit-67a9b0ba2506718f',
        banneradposition2: 'adunit-146df4b99bbc1595',
        banneradposition3: 'adunit-fde1086480d42cdc',
      }
    } else {
      var gdtbannerposition = {
        banneradposition1: 'adunit-146df4b99bbc1595',
        banneradposition2: 'adunit-fde1086480d42cdc',
        banneradposition3: 'adunit-67a9b0ba2506718f',
      }
    }

    this.setData({
      gdtbannerposition: gdtbannerposition
    })

    setTimeout(function() {
      that.setData({
        gdtbanneraddelay1: true
      })
      that.gdtbanneraddelay()
    }, 3500);

  },


  gdtbanneraddelay: function() {
    //console.log("执行我了")
    var that = this
    setTimeout(function() {
      that.setData({
        gdtbanneraddelay2: true
      })
    }, 7000);
  },


  gdtbanneradclick: function(e) {
    var that = this
    //console.log("点击广点通banner广告", e.currentTarget)
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('首页点击广点通banner广告', data);

    var tasktime = that.data.indexconfig.gdtadtime || 12
    var taskscore = that.data.indexconfig.gdtadscore || 60
    that.setData({
      taskid: 2,
      taskscore: taskscore,
      tasktime: tasktime,
      adid: e.currentTarget.dataset.name,
      adname: "广点通首页ad",
    })
    that.startSetInter()


  },






  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('点击首页分享', userdata);
    if (options.from == 'button') {
      return share(1);
    } else {
      return share(2);
    }
  }


})