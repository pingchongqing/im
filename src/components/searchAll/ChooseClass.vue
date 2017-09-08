<template>
  <div id="wrapper">
    <!---------------------------- top ---------------------------->
    <div class="top-header fixed-top border-bottom" style="z-index:61;">
      <div class="top-back">
        <a href="javascript:history.go(-1)"></a>
      </div>
      <h2 class="f36" v-text="title"></h2>
      <div class="top-right"></div>
    </div>
    <!------------------------*填补fixed留下的下方空块*------------------------>
    <div class="fixedspace2" style="height: 0.96rem"></div>
    <!---------------------------- search ---------------------------->
    <div class="search-game border-bottom fw">
      <div class="sgame fw bg-fff f30">
        <span>请选择商品类型</span>
      </div>
    </div>
    <!---------------------------- 区服选择 ------------------------------>
    <div class="search-list pb-200 fw ">
      <div class="slist fw f30 bg-fff">
        <ul class="style01" v-if="list ==null || list.length == 0">
          <li>没有商品类型。</li>
        </ul>
        <ul class="style03">
          <li v-for="item in list" v-if="item.link">
            <a :href="item.link" v-text="item.goodsTypeName"></a>
          </li>
        </ul>
      </div>
    </div>
    <navigationModalComponent></navigationModalComponent>
  </div>
</template>

