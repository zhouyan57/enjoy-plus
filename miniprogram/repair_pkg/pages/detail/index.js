import qqMap from '../../../utils/qqmap'
// map.js
Page({
  data: {
    latitude: 40.060539,
    longitude: 116.343847,
    dialogVisible: false,
    markers: [
      // 中粮
      {
        id: 1,
        latitude: 22.576148,
        longitude: 113.923858,
        width: 24,
        height: 30,
      },
      // 兴东地铁站
      {
        id: 2,
        latitude: 22.581755,
        longitude: 113.91894,
        iconPath: '/static/images/marker.png',
        width: 40,
        height: 40,
      },
      // 创维工业园
      {
        id: 3,
        latitude: 22.641614,
        longitude: 113.920672,
        width: 24,
        height: 30,
      }
    ],
  },
  onLoad({ id }) {
    this.getRepairDetail(id)
    // 生成路线
    this.createPolyLine()
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
  editRepair() {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index?id=' + this.data.id,
    })
  },
  // 生成路线
  createPolyLine() {
    const { markers } = this.data
    qqMap.direction({
      mode: 'bicycling', // 轨迹方式为：骑行
      from: [markers[0].latitude, markers[0].longitude].join(','),
      to: [markers[2].latitude, markers[2].longitude].join(','),
      success: (res) => {
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (let i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (let i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        this.setData({
          polyline: [
            {
              points: pl,
              color: '#5591af',
              width: 4,
            },
          ],
        })
      }
    })
  }
})
