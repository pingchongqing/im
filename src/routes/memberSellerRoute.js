/*
 * @Author: fredlee
 * @Date:   2017-05-23 10:16:11
 * @Last Modified by:   fredlee
 * @Last Modified time: 2017-06-20 17:25:57
 */

const Header = resolve => {
	require.ensure(['components/Header.vue'], () => {
		resolve(require('components/Header.vue'));
	}, 'Home');
};

const MemberSeller = resolve => {
	require.ensure([], () => {
		resolve(require('components/my/memberSeller/MemberSeller.vue'));
	}, 'seller');
}

const MemberSellerHome = resolve => {
	require.ensure([], () => {
		resolve(require('components/my/memberSeller/MembersellerHome.vue'));
	}, 'seller');
}

const SellerGoodsListOfMobile = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/memberSeller/sellerGoodsListMobile/SellerGoodsListofMobile.vue'));
    }, 'seller');
}

const EditAccountGoods = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/memberSeller/sellerGoodsListMobile/editAccountGoods.vue'));
    }, 'seller');
}

const SellerGoodsListOfPc = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/memberSeller/sellerGoodsListPc/SellerGoodsListofPc.vue'));
    }, 'seller');
}
const EditSellerGoodsPc = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/memberSeller/sellerGoodsListPc/editSellerGoodsPc.vue'));
    }, 'seller');
}

const OrderListMobile = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/memberSeller/orderListMobile/OrderListMobile.vue'));
    }, 'seller');
}

const OrderMobileDetail = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/memberSeller/orderListMobile/OrderMobileDetail.vue'));
    }, 'seller');
}


const OrderListPC = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/memberSeller/orderListPc/OrderListPC.vue'));
    }, 'seller');
}


const OrderPCDetail = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/memberSeller/orderListPc/OrderPcDetail.vue'));
    }, 'seller');
}




export const memberSellerRoute =

{
    path: '/vue/memberseller',
    components: {
        default: MemberSeller,
    },
    children: [
        {
            path: '',
            name:'MemberSeller',
            components: {
                default: MemberSellerHome,
                'memberseller-header': Header
            }
        },
        {
            path: '/vue/memberseller/sellergoodsListofMobile',
            name:'SellerGoodsListOfMobile',
            components: {
                default: SellerGoodsListOfMobile,
                'memberseller-header': Header,
            }
        },{
            path: '/vue/memberseller/editaccountGoods',
            name:'EditAccountGoods',
            components: {
                default: EditAccountGoods,
                'memberseller-header': Header,
            }
        },
        {
            path: '/vue/memberseller/sellerGoodsListofPc',
            name:'SellerGoodsListOfPc',
            components: {
                default: SellerGoodsListOfPc,
                'memberseller-header': Header,
            }
        },
        {
            path: '/vue/memberseller/editSellerGoodsPc',
            name:'EditSellerGoodsPc',
            components: {
                default: EditSellerGoodsPc,
                'memberseller-header': Header,
            }
        },
         {
            path: '/vue/memberseller/orderListofMobile',
            name:'OrderListMobile',
            components: {
                default: OrderListMobile,
                'memberseller-header': Header,
            }
        },
        {
            path: '/vue/memberseller/orderlistofPc',
            name:'OrderListPC',
            components: {
                default: OrderListPC,
                'memberseller-header': Header,
            }
        },
        {
            path: '/vue/memberseller/ordermoboleDetail',
            name:'OrderMobileDetail',
            components: {
                default: OrderMobileDetail,
                'memberseller-header': Header,
            }
        },
        {
            path: '/vue/memberseller/orderpcDetail',
            name:'OrderPCDetail',
            components: {
                default: OrderPCDetail,
                'memberseller-header': Header,
            }
        },
    ],
    meta: {isPublish: true, requireAuth: true}
};
