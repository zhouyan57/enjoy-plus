Page({
  data: {
    gender: 1,
    name: '',
    mobile: '',
    idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardBackUrl: '/static/images/avatar_2.jpg',
  },
  goList() {
    wx.reLaunch({
      url: '/house_pkg/pages/list/index',
    })
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
  // 接收参数
  onLoad({ point, building, room }) {
    this.setData({ point, building, room })
  },
  // 当修改选中的单选框时会触发
  onChange(ev) {
    this.setData({
      gender: ev.detail
    })
  },

  // 校验 name
  verifyName() {
    // 定义汉字的正则
    let reg = /^[\u4e00-\u9fa5]{2,5}$/
    // 开始校验
    let valid = reg.test(this.data.name)
    // 判断结果
    if (!valid) wx.utils.toast('姓名不合法')
    return valid
  },
  // 校验 Mobile
  verifyMobile() {
    // 定义手机号的正则
    let reg = /^1[3-9][0-9]{9}$/
    // 开始校验
    let valid = reg.test(this.data.mobile)
    // 判断结果
    if (!valid) wx.utils.toast('手机号不合法')
    return valid
  },
  // 校验身份证图片
  verifyIdcard() {
    let valid = this.data.idcardFrontUrl !== '' && this.data.idcardBackUrl !== ''
    // 判断结果
    if (!valid) wx.utils.toast('请上传身份证号')
    return valid
  },
  // 提交数据
  submitForm() {
    // 校验数据
    if (!this.verifyName()) return
    if (!this.verifyMobile()) return
    if (!this.verifyIdcard()) return
  }
})
