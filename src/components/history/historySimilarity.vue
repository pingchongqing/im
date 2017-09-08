<template>
  <div id="wrapper">
    <div class="top-header border-bottom fixed-top">
      <div class="top-back"><a @click="goBack"></a></div>
      <h2 class="f36 color-000">看相似</h2>
      <div class="top-right">
      </div>
    </div>
    <div v-if="isSimilarity" style="height: 0.96rem"></div>
    <div class="mobilegames-conn mt-97 border-bottom border-top pr bg-fff" @click="routeMyClick(goodsEO)">
      <div class="mbilegames-list ml-30 ">
        <div class="listware pr-30 py-30">
          <div class="mbgmes-img pr fl">
            <img v-if="(!goodsEO.goodsImg)||goodsEO.goodsImg=='null'" src="~images/default_img_info.jpg" style="width:100%;" class="previewer-demo-img" />
            <img style="min-width: 1.5rem!important;" v-else :src="goodsEO.goodsImg">
            <div class="mbl-type color-fff f22 text-center">游戏帐号</div>
          </div>
          <a>
            <div class="mbgmes-con">
              <div class="mbl-title f30 color-000" style="
                      overflow: hidden;
                      line-height: 0.4rem;
                      max-height: 1.2rem;
                      height: auto !important"
              >{{goodsEO.title}}</div>
              <div class="mbl-cper mt-10">
                <div class="mbl-money color-m1 f32 fl font-arial">￥<span class="font-bold">{{goodsEO.price}}</span></div>
                <div class="mbl-icon fr">
                  <i class="an" v-show="goodsEO.axm && goodsEO.axm == true"></i>
                  <i class="an" v-show="goodsEO.is_axm && goodsEO.is_axm == true"></i>
                  <!--<i class="shou"></i>-->
                  <i class="tu" v-show="goodsEO.robotCapture && goodsEO.robotCapture==true"></i>
                  <i class="tu" v-show="goodsEO.is_robot_capture && goodsEO.is_robot_capture==true"></i>
                </div>
              </div>
              <div class="mbl-parea color-666 f24 clearfix">
                <p class="mbl-qf fl" style="width: 100%">{{goodsEO.gameName||goodsEO.game_name}}/{{goodsEO.regionName||goodsEO.region_name}}/{{goodsEO.serverName||goodsEO.server_name}}</p>
              </div>
              <div class="sell-out" v-if="!goodsEO.groundingStatue"></div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="similar-tip text-center" v-if="!empty_history">
      <span class="span-icon-up f26 color-666">相似好货&nbsp为您推荐</span>
    </div>


    <!--没有浏览记录时候-->
    <div class="tab-empty mt-205" v-if="empty_history">
      <div class="empty-conn px-30">
        <div class="list-img"><img src="~images/gamelist.png"></div>
        <div class="emp-text f30 color-999 text-center">暂无相似商品</div>

      </div>
    </div>


    <mt-loadmore
      :bottom-all-loaded="allLoaded" ref="loadmore" id="boxs"
      v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"
    >
      <div>
        <div v-for="item in personLists" class="mobilegames-conn border-bottom border-top mb-20 pr bg-fff" @click="routeClick(item)">
          <div class="mbilegames-list ml-30 ">
            <div class="listware pr-30 py-30">
              <div class="mbgmes-img pr fl">
                <img v-if="(!item.goods_img)||item.goods_img=='null'" src="~images/default_img_info.jpg" style="width:100%;" class="previewer-demo-img" />
                <img style="min-width: 1.5rem!important;" v-else :src="item.goods_img">
              </div>
              <a>
                <div class="mbgmes-con">
                  <div class="mbl-title f30 color-000" style="
                      overflow: hidden;
                      line-height: 0.4rem;
                      max-height: 1.2rem;
                      height: auto !important"
                  >{{item.title}}</div>
                  <div class="mbl-cper mt-10">
                    <div class="mbl-money color-m1 f32 fl font-arial">￥<span class="font-bold">{{item.price}}</span></div>
                    <div class="mbl-icon fr"> <i class="an" v-show="item.is_axm && item.is_axm == true"></i>
                      <!--<i class="shou"></i>-->
                      <i class="tu" v-show="item.is_robot_capture && item.is_robot_capture==true"></i></div>
                  </div>
                  <div class="mbl-parea color-666 f24 clearfix">
                    <p class="mbl-qf fl" style="width: 100%">{{item.game_name}}/{{item.region_name}}/{{item.server_name}}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <p id="coins_id" v-if="showCoins">
          <img src="~images/coins/loading-sm.gif">
          <span>请等待。。。</span>
        </p>
        <div class="tab-empty" v-if="isNostore&&!empty_history">
          <div class="empty-conn px-30" style="margin-bottom: 0.5rem">
            <div class="list-img"><img src="~images/gamelist.png"></div>
            <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
          </div>
        </div>
      </div>


    </mt-loadmore>
  </div>
