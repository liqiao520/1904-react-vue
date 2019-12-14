<template>
  <div class="login">
    <van-nav-bar
      title="手机登录"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>
    <!-- <img src="../static/logo.19ca0be.png" alt class="log" /> -->
    <van-cell-group :model="form">
      <van-field
        v-model="form.mobile"
        required
      
        label="用户名"
        left-icon="contact"
        placeholder="请输入手机号"
        :error-message="errorMessage.mobileInput"
        @click-right-icon="$toast('请输入正确的用户名')"
        
        right-icon="question-o"
      />

      <van-field v-model="form.password" type="password" label="密码" left-icon="closed-eye" placeholder="请输入密码" required right-icon="question-o"
      :error-message="errorMessage.pwdInput"
      @click-right-icon="$toast('请输入正确的密码')"/>
    </van-cell-group>
   <p class="btn1">
        <van-button type="info" size="large" @click="login">登录</van-button>
   </p>
   
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
    data(){
        return{
            form:{
            
            },
           
            showname:false,
            errorMessage: {
        
        tellInput: "",
        pwdInput: ""
      }
        }
    },
  methods: {
    login() {
if(this.form.mobile !=""){
          this.errorMessage.mobileInput="请认真填写"
      }

     if(this.form.password!=""){
          this.errorMessage.pwdInput="请认真填写"
      }else{
          
          this.errorMessage.mobileInput="";
          this.errorMessage.pwdInput="";
      }


      this.$axios.post("/api/api/login",this.form).then(res=>{
          // 数据缓存
              sessionStorage.token=res.data.token;

              sessionStorage.mobile=res.data.result.mobile;
              sessionStorage.username=res.data.result.username;
              Toast(res.data.msg)
              this.$router.push('/app/home')
              
      })
    },
   
    onClickLeft() {
      this.$router.back(-1)
    },
    onClickRight() {
      this.$router.push({ name: "register" });
    }
  }
};
</script>
<style >
.login {
  background-color: #fff;
}
.log {
  margin: 79px auto 40px;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.btn1{
        text-align: center;
    padding: 1rem;

}
.van-button {
    background-color: #1ac5fb;
    border: 0;
}
</style>