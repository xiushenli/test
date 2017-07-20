var app = getApp()
Page({
  searchClick:function(e){
    wx.navigateTo({
     url: '../Search/search?kw=' + e.detail.value,
     })
  },
  moreClick:function(e){
    var tag = e.currentTarget.dataset.tagname

wx.navigateTo({
  url: '../Albums/index?tagName=' + tag,
})


  },
  /**
   * 页面的初始数据
   */
  data: {
    list: [
    
    ],
    categoryContents:[],
    interval:5000,
    autoplay:true,
  },
tabClick:function(e){
 
  this.setData({

    activeCategoryId: e.currentTarget.id

  });

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.mainUrl,
      success: function (res) {

           console.log(res)

         that.setData({

          list: res.data.focusImages.list,
          categoryContents: res.data.categoryContents.list

         })
      }

    })

  },
trackClick:function(track){
  wx.navigateTo({
    url: '/pages/Tracks/index?model=' + JSON.stringify(track.currentTarget.dataset.model),
  })

},

  onShareAppMessage: function () {
    var that = this
  

  }
})