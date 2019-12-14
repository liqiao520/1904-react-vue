import "./index.scss"
import React, { Component } from "react";
import Head from "&/components/head";
import { Button, ActionSheet, Toast } from "antd-mobile";
import { takePhoto } from "~";

let wrapProps = {
    onTouchStart: e => e.preventDefault(),
};
export default class Photo extends Component {


    showActionSheet = () => {
        const BUTTONS = ['拍照', '从相机中选择', '直接拍照', '删除', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2,
            // title: 'title',
            message: '手机拍照',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps
        },
            (buttonIndex) => {
                console.log(buttonIndex);
                Toast.success('' + BUTTONS[buttonIndex] + 'success !!!', 1);

                if (buttonIndex == 0) {
                    takePhoto();
                }
            });
    }


    render() {
        return (
            <div style={{ height: '100%' }}>
                <Head title="拍照" show={true} photo={true} ></Head>

                <div style={{ height: '100%',paddingTop: '1rem',overflow:'hidden' }}>
                    <Button type="warning" onClick={() => this.showActionSheet()} >点击拍照</Button>
                    <img src={require('@/assets/img/user_head.png')} alt="" id="pic" width="100%" height="280" />
                </div>
            </div>
        )
    }
}