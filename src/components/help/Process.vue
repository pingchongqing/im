<template id="process-template">
  <div>
    <!--...........购买流程...............-->
    <transition name="slide-fade">
        <div class="process-main "  v-show="processShow">
            <div class="top-header border-bottom fixed-top">
                <div class="top-back">
                    <a class="goBack"  @click="backClick">返回</a>
                </div>
                <h2 class="f36 color-000">购买流程</h2>
            </div>
			<div class="fixedspace"></div>
            <div class="process-conn">
                <ul>
                    <li>
                        <div class="pro-left pro-left-bj"><span class="hover">1</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>选择商品后付款</h2>
                        </div>
                    </li>
                    <li>
                        <div class="pro-left"><span>2</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>在已购买的订单右下角，点击<em class="color-m1">"联系客服"</em>按钮，进行交易</h2>
                        </div>
                    </li>
                    <li class="bacder">
                        <div class="pro-left"><span>3</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>交易成功</h2>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </transition>
  </div>

</template>

<script>
    export default {
        template: '#process-template',
        data() {
          return {
            myShow: this.processShow
          }
        },
        props:['processShow'],
        watch: {
          myShow (val) {
            this.$emit('sonProcessShow', val)
          },
          processShow (val) {
            this.myShow = val
          }
        },
        methods: {
          backClick () {
            this.myShow = false
          }
        },
    }
</script>
<style src='css/common/list-cl.css' scoped></style>
<style scoped>
.process-main {
  position: fixed;
  top: 0;
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
