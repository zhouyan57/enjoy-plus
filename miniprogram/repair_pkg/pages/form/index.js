Page({
  data: {
    currentDate: new Date().getTime(),
    appointment: '',
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    repairItem: [],
    // fileList: [
    //   { url: '/repair_pkg/static/uploads/attachment.jpg' },
    //   { url: '/repair_pkg/static/uploads/attachment.jpg' },
    // ],
    // 保存上传后的图片列表
    attachment: []
  },
  // 当在上传组件中选择图片后会触发的事件
  afterRead(ev) {
    const { file } = ev.detail
    // 上传图片
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      name: 'file',
      filePath: file.url,
      header: {
        Authorization: getApp().token
      },
      success: (res) => {
        console.log(res);
        const { code, data } = JSON.parse(res.data)
        if (code !== 10000) return wx.utils.toast('上传图片失败')
        this.data.attachment.push(data)
        this.setData({
          attachment: this.data.attachment
        })
      }
    })
  },
  // 打开页面时要获取数据源
  onLoad({ id }) {
    // 获取报修房屋的数据源
    this.getHouseList()
    // 获取维修项目的数据源
    this.getRepairItem()
    if (id) {
      // 更新标题
      wx.setNavigationBarTitle({ title: '修改报修信息' })
      this.getRepairDetail(id)
    }
  },
  async getRepairDetail(id) {
    if (!id) return
    // 请求数据接口
    const { code, data: repairDetail } = await wx.http.get('/repair/' + id)
    // 检测接口调用结果
    if (code !== 10000) return wx.utils.toast('获取报修信息失败!')
    // 渲染报修信息
    this.setData({ ...repairDetail })
  },
  // 获取报修房屋的数据源
  async getHouseList() {
    const { code, data: houseList } = await wx.http.get('/house')
    if (code !== 10000) return wx.utils.toast()
    if (houseList.length === 0) {
      // wx.utils.toast('对不起，您没有可报修的房屋')
      wx.showToast({
        title: '对不起，您没有可报修的房屋',
        icon: 'none',
        duration: 2000,
        complete: () => {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      })
    }
    this.setData({ houseList })
  },
  // 获取维修项目的数据源
  async getRepairItem() {
    const { code, data: repairItem } = await wx.http.get('/repairItem')
    if (code !== 10000) return wx.utils.toast()
    this.setData({ repairItem })
  },
  selectDate(ev) {
    this.setData({
      dateLayerVisible: false,
      appointment: wx.utils.formatDate(ev.detail)
    })
  },
  // 选择维修项目后触发
  selectRepairItem(ev) {
    // 获取用户选择的维修项目名称 及 id
    const { id: repairItemId, name: repairItemName } = ev.detail
    // 页面中渲染
    this.setData({ repairItemId, repairItemName })
  },
  // 选中房屋选项的成员时，会触发
  selectHouse(ev) {
    // 获取用户选择房屋的 id 和名称
    const { id: houseId, name: houseInfo } = ev.detail
    // 页面中渲染
    this.setData({ houseId, houseInfo })
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
  verifyHouse() {
    const valid = this.data.houseId !== ''
    // 验证结果提示
    if (!valid) wx.utils.toast('请选择房屋信息!')
    // 返回验证结果
    return valid
  },
  verifyRepair() {
    const valid = this.data.repairItemId !== ''
    // 验证结果提示
    if (!valid) wx.utils.toast('请选择维修项目!')
    // 返回验证结果
    return valid
  },
  verifyMobile() {
    // 验证手机号
    const reg = /^[1][3-8][0-9]{9}$/
    const valid = reg.test(this.data.mobile.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写正确的手机号码!')
    // 返回验证结果
    return valid
  },
  verifyDate() {
    // 验证日期格式
    const reg = /^\d{4}\/\d{2}\/\d{2}$/
    const valid = reg.test(this.data.appointment)
    // 验证结果提示
    if (!valid) wx.utils.toast('请选择预约日期!')
    // 返回验证结果
    return valid
  },
  verifyDescription() {
    // 验证报修项目描述
    const valid = this.data.description.trim() !== ''
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写问题描述!')
    // 返回验证结果
    return valid
  },
  async submitForm() {
    // 逐个验证表单数据
    if (!this.verifyHouse()) return
    if (!this.verifyRepair()) return
    if (!this.verifyMobile()) return
    if (!this.verifyDate()) return
    if (!this.verifyDescription()) return
    // 解构获取接口需要的参数
    const { id, houseId, repairItemId, appointment, mobile, description, attachment } = this.data
    // 请求数据接口
    const { code } = await wx.http.post('/repair', {
      id,
      houseId,
      repairItemId,
      appointment,
      mobile,
      description,
      attachment
    })
    // 检测接口请求的结果
    if (code !== 10000) return wx.showToast({ title: '在线报修失败!', icon: 'none' })
    // 跳转到表单列表页面
    wx.redirectTo({
      url: '/repair_pkg/pages/list/index',
    })
  }
})
