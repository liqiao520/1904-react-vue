<template>
    <div>
         <div :all="all" class="content" v-if="flag">
            <p>内容正在完善,请稍后关注</p>
        </div>
        <div v-else>
            <van-nav-bar title="我的订单" />
        <img :style="{width:'100%',height:'100%'}" src="../../static/girl.png" alt="">
        <p class="lo">亲~登录后即可查看订单信息哦</p>
        <p class="btn1">
             <van-button type="info" size="large" @click="login">立即登录</van-button>
        </p>
       
        </div>
        
        
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex"
export default {
    data(){
        return{
            flag:false
        }
    },
  methods: {
      ...mapActions(["getDan"]),
      login(){
          this.$router.push({name:'login'})
      }
  },
  computed: {
      ...mapState(['all'])
  },
  mounted(){
      let mobile=sessionStorage.mobile
    
        
           this.getDan({url:'/api/api/getorder',params:{mobile},cb(){
               
           }})
    
    

    // this.$axios.get('/api/getorder',{params:{mobile}}).then(res=>{
    //     console.log(res)
    // })
  }
}
</script>
<style scoped>
    .van-button--info {
    color: #fff;
    background-color: #1ac5fb;
    border: 1px solid #1ac5fb;
}
.btn1{
        text-align: center;
    padding: 1rem;

}
.lo{
    text-align: center;
}
.content{
    
    height: 100%;
    width: 100%;
}
</style>