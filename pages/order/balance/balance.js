// pages/order/balance/balance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    cupNumber:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      cutMonney: wx.getStorageSync('sumMonney')>19?3:0,
      cupNumber: wx.getStorageSync('cupNumber'),
    })
  },
  bindinput: function (e) {
    this.setData({
      reason_input: e.detail.value
    });
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { 
         
        }
      })
    } 
  },
  gopay:function(e){
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求  
          console.log(res.code)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    }); 

   
     
    
    // var addItem = {
    //   "remarks": rems
    // }
    // var cartList=this.data.cartList;
    // var addItem1 = {
    //   "id": e.detail.encryptedData
    // }
    // cartList.push(addItem1);
   
    // cartList.push(addItem);
    var cartList = e.currentTarget.dataset;
    wx.request({
      url: 'http://localhost:8080/submission',
      method: 'post',
      data: {
        cartList: cartList//这里是发送给服务器的参数（参数名：参数值）
      },
      header: {
        'content-type': 'application/json'  //这里注意POST请求content-type是小写，大写会报错  
      },
      success: function (res) {
        wx.setStorageSync('menu', res.data)
        console.log("数据" + res.data)
       
      
      }
    })
    var rems = this.data.reason_input;
    wx.request({
      url: 'http://localhost:8080/ygy',
      method: 'post',
      data: {
        remarks: rems//这里是发送给服务器的参数（参数名：参数值）
      },
      header: {
        'content-type': 'application/json'  //这里注意POST请求content-type是小写，大写会报错  
      },
      success: function (res) {

        console.log("数据" + res.data)
       

      }
    })
    wx.navigateTo({
      url: '../detail/detail'
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