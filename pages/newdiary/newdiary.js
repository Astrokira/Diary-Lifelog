// pages/newdiary/newdiary.js
Page({
    goBack() {
        wx.navigateBack({
          delta: 1, // 返回到上一个页面
        });
    },
    /**
     * 页面的初始数据
     */
    data: {
        username: '', // 当前登录用户
        title: '',
        content: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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

    // 标题输入事件
    handletitle(e) {
        this.setData({ title: e.detail.value });
    },

    // 内容输入事件
    handlecontent(e) {
        this.setData({ content: e.detail.value });
    },

    // 获取当前日期
    getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;  // 只返回年月日
    },

    // 提交日记
    submitDiary()  {
        const { title, content, username } = this.data;
    
        if (!title || !content) {
            wx.showToast({ title: '标题和内容都要填写哦！', icon: 'none' });
            return;
        }
    
        // 获取当前日期（不含时间）
        const currentDate = this.getCurrentDate();
    
        // 获取字数
        const wordCount = content.length;
    
        // 存储数据到数据库
        const db = wx.cloud.database();
        db.collection('diaries').add({
            data: {
                title,
                content,
                username,
                date: currentDate,    // 存储日期
                wordCount: wordCount, // 存储字数
            }
        }).then((res) => {
            wx.showToast({ title: '日记提交成功！', icon: 'success' });
            // 清空输入框并跳转回主页
            this.setData({ title: '', content: '' });
            wx.navigateTo({ url: '/pages/user/user' });
        }).catch((err) => {
            console.error('日记提交失败:', err);
            wx.showToast({ title: '提交失败，请重试~', icon: 'none' });
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})