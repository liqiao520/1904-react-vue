import React, { Component } from "react";
import "./index.scss";
import { observer } from "mobx-react";
import Head from "&/components/head";


import ReactEcharts from 'echarts-for-react';

@observer
class Ke extends Component {

     
       // 绘制图表
       getOption = () => {
        var option = {
            title :{
                text:'时间安排分析'
            },
            angleAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                z: 10
            },
            radiusAxis: {
            },
            polar: {
            },
            series: [{
                type: 'bar',
                data: [1, 2, 3, 4, 3, 5, 1],
                coordinateSystem: 'polar',
                name: 'A',
                stack: 'a'
            }, {
                type: 'bar',
                data: [2, 4, 6, 1, 3, 2, 1],
                coordinateSystem: 'polar',
                name: 'B',
                stack: 'a'
            }, {
                type: 'bar',
                data: [1, 2, 3, 4, 1, 2, 5],
                coordinateSystem: 'polar',
                name: 'C',
                stack: 'a'
            }],
            legend: {
                show: true,
                data: ['A', 'B', 'C']
            }
        }
         return option;
     };
    render() {
        return (
            <div style={{overflow:'hidden'}}>
                <Head title="客片" show={true} ></Head>
                <div style={{marginTop:80}}>
                    <ReactEcharts
                    option={this.getOption()}
                    style={{height: '500px', width: '100%'}}
                    />
                </div>
            </div>
        )
    }
}

export default Ke;


