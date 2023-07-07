

Page({
  async onLoad() {
    // 发送网络请求
    const res = await wx.http.get('/announcement')
    console.log(res);
  }
})
