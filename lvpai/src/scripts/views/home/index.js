import React, { Component } from "react";
import "./index.scss";
import { connect } from "react-redux";
import Head from "&/components/head";
import { Carousel, Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import Homes from "&/mobx/data";
import { observer } from "mobx-react";
import { history } from "~";


@observer
class Home extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        list: [
            require("@/assets/img/lp_prefer.png"),
            require("@/assets/img/lp_request.png"),
            require("@/assets/img/xcj@2x.png")
        ]
    }

    componentDidMount() {
        // simulate img loading
   
            this.setState({
                data: [
                    require('@/assets/img/5c1767c55dd29.jpg'),
                    require('@/assets/img/5c186209c10e7.jpg'),
                    require('@/assets/img/5c189935eb85a.jpg')],
            });
     

        Homes.getHome();
        Homes.getLiyu()
     
    }

    gotoDetail=(goods_id)=>{
        history.push('/detail/'+goods_id)
    }
    render() {
        const {
            list
        } = this.state;
        const {
            liyu,
            homes,
            lis
        

        } = Homes;
     
        return (
            <div className="home">
                <Head title="首页" show={true} ></Head>

                <Carousel
                    autoplay={true}
                    infinite

                >
                    {this.state.data.map((val, i) => (
                        <a
                            key={i}
                            href=""
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {

                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <WhiteSpace size="lg" />
                <WingBlank>
                    <Flex>
                        {
                            list.map((item, i) => (
                                <Flex.Item  key={i}>
                                    <img src={item} alt="" style={{ width: '100%', height: '100%' }} />
                                </Flex.Item>
                            )
                            )
                        }
                    </Flex>
                </WingBlank>
                <WhiteSpace size="lg" />

                <img src={liyu.image} alt={liyu.title} />
                <WhiteSpace size="lg" />
                <div className="shang">

                    {
                        homes.map((item, i) => {
                            return (
                                <div key={i} onClick={()=>this.gotoDetail(item.goods_id)}>
                                    <img src={item.goods_thumb} alt="" />
                                    <p className="qian">{item.goods_name}</p>
                                    <HomeChild styleList={item.styleList.slice(0, 2)} />
                                    <p style={{display:'flex',justifyContent:'space-between'}}>
                                        <span style={{color:'red'}}>￥{item.shop_price}</span>
                                        <span>已售:{item.sale_num}</span>
                                    </p>
                                </div>
                            )
                        }
                        )
                    }


                </div>
                <div>
                    {
                        lis.map((item,i)=>{
                            return(
                                <div key={i} onClick={()=>this.gotoDetail(item.goods_id)}>
                                <img src={item.goods_thumb} alt="" />
                               <div className="zi">
                               <WhiteSpace size="lg" />
                                <p className="qian1">{item.goods_name}</p>
                                <WhiteSpace size="lg" />
                               <HomeChildOne bright={item.bright}/>
                                <p style={{display:'flex',justifyContent:'space-between',height:'.8rem',lineHeight:'.8rem'}}>
                                    <span style={{color:'red',fontSize:'.5rem'}}>￥{item.shop_price}</span>
                                    <span>已售:{item.sale_num}</span>
                                </p>
                               </div>
                            </div>
                            )
                        })
                    }
                </div>


            </div>
        )
    }
}

export default Home;

export class HomeChild extends Component {
    render() {
        const {
            styleList
        } = this.props;

        return (
            <div style={{ width: '100%', textAlign: 'left' }}>
                {
                    styleList.map((item, i) => {
                        return (
                            <span key={i} className="tu">{item.name}</span>
                        )
                    })
                }

            </div>
        )
    }
}

export class HomeChildOne extends Component {
    render() {
        const {
            bright
        } = this.props;

        return (
            <div style={{ width: '100%', textAlign: 'left' }}>
                <p>路线亮点</p>
                {
                    bright.map((item, i) => {
                        return (
                            <span key={i} >{item}</span>
                        )
                    })
                }

            </div>
        )
    }
}
