<template>
    <!-- 下拉搜索 -->
    <div class="list-select bg-fff" id="coinssort_top">

      <div class="select-main fw">
        <div class="select-midd" id="select-midd">
          <a class="divs" @click="coins_type">
            <span :class="{active:class_yx}"><cite>游戏币</cite><i class="fith ml-10"></i></span>
          </a>
        </div>
        <!--单价-->
        <div class="select-midd" id="select-le">
          <a href="javascript:void(0);" class="divs" @click="coins_danjia">
            <span :class="{active:class_dj}"><cite>{{coins_dj}}</cite><i class="new_px ml-10"></i></span>
          </a>
        </div>
        <!--筛选-->
        <div class="select-midd" id="select-sx">
          <a href="javascript:void(0);" class="divs" @click="coins_shaixuan">
            <span :class="{active:class_sx}"><cite>筛选</cite><i class="new_sx ml-10"></i></span>
          </a>
        </div>
      </div>
      <!--商品类型-->

      <div class="default_numb" id="deaf">
        <transition name="fade">
          <ul v-if="items_lx">
            <li @click="sortclick(sort,index)" v-for="(sort,index) in sorts" :class="{active:active==index}"><a href="javascript:">{{sort.name}}</a></li>
          </ul>
        </transition>
        <!--单价-->
        <transition name="fade_dj">
          <ul v-if="items_dj">
            <li  @click="sort_dj(sort,index)" v-for="(sort,index) in sorts_dj" :class="{active:active_dj==index}"><a href="javascript:">{{sort.name}}</a></li>
          </ul>
        </transition>

        <!--<div class="mstfiv" v-if="items_lx||items_dj" @click="hide()"></div>-->

      </div>
      <!--筛选-->
      <div @touchmove.prevent>
        <div class="filter-mask"  v-show="items_sx" @click="sx_true" style="height: 100%;bottom:0"></div>
        <transition name="fade_sx">
        <div class="filter-content bg-fff" v-show="items_sx" style="height: 100%;overflow-y: scroll">
          <!-- top -->
          <div class="top-header border-bottom" v-show="items_sx">
            <div class="top-back">
              <a @click="sx_true">返回</a>
            </div>
            <h2 class="f36">筛选</h2>
          </div>
          <div class="filter-list" ref="abcd" style="height: auto;overflow-y: scroll">
            <ul class="" style="overflow-y: scroll">
              <li class="pt-30 pb-30">
                <p class="filter-title f32 color-000">交易方式</p>
                <div class="clearfix filter-item mt-20">
                  <a @click="click_jy(jy,index)" v-for="(jy,index) in coins_jy" class="mr-20" :class="{active:active_jy==index}">{{jy.name}}</a>

                </div>
              </li>
              <li class="pt-30 pb-30">
                <p class="filter-title f32 color-000">价格区间</p>
                <div class="clearfix filter-item mt-20">
                  <input class="border f30" type="tel" placeholder="最低价" v-model="coins_min" v-on:focus="coins_focus" v-on:blur="coins_blur"/>
                  <span class="fl text-center f42">-</span>
                  <input class="border f30" type="tel" placeholder="最高价" v-model="coins_max" v-on:focus="coins_focus" v-on:blur="max_blur"/>
                </div>
              </li>
              <li class="pt-30 pb-30">
                <p class="filter-title f32 color-000">保障服务</p>
                <div class="clearfix filter-item mt-20">
                  <a @click="click_bz1(bz,index)" v-for="(bz,index) in coins_bz1" class="mr-20 mb-20" :class="{active:active1}">{{bz.name}}</a>
                  <a @click="click_bz2(bz,index)" v-for="(bz,index) in coins_bz2" class="mr-20 mb-20" :class="{active:active2==index}">{{bz.name}}</a>
                </div>
              </li>
              <!--<li class="filter-confirm clearfix" ref="abc">-->
                <!--<a class="reset text-center f32 fl color-m1 bg-fff"  @click="sx_chognzhi">重置</a>-->
                <!--<a class="sure text-center f32 fl bg-f54 color-fff" @click="sx_true">确定</a>-->
              <!--</li>-->
            </ul>

          </div>
          <div class="filter-confirm clearfix" ref="coins_button">
            <a class="reset text-center f32 fl color-m1 bg-fff" @click="sx_chognzhi">重置</a>
            <a class="sure text-center f32 fl bg-f54 color-fff" @click="sx_queding">确定</a>
          </div>
        </div>
        </transition>
      </div>


    </div>
