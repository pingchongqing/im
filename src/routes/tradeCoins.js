/**
 * Created by zy on 2017/3/16.
 */
const tradeCoins = resolve => {
    require.ensure(['./../components/currency/currencyCoins/TradeCoins.vue'], () => {
    resolve(require('./../components/currency/currencyCoins/TradeCoins.vue'));
  }, 'tradeCoins');
};
const TradeStone = resolve => {
  require.ensure(['./../components/currency/currencyCoins/TradeStone.vue'], () => {
    resolve(require('./../components/currency/currencyCoins/TradeStone.vue'));
  }, 'tradeCoins');
};
const TradeStoneDetail = resolve => {
  require.ensure(['./../components/currency/currencyCoins/TradeStoneDetail.vue'], () => {
    resolve(require('./../components/currency/currencyCoins/TradeStoneDetail.vue'));
  }, 'tradeCoins');
};


export const tradeRoute =
  {
    path: '/vue/trade-coins',
    components: {
      default: tradeCoins,
    },
    children: [
      {
        path: 'trade-stone',
        components: {
          default: TradeStone
        },
        name: 'TradeStone',
        meta: {isPublish: true, requireAuth: false}
      },
      {
        path:'trade-stone-detail',
        components: {
          default: TradeStoneDetail
        },
        name: 'TradeStoneDetail',
        meta: {isPublish: true, requireAuth: true, toFullPath:true}
      },
    ],
    meta: {isPublish: true, requireAuth: false}
  }
