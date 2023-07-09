Page({
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  onShow() {
    this.getUserInfo()
  },
  // 获取用户信息
  async getUserInfo() {
    try {
      const { code, data } = await wx.http.get('/userInfo')
      if (code !== 10000) return wx.utils.toast()
      // 保存数据
      this.setData({
        userInfo: {
          avatar: data.avatar,
          nickName: data.nickName
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }
})
