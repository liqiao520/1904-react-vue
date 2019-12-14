<template>
  <div>
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(m,i) in imgs" :key="i" >
          <img :src="m" alt="">
      </van-swipe-item>
      
    </van-swipe>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
    data(){
      return{
          imgs:[
              require('../static/1G3s4Am8k12d.jpg'),
              require('../static/20181101105052-983.jpg'),
              require('../static/1G3s4Am8k12d.jpg'),
              require('../static/20190830174443-212.jpg'),
          ]
      }
    },
  methods: {
    onChange(index) {
      // Toast("当前 图片：" + index);
    }
  }
};
</script>
<style scoped>
    img{
        width: 100%;
      
    }
</style>