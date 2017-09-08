const Header = resolve => {
    require.ensure(['components/Header.vue'], () => {
        resolve(require('components/Header.vue'));
    }, 'Home');
};

const BuyerCenter = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/buyerCenter/BuyerCenter.vue'));
    }, 'buyerCenter');
}

const BuyerCenterMain = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/buyerCenter/BuyerCenterMain.vue'));
    }, 'buyerCenter');
}

const PcMobGame = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/buyerCenter/PcMobGame.vue'));
    }, 'buyerCenter');
}

const BuyerPc = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/buyerCenter/BuyerPc.vue'));
    }, 'buyerCenter');
}

const BuyerOrder = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/buyerCenter/BuyerOrder.vue'));
    }, 'buyerCenter');
}

const BuyerMob = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/buyerCenter/BuyerMob.vue'));
    }, 'buyerCenter');
}

const GetAccount = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/buyerCenter/GetAccount.vue'));
    }, 'buyerCenter');
}
const CloudCheck = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/buyerCenter/CloudCheck.vue'));
    }, 'buyerCenter');
}



export const buyerCenterRoute =

{
    path: '/vue/buyerCenter',
    components: {
      default: BuyerCenter,
    },
    children: [
        {
            path: 'buyerCenterMain',
            name:'buyerCenterMain',
            components: {
                default: BuyerCenterMain
            }
        },
        {
            path: 'pcMobGame/:status',
            name:'pcMobGame',
            components: {
                default: PcMobGame
            }
        },
        {
            path: 'buyerPc/:status',
            name:'buyerPc',
            components: {
                default: BuyerPc,
            }
        },
        {
            path: 'buyerOrder/:type/:orderId',
            name:'buyerOrder',
            components: {
                default: BuyerOrder
            }
        },
        {
            path: 'buyerOrder/:type/:orderId/:fast',
            name:'fastOrder',
            components: {
                default: BuyerOrder
            }
        },
        {
            path: 'buyerMob/:status',
            name:'buyerMob',
            components: {
                default: BuyerMob
            }
        },
        {
            path: 'getAccount/:type/:orderId',
            name:'getAccount',
            components: {
                default: GetAccount,
            }
        },
        {
            path: 'cloudCheck',
            name:'cloudCheck',
            components: {
                default: CloudCheck,
                // 'buyerCenter-header': Header
            }
        },
    ],
    meta: {isPublish: true, requireAuth: true}
};
