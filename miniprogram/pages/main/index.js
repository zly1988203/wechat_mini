import { $wuxToast } from '../../dist/index'

// / 引入SDK核心类

var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;

const buttons = [
    {
        label: '个人中心',
        icon:'../../images/tabBar/my-active.png',
    },
    {
        label: '行程',
        icon:'../../images/tabBar/order-active.png',
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
    buttons
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

    onClick(e) {
        if (e.detail.index === 0) {
            wx.navigateTo({
                url: '/pages/userCenter/index'
            })
        }
    },
    onChange(e) {
        console.log('onChange', e)
    },


    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
          key: 'U7TBZ-MFHAS-5SQON-6PXLT-VNENE-2OB3Z'
      });

      var adrsInfo = options.adrsInfo;

      let that=this
        if(undefined != adrsInfo && null != adrsInfo){
          var data= adrsInfo;
            that.setData({
                'adrsInfo.departTitle': undefined!=data.departTitle?data.departTitle:'',
                'adrsInfo.arriveTitle': undefined!=data.arriveTitle?data.arriveTitle:'',
                'adrsInfo.departlatitude': undefined!=data.departlatitude?data.departlatitude:'',
                'adrsInfo.departlongitude': undefined!=data.departlongitude?data.departlongitude:'',
                'adrsInfo.arrivelatitude': undefined!=data.arrivelatitude?data.arrivelatitude:'',
                'adrsInfo.arrivelongitude': undefined!=data.arrivelongitude?data.arrivelongitude:'',
            })
        }else {
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
        // wx.getStorage({
        //     key: 'adrsInfo',
        //     success: function (res)   {
        //         var data = JSON.parse(res.data);
        //
        //     },
        //     fail: function (res) {
        //
        //     }
        // })
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
      var adrsInfo = {}
      try {
          var value = wx.getStorageSync('adrsInfo')
          if (value) {
              adrsInfo = JSON.parse(value);
          }
      } catch (e) {
          adrsInfo = null;
      }

      this.onLoad({adrsInfo: adrsInfo });
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