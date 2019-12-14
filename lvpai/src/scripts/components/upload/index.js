

import React, {Component} from "react"
import "./index.scss";
import {axios,baseURL} from "~";
import {connect} from "react-redux"
import { getMyPic } from "../../actions";

var initPic = require("@/assets/img/user_head.png");

@connect(
    state=>{
        return {
            pic:state.getIn(['user','pic'])
        }
    }
)
class UploadImg extends Component{

    constructor(){
        super()
      
    }

    getReduxPic=(pic)=>{
        this.props.dispatch(getMyPic(pic))
    }

    componentDidMount(){
        
        
        var userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            userInfo = JSON.parse(userInfo);
            if(userInfo.mobile==sessionStorage.mobile){
              
                this.getReduxPic(userInfo.path)
            }else{
                this.getPic();
            }
        }else{
            this.getPic();
        }

    }

    getPic=()=>{
        axios.post("/react/getAvatarPic").then(res=>{
            if(!!res.data.type){
             
                this.getReduxPic(res.data.path.replace("public",baseURL))
            }else{
               
                this.getReduxPic(initPic)
            }
        })
    }

    startSend=()=>{
        this.file.click();
    }

    uploadFile=()=>{    
        console.log('start upload');
        var file = this.file.files[0];
        var data = new FormData();
        data.append('avatar',file);
        axios({
            url:"/react/uploadavatar",
            method:"POST",
            data
        }).then(res=>{
            
            this.getReduxPic(res.data.path.replace("public",baseURL))
            localStorage.setItem("userInfo",JSON.stringify({
                mobile:res.data.mobile,
                path:res.data.path.replace("public",baseURL)
            }))
        })
    }

    render(){
        return (
            <div>
                <img src={this.props.pic}  alt="" className="touxiang" onClick={this.startSend}/>
                <input onChange={this.uploadFile} type="file" ref={el=>this.file=el} className="uploadinp"/>
            </div>
        )
    }
}

export default  UploadImg;