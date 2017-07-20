//index.js
//获取应用实例
var app = getApp()
Page({

  arrowClick:function(e){
 var tag = e.currentTarget.dataset.tag;

if(tag.mode==1) {

  wx.scanCode({
    success: function (e) {
      // console.log(e.result)
    }
  })
}
    if (tag.mode == 2) {
      wx.navigateTo({
        url: '../Player/index',
      })
    
    }

else{

 wx.showModal({

   title: tag.title,

   content:tag.tip ,

   success:function(res){

   if(res.confirm){
   
    if(tag.mode==3){
     wx.stopBackgroundAudio()

    }
    if (tag.mode == 4) {
        wx.showToast({
        title: '清除缓存中...',
      })
      wx.clearStorageSync()
      wx.hideToast()
    }



   }}
 })
}
  },

  data: {
    motto: 'zhang lishen',
    userInfo: {},
    
    setting:[
      {
       title:"设备配网",
       imageUrl:"../../utils/images/home_page_more_add.png",
       mode: 1
      },
      {
        title: "播放历史",
        imageUrl: "../../utils/images/home_page_more_control.png",
        tip:'当前设备列表为空',
        mode: 2
      },
      {
        title: "关闭音乐",
        imageUrl: "../../utils/images/home_page_more_device.png",
        tip: '确定要关闭当前音乐吗？',
        mode:3
       
      },
      {
        title: "清除缓存",
        imageUrl: "../../utils/images/home_page_more_setup.png",
        tip: '确定清除当前缓存吗？',
        mode: 4
      }
  
    ]
  },
  //事件处理函数
  bindViewTap: function() {
 
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindBottemWorld: function(){
     wx.navigateTo({
       url: '../second/second'
})
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
