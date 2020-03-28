//任务完成调用方法

var app = getApp();
const {
  request
} = require('./request.js')
import { http } from './http.js'




// function lookvideoad2(adid, score) {
//   wx.login({
//     success: res => {
//       return   http({
//         url: 'ad/gdtad/lookvideoad',
//         data: {
//           code: res.code,
//           score: score,
//           adid: adid,
//           channel:'11111',
//           master_id:'0'
//         }
//       })
//       .then(
//           console.log('视频广告任务完成加积分11111')
//       )
//     }
//   })
// }


function lookvideoad(adid, score) {
  wx.login({
    success: res => {
      request({
        service: 'ad/gdtad/lookvideoad',
        data: {
          code: res.code,
          score: score,
          adid: adid,
        },
        success: res => {
          console.log('视频广告任务完成加积分', res);
          return res;
        },
      })
    }
  })

}



function clickbannerad(adid, score) {
  wx.login({
    success: res => {
      request({
        service: 'ad/gdtad/clickbannerad',
        data: {
          code: res.code,
          score: score,
          adid: adid,
        },
        success: res => {
          console.log('点击banner广告完成加积分', res);
          wx.showToast({
            title: "完成任务,增加金币",
            icon: 'none',
            duration: 3000
          })
        },
      })
    }
  })

}




function clickminiappad(adid, score, adname) {
  wx.login({
    success: res => {
      request({
        service: 'ad/miniappad/clickminiappad',
        data: {
          code: res.code,
          score: score,
          adid: adid,
          adname: adname,
        },
        success: res => {
          console.log('跳转小程序广告任务成功', res);
          wx.showToast({
            title: "完成任务,增加金币",
            icon: 'none',
            duration: 3000
          })
        },
      })
    }
  })

}




function clickwlad(adid, score, adname) {
  wx.login({
    success: res => {
      request({
        service: 'ad/wlad/clickwlad',
        data: {
          code: res.code,
          score: score,
          adid: adid,
          adname: adname,
        },
        success: res => {
          console.log('微量广告任务成功任务成功', res);
          wx.showToast({
            title: "完成任务,增加金币",
            icon: 'none',
            duration: 3000
          })
        },
      })
    }
  })

}



function signin(score) {
  wx.login({
    success: res => {
      request({
        service: 'sign/signin',
        data: {
          code: res.code,
          score: score,
        },
        success: res => {
          console.log('用户签到成功', res);
          return true;
        },
      })
    }
  })

}


function signdouble() {
  wx.login({
    success: res => {
      request({
        service: 'sign/signdouble',
        data: {
          code: res.code,
        },
        success: res => {
          console.log('用户签到加倍成功', res);
          return true;
        },
      })
    }
  })

}



function share(score) {
  wx.login({
    success: res => {
      request({
        service: 'task/share/sharesuccess',
        data: {
          code: res.code,
          score: score,
        },
        success: res => {
          console.log('分享任务成功', res);
          return true;
        },
      })
    }
  })

}



module.exports = {
  lookvideoad: lookvideoad,
  clickbannerad: clickbannerad,
  clickminiappad: clickminiappad,
  clickwlad: clickwlad,
  signin: signin,
  signdouble: signdouble,
  share: share,
}