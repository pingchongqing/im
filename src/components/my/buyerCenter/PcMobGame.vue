<template>
  <div>
    <div class="top-header border-bottom fixed-top" style="z-index:99">
      <div class="top-back">
          <a href="/vue/buyerCenter/buyerCenterMain">返回</a>
      </div>
      <h2 class="f36 color-000">电脑端手游订单</h2>
      <div class="top-right">
          <a @click="moreClick" class="sharelist"></a>
      </div>
    </div>

    <!-- 买家列表 -->
  <div class="sellmanage-main mt-205">
       <div class="sellnage-nav tab fixed-top border20-bottom mt-97">
          <ul class="tab-nav">
              <li class="fl border-bottom f30 " :class="{active: payStatus===1}"><a class="nav-01" @click="goOrderStatus(1)">待付款</a></li>
              <li class="fl border-bottom f30 " :class="{active: payStatus===2}"><a class="nav-02" @click="goOrderStatus(2)">已付款</a></li>
              <li class="fl border-bottom f30 " :class="{active: payStatus===3}"><a class="nav-03" @click="goOrderStatus(3)">交易成功</a></li>
              <li class="fl border-bottom f30 " :class="{active: payStatus===4}"><a class="nav-04" @click="goOrderStatus(4)">交易取消</a></li>
          </ul>
      </div>

    <PcMobGameComponent :status="payStatus"></PcMobGameComponent>
    <more></more>

</div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import PcMobGameComponent from './PcMobGameComponent'
import more from 'components/common/More.vue'
export default {
  data() {
    return {
      status: this.$route.params.status,
      moreShow: false,
    }
  },
  components: {
    PcMobGameComponent,
      more
  },
  computed: {
    ...mapState({
        pageIndex: state => {
            return state.buyerCenter.pageIndex
        },
        pageSize: state => {
            return state.buyerCenter.pageSize
        },
        payStatus: state => {
            return state.buyerCenter.payStatus
        },
        isOrderLoadAll1: state => {
          return state.buyerCenter.isOrderLoadAll1
        },
        isOrderLoadAll2: state => {
          return state.buyerCenter.isOrderLoadAll2
        },
        isOrderLoadAll3: state => {
          return state.buyerCenter.isOrderLoadAll3
        },
        isOrderLoadAll4: state => {
          return state.buyerCenter.isOrderLoadAll4
        },
        errMsg: state => {
            return state.buyerCenter.errMsg
        },
        warnMsg: state => {
            return state.buyerCenter.warnMsg
        },

    }),
    ...mapGetters({
        //curSort: 'choice/SORTSTATUSNAME',
    })
  },
  watch:{
    '$route':'fetchData'
  },
  created: function created() {
    this.fetchData()
  },
  mounted: function mounted() {
    this.$bus.emit('headerText', '我是买家')
    this.$bus.emit('isShowRightHome', true)
    window.addEventListener('scroll', this.scrollHander)
    this.$bus.on('headMoreStatus', sta => {
      this.moreShow = sta
    })
  },
  beforeDestroy: function beforeDestroy() {
    this.$bus.emit('isShowRightHome', false)
    window.removeEventListener('scroll', this.scrollHander)
  },
  methods: {
    moreClick() {
      this.moreShow = !this.moreShow
      this.$bus.emit('moreStatus', this.moreShow)
    },
    fetchData() {
      this.orderStatus(parseInt(this.$route.params.status))
    },
    async scrollHander() {
      if (document.body.scrollHeight - document.body.scrollTop - this.$getScreenHeight() < 500) {
        if (!this['isOrderLoadAll'+this.payStatus]) {
            this.setPageIndex(this.pageIndex + 1)
            this.setLoading(true)
            await this.mainShouYouOrderList({
              payStatus: this.payStatus,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            })
            this.setLoading(false)
        }
      }
    },
    goOrderStatus(s) {
      this.$router.push({
        name: 'pcMobGame',
        params: {
          status: s
        }
      })
    },
    async orderStatus(s) {
      this.changePayStatus(s)
      this.setPageIndex(1)
      this.clearList({orderType: 'shouyou', status: this.payStatus})
      this.setLoading(true)
      await this.mainShouYouOrderList({
        payStatus: s,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      this.setLoading(false)
    },
    ...mapActions({
        changePayStatus: 'buyerCenter/CHANGEPAYSTATUS',
        mainShouYouOrderList: 'buyerCenter/MAINSHOUYOUORDERLIST',
        setPageIndex: 'buyerCenter/SETPAGEINDEX',
        setLoading: 'buyerCenter/SETLOADING',
        clearList: 'buyerCenter/CLEARLIST',
        clearErr: 'buyerCenter/CLEAR_ERR',
        clearWarn: 'buyerCenter/CLEAR_WARN',
    })
  }
}
</script>
<style src="css/common/member-cxy.css" scoped></style>
