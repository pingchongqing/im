<template id="search-template">
    <div>
        <div>
            <browseHistoryModalComponent v-if="type===4"></browseHistoryModalComponent>
            <div class="fixedspace" v-if="type!=4"></div>
            <!---------------------------- search ---------------------------->
            <div class="search-container bg-c9c" v-if="searchInputEnable">
              <div class="search-box bg-fff">
                <input
                  v-model="searchInput"
                  class="f30"
                  type="url"
                  maxlength="20"
                  :placeholder="placeholderText">
              </div>
            </div>
            <div class="search-game border-bottom fw">
               <div class="sgame fw bg-fff f30">
                     <span>{{choiceText}}</span>
             </div>
            </div>
            <!---------------------------- 区服选择 ------------------------------>
            <div class="search-list pb-200 fw">
                <div class="slist fw f30 bg-fff" v-if="!loadingEnable">
                    <ul :class="ulClass" v-if="dataList && dataList.length>0">
                        <li v-for="(item, index) in dataListFilter" @click="next(item)" v-if="item.name!='全区全服'">
                            {{item.name || item.operatorName || item.goodsTypeName}}
                        </li>
                    </ul>
                    <ul class="style01" v-else>
                        <li>没有您要找的内容。</li>
                    </ul>
                </div>
                <loadingComponent></loadingComponent>
            </div>
        </div>
        <navigationModalComponent></navigationModalComponent>
        <go-top-component></go-top-component>
    </div>
</template>

