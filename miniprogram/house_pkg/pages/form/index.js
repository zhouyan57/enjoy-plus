Page({
  data: {
    idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardBackUrl: '/static/images/avatar_2.jpg',
  },
  goList() {
    wx.reLaunch({
      url: '/house_pkg/pages/list/index',
    })
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
  // 接收参数
  onLoad({ point, building, room }) {
    this.setData({ point, building, room })
  },
  // 当修改选中的单选框时会触发
  onChange(ev) {
    this.setData({
      gender: ev.detail
    })
  }
})
