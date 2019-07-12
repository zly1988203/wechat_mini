import { $wuxToast } from '../../dist/index'

// / 引入SDK核心类

var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
const urlList = require('../../utils/config.js');
var qqmapsdk;

const icon = 'data:image/png;base64,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'
const buttons = [
    {
        label: '登录',
        icon,
    },
]

Page({

/**
* 页面的初始数据
*/
data: {
  imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
  ],
    local:{
        latitude: '',
        longitude: '',
    },
  adrsInfo: {
      departTitle:'',
      arriveTitle:'',
      departlatitude:0,
      departlongitude:0,
      arrivelatitude:0,
      arrivelongitude:0
  },
  visible:false,
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'],
    typeIndex: 3,
    colors: ['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'],
    colorIndex: 4,
    dirs: ['horizontal', 'vertical', 'circle'],
    dirIndex: 0,
    sAngle: 0,
    eAngle: 360,
    spaceBetween: 10,
    buttons,
},

    onfabClick(e) {
        console.log('onClick', e.detail)
        if (e.detail.index === 0) {
            wx.navigateTo({
                url: '/pages/login/index'
            })
        }
    },

openPopup: function (event) {
    let selAdrsInpId = event.currentTarget.id
    wx.navigateTo({
        url:'/pages/searchPopup/index?selAdrsInpId='+selAdrsInpId+'&departTitle='+this.data.adrsInfo.departTitle
    })
},

    getLocaAdrs:function (latitude,longitude) {
    var that = this;
        var location = {
            latitude: latitude,
            longitude: longitude
        }
        qqmapsdk.reverseGeocoder({
            location: location,
            get_poi: 0, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
            success: function(res) {
                that.setData({
                    'adrsInfo.departTitle':res.result.address,
                    'adrsInfo.departlatitude': res.result.location.lat,
                    'adrsInfo.departlongitude': res.result.location.lng,
                })
                wx.setStorageSync('adrsInfo',JSON.stringify(that.data.adrsInfo))
            }
        })
    },

    callCar:function () {
        if(this.data.adrsInfo.departTitle != '' && this.data.adrsInfo.arriveTitle != ''){
            wx.setStorageSync('adrsInfo',JSON.stringify(this.data.adrsInfo))
            wx.navigateTo({
                url:'/pages/callCarService/index'
            })
        } else {
            $wuxToast().show({
                    type: 'forbidden',
                    duration: 1500,
                    color: '#fff',
                    text: '请输入完整地址',
                    success: () => console.log('禁止操作')
            })
        }
    },


    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
          key: 'U7TBZ-MFHAS-5SQON-6PXLT-VNENE-2OB3Z'
      });

      let that=this
        wx.getStorage({
            key: 'adrsInfo',
            success: function (res)   {
                var data = JSON.parse(res.data);
                that.setData({
                    'adrsInfo.departTitle': undefined!=data.departTitle?data.departTitle:'',
                    'adrsInfo.arriveTitle': undefined!=data.arriveTitle?data.arriveTitle:'',
                    'adrsInfo.departlatitude': undefined!=data.departlatitude?data.departlatitude:'',
                    'adrsInfo.departlongitude': undefined!=data.departlongitude?data.departlongitude:'',
                    'adrsInfo.arrivelatitude': undefined!=data.arrivelatitude?data.arrivelatitude:'',
                    'adrsInfo.arrivelongitude': undefined!=data.arrivelongitude?data.arrivelongitude:'',
                })
            },
            fail: function (res) {
                wx.showLoading({
                    title:"定位中",
                    mask:true
                })
                wx.getLocation({
                    type: 'gcj02',
                    altitude:true,//高精度定位
                    //定位成功，更新定位结果
                    success: function (res) {
                        var latitude = res.latitude
                        var longitude = res.longitude
                        var speed = res.speed
                        var accuracy = res.accuracy
                        that.setData({
                            longitude:longitude,
                            latitude: latitude,
                            speed: speed,
                            accuracy: accuracy
                        })
                        that.getLocaAdrs(latitude,longitude)
                    },
                    //定位失败回调
                    fail:function(){
                        wx.showToast({
                            title:"定位失败",
                            icon:"none"
                        })
                    },

                    complete:function(){
                        //隐藏定位中信息进度
                        wx.hideLoading()
                    }

                })
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