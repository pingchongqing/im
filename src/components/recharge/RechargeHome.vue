<template>
    <div id="wrapper">
        <!-- top -->
        <div class="top-header border-bottom fixed-top " ref="searchHeader">
            <div class="top-back">
                <a @click="back">返回</a>
            </div>
            <h2 class="f36"><input name="" class="recha-input f30 color-333" type="text" placeholder="搜索游戏"
                                   @click.prevent.stop="goSearch" readonly="readonly"></h2>
            <div class="top-right">
                <a class="back-home" @click="goHome"></a>
            </div>
        </div>
        <!-- 手游充值 -->
        <div class="recharge-list bg-fff mb-20 border-bottom f28 fw  ">
            <a v-for="(item,index) in topMenuList" :key="item.id" :href="item.url">
                <i :style="{
                background:'url(\'' + item.iconUrl + '\')',
                backgroundPosition: 'center 0',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.09rem'}"></i>
                {{item.iconName}}
            </a>
        </div>
        <div class="game-list bg-fff border-top fw" ref="tab">
            <rechargeCommonComponent :isHome="true" :tabTop="tabTop"></rechargeCommonComponent>
        </div>
    </div>
</template>

<script>
    import rechargeCommonComponent from "components/recharge/rechargeCommon/RechargeCommonComponent.vue"
    export default {
        data() {
            return {
                topMenuList: [],
                displayList: [],
                gameList: [],
                menuList: [],
                isHotActive: true,
                listQueryData: {},
                menuQueryData: {},
                menuIndex: -1,
                tabTop: 0,
                noScroll: false,
            }
        },
        components: {
            rechargeCommonComponent
        },
        created: function () {
            document.title = "手游充值-5173游戏交易平台";
        },
        mounted: function () {
            var self = this;
            self.getTopMenuList();
        },
        methods: {
            calHeights: function () {
                this.tabTop = this.$refs.tab.getBoundingClientRect().top - this.$refs.searchHeader.getBoundingClientRect().height;
            }
            ,
            getTopMenuList: function () {
                var self = this;
                self.$http.get(self.$CONSTANTS.APIRecharge + 'homeIconService/selectAll').then(function (response) {
                    if (response.data && response.data.responseStatus.code == "00" && response.data.homeIconConfigurationEOList &&
                            response.data.homeIconConfigurationEOList.length > 0) {
                        self.topMenuList = response.data.homeIconConfigurationEOList;
                        self.$nextTick(function () {
                            self.calHeights();
                        });
                    }
                }), (function (response) {
                    console.log(response);
                });
            }
            ,
            goSearch: function () {
                this.$router.push({name: 'rechargeSearch'});
            },
            goHome: function () {
                window.location.href = "/";
                //  this.$router.push({name: 'home'});
            },
            back: function () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>
    .recharge-list {
        margin-top: 1rem;
    }

</style>
