var app = getApp();

function share(type) {
  let userdata = wx.getStorageSync('userdata')
  // app.aldstat.sendEvent('分享好友', userdata);
  let userid = wx.getStorageSync('userdata').id
  let userchannel = wx.getStorageSync('userdata').channel
  var shareconfig = wx.getStorageSync('shareconfig')
  if (type == 1) { //button分享
    return {
      title: shareconfig.sharetitle,
      desc: shareconfig.sharedesc,
      imageUrl: shareconfig.shareimg,
      path: '/pages/index/index?channel=' + userchannel + '&master_id=' + userid , // 路径，传递参数到指定页面。
    }
    
  } else {

    return {
      title: shareconfig.sharetitle,
      desc: shareconfig.sharedesc,
      imageUrl: shareconfig.shareimg,
      path: '/pages/index/index?channel=' + userchannel + '&master_id=' + userid, // 路径，传递参数到指定页面。
    }
  }
}



module.exports = {
  share: share,
}