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
        // 得到未访问的页面路径
        // 1. 得到页面栈
        const pageStack = getCurrentPages()
        // 2. 页面栈中的最后一个成员就是未访问的页面：在页面中得到它的路径信息
        const currentPage = pageStack[pageStack.length - 1]
        // 3. 保存到登陆页面的路径上
        const redirectURL = currentPage.route
        wx.reLaunch({
          url: `/pages/login/index?redirectURL=${redirectURL}`
        })
      }
    }
  }
})