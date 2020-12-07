

const app = getApp()
const {
  request
} = require('./../../../../utils/request.js');
Page({
  data: {
    page:1,
    searchtext:"",
    goodslist:[],
    nodata:false,

    list: [],
    resultList:[]

  },
  onLoad: function (options) {

    var _this = this;
    wx.getStorage({
      key: 'historySearch',
      success(res) {
        _this.setData({
          list: res.data
        })
      }
    })

  },

  searchtext: function (e) {
    this.setData({
      searchtext: e.detail.value,
      goodslist:[],
      nodata:false,
      page:1
    })
  },
  qingkong:function(){
    console.log("清空搜索词")

    this.setData({
      searchtext: "",
      nodata:false,
      goodslist:[],
      page:1
    })
  },
  clicksearch:function(){
    console.log("点击搜索")
    this.setData({
      page: 1,
      goodslist:[]
    })
    this.searchgoods()
    this.save();
  },

  searchgoods: function () {
    var that=this
    let page = this.data.page;
    let keyword = this.data.searchtext;
    if (keyword == "" || keyword==null){
      wx.showToast({
        title: '请输入搜索词',
        icon: 'none',
        duration: 1500,
      })
      return;

    }
    request({
      service: 'taobao/Search/goodssearch',
      method: 'GET',
      data: {
        page: page,
        keyword: keyword
      },
      success: res => {
        // console.log("查询商品结果", res.goodslist.tbk_dg_material_optional_response.result_list.map_data)
        let goodslist = this.data.goodslist;
        var newgoodslist = [...goodslist, ...res.goodslist.tbk_dg_material_optional_response.result_list.map_data];
        console.log(newgoodslist.length)
        that.setData({
          goodslist: newgoodslist,
          nodata:true
        })
      },
    })

  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    //console.log(e)
    if (e.scrollTop > 600) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },



  /**
   *搜索历史
   */
  save: function () {
    var list = this.data.list;
    if (list.indexOf(this.data.searchtext) == -1 & this.data.searchtext != '') {
      if(list.length < 10){
        console.log("直接添加元素")
        // list.push(this.data.searchtext);
        list.unshift(this.data.searchtext);
      }
      else{
        console.log("去除最后一个元素")
        list.pop();
        list.unshift(this.data.searchtext);
      }
    }
    this.setData({
      list: list
    })
    wx.setStorage({
      key: 'historySearch',
      data: list
    })
    
  },

  searchName: function (e) {
    this.setData({
      searchtext: e.currentTarget.dataset.value
    })
    this.searchgoods();
  },
  remove: function () {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认清空所有记录?',
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'historySearch',
            success() {
              _this.setData({
                list: []
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    let page = that.data.page;
    let newpage= page + 1;
    that.setData({
        page: newpage
    })
    that.searchgoods()
  }

})