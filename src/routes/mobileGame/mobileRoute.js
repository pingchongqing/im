//手游列表
const mobileGameList = resolve => {
    require.ensure([], () => {
        resolve(require('components/mobileGame/goodsList/goods_list.vue'));
    }, '/mobile-game');
}
export default {
    path: 'goods-list/:gameId/:gameName/:goodsType',
    name: "MobileGameList",
    components: {
        default: mobileGameList,
    },
    meta: {isPublish: true, requireAuth: false}
};
