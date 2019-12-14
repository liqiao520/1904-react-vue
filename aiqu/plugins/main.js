import Vue from 'vue'

// 全局样式
import "../styles/animate.css";
import "../styles/common.css"
// import "../styles/index.scss"
// 使用vue-resourse
import VueResource from "vue-resource";
Vue.use(VueResource);//mthis.$http.get Vue.http

// 使用axios
import  {http} from "./axios";
Vue.prototype.$axios=http;//this.$axios=axios

// 注册全局组件
// import Head from "../components/Head.vue"
// Vue.component("Head",Head);

// 自定义指令

//自定义过滤器
Vue.filter("dateFormat",(value,str)=>{
    if(!value) return "";
    str = str || "-"
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    return `${year}${str}${month}${str}${day} ${hour}:${min}:${sec}`;
});

Vue.filter("stepText",(value)=>{
    console.log(value);
    if(!value) return "未处理";

    if(value==1){
        return "已申诉";
    }else if(value==2){
        return "已审批";
    }
})


Vue.filter("stepcolor",(value)=>{
    console.log(value);
    if(!value) return "primary";

    if(value==1){
        return "danger";
    }else if(value==2){
        return "success";
    }
})