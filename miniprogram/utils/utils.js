// 封装工具函数
const utils = {
  /* 封装提示框：wx.showToast() */
  toast: function (title = '数据加载失败') {
    wx.showToast({
      title,
      mask: true, // 启用透明蒙层
      icon: 'none',
    })
  }
}
// 暴露工具对象
export default utils