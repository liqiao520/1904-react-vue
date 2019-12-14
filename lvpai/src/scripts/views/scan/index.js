
import "./index.scss";
import React,{Component} from "react";
import Head from "&/components/head";

export default class Scan extends Component{
    componentDidMount(){
        var scan = null;
        mui.init({
            beforeback: function(){
                scan.close();
                return true;
            }
        });
        
        function startScan(){
            scan = new plus.barcode.Barcode('bcid');
            
            scan.start();  // 开始扫描
            
            scan.onmarked = function(type, result){   // 扫描成功 
                var text = '未知: ';
                switch(type){
                    case plus.barcode.QR:
                    text = 'QR: ';
                    break;
                    case plus.barcode.EAN13:
                    text = 'EAN13: ';
                    break;
                    case plus.barcode.EAN8:
                    text = 'EAN8: ';
                    break;
                }
                alert( text+result );
                mui.openWindow({
                    url:result
                })
                scan.close();  // 关闭扫描 
            }
        }
        startScan();
    }
    
    render(){
        return(
            <div className="scan">
                <Head title="扫一扫" show={true} scan={true}></Head>
                <div id="bcid"></div>
            </div>
        )
    }
}