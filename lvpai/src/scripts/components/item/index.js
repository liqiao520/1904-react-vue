import "./index.scss";
import React, { Component } from "react";
import {history} from "~"

export class ListItem extends Component {

    gotoDetail = (goods_id) => {
        history.push('/detail/' + goods_id)
    }

    render() {
        const {
            item
        } = this.props;
      
        return (
            <div className="search">


                <div className="list" onClick={() => this.gotoDetail(item.goods_id)}>
                    <img src={item.goods_thumb} alt="" />
                    <p>{item.goods_name}</p>
                    <p className="jia">
                        <span style={{ color: 'red', fontSize: '.5rem' }}>￥{item.shop_price}</span>
                        <span>已售:{item.sale_num}</span>
                    </p>
                </div>
            </div>
        )
    }



}