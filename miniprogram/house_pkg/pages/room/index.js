// house_pkg/pages/room/index.ts
Page({
  // 接收参数
  onLoad({ point, building }) {
    // 生成假数据
    this.fake(point, building)
  },
  fake(point, building) {
    // 随机生成房间数量
    const size = Math.floor(Math.random() * 20) + 1
    // 定义一个房间的列表
    const rooms = []
    // 遍历生成
    for (let i = 0; i < size; i++) {
      // 生成楼层
      const floor = Math.floor(Math.random() * 20) + 1
      // 生成房间数
      const no = Math.floor(Math.random() * 6) + 1
      // 拼接房间号
      const No = [floor, 0, no].join('')
      // 判断房间号是否已经存在
      const bool = rooms.some(item => item.No === No)
      if (bool) continue
      // 保存房间信息
      rooms.push({
        point,
        building,
        No,
      })
    }
    // 保存房间列表
    this.setData({ rooms })
  }
})