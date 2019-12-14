

import Vue from "vue"
import Vuex from "vuex";

Vue.use(Vuex);

import {http} from "../plugins/axios";
const store = () => new Vuex.Store({
    state:{
        num:2000,
        msg:"Are you ok",
        pic:'',
        find:[],
        detaill:{},
        list:[],
        country:{},
        form:{},
        alist:[],
        all:[]
    },
    actions:{
        getMsgAsync({commit},{url,cb}){
            http.get(url).then(res=>{
                cb();
                commit("getMsgAsync",res.data.msg);
            })
        },
        getAvatarAsync({commit},{url,params}){
            http.post(url,{params}).then(res=>{
           
                commit("getAvatarAsync",res.data.result);
            })
        },
        getFind({commit},{url}){
            http.get(url).then(res=>{
             
                commit("getFind",res.data.result)
            })
        },
        getDetail({commit},{url,params,cb}){
            http.get(url,{params}).then(res=>{
          cb();
                commit("getDetail",res.data.result[0]);
               
               
            })
        },
        getList({commit},{url}){
            http.get(url).then(res=>{
             
                commit("getList",res.data.result)
            })
        },
        getMu({commit},{url,params}){
            http.get(url,{params}).then(res=>{
                commit('getMu',res.data.result[0])
            })
        },
        getAddress({commit},{url,params}){
            http.get(url,{params}).then(res=>{
              
                commit('getAddress',res.data.result[0].address)
            })
        },
        // goAddress({commit},{url,params,}){
        //     http.post(url,{params}).then(res=>{
              
        //         commit('goAddress',res)
        //     })
        // },
        getDan({commit},{url,params,cb}){
            http.get(url,{params}).then(res=>{
              cb();
                commit('getDan',res.data.result[0])
            })
        },
        
 
    },
    mutations:{
        changeNum(state,num){
            state.num += num;
        },
        getMsgAsync(state,msg){
            state.msg = msg;
        },
        getAvatarAsync(state,pic){
            state.pic=pic
        },
        getFind(state,find){
            state.find={...state.find,...find}
        },
        getDetail(state,detaill){
            state.detaill=detaill
        },
        getList(state,list){
            state.list=list
        },
        getMu(state,country){
            state.country=country
        },
        getAddress(state,alist){
            state.alist=alist;
        },
        // goAddress(state){
        //     state=state
        // }
        getDan(state,all){
            state.all=all;
        }
    }
});


export default store;