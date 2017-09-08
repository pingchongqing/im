const Header = resolve => {
    require.ensure(['components/Header.vue'], () => {
        resolve(require('components/Header.vue'));
    }, 'Home');
};

const Recharge = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/Recharge.vue'));
    }, 'recharge');
}
//手游充值主页
const RechargeHome = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/RechargeHome.vue'));
    }, 'recharge');
}

//手游充值 -商铺
const RechargeStore = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeStore/RechargeStore.vue'));
    }, 'recharge');
}

//手游充值 -商铺列表
const RechargeStoreList = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeStore/RechargeStoreList.vue'));
    }, 'recharge');
}

//手游充值 -商铺商品列表
const RechargeStoreGoodsList = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeStore/RechargeStoreGoodsList'));
    }, 'recharge');
}

//手游充值 -商铺搜索
const RechargeStoreSearch = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeStore/RechargeStoreSearch.vue'));
    }, 'recharge');
}

//详情
const RechargeDetail = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeDetail/RechargeDetail.vue'));
    }, 'recharge');
}

//苹果快充
const QuickRecharge = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/quickRecharge/QuickRecharge.vue'));
    }, 'recharge');
}

//下单
const RechargeOrder = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeOrder/RechargeOrder.vue'));
    }, 'recharge');
}
//选择支付
const RechargePaying = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargePaying/RechargePaying.vue'));
    }, 'recharge');
}

//续充验证
const RechargeVerifyAccount = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeRefill/VerifyAccount.vue'));
    }, 'recharge');
}

//续充
const RechargeRefillInfo = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeRefill/RefillInfo.vue'));
    }, 'recharge');
}

//代充
const RechargeCommon = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeCommon/RechargeCommon.vue'));
    }, 'recharge');
}

//商品列表
const GoodsList = resolve => {
    require.ensure([], () => {
        resolve(require('./../components/recharge/goodsList/GoodsList.vue'));
    }, 'recharge');
}
//代充
const RechargeSearch = resolve => {
    require.ensure([], () => {
        resolve(require('components/recharge/rechargeSearch/RechargeSearch.vue'));
    }, 'recharge');
}


export const rechargeRoute =

{
    path: '/vue/recharge',
    components: {
        default: Recharge,
    },
    children: [
        {
            path: '',
            components: {
                default: RechargeHome,
            }
        },
        {   name:'RechargeDetail',
            path: '/vue/recharge/detail/:publishId/:shopsId',
            components: {
                default: RechargeDetail,
                'recharge-header': Header,
            }
        },
        {
            name: 'rechargeOrder',
            path: '/vue/recharge/order/:publishId',
            components: {
                default: RechargeOrder,
                'recharge-header': Header,
            },
        },
        {
            name: 'RechargeVerifyAccount',
            path: '/vue/recharge/refill/verifyAccount',
            components: {
                default: RechargeVerifyAccount,
                'recharge-header': Header,
            },
        },
        {
            name: 'RechargeRefillInfo',
            path: '/vue/recharge/refill/refillInfo/:buyerRoleAccount',
            components: {
                default: RechargeRefillInfo,
                'recharge-header': Header,
            },
        },
        {
            name: 'QuickRecharge',
            path: '/vue/recharge/quickRecharge',
            components: {
                default: QuickRecharge,
                'recharge-header': Header,
            },
        },
        {
            name: 'RechargePaying',
            path: '/vue/recharge/paying/:orderId',
            components: {
                default: RechargePaying,
                'recharge-header': Header,
            },
            meta: {isPublish: true, requireAuth: true}
        },
        {
            path: '/vue/recharge/rechargeCommon',
            components: {
                default: RechargeCommon,
                'recharge-header': Header,
            }
        },
        {
            path: '/vue/recharge/rechargeStore/:shopsId',
            name: 'rechargeStore',
            components: {
                default: RechargeStore,
                'recharge-header': Header,
            }
        },
        {
            path: '/vue/recharge/rechargeStoreGoodsList/:shopsId',
            name: 'rechargeStoreGoodsList',
            components: {
                default: RechargeStoreGoodsList,
                'recharge-header': Header,
            }
        },
        {
            path: '/vue/recharge/rechargeStoreList',
            components: {
                default: RechargeStoreList,
                'recharge-header': Header,
            }
        },{
            path: '/vue/recharge/goodsList',
            name: 'goodsList',
            components: {
                default: GoodsList,
                'recharge-header': Header,
            }
        },
        {
            path: '/vue/recharge/rechargeSearch',
            name: 'rechargeSearch',
            components: {
                default: RechargeSearch,
            }
        },
        {
            path: '/vue/recharge/rechargeStoreSearch',
            name: 'rechargeStoreSearch',
            components: {
                default: RechargeStoreSearch,
            }
        },
    ],
    meta: {isPublish: true, requireAuth: false}
};
