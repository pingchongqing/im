<template>
  <div id="listCoins">
    <div class="fixedFill-mx" id="headId"></div>
    <coins-head :title="$route.query.gname+'/'+$route.query.areaname+'/'+$route.query.servername"
                :url="coinsUrl"></coins-head>
    <coins-fast :show="coinsFast" :url="isTest"></coins-fast>
      <coins-person></coins-person>
  </div>
</template>

<script>
  import http from './http'
  import Head from "../publicCoins/Head.vue"
  import CoinsFast from "./CoinsFast.vue"
  import CoinsPerson from "./CoinsPerson.vue"
  export default {
    name: "ListCoins",
    data () {
      return {
        list: [],
        msg: 'Welcome to Your Vue.js App',
        isTest: [],
        isGoldMallEnable: '',
//        coinsFast: this.isGoldMallEnable != 1 ? true : false,
        coinsFast: false,
        coinsUrl: window.location.search,
      }
    },
    components: {
      "coins-head": Head,
      "coins-fast": CoinsFast,
      "coins-person": CoinsPerson,

    },
    beforeRouteEnter (to, from, next) {
      console.log("我从哪里来",from.name)
      var self = this
      if (from.name == 'CoinsSales') {
        next()
      } else {
        next(vm=>{
          vm.$store.commit("kaiguan",{kaiguan:false})
        })

      }
    },
    created () {
      // 保存浏览记录
//      createHistorys("glanceName",vgname+"/"+vareaname+"/"+vservername,vgameId,"游戏币",20);//添加浏览记录
      let vgname = this.$route.query.gname;
      let vareaname = this.$route.query.areaname;
      let vservername = this.$route.query.servername;
      let vgameId = this.$route.query.gid;
      this.$createHistorys("glanceName", vgname + "/" + vareaname + "/" + vservername, vgameId, "游戏币", 20);
      //对接商城状态
      http.getSwitchAll(this.$route.query.gname).then(state => {
        // 新版不打通
        if (state == 2) {

          this.coinsFast = false
        } else if (state == 1) { // 新版打通

          this.coinsFast = true
        } else { // 旧版
          location.href = '/'
        }
      });
    },
    mounted(){
      if (this.isGoldMallEnable == 1) {
      } else {

      }
    }
  }
</script>

<style scoped>

</style>
