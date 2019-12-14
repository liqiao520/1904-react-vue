import React, { Component } from "react";
import "./index.scss";
import { connect } from "react-redux";

import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { changeFen, changeList, changeLists } from "../../actions";
import { history } from "~";

const tabs = [
    { title: <Badge text={'3'}>产品列表</Badge> },
    { title: <Badge text={'今日(20)'}>话题分类</Badge> },

];
export const pai=[
    {txt:'价格升序',num:1},
    {txt:'价格降序',num:-1},
    {txt:'销量升序',num:-1},
    {txt:'销量升序',num:1}
]
@connect(
    state => {
        return {
            fenge: state.getIn(['data', 'fenge']),
            list: state.getIn(['data', 'list'])
        }
    }
)
class Classify extends Component {
    constructor(){
        super();
        this.state={
            pai
        }
    }
    componentDidMount() {
        const { dispatch, fenge, list } = this.props;
        dispatch(changeFen({
            url: "/react/getfenge"
        }))

        dispatch(changeList({
            url: '/react/getlist'
        }))
        
    }
    getlist=(num)=>{
        this.props.dispatch(changeLists({
            url:'/react/getLists',
            params:{
                num
            }
        }))
    }

    getlisty=(num)=>{
        this.props.dispatch(changeLists({
            url:'/react/getListy',
            params:{
                num
            }
        }))
    }

    gotoDetail=(goods_id)=>{
        history.push('/detail/'+goods_id)
    }

    render() {
        const {
            fenge,
            list
        } = this.props;

        return (
            <div className="classify">

                <Tabs tabs={tabs}
                    initialPage={0}
                >
                    
                    <div >
                    <div className="pai">
                        <span onClick={()=>this.getlist(1)}>价格正序</span>
                        <span onClick={()=>this.getlist(-1)}>价格倒序</span>
                        <span onClick={()=>this.getlisty(-1)}>销量正序</span>
                        <span onClick={()=>this.getlisty(1)}>销量倒序</span>
                       
                    </div>
                        {
                            list.map((item, i) => {
                                return (
                                    <div key={i} className="list" onClick={()=>this.gotoDetail(item.goods_id)}>
                                        <img src={item.goods_thumb} alt="" />
                                        <p>{item.goods_name}</p>
                                        <p className="jia">
                                            <span style={{ color: 'red', fontSize: '.5rem' }}>￥{item.shop_price}</span>
                                            <span>已售:{item.sale_num}</span>
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div >
                        {
                            fenge.map((item, i) => {
                                return (
                                    <div key={i} >
                                        <WhiteSpace size="lg" />
                                        <p style={{ textAlign: 'left', fontSize: '0.4rem', padding: '1%', borderLeft: '5px solid orange' }}>{item.name}</p>
                                        <Di list={item.list} it={item} />
                                    </div>
                                )
                            })
                        }
                    </div>

                </Tabs>

            </div>
        )
    }
}

export default Classify;

export class Di extends Component {
    goDa = (it) => {

        history.push('/xiang')
        sessionStorage.info = JSON.stringify(it)
    }
    render() {
        const {
            list,
            it

        } = this.props;
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    list.map((item, i) => (
                        <div key={i} style={{ width: '50%', padding: '1%', boxSizing: 'border-box', textAlign: 'left' }} onClick={() => this.goDa(item)} >
                            <p>
                                <img src={item.thumb} alt="" style={{ height: '2.6rem' }} />
                            </p>
                            <p style={{ fontSize: '.4rem', lineHeight: '.6rem', }}>{item.name}</p>
                            <p className="zi2">{item.description}</p>

                        </div>
                    )



                    )
                }
            </div>
        )
    }
}

