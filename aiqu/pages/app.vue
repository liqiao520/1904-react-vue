<template>
    <div >
        
        <nuxt-child></nuxt-child>
        <Foot></Foot>
    </div>
</template>
<script>
import Foot from "~/components/Foot.vue";
// import UpImage from "~/components/uploadImage.vue"

export default {
    components: {
    Foot,
  
  },
}
</script>
<style lang="css">
    @import "../assets/css/nav.scss";
   
</style>