// map.js
Page({
  data: {
    latitude: 40.060539,
    longitude: 116.343847,
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
  }
})
