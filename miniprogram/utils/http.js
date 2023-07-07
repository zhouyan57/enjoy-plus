// 封装网络请求
import http from 'wechat-http'
// 设置请求的基地址
http.baseURL = 'https://live-api.itheima.net'
// 全局的挂载
wx.http = http
// 模块导出
export default http