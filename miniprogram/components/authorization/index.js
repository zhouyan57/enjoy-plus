Component({
  data: {
    // 表示是否登录的标识
    isLogin: true,
  },
  lifetimes: {
    attached() {
      // 判断 token 是否存在
      const isLogin = !!getApp().token // !!把token转成布尔值
      this.setData({ isLogin })
      // 存在：不理会
      // 不存在：跳转到登录页面
      if (!isLogin) {
        wx.reLaunch({
          url: '/pages/login/index'
        })
      }
    }
  }
})