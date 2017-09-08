<template>
  <!-- 下拉搜索 -->
  <div class="list-select bg-fff" id="coinssort_tops" style="position: fixed;top: 0.96rem;">
    <div class="mstfiv" v-if="hideCover" @click="hideClick"></div>
    <div class="select-main fw">
      <div class="select-midd" id="select-midd">
        <a class="divs" @click="coins_type" v-if="$route.query.typename">
          <span :class="{active:class_yx}"><cite>{{$route.query.typename.length>4?$route.query.typename.substr(0,3)+"...":$route.query.typename}}</cite><i class="fith ml-10"></i></span>
        </a>
      </div>
      <!--区服-->
      <div class="new-select-midd" id="select-qufu">
        <a class="divs" @click="trade_qufu">
          <span :class="{active:class_qufu}"><cite>区服</cite><i class="qufu ml-10"></i></span>
        </a>
      </div>
      <!--单价-->
      <div class="new-select-midd" id="select-le">
        <a href="javascript:void(0);" class="divs" @click="coins_danjia">
          <span :class="{active:class_dj}"><cite>{{coins_dj}}</cite><i class="new_px ml-10"></i></span>
        </a>
      </div>
      <!--筛选-->
      <div class="new-select-midd" id="select-sx">
        <a href="javascript:void(0);" class="divs" @click="coins_shaixuan">
          <span :class="{active:class_sx}"><cite>筛选</cite><i class="new_sx ml-10"></i></span>
        </a>
      </div>
    </div>

    <transition name="fadeRight">
      <trade-choice v-show="tradeHide"></trade-choice>
    </transition>



    <!--商品类型-->

    <div class="default_numb" id="deaf" >
      <!--<transition name="fade" >-->
        <ul v-show="items_lx" class="line-40-1" id="djbox">
          <li @click="sortclick(sort,index)" v-for="(sort,index) in sorts" :class="{active:active_store==index,scrolldj:active_store==index}"><a href="javascript:">{{sort.name}}</a></li>
        </ul>
      <!--</transition>-->
      <!--单价-->
      <transition name="fade_dj">
        <ul v-if="items_dj">
          <li  @click="sort_dj(sort,index)" v-for="(sort,index) in sorts_dj" :class="{active:active_dj==index}"><a href="javascript:">{{sort.name}}</a></li>
        </ul>
      </transition>

      <!--<div class="mstfiv" v-if="items_lx||items_dj" @click="hide()"></div>-->

    </div>
    <!--筛选-->
    <div>
      <div class="filter-mask"  v-show="items_sx" @click="sx_true" style="height: 100%;bottom:0"></div>
      <transition name="fade_sx">
        <div class="new-filter-mask bg-f1" v-show="items_sx" style="height: 100%;overflow-y: scroll">
          <div>
            <div class="top-header border-bottom" v-show="items_sx">
              <div class="top-back">
                <a @click="sx_true">返回</a>
              </div>
              <h2 class="f36">精确筛序</h2>
            </div>
            <div class="new-filter-list" ref="abcd">
              <ul class="pb-200" style="overflow-y: scroll">
                <li class="mb-20 border-top border-bottom bg-fff">
                  <p class="filter-title lh-48 f32 color-000 border-bottom px-30 py-30">交易方式</p>
                  <div class="clearfix new-filter-item p-30">
                    <a @click="click_jy(jy,index)" v-for="(jy,index) in coins_jy" class="mr-20 border" :class="{active:active_jy==index}">{{jy.name}}</a>

                  </div>
                </li>

                <li class="mb-20 border-bottom border-top bg-fff" v-if="race">
                  <p class="filter-title lh-48 f32 color-000 border-bottom px-30 py-30">阵营</p>
                  <div class="clearfix new-filter-item p-30">
                    <a @click="click_zhenying(zy,index)" v-for="(zy,index) in coins_zy" class="mr-20 border" :class="{active:active_zy==index}">{{zy.name}}</a>

                  </div>
                </li>




                <li class="mb-20 border-bottom border-top bg-fff">
                  <p class="filter-title lh-48 f32 color-000 border-bottom px-30 py-30">价格区间</p>
                  <div class="clearfix new-filter-item p-30">
                    <input class="border f30 text-center fl bg-faf" type="tel" placeholder="最低价" v-model="coins_min" v-on:focus="coins_focus" v-on:blur="coins_blur"/>
                    <span class="fl span-zhi text-center f50">-</span>
                    <input class="border f30 text-center fl bg-faf" type="tel" placeholder="最高价" v-model="coins_max" v-on:focus="coins_focus" v-on:blur="max_blur"/>
                  </div>

                  <div class="clearfix new-filter-item pb-30 px-30">
                    <a @click="click_qujian(qujian,index)" v-for="(qujian,index) in coins_qujian" class="border" :class="{active:active0==index,'mr-20':index===0||index===1||index===3||index===4,'mb-20':index===0||index===2||index===3}">{{qujian.name}}</a>
                  </div>



                </li>
                <li class="border-bottom border-top bg-fff">
                  <p class="filter-title lh-48 f32 color-000 border-bottom px-30 py-30">保障服务</p>
                  <div class="clearfix new-filter-item p-30">
                    <a @click="click_bz1(bz,index)" v-for="(bz,index) in coins_bz1" class="border mr-20 mb-20" :class="{active:active1}">{{bz.name}}</a>
                    <a @click="click_bz2(bz,index)" v-for="(bz,index) in coins_bz2" class="border" :class="{active:active2==index,'mr-20':index===0,'mr-2':index===1,'mb-20':index!=2}">{{bz.name}}</a>
                  </div>
                </li>
                <!--<li class="filter-confirm clearfix" ref="abc">-->
                <!--<a class="reset text-center f32 fl color-m1 bg-fff"  @click="sx_chognzhi">重置</a>-->
                <!--<a class="sure text-center f32 fl bg-f54 color-fff" @click="sx_true">确定</a>-->
                <!--</li>-->
              </ul>

            </div>
            <div class="fixed-bottom p-30 bg-fff border-top new-filter-confirm" ref="coins_button">
              <a class="reset text-center f32 fl color-666 bg-f6" @click="sx_chognzhi">重置</a>
              <a class="sure text-center f32 fl bg-f54 color-fff" @click="sx_queding">确定</a>
            </div>
          </div>
          <!-- top -->

        </div>
      </transition>
    </div>


  </div>
