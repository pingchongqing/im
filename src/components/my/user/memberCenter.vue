<template>
    <div>
        <div id="wrapper">
            <!-- top -->
            <div class="top-header border-bottom">
                <div class="top-back3">
                </div>
                <div class="top-bt3" style="text-align: center;">
                    <span class="f36" id="member-bt">个人中心</span>
                </div>

            </div>
            <!-- 会员中心主功能 -->
            <div class="fw po-re mb192 member-main">
                <a id="aLogin" @click="isLogin">
                    <div class="po-re fw border-bottom bg-fff  member-list-user">
                        <div class="fl text-left po-re list-left-user">
                            <img class="loginImg" :src="imgTopUrl">
                            <span id="spLoginInfo" class="notlogin" :style="stylePaddingTop">
						        <em class="color000" v-if="showLogin">登录/注册</em>
                                <em id="member-name" class="color-000" v-if="showName">{{nickName}}</em>
                                <em class="color-666" v-if="showName">{{pcUserName}}</em>
					        </span>
                        </div>
                        <div class="list-right-user fr po-re text-left">
                            <span></span>
                        </div>
                    </div>
                </a>
                <a href="/vue/buyerCenter/buyerCenterMain">
                    <div class="member-list border-top border-bottom po-re fw bg-fff mt-20">
                        <div class="list-left fl po-re text-left">
                            <span class="newm-icon01 ml-30 f32 color-000 d-inline-block">我是买家</span>
                        </div>
                        <div class="list-right fr po-re text-right color-333">
                            <span></span>
                        </div>
                    </div>
                </a>
                <a href="/vue/memberseller">
                    <div class="member-list border-bottom po-re fw bg-fff">
                        <div class="list-left fl po-re text-left">
                            <span class="newm-icon02 ml-30 f32 color-000 d-inline-block">我是卖家</span>
                        </div>
                        <div class="list-right fr po-re text-right color-333 f30">
                            <span></span>
                        </div>
                    </div>
                </a>
                <a href="/vue/browsing-history/history-lists">
                    <div class="member-list border-bottom po-re fw bg-fff">
                        <div class="list-left fl po-re text-left">
                            <span class="newm-icon06 ml-30 f32 color-000 d-inline-block">浏览记录</span>
                        </div>
                        <div class="list-right fr po-re text-right color-333 f30">
                            <span></span>
                        </div>
                    </div>
                </a>

                <a href="javascript:void(0);" class="tixian_gc" v-if="newFund" @click="fundGc">
                    <div class="member-list border-top border-bottom po-re fw bg-fff mt-20">
                        <div class="list-left fl po-re text-left withdrawal-cash">
                            <span class="newm-icon04 ml-30 f32 color-000 d-inline-block">我的账户<i>{{newMoney}}元</i></span>
                        </div>
                        <div class="list-right fr po-re text-right color-333 f30">
                            提现<span></span>
                        </div>
                    </div>
                </a>
                <a href="/member/withdrawal.html" class="tixian_gc_old" v-if="oldFund">
                    <div class="member-list border-bottom po-re fw bg-fff">
                        <div class="list-left fl po-re text-left">
                            <span class="newm-icon05 ml-30 f32 color-000 d-inline-block">旧账户余额<i>{{oldMoney}}元</i></span>
                        </div>
                        <div class="list-right fr po-re text-right color-333 f30">
                            免费提现<span></span>
                        </div>
                    </div>
                </a>
                <p class="member-tip po-re clear color-be8600 bg-fffdf4 f26 old-gc-p" v-if="oldFund">因5173资金账户升级，旧账户将不再入账，请尽快提现</p>
                <a href="/member/store-manage.html" v-show="isMyShops">
                    <div class="member-list border-top border-bottom po-re fw bg-fff mt-20" id="myShops">
                        <div class="list-left fl po-re text-left">
                            <span class="newm-icon03 ml-30 f32 color-000 d-inline-block">我的店铺</span>
                        </div>
                        <div class="list-right fr po-re text-right color-333 f30">
                            <span></span>
                        </div>
                    </div>
                </a>

                <a href="/dl/dl-center.html">
                    <div class="member-list border-top border-bottom po-re fw bg-fff mt-20">
                        <div class="list-left fl po-re text-left">
                            <span class="newm-icon08 ml-30 f32 color-000 d-inline-block">我的代练</span>
                        </div>
                        <div class="list-right fr po-re text-right color-333 f30">
                            <span></span>
                        </div>
                    </div>
                </a>
                <!-- <a href="/rent/my-rent.html">
                    <div class="member-list border-bottom po-re fw bg-fff">
                        <div class="list-left fl po-re text-left">
                            <span class="newm-icon22 ml-30 f32 color-000 d-inline-block">我的租号</span>
                            <i class="zh"></i>
                        </div>
                        <div class="list-right fr po-re text-right color-333 f30">
                            <span></span>
                        </div>
                    </div>
                </a> -->
                <a href="/vue/kf" v-if="isKf">
                    <div class="member-list border-top po-re fw bg-fff mt-20">
                        <div class="list-left fl po-re text-left">
                            <span class="newm-icon13 ml-30 f32 color-000 d-inline-block">客服中心</span>
                        </div>
                        <div class="list-right fr po-re text-right color-333 f30">
                            <span></span>
                        </div>
                    </div>
                </a>
            </div>
            <!-- 其它登录 -->
            <div id="centerId"></div>
            <FooterComponent :active="'center'"></FooterComponent>
        </div>
    </div>
