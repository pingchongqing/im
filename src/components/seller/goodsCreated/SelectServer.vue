<template>
    <div>
        <div class="one-screen">
            <!--填补fixed的块-->
            <div style="z-index: 100">
                <div class="top-header border-bottom">
                    <div class="top-back">
                        <a @click="goBack"></a>
                    </div>
                    <h2 class="f36" v-text="headerText"></h2>
                    <div class="top-right"></div>
                </div>
            </div>

            <!--搜索区服-->
            <div class="search-container">
                <div class="search-box bg-fff" @click="showSearchHistory">
                    <input class="f30" type="text" placeholder="请输入服务器名称" v-model.trim="searchInput" maxlength="20">
                    <span class="clear1" v-show="isShowSearchResult" @click="clearSearchInput"></span>
                </div>
            </div>
            <!--选择区服-->
            <div class="qufu-container f30 clearfix border-top" v-show="searchInput.length == 0" ref="tab">
                <div class="qu fl" :style="{height:tabHeight}" >
                    <ul>
                        <li :class="{'selected': menuIndex == index}"
                            v-for="(item,index) in zoneList" :key="item.id" @click="changeZone(item.name,item.catagoryId,index)">
                            <span   v-text="item.name"></span>
                        </li>
                    </ul>

                </div>
                <div class="fu bg-fff fl" v-if="serverList.length>0" :style="{height:tabHeight}">
                    <ul>
                        <li v-for="(item,index) in serverList" :key="item.id"
                            style="text-align: left;padding-left: .3rem;">
                            <span class="border-bottom" @click="goNext(item)" v-text="item.name"></span></li>
                    </ul>
                </div>
                <div class="fu bg-fff fl" v-else>
                    <ul>
                        <li style="width: 100%">
                            <span>暂无结果</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!--搜索结果-->
            <div class="search-result f28" v-show="hasResult & isShowSearchResult">
                <ul>
                    <li v-for="(item,index) in searchResult" :key="item.id">
                        <a class="border-bottom" @click="goNext(item)">{{item.name}}</a>
                    </li>
                </ul>
            </div>
            <!--搜索无结果-->
            <div class="search-empty" v-show="!hasResult & isShowSearchResult">
                <img src="~images/gamelogo.png" alt="">
                <p>抱歉，没有找到“<span class="search-content">{{searchInput}}</span>”的相关结果</p>
            </div>
            <!--搜索历史-->
            <div class="mask" style="display: block" @click="hideSearchHistory"
                 v-show="isShowSearchHistory && !isShowSearchResult"></div>
            <div class="search-history" v-show="isShowSearchHistory && !isShowSearchResult">
                <div class="container-ms bg-fff">
                    <div class="game-list " v-if="browseHistoryData.length>0">
                        <ul class="clearfix ">
                            <li v-for="(item,index) in browseHistoryData">
                                <a @click="goNext(item)">{{item.zoneName +"/"+item.serverName}}</a>
                                <span class="clear2" @click="clearHistoryData(item)"></span>
                            </li>

                        </ul>
                    </div>
                    <div class="game-list " v-else>
                        <ul class="clearfix ">
                            <li>
                                <a>暂无搜索历史</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

    export default{
        props:['checkAtuomation'],
        data(){
            return {
                //区
                zoneList: [],
                //服
                serverList: [],
                //内存服
                cacheServerList: [],
                queryData: {},
                menuIndex: 0,
                //选中区名字，ID
                selectZoneName: "",
                selectZoneId: "",
                //选中服名字，ID
                selectServerName: "",
                selectServerId: "",
                finishLoading: false,
                isShowSearchHistory: false,
                isShowSearchResult: false,
                //search
                searchInput: "",
                searchQueryData: {},
                searchResult: null,
                browseHistoryData: [],
                _searchHtpSending: false,
                hasResult: false,
                headerText: "选择服务器",
                gameId: this.$route.query.game_id,
                operatorId: this.$route.query.chooseOperatorId,
                tabHeight: "100%",
            }
        },
        watch: {
            searchInput(curVal, oldVal){
                let self = this;
                if (curVal == "") {
                    self.isShowSearchHistory = true;
                    self.isShowSearchResult = false;
                }
                else {
                    self.isShowSearchHistory = false;
                    self.isShowSearchResult = true;
                }

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
        created: function () {
            let self = this;

            self.queryData.parentId = self.$route.query.game_id;
            self.getHistoryData();
            self.getZoneList();

        },
        methods: {
            calHeight: function () {
                this.$nextTick(function () {
                    this.tabHeight = this.$getScreenHeight() - this.$refs.tab.getBoundingClientRect().top + "px";
                })
            },
            getZoneList: function () {
                var self = this;
                self.finishLoading = false;
                if (self.$parent.params.serviceProviderId) {
                    self.queryData.operatorId = self.$parent.params.serviceProviderId;
                }
                self.$http.get(self.$CONSTANTS.APICategory + "category/searchbyparentid", {
                    params: self.queryData,
                }).then(function (response) {
                    if (response.data && response.data.success && response.data.categoryList &&
                            response.data.categoryList.length > 0) {
                        self.zoneList = response.data.categoryList;
                        self.queryData.parentid = response.data.categoryList[0].catagoryId;
                        self.menuIndex = 0;
                        self.selectZoneName = response.data.categoryList[0].name;
                        self.selectZoneId = response.data.categoryList[0].catagoryId;
                        self.getServerList();
                        //self.calHeight();
                    }
                }), (function (response) {
                    console.log(response);
                    self.finishLoading = true;
                });
            },
            getServerList: function () {
                var self = this;
                self.finishLoading = false;
                self.$http.get(self.$CONSTANTS.APICategory + "category/searchserverbyparentid", {
                    params: self.queryData,
                }).then(function (response) {
                    if (response.data && response.data.success && response.data.categoryList &&
                            response.data.categoryList.length > 0) {
                        self.serverList = response.data.categoryList;
                        if (self.$parent._data.type === 'gold'){
                        self.serverList.forEach((x,i)=>{
                         if (x.name === '全区全服') {
                          self.serverList.splice(i,1);
                        }
                         });
                       }
                        self.cacheServerList[self.queryData.parentid] = self.serverList;
                    }
                    else {
                        self.serverList = [];
                        self.cacheServerList[self.queryData.parentid] = [];
                    }
                    self.finishLoading = true;
                }), (function (response) {
                    self.finishLoading = true;
                    console.log(response);
                });
            },
            changeZone: function (name, parentid, index) {
                var self = this;
                if (!self.finishLoading)
                    return false;
                self.queryData.parentid = parentid;
                self.menuIndex = index;
                self.selectZoneId = parentid;
                self.selectZoneName = name;
                if (self.cacheServerList[self.queryData.parentid])
                    self.serverList = self.cacheServerList[self.queryData.parentid];
                else
                    self.getServerList();
            },
            goNext: function (item) {
                var self = this;
                self.selectServerName = item.name || item.serverName;
                self.selectServerId = item.catagoryId || item.serverId;

                if (item.regionVO && item.regionVO.regionId)
                    self.selectZoneId = item.regionVO.regionId;
                else if (item.zoneId)
                    self.selectZoneId = item.zoneId;

                if (item.regionVO && item.regionVO.regionId)
                    self.selectZoneName = item.regionVO.regionName;
                else if (item.zoneName)
                    self.selectZoneName = item.zoneName;

                self.updateHistoryData(self.selectZoneName, self.selectZoneId, self.selectServerName, self.selectServerId);
                self.$parent.serverName = self.selectZoneName + "/" + self.selectServerName;
                //self.$parent.selectZoneName = self.selectZoneName;
                self.$parent.params.regionId = self.selectZoneId;
                self.$parent.params.serverId = self.selectServerId;
                self.reset();
                self.$parent.isShowSelectServer = false;

                if (self.$parent._data.type === 'gold') {
                    self.$bus.emit('getrepositorynum','')
                };

                if (self.checkAtuomation != undefined) {
                    self.checkAtuomation({regionId:self.selectZoneId,serverId:self.selectServerId});
                };
            },
            goBack: function (item) {
                var self = this;
                self.reset();
                self.$parent.isShowSelectServer = false;
            },
            reset: function () {
                var self = this;
                self.hideSearchHistory();
                self.isShowSearchResult = false;
                self.searchInput = "";
                self.noResultSearchInput = "";
                self.$bus.emit('showHeader', true);
                self.$nextTick(function () {
                    document.body.scrollTop = self.$parent.scrollTop;
                })
            },
            showSearchHistory: function () {
                var self = this;
                self.headerText = "搜索服务器名称";
                self.isShowSearchHistory = true;
            },
            hideSearchHistory: function () {
                var self = this;
                self.headerText = "选择服务器";
                self.isShowSearchHistory = false;
            },
            clearSearchInput: function () {
                var self = this;
                self.searchInput = "";
                self.isShowSearchResult = false;
            },
            search: function () {
                let self = this;
                self.searchQueryData.searchStr = self.searchInput;
                self.searchQueryData.gameId = self.gameId;
                if (self.$parent.params.serviceProviderId)
                    self.searchQueryData.operatorId = self.$parent.params.serviceProviderId;
                self.$http.get(self.$CONSTANTS.APICategory + 'category/searchServerByName', {
                    params: self.searchQueryData,
                }).then(function (response) {
                    if (response.data && response.data.success && response.data.categoryList
                            && response.data.categoryList.length > 0) {
                        self.searchResult = response.data.categoryList;
                        self.noResultSearchInput = "";
                        self.hasResult = true;
                    }
                    else {
                        self.noResultSearchInput = self.searchInput;
                        self.hasResult = false;
                    }
                    self._searchHtpSending = false;
                    if (self.searchQueryData.searchStr != self.searchInput) {
                        self.search();
                    }
                }), (function (response) {
                    console.log(response);
                });
            },
            updateHistoryData: function (zoneName, zoneId, serverName, serverId) {
                let self = this;
                let newHistoryData = {
                    zoneName: zoneName,
                    zoneId: zoneId,
                    serverName: serverName,
                    serverId: serverId,
                    gameId: self.gameId
                };
                if (this.$isLocalStorageSupported()) {
                    //如果记录有重复的，先删除重复
                    for (let index in self.browseHistoryData) {
                        if (zoneName == self.browseHistoryData[index].zoneName &&
                                zoneId == self.browseHistoryData[index].zoneId &&
                                serverName == self.browseHistoryData[index].serverName &&
                                serverId == self.browseHistoryData[index].serverId &&
                                self.gameId == self.browseHistoryData[index].gameId) {
                            self.browseHistoryData.splice(index, 1);
                        }
                    }
                    //如果超过10条，删除最老一条
                    if (self.browseHistoryData && self.browseHistoryData.length == 10)
                        self.browseHistoryData.pop();

                    self.browseHistoryData.unshift(newHistoryData);
                    localStorage.setItem("ssHistory", JSON.stringify(self.browseHistoryData));
                }
            },
            getHistoryData: function () {
                var self = this;
                if (self.$isLocalStorageSupported() && localStorage.getItem('ssHistory')) {
                    let tmpBrowseHistoryData = localStorage.getItem('ssHistory');
                    for (let index in tmpBrowseHistoryData) {
                        if (self.gameId == tmpBrowseHistoryData[index].gameId) {
                            self.browseHistoryData = JSON.parse(localStorage.getItem("ssHistory"));
                        }
                    }
                }
            },
            clearHistoryData: function (item) {
                var self = this;
                //删除
                for (let index in self.browseHistoryData) {
                    if (item.zoneName == self.browseHistoryData[index].zoneName &&
                            item.zoneId == self.browseHistoryData[index].zoneId &&
                            item.serverName == self.browseHistoryData[index].serverName &&
                            item.serverId == self.browseHistoryData[index].serverId &&
                            self.gameId == self.browseHistoryData[index].gameId) {
                        self.browseHistoryData.splice(index, 1);
                    }
                }
                if (self.$isLocalStorageSupported())
                    localStorage.setItem("ssHistory", JSON.stringify(self.browseHistoryData));
            }
        }
    }
</script>

<style src="css/common/publish-cl.css" scoped></style>
<style scoped>
    .search-result {
        position: fixed;
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        width: 100%;
        padding-bottom: .5rem;
    }

    .qufu-container .qu ul li.selected {
        border-right: 0;
    }

    .qufu-container .qu {
        position: absolute;
        overflow-y: auto;
    }

    .qufu-container .fu {
        position: absolute;
        overflow-y: auto;
    }


</style>
