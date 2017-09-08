<template>

  <div >
      <!--填充fixed留下的块-->
      <div class="fixedFill-mx" v-if="!app"></div>
      <!--顶部fixed部分-->
      <div class="fixed-top fixed-box" v-if="!app">
          <div class="top-header border-bottom">
              <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
              <h2 class="f36">帐号资料</h2>
              <div class="top-right"></div>
          </div>
      </div>
      <template v-if="type==='shouyou'">
        <template v-for="elem in accountInfo.GameProInfo" >
          <div class="title-number f32 border-bottom color-000 px-30">
              <span class="list-span fl">{{elem.Key}}</span>
              <span class="fast-span fr">{{elem.Value}}</span>
          </div>
        </template>
      <div class="title-number f32 border-bottom color-000 px-30">
          <span class="list-span fl">游戏名称</span>
          <span class="fast-span fr">{{accountInfo.GameName}}</span>
      </div>
      <div class="title-number f32 border-bottom color-000 px-30">
          <span class="list-span fl">客户端</span>
          <span class="fast-span fr">{{accountInfo.OperatorName}}</span>
      </div>
      <div class="title-number f32 border-bottom color-000 px-30">
          <span class="list-span fl">区服</span>
          <span class="fast-span fr">{{accountInfo.AreaName}}</span>
      </div>
    </template>
    <template v-if="type==='mobgoods'">
    <div class="title-number f32 border-bottom color-000 px-30">
        <span class="list-span fl">游戏帐号</span>
        <span class="fast-span fr">{{accountInfo[0]}}</span>
    </div>
    <div class="title-number f32 border-bottom color-000 px-30">
        <span class="list-span fl">游戏密码</span>
        <span class="fast-span fr">{{accountInfo[1]}}</span>
    </div>
    <div class="title-number f32 border-bottom color-000 px-30">
        <span class="list-span fl">角色</span>
        <span class="fast-span fr">{{accountInfo[2]}}</span>
    </div>
  </template>

  <template v-if="type==='pcgoods'">
  <div class="title-number f32 border-bottom color-000 px-30" v-for="elem in accountInfo" >
      <span class="list-span fl">{{elem.key}}</span>
      <span class="fast-span fr">{{elem.value}}</span>
  </div>
</template>

      <div class="fixedFill-mx"></div>
      <loadingComponent></loadingComponent>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import loadingComponent from 'components/common/Loading.vue'
export default {
  data() {
    return {
      type: this.$route.params.type,
      app: this.$route.query.app
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
        accountInfo: state => {
          return state.buyerCenter.accountInfo
        }

    }),
  },
  watch: {
    errMsg (msg) {
      if (msg && Object.keys(msg).length > 0) {
        this.$messagebox({
          title: '提示',
          message: msg.message,
          closeOnClickModal: false
        }).then(()=>{
          this.clearErr()
          if (msg.returnUrl) {
            location.href = msg.returnUrl
          }
        })
      } else {
        if (document.getElementsByClassName("mint-msgbox-wrapper").length > 0) {
          this.$messagebox.close()
        }
      }
    },
    warnMsg (msg) {
      if (msg && Object.keys(msg).length > 0) {
        this.$toast({
          message: msg.message,
          duration: msg.duration || 2500,
          position: msg.position || 'middle'
        })
        if (msg.duration) {
          setTimeout(() => {
            this.clearWarn()
          }, msg.duration)
        } else {
          setTimeout(() => {
            this.clearWarn()
          }, 3000)
        }
      }
    },
  },
  created: function created() {
    if (this.$route.params.type === 'shouyou') {
      this.getAccountInfo({orderId: this.$route.params.orderId})
    } else if (this.$route.params.type === 'mobgoods') {
      this.getMobAccountInfo({orderId: this.$route.params.orderId})
    } else if (this.$route.params.type === 'pcgoods') {
      this.getPcAccountInfo({orderId: this.$route.params.orderId})
    }
  },
  methods: {
    ...mapActions({
        getAccountInfo: 'buyerCenter/GETACCOUNTINFO',
        getMobAccountInfo: 'buyerCenter/GETMOBACCOUNTINFO',
        getPcAccountInfo: 'buyerCenter/GETPCACCOUNTINFO',
        clearErr: 'buyerCenter/CLEAR_ERR',
        clearWarn: 'buyerCenter/CLEAR_WARN',
    })
  }
}
</script>
<style src="css/member/member-order.css" scoped></style>
<style scoped="">
.list-span{
  width: auto;
}
.fast-span{
  width: auto;
}
</style>
