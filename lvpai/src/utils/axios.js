
import axios from "axios";
import {Toast} from "antd-mobile"
import {history} from "~";
// export const baseURL = "http://localhost:1909/"; 
export const baseURL = "https://deeplove.top:1909/";   // 基路径

var token = "";
axios.defaults.baseURL = baseURL;   // 基路径
axios.defaults.headers.common['token'] = token;     // token 为 空
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export function loadingToast(msg) {
    Toast.loading(msg, 3, () => {
      console.log('Load complete !!!');
    });
}
export function successToast(msg) {
    Toast.hide();
    Toast.success(msg, 1);
}

export function failToast(msg) {
  Toast.hide();
  Toast.fail(msg, 1);
}

export function offline(msg) {
  Toast.offline(msg, 1);
}



// axios 拦截器   Interceptors
// 请求 request 拦截器   请求之前业务逻辑 配置 data /headers
axios.interceptors.request.use(function (config) {
  // 请求发送之前做的事情
  
  token = sessionStorage.token ?   sessionStorage.token : "";
  config.headers['token']  = token;
  return config;
  loadingToast("努力加载...");

  
}, function (error) {
  // 请求发送 失败 
  offline("请求失败---网络错误!")
  return Promise.reject(error);
  
});


// 响应 response 拦截器   根据返回的状态码 做对应的业务逻辑 
axios.interceptors.response.use(function (response) {
    // 获取到响应数据做的事情
    console.log(response)
    setTimeout(() => {
      successToast(response.data.msg);
      
    },1000);
    if(response.data.code=="400"){
      // history.push("/login");
      Toast.info('您还没有登录,请先去登录')
    }

    
    return response;

  }, function (error) {
    failToast("服务器error-响应失败!!!");
    return Promise.reject(error);
});




export {axios}

