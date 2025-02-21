// index.js
Page({
    data: {
        username: '', // 当前登录用户
    },
    onShow() {
        // 从本地存储中获取用户名
        const username = wx.getStorageSync('username');
        if (username) {
          this.setData({ username });
        } else {
          // 如果没有用户名，提示重新登录并跳转
          wx.showToast({ title: '请先登录', icon: 'none' });
          wx.redirectTo({ url: '/pages/index/index' });
        }
    },
    writeDiary(){
      wx.navigateTo({
        url: '../newdiary/newdiary',
      })
    },
    dairyHistory(){
      wx.navigateTo({
        url: '../history/history',
      })
    },
    dairyStatistics(){
        wx.navigateTo({
            url: '../statistics/statistics',
        })
    },

    logout() {
        // 清除本地存储中的用户信息
        wx.removeStorageSync('username');
        wx.showToast({ title: '注销成功', icon: 'success' });
        // 跳转到登录页面
        wx.redirectTo({ url: '/pages/index/index' });
    },
})
  