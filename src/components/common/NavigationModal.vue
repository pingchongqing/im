<template id="navigation-modal">
    <div @touchmove.prevent>
        <div id="navigation" @click="toggleModal"></div>
        <div id="navigationModal">
            <transition-group name="fadeDown" @before-Enter="beforeEnter">
                <div class="navigationList" v-show="modalEnable" id="navigationList" key="navigationList">
                    <div class="navigationBody f28 fw">
                        <a href="/" class="nav01"><span></span>主页</a>
                        <a href="/vue/choice/buyEntry?goodsType=3&typename=游戏币" class="nav02"><span></span>买游戏币</a>
                        <a href="/vue/choice/buyEntry?goodsType=2&typename=帐号"
                           class="nav03"><span></span>买帐号</a>
                        <a href="/dl/seek-usertype.html" class="nav04"><span></span>代练</a>
                        <a href="/vue/choice/buyEntry?goodsType=1&typename=装备"
                           class="nav07"><span></span>买装备</a>
                        <a href="/vue/center" class="nav08"><span></span>我的</a>
                        <!-- <a href="/arena/teamodel.html" class="nav05"><span></span>竞技场</a>
                        <a href="/goldGame/fruitMachines.html" class="nav06"><span></span>水果机</a> -->
                    </div>
                    <div class="navigationBuy f32 fw">
                        <router-link :to="{name: 'MGSellHome', params: {type: 2}}" class="toBuy">我要卖</router-link>
                    </div>
                    <div class="navigationClose fw" @click="toggleModal">
                        <a href="#" class="toClose">关闭</a>
                    </div>
                </div>
                <div class="maskdiv4" @click="toggleModal" v-show="modalEnable" key="mask" @touchmove.prevent></div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    export default {
        template: '#navigation-modal',
        data() {
            return {
                modalEnable: false,
            }
        },
        methods: {
            toggleModal: function () {
                var self = this;
                self.modalEnable = !self.modalEnable;
            },
            beforeEnter: function (el) {
                var list = document.getElementById("navigationList");
                list.style.width = "100%";
                list.style.maxWidth = 768 +"px";
                list.style.top =  this.$getScreenHeight()  * 0.25 + "px";
            },
        },
    }
</script>

<style scoped>

    .fadeDown-enter-active {
        animation: fadeInDown 0.5s;
        -webkit-animation: fadeInDown 0.5s;
    }

    .fadeDown-leave-active {
        animation: fadeOutDown 0.5s;
        -webkit-animation: fadeOutDown 0.5s;
    }
</style>
