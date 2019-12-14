import "./index.scss"
import React, { Component } from "react";
import {history} from "~";
import { NavBar, Icon, List,Button } from 'antd-mobile';
const Item = List.Item;

export class Zi extends Component {
    constructor() {
        super();
        this.state = {
            mobile: '',
            path: '',
            token:''

        }
    }
    componentDidMount() {
        // let path=this.props.location.search.split("=")[1]
        // console.log(path)
       
        this.setState({
            mobile: this.props.match.params.mobile,
            path: this.props.location.search.split("=")[1],
            token:sessionStorage.getItem('token')
        })
    }
    out(token){
        window.sessionStorage.removeItem('token');
        console.log(token)
        history.push('/main/home')
    }
    render() {
        const {
            match,
            location,
            history
        } = this.props;
        const {
            mobile,
            path,
            token
        } = this.state;
        console.log(this.props)

        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.go(-1)}

                >设置</NavBar>
                <List renderHeader={() => 'Icon in the left'}>
                    <Item

                        arrow="horizontal"
                        onClick={() => { }}
                    >个人资料</Item>
                    <Item

                        onClick={() => { }}
                        arrow="horizontal"
                    >
                        修改密码
                    </Item>
                    <Item

                        onClick={() => { }}
                        arrow="horizontal"
                    >
                        我的收货地址
                    </Item>
                </List>

                <List style={{ marginTop: '.4rem' }}>
                    <Item

                        arrow="horizontal"
                        onClick={() => { }}
                    >意见反馈</Item>
                    <Item

                        onClick={() => { }}
                        arrow="horizontal"
                    >
                        关于全球旅拍
                    </Item>

                </List>
                <List style={{ marginTop: '.4rem' }}>
                   <Button type="warning" onClick={()=>this.out(token)}>退出登录</Button>

                </List>

            </div>
        )
    }
}