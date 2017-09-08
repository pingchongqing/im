<template>
    <div>
        <transition name="innerPage">
            <div class="filter" :class="{'noScroll':noScrollEnable}">
                <!-- 显示筛选列表 -->
                <div class="filter-list">
                    <div class="filter-head fixed-box">
                        <div class="top-header border-bottom">
                            <div class="top-back filter-back">
                                <a @click="back">返回</a>
                            </div>
                            <h2 class="f36">
                                精准筛选
                            </h2>
                            <div class="top-right">
                            </div>
                        </div>
                    </div>
                    <div class="filter-body fw">
                        <div class="filter01 fw mb-20" v-for="(item, listIndex) in list"
                             :class="{'mb-300': listIndex==list.length-1}">
                            <template v-if="item">
                                <h3 class="filter-title border-bottom f32"
                                    v-if="item.outer && item.outer.list && item.outer.list.length>0"
                                    @click="showOuter(item,listIndex)">
                                    <b v-text="item.name"></b>
                              <span>
                                <b class="b-normal">{{item | outerLinkName}}</b>
                                <i></i>
                              </span>
                                </h3>
                                <h3 class="filter-title border-bottom f32" v-else><b v-text="item.name"></b>
                                </h3>
                                <div class="fw filter-ul border-bottom" v-if="item.inner && item.inner.length != 0">
                                    <ul>
                                        <li :class="{'active':inner.check && item.type!='checkbox','active2':inner.check && item.type=='checkbox'}"
                                            :key="inner.name"
                                            v-for="(inner,index) in item.inner"
                                            v-show="item.showExtraEnable || index < 6">
                                     <span class="f30" @click="innerCheck(inner,item,index,listIndex)">
                                      <!--{{inner.check}}-->
                                     <input :type="item.type" name="">
                                       <b style="font-weight: normal" v-text="inner.name"></b>
                                     </span>
                                        </li>
                                    </ul>
                                    <!--
                                      当index 大于6的时候，自动隐藏多余的条数，同时显示下拉按钮
                                    -->
                                    <!-- 下拉显示更多 -->
                                    <div v-show="item.inner.length > 6" class="fw downmore "
                                         @click="toggleResidue(item)"
                                         :class="{'rotate-180': item.showExtraEnable}"></div>
                                    <!-- 缩回显示更多 -->
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="filter-foot fixed-bottom f36 border-top ">
                        <a @click="navigateToList"><em class="whitesearch"></em>共精选出 <span>{{commodityNum}}</span>
                            件商品</a>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="outerPage" @enter="enterOuterList" @before-leave="beforeLeaveOuterList"
                    @after-leave="afterLeaveOuterList">
            <div class="filter" v-if="outerEnable">
                <!--不限 选项-->

                <div class="filter-prof">
                    <div class="top-header border-bottom fixed-top">
                        <div class="top-back filter-back2">
                            <a @click="cancel">返回</a>
                        </div>
                        <h2 class="f36" v-text="outerName"></h2>
                    </div>
                    <div class="filter-prof2">
                        <div class="filter-search border-bottom" v-if="outerList.list.length>10 ">
                            <input class="f30" type="url" placeholder="首字母搜索" v-model.trim="outerQuery" maxlength="20">
                        </div>
                        <template v-if="outerList.type=='singleDropDown'">
                            <div class="prof2-list f30 singleDropDown">
                                <ul>
                                    <li class="border-bottom"
                                        v-for="(item,index) in outerListFilter"
                                        :key="item.name"
                                        :data-index="index"
                                        style="transition: all .5s; overflow: hidden"
                                        @click="outerCheck(item)"
                                        :class="{'active':item.check}">
                                        <em v-text="item.name"></em>
                                        <i></i>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <template v-else>
                            <div class="prof2-list f30">
                                <ul>
                                    <li class="border-bottom"
                                        v-for="(item,index) in outerListFilter"
                                        :key="item.name"
                                        :data-index="index"
                                        style="transition: all .5s; overflow: hidden"
                                        @click="outerCheck(item)"
                                        :class="{'active':item.check}">
                                        <em v-text="item.name"></em>
                                        <span><i><input type="checkbox"></i></span>
                                    </li>
                                </ul>
                            </div>
                            <div class="prof2-check f36">
                                <a class="fcheck" @click="confirm">确定</a>
                            </div>
                        </template>
                    </div>
                    <div class="maskdiv3" @click="cancel"></div>
                </div>

            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                list: [],
                defaultQu: {
                    "showExtraEnable": false,
                    "name": "所在区",
                    "searchType": 1,
                    "alyField": "region_id",
                    "outer": {
                        "list": [{"field": "selectQu", "check": true, "name": "不限", "value": "", "pyFirst": "bx"}]
                    },
                    type: "singleDropDown"

                },
                defaultFu: {
                    "showExtraEnable": false,
                    "name": "所在服",
                    "searchType": 1,
                    "alyField": "server_id",
                    "outer": {
                        "list": [{"check": true, "name": "不限", "value": "", "pyFirst": "bx"}]
                    },
                    type: "singleDropDown"

                },
                defaultPrice: {
                    "showExtraEnable": false,
                    "name": "价格区间",
                    "searchType": 3,
                    "alyField": "price",
                    "outer": {"list": []},
                    "inner": [
                        {
                            "check": true,
                            "name": "不限"
                        },
                        {
                            "check": false,
                            "name": "50元以下",
                            "value": "0-50",
                        },
                        {
                            "check": false,
                            "name": "50-100元",
                            "value": "50-100",
                        },
                        {
                            "check": false,
                            "name": "100-500元",
                            "value": "100-500",
                        },
                        {
                            "check": false,
                            "name": "500-1000元",
                            "value": "500-1000",
                        },
                        {
                            "check": false,
                            "name": "1000-2000元",
                            "value": "1000-2000",
                        },
                        {
                            "check": false,
                            "name": "2000-5000元",
                            "value": "2000-5000",
                        },
                        {
                            "check": false,
                            "name": "5000-10000元",
                            "value": "5000-10000",
                        },
                        {
                            "check": false,
                            "name": "10000元以上",
                            "value": "10000-99999999",
                        },
                    ],
                    "type": "radio"
                },
                outerEnable: false,  //是否显示 “不限” 页面
                outerList: {},  // “不限” 页面里的数据
                outerQuery: "", //首字母筛选条件
                outerName: "",
                queryData: {},
                commodityNum: 0,  //筛选出的商品条数
                noScrollEnable: false,
                postQueryConditions: "",//传给list-account
                scrollTop: 0,
                tmpSelectQuId: "",
                selectQuId: "",
                selectFuId: "",
                cacheFuList: [],
            }
        }
        ,
        computed: {
            // 过滤list数据，过滤出所有被选中的参数
            checked: function () {
                var checkedList = {};
                /*循环父*/
                this.list.forEach(function (item, index) {
                    checkedList[index] = [];
                    checkedList[index].name = item.name;
                    checkedList[index].searchType = item.searchType;
                    checkedList[index].alyField = item.alyField;
                    checkedList[index].checkedArray = [];
                    /*如果有不限，循环不限*/
                    if (item.outer && item.outer.list && item.outer.list.length > 0) {
                        item.outer.list.forEach(function (outerItem) {
                            if (outerItem.check && outerItem.value) {
                                checkedList[index].checkedArray.push(outerItem.value);
                                checkedList[index].push(outerItem.value);
                            }
                        })
                    }
                    if (item.inner) {
                        /*循环筛选里的选项*/
                        item.inner.forEach(function (innerItem) {
                            if (innerItem.check && innerItem.value) {
                                checkedList[index].checkedArray.push(innerItem.value);
                                checkedList[index].push(innerItem.value);
                            }
                        })
                    }
                });
                return checkedList;
            }
            ,
            //过滤后的外部数据(过滤后的角色职业列表)
            outerListFilter: function () {
                var self = this;
                if (this.outerList && this.outerList.list) {
                    return this.outerList.list.filter(function (item) {
                        self.outerQuery=self.outerQuery.replace(/,/g,'');
                        if (item.pyFirst.toLocaleLowerCase().indexOf(self.outerQuery.toLocaleLowerCase()) == -1 && item.check) {
                            item.check = false;
                        }
                        return item.pyFirst.toLocaleLowerCase().indexOf(self.outerQuery.toLocaleLowerCase()) !== -1;
                    })
                }
            }
        }
        ,
        //监听被选中的数据
        watch: {
            checked: {
                handler: function (val, oldVal) {
                    this.getCommodityNum(val);
                }
                ,
                deep: true
            },
            selectQuId: function (val, oldVal) {
                this.selectFuId = "";
            }
        }
        ,
        created: function () {
            var self = this;
            self.queryData.gameId = self.$route.query.gid;
            self.queryData.goodsTypeId = self.$route.query.goodsType;
            self.queryData.serverId = self.$route.query.serverid;
            self.queryData.raceId = self.$route.query.raceid;
            self.queryData.areaId = self.$route.query.areaid;

            this.getQu();
        },
        // 组件加载后，获取主数据，赋值给list,给每一项子数据，添加check属性，用于标记是否被选中
        mounted: function () {
            let self = this;
            let paramsData = {
                gameId: self.queryData.gameId,
                goodsTypeId: self.queryData.goodsTypeId,
            }
            self.$http.get(self.$CONSTANTS.API + "mobile-category-service/rs/category/searchScreenProperty", {params: paramsData}).then(function (response) {
                if (response.data.responseStatus.code == "00" && response.data.gamePropertyAndPropertyValVOlist && response.data.gamePropertyAndPropertyValVOlist.length > 0) {
                    var hasServerPrice = false;
                    response.data.gamePropertyAndPropertyValVOlist.forEach(function (gameItem, index) {
                        if (gameItem.gamePropertyNewEO && self.isFieldValid(gameItem.gamePropertyNewEO.alyField)) {
                            var item = {};
                            var defaultItem = {};
                            defaultItem.check = true;
                            defaultItem.name = "不限";
                            item.showExtraEnable = false; //默认当直接子数据大于6条时，自动隐藏多余数据
                            item.name = gameItem.gamePropertyNewEO.name;
                            item.searchType = gameItem.gamePropertyNewEO.searchType;
                            item.alyField = gameItem.gamePropertyNewEO.alyField;
                            //服务端如已经配置了price字段，读取服务端，否则用默认
                            if (item.alyField == "price") {
                                hasServerPrice = true;
                            }

                            item.outer = {};
                            item.outer.list = [];
                            item.inner = [];

                            if (gameItem.gamePropertyNewEO.controlType == 1) {
                                item.type = "singleDropDown";
                            }
                            else if (gameItem.gamePropertyNewEO.controlType == 2) {
                                item.type = "multDropDown";
                            }
                            else if (gameItem.gamePropertyNewEO.controlType == 3) {
                                item.inner[0] = defaultItem;
                                item.type = "radio";
                            }
                            else if (gameItem.gamePropertyNewEO.controlType == 4) {
                                item.type = "checkbox";
                            }

                            if (gameItem.gamePropertyValNewEO && gameItem.gamePropertyValNewEO.length > 0) {
                                gameItem.gamePropertyValNewEO.forEach(function (subGameItem, subGameIndex) {
                                    var subItem = {};
                                    subItem.check = false;
                                    subItem.name = subGameItem.attributeValName || subGameItem.attributeVal; //self.getAttributeName(item.alyField, subGameItem.attributeVal);
                                    subItem.value = subGameItem.attributeVal;
                                    subItem.pyFirst = subGameItem.pyFirst;
                                    if (gameItem.gamePropertyNewEO.controlType == 1) {
                                        item.outer.list[subGameIndex] = subItem;
                                    }
                                    else if (gameItem.gamePropertyNewEO.controlType == 2) {
                                        item.outer.list[subGameIndex] = subItem;
                                    }
                                    else if (gameItem.gamePropertyNewEO.controlType == 3) {
                                        item.inner[subGameIndex + 1] = subItem;
                                    }
                                    else if (gameItem.gamePropertyNewEO.controlType == 4)
                                        item.inner[subGameIndex] = subItem;
                                })
                            }
                            self.list.push(item);
                        }
                    });
                }
                if (!hasServerPrice)
                    self.list.unshift(self.defaultPrice);
                self.list.unshift(self.defaultFu);
                self.list.unshift(self.defaultQu);
            }, function (response) {
                console.log(response);
            });
        }
        ,

        methods: {
            getQu: function () {
                var self = this;
                let quQueryData = {};
                quQueryData.parentId = self.$route.query.gid;
                self.$http.get(self.$CONSTANTS.APICategory + "category/searchbyparentid", {
                    params: quQueryData,
                }).then(function (response) {
                    if (response.data && response.data.success && response.data.categoryList &&
                            response.data.categoryList.length > 0) {
                        let quList = response.data.categoryList;
                        let tmpOuterList = [];
                        for (let i = 0; i < quList.length; i++) {
                            let tmpOuterListItem = {};
                            tmpOuterListItem.field = "selectQu";
                            tmpOuterListItem.check = false;
                            tmpOuterListItem.name = quList[i].name;
                            tmpOuterListItem.value = quList[i].catagoryId;
                            tmpOuterListItem.pyFirst = quList[i].pyfirst;
                            tmpOuterList[i + 1] = tmpOuterListItem;
                        }
                        let tmpOuterListItem = {};
                        tmpOuterListItem.field = "selectQu";
                        tmpOuterListItem.check = true;
                        tmpOuterListItem.name = "不限";
                        tmpOuterListItem.value = "";
                        tmpOuterListItem.pyFirst = "bx";
                        tmpOuterList[0] = tmpOuterListItem;
                        self.defaultQu.outer.list = tmpOuterList;
                    }
                }), (function (response) {
                    console.log(response);
                });
            },
            getFu: function () {
                var self = this;
                if (self.cacheFuList[self.selectQuId]) {
                    self.$set(self.list[1].outer, "list", self.cacheFuList[self.selectQuId]);
                }
                else {
                    let fuQueryData = {};
                    fuQueryData.parentId = self.selectQuId;
                    self.$http.get(self.$CONSTANTS.APICategory + "category/searchserverbyparentid", {
                        params: fuQueryData,
                    }).then(function (response) {
                        if (response.data && response.data.success && response.data.categoryList &&
                                response.data.categoryList.length > 0) {
                            let fuList = response.data.categoryList;
                            let tmpOuterList = [];
                            for (let i = 0; i < fuList.length; i++) {
                                let tmpOuterListItem = {};
                                tmpOuterListItem.check = false;
                                tmpOuterListItem.name = fuList[i].name;
                                tmpOuterListItem.value = fuList[i].catagoryId;
                                tmpOuterListItem.pyFirst = fuList[i].pyfirst;
                                tmpOuterList[i + 1] = tmpOuterListItem;
                            }
                            let tmpOuterListItem = {};
                            tmpOuterListItem.check = true;
                            tmpOuterListItem.name = "不限";
                            tmpOuterListItem.value = "";
                            tmpOuterListItem.pyFirst = "bx";
                            tmpOuterList[0] = tmpOuterListItem;
                            self.defaultFu.outer.list = tmpOuterList;
                            self.cacheFuList[self.selectQuId] = tmpOuterList;
                        }
                        else {
                            let tmpOuterList = [];
                            let tmpOuterListItem = {};
                            tmpOuterListItem.check = true;
                            tmpOuterListItem.name = "不限";
                            tmpOuterListItem.value = "";
                            tmpOuterListItem.pyFirst = "bx";
                            tmpOuterList[0] = tmpOuterListItem;
                            self.defaultFu.outer.list = tmpOuterList;
                        }
                    }), (function (response) {
                        console.log(response);
                    });
                }
            },
            //是否显示6条自后的数据，默认为false(自动隐藏多余6条自后的数据)
            toggleResidue: function (item) {
                item.showExtraEnable = !item.showExtraEnable;
            }
            ,

            //控制子数据的点击之后的选中状态
            innerCheck: function (innerItem, item, innerIndex, listIndex) {
                var self = this;
                if (innerItem.check && item.type != 'checkbox') return;
                if (innerItem.check && item.type == 'checkbox') {
                    innerItem.check = false;
                } else {
                    if (item.type != 'checkbox') {
                        item.inner.forEach(function (v) {
                            v.check = false;
                        })
                    }
                    innerItem.check = true;
                }
                item.inner[innerIndex] = innerItem;
                self.$set(self.list, listIndex, item);
            },

            // 点击“不限”页面的选项时。控制选中状态。默认“不限”页面里的数据是 多选
            outerCheck: function (outerItem) {
                if (this.outerList.type == "singleDropDown") {
                    this.outerList.list.forEach(function (v) {
                        v.check = false;
                    })
                }
                outerItem.check = !outerItem.check;

                if (outerItem.field && outerItem.field == "selectQu") {
                    this.tmpSelectQuId = outerItem.value;
                }

                if(this.outerList.type=="singleDropDown")
                {
                    this.confirm();
                }
            },

            /**
             *  控制是否显示额外“不限”数据，默认为false
             *    点击“不限”之后，改为true（显示）。同时改变“不限”里面的数据
             */
            showOuter: function (item, index) {
                /**
                 *  如果是角色职业的不限，自动获取数据
                 */
                var self = this;
                if (item.name == "所在服" && self.selectQuId == "") {
                    self.$toast({
                        message: '请先选择游戏所在区'
                    })
                }
                else if (item.name == "所在服" && self.cacheFuList[self.selectQuId] == null) {
                    self.$toast({
                        message: '数据还在加载中，请稍后再试'
                    })
                }
                else {
                    self.outerName = item.name;
                    self.$set(self.outerList, "list", JSON.parse(JSON.stringify(item.outer.list)));
                    self.outerList.index = index;
                    self.outerList.type = item.type;
                    self.outerEnable = true;
                }
            }
            ,

            // 隐藏“不限”页面
            hideOuter: function () {
                var self = this;
                self.outerQuery = "";
                self.outerList = {};
                self.outerEnable = false;
            },

            // “不限"页面，确认
            confirm: function () {
                var self = this;
                self.$set(self.list[self.outerList.index], "outer", JSON.parse(JSON.stringify(self.outerList)));

                if (self.list[self.outerList.index].name == "所在区") {
                    self.selectQuId = self.tmpSelectQuId;
                    self.getFu();
                }
                self.hideOuter();
            },

            //“不限"页面，返回
            cancel: function () {
                var self = this;
                self.hideOuter();
            },

            // 获取当前筛选条件 选出的商品条数
            getCommodityNum: function (filter) {
                var self = this;
                self.postQueryConditions = {
                    accurateMap: {},//精确查询 条件
                    keyWordMap: {},//模糊查询 条件
                    betweenMap: {},//区间查询 条件
                    fetchField: ["id", "title", "price", "game_name", "goods_type", "goods_img", "game_id", "is_axm", "browse_count"],
                };
                if (self.queryData.goodsTypeId)
                    self.postQueryConditions.accurateMap["goods_type"] = [self.queryData.goodsTypeId];
                if (self.queryData.gameId)
                    self.postQueryConditions.accurateMap["game_id"] = [self.queryData.gameId];
                if (self.queryData.serverId)
                    self.postQueryConditions.accurateMap["server_id"] = [self.queryData.serverId];
                if (self.queryData.raceId)
                    self.postQueryConditions.accurateMap["raceId"] = [self.queryData.raceId];
                if (self.queryData.areaId)
                    self.postQueryConditions.accurateMap["region_id"] = [self.queryData.areaId];

                for (var itemIndex in filter) {
                    var item = filter[itemIndex];
                    if (item.searchType == 1) {
                        {
                            if (item.checkedArray && item.checkedArray.length == 1 && item.checkedArray[0]) {
                                self.postQueryConditions.accurateMap[item.alyField] = [item.checkedArray[0]];
                            }
                            else if (item.checkedArray && item.checkedArray.length > 1) {
                                self.postQueryConditions.accurateMap[item.alyField] = [];
                                for (var subIndex in item.checkedArray) {
                                    self.postQueryConditions.accurateMap[item.alyField][subIndex] = item.checkedArray[subIndex]
                                }
                            }
                        }
                    }
                    else if (item.searchType == 2) {
                        if (item.checkedArray && item.checkedArray.length > 0) {
                            self.postQueryConditions.keyWordMap[item.alyField] = [];
                            for (var subIndex in item.checkedArray) {
                                self.postQueryConditions.keyWordMap[item.alyField][subIndex] = item.checkedArray[subIndex]
                            }
                        }
                    }
                    else if (item.searchType == 3) {
                        if (item.checkedArray && item.checkedArray.length == 1 && item.checkedArray[0]) {
                            self.postQueryConditions.betweenMap[item.alyField] = [item.checkedArray[0]];
                        }
                        else if (item.checkedArray && item.checkedArray.length > 1) {
                            self.postQueryConditions.betweenMap[item.alyField] = [];
                            for (var subIndex in item.checkedArray) {
                                self.postQueryConditions.betweenMap[item.alyField][subIndex] = item.checkedArray[subIndex]
                            }
                        }
                    }
                }

                this.$http.post(self.$CONSTANTS.API + "/mobile-goodsSearch-service/rs/goodsSearch/getGoodsSearchNum", self.postQueryConditions).then(function (response) {
                    if (response.data && response.data.responseStatus && response.data.responseStatus.code == "00")
                        this.commodityNum = response.data.total;
                }, function (response) {
                    console.log("error: " + response);
                });
            }
            ,

            // 通过属性值获取属性名
            isFieldValid: function (field) {
                if (field == "goods_source_type" || field == "is_axm") {
                    return false;
                }
                else {
                    return true;
                }
            },

            // 返回路由上一层
            back: function () {
                this.$router.go(-1);
            }
            ,

            navigateToList: function () {
                if (this.postQueryConditions && this.$isLocalStorageSupported()) {
                    localStorage.queryConditions = JSON.stringify(this.postQueryConditions);
                }
                window.location.href = "/list-account.html" + window.location.search;
            }
            ,

            enterOuterList: function (el) {
                this.scrollTop = document.body.scrollTop;
                this.noScrollEnable = true;
            }
            ,
            beforeLeaveOuterList: function (el) {

                this.noScrollEnable = false;
            },

            afterLeaveOuterList: function (el) {
                document.body.scrollTop = this.scrollTop;
            }
        }
        ,

        filters: {
            outerLinkName: function (item) {
                if (!item.outer) return "";
                if (item.outer.list && item.outer.list == 0) {
                    return item.outer.name;
                }
                var name = [];
                if (item.outer.list) {
                    item.outer.list.forEach(function (val, index) {
                        if (name.length > 2) return;
                        if (val.check) {
                            name.push(val.name);
                        }
                    })
                    if (name.length == 0) {
                        return item.outer.name;
                    }

                    if (name.length < 3) {
                        return name.join(", ")
                    }
                    name.pop();
                    return name.join(", ") + "等";
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/fost-base.css";
    @import "../../assets/css/common/list-cl.css";

    body {
        height: 100%;
    }

    .filter {
        display: block;
        height: 100vh !important;
    }

    .noScroll {
        overflow: hidden;
    }

    .rotate-180 {
        transform: rotate(180deg);
    }

    .b-normal {
        font-weight: normal;
    }

    .filter-prof {
        display: block !important;
    }

    .filter-prof .top-header {
        width: 90% !important;
        right: 0;
        z-index: 53;
    }

    .filter-prof2 {
        z-index: 52;
        overflow-x: hidden;
        width: 90% !important;
    }

    /* outerPage 动画效果*/

    .outerPage-enter-active {
        animation: fadeInRight .5s;
        -webkit-animation: fadeInRight .5s;
    }

    .outerPage-leave-active {
        animation: fadeOutRight .5s;
        -webkit-animation: fadeOutRight .5s;
    }

    .innerPage-enter-active {
        animation: fadeInRight .5s;
        -webkit-animation: fadeInRight .5s;
    }

    .innerPage-leave-active {
        animation: fadeOutRight .5s;
        -webkit-animation: fadeOutRight .5s;
    }

    .maxSex-enter-active {
        animation: fadeIn .5s;
        -webkit-animation: fadeIn .5s;
    }

    /* animate.css含有的 部分动画 */

    @-webkit-keyframes fadeInRight {
        from {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    @keyframes fadeInRight {
        from {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    .fadeInRight {
        -webkit-animation-name: fadeInRight;
        animation-name: fadeInRight;
    }

    @-webkit-keyframes fadeOutRight {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
    }

    @keyframes fadeOutRight {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
    }

    .fadeOutRight {
        -webkit-animation-name: fadeOutRight;
        animation-name: fadeOutRight;
    }

    @-webkit-keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .fadeIn {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }

    @-webkit-keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    .fadeOut {
        -webkit-animation-name: fadeOut;
        animation-name: fadeOut;
    }

    @-webkit-keyframes fadeInDown {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    .fadeInDown {
        -webkit-animation-name: fadeInDown;
        animation-name: fadeInDown;
    }

    .filter {
        max-width: 768px;
        margin: 0 auto;
        position: relative;
    }

    .filter-prof2 {
        max-width: 768px;
    }

    .singleDropDown i {
        width: 0.48rem;
        height: 0.5rem;
        display: inline-block;
        vertical-align: top;
        background: url('~images/right2.png')  center no-repeat;
        background-size: .18rem;
    }

    .singleDropDown .active em {
     color: red;
    }

    .singleDropDown .active i {
        background: url('~images/recharge/choice-ico.png')  center no-repeat !important;
        background-size: .28rem !important;
    }
</style>
