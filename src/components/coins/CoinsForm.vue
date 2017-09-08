<template>
  <!---------------------------- 角色信息 ---------------------------->
  <div class="js-msg mt-20 bg-fff clearfix" style="margin-bottom: 1.5rem">

    <ul class="bg-fff">
      <li class="w-100 border-bottom clearfix lh110 px-30 f32 pr">
        <span class="f32">收货角色名</span>
        <input class="coin-input lh110 pa" style="width: 57%" type="text" name="" value="" id="username"
               v-model="receiver" @click="showCoins()"
               placeholder="请输入接收游戏币的角色名"/>
        <i class="pa" v-if="isTrue" id="divselect" @click="show()"><img src="~images/coins/coinuser.png"/></i>
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
    <drop-down :xianshi="xianshi" @change="xianshi = !xianshi" v-on:ee="incrementTotal" v-on:ff="mobileNumberTotal"
               :role-list="roleList"
               v-on:gg="qqNumberTotal"></drop-down>
    <!---------------------------- 遮料层 ---------------------------->
    <div class="dialog_cover" v-if="dialog_cover"></div>
    <!--弹出框1-->
    <dialog-smbox v-if="smBox" :smbox="smboxMessage"></dialog-smbox>

  </div>
</template>

<script>
  import DropDown from "../publicCoins/DropDown.vue"
  import Smbox from "./Smbox.vue"
  export default {
    name: "CoinsForm",
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
        roleList: []
      }
    },
    components: {
      "drop-down": DropDown,
      "dialog-smbox": Smbox,
    },
    methods: {
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
          console.log(res.data.data)
          let temp = [];
          for(var i=0;i<res.data.data.length;i++){
            if(i < 5){
              temp.push(res.data.data[i])
            }else{
              break;
            }
          }
          console.log(temp)
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
                this.$http.get(this.$CONSTANTS.APILogin+"account/checkBindMobile").then(function (res) {
                  if(res.body.success == true){
                    this.phoneName = res.body.mobilePhone;
                  }
                });
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
        console.log("请求错误！");

      });

    },
    mounted()
    {
      this.$emit('formRoleName', this.receiver);
      this.$emit('formQqname', this.qqName);
      this.$emit('formPhoneName', this.phoneName);
    }
    ,
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
</style>
