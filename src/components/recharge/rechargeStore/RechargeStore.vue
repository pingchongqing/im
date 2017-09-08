<template>
    <div>
        <storeHeaderComponent :showAmount="true"></storeHeaderComponent>
        <div class="game-list bg-fff border-top fw mt-20">
            <div class="tab">
                <div class="tab-body">
                    <!-- 游戏 -->
                    <div class="tab-panel active">
                        <div class="game2 border-bottom">
                            <form action="" method="get" target="_self">
                                <span class="f30">店铺推荐游戏</span><input class="text-input f30" placeholder="首字母查询"
                                                                      type="text" value="" @click.prevent="goSearch">
                            </form>
                        </div>
                        <!-- 列表显示 -->
                        <div class="tab-class01 " :style="{ height: tabHeight + 'px'}" ref="gameList">
                            <ul>
                                <li v-for="(item,index) in displayList" :key="item.id">
                                    <a @click="nextPage(item)">
                                        <img :src="item.gameImageUrl">
                                        <p>{{item.gameName}}</p>
                                        <em class="f28 color-m1">
                                            <span v-if="item.minDiscount && item.minDiscount<10 && item.minDiscount>0">{{item.minDiscount}}折起</span>
                                            <span v-else> &nbsp</span>
                                        </em>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-letter fixed" :style="{ height: tabHeight + 'px'}">
                            <a @click="checkHot" :class="{'active':isHotActive}"><span class="hot-img"></span></a>
                            <a @click="checkMenu(item,index)" v-for="(item,index) in menuList"
                               :class="{'active':menuIndex==index && isHotActive==false}">{{item}}</a>
                            <div class="letter-bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
            <loadingComponent></loadingComponent>
            <goTopComponent controlId="gameList"></goTopComponent>
        </div>
    </div>
    </div>
</template>

<script>
    import goTopComponent from "components/common/GoTop.vue"
    import loadingComponent from "components/common/Loading.vue"
    import storeHeaderComponent from './RechargeStoreHeader.vue'
    export default {
        data() {
            return {
                displayList: [],
                gameList: [],
                menuList: [],
                tabHeight: 0,
                isHotActive: true,
                listQueryData: {},
                menuQueryData: {},
                menuIndex: -1,
            }
        },
        components: {
            goTopComponent,
            loadingComponent,
            storeHeaderComponent,
        },
        created: function () {
            this.setDefaultValues();
        },
        mounted: function () {
            var self = this;
            self.getGameList();
            self.getMenuList();
            self.$bus.emit('busShareUrl', window.location.href)
        },
        methods: {
            setDefaultValues: function () {
                let self = this;
                self.listQueryData.shopsId = self.$route.params.shopsId;
                self.menuQueryData.shopsId = self.$route.params.shopsId;
            }
            ,
            calHeight: function () {
                let self = this;
                self.tabHeight = this.$getScreenHeight()  - self.$refs.gameList.getBoundingClientRect().top - 1;
            }
            ,
            getGameList: function () {
                let self = this;
                self.$http.get(self.$CONSTANTS.APIRecharge + 'shopsGame/selectReleaseSheet', {
                    params: self.listQueryData,
                }).then(function (response) {
                    if (response.data && response.data.responseStatus.code == "00" && response.data.rechargeShopsGameEOList &&
                            response.data.rechargeShopsGameEOList.length > 0) {
                        self.gameList = response.data.rechargeShopsGameEOList;
                    }
                    self.$nextTick(function () {
                        self.calHeight();
                        self.checkHot();
                    });

                }), (function (response) {
                    console.log(response);
                });
            }
            ,
            getMenuList: function () {
                let self = this;

                self.$http.get(self.$CONSTANTS.APIRecharge + 'shopsGame/getRechargeGameNamePy', {
                    params: self.menuQueryData,
                }).then
                (function (response) {
                    if (response.data && response.data.responseStatus.code == "00" && response.data.gameNamePy &&
                            response.data.gameNamePy.length > 0) {
                        self.menuList = response.data.gameNamePy;
                    }
                }), (function (response) {
                    console.log(response);
                });
            }
            ,
            checkHot: function () {
                let self = this;
                self.isHotActive = true;
                self.displayList = self.gameList;
            }
            ,
            checkMenu: function (item, index) {
                let self = this;
                self.isHotActive = false;
                self.displayList = [];
                self.menuIndex = index;
                self.updateDisplayListByFirst(item);
            }
            ,
            updateDisplayList: function () {
                let self = this;
                let max = self.displayIndex * self.displaySize < self.gameList.length ? self.displayIndex * self.displaySize :
                        self.gameList.length;
                for (let i = (self.displayIndex - 1) * self.displaySize; i < max; i++) {
                    self.displayList.push(self.gameList[i]);
                }

                if (max == self.gameList.length) {
                    self.allLoaded = true;
                }

                if (self.displayIndex != 1)
                    self.$refs.loadmore.onBottomLoaded("loadmore");
            }
            ,
            updateDisplayListByFirst: function (item) {
                let self = this;
                self.$refs.gameList.scrollTop = 0;
                for (let i = 0; i < self.gameList.length; i++) {
                    if (self.gameList[i].pyfirst.toUpperCase() == item)
                        self.displayList.push(self.gameList[i]);
                }
            }
            ,
            nextPage: function (item) {
                this.$router.push({
                    name: 'rechargeStoreGoodsList',
                    params: {shopsId: item.shopsId},
                    query: {game_id: item.gameId}
                });
            }
            ,
            goSearch: function () {
                this.$router.push({name: 'rechargeStoreSearch', query: {shopsId: this.$route.params.shopsId}});
            }
        }
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>
    .game-list .tab-class01 {
        overflow-y: auto;
        padding-bottom: 2rem;
    }

    .game-list .tab-letter {
        overflow-y: auto;
        padding-bottom: 2rem;
    }

    .game-list {
        z-index: 19 !important;
    }
</style>
