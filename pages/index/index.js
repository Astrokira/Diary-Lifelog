// index.js
const db = wx.cloud.database();

Page({
  data: {
    isRegisterModalVisible: false, // 控制模态框是否显示
    username: '',
    password: '',
  },

  /**
   * 输入框事件绑定
   */
  handlename(e) {
    this.setData({ username: e.detail.value });
},

  handlepwd(e) {
      this.setData({ password: e.detail.value });
  },


  /**
   * 登录验证
   */
  handleLogin() {
    const { username, password } = this.data;
    wx.removeStorageSync('username');

    if (!username || !password) {
      wx.showToast({ title: '请输入账号和密码哦', icon: 'none' });
      return;
    }
    const _ = db.command // 获取数据库查询操作符
    db.collection('diary_key')
      .where({ 
        username: _.eq(username),
        password: _.eq(password)
      })
      .get()
      .then((res) => {
        if (res.data.length > 0) {
          wx.setStorageSync('username', username);
          wx.showToast({ title: '登录成功啦', icon: 'success' });
          wx.redirectTo({ url: '/pages/user/user' });
        } else {
          wx.showToast({ title: '账号或密码错误~', icon: 'none' });
        }
      })
      .catch((err) => {
        console.error('登录失败:', err);
        wx.showToast({ title: '登录失败，请重试~', icon: 'none' });
      });
  },

  /*注册相关*/

  // 显示注册模态框
  showRegisterModal() {
    this.setData({
      isRegisterModalVisible: true
    });
  },

  // 隐藏注册模态框
  hideRegisterModal() {
    this.setData({
      isRegisterModalVisible: false
    });
  },

  // 监听用户名输入
  handleUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  // 监听密码输入
  handlePasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 提交注册信息
  submitRegistration() {
    const { username, password } = this.data;

    if (!username || !password) {
      wx.showToast({
        title: '请完整填写信息哦',
        icon: 'none'
      });
      return;
    }

    // 提交注册信息到数据库
    const db = wx.cloud.database();
    db.collection('diary_key').add({
      data: {
        username,
        password,
        createdAt: new Date()
      },
      success: () => {
        wx.showToast({
          title: '注册成功',
          icon: 'success'
        });
        this.setData({
          isRegisterModalVisible: false, // 隐藏模态框
          username: '',
          password: '' // 清空表单数据
        });
      },
      fail: err => {
        console.error('注册失败:', err);
        wx.showToast({
          title: '注册失败，请稍后再试',
          icon: 'none'
        });
      }
    });
  }
});

