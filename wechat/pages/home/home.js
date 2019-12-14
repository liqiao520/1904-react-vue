// pages/home/home.js
import {ajax} from "../../utils/ajax.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names:"haha",
    txt:"双大括号语法,允许声明式将数据渲染进DOM系统",
    msg:"wuhan",
    flag:true,
    imgSrc: "https://zuozhaoxi.com/base/img/3.jpg",
    array: [{
      message: 'foo-1909',
    }, {
      message: 'bar-1910'
    }],
    count:2020,
    num:[1,2,3,4,5,6,7,8,9],
    inp:'你最近过的还好吗?',
    clientX:0,
    likeData:{
      who:'我',
      count:1909,
      time:'12.11'
    },
    actionData:{
      items:['办理护照','办理签证','办理移民'],
      hidden:true
    },
    loginData:{
      flag: true,
      mobile: 18086417861,
      code: ''
    }
  },
  todocancel() {
    this.setData({
      'loginData.flag': false
    })
    wx.setStorageSync('isLogin', false)

  },
  sendCode(){
    // 发送验证码 

    ajax({
      url: "https://zuozhaoxi.com:1909/react/sendCode",
      method: "POST",
      data: {
        mobile: this.data.loginData.mobile
      },
      success: (res) => {

      }
    })

  },
  todoconfirm(){
// 确定
   ajax({
     url:'https://zuozhaoxi.com:1909/react/checkCode',
     method:'POST',
     data:{
       mobile:this.data.loginData.mobile,
       code:this.data.loginData.code
     },
     success:(res)=>{
       wx.setStorageSync('isLogin', !!res.data.type);

       if(!!res.data.type){
         this.setData({
           'loginData.flag':false
         })
       }else{
         this.setData({
           isLogin:false
         })
       }
     }
   })
  },
  getMobile(e) {
    this.setData({
      'loginData.mobile': e.detail.value
    })
  },
  getCode(e) {
    this.setData({
      'loginData.code': e.detail.value
    })
  },


  open(){
    this.setData({
      'actionData.hidden':false
    })

  },
  todoItem(e){
    this.setData({
      'actionData.hidden': true
    })
    console.log(e);

    var id=e.target.dataset.idx;

    wx.showToast({
      title: `${this.data.actionData.items[id]}成功!`,
    })
  },
  cancel() {
    this.setData({
      'actionData.hidden': true
    })

  },
  openactionsheet(){
    wx.showActionSheet({
      itemList: this.data.actionData.items,
      success:(res)=> {
        console.log(res.tapIndex);
        wx.showToast({
          title: `${this.data.actionData.items[res.tapIndex]}成功!`,
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  openModal(){
    wx.showModal({
      title: '流量提醒',
      content: '你正在使用4G流量观看视频',
      showCancel:true,
      cancelText:'取消观看',
      confirmText:'确定观看',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '您点了确定按钮',
          })
        } else if (res.cancel) {

          wx.showToast({
            title: '您点了取消按钮',
          })
    
        }
      }
    })
  },

  parent(){
    wx.showToast({
      title: '这是父事件',
    })
  },
  childone(){
    wx.showToast({
      title: 'childrenOne 这是子事件,不会阻止事件冒泡',
    })
  },
  childtwo() {
    wx.showToast({
      title: 'childrenTwo 这是子事件,会阻止事件冒泡',
    })
  },
  todoSome(e) {
    console.log(e);
    console.log("todoSome -- todoSome" + e.touches[0].clientY)
  },
  changeInp(e){
    this.setData({
      inp:e.detail.value
    })
  },
  handleTap(e){
    console.log(e)
    this.setData({
      msg:e.target.dataset.hi,
      clientX:e.detail.x
    })
  },
  changCount(){
    this.setData({
      count:this.data.count+=5
    })
  },
  changeflag(){
    this.setData({
      flag:!this.data.flag
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
})