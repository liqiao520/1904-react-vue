import React, { Component } from "react";
import "./index.scss";
import { observer } from "mobx-react";
import Head from "&/components/head";
import { List } from 'antd-mobile';
import UploadImg from "&/components/upload";
import { connect } from "react-redux";
import { getUserMobile, getMyPic } from "../../actions";
import { Link } from "react-router-dom"
const Item = List.Item;

export const mine = [
    { txt: "我的订单", img: require("@/assets/img/xuqiu.png") },
    { txt: "我的需求", img: require("@/assets/img/deng.png") },
    { txt: "我的竞拍", img: require("@/assets/img/jing.png") },
    { txt: "我的退款", img: require("@/assets/img/tui.png") },
    { txt: "我的制作", img: require("@/assets/img/ren.png") }
]


@connect(
    state => {
        return {
            mobile: state.getIn(['user', 'mobile']),
            pic: state.getIn(['user', 'pic'])
        }
    }
)
@observer
class Mine extends Component {
    constructor() {
        super();
        this.state = {
            img: require('@/assets/img/comit.png'),
            img1: require('@/assets/img/about.png'),
            img2: require('@/assets/img/bshop.png'),
            isLogin: !!sessionStorage.token,
        }
    }

    componentDidMount() {

        const {
            mobile,
            dispatch,

        } = this.props;
        console.log(this.props)
        if (!mobile) {
            dispatch(getUserMobile({ url: "/react/getMobile" }))

        }
    }

    render() {
        const {
            isLogin
        } = this.state;
        return (
            <div className="mine">
                <div className="bj">
                    {
                        isLogin ? <div style={{ display: 'flex', height: '3rem', lineHeight: '3rem', alignItems: 'center', width: '100%', paddingLeft: '.2rem', color: '#fff' }}>

                            <UploadImg></UploadImg>
                            <p style={{ display: 'flex', justifyContent: 'space-between', width: '70%',height:'100%' }}>
                                <span style={{ marginLeft: '.2rem',boxSizing:'border-box' }}>欢迎你:  {this.props.mobile}</span>
                                <Link to={"/zi/" + this.props.mobile + "?path=" + this.props.pic}>
                                    设置
                                </Link>
                             </p>
                        </div> : <div style={{lineHeight:'3rem',color:'#fff'}}>
                                <span onClick={() => this.props.history.push("/login")} type="primary"  style={{border:'1px solid #fff',padding:'2%',borderRadius:'1rem'}}>马上登录</span>
                            </div>
                    }

                </div>

                <List >
                    {
                        mine.map((item, i) => {
                            return (
                                <Item
                                    thumb={item.img}
                                    arrow="horizontal"
                                    onClick={() => { }}
                                    key={i}
                                >{item.txt}</Item>
                            )
                        })
                    }

                </List>
                <List>
                    <Item
                        thumb={this.state.img}
                        arrow="horizontal"
                        onClick={() => { }}
                        style={{ marginTop: '.1rem' }}
                    >联系客服</Item>

                    <Item
                        thumb={this.state.img1}
                        arrow="horizontal"
                        onClick={() => { }}

                    >关于我们</Item>
                </List>
                <List>
                    <Item
                        thumb={this.state.img2}
                        arrow="horizontal"
                        onClick={() => { }}
                        style={{ marginTop: '.1rem' }}

                    >商家入驻</Item>
                </List>
            </div>
        )
    }
}

export default Mine;