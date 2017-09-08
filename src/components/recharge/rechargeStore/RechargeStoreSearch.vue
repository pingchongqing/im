<template>
    <div>
        <div class="top-search border-bottom">
            <div class="container-ms">
                <img src="~images/search4.png" alt="搜索">
                <input class="search" type="text" placeholder="请输入游戏名称或首字母" maxlength="20"
                       v-model.trim="searchInput">
                <span class="clear" v-show="searchInput.length > 0" @click="clear"></span>
                <a @click="back">取消</a>
            </div>
        </div>
        <div class="search-result f28" v-show="hasResult && searchInput.length > 0">
            <ul>
                <li v-for="(item,index) in searchResult" :key="item.id">
                    <img class="mobilegame" src="~images/icon-mobilegame.png" alt="手游">
                    <a @click="nextPage(item)">{{item.gameName}}</a>
                    <img class="to-right" src="~images/pllist-ico.png" alt="向右">
                </li>
            </ul>
        </div>

        <div class="search-empty" v-show="!hasResult && searchInput.length > 0">
            <img src="~images/gamelogo.png" alt="">
            <p>抱歉，没有找到 "<span class="search-content">{{searchInput}}</span>" 的相关结果</p>
        </div>

        <div v-show="searchInput.length == 0">
            <div class="hot-game border-bottom" v-if="hotSearchResult && hotSearchResult.length>0">
                <div class="container-ms">
                    <div class="title border-bottom">
                        店铺推荐游戏
                    </div>
                    <div class="game-list">
                        <ul class="clearfix">
                            <li v-for="(item,index) in hotSearchResult" :key="item.id">
                                <a @click="nextPage(item)">{{item.gameName}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //输入框输入的值
                searchInput: "",
                //某个输入的值，没有搜索结果，那么包含这个字段的字符串都不用发送请求
                noResultSearchInput: "",
                _searchHtpSending: true,
                hasResult: false,
                searchQueryData: {},
                searchHotQueryData: {},
                gameList: {},
                postData: {},
                //搜索结果
                searchResult: null,
                //热搜结果
                hotSearchResult: null,
            }
        },
        watch: {
            searchInput(curVal, oldVal){
                let self = this;
                if (curVal && !self._searchHtpSending) {
                    if (self.noResultSearchInput && self.searchInput.indexOf(self.noResultSearchInput) != -1) {
                        return false;
                    }
                    else {
                        self.searchQueryData.keyWord = curVal;
                        self.search();
                    }
                }
            },
        },
        created() {
            this.setDefaultValues();
            this.getHotData();
            this.getGameList();
        },
        methods: {
            back: function () {
                this.$router.go(-1);
            },
            clear: function () {
                this.searchInput = "";
                this.noResultSearchInput = "";
            },
            nextPage: function (item) {
                let self = this;
                let postParamData = {};
                postParamData.shopsId = item.shopsId;
                self.postData.game_id = item.gameId;
                self.getTypesByShortName(item.gamePlatformType);
                self.$router.push({
                    name: "rechargeStoreGoodsList",
                    params: postParamData,
                    query: self.postData,
                })
            },
            getGameList: function () {
                let self = this;
                let listQueryData = {};
                listQueryData.shopsId = self.$route.query.shopsId;
                self._searchHtpSending = true
                self.$http.get(self.$CONSTANTS.APIRecharge + 'shopsGame/selectReleaseSheet', {
                    params: listQueryData,
                }).then(function (response) {
                    if (response.data && response.data.success && response.data.rechargeShopsGameEOList &&
                            response.data.rechargeShopsGameEOList.length > 0) {
                        self.gameList = response.data.rechargeShopsGameEOList;
                    }
                    self._searchHtpSending = false;
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
            }
            ,
            setDefaultValues: function () {
                let self = this;
                self.searchQueryData.is_recharge = true;
                self.searchQueryData.game_type = 2;
                self.searchQueryData.page = 1;
                self.searchQueryData.pageSize = 10;
                self.searchQueryData.sort = "sort|-";
                self.searchHotQueryData.shopsId = self.$route.query.shopsId;
                ;
            }
            ,
            getHotData: function () {
                let self = this;
                self.$http.get(self.$CONSTANTS.APIRecharge + 'shopsGame/getShopRecommend', {
                    params: self.searchHotQueryData,
                }).then(function (response) {
                    if (response.data && response.data.responseStatus.code == "00" && response.data.rechargeShopsGameEOList &&
                            response.data.rechargeShopsGameEOList.length > 0) {
                        self.hotSearchResult = response.data.rechargeShopsGameEOList;
                    }
                }), (function (response) {
                    console.log(response);
                });
            }
            ,

            search: function () {
                let self = this;
                self.searchResult = [];
                for (let i = 0; i < self.gameList.length; i++) {
                   if(self.gameList[i].gameName.indexOf(self.searchInput) != -1|| self.gameList[i].gameNamePy.indexOf(self.searchInput) != -1)
                    self.searchResult.push(self.gameList[i]);
                }

                if (self.searchResult.length > 0) {
                    self.hasResult = true;
                }
                else {
                    self.noResultSearchInput = self.searchInput;
                    self.hasResult = false;
                }
            }
            ,
        },
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style scoped>
    .top-search input {
        color: #000 !important;
    }
</style>
