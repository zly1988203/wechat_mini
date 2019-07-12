// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const urlList = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      searchObj: {
          isShow: true,
          searchKey: '',
      },
      searchRes:[],
      mapCtx: null,
      mapWidth: 200,
      mapHeight: 200,
      longitude: 0,
      latitude: 0,
      markers: [
          { iconPath: "/images/map/icon-up.png",
              id: 0,
              longitude: 113.93664,
              latitude: 22.532323,
              width: 30,
              height: 30
          },
      ],
      //当前选中纬度信息
      currentLocationInfo: {
          longitude: 0,
          latitude: 0
      },
      polygons: [],
      polyline:[],
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
                    'searchObj.isShow':false
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
            'searchObj.isShow':true
        })
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
                that.updateCenterLocation(res.latitude, res.longitude);
            }
        })
    },

    updateCenterLocation: function (latitude,longitude) {
      this.setData({
          longitude: longitude,
          latitude: latitude,
      })
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
    showMarkerInfo: function (latitude,longitude) {
        this.setData({
            'markers[0].latitude':latitude,
            'markers[0].longitude':longitude

        })
    },
    onSearchAdrs: function (event) {
        var latitude = event.currentTarget.dataset.latitude;
        var longitude = event.currentTarget.dataset.longitude;
        this.updateCenterLocation(latitude,longitude);
        this.showMarkerInfo(latitude,longitude)
    },

    onSelAdrs: function (event) {
        var latitude = event.currentTarget.dataset.latitude;
        var longitude = event.currentTarget.dataset.longitude;
        var city = event.currentTarget.dataset.city;
        var address = event.currentTarget.dataset.title;
        var adrsInfo = JSON.parse(wx.getStorageSync('adrsInfo'));
        if(this.data.selAdrsInpId == 'departAdrs'){
            adrsInfo.departTitle = city+"-"+address;
            adrsInfo.departlatitude=latitude;
            adrsInfo.departlongitude=longitude;
        }else {
            adrsInfo.arriveTitle = city+"-"+address;
            adrsInfo.arrivelatitude=latitude;
            adrsInfo.arrivelongitude=longitude;
        }
        wx.setStorageSync('adrsInfo',JSON.stringify(adrsInfo));
        wx.switchTab({
            url:'/pages/main/index',
            success:function(res){
                let page = getCurrentPages().pop();
                if(page == undefined || page == null){
                    return
                }
                page.onLoad();
            }
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
          key: 'U7TBZ-MFHAS-5SQON-6PXLT-VNENE-2OB3Z'
      });
      let selAdrsInpId = options.selAdrsInpId
      that.setData({
          selAdrsInpId:selAdrsInpId
      })
      wx.getStorage({
          key: 'searchArea',
          success:function (res) {
              var data = JSON.parse(res.data);
              var areaId = data.areaId
              var cityName = data.cityName
              var areaName = data.areaName
              that.authorAddress(function () {
                  that.setMapSize()
                  that.getGeoCoder(areaId,cityName,areaName);
              })
          }
      })


  },

    //用户地理位置授权
    authorAddress:function(succFun){
        var that = this;
        that.getCurrentLocation('gcj02', function (res) {
            console.log(res);
            that.setData({
                longitude: res.longitude,
                latitude: res.latitude
            });
            return succFun(res);
            // that.showMarkerInfo(res.longitude, res.latitude);
        });
    },

    //设置地图长宽
    setMapSize: function () {
        var that = this;
        //获取设备可使用窗口高度
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    mapWidth: res.windowWidth,
                    mapHeight: res.windowHeight-40
                });
            }
        })
    },

    //初始化当前位置
    getCurrentLocation: function (typeCode, succFun) {
        var that = this;
        wx.getLocation({
            type: typeCode,
            success: function (res) {
                return succFun(res);
            },
            fail:function(res){
                wx.openSetting({
                    success: function (data) {
                        that.authorAddress();
                    },
                    fail: function () {
                        console.info("设置失败返回数据");
                    }
                });
            }
        })
    },

    getGeoCoder: function (areaId,cityName,areaName) {
      var _this = this;
      var param = {
          araeId:areaId,
          cityName:cityName,
          areaName:areaName
      }
      wx.request({
          url:urlList.getRegionLineArea,
          data:param,
          method:'POST',
          dataType:'json',
          header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type':'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          },
          success:(res)=>{
              if(res.data.code == 0){
                    var polygons = [];
                    var areaList = res.data.data.areaList;
                    var tempPoly = {
                    points: [],
                    strokeColor:"#6392FE",
                    strokeWidth: 5,
                    strokeStyle:"dashed",
                    // fillColor:"#6392FE",
                    zIndex: 0,
                        dottedLine:true,
                        color:"#6392FE",
                        borderColor:"#6392FE",
                        width:2,
                        borderWidth:1
                };
                    let temlatlng;
                areaList.forEach((item,index )=>{
                    let locas = item.locations;
                    locas.forEach((loca,index) =>{
                    let latlng = {
                        longitude: loca.lng,
                        latitude: loca.lat
                    };
                    if(index ==0){
                        temlatlng = latlng;
                    }
                    tempPoly.points.push(latlng)
                })
                tempPoly.points.push(temlatlng);
                 polygons.push(tempPoly)

                 })
                _this.setData({
                    // polygons:polygons,
                    polyline:polygons
                })
                _this.updateCenterLocation(temlatlng.latitude, temlatlng.longitude);
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