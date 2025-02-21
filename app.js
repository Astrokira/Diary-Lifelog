// app.js
App({
  globalData : {}, // 定义全局数据对象
  onLaunch() {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'my-env-6gfcgbpk2eb9b15f' // 替换为你的云开发环境 ID
    });
    this.globalData = {
      db: wx.cloud.database()  // 初始化数据库
    };
  }
})