</template>
<script>
  import TradeChoice from "./TradeChoice.vue"
  export default{
    name: "TradeSort",
    data(){
      return {
        race:false,
        hideCover:false,
        coins_top: false,
        items_lx: false,
        active_store:0,
        class_yx:true,
        active:0,
        items_dj: false,
        active_dj:0,
        class_dj:false,
        class_sx:false,
        items_sx:false,
        coins_dj: '单价最低',
        coins_panduan:false,
        active_jy:-1,
        coins_min: '',
        coins_max:'',
        active_bz:[],
        scroll:0,
        attr:0,
        active0:-1,
        tradeHide:false,
        coins_qujian:[
          {
            name: '50元以下',
          },
          {
            name: '50-100元',
          },
          {
            name: '100-300元',
          },
          {
            name:'300-500元',
          },
          {
            name:"500-1000元",
          },
          {
            name:'1000元以上',
          }

        ],
        sorts:[],
        sorts_dj:[
          {
            name:'单价最低'
          },
          {
            name:'总价最低'
          },
          {
            name:'总价最高'
          },
          {
            name:'最新发布'
          }
        ],
        coins_jy:[
          {
            name:'寄售交易'
          },
          {
            name:'担保交易'
          }

        ],
        coins_bz1:[
          {
            name:'无货赔付',
          },
        ],
        active1:false,
        coins_zy:[
          {
            name:'联盟',
          },
          {
            name:'部落',
          },
        ],
        active_zy:-1,
        coins_bz2:[
          {
            name:'本商品可投保',
          },
          {
            name:'本商品已投保',
          },
          {
            name:'安心买',
          },
        ],
        active2:-1,
        tObject:{},
        tAttrpei:[],
        jiaoyiAttr:[],
        zhenyingAttr:[],
        tAttrbz:[],
        clientheight : window.screen.height,
        class_qufu:false,
      }
    },
    props:["isHide"],

    components: {
      "trade-choice": TradeChoice,
    },
    methods: {
      getHeightClass(){
        return 'line-40-'+this.sorts.length
      },
      hideClick:function () {
        this.hideCover = false;
        this.items_lx =false;
        this.items_dj =false;
        this.tradeHide = false
      },
      qufuNameId:function (str) {
        this.qufuNameIdObject = str
      },
      qufuName:function (str) {
        this.isChoice = str
      },
//      区服选项点击
      trade_qufu(){



        this.class_yx=false;
        this.class_dj =false;
        this.items_lx =false;
        this.items_dj =false;
        this.items_sx = false;
        this.class_sx = false;

        this.class_qufu =true;

        if(this.tradeHide==true){
          this.tradeHide = false;
          this.hideCover = false;
          document.body.style.overflow='visible';

        }else{
          this.tradeHide = true;
          document.body.style.overflow='hidden';
          this.hideCover = true;
          setTimeout(()=>{
            if(document.getElementsByClassName("scrollClass")[0] && document.getElementById("ulTrade")){
              document.getElementById("ulTrade").scrollTop =document.getElementsByClassName("scrollClass")[0].offsetTop - document.getElementsByClassName("scrollClass")[0].offsetHeight
              console.log('---00000---',document.getElementsByClassName("scrollquClass")[0].offsetTop)
              document.getElementById("quTrade").scrollTop =document.getElementsByClassName("scrollquClass")[0].offsetTop - document.getElementsByClassName("scrollquClass")[0].offsetHeight
            }


          },10)

        }

      },
      click_qujian(qujian,index){
        if(this.active0 == index){
          this.active0 = -1;
          this.coins_min = ''
          this.coins_max = ''

        }else{
          this.active0 = index;
          if(qujian.name=="50元以下"){
            this.coins_min = 0
            this.coins_max = 50
          }else if(qujian.name=="50-100元"){
            this.coins_min = 50
            this.coins_max = 100
          }else if(qujian.name=="100-300元"){
            this.coins_min = 100
            this.coins_max = 300
          }else if(qujian.name=="300-500元"){
            this.coins_min = 300
            this.coins_max = 500
          }else if(qujian.name=="500-1000元"){
            this.coins_min = 500
            this.coins_max = 1000
          }else if(qujian.name=="1000元以上"){
            this.coins_min = 1000
            this.coins_max = 999999
          }

        }
      },
      hide(){
        this.items_lx =false;
        this.items_dj = false;
        this.class_yx=false;
        this.class_dj =false;
        this.class_qufu =false;
        this.tradeHide = false
      },
      //游戏币点击发生跳转
      coins_type(){
//        if(document.getElementById("hidessbox").style.display=="block"){
//          document.getElementById("hidessbox").style.display = "none"
//        }else{
//
//        }


        this.class_yx=true;
        this.class_sx = false;
        this.class_dj =false;
        this.class_qufu =false;
        this.tradeHide = false

        setTimeout(()=>{
          if(document.getElementsByClassName("scrolldj")[0] && document.getElementById("djbox")){
            document.getElementById("djbox").scrollTop =document.getElementsByClassName("scrolldj")[0].offsetTop
          }

        },10)



        if (this.items_lx == false) {
          this.items_dj = false;
          this.items_lx = true;
          this.hideCover = true

        } else {
          this.items_lx = false;
          this.hideCover = false

        }
      },
      //单价点击发生跳转
      coins_danjia(){
        if(this.hideCover == true){
          this.hideCover = false
        }else{
          this.hideCover = true
        }
        this.class_qufu =false;
        this.tradeHide = false
        this.coins_panduan = true;
//        if(document.getElementById("hidessbox").style.display=="block"){
//          document.getElementById("hidessbox").style.display = "none"
//        }else{
//          document.getElementById("hidessbox").style.display = "block"
//        }
        this.class_yx=false;
        this.class_sx = false;
        this.class_dj =true;


        if (this.items_dj == false) {
          this.items_lx = false;
          this.items_dj = true;
          this.hideCover = true

        } else {
          this.items_dj = false;
          this.hideCover = false;

        }
      },
      //筛选点击发生跳转
      coins_shaixuan(){
        this.hideCover = false;
        this.class_yx=false;
        this.class_dj =false;
        this.items_lx =false;
        this.items_dj =false;
        this.items_sx = true;
        this.class_sx = true;
        this.tradeHide = false;
        this.class_qufu =false;

        if(this.str_ceshi){
          console.log('woshixinlai-----------dfd',this.$store.state.coins)
          if(this.$store.state.coins.namesx.jiaoyi){
            if(this.$store.state.coins.namesx.jiaoyi[0]=="寄售交易"){
              this.active_jy = 0;
            }else if(this.$store.state.coins.namesx.jiaoyi[0]=="担保交易"){
              this.active_jy = 1;
            }
          }else{
            this.active_jy = -1;
          }
          if(this.$store.state.coins.namesx.coins_max!=""){
            if(this.$store.state.coins.namesx.coins_max==undefined){

              this.$store.state.coins.namesx.coins_max = 999999
            }
            this.coins_max = this.$store.state.coins.namesx.coins_max;

          }else{

          }
          if(this.$store.state.coins.namesx.coins_min!=""){
            if(this.$store.state.coins.namesx.coins_min==undefined){
              this.$store.state.coins.namesx.coins_min = 0
            }
            this.coins_min = this.$store.state.coins.namesx.coins_min;
          }else {
            this.coins_min = 0
          }
          if(this.coins_min==0&&this.coins_max==50){
            this.active0 = 0
          }else if(this.coins_min==50&&this.coins_max==100){
            this.active0 = 1
          }else if(this.coins_min==100&&this.coins_max==300){
            this.active0 = 2
          }else if(this.coins_min==300&&this.coins_max==500){
            this.active0 = 3
          }else if(this.coins_min==500&&this.coins_max==1000){
            this.active0 = 4
          }else if(this.coins_min==1000&&this.coins_max==999999){
            this.active0 = 5
          }else{
            this.active0 = -1
          }

          if(this.$store.state.coins.namesx.baozhang1){
            if(this.$store.state.coins.namesx.baozhang1[0]=="无货赔付"){
              this.active1 = true;
            }
          }else{
            this.active1 = false;
          }

          if(this.$store.state.coins.namesx.baozhang){
            if(this.$store.state.coins.namesx.baozhang[0]=="本商品可投保"){
              this.active2 = 0;
            }else if(this.$store.state.coins.namesx.baozhang[0]=="本商品已投保"){
              this.active2 = 1;
            }else if(this.$store.state.coins.namesx.baozhang[0]=="安心买"){
              this.active2 = 2;
            }
          }else{
            this.active2 = -1;
          }
          if(this.coins_min===0&&this.coins_max==999999){
            this.coins_min="";
            this.coins_max=""
          }

        }

//        this.active_jy = -1;
//        this.active_zy = -1;
//        this.active_bz = [];
//        this.coins_min = '';
//        this.coins_max = '';
//        this.tObject = {};
//        this.active1 = false;
//        this.active2 = -1;
//        this.tAttrbz=[];
//        this.tAttrpei=[];
//
//        this.active0 = -1;


//        document.body.style.overflow='hidden';
      },
      //筛选确定
      sx_true(){


        this.items_sx=false;
//        document.body.style.overflow='visible';
      },
      sx_queding(){

        this.str_ceshi = true;


        this.items_sx=false;
        document.body.style.overflow='visible';
        if(this.active_jy==0){
          this.jiaoyiAttr=['寄售交易'];
          this.tObject.jiaoyi = this.jiaoyiAttr;
        }else if(this.active_jy==1){
          this.jiaoyiAttr=['担保交易'];
          this.tObject.jiaoyi = this.jiaoyiAttr;
        }else{
          delete(this.tObject["jiaoyi"]);
        }
        if(this.active1 == true){
          this.tAttrpei = ['无货赔付']
          this.tObject.baozhang1 = this.tAttrpei;
        }else{
          delete(this.tObject["baozhang1"]);
        }
        if(this.active2==0){
          this.tAttrbz = ['本商品可投保']
          this.tObject.baozhang = this.tAttrbz;
        }else if(this.active2==1){
          this.tAttrbz=['本商品已投保'];
          this.tObject.baozhang = this.tAttrbz;
        }else if(this.active2==2){
          this.tAttrbz=['安心买'];
          this.tObject.baozhang = this.tAttrbz;
        }else{
          delete(this.tObject["baozhang"]);
        }

        if(this.coins_max ==""){
          if(this.coins_min ===""){

          }else{
            this.coins_max = 999999
            this.tObject.coins_max = 999999
          }
        }
        var temp = JSON.parse(JSON.stringify(this.tObject));
        this.$store.commit("SET_DJNAME",temp)



//        if(JSON.stringify(this.tObject) != "{}"){
//          this.$emit('sort',this.tObject)
//        }
        this.$emit('sort',this.tObject)
      },
      sx_chognzhi(){
        this.str_ceshi = false;
        this.active_jy = -1;
        this.active_zy = -1;
        this.active_bz = [];
        this.coins_min = '';
        this.coins_max = '';
        this.tObject = {};
        this.active1 = false;
        this.active2 = -1;
        this.tAttrbz=[];
        this.tAttrpei=[];

        this.active0 = -1;

        this.$emit('sort',this.tObject)
//        this.coins_bz = [
//          {
//            name:'无货赔付',
//
//          },
//          {
//            name:'本商品可投保',
//
//          },
//          {
//            name:'本商品已投保',
//
//          },
//          {
//            name:'安心买',
//
//          },
//
//        ];
      },
      clientmenu(){
        this.resize = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if(this.resize<500){
          this.$refs.coins_button.style.position = 'relative'

        }else{
          this.$refs.coins_button.style.position = 'absolute'
        }
      },
      menu(){
        this.scroll = document.body.scrollTop;
        // console.log(document.getElementById('sortbox').offsetHeight+ document.getElementById('headId').offsetHeight);
//        console.log(document.getElementById('headId').offsetHeight);
//        if (this.scroll > 265||this.scroll==265) {
        //document.getElementById('sortbox').style.display="none"
        var nums = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        //var height = document.getElementById('sortbox').offsetHeight

        this.coins_top = true;
        //this.class_yx = true
//        } else {
        this.coins_top = true;
//          this.items_lx=false;
//          this.items_dj=false;
//          this.items_sx=false;
//          this.class_yx=false;
//          this.class_dj =false;
//        }
//        if(this.scroll==0){
//          document.getElementById('sortbox').style.display="block"
//          this.coins_top = false;
//        }
      },
      sortclick(sort,index){
        //this.active = index;
        //this.hideCover=false,
       this.active_store = index
       console.log(sort,index)
        //this.items_lx=false;
        this.class_yx=true;
        this.class_dj =false;
        if(sort.name=="装备"){
          this.$router.push({
            name:'EquipmentList',
            params:{
              gameId:this.$route.query.gid,
              gameName:this.$route.query.gname,
              goodsType:1,
            }
          })
        }
        else if(sort.name=="游戏帐号"){
          location.href = '/vue/pcGoodsList/' +this.$route.query.gid+'/'+this.$route.query.gname+'/'+2
        }else if(sort.name=="游戏币"){
            location.href = '/vue/coins-type/list-coins?'+
               'areaname=' + this.$route.query.areaname +
                '&gameType=' +this.$route.query.gameType +
                '&servername='+this.$route.query.servername +
                '&serverid='+this.$route.query.serverid +
                '&areaid='+this.$route.query.areaid +
                '&gid='+this.$route.query.gid +
                '&gname='+this.$route.query.gname +
                 '&goodsType='+sort.tradeType+
              '&factionId='+(this.$route.query.factionId||'') +
            '&factionName='+(this.$route.query.factionName||'') +
            '&raceid='+(this.$route.query.raceid||'') +
            '&racename='+(this.$route.query.racename||'')

        }else if(sort.goodsType==65){
          location.href = '/rent/rent-list.html?' +
            'gameId='+ this.$route.query.gameId +
            '&gName='+ this.$route.query.gName +
            '&aName='+ this.$route.query.aName +
            '&areaId=' + this.$route.query.areaId +
            '&areaname=' + this.$route.query.areaname  +
            '&gameType=' + this.$route.query.gameType  +
            '&servername=' + this.$route.query.servername +
            '&serverid=' + this.$route.query.serverid +
            '&areaid=' + this.$route.query.areaid +
            '&gid=' + this.$route.query.gid+
            '&gname=' + this.$route.query.gname +
            '&goodsType=' +sort.goodsType +
            '&tradeType='+sort.tradeType+
            '&typename='+sort.name+
            '&factionId='+(this.$route.query.factionId||'') +
            '&factionName='+(this.$route.query.factionName||'') +
            '&raceid='+(this.$route.query.raceid||'') +
            '&racename='+(this.$route.query.racename||'')
        }else if(sort.tradeType==5){
          location.href = '/vue/trade-coins/trade-stone?' +
            'gameId='+ this.$route.query.gameId +
            '&gName='+ this.$route.query.gName +
            '&aName='+ this.$route.query.aName +
            '&areaId=' + this.$route.query.areaId +
            '&areaname=' + this.$route.query.areaname  +
            '&gameType=' + this.$route.query.gameType  +
            '&servername=' + this.$route.query.servername +
            '&serverid=' + this.$route.query.serverid +
            '&areaid=' + this.$route.query.areaid +
            '&gid=' + this.$route.query.gid+
            '&gname=' + this.$route.query.gname +
            '&goodsType=' +sort.goodsType +
            '&tradeType='+sort.tradeType+
            '&typename='+sort.name+
            '&factionId='+(this.$route.query.factionId||'') +
            '&factionName='+(this.$route.query.factionName||'') +
            '&raceid='+(this.$route.query.raceid||'') +
            '&racename='+(this.$route.query.racename||'')

//          this.$router.push({
//            name: "TradeStone",
//            query:{
//              gameId:this.$route.query.gameId,
//              gName:this.$route.query.gName,
//              aName:this.$route.query.aName,
//              areaId:this.$route.query.areaId,
//              areaname:this.$route.query.areaname,
//              gameType: this.$route.query.gameType,
//              servername: this.$route.query.servername,
//              serverid: this.$route.query.serverid,
//              areaid: this.$route.query.areaid,
//              gid: this.$route.query.gid,
//              gname: this.$route.query.gname,
//              goodsType:sort.goodsType,
//              tradeType:sort.tradeType,
//              typename:sort.name
//            }
//          })
        }
//        this.$emit("storeType",sort.goodsType)



      },
      sort_dj(sort,index){
        this.hideCover =false
        this.active_dj = index;
        this.items_dj = false;
        this.coins_dj  = sort.name;
        this.class_dj = true;
        this.class_yx=false;
        this.class_dj =true;
        this.$emit('dj',sort.name)
      },
      click_jy(jy,index){
        if(this.active_jy==index){
          this.active_jy = null;
          this.jiaoyiAttr=[];
          delete(this.tObject["jiaoyi"]);

        }else{
          this.active_jy = index;
          this.jiaoyiAttr=[jy.name];
          this.tObject.jiaoyi = this.jiaoyiAttr;
        }


      },
      click_zhenying(zy,index){
        if(this.active_zy==index){
          this.active_zy = null;
          this.zhenyingAttr=[];
          delete(this.tObject["zhenying"]);

        }else{
          this.active_zy = index;
          this.zhenyingAttr=[zy.name];
          this.tObject.zhenying = this.zhenyingAttr;
        }
      },
//      保障服务按钮

      click_bz1(bz,index){
        if(this.active1 == true||this.active1=="true"){
          this.active1 = false;
          this.tAttrpei = [];
          delete(this.tObject["baozhang1"]);
        }else{
          this.active1 = true;
          this.tAttrpei = [bz.name]
          this.tObject.baozhang1 = this.tAttrpei;
        }

      },
      click_bz2(bz,index){
        if(this.active2 == index){
          this.active2 = null;
          this.tAttrbz=[];
          delete(this.tObject["baozhang"]);
        }else{
          this.active2 = index;
          this.tAttrbz = [bz.name]
          this.tObject.baozhang = this.tAttrbz;
        }



      },
//      click_bz(bz,index){
//
//        if(bz.isTrue==false){
//          if(bz.name == "无货赔付"){
//            bz.isTrue=true;
//            this.tAttr.push(bz.name)
//          }else {
//
//            this.tAttr.push(bz.name)
//          }
//        }else{
//          bz.isTrue=false;
//          this.tAttr.forEach((a,b)=>{
//
//            if(a==bz.name){
//                this.tAttr.splice(b,1)
//            }
//          })
//
//        }
//        console.log(this.tAttr)
//        this.tObject.baozhang = this.tAttr
//        console.log(this.tObject)
//      },
      coins_focus(){
        this.active0 = -1
//        this.coins_button = false
        // this.$refs.coins_button.style.position = 'relative'

      },
//      单机失去焦点
      coins_blur(){

        var str_max = this.coins_max
        var str_min = this.coins_min
//          this.coins_max = Number(this.coins_max)

        if(this.coins_max===""){
          this.coins_max = ""
        }else{
          if(Number(this.coins_max) <Number(this.coins_min)){
            this.coins_max=str_min
            this.coins_min=str_max
          }
        }






//        console.log(this.coins_min)
//        this.coins_min = Number(this.coins_min)
      },
      max_blur(){

        var str_max = this.coins_max
        var str_min = this.coins_min
//          this.coins_max = Number(this.coins_max)
        if(this.coins_max===""){
          this.coins_max=""
        }else{
          if(Number(this.coins_max) <Number(this.coins_min)){
            this.coins_max=str_min
            this.coins_min=str_max
          }
        }


//          this.coins_max = Number(this.coins_max)
//        if(Number(this.coins_max) <Number(this.coins_min)){
//          this.coins_max=""
//        }
      }
    },
    watch:{
      isHide:function (val,oldval) {
        if(val == true){
          this.items_lx = false;
          this.items_dj = false;
          this.tradeHide = false;
          this.$parent.isHide = false;
        }
      },
      coins_min:function (val, oldVal) {
        if (val == "") {
          delete this.tObject.coins_min;
          return
        }
        //var patrnNum = /^\d+(\.\d{1,2}|\.)?$/;
        var patrnNum = /^([1-9]\d*|0)(\.\d*[1-9])?$/;
        if (patrnNum.test(val)) {
          if(val>999999){
            this.coins_min = 999999
          }else{
            this.coins_min = val
          }
        } else {
          this.coins_min = oldVal
        }
        this.tObject.coins_min = this.coins_min;

      },
      coins_max:function (val, oldVal) {
        if (val == "") {
          delete this.tObject.coins_max;
          return
        }
        //var patrnNum = /^\d+(\.\d{1,2}|\.)?$/;
        var patrnNum = /^([1-9]\d*|0)(\.\d*[1-9])?$/;
        if (patrnNum.test(val)) {
          if(val>999999){
            this.coins_max = 999999
          }else{
            this.coins_max = val
          }
        } else {
          this.coins_max = oldVal
        }
        this.tObject.coins_max = this.coins_max;

      },
      setScreenHeight(){
        screenHeight= Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      }
    },
    created(){
      if(this.$route.query.racename=="联盟"||this.$route.query.racename=="部落"){
        this.race = true
      }
      if(this.$route.query.factionName=="联盟"||this.$route.query.factionName=="部落"){
        this.race = true
      }
      this.$http.get(this.$CONSTANTS.APICategory + "category/searchgoodstypebygameid",{
        params: {gameId: this.$route.query.gameId},
      }).then((res)=>{
        console.log(res.body.goodsTypeList)
        if(res.body.responseStatus.code=="00"){
//          this.sort.name
          let atrr = [];
          var i = 0;
          res.body.goodsTypeList.forEach((a,b,c)=>{
            let temp = {};
            console.log(a.goodsTypeName,b,c)
            temp.name = a.goodsTypeName
            temp.goodsType = a.goodsType
            temp.tradeType = a.tradeType
            if(this.$route.query.typename == a.goodsTypeName){
              this.active_store = b
            }

//            this.this.active_store =
            atrr.push(temp)

          })
          console.log("dsfsdfsdf",atrr)
          this.sorts = atrr
//          for (var key in res.body.goodsTypeList) {
//            console.log('------------',res.body.goodsTypeList[key])
//              temp.name = res.body.goodsTypeList[key].goodsTypeName;
//            console.log('fdsfsdaf-----------',temp)
//            this.sorts.push(temp)
//          }


//          sorts:[
//            {
//              name:'游戏币'
//            },
//            {
//              name:'装备'
//            },
//            {
//              name:'帐号'
//            }
//
//          ],

        }
      })
    },
    mounted(){

      window.addEventListener('scroll', this.menu);
      window.addEventListener('resize',this.clientmenu);
//    if(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) <500 ){
//        alert(1)
//    }
      // console.log("55555555",Math.max(document.documentElement.clientHeight, window.innerHeight || 0))

    },

  }


