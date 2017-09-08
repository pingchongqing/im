/**
 * Created by 严俊东 on 2017/3/16.
 */

const Member = r => require.ensure([], () =>
  r(require('components/my/members/Member.vue')), '/member'
);
const MemberBuyer = r => require.ensure([], () =>
  r(require('components/my/members/MemberBuyer.vue')), '/member'
);
let BuyerStoreGoods = r => require.ensure([], () =>
  r(require('components/my/members/BuyerStoreGoods.vue')), '/member'
);
const GoodsDetail = r => require.ensure([], () =>
  r(require('components/my/members/GoodsDetail.vue'), '/member')
);

export const member = {
  path: '/vue/member',
  component: Member,
  children: [
    {
      path: 'member-buyer',
      component: MemberBuyer,
      children: [
        {
          path: 'store/:state',
          name: 'StoreGoods',
          component: BuyerStoreGoods,
          meta: {isPublish: true, requireAuth: true}
        },
      ],
      meta: {isPublish: true, requireAuth: true}
    },
    {
      path: 'goods-detail',
      name: 'GoodsDetail',
      component: GoodsDetail,
      meta: {isPublish: true, requireAuth: true}
    },
  ],
  meta: {isPublish: true, requireAuth: true} //暂时没登入不能进入
};
