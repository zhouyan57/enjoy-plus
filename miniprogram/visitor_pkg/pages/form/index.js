Page({
  data: {
    dateLayerVisible: false,
    houseLayerVisible: false,
    houseList: [],
  },
  onLoad() {
    // 获取房屋列表
    this.getHouseList()
  },
  async getHouseList() {
    const { code, data: houseList } = await wx.http.get('/house')
    if (code !== 10000) return wx.utils.toast('获取房屋列表失败!')
    this.setData({ houseList })
  },
  selectHouse(ev) {
    const { name: houseInfo } = ev.detail
    this.setData({ houseInfo })
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goPassport() {
    wx.reLaunch({
      url: '/visitor_pkg/pages/passport/index',
    })
  },
})
