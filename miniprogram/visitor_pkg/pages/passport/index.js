Page({
  onLoad({ id }) {
    // 获取通行证
    this.getPassport(id)
  },
  async getPassport(id) {
    if (!id) return
    const { code, data: passport } = await wx.http.get('/visitor/' + id)
    if (code !== 10000) return wx.utils.toast('获取通行证失败!')
    this.setData({ ...passport })
  },
  onShareAppMessage() {
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index',
      imageUrl: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },
})
