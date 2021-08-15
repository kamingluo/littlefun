const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const baseConfig = require('./../../utils/config.js')//配置文件
const common = require('./../../utils/common.js') //公共函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    data:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.TabCur)
    this.havedata()

  },

  tabSelect(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    this.havedata()
  },

  havedata:function(){
    let day=this.data.TabCur;
    let service=null;
    if(day==3){
      service='Statistics/all'
    }
    else if(day==2){
      service='Statistics/timeslot?day=' + 7

    }
    else{
      service='Statistics/timeslot?day=' + day
    }
    request({
      service:service,
      method: 'GET',
      success: res => {
        console.log('博主信息', res);
        this.setData({
          data: res.data,
        })
      }
    })

  },



})