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
    qqMap.reverseGeocoder({
      location: [latitude, longitude].join(','),
      success: ({ result: { address } }) => {
        // 结果为当前所在的地址
        this.setData({ address })
        console.log(address);
      }
    })
  }
})