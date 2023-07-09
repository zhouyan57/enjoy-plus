// house_pkg/pages/building/index.ts
Page({
  data: {
    point: '',
    size: 0,
    type: ''
  },
  onLoad({ point }) {
    // 打开页面时，生成假数据
    this.fake(point)
  },
  // 生成楼栋的假数据
  fake(point) {
    // 生成楼栋的数量
    let size = Math.floor(Math.random() * 4) + 3
    // 生成楼单位：小于4时：栋，大于4时：号楼
    let type = size > 4 ? '号楼' : '栋'
    // 保存假数据
    this.setData({ size, type, point })
  }
})