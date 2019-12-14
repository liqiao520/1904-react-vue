

import React, {Component} from "react"

import "./index.scss";
import {history} from "~/history"


import {Carousel,Button} from "antd-mobile"

var timer=null
export default class Guide extends Component{

    constructor(){
        super();
        this.state = {
            imgs:[
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575711217&di=9898e98ce20f0ae1140f601e6d7f4096&imgtype=jpg&er=1&src=http%3A%2F%2Fpic6.wed114.cn%2F20160323%2F2016032321244960056935.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575116518693&di=97d7a9552e28029899de763eda4cea12&imgtype=0&src=http%3A%2F%2Fpic6.wed114.cn%2F20160406%2F2016040619401430558373.jpg",
                "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1840488073,2614305187&fm=26&gp=0.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575711429&di=ccad81bbe33a84036d3e59385781ef04&imgtype=jpg&er=1&src=http%3A%2F%2Fpic6.wed114.cn%2F20160406%2F2016040619400913159389.jpg",
            ],
            
            count:5,
            txt: "跳过 5s"
        }
    }
    // toHome(e) {
    //     clearInterval(timer);
    //     if (e && e.stopPropagation) {
    //         e.stopPropagation();
    //     }
    //     else {
    //         window.event.cancelBubble = true;
    //     }
     
    //     history.push("/main")
        
    // };

    startCount() {
        timer = setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: --this.state.count,
                    txt: `跳过 ${this.state.count}s`
                })
                
                console.log(11111)  
                      
            } 
            if(this.state.count < 0){
                this.setState({
                    count: 5,
                })
                clearInterval(timer);
                console.log(22222)
            }

            if(this.state.count==0){
                this.setState({
                    count: 5,
                })
                clearInterval(timer);
                history.push("/main")
                
            
            }
            
            
        }, 1000);
    }
   

    render(){
        return (
            <div className="guide">
                <Carousel
                    autoplay={false}
                    
                    dots = {false}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => index == 3?this.startCount():""}
                >
                    {
                        this.state.imgs.map((item,index)=>{
                            return (
                                <div
                                key={index}
                                style={{ display: 'inline-block', width: '100%', height: "100vh" }}
                                >   
                                    <img src={item} alt="" 
                                    style={{ width: '100%', height: "100vh" }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                       
                                    }}  
                                    />
                                      {index==this.state.imgs.length-1&&<button className="g-btn" onClick={this.toHome}> {this.state.txt} </button>}
                                    {/* {index==this.state.imgs.length-1&&<button className="g-btn" onClick={this.gotoMain}> 点击进入主页 </button>} */}
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
        )
    }
}


