<template>
<div ref="rechargeMain" class="recharge">
  <div class="recharge-main"  :style="{ 'height': tabHeight + 'px'}">
     <div class="recharge-content color-000 border-bottom mb-20 bg-fff">
        <div class="rechcon-titl px-30  "><span class="title-curent f30 pl-30 ">选择充值金额</span></div>
        <div class="rechcon-quick px-30 tab ">
          <ul class="tab-nav" ref="itemul">
            <li
              v-for="(item, index) in nitems"
              @click="ItemClick(index, item.recharge_price, item.original_price)"
              :class="active[index]"
              key="index"
              class="fl border mr-20 f32 mb-30">
              <div class="pler"><a>{{item.original_price}}元</a></div>
            </li>
          </ul>
        </div>
      </div>

      <div class="recharge-content color-000 mb-20 border-top bg-fff">
        <div class="rechcon-list">
          <number-component
            :title="'购买数量'"
            v-model="num"
            :min="1"></number-component>
        </div>
     </div>

    <div class="recharge-content color-000 border-top border-bottom mb-20 bg-fff">
      <div class="rechcon-list">
        <input-component
          :iclass="'rest-fabu'"
          v-model="buyerRoleAccount"
          :title="'您的Apple ID'"
          :isType="'email'"
          @BackValid="idBackValid"
          @on-focus="otherFocus"
          @on-blur="otherBlur"
          placeholder="请输入苹果帐号"></input-component>
        <input-component
          :iclass="'rest-fabu'"
          v-model="buyerRolePwd"
          :title="'Apple ID 登录密码'"
          :isType="CheckPwd"
          placeholder="请输入游戏密码"
          @on-focus="otherFocus"
          @on-blur="otherBlur"
          @BackValid="pwBackValid"
          slot="'right'"></input-component>
        <input-component
          :iclass="'rest-fabu'"
          v-model="buyerPhone"
          type="tel"
          required
          :title="'我的手机号'"
          :isType="'china-mobile'"
          @on-focus="otherFocus"
          @on-blur="otherBlur"
          @BackValid="mbBackValid"
          placeholder="请输入手机号码"></input-component>
      </div>
    </div>

    <div class="recharge-content color-000 border-top border-bottom mb-20 bg-fff">
      <div class="rechcon-titl px-30  "><span class="title-curent f30 pl-30 ">为什么需要Apple ID 登录密码？</span></div>
      <div class="rechcon-answer px-30 pb-30">
        <p class="pl-30 color-666 f26">
          5173官方客服代充，系统会自动登录您的AppStore帐户进行充值，请放心！我们可以保证您的帐户信息安全。
        </p>
      </div>
    </div>

  </div>

  <div class=" border-top " :class="botcls" ref="rechargeFooter">
    <div class="recharge-btn px-30 py-30 bg-fff">
      <span class="btn-payment f32 color-000">实付：<i class="f36 color-m1">￥</i><em class="f48 color-m1">{{totalAmount}}</em></span>
      <a class="f36 bg-f54 color-fff btn-a" v-if="totalAmount" @click="Submit">立即购买</a>
    </div>
  </div>
  <loadingComponent></loadingComponent>
</div>
</template>

