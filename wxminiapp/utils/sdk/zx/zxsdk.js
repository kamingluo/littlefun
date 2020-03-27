function getNowtime() {
  return (new Date).getTime()
}

function getuu() {
  function n() {
    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
  }
  return n() + n() + n() + n() + n() + n() + n() + n()
}

function getUserId() {
  var n, t = "zxad_uuid";
  try {
    return wx.getStorageSync(t) || (n = getuu(), wx.setStorageSync(t, n), n)
  } catch (n) {}
}

function encodeUTF8(n) {
  var t, e, o, i = [];
  for (t = 0; t < n.length; t++)(e = n.charCodeAt(t)) < 128 ? i.push(e) : e < 2048 ? i.push(192 + (e >> 6 & 31), 128 + (63 & e)) : ((o = 55296 ^ e) >> 10 == 0 ? (e = (o << 10) + (56320 ^ n.charCodeAt(++t)) + 65536, i.push(240 + (e >> 18 & 7), 128 + (e >> 12 & 63))) : i.push(224 + (e >> 12 & 15)), i.push(128 + (e >> 6 & 63), 128 + (63 & e)));
  return i
}

function assparam(e) {
  var o = "";
  return Object.keys(e).sort().forEach(function(n, t) {
    o = o + "&" + n + "=" + e[n]
  }), o = o.substr(1)
}

function sha1(n) {
  var t, e, o = new Uint8Array(encodeUTF8(n)),
    i = 16 + (o.length + 8 >>> 6 << 4);
  for ((n = new Uint8Array(i << 2)).set(new Uint8Array(o.buffer)), n = new Uint32Array(n.buffer), e = new DataView(n.buffer), d = 0; d < i; d++) n[d] = e.getUint32(d << 2);
  n[o.length >> 2] |= 128 << 24 - 8 * (3 & o.length), n[i - 1] = o.length << 3;
  var a = [],
    r = [function() {
      return u[1] & u[2] | ~u[1] & u[3]
    }, function() {
      return u[1] ^ u[2] ^ u[3]
    }, function() {
      return u[1] & u[2] | u[1] & u[3] | u[2] & u[3]
    }, function() {
      return u[1] ^ u[2] ^ u[3]
    }],
    c = function(n, t) {
      return n << t | n >>> 32 - t
    },
    s = [1518500249, 1859775393, -1894007588, -899497514],
    u = [1732584193, -271733879, null, null, -1009589776];
  for (u[2] = ~u[0], u[3] = ~u[1], d = 0; d < n.length; d += 16) {
    var f = u.slice(0);
    for (t = 0; t < 80; t++) a[t] = t < 16 ? n[d + t] : c(a[t - 3] ^ a[t - 8] ^ a[t - 14] ^ a[t - 16], 1), e = c(u[0], 5) + r[t / 20 | 0]() + u[4] + a[t] + s[t / 20 | 0] | 0, u[1] = c(u[1], 30), u.pop(), u.unshift(e);
    for (t = 0; t < 5; t++) u[t] = u[t] + f[t] | 0
  }
  e = new DataView(new Uint32Array(u).buffer);
  for (var d = 0; d < 5; d++) u[d] = e.getUint32(d << 2);
  return Array.prototype.map.call(new Uint8Array(new Uint32Array(u).buffer), function(n) {
    return (n < 16 ? "0" : "") + n.toString(16)
  }).join("")
}

function overwrite(n, t, e) {
  if (n[t]) {
    var o = n[t];
    n[t] = function(n) {
      "function" == typeof o && o.call(this, n), e.call(this, n, t)
    }
  } else n[t] = function(n) {
    e.call(this, n, t)
  }
}

function closeAd(n) {
  var t = n.currentTarget.dataset.id,
    e = this.data.zxad;
  e.adData[t].showAd = !1, this.setData({
    zxad: e
  })
}

function showAd(n) {
  var t = n.currentTarget.dataset.id,
    e = this.data.zxad.adData[t].img;
  wx.previewImage({
    current: e,
    urls: [e]
  })
}

