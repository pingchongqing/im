<template>
    <div id="wrapper" class="pb-150">

<div class="fixedFill-mx"></div>
   <div class="seller-list">
        <div class="sellnage-nav tab websellnv">
            <ul class="tab-nav">
                <li class="fl border-bottom f30" :class="{'active':operator == 1}" @click="selectClient(1)"><a class="nav-01 color-666" >商品管理</a></li>
                <li class="fl border-bottom f30" :class="{'active':operator == 2}" @click="selectClient(2)"><a class="nav-02 color-666">订单管理</a></li>
            </ul>
        </div>

    <div class="seller-01 " v-if="operator === 1">
        <div class="mobile-order-tips py-20 px-30 mb-20 bg-fffdf4" v-if="tips1">
            <i class="fl icon-close-yellow" @click="closeTips1"></i>
            <p class="ml-20 fl f26 ">电脑版发布商品暂未同步至手机版，如需查看，请登录电脑版查询</p>
            <a class="fr text-center f26" href="http://trading.5173.com/list/viewmybizofferslist2.aspx">去电脑版</a>
        </div>
        <div class="sliconn mb-20 border-top">
            <router-link :to="{name:'SellerGoodsListOfMobile',query:{status:0,operator:operator}}">
             <div class="selist-manage f30 color-000 px-30 text-b bg-faf">
                <span>手机端发布的商品</span><i class="rightico"></i>
             </div>
             </router-link>
            <div class="selist-tegory bg-fff border-bottom border-top py-30">
                <ul>
                    <li class="fl">
                        <router-link :to="{name:'SellerGoodsListOfMobile',query:{status:0,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{mobileGoodsCount.numInAuditor}}</span>
                            <p class="f26 color-666">审核中</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'SellerGoodsListOfMobile',query:{status:1,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{mobileGoodsCount.numInTrading}}</span>
                            <p class="f26 color-666">在售中</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'SellerGoodsListOfMobile',query:{status:4,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{mobileGoodsCount.numInSold}}</span>
                            <p class="f24 color-666">已卖出</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'SellerGoodsListOfMobile',query:{status:2,operator:operator}}">
                        <div class="gory-main">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{mobileGoodsCount.numInOffline}}</span>
                            <p class="f24 color-666">已下架</p>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
       <div class="sliconn mb-20 border-top">
            <router-link :to="{name:'SellerGoodsListOfPc',query:{status:0,operator:operator}}">
            <div class="selist-manage f30 color-000 px-30 text-b bg-faf">
                    <span>电脑端发布的手游商品</span>
                    <i class="rightico"></i>
                </div>
            </router-link>
            <div class="selist-tegory bg-fff border-bottom border-top py-30">
                <ul>
                    <li class="fl">
                        <router-link :to="{name:'SellerGoodsListOfPc',query:{status:0,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{pcGoodsCount.numInAuditor}}</span>
                            <p class="f26 color-666">审核中</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'SellerGoodsListOfPc',query:{status:1,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{pcGoodsCount.numInTrading}}</span>
                            <p class="f26 color-666">在售中</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'SellerGoodsListOfPc',query:{status:4,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{pcGoodsCount.numInSold}}</span>
                            <p class="f24 color-666">已卖出</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'SellerGoodsListOfPc',query:{status:2,operator:operator}}">
                        <div class="gory-main">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{pcGoodsCount.numInOffline}}</span>
                            <p class="f24 color-666">已下架</p>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="seller-01 " v-if="operator === 2">
        <div class="mobile-order-tips py-20 px-30 mb-20 bg-fffdf4" v-if="tips2">
            <i class="fl icon-close-yellow" @click="closeTips2"></i>
            <p class="ml-20 fl f26 ">电脑版出售订单暂未同步至手机版，如需查看，请登录电脑版查询</p>
            <a class="fr text-center f26" href="http://trading.5173.com/list/myorder_manage.aspx">去电脑版</a>
        </div>
      <div class="sliconn mb-20 border-top">
            <router-link :to="{name:'OrderListMobile',query:{status:1,operator:operator}}">
                <div class="selist-manage f30 color-000 px-30 text-b bg-faf">
                    <span>手机端订单</span>
                    <i class="rightico"></i>
                </div>
            </router-link>
            <div class="selist-tegory bg-fff border-bottom border-top py-30">
                <ul>
                    <li class="fl">
                       <router-link :to="{name:'OrderListMobile',query:{status:1,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{mobileOrderCount.traning}}</span>
                            <p class="f24 color-666">交易中</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                       <router-link :to="{name:'OrderListMobile',query:{status:2,operator:operator}}">
                        <div class="gory-main border-right ">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{mobileOrderCount.tranCompleted}}</span>
                            <p class="f26 color-666">交易成功</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'OrderListMobile',query:{status:3,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{mobileOrderCount.tranCancel}}</span>
                            <p class="f26 color-666">交易取消</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'OrderListMobile',query:{status:0,operator:operator}}">
                        <div class="gory-main">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{mobileOrderCount.tranAll}}</span>
                            <p class="f26 color-666">全部</p>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
       <div class="sliconn mb-20 border-top">
            <router-link :to="{name:'OrderListPC',query:{status:1,operator:operator}}">
                <div class="selist-manage f30 color-000 px-30 text-b bg-faf">
                    <span>电脑端手游订单</span>
                    <i class="rightico"></i>
                </div>
            </router-link>
            <div class="selist-tegory bg-fff border-bottom border-top py-30">
                <ul>
                    <li class="fl">
                        <router-link :to="{name:'OrderListPC',query:{status:1,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{pcOrderCount.traning}}</span>
                            <p class="f26 color-666">交易中</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'OrderListPC',query:{status:2,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{pcOrderCount.tranCompleted}}</span>
                            <p class="f26 color-666">交易成功</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'OrderListPC',query:{status:3,operator:operator}}">
                        <div class="gory-main border-right">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{pcOrderCount.tranCancel}}</span>
                            <p class="f26 color-666">交易取消</p>
                        </div>
                        </router-link>
                    </li>
                    <li class="fl">
                        <router-link :to="{name:'OrderListPC',query:{status:0,operator:operator}}">
                        <div class="gory-main">
                            <span class=" fontarial f40 color-333 pb-10 fontbold">{{pcOrderCount.tranAll}}</span>
                            <p class="f26 color-666">全部</p>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

