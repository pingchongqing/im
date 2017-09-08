<template>

  <!---------------------------- 角色信息 ---------------------------->
  <div id="coins" class="js-msg mt-20 bg-fff clearfix" style="margin-bottom: 1.5rem">


    <ul class="bg-fff">
      <li class="w-100 border-bottom clearfix lh110 px-30 f32 pr">
        <span class="f32">收货角色名</span>
        <input class="coin-input lh110 pa" style="width: 57%" type="text" name="" value="" id="username"
               v-model="receiver" @click="showCoins()"
               placeholder="请输入接收游戏币的角色名"/>
        <i class="pa" v-if="isTrue" id="divselect" maxlength="50" @click="show()"><img src="~images/coins/coinuser.png"/></i>
      </li>

      <li class="w-100 border-bottom clearfix lh110 px-30 f32 pr" v-if="Isshouhuo">
        <span class="f32">收货角色等级</span>
        <input class="coin-input lh110 pa" type="tel"  v-model="way_dengji" placeholder="请填写收货角色等级"/>
      </li>

      <li class="w-100 border-bottom clearfix lh110 px-30 f32 pr" v-if="Isjuese">
        <span class="f32">角色数字ID</span>
        <input class="coin-input lh110 pa" type="text" maxlength="20" v-model="way_juese" placeholder="请填写角色数字ID"/>
      </li>


      <li v-if="coin_ico" class=" select-qufu clearfix f32 pl-30" @click="trade_qufu">
        <span class="f32">交易区服</span>
        <input class="coin-input lh110 pa" disabled="" type="text" name="" placeholder="请选择交易区服" :value="qu_input+''+fu_input" style="
                     white-space: nowrap;
                     text-overflow: ellipsis;
                     overflow: hidden;
                     padding-right: .3rem;">
        <span class="to-right"></span>
      </li>

      <li class=" select-mode clearfix f32 pl-30" @click="trade_way" v-if="fangshis">
        <span class="f32">交易方式</span>
        <input class="coin-input lh110 pa" disabled="" type="text" name="" v-model="way_input">
        <span id="toRight" class="to-right"></span>
      </li>

      <li class=" select-mode clearfix f32 pl-30" @click="zy_way" v-if="zhenyings">
        <span class="f32">阵营</span>
        <input class="coin-input lh110 pa" disabled="" type="text" name="" v-model="zy_input">
        <span class="to-right"></span>
      </li>

      <li class="w-100 border-bottom clearfix lh110 px-30 f32 pr">
        <span class="f32">我的手机号</span>
        <input class="coin-input lh110 pa" type="tel" name="" id="phoneFrom" v-model="phoneName"
               placeholder="请输入手机号"/>
      </li>
      <li class="w-100 border-bottom clearfix lh110 px-30 f32 pr">
        <span class="f32">我的QQ号</span>
        <input class="coin-input lh110 pa" type="tel" name="" id="QQFrom" v-model="qqName"
               placeholder="请输入QQ号"/>
      </li>
    </ul>
    <div id="coinsbox">
      <drop-down :xianshi="xianshi" @change="xianshi = !xianshi" v-on:ee="incrementTotal" v-on:ff="mobileNumberTotal"
                 :role-list="roleList"
                 v-on:gg="qqNumberTotal"></drop-down>
    </div>


    <!--选择区服开始-->
    <transition name="trade-fade">
      <div class="qufu-box fadeUp border-top bg-fff" v-if="coins_qufu">
        <div class="title border-bottom">
          <h2>交易区服</h2>
          <span class="icon-close" @click="dialog_zl"></span>
        </div>
        <div class="select-area clearfix">
          <div class="select-left fl">
            <div @click="qu_move()" class="select-name color-000 f36 text-center" style="position: relative">
              <span>选择区
                <transition name="insss_qu">
                 <span v-if="isinline" style="width: 100%;height: 2px;position: absolute;left: 0;bottom: 0;" :class="{inline:isinline}" ></span>
               </transition>
              </span>
            </div>
            <div class="select-item f30 color-666">
              <ul style="height: 4.36rem;">
                <li style="border-bottom: 0;text-align: center" @click="quAaa(list,index)" :class="{active:quActive==index}" v-for="(list,index) in qu_list"><span>{{list}}</span></li>
              </ul>
            </div>
          </div>
          <div class="fl line1 border-bottom"></div>
          <transition name="fu_fades">
            <div class="select-right fr" v-if="right_fu">
              <div @click="fu_move()" class="select-name color-000 f36 text-center" style="position: relative">
                <span>选择服
                  <transition name="insss">
                   <span v-if="!isinline" style="width: 100%;height: 2px;position: absolute;left: 0;bottom: 0;" :class="{inline:!isinline}" ></span>
                  </transition>
                </span>
              </div>
              <div class="select-item color-666 f30 ">
                <ul style="min-height: 2.36rem;">
                  <li style="
                  border-bottom: 0;
                  white-space: nowrap;
                   text-overflow: ellipsis;
                   overflow: hidden;
                   " @click="fuAaa(list,index)" :class="{active:fuActive==index}" v-for="(list,index) in fu_lsit"><span>{{list}}</span></li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <!--选择区服结束-->

    <!--选择交易方式开始-->
    <transition name="trade-fade">
      <div class="mode-box fadeUp border-top bg-fff"  v-if="coins_way">
        <div class="title border-bottom">
          <h2>交易方式</h2>
          <span class="icon-close" @click="dialog_zl"></span>
        </div>
        <div class="select-area clearfix">
          <div class="select-left fl">
            <div class="select-name color-000 f36 text-center" style="border-bottom: 2px solid #f75e46">
              <span>选择交易方式</span>
            </div>
            <div class="select-item f30 color-666">
              <ul style="overflow-y: hidden">
                <!--<li class="active"><span>拍卖行交易</span></li>-->
                <!--<li><span>等价物品交换</span></li>-->
                <li style="border-bottom: 0;text-align: center" @click="wayAaa(list,index)" :class="{active:wayActive==index}" v-for="(list,index) in way_list"><span>{{list}}</span></li>
              </ul>
            </div>
          </div>
          <div class="fl line2 border-bottom"></div>
        </div>
      </div>
    </transition>
    <!--选择交易方式结束-->


    <!--选择阵营方zy开始-->
    <transition name="trade-fade">
      <div class="mode-box fadeUp border-top bg-fff"  v-if="coins_zy">
        <div class="title border-bottom">
          <h2>阵营</h2>
          <span class="icon-close" @click="dialog_zl"></span>
        </div>
        <div class="select-area clearfix">
          <div class="select-left fl">
            <div class="select-name color-000 f36 text-center" style="border-bottom: 2px solid #f75e46">
              <span>选择阵营</span>
            </div>
            <div class="select-item f30 color-666">
              <ul style="overflow-y: hidden">
                <!--<li class="active"><span>拍卖行交易</span></li>-->
                <!--<li><span>等价物品交换</span></li>-->
                <li style="border-bottom: 0;text-align: center" @click="zyAaa(list,index)" :class="{active:zyActive==index}" v-for="(list,index) in zy_list"><span>{{list}}</span></li>
              </ul>
            </div>
          </div>
          <div class="fl line2 border-bottom"></div>
        </div>
      </div>
    </transition>
    <!--选择阵营方js-->



    <!---------------------------- 遮料层 ---------------------------->
    <div class="dialog_cover" v-if="dialog_cover" @click="dialog_zl"></div>
    <!--弹出框1-->
    <dialog-smbox v-if="smBox" :smbox="smboxMessage"></dialog-smbox>

  </div>