</script>
<style scoped>

  .list-select{
    /*position: fixed!important;*/
    /*top: .96rem!important;*/
  }
  .list-select .select-midd {
    z-index: 2!important;
    float: left!important;
    width: 25%!important;
    box-sizing: border-box;
  }
  .line-40-1{
    max-height: 5.4rem;
    overflow-y: scroll;
  }


  .fade-enter-active {
    transition:.2s ease;
    overflow: hidden;
  }
  .fade-enter,.fade-leave-active {
    height: 0rem;
  }




  .fadeRight-enter-active {
    transition:.5s ease;
    height: 9.4rem;
    overflow: hidden;
  }
  .fadeRight-leave-active {
    transition:0s ease;
    height: 0rem;
    overflow: hidden;
  }
  .fadeRight-enter{
    height: 0rem;
  }
  .fadeRight-leave {
    height: 9.4rem;
  }

  .fade_dj-enter-active {
    transition:.2s ease;
    height: 3.93rem;
    overflow: hidden;
  }
  .fade_dj-leave-active {
    transition:0s ease;
    height: 0rem;
    overflow: hidden;
  }
  .fade_dj-enter{
    height: 0rem;
  }
  .fade_dj-leave {
    height: 3.93rem;
  }


  .fade_sx-enter-active {
    transition: all .3s ease;
  }
  .fade_sx-leave-active {
    transition: all .3s ease;
  }
  .fade_sx-enter, .fade_sx-leave-active {
    transform: translateX(100%);
  }

  .top-header{
    width: auto!important;
  }

  .filter-mask{
    z-index: 100!important;
  }
  .filter-content{
    z-index: 101!important;
    height: 100vh;
    position: fixed;
    top: 0;
    max-width: 768px;
    width: 100%;
    margin-left: 0;
  }

  .filter-confirm{
    background: #fff;
    position: absolute;
    width: 100%;
  }

  .default_numb{
    display: block!important;
    height: auto!important;
    top:0.96rem;
    position: absolute!important;
    border-top: 1px solid #e8e8e8;
  }
  /*.mstfiv {*/
  /*position: fixed;*/
  /*top:0rem;*/
  /*}*/

  .mstfiv {
    position: fixed;
    top:1.92rem!important;
  }
/*区服测试*/

  .list-select .select-main .qufu {
    width: .26rem;
    height: .26rem;
    display: inline-block;
    background: url(~images/down3.png) center center no-repeat;
    margin: 0px auto;
    background-size: .25rem;
  }
  .list-select .select-main .active .qufu {
    width: .26rem;
    height: .26rem;
    display: inline-block;
    background: url(~images/up.png) center center no-repeat;
    margin: 0px auto;
    background-size: .24rem;
  }



</style>
