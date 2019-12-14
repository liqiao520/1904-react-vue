import "./index.scss";
import React, { Component } from "react";
import { observer } from "mobx-react";
import Details from "&/mobx/detail";
import { Icon, Carousel, Toast } from "antd-mobile";
import Head from "&/components/head";
import {history} from "~"
@observer
class Detail extends Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        pic:require('@/assets/img/bshop.png'),
        pic1:require("@/assets/img/comit.png"),
        flag:true
    }
    scrollHandler = this.handleScroll.bind(this);
    componentDidMount() {
        var goods_id = this.props.match.params.goods_id

        Details.getDetail(goods_id)

        window.addEventListener('scroll', this.scrollHandler);
    }

  
   
   handleScroll(event) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop 

    if(scrollTop>200){
         this.setState({
         flag:false
          })
    }else{
        this.setState({
            flag:true
             })
    }
   }

  

    goback(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            window.event.cancelBubble = true;
        }
       
      
        history.go(-1)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.scrollHandler);
    }
    render() {
        const {
            detail,
            goods,
            good,
            
        } = Details;
        const{
            flag
        }=this.state;
      
        return (
            <div className="detail">
              
               {flag? <Icon type='left' size='lg' style={{ position: 'fixed', top: '0.1rem', zIndex: '5', color: '#fff', left: '.1rem', background: 'rgba(0,0,0,.2)', borderRadius: '50%' }} onClick={this.goback} />: <Head title="详情" show={true} ></Head>}
              
               

                <Carousel
                    autoplay={true}
                    infinite

                >
                    {goods.map((val, i) => (
                        <p
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
                        </p>
                    ))}
                </Carousel>
                <div style={{ color: 'rgba(0,0,0,.2)', boxSizing: 'border-box' }}>
                    <p style={{ color: 'black',height:'.8rem',lineHeight:'.8rem',overflow:'hidden' ,background:'#fff',padding:'0 2%'}}>
                        <span style={{background:'#ffa508',color:'#fff',borderRadius:'.1rem',padding:'0 .1rem',marginRight:'.1rem'}}>婚纱旅拍</span>
                        {detail.goods_name}</p>
                    <p style={{background:'#fff',padding:'0 2%'}}>
                        价格:
                            <span style={{ color: 'red', fontSize: '.5rem',marginLeft:'.7rem' }}>￥{detail.price}</span>
                        <s >{detail.saleprice}</s>
                    </p>
                    <p className="shou" style={{background:'#fff',padding:'0 2%'}}>
                        定金
                      <span style={{ color: 'rgba(0,0,0,.5)' }}>
                            该套餐暂不支持预付定金
                      </span>
                      <span>
                            收藏数:{detail.collectnum}
                        </span>
                      
                    </p>
                    <div style={{width:'100%',display:'flex',justifyContent:'start',marginTop:'.2rem',background:'#fff',padding:'0 2%',marginBottom:'2%',boxSizing:'border-box'}}>
                            <img src={detail.logo} style={{width:'1rem',height:'1rem'}}alt="" />
                           
                                <span style={{color:'#000',display:'inline-block',height:'1rem',lineHeight:'1rem'}}>{detail.shopname}</span>
                            
                            
                        </div>
                        
                </div>
                <h2 style={{padding:'.2rem',boxSizing:'border-box',background:'#fff'}}>套餐详情</h2>
                <div style={{marginBottom:'1rem'}}>
                {
                     good.map((item,i)=>{
                         return(
                             
                                 <img src={item} alt="" key={i}/>
                            
                         )
                     })
                 }
                </div>
               

                 <Foot pic={this.state.pic}
                 pic1={this.state.pic1}
                 detail={detail}
                 />

            </div>
        )
    }
}


export default Detail;

export class Foot extends Component{
    gotoDing=(detail)=>{
      sessionStorage.userInfo=JSON.stringify(detail);
      if(sessionStorage.token){
        history.push("/ding")
      }else{
          Toast.info('您还没有登录,先去登录')
          setTimeout(function(){
            history.push("/login") 
          },1000)
        
      }
     
    }
    render(){
        const{
            pic,
            pic1,
            detail
        }=this.props;
      
        return(
            <div className="foot">
                   <p className="dian">
                       <img src={pic} alt=""/>
                       <span>我的店铺</span>
                    </p> 
                    <p className="dian">
                       <img src={pic1} alt=""/>
                       <span>联系客服</span>
                    </p> 
                   <p style={{background:'#ffa508',color:'#fff',width:'50%',textAlign:'center'}} onClick={()=>this.gotoDing(detail)}>立即预约</p>
            </div>
        )
    }
}