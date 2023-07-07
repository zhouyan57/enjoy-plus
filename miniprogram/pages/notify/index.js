Page({
  data: {
    id: 0,
  },
  onLoad({ id }) {
    // 保存 id
    this.setData({ id })
    // 获取公告详情
    this.getNotify(id)
  },
  // 根据 id 得到公告详情
  async getNotify(id) {
    const { code, message, data: notify } = await wx.http.get(`/announcement/${id}`)
    // 判断
    if (code !== 10000) return wx.utils.toast(message)
    // 保存数据
    this.setData({ notify })
  }
})