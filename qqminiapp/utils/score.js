var app = getApp();
const {
  request
} = require('./request.js')
const baseConfig = require('./config.js')



function increase(score, explain){
  wx.login({
    success: res => {
      request({
        service: 'score/increase',
        data: {
          code: res.code,
          score: score,
          explain: explain,
        },
        success: res => {
           console.log('积分增加成功', res);
        },
        fail: res => {
          console.log('错误捕捉', res);
        },
        complete: res => {
          // console.log('成功不成功都执行函数', res);
        },
      })
    }
  })

}



function reduce(score, explain) {
  wx.login({
    success: res => {
      request({
        service: 'score/reduce',
        data: {
          code: res.code,
          score: score,
          explain: explain,
        },
        success: res => {
          console.log('积分减少成功', res);
        },
        fail: res => {
          console.log('错误捕捉', res);
        },
        complete: res => {
          // console.log('成功不成功都执行函数', res);
        },
      })
    }
  })

}





module.exports = {
  increase: increase,
  reduce: reduce,
}