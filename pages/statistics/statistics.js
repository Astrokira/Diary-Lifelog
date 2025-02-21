  // pages/statistics/statistics.js

  //import * as echarts from '/components/ec-canvas/ec-canvas'; // 引入 ECharts
  //const wxCharts = require('../../utils/wxcharts.js');

  Page({

      /**
       * 页面的初始数据
       */
      data: {
          username: '', // 当前用户名
          statistics: [], // 存储字数统计的数据
          dates: [], // 最近七天的日期
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
          this.generateDateRange(); // 生成最近七天的日期
          this.loadDiaryStatistics(); // 加载近七天日记统计
          this.loadWholeDiaryStatistics(); // 加载总日记统计
      },
      // 生成最近七天的日期
      generateDateRange() {
          const dateRange = [];
          const today = new Date();
          for (let i = 6; i >= 0; i--) {
              const date = new Date(today);
              date.setDate(today.getDate() - i); // 向前推算日期
              const formattedDate = this.formatDate(date);
              dateRange.push(formattedDate);
          }
          this.setData({ dates: dateRange.reverse() });

      },

      // 格式化日期为 YYYY-MM-DD
      formatDate(date) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
      },

      // 加载近七天的日记统计数据
      loadDiaryStatistics() {
          const db = wx.cloud.database();
          const { username, dates } = this.data;
          const statistics = dates.map(date => ({
              date,
              wordCount: 0, // 默认字数为 0
          }));

          // 查询每一天的日记数据
          db.collection('diaries')
              .where({ username, date: db.command.in(dates) }) // 筛选日期范围内的日记
              .get()
              .then(res => {
                  res.data.forEach(diary => {
                      const diaryDate = diary.date;
                      const wordCount = this.calculateWordCount(diary.content); // 计算每篇日记的字数
            
                      // 查找该日的统计数据并累加字数
                      const stat = statistics.find(item => item.date === diaryDate);
                      if (stat) {
                          stat.wordCount += wordCount;
                      }
                  });

                  console.log('统计数据:', statistics);
                  this.setData({ statistics });
                  // 这里真的本来想做统计图像还有词云，但是完全没有办法画；花了一整天把wx-charts、Echarts还有f2全都试了个遍，甚至准备用底层css直接画，全都不行，最后只能放弃了。

                  //this.renderBarChart();
                  //this.renderLineChart();
              })
              .catch(err => {
                  console.error('加载统计数据失败:', err);
              });
      },
      
      // 加载全部日记数据
      loadWholeDiaryStatistics() {
        const db = wx.cloud.database();
        const { username, dates } = this.data;
        const statistics_whole = dates.map(date => ({
            date,
            wordCount: 0, // 默认字数为 0
        }));
    
        // 查询日记数据
        db.collection('diaries')
            .where({ username }) // 查询所有当前用户的日记
            .get()
            .then(res => {
                const allDiaries = res.data;
                const totalWordCount = allDiaries.reduce((sum, diary) => sum + this.calculateWordCount(diary.content), 0); // 总字数
                const wordCounts = allDiaries.map(diary => this.calculateWordCount(diary.content)); // 获取所有字数列表
                const maxWordCount = Math.max(...wordCounts); // 最大字数
                const minWordCount = Math.min(...wordCounts); // 最小字数
                const averageWordCount = wordCounts.length ? Math.round(totalWordCount / wordCounts.length) : 0; // 平均字数
    
                // 更新页面数据
                this.setData({
                    totalWordCount,
                    averageWordCount,
                    maxWordCount,
                    minWordCount,
                    totalEntries: allDiaries.length, // 日记总篇数
                    statistics_whole,
                });
            })
            .catch(err => {
                console.error('加载统计数据失败:', err);
            });
      },

      // 计算字数
      calculateWordCount(content) {
          return content ? content.length : 0;
      },


    // 渲染条形图
    renderBarChart2() {
          const { statistics } = this.data;
          const categories = statistics.map(item => item.date);
          const data = statistics.map(item => item.wordCount);

          console.log('Categories:', categories);
          console.log('Data:', data);

          // 使用 wxCharts 绘制条形图
          new wxCharts({
              canvasId: 'barChart',
              type: 'bar',
              categories: categories,
              series: [{
                  name: '字数统计',
                  data: data,
                  color: '#598f27',
              }],
              yAxis: {
                  title: '字数',
                  format: function (val) {
                  return val;
                  },
              },
              width: 320,
              height: 200,
              dataLabel: true,
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