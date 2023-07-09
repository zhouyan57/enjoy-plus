let house_id
let house_index
Page({
  data: {
    dialogVisible: false,
  },

  async onShow() {
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
    this.setData({ houseList, isEmpty: houseList.length === 0 })
  },
  swipeClose(ev) {
    const { position, instance } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })
      house_id = ev.mark.id
      house_index = ev.mark.index

      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  goDetail(ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + ev.mark.id,
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
  // 根据 id 删除对应的房屋
  async deleteHouse() {
    const { code } = await wx.http.delete(`/room/${house_id}`)
    if (code !== 10000) return wx.utils.toast()
    // 直接将 id 对应的数据从数据源中删除
    this.data.houseList.splice(house_index, 1) // 直接删没有响应式
    this.setData({
      houseList: this.data.houseList,
      isEmpty: this.data.houseList.length === 0
    })
  }
})
