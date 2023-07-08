// 封装网络请求
import http from 'wechat-http'
// 设置请求的基地址
http.baseURL = 'https://live-api.itheima.net'

// 添加请求拦截器
http.intercept.request = (config) => {
  // 在请求拦截器添加一个 token
  const token = getApp().token
  // 创建一个管理所有额外属性的对象
  const defaultHeader = {
    client: 'app'
  }
  if (token) defaultHeader.Authorization = token
  // 将所有的属性与 config 中的 header 进行合并
  config.header = Object.assign(defaultHeader, config.header)
  return config
}

// 添加响应拦截器：返回服务器的数据
http.intercept.response = async ({ data, statusCode, config }) => {
  // 判断状态码是否为 401
  if (statusCode === 401) {
    // token 过期，需要请求延时的接口
    const { data } = await http({
      url: '/refreshToken',
      method: 'POST',
      header: {
        Authorization: getApp().refreshToken
      },
    })
    const { token, refreshToken } = data
    // 保存 token 和 refreshToken
    getApp().setToken(token, refreshToken)
    // 重新请求之前未完成的请求（请求信息：response.config）
    const res = await http(
      Object.assign(config, {
        header: {
          Authorization: 'Bearer ' + token,
        }
      })
    )
    return res
  }
  return data
}

// 全局的挂载
wx.http = http
// 模块导出
export default http