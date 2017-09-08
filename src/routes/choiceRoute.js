const Header = resolve => {
    require.ensure(['components/Header.vue'], () => {
        resolve(require('components/Header.vue'));
    }, 'Home');
};

const Choice = resolve => {
    require.ensure([], () => {
        resolve(require('components/choice/Choice.vue'));
    }, 'choice');
}

const Entry = resolve => {
    require.ensure([], () => {
        resolve(require('components/choice/Entry.vue'));
    }, 'choice');
}

const BuyEntry = resolve => {
    require.ensure([], () => {
        resolve(require('components/choice/BuyEntry.vue'));
    }, 'choice');
}

const GoodsList = resolve => {
    require.ensure([], () => {
        resolve(require('components/choice/GoodsList.vue'));
    }, 'choice');
}

const EquipmentList = resolve => {
    require.ensure([], () => {
        resolve(require('components/choice/EquipmentList.vue'));
    }, 'choice');
}

export const choiceRoute =

{
    path: '/vue/choice',
    components: {
        default: Choice,
    },
    children: [
        {
            path: 'entry',
            name:'Entry',
            components: {
                default: Entry,
                'choice-header': Header
            }
        },
        {
            path: 'buyEntry',
            name:'buyEntry',
            components: {
                default: BuyEntry,
                'choice-header': Header
            }
        },
        {
            path: '/vue/pcGoodsList/:gameId/:gameName/:goodsType',
            name:'PcGoodsList',
            components: {
                default: GoodsList
            }
        },
        {
            path: '/vue/equipmentList/:gameId/:gameName/:goodsType',
            name:'EquipmentList',
            components: {
                default: EquipmentList
            }
        },

    ],
    meta: {isPublish: true, requireAuth: false}
};
