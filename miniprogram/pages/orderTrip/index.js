// pages/orderTrip/index.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
import { $wuxActionSheet } from '../../dist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      adrsInfo: {
          departTitle:'',
          arriveTitle:'',
          departlatitude:0,
          departlongitude:0,
          arrivelatitude:0,
          arrivelongitude:0
      },
      markers: [],
      latitude:0,
      longitude:0,
      polyline:null,
      visable:false,
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
                    mapHeight: res.windowHeight
                });
            }
        })
    },

    showDriveLine: function () {
        var that = this;
        var depLatlng ={
            latitude:that.data.adrsInfo.departlatitude,
            longitude:that.data.adrsInfo.departlongitude
        }
        var arrLatlng = {
          latitude:that.data.adrsInfo.arrivelatitude,
            longitude:that.data.adrsInfo.arrivelongitude
        }

        qqmapsdk.direction({
            mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
            //from参数不填默认当前地址
            from:depLatlng ,
            to: arrLatlng,
            success: function (res) {
                console.log(res);
                var ret = res;
                var coors = ret.result.routes[0].polyline, pl = [];
                //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                var kr = 1000000;
                for (var i = 2; i < coors.length; i++) {
                    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                }
                //将解压后的坐标放入点串数组pl中
                for (var i = 0; i < coors.length; i += 2) {
                    pl.push({ latitude: coors[i], longitude: coors[i + 1] })
                }
                console.log(pl)
                //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
                that.setData({
                    latitude:pl[0].latitude,
                    longitude:pl[0].longitude,
                    polyline: [{
                        points: pl,
                        color: '#0c60ee',
                        borderColor:'#ffffff',
                        width: 4
                    }]
                })
            },
            fail: function (error) {
                console.error(error);
            },
        })
    },

    showMore: function() {
        var that = this;
        that.setData({
            visable:true
        })
        $wuxActionSheet().showSheet({
            // titleText: '自定义操作',
            buttons: [
                {
                text: '查看'
            },
                {
                    text: '取消'
                },
            ],
            buttonClicked(index, item) {
                // index === 0 && wx.navigateTo({
                //     url: '/pages/dialog/index'
                // })

                // index === 1 && wx.navigateTo({
                //     url: '/pages/toast/index'
                // })
                that.setData({
                    visable:false
                })
                return true
            },
            cancelText: '',
            cancel() {
                that.setData({
                    visable:false
                })
            },
            // destructiveText: '删除',
            // destructiveButtonClicked() {},
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
          'adrsInfo.departlatitude':adrsInfo.departlatitude,
          'adrsInfo.departlongitude':adrsInfo.departlongitude,
          'adrsInfo.arrivelatitude':adrsInfo.arrivelatitude,
          'adrsInfo.arrivelongitude':adrsInfo.arrivelongitude,
      })

      this.setMapSize();
      this.showMarkers();
      this.showDriveLine();
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