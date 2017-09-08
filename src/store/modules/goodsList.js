/*
 * @Author: fredlee
 * @Date:   2017-04-19 13:52:35
 * @Last Modified by:   fredlee
 * @Last Modified time: 2017-04-19 15:44:50
 */

import {SEARH_GOODS_LIST} from '../type';

// const state = {
// 	isRefersh: true,
// };


// export const mutations = {
// 	[SEARH_GOODS_LIST](state, user) {}
// }
// 
// 
export default {
	state:{
		isRefersh: true,
	},
	mutations: {
		[SEARH_GOODS_LIST](state,user) {
			console.log(state);
		}
	}
}