export function ajax({url,method,data,success}){
  wx.showLoading({
    title:"加载中..."
  })

  wx.request({
    url: url,
    method,
    data,
    success:(res)=>{
      console.log(res);
      success(res);
      wx.hideLoading();
      wx.showToast({
        title: res.data.msg,
      })
    }
  })
}