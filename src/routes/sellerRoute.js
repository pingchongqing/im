/*
* @Author: fredlee
* @Date:   2017-04-18 14:31:17
* @Last Modified by:   fredlee
* @Last Modified time: 2017-08-25 10:47:17
*/

const Header = resolve => {
    require.ensure(['components/Header.vue'], () => {
        resolve(require('components/Header.vue'));
    }, 'Home');
};

const Seller = resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/Seller.vue'));
    }, 'seller');
}

const SellerHome = resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/SellerHome.vue'));
    }, 'seller');
}

const GoodsPublish= resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/goodsPublish/GoodsPublish.vue'));
    }, 'seller');
}
const GoodsCreated= resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/goodsCreated/GoodsCreated.vue'));
    }, 'seller');
}

const GoodsCreatedMobile= resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/goodsCreated/GoodsCreatedMobile.vue'));
    }, 'seller');
}

const CreatedGold= resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/goodsCreated/CreatedGold.vue'));
    }, 'seller');
}

const SelectServer= resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/goodsCreated/SelectServer.vue'));
    }, 'seller');
}
const PublishSuccess = resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/goodsPublish/PublishSuccess.vue'));
    }, 'seller');

}
const PublishProcess = resolve => {
    require.ensure([], () => {
        resolve(require('components/seller/goodsPublish/PublishProcess.vue'));
    }, 'seller');
}
export const sellerRoute =

{
    path: '/vue/seller',
    components: {
        default: Seller,
    },
    children: [
        {
            path: '',
            name:'seller',
            components: {
                default: SellerHome,
                'seller-header': Header,
            }
        },
        {
            path: 'goodsPublish',
            name:'goodsPublish',
            components: {
                default: GoodsPublish,
                 'seller-header': Header,
            }
        },
         {
            path: 'goodsCreated',
            name:'goodsCreated',
            components: {
                default: GoodsCreated,
                'seller-header': Header,
            }
        },
        {
            path: 'selectServer',
            name:'selectServer',
            components: {
                default: SelectServer,
            }
        },
        {
            path: 'PublishSuccess',
            name:'PublishSuccess',
            components: {
                default: PublishSuccess,
                'seller-header': Header,
            }
        },
        {
            path: 'PublishProcess',
            name:'PublishProcess',
            components: {
                default: PublishProcess,
                //'seller-header': Header,
            }
        },
        {
            path: 'GoodsCreatedMobile',
            name:'GoodsCreatedMobile',
            components: {
                default: GoodsCreatedMobile,
                'seller-header': Header,
            }
        },
        {
            path: 'CreatedGold',
            name:'CreatedGold',
            components: {
                default: CreatedGold,
                'seller-header': Header,
            }
        },


    ],
    meta: {isPublish: true, requireAuth: true}
};
