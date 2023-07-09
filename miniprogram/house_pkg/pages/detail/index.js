let house_id
Page({
  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index?id=' + house_id,
    })
  },
  onLoad({ id }) {
    house_id = id
    // 根据 id 发送请求得到数据
    this.getHouseDetail(id)
  },
  async getHouseDetail(id) {
    let { code, data: houseDetail } = await wx.http.get(`/room/${id}`)
    if (code !== 10000) return wx.utils.toast()
    this.setData({ ...houseDetail })
  }
})
