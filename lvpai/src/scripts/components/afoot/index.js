

import React, {Component} from "react";
import {TabBar} from "antd-mobile"

import "./index.scss";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { changeTab } from "../../actions";
// import Demo from "&/mobx/demo"
// import ShopCar from "&/mobx/shopcar"
import {observer} from "mobx-react";

export const foots = [
    {txt:"首页",path:"/main/home",name:"home",icon:"icon-shouye"},
    {txt:"路线",path:"/main/classify",name:"classify",icon:"icon-luxian-"},
    {txt:"客片",path:"/main/ke",name:"cart",icon:"icon-tupian"},
    {txt:"我的",path:"/main/mine",name:"mine",icon:"icon-mine"}
]

@connect(
    state=>{
        return {
            selectedTab:state.getIn(['data','tab'])
        }
    }
)
@observer
class AFoot extends Component{
    constructor(){
        super();
        // this.state = {
        //     selectedTab:"home"
        // }
    }

    componentDidMount(){
        console.log(location);
        const tab = location.hash.split("#/main/")[1];
        this.props.dispatch(changeTab(tab));

        localStorage.newTab = tab;
    }

    // 返回高亮  localStorage 

    render(){
        return (
            <div className="myfoot">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#ffa508"
                    barTintColor="white"
                >
                    {
                        foots.map((foot,i)=>{
                            return (
                                <TabBar.Item
                                key={i}
                                title={foot.txt}
                                icon={<i style={{
                                    width: '25px',
                                    height: '25px',
                                    }}
                                    className={'iconfont '+ foot.icon}
                                />
                                }
                                selectedIcon={<i style={{
                                    width: '25px',
                                    height: '25px',
                                    }}
                                    className={'iconfont '+ foot.icon}
                                />
                                }
                                selected={this.props.selectedTab === foot.name}
                               
                                onPress={() => {
                                    // 控制高亮
                                    const {history} = this.props;
                                    
                                    this.props.dispatch(changeTab(foot.name))
                                    // this.setState({
                                    //   selectedTab: foot.name
                                    // });
                                    history.push(foot.path);
                                }}
                                >

                                </TabBar.Item>
                            )
                        })
                    }
                </TabBar>
            </div>
        )
    }
}

AFoot.contextTypes = {
    history:PropTypes.object,
    location:PropTypes.object
}

export default AFoot;