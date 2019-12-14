import "./index.scss";
import React, { Component } from "react";
import { List, InputItem, Button, Picker, NavBar, Icon } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import { district, provinceLite } from 'antd-mobile-full-demo-data';
import { history } from "~";
import {connect} from "react-redux"


const Item = List.Item;

@connect()
class Dizhi extends Component {
   constructor(props){
       super(props);
       this.state={
       
       }
   }

    handleVal(val) {
        // console.log(val)
        let di=val
       

            sessionStorage.di=di
     return val;
   
    }


        onSubmit = () => {
       
        
            this.props.form.validateFields({ force: true }, (error) => {
                if (!error) {
                    console.log(this.props.form.getFieldsValue());
                    let di=sessionStorage.di

                   
    
                    let add=this.props.form.getFieldsValue()
                    
                   
                    var  address=Object.assign(di,add)
                    console.log(address)
                  
                    
                } else {
                    alert('Validation failed');
                }

                

            });

            
        }

  
    

    onReset = () => {
        this.props.form.resetFields();
    }
    validateAccount = (rule, value, callback) => {
        if (value && value.length > 4) {

            callback();
        } else {
            callback(new Error('At least four characters for account'));
        }
    }

    render() {
       
        const { getFieldProps, getFieldError} = this.props.form;
        return (
            <div className="dizhi">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.go(-1)}

                >添加地址</NavBar>
                <form style={{ marginTop: '.9rem' }}>

                    <List

                        renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
                    >

                        <InputItem
                            style={{ textAlign: 'right' }}
                            {...getFieldProps('account', {
                                // initialValue: 'little ant',
                                rules: [
                                    { required: true, message: 'Please input account' },
                                    { validator: this.validateAccount },
                                ],
                            })}
                            clear
                            error={!!getFieldError('account')}
                            onErrorClick={() => {
                                alert(getFieldError('account').join(','));
                            }}

                        >收件人</InputItem>
                        <InputItem
                            style={{ textAlign: 'right' }}
                            {...getFieldProps('account3', {
                                // initialValue: 'little ant',
                                rules: [
                                    { required: true, message: 'Please input account' },
                                    { validator: this.validateAccount },
                                ],
                            })}
                            clear
                            error={!!getFieldError('account3')}
                            onErrorClick={() => {
                                alert(getFieldError('account3').join(','));
                            }}

                        >联系人电话</InputItem>
                        <Picker
                            title="选择地区"
                            extra="请选择(可选)"
                            data={district}
                            value={this.state.pickerValue}
                            onChange={v => this.setState({ pickerValue: v })}
                            onOk={v => this.setState({ pickerValue: v })}
                            
                        >

                            <CustomChildren handleVal={val=>this.handleVal(val)} >省市区</CustomChildren>
                        </Picker>
                        <InputItem
                            style={{ textAlign: 'right' }}
                            {...getFieldProps('account1', {
                                // initialValue: 'little ant',
                                rules: [
                                    { required: true, message: 'Please input account' },
                                    { validator: this.validateAccount },
                                ],
                            })}
                            clear
                            error={!!getFieldError('account1')}
                            onErrorClick={() => {
                                alert(getFieldError('account1').join(','));
                            }}

                        >详细地址</InputItem>
                        <Item>
                            <Button type="primary" size="small" inline onClick={this.onSubmit}>确定</Button>
                            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>重置</Button>
                        </Item>
                    </List>
                </form>
            </div>

        )
    }
}

export default createForm()(Dizhi);

const CustomChildren = props => {


    return (
        <div
            onClick={props.onClick}
            style={{ backgroundColor: '#fff', paddingLeft: 15 }}

        >

            <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px', textAlign: 'left' }}>
                <div style={{ width: '40%', }}>{props.children}</div>
                <div style={{ textAlign: 'right', color: '#888', marginRight: 15, width: '60%' }}  >{props.handleVal(props.extra)}</div>

            </div>
        </div>
    )
}