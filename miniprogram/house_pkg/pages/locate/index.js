// house_pkg/pages/locate/index.ts
import qqMap from '../../../utils/qqmap'
Page({
  onLoad() {
    // 自动获取定位
    this.getLocation()
  },
  // 自动获取定位
  async getLocation() {
    const { longitude, latitude } = await wx.getLocation()
    // 保存位置信息
    this.getPoint(latitude, longitude)
  },
  // 手动获取定位
  async chooseLocation() {
    const { longitude, latitude } = await wx.chooseLocation()
    this.getPoint(latitude, longitude)
  },
  // 将经纬度转为位置描述
  getPoint(latitude, longitude) {
    // 地址的逆解析
    qqMap.reverseGeocoder({
      location: [latitude, longitude].join(','),
      success: ({ result: { address } }) => {
        // 结果为当前所在的地址
        this.setData({ address })
        console.log(address);
      }
    })
    // 搜索周边的：住宅小区
    qqMap.search({
      keyword: '住宅小区',
      location: [latitude, longitude].join(','),
      page_size: 5,
      success: ({ data }) => {
        // 保存数据
        this.setData({ points: data })
      }
    })
  },
  // 跳转到选择楼栋页面
  goBuilding(e) {
    wx.navigateTo({
      url: `/house_pkg/pages/building/index?point=${e.mark.point}`
    })
  }
})