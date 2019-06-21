Page({
  data: {
    listData: [],
    activeIndex: 0,
    toView: 'a0',
    scrollTop: 100,
    screenWidth: 667,
    showModalStatus: false,
    currentType: 0,
    currentIndex: 0,
    sizeIndex: 0,
    sugarIndex: 0,
    temIndex: 0,
    sugar: ['不要辣','微辣', '正常', '多辣',  '变态辣'],
    item: ['一般','快','比较快','最快'],
    size: ['香菜', '葱', '蒜','姜'],
    cartList: [],
    sumMonney: 0,
    cupNumber: 0,
    showCart: false,
    loading: false
  },
    
    //加载数据
  
    onLoad:function (options) {
        var that = this;
        var sysinfo = wx.getSystemInfoSync().windowHeight;
        console.log(sysinfo)
        wx.showLoading({
            title: '努力加载中',
        })
        //将本来的后台换成了easy-mock 的接口，所有数据一次请求完 略大。。
        wx.request({
          url: 'http://localhost:8080/selectByrid',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                wx.hideLoading();
                console.log(res)
                that.setData({
                    listData: res.data,
                    menutype:['强烈推荐','炒菜','烧烤','饮料','主食'],
                    loading: true
                })
            }
        })
        // wx.setStorageSync("listDate", listDate);

    },
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
        // scrollTop: 1186
    })
    console.log(this.data.toView);
  },
  scroll: function (e) {
    console.log(e)
    var dis = e.detail.scrollTop
    if (dis > 0 && dis < 100) {
      this.setData({
        activeIndex: 0,
      })
    }
    if (dis > 100 && dis < 500) {
      this.setData({
        activeIndex: 1,
      })
    }
    if (dis > 500 && dis < 1000) {
      this.setData({
        activeIndex: 2,
      })
    }
    if (dis > 1000 && dis < 2000) {
      this.setData({
        activeIndex: 3,
      })
    }
    if (dis > 2785 && dis < 2879) {
      this.setData({
        activeIndex: 4,
      })
    }
    if (dis > 2879 && dis < 4287) {
      this.setData({
        activeIndex: 5,
      })
    }
    if (dis > 4287 && dis < 4454) {
      this.setData({
        activeIndex: 6,
      })
    }
    if (dis > 4454 && dis < 4986) {
      this.setData({
        activeIndex: 7,
      })
    }
    if (dis > 4986) {
      this.setData({
        activeIndex: 8,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  selectInfo: function (e) {
    // var type = e.currentTarget.dataset.type;
    // var index = e.currentTarget.dataset.index;
    var index = e.currentTarget.dataset.idx;
    this.setData({
      showModalStatus: !this.data.showModalStatus,
      sizeIndex: 0,
      sugarIndex: 0,
      temIndex: 0,
      currentIndex: index
    });
  },

  chooseSE: function (e) {
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    if (type == 0) {
      this.setData({
        sizeIndex: index
      });
    }
    if (type == 1) {
      this.setData({
        sugarIndex: index
      });
    }
    if (type == 2) {
      this.setData({
        temIndex: index
      });
    }
  },
  showCartList: function () {
    console.log(this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }

  },
 
  clearCartList: function () {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0
    });
  },
  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price;
    cartList[index].sum += cartList[index].price;

    this.setData({
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber + 1
    });
  },
  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;

    var sum = this.data.sumMonney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber - 1
    });
  },
  
  goBalance: function (e) {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMonney', this.data.sumMonney);
      wx.setStorageSync('cupNumber', this.data.cupNumber);
    
      wx.navigateTo({
        url: '../order/balance/balance'
      })
    }
   
  },

  addToCart: function (e) {
    var price =e.currentTarget.dataset.price;
    var name=e.currentTarget.dataset.name;
    var a = this.data
    var addItem = {
      "name": name,
      "price": price,
      "detail": a.size[a.sizeIndex] + "+" + a.sugar[a.sugarIndex] + "+" + a.item[a.temIndex],
      "number": 1,
      "sum": price,
    }
    var sumMonney = a.sumMonney + price;
    var cartList = this.data.cartList;
    cartList.push(addItem);
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMonney: sumMonney,
      cupNumber: a.cupNumber + 1
    });
    console.log(this.data.cartList)
  },

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


  
