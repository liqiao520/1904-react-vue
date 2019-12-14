


// 一个模块暴露多个接口 

export {axios,baseURL} from "./axios"

const url = require("url"); // Node 自带

export function getQuery(search){
    return url.parse(search,true).query;
}



export {history} from "./history"