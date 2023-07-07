Page({
  data: {
    // 手机号
    mobile: '',
    countDownVisible: false,
  },

  countDownChange(ev) {
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
  // 获取验证码的方法
  async getCode() {
    // 1. 验证手机号的合法性
    if (!this.verifyMobile()) return
    // 2. 根据手机号发送请求到服务器得到验证码
    const { code, data } = await wx.http.get(`/code?mobile=${this.data.mobile.trim()}`)
    if (code !== 10000) return wx.utils.toast()
    console.log(data);
    // 3. 将倒计时开启
    this.setData({ countDownVisible: true })
  }
})
