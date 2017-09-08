<template>
<div>
  <!--待付款-->
  <div class="seller-01 " v-show="payStatus===1">

      <div class="sellnage-connt mb-20" v-for="elem in shouyouOrderList1" :key="elem.Id">
          <div class="manage-caption px-30  bg-fff" @click="goOrder(elem,elem.Id, elem.GoodsName, elem.Image?elem.Image.ThumbnailsUrl:'', elem.CustomServiceQQ)">
            <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.GoodsName}}</span></div>
              <div class="manage-contn bg-faf">
                  <div class="mancon-img fl">
                    <i class="f22 color-fff bg-000">游戏帐号</i>
                    <span class="middle"></span>
                    <img :src="elem.Image.ThumbnailsUrl" v-if="elem.Image&&elem.Image.ThumbnailsUrl"><img v-else src="~images/default_img.jpg">
                  </div>
                  <div class="mancon-tn py-15">
                      <div class="tn-hxtxt f26 color-666">{{elem.GameName}} /{{elem.OperatorName}} /{{elem.AreaName}} </div>
                      <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.Id}}</div>
                      <div class="tn-hxtxt f26 color-666">商品价格：{{elem.GoodsTotalPrice}}元</div>
                  </div>
              </div>
          </div>

          <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
            <span class="title-curent f30 pl-30 color-000 fl buyct-why ">{{elem.OrderStatus|orderStatusFilter}}</span>
          </div>
          <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
            <a class="f30 color-fff bg-m1 fr"  :ref="elem.Id"  @click="shouyouPay(elem.Id)">去付款</a>
            <!-- <a class="f30 color-m1 border border-color cancel fr" @click="getService(elem.CustomServiceQQ)">联系客服</a>
            <i class="titcur fr" @click="whyClick(elem.CustomServiceQQ)"></i> -->
          </div>
      </div>
      <div class="loading" v-show="loading" >加载中...</div>
      <div  class="list-empty bg-fff" v-show="shouyouOrderList1.length===0&&!loading">
        <p ><img src="~images/gamelogo.png"></p>
        <span >您还没有订单</span>
      </div>

  </div>

  <!--待付款-->
  <!--已付款-->
        <div class="seller-02" v-show="payStatus===2">
        	<div class="sellnage-connt mb-20" v-for="elem in shouyouOrderList2" :key="elem.Id">
            <div class="manage-caption px-30  bg-fff" @click="goOrder(elem,elem.Id, elem.GoodsName,elem.Image?elem.Image.ThumbnailsUrl:'', elem.CustomServiceQQ)">
              <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.GoodsName}}</span></div>
                <div class="manage-contn bg-faf">
                    <div class="mancon-img fl">
                      <i class="f22 color-fff bg-000">游戏帐号</i>
                      <span class="middle"></span>
                      <img :src="elem.Image.ThumbnailsUrl" v-if="elem.Image&&elem.Image.ThumbnailsUrl"><img v-else src="~images/default_img.jpg">
                    </div>
                    <div class="mancon-tn py-15">
                        <div class="tn-hxtxt f26 color-666">{{elem.GameName}} /{{elem.OperatorName}} /{{elem.AreaName}} </div>
                        <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.Id}}</div>
                        <div class="tn-hxtxt f26 color-666">商品价格：{{elem.GoodsTotalPrice}}元</div>
                    </div>
                </div>
            </div>
            <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
              <span class="title-curent f30 pl-30 color-000 fl buyct-why ">{{elem.OrderStatus|orderStatusFilter}}</span>
            </div>
                <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                  <a v-if="elem.OrderStatus==4&&elem.SyBizOfferType!=7" class="f30 color-fff border bg-m1 fr"  @click="getAccount(elem.Id, 'shouyou')">提取帐号</a>
                  <a class="f30 color-m1 border border-color cancel fr" @click="getService(elem.CustomServiceQQ)">联系客服</a>
                  <i class="titcur fr" @click="whyClick(elem.CustomServiceQQ)"></i>
                </div>
            </div>
            <div class="loading" v-show="loading" >加载中...</div>
            <div  class="list-empty bg-fff" v-show="shouyouOrderList2.length===0&&!loading">
              <p ><img src="~images/gamelogo.png"></p>
              <span >您还没有订单</span>
            </div>
        </div>
        <!--已付款-->

        <!--交易成功-->
        <div class="seller-03" v-show="payStatus===3">
            <div class="sellnage-connt mb-20"  v-for="elem in shouyouOrderList3" :key="elem.Id">
              <div class="manage-caption px-30  bg-fff" @click="goOrder(elem,elem.Id, elem.GoodsName,elem.Image?elem.Image.ThumbnailsUrl:'', elem.CustomServiceQQ)">
                <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.GoodsName}}</span></div>
                  <div class="manage-contn bg-faf">
                      <div class="mancon-img fl">
                        <i class="f22 color-fff bg-000">游戏帐号</i>
                        <span class="middle"></span>
                        <img :src="elem.Image.ThumbnailsUrl" v-if="elem.Image&&elem.Image.ThumbnailsUrl"><img v-else src="~images/default_img.jpg">
                      </div>
                      <div class="mancon-tn py-15">
                          <div class="tn-hxtxt f26 color-666">{{elem.GameName}} /{{elem.OperatorName}} /{{elem.AreaName}} </div>
                          <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.Id}}</div>
                          <div class="tn-hxtxt f26 color-666">商品价格：{{elem.GoodsTotalPrice}}元</div>
                      </div>
                  </div>
              </div>
                <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                  <span class="title-curent f30 pl-30 color-000 fl buyct-why ">{{elem.OrderStatus|orderStatusFilter}}</span>
                </div>
                <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                  <a v-if="elem.SyBizOfferType!=7" class="f30 color-fff bg-m1 fr"  @click="getAccount(elem.Id, 'shouyou')">提取帐号</a>
                  <a class="f30 color-m1 border border-color cancel fr" @click="getService(elem.CustomServiceQQ)">联系客服</a>
                  <i class="titcur fr" @click="whyClick(elem.CustomServiceQQ)"></i>
                </div>
            </div>
            <div class="loading" v-show="loading" >加载中...</div>
            <div  class="list-empty bg-fff" v-show="shouyouOrderList3.length===0&&!loading">
              <p ><img src="~images/gamelogo.png"></p>
              <span >您还没有订单</span>
            </div>
        </div>

        <!--交易成功-->

        <!--交易取消-->
        <div class="seller-04" v-show="payStatus===4">
            <div class="sellnage-connt mb-20"  v-for="elem in shouyouOrderList4" :key="elem.Id">
              <div class="manage-caption px-30  bg-fff" @click="goOrder(elem,elem.Id, elem.GoodsName, elem.Image?elem.Image.ThumbnailsUrl:'', elem.CustomServiceQQ, elem.CancelRemark,elem.IsFast)">
                <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.GoodsName}}</span></div>
                  <div class="manage-contn bg-faf">
                      <div class="mancon-img fl">
                        <i class="f22 color-fff bg-000">游戏帐号</i>
                        <span class="middle"></span>
                          <img :src="elem.Image.ThumbnailsUrl" v-if="elem.Image&&elem.Image.ThumbnailsUrl"><img v-else src="~images/default_img.jpg">
                      </div>
                      <div class="mancon-tn py-15">
                          <div class="tn-hxtxt f26 color-666">{{elem.GameName}}/{{elem.OperatorName}} /{{elem.AreaName}} </div>
                          <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.Id}}</div>
                          <div class="tn-hxtxt f26 color-666">商品价格：{{elem.GoodsTotalPrice}}元</div>
                      </div>
                  </div>
              </div>
                <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                  <span class="title-curent f30 pl-30 color-000 fl buyct-why ">取消原因：{{elem.CancelRemark}}</span>
                </div>
            </div>
            <div class="loading" v-show="loading" >加载中...</div>
            <div  class="list-empty bg-fff" v-show="shouyouOrderList4.length===0&&!loading">
              <p ><img src="~images/gamelogo.png"></p>
              <span >您还没有订单</span>
            </div>
        </div>
        <!--交易取消-->
