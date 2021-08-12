const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const baseConfig = require('./../../utils/config.js')//配置文件
const common = require('./../../utils/common.js') //公共函数
Page({
  data: {
    recentlist:[],//记录数据
    editdata:{},//编辑的数据
    editModle:false,//编辑弹框
    status:[],//结果
    sindex:0,
  },

  onLoad: function (options) {
    let status=baseConfig.status;
    this.setData({
      status:status
    })
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

  //跳转到博主详情
  jump: function (e) {
    let id = e.currentTarget.dataset.data.user;
    let name = e.currentTarget.dataset.data.name;
    wx.navigateTo({
      url: '/pages/userrecord/userrecord?id=' + id + '&name=' + name
    })
  },

  //调起编辑弹框
  edit:function(e){
    let data=e.currentTarget.dataset.data;
    let sindex=e.currentTarget.dataset.data.state;
    console.log(sindex)
    this.setData({
      editdata: data,
      sindex:sindex,
      editModle:true
    })
  },
  hideModal:function(){
    this.setData({
      editModle:false
    })
  },

  
  //结果
  PickerState(e){
    let value=e.detail.value;
    var state = this.data.status[value].state;
    let editdata=this.data.editdata;
    editdata.state=state
    console.log("选择的结果状态",state)
    this.setData({
      editdata: editdata,
      sindex: value
    })
  },

//倍率
  odds:function(e){
    let editdata=this.data.editdata;
    editdata.odds=e.detail.value
    this.setData({
      editdata: editdata,
    })
  },

  //金额
  money:function(e){
    let editdata=this.data.editdata;
    editdata.money=e.detail.value
    this.setData({
      editdata: editdata,
    })
  },

  //确认修改
  queryedit:function(){
    let data=this.data.editdata;
    request({
      service: 'record/update',
      method: 'POST',
      data: data,
      success: res => {
        this.havedata()
        this.setData({
          editModle:false,
        })
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000,
        })
      }
    })

  }

})