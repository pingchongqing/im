<template>
    <!--<div class="Jbox f30 clearfix" id="storeServerList">-->
    <!--区服选择下拉选项-->
    <div class="gmnav-list bg-fff">
      <div class="seach-list">
        <div class="gmvst-profile ">
          <div class="gmvst-server fl">
            <ul id="quTrade">
              <!--<li class="border-bottom choice"><a href="#"><span class="f30 color-000">广东区<i class="close"></i></span></a></li>-->
              <li @click="nextqulist(qulist.catagoryId,qulist.name,index)" v-for="(qulist,index) in gameListFilter" :class="{curren:active_qf==index,scrollquClass:active_qf==index}" class="border-bottom">
                <a><span class="f30 color-000">{{qulist.name}}</span></a>
              </li>
            </ul>
          </div>
          <div class="gmvst-area bg-fff" >
            <div class="gmvst-server"><div class="gvst-seach mx-30 my-20 border py-15 px-20"><input class="server-input" v-model="searchfuGame" type="text" placeholder="请输入服务器名称"></div></div>
            <ul class="pl-30" id="ulTrade">
              <li v-if="emptyShow" class="emptylist f28">没有您要找的内容。</li>
              <li @click="nextfulist(fulist.catagoryId,fulist.name,index)" v-for="(fulist,index) in gamefuFilter" class="border-bottom" :class="{active:active_fu==index,scrollClass:active_fu==index}"><span class="f30 color-000">{{fulist.name}}</span></li>
            </ul>

          </div>
        </div>
      </div>

    </div>

</template>
<script>
  import {MessageBox} from 'mint-ui';
  export default {
    name:"TradeChoice",
    data(){
      return{
        qulists:[],
        gameListFilter:[],
        active_qf:0,
        active_fu:-1,
        fulists:[],
        searchfuGame:'',
        emptyShow:false,
        quName:'',
        fuName:'',
        quNameID:'',
        fuNameID:'',
      }
    },
    methods:{
      nextqulist(catagoryId,name,index){
        this.active_qf = index;
        this.active_fu = -1;

        this.quName = name
        this.quNameId = catagoryId

        console.log(catagoryId)
        this.$http.get(this.$CONSTANTS.APICategory + 'category/searchserverbyparentid',{
          params: {
            parentId: catagoryId,
          },
        }).then((res)=>{
          if(res.body.responseStatus.code == "00"){
            console.log(res.body.categoryList)
            if(res.body.categoryList.length==0){
              this.fulists = []
              this.emptyShow = true
            }else{
              this.emptyShow = false;
              this.fulists = res.body.categoryList
              res.body.categoryList.forEach((a,b,c)=>{
                if(a.name==this.$route.query.servername){
                  this.active_fu = b;
                  this.fuName = res.body.categoryList[b].name;
                  this.fuNameId = res.body.categoryList[b].catagoryId;


                }

              })

            }

          }
        }).then((res)=>{

        })

      },

      nextfulist(catagoryId,name,index){
        this.active_fu = index;
        this.fuName = name
        this.fuNameId = catagoryId


        location.href = '/vue/trade-coins/trade-stone?' +
          'gameId='+ this.$route.query.gameId +
          '&gName='+ this.$route.query.gName +
          '&aName='+ this.quName +
          '&areaId=' + this.quNameId +
          '&areaname=' + this.quName  +
          '&gameType=' + this.$route.query.gameType  +
          '&servername=' + this.fuName +
          '&serverid=' + this.fuNameId +
          '&areaid=' + this.quNameId +
          '&gid=' + this.$route.query.gid+
          '&gname=' + this.$route.query.gname +
          '&goodsType=' +this.$route.query.goodsType +
          '&tradeType='+this.$route.query.tradeType+
          '&typename='+this.$route.query.typename+
          '&factionId='+(this.$route.query.factionId||'') +
          '&factionName='+(this.$route.query.factionName||'') +
          '&raceid='+(this.$route.query.catagoryId||'') +
          '&racename='+(this.$route.query.racename||'')
//        this.$route.path()
      }
    },
    computed: {
      gamefuFilter:function () {
        var self = this;
        var str = self.searchfuGame;
        if (self.fulists) {
          if (str) {
            return self.fulists.filter(function (item) {
              if (/^[a-zA-Z0-9/:;().]*$/.test(str)) {
                return item.pyfirst.toLowerCase().indexOf(str.toLowerCase()) !== -1;
              } else {
                return item.name.indexOf(str) !== -1;
              }
            });
          }
          else {
            return self.fulists;
          }
        }
      }
    },
    mounted(){
      this.$http.get(this.$CONSTANTS.APICategory + 'category/searchbyparentid',{
        params: {
          parentId: this.$route.query.gid,

        },
      }).then((res)=>{
        if(res.body.responseStatus.code == "00"){
          this.gameListFilter = res.body.categoryList

          res.body.categoryList.forEach((a,b,c)=>{

            if(a.name==this.$route.query.aName){
              this.active_qf = b;
              this.quName = res.body.categoryList[b].name;
              this.quNameId = res.body.categoryList[b].catagoryId;
              this.nextqulist(res.body.categoryList[b].catagoryId,res.body.categoryList[b].name,b)
            }

          })

        }
      })
    }
  }
</script>
<style scoped>
  .emptylist{
    line-height: 1.1rem;
    float: left;
    text-align: center;
    border-bottom: 1px solid #e8e8e8;
    padding: 0 .1rem;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;

  }
</style>
