Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    repairItem: [{ name: '水路卫浴' }, { name: '电路灯具' }, { name: '管道疏通' }, { name: '开锁换锁' }],
    fileList: [
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
    ],
  },
  // 打开页面时要获取数据源
  onLoad() {
    // 获取报修房屋的数据源
    this.getHouseList()
  },
  // 获取报修房屋的数据源
  async getHouseList() {
    const { code, data: houseList } = await wx.http.get('/house')
    if (code !== 10000) return wx.utils.toast()
    if (houseList.length === 0) {
      // wx.utils.toast('对不起，您没有可报修的房屋')
      wx.showToast({
        title: '对不起，您没有可报修的房屋',
        icon: 'none',
        duration: 2000,
        complete: () => {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      })
    }
    this.setData({ houseList })
  },
  // 选中房屋选项的成员时，会触发
  selectHouse(ev) {
    this.setData({ houseInfo: ev.detail.name })
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
