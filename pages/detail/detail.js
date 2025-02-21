// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        diary: {}, // 当前日记详情
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id = options.id; // 获取传递的日记ID

        const username = wx.getStorageSync('username');
        console.log(username);
        if (!username) {
            wx.showToast({ title: '请先登录', icon: 'none' });
            return;
        }
        this.setData({ username });

        this.loadDiary(id);
    },

    loadDiary(id) {
        const db = wx.cloud.database();

        db.collection('diaries')
          .doc(id)
          .get()
          .then((res) => {
            this.setData({
                diary: res.data, // 直接将日记内容设置为页面数据
              });
          })
          .catch((err) => {
            console.error('获取日记详情失败：', err);
            wx.showToast({ title: '加载失败', icon: 'none' });
        });
    },

    // 监听标题输入
    onTitleChange(e) {
        this.setData({
        'diary.title': e.detail.value, // 更新标题
        });
    },

    // 监听内容输入
    onContentChange(e) {
        this.setData({
        'diary.content': e.detail.value, // 更新内容
        });
    },

    // 保存日记
    saveDiary() {
        const db = wx.cloud.database();
        const { diary } = this.data;

        db.collection('diaries')
        .doc(diary._id)
        .update({
            data: {
            title: diary.title,
            content: diary.content,
            },
        })
        .then(() => {
            wx.showToast({ title: '保存成功' });
            wx.navigateBack();  // 返回上一页
        })
        .catch((err) => {
            console.error('保存失败：', err);
            wx.showToast({ title: '保存失败', icon: 'none' });
        });
    },

    // 删除日记
    deleteDiary() {
        const db = wx.cloud.database();
        const { diary } = this.data;

        wx.showModal({
        title: '确认删除',
        content: '删除后无法恢复，确定要删除吗？',
        success: (res) => {
            if (res.confirm) {
            db.collection('diaries')
                .doc(diary._id)
                .remove()
                .then(() => {
                    wx.showToast({ title: '删除成功' });
                    wx.navigateBack(); // 返回上一页
                })
                .catch((err) => {
                    console.error('删除失败：', err);
                    wx.showToast({ title: '删除失败', icon: 'none' });
                });
            }
        },
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