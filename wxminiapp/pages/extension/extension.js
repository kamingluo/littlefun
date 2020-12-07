const {
  request
} = require('./../../utils/request.js');
const common = require('./../../utils/common.js');
const baseConfig = require('./../../utils/config.js')//配置文件
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themelist: [],//轮播图主题数据
    iconList: [],//icon列表
    tabdata: [],//类目选项
    channel_type: 1, //channel_type: 0 - 1.9包邮, 1-今日爆款, 2-品牌好货, 3-相似商品推荐, 4-猜你喜欢, 5-实时热销, 6-实时收益, 7-今日畅销, 8-高佣榜单，默认1
    cat_id: 20100,//猜你喜欢场景的商品类目，20100-百货，20300-食品，20400-女装，20500-电器，20600-鞋包，20800-美妆，20900-男装，21000-水果，21100-家纺，21200-文具,21300-运动,21700-家具;
    pages: 1,//商品页数
    TabCur: 0,
    scrollLeft: 0,
    goodslist: [],//商品信息流数据
    iosdisplay:true


  },
  onLoad: function (options) {
    console.log(options)
    let mall_type = options.mall_type;
    //分享进来，直接跳转到商品详情页面
    if (mall_type == 1) {
      let goods_id = options.goods_id;
      let search_id = options.search_id;
      wx.navigateTo({
        url: '/pages/extension/pdd/goodsdetails/goodsdetails?goods_id=' + goods_id + '&search_id=' + search_id
      })
    }
    else if (mall_type ==2){
      let num_iids = options.num_iids;
      let url = options.url;
      wx.navigateTo({
        url: '/pages/extension/taobao/goodsdetails/goodsdetails?num_iids=' + num_iids + '&url=' + url
      })
    }
    this.iosdisplay()
    this.icondata()
    this.tabdata()
    this.themelistget()
    this.getgoodslist()
  },



  iosdisplay:function(){
    // let display=app.globalData.display || false;
    // let platform=app.globalData.platform;
    // if(!display && platform=='ios' || platform=='devtools' ){
    //   this.setData({
    //     iosdisplay: false,
    //   })
    // }

  },

  //点击跳转到搜索页面
  gosearch: function () {
    wx.navigateTo({
      url: '/pages/extension/pdd/search/search'
    })
  },

  //轮播图数据
  themelistget: function () {
    var that = this;
    request({
      service: 'pdd/themegoods/themelistget',
      method: 'GET',
      data: {},
      success: res => {
        //console.log("轮播图主题数据", res.themelists.theme_list_get_response.theme_list)
        let themelist = res.themelists.theme_list_get_response.theme_list;
        let newthemelist = that.getRandomArrayElements(themelist, 5);
        // console.log("随机元素", that.getRandomArrayElements(themelist, 5));
        that.setData({
          themelist: newthemelist,
        })
      },
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
    let id = e.currentTarget.dataset.data.id;
    wx.navigateTo({
      url: '/pages/extension/pdd/themegoods/themegoods?theme_id=' + id + '&name=' + name
    })
  },

  //切换导航栏
  tabSelect(e) {
    console.log("切换导航栏", e.currentTarget.dataset)
    this.setData({
      channel_type: e.currentTarget.dataset.data.channel_type,
      cat_id: e.currentTarget.dataset.data.cat_id,
      pages: 1,
      goodslist: [],
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.getgoodslist()
  },

  //获取商品流数据
  getgoodslist: function () {
    var that = this
    let channel_type = that.data.channel_type;
    let cat_id = that.data.cat_id;
    let pages = that.data.pages;
    request({
      service: 'pdd/recommend/recommend',
      method: 'GET',
      data: {
        channel_type: channel_type,
        cat_id: cat_id,
        pages: pages
      },
      success: res => {
      let resgoodslist=res.recommenddata.goods_basic_detail_response.list;


        let display=app.globalData.display || false;
        let platform=app.globalData.platform;
        if(!display && platform=='ios' || platform=='devtools'){
          for (var i = resgoodslist.length - 1; i >= 0; i--) {
            let text =resgoodslist[i].goods_name;
            let aiqiyi=text.indexOf("爱奇艺") != -1;
            let youku=text.indexOf("优酷") != -1;
            let tenxun=text.indexOf("腾讯") != -1;
            let baidu=text.indexOf("百度") != -1;
            let meituan=text.indexOf("美团") != -1;
            let elm=text.indexOf("饿了么") != -1;
            let jiudian=text.indexOf("酒店") != -1;
            let huiyuan=text.indexOf("会员") != -1;
            if(aiqiyi||youku||tenxun||meituan||elm||jiudian||huiyuan||baidu) {
              console.log("操作删除元素",resgoodslist[i]);
              resgoodslist.splice(i, 1);
            }
          }
        }
        let goodslist = that.data.goodslist;
        let newgoodslist = [...goodslist, ...resgoodslist];
        that.setData({
          goodslist: newgoodslist,
        })
      },
    })





  },
  //icon位置数据
  icondata: function () {
    let iconList = [{
      id: 1,
      iconurl: baseConfig.imageurl + 'miniapp/images/extensionicon/taobao.png',
      jumpurl: '',
      type: 3,
      name: '领淘宝券'
    }, {
      id: 2,
      iconurl: baseConfig.imageurl + 'miniapp/images/extensionicon/neigou.jpg',
      jumpurl: '/pages/web/web?specialUrl=1&src=https%3A%2F%2Fmobile.yangkeduo.com%2Fduo_transfer_channel.html%3FresourceType%3D39996%26pid%3D1979520_149719573%26_pdd_fs%3D1%26_pdd_tc%3Dffffff%26_pdd_sbs%3D1%26cpsSign%3DCE_200829_1979520_149719573_37e03227fdb9f493824fb7e240a93fb5%26duoduo_type%3D2',
      type: 1,
      name: '百亿补贴'
    }, {
      id: 3,
      iconurl: baseConfig.imageurl + 'miniapp/images/extensionicon/dapai.jpg',
      jumpurl: '/pages/web/web?specialUrl=1&src=https%3A%2F%2Fmobile.yangkeduo.com%2Fduo_transfer_channel.html%3FresourceType%3D4%26pid%3D1979520_149719573%26cpsSign%3DCE_200829_1979520_149719573_5468d953abef97d934bc113ce3aa08f9%26duoduo_type%3D2',
      type: 1,
      name: '限时秒杀'
    }, {
      id: 4,
      iconurl: baseConfig.imageurl + 'miniapp/images/extensionicon/chongzhi.jpg',
      jumpurl: '/pages/web/web?specialUrl=1&src=https%3A%2F%2Fmobile.yangkeduo.com%2Fduo_transfer_channel.html%3FresourceType%3D39997%26pid%3D1979520_149719573%26cpsSign%3DCE_200829_1979520_149719573_3c67a6e3b54b987e0c46edd4b1d10008%26duoduo_type%3D2',
      type: 1,
      name: '领话费券'
    }, {
      id: 5,
      iconurl: baseConfig.imageurl + 'miniapp/images/extensionicon/shoucang2.png',
      jumpurl: '',
      type: 2,
      name: '我的收藏'
    },
      // {
      //   id: 5,
      //   iconurl: baseConfig.imageurl + 'miniapp/images/extensionicon/taobao.png',
      //   jumpurl: '/pages/web/web?specialUrl=1&src=https://mobile.yangkeduo.com/duo_transfer_channel.html?resourceType=4&pid=1979520_149719573&cpsSign=CE_200829_1979520_149719573_5221f3bb4bfd24893d894adcd31f5ef2&duoduo_type=2',
      //   type: 2,
      //   name: '淘优惠券'
      // }
    ]

    let display=app.globalData.display || false;
    console.log("是否隐藏",display)
    if(!display){
      let data={
          id: 1,
          iconurl: baseConfig.imageurl + 'miniapp/images/extensionicon/rebang.jpg',
          jumpurl: '/pages/web/web?specialUrl=1&src=https://mobile.yangkeduo.com/duo_transfer_channel.html?resourceType=4&pid=1979520_149719573&cpsSign=CE_200829_1979520_149719573_5221f3bb4bfd24893d894adcd31f5ef2&duoduo_type=2',
          type: 1,
          name: '热销排行'
        };
      iconList[0]=data;
    }

    this.setData({
      iconList: iconList,
    })

  },
  //点击icon
  clickicon: function (e) {
    let type = e.currentTarget.dataset.data.type;
    let jumpurl = e.currentTarget.dataset.data.jumpurl;
    if (type == 2) {
      wx.navigateTo({
        url: '/pages/extension/collection/collection'
      })
    }
    else if (type == 3){
      wx.navigateTo({
        url: '/pages/extension/taobao/taobao'
      })
    }
    else {
      wx.navigateToMiniProgram({
        appId: 'wx32540bd863b27570',
        path: jumpurl,
      })

    }


  },
  //tab数据
  tabdata: function () {
    let data = [
      {
        id: 1,
        name: '今日爆款',
        channel_type: 1,
        cat_id: 20100,
      },
      {
        id: 2,
        name: '品牌好货',
        channel_type: 2,
        cat_id: 20100,
      },
      {
        id: 3,
        name: '百货',
        channel_type: 4,
        cat_id: 20100,
      },
      {
        id: 4,
        name: '食品',
        channel_type: 4,
        cat_id: 20300,
      },
      {
        id: 5,
        name: '电器',
        channel_type: 4,
        cat_id: 20500,
      },
      {
        id: 6,
        name: '水果',
        channel_type: 4,
        cat_id: 21000,
      },
      {
        id: 7,
        name: '家具',
        channel_type: 4,
        cat_id: 21700,
      },
      {
        id: 8,
        name: '运动',
        channel_type: 4,
        cat_id: 21300,
      },
      {
        id: 9,
        name: '鞋包',
        channel_type: 4,
        cat_id: 20600,
      },
      {
        id: 10,
        name: '女装',
        channel_type: 4,
        cat_id: 20400,
      },
      {
        id: 11,
        name: '男装',
        channel_type: 4,
        cat_id: 20900,
      },
      {
        id: 12,
        name: '美妆',
        channel_type: 4,
        cat_id: 20800,
      },
      {
        id: 13,
        name: '家纺',
        channel_type: 4,
        cat_id: 21100,
      },
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

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this
    let pages = that.data.pages;
    let newpages = pages + 1;
    that.setData({
      pages: newpages
    })
    that.getgoodslist()
  }


})