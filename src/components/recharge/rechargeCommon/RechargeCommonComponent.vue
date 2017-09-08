<template id="recharge-common">
    <div class="game-list bg-fff border-top fw">
        <!-- 游戏 -->
        <div class="tab-panel active" :style="{ 'height': tabHeight }">
            <!-- 列表显示 -->
            <div class="tab-class01" ref="tabClass">
                <ul>
                    <li v-for="item in list" @click="goList(item)">
                                <span>
                                <img :src="item.gameImageURL"></span>
                        <p>{{item.gameName}}</p><em v-if="item.minDiscount < 10 && item.minDiscount > 0"
                                                    class="f28 color-m1">{{item.minDiscount}}折起</em>
                    </li>
                </ul>
            </div>
            <div class="tab-letter" ref="tabLetter"
                 :class="{'tab-letter-fixed': isLetterFixed,'home-top':isLetterFixed && isHome,'top':isLetterFixed && !isHome}"
                 :style="{ 'height':isLetterFixed? fixLetterHeight+'px' :letterHeight}">
                <a @click="searchGame('')" :class="{active:active === ''}"><span
                        class="hot-img"></span></a>
                <a v-for="(item,index) in navList" @click="searchGame(item)"
                   :class="{active:active === item}">
                    {{item}}
                </a>
            </div>
        </div>
        <loadingComponent></loadingComponent>
        <goTopComponent></goTopComponent>
    </div>
</template>

<script >
    import goTopComponent from "components/common/GoTop.vue"
    import loadingComponent from "components/common/Loading.vue"
    export default{
        template: '#recharge-common',
        data(){
            return {
                navList: [],
                list: [],
                hotParams: {
                    isHotSearch: this.$route.query.isHotSearch || true,
                    gamePlatformType: this.$route.query.gamePlatformType || "SYCZ"
                },
                menuParams: {
                    gamePlatformType: this.$route.query.gamePlatformType || "SYCZ"
                },
                postData: {},
                active: '',
                isLetterFixed: false,
                scrollTop: null,
                fixLetterHeight: 0,
                tabHeight: "100%",
                letterHeight: "100%",
            }
        },
        props: ['isHome', 'tabTop'],
        components: {
            goTopComponent,
            loadingComponent
        },
        created: function () {
            var vm = this;
            vm.getRechargePy();
        },
        mounted: function () {
            this.searchGameByAliYun();
            window.addEventListener('scroll', this.watchGoTop, false);
        },
        watch: {
            scrollTop: {
                handler: function (val, oldVal) {
                    let self = this;
                    if (self.isHome) {
                        self.fixLetterHeight = self.$getScreenHeight() - self.$parent.$refs.searchHeader.getBoundingClientRect().height;
                    }
                    else {
                        self.fixLetterHeight = self.$getScreenHeight() - self.$parent.$refs.classCommon.getBoundingClientRect().height;
                    }
                    self.letterHeight = self.$getScreenHeight() - self.$parent.$refs.tab.getBoundingClientRect().top - 2;

                    self.letterHeight = self.letterHeight > self.fixLetterHeight ? self.fixLetterHeight : self.letterHeight;


                    self.letterHeight = self.letterHeight.toString() + 'px';
                    if (val > self.tabTop) {
                        self.isLetterFixed = true;
                    }
                    else {
                        self.isLetterFixed = false;
                    }

                },
                deep: true
            }
        },
        methods: {
            watchGoTop: function () {
                var self = this;
                self.scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
            },
            getRechargePy: function () {
                let vm = this;
                vm.$http.get(
                        vm.$CONSTANTS.APIRecharge +
                        'HotSearches/selectHotGamePy', {
                            params: vm.menuParams,
                        }).then(response=> {
                    let data = response.data;
                    if (data.success && data.list) {
                        vm.navList = data.list;
                    }
                }, response=> {
                    console.log(this);
                });
            },
            searchGameByAliYun: function () {
                let vm = this;
                vm.$http.get(
                        vm.$CONSTANTS.APIRecharge +
                        'HotSearches/selectHotGame', {
                            params: vm.hotParams,
                        }).then(response=> {
                    let data = response.data;
                    if (data.success && data.hotGameEOList && data.hotGameEOList.length > 0) {
                        vm.list = data.hotGameEOList;
                    }
                    vm.$nextTick(function () {
                        if (vm.$refs.tabClass.getBoundingClientRect().height < vm.$getScreenHeight() - vm.$refs.tabClass.getBoundingClientRect().top) {
                            vm.tabHeight = (vm.$getScreenHeight() - vm.$refs.tabClass.getBoundingClientRect().top ).toString() + "px";
                        }
                        else {
                            vm.tabHeight = "100%";
                        }
                    });
                }, response => {
                    console.log(this);
                })
            },
            searchGame: function (value) {

                let vm = this;
                if (vm.active == value)
                    return false;
                vm.list = [];
                vm.active = value;
                if (vm.active) {
                    vm.hotParams.firstPy = value;
                    vm.hotParams.isHotSearch = false;
                }
                else {
                    vm.hotParams.firstPy = null;
                    vm.hotParams.isHotSearch = true;
                }
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

                vm.searchGameByAliYun();
            },
            goList: function (item) {
                let self = this;
                self.postData.game_id = item.gameId;
                self.postData.game_name = item.gameName;
                self.getTypesByShortName(self.hotParams.gamePlatformType);
                self.$router.push({
                    name: 'goodsList',
                    query: self.postData,
                })
            },
            getTypesByShortName: function (shortName) {
                let self = this;
                switch (shortName) {
                    case "PGDC":
                        self.postData.recharge_type = 1;
                        self.postData.platform_type = 2;
                        break;
                    case "PGSCH":
                        self.postData.recharge_type = 2;
                        self.postData.platform_type = 2;
                        break;
                    case "AZDC":
                        self.postData.recharge_type = 1;
                        self.postData.platform_type = 1;
                        break;
                    case "AZSCH":
                        self.postData.recharge_type = 2;
                        self.postData.platform_type = 1;
                        break;
                    default:
                        break;
                }
            },
        },
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>

    .game-list .tab-panel {
        display: block;
        overflow: hidden;
        height: auto;
        position: relative;
        padding-bottom: 0.5rem;
    }

    .game-list .tab-letter {
        overflow-y: auto;
        padding-bottom: 0.5rem;
        z-index: 19 !important;
        position: absolute;
        display: block;
        overflow-x: hidden;
        height: 100%;
    }

    .game-list .tab-letter-relative {
        position: relative;
    }

    .game-list .tab-letter-fixed {
        position: fixed !important;
        overflow-y: auto;
    }

    .home-top {
        top: 1rem;
    }

    .top {
        top: 2.1rem;
    }


</style>
