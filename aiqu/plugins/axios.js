import axios from "axios"

// axios.defaults.baseURL = "http://localhost:1909/";  //应用的基路径

var token="";
axios.defaults.headers.common['token']=token;
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';


// import {Loading,Message} from "element-ui";
import { Notify } from 'vant';
// var loadingInstance=null;

export function Toast(msg,type,duration){
    var duration=duration || 800;
    var type=type ||"success";

    Notify({
        type,
        message:msg,
        center:true,
        duration
    })
}

import {createHashHistory} from "history";
const router=new createHashHistory();
// axios 拦截器  Interceptors

// 请求request  拦截器  请求之前业务逻辑  配置data/headers
axios.interceptors.request.use(function(config){
    // console.log(config);

    token=sessionStorage.token ? sessionStorage.token:"";

    config.headers['token']=token;
    var URL=config.url;

    if(URL=='/api/getfind'){
        Notify({
            type: 'success',
            message:'加载中',
            center:true,
            duration:1000
        })
    }

   
    return config;
},function(error){
    // console.log('请求失败');
    // Notify.clear()
    Toast("请求失败-request","error");

    // 请求发送 失败
    return Promise.reject(error);
})

// 响应response 拦截器  根据返回的状态码  做对应的业务逻辑
axios.interceptors.response.use(function(response){
    // 获取到响应数据做的事情
    // console.log(response);

    setTimeout(()=>{
        // Notify.clear()
        Toast(response.data.msg);

        // 判断token是否正确
        if(response.data.code=="10000"){
            router.push({name:'login'})
        }
        
    },1000)

    return response;
},function(error){
    // console.log('响应失败')

    // 无法响应
    // Notify.clear()
    Toast("响应失败-response","error");
    return Promise.reject(error);
})

export const http = axios;