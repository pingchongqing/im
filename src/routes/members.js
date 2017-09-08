/**
 * Created by 严俊东 on 2017/3/16.
 */

const Members = r => require.ensure([], () =>
  r(require('components/my/members/Member.vue')), '/members'
);
const MemberBuyer = r => require.ensure([], () =>
  r(require('components/my/members/MemberBuyer.vue')), '/members'
);
let BuyerStoreGoods = r => require.ensure([], () =>
  r(require('components/my/members/BuyerStoreGoods.vue')), '/members'
);
const GoodsDetail = r => require.ensure([], () =>
  r(require('components/my/members/GoodsDetail.vue'), '/members')
);


export const members = {
  path: '/vue/members',
  component: Members,
  children: [
    {
      path: 'member-buyer',
      component: MemberBuyer,
      children: [
        {
          path: 'store/:state',
          name: 'sStoreGoods',
          component: BuyerStoreGoods,
          meta: {isPublish: true, requireAuth: true}
        },
      ],
      meta: {isPublish: true, requireAuth: true}
    },
    {
      path: 'goods-detail',
      name: 'sGoodsDetail',
      component: GoodsDetail,
      meta: {isPublish: true, requireAuth: true}
    },
  ],
  meta: {isPublish: true, requireAuth: true} //暂时没登入不能进入
};
