const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const baseConfig = require('./../../utils/config.js')//配置文件
const common = require('./../../utils/common.js') //公共函数
Page({
  data: {
    userdata:[],
    status:[],//结果
    index:null,
    sindex:1,
    date: '',
    user_id:null,//选择的博主id
    odds:null,//倍率
    money:50,//金额
    state:1,//结果

  },


  push:function(){
    let date=this.data.date;
    let user_id=this.data.user_id;
    let odds=this.data.odds;
    let money=this.data.money;
    let state=this.data.state;
    let data={
      date:date,
      user:user_id,
      odds:odds,
      money:money,
      state:state
    }
    console.log("上传结果")
    console.log(data)

    request({
      service: 'record/add',
      method: 'POST',
      data: data,
      success: res => {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000,
        })
      }
    })
  },




  onLoad: function (options) {
     let userdata = wx.getStorageSync('userdata')
     let date=common.getNowFormatDate()
     let status=baseConfig.status;
     this.setData({
      userdata: userdata,
      date:date,
      status:status
    })
  },

//时间
  DateChange:function(e){
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
  
  //博主
  PickerChange(e) {
    let value=e.detail.value;
    var user_id = this.data.userdata[value].id;
    console.log("选择的博主id",user_id)
    this.setData({
      user_id: user_id,
      index: value
    })
  },

  //结果
  PickerState(e){
    let value=e.detail.value;
    var state = this.data.status[value].state;
    console.log("选择的结果状态",state)
    this.setData({
      state: state,
      sindex: value
    })
  },

//倍率
  odds:function(e){
    this.setData({
      odds: e.detail.value,
    })
  },

  //金额
  money:function(e){
    this.setData({
      money: e.detail.value,
    })
  },



})