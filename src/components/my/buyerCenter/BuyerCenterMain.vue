<template>
  <div>
    <div class="top-header border-bottom fixed-top" style="z-index:100">
      <div class="top-back">
          <a href="/vue/center">返回</a>
      </div>
      <h2 class="f36 color-000">我是买家</h2>
      <div class="top-right" @click="moreClick">
          <a class="sharelist"></a>
      </div>
    </div>
    <div class="seller-list" >
        <div class="mobile-order-tips py-20 px-30 mb-20 bg-fffdf4" v-if="tips">
            <i class="fl icon-close-yellow" @click="closeTips"></i>
            <p class="ml-20 fl f26 ">部分电脑版订单暂未同步至手机版,如需查看，请登录电脑版查询</p>
            <a class="fr text-center f26" href="http://trading.5173.com/list/viewmyorderlist.aspx">去电脑版</a>
        </div>
        <div class="border-top">
    	<div class="selist-manage f30 color-000 px-30 text-b bg-faf">
        <router-link :to="{ name: 'buyerMob', params: { status: 1}}">
          <span>手机端订单</span><i class="rightico"></i>
        </router-link>
      </div>
        </div>
        <div class="selist-tegory bg-fff border-bottom border-top mb-20 py-30">
                <ul>
                    <li class="fl">
                      <router-link :to="{ name: 'buyerMob', params: { status: 1}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerMobCount.waitPayCount}}</span>
                            <p class="f26 color-666">待付款</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'buyerMob', params: { status: 2}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerMobCount.paidCount}}</span>
                            <p class="f26 color-666">已付款</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'buyerMob', params: { status: 3}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerMobCount.receiveCount}}</span>
                            <p class="f24 color-666">交易成功</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'buyerMob', params: { status: 4}}">
                        <div class="gory-main">
                            <span class="fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerMobCount.canceledCount}}</span>
                            <p class="f24 color-666">交易取消</p>
                        </div>
                      </router-link>
                    </li>
                </ul>
            </div>

        <div class="border-top"><div class="selist-manage f30 color-000 px-30 text-b bg-faf">
            <router-link :to="{ name: 'buyerPc', params: { status: 1}}">
              <span>电脑端订单</span><i class="rightico"></i>
            </router-link>
          </div></div>
            <div class="selist-tegory bg-fff border-bottom border-top mb-20 py-30">
                <ul>
                    <li class="fl">
                      <router-link :to="{ name: 'buyerPc', params: { status: 1}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10  fontbold">
                              <template>
                                {{buyerCenterCount.buyerPcCount.waitPayCount}}
                              </template>
                            </span>
                            <p class="f26 color-666">待付款</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'buyerPc', params: { status: 2}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerPcCount.paidCount}}</span>
                            <p class="f26 color-666">已付款</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'buyerPc', params: { status: 3}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerPcCount.receiveCount}}</span>
                            <p class="f24 color-666">交易成功</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'buyerPc', params: { status: 4}}">
                        <div class="gory-main">
                            <span class="fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerPcCount.canceledCount}}</span>
                            <p class="f24 color-666">交易取消</p>
                        </div>
                      </router-link>
                    </li>
                </ul>
            </div>
        <div class="border-top"> <div class="selist-manage f30 color-000 px-30 text-b bg-faf">
              <router-link :to="{ name: 'pcMobGame', params: { status: 1}}">
                <span>电脑端手游订单</span><i class="rightico"></i>
              </router-link>
            </div></div>
            <div class="selist-tegory bg-fff border-bottom border-top mb-20 py-30">
                <ul>
                    <li class="fl">
                      <router-link :to="{ name: 'pcMobGame', params: { status: 1}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerShouyouCount.waitPayCount}}</span>
                            <p class="f26 color-666">待付款</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'pcMobGame', params: { status: 2}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerShouyouCount.paidCount}}</span>
                            <p class="f26 color-666">已付款</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'pcMobGame', params: { status: 3}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerShouyouCount.receiveCount}}</span>
                            <p class="f24 color-666">交易成功</p>
                        </div>
                      </router-link>
                    </li>
                    <li class="fl">
                      <router-link :to="{ name: 'pcMobGame', params: { status: 4}}">
                        <div class="gory-main">
                            <span class="fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerShouyouCount.canceledCount}}</span>
                            <p class="f24 color-666">交易取消</p>
                        </div>
                      </router-link>
                    </li>
                </ul>
            </div>
        <div class="border-top">  <div class="selist-manage f30 color-000 px-30 text-b bg-faf">
              <a href="/vue/members/member-buyer/store/paying">
                <span>商城订单</span><i class="rightico"></i>
              </a>
            </div>
        </div>
            <div class="selist-tegory bg-fff border-bottom border-top py-30">
                <ul>
                    <li class="fl">
                        <a href="/vue/members/member-buyer/store/paying">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-000 pb-10 fontbold">{{buyerCenterCount.buyerMallCount.waitPayment}}</span>
                            <p class="f26 color-666">待付款</p>
                        </div>
                        </a>
                    </li>
                    <li class="fl">
                        <a href="/vue/members/member-buyer/store/payed">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerMallCount.paid}}</span>
                            <p class="f26 color-666">已付款</p>
                        </div>
                        </a>
                    </li>
                    <li class="fl">
                        <a href="/vue/members/member-buyer/store/buy-success">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerMallCount.receive}}</span>
                            <p class="f24 color-666">交易成功</p>
                        </div>
                        </a>
                    </li>
                    <li class="fl">
                        <a href="/vue/members/member-buyer/store/buy-cancel">
                        <div class="gory-main">
                            <span class="fontarial f40 color-333 pb-10 fontbold">{{buyerCenterCount.buyerMallCount.canceled}}</span>
                            <p class="f24 color-666">交易取消</p>
                        </div>
                        </a>
                    </li>
                </ul>
            </div>

    </div>
    <loadingComponent></loadingComponent>
    <more></more>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import loadingComponent from 'components/common/Loading.vue'
