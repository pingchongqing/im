/*
* @Author: fredlee
* @Date:   2017-04-19 13:26:08
* @Last Modified by:   fredlee
* @Last Modified time: 2017-05-05 11:10:42
*/

import Vue from 'vue';

const vm = new Vue()

function searchGoodsList (params) {
	return vm.$http.get(vm.$CONSTANTS.APIRecharge+'publishAliYun/publishSearch',{params:params});
}

export default {searchGoodsList};




