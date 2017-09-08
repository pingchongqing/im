<template>
    <div>
        <!---------------------------- search ---------------------------->
        <div class="search-game border-bottom fw ">
            <div class="sgame fw bg-fff f30">
                <span>请选择游戏</span>
            </div>
        </div>
        <!---------------------------- 游戏列表 ------------------------------>
        <div class="search-game">
            <div class="tab" ref="tab">
                <div class="tab-body" v-show="displayList.length>0">
                    <div class="tab-class01" :style="{ height: tabHeight + 'px'}" ref="gameList">
                        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                                     :bottom-all-loaded="allLoaded" ref="loadmore">
                            <ul>
                                <li v-for="(item,index) in displayList" :key="item.id">
                                    <a @click="nextPage(item)">
                                        <img v-lazy.loadmore="item.gameImageUrl">
                                        <p>{{item.name}}</p></a>
                                </li>
                            </ul>
                            <div slot="bottom" class="mint-loadmore-bottom">
                                <mt-spinner type="snake" v-show="bottomStatus === 'loading'"></mt-spinner>
                            </div>
                        </mt-loadmore>
                    </div>
                    <div class="tab-letter fixed" :style="{ height: tabHeight + 'px'}">
                        <a @click="checkHot" :class="{'active':isHotActive}"><span class="hot-img"></span></a>
                        <a @click="checkMenu(item,index)" v-for="(item,index) in menuList"
                           :class="{'active':menuIndex==index && isHotActive==false}">{{item}}</a>
                        <div class="letter-bottom"></div>
                    </div>
                </div>
            </div>
            <loadingComponent></loadingComponent>
            <goTopComponent controlId="gameList"></goTopComponent>
        </div>
    </div>
</template>

<script>
    import goTopComponent from "../common/GoTop.vue"
    import loadingComponent from "../common/Loading.vue"
    export default {
        data() {
            return {
                //浏览器获得的参数
                listQueryData: {},
                menuQueryData: {},
                //需要传给下个页面的参数
                postData: {},
                //计算tab的长度
                tabHeight: 0,
                //从服务端获得的游戏列表，菜单列表,点首字母获得的列表
                gameList: [],
                menuList: [],
                isHotActive: true,
                menuIndex: -1,
                //显示列表
                displayList: [],
                displayIndex: 1,
                displaySize: 81,
                //loadmore 组件使用
                bottomStatus: '',
                allLoaded: false,
            }
        },
        components: {
            goTopComponent,
            loadingComponent,
        },
        created: function () {
            this.setDefaultValues();
        },
        mounted: function () {
            var self = this;
            Promise.all([
                self.getGameList(),
                self.getMenuList(),
            ]).then(function () {
                self.calHeight();
                self.checkHot();
            });
        },
        methods: {
            setDefaultValues: function () {
                var self = this;
                self.listQueryData.goodsType = self.$route.query.goodsType;
                self.listQueryData.pageIndex = 1;
                self.listQueryData.pageSize = 9999;

                self.menuQueryData.goodsTypeId = self.$route.query.goodsType;
                //正常情况是不需要gameType的，因为后台方法有问题，需要整改，暂时加上，以后在要去掉的
                self.menuQueryData.gameType = 1;
                self.$bus.emit('headerText', self.$route.query.tName);
            },
            calHeight: function () {
                var self = this;
                if (self.$refs.tab)
                    self.tabHeight = window.screen.height - self.$refs.tab.getBoundingClientRect().top;
            },
            getGameList: function () {
                var self = this;
                return new Promise(function (resolve, reject) {
                    self.$http.get(self.$CONSTANTS.APICategory + 'category/searchgamelistbygoodstype', {
                        params: self.listQueryData,
                    }).then(function (response) {
                        if (response.data && response.data.responseStatus.code == "00" && response.data.categoryList &&
                                response.data.categoryList.length > 0) {
                            for (var i = 0; i < response.data.categoryList.length; i++) {
                                self.gameList.push(response.data.categoryList[i]);
                            }
                        }
                        resolve();
                    }), (function (response) {
                        reject();
                    });
                });
            },
            getMenuList: function () {
                var self = this;
                return new Promise(function (resolve, reject) {
                    self.$http.get(self.$CONSTANTS.APICategory + 'category/getgamepy', {
                        params: self.menuQueryData,
                    }).then
                    (function (response) {
                        if (response.data && response.data.responseStatus.code == "00") {
                            self.menuList = response.data.py;
                        }
                        resolve();
                    }), (function (response) {
                        reject();
                    });
                });
            },
            nextPage: function (item) {
                var self = this;
                let path = "";
                self.postData.gName = item.name;
                self.postData.gameId = item.catagoryId;
                if (self.listQueryData.goodsType)
                    self.postData.goodsType = self.listQueryData.goodsType;

                if (item.type == 1) {
                    path = "./searchArea";
                }
                else {
                    path = "./searchPlatForm";
                }
                self.$router.push({
                    path: path,
                    query: self.postData,
                })
            },
            checkHot: function () {
                var self = this;
                self.isHotActive = true;
                self.allLoaded = false;
                self.displayList = [];
                self.displayIndex = 1;
                self.updateDisplayList();
            },
            checkMenu: function (item, index) {
                var self = this;
                self.isHotActive = false;
                self.allLoaded = true;
                self.displayList = [];
                self.menuIndex = index;
                self.updateDisplayListByFirst(item);
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {
                var self = this;
                self.displayIndex++;
                self.updateDisplayList();
            },
            updateDisplayList: function () {
                var self = this;
                var max = self.displayIndex * self.displaySize < self.gameList.length ? self.displayIndex * self.displaySize :
                        self.gameList.length;
                for (var i = (self.displayIndex - 1) * self.displaySize; i < max; i++) {
                    self.displayList.push(self.gameList[i]);
                }

                if (max == self.gameList.length) {
                    self.allLoaded = true;
                }

                if (self.displayIndex != 1)
                    self.$refs.loadmore.onBottomLoaded("loadmore");
            },
            updateDisplayListByFirst: function (item) {
                var self = this;
                self.$refs.gameList.scrollTop = 0;
                for (var i = 0; i < self.gameList.length; i++) {
                    if (self.gameList[i].pyfirst.toUpperCase() == item)
                        self.displayList.push(self.gameList[i]);
                }
            },
        }
        ,
    }
</script>

<style scoped>
    @import "../../assets/css/common/common-zyp.css";
    @import "../../assets/css/search/search-game-cl.css";

    .color-#75e46 {
        color: #f75e46;
    }

    .mint-loadmore-bottom {
        text-align: center;
    }

    .mint-loadmore-bottom span {
        display: inline-block;
        -webkit-transition: .2s linear;
        transition: .2s linear;
        vertical-align: middle;
        width: 100%;
    }

    .mint-spinner-snake {
        -webkit-animation: rotate .8s infinite linear;
        animation: rotate .8s infinite linear;
        border: 4px solid transparent;
        border-radius: 50%;
        margin: auto;
    }

    .search-game img {
        margin: auto;
    }

    .search-game .tab-class01 {
        overflow-y: auto;
        position: relative;
    }

    .search-game .tab-letter {
        overflow-y: auto;
    }

    img[lazy=loading] {
        -webkit-animation: rotate .8s infinite linear;
        animation: rotate .8s infinite linear;
        border: 4px solid transparent;
        margin: auto;
        background-color: #ddd;
    }

    /*    .search-game .tab {
            position: fixed;
        }*/

</style>