<script>
    import navigationModalComponent from "../common/NavigationModal.vue"
    import goTopComponent from "../common/GoTop.vue"
    import loadingComponent from "../common/Loading.vue"
    import browseHistoryModalComponent from "../common/BrowseHistoryModal.vue"
    export default {
        template: '#search-template',
        data() {
            return {
                //浏览器获得的参数
                queryData: {},
                //需要传给下个页面的参数
                postData: {},
                dataList: "",
                ulClass: "",
                searchHeaderText: "",
                url: "",
                method: "get",
                searchInputEnable: false,
                navigateTo: "",
                searchInput: "",
                loadingEnable: true,
            }
        },
        props: ['type'],
        components: {
            navigationModalComponent,
            goTopComponent,
            loadingComponent,
            browseHistoryModalComponent
        },
        computed: {
            dataListFilter: function () {
                var self = this;
                var str = self.searchInput;
                if (self.dataList) {
                    if (str) {
                        return self.dataList.filter(function (item) {
                            if (/^[a-zA-Z0-9/:;().]*$/.test(str)) {
                                return item.pyfirst.toLowerCase().indexOf(str.toLowerCase()) !== -1;
                            } else {
                              return item.name.indexOf(str) !== -1;
                            }
                        });
                    }
                    else {
                        return self.dataList;
                    }
                }
            },
            placeholderText: function() {
              switch (this.type) {
                case 1:
                  return '请输入客户端名称或首字母'
                  break;
                case 2:
                  return '请输入游戏区名称或首字母'
                  break;
                case 3:
                  return '请输入游戏服名称或首字母'
                  break;
                default:

              }
            },
            choiceText() {
              switch (this.type) {
                case 1:
                  return '请选择平台'
                  break;
                case 2:
                  if(this.$route.query.gameType==2){
                       return '请选择客户端'
                   }else{
                       return '请选择区'
                   }
                  break;
                case 3:
                  return '请选择服务器'
                  break;
                  case 4:
                    return '请选择商品类型'
                    break;
                  case 5:
                    return '请选择阵营'
                    break;
                default:

              }
            }
        },

        mounted: function () {
            this.setDefaultValues();
            this.getData();
            //window.addEventListener('resize', this.resize)
            //this.resize()
        },
        beforeDestroy: function beforeDestroy() {
          window.removeEventListener('resize', this.resize)
        },
        methods: {
          resize() {
            this.$nextTick(function () {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            })
          },
            setDefaultValues: function () {
                var self = this;
                if (self.type == 1) {
                    self.method = "get";
                    self.url = self.$CONSTANTS.APICategory + "mainMobileGame/getplatforminfobygameid";
                    self.searchHeaderText = "请选择平台";
                    self.queryData.gameId = self.$route.query.gameId;
                    if (self.queryData.mainGid) {
                      self.queryData.mainGid = self.$route.query.mainGid
                    }
                    self.queryData.gameType = self.$route.query.gameType;
                    self.navigateTo = "./searchArea";
                    self.$bus.emit('headerText', self.$route.query.gName);
                }
                else if (self.type == 2) {
                  if ((self.$route.query.goodsType == 2
                    ||self.$route.query.goodsType == 3
                    ) && self.$route.query.gameType == 2) {
                    self.method = "get";
                    self.url =  self.$CONSTANTS.APICategory + "mainMobileGame/getgameareasbygameandplatform";
                    self.searchHeaderText = "请选择游戏区";
                    self.queryData.platformId = self.$route.query.platformId;
                    self.queryData.mainGid = self.$route.query.mainGid;
                    self.queryData.gameId = self.$route.query.gameId;
                    self.navigateTo = "./searchServer";
                    if (self.$route.query.pName)
                        self.$bus.emit('headerText', self.$route.query.pName);
                    else
                        self.$bus.emit('headerText', self.$route.query.gName);
                  } else {
                    self.method = "get";
                    self.url =  self.$CONSTANTS.APICategory + "category/searchbyparentid";
                    self.searchHeaderText = "请选择游戏区";
                    self.queryData.operatorId = self.$route.query.operatorId;
                    self.queryData.parentId = self.$route.query.gameId;
                    self.queryData.gid = self.$route.query.gameId;
                    self.navigateTo = "./searchServer";
                    if (self.$route.query.pName)
                        self.$bus.emit('headerText', self.$route.query.pName);
                    else
                        self.$bus.emit('headerText', self.$route.query.gName);
                  }

                }
                else if (self.type == 3) {
                  if ((self.$route.query.goodsType == 2
                    ||self.$route.query.goodsType == 3
                    ) && self.$route.query.gameType == 2) {
                    self.method = "get";
                    self.url = self.$CONSTANTS.APICategory + "mainMobileGame/getgameServer";
                    self.searchHeaderText = "请选择游戏服";
                    self.queryData.platformId = self.$route.query.platformId;
                    self.queryData.mainGid = self.$route.query.mainGid;
                    self.queryData.aid = self.$route.query.areaId;
                    if (self.$route.query.goodsType == 2) {
                      self.navigateTo = "/vue/choice/goodsList";
                    } else if (self.$route.query.goodsType == 3) {
                      self.navigateTo = "/vue/coins-type/list-coins";
                    }
                    self.$bus.emit('headerText', self.$route.query.aName);
                  } else {
                    self.method = "get";
                    self.url = self.$CONSTANTS.APICategory + "category/searchserverbyparentid";
                    self.searchHeaderText = "请选择游戏服";
                    self.queryData.parentId = self.$route.query.areaId;
                    if (self.$route.query.goodsType == 3) {
                      self.navigateTo = "/vue/coins-type/list-coins";
                    } else if(self.$route.query.tradeType == 5){
                      self.navigateTo = "/vue/trade-coins/trade-stone";
                    } else {
                      self.navigateTo = "/vue/choice/goodsList";
                    }
                    self.$bus.emit('headerText', self.$route.query.aName);
                  }
                }
                else if (self.type == 4) {
                    self.method = "get";
                    self.url = self.$CONSTANTS.APICategory + "category/searchgoodstypebygameid";
                    self.searchHeaderText = "请选择商品类型";
                    self.queryData.gameId = self.$route.query.gameId;
                    self.navigateTo = "./searchArea";
                    self.$bus.emit('headerText', self.$route.query.gName);

                    if (self.$route.query.goodsType) {
                        self.directToList(self.$route.query.goodsType);
                    }
                }
                else if (self.type == 5) {
                    self.method = "get";
                    self.url = self.$CONSTANTS.APICategory + "category/searchfactionbygameid";
                    self.searchHeaderText = "请选择阵营";
                    self.queryData.parentId = self.$route.query.gameId;
                    self.queryData.serverid = self.$route.query.serverid;
                    if (self.$route.query.goodsType==3) {
                      self.navigateTo = "/vue/coins-type/list-coins";
                    } else if(self.$route.query.tradeType == 5){
                      self.navigateTo = "/vue/trade-coins/trade-stone";
                    } else {
                      self.navigateTo = "/vue/choice/goodsList";
                    }
                    self.$bus.emit('headerText', self.$route.query.gName);

                }
            },
            setClasses: function () {
                var self = this;
                if (self.dataList.length == 1)
                    self.ulClass = "style01";
                else if (self.dataList.length == 2)
                    self.ulClass = "style02";
                else if (self.dataList.length > 2)
                    self.ulClass = "style03";
            },
            getData: function () {
                var self = this;
                if (self.method == "get") {
                    self.$http.get(self.url, {
                        params: self.queryData,
                    }).then(self.successFunction), (self.failedFunction);
                }
                else if (self.method == "post") {
                    self.$http.post(self.url, {
                        params: self.queryData,
                    }).then(self.successFunction), (self.failedFunction);
                }
            },
            successFunction: function (response) {
                var self = this;
                if (response.data && response.data.responseStatus.code == "00") {
                    for (var responseDataIndex in response.data) {
                        //读取数组型的值，作为dataList的值
                        if (response.data[responseDataIndex].constructor == Array) {
                          //如果没有拼音
                          for (let index in response.data[responseDataIndex]) {
                            if (!response.data[responseDataIndex][index].pyfirst) {
                              response.data[responseDataIndex][index].pyfirst = self.$pingyin.getCamelChars(response.data[responseDataIndex][index].name)
                            }
                          }

                            self.dataList = response.data[responseDataIndex];
                        }
                    }

                    //在游戏区页面，加一条全区全服
                    if (self.type == 2 && (self.$route.query.goodsType == "2")) {
                        var allAreaServerItem = {};
                        allAreaServerItem.pyfirst = "qb";
                        allAreaServerItem.name = "全部";
                        self.dataList.unshift(allAreaServerItem);
                    }
                    if (self.type == 3 && (self.$route.query.goodsType == "2") && (self.$route.query.gameType == "2")) {
                        var allAreaServerItem = {};
                        allAreaServerItem.pyfirst = "bx";
                        allAreaServerItem.name = "不限";
                        self.dataList.unshift(allAreaServerItem);
                    }
                    //如果是选择商品类型页面，且数据只有一条，直接跳到列表
                    // if (self.dataList && self.dataList.length == 1 && self.type == 4) {
                    //     self.directToList(self.dataList[0].goodsType);
                    // }

                    if (self.dataList && self.dataList.length > 10)
                        self.searchInputEnable = true;
                    self.setClasses();

                    // if(self.type == 5 && self.dataList == 0) {
                    //   self.postData.gameId = self.$route.query.gameId
                    //   self.postData.gName = self.$route.query.gName;
                    //   self.postData.goodsType = self.$route.query.goodsType;
                    //   self.$router.push({
                    //       path: self.navigateTo,
                    //       query: self.postData,
                    //   })
                    // }

                    if (self.type == 3) {
                      self.$http.get(self.$CONSTANTS.APICategory + "category/searchfactionbygameid", {params:{
                        parentId: self.$route.query.gameId
                      }}).then(
                        res => {
                          if(res.body.categoryList && res.body.categoryList.length > 0) {
                            self.navigateTo = './searchFaction'
                          }
                        },
                        err => {
                          console.log(err);
                        }
                      )
                    }

                }
                else {
                    console.log(response);
                }
                self.loadingEnable = false;
            },
            failedFunction: function (response) {
                this.loadingEnable = false;
                console.log(response);
            },
            directToList: function (goodsType) {
                var self = this;
                self.postData.goodsType = goodsType;
                self.postData.gameId = self.$route.query.gameId;
                self.postData.gName = self.$route.query.gName;
                self.postData.aName = self.$route.query.aName;
                self.postData.sName = self.$route.query.sName;
                self.postData.areaId = self.$route.query.areaId;
                self.postData.gameType = self.$route.query.gameType;
                self.postData.serverId = self.$route.query.serverId;
                self.$router.replace({
                    path: self.navigateTo,
                    query: self.postData,
                });
            },
            next: function (item) {
                var self = this;
                if (self.type == 1) {
                    self.postData.gameId = self.$route.query.gameId
                    self.postData.gName = self.$route.query.gName;
                    self.postData.pName = item.operatorName;
                    self.postData.operatorId = item.operatorId;
                    self.postData.gameType = self.$route.query.gameType;
                    self.postData.platformId = item.id;
                    self.postData.mainGid = self.$route.query.mainGid;
                    self.postData.goodsType = self.$route.query.goodsType;
                }
                else if (self.type == 2) {
                    self.postData.gameId = self.$route.query.gameId || item.catagoryId;
                    self.postData.gName = self.$route.query.gName;
                    self.postData.aName = item.name;
                    self.postData.areaId = item.catagoryId||item.id;
                    self.postData.platformId = self.$route.query.platformId;
                    self.postData.mainGid = self.$route.query.mainGid;
                    self.postData.gameId = self.$route.query.gameId;
                    self.postData.gameType = self.$route.query.gameType;
                    self.postData.goodsType = self.$route.query.goodsType;
                    self.postData.tradeType = self.$route.query.tradeType;
                    self.postData.typename = self.$route.query.typename;
                }
                else if (self.type == 3) {
                  self.postData.gameId = self.$route.query.gameId;
                  self.postData.gName = self.$route.query.gName;
                  self.postData.aName = self.$route.query.aName;
                  self.postData.sName = self.$route.query.sName;
                  self.postData.areaId = self.$route.query.areaId;
                  self.postData.serverId = item.catagoryId||item.id;
                  self.postData.areaname = self.$route.query.aName;
                  self.postData.mainGid = self.$route.query.mainGid;
                  self.postData.gameType = self.$route.query.gameType;
                  self.postData.servername = item.name;
                  self.postData.serverid = item.catagoryId||item.id;
                  self.postData.areaid = self.$route.query.areaId;
                  self.postData.gid = self.$route.query.gameId;
                  self.postData.operatorId = self.$route.query.platformId;
                  self.postData.gname = self.$route.query.gName;
                  self.postData.goodsType = self.$route.query.goodsType;
                  self.postData.tradeType = self.$route.query.tradeType;
                  self.postData.typename = self.$route.query.typename;
//                  if (self.$route.query.goodsType==3) {
//                    self.postData.areaname = self.$route.query.aName;
//                    self.postData.mainGid = self.$route.query.mainGid;
//                    self.postData.gameType = self.$route.query.gameType;
//                    self.postData.servername = item.name;
//                    self.postData.serverid = item.catagoryId||item.id;
//                    self.postData.areaid = self.$route.query.areaId;
//                    self.postData.gid = self.$route.query.gameId;
//                    self.postData.operatorId = self.$route.query.platformId;
//                    self.postData.gname = self.$route.query.gName;
//                    self.postData.goodsType = self.$route.query.goodsType;
//                  } else {
//                    self.postData.gameId = self.$route.query.gameId;
//                    self.postData.gName = self.$route.query.gName;
//                    self.postData.aName = self.$route.query.aName;
//                    self.postData.areaId = self.$route.query.areaId;
//                    self.postData.platformId = self.$route.query.platformId;
//                    self.postData.mainGid = self.$route.query.mainGid;
//                    self.postData.gameType = self.$route.query.gameType;
//                    self.postData.sName = item.name;
//                    self.postData.serverId = item.catagoryId||item.id;
//                    self.postData.goodsType = self.$route.query.goodsType;
//                  }
                }
                else if (self.type == 4) {
                    self.postData.gameId = self.$route.query.gameId;
                    self.postData.gName = self.$route.query.gName;
                    self.postData.aName = self.$route.query.aName;
                    self.postData.sName = self.$route.query.sName;
                    self.postData.gameType = self.$route.query.gameType;
                    self.postData.areaId = self.$route.query.areaId;
                    self.postData.serverId = self.$route.query.serverId;
                    self.postData.goodsType = item.goodsType;
                    self.postData.tradeType = item.tradeType;
                }
                else if (self.type == 5) {
                    // self.postData.gameId = self.$route.query.gameId;
                    // self.postData.gName = self.$route.query.gName;
                    // self.postData.aName = self.$route.query.aName;
                    // self.postData.sName = self.$route.query.sName;
                    // self.postData.gameType = self.$route.query.gameType;
                    // self.postData.areaId = self.$route.query.areaId;
                    // self.postData.serverId = self.$route.query.serverId;
                    // self.postData.goodsType = self.$route.query.goodsType;
                    // self.postData.factionId = item.catagoryId
                    // self.postData.factionName = item.name





                    self.postData.gameId = self.$route.query.gameId;
                    self.postData.gName = self.$route.query.gName;
                    self.postData.aName = self.$route.query.aName;
                    self.postData.sName = self.$route.query.sName;
                    self.postData.areaId = self.$route.query.areaId;
                    self.postData.serverId = self.$route.query.serverid;
                    self.postData.areaname = self.$route.query.aName;
                    self.postData.mainGid = self.$route.query.mainGid;
                    self.postData.gameType = self.$route.query.gameType;
                    self.postData.servername = self.$route.query.servername;
                    self.postData.serverid = self.$route.query.serverid;
                    self.postData.areaid = self.$route.query.areaId;
                    self.postData.gid = self.$route.query.gameId;
                    self.postData.operatorId = self.$route.query.platformId;
                    self.postData.gname = self.$route.query.gName;
                    self.postData.goodsType = self.$route.query.goodsType;

                    self.postData.tradeType = self.$route.query.tradeType;
                    self.postData.typename = self.$route.query.typename;
                    self.postData.factionId = item.catagoryId
                    self.postData.factionName = item.name

                    self.postData.raceid = item.catagoryId
                    self.postData.racename = item.name

                }

                //是否为全区全服
                if (item.name == "全部") {
                    self.navigateTo = "/vue/choice/goodsList";
                    self.postData.aName = "全区";
                    self.postData.sName = "全服";
                    if (self.$route.query.operatorId) {
                      self.postData.operatorId = self.$route.query.operatorId
                    }
                } else if(item.name == "不限"){
                    self.navigateTo = "/vue/choice/goodsList";
                    //self.postData.aName = "全区";
                    self.postData.sName = "全服";
                    self.postData.areaId = self.$route.query.areaId
                }


                self.$router.push({
                    path: self.navigateTo,
                    query: self.postData,
                })
            },
        },
    }
</script>
<style src='css/common/list-cl.css' scoped></style>
