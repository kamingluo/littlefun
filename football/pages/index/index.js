//index.js
//获取应用实例
const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const baseConfig = require('./../../utils/config.js')//配置文件

Page({
  data: {
    userdata:[]
  },
 
  onLoad: function () {
    request({
      service: 'user/usersdata',
      method: 'GET',
      success: res => {
        console.log('博主信息', res);
        this.setData({
          userdata: res.userdata,
        })
      }
    })
  },

  jump: function (e) {
    wx.navigateTo({
      url: '/pages/my/exchange_detailed/exchange_detailed'
    })
  },
})
