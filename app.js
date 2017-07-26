//app.js
App({
    onLaunch: function(options) {


        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    onShow: function() {
        wx.getNetworkType({
            success: function(res) {
                var networkType = res.networkType

                if (networkType != "wifi") {
                    wx.showModal({
                        title: '提示',
                        content: '当前未连接WiFi网络',
                    })
                }
            },
        })

    },
    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },

    globalData: {

        userInfo: null,

        subDomin: 'mall',


        //  https://mobile.ximalaya.com/mobile/discovery/v2/category/recommends?categoryId=6&contentType=album&device=ios&scale=2&version=4.3.26.2
        //http://mobile.ximalaya.com/mobile/discovery/v3/recommend/ts-1500542920864?appid=0&categoryId=-2&channel=ios-b1&code=43_440000_4403&device=iPhone&deviceId=400C3AF4-9BE0-4CE5-AB40-C39E08F55BB2&includeActivity=true&includeSpecial=true&network=WIFI&operator=3&scale=2&uid=0&version=6.3.9
        mainUrls: "http://mobile.ximalaya.com/mobile/discovery/v3/recommend/ts-1500542920864?appid=0&categoryId=6&channel=ios-b1&code=43_440000_4403&device=iPhone&deviceId=400C3AF4-9BE0-4CE5-AB40-C39E08F55BB2&includeActivity=true&includeSpecial=true&network=WIFI&operator=3&scale=2&uid=0&version=6.3.9",
        mainUrl: 'https://mobile.ximalaya.com/mobile/discovery/v2/category/recommends?categoryId=6&contentType=album&device=ios&scale=2&version=4.3.26.2',
        tracksUrl: 'https://mobile.ximalaya.com/mobile/others/ca/album/track/',

        albumsUrl: 'https://mobile.ximalaya.com/mobile/discovery/v1/category/album?calcDimension=hot&categoryId=6&device=android&pageSize=20&status=0&tagName=',
        searchUrl: 'https://search.ximalaya.com/front/v1?condition=relation&core=track&device=iPhone&live=true&paidFilter=false&rows=20&version=5.4.93&kw=',
        appid: 'wx1a58fa6ec90fa7c2',
        secret: '2d6343871ab16fb07b717116306cb698',
        token: 'obK6lmUnkHN-TXC-MgEw22NGzWf57858K9EjZdC0V80S1kYjDA6bdkGHADAq54XWHcHRPKiicfai0NHyRDsG6hsAlu9I47j_ZK8eyS6mJQuVfdxe7b5RYslisGG8Io2qIIMhAJADDH'


    }
})