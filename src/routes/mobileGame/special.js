/**
 * Created by yanjd on 2017/7/27.
 */
const Index = r => require.ensure([], () => r(require('components/mobileGame/special/index.vue')), '/mobile-game/special');
const KingIndex = r => require.ensure([], () => r(require('components/mobileGame/special/king_of_glory/index.vue')), '/mobile-game/special/king');
const KingHome = r => require.ensure([], () => r(require('components/mobileGame/special/king_of_glory/home.vue')), '/mobile-game/special/king');
const KingSkin = r => require.ensure([], () => r(require('components/mobileGame/special/king_of_glory/skin.vue')), '/mobile-game/special/king');

export default {
  path: 'special',
  name: 'Special',
  component: Index,
  children: [
    {
      path: 'king-of-glory',
      component: KingIndex,
      children: [
        {
          path: 'home',
          component: KingHome,
          name: 'SpecialKingHome'
        },
        {
          path: 'skin',
          component: KingSkin,
          name: 'SpecialKingSkin'
        }
      ]
    }
  ],
  meta: {isPublish: true, requireAuth: false}
}