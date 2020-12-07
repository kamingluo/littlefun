const {
  request
} = require('./../../../utils/request.js');
const common = require('./../../../utils/common.js');
const baseConfig = require('./../../../utils/config.js')//配置文件
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themelist: [],//轮播图主题数据
    tabdata: [],//类目选项
    channel_type: 1, //channel_type: 0 - 1.9包邮, 1-今日爆款, 2-品牌好货, 3-相似商品推荐, 4-猜你喜欢, 5-实时热销, 6-实时收益, 7-今日畅销, 8-高佣榜单，默认1
    cat_id: 3756,
    page: 1,//商品页数
    TabCur: 0,
    scrollLeft: 0,
    goodslist: []//商品信息流数据

  },
  onLoad: function (options) {
    this.tabdata()
    this.getthemelistdata()
    this.getgoodslist()
  },

  //点击跳转到搜索页面
  gosearch: function () {
    wx.navigateTo({
      url: '/pages/extension/taobao/search/search'
    })
  },


  //随机选取元素
  getRandomArrayElements: function (arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
  //点击轮播图
  clickswiper: function (e) {
    console.log("点击轮播图", e)
    let name = e.currentTarget.dataset.data.name;
    let material_id = e.currentTarget.dataset.data.material_id;
    wx.navigateTo({
      url: '/pages/extension/taobao/themegoods/themegoods?material_id=' + material_id + '&name=' + name
    })
  },

  //切换导航栏
  tabSelect(e) {
    console.log("切换导航栏", e.currentTarget.dataset)
    this.setData({
      channel_type: e.currentTarget.dataset.data.channel_type,
      cat_id: e.currentTarget.dataset.data.cat_id,
      page: 1,
      goodslist: [],
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.getgoodslist()
  },

  //获取商品流数据
  getgoodslist: function () {
    var that = this
    let cat_id = that.data.cat_id;
    let page = that.data.page;
    request({
      service: 'taobao/search/optimusmaterial',
      method: 'GET',
      data: {
        material_id: cat_id,
        page: page
      },
      success: res => {
        console.log("淘宝商品流数据", res.goodsdata)
        // let goodslist = res.goodsdata.tbk_dg_optimus_material_response.result_list.map_data;
        let goodslist = that.data.goodslist;
        let newgoodslist = [...goodslist, ...res.goodsdata.tbk_dg_optimus_material_response.result_list.map_data];
        that.setData({
          goodslist: newgoodslist,
        })
      },
    })
  },

  //tab数据
  tabdata: function () {
    let data = [
      {
        id: 1,
        name: '综合',
        channel_type: 1,
        cat_id: 3756,
      },
      {
        id: 2,
        name: '食品',
        channel_type: 2,
        cat_id: 3761,
      },
      {
        id: 3,
        name: '数码家电',
        channel_type: 4,
        cat_id: 3759,
      },
      {
        id: 4,
        name: '女装',
        channel_type: 4,
        cat_id: 3767,
      },
      {
        id: 5,
        name: '男装',
        channel_type: 4,
        cat_id: 3764,
      },
      {
        id: 6,
        name: '运动户外',
        channel_type: 4,
        cat_id: 3766,
      },
      {
        id: 7,
        name: '美妆',
        channel_type: 4,
        cat_id: 3763,
      },
      {
        id: 8,
        name: '家居',
        channel_type: 4,
        cat_id: 3758,
      },
      {
        id: 9,
        name: '鞋包',
        channel_type: 4,
        cat_id: 3762,
      },
      {
        id: 10,
        name: '淘抢购',
        channel_type: 4,
        cat_id: 34616,
      }
    ]

    this.setData({
      tabdata: data,
    })

  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    //console.log(e)
    if (e.scrollTop > 1000) {
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

  getthemelistdata() {
    let data = [
      {
        id: 1,
        image_url: 'https://gw.alicdn.com/tfs/TB1AhARHRr0gK0jSZFnXXbRRXXa-750-292.jpg_q75.jpg_.webp',
        name: '实时热销爆款',
        material_id: '28026',
      },
      {
        id: 2,
        image_url: 'https://gw.alicdn.com/tfs/TB1qj.JHFY7gK0jSZKzXXaikpXa-750-292.jpg_q75.jpg_.webp',
        name: '大额优惠券',
        material_id: '27446',
      },
      {
        id: 3,
        image_url: 'https://gw.alicdn.com/tfs/TB1fLOXoVzqK1RjSZFoXXbfcXXa-750-275.png_q75.jpg',
        name: '品牌优惠券',
        material_id: '3786',
      }
    ]
    this.setData({
      themelist: data
    });
  },






  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this
    let page = that.data.page;
    let newpage = page + 1;
    that.setData({
      page: newpage
    })
    that.getgoodslist()
  }


})