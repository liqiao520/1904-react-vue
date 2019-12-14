<template>
  <div class="mine">
    <van-nav-bar
      title="个人中心"
      left-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="loginout"
    >
      <van-icon name="delete" slot="right" class="ico" />
    </van-nav-bar>

    <div v-if="flag">
      <p class="min">
        <UpImage></UpImage>
        <span>欢迎您:{{username}}</span>
      </p>
      <p class="you">
        <span>优惠券(0)</span>
        <span>奖金￥0.00</span>
      </p>
    </div>

    <p v-else>
      <van-button type="info" size="normal" @click="gotologin">登录/注册</van-button>
    </p>

    <div>
      <van-cell is-link v-for="(t,i) in lid" :key="i" :class="t.icon">{{t.text}}</van-cell>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import UpImage from "../../components/uploadImage.vue";
export default {
  name: "mine",

  data() {
    return {
      username: "",
      flag: false,

      lid: [
        {
          text: "约伴交流",
          icon: "iconfont icon-xinxi"
        },
        {
          text: "购物车",
          icon: "iconfont icon-gouwuche"
        },
        {
          text: "我的收藏",
          icon: "iconfont icon-wodeshoucang"
        },
        {
          text: "我的足迹",
          icon: "iconfont icon-zuji"
        },
        {
          text: "电子票",
          icon: "iconfont icon-dianzipiao"
        },
        {
          text: "点评",
          icon: "iconfont icon-dianping"
        },
        {
          text: "货币切换",
          icon: "iconfont icon-huobi"
        }
      ]
    };
  },
  components: { UpImage },

  created() {
    if (sessionStorage) {
      var mobile = sessionStorage.mobile;
      var username = sessionStorage.username;
      this.username = username;
      //   console.log(username);
      if (username) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  },
  methods: {
    gotologin() {
      this.$router.push({ name: "login" });
    },

    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    loginout() {
      if (!!this.username) {
        window.sessionStorage.clear();
        this.flag = false;
        Toast("退出登录成功");
        window.location.reload();
      } else {
        Toast("您还没有登录");
      }
    }
  }
};
</script>

<style scoped>
.bg {
  text-align: center;
  margin-top: -44px;
  height: 200px;
  padding-left: 22px;
  padding-top: 64px;
  /* background: url('../static/bg.6837f67.png'); */
  background-size: cover;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
}

.mine {
  background-color: #fff;
}

.van-nav-bar .van-icon {
  color: #fff;
  font-size: 0.5rem;
}
.mine p {
  text-align: center;
  padding: 1rem;
}
.van-button--info {
  width: 4rem;
}
.iconfont:before {
  font-size: 0.5rem;
  padding-right: 0.2rem;
  color: #1ac5fb;
}

.van-button {
    background-color: #1ac5fb;
    border: 0;
}

.you {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem 0 !important;
  color: #1ac5fb;
}
.min {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 0.2rem 0 !important;
   color: #1ac5fb;
  font-size: 0.3rem;
  box-sizing: border-box;
}
.min span{
  margin-left: .2rem;
}
</style>