</template>
<script>
  import FooterComponent from "components/Footer.vue"
  import { mapState, mapGetters, mapActions } from 'vuex';
  import api from '../../../api'
  export default{
    data(){
      return{
        showName:false,
        showLogin:true,
        stylePaddingTop:{
          paddingTop: ''//样式
        },
        imgTopUrl:"https://m.5173.com/images/Icon/tx_nologin.png",//头像
        nickName:"",
        pcUserName:"",
        newFund:false,//新的资金
        newMoney:"",
        oldFund:false,//旧资金
        oldMoney:"",
        isLoginInfo: false,
        params:{
          mapRequest:{
            type:"客服中心总开关"
          }
        },
        //老资金参数
        oldZj:{
          uid:""
        },
        isMyShops:false,
        isKf:""
      }
    },
    components: {
      FooterComponent,
    },
    computed:{

    },
    created(){
      var vm = this;
      vm.$getAccount().then(account=>{
        if(account){
		      if(account.pcUserId){
              sa.login(account.pcUserId);
          }else{
              sa.quick('autoTrack');
          } 
//          sa.quick('autoTrack');
          vm.oldZj.uid = account.id;
          vm.showLogin = !vm.showLogin;
          vm.showName = !vm.showName;
          vm.stylePaddingTop.paddingTop = '.16rem';
          if(account.avatarUrl){
            vm.imgTopUrl = account.avatarUrl;
          }else{
            vm.imgTopUrl = 'https://m.5173.com/images/Icon/tx_nologin.png';
          };
          if(account.nickName){
            vm.nickName = account.nickName;
          }else{
            vm.nickName = "请设置用户昵称";
          };
          if(account.isMallUser == 6){
            vm.isMyShops = true;
          };
          vm.pcUserName = account.pcUserName;
          vm.newFund = !vm.newFund;
          vm.isLoginInfo = true;
          vm.queryuserbalanceinfo();
        }else{
		    sa.quick('autoTrack');
          vm.imgTopUrl = 'https://m.5173.com/images/Icon/tx_nologin.png';
        }
      });

    },
    mounted(){
      this.newFundMon();
      this.selectOnoff();
    },
    methods:{
      //新资金
      newFundMon: function () {
        var vm = this;
        api.user.getAccountBrief().then((data)=>{
          vm.newMoney = data.body.openMoney;
        });
      },
      //体现页面
      fundGc: function () {
        window.location.href="/vue/my-account";
      },
      //登录跳转
      isLogin(){
        if(this.isLoginInfo){
          this.$router.push({
            name:"memberSetupInfo"
          })
        }else{
          location.href = "/vue/login"
        }
      },
      //老资金
      queryuserbalanceinfo(){
        let self = this;
        api.user.queryuserbalanceinfo(self.oldZj).then((data)=>{
          if(data.body.userInfo.balanceMoney>0){
            self.oldFund = true;
            self.oldMoney = (data.body.userInfo.balanceMoney-data.body.userInfo.frozenMoney).toFixed(2);
          }
        });
      },
      //客服中心开关
      selectOnoff(){
        api.user.selectOnoff(this.params).then((data)=>{
          if(data.body.success && data.body.responseStatus.message == "操作成功"){
            this.isKf = true;
          }
        });
      }
    }

  }
</script>
<style src="css/user/member-cxy.css" scoped></style>