<script type="text/ecmascript-6">
import {InputComponent, NumberComponent} from '../../common/formComponent'
import loadingComponent from '../../common/Loading.vue'
export default {
  data() {
    return {
      labelWidth: '3rem',
      items: [
        {original_price: 50},
        {original_price: 100},
        {original_price: 300}
      ],
      shopsId: '',
      price: '',
      errors: {
        mb:{},
        id:{},
        pw:{}
      },
      active: ['active'],
      rechargePrice: '',
      num:1,
      denomination:'',
      buyerPhone: '',
      buyerRoleAccount: '',
      buyerRolePwd: '',
      botcls: 'fixed-bottom',
      tabHeight: 0,
    }
  },
  components: {
    InputComponent,
    NumberComponent,
    loadingComponent
  },
  computed: {
    nitems() {
      var nitems = []
      this.items.map(item => {
        item.recharge_price = item.original_price*this.price
        nitems.push(item)
      })
      return nitems
    },
    totalAmount() {
      return this.rechargePrice * this.num
    }
  },
  created() {
    this.$bus.emit('headerText', '苹果ID快充')
    this.$http.get(this.$CONSTANTS.APILogin + "account/checkBindMobile").then( res => {
      if (res.body.success == true) {
        this.buyerPhone = res.body.mobilePhone;
      }
    });
    this.$http.get(this.$CONSTANTS.APIRecharge  + 'createOrder/recharge/queryCurrentAppleInfo')
    .then( (res) => {
      if (res.body.rechargeAppleEO) {
        this.shopsId = res.body.rechargeAppleEO.shopsId
        this.price = res.body.rechargeAppleEO.price
        this.rechargePrice = res.body.rechargeAppleEO.price*this.items[0].original_price
        this.denomination = this.items[0].original_price
        if(this.$isLocalStorageSupported()) {
          if (localStorage[this.shopsId+this.buyerPhone]) {
            var localData = JSON.parse(localStorage[this.shopsId+this.buyerPhone])
            this.num = localData.num
            this.buyerPhone = localData.buyerPhone
            this.buyerRoleAccount = localData.buyerRoleAccount
            this.buyerRolePwd = localData.buyerRolePwd
            this.denomination = localData.denomination
            this.items.map((item, index) =>{
              if (item.original_price === localData.denomination) {
                this.active = []
                this.active[index] = 'active'
                this.rechargePrice = this.nitems[index].recharge_price
              }
            })
          }
        }

      }
    }, (err) => {
      console.log(err);
    })
  },
  mounted: function mounted() {
    this.$nextTick(function () {
        this.tabHeight = this.$getScreenHeight() - this.$refs.rechargeMain.getBoundingClientRect().top-this.$refs.rechargeFooter.getBoundingClientRect().height;
    });
  },
  methods: {
    otherFocus() {
      this.listShow = false
      this.botcls = 'abs-bottom'
      this.$bus.emit('topcls', 'abs-top')
    },
    otherBlur() {
      this.botcls = 'fixed-bottom'
      this.$bus.emit('topcls', 'fixed-top')
    },
    idBackValid(val) {
      this.errors.id = val
    },
    mbBackValid(val) {
      this.errors.mb = val
    },
    pwBackValid(val) {
      this.errors.pw = val
    },
    ItemClick (index, recharge_price, original_price) {
      var chd = this.$refs.itemul.children
      var dc = []
      for(let i=0; i<chd.length; i++) {
        dc[i] = ''
      }
      dc[index] = 'active'
      this.active = dc
      this.rechargePrice = recharge_price
      this.denomination = original_price
    },
    Submit() {
      var orderData = {
        rechargeType: 4,
        buyerRoleAccount: this.buyerRoleAccount,
        buyerRolePwd: this.buyerRolePwd,
        denomination: this.denomination,
        num: this.num,
        price: this.price,
        buyerPhone: this.buyerPhone,
        shopsId: this.shopsId,
        totalAmount: this.totalAmount,
      }

      if (!orderData.buyerRoleAccount || !orderData.buyerRolePwd || !orderData.buyerPhone) {
        this.$toast({
          message: '还有信息没有填哦'
        })
      } else if (Object.keys(this.errors.id).length > 0) {
        this.$toast({
          message: 'Apple ID应该是个email地址哦~ '
        })
      } else if (Object.keys(this.errors.mb).length > 0) {
        this.$toast({
          message: this.errors.mb.format
        })
      } else if (Object.keys(this.errors.pw).length > 0) {
        this.$toast({
          message: this.errors.pw.fn
        })
      } else {
        if (this.$isLocalStorageSupported()) {
          localStorage.removeItem(orderData.shopsId+this.buyerPhone)
          localStorage.setItem(orderData.shopsId+this.buyerPhone, JSON.stringify(orderData))
        }
        this.PostData(orderData)
      }
    },
    PostData(orderData) {
      this.$http.post(this.$CONSTANTS.APIRecharge + 'createOrder/recharge/createApple', orderData).then(res => {
        if (res.ok) {
          if(res.body.success) {
            this.$router.push({
              name: 'RechargePaying',
              params: {orderId: res.body.orderId}
            })
          } else {
            if(parseInt(res.body.responseStatus.code) === 11) {
              location.href = "/vue/login?returnUrl=" + encodeURIComponent(location.href)
              // this.$router.push({
              //   name: 'QuickLogin',
              //   query: {redirect: this.$route.fullPath}
              // })
            } else {
              console.log(res);
              this.$toast({
                message: res.body.responseStatus.message
              }).then(() => {
                location.reload()
              })
            }
          }
        }
      }, res => {
        console.log(res);
      })
    },
    CheckPwd(str) {
      if (str.length<7) {
        return {valid:false, msg: '密码至少包含8个字符'}
      }
      else if (!/\d/.test(str)) {
        return {valid:false, msg: '密码至少包含1个数字'}
      }
      else if (!/[a-z]/.test(str)) {
        return {valid:false, msg: '密码至少包含1个小写字母'}
      }
      else if (!/[A-Z]/.test(str)) {
        return {valid:false, msg: '密码至少包含1个大写字母'}
      }
      else if (this.buyerRoleAccount === str) {
        return {valid:false, msg: '密码不可与帐号相同'}
      }
      else {
        return {valid:true}
      }
    }
  }
}
</script>

<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style scoped>
.recharge {
    margin-top: .96rem;
}
.recharge-main {
    overflow-x: hidden;
    overflow-y: auto;
}
.tab-nav li:last-child {
  margin-right: 0 !important
}
.rechcon-list {
  padding-left: .3rem;
}
.abs-bottom {
    position: relative !important;
    bottom: 0;
    max-width: 768px;
    width: 100%;
    left: 50%;
    margin-left: -50%;
}
</style>
