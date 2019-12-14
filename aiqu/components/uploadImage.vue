<template>
  <div class="upimg">
    
      <img :src="pic" class="pic" @click="posttouxing" />
   
    <input type="file" @change="todoupload" ref="upload" class="fileclass" />
  </div>
</template>
<script>
import pic from "@/assets/images/photo.png";
// import {mapState,mapMutations,mapActions} from "vuex";

export default {
   
  data() {
    return {
      pic: ""
    };
  },
  props: ["flag"],
  mounted(){
      // 先去数据库查询
    this.$axios.post("/api/api/getavatar",{
        mobile:sessionStorage.mobile
    }).then(res=>{
        console.log(res);
        if(!!res.data.flag){
            this.pic=res.data.result.pic.replace('static','http://39.105.151.203:1909')
        }else{
            this.pic=pic
        }
    })
    // this.getAvatarAsync({url:'/api/getavatar',params:{mobile:sessionStorage.mobile}})


  },
  methods: {
    // ...mapActions(['getAvatarAsync']),
    posttouxing() {
        this.$refs.upload.click();
    },
    todoupload(){
        console.log('开始上传...')
        var file=this.$refs.upload.files[0];
        console.log(file);
        var data=new FormData();  //转换为表单的形式提交到后台
        data.append('avatar',file)
        this.$axios({
            url:'/api/api/uploadpic',
            method:'POST',
            params:{
                flag:this.flag
            },
            data
        }).then(res=>{
            console.log(res)
            this.pic=res.data.pic.replace('static','http://39.105.151.203:1909')

            localStorage.avatar=this.pic;
        })
    }
  },
  
};
</script>
<style scoped >
    .fileclass{
        display: none;
    }
    .pic{
        width: 1.5rem;
        height: 1.5rem;
    }
    .upimg{
      display: inline-block;
     
    }
</style>