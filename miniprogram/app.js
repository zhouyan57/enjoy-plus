// app.js
// 导入工具函数（为了执行一下）
import './utils/utils'
// 导入 http 模块
import './utils/http'
App({
  onLaunch() {
    // 打开页面时获取 token
    this.getToken()
  },
  // 获取 token
  getToken() {
    // 异步方式不会阻塞
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        this.token = data
      }
    })
  },
  // 保存 token
  setToken(token) {
    // 拼接参数 token
    let myToken = 'Bear ' + token
    // 保存到本地
    wx.setStorageSync('token', myToken)
    // 保存到应用中
    this.token = myToken
  }
})
