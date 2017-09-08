<template>
  <div>
    <div >
        <div class="recharge-main pb-300" ref="rechargeMain">
            <recharge-order-header :publishEO="publishEO"></recharge-order-header>
            <div class="recharge-content color-000 border-top border-bottom mb-20 bg-fff">
            	<div class="rechcon-titl px-30 border-bottom "><span class="title-curent f30 pl-30 ">商品信息</span></div>
                <div class="rechcon-list px-30">
                	<ul>
                        <li class="px-30 border-bottom">
                        	<div class="relist-lf fl f30">游戏名称</div>
                            <div class="relist-cn fl f30">{{publishEO.gameName}}</div>
                        </li>
                        <li class="px-30 border-bottom">
                        	<div class="relist-lf fl f30">商品类型</div>
                            <div class="relist-cn fl f30">官方{{getRechargeType}}</div>
                        </li>
                        <li class="px-30 border-bottom">
                        	<div class="relist-lf fl f30">客户端</div>
                            <div class="relist-cn fl f30">{{publishEO.operatorName}}</div>
                        </li>
                        <li class="px-30">
                        	<div class="relist-lf fl f30">所在区服</div>
                            <div class="relist-cn fl f30">全区/全服</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="recharge-content color-000 border-bottom border-top mb-20 bg-fff">
            	<div class="rechcon-titl px-30 border-bottom "><span class="title-curent f30 pl-30 ">商品描述</span></div>
                <div class="rechcon-list px-30">
                	<ul>
                        <li class="px-30">
                        	<div class="relist-lf rems fl f30">{{publishEO.attention}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="recharge-content color-000  border-bottom border-top bg-fff">
            	<div class="rechcon-titl px-30 border-bottom "><span class="title-curent f30 pl-30 ">卖家信息</span></div>
                <div class="rechcon-list px-30">
                	<ul>
                    <li class="px-30 border-bottom">
                      <div class="relist-lf fl f30 ">店铺名称： {{rechargeShopsEO.shopsName}}</div>
                    </li>
                    <li class="px-30">
                    	<div class="relist-lf fl f30">月销量：{{rechargeShopsEO.monthlySales}}笔 </div>
                        <div class="relist-cn fl f30">成交订单：{{rechargeShopsEO.successQuantity}}笔</div>
                    </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="border-top " :class="botcls" v-show="botcls==='fixed-bottom'">
        	<div class="recharge-btn px-30 py-30 bg-fff">
        		<a class="f36 bg-f54 color-fff " :class="{'button-disable':buttonDisable}" @click="BuyClick" >立即购买</a>
            </div>
        </div>
  </div>
  <loading-component></loading-component>
  <go-top-component></go-top-component>
  </div>
</template>

<script>
  import navigationModalComponent from '../../common/NavigationModal.vue'
  import goTopComponent from '../../common/GoTop.vue'
  import loadingComponent from '../../common/Loading.vue'
  import rechargeOrderHeader from '../rechargeOrder/RechargeOrderHeader.vue'
  import Q from 'q'

  export default {
    data() {
      return {
        queryData: {},
        rechargeShopsEO: {},
        publishEO: {},
        buttonDisable: true,
        botcls: 'fixed-bottom'
      }
    },
    components: {
      navigationModalComponent,
      goTopComponent,
      loadingComponent,
      rechargeOrderHeader
    },
    computed: {
      getRechargeType() {
        /*
        * recharge_type[1:代充，2:首充，3:续充,]
        * platform_type[1:安卓, 2:苹果]
        */
        if (this.publishEO) {
          switch (this.publishEO.rechargeType) {
            case 1:
              return '代充'
              break;
            case 2:
              return '首充'
              break;
            case 3:
              return '续充'
              break;
          }
        }
      },
      getPlatformType() {
        if (this.publishEO) {
          switch (this.publishEO.platformType) {
            case 1:
              return '安卓'
              break;
            case 2:
              return '苹果'
              break;
          }
        }
      }
    },
    created() {
      this.queryData = this.$route.params
    },
    mounted() {
      /**
      * 打开分享
      */

      this.getData()
      this.$bus.emit('isShare', true)
      this.$bus.emit('busShareUrl', window.location.href)
      this.$bus.on('botcls', (cls) => {
        console.log(cls);
        this.botcls = cls
      })
    },
    beforeDestroy() {
      this.$bus.emit('isShare', false)
      this.$bus.emit('shareShow', false)
      this.$bus.emit('shareHead', false)
    },
    methods: {
      getData: function() {
        //获取店铺数据
        if (this.queryData.publishId && this.queryData.shopsId) {
          var getShopData = this.$http.get(this.$CONSTANTS.APIRecharge + "shops/getShopsById", {
            params: {shopsId: this.queryData.shopsId}
          })
          var getPublishData = this.$http.get(this.$CONSTANTS.APIRecharge + "publish/getPublishByPublishId", {
            params: {publishId: this.queryData.publishId}
          })
          Q.all([getShopData, getPublishData]).spread( (shopData, publishData) => {
            var shopDataBody = shopData.body
            var publishDataBody = publishData.body
            //console.log(shopData);
            //console.log(publishData);
            if (shopDataBody.success && publishDataBody.success) {

              this.rechargeShopsEO = shopDataBody.rechargeShopsEO
              this.publishEO = publishDataBody.publishEO
              this.buttonDisable = false
              this.$bus.emit('headerText', this.publishEO.gameName + '/' + this.getPlatformType + this.getRechargeType)
              /*
              * 分享数据，可选参数
              * url, 分享的链接，如果不传则会自动获取浏览器地址
              * title, 分享的标题
              * summary, 分享的简介
              */
              this.$bus.emit('busShareQq',{
                title: this.publishEO.gameName + '/' + this.getPlatformType + this.getRechargeType,
                summary: this.publishEO.denomination+this.publishEO.unitName+'='+this.publishEO.rechargePrice+'元'+(this.publishEO.title?this.publishEO.title:'')
              })
            } else if (!shopDataBody.success) {
              this.$messagebox('提示', shopDataBody.responseStatus.message).then(() =>{
                location.history.go(-1)
              })
              this.$bus.emit('isShare', false)
            } else if (!publishDataBody.success) {
              this.$messagebox('提示', publishDataBody.responseStatus.message).then(() =>{
                  location.history.go(-1)
              })
              this.$bus.emit('isShare', false)
            } else {
              this.$messagebox('提示', publishDataBody.responseStatus.message+','+shopDataBody.responseStatus.message).then(() =>{
                  location.history.go(-1)
              })
              this.$bus.emit('isShare', false)
            }
          }).catch((error) => {
              console.log(error);
              this.$messagebox({
                title: '提示',
                message:'服务器出错，请稍后再试！'
              }).then(()=>{
                location.href = '/'
              })
              this.$bus.emit('isShare', false)
          })
          .done();
        } else {
          this.$messagebox({
            title: '提示',
            message: '无效的链接地址'
          }).then(()=>{
            location.href = '/'
          })
          this.$bus.emit('isShare', false)
          console.log('请传人publishId和shopsId');
        }
      },
      BuyClick() {
        if (!this.buttonDisable) {
           //this.$router.push({name:'rechargeOrder', params: this.publishEO})
          this.$getAccount().then(account => {
             if (account) {
                this.$router.push({name:'rechargeOrder', params: this.publishEO})
             } else {
                location.href = "/vue/login?returnUrl=" + encodeURIComponent(window.location.protocol+"//"+window.location.host+"/vue/recharge/order/"+this.publishEO.publishId);
             }
          })

         
        }
      },

    }
  }
</script>
<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped ></style>
<style scoped>
.rems {
  white-space: normal !important;
height: auto !important;
line-height: .5rem !important;
padding: .3rem 0;
}
.recharge-main {
  margin-top: .9rem;
}
.bottom-fade-enter-active {
  transition: all .3s ease;
}
.bottom-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.bottom-fade-enter, .bottom-fade-leave-active {
  transform: translateY(100px);
  opacity: 0;
}
.abs-bottom {
    position: absolute !important;
    bottom: 0;
    max-width: 768px;
    width: 100%;
    left: 50%;
    margin-left: -50%;
}

.relist-lf{
    white-space: nowrap;
}
</style>
