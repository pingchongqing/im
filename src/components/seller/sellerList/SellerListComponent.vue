<template id="sell-list">
    <div class="game-list bg-fff border-top fw">
        <!-- 游戏 -->
        <div class="tab-panel active" v-show="finishFirstLoad" :style="{ 'min-height': tabHeight + 'px'}">
            <!-- 列表显示 -->
            <div class="tab-class01">
                <ul>

                    <li v-for="item in list">
                        <router-link :to="{name:'goodsPublish', query:{game_id:item.catagoryId,game_name:item.name,
                        game_type: item.type,mainCatagoryId:item.mainCatagoryId} }">
                                <span>
                                <img :src="item.gameImageUrl"></span>
                            <p>{{item.name}}</p>
                        </router-link>
                    </li>

                </ul>
            </div>
            <div class="tab-letter" :class="{'tab-letter-fixed': isLetterFixed }"
                 :style="{  'height':isLetterFixed? fixHeight+'px' :tabHeight+'px '}">

                <a @click="searchGame('')" :class="{active:active === ''}">
                    <span class="hot-img"></span>
                </a>
                <a v-for="(item,index) in navList" @click="searchGame(item)"
                   :class="{active:active === item}">
                    {{item}}
                </a>
            </div>
        </div>
        <div v-show="!finishFirstLoad" style="height: 100vh">
            <div class="preloader-indicator-modal" style=" "><span class="preloader preloader-white"></span></div>
        </div>
        <goTopComponent></goTopComponent>
    </div>
</template>

<script >
    import goTopComponent from "components/common/GoTop.vue"
    export default{
        template: '#sell-list',
        data(){
            return {
                navList: [],
                list: [],
                sourceList:[],
                postData: {},
                active: '',
                isLetterFixed: false,
                tabTop: 0,
                tabHeight: 0,
                fixHeight: 0,
                params: {
                    pageIndex: 1,
                    pageSize: 5000
                },
                scrollTop: 0,
                allLoaded: false,
                source: [],
                finishFirstLoad: false
            }
        },
        components: {
            goTopComponent,
        },
        created: function () {
            var vm = this;
            vm.params.pageIndex = 1;
            this.$bus.emit('headerText', "我要卖");

            vm.getRechargePy();

            vm.$bus.on('tabTop', function (tt) {
                vm.tabTop = tt;
            });
            vm.$bus.on('tabHeight', function (th) {
                vm.tabHeight = th;
            });
            vm.$bus.on('fixHeight', function (fh) {
                vm.fixHeight = fh;
            });

        },
        mounted: function () {
            this.watchGoTop();
            this.searchGameByAliYun();
        },
        watch: {
            scrollTop: {
                handler: function (val, oldVal) {
                    let vm = this;
                    if (val < 10)return;
                    vm.tabHeight = this.$getScreenHeight() - vm.$parent.$refs.tab.getBoundingClientRect().top;
                    vm.tabHeight = vm.tabHeight > vm.fixHeight ? vm.fixHeight : vm.tabHeight;

                    if (val > vm.tabTop) {
                        vm.isLetterFixed = true;
                    }
                    else {
                        vm.isLetterFixed = false;
                    }
                    if (vm.$isBottom(200) && !vm.allLoaded) {
                        vm.loadBottom();
                    }
                },
                deep: true
            }
        },
        methods: {
            watchGoTop: function () {
                var vm = this;
                vm.scrollTop = 0;
                window.addEventListener('scroll', function () {
                    vm.scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
                    if (document.body.scrollTop > vm.tabTop) {
                        vm.isLetterFixed = true;
                    }
                    else {
                        vm.isLetterFixed = false;
                    }
                });
            },
            getRechargePy: function () {
                let vm = this;
                let params = {
                    gameType: 1
                }
                vm.$http.get(
                        vm.$CONSTANTS.APICategory +
                        'category/getgamepy', {
                            params: params,
                        }).then(response=> {
                    let data = response.data;
                    if (data.success && data.py) {
                        vm.navList = data.py;
                    }
                }, response=> {
                   // console.log(this);
                });
            },
            searchGameByAliYun: function () {
                let vm = this;
                //vm.$CONSTANTS.APICategory+
                vm.$http.get(
                   vm.$CONSTANTS.APICategory+'category/searchgamelistbytype', {params: vm.params}).then(response=> {
                    let data = response.data;
                    if (data.success && data.categoryList && data.categoryList.length > 0) {

                        vm.sourceList = data.categoryList;

                        vm.updateByList();
                    } else {
                        vm.allLoaded = true;
                    }
                }, response => {
                  //  console.log(this);
                })
            },
            loadBottom: function () {
                let vm = this;
                if (vm.sourceList && vm.sourceList.length > 0)
                {
                    vm.updateByList();
                };

            },
            updateByList: function () {
                let vm = this;
                let startIndex = (vm.params.pageIndex - 1) * 21;
                let endIndex = vm.params.pageIndex * 21 - 1;

                vm.allLoaded = true;


                if (!vm.sourceList && vm.sourceList.length <= 0)return;

                for (let i = startIndex; i < vm.sourceList.length; i++) {
                    if (i <= endIndex) {
                        vm.list.push(vm.sourceList[i]);
                    }
                }

                if (vm.list.length === vm.sourceList.length) {
                    vm.allLoaded = true;
                }
                vm.allLoaded = false;
                vm.finishFirstLoad = true;
                vm.params.pageIndex++;
            },
            searchGame: function (value) {
                let vm = this;
                vm.list = [];
                //点击之后返回到顶层
                document.body.scrollTop = 0;
                vm.active = value;
                if (value === '') {
                    vm.params.pageIndex = 1;
                    vm.updateByList();
                } else {
                    vm.list = vm.sourceList.filter(x=>x.pyfirst.toUpperCase() === value);
                    vm.allLoaded = true;
                }
                // vm.params.mapRequest.keyword=value;
                // vm.searchGameByAliYun();
            },
        },
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>
    .game-list .tab-panel {
        display: block;
        /*overflow: hidden;*/
        height: auto;
        position: relative;
    }

    .game-list .tab-letter {
        overflow-y: scroll;
        /*padding-bottom: 3rem;*/
        z-index: 19 !important;
        position: absolute;
        display: block;
        /*overflow-x: hidden;*/
        height: 100%;
    }

    .game-list .tab-letter:after {
        content: '';
        display: block;
        padding-bottom: 3rem;
    }

    .game-list .tab-letter-relative {
        position: relative;
    }

    .game-list .tab-letter-fixed {
        position: fixed !important;
        top: 1.9rem;
        overflow-y: scroll;
    }

    .game-list .tab-class01 ul li {
        height: 2.27rem !important;
    }
</style>
