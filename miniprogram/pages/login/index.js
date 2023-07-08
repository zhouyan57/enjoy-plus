// 定义一个验证码变量：
let secret_code = ''
Page({
  data: {
    // 手机号
    mobile: '13700000000',
    // 验证码
    code: '',
    countDownVisible: false,
  },

  countDownChange(ev) {
    // ev.detail:   day 0 hour 0 minutes 1 seconds 0
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  // 验证手机号的合法性
  verifyMobile() {
    // 定义手机号的正则
    const reg = /^1[3-9][0-9]{9}$/
    // 验证
    const valid = reg.test(this.data.mobile.trim())
    // 判断结果
    if (!valid) wx.utils.toast('手机号不合法')
    return valid
  },
  // 验证验证码
  verifyCode() {
    // 定义验证码的正则
    const reg = /^\d{6}$/
    const valid = reg.test(this.data.code.trim())
    if (!valid) wx.utils.toast('验证码不合法')
    return valid
  },
  // 获取验证码的方法
  async getCode() {
    // 1. 验证手机号的合法性
    if (!this.verifyMobile()) return
    // 2. 根据手机号发送请求到服务器得到验证码
    const { code, data } = await wx.http.get(`/code?mobile=${this.data.mobile.trim()}`)
    if (code !== 10000) return wx.utils.toast()
    console.log(data);
    // 保存验证码
    secret_code = data.code
    // 3. 将倒计时开启
    this.setData({ countDownVisible: true })
  },
  // 点击下方文本时，将验证码复制到剪贴板中
  copyCode() {
    if (!secret_code) return
    wx.setClipboardData({
      data: secret_code
    })
  },
  // 完成登录逻辑
  submitForm() {
    // 1. 验证参数的合法性
    if (!this.verifyMobile()) return
    if (!this.verifyCode()) return

  }
})
