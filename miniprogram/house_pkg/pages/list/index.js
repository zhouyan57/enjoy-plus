Page({
  data: {
    dialogVisible: false,
  },

  async onLoad() {
    try {
      this.getHouseList()
    } catch (err) {
      wx.utils.toast(err.message)
    }
  },
  async getHouseList() {
    // 请求一个需要 token 的路径
    const { code, data: houseList } = await wx.http.get('/room')
    if (code !== 10000) return wx.utils.toast()
    this.setData({ houseList })
  },
  swipeClose(ev) {
    const { position, instance } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  goDetail() {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index',
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
