/**
 * Created by 严俊东 on 2017/6/20.
 */
import special from './special'
import mobileRoute from './mobileRoute'

const Index = r => require.ensure([], () =>
  r(require('components/mobileGame/index.vue')), '/mobile-game/index'
)

const AccountDetail = r => require.ensure([], () =>
  r(require('components/mobileGame/accountDetail/AccountDetail.vue')), '/mobile-game/detail'
)

const Helper = r => require.ensure([], () =>
  r(require('components/mobileGame/helper.vue')), '/mobile-game/index'
)

const SellIndex = r => require.ensure([], () =>
  r(require('components/mobileGame/sell/index.vue')), '/mobile-game/sell/index'
)

const SellHome = r => require.ensure([], () =>
  r(require('components/mobileGame/sell/home.vue')), '/mobile-game/sell/home'
);


export const mobileGame = {
  path: '/vue/mobile-game',
  name: 'MobileGame',
  component: Index,
  children: [
    {
      path: 'account-detail/:goodsId/:goods_source_type',
      name: 'MGAccountDetail',
      component: AccountDetail,
      meta: {isPublish: true, requireAuth: false}
    },
    {
      path: 'helper',
      component: Helper,
      meta: {isPublish: true, requireAuth: false}
    },
    special,
    mobileRoute
  ]
}

export const mobileGameSell = {
  path: '/vue/sell',
  component: SellIndex,
  children: [
    {
      path: '/vue/sell-home/:type',
      name: 'MGSellHome',
      component: SellHome
    }
  ],
  meta: {isPublish: true, requireAuth: false}
}