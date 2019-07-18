//app.js
const config = require('utils/config')
App({
    onLaunch: function () {

    },
    globalData: {
        hasLogin: false,
        openid: null,
        sessionKey: null
    },
    getUserOpenId(callback) {
        const self = this
        if (self.globalData.openid) {
            callback(null, self.globalData.openid)
        } else {
            wx.login({
                success(data) {
                    wx.request({
                        url: config.apiTestUrl.openIdUrl,
                        data: {
                            code: data.code
                        },
                        success(res) {
                            console.log('拉取openid成功', res)
                            self.globalData.openid = res.data.openid
                            self.globalData.sessionKey=res.data.sessionKey
                            callback(null, self.globalData.openid)
                        },
                        fail(res) {
                            console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
                            callback(res)
                        }
                    })
                },
                fail(err) {
                    console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
                    callback(err)
                }
            })
        }
    }
})
