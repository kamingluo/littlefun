// pages/userrecord/userrecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'博主名称',

  },

  onLoad: function (options) {
    let id=options.id;
    let name=options.name;
    this.setData({
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
  }

  
})