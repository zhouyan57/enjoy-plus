// 导入工具函数对象
// import utils from '../../utils/utils'

Page({
  onLoad() {
    // 测试局部提示框
    // utils.toast('我是提示框！')
    wx.utils.toast('我是全局提示框！')
  }
})
