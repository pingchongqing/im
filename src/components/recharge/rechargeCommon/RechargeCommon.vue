<template>
    <div >
        <div class="classCommon" ref="classCommon">
            <div class="fixedFill-mx"></div>
            <div class="top-search py-20 px-30 bg-c9c" @click="goSearch">
                <div class="container-ms">
                    <!-- <img src="~images/search4.png"  alt=" 搜索">
                    <input disabled="disabled"  type="text" placeholder="搜索" class="search"> -->
                    <div class="container-inp">
                        <span>搜索游戏</span>
                    </div>
                </div>
            </div>
        </div>
        <div ref="tab" class="tab">
            <rechargeCommonComponent :isHome="false" :tabTop=tabTop></rechargeCommonComponent>
        </div>
    </div>
</template>

<script>
    import rechargeCommonComponent from "components/recharge/rechargeCommon/RechargeCommonComponent.vue"
    export default{
        data() {
            return {
                tabTop: 0,
                noScroll:false,
            }
        },
        components: {
            rechargeCommonComponent,
        },
        mounted: function () {
            var self = this;
            this.$bus.emit('headerText', "请选择游戏");
            self.$nextTick(function () {
                self.calHeights();
            });
        },
        methods: {
            goSearch: function () {
                var self = this
                let postData = {};
                postData.gamePlatformType = self.$route.query.gamePlatformType;
                self.$router.push({name: 'rechargeSearch', query: postData});
            },
            calHeights: function () {
                this.tabTop = this.$refs.tab.getBoundingClientRect().top - this.$refs.classCommon.getBoundingClientRect().height+2;
            }
        },
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>
    .fixedFill-mx {
        width: 100%;
        height: .96rem;
    }

    .tab {
        position: relative;
        top: 2.08rem;
    }

    .classCommon {

        position: fixed;
        width: 100%;
        max-width: 768px;
        /* top: 0rem; */
        z-index: 20;
    }

    .container-ms {
        padding: 0;
        text-align: center;
    }

    .container-ms .container-inp {
        display: block;
        background-color: #fff;
        height: 0.62rem;
        line-height: 0.62rem;
        color: #8e8e93;
        border-radius: 0.1rem;
    }

    .container-ms span {
        display: inline-block;
        padding-left: 0.45rem;
        background: url(/dist/search4.png?f1c7c4fe050302588bbeed8011ab1ff2) no-repeat left center;
        background-size: 0.33rem;
        font-size: .3rem;
    }

</style>
