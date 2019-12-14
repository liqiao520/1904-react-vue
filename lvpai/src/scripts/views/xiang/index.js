import "./index.scss"
import React, { Component } from "react";
import { Icon } from "antd-mobile"
import { connect } from "react-redux";
import { changeArea } from "../../actions";

@connect(
    state => {
        return {
            area: state.getIn(['data', 'area'])
        }
    }
)
class Xiang extends Component {
    state = {
        info: {}
    }

    componentDidMount() {
        this.setState({
            info: JSON.parse(sessionStorage.info)
        })

        const { dispatch, area } = this.props;
        dispatch(changeArea({
            url: "react/getArealist"
        }))

    }
    goback(){
        history.go(-1)
    }
    render() {
        const {
            info
        } = this.state;
        const {
            area
        } = this.props



        return (
            <div className="xiang">
                <Icon type='left' size="lg" style={{position:'fixed',top:'0',zIndex:'5',color:'#fff'}}  onClick={this.goback}/>
                <img src={info.thumb} alt="" />
                <span className="name">{info.name}</span>
                <p>简介</p>
                <hr />
                <p>{info.description}</p>
                <Lie area={area} />
            </div>
        )
    }
}

export class Lie extends Component {
    render() {
        const {
            area
        } = this.props;
        console.log(this.props)
        return (
            <div style={{marginTop:'.2rem'}}>
                <h2 style={{paddingLeft:'.2rem',borderTop:'1px solid #555',lineHeight:'.5rem'}}>列表</h2>
                {
                    area.map((item, i) => {
                        return (
                            <div key={i} style={{display:'flex',justifyContent:'spaceBetween',width:'100%',padding:'2%'}}>
                                <img src={item.thumb} alt=""  style={{width:'50%',height:'2rem'}}/>
                               <p>
                               <span>{item.title}</span>
                               
                               </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Xiang;