Page({
  data: {
    dateLayerVisible: false,
    houseLayerVisible: false,
    houseList: [],
    gender: 1,
    name: '',
    mobile: ''
  },
  onLoad() {
    // 获取房屋列表
    this.getHouseList()
  },
  async getHouseList() {
    const { code, data: houseList } = await wx.http.get('/house')
    if (code !== 10000) return wx.utils.toast('获取房屋列表失败!')
    this.setData({ houseList })
  },
  selectHouse(ev) {
    const { name: houseInfo, id: houseId } = ev.detail
    this.setData({ houseInfo, houseId })
  },
  selectDate(ev) {
    // 获取访客来访时间
    this.setData({
      dateLayerVisible: false,
      visitDate: wx.utils.formatDate(ev.detail)
    })

  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  async goPassport() {
    // 逐个验证表单的数据
    if (!this.verifyHouse()) return
    if (!this.verifyName()) return
    if (!this.verifyMobile()) return
    // 待提交的数据
    const { houseId, name, gender, mobile, visitDate } = this.data
    const { code, data: { id } } = await wx.http.post('/visitor', { houseId, name, gender, mobile, visitDate })
    if (code !== 10000) return wx.utils.toast('添加访客失败!')

    wx.reLaunch({
      url: '/visitor_pkg/pages/passport/index?id=' + id,
    })
  },
  verifyHouse() {
    const valid = this.data.houseId !== ''
    // 验证结果提示
    if (!valid) wx.utils.toast('请选择房屋信息!')
    // 返回验证结果
    return valid
  },
  // 验证业主姓名（必须为汉字）
  verifyName() {
    // 正则表达式
    const reg = /^[\u4e00-\u9fa5]{2,5}$/
    // 验证业主姓名
    const valid = reg.test(this.data.name.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写真实中文姓名!')
    // 返回验证结果
    return valid
  },

  verifyMobile() {
    // 验证手机号
    const reg = /^[1][3-8][0-9]{9}$/
    const valid = reg.test(this.data.mobile)
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写正确的手机号码!')
    // 返回验证结果
    return valid
  },
})
