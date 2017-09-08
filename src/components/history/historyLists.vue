<template>
  <div id="wrapper" class="pb-150">
    <div class="top-header border-bottom fixed-top">
      <div class="top-back"><a @click="goBack"></a></div>
      <h2 class="f36 color-000">浏览记录</h2>
      <div class="top-right">
        <ul class="clearfix top-handle f30 color-666 text-center">
          <li v-if="!empty_history" class="fl"><span class="border-right pr-25" @click="clickEmpty">清空</span></li>
          <li v-if="!empty_history" class="fl"><span class="pr-30 pl-25" @click="clickEdit">编辑</span></li>
        </ul>
      </div>
    </div>
    <!--没有浏览记录时候-->
    <div class="tab-empty mt-205" v-if="empty_history">
      <div class="empty-conn px-30">
        <div class="list-img"><img src="~images/gamelist.png"></div>
        <div class="emp-text f30 color-999 text-center">暂无浏览记录</div>
        <div class="text-center mt-30">
          <a class="to-index f30 color-666" href="/">去首页逛逛</a>
        </div>
      </div>
    </div>

    <div style="height: 0.96rem"></div>
    <div v-if="!isHistory">

        <div class="today border-top" :class="{'edit':isEdit}" v-for="(item,index) in todayList" v-if="!empty_history">
          <div class="mbl-time mt-20 bg-fff f28 color-666" v-if="getTime(item.dateTime,index)">
            <p class="mbl-p border-bottom ml-30" v-if="new Date(item.dateTime).getMonth()==new Date().getMonth()&&new Date(item.dateTime).getDate()==new Date().getDate()">今天</p>
            <p class="mbl-p border-bottom ml-30" v-else>{{new Date(item.dateTime).getMonth()+1}}月{{new Date(item.dateTime).getDate()}}日</p>
          </div>

          <div class="mobilegames-conn  bg-fff pr" @click="goSimilarity(item)">
            <div class="edit-select" :class="{'selected':item.selected}" @click.stop="clickSelected(item,index)">
              <i class="select-circle"></i>
            </div>
            <div class="mbilegames-list ml-30">
              <div class="listware pr-30 py-30">
                <div class="mbgmes-img pr fl">
                  <img v-if="(!item.goods_img)||item.goods_img=='null'" src="~images/default_img_info.jpg" style="width:100%;" class="previewer-demo-img" />
                  <img style="min-width: 1.5rem!important;" v-else :src="item.goods_img">
                  <div class="mbl-type color-fff f22 text-center">游戏帐号</div>
                </div>
                <div class="">
                  <div class="mbgmes-con ">
                    <div class="mbl-title f30 color-000" style="
                      overflow: hidden;
                      line-height: 0.4rem;
                      max-height: 1.2rem;
                      height: auto !important"
                    >{{item.title}}</div>
                    <div class="mbl-cper mt-10">
                      <div class="mbl-money color-m1 f32 fl font-arial">￥<span class="font-bold">{{item.price}}</span></div>
                      <div class="mbl-icon fr">
                        <i class="an" v-show="item.is_axm && item.is_axm == true"></i>
                        <!--<i class="shou"></i>-->
                        <i class="tu" v-show="item.is_robot_capture && item.is_robot_capture == true"></i>
                      </div>
                    </div>
                    <div class="mbl-parea color-666 f24 clearfix">
                      <p class="mbl-qf fl">{{item.game_name}}/{{item.region_name}}/{{item.server_name}}</p>
                      <div class="mbl-similar fr border border-radius text-center" @click.stop="similarity(item)">看相似</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="history_id" v-if="showCoins">
        <img src="~images/coins/loading-sm.gif">
        <span>请等待。。。</span>
        </p>

    </div>
    <div v-if="isHistory">
      <mt-loadmore
        :bottom-all-loaded="allLoaded" ref="loadmore" id="boxs"
        v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-immediate-check=false>

        <div class="today border-top" :class="{'edit':isEdit}" v-for="(item,index) in todayList" v-if="index==300?false:true&&!empty_history" @click="goSimilarity(item)">
          <div class="mbl-time mt-20 bg-fff f28 color-666" v-if="getTime(item.historyTime,index)">
            <p  class="mbl-p border-bottom ml-30" v-if="new Date(item.historyTime).getMonth()==new Date().getMonth()&&new Date(item.historyTime).getDate()==new Date().getDate()">今天</p>
            <p class="mbl-p border-bottom ml-30" v-else>{{new Date(item.historyTime).getMonth()+1}}月{{new Date(item.historyTime).getDate()}}日</p>
          </div>

          <div class="mobilegames-conn  bg-fff pr">
            <div class="edit-select" :class="{'selected':item.selected}" @click.stop="clickSelected(item,index)">
              <i class="select-circle"></i>
            </div>

            <div class="mbilegames-list ml-30">
              <div class="listware pr-30 py-30">
                <div class="mbgmes-img pr fl">
                  <img v-if="(!item.goodsImg)||item.goodsImg=='null'" src="~images/default_img_info.jpg" style="width:100%;" class="previewer-demo-img" />
                  <img style="min-width: 1.5rem!important;" v-else :src="item.goodsImg">
                  <div class="mbl-type color-fff f22 text-center">游戏帐号</div>
                </div>
                <div class="">
                  <div class="mbgmes-con ">
                    <div class="mbl-title f30 color-000" style="
                      overflow: hidden;
                      line-height: 0.4rem;
                      max-height: 1.2rem;
                      height: auto !important"
                    >{{item.title}}</div>
                    <div class="mbl-cper mt-10">
                      <div class="mbl-money color-m1 f32 fl font-arial">￥<span class="font-bold">{{item.price}}</span></div>
                      <div class="mbl-icon fr">
                        <i class="an" v-show="item.axm && item.axm == true"></i>
                        <!--<i class="shou"></i>-->
                        <i class="tu" v-show="item.robotCapture && item.robotCapture==true"></i>
                      </div>
                    </div>
                    <div class="mbl-parea color-666 f24 clearfix">
                      <p class="mbl-qf fl">{{item.gameName}}/{{item.regionName}}/{{item.serverName}}</p>
                      <div class="mbl-similar fr border border-radius text-center" @click.stop="similarity(item)">看相似</div>
                    </div>
                    <div class="sell-out" v-if="!item.groundingStatue"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="history_id" v-if="showCoins">
          <img src="~images/coins/loading-sm.gif">
          <span>请等待。。。</span>
        </p>
      </mt-loadmore>
    </div>
    <!--点击编辑时出现在底部的全选和删除按钮-->
    <div class="fixed-bottom footer clearfix" v-if="isDeleate">
      <div class="select-left fl bg-fff">
        <span class="span-icon-circle f28 color-000" :class="{'selected':isAllChoice}" @click="choiceAll()">全选</span>
      </div>
      <div class="delete fl bg-m1 text-center color-fff f36" @click="clickdeleate()">删除</div>
    </div>

    <!--删除成功弹框-->
    <transition name="fade">
      <div class="delete-success-box" v-if="success_ico">
        <i class="icon-success mt-25"></i>
        <p class="f32 color-fff mt-10 text-center">删除成功</p>
      </div>
    </transition>

    <!--确认清空浏览记录弹框-->
    <transition>
    <div class="bomb-box bg-fff" style="margin-top: -2rem;" v-if="true_ico">
      <div class="bomb-content border-bottom">
        <h2 class="text-center f36 color-000 py-70">确认清空浏览记录？</h2>
      </div>
      <div class="bomb-two-confirm f36  clearfix">
        <div class="fl cancel color-000 border-right" @click="clickFalse">取消</div>
        <div class="fl cancel bg-m1 color-fff sure" @click="clickTrue">确定</div>
      </div>
    </div>
    </transition>
    <div class="maskDiv1" v-if="true_ico" @click="clickFalse"></div>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    name:'historyLists',
    data(){
      return{
        isHistory:true,
        allLoaded:false,
        busy: false,
        showCoins:false,
        pageSize:20,
        start:0,
        empty_history:false,
        isSelected:[],
        isEdit:false,
        isDeleate:false,
        isAllChoice:false,
        success_ico:false,
        true_ico:false,
        isButton:false,
        isKaiguan:false,
        pcdUserId:'',
        todayList:[
        ],
        todayListTwo:[
        ]
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log("我从哪里来",from.name)
      if (from.name == 'historySimilarity'||from.name == 'MGAccountDetail') {
        next(vm=>{
          if(JSON.stringify(vm.$store.state.history)=="{}"){
            vm.isKaiguan = false
          }else {

            vm.isKaiguan = true
          }
        })
      } else {
        next(vm=>{

          vm.isKaiguan = false
        })

      }
    },

    mounted(){
      window.addEventListener('scroll', this.menu);
      this.$getAccount().then(account => {
        if (account) {
          this.isHistory = true
          this.pcdUserId = account.pcUserId
          if(this.isKaiguan){
            this.showCoins = false
            this.start = this.$store.state.history.histroyIndex
            this.todayList = this.$store.state.history.zytotalNum
            setTimeout(()=>{
              document.body.scrollTop = this.$store.state.history.histroyScroll
            },10)
          }else{
            this.loadMore()
          }
        } else {
          console.log("没登入");
          this.isHistory = false;
          if(window.localStorage.history){
            this.empty_history = false
            let attr = JSON.parse(window.localStorage.history)
            this.todayList = attr;
            console.log(this.todayList)
            if(this.isKaiguan){
              setTimeout(()=>{
                document.body.scrollTop = this.$store.state.history.histroyScroll
              },10)
            }


//            let strJosn = JSON.stringify(attr)
//            this.$http.post(this.$CONSTANTS.APIGoods+'goodsBrowseHistory/noLoginbrowseHistoryList',{
//              jsonBrowse:strJosn
//            }).then((res)=>{
//              if(res.body.goodsBrowseList){
//                let strList = [];
//                res.body.goodsBrowseList.forEach((item)=>{
//                  let strObject = {};
//                  strObject.id = item.goodsId;
//                  strObject.title = item.title;
//                  strObject.price = item.price;
//                  strObject.is_robot_capture = item.robotCapture;
//                  strObject.is_axm = item.axm;
//                  strObject.region_name = item.regionName;
//                  strObject.server_name = item.serverName;
//                  strObject.dateTime = item.historyTime
//                  strObject.gameType = item.gameType
//                  strObject.goods_img = item.goodsImg;
//                  strObject.groundingStatue = item.groundingStatue;
//                  strList.push(strObject)
//                })
//                console.log('----------------',strList)
//                this.todayList = strList;
//                if(this.isKaiguan){
//                  setTimeout(()=>{
//                    document.body.scrollTop = this.$store.state.history.histroyScroll
//                  },10)
//                }
//              }
//            },(res)=>{
//
//            }).then((res)=>{
//
//            })




          }else{
            this.empty_history = true
          }

        }
      })

    },

    methods:{
      getScrollTop(){
          var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
          if(document.body){
            bodyScrollTop = document.body.scrollTop;
          }
          if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
          }
          scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
          return scrollTop;
    },
      getScrollHeight(){
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
          bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
      },
      getWindowHeight(){
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
          windowHeight = document.documentElement.clientHeight;
        }else{
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      menu(){
        this.scroll = document.body.scrollTop;
      },
      loadMore:function () {
        if(this.pcdUserId){
          this.busy = true;
          this.showCoins = true
          this.start = this.start + 1;
          this.gagaMethod()
        }else{
          return false
        }

      },
      gagaMethod(){
        if(window.localStorage.history){
          var oldattr = JSON.parse(window.localStorage.history)
        }else{
          var oldattr = []
//          this.showCoins = false;
//          this.empty_history = true
        }
        var newattr = []
        console.log('ddddd',oldattr)
        oldattr.forEach((item)=>{
          var newstr = {};
          console.log('ddd',item.pcdUserId)
            if(item.pcdUserId==undefined){
              newattr.push(item)
            }
        })
        var newstr = JSON.stringify(newattr)

        this.$http.post(
          this.$CONSTANTS.APIGoods+'goodsBrowseHistory/addJsonBrowseList',
          {
            userId:this.pcdUserId,
            jsonBrowse:newstr,//发布单编号
          }).then((res)=>{

          }).then((res)=>{
          this.$http.post(
            this.$CONSTANTS.APIGoods+'goodsBrowseHistory/browseHistoryList',
            {
              userId:this.pcdUserId ,
              page:this.start,
              pageSize:this.pageSize
              //browseHistoryList:attr
            }).then((res)=>{
            console.log(res.body.goodsBrowseList)
            if(res.body.success){
              const object =  res.body.goodsBrowseList;

              object.forEach(
                (item,index) => {
                  var itemNew = {};
                  itemNew.id = item.goodsId;
                  itemNew.title = item.title;
                  itemNew.price = item.price;
                  itemNew.is_robot_capture = item.robotCapture;
                  itemNew.is_axm = item.axm;
                  itemNew.game_name = item.gameName;
                  itemNew.region_name = item.regionName;
                  itemNew.server_name = item.serverName;
                  itemNew.dateTime = item.historyTime
                  itemNew.gameType = item.gameType
                  itemNew.goods_img = item.goodsImg;
                  itemNew.goodsSource = item.goodsSource;
                  itemNew.pcdUserId = this.pcdUserId;
                  itemNew.game_id = item.gameId;
                  itemNew.region_id = item.regionId;
                  itemNew.server_id = item.serverId;
                  itemNew.race_id = item.raceId;
                  itemNew.serviceProviderId = item.serviceProviderId;
                  this.todayListTwo.push(itemNew)
                  this.todayList.push(item);
                  this.showCoins = false;
                  if(this.todayList.length==0){
                    this.showCoins = false;
                    this.empty_history = true
                  }

                }
              )


              if(this.todayList.length>300){
                this.todayList.pop()
              }

              window.localStorage.history = JSON.stringify(this.todayListTwo)
              this.$store.commit('SET_ZYTOTAL',this.todayList)

              if(object.length==this.pageSize){
                this.busy = false
              }else{
                this.showCoins = false;
              }

              if(this.isKaiguan){
                setTimeout(()=>{
                  document.body.scrollTop = this.$store.state.history.histroyScroll
                },10)

              }
            }
            else{
              this.showCoins = false;
              if(this.start==1){
                this.empty_history = true
              }

            }

          })
          })
      },
      goSimilarity(item){

        if(this.isButton){
          return false
        }
        this.$store.commit('SET_HISTORY',document.body.scrollTop)

//        this.$router.push({
//          name: 'MGAccountDetail',
//          params: {
//            goodsId: item.id, goods_source_type: item.goods_source_type ? item.goods_source_type : 0
//          }
//        });
        console.log('dddd',item)
        let goods_source_type = item.goodsSource ? item.goodsSource : 0
        if(item.goodsId){
          // 手游和端游详情页分离
          if (Number(item.gameType) === 1) {  // 1是端游 2是手游
            location.href = "/vue/account/accountDetail/"+item.goodsId+"/"+goods_source_type+"/"+1
          }else{
            location.href = "/vue/mobile-game/account-detail/"+item.goodsId+"/"+goods_source_type
          }
        }else{
          if (Number(item.gameType) === 1) {  // 1是端游 2是手游
            location.href = "/vue/account/accountDetail/"+item.id+"/"+goods_source_type+"/"+1
          }else{
            location.href = "/vue/mobile-game/account-detail/"+item.id+"/"+goods_source_type
          }
        }




      },
      //相同时间更改
      getTime(time,index){
        if(index==0&&this.time){
          this.time = ''
        }
        time = new Date(time)
        var timestr = time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate()
        time = new Date(timestr)
        if(this.time == time.getTime()){

          return false
        }else{
          this.time = time.getTime()

          return true
        }
      },
      //radio
      clickSelected(item,index){
        item.selected = !item.selected
        console.log(item.selected)
        this.todayList.splice(index,1,item)
      },
      choiceAll(){

        if(this.isAllChoice==true){
          this.isAllChoice=false
          this.todayList.forEach((a,b)=>{
            a.selected = false
          })
        }else{
          this.isAllChoice=true
          this.todayList.forEach((a,b)=>{
            a.selected = true
          })

        }
        this.todayList.splice(0,1,this.todayList[0])
      },
      //编辑按钮
      clickEdit(){
        if(this.isEdit == true){
          this.isEdit = false
          this.isDeleate =false
          this.isButton = false
        }else{
          this.isEdit = true
          this.isDeleate =true
          this.isButton = true
        }

      },

      clickFalse(){
        this.true_ico = false
      },
      //清空确认
      clickTrue(){

          if(this.todayList.length == 0){
            this.true_ico = false
          }else {

            if(this.isHistory){
              this.$http.post(
                this.$CONSTANTS.APIGoods+'goodsBrowseHistory/delectAllBrowseHistory',
                {
                  userId:this.pcdUserId,//发布单编号
                }).then((res)=>{
                console.log(res)
              })
            }
            this.true_ico = false
            this.todayList = []
            if(this.todayList.length==0){
              this.empty_history = true
              localStorage.removeItem("history")
            }
          }


      },
      //清空按钮
      clickEmpty(){
        this.true_ico = true
      },
      //删除按钮
      clickdeleate(){
        this.box = false
        var newArr=[];
        var newdeleateArr=[];
        var newdeleateAttr = [];
        for(var i=0;i<this.todayList.length;i++){
            if(this.todayList[i].selected==true){
              this.box = true
              newdeleateArr.push(this.todayList[i])
              newdeleateAttr.push(this.todayList[i].historyTime)
            }else{
              newArr.push(this.todayList[i])
            }
        }
        console.log(newdeleateAttr)
        if(this.isHistory){
          //删除接口
          this.$http.post(
            this.$CONSTANTS.APIGoods+'goodsBrowseHistory/delectBrowseHistory',
            {
              userId:this.pcdUserId,
              listTime:newdeleateAttr,//发布单编号
            }).then((res)=>{
            console.log(res)
          })
        }

        if(newArr.length==0){
          this.empty_history = true;
          this.todayList = []
          localStorage.removeItem("history")
        }else{
          this.todayList = newArr
          this.todayList.splice(0,1,this.todayList[0])
          console.log('-------------',this.todayList)
          var todayMost = []
          var attr = [];


          if(this.isHistory){
            newArr.forEach(
              (item,index) => {
                var itemObject = {};
                itemObject.id = item.goodsId;
                itemObject.title = item.title;
                itemObject.price = item.price;
                itemObject.is_robot_capture = item.robotCapture;
                itemObject.is_axm = item.axm;
                itemObject.game_name = item.gameName;
                itemObject.region_name = item.regionName;
                itemObject.server_name = item.serverName;
                itemObject.dateTime = item.historyTime;
                itemObject.gameType = item.gameType;
                itemObject.goods_img = item.goodsImg;
                itemObject.goodsSource = item.goodsSource;
                itemObject.pcdUserId = this.pcdUserId;
                itemObject.game_id = item.gameId;
                itemObject.region_id = item.regionId;
                itemObject.server_id = item.serverId;
                itemObject.race_id = item.raceId;
                itemObject.serviceProviderId = item.serviceProviderId;
                attr.push(itemObject)

              }
            )
            window.localStorage.history = JSON.stringify(attr)
          }else{
            window.localStorage.history = JSON.stringify(this.todayList)
          }



        }
        if(this.box){
          this.success_ico = true
        }


        this.isEdit = false
        this.isDeleate =false
        this.isButton = false



        setTimeout(()=>{
          this.success_ico = false
        },1000)

      },
      goBack(){
        this.$router.go(-1);
      },

      similarity(item){

        this.$store.commit('SET_HISTORY',document.body.scrollTop)
        this.$store.commit('SET_Index',this.start)
          if(item.goodsId){
            item.goodsId = item.goodsId
          }else{
            item.goodsId = item.id
          }
        if(item.goodsImg){
          item.goodsImg = item.goodsImg
        }else{
          item.goodsImg = item.goods_img
        }
          this.$router.push(
            {
              name:'historySimilarity',
              query:{
                goodsId:item.goodsId,
                gameType:item.gameType,
                totalMessage:JSON.stringify(item)
              }
            }
          )


        }


    }

  }

</script>
<style src="css/history/list-cl.css" scoped>
</style>
<style scoped>
  .history_id{
    background: #fff;
    line-height: 50px;
    font-size: 12px;
    width: 100%;
    text-align: center;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>




