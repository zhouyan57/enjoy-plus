

Page({
  onLoad() {
    // 发送网络请求
    wx.http.get('/announcement').then((res) => {
      console.log(res);
    })
  }
})
