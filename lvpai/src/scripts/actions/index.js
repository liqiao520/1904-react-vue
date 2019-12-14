import {axios} from "~"


export  function changeTab(tab){
    return{
        type:'changeTab',
        tab
    }
}

export async function changeFen({url}){
    let res = await axios.get(url);
    return {
        type:"changeFen",
        payload:res.data.result
    } 
}


export async function changeArea({url}){
    let res = await axios.get(url);
    return {
        type:"changeArea",
        payload:res.data.result
    } 
}

export async function changeList({url}){
    let res = await axios.get(url);
    return {
        type:"changeList",
        payload:res.data.result
    } 
}

export async function changeLists({url,params}){
    let res = await axios.get(url,{params});
    return {
        type:"changeLists",
        payload:res.data.result
    } 
}

export async function changeListy({url,params}){
    let res = await axios.get(url,{params});
    return {
        type:"changeListy",
        payload:res.data.result
    } 
}

export function getMyPic(payload){
    return{
        type:'getMyPic',
        payload
    }
}

export  async function getUserMobile({url}){
    let res = await axios.post(url);
    return {
        type:"getUserMobile",
        payload:res.data.result
    }
}

export  async function getSearchList({url,params}){
    let res = await axios.get(url,{params});
    return {
        type:"getSearchList",
        payload:res.data.result
    }
}

export  async function postAddress({url,query}){
    let res = await axios.post(url,{query});
    return {
        type:"postAddress",
        payload
        
    }
}