</template>

<script>
  import DropDown from "../../publicCoins/DropDown.vue"
  import Smbox from "../../coins/Smbox.vue"
  export default {
    name: "TradeForm",
    props: {
      url: {
        default: function () {
          return ''
        }
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        xianshi: false,
        receiver: '',
        phone: '',
        qqName: '',
        phoneName: "",
        dialog_cover: false,
        dialog_box2: false,
        smBox: false,
        smboxMessage: "",
        message: "",
        isTrue: false,
        coins_qufu:false,
        coins_way:false,
        way_dengji:'',
        way_input:"",
        way_list:["拍卖行交易", "当面交易"],
        zhenying:false,
        zhenyings:false,
        wayActive:null,
        qu_list:[],
        qu_input:"",
        quActive:null,
        quzhinput:null,
        fu_lsit:[],
        fu_input:"",
        fuActive:null,
        BizOfferId:this.$route.query.id,
        coins_zy:false,
        zy_list:['联盟','部落'],
        zyActive:0,
        zy_input:'联盟',

        isinline:true,
//        游戏服
        right_fu:false,
        totalstr:'',
        fangshis:false,//交易方式
        roleList: [],
//          isTrue:this.url == ''?false:true
        coin_ico:false,
        Isshouhuo:false,
        way_juese:'',
        Isjuese:false,
      }
    },
    components: {
      "drop-down": DropDown,
      "dialog-smbox": Smbox,
    },
    methods: {
//      遮料层
      dialog_zl:function () {
        this.coins_qufu=false;
        this.dialog_cover = false;
        this.coins_way = false;
        this.coins_zy = false
      },
      trade_qufu:function () {
        this.coins_qufu=true;
        this.dialog_cover = true
      },
//      交易方式点击
      trade_way:function(){
        this.coins_way = true;
        this.dialog_cover = true
      },
      zy_way:function () {
        this.coins_zy = true;
        this.dialog_cover = true
      },
      wayAaa:function (list,index) {
        this.wayActive = index;
        this.way_input = list;
        this.coins_way = false;
        this.dialog_cover = false
      },
      quAaa:function (list,index) {
        this.quActive = index;
        this.quzhinput = list;
        this.right_fu = true;
        this.isinline = false;
        this.fuActive = null;
        const attr = [];
        this.totalstr.ExchangeInfos.forEach((str)=> {
          if(str.GameAreaName == list){
            this.$parent.GameAreaId = str.GameAreaId
            attr.push(str.GameServerName)
          }
        });


        this.fu_lsit = attr

//        if(list.name=="挑战"){
//          this.fu_lsit =  [
//            {name:'赵岩'},
//            {name:'吃饭'},
//            {name:'新人'},
//            {name:'工资'},
//            {name:'基金'}
//          ]
//
//        }else{
//          this.fu_lsit =  []
//        }


      },
      fuAaa:function (list,index) {
        this.fuActive = index;
        this.qu_input = this.quzhinput
        this.fu_input = '  '+list;
        this.coins_qufu = false;
        this.dialog_cover = false;
        if(this.totalstr.ExchangeInfos){
          this.totalstr.ExchangeInfos.forEach((str)=> {
//            console.log("-------------str-----------",str)
            if(str.GameServerName == list){
              this.$parent.GameServerId = str.GameServerId
              localStorage.setItem('GameServerId',str.GameServerId)
            }
          })
        }

      },
      zyAaa:function (list,index) {
        this.zyActive = index;
        this.zy_input = list;
        this.coins_zy = false;
        this.dialog_cover = false

      },
      qu_move:function () {
        this.isinline = true
      },
      fu_move:function () {
        this.isinline = false
      },

      showCoins:function () {
        this.xianshi = false;
      },
      show: function () {
        if(this.xianshi == true){
          this.xianshi = false;
        }else if(document.getElementById('drop_down').style.display == "none"){
          this.xianshi = true;
        }else{
          this.xianshi = true;
        }
        this.smBox = false;
      },
      incrementTotal: function (b) {

        this.receiver = b;
      },
      mobileNumberTotal: function (b) {

        this.phoneName = b;
      },
      qqNumberTotal: function (b) {

        this.qqName = b;
      },
      dialogBox2_hide: function () {
        this.smBox = false
      },


    },
    created(){
      //获取角色信息
      let coinsBoay= {
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
        this.$CONSTANTS.APIGoods+'/purchaseData/selectHistoryRole',
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
        if (res.data.responseStatus.code == '00') {
          let temp = [];
          for(var i=0;i<res.data.data.length;i++){
            if(i < 5){
              temp.push(res.data.data[i])
            }else{
              break;
            }
          }
          this.roleList = temp;
          if (res.body.data[0] != undefined) {
            this.receiver = res.body.data[0].roleName;
            this.qqName = res.body.data[0].qqNumber;
            this.phoneName = res.body.data[0].mobileNumber;

            if(res.body.data.length>1){
              this.isTrue = true;
            }

          } else {
            this.$getAccount().then(account => {
              if (account) {
//                this.phoneName = this.$getCookie("telephone");
                this.$http.get(this.$CONSTANTS.APILogin+"account/checkBindMobile").then(function (res) {
                  if(res.body.success == true){
                    this.phoneName = res.body.mobilePhone;
                  }
                });

                this.$emit("rouerId", account.pcUserId)
              } else {
                location.href = "/vue/login?returnUrl=" + encodeURIComponent(location.href);
              }
            });
//            this.phoneName = this.$getCookie("telephone");
            this.receiver = "";
            this.qqName = "";
            this.isTrue = false;
          }
        }
      }, () => {
      });
      //获取担保下单前接口
      if(this.$route.query.isJis == 1){
        this.$http.get(
          this.$CONSTANTS.APIMainGoods+'mainGoodsOrderConfig/getCreateOrderConfig',
          //         this.$CONSTANTS.APIMainGoods+'mainGoods/selectpcgoodsdetail',
          {
            params:{
              BizOfferId:this.BizOfferId,//发布单编号
            }
          },
          {
            headers: {
              contentType: "aplication/json; charset = UTF-8",
              dataType: 'json'
            }
          }
        ).then((res)=>{
          if(res.body.responseStatus.code == "00"){
            if(res.body.result){
              console.log("下单前配置",JSON.parse(res.body.result).BizResult);
              var str = JSON.parse(res.body.result).BizResult;
              this.Isshouhuo = str.IsSupportRoleGrade;
              this.Isjuese = str.IsSupportRoleId;
              console.log('-----------',this.Isjuese)
              this.totalstr = str;
              this.$emit('total',str);
//              this.qu_input = str.GameAreaName;
//              this.fu_input = str.GameServerName;
              if(str.GameRaceName){
                this.zhenying = true  //判断有没有阵营
                if(str.GameRaceName == "联盟"){
                  this.zyActive = 0
                }else{
                  this.zyActive = 1
                }
              }
              if(str.BuyMode.Key){
                //this.fangshi = true  //判断交易方式
                this.way_input = str.BuyMode.Key;//交易方式
                if(str.BuyMode.Key=="拍卖行交易"){
                  this.wayActive = 0
                }else{
                  this.wayActive = 1
                }
              }
              const attr = [];
              if(str.ExchangeInfos){
                this.coin_ico = true;
                str.ExchangeInfos.forEach((val)=> {
                  attr.push(val.GameAreaName);
                  this.fu_lsit.push(val.GameServerName)

                })
              }else{
                this.$parent.GameAreaId = undefined;
                this.$parent.GameServerId = undefined;
//                attr.push(str.GameAreaName)
//                this.fu_lsit.push(str.GameServerName)
                this.coin_ico = false;

              }

              var attrs = new Set(attr)
              this.qu_list = Array.from(attrs)
            }
          }

        },() => {
//             this.dialog_box = true;
//             this.dialog_cover = true;
//             this.boxMessage =  "系统异常，请稍后再试！"

        })
      }else{
        //寄售交易
        this.$http.get(
          this.$CONSTANTS.APIMainGoods+'mainGoodsOrderConfig/getJSOrderConfig',
          {
            params:{
              BizOfferId:this.BizOfferId,//发布单编号
            }
          },
          {
            headers: {
              contentType: "aplication/json; charset = UTF-8",
              dataType: 'json'
            }
          }
        ).then((res)=>{
          if(res.body.responseStatus.code == "00"){
            if(res.body.result){

              var str = JSON.parse(res.body.result).BizResult;
              this.Isshouhuo = str.IsSupportRoleGrade;
              this.Isjuese = str.IsSupportRoleId;
              this.totalstr = str;
              this.$emit('total',str);
              // this.titles = str.BizOfferName
//              this.qu_input = str.GameAreaName;
//              this.fu_input = str.GameServerName;
              if(str.GameRaceName){
                this.zhenying = true  //判断有没有阵营
                if(str.GameRaceName == "联盟"){
                  this.zyActive = 0
                }else{
                  this.zyActive = 1
                }
              }
              if(str.BuyMode.Key){
                //this.fangshi = true  //判断交易方式
                this.way_input = str.BuyMode.Key;//交易方式
                if(str.BuyMode.Key=="拍卖行交易"){
                  this.wayActive = 0
                }else{
                  this.wayActive = 1
                }
              }
              const attr = [];
              if(str.ExchangeInfos){
                this.coin_ico = true;
                str.ExchangeInfos.forEach((val)=> {
                  attr.push(val.GameAreaName)
                  this.fu_lsit.push(val.GameServerName)
                })
              }else{
                this.$parent.GameAreaId = undefined;
                this.$parent.GameServerId = undefined;
                this.coin_ico = false;
              }
              var attrs = new Set(attr);

              this.qu_list = Array.from(attrs)
//            this.qu_list = str.ExchangeInfos
            }
          }

        },() => {
//             this.dialog_box = true;
//             this.dialog_cover = true;
//             this.boxMessage =  "系统异常，请稍后再试！"

        })
      }



    },
    mounted()
    {
      this.$emit('formRoleName', this.receiver);
      this.$emit('formQqname', this.qqName);
      this.$emit('formPhoneName', this.phoneName);

      this.$emit('formDengji', this.way_dengji);
      this.$emit('formjuese', this.way_juese);
      this.$emit('formQufu', this.qu_input+this.fu_input);
      this.$emit('formWay', this.way_input);
      this.$emit('formZhenying', this.zy_input);

    },
    watch: {
      receiver(val, oldVal)
      {
//          if(val==""){
//            this.receiver=this.receiver.replace(/(^\s*)|(\s*$)/g, "");
//            return false
//          }
        if (val.length > 50) {
          this.receiver = oldVal
        } else {
          this.receiver = val
        }
        this.$emit('formRoleName', this.receiver)
      },
      qqName(val)
      {
        this.$emit('formQqname', this.qqName)
      },
      phoneName(val)
      {
        this.$emit('formPhoneName', this.phoneName)
      },
      way_dengji(val,oldVal){

        var patrn = /^[0-9]+$/;
        if (patrn.test(val)) {
          this.way_dengji = this.way_dengji
        } else {
          if(this.way_dengji===""){
            this.way_dengji = this.way_dengji
          }else{
            this.way_dengji = oldVal
          }

        }

        this.$emit('formDengji', this.way_dengji);
      },
      way_juese(val,oldVal){

        var patrn = /^[a-zA-Z0-9]+$/;
        if (patrn.test(val)) {
          this.way_juese = this.way_juese
        } else {
          if(this.way_juese===""){
            this.way_juese = this.way_juese
          }else{
            this.way_juese = oldVal
          }

        }
        this.$emit('formjuese', this.way_juese);
      },
      fu_input(val){
        this.$emit('formQufu', this.qu_input+this.fu_input);
      },
      way_input(val){
        this.$emit('formWay', this.way_input);
      },
      zy_input(val){
        this.$emit('formZhenying', this.zy_input);
      }

    },


  }
