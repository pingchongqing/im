const Header = resolve => {
    require.ensure(['components/Header.vue'], () => {
        resolve(require('components/Header.vue'));
    }, 'Home');
};

const Account = resolve => {
    require.ensure([], () => {
        resolve(require('components/account/Account.vue'));
    }, 'account');
}

const AccountDetail = resolve => {
    require.ensure([], () => {
        resolve(require('components/account/AccountDetail.vue'));
    }, 'account');
}

const AccountSwiper = resolve => {
    require.ensure([], () => {
        resolve(require('components/account/AccountSwiper.vue'));
    }, 'account');
}

const OrderAcco = resolve => {
    require.ensure([], () => {
        resolve(require('components/account/OrderAcco.vue'));
    }, 'account');
}
const QuickOrder = resolve => {
    require.ensure([], () => {
        resolve(require('components/account/QuickOrder.vue'));
    }, 'account');
}






export const accountRoute =

    {
        path: '/vue/account',
        components: {
            default: Account,
        },
        children: [
            {
                path: 'accountDetail/:goodsId/:goods_source_type/:gameType',
                name:'accountDetail',
                components: {
                    default: AccountDetail,
                    'account-header': Header
                }
            },
            {
                path: 'accountDetailApp/:goodsId/:goods_source_type/:gameType',
                name:'accountDetailApp',
                components: {
                    default: AccountDetail,
                }
            },
            {
                path: 'quickorder/:id',
                name:'quickorder',
                components: {
                    default: QuickOrder,
                },
	            meta: {isPublish: true, requireAuth: true}
            },
	        {
		        path: 'orderAcco/:goodsId/:goods_source_type/:gameType',
		        name:'orderAcco',
		        components: {
			        default: OrderAcco,
		        },
		        meta: {isPublish: true, requireAuth: true}
	        },
	        {
		        path: 'orderAccoApp/:goodsId/:goods_source_type/:gameType',
		        name:'orderAccoApp',
		        components: {
			        default: OrderAcco,
		        },
		        meta: {isPublish: true, requireAuth: true}
	        },
            {
                path: 'accountSwiper',
                name:'accountSwiper',
                components: {
                    default: AccountSwiper,
                    'account-header': Header
                }
            },
        ],
        meta: {isPublish: true, requireAuth: false}
    };
