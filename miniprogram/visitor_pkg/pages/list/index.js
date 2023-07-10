Page({
  onLoad() {
    // 获取访客列表
    this.getVistorList()
  },
  async getVistorList() {
    const { code, data: { rows: visitorList } } = await wx.http.get('/visitor')
    if (code !== 10000) return wx.utils.toast('获取访客列表失败!')
    this.setData({ visitorList })
  },
  goPassport(ev) {
    const { id, status } = ev.detail
    if (status === 0) return wx.utils.toast('当前通行证已失效')
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index?id=' + id,
    })
  },
})
