<template>
  <div>
  <div class="recharge-main pb-300">
    <div class="recharge-content color-000 border-bottom bg-fff mb-20">
    	<div class="rechcon-titl px-30  "><span class="title-curent f30 pl-30 ">选择充值金额</span></div>
      <div class="rechcon-quick pl-30 tab">
      	<ul class="tab-nav" ref="itemul">
        	<li
            v-for="(item, index) in items"
            @click="ItemClick(index, item.recharge_price, item.id)"
            :class="active[index]"
            key="index"
            class="fl border mr-20 f32 mb-30">
            <div class="pler"><a>{{item.denomination}}{{item.unit_name}}</a></div>
          </li>
        </ul>
      </div>
    </div>

    <div class="recharge-content color-000 border-top mb-20 bg-fff">
      <div class="rechcon-list">
        <input-component
          :iclass="'rest-fabu'"
          v-model="firstOrderEO.buyerRoleAccount"
          :title="'首充号'"
          readonly
          required></input-component>
        <input-component
          :iclass="'rest-fabu'"
          v-model="firstOrderEO.operatorName"
          :title="'客户端'"
          readonly
          required></input-component>
        <input-component
          :iclass="'rest-fabu'"
          v-model="firstOrderEO.serverName"
          :title="'所在区服'"
          readonly
          placeholder="请输入游戏区服"
          required></input-component>
          <ul class="select" v-show="listShow && filterList.length>0">
            <li v-for="elem in filterList" @click="ListClick(elem)">{{elem.serverName}}</li>
          </ul>
        <input-component
          :iclass="'rest-fabu'"
          v-model="firstOrderEO.buyerRoleName"
          :title="'游戏角色名'"
          readonly
          placeholder="请输入游戏角色名"
          required></input-component>
        <input-component
          :iclass="'rest-fabu'"
          v-model="firstOrderEO.buyerRolePwd"
          :title="'游戏密码'"
          readonly
          placeholder="请输入游戏密码"
          required></input-component>
      </div>
    </div>
    <div class="recharge-content color-000 border-top bg-fff">
      <div class="rechcon-list">
        <input-component
          :iclass="'rest-fabu'"
          v-model="buyerPhone"
          required
          :title="'我的手机号'"
          readonly
          :isType="'china-mobile'"
          @BackValid="aBackValid"
          placeholder="请输入手机号码"></input-component>
      </div>
    </div>
    <div class="recharge-notes f26 color-666 px-30 py-30">注：本站所有信息经过MD5加密，请放心填写。</div>
  </div>

  <div class="border-top " :class="botcls">
  	<div class="recharge-btn px-30 py-30 bg-fff">
      <span class="btn-payment f32 color-000">实付：<i class="f36 color-m1">￥</i><em class="f48 color-m1">{{rechargePrice}}</em></span>
      <a class="f36 bg-f54 color-fff btn-a" @click="Submit" v-if="rechargePrice">立即购买</a>
    </div>
  </div>

  <loadingComponent></loadingComponent>
  <goTopComponent></goTopComponent>
</div>
</template>

