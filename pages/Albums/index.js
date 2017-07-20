var app = getApp()
var tagName = '';
var currentPage = 0;
var datas = [];
var maxPage = 1;
Page({

  albumClick: function (options) {

    
   wx.navigateTo({
     url: '/pages/Tracks/index?model=' + JSON.stringify(options.currentTarget.dataset.model),
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

    // var model = JSON.parse(options.model)

    tagName = options.tagName;
 wx.setNavigationBarTitle({
   title: tagName,
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
    currentPage = 1;
    wx.request({
      url: app.globalData.albumsUrl + tagName + '&pageId=' + currentPage,
      success: function (res) {
        wx.hideLoading()
        maxPage = res.data.maxPageId;
        datas = res.data.list
        that.setData({
          model: datas,

        })
      }
    })

  },

  loadMoreData: function () {
    if (currentPage >= maxPage) return;

    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    currentPage += 1;
    wx.request({
   
      url: app.globalData.albumsUrl + tagName + '&pageId=' + currentPage,
      success: function (res) {
        wx.hideLoading()

        datas = datas.concat(res.data.list)

        that.setData({
          model: datas,

        })
      }
    })
  }


})