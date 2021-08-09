const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const baseConfig = require('./../../utils/config.js')//配置文件
const common = require('./../../utils/common.js') //公共函数
Page({
  data: {
    recentlist:[],//记录数据

  },

  onLoad: function (options) {
    this.havedata()

  },
  //获取数据
  havedata:function(){
    request({
      service: 'record/recentlist',
      method: 'GET',
      success: res => {
        console.log('博主信息', res.recentlist)
        this.setData({
          recentlist: res.recentlist,
        })
      }
    })

  },
})