<script type="text/ecmascript-6">
import goTopComponent from '../../common/GoTop.vue'
import loadingComponent from '../../common/Loading.vue'
import {InputComponent,  NumberComponent} from '../../common/formComponent'
export default {
  data() {
    return {
      firstOrderEO: {},
      buyerPhone: '',
      items: [],
      error: '',
      active: ['active'],
      rechargePrice: '',
      serverList: [],
      buyerRoleAccount: '',
      listShow: false,
      botcls: 'fixed-bottom'
    }
  },
  components: {
    InputComponent,
    NumberComponent,
    goTopComponent,
    loadingComponent
  },
  computed: {
    htmlServerList() {
      var dl = []
      this.serverList.forEach( (item) => {
        dl.push(item.serverName)
      })
      return dl
    },
    filterList() {
      if (this.serverList.length > 0) {
        return this.serverList.filter((item) => {
          return item.serverName.indexOf(this.serverName) !== -1
        })
      } else {
        return this.serverList
      }
    },
  },
  created() {
    this.$http.get(this.$CONSTANTS.APILogin + "account/checkBindMobile").then( res => {
      if (res.body.success == true) {
        this.buyerPhone = res.body.mobilePhone;
      }
    });
    if (this.$route.params.firstOrderEO) {
      this.firstOrderEO = this.$route.params.firstOrderEO
      this.SetData()
    } else if(this.$route.params.buyerRoleAccount) {
      this.buyerRoleAccount = this.$route.params.buyerRoleAccount
      this.$http.post(this.$CONSTANTS.APIRecharge + 'buyer/order/getFirstOrder', {
        buyerRoleAccount: this.buyerRoleAccount
      }).then((res) => {
        if(!res.body.success) {
          if(res.body.responseStatus.code === '11') {
            location.href = "/vue/login?returnUrl=" +  encodeURIComponent(location.href)
          } else {
            this.$messagebox({
              message: res.body.responseStatus.message,
              duration: 3000
            }).then(() => {
              this.$router.push('/vue/recharge/')
            })
          }
        } else {
          this.firstOrderEO = res.body.firstOrderEO
          this.SetData()
        }
      }, (res) => {
        this.$toast({
          message: '连接服务器失败，请稍后再试！',
          duration: 3000
        })
        console.log(res);
      })
    } else {
      this.$router.push('/vue/recharge/refill/verifyAccount')
    }

  },
  methods: {
    ListFocus() {
      this.listShow = true
      this.botcls = 'abs-bottom'
      this.$bus.emit('topcls', 'abs-top')
    },
    otherFocus() {
      this.listShow = false
      this.botcls = 'abs-bottom'
      this.$bus.emit('topcls', 'abs-top')
    },
    ListClick(item) {
      this.serverName = item.serverName
      this.listShow = false
    },
    otherBlur() {
      this.botcls = 'fixed-bottom'
      this.$bus.emit('topcls', 'fixed-top')
    },
    aBackValid(val) {
      this.error = val
    },
    ItemClick (index, recharge_price, publishId) {
      var chd = this.$refs.itemul.children
      var dc = []
      for(let i=0; i<chd.length; i++) {
        dc[i] = ''
      }
      dc[index] = 'active'
      this.active = dc
      this.rechargePrice = recharge_price
      this.publishId = publishId
    },
    getServerList() {
      //获取区服列表
      var getdata =   this.$http.get(this.$CONSTANTS.APIRecharge + 'gameService/selectService', {
          params: {gameId: this.firstOrderEO.gameId}
        })
      return getdata
    },
    Submit() {
      var orderData = {
        rechargeType: 3,
        publishId: this.publishId,
        buyerRoleAccount: this.firstOrderEO.buyerRoleAccount,
        buyerRolePwd: this.firstOrderEO.buyerRolePwd,
        buyerRoleName: this.firstOrderEO.buyerRoleName,
        serverName: this.firstOrderEO.serverName,
        buyerPhone: this.buyerPhone,
        totalAmount: Number(this.rechargePrice),
      }

      if (!orderData.serverName || !orderData.buyerRolePwd || !orderData.buyerRoleName || !orderData.buyerPhone) {
        this.$toast({
          message: '还有信息没有填哦'
        })
      } else if (Object.keys(this.error).length > 0) {
        if (this.error.format) {
          this.$toast({
            message: this.error.format
          })
        }
      } else {
        this.PostData(orderData)
      }
    },
    PostData(orderData) {
      this.$http.post(this.$CONSTANTS.APIRecharge + 'createOrder/recharge/create', orderData).then(res => {
        //console.log(res);
        if (res.ok) {
          if(res.body.success) {
            this.$router.push({
              name: 'RechargePaying',
              params: {orderId: res.body.orderId}
            })
          } else {
            if(parseInt(res.body.responseStatus.code) === 11) {
              location.href = "/vue/login?returnUrl=" + this.$route.fullPath
              // this.$router.push({
              //   name: 'QuickLogin',
              //   query: {redirect: this.$route.fullPath}
              // })
            } else {
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
    SetData() {
      this.$bus.emit('headerText', this.firstOrderEO.gameName)
      this.$http.get(this.$CONSTANTS.APIRecharge + 'publishAliYun/publishSearch', {params:{
        shops_id: this.firstOrderEO.shopsId,
        recharge_type: 3,
        game_id: this.firstOrderEO.gameId,
        platform_type: this.firstOrderEO.platformType,
        page: 0,
        pageSize: 6,
        sort: 'denomination|+'
      }}).then((res) => {
        if (res.body.searchData) {
          if (res.body.searchData.result.total > 0) {
            this.items = res.body.searchData.result.items
            this.publishId = this.items[0].id
            //设置初始实付价格
            this.rechargePrice = this.items[0].recharge_price
            //获取游戏区服列表
            this.getServerList().then( (res) => {
              if (res.body.success) {
                this.serverList = res.body.list
              }
            }, (err) => {
              console.log(err);
            })
          } else {
            this.$messagebox('提示', '没有找到可用的宝贝').then(() => {
              this.$router.push('/vue/recharge/')
            })
          }
        } else {
          this.$messagebox('提示', '从服务器获取数据失败！').then( acation => {
            this.$router.push('/vue/recharge/refill/verifyAccount')
          })
        }
      }, (res) => {
        console.log(res);
      })
    }
  }
}
</script>
<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style scoped>
.recharge-main {
  margin-top: .9rem;
}
.abs-bottom {
    position: absolute !important;
    bottom: 0;
    max-width: 768px;
    width: 100%;
    left: 50%;
    margin-left: -50%;
}
</style>
