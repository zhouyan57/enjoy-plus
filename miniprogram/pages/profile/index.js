Page({
  // 获取输入的昵称
  getUserNickName(ev) {
    this.updateNickName(ev.detail.value)
  },
  // 修改昵称
  async updateNickName(nickName) {
    // 将内容提交到服务器，去修改昵称
    const { code } = await wx.http.put('/userInfo', { nickName })
    if (code !== 10000) return wx.utils.toast()
    // 保存昵称
    this.setData({
      'userInfo.nickName': nickName
    })
  }
})