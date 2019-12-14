<template>
  <footer>
    <div v-for="(foot,i) in foots" :key="i" >
      <nuxt-link :to="{path:foot.path}" >
        <i :class="foot.icon"></i>
        <span>{{foot.text}}</span>
      
      </nuxt-link>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      name: "foot",
      foots: [
        {
          path: "/app/home",
          name: "home",
          text: "首页",
          icon: "iconfont icon-shouye7-copy"
        },
        {
          path: "/app/bourn",
          name: "movie",
          text: "目的地",
          icon: "iconfont icon-mudedi"
        },
        {
          path: "/app/find",
          name: "xun",
          text: "发现",
          icon: "iconfont icon-faxian"
        },
        // {
        //   path: "/app/order",
        //   name: "xun",
        //   text: "订单",
        //   icon: "iconfont icon-icon--copy"
        // },
        {
          path: "/app/mine",
          name: "mine",
          text: "我的",
          icon: "iconfont icon-wode"
        }
      ],
    
    };
  },
  methods: {
    gotowhere(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
footer {
  position: fixed;
  width: 100%;
  height: 0.9rem;
  left: 0;
  bottom: 0;
  background: #fff;
  display: flex !important;
  z-index: 100;

  div {
    flex: 1;
    height: 0.9rem;
    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0.06rem 0;
      text-align: center;
      font-family: "微软雅黑";
      color: #999;
      position: relative;
      i {
        width: 100%;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.42rem !important;
      }
      span {
        width: 100%;
        height: 0.35rem;
        line-height: 0.35rem;
        font-size: 0.26rem;
      }
      .hot {
        position: absolute;
        top: 0;
        left: 60%;
        display: inline;
        width: 0.25rem;
        border-radius: 50%;
      }
    }
    
  }
}

.iconfont:before {
  font-size: 0.5rem;
  // padding-right: 0.2rem;
}

// .iconfont1:before {
//   font-size: 0.5rem;
//   padding-right: 0.2rem;
//   color: #1ac5fb;
// }
.nuxt-link-active,
    .nuxt-link-exact-active {
      color: #1ac5fb;
    }




</style>