import { $wuxToast } from '../../dist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag:false,
      telStr:"",
      pasWd:"",
      ajaxFlag:true,
      avatarUrl:'',
      canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

    login(){
        if(this.data.telStr == ""){
            $wuxToast().show({
                type: 'forbidden',
                duration: 1500,
                color: '#fff',
                text: '请输入电话号码',
                success: () => console.log('禁止操作')
        })


            // wx.showToast({
            //     title: '请输入电话号码',
            //     image:'../../images/toast/icon-warning.png',
            //     duration: 1500,
            // })
            return false;
        }

        if (!(/^1[23456789]\d{9}$/.test(this.data.telStr))) {

            wx.showToast({
                duration: 1500,
                icon:'',
                image:'../../images/toast/icon-warning.png',
                title: '号码格式错误',
            })
            return false;
        }


        // if(this.data.pasWd == "" || this.data.pasWd.length != 4){
        //     wx.showToast({
        //         duration: 1500,
        //         image:'../../images/toast/icon-warning.png',
        //         title: '请输入4位验证码',
        //     })
        //     return false;
        // }

        wx.showLoading({
            title:'数据加载中，请稍后...'
        })

        setTimeout(()=>{
            wx.hideLoading()
        },1500)

        wx.navigateTo({
            url:'/pages/main/index?telStr='+this.data.telStr
        })

    },
    getTel:function (event) {
        this.setData({
            telStr:event.detail.value
        })
        console.log(this.data.telStr);

    },
    getPwd:function(event) {
        this.setData({
            pasWd:event.detail.value
        })
        console.log(this.data.pasWd);
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
              console.log(res.userInfo);
      }
      })
      }
  }
  })
  },
    bindGetUserInfo:function (e) {
        console.log(e.detail.userInfo)
      wx.navigateTo({
          url:'/pages/bindPhone/index'
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

  },
})