</template>
<script>
  export default{
    name:'historySimilarity',
    data(){
      return{
        allLoaded: false,
        isNostore:false,
        busy: false,
        pageSize:20,
        start:0,
        showCoins:false,
        personLists: [],
        goodsEO: {},
        empty_history:false,
        isSimilarity:false,
        totalMessage:this.$route.query.totalMessage
      }

    },
    mounted(){
      this.goodsEO = JSON.parse(this.totalMessage)
      if(this.goodsEO.groundingStatue==undefined){
        this.goodsEO.groundingStatue = true
      }
      console.log('--------',this.goodsEO)
      if(this.goodsEO.length==0){
        this.isSimilarity = true
      }else{
        this.isSimilarity = false
      }
//      this.$http.post(this.$CONSTANTS.APISearch+'goodsSearch/goodsSearchList',
//        {
//          accurateMap: {id: [this.$route.query.goodsId]},
//          page: 1,
//          pageCount: 10
//
//        },
//      ).then((res)=>{
//
//        if(res.body.responseStatus.code=="00"){
//          console.log('----sds----',JSON.parse(res.body.result).items)
//          this.goodsEO = JSON.parse(res.body.result).items
//
//          if(this.goodsEO.length==0){
//            this.isSimilarity = true
//          }else{
//            this.isSimilarity = false
//          }
//
//        }
//      })

    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      routeMyClick(item){
        // 手游和端游详情页分离
        let goods_source_type = item.goodsSource ? item.goodsSource : 0
        if(item.goodsId){
          item.goodsId = item.goodsId
        }else{
          item.goodsId = item.id
        }
        if (Number(this.$route.query.gameType) == 1) {  // 1是端游 2是手游
          location.href = "/vue/account/accountDetail/"+item.goodsId+"/"+goods_source_type+"/"+1
        }else{
          location.href = "/vue/mobile-game/account-detail/"+item.goodsId+"/"+goods_source_type
        }
      },
      routeClick(item){
        let goods_source_type = item.goods_source_type ? item.goods_source_type : 0
        // 手游和端游详情页分离
        if (Number(this.$route.query.gameType) == 1) {  // 1是端游 2是手游

          location.href = "/vue/account/accountDetail/"+item.id+"/"+goods_source_type+"/"+1
        }else{

          location.href = "/vue/mobile-game/account-detail/"+item.id+"/"+goods_source_type
        }
      },
      loadMore: function () {
        var self = this;
        self.busy = true;
        this.showCoins = true;
        this.start = this.start + 1;
        this.gagaMethod()
      },
      gagaMethod(){
        var strObject = {}

        if(this.goodsEO.gameType==2){
          strObject={
            gameId:this.goodsEO.gameId||this.goodsEO.game_id,
            goodsId :this.goodsEO.goodsId,
            regionId :this.goodsEO.regionId||this.goodsEO.region_id,
            serviceProviderId:this.goodsEO.serviceProviderId,
            price:this.goodsEO.price,
            page:this.start,
            pageCount:this.pageSize,
            gameType:Number(this.goodsEO.gameType)
          }
        }else{
          this.isRaceId = this.goodsEO.raceId||this.goodsEO.race_id

          if(this.goodsEO.raceId+""=="null"){
            this.isRaceId=undefined
          }else if(this.goodsEO.race_id+""=="null"){
            this.isRaceId=undefined
          }

          strObject={
            gameId:this.goodsEO.gameId||this.goodsEO.game_id,
            goodsId :this.goodsEO.goodsId,
            regionId :this.goodsEO.regionId||this.goodsEO.region_id,
            serverId:this.goodsEO.serverId||this.goodsEO.server_id,
            raceId:this.isRaceId,
            price:this.goodsEO.price,
            page:this.start,
            pageCount:this.pageSize,
            gameType:Number(this.goodsEO.gameType)
          }
        }


        this.$http.post(
          this.$CONSTANTS.APIGoods+'goodsSimilarAndGuessLike/lookSimilarGoods',
          strObject).then((res) => {
          this.showCoins = false;//后期去掉
          var self = this;
          if(res.body.responseStatus.code=="00"){
            console.log("看相似",res)
            const object =  JSON.parse(res.body.result).items;
            if(this.start == 1 && object.length == 0){
              this.coinsImage = true;
            }else{
              this.coinsImage = false
            }
            if(this.start == 1 &&object.length==0){
              this.empty_history = true
            }
            object.forEach(
              (item,index) => {
                if(item.id == this.$route.query.goodsId){

                }else{
                  self.personLists.push(item);
                  self.showCoins = false;
                }
                console.log('-----------',self.personLists)
                if(this.start == 1&&self.personLists.length==0){
                  this.empty_history = true
                }else{
                  this.empty_history = false
                }

              })
            if(object.length==this.pageSize){
              self.busy = false
            }else{
              this.isNostore = true
              self.showCoins = false;
            }

          }
          else{
            this.coinsImage = true
            this.empty_history  = true
          }
        }, () => {
          console.log("请求错误！");
        })


      },
    }

  }
</script>
<style src="css/history/list-cl.css" scoped>

</style>