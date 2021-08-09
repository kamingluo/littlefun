module.exports = {
 host: 'https://littlefun.gzywudao.top/php/public/football.php/', //请求域名
 //  host: 'http://127.0.0.1/myproject/littlefun/php/public/football.php/', //请求域名
  imageurl: 'https://littlefun.gzywudao.top/php/public/',
  cversion: 1, //版本号
  appid: 'wx0e060ad90f7f41c4', //小程序appid
  appname: "数据查看", //小程序名称
  status:[
    {
      state:0,
      name:'--'
    },
    {
      state:1,
      name:'赢'
    },
    {
      state:2,
      name:'赢半'
    },
    {
      state:3,
      name:'和'
    },
    {
      state:4,
      name:'输半'
    },
    {
      state:5,
      name:'输'
    },

  ]
}