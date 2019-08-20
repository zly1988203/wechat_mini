import { $wuxLoading } from '../../dist/index'
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const urlList = require('../../utils/config.js').urlList;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      selAdrsInpId:'',
      searchObj: {
          isShow: true,
          searchKey: '',
      },
      latitude: 23.099994,
      longitude: 113.324520,
      searchRes:[],
      areaList:[],
      seladrs:'',
      adrsInfo: {
          departTitle:'',
          arriveTitle:'',
          latitude:0,
          longitude:0,
      },
      localVisable:false
  },

    searchByTxt: function (event) {
        var _this = this;
        var keyword = event.detail.value
        // 调用接口
        qqmapsdk.search({
            keyword: keyword,  //搜索关键词
            // location:''+ this.data.latitude+','+this.data.longitude+'',  //设置周边搜索中心点
            page_size:8,
            success: function (res) { //搜索成功后的回调
                _this.setData({
                    searchRes:res.data,
                    'searchObj.isShow':false,
                    localVisable:true,
                })
            },
            fail: function (res) {
                console.log(res);
            },
            complete: function (res){
                console.log(res);
            }
        });
    },
    searchCancle:function (event) {
        this.setData({
            searchRes:[],
            'searchObj.isShow':true,
            localVisable:false,
        })
    },

    onSearchAdrs: function (event) {
        let city = event.currentTarget.dataset.city
        let district = event.currentTarget.dataset.district
        let address = event.currentTarget.dataset.title
        var latitude = event.currentTarget.dataset.latitude;
        var longitude = event.currentTarget.dataset.longitude;
        var adrsInfo = {}
        try {
            var value = wx.getStorageSync('adrsInfo')
            if (value) {
                adrsInfo = JSON.parse(value);
            }
        } catch (e) {
            // Do something when catch error
        }


        if(this.data.selAdrsInpId == 'departAdrs'){
            adrsInfo.departTitle = city+'-'+address;
            adrsInfo.departlatitude=latitude;
            adrsInfo.departlongitude=longitude;
        }else{
            adrsInfo.arriveTitle = city+'-'+address;
            adrsInfo.arrivelatitude=latitude;
            adrsInfo.arrivelongitude=longitude;
        }
        wx.setStorage({
            key:'adrsInfo',
            data:JSON.stringify(adrsInfo)
        });
        this.setData({
            searchKey:'',
            searchRes:[],
            isShow: true,
            visible: false,
        })

        wx.navigateBack({
            url:'/pages/main/index',
        })
    },

    onSearchArea: function (event) {
      var that = this;
      var areaId = event.currentTarget.dataset.areaId
        var cityName = event.currentTarget.dataset.city
        var areaName = event.currentTarget.dataset.title
        let searchArea = {
            areaId:areaId,
            areaName:areaName,
            cityName:cityName
        }
        wx.setStorageSync('searchArea',JSON.stringify(searchArea));
        wx.navigateTo({
            url:'/pages/webAreaScope/index?selAdrsInpId='+that.data.selAdrsInpId
        })
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.$wuxLoading = $wuxLoading()
      this.$wuxLoading.show({
          text: '数据加载中',
      })

      // 实例化API核心类
      qqmapsdk = new QQMapWX({
          key: 'U7TBZ-MFHAS-5SQON-6PXLT-VNENE-2OB3Z'
      });

      let _this = this;
      let selAdrsInpId = options.selAdrsInpId
      let departTitle = options.departTitle
      this.setData({
          'adrsInfo.departTitle':departTitle,
          selAdrsInpId: selAdrsInpId
      })
      let param = {
          token:urlList.serverUtil.token,
          departAreaId:1,
          departCityName:'',
          arriveAreaId:2,
          arriveCityName:'',
          lineType:2,
          stationType:1,
          providerId:'',
          seachType:''
      }
      wx.request({
          url:urlList.getOpenAreas,
          data:param,
          method:'POST',
          dataType:'json',
          header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type':'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          },
          success:  function (res){
              _this.$wuxLoading.hide()
              if(res.data.code == 0){
                  var areaList = [];
                  if (_this.data.selAdrsInpId == 'departAdrs') {
                      areaList = undefined != res.data.data.startCityList ? res.data.data.startCityList : [];
                  } else {
                      areaList = undefined != res.data.data.endCityList ? res.data.data.endCityList : [];
                  }

                  _this.setData({
                      areaList:areaList
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