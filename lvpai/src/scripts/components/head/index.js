

import React, { Component } from "react"
import "./index.scss"
import { NavBar, Icon, Popover, ActionSheet, Toast } from "antd-mobile"
import { connect } from "react-redux"
import { changeTab } from "../../actions";
import { history } from "~";
import PropTypes from "prop-types"

const Item = Popover.Item;  // 静态属性 

@connect()
class Head extends Component {

    constructor() {
        super()
        this.state = {
            isSearch: false
        }
    }

    goback = () => {
        history.go(-1);
        this.props.dispatch(changeTab(localStorage.oldTab));
    }

    goSearch = () => {
        history.push("/search");

    }


    componentDidMount() {

        // location.hash 
        // console.log(location);
        var pathname = location.hash.split("#/")[1];
        if (pathname == "search") {
            this.setState({
                isSearch: true
            })
        }
    }





    render() {
        const {
            title,
            show,
            scan,
            login
        } = this.props;
        return (
            <NavBar

                mode="light"
                icon={show ? <Icon type="left" /> : ''}
                onLeftClick={() => show ? this.goback() : console.log('')}
                rightContent={[
                    !this.state.isSearch && <Icon key="0" onClick={this.goSearch} type="search" style={{ marginRight: '16px' }} />,
                    <Pop key="1" scan={scan} login={login} />,
                ]}
            > {title}</NavBar>
        )
    }
}
Head.contextTypes = {
    location: PropTypes.object
}


let wrapProps = {
    onTouchStart: e => e.preventDefault(),
};
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
class Pop extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            selected: ''
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({
            visible
        })
    }

    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        console.log(opt);
        if (opt.props.value == 'login') {
            history.push("/login");
        }
        if (opt.props.value == 'scan') {
            history.push("/scan");
        }
        if (opt.props.value == 'photo') {
            this.showActionSheet();
        }
    };

    showActionSheet = () => {
        const BUTTONS = ['拍照', '从相机中选择', '直接拍照', '删除', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2,
            // title: 'title',
            message: 'wh1909 - 手机拍照',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps
        },
            (buttonIndex) => {
                console.log(buttonIndex);
                Toast.success('' + BUTTONS[buttonIndex] + 'success !!!', 1);
            });
    }


    render() {
        const {
            scan,
            login
        } = this.props;
        return (
            <Popover mask
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={this.state.visible}
                overlay={[
                    (!scan && <Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">扫一扫</Item>),
                    (<Item key="5" value="photo" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>拍照</Item>),
                    (!login && <Item key="6" value="login" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                        <span style={{ marginRight: 5 }}>登录</span>
                    </Item>),
                ]}
                align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
            >
                <div style={{
                    height: '100%',
                    padding: '0 15px',
                    marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                    <Icon type="ellipsis" />
                </div>
            </Popover>
        )
    }
}

export default Head;