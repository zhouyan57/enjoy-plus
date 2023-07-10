// map.js
Page({
  data: {
    latitude: 40.060539,
    longitude: 116.343847,
    dialogVisible: false
  },
  onLoad({ id }) {
    this.getRepairDetail(id)
  },
  async getRepairDetail(id) {
    if (!id) return
    const { code, data: repairDetail } = await wx.http.get('/repair/' + id)
    console.log(repairDetail);
    if (code !== 10000) return wx.utils.toast()
    this.setData({ ...repairDetail })
  },
  // 取消报修
  cancelRepair() {
    // 面板打开
    this.setData({ dialogVisible: true })
  },
  // 关闭面板
  async dialogClose(ev) {
    if (ev.detail === 'confirm') {
      // 发送请求到服务器将当前维修取消
      const { code } = await wx.http.put(`/cancel/repaire/${this.data.id}`)
      if (code !== 10000) return wx.utils.toast()
      // 将当前报修状态设置为取消中
      this.setData({
        status: 0,
      })
    }
  },
})
