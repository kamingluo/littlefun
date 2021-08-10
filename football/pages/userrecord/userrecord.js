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
    name:'博主名称',
    id:null,
    listdata:[],
    editdata:{},//编辑的数据
    editModle:false,//编辑弹框
    status:[],//结果
    sindex:0,

    //新增数据
    addModel:false,
    newsindex:0,
    adddata:{
      date: '',
      odds:null,//倍率
      money:50,//金额
      state:0,//结果
    }

  },

  onLoad: function (options) {

    let status=baseConfig.status;
    let id=options.id;
    let name=options.name;
    let date=common.getNowFormatDate()
    let adddata=this.data.adddata;
    adddata.date=date;
    this.setData({
      adddata:adddata,
      status:status,
      id:id,
      name:name
    })
    this.havedata()
  },

  havedata:function(){
    let id=this.data.id
    request({
      service: 'record/recorddata',
      method: 'POST',
      data: {
        user_id:id
      },
      success: res => {
        this.setData({
          listdata:res.data
        })
      }
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
      editModle:false,
      addModel:false
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

  },


  //调起新增弹框
  add:function(){
    this.setData({
      addModel: true,
    })
  },



    //结果
    newPickerState(e){
      let value=e.detail.value;
      var state = this.data.status[value].state;
      let adddata=this.data.adddata;
      adddata.state=state
      console.log("选择的结果状态",state)
      this.setData({
        adddata: adddata,
        newsindex: value
      })
    },
  
  //倍率
    newodds:function(e){
      let adddata=this.data.adddata;
      adddata.odds=e.detail.value
      this.setData({
        adddata: adddata,
      })
    },
  
    //金额
    newmoney:function(e){
      let adddata=this.data.adddata;
      adddata.money=e.detail.value
      this.setData({
        adddata: adddata,
      })
    },
  

      //确认新增
  queryadd:function(){
    let data=this.data.adddata;
    data.user=this.data.id;
    console.log("新增记录",data)
    request({
      service: 'record/add',
      method: 'POST',
      data: data,
      success: res => {
        this.havedata()
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000,
        })
        this.setData({
          addModel:false
        })
      }
    })
  },



  
})