// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=578899140,1412678472&fm=27&gp=0.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //需要注意的是：我们展示图片的域名需要在后台downfile进行配置，并且画到canvas里面前需要先下载存储到data里面
    let that = this;
    //先下载下来，比如我们的logo
    wx.downloadFile({
      url: that.data.img,
      success: function (res) {
        console.log(res);
        that.setData({
          img: res.tempFilePath
        });
        that.canvasImg();
      }
    })

  
  },
  canvasImg() {
    const ctx = wx.createCanvasContext('myCanvas');
    const grd = ctx.createLinearGradient(0, 0, 300, 0);//创建了一个线性的渐变颜色 前两个参数起点横纵坐标，后两个参数终点横纵坐标
    grd.addColorStop(0, '#000');
    grd.addColorStop(1, '#fff');
    ctx.setFillStyle(grd);                             //为创建的canvans上下文添充颜色  如果没有设置 fillStyle，默认颜色为 black。
    ctx.fillRect(0, 0, 300, 400);
    ctx.drawImage(this.data.img, 50, 100, 200, 145);   //里面的参数无非就是图片放置的位置即图片的横纵坐标，图片的宽高
    ctx.setFillStyle("#fff");
    ctx.setFontSize(20);                               //字大小
    ctx.setTextAlign('center');                        //是否居中显示，参考点画布中线
    ctx.fillText('今天天气好晴朗', 150, 280);            //150:canvas画布宽300，取1/2，中间，280：纵向位置
    ctx.draw();
  },
  saveImg() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,                     //画布宽高
      height: 400,
      destWidth: 600,                 //画布宽高*dpr 以iphone6为准
      destHeight: 800,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath) //生成的临时图片路径
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '保存成功',
            })
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