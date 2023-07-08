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
  },
  // 获取头像
  getUserAvatar(ev) {
    this.updateUserAvatar(ev.detail.avatarUrl)
  },
  // 上传头像
  updateUserAvatar(avatarUrl) {
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: avatarUrl, // 小程序生成的临时地址 外界不能访问到
      name: 'file',
      formData: {
        type: 'avatar',
      },
      header: {
        Authorization: getApp().token,
      },
      success: (res) => {
        // 得到数据
        const { code, data } = JSON.parse(res.data)
        if (code !== 10000) return wx.utils.toast()
        // 保存数据
        this.setData({
          'userInfo.avatar': data.url
        })
      }
    })
  }
})