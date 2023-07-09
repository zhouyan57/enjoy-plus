// 封装工具函数
const utils = {
  /* 封装提示框：wx.showToast() */
  toast: function (title = '数据加载失败') {
    wx.showToast({
      title,
      mask: true, // 启用透明蒙层
      icon: 'none',
    })
  },
  // 将时间戳转为年/月/日的格式
  formatDate(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map((item) => item.toString().padStart(2, '0')).join('/')
  },
}
// 将工具函数对象挂在到 wx 实例上
wx.utils = utils

// 暴露工具对象
export default utils