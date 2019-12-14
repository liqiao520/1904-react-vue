import {HashRouter,Route} from "react-router-dom";
import React,{Component} from "react";
import {Lay} from "&/views"

export class MainRouter extends Component{
    render(){
        return(
            <HashRouter>
                <Route component={Lay}/>
            </HashRouter>
        )
    }
}