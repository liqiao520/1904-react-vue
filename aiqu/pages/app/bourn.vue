<template>
  <div>
    <van-search
      placeholder="目的地/景点/产品ID"
      shape="round"
      :style="{background:'#1ac5fb'}"
      @click="gotosearch"
    />
    <div class="content2" :country="country">
      <span :style="{padding:'.3rem'}">
        {{country.nameZh}}
       
        <van-button plain type="primary" @click="gotolist" size="mini">切换</van-button>
      </span>
      
      <van-tabs class="nav1">
        <van-tab v-for="(c,i) in country.navs" :key="i">
          <div slot="title" class="nav2">
           
             <img :src="c.img" alt />
            <span>{{c.title}}</span>
          </div>
        </van-tab>
      </van-tabs>
      <h3>当地攻略</h3>
      <van-tabs class="nav3">
        <van-tab v-for="(c,i) in country.guids" :key="i">
          <div slot="title" class="nav4">
           
             <img :src="c.img" />
            <span>{{c.title}}</span>
          </div>
        </van-tab>
      </van-tabs>

    <h3>必玩推荐</h3>
      <van-grid :gutter="10" :column-num="2">
          <van-grid-item v-for="(l,i) in country.products" :key="i" class="m3" @click="gotodetail(l.productId)">
            <van-image :src="l.image" class="m2" />
            <p class="n1">{{l.productName}}</p>
           
            <p :style="{width:'100%'}">
              <span :style="{color:'red',display:'inline-block',textAlign:'left'}">{{l.priceSymbol}}{{l.price}}</span>
              <span>{{l.purchaseNum*1}}人去过</span>
              </p>
          </van-grid-item>
        </van-grid>

    </div>
  </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
export default {
  data() {
    return {
      value: "",
      
      nameZh: ""
    };
  },
  mounted() {
    let id = this.$route.query.id;
    console.log(id);
    if (!id) {
        id=74
    } 
     
      this.getMu({url:'/api/api/getmu',params:{id}})
 
  },
  computed: {
    ...mapState(['country'])
  },
  methods: {
    ...mapActions(['getMu']),
    gotolist() {
      this.$router.push("/list");
    },
    gotosearch() {
      this.$router.push("/search");
    },
     gotodetail(id){
      this.$router.push("/detail?id="+id)
    }
  }
};
</script>
<style >
.nav1 {
  width: 100%;
  text-align: center;
  /* vertical-align: middle; */
}
.nav2{
    width: 100%;
    text-align: center;
}
.nav2 img {
  width: 1rem;
  height: 1rem;
  margin-top:.5rem;
}
img{
    display:inline;
}

.van-tabs--line .van-tabs__wrap {
  height: auto !important;
}
.van-tabs__wrap {
  overflow: visible !important;
}
.van-tabs__line {
  background-color:rgba(0,0,0,0);
}
.van-tab{
    line-height: normal;
}

.van-tab--active{
    color:#7d7e80;
}
.nav4{
    box-shadow: .1rem .1rem .1rem #555;
    
}
.nav4 img{
    width: 3rem;
    height: 2rem;
}
.content2 h3{
    line-height: 1rem;
    text-align: center;
    font-weight: bolder;
    color:#555;
}

.n1{
 overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
  
}

.van-search {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 66;
  width: 100%;
}
.content2 {
  position: absolute;
  top: 1.2rem;
  bottom: 0.9rem;
  right: 0;
  left: 0;
  overflow: auto;
 
  width: 100%;
}



</style>