<script>
  /**
   * 该Vue有设计缺陷，将来会有一种很好的方案代替  ps:严俊东
   */
  import navigationModalComponent from "../common/NavigationModal.vue"
  import http from './http'
  export default{
    data(){
      return {
        title: '',
        gid: null,
        list: []
      }
    },
    mounted(){
      if (this.$route != null
        && this.$route.query['gname'] != null
        && this.$route.query['gid'] != null) {
        this.title = this.$route.query['gname'];
        this.gid = this.$route.query['gid'];
      }
    },
    components: {
      navigationModalComponent
    },
    beforeRouteEnter(to, from, next){
      if (to.query.gid) {
          if (from.name === 'SearchAll'&&from.query.goodsType) {
            next(vm => {
              vm.redirectTo()
            })
          }
          if (from.path === '/vue/search/searchArea' || from.path === '/vue/search/searchPlatForm') {
            history.go(-1)
          }
          http.getClass({gameId: to.query.gid}).then(list => {
            if (list) {
              next(vm => {
                //console.log(list);
                vm.addLink(list.list);
                vm.list.push(...list.list);
              })
            } else {
              next();
            }
          });

      } else {
        next();
      }
    },
    methods: {
      redirectTo() {
        if (this.$route.query.goodsType) {
          switch (parseInt(this.$route.query.goodsType)) {
            case 2:
              if (parseInt(this.$route.query.gameType)===1) {
                this.$router.push({
                  name:'PcGoodsList',
                  path:'/vue/pcGoodsList',
                  params:{
                    gameId:this.$route.query.gid,
                    gameName:this.$route.query.gname,
                    goodsType:this.$route.query.goodsType,
                  }
                })
              } else if(parseInt(this.$route.query.gameType)===2) {
                this.$router.push({
                  path:'/vue/search/searchPlatForm',
                  query: {
                    gameId:this.$route.query.gid,
                    gName:this.$route.query.gname,
                    goodsType:this.$route.query.goodsType,
                    gameType:2,
                    typename:'游戏帐号'
                  }
                })
              }
              break;
            case 3:
              if (parseInt(this.$route.query.gameType)===1) {
                this.$router.push({
                  path:'/vue/search/searchArea',
                  query: {
                    gameId:this.$route.query.gid,
                    gName:this.$route.query.gname,
                    goodsType:3,
                    gameType:1,
                    typename:'游戏币'
                  }
                })
              } else if(parseInt(this.$route.query.gameType)===2) {
                this.$router.push({
                  path:'/vue/search/searchPlatForm',
                  query: {
                    gameId:this.$route.query.gid,
                    gName:this.$route.query.gname,
                    goodsType:3,
                    gameType:2,
                    typename:'游戏币'
                  }
                })
              }
              //location.href = '/search/search-game-area.html?gid='+this.$route.query.gid+'&gname='+this.$route.query.gname+'&gameImageUrl=&goodsType=3&typename=游戏币'
              break;
          }
        }
      },
      addLink(list){
        list.map((v) => {
          if (this.$route.query.type === 'seller') {
            //我要卖更改流程
            v.link = this.$CONSTANTS.HOST + `vue/seller/goodsPublish?game_id=${this.gid}&game_name=${this.title}game_type=
            ${this.$route.query.gameType}`;
          }else{

            if (parseInt(this.$route.query.gameType) === 1) {
              if (parseInt(v.goodsType) == 2) {
                v.link = this.$CONSTANTS.HOST + 'vue/pcGoodsList/'+this.gid+'/'+this.title+'/' +v.goodsType
              }
              else if (parseInt(v.goodsType) == 3 ||parseInt(v.tradeType) == 5) {
                v.link = this.$CONSTANTS.HOST + "vue/search/searchArea?" +
                  "gameId=" + this.gid +
                  "&gName=" + this.title +
                  "&goodsType=" + v.goodsType +
                  "&gameType=" + this.$route.query.gameType +
                  "&tradeType=" + v.tradeType +
                  "&typename=" + v.goodsTypeName;
              } else if (parseInt(v.goodsType) === 1) {
                v.link = this.$CONSTANTS.HOST + 'vue/equipmentList/'+this.gid+'/'+this.title+'/' +v.goodsType
              } else {
                  v.link = this.$CONSTANTS.HOST + "search/search-game-area.html?" +
                    "gid=" + this.gid +
                    "&gname=" + this.title +
                    "&goodsType=" + v.goodsType +
                    "&tradeType=" + v.tradeType +
                    "&typename=" + v.goodsTypeName;
              }
              // if (parseInt(v.goodsType) === 2) {
              //   v.link = this.$CONSTANTS.HOST + "vue/search/searchArea?" +
              //     "gameId=" + this.gid +
              //     "&gName=" + this.title +
              //     "&goodsType=" + v.goodsType +
              //     "&gameType=" + this.$route.query.gameType +
              //     "&typename=" + v.goodsTypeName;
              // } else {
              //   v.link = this.$CONSTANTS.HOST + "search/search-game-area.html?" +
              //     "gid=" + this.gid +
              //     "&gname=" + this.title +
              //     "&goodsType=" + v.goodsType +
              //     "&tradeType=" + v.tradeType +
              //     "&typename=" + v.goodsTypeName;
              // }
            }
            else
            {
              if(parseInt(v.goodsType) == 2||parseInt(v.goodsType) == 3) {
                v.link = this.$CONSTANTS.HOST + "vue/search/searchPlatForm?" +
                  "gameId=" + this.gid +
                  "&gName=" + this.title +
                  "&goodsType=" + v.goodsType +
                  "&gameType=" + this.$route.query.gameType +
                  "&typename=" + v.goodsTypeName;
              } else {
                v.link = this.$CONSTANTS.HOST + `search/search-ptyys.html?gid=${this.gid}&gname=${this.title}&goodsType=${v.goodsType}&tradeType=${v.tradeType}`;
              }

              // if (parseInt(v.goodsType) === 2) {
              //   v.link = this.$CONSTANTS.HOST + "vue/search/searchPlatForm?" +
              //     "gameId=" + this.gid +
              //     "&gName=" + this.title +
              //     "&goodsType=" + v.goodsType +
              //     "&gameType=" + this.$route.query.gameType +
              //     "&typename=" + v.goodsTypeName;
              // } else {
              //   v.link = this.$CONSTANTS.HOST + `search/search-ptyys.html?gid=${this.gid}&gname=${this.title}&goodsType=${v.goodsType}&tradeType=${v.tradeType}`;
              // }
            }

            }
        })
      }
    }
  }
</script>
<style>
</style>