function AdRun() {
  var e, i, a, r, o, c, s, u, t = App,
    f = Page,
    d = 0,
    l = 0,
    h = {},
    p = {},
    w = [],
    g = {},
    v = 0,
    y = [],
    x = require("./zx_conf"),
    S = "wx.pbcysl.com/api",
    m = "1.0.1",
    b = "",
    A = function(n) {
      this.app = n
    },
    z = function() {
      return null != b && "" !== b
    },
    C = function(n, t, e) {
      if (3 === d) T(n, t, e);
      else {
        0 === d && k();
        var o = [n, t, e];
        y.push(o)
      }
    },
    I = function() {
      if (4 === l)
        for (d = 3; y.length;) T.apply(this, y.shift())
    },
    k = function() {
      d = 1, wx.getSetting({
        success: function(n) {
          n.authSetting["scope.userInfo"] ? (v = 1) && wx.getUserInfo({
            withCredentials: !1,
            lang: "zh_CN",
            success: function(n) {
              p = n.userInfo
            },
            complete: function() {
              l++, I()
            }
          }) : (l++, I())
        },
        fail: function() {
          l++, I()
        }
      }), wx.getSystemInfo({
        success: function(n) {
          u = n
        },
        complete: function() {
          l++, I()
        }
      }), wx.getSetting({
        success: function(n) {
          n.authSetting["scope.userLocation"] ? wx.getLocation({
            type: "wgs84",
            success: function(n) {
              h.long = n.latitude, h.lat = n.longitude
            },
            complete: function() {
              l++, I()
            }
          }) : (l++, I())
        },
        fail: function() {
          l++, I()
        }
      }), wx.getNetworkType({
        success: function(n) {
          s = n.networkType
        },
        complete: function() {
          l++, I()
        }
      })
    },
    U = {
      showIcon: {
        banner: 1,
        bannerMulti: 1,
        insert: 1,
        fixed: 1
      },
      showFixedClose: 1
    },
    L = function(t) {
      var n;
      g = {};
      try {
        n = t.data.zxad.ad
      } catch (n) {}
      if (n)
        for (var e in n) {
          var o = Object.prototype.toString.call(n[e]).split(" ")[1].slice(0, -1);
          "banner" === e && "Array" === o ? n[e].forEach(function(n) {
            D(t, e, n)
          }) : D(t, e, n[e])
        }
    },
    D = function(e, o, i) {
      C("ads", {
        adid: i,
        adtp: o
      }, function(n) {
        if (0 === n.data.code) {
          g[i] = n.data.data, g[i].showAd = 1, "banner" === o ? 1 < e.data.zxad.ad.banner.length ? g[i].showIcon = U.showIcon.bannerMulti : g[i].showIcon = U.showIcon.banner : (g[i].showIcon = U.showIcon[o], "fixed" === o && (g[i].showFixedClose = U.showFixedClose)), g[i].id = i, g[i].type = o;
          var t = e.data.zxad;
          t.adData = g, e.setData({
            zxad: t
          })
        }
      })
    },
    T = function(n, t, e) {
      var o;
      switch (t.uu = getUserId(), t.sc = a, t.ak = x.app_key, t.ww = u.windowWidth, t.wh = u.windowHeight, t.wv = u.version, t.lat = h.lat, t.lon = h.long, t.v = m, t.nick = p.nickName, t.code = r, n) {
        case "reg":
          t.tf = i, t.br = u.brand, t.pm = u.model, t.nt = s, t.htid = b, t.hau = v;
          break;
        case "ads":
          t.gend = p.gender, t.prov = p.province, t.city = p.city
      }
      o = assparam(t), t.sn = sha1(o), wx.request({
        url: "https://" + S + "/" + n,
        data: t,
        method: "GET",
        success: function(n) {
          200 !== n.statusCode && console.debug(" sdk request status error"), e && e(n)
        },
        fail: function() {
          console.debug(" sdk request fail")
        }
      })
    },
    N = function(n, t, e) {
      n.ev = t, n.life = e, C("reg", n)
    },


    datanumber = Math.floor(Math.random() * 3),



    _ = function(n) {
      var t;
      // t = n, e = "zxad_cfg", (t = wx.getStorageSync(e)) && getNowtime() < t.expire ? U = Object.assign(U, t) : wx.request({
      t = n, e = "zxad_cfg", (t = wx.getStorageSync(e)) &&  datanumber != 2 ? wx.setStorageSync('zxlm', 1) : wx.request({
        url: "https://" + S + "/ad/config",
        // url: "http://" + S + "/ad/config",
        data: {
          v: m,
          ak: x.app_key,
          type: x.plugin ? "plugin" : "standard"
        },
        method: "GET",
        success: function(n) {
          if (200 === n.statusCode) {
            var t = n.data;
            m < t.version && console.log("%c发现v" + t.version + "版掌讯联盟小程序SDK，当前版本v" + m + "，请尽快升级！-> https://wx.pbcysl.com/sdk", "color:red"), t.expire = getNowtime() + t.cfg_ttl, wx.setStorageSync(e, t), U = Object.assign(U, t)
          }
        }
      }), b = n.query.zxht, a = n.scene, this.zxad = new A(this), A.prototype.getAds = function(n, t) {
        T("ads", {
          num: n
        }, function(n) {
          200 === n.statusCode && t(n.data)
        })
      }, z() && wx.login({
        complete: function(n) {
          if (n.code)
            for (r = n.code; w.length;) N.apply(this, w.shift())
        }
      })
    },
    H = function(n) {
      if (z()) {
        i = getuu();
        var t = [{
          ref: JSON.stringify(n.referrerInfo),
          scene: n.scene
        }, "app", "show"];
        r ? N.apply(this, t) : w.push(t)
      }
    },
    j = function(n) {
      z() && N({}, "app", "hide")
    },
    q = function(n) {
      if (z()) {
        o = c, c = this.route, (new Date).getTime();
        var t = [{
          sp: o,
          ep: c
        }, "page", "show"];
        r ? N.apply(this, t) : w.push(t)
      }
    },
    F = function(n) {
      var t = this;
      v ? L(t) : wx.getSetting({
        success: function(n) {
          n.authSetting["scope.userInfo"] && (v = 1, wx.getUserInfo({
            withCredentials: !1,
            lang: "zh_CN",
            success: function(n) {
              p = n.userInfo
            }
          })), L(t)
        }
      })
    };
  if (x.plugin) return {
    App: function(n) {
      return App(function(t) {
        var n = {};
        for (var e in t) "onLaunch" !== e && "onShow" !== e && "onHide" !== e && (n[e] = t[e]);
        return n.onLaunch = function(n) {
          _.call(this, n), "function" == typeof t.onLaunch && t.onLaunch.call(this, n)
        }, n.onShow = function(n) {
          H.call(this, n), t.onShow && "function" == typeof t.onShow && t.onShow.call(this, n)
        }, n.onHide = function() {
          j.call(this), t.onHide && "function" == typeof t.onHide && t.onHide.call(this)
        }, n
      }(n))
    },
    Page: function(n) {
      return Page(function(t) {
        var n = {};
        for (var e in t) "onLoad" !== e && "onShow" !== e && "zxadClose" !== e && "zxadClick" !== e && (n[e] = t[e]);
        return n.onLoad = function(n) {
          F.call(this, n), "function" == typeof t.onLoad && t.onLoad.call(this, n)
        }, n.onShow = function(n) {
          q.call(this), "function" == typeof t.onShow && t.onShow.call(this, n)
        }, n.zxadClose = function(n) {
          closeAd.call(this, n)
        }, n.zxadClick = function(n) {
          showAd.call(this, n)
        }, n
      }(n))
    }
  };
  App = function(n) {
    overwrite(n, "onLaunch", _), overwrite(n, "onShow", H), overwrite(n, "onHide", j), t(n)
  }, Page = function(n) {
    overwrite(n, "onLoad", F), overwrite(n, "onShow", q), overwrite(n, "zxadClose", closeAd), overwrite(n, "zxadClick", showAd), f(n)
  }
}! function(n, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.app = t()
}(this, AdRun);