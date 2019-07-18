// pages/orderTrip/index.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      adrsInfo: {
          departTitle:'',
          arriveTitle:'',
      },
      markers: [],
  },

    showMarkers: function () {
        var adrsInfo = JSON.parse(wx.getStorageSync('adrsInfo'));
        var departMarker =   {
            iconPath: "/images/map/icon-up.png",
            id: 0,
            longitude: adrsInfo.departlongitude,
            latitude: adrsInfo.departlatitude,
            width: 30,
            height: 30
        }

        var arriveMarker = {
            iconPath: "/images/map/icon-down.png",
            id: 0,
            longitude: adrsInfo.arrivelongitude,
            latitude: adrsInfo.arrivelatitude,
            width: 30,
            height: 30
        }
        var markers = [];
        markers.push(departMarker);
        markers.push(arriveMarker);
        this.setData({
            markers:markers,
            longitude: adrsInfo.departlongitude,
            latitude: adrsInfo.departlatitude,
        })
    },

    //设置地图长宽
    setMapSize: function () {
        var that = this;
        //获取设备可使用窗口高度
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    mapWidth: res.windowWidth,
                    mapHeight: res.windowHeight/2
                });
            }
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      qqmapsdk = new QQMapWX({
          key: 'U7TBZ-MFHAS-5SQON-6PXLT-VNENE-2OB3Z'
      });

      var adrsInfo = JSON.parse(wx.getStorageSync('adrsInfo'));
      this.setData({
          'adrsInfo.departTitle':adrsInfo.departTitle,
          'adrsInfo.arriveTitle':adrsInfo.arriveTitle,
      })

      this.setMapSize();
      this.showMarkers();

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