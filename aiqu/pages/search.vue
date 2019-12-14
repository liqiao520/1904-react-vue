<template>
  <div class="searchall">
    <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-search
      left-arrow
      placeholder="目的地/景点/产品ID"
      v-model="value"
      shape="round"
      :style="{background:'#1ac5fb'}"
    />
    <div class="xi" >
      <p
      
        v-for="(a,i) in area"
        :key="i"
        :area="area"
        @click="gobour(a.areaId)"
        
      >{{a.text}}</p>
     
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      area: [],
      
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    gobour(id) {
      this.$router.push("/app/bourn/?id=" + id);
    }
  },
  watch: {
    value(newval) {
      localStorage.historyItems = newval;
      this.$axios
        .get("/api/api/soumu", {
          params: {
            value: newval
          }
        })
        .then(res => {
          console.log(res);
          this.area = res.data.result;
      
        });
    }
  }
};
</script>
<style scoped>
.searchall {
  background: #fff;
}
.xi {
  margin-top: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
}
.xi span {
  border: 1px solid #555;
}

.van-search {
  position: fixed;
  top: 0.8rem;
  left: 0;
  z-index: 66;
  width: 100%;
}
</style>