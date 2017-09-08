/**
 * Created by zy on 2017/3/16.
 */
const CoinsType = resolve => {
  require.ensure(['./../components/coins/CoinsType.vue'], () => {
    resolve(require('./../components/coins/CoinsType.vue'));
  }, 'CoinsType');
};
const ListCoins = resolve => {
  require.ensure(['./../components/coins/ListCoins.vue'], () => {
    resolve(require('./../components/coins/ListCoins.vue'));
  }, 'CoinsType');
};
const CoinsSome = resolve => {
  require.ensure(['./../components/coins/CoinsSome.vue'], () => {
    resolve(require('./../components/coins/CoinsSome.vue'));
  }, 'CoinsType');
};
const CoinsElse = resolve => {
  require.ensure(['./../components/coins/CoinsElse.vue'], () => {
    resolve(require('./../components/coins/CoinsElse.vue'));
  }, 'CoinsType');
};
const CoinsSales = resolve => {
  require.ensure(['./../components/coins/CoinsSales.vue'], () => {
    resolve(require('./../components/coins/CoinsSales.vue'));
  }, 'CoinsType');
};
const ProtectNotes = resolve => {
  require.ensure(['./../components/coins/ProtectNotes.vue'], () => {
    resolve(require('./../components/coins/ProtectNotes.vue'));
  }, 'CoinsType');
};
const ProtectGoods = resolve => {
  require.ensure(['./../components/coins/ProtectGoods.vue'], () => {
    resolve(require('./../components/coins/ProtectGoods.vue'));
  }, 'CoinsType');
};
const TradeNotes = resolve => {
  require.ensure(['./../components/coins/TradeNotes.vue'], () => {
    resolve(require('./../components/coins/TradeNotes.vue'));
  }, 'CoinsType');
};
const TradeGoods = resolve => {
  require.ensure(['./../components/coins/TradeGoods.vue'], () => {
    resolve(require('./../components/coins/TradeGoods.vue'));
  }, 'CoinsType');
};

export const coinsType =
  {
    path: '/vue/coins-type',
    components: {
      default: CoinsType,
    },
    children: [
      {
        path: 'list-coins',
        components: {
          default: ListCoins
        },
        name: 'ListCoins',
        meta: {isPublish: true, requireAuth: false}
      },
      {
        path: "/vue/menu/coins-type/coins-some",
        components: {
          default: CoinsSome
        },
        name: 'CoinsSome',
        meta: {isPublish: true, requireAuth: true, toFullPath:true}
      }, {
        path: "/vue/menu/coins-type/coins-else",
        components: {
          default: CoinsElse
        },
        name: 'CoinsElse',
        meta: {isPublish: true, requireAuth: true, toFullPath:true}
      }, {
        path: "/vue/menu/coins-type/coins-sales",
        components: {
          default: CoinsSales
        },
        name: 'CoinsSales',
        meta: {isPublish: true, requireAuth: true, toFullPath:true}
      },{
        path: "/vue/menu/coins-type/protect-notes",
        components: {
          default: ProtectNotes
        },
        name: 'ProtectNotes',
        meta: {isPublish: true, requireAuth: false}
      },{
        path: "/vue/menu/coins-type/protect-goods",
        components: {
          default: ProtectGoods
        },
        name: 'ProtectGoods',
        meta: {isPublish: true, requireAuth: false}
      },{
        path: "/vue/menu/coins-type/trade-notes",
        components: {
          default: TradeNotes
        },
        name: 'TradeNotes',
        meta: {isPublish: true, requireAuth: false}
      },{
        path: "/vue/menu/coins-type/trade-goods",
        components: {
          default: TradeGoods
        },
        name: 'TradeGoods',
        meta: {isPublish: true, requireAuth: false}
      }
    ],
    meta: {isPublish: true, requireAuth: false}
  }


// export default new Router({
//   routes: [
//     {
//       path: '/list-coins',
//       // name: 'ListCoins',
//       component: ListCoins,
//       children: [{
//         path: "",
//         name: "CoinsFast",
//         component: CoinsFast
//       }, {
//         path: "coins-some",
//         name: "CoinsSome",
//         component: CoinsSome
//       },
//       ]
//     },
//     {
//       path: "/menu",
//       name: 'Menu',
//       component: Menu
//     },
//     {
//       path: "/coins-order",
//       name: 'CoinsOrder',
//       component: CoinsOrder
//     },
//     {
//       path: "*",
//       redirect: "/menu"
//     }
//   ]
// })
