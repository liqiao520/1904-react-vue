import React,{Component} from "react";
import "./index.scss"
import {Switch,Route,Redirect} from "react-router-dom";
import LazyLoad from "~/lazyload";

import AFoot from "../../components/afoot"


export class Main extends Component{
    render(){
        return(
            <div style={{width:'100vm',height:'100vh'}}>
                <Switch>
                    <Route path="/main/" exact render={()=>(<Redirect to="/main/home" />)}></Route>

                    <Route path="/main/home" component={LazyLoad(()=>(import("../home")))}></Route>

                    <Route path="/main/classify" component={LazyLoad(()=>(import("../classify")))}></Route>

                    <Route path="/main/ke" component={LazyLoad(()=>(import('../ke')))}></Route>

                    <Route path="/main/mine" component={LazyLoad(()=>(import('../mine')))}></Route>

                    <Route  render={()=>(<Redirect to="/main/home" />)}></Route>
                </Switch>

                <AFoot history={this.props.history}></AFoot>
            </div>
        )
    }
}