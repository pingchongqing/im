/**
 * Created by Administrator on 2017/6/14.
 */

//手游列表
const mobileGameQuick = resolve => {
	require.ensure([], () => {
		resolve(require('./../components/mobileGame/goodsList/good_quick.vue'));
	}, '/mobile-game');
}

export const mobileQuickRoute =
	{
		path: '/vue/mobileGameQuick/:gameId/:categoryTypeName/:gamePlatformId/:gameStartAccountUnit',
		name: "mobileGameQuick",
		components: {
			default: mobileGameQuick,
		},
		meta: {isPublish: true, requireAuth: true}
	};