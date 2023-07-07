// 封装网络请求
import http from 'wechat-http'
// 设置请求的基地址
http.baseURL = 'https://live-api.itheima.net'

// 添加响应拦截器：返回服务器的数据
http.intercept.response = ({ data }) => {
  return data
}

// 全局的挂载
wx.http = http
// 模块导出
export default http