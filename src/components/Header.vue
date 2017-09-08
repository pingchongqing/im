<template>
    <div @touchmove.prevent>
        <div class="top-header border-bottom" :class="topcls" v-if="showHeader" ref="header">
            <div class="top-home" v-if="requireSpecialBack && leftHomeShow">
                <a @click="Home"></a>
            </div>
            <div class="top-back" v-else>
                <a @click="Back"></a>
            </div>
            <h2 class="f36" v-text="headerText"></h2>
            <div class="top-right">
              <a v-show="isShowRightHome" class="back-home" href="/"></a>
            </div>
            <template v-if="isShare">
                <div class="head-share shareopen">
                    <a @click="Share">分享</a>
                </div>
            </template>
            <template v-if="isMore">
              <div class="show-right" @click="moreClick">
                <a class="sharelist"></a>
              </div>
            </template>
            <template v-if="isSwitch">
                <div class="top-right" @click="switchClick">
                    <a class="fl" :class="{'switch-hov':switchStatus,'switch':!switchStatus}"></a>
                </div>
            </template>
        </div>

        <shareComponmment v-if="isShare"></shareComponmment>
        <moreComponents v-if="isMoreHead && propMoreHead"></moreComponents>
    </div>
</template>

<script>
    import shareComponmment from 'components/common/Share.vue'
    import moreComponents from 'components/common/More.vue';
    export default {
      props: {
        'propMoreHead': { // 是否启用 moreComponents
          default: true
        },
        'ifGoBackHome': {
          default: false
        }
      },
      data() {
            return {
                headerText: "",
                // 如需使用， 在引用组件的mounted中开启，不要在created开启，也要在destroyed中关闭 this.$bus.emit('isShare', true); this.$bus.emit('isShare', false);
                showHeader: true,
                isShare: false,
                shareShow: false,
                //左上角的退后键，是否有特别逻辑要处理
                requireSpecialBack: false,
                //左上角是否要显示成首页
                leftHomeShow: false,
                historyLength: 1,
                topcls: 'fixed-top',
                isMore: false,
                moreShow: false,
                isShowRightHome: false,
                isSwitch: false,
                switchStatus:false,
                isBack:true,
                isMoreHead:true,
                showRightTools:false,//右边工具栏
                callback:()=>{}//此回调函数在isBack=false 的时候必须有，手动指定返回到那一页
            }
        },
        components: {
            shareComponmment,
            moreComponents
        },
        created: function created() {
            //do something after creating vue instance
            var self = this;
            self.$bus.on('headerText', function (text) {
                self.headerText = text;
            });
        },
        mounted() {
            var self = this;
            self.$bus.on('isShare', function (s) {
                self.isShare = s;
            });
            self.$bus.on('showHeader', function (dis) {
                self.showHeader = dis;
            });
            self.$bus.on('shareHead', function (dis) {
                self.shareShow = dis
            })
            self.$bus.on('headerText', function (text) {
                self.headerText = text;
            });
            self.$bus.on('isMoreHead', function (text) {
                self.isMoreHead = text;
            });
            //是否开启默认回退
            self.$bus.on('isBack',(val)=>{
                self.isBack = val;
            })
            //默认回退为false时，必须要有回调函数去返回
            self.$bus.on('callback',(fuc)=>{
                self.callback = fuc;
            });
            self.$bus.on('requireSpecialBack', function (rsb) {
                self.requireSpecialBack = rsb;
                self.historyLength = window.history.length

                if (self.requireSpecialBack) {
                    if (self.historyLength == 1 || document.referrer == "" )
                        self.leftHomeShow = true;
                    else
                        self.leftHomeShow = false;
                }

            });
            self.$bus.on('topcls', function (cls) {
                self.topcls = cls
            })
            self.$bus.on('isMore', function (sta) {
                self.isMore = sta;
            });
            self.$bus.on('headMoreStatus', function(sta) {
              self.moreShow = sta
              self.$bus.emit('moreStatus', self.moreShow)
            })
            self.$bus.on('isShowRightHome', function (s) {
                self.isShowRightHome = s;
            });
            self.$bus.on('isSwitch', function (sw) {
                self.isSwitch = sw;
            });
            self.$bus.on('switchStatus', function (ss) {
                self.switchStatus = ss;
            });
        },
        methods: {
            moreClick() {
                this.moreShow = !this.moreShow
                this.$bus.emit('moreStatus', this.moreShow)
            },
            switchClick(){
                this.switchStatus = !this.switchStatus
                this.$bus.emit('switchStatus', this.switchStatus)
            },
            Back() {
                let vm = this;
                if (vm.isBack) {
                  vm.ifGoBackHome && history.length <= 2 ?
                    window.location.href = '/' :
                    this.$router.go(-1);
                }else{
                    vm.callback();
                }

            },
            Share() {
                this.shareShow = !this.shareShow;
                this.$bus.emit('shareShow', this.shareShow);
            },
            Home() {
                window.location.href = "/";
                //  this.$router.push({name: 'home'});
            }
        }
    }
</script>

<style scoped>
    .top-header {
        z-index: 62 !important;
    }

    .abs-top {
        position: absolute !important;
        top: -.96rem;
        max-width: 768px;
    }
    .show-right {
      position: fixed;
      z-index: 63 !important;
      top: 0;
      right: 0;
      min-width: 10%;
      font-size: 0;
      height: .96rem;
      line-height: .96rem;
      -webkit-text-size-adjust: none;
      text-align: right
    }
    .sharelist {
      display: inline-block;
      height: .96rem;
      min-width: .75rem;
      width: 100%;
      text-indent: -9999px;
      background: url(~images/header-member-top.png) 0 center no-repeat;
      background-size: .49rem;
    }
</style>
