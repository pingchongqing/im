<template>
  <!---------------------------- 库存信息 ---------------------------->
  <div>
    <coins-head :title="$route.query.gname+'/'+$route.query.areaname+'/'+$route.query.servername"
                :url="coinsUrl"></coins-head>
    <div class="fixedFill-mx" id="headId" style="height: 1.92rem"></div>
    <div class="coin-kc bg-fff" ref="coinsroll">


      <trade-sort v-on:dj="dj" v-on:sort="sort" v-on:storeType="storeType" v-on:dj2="dj2" v-on:sort2="sort2" :isHide="isHide"></trade-sort>


      <mt-loadmore
        :bottom-all-loaded="allLoaded" ref="loadmore" id="boxs"
        v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"
      >
        <div class="mstfiv" id="hidessbox" style="position: absolute;display: none" @click="mstfiv_click"></div>
        <ul class="clearfix">
          <li class="border-bottom p-30" v-for="personList in personLists" :key="personList.id" @click="mrouter(personList)">

            <div class="clearfix">
              <span class="fl f32 color-010101">{{personList.unit_num}}{{personList.biz_category_name}}</span>
              <b class="fr f32 color-f75e46">{{personList.price}}元</b>
            </div>
            <div class="clearfix mt-25">
              <div class="fl f28 color-010101">
                <span class="color-888 mr-20">单价</span><span>1元 = {{personList.unit_price}}{{personList.biz_category_name}}</span></div>
              <div class="fr">
                <i class="mr-20">
                  <!--寄售交易-->
                  <img v-if="personList.trading_service_type==2?true:false" src="~images/Icon/icon-new-ji.png"/>
                  <!--担保交易-->
                  <img v-if="personList.trading_service_type==1?true:false" src="~images/Icon/icon-new-bao.png"/>
                  <!--超时赔付-->
                  <img v-if="personList.unit_promise_time_locked>0?true:false" src="~images/Icon/chaoshi.png"/>
                  <!--本商品可投保-->
                  <img v-if="personList.biz_offer_flag.indexOf('保')>0?true:false" src="~images/Icon/ketbao.png"/>
                  <!--无货赔付-->
                  <img v-if="personList.deposit>0?true:false" src="~images/Icon/icon-new-pei.png"/>
                  <!--本商品已投保-->
                  <img v-if="personList.biz_offer_flag=='~'?true:false" src="~images/Icon/icon-new-xian.png"/>
                  <!--买家安心买-->
                  <img v-if="personList.biz_offer_flag.indexOf('心买')>-1?true:false" src="~images/Icon/icon-new-axm.png"/>
                  <!--卖家安心买-->
                  <img v-if="personList.biz_offer_flag.indexOf('安买')>-1?true:false" src="~images/Icon/maijia.png"/>

                </i><span class="f28 va15 color-888">库存{{personList.delivery_num}}件</span>

              </div>
            </div>
            <!--</router-link>-->
          </li>
          <p id="coins_id" v-if="showCoins">
            <img src="~images/coins/loading-sm.gif">
            <span>请等待。。。</span>
          </p>
        </ul>
      </mt-loadmore>
    </div>
    <div v-show="coinsImage" id="coinsImage">
      <div data-v-30820d10="" class="list-empty bg-fff" style="margin-bottom: 1.3rem">
        <p data-v-30820d10="">
          <img data-v-30820d10="" src="/dist/gamelogo.png?36b0c4af9528a8d80a120fd727698ade"></p>
        <span data-v-30820d10="" class="mb-10">竟然一件商品都没有</span>
        <i v-if="cort" class="f26  color-999">或许筛选条件太多了，去掉一些试试看</i>
        <span></span>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import Head from "../../publicCoins/Head.vue"
  import coinsBao from '../../../assets/images/Icon/icon-bao.png'
  import coinsChe from '../../../assets/images/Icon/icon-che.png'
  import coinsPei from '../../../assets/images/Icon/icon-pei.png'
  import TradeSort from "./TradeSort.vue"
  Vue.filter('mathFilter',function(value){
    return value.split('_')[0]
  });
  export default{
    name: "TradeStone",
    data () {
      return {
        delivery_num:'',//库存
        cort:false,//筛选为空时选择
        allLoaded: false,
        busy: false,
        personLists: [],
        coinsImage:false,
        showCoins:false,
        scroll:0,
        pageSize:20,
        start:0,
        shaixuan:false,
        gaga:false,
        isHide:false,
        sortMap: {unit_price:"-"},
        price:["0-999999"],//筛选
        sortString:undefined,
        deposit:["0"],
        is_jishou:undefined,
        isZhongkaiguan:undefined,
        isTypes:undefined,
        coinsUrl: window.location.search,
        race:undefined,
        isRaceAttr:[]
      }
    },
    components: {
      "trade-sort": TradeSort,
      "coins-head": Head,
    },
    activated () {
      this.loadMore()
      this.coinsImage = false
      if(this.$store.state.coins.scroll){
        setTimeout(()=>{
          document.body.scrollTop = this.$store.state.coins.scroll
        },10)
      }
    },
//    beforeRouteEnter (to, from, next) {
//      console.log("我从哪里来",from.name)
//      var self = this
//      if (from.name == 'TradeStoneDetail') {
//        next(vm=>{
//          if(vm.$store.state){
//            setTimeout(()=>{document.body.scrollTop = vm.$store.state.coins.scroll},10)
//          }
//        })
//      } else {
//        next(vm=>{
//        })
//
//      }
//    },
    mounted(){
      window.addEventListener('scroll', this.menu)
      document.body.scrollTop = 300;
      document.documentElement.scrollTop=300;
    },
    created(){
      if(this.$route.query.raceid){
        this.race = [this.$route.query.raceid]
      }

      this.$http.get(this.$CONSTANTS.APICategory + "category/searchfactionbygameid",{
        params: {parentId: this.$route.query.gameId}
      }).then((res)=>{
        if(res.body.responseStatus.code=="00"){

          this.isRaceAttr = res.body.categoryList
        }

      })


    },
    methods: {
      mstfiv_click(){
        document.getElementById("hidessbox").style.display = "none";
        this.isHide = true
      },
      menu(){
        this.scroll = document.body.scrollTop;
      },
      menus(){
        document.body.scrollTop = 300;
      },
      dj2(str){
        if(str=='最新发布'){
          this.sortMap = {
            insert_time:'-'
          };
          this.personLists=[];
          this.start=0;
        }else if(str=='单价最低'){
          this.sortMap = {
            unit_price:'-'
          };
          this.personLists=[];
          this.start=0
        }else if(str=='总价最低'){
          this.sortMap = {
            price:'+'
          };
          this.personLists=[];
          this.start=0
        }else if(str=='总价最高'){
          this.sortMap = {
            price:'-'
          };
          this.personLists=[];
          this.start=0
        }

      },
      sort2(str){

        this.shaixuan= true;
        const attr = [];
        const object = {};
        const object_totle = {};
        const self = this
        if(str.baozhang!=undefined){
          str.baozhang.forEach(function (str) {
            if(str == "无货赔付"){
              self.deposit = ["1-999999"]
            }else if(str == "本商品可投保"){
              str = "保"
              attr.push(str)
            }else if(str == "本商品已投保"){
              str = "~"
              attr.push(str)
            }else if(str == "安心买"){
              str = "买"
              attr.push(str)
            }
          });
          if(attr.length!=0){
            this.sortString = attr
          }
        }else{
          this.sortString = undefined
        }
        var objects = {};
        if(str.jiaoyi!=undefined){
          if(str.jiaoyi[0]=="担保交易"){
            this.is_jishou=["1"]
          }else if(str.jiaoyi[0]=="寄售交易"){
            this.is_jishou=["2"]
          }

        }else{
          this.is_jishou= undefined
        }

        if(str.baozhang1!=undefined){
          if(str.baozhang1[0] == "无货赔付"){
            this.deposit = ["1-999999"]
          }
        }else{
          this.deposit = ["0"]
        }



//        关键字删选

        if(str.coins_min == undefined){
          str.coins_min = 0
        }
        if(str.coins_max == undefined){
          str.coins_max = 999999
        }
        this.price = [str.coins_min+'-'+str.coins_max];
//        if(){
//
//        }
        this.personLists=[];
        this.start=0

      },
      dj(str){
        if(str=='最新发布'){
          this.sortMap = {
            insert_time:'-'
          };
          this.personLists=[];
          this.start=0;
          this.loadMore()
        }else if(str=='单价最低'){
          this.sortMap = {
            unit_price:'-'
          };
          this.personLists=[];
          this.start=0,
            this.loadMore()
        }else if(str=='总价最低'){
          this.sortMap = {
            price:'+'
          };
          this.personLists=[];
          this.start=0,
            this.loadMore()
        }else if(str=='总价最高'){
          this.sortMap = {
            price:'-'
          };
          this.personLists=[];
          this.start=0,
            this.loadMore()
        }

      },
      storeType(str){
        console.log(str)
        this.loadMore()
      },

//      筛选
      sort(str){

        this.shaixuan= true;
        const attr = [];
        const object = {};
        const object_totle = {};
        const self = this
        if(str.baozhang!=undefined){
          str.baozhang.forEach(function (str) {
            if(str == "无货赔付"){
              self.deposit = ["1-999999"]
            }else if(str == "本商品可投保"){
              str = "保"
              attr.push(str)
            }else if(str == "本商品已投保"){
              str = "~"
              attr.push(str)
            }else if(str == "安心买"){
              str = "买"
              attr.push(str)
            }
          });
          if(attr.length!=0){
            this.sortString = attr
          }

        }else{
          this.sortString = undefined
        }
        var objects = {};
        if(str.jiaoyi!=undefined){
          if(str.jiaoyi[0]=="担保交易"){
            this.is_jishou=["1"]
          }else if(str.jiaoyi[0]=="寄售交易"){
            this.is_jishou=["2"]
          }

        }else{
          this.is_jishou= undefined
        }

        if(str.baozhang1!=undefined){
          if(str.baozhang1[0] == "无货赔付"){
            this.deposit = ["1-999999"]
          }
        }else{
          this.deposit = ["0"]
        }

//        阵营

        if(str.zhenying == '联盟'||str.zhenying == '部落'){
          this.isRaceAttr.forEach((a,b)=>{
            if(a.name==str.zhenying){
              this.race = [a.catagoryId]
            }
          })
        }else{
          if(this.$route.query.raceid){
            this.race = [this.$route.query.raceid]
          }
        }

//        关键字删选

        if(str.coins_min == undefined){
          str.coins_min = 0
        }
        if(str.coins_max == undefined){
          str.coins_max = 999999
        }
        this.price = [str.coins_min+'-'+str.coins_max];

        this.personLists=[];
        this.start=0,
          this.loadMore()
      },
      loadBottom(id) {
      },
      mrouter(personList){
          this.$store.commit("SET_TRADE",this.scroll)
          this.$router.push(
            {name:'TradeStoneDetail',query:{
              'gname': this.$route.query.gname,
              'racename':this.$route.query.racename,
              'raceId': this.$route.query.raceid,
              'areaname':this.$route.query.areaname,
              'servername':this.$route.query.servername,
              'goodsType':3,
              'gid' : this.$route.query.gid,
              'areaid' : this.$route.query.areaid,
              'serverid' : this.$route.query.serverid,
              'title':personList.title,
              'biz_category_name':personList.biz_category_name,
              'blancenum':personList.delivery_num,
              'unit_num':personList.unit_num,
              'id':personList.id,
              'isJis':personList.trading_service_type,
              'Price':personList.unit_price,
              'price':personList.price,
              'locked':personList.unit_promise_time_locked>0?true:false,
              'flag':personList.biz_offer_flag.indexOf('保')>0?true:false,
              'anxinmai':personList.biz_offer_flag.indexOf('心买')>-1?true:false,
              'maianxinmai':personList.biz_offer_flag.indexOf('安买')>-1?true:false,
              'c_deposit':personList.deposit>0?true:false,
              'yitoubao':personList.biz_offer_flag=='~',
              'jishou':personList.trading_service_type==2?true:false,
            }}
          )

      },
      gagaMethod(){
        var isLog,map,keyWord,between,sortMap,betweenMap={},accurateMap={},keyWordList=[{}],shoppingType;
        //神策开始
          isLog = this.$CONSTANTS.isLogin;
          sortMap = this.sortMap;
          if(this.$route.query.goodsType==1){
            shoppingType = "装备";
          }else if(this.$route.query.goodsType==2){
            shoppingType = "账号";
          }else if(this.$route.query.goodsType==3){
            shoppingType = "游戏币";
          }else{
            shoppingType = "其他";
          };
          betweenMap.price = this.price;
          betweenMap.deposit = this.deposit;
          accurateMap.game_id = [this.$route.query.gid];
          accurateMap.region_id = [this.$route.query.areaid];
          accurateMap.server_id = [this.$route.query.serverid];
          accurateMap.trading_service_type = this.is_jishou;
          accurateMap.publish_type = ["0","1"];
          accurateMap.goods_type = [this.$route.query.goodsType];
          accurateMap.race_id = this.race;
          keyWordList[0].biz_offer_flag = this.sortString;
          sa.track("goodsList",{
            platfromType:"H5",
            belongGame:this.$route.query.gName+"/"+this.$route.query.aName+"/"+this.$route.query.servername,
            gameType:this.$route.query.gName+"/"+this.$route.query.aName+"/"+this.$route.query.servername,
            accurateMap:JSON.stringify(accurateMap),
            keyWordList:JSON.stringify(keyWordList),
            betweenMap:JSON.stringify(betweenMap),
            goodsType:shoppingType,
            isLogin:isLog
          });
           //神策结束
          this.$http.post(
            this.$CONSTANTS.APISearch+'goodsSearch/goodsSearchList',
            {
              sortMap:sortMap,
              keyWordList:keyWordList,
              betweenMap:betweenMap,
              accurateMap:accurateMap,
              fetchField:[],
              page:this.start,
              pageCount:this.pageSize,
            },
            {
              headers: {
                contentType: "aplication/json; charset = UTF-8",
                dataType: 'json'
              }
            }
          ).then((res) => {
            this.showCoins = false;//后期去掉
            var self = this;
            if(res.body.responseStatus.code=="00"){
              const object =  JSON.parse(res.body.result).items;
              if(this.start == 1 && object.length == 0){
                this.coinsImage = true;
                if(this.shaixuan==true){
                  this.cort = true
                }
              }else{
                this.coinsImage = false
              }
              console.log(object)
              object.forEach(
                (item,index) => {
                  self.personLists.push(item);
                  self.showCoins = false;
                })
              if(object.length==20){
                self.busy = false
              }else{
                self.showCoins = false;
              }

            }
            else{
              this.coinsImage = true
            }
          }, () => {
            console.log("请求错误！");
          })


      },
      loadMore: function () {
        var self = this;
        self.busy = true;
        this.showCoins = true;
        this.start = this.start + 1;
        this.gagaMethod()
      }



    },


  }
</script>
<style scoped>
  .coin-kc {
    margin-top: 0rem!important;
  }
</style>

