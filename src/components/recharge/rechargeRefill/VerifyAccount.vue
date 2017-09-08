<template>
<transition name="slide-fade">
<div>
  <div class="recharge-main">
    <div class="recharge-content color-000 border-bottom mb-20 bg-fff">
    	<div class="rechcon-titl px-30 border-bottom "><span class="title-curent f30 pl-30 ">请输入您在5173购买的首充帐号</span></div>
        <div class="rechcon-list">
          <input-component
            :iclass="'rest-fabu'"
            v-model="buyerRoleAccount"
            :title="'首充帐号'"
            required
            :max="20"
            @input='2000'
            placeholder="请输入首充帐号"></input-component>
        </div>
    </div>
  </div>
  <div class="px-30 py-30 border-top recharge-btn bg-fff">
  	<a class="f36 bg-f54 color-fff "
      :class="{'button-disable': (!buyerRoleAccount) || timeCount > 0}"
      @click="VerifyClick">
      开始验证<i v-show="timeCount > 0">({{timeCount}})</i>
    </a>
  </div>
  <loading-component></loading-component>
  <goTopComponent></goTopComponent>
</div>
</transition>
</template>
<script type="text/ecmascript-6">
import goTopComponent from '../../common/GoTop.vue'
import loadingComponent from '../../common/Loading.vue'
import {InputComponent} from '../../common/formComponent'
export default {
  data() {
    return {
      buyerRoleAccount: '',
      timeCount: 0
    }
  },
  components: {
    InputComponent,
    goTopComponent,
    loadingComponent
  },
  created() {
    this.$bus.emit('headerText', '验证首充帐号')
    if (this.$route.params.buyerRoleAccount) {
      this.buyerRoleAccount = this.$route.params.buyerRoleAccount
    }
    this.$getAccount().then( (res) => {
      if (res) {
        console.log('loginAccount'+ res.loginAccount);
      } else {
        console.log('no login');
      }
    })
  },
  watch: {
    timeCount () {
      if (this.timeCount > 0) {
        var st = setTimeout(() => {
          this.timeCount--
        }, 1000)
      } else {
        clearTimeout(st)
      }
    }
  },
  methods: {
    VerifyClick() {
      if (this.buyerRoleAccount && this.timeCount <= 0) {
        this.timeCount = 3
        this.$http.post(this.$CONSTANTS.APIRecharge + 'buyer/order/getFirstOrder', {
          buyerRoleAccount: this.buyerRoleAccount
        }).then((res) => {
          if(!res.body.success) {
            if(res.body.responseStatus.code === '11') {
              location.href = "/vue/login?returnUrl=" +  encodeURIComponent(location.href)
              // this.$router.push({
              //   name: 'QuickLogin',
              //   query: {redirect: this.$route.fullPath}
              // })
            } else {
              this.$toast({
                message: res.body.responseStatus.message,
                duration: 3000
              })
            }
          } else {
            this.$router.push({
              name: 'RechargeRefillInfo',
              params: {buyerRoleAccount: res.body.firstOrderEO.buyerRoleAccount}
            })
          }
        }, (res) => {
          this.$toast({
            message: '连接服务器失败，请稍后再试！',
            duration: 3000
          })
          console.log(res);
        })
      }
    }
  }
}
</script>
<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style scoped>
.recharge-main {
  margin-top: .9rem;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
