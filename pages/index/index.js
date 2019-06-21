//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播图
    imgUrls: [
      '../../images/top1.jpg',
      '../../images/top2.jpg',
      '../../images/top3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {

  },
  golist: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  gophone:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000'
    })
  }
})