</template>
<script>
  export default{
    name: "CoinsSort",
    data(){
      return {
        coins_top: false,
        items_lx: false,
        class_yx:true,
        active:0,
        items_dj: false,
        active_dj:0,
        class_dj:false,
        class_sx:false,
        items_sx:false,
        coins_dj:'单价最低',
        coins_panduan:false,
        active_jy:-1,
        coins_min: '',
        coins_max:'',
        active_bz:[],
        scroll:0,
        attr:0,
        sorts:[
          {
           name:'游戏币'
          },
          {
            name:'装备'
          },
          {
            name:'帐号'
          }

        ],
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
        tAttrbz:[],
        clientheight : window.screen.height
      }
    },
    props:["isHide"],

    computed:{

    },
    methods: {
      hide(){
        this.items_lx =false;
        this.items_dj = false;
        this.class_yx=false;
        this.class_dj =false;
      },
      //游戏币点击发生跳转
      coins_type(){
//        if(document.getElementById("hidessbox").style.display=="block"){
//          document.getElementById("hidessbox").style.display = "none"
//        }else{
//          document.getElementById("hidessbox").style.display = "block"
//        }
        this.class_yx=true;
        this.class_sx = false;
        this.class_dj =false;
        this.$store.commit("class_yx",{class_yx:this.class_yx})
        this.$store.commit("class_dj",{class_dj:this.class_dj})
        this.$store.commit("class_sx",{class_sx:this.class_sx})
        if (this.items_lx == false) {
          this.items_dj = false;
          this.items_lx = true;
          document.getElementById("hidessbox").style.display = "block"

        } else {
          this.items_lx = false;
          document.getElementById("hidessbox").style.display = "none"
        }
      },
      //单价点击发生跳转
      coins_danjia(){
        this.coins_panduan = true;
//        if(document.getElementById("hidessbox").style.display=="block"){
//          document.getElementById("hidessbox").style.display = "none"
//        }else{
//          document.getElementById("hidessbox").style.display = "block"
//        }
        this.class_yx=false;
        this.class_sx = false;
        this.class_dj =true;
        this.$store.commit("class_yx",{class_yx:this.class_yx})
        this.$store.commit("class_dj",{class_dj:this.class_dj})
        this.$store.commit("class_sx",{class_sx:this.class_sx})
        if (this.items_dj == false) {
          this.items_lx = false;
          this.items_dj = true;
          document.getElementById("hidessbox").style.display = "block"
        } else {
          this.items_dj = false;
          document.getElementById("hidessbox").style.display = "none"
        }
      },
      //筛选点击发生跳转
      coins_shaixuan(){
        document.getElementById("hidessbox").style.display = "none";
          this.class_yx=false;
          this.class_dj =false;
          this.items_lx =false;
          this.items_dj =false;
          this.items_sx = true;
          this.class_sx = true;
        this.$store.commit("class_yx",{class_yx:this.class_yx})
        this.$store.commit("class_dj",{class_dj:this.class_dj})
        this.$store.commit("class_sx",{class_sx:this.class_sx})
          document.body.style.overflow='hidden';
      },
      //筛选确定
      sx_true(){
        this.items_sx=false;
        document.body.style.overflow='visible';
      },
      sx_queding(){
        this.$store.commit("sort_jy",{jy_index:this.active_jy})
        this.$store.commit("coins_min",{coins_min:this.coins_min})
        this.$store.commit("coins_max",{coins_max:this.coins_max})
        this.$store.commit("active1",{active1:this.active1})
        this.$store.commit("active2",{active2:this.active2})
        this.$store.commit("tObject",{tObject:this.tObject})
        //this.$store.commit("coins_max",{coins_max:this.coins_max})

        this.items_sx=false;
        document.body.style.overflow='visible';

//        if(JSON.stringify(this.tObject) != "{}"){
//          this.$emit('sort',this.tObject)
//        }
        this.$emit('sort',this.tObject)
      },
      sx_chognzhi(){

        this.active_jy = -1;
        this.active_bz = [];
        this.coins_min = '';
        this.coins_max = '';
        this.tObject = {};
        this.active1 = false;
        this.active2 = -1;
        this.tAttrbz=[];
        this.tAttrpei=[];
        this.items_sx=false;

        this.$store.commit("sort_jy",{jy_index:this.active_jy})
        this.$store.commit("coins_min",{coins_min:this.coins_min})
        this.$store.commit("coins_max",{coins_max:this.coins_max})
        this.$store.commit("active1",{active1:this.active1})
        this.$store.commit("active2",{active2:this.active2})
        this.$store.commit("tObject",{tObject:this.tObject})


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
        //console.log(this.scroll - document.getElementById('boxcoins').offsetTop)
        if(document.getElementById('sortbox')){
          if(this.scroll - document.getElementById('boxcoins').offsetTop>0){
            document.getElementById('coinssort_top').style.position="fixed";
            document.getElementById('coinssort_top').style.top="0.96rem";
          }else if(this.scroll - document.getElementById('boxcoins').offsetTop<-20){
            document.getElementById('coinssort_top').style.position="relative";
            document.getElementById('coinssort_top').style.top="0rem";
          }
        }
//        console.log("dsfdsf---------",document.getElementById('sortbox'))
//        if(this.scroll>document.getElementById('sortbox').offsetHeight){
//          document.getElementById('coinssort_top').style.position="fixed";
//          document.getElementById('coinssort_top').style.top="0.96rem";
//        }else{
//          document.getElementById('coinssort_top').style.position="relative";
//          document.getElementById('coinssort_top').style.top="0rem";
//        }
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
        document.getElementById("hidessbox").style.display = "none"
        this.items_lx=false;
        this.class_yx=false;
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
        }else if(sort.name=="帐号"){
          if(this.$route.query.gameType==2){
            //this.$router.push({path:'/vue/mobileGameList/'+this.$route.query.gid+'/'+this.$route.query.gname+'/'+this.$route.query.gameType})
            location.href = '/vue/mobileGameList/'+this.$route.query.gid+'/'+this.$route.query.gname+'/'+this.$route.query.gameType
          }else{
            location.href = '/vue/pcGoodsList/' +this.$route.query.gid+'/'+this.$route.query.gname+'/'+2
          }
        }else if(sort.name=="游戏币"){
              this.class_yx = true
        }
      },
      sort_dj(sort,index){
        document.getElementById("hidessbox").style.display = "none"
        this.active_dj = index;
        this.items_dj = false;
        this.coins_dj  = sort.name;
        this.class_dj = true;
        this.class_yx=false;
        this.class_dj =true;
        this.$store.commit("sort_paixu",{count:sort.name,index:index})
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
//        this.coins_button = false
       // this.$refs.coins_button.style.position = 'relative'

      },
//      单机失去焦点
      coins_blur(){
//        console.log(this.coins_min)
//        this.coins_min = Number(this.coins_min)
      },
      max_blur(){
//          this.coins_max = Number(this.coins_max)
          if(Number(this.coins_max) <Number(this.coins_min)){
            this.coins_max=""
          }
        }
      },
    watch:{
      isHide:function (val,oldval) {
        if(val == true){
          this.items_lx = false;
          this.items_dj = false;
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

  mounted(){
      if(this.$store.state.coins.kaiguan){
        this.$store.commit("kaiguan",{kaiguan:false})
        if(this.$store.state.coins&&this.$store.state.coins.class_yx){
          this.class_yx = this.$store.state.coins.class_yx;
          this.class_dj = this.$store.state.coins.class_dj;
          this.class_sx = this.$store.state.coins.class_sx;
        }else {
          this.$store.commit("class_yx",{class_yx:""})
        }
        if(this.$store.state.coins&&this.$store.state.coins.class_dj){
          this.class_yx = this.$store.state.coins.class_yx;
          this.class_dj = this.$store.state.coins.class_dj;
          this.class_sx = this.$store.state.coins.class_sx;
        }else {
          this.$store.commit("class_dj",{class_dj:""})
        }
        if(this.$store.state.coins&&this.$store.state.coins.class_sx){
          this.class_yx = this.$store.state.coins.class_yx;
          this.class_dj = this.$store.state.coins.class_dj;
          this.class_sx = this.$store.state.coins.class_sx;
        }else {
          this.$store.commit("class_sx",{class_sx:""})
        }

        if(this.$store.state.coins&&this.$store.state.coins.count){
          this.coins_dj = this.$store.state.coins.count;
          this.active_dj = this.$store.state.coins.index;
          this.$emit('dj2',this.coins_dj)
        }else {
          this.$store.commit("sort_paixu",{count:this.coins_dj,index:this.active_dj})
        }

        if(this.$store.state.coins&&this.$store.state.coins.jy_index||this.$store.state.coins.jy_index===0){
          this.active_jy = this.$store.state.coins.jy_index;
        }else {
          this.$store.commit("sort_jy",{jy_index:this.active_jy})
        }

        if(this.$store.state.coins&&this.$store.state.coins.coins_min){
          this.coins_min = this.$store.state.coins.coins_min;
        }else {
          this.$store.commit("coins_min",{coins_min:this.coins_min})
        }
        if(this.$store.state.coins&&this.$store.state.coins.coins_max){
          this.coins_max = this.$store.state.coins.coins_max;
        }else {
          this.$store.commit("coins_max",{coins_max:this.coins_max})
        }
        if(this.$store.state.coins&&this.$store.state.coins.active1){
          this.active1 = this.$store.state.coins.active1;
        }else {
          this.$store.commit("active1",{active1:this.active1})
        }
        if(this.$store.state.coins&&this.$store.state.coins.active2||this.$store.state.coins.active2===0){
          this.active2 = this.$store.state.coins.active2;
        }else {
          this.$store.commit("active2",{active2:this.active2})
        }
        if(this.$store.state.coins&&this.$store.state.coins.tObject){
          this.tObject = this.$store.state.coins.tObject;
          this.$emit('sort2',this.tObject)
        }else {
          this.$store.commit("tObject",{tObject:this.tObject})
        }
      }
      else{
        this.active_jy = -1;
        this.active_bz = [];
        this.coins_min = '';
        this.coins_max = '';
        this.tObject = {};
        this.active1 = false;
        this.active2 = -1;
        this.tAttrbz=[];
        this.tAttrpei=[];
        this.items_sx=false;
        this.coins_dj = '单价最低';
        this.active_dj = 0;

        this.$store.commit("sort_jy",{jy_index:this.active_jy})
        this.$store.commit("coins_min",{coins_min:this.coins_min})
        this.$store.commit("coins_max",{coins_max:this.coins_max})
        this.$store.commit("active1",{active1:this.active1})
        this.$store.commit("active2",{active2:this.active2})
        this.$store.commit("tObject",{tObject:this.tObject})
        this.$store.commit("sort_paixu",{count:this.coins_dj,index:this.active_dj})
      }





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

  .fade-enter-active {
    transition:.2s ease;
    height: 2.96rem;
    overflow: hidden;
  }
  .fade-leave-active {
    transition:0s ease;
    height: 0rem;
    overflow: hidden;
  }
  .fade-enter{
    height: 0rem;
  }
  .fade-leave {
    height: 2.96rem;
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
    transition: all 0s ease;
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






</style>
