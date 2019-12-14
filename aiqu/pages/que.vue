<template>
  <div class="ding">
    <van-nav-bar left-arrow @click-left="onClickLeft" class="navs" left-text="确认订单" />
    <van-card
      v-if="detaill.imageVedioList"
      num="1"
      :price="detaill.price"
      :title="detaill.nameZh"
      :thumb="detaill.imageVedioList[0].image"
    />

    <van-address-edit
      v-if="flag"
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
    <van-address-list v-if="!flag" :list="alist" @click="chooseItem(alist)" @add="onAdd" />

    <van-submit-bar :price="detaill.price*100" button-text="提交订单" @submit="onSubmit(detaill)" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import areaList from "../assets/js/area";
import { Toast } from "vant";
import { Dialog } from 'vant'
export default {
  data() {
    return {
      comName: {},
      searchResult: [],
      addrCode: "440105",
      district: "",
      chosenAddressId: "0",
      list: [],
      companyName: "",
      name: "",
      phone: "",
      address: "",
      areaList,
      isDefault: false,
      addressInfo: {},

      postalCode: "",
      flag: false
    };
  },

  components: { areaList },
  methods: {
    ...mapActions(["getDetail", "getAddress", "goAddress"]),
    onAdd() {
      this.flag = true;
    },
    chooseItem(alist) {
      console.log(alist);
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onSubmit(detaill) {
      console.log(detaill);
      let detail = [detail];
      let mobile = sessionStorage.mobile;
      let username = sessionStorage.username;
      var obj = { detaill, mobile, username };

      console.log(obj);
      this.$axios.post("/api/api/dan", obj).then(res => {
       
      });
      Dialog.confirm({
          title: "消息提示",
          message: "添加订单成功,是否去往订单页"
        })
          .then(() => {
            // on confirm
            // this.$router.push("/app/order")
            Toast('后续功能,敬请关注')
          })
          .catch(() => {
            // on cancel
            this.$router.go(-1)
          });
    },
    onSave(e) {
      console.log(e);

      const name = e.name;
      const tel = e.tel;
      const address = e.province + e.city + e.county + e.addressDetail;
      const postalCode = e.postalCode;
      const isDefault = e.isDefault;
      var ad = { name, tel, address, postalCode, isDefault };

      console.log(ad);

      this.$axios.post("/api/api/goaddress", ad).then(res => {
        console.log(res);
        this.flag = false;

       this.getAddress({
      url: "/api/api/getaddress",
      params: { mobile: sessionStorage.mobile }
    });
      });
      // this.goAddress({url:'/api/goaddress',ad})
      //  this.flag = false;
    },
    onDelete() {
      this.flag = false;
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
   
  },
  computed: {
    ...mapState(["detaill", "alist"])
  },
  mounted() {
    let id = this.$route.query.id;
    console.log(id);

    this.getDetail({ url: "/api/api/getdetail", params: { id }, cb() {} });
   

    
       this.getAddress({
      url: "/api/api/getaddress",
      params: { mobile: sessionStorage.mobile }
    });


  
  }
};
</script>
<style scoped>
.ding {
  background: #fff;
}

.van-address-list__add {
  top: 0.8rem;
}
.van-card {
  margin-top: 1.1rem;
}
.van-nav-bar {
  background-color: #1ac5fb;
}
.van-nav-bar__text {
  color: #fff;
}
.van-nav-bar .van-icon {
  color: #fff;
}

.van-button {
    background-color: #ee0a24;
    
}
</style>