</script>
<style scoped>
  .bg-fff li{
    line-height: 0.5rem!important;
    padding-top: 0.3rem!important;
    padding-bottom: 0.3rem!important;
  }
  .bg-fff li input{
    line-height: 0.5rem!important;
  }
  .to-right{
    top: 0;
  }
  .clearfix .shade {
    top: 7.60rem !important;
  }

  .trade-fade-enter-active {
    transition: all .2s ease;
  }
  .trade-fade-leave-active {
    transition: all .2s ease;
  }
  .trade-fade-enter, .trade-fade-leave-active {
    transform: translateY(100%);
  }
  .select-left .select-item ul li.active span {
    display: inline-block;
    background-size: 0.38rem 0.3rem;
    color: #f75e46;
  }
  .select-name{
    border-bottom: 1px solid #e8e8e8;
  }
  .inline{
    border-bottom: 2px solid #f75e46;
  }

  .insss_qu-enter-active {
    transition: all .2s ease;
  }
  .insss_qu-leave-active {
    transition: all .2s ease;
  }
  .insss_qu-enter,.insss_qu-leave-active{
    transform: translateX(100%);
    opacity: 0;
  }


  .insss-enter-active {
    transition: all .2s ease;
  }
  .insss-leave-active {
    transition: all .1s ease;
  }
  .insss-enter ,.insss-leave-active {
    transform: translateX(-100%);
    opacity: 0;
  }


  .fu_fades-enter-active {
    transition: all .2s ease;
  }
  .fu_fades-leave-active {
    transition: all .2s ease;
  }
  .fu_fades-enter, .fades-leave-active {
    transform: translateX(-50%);
    opacity: 0;
  }
</style>
