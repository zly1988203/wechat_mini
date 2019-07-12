// pages/userCenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      avatarUrl:'',
      userInfo:{},
      funcList: [
          {title:'行程',url:'tripList/index',remark:'pages/userCenter/tripList/index'},
          {title:'优惠券',url:'coupons/index',remark:'pages/userCenter/coupons/index'},
          {title:'活动',url:'active/index',remark:'pages/userCenter/active/index'},
          {title:'推广',url:'',remark:''},
          {title:'设置',url:'',remark:''}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
        success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
              success: res => {
              this.setData({
              avatarUrl: res.userInfo.avatarUrl,
              userInfo: res.userInfo
          })
      }
      })
      }
    }
    })
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