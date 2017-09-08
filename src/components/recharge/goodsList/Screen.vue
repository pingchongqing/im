<template>
    <div class="tab rech-type border-bottom mb-20 bg-fff">
        <div class="maskdiv" v-show="showSort || showRecharge" @click="showSort=false;showRecharge=false"></div>
        <div class="rechop">
            <div class="dong-tern bg-fff fl">
                <ul class="don-nav f30">
                    <li class="width00" @click="rechargeClick()">
                        <a class="andios" :class="{'redClass': selectType==1}">
                            <span class="andico">{{params.rechargeModel.name}}</span>
                        </a>
                    </li>
                    <li class="width01" @click="showSort=!showSort;showRecharge=false;selectType=2;">
                        <a class="orange" :class="{'redClass': selectType==2}">
                            <span class="hotlin">{{params.sortModel.name}}</span>
                        </a>
                    </li>
                    <li class="width02" @click="showFileter()"><a class="screenhov"><span class="screen">筛选</span></a>
                    </li>
                </ul>
            </div>

            <div class="recha-nav-list">
                <div class="seach-list list" v-if="showSort">
                    <ul>

                        <li :class="{active:v.value === params.sortModel.value}"
                            @click="selectSort(v)"
                            v-for="v in sortList"><span>{{v.name}}</span></li>
                    </ul>
                </div>
                <div class="seach-list list01" v-if="showRecharge">
                    <ul>
                        <li :class="{active:v.recharge_type === params.rechargeModel.recharge_type
                                        && v.platform_type === params.rechargeModel.platform_type}"
                            v-for="v in list" @click="selectRecharge(v)" v-if="v.count>0">
                            <span>{{v.name}}</span>
                            <!-- <span v-if="v.href"><a  :href="v.href">{{v.name}}</a></span> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ["rechargeType", "platformType", "filter", "gameId"],
        data(){
            return {
                showRecharge: false,
                showSort: false,
                params: {
                    rechargeModel: {},
                    sortModel: {}
                },
                list: [],
                sortList: [],
                gamePlatformType: [],
                numList: {},
                selectType: 1
            }
        },
        created: function () {
            let vm = this;

            vm.$bus.on('numList', function (text) {
                vm.numList = text;
                vm.initRecharge();
            });

            //vm.getGameInfo();
        },
        methods: {
            initRecharge: function () {
                let vm = this;
                //发布单
                vm.list = [{name: '苹果代充', recharge_type: 1, platform_type: 2, count: vm.numList.appleGenerationNum},
                    {name: '安卓代充', recharge_type: 1, platform_type: 1, count: vm.numList.androidGenerationNum},
                    {name: '苹果首充号', recharge_type: 2, platform_type: 2, count: vm.numList.appleFirstNum},
                    {name: '安卓首充号', recharge_type: 2, platform_type: 1, count: vm.numList.androidFirstNum},
                    {name: '首充号续充', href: '', recharge_type: 3, platform_type: 3, count: 3},
                    ];


                //排序
                vm.sortList = [{name: '折扣最低', value: 1, type: '{discount:"+"}'},
                    {name: '折扣最高', value: 2, type: '{discount:"-"}'},
                    {name: '价格最低', value: 4, type: '{recharge_price:"+"}'},
                    {name: '价格最高', value: 5, type: '{recharge_price:"-"}'},
                    {name: '销量最高', value: 6, type: '{sales_account:"-"}'}];

                //从父组件传递过来的值，来筛选默认值
                vm.params.rechargeModel = vm.list.find(x=>x.recharge_type === parseInt(vm.rechargeType)
                && x.platform_type === parseInt(vm.platformType));

                if (!vm.params.rechargeModel) {
                    vm.params.rechargeModel = vm.list.find(x=>x.count > 0);

                }
                vm.$parent._data.rechargeModel = vm.params.rechargeModel;
                vm.params.sortModel = vm.sortList[0];

            },
            selectRecharge: function (item) {
                let vm = this;
                // if (item.name == "帐号") {
                //     window.location.href = window.location.origin + item.href;
                //     return false;
                // }
                vm.showRecharge = !vm.showRecharge;
                vm.params.rechargeModel = item;

                vm.$parent._data.rechargeModel = item;
                vm.$parent._data.showRecommend = false;

                vm.$parent._data.params.betweenMap.recharge_price = [];
                vm.$parent._data.params.accurateMap.operator_name = [];

                if (item.recharge_type !== 3 && item.recharge_type !== 4) {
                    vm.$parent._data.params.accurateMap.recharge_type = [item.recharge_type+""];
                    vm.$parent._data.params.accurateMap.platform_type = [item.platform_type+""];
                    vm.filter();
                } else {
                    // vm.$parent._data.params.recharge_type='';
                    // vm.$parent._data.params.recharge_type='';

                    if (item.recharge_type === 3)
                        vm.$router.push({name: 'RechargeVerifyAccount'});
                    else {
                        window.location.href = window.location.origin + item.href;
                    }

                }
            },
            selectSort: function (item) {
                let vm = this;
                vm.showSort = !vm.showSort;

                vm.params.sortModel = item;
                this.$parent._data.params.sortMap = eval('(' + item.type + ')');
                vm.filter();

            },
            getGameInfo: function () {
                let vm = this;
                let params = {
                    gameId: vm.gameId
                }
                vm.$http.get(vm.$CONSTANTS.APICategory + 'category/getGameInfo/', {
                    params: params,
                }).then(response=> {
                    let data = response.data;
                    if (data.success && data.gamePlatformType) {
                        vm.gamePlatformType = data.gamePlatformType;

                    }
                    ;
                }, response=> {
                    console.log(this);
                })
            },
            showFileter: function () {
                let vm = this;
                if (vm.$parent._data.showRecommend)return;
                vm.showSort = false;
                vm.showRecharge = false

                this.$parent._data.showList = !this.$parent._data.showList;
            },
            rechargeClick: function () {
                let vm = this;
                vm.selectType = 1;
                vm.showRecharge = !vm.showRecharge;
                vm.showSort = false;

                //Count等于0的时候重新选择默认的数据
                // if (vm.params.rechargeModel.count <=0) {

                //     vm.params.rechargeModel=vm.list.find(x=> x.count > 0);

                //      if (vm.params.rechargeModel.recharge_type !== 3 && vm.params.rechargeModel.recharge_type !== 4) {
                //         this.$parent._data.showRecommend=false;
                //         this.$parent._data.params.recharge_type=vm.params.rechargeModel.recharge_type;
                //         this.$parent._data.params.platform_type=vm.params.rechargeModel.platform_type;
                //         //手动触发父组件查询方法
                //         vm.filter();
                //      }else{
                //         this.$parent._data.params.recharge_type='';
                //         this.$parent._data.params.platform_type='';
                //     }
                // };
            }
        }
    }
</script>
<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style type="text/css" scoped>
    .hide {
        display: none;
    }

    .maskdiv {
        z-index: 12;
    }

    .rechop {
        z-index: 13;
    }

    .redClass {
        color: #f75e46 !important;
    }


</style>
