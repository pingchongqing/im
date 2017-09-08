/*
 * @Author: fredlee
 * @Date:   2017-06-28 15:53:01
 * @Last Modified by:   fredlee
 * @Last Modified time: 2017-06-28 16:10:30
 * 公用vuex管理
 * 
 */


import * as types from '../../type'
import api from '../../../api'


const state = {
	isLogin: false
}

const mutations = {
	setLoginstatus: (state, val) => {
		state.isLogin = val;
	}
}

const actions = {
	[types.COMMON_ISLOGIN]({//获取是否登录状态
		commit
	}, params) {
		return new Promise((reslove,reject)=>{
            api.seller.queryCurrentUserInfo().then((res) => {
                if (!res.data.success) {
                    commit('setLoginstatus', false)
                    // location.href='/vue/login?returnUrl='+ encodeURIComponent(location.href);
                } else {
                    commit('setLoginstatus', true)
                }
                reslove();
            })
		})

	}
}

export default {
  state,
  mutations,
  actions
}