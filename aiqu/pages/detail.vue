<template>
  <div class="detail">
    <div :detaill="detaill">
      <van-nav-bar left-arrow @click-left="onClickLeft" class="navs" title="商品详情" v-if="flag"/>
      <van-nav-bar  left-arrow @click-left="onClickLeft" class="navs1" />
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(im,i) in detaill.imageVedioList" :key="i">
          <img :src="im.image" alt class="im" />
        </van-swipe-item>
      </van-swipe>
      <div :style="{padding:'0 0.2rem'}">
        <p >{{detaill.nameZh}}</p>
        <p>
          <span :style="{color:'red',fontSize:'.4rem',marginRight:'.1rem'}">{{detaill.priceSymbol}}{{detaill.price}}起</span>
          <span :style="{color:'#1ac5fb'}">起价说明</span>
          <span :style="{float:'right',color:'rgba(0,0,0,.5)'}">{{detaill.purchaseNum}}人去过</span>
        </p>
        <div v-for="(d,i) in detaill.discountView" :key="i">
        <p :style="{lineHeight:'.8rem'}" class="po">
          <span :style='{color:"#888"}'>{{d.title}}</span>
          <span v-for="(md,ig) in d.names" :key="ig" :style="{color:'red',border:'1px solid red',marginLeft:'.1rem'}">{{md}}</span>
        </p>
    </div>

            <p>测试滚动效果</p>
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
>
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
      </van-list>
        

         </div>

          <van-goods-action>
          <van-goods-action-icon icon="service-o" text="客服" />

      <!-- <van-goods-action-button color="#1ac5fb" type="warning" text="加入购物车" /> -->
          <van-goods-action-button color="#ff6034" type="danger" text="立即预定" :to="{name:'que',query:{id:detaill.productId}}"  id="btns" />
        </van-goods-action>
      </div> 
   
  </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
import { Toast } from 'vant';
export default {
  data() {
    return {
      // detaill: {},
      flag:false,
      list: [],
      error: false,
      loading: false,
      but:false,
      
    };
  },
  computed: {
    ...mapState(['detaill'])
  },
  mounted() {
    let id = this.$route.query.id;
    console.log(id);
    var btns=document.getElementById('btns');
    if(!sessionStorage.token){
      // $("#btns").attr("disabled","disabled")
      Toast("您还没有登录,请先登录")
      btns.setAttribute("disabled","disabled")
      
    }
 
    this.getDetail({url:'/api/api/getdetail',params:{id},cb(){}})

      window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
  ...mapActions(['getDetail']),
    onClickLeft() {
      this.$router.back(-1);
    },
    
    windowScroll () {
     // 滚动条距离页面顶部的距离
     // 以下写法原生兼容
     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop 
       
      if(scrollTop>360){
        this.flag=true
      }else{
        this.flag=false
      }
  },
  onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
 
  },
    destroyed () {
 	 window.removeEventListener('scroll', this.windowScroll)
  }
};
</script>
<style scoped>
.detail {
  background: #fff;
}
.im {
  width: 100%;
  height: 100%;
}

.navs1{
position: fixed;
  top: 0;
  left: 0;

  background-color:transparent;
  z-index: 30!important;
  color:#fff;
}
.navs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1ac5fb;
  color:#fff;
}
.van-goods-action-button--first {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.van-goods-action-button--last {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
/* .po span:nth-last-child(1){
  border:0;
} */
.van-nav-bar__title{
  color:#fff;
}
.van-icon-arrow-left:before{
  color:#fff;
}
</style>