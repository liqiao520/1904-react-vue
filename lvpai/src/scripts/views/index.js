import {Switch,Route,Redirect} from "react-router-dom";
import React,{Component} from "react";

import LazyLoad from "~/lazyload";
import {Main} from "./main";
import PropTypes from "prop-types";
import  Login  from "./login";
import {Zi} from "./zi";
import { Ding } from "./ding";
import  Dizhi  from "./dizhi";
import Detail from "./detail";


export class Lay extends Component{
    getChildContext(){
        return {
            history:this.props.history,
            location:this.props.location
        }
    }
    componentDidUpdate(){
        const tab = location.hash.split("#/main/")[1];
        localStorage.oldTab = localStorage.newTab;
        localStorage.newTab = tab;
    }
    render(){
        return(
            <Switch>
                <Route path="/" exact render={()=>(<Redirect to="/guide"/>)}></Route>
                <Route path="/guide" component={LazyLoad(()=>import('./guide'))}></Route>
                <Route path="/search" component={LazyLoad(()=>import('./search'))}></Route>
                <Route path="/xiang" component={LazyLoad(()=>import('./xiang'))}></Route>
                <Route path="/detail/:goods_id?" component={Detail}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/zi/:mobile?" component={Zi}></Route>
                <Route path="/ding" component={Ding}></Route>
                <Route path="/dizhi" component={Dizhi}></Route>
                <Route path="/main" component={Main}></Route>
                <Route render={()=>(<Redirect to="/main/home"/>)}></Route>
                
            </Switch>
        )
    }
}

Lay.childContextTypes = {
    history:PropTypes.object,
    location:PropTypes.object
}