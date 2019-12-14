<template>
    <div>
            <van-search
      placeholder="目的地/景点/产品ID"
      
      shape="round"
      :style="{background:'#1ac5fb'}"
      @click="search"
    />
    </div>
</template>
<script>
export default {
    data(){
        return{
            value:''
        }
    }
}
</script>
<style>
    
</style>