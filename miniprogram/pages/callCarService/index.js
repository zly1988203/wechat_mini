var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const urlList = require('../../utils/config.js');
import { $wuxSelect } from '../../dist/index'
import data from './data'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      adrsInfo: {
          departTitle:'',
          arriveTitle:'',
      },
      longitude: 0,
      latitude: 0,
      markers: [],
      personInfo:{
          value: '',
          title: '',
      },
      options1: data,
      value1: [],
      carList:[
          {
              id:'1',
              type:'1',
              title:'拼车',
              price:'10',
              imgUrl:'../../images/callCar/stage-one-gray.png'

          },
          {
              id:'2',
              type:'2',
              title:'快车',
              price:'19',
              imgUrl:'../../images/callCar/stage-one-gray.png'

          },
          {
              id:'3',
              type:'3',
              title:'商务',
              price:'50',
              imgUrl:'../../images/callCar/stage-one-gray.png'

          },
          {
              id:'4',
              type:'4',
              title:'豪华',
              price:'109',
              imgUrl:'../../images/callCar/stage-one-gray.png'

          }
      ]
  },

    regionChange: function (e) {
        var that = this;
        var changeType = e.type;
        if (changeType == 'end') {
            // that.showMarkerInfo(0, 0);
            // that.getCurrentLocation('gcj02', function (res) {
            //     that.setData({
            //         longitude: res.longitude,
            //         latitude: res.latitude
            //     });
            //     that.showMarkerInfo(res.latitude,res.longitude);
            // });
        }
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

    getCurrLocation: function () {
      var that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                that.setData({
                    longitude: res.longitude,
                    latitude: res.latitude
                });
            },
            fail:function(res){

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
      // this.getCurrLocation();
      this.setMapSize();
      this.showMarkers();
      // this.getCenterLocation();
  },

    /**
     * 得到中心点坐标
     */
    getCenterLocation: function () {
        var that = this;
        //mapId 就是你在 map 标签中定义的 id
        var mapCtx = wx.createMapContext('U7TBZ-MFHAS-5SQON-6PXLT-VNENE-2OB3Z');
        mapCtx.getCenterLocation({
            success: function (res) {
                that.setData({
                    latitude:res.latitude,
                    longitude:res.longitude
                })
            },
            error:function (res) {
                var res = res;
            }
        })
    },

    onPersonClick:function() {
        $wuxSelect('#sel-person').open({
            value: this.data.personInfo.value,
            options: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
            ],
            onConfirm: (value, index, options) => {
            console.log('onConfirm', value, index, options)
        if (index !== -1) {
            this.setData({
                'personInfo.value': value,
                'personInfo.title': options[index],
            })
        }
    },
    })
    },

    onDateOpen: function () {
        this.setData({ visible1: true })
    },

    onClose1:function() {
        this.setData({ visible1: false })
    },
    onChange1(e) {
        this.setData({ title1: e.detail.options.map((n) => n.value).join('/') })
        console.log('onChange1', e.detail)
    },

    onSelType:function (e) {
        var temp_list = []
        this.data.carList.forEach((item,i)=>{
            item.imgUrl = '../../images/callCar/stage-one-gray.png';
            temp_list.push(item);
        })
        this.setData({
            carList: temp_list
        })

        var index = e.currentTarget.dataset.index;
        var temp_img = 'carList['+index+'].imgUrl';
        var temp_price = 'carList['+index+'].price';
        this.setData({
            [temp_img]: '../../images/callCar/stage-one-balck.png',
        })
        console.log(this.data.carList);
    },

    getSysPrompt:function () {
      wx.navigateTo({
          url:'/pages/sysPrompt/index'
      })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.setMapSize();
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