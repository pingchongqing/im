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
        <div class="search-result f28" v-show="hasResult && searchInput.length > 0 && !_searchHtpSending ">
            <ul>
                <li v-for="(item,index) in searchResult" :key="item.id">
                    <img class="mobilegame" src="~images/icon-mobilegame.png" alt="手游">
                    <a @click="nextPage(item)">{{item.gameName}}</a>
                    <img class="to-right" src="~images/pllist-ico.png" alt="向右">
                </li>
            </ul>
        </div>

        <div class="search-empty" v-show="!hasResult && searchInput.length > 0 && !_searchHtpSending ">
            <img src="~images/gamelogo.png" alt="">
            <p>抱歉，没有找到 "<span class="search-content">{{searchInput}}</span>" 的相关结果</p>
        </div>

        <div v-show="searchInput.length == 0">
            <div class="search-history border-bottom" v-if="hasHistory">
                <div class="container-ms">
                    <div class="title border-bottom">
                        搜索历史
                        <span class="close" @click="clearHistory"></span>
                    </div>
                    <div class="game-list">
                        <ul class="clearfix">
                            <li v-for="(item,index) in historySearchResult" :key="item.id" v-if="index<6">
                                <a @click="nextPage(item)">{{item.gameName}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="hot-game border-bottom" v-if="hotSearchResult && hotSearchResult.length>0">
                <div class="container-ms">
                    <div class="title border-bottom">
                        热搜游戏
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
                _searchHtpSending: false,
                hasResult: false,
                hasHistory: false,
                searchQueryData: {},
                searchHotQueryData: {},
                postData: {},
                //搜索结果
                searchResult: null,
                //热搜结果
                hotSearchResult: null,
                //历史搜索结果
                historySearchResult: null,
                browseHistoryData: [],
                isLogin: null,
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
                        self._searchHtpSending = true;
                        self.search();
                    }
                }
            },
        },
        created() {
            this.setDefaultValues();
            this.getHotData();
            this.getLoginState();
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
                let gameName = item.gameName || item.name;
                self.postData.game_id = item.gameId || item.game_id;
                self.postData.game_name = gameName;
                self.getTypesByShortName(item.gamePlatformType || self.$route.query.gamePlatformType);
                self.updateHistoryData(gameName, self.postData.game_id, self.postData.recharge_type, self.postData.platform_type);
                self.$router.push({
                    name: "goodsList",
                    query: self.postData,
                });
            },
            updateHistoryData: function (gameName, gameId, rechargeType, platformType) {
                let self = this;
                let newHistoryData = {
                    gameName: gameName,
                    gameId: gameId,
                    rechargeType: rechargeType,
                    platformType: platformType
                };

                if (self.isLogin) {
                    self.$http.post(self.$CONSTANTS.APIRecharge + 'gameSearches/add', newHistoryData).then(function (response) {
                        if (!response.data || !response.data.success) {
                            console.log(response);
                            return false;
                        }
                    }), (function (response) {
                        console.log(response);
                    });
                }
                else {
                    if (this.$isLocalStorageSupported()) {
                        //如果记录有重复的，先删除重复
                        for (let index in self.browseHistoryData) {
                            if (gameName == self.browseHistoryData[index].gameName &&
                                    gameId == self.browseHistoryData[index].gameId) {
                                // && rechargeType == self.browseHistoryData[index].rechargeType && platformType == self.browseHistoryData[index].platformType
                                self.browseHistoryData.splice(index, 1);
                            }
                        }
                        //如果超过6条，删除最老一条
                        if (self.browseHistoryData && self.browseHistoryData.length == 6)
                            self.browseHistoryData.pop();

                        self.browseHistoryData.unshift(newHistoryData);
                        localStorage.setItem("rsHistory", JSON.stringify(self.browseHistoryData));
                    }
                }
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
            setDefaultValues: function () {
                let self = this;
                self.searchQueryData.isHotSearch = false;
                self.searchQueryData.gamePlatformType = this.$route.query.gamePlatformType || "SYCZ";
                self.searchHotQueryData.gamePlatformType = this.$route.query.gamePlatformType || "SYCZ";
                self.searchHotQueryData.isHotSearch = true;
            },
            getHotData: function () {
                let self = this;
                self.$http.get(self.$CONSTANTS.APIRecharge + 'HotSearches/selectAll', {
                    params: self.searchHotQueryData,
                }).then(function (response) {
                    if (response.data && response.data.responseStatus.code == "00" && response.data.hotSearchesEOList &&
                            response.data.hotSearchesEOList.length > 0) {
                        self.hotSearchResult = response.data.hotSearchesEOList;
                    }
                }), (function (response) {
                    console.log(response);
                });
            },
            getHistoryData: function () {
                var self = this;
                if (!self.isLogin) {
                    if (this.$isLocalStorageSupported() && localStorage.getItem('rsHistory')) {
                        self.browseHistoryData = JSON.parse(localStorage.getItem("rsHistory"));
                        self.historySearchResult = self.browseHistoryData;
                        self.hasHistory = true;
                    }
                    else {
                        self.hasHistory = false;
                    }
                }
                else {
                    self.$http.get(self.$CONSTANTS.APIRecharge + 'gameSearches/selectAll').then(function (response) {
                        if (response.data && response.data.responseStatus.code == "00" && response.data.gameSearchesEO &&
                                response.data.gameSearchesEO.length > 0) {
                            self.historySearchResult = response.data.gameSearchesEO;
                            self.hasHistory = true;
                        }
                        else {
                            self.hasHistory = false;
                        }
                    }), (function (response) {
                        console.log(response);
                    });
                }
            },
            search: function () {
                let self = this;
                self.searchQueryData.keyValue = self.searchInput;
                self.$http.get(self.$CONSTANTS.APIRecharge + 'HotSearches/selectHotGame', {
                    params: self.searchQueryData,
                }).then(function (response) {
                    if (response.data && response.data.success && response.data.hotGameEOList
                            && response.data.hotGameEOList.length > 0) {
                        self.searchResult = response.data.hotGameEOList;
                        self.hasResult = true;
                        self.noResultSearchInput = "";
                    }
                    else {
                        self.noResultSearchInput = self.searchInput;
                        self.hasResult = false;
                    }

                    self._searchHtpSending = false;

                    if (self.searchQueryData.keyValue != self.searchInput) {
                        self.search();
                    }
                }), (function (response) {
                    console.log(response);
                });

            },
            clearHistory: function () {
                let self = this;
                self.browseHistoryData = [];
                if (this.$isLocalStorageSupported())
                    localStorage.removeItem("rsHistory");
                if (self.isLogin) {
                    self.$http.post(self.$CONSTANTS.APIRecharge + 'gameSearches/delete').then(function (response) {
                        if (!response.data || response.data.responseStatus.code != "00") {
                            console.log(response);
                            return false;
                        }
                    }), (function (response) {
                        console.log(response);
                    });
                }
                self.hasHistory = false;
            },
            getLoginState: function () {
                let self = this;
                if (self.isLogin == null) {

                    self.$getAccount().then(function (account) {
                        if (account) {
                            self.isLogin = true;
                        } else {
                            self.isLogin = false;
                        }
                        self.getHistoryData();
                    }, function (account) {
                        console.log(account);
                    })
                }
            },
        }
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style scoped>
    .top-search input {
        color: #000 !important;
        background-color: #ffffff;
    }
</style>
