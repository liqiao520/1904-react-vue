<template>
  <div>
    <van-nav-bar title="澳大利亚" />
    <div class="content1">
      <van-tabs v-model="active">
        <van-tab v-for="(f,i) in find" :title="f.title" :key="i">
          <div class="res" v-for="(r,index) in f.result" :key="index">
             <div @click="xiang(r.url)" class="one">
                 <span > {{r.title}}</span>
            
                     <img :src="r.images" alt="" :style="{width:'2rem',height:'2rem'}"> 
               
             </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
export default {
  data() {
    return {
      active: 0,
      // find: [],
      
    };
  },
  
  mounted() {
    
    // this.$axios.get("/api/getfind").then(res => {
    //   console.log(res);
    //   this.find = res.data.result;
    //   console.log(this.find);
    // });
    this.getFind({url:'/api/api/getfind'})
  },
  computed: {
    ...mapState(['find'])
  },
  methods: {
    ...mapActions(['getFind']),
      xiang(url){
          window.location.href=url
         
      },

      
  },
 
};
</script>
<style scoped>
.content1 {
  width: 100%;
  margin-top:.92rem;
}
.res {
  width: 100%;
  overflow: hidden;
}
/deep/.van-tab--active {
  color: #1ac5fb;
  font-weight: 500;
}
/deep/.van-tabs__line{
    background-color: #1ac5fb;
}
.one{
    display: flex;
    padding:2%;
}

.one span:nth-child(1){
    width: 70%;
}
.van-nav-bar{
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    
}
/deep/.van-tab{
  line-height: 44px!important;
}
/deep/.van-tabs--line .van-tabs__wrap{
  position: fixed;
  top:0.9rem;
  left:0;
  width: 100%;
  z-index: 50;
}
.van-tab__pane{
margin-top:2rem;
margin-bottom:1rem;
}
</style>