const apiTestUrl = require('../../../utils/config').apiTestUrl
const app = getApp()
Page({
    onShareAppMessage() {
        return {
            title: '获取用户信息',
            page: 'page/api-test/test-user/test-user'
        }
    },
    data: {
        openid: '',
        phoneNumber: ''
    },
    getOpenId: function () {
        const that = this
        app.getUserOpenId(function (err, openid) {
            that.setData({openid: openid})
        })
    },
    getUserInfo: function (res) {
        console.log("获取用户信息:" + JSON.stringify(res));
        const userInfo = res.detail.userInfo;
        this.setData({userInfo:userInfo})
        this.decodeUserInfo(res)
    },
    decodeUserInfo: function (info) {
        var detail = info.detail
        var data = {
            'signature': detail.signature,
            'encryptedData': detail.encryptedData,
            'iv': detail.iv,
            'rawData': detail.rawData,
            'sessionKey': app.globalData.sessionKey
        }
        wx.request({
            url: apiTestUrl.userInfoUrl,
            data: data,
            method: 'GET',
            success(res) {
                console.log("获取解密用户信息返回:")
                console.log(res)
            }
        })
        wx.request({
            url: apiTestUrl.userPhoneUrl,
            data: data,
            method: 'GET',
            success(res) {
                console.log("获取用户手机号返回:")
                console.log(res)
            }
        })
    },
    getPhoneNumber: function (res) {
        const that = this
        console.log("获取用户手机号返回")
        console.log(res);
        var detail = res.detail;
        var data = {
            'sessionKey': app.globalData.sessionKey,
            'encryptedData': detail.encryptedData,
            'iv': detail.iv
        }
        wx.request({
            url: apiTestUrl.userPhoneUrl,
            data: data,
            method: 'GET',
            success(res) {
                console.log("获取小程序手机号返回")
                console.log(res)
                that.setData({
                    phoneNumber: res.data.phoneNumber
                })
            }
        })
    }
})
