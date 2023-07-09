Page({
  data: {
    gender: 1,
    name: '',
    mobile: '',
    idcardFrontUrl: '',
    idcardBackUrl: '',
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
  onLoad({ point, building, room, id }) {
    // id 存在：编辑房屋  无 id：新增房屋
    if (id) {
      // 修改页面标题
      wx.setNavigationBarTitle({ title: '编辑房屋信息' })
      // 根据 id 得到房屋信息
      this.getHouseDetail(id)
    } else {
      this.setData({ point, building, room })
    }
  },
  // 获取房屋详情
  async getHouseDetail(id) {
    const { code, data: houseDetail } = await wx.http.get('/room/' + id)
    if (code !== 10000) return wx.utils.toast()
    // 保存房屋信息
    this.setData({ ...houseDetail })
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
  async submitForm() {
    // 校验数据
    if (!this.verifyName()) return
    if (!this.verifyMobile()) return
    if (!this.verifyIdcard()) return

    // 将 data 中的 __webviewId__ 删掉
    delete this.data.__webviewId__
    // 将 data 中的 status 删掉
    delete this.data.status
    // 将数据提交到服务器
    const { code } = await wx.http.post('/room', this.data)
    if (code !== 10000) return wx.utils.toast()
    // 返回到房屋管理页面
    wx.navigateBack({ delta: this.data.id ? 2 : 4 })
  },
  // 上传身份证照片
  async uploadPicture(ev) {
    // 选择图片
    const res = await wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      camera: 'back',
    })
    const filePath = res.tempFiles[0].tempFilePath
    // 图片的上传
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath,
      name: 'file',
      header: {
        Authorization: getApp().token
      },
      success: (uploadRes) => {
        // 返回的内容进行解析
        let {
          code,
          data: { url }
        } = JSON.parse(uploadRes.data)
        if (code !== 10000) return wx.utils.toast('上传失败')
        // 保存图片
        this.setData({ [ev.mark.type]: url })
      }
    })
  }
})