import more from 'components/common/More.vue'
export default {
  data() {
    return {
      moreShow: false,
        tips:true
    }
  },
  components: {
    loadingComponent,
    more
  },
  computed: {
    ...mapState({
        errMsg: state => {
            return state.buyerCenter.errMsg
        },
        warnMsg: state => {
            return state.buyerCenter.warnMsg
        },
        buyerCenterCount: state => {
          return state.buyerCenter.buyerCenterCount
        }
    }),
    ...mapGetters({
        //curSort: 'choice/SORTSTATUSNAME',
    })
  },
  created: function created() {
    this.getDefaultData()

  },
  mounted: function mounted() {
    this.$bus.on('headMoreStatus', sta => {
      this.moreShow = sta
    })
  },
  methods: {
    moreClick() {
      this.moreShow = !this.moreShow
      this.$bus.emit('moreStatus', this.moreShow)
    },
    getDefaultData: async function getDefaultData() {
      this.getMobCount()
      this.getPcCount()
      this.getShouyouCount()
      this.getMallCount()
    },
      closeTips(){
        this.tips = false
      },
    ...mapActions({
        getMobCount: 'buyerCenter/GETBUYERMOBCOUNT',
        getPcCount: 'buyerCenter/GETBUYERPCCOUNT',
        getShouyouCount: 'buyerCenter/GETBUYERSHOUYOUCOUNT',
        getMallCount: 'buyerCenter/GETBUYERMALLCOUNT',
        clearErr: 'buyerCenter/CLEAR_ERR',
        clearWarn: 'buyerCenter/CLEAR_WARN',
    })
  }
}
</script>
<style src="css/common/member-cxy.css" scoped></style>
<style>
.seller-list {
  margin-top: .96rem
}
</style>
