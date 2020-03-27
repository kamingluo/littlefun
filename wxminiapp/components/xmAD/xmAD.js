var app = getApp(); //小盟统计
Component({
    properties: {
        adData: Object
    },
    attached: function () {
        this.setData({
            adID: this.dataset.id
        })
    },
    methods: {
      cancelJump(baseURL, curl) {
          if (!curl) {
            return
          }
          wx.request({
            url: baseURL + 'v1/api/cancelclk',
            data: {
              curl
            },
            method: 'POST'
          })
        },
        adLoad() {
          wx.setStorageSync('xmadstatus', 0)
          var userdata = wx.getStorageSync('userdata')
          var that = this
          this.triggerEvent('adload')
          var loadNumber = wx.getStorageSync("xmadconfig").loadNumber || 6
          for (var i = 0; i < loadNumber; i++) {
            setTimeout(function () {
              //console.log("小盟广告加载啊")
              that.triggerEvent('adload')
            }, i * 2500);
          }
          var clickChance = wx.getStorageSync("xmadconfig").clickChance || 6
          setTimeout(function () {
            let datanumber = Math.floor(Math.random() * clickChance)
            if (datanumber == 2) {
              //console.log("小盟广告点击啊---------")
              that.triggerEvent('click')
              app.aldstat.sendEvent("小盟广告自动点击", userdata)
            }
          }, 2500);
        },
        clickAd(e) {
          wx.setStorageSync('xmadstatus', 1)
          this.triggerEvent('click')
          let userdata = wx.getStorageSync('userdata')
          app.aldstat.sendEvent('小盟广告手动点击', userdata);
        },
        complete() {
        },
        navSuc(e) {
        },
        close() {
          this.triggerEvent('close')
        },
        navFail(e) {
          console.log('errMsg:', e.detail.errMsg)
          let { errMsg } = e.detail
          let { adData, adID } = this.data
          if (errMsg.indexOf('not in navigateToMiniProgramAppIdList')!==-1) {
            wx.request({
              url: adData.baseURL + 'v1/api/skipfail',
              data: {
                appid: adData[adID].appid[1],
                appkey: adData[adID].ak
              },
              method: 'GET'
            })
          } else if (errMsg.indexOf('cancel') !== -1) {
            let obj = this.data.adData[this.data.adID]
            obj ? this.cancelJump(adData.baseURL, obj.curl) : (setTimeout(() => {
              this.cancelJump(adData.baseURL, obj ? obj.curl : '')
            }, 3000))
          } else if (errMsg.indexOf('fail to open') !== -1) {
          } else {
          }
        }
    }
});