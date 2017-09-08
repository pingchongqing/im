<template>
  <div class="recharge-main">
  	<div class="recharge-content color-000 mb-20 bg-fff">
      <div class="rechcon-paying">
      	<ul>
          <li class="px-30 border-bottom">
          	<div class="relist-lf fl f36">付款金额</div>
            <div class="relcon-pay fl f36 color-m1">￥<i>{{payAmount}}</i></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="recharge-content color-000 border-top bg-fff">
      <div class="rechcon-paying">
      	<ul>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated tada"
            leave-active-class="animated bounceOutRight"
          >
        	<a @click="weixinPay" v-if="payAmount" key='a'>
            <li class="px-30 border-bottom">
              <div class="relist-lf fl f36"><span class="weix">微信支付</span></div>
              <div class="relcon-rg fr"><i class="lease-ico"></i></div>
            </li>
          </a>
          </transition>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated tada"
            leave-active-class="animated bounceOutRight"
          >
          <a @click="aliPay" v-if="payAmount" key='a3'>
            <li class="px-30 border-bottom">
              <div class="relist-lf fl f36"><span class="zfb">支付宝支付</span></div>
              <div class="relcon-rg fr"><i class="lease-ico"></i></div>
            </li>
          </a>
          </transition>
        </ul>
      </div>
    </div>
    <div ref="refResult" v-html="result"></div>
    <loadingComponent></loadingComponent>
    <goTopComponent></goTopComponent>
  </div>
</template>
<script type="text/ecmascript-6">
import goTopComponent from '../../common/GoTop.vue'
import loadingComponent from '../../common/Loading.vue'
export default {
  data() {
    return {
      orderId: '',
      payAmount: '',
      result: '',
      shopStatus: false
    }
  },
  components: {
    goTopComponent,
    loadingComponent
  },
  created() {
    this.$bus.emit('headerText', '支付')
    if (this.$route.params.orderId) {
      this.orderId = this.$route.params.orderId
      this.$http.get(this.$CONSTANTS.APIRecharge + 'buyer/order/queryOrderDetail',{
        params: {orderId: this.orderId}
      }).then( (res) => {
        if (res.body.orderEO) {
          this.payAmount = res.body.orderEO.totalAmount
          this.getShopData(res.body.orderEO.shopsId).then( (res) => {
            if (res.body.rechargeShopsEO) {
              if (res.body.rechargeShopsEO.isEnabled && res.body.rechargeShopsEO.isSellEnabled) {
                this.shopStatus = true
              } else {
                this.$messagebox('提示', '店铺未开启').then(() => {
                  location.href='/'
                })
              }
            } else {
              this.$messagebox('提示', '获取店铺数据失败').then(() => {
                location.href='/'
              })
            }
          }, (err) => {
            this.$messagebox('提示', '连接店铺服务器出错').then(() => {
              location.href='/'
            })
            console.log(err);
          })
        }
      }, (err) => {
        console.log(err);
      })
    } else {
      this.$messagebox('非法链接').then(() => {
        location.href = '/'
      })
    }
  },
  updated() {
    if (document.forms['alipaysubmit']) {
      document.forms['alipaysubmit'].submit()
    }
  },
  methods: {
    aliPay() {
      if (this.shopStatus) {
        this.$http.post(this.$CONSTANTS.APIRecharge + 'payment/payforsygamerechargeorder', {
          rechargeOrderId: this.orderId,
          payType: 2,
          isOffice: 1,
          returnUrl: "/vue/buyerCenter/buyerMob/2"
        }).then( (res) => {
          if(res.body.success) {
            this.result = res.body.result
          } else {
            this.$toast(res.body.responseStatus.message)
          }
        }, (err) => {
          console.log(err);
        })
      }
    },
    weixinPay() {
      if (this.shopStatus) {
        this.$http.post(this.$CONSTANTS.APIRecharge + 'payment/payforsygamerechargeorder', {
          rechargeOrderId: this.orderId,
          payType: 1,
          isOffice: 1,
          returnUrl: "/vue/buyerCenter/buyerMob/2"
        }).then( (res) => {
          if(res.body.success) {
            //this.result = res.body.result
            location.href = res.body.result
          } else {
            this.$toast(res.body.responseStatus.message)
          }
        }, (err) => {
          console.log(err);
        })
      }
    },
    getShopData(shopsId) {
      var gt = this.$http.get(this.$CONSTANTS.APIRecharge + 'shops/getShopsById', {
        params:{shopsId: shopsId}
      })
      return gt
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
