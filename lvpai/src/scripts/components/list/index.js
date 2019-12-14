import "./index.scss"
import React, { Component } from "react";
import { PullToRefresh, Button } from 'antd-mobile';
import { ListItem } from "../item"


export class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        };
    }


    render() {
        const {
            keys,
            goods
        } = this.props;
        return (
            <div>
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        setTimeout(() => {
                            this.setState({ refreshing: false });
                        }, 1000);
                    }}
                >
                    {goods.map((val, i) => (
                        <ListItem key={i} item={val}></ListItem>
                    ))}
                </PullToRefresh>
            </div>
        )
    }
}