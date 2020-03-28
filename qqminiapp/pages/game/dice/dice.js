const app = getApp()
const {
  request
} = require('./../../../utils/request.js');
const scoreOperation = require('./../../../utils/score.js');
const {
  share
} = require('./../../../utils/share.js');


Page({
  data: {
    score: 0,
    bet: 0, // 下注的筹码
    betByCalculate: 0, // 用于计算
    sigleScore: 0, // 本次得分
    showDiceTemplateArray: [], // 用于存储显示哪些骰子模版
    showDiceArray: [0, 1, 2], // 用于存储随机数
    gaming: false, //判断是否在游戏中
    moneyClass: '', // 用于添加金额的动画类
    chipsClass: '', // 用于添加闪烁动画类
    finger: { // 用于移动定位
      Y: 0,
      X: 0
    },
    showBet: false, // 是否显示黑盘中的筹码
    timeArray: [],
    display: false,
    gdtaddisplay: false
  },
  putChip: function(event) {
    var that = this
    var chipsSum = Number(event.currentTarget.dataset.amount);
    that.setData({
      bet: chipsSum
    });
  },

  // 判断显示隐藏
  isHidden: function() {
    var templateNameArray = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    var showDiceArrayTemp = [];
    this.data.showDiceArray.forEach(function(item) {
      showDiceArrayTemp.push(templateNameArray[item]);
    });
    this.setData({
      showDiceTemplateArray: showDiceArrayTemp
    });
  },
  // 返回随机数
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  // 游戏开始,骰子变化
  changeDice: function(event) {

    let userdata = wx.getStorageSync('userdata')
      app.aldstat.sendEvent('点击玩骰子', userdata);
 
    var that = this;
    // 判断是否在游戏
    if (that.data.gaming) {
      return;
    }
    // 设置正在游戏中
    that.setData({
      gaming: true
    });

    // 设置用于该次游戏的赌注
    that.setData({
      betByCalculate: that.data.bet
    });
    // 判断赌注是否大于0 
    if (that.data.betByCalculate <= 0) {
      wx.showToast({
        title: '请选择筹码',
        icon: 'none',
        duration: 3000
      })
      // 附加闪烁动画
      that.setData({
        chipsClass: "blink-smooth",
      });
      // 清除闪烁动画
      setTimeout(function() {
        that.setData({
          chipsClass: '',
          gaming: false
        });
      }, 1000);
      return;

    }

    //判断金币是否足够参加

    if (that.data.betByCalculate > that.data.score) {
      wx.showToast({
        title: '金币不足',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    var t1 = setInterval(function() {
      that.data.showDiceArray = [that.getRandomInt(0, 5), that.getRandomInt(0, 5), that.getRandomInt(0, 5)];
      that.isHidden();
    }, 100);
    var t2 = setTimeout(function() {
      clearInterval(t1);
      that.calculateResult(event.currentTarget.dataset.type);
      // 设置没在游戏
      that.setData({
        gaming: false
      });
    }, 2000);
  },
  // 计算猜测结果
  calculateResult: function(userGuess) {
    var rule = {
      'big': function(sum) {
        return sum > 11 && sum < 17;
      },
      'small': function(sum) {
        return sum > 4 && sum < 10;
      }
    }
    var that = this;
    var sum = 3;
    var betByCalculate = that.data.betByCalculate;
    // 豹子
    if (that.data.showDiceArray[0] == that.data.showDiceArray[1] && that.data.showDiceArray[1] == that.data.showDiceArray[2]) {
      if (userGuess == 'leopard') {
        wx.showToast({
          title: '猜对了+' + betByCalculate * 24,
          icon: 'none',
          duration: 3000
        })
        //that.setUserScore(24 * betByCalculate);
        let score1 = that.data.score; //不知道为啥直接加就有问题
        let score2 = betByCalculate;
        let score3 = score1 - score2;
        let score4 = score3 + score2 + 24 * score2;
        // information.coin_operation(betByCalculate * 24, 2) //金币操作
        scoreOperation.increase(betByCalculate * 24, "猜大小赢得") //赢了添加积分,传入加积分的数值以及提示
        setTimeout(function() {
          that.setData({
            score: score4,
          });
        }, 500);
        return;
      }
    }
    // 选了豹子没中
    if (userGuess == 'leopard') {
      wx.showToast({
        title: '猜错了-' + betByCalculate,
        icon: 'none',
        duration: 3000
      })
      // information.coin_operation(betByCalculate, 1) //金币操作
      scoreOperation.reduce(betByCalculate, "猜大小输了") //输了扣除积分
      that.setData({
        score: that.data.score - betByCalculate
      });
      return;
    }
    for (let i = 0; i < that.data.showDiceArray.length; i++) {
      sum += that.data.showDiceArray[i];
    }
    if (rule[userGuess](sum)) {
      wx.showToast({
        title: '猜对了+' + betByCalculate,
        icon: 'none',
        duration: 3000
      })
      // that.setUserScore(betByCalculate);
      //console.warn("我是加积分之前啊", that.data.score)
      let score1 = that.data.score; //不知道为啥直接加就有问题
      let score2 = betByCalculate;
      let score3 = score1 - score2;
      let score4 = score3 + score2 + score2;
      // console.warn("我是加积分之后啊", score4)
      // information.coin_operation(betByCalculate, 2) //金币操作
      scoreOperation.increase(betByCalculate, "猜大小赢得") //赢了添加积分,传入加积分的数值以及提示
      setTimeout(function() {
        that.setData({
          score: score4,
        });
      }, 500);
    } else {
      wx.showToast({
        title: '猜错了-' + betByCalculate,
        icon: 'none',
        duration: 3000
      })
      // information.coin_operation(betByCalculate,1) //金币操作
      scoreOperation.reduce(betByCalculate, "猜大小输了") //输了扣除积分
      //that.setUserScore(-betByCalculate);
      that.setData({
        score: that.data.score - betByCalculate,
      });
    }
  },
  // 移动盘中筹码
  removeBet: function(event) {
    var that = this;
    if (that.data.bet <= 0) {
      return;
    }
    // 隐藏盘中筹码
    if (!that.data.showBet) {
      that.setData({
        showBet: true
      });
    }
    // 只需保存开始、结束时间
    if (that.data.timeArray.length > 1) {
      that.data.timeArray[1] = event.timeStamp;
    } else {
      // 将时间戳push到时间数组
      that.data.timeArray.push(event.timeStamp);
    }
    that.setData({
      finger: {
        Y: event.touches[0].clientY,
        X: event.touches[0].clientX
      }
    });
  },
  // 移动盘中筹码完毕
  removeBetEnd: function() {
    var that = this;
    if (that.data.timeArray.length > 1) {
      var startTime = that.data.timeArray[0];
      var endTime = that.data.timeArray[1];
      if (endTime - startTime > 10) {
        that.setData({
          showBet: false,
          bet: 0
        });
      }
      // 清空时间数组
      that.setData({
        timeArray: []
      })
    }

  },

  onLoad: function() {},

  //获取用户信息
  userdata: function() {
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
              score: res.userdata.score,
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


  onShow: function() {
    this.userdata()
    this.addisplay()
    this.isHidden();
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






  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (options) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('点击骰子页面分享', userdata);
    if (options.from == 'button') {
      return share(1);
    } else {
      return share(2);
    }
  }





})