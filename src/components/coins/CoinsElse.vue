<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <coins-head :title="$route.query.gname+'/'+$route.query.areaname+'/'+$route.query.servername"></coins-head>
    <!---------------------------- 金币信息 ---------------------------->
    <div class="mt-100 bg-f6 clearfix" @click="dropDrow_hide">
      <ul class="tab-2 clearfix">
        <li class="fl border-right text-center lh110 f28">
          <span class="color-888 mr-20">单价</span>
          <span v-if="unPrice">1元={{unPrice}}{{moneyName}}</span>
        </li>
        <li class="fl text-center lh110 f28">
          <span class="color-888 mr-20">库存</span>{{totalCount}}{{moneyName}}

        </li>
      </ul>
      <div class="bg-fff clearfix px-30 pr">
        <div class="fl lh110 w80 f32 color-000 coinsElse">购买数量<input class="coin-input lh110 pa" type="tel"
                                                           :placeholder="limitPrice" v-model="buyNum"
                                                           v-on:blur="Mybuynum"/></div>
        <div class="fr lh110 f32 color-000 pa r30">{{moneyName}}</div>
      </div>

    </div>
    <!---------------------------- 角色信息 ---------------------------->
    <coins-form v-on:formRoleName="formRoleName" v-on:formQqname="formQqname"
                v-on:formPhoneName="formPhoneName"></coins-form>
    <!---------------------------- 购买 ---------------------------->
    <div class="fixed-bottom01 bg-fff px-30 py-20 pr">
      <div class="f32 color-000 lh110">价格<span
        class="f35 color-f75e46">￥{{(Math.pow(10, unitPrice.toString().length) * buyNum * unitPrice / Math.pow(10, unitPrice.toString().length)).toFixed(2)}}</span>
      </div>
      <button class="coin-btn bg-f75e46 lh110 color-fff f36 pa" v-on:click="getSwitch">立即购买</button>
    </div>
    <!---------------------------- 遮料层 ---------------------------->
    <dialog-cover v-if="dialog_cover"></dialog-cover>
    <!--弹出框1-->
    <transition name="fade">
      <dialog-smbox v-if="smBox" :smbox="smboxMessage"></dialog-smbox>
    </transition>
    <!--弹出框2-->
    <dialog-box v-if="dialog_box" :title="boxMessage"></dialog-box>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CoinsForm from "./CoinsForm.vue"
  import Head from "../publicCoins/Head.vue"
  import DialogCover from "../publicCoins/DialogCover.vue"
  import DialogBox from "../publicCoins/DialogBox.vue"
  import Smbox from "./Smbox.vue"
  import http from './http'
  export default{
    name: "CoinsElse",
    data() {
      return {
        buyNum: '',
        dialog_box: false,
        dialog_cover: false,
        msg: "订单详情",
        receiver: "",
        qqName: '',
        phoneName: '',
        totalCount: '',
        unPrice: '',
        unitPrice: '',
        moneyName: '',
        boxMessage: '很抱歉，该商品类型手机版尚未开通,建议您去电脑版发布出售。',
        smBox: false,
        smboxMessage: "",
        dialog_box2: false,
        limitPrice: "",     //限制购买金额
        coinsUrl: "/vue/coins-type/list-coins?" + this.$route.query.url,
      }
    },
    components: {
      "coins-head": Head,
      "coins-form": CoinsForm,
      "dialog-cover": DialogCover,
      "dialog-box": DialogBox,
      "dialog-smbox": Smbox,

    },
    props: {
      url: {
        default: function () {
          return []
        }
      }
    },
    mounted: function () {

    },
    watch: {
      buyNum: function (val, oldVal) {
        if (val == "") {
          return
        }
        var patrnNum = /^[1-9]\d*$/;
        if (patrnNum.test(val)) {
          this.buyNum = this.buyNum;
          if (val > Number(this.totalCount)) {
            this.buyNum = this.totalCount;
          } else {
            this.buyNum = val
          }
        } else {
          this.buyNum = oldVal
        }
//          //判断是否为整数
//          var patrnNum = /^[0-9]+$/;
//          if (patrnNum.test(val)) {
//              this.buyNum = this.buyNum;
//          } else {
//              this.buyNum = oldVal
//          }
//          //判断值大于库存
//            if(val>Number(this.maximum)){
//              this.buyNum=oldVal;
//            }else{
//                this.buyNum=val
//            }
//          //判断值是否为..
//          var patrn = /^\d+(\.\d{0,0}|\.)?$/;
//          if(patrn.test(val)){
//            this.buyNum=this.buyNum
//          }else{
//            this.buyNum=oldVal
//          }
      }
    },
    created(){
      //判断最低价格
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
        this.$CONSTANTS.APIGoods+'/purchaseData/getPriceConfig',
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
        if (res.responseStatus.code == '00') {
          this.limitPrice = "最少购买" + Math.ceil(Vue.MATH.numDiv(res.limitPrice, res.unitPrice));
          this.totalCount = res.totalCount;
          this.unPrice = Math.floor(Vue.MATH.numDiv(1, res.unitPrice) * 100) / 100;
          this.moneyName = res.moneyName;
          this.unitPrice = res.unitPrice;
        }
      })
    },
    mounted(){
      http.getSwitchAll(this.$route.query.gname).then(state => {
        if (state == 1) { //新版打通
        } else if (state == 2) { // 新版不打通
        } else { // 旧版
          location.href = '/'
        }
      })
    },
    methods: {
      //隐藏下拉框
      dropDrow_hide: function () {
        document.getElementById('drop_down').style.display = "none";
      },
      //收货角色名
      formRoleName: function (str) {
        this.receiver = str;
      },
      //qq名
      formQqname: function (str) {
        this.qqName = str;
      },
      //手机号
      formPhoneName: function (str) {
        this.phoneName = str;
      },
      //购买数量判断
      Mybuynum: function () {
        //失去焦点去除小数点
//        if(this.buyNum.substr(-1, 1) == '.'){
//          this.buyNum = parseInt(this.buyNum)
//        };
//        this.buyNum = Number(this.buyNum).toString();
//        if(this.buyNum =="0"){
//            this.buyNum = "";
//        }

      },
      getSwitch: function () {
        http.getSwitchAll(this.$route.query.gname).then(state => {
          if (state == 3 || state == 2) { // 旧版 或 新版不打通
            this.dialog_box = true;
            this.dialog_cover = true;
            this.boxMessage = "价格已更新，请重新下单！"
          } else {
            this.dialogBox();
          }
        })
      },
      //提交订单
      dialogBox: function () {
        const self = this
        var qqReg = /^[1-9]\d{4,10}$/;
        var mobileReg = /(^0{0,1}1[3|4|5|6|7|8][0-9]{9}$)/;
        if (this.buyNum == "") {
          this.smBox = true;
          this.smboxMessage = "请输入购买数量";
          return false
        } else if (this.receiver == "") {
          this.smBox = true;
          this.smboxMessage = "请填写收货角色名";
          return false;
        } else if (this.phoneName == "") {
          this.smBox = true;
          this.smboxMessage = "请填写手机号";
          return false;
        } else if (!mobileReg.test(this.phoneName)) {
          this.smBox = true;
          this.smboxMessage = "手机号格式错误";
          return false;
        } else if (this.qqName == "") {
          this.smBox = true;
          this.smboxMessage = "请填写QQ号";
          return false
        } else if (!qqReg.test(this.qqName)) {
          this.smBox = true;
          this.smboxMessage = "QQ号格式错误";
          return false;
        } else if(this.receiver.trim().length !=this.receiver.length ){
          this.smBox = true;
          this.smboxMessage = "角色名不能含有空格";
          return false;
        }
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        //判断最低价格
        const selfs = this
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
          if (res.responseStatus.code == '00') {
            //console.log((Math.pow(10, this.unitPrice.toString().length) * this.buyNum * this.unitPrice / Math.pow(10, this.unitPrice.toString().length)).toFixed(2))
            if ((Math.pow(10, this.unitPrice.toString().length) * this.buyNum * this.unitPrice / Math.pow(10, this.unitPrice.toString().length)).toFixed(2) < res.limitPrice) {
              this.$indicator.close();
              this.smBox = true;
              this.smboxMessage = "最少购买" + res.limitPrice + "元";
              return false;
            }

            let goBoay = {
              gameName: this.$route.query.gname,
              region: this.$route.query.areaname,
              server: this.$route.query.servername,
              gameRace:this.$route.query.racename,
              raceId:this.$route.query.raceId,
              gameId: this.$route.query.gid,
              regionId: this.$route.query.areaid,
              serverId: this.$route.query.serverid,
              receiver: this.receiver,
              mobileNumber: this.phoneName,
              qq: this.qqName,
              goldCount: this.buyNum,
              unitPrice: Number(this.unitPrice),
            };
            for(let key in goBoay) {
              if(goBoay[key] == "undefined" || goBoay[key] == '' ) {
                goBoay[key] = undefined;
              }
            }
            //添加订单
            this.$http.post(
              this.$CONSTANTS.APIGoods+'purchaseData/addOrder',
              goBoay,
              {
                headers: {
                  contentType: "aplication/json; charset = UTF-8",
                  dataType: 'json'
                }
              }
            ).then((res) => {
              res = res.body;
              this.$indicator.close();
              if (res.responseStatus.code == '00') {
                location.href = "http://yxbmall.5173.com/gamegold-facade-frontend/mPayment?orderId=" + res.orderId

              } else {
                if (res.responseStatus.code == '50004') {
                  this.dialog_box = true;
                  this.dialog_cover = true;
                  this.boxMessage = "抱歉，手慢一步，价格已变动"
                } else if (res.responseStatus.code == '40027') {
                  this.dialog_box = true;
                  this.dialog_cover = true;
                  this.boxMessage = "抱歉，手慢一步，库存已不足"
                } else if (res.responseStatus.code == 'B10041') {
                  this.smBox = true;
                  this.smboxMessage = "下单金额不满足最低限制"
                } else if (res.responseStatus.code == '50013') {
                  this.smBox = true;
                  this.smboxMessage = "成交总价不可超过100万元"
                } else if (res.responseStatus.code == '7001') {
                  this.dialog_box = true;
                  this.dialog_cover = true;
                  this.boxMessage = "客服繁忙，请稍后再试"
                } else {
                  this.dialog_box = true;
                  this.dialog_cover = true;
                  this.boxMessage = "系统异常，请稍后再试！"
                }
              }
            }, () => {
              this.dialog_box = true;
              this.dialog_cover = true;
              this.boxMessage =  "系统异常，请稍后再试！"
            });

          }
        }, () => {
          this.dialog_box = true;
          this.dialog_cover = true;
          this.boxMessage =  "系统异常，请稍后再试！"

        });
        //币m站订单 支付接口调用
//         location.href = "http://yxbmall.5173.com/gamegold-facade-frontend/mPayment?orderId=YX1703310003376"
      },
    }
  };
</script>

<style scoped>
  .dialog-box2 {
    display: block;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .coinsElse{
    line-height: 0.5rem!important;
    padding-top: 0.3rem!important;
    padding-bottom: 0.3rem!important;
  }
  .coinsElse input{
    line-height: 0.5rem!important;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
