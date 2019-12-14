<template>
  <div class="list">
    <van-nav-bar
      title="切换目的地"
      right-text="取消"
      left-arrow
      @click-right="onClickRight"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-search placeholder="搜索国家/城市" v-model="value" :style="{background:'#1ac5fb'}" 
     @click="gotosearch"
    />

    <van-tree-select
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      v-model="activeId"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",

      items: [],
      activeId: 1,
      activeIndex: 0
    };
  },
  watch: {
    if(activeId) {
      console.log(activeId)
      this.$router.push("/app/bour?id=" + activeId);
    }
  },
  methods: {
    onClickRight() {
      this.$router.go(-1);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    gotolist(activeId) {
      console.log(activeId);
    },
    gotosearch() {
      this.$router.push("/search");
    }
  },
  created() {
    this.$axios.get("/api/api/getli").then(res => {
      console.log(res);
      this.items = res.data.result;
    });
  }
};
</script>
<style scoped>
html,
body {
  height: 100%;
}
.van-nav-bar {
  background: #1ac5fb;
}
.van-nav-bar__title,
.van-nav-bar__text {
  color: #fff;
}
.van-sidebar-item--select {
  border-color: #1ac5fb;
}
.list1 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
}
.left {
  background: #1ac5fb;
  width: 20%;

  display: inline-block;
  background-color: #fff;
}
.left p {
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}
.right {
  display: inline-block;
  background: red;
  width: 20%;

  flex: 1;
}
.btnAtive {
  background: red;
  color: #fff;
}

.van-tree-select__item--active {
  color: #1ac5fb;
}
</style>