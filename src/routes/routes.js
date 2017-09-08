import {searchRoute} from './searchRoute.js';
import {searchAll} from './searchAll.js';
import {conditionalSearchRoute} from './conditionalSearchRoute.js';
import {quickLogin} from './quickLogin.js';
import {helpRoute} from './helpRoute.js';
import {rechargeRoute} from './rechargeRoute.js';
import {sellerRoute} from './sellerRoute.js'
import {test} from './test.js';
import {member} from './member.js';
import {coinsType} from './coinsType.js';
import {kf} from './kefu.js';
import {accountRoute} from './accountRoute.js';
import {equipmentRoute} from './equipmentRoute.js';
import {choiceRoute} from './choiceRoute.js';
import {mobileGame, mobileGameSell} from './mobileGame';
import {memberSellerRoute} from './memberSellerRoute.js';
import {buyerCenterRoute} from './buyerCenterRoute.js';
import {members} from './members.js';
import {mobileQuickRoute} from './mobileQuick.js';
import {tradeRoute} from './tradeCoins.js';
import {centers} from './center.js';
import {logins} from './login.js';
import {mess} from './messageRoute.js';
import {history} from './history.js';
const Home = resolve => {
    require.ensure(['components/Home.vue'], () => {
        resolve(require('components/Home.vue'));
    }, 'Home');
};

const Header = resolve => {
    require.ensure(['components/Header.vue'], () => {
        resolve(require('components/Header.vue'));
    }, 'Home');
};

const Footer = resolve => {
    require.ensure([], () => {
        resolve(require('components/Footer.vue'));
    }, 'Home');
};
const reaName = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/members/ReaName.vue'));
    }, 'Home');
};
const myAccount = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/members/MyAccount.vue'));
    }, 'Home');
};
const fundDetails = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/members/FundDetails.vue'));
    }, 'Home');
};
const oldFundDetails = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/members/OldFundDetails.vue'));
    }, 'Home');
};
const singlePay = resolve => {
    require.ensure([], () => {
        resolve(require('components/zhifu/SinglePay.vue'));
    }, 'Home');
};
export const routes = [
    {
        path: '', name: 'home', components: {
        default: Home,
    },
        meta: {isPublish: true, requireAuth: false}
    },
    {
        path: '/index.html', components: {
        default: Home,
    },
        meta: {isPublish: true, requireAuth: false}
    },
    {
        path: '/vue/rea-name', components: {
        default: reaName,
    },
        meta: {isPublish: true, requireAuth: false}
    },
    {
        path: '/vue/my-account', components: {
        default: myAccount,
    },
        meta: {isPublish: true, requireAuth: false}
    },
    {
        path: '/vue/fund-details', components: {
        default: fundDetails,
    },
        meta: {isPublish: true, requireAuth: false}
    },
    {
        name:'oldFundDetails',
        path: '/vue/old-fundDetails/:userId', components: {
        default: oldFundDetails,
    },
        meta: {isPublish: true, requireAuth: false}
    },
    {
        name: 'singlePay',
        path: '/vue/single-pay/:orderId', components: {
        default: singlePay,
    },
        meta: {isPublish: true, requireAuth: false}
    },
    tradeRoute,
    quickLogin,
    mobileGame,
    mobileGameSell,
    test,
    member,
    members,
    coinsType,
    searchAll,
    conditionalSearchRoute,
    searchRoute,
    helpRoute,
	  mobileQuickRoute,
    rechargeRoute,
    sellerRoute,
    kf,
    accountRoute,
    equipmentRoute,
    choiceRoute,
    buyerCenterRoute,
    memberSellerRoute,
    centers,
    logins,
    mess,
    history
];
