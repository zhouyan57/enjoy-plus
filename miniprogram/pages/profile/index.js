Page({
  onLoad() {
    // 进入页面时判断 token 是否存在
    // 1. 得到 token
    const token = getApp().token
    // 2. 判断 token
    if (!token) {
      // 未登录：跳转到登录页面
      wx.reLaunch({
        url: '/pages/login/index'
      })
    }
  }
})