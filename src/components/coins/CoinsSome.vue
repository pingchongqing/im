<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <coins-head :title="$route.query.gname+'/'+$route.query.areaname+'/'+$route.query.servername"></coins-head>
    <!---------------------------- 金币信息 ---------------------------->
    <div class="mt-100 bg-f6 clearfix" @click="dropDrow_hide">
      <div class="bg-fff clearfix px-30 pr">
        <div class="fl lh110 f32 color-000">购买数量<span
          class="coin-num f32 pa">{{$route.query.fastListMoney}}{{$route.query.moneyName}}</span></div>
        <div class="fr lh110 f28 color-666">单价1元={{$route.query.unPrice}}{{$route.query.moneyName}}</div>
      </div>
    </div>
    <!---------------------------- 角色信息 ---------------------------->
    <coins-form v-on:formRoleName="formRoleName" v-on:formQqname="formQqname"
                v-on:formPhoneName="formPhoneName"></coins-form>
    <!---------------------------- 购买 ---------------------------->
    <div class="fixed-bottom01 bg-fff px-30 py-20 pr">
      <div class="f32 color-000 lh110"><i class="problem" @click="isProblem">
        <img src="~images/coins/problem.png" alt=""/></i>价格<span class="f32 color-f75e46">￥{{key}}</span></div>
      <button class="coin-btn bg-f75e46 lh110 color-fff f36 pa" @click="getSwitch">立即购买</button>
    </div>
    <!--弹出框1-->
    <transition name="fade">
      <dialog-smbox v-if="smBox" :smbox="smboxMessage"></dialog-smbox>
    </transition>
    <!---------------------------- 遮料层 ---------------------------->
    <dialog-cover v-if="dialog_cover"></dialog-cover>
    <!--弹出框2-->
    <dialog-box v-if="dialog_box" :title="boxMessage"></dialog-box>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Head from "../publicCoins/Head.vue"
  import CoinsForm from "./CoinsForm.vue"
  import DialogCover from "../publicCoins/DialogCover.vue"
  import DialogBox from "../publicCoins/DialogBox.vue"
  import Smbox from "./Smbox.vue"
  import http from './http'
  export default{
    props: {
      buyPrice: {
        type: Number,
        default: 40.2
      }
    },
    name: "CoinsSome",
    data() {
      return {
        buyNum: '',
        isActive: false,
        msg: "订单详情",
        dialog_box: false,
        dialog_cover: false,
        smBox: false,
        smboxMessage: "",
        receiver: "",
        qqName: '',
        phoneName: '',
        boxMessage: '很抱歉，该商品类型手机版尚未开通,建议您去电脑版发布出售。',
        perprice: '40',
        fastListMoney: this.$route.query.fastListMoney,
        unitPrice: this.$route.query.unitPrice,
        receiver: "",
        indicator: false,
//        key: Number(this.$route.query.key).toFixed(2),
        key: '',
      }
    },
    components: {
      "coins-head": Head,
      "coins-form": CoinsForm,
      "dialog-cover": DialogCover,
      "dialog-box": DialogBox,
      "dialog-smbox": Smbox,

    },
    mounted(){
      this.key = (Math.pow(10, this.unitPrice.toString().length) * this.fastListMoney * this.unitPrice / Math.pow(10, this.unitPrice.toString().length)).toFixed(2)
      http.getSwitchAll(this.$route.query.gname).then(state => {
        if (state == 1) { //新版打通
        } else if (state == 2) { // 新版不打通
        } else { // 旧版
          location.href = '/'
        }
      })
    },
    methods: {
      //问号
      isProblem: function () {
        this.dialog_box = true;
        this.dialog_cover = true;
        this.boxMessage = "九宫格页面显示金额为估算值 请以实际支付金额为准。"
      },
      //隐藏下拉框
      dropDrow_hide: function () {
        document.getElementById('drop_down').style.display = "none"
      },
      //收货角色名
      formRoleName: function (str) {
        this.receiver = str
      },
      //qq名
      formQqname: function (str) {
        this.qqName = str
      },
      //手机号
      formPhoneName: function (str) {
        this.phoneName = str
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
        if (this.receiver == "") {
          this.smBox = true;
          this.smboxMessage = "请填写收货角色姓名";
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
        } else if (this.receiver.trim().length != this.receiver.length) {
          this.smBox = true;
          this.smboxMessage = "角色名不能含有空格";
          return false;
        }
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        //添加角色信息

        let goBoay = {
          gameName: this.$route.query.gname,
          region: this.$route.query.areaname,
          server: this.$route.query.servername,
          gameRace: this.$route.query.racename,
          raceId: this.$route.query.raceId,
          gameId: this.$route.query.gid,
          regionId: this.$route.query.areaid,
          serverId: this.$route.query.serverid,
          receiver: this.receiver,
          mobileNumber: this.phoneName,
          qq: this.qqName,
          goldCount: Number(this.$route.query.fastListMoney),
          unitPrice: Number(this.$route.query.unitPrice),
        };
        for(let key in goBoay) {
          if(goBoay[key] == undefined || goBoay[key] == null || goBoay[key] == "undefined" || goBoay[key] == "" ) {
            goBoay[key] = undefined;
          }
        }
        //添加订单
        this.$http.post(
          this.$CONSTANTS.APIGoods + 'purchaseData/addOrder',
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
            //this.$router.push({path: '/vue/coins-type/coins-order',query: {'orderId':res.orderId}})
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
          this.boxMessage = "系统异常，请稍后再试！"
        });
      },
    }
  };
</script>

<style scoped>
  .dialog-box2 {
    display: block;
  }
  .problem{

  }
  .problem img{
    height: 0.4rem!important;
    width: 0.4rem!important;
    margin-top: -0.05rem!important;
    vertical-align: middle;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