</div>
</template>
<script type="text/javascript">
    import { mapState, mapGetters, mapActions } from 'vuex';

    export default {
        data(){
            return{
                operator:1,
                goodsStatus:1,
                tips1:true,
                tips2:true
            }
        },
        created:function  () {
            let vm = this;
            vm.$bus.emit('headerText', "我是卖家");
            // if (!vm.$CONSTANTS.isLogin) {
            //     location.href='/vue/login?returnUrl='+ encodeURIComponent(location.href);
            // };
            vm.getCountList();
            vm.getPcCountList();
        },
        beforeRouteEnter (to, from, next){
        if (from.query.operator) {
            next(vm=>{
                vm.operator = parseInt(from.query.operator);
            });
         }else{
            next();
        }

        },
         mounted:function(){
            let vm = this;
            vm.$bus.emit('isBack',false);
            vm.$bus.emit('callback',()=>{
                window.location.href='/vue/center'
            });
            vm.$bus.emit('isMore',true);
        },
        computed: {
            ...mapState({
                mobileGoodsCount: state => {
                    return state.memberSeller.mobileGoodsCount;
                },
                pcGoodsCount:state =>{
                    return state.memberSeller.pcGoodsCount;
                },
                mobileOrderCount:state =>{
                    return state.orderMange.mobileOrderCount;
                }
                ,
                pcOrderCount:state =>{
                    return state.orderMange.pcOrderCount;
                }
            })
        },
        methods:{
            selectClient:function  (val) {
                let vm = this;
                vm.operator = val;
            },
            closeTips1(){
                this.tips1 = false
            },
            closeTips2(){
                this.tips2 = false
            },
            ...mapActions({
                getCountList:'member/MEMBER_SELLER_COUNT_LIST',
                getPcCountList:'member/MEMBER_SELLER_ORDER_COUNT_LIST'
            })
        }
    }
</script>
<style src="css/common/member-cxy.css" scoped></style>

<style type="text/css" scoped>
     .fixedFill-mx {
        width: 100%;
        height: .96rem;
    }
</style>
