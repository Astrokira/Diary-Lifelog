// pages/history/history.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '', // 当前登录用户
        groupedDiaries: {}, // 按日期分组的日记
        currentPage: 0,
        noMoreData: false, // 标记是否还有更多数据
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 每次进入页面都刷新一下，因为可能刚才有过编辑或者删除操作
        // 清空之前的缓存数据
        this.setData({
            groupedDiaries: {},
            noMoreData: false,
            currentPage: 0
        });
        // 重新加载数据
        this.loadDiaries(0);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const username = wx.getStorageSync('username');
        if (!username) {
            wx.showToast({ title: '请先登录', icon: 'none' });
            return;
        }
        this.setData({ username });
        this.loadDiaries(0);
    },

    loadDiaries(page = 0, limit = 10) {
        const db = wx.cloud.database();
        const { username } = this.data;
        console.log(`加载第 ${page + 1} 页的数据`);
        
        db.collection('diaries')
          .where({ username })
          .orderBy('date', 'desc') // 按日期降序排序
          .skip(page * limit) // 跳过前几页的数据
          .limit(limit) // 每页限制条数
          .get()
          .then((res) => {
            if (res.data.length === 0) {
                this.setData({ noMoreData: true }); // 没有更多数据了
                return;
            }

            const newDiaries = this.groupDiaries(res.data);
            const { groupedDiaries } = this.data;  
            
            this.setData({
                groupedDiaries: { ...groupedDiaries, ...newDiaries },
                currentPage: page + 1,
            });
        })
        .catch(err => {
            console.error('加载日记失败：', err);
        });
    },
    
    groupDiaries(diaries) {
        const grouped = {};
        diaries.forEach(diary => {
            const date = diary.date;
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(diary);
        });
        return grouped;
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        //console.log('触发了翻页加载');
        if (this.data.noMoreData) {
            wx.showToast({ title: '没有更多日记了', icon: 'none' });
            return;
        }
        const { currentPage } = this.data;
        this.loadDiaries(currentPage); // 加载下一页
    },

    viewDiary(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: `/pages/detail/detail?id=${id}`,
        });
    },
    

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

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
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})