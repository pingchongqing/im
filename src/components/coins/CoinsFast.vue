<template>
  <!---------------------------- 金币信息 ---------------------------->
  <div v-if="show&&coinsFast" class="coin-msg bg-fff pb-30" id="sortbox">
    <div class="box4 border-bottom clearfix">
      <div class="fl f28 lh110 color-000">
        <span class="f32 color-000 mr-20 brl pl-20">店铺发货</span>
        <span v-if="unPrice">1元={{unPrice}}{{moneyName}}</span>
      </div>
      <div class="fr f28 color-888 lh110">{{deliveryMessage}}</div>
    </div>
    <ul class="clearfix px-20 mt-30">
      <li class="fl text-center px-10" v-for="(fastList, key) in fastLists">
        <router-link class="d-block f28 my-10 pt-10"
                     :to="{name:'CoinsSome', query:{'fastListMoney':fastList,'key':key,'unPrice':unPrice,'moneyName':moneyName,'unitPrice':unitPrice,'gname': $route.query.gname,'racename': $route.query.racename,'raceId': $route.query.raceid,'areaname':$route.query.areaname,'servername':$route.query.servername,'goodsType':3,'gid' : $route.query.gid,'areaid' : $route.query.areaid,'serverid' : $route.query.serverid,'url':urlObject}}">
          <b class="d-block f32 pb-5 color-f75e46 ">{{key}}元</b> {{fastList}}{{moneyName}}

        </router-link>
      </li>
      <li class="fl text-center px-10 ">
        <router-link class="d-block f32 my-10 color-f75e46"
                     :to="{name:'CoinsElse', query:{'unPrice':unPrice,'totalCount':totalCount,'limitPrice':limitPrice,'moneyName':moneyName,'unitPrice':unitPrice,'gname': $route.query.gname,'racename': $route.query.racename,'raceId': $route.query.raceid,'areaname':$route.query.areaname,'servername':$route.query.servername,'goodsType':3,'gid' : $route.query.gid,'areaid' : $route.query.areaid,'serverid' : $route.query.serverid,'url':urlObject}}">
          <b class="lh110">其他数额</b>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
//    name:"CoinsFast",
    props: ['show'],
    data () {
      return {
        coinsFast: false,
        fastLists: [],
        unitPrice: '',
        unPrice: '',
        fastList: '',
        totalCount: '',
        deliveryMessage: '',
        moneyName: '',
        limitPrice: '',
        urlObject: window.location.search,
      }
    },
    created: function () {
      const selfs = this;
      let coinsBoay= {
        gameId: this.$route.query.gid,
        gameName: this.$route.query.gname,
        regionName: this.$route.query.areaname,
        serverName: this.$route.query.servername,
        raceName: this.$route.query.racename,
      };
      for(let key in coinsBoay) {
        if(coinsBoay[key] == undefined || coinsBoay[key] == null || coinsBoay[key] == "undefined" || coinsBoay[key]=="" ) {
          coinsBoay[key] = undefined;
        }
      }
      this.$http.get(
        this.$CONSTANTS.APIGoods+'purchaseData/getPriceConfig',
        {
          params: coinsBoay
        },
        {
          headers: {
            contentType: "aplication/json; charset = UTF-8",
            dataType: 'json'
          }
        }
      ).then((res) => {
        res = res.body;
        if (res.status == 3) {

        } else {
          if(this.show==false){

          }else{

          }
          this.coinsFast = true
        }
        if (res.responseStatus.code == '00') {
          let temp = {}
          var i = 0;
          for (var key in res.publicLimitPriceMap) {
            if (i < 8) {
              temp[key] = res.publicLimitPriceMap[key];
              i++;
            } else {
              break;
            }
          }
          res.publicLimitPriceMap = temp;
          selfs.fastLists = res.publicLimitPriceMap;
          this.unitPrice = res.unitPrice;
          this.totalCount = res.totalCount;
          this.deliveryMessage = res.deliveryMessage;
          this.moneyName = res.moneyName;
          this.unPrice = Math.floor(Vue.MATH.numDiv(1,res.unitPrice) * 100) / 100;
          this.limitPrice = res.limitPrice;
        }
      }, () => {
        console.log("请求错误l！");


      });


    }


  }
</script>

<style>
  .coin-msg li a{
    border-radius: .15rem!important;
  }
</style>
