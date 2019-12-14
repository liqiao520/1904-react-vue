


// 一个模块暴露多个接口 

export {axios,baseURL} from "./axios"

const url = require("url"); // Node 自带

export function getQuery(search){
    return url.parse(search,true).query;
}



export {history} from "./history"


export function logoutAuths(){
    for(var i in  auths){
        auths[i].logout(function(e){
            console.log("注销授权登录成功 " + auths[i].id)
        }, function(e){
            console.log("注销登录认证失败: "+JSON.stringify(e));
        });
    }
}

// id  第三方登录
export function authLogin(id){
    for(var i in auths){
        if(auths[i].id==id){
            var s = auths[i];
// 					s.authorize(function(e){
                if(!s.authResult){
                    s.login(function(e){
                        s.getUserInfo( function(e){
                            plus.nativeUI.alert("获取用户信息成功："+JSON.stringify(s.userInfo));
                        }, function(e){
                            plus.nativeUI.alert("获取用户信息失败： "+JSON.stringify(e));
                        } );
                    }, function(e){
                        plus.nativeUI.alert("登录认证失败: "+JSON.stringify(e));
                    } );
                }else{
                    plus.nativeUI.alert("已经登录认证!");
                }
//					}, function(e){
//						plus.nativeUI.alert("授权失败："+JSON.stringify(e));
//					}, {scope:'snsapi_userinfo',state:'authorize test'});
        }
    }
} 


export function takePhoto(cb){
    alert("开始拍照");
    var cmr = plus.camera.getCamera();
    var res = cmr.supportedImageResolutions[0];
    var fmt = cmr.supportedImageFormats[0];
    console.log("Resolution: "+res+", Format: "+fmt);
    cmr.captureImage( function( path ){
            alert( "Capture image success: " + path );  
            plus.io.resolveLocalFileSystemURL(path, function(entry){
                var pic = document.getElementById("pic");
                pic.src = entry.toLocalURL();
                cb();
            }, function(e){
                outLine('读取拍照文件错误：'+e.message);
            });
            
        },
        function( error ) {
            alert( "Capture image failed: " + error.message );
        },
        {resolution:res,format:fmt}
    );
}