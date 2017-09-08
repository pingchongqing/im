/*
* @Author: fredlee
* @Date:   2017-06-23 20:53:09
* @Last Modified by:   fredlee
* @Last Modified time: 2017-06-23 20:54:44
*/

import Vue from 'vue';

const vm = new Vue()


function saveMainUserInfo (params) {
	return vm.$http.post(vm.$CONSTANTS.APIUser+'account/saveMainUserInfo',params);
}

export default{
	saveMainUserInfo
}
