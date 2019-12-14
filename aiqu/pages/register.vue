<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft">
      <van-icon name="user-o" slot="right" @click="onClickRight" />
    </van-nav-bar>
    <!-- <img src="../static/logo.19ca0be.png" alt class="log" /> -->
    <van-cell-group :model="form">
      <van-field
        v-model="form.username"
        label="用户名"
        placeholder="请输入用户名"
        :error-message="errorMessage.userInput"
        left-icon="friends-o"
      />
      <van-field
        v-model="form.mobile"
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errorMessage.mobileInput"
        left-icon="phone-o"
      />
      <van-field
        v-model="form.password"
        label="密码"
        placeholder="请输入密码"
        type="password"
        left-icon="apps-o"
        :error-message="errorMessage.pwdInput"
        show-password
      />
    </van-cell-group>
    <p class="btn1">
      <van-button type="info" size="large" @click="register">注册</van-button>
    </p>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "register",
  data() {
    return {
      form: {},
     
      errorMessage: {
        userInput: "",
        tellInput: "",
        pwdInput: ""
      }
    };
  },
  methods: {
    register() {
      // console.log(this.form)
      if(this.form.username !=""){
          this.errorMessage.userInput="请认真填写"
      }

     if(this.form.mobile!=""){
          this.errorMessage.mobileInput="请认真填写"
      }
      if(this.form.password!=""){
          this.errorMessage.pwdInput="请认真填写"
      }else{

          this.errorMessage.userInput="";
          this.errorMessage.mobileInput="";
          this.errorMessage.pwdInput="";


      
      }
       this.$http.post("/api/api/register", this.form).then(res => {
         Toast(res.data.msg);
         this.$router.push({name:'login'})
      });
       
    
          
  
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>

<style >
.register {
  background-color: #fff;
}
.log {
  margin: 79px auto 40px;
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.van-button {
  background-color: #1ac5fb;
  border: 0;
}

.van-cell-group {
  padding: 0.5rem;
}

</style>