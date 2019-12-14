import "./index.scss";
import React, { Component } from "react";
import { NavBar, Icon, List, Stepper, WhiteSpace, Switch, InputItem, Calendar,TextareaItem, Toast } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import {history} from "~";

const extra = {
    '2017/07/15': { info: 'Disable', disable: true },
};

const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };

Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
        extra[+date] = info;
    }
});

const Item = List.Item;
const Brief = Item.Brief;
export class Ding extends Component {
    originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            val: 1,
            checked: false,
            checked1: false,
            en: false,
            show: false,
            config: {},
            img:require("@/assets/img/tian.png")
        }
    }

    renderBtn(zh, en, config = {}) {
        config.locale = this.state.en ? enUS : zhCN;

        return (
            <List.Item arrow="horizontal"
                onClick={() => {
                    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                    this.setState({
                        show: true,
                        config,
                    });
                }}
            >
                {this.state.en ? en : zh}
            </List.Item>
        );
    }

    changeLanguage = () => {
        this.setState({
            en: !this.state.en,
        });
    }

    onSelectHasDisableDate = (dates) => {
        console.warn('onSelectHasDisableDate', dates);
    }

    onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime,
            endTime,
        });
    }

    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime: undefined,
            endTime: undefined,
        });
    }

    getDateExtra = date => extra[+date];

    componentDidMount() {
        this.setState({
            userInfo: JSON.parse(sessionStorage.userInfo)
        })
    }

    onChange = (val) => {
        // console.log(val);
        this.setState({ val });
    }

    getding(){
        Toast.info('记得给钱哦')
    }

    render() {
        const {
            userInfo,
            checked,
            checked1,
            img,
            val
        } = this.state;
        console.log(this.state)

        return (
            <div className="ding">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.go(-1)}

                >确认订单</NavBar>
                <List style={{marginTop:'1rem'}} className="my-list">
                    <Item extra="选择">预约信息</Item>

                    <Item align="top" thumb={img} multipleLine onClick={()=>history.push('/dizhi')}>
                        去添加地址
                    </Item>
                </List>
                <WhiteSpace />
                <List className="my-list">
                    <Item>所购产品</Item>

                    <Item align="top" thumb={userInfo.goods_thumb} multipleLine>
                        {userInfo.goods_name}
                        <Brief>
                            <span style={{ color: 'red' }}>￥{userInfo.saleprice} </span>

                            <s>￥{userInfo.price}</s>

                            <Stepper
                                style={{ width: '40%', minWidth: '20px', marginLeft: '.7rem' }}
                                showNumber
                                max={10}
                                min={1}
                                value={this.state.val}
                                onChange={this.onChange}
                            />
                        </Brief>

                    </Item>
                </List>
                <List>
                    <List.Item
                        extra={<Switch
                            checked={this.state.checked}
                            onChange={() => {
                                this.setState({
                                    checked: !this.state.checked,
                                });
                            }}
                        />}
                    >是否现在预约档期</List.Item>
                    {
                        checked && (<List className="calendar-list" style={{ backgroundColor: 'white' }}>
                            {this.renderBtn('选择日期', 'Select Date', { type: 'one' })}

                            {
                                this.state.startTime &&
                                <List.Item>Time: {this.state.startTime.toLocaleString()}</List.Item>
                            }

                        </List>
                        )

                    }
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => { }}
                        platform="android"
                    >
                        优惠券
                    </Item>
                    <List.Item
                        extra={<Switch
                            checked={this.state.checked1}
                            onChange={() => {
                                this.setState({
                                    checked1: !this.state.checked1,
                                });
                            }}
                        />}
                    >是否使用核销码</List.Item>
                    {
                        checked1 && <InputItem
                            style={{ textAlign: 'right' }}
                            placeholder="请输入你的核销码"
                            clear
                            onChange={(v) => { console.log('onChange', v); }}
                            onBlur={(v) => { console.log('onBlur', v); }}

                        ></InputItem>
                    }
                </List>

                <List renderHeader={() => '备注'} style={{textAlign:'left'}}>
                    <TextareaItem
                        placeholder="请填写备注信息"
                        rows={3}
                       
                    />
                </List>


                <Calendar
                    {...this.state.config}
                    visible={this.state.show}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                    onSelectHasDisableDate={this.onSelectHasDisableDate}
                    getDateExtra={this.getDateExtra}
                    defaultDate={now}
                    minDate={new Date(+now - 5184000000)}
                    maxDate={new Date(+now + 31536000000)}
                />

                <div style={{background:'#fff',position:'fixed',bottom:'0',left:'0',width:'100%',height:'.8rem',lineHeight:'.8rem',display:'flex',justifyContent:'space-around'}}>
                <span style={{color:'red',width:'50%'}}>￥{userInfo.price*val}</span>
                    <span style={{color:'#fff',background:'rgba(0,0,0,.8)',width:'50%'}} onClick={this.getding}>提交订单</span>
                </div>
            </div>
        )
    }
}