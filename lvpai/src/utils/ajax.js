
const pro = new Promise(function(resolve,reject){
    if(Math.random()>0.5){
        resolve('Are you OK')
    }else{
        reject("I am error ")
    }
})
// then 捕捉成功的回调
// catch 捕捉失败的回调 
pro.then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})

const querystring = require("querystring");
export const http = {
    get(url,{params}){
        var promise = new Promise(function(resolve,reject){
            const handler = function(){
                if(this.readyState!==4){
                    return ;
                }
                if(this.status==200){
                    resolve({data:this.response})
                }else{
                    reject(new Error(this.statusText))
                }
            }
            params = querystring.stringify(params);
            console.log(params);
            const client = new XMLHttpRequest();  
            client.open("GET",url+"?"+params,true);
            client.responseType = "json";
            client.setRequestHeader("Accept","application/json");
            client.onreadystatechange = handler;
            client.send();
        })
        return promise;
    },
    post(){

    }
}

