// house_pkg/pages/locate/index.ts
Page({
  onLoad() {
    // 自动获取定位
    this.getLocation()
  },
  // 自动获取定位
  async getLocation() {
    const { longitude, latitude } = await wx.getLocation()
    // 保存位置信息
    console.log(latitude, longitude);
  },
  async chooseLocation() {
    const { longitude, latitude } = await wx.chooseLocation()
    console.log(latitude, longitude);
  }
})