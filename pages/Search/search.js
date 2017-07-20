var app = getApp()
var kw = '';
var pageNum = 0;
var datas = [];
var maxPage = 1;
Page({

  trackClick: function (options) {

    var track = options.currentTarget.dataset.track;
if(!track.play_path_32){
  wx.showModal({
    title: '提示',
    content:'抱歉,' + track.title + '不支持播放',
  })
  return;
}
    wx.playBackgroundAudio({
      dataUrl: track.play_path_32,
      title: track.title,
      coverImgUrl: track.cover_path,
      success: function () {

      }
    })


  },
  /**
   * 页面的初始数据
   */
  data: {
    models: datas
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

  
    kw = options.kw;
wx.setNavigationBarTitle({
  title: kw,
})
    this.loadNewData()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadNewData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMoreData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadNewData: function () {

    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    pageNum = 1;
    wx.request({
      url: app.globalData.searchUrl + kw + '&page=' + pageNum,
      success: function (res) {
        wx.hideLoading()
        maxPage = res.data.response.numFound/20;

        datas = res.data.response.docs
        that.setData({
          model: datas,

        })
      }
    })

  },

  loadMoreData: function () {
    if (pageNum >= maxPage) return;

    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    pageNum += 1;
    wx.request({
      url: app.globalData.searchUrl + kw + '&page=' + pageNum,
      success: function (res) {
        wx.hideLoading()

        datas = datas.concat(res.data.response.docs)

        that.setData({
          model: datas,

        })
      }
    })
  }


})