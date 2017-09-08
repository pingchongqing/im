<template>
    <div style="width: 100%">
        <!-- top -->
        <div class="fixedFill-mx" :class="{'fixedFill-mx-shop': params.accurateMap.shops_id.length > 0 } "></div>

        <div class="recharge-01" v-show="showList"><!-- v-if="showList" -->
            <div class="recha-conn">
                <div ref="scren" class="screen">
                    <screens
                            :recharge-type="params.accurateMap.recharge_type" :platform-type="params.accurateMap.platform_type" :filter="filter"
                            :game-id="params.accurateMap.game_id" :num="num"></screens>
                </div>
                <div ref="tab">
                    <div class="tab-empty" v-show="showRecommend" :style="{ height: tabHeight + 'px'}"
                         style="overflow-y:auto">
                        <div class="empty-conn px-30">
                            <div class="emp-img"><img src="~images/gamelogo.png"></div>
                            <div class="emp-text f28 color-666 text-center">
                            <span v-if="params.accurateMap.shops_id.length > 0 ">该商铺</span>此游戏下暂无<span class="color-m1">“{{rechargeModel.name}}”</span>商品
                            </div>
                            <div class="emp-ware" v-show="recommend_list.length > 0"><span class="f24 color-666 bg-f1"
                            >以下为其他热门商品</span></div>
                        </div>
                        <div class="recha-list  mb-20 bg-fff" v-for="v in recommend_list" @click="toDetail(v)">
                            <div class="list-caption py-20 px-30">
                                <div class="capt-title f34 color-000">
                                    [{{v.platform_type |getPlatformText}}{{v.recharge_type |getRechargeText}}]
                                    {{v.denomination}}{{v.unit_name}}={{v.recharge_price}}元
                                    {{v.title}}
                                </div>
                                <div class="capt-type f28 color-000">游戏区服：全区/全服</div>
                                <div class="capt-client f28 color-000">客户端：{{v.operator_name}}</div>
                                <div class="capt-discount">
                                    <div class="dntzk text-right" v-if="v.discount < 10 && v.discount > 0"><i
                                            class="fold-ico bg-f54 color-fff f30">{{v.discount}}折</i></div>
                                    <div class="dntzk f28 dswidth"><em
                                            class="color-m1 f34 fr">￥<i>{{v.recharge_price}}</i></em>
                                    </div>
                                </div>
                            </div>
                            <div class="list-merchant px-30" style="line-height: 0"><i
                                    class="shang fl color-fff f22">商</i>
                                <span class="fl f28 color-999" style="line-height: 6px">{{v.shops_name}}</span></div>
                        </div>
                    </div>
                    <div :style="{ height: tabHeight + 'px'}" style="overflow-y:auto" v-show="!showRecommend"
                         ref="tabList">
                        <div>
                            <div class="tab-android">
                                <div class="recha-list border-bottom mb-20 bg-fff" v-for="v in list"
                                     @click="toDetail(v)">
                                    <div class="list-caption py-20  px-30">
                                        <div class="capt-title f34 color-000">
                                            [{{v.platform_type |getPlatformText}}{{v.recharge_type |getRechargeText}}]
                                            {{v.denomination}}{{v.unit_name}}={{v.recharge_price}}元
                                            {{v.title}}
                                        </div>
                                        <div class="capt-type f28 color-000">
                                            游戏区服：全区/全服
                                        </div>
                                        <div class="capt-client f28 color-000">客户端：{{v.operator_name}}</div>
                                        <div class="capt-discount">
                                            <div class="dntzk text-right" v-if="v.discount < 10 && v.discount > 0"><i
                                                    class="fold-ico bg-f54 color-fff f30">{{v.discount}}折</i></div>
                                            <div class="dntzk f28 dswidth"><em class="color-m1 f34 fr">￥<i>{{v.recharge_price}}</i></em>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list-merchant px-30" style="line-height: 0"><i
                                            class="shang fl color-fff f22">商</i>
                                        <span class="fl f28 color-999" style="line-height: 6px">{{v.shops_name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <filters v-if="!showList" :filter="filter" :price-list="params.betweenMap.recharge_price"
                 :operator-list="params.accurateMap.operator_name"></filters>
    </div>
</template>
<script>
    import screens from "./Screen.vue";
    import filters from "./Filter.vue";

    export default{
        props: ['fixed'],
        data(){
            return {
                showList: true,
                params: {
                    betweenMap: {
                        "recharge_price": []
                    },
                    page:1,
                    pageCount:20,
                    accurateMap: {
                        "game_id": [this.$route.query.game_id],
                         shops_id:this.$route.params.shopsId?[this.$route.params.shopsId]:[],
                        "operator_name": [],
                        "platform_type": [this.$route.query.platform_type?this.$route.query.platform_type+"":''],
                        "recharge_type": [this.$route.query.recharge_type?this.$route.query.recharge_type+"":'']
                    },
                    sortMap: {
                        "discount": "+"
                    }
                },
                list: [],
                recommend_list: [],
                allLoaded: false,
                showRecommend: false,
                rechargeModel: {},
                num: {},
                tabHeight: 0,
                game_name: '',
                scrollTop: 0,
            }
        },
        components: {
            screens,
            filters
        },
        watch: {
            scrollTop: {
                handler: function (val, oldVal) {
                    var self = this;
                    if (self.$refs.tabList.scrollHeight < 200 + val + self.tabHeight && !self.allLoaded) {
                        self.loadBottom();
                    }
                },
                deep: true
            }
        },
        created: function () {

            var vm = this;
            if (vm.params.accurateMap.shops_id.length <= 0) {
                vm.getGameInfo();
            } else {
                vm.getPublishNum();
            }

            vm.getUseragent();
        },
        mounted: function () {
            this.calHeight();
            this.search();
            this.watchGoTop();

        },
        methods: {
            watchGoTop: function () {
                var self = this;
                self.$refs.tabList.addEventListener('scroll', function () {
                    self.scrollTop = self.$refs.tabList.scrollTop;
                });
            },
            search: function () {

                let vm = this;
                vm.allLoaded = true;
                vm.$http.post(vm.$CONSTANTS.APIRecharge + 'publishSearchAliYun/publishSearchList',vm.params).then(response=> {
                    let data = response.data;
                    if (data.success && data.result && data.result.length > 0) {
                        vm.showRecommend = false;
                        for (let i = 0, item; item = data.result[i++];) {
                            vm.list.push(item);
                        }
                        if (data.result.length < vm.params.pageCount ||
                                data.result.length <= 0) {
                            vm.allLoaded = true;
                        }
                        else {
                            vm.allLoaded = false;
                            vm.params.page++;
                        }
                    } else if (data.success && vm.params.page == 1) {
                        vm.showRecommend = true;
                        vm.allLoaded = true;
                        vm.searchRecommend();
                    }
                }, response=> {
                    console.log(this);
                })
            },
            searchRecommend: function () {
                let vm = this;
                let params = {
                    page: 1,
                    pagesize: 5,
                    recharge_type_not: 3,
                    game_id: vm.params.accurateMap.game_id[0],
                    sort: 'sales_account|-',
                    shops_id: vm.params.accurateMap.shops_id[0],
                }


                vm.$http.get(vm.$CONSTANTS.APIRecharge + 'publishAliYun/publishSearch', {
                    params: params
                }).then(response=> {
                    let data = response.data;
                    if (data.success && data.searchData && data.searchData.result) {
                        vm.recommend_list = data.searchData.result.items;
                    } else {
                        vm.allLoaded = true;
                    }
                }, response=> {
                    console.log(this);
                })
            },
            filter: function () {
                let vm = this;
                vm.params.page = 1;
                if (!vm.showRecommend) {
                    vm.list = [];
                    vm.search();
                }
                ;
            },
            loadBottom: function () {
                let vm = this;
                vm.search();
            },

            getUseragent: function () {
                let vm = this;
                let agent = navigator.userAgent;
                if (vm.params.accurateMap.recharge_type[0] !== '' && vm.params.accurateMap.platform_type[0] !== '') {return};

                if (agent.includes('Android')) {
                    vm.params.accurateMap.recharge_type =["2"];
                    vm.params.accurateMap.platform_type = ["1"];
                }
                else if (agent.includes('iPhone')|| agent.includes('iPad')) {
                    vm.params.accurateMap.recharge_type = ["1"];
                    vm.params.accurateMap.platform_type = ["2"];
                }else{
                    vm.params.accurateMap.recharge_type = ["1"];
                    vm.params.accurateMap.platform_type = ["2"];
                }

            },
            toDetail: function (item) {
                let vm = this;
                vm.$router.push({name: 'RechargeDetail', params: {publishId: item.id, shopsId: item.shops_id}})
            },
            getGameInfo: function () {
                let vm = this;

                let params = {
                    gameId: vm.params.accurateMap.game_id[0]
                }
                vm.$http.get(vm.$CONSTANTS.APIRecharge + 'HotSearches/selectPublishNum', {params: params})
                        .then(response=> {
                            let data = response.data;
                            if (data.success && data.hotGameEO) {

                                vm.$bus.emit('headerText', data.hotGameEO.gameName);
                                vm.game_name = data.hotGameEO.gameName;

                                vm.num = {
                                    isEnabled: data.hotGameEO.isEnabled,
                                    appleFirstNum: data.hotGameEO.appleFirstNum,//苹果首充
                                    androidFirstNum: data.hotGameEO.androidFirstNum,//安卓首充
                                    appleGenerationNum: data.hotGameEO.appleGenerationNum,//苹果代充
                                    androidGenerationNum: data.hotGameEO.androidGenerationNum//安卓代充
                                }
                                vm.$bus.emit('numList', vm.num);
                                // vm.$bus.emit('game_id',vm.params.game_id);
                                // vm.$bus.emit('game_name',data.hotGameEO.gameName);

                            }

                        }, response=> {
                            console.log('Error');
                        })
            },
            getPublishNum: function () {
                let vm = this;

                let params = {
                    shopsId: vm.params.accurateMap.shops_id[0],
                    gameId: vm.params.accurateMap.game_id[0]
                }
                vm.$http.get(vm.$CONSTANTS.APIRecharge + 'shopsGame/getPublishNum', {params: params})
                        .then((response)=> {
                            let data = response.data;
                            if (data.success && data.publishEO) {


                                vm.game_name = data.publishEO.gameName;

                                vm.num = {
                                    isEnabled: true,
                                    appleFirstNum: data.publishEO.appleFirstNum,//苹果首充
                                    androidFirstNum: data.publishEO.androidFirstNum,//安卓首充
                                    appleGenerationNum: data.publishEO.appleGenerationNum,//苹果代充
                                    androidGenerationNum: data.publishEO.androidGenerationNum//安卓代充
                                }
                                vm.$bus.emit('numList', vm.num);
                                // vm.$bus.emit('game_id',vm.params.game_id);
                                // vm.$bus.emit('game_name',data.hotGameEO.gameName);

                            }

                        }, (response)=> {
                            console.log('Error');
                        })


            },
            calHeight: function () {
                this.tabHeight = this.$getScreenHeight() - this.$refs.tab.getBoundingClientRect().top;

            },
            launchFullScreen: function (element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }
        },
        filters: {
            getPlatformText: function (value) {
                return value == 1 ? '安卓' : '苹果';
            },
            getRechargeText: function (value) {
                return value == 1 ? '代充' : '首充';
            }
        }
    }
</script>
<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style scoped>
    .fixedFill-mx-shop {
        height: 2.5rem !important;
    }

    .fixedFill-mx {
        height: 0.96rem;
    }

    .recha-conn .tab {
        z-index: 10 !important;
    }


</style>
