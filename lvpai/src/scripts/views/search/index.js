import React, { Component } from "react";
import "./index.scss";
import { SearchBar } from 'antd-mobile';
import Head from "&/components/head";
import {connect} from "react-redux";
import { getSearchList } from "../../actions";
import { List } from "../../components/list";

@connect(
    state=>{
        return{
            searchList:state.getIn(['data','searchList'])
        }
    }
)
class Search extends Component {
    state = {
        value: '',
      };
      todoSearch=(keyword)=>{
       
        this.props.dispatch(getSearchList({
            url:'/react/getGoodLists',
            params:{
                keyword
            }
        }))
      }

      onChange= (value) => {
        this.setState({ value });
      };
      clear = () => {
        this.setState({ value: '' });
      };
    render() {
        const{
            searchList  
        }=this.props;

        return (
            <div className="search">
                <Head title="搜索" show={true} ></Head>
             
                <SearchBar
                style={{marginTop:'.9rem'}}
                    
                    placeholder="请输入商品名称"
                    onSubmit={this.todoSearch}
                  
                    onCancel={this.clear}
                    showCancelButton
                    onChange={this.onChange}
                />
                <List goods={searchList}  keys="search"/>
            </div>
        )
    }
}

export default Search;