</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import loadingComponent from 'components/common/Loading.vue'

export default {
  data() {
    return {
      paysta: true,
      paytext: '去付款'
    }
  },
  components: {
    loadingComponent
  },

  computed: {
    ...mapState({
        errMsg: state => {
            return state.buyerCenter.errMsg
        },
        warnMsg: state => {
            return state.buyerCenter.warnMsg
        },
        payStatus: state => {
            return state.buyerCenter.payStatus
        },
        loading: state => {
          return state.buyerCenter.loading
        },
        shouyouOrderList1: state => {
          return state.buyerCenter.shouyouOrderList1
        },
        shouyouOrderList2: state => {
          return state.buyerCenter.shouyouOrderList2
        },
        shouyouOrderList3: state => {
          return state.buyerCenter.shouyouOrderList3
        },
        shouyouOrderList4: state => {
          return state.buyerCenter.shouyouOrderList4
        },
        payUrl: state => {
          return state.buyerCenter.payUrl
        }

    }),
    ...mapGetters({
        //curSort: 'choice/SORTSTATUSNAME',
    })
  },
  created: function created() {

  },
  filters: {
    orderStatusFilter(sta) {
      switch (parseInt(sta)) {
        case 2:
          return '已付款'
          break;
        case 3:
          return '待发货'
          break;
        case 4:
          return '已发货'
          break;
        case 5:
          return '交易完成'
          break;
        case 6:
          return '已退款'
          break;
        case 7:
          return '已取消'
          break;
        case 8:
          return '待退款'
          break;
        default:

      }
    }
  },
  methods: {
    whyClick(qq) {
      this.$messagebox({
        message: "如点击联系客服无法启动QQ，请加客服QQ号("+qq+")"
      })
    },
    async shouyouPay(orderId) {
      if (this.paysta) {
        this.paysta = false
        this.$refs[orderId][0].text = '正在跳转'
        await this.mobileOrderPay({orderId:orderId,sourceChannel:2})
        this.paysta = true
        this.$refs[orderId][0].text = '去付款'
        location.href = 'https://mypay.5173.com/PaymentWap/PayExternalV2.aspx?' + this.payUrl
      }
    },
    getAccount(orderId, type) {
      this.$router.push({
        name: 'getAccount',
        params: {type:type,orderId:orderId}
      })
    },
    getService(qq) {
      if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
        this.$messagebox({
          message: "如点击联系客服无法启动QQ，请加客服QQ号("+qq+")"
        })
      }else {
        window.location.assign('mqqwpa://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web&web_src=oicqzone.com')
      }
    },
    goOrder(elem,orderId, gname, imgpath, CustomServiceQQ, CancelRemark) {
    	if(elem.IsFast){
		    this.$router.push({
			    name: 'fastOrder',
			    params: {orderId:orderId,type:'shouyou',fast:'fast'},
			    query: {
				    imgpath:encodeURIComponent(imgpath),
				    CancelRemark:CancelRemark
			    }
		    })
        }else{
		    this.$router.push({
			    name: 'buyerOrder',
			    params: {orderId:orderId,type:'shouyou'},
			    query: {
				    imgpath:encodeURIComponent(imgpath),
				    CancelRemark:CancelRemark
			    }
		    })
        }
    },
    ...mapActions({
        mainShouYouOrderList: 'buyerCenter/MAINSHOUYOUORDERLIST',
        mobileOrderPay: 'buyerCenter/MOBILEORDERPAY',
        clearErr: 'buyerCenter/CLEAR_ERR',
        clearWarn: 'buyerCenter/CLEAR_WARN',
    })
  }
}
</script>
<style src="css/common/member-cxy.css" scoped></style>
<style scoped>
.loading {
    text-align: left;
    text-indent: .6rem;
    line-height: .5rem;
    height: .5rem;
    background: url('~images/loading.gif') left center no-repeat;
    background-size: .5rem;
    margin-top: -.1rem;
    margin-left: 2.5rem;
}
</style>
