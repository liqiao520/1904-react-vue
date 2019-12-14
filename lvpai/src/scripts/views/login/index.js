




import React, {Component} from "react"

import "./index.scss";
import Head from "&/components/head";
import {WhiteSpace,WingBlank,List,InputItem,Button} from "antd-mobile";
import {axios,history} from "~"

export const mobileReg = /^1(3|5|7|8|9)\d{9}$/;
export const codeReg = /^\d{4}$/

var timer = null;
export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            count:60,
            txt:"发送验证码",
            mobileFlag:false,
            loginFlag:false,
            toggle:true,
        }
    }


    checkMobile=(mobile)=>{
        console.log(mobile);
       
        if(this.state.toggle){
            this.setState({
                mobileFlag:mobileReg.test(mobile),
                loginFlag:(codeReg.test(this.code.state.value)&&mobileReg.test(mobile))
            })
        }
    }

    // 校验验证码 
    todoLogin=()=>{
        axios.post("/react/checkCode",{
            mobile:this.mobile.state.value,
            code:this.code.state.value
        }).then(res=>{
            if(!!res.data.type){
                sessionStorage.token = res.data.token; 
                sessionStorage.mobile = this.mobile.state.value
                history.push("/main/mine");
            }else{
                sessionStorage.token = "";
            }
        })
    }

    // 发送验证码 
    sendCode=()=>{

        axios.post("/react/sendCode",{
            mobile:this.mobile.state.value
        }).then(res=>{
           
        })
        this.computedTime();
        // ajax; 
       
    }

    computedTime=()=>{
        this.setState({
            count:--this.state.count,
            txt:`倒计时 ${this.state.count} S`,
            mobileFlag:false,  
        });

        var timer = setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    count:--this.state.count,
                    txt:`倒计时 ${this.state.count} S`,
                    mobileFlag:false, 
                    toggle:false, 
                })
               
            }else{
                clearInterval(timer);
                this.setState({
                    count:60,
                    txt:`发送验证码`,
                    mobileFlag:true,  
                    toggle:true
                })
                
            }
        },1000)
    }

    checkCode=(code)=>{
        console.log(this.mobile);
        this.setState({
            loginFlag:(codeReg.test(code)&&mobileReg.test(this.mobile.state.value))
        })
    }

    render(){
        const {
            txt,
            mobileFlag,
            loginFlag
        } = this.state;
        return (
            <div className="login ">
                <Head title="验证码登录" show={true} login={true} ></Head>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                    <WhiteSpace/>
                    <InputItem
                        type="tel"
                        placeholder="请输入手机号"
                        clear
                        ref={el=>this.mobile=el}
                        onChange={this.checkMobile}
                    >手机号</InputItem>
                     <WhiteSpace/>
                    <InputItem
                        type="number"
                        placeholder="请输入验证码"
                        clear
                        ref={el=>this.code=el}
                        onChange={this.checkCode}
                    >验证码</InputItem>
                    <Button onClick={this.sendCode} disabled={!mobileFlag} type="warning" className="l-btn" size="large" inline >{txt}</Button>
                    <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.todoLogin} disabled={!loginFlag} >登录</Button>
                </WingBlank>
            </div>

        )
    }
}