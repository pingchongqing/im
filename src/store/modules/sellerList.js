/*
 * @Author: fredlee
 * @Date:   2017-04-19 13:52:35
 * @Last Modified by:   fredlee
 * @Last Modified time: 2017-04-20 12:01:07
 */

import {SELLER_LIST} from '../type';


export default {
	state:{
		list: [],
	},
	mutations: {
		[SELLER_LIST](state,user) {
			console.log(state);
		}
	}
}