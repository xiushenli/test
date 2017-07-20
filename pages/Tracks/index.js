var app = getApp()
var albumID = 0;
var pageNum = 0;
var datas = [];
var maxPage = 1;


var currentPlayIndex = 0;

Page({

trackClick:function(options){
  var that = this
  var track = options.currentTarget.dataset.track;
  currentPlayIndex = options.currentTarget.dataset.index;
  console.log(currentPlayIndex)
  wx.setStorage({
    key: String(track.trackId),
    data: track,
  })

 wx.playBackgroundAudio({
   dataUrl: track.playUrl32,
   title:track.title,
  coverImgUrl: track.coverLarge,
  success:function(){
   
   wx.hideLoading()
   wx.setNavigationBarTitle({
     title: track.title
   })
   wx.onBackgroundAudioPlay(function(){
    //  console.log('开始播放')
   });
   wx.onBackgroundAudioPause(function () {
    //  console.log('暂停播放')
    //  that.playNextAudio()
   });
   wx.onBackgroundAudioStop(function () {
    //  console.log('停止播放')
     that.playNextAudio()
   })
    
  }
    
    

})


},
  /**
   * 页面的初始数据
   */
  data: {
    models:datas
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  wx.showNavigationBarLoading()
    var that = this

    var model = JSON.parse(options.model)

    albumID = model.albumId;
    wx.setNavigationBarTitle({
      title:model.title
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
  loadNewData:function(){
    console.log(6666666)
    wx.showLoading({
      title: '加载中...',
    })
     var that=this
     pageNum = 1;
      wx.request({
        url: app.globalData.tracksUrl + albumID + '/ true /' + pageNum + '/ 20',
      success: function (res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        maxPage = res.data.tracks.maxPageId;
        datas = res.data.tracks.list
        that.setData({
          model: datas,

        })
      }
    })

  },
  
  loadMoreData:function(){
    if (pageNum >= maxPage) return;
    
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    pageNum +=1;
    wx.request({
      url: app.globalData.tracksUrl + albumID + '/ true /' + pageNum + '/ 20',
      success: function (res) {
        wx.hideLoading()

       datas = datas.concat(res.data.tracks.list)
       
        that.setData({
          model: datas,

        })
      }
    })
  },
  playNextAudio:function(){
   currentPlayIndex++; 
if(currentPlayIndex==this.data.model.length)
{
  currentPlayIndex =0;
}
   var track = this.data.model[currentPlayIndex];

   wx.setStorage({
     key: String(track.trackId),
     data: track,
   })

   wx.playBackgroundAudio({
     dataUrl: track.playUrl32,
     title: track.title,
     coverImgUrl: track.coverLarge,
     success: function () {

       wx.hideLoading()
       wx.setNavigationBarTitle({
         title: track.title
       })
     }



   })

  }


})