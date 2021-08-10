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

  //调起编辑弹框
  edit:function(e){
    let data=e.currentTarget.dataset.data;
    this.setData({
      editdata: data,
      editModle:true
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