// pages/bindPhone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sessionKey: "+veWrehBsRdzGkey7ix0Og==",
      openId: "ooVAB5aOoc_WYSUrYB7ue7MWFcWU",
      unionid: "oOltD1tl9Z_E7TgWobkj6JxnQ3ls"
  },


    getPhoneNumber:function(e) {
      var that = this;
        wx.login({
            success (res) {
                if (res.code) {
                    that.decryptionPhoneNumber(res.code);
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },

    decryptionPhoneNumber:function (appCode) {
      var that = this;
        wx.request({
            url:'',
            data:{
                appCode:appCode,
                openId:that.data.openId,
                sessionKey:that.data.sessionKey
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success:function (res2) {
                wx.reLaunch({
                    url:'/pages/main/index'
                })
            }
        })
    },


    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})