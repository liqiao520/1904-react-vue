<template>
  <div>
    <van-search
      placeholder="请输入搜索关键词"
      v-model="value"
      shape="round"
      :style="{background:'rgba(0,0,0,0)'}"
      @click="gotosearch"
      :class="navbg==true?'navbw':'van-search'"
    />
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <Swiper></Swiper>
        <img src="../../static/u160q08Hd9CZ.jpg" alt />

        <van-grid :border="false" :column-num="4">
          <van-grid-item v-for="(l,i) in lg" :key="i">
            <van-image :src="l.img" class="m1" />
            <p>{{l.text}}</p>
          </van-grid-item>
        </van-grid>

        <van-grid :gutter="10" :column-num="2">
          <van-grid-item v-for="(l,i) in list" :key="i" class="m3" @click="gotodetail(l.productId)">
            <van-image :src="l.thumbnail" class="m2" />

            <p class="n1">{{l.name}}</p>
            <p :style="{width:'100%'}">
              <span
                :style="{color:'red',display:'inline-block',textAlign:'left'}"
              >{{l.symbol}}{{l.lowestPrice}}</span>
              <span>{{l.buyerCount*1}}人去过</span>
            </p>
          </van-grid-item>
        </van-grid>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import Swiper from "~/components/swiper.vue";
import {mapActions,mapState} from "vuex"
export default {
  data() {
    return {
      value: "",
      isLoading: false,
      lg: [
        {
          img: require("../../static/3GPw478qe1j7.png"),
          text: "景点门票"
        },
        {
          img: require("../../static/aY7692djiv10.png"),
          text: "当地玩乐"
        },
        {
          img: require("../../static/U1Ct327h16es.png"),
          text: "一日游"
        },
        {
          img: require("../../static/70252hKu1WEQ.png"),
          text: "多日游"
        },
        {
          img: require("../../static/G3as805Wc3o6.png"),
          text: "签证"
        },
        {
          img: require("../../static/a1M9w557mBV6.png"),
          text: "租车接送机"
        },
        {
          img: require("../../static/3P09v9cJG80B.png"),
          text: "定制旅游"
        },
        {
          img: require("../../static/96a69ik93vgM.png"),
          text: "领卷中心"
        }
      ],
      
      scroll: "",
      navbg:false
    };
  },
  components: {
    Swiper
  },
  computed: {
    ...mapState(['list'])
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    
    this.getList({url:'/api/api/getlist'})
  },
  methods: {
    ...mapActions(['getList']),
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 400);
    },
    gotosearch() {
      this.$router.push("/search");
    },
    handleScroll(e) {
      // console.log(e.target.scrollTop);
      if(e.target.scrollTop>190){
        this.navbg=true;
      }else{
        this.navbg=false;
      }
    },
    gotodetail(id){
      this.$router.push("/detail?id="+id)
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll,true)
  },
};
</script>
<style scoped>
img {
  width: 100%;
}
.m1 {
  width: 0.9rem;
  height: 0.9rem;
}
.van-search {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 66;
  width: 100%;
}
.content {
  position: absolute;
  top: 0;
  bottom: 0.9rem;
  right: 0;
  left: 0;
  overflow: auto;

  width: 100%;
}
.m2 {
  width: 3rem;
  height: 2rem;
}

.n1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.navbw{
  background-color: rgba(0,0,0,.3)!important;
}
/deep/.van-grid-item__content{
      padding: 16px 6px;
      height: auto;
}
</style>