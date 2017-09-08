<template>
    <div>
        <div class="newfooter fixed-bottom" data-style="fixed-bottom" v-if="version==1">
            <!--在li中添加active类名可以改变图标和字体颜色-->
            <ul>
                <a href="/" class="foot-home">
                    <li :class="{'active':active==='home'}">
                        <span class="i_home">主页</span>
                    </li>
                </a>
                <router-link :to="{name: 'MGSellHome', params: {type: 1}}" class="foot-home">
                    <li class="">
                        <span class="i_mysell">我要卖</span>
                    </li>
                </router-link>
                <a href="/vue/message" class="foot-message" :class="{'active':active==='message'}">
                    <li class="">
                        <span class="i_message">消息</span>
                        <!--<span class="tsme"></span>-->
                    </li>
                </a>
                <a href="/vue/center" class="foot-home" :class="{'active':active==='center'}">
                    <li :class="{'active':active==='member'}">
                        <span class="i_tx">我的</span>
                        <span class="i_redDot" v-if="!isMemberRead"></span>
                    </li>
                </a>
            </ul>
        </div>

        <div class="index-foot fixed-bottom" data-style="fixed-bottom" v-if="version==2">
            <ul>
                <li><a href="/" class="foot-home" title="5173游戏交易平台">主页</a></li>
                <li><a href="/vue/seller" class="foot-sell" title="商品发布">我要卖</a></li>
                <li><a href="/dl/seek-usertype.html" class="" title="游戏代练">代练</a></li>
                <li><a href="/vue/message" class="foot-member" title="消息提示">消息</a></li>
                <li class="active"><a href="/vue/center" class="foot-member" title="个人中心">我的<span
                        class="badge2" v-if="!isMemberRead"></span></a></li>
            </ul>
            <!--在li中添加active类名可以改变图标和字体颜色-->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isMemberRead: true,
                version:1,
            }
        },
        props: ['active'],
        mounted(){
            if (document.cookie.match("yqhyhd")) {
                this.isMemberRead = true;
            }

        },
        methods: {}
    }
</script>


<style src="css/index-cl.css" scoped></style>
