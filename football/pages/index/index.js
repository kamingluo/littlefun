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
        wx.setStorageSync('userdata', res.userdata)
        this.setData({
          userdata: res.userdata,
        })
      }
    })
  },

  jump: function (e) {
    let id=e.currentTarget.dataset.data.id;
    let name=e.currentTarget.dataset.data.name;
    wx.navigateTo({
      url: '/pages/userrecord/userrecord?id=' + id + '&name=' + name
    })
  },
})
