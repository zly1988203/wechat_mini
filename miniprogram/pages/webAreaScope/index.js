// pages/webAreaScope/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    web_url:'',
      selAdrsInpId:''
  },

    onMessage:function (e) {
      console.log(e.detail.data);
        var adrsInfo = {}
        try {
            var value = wx.getStorageSync('adrsInfo')
            if (value) {
                adrsInfo = JSON.parse(value);
            }
        } catch (e) {
            // Do something when catch error
        }
        var data = e.detail.data[0];
        if(this.data.selAdrsInpId == 'departAdrs'){
            adrsInfo.departTitle = data.regionName+"-"+data.title;
            adrsInfo.departlatitude = data.latitude;
            adrsInfo.departlongitude = data.longitude;
        }else {
            adrsInfo.arriveTitle = data.regionName+"-"+data.title;
            adrsInfo.arrivelatitude = data.latitude;
            adrsInfo.arrivelongitude = data.longitude;
        }
        wx.setStorageSync('adrsInfo',JSON.stringify(adrsInfo));
        // wx.navigateTo({
        //     url:'/pages/main/index'
        // })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let selAdrsInpId = options.selAdrsInpId
    this.setData({
        web_url:'https://passwechat.wx.local.olayueche.com/innerCity/mini_areaLocation?regionId=411&stationType=1&regionName=软件产业基地',
        selAdrsInpId:selAdrsInpId
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