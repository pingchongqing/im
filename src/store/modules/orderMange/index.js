/*
 * @Author: fredlee
 * @Date:   2017-05-31 13:39:51
 * @Last Modified by:   fredlee
 * @Last Modified time: 2017-06-24 14:30:17
 */

import * as types from '../../type'
import api from '../../../api'


const state = {
	orderMobileList: [],
	orderPCList: [],
	mobileAllLoaded:false,
	pcAllLoaded:false,
	mobileState:{},
	pcState:{},
	mobileOrderCount:{},
	pcOrderCount:{},
	mobileDetail:{},
	pcDetail:{},

}

const mutations = {
	setMobileOrderCount:function  (state,list) {
		state.mobileOrderCount = list;
	},
	setPcOrderCount:function  (state,list) {
		state.pcOrderCount = list;
	},
	setOrderMobileList: function(state,list) {
		console.log(list);
		for (let item of list) {
			state.orderMobileList.push(item);
		}
	},
	setOrderPCList:function  (state,list) {
		for (let item of list) {
			state.orderPCList.push(item);
		}
	},
	setMobileallLoaded:function  (state,item) {
		state.mobileAllLoaded = item;
	},
	setPCallLoaded:function  (state,item) {
		state.pcAllLoaded = item;
	},
	clearOrderMobileList:function  (state,list) {
		state.orderMobileList = list;
	},
	clearOrderPCList:function  (state,list) {
		state.orderPCList = list;
	},
	setMobileState:function (state,item) {
		state.mobileState = item;
	},
	setMobileDetail:function  (state,item) {
		state.mobileDetail = item;
	},
	setPcDetail:function  (state,item) {
		state.pcDetail = item;
	},
	setPcState:function  (state,item) {
		state.pcState = item;
	}

}


const actions = {
	[types.MEMBER_SELLER_ORDER_MOBILE_LIST]({
		commit
	}, params) {
		return new Promise((resolve, reject) => {
			commit('setMobileallLoaded', true);
			api.memberSeller.getOrderListbyMobile(params).then(
				res => {
					if (res.data.success && res.data.data) {
						if (res.data.data.length < params.pageSize) {
							commit('setMobileallLoaded', true);
						} else {
							commit('setMobileallLoaded', false);
						}
						commit('setOrderMobileList', res.data.data);
					} else {
						commit('setMobileallLoaded', true);
					}
					resolve();
				},
				err => {
					reject()
					console.log(err)
				}
			)
		})
	},
	[types.MEMBER_SELLER_ORDER_MOBILE_CLEAR_LIST]({
		commit
	}, params) {
		commit('clearOrderMobileList',[]);
	},
	[types.MEMBER_SELLER_ORDER_MOBILE_STATE]({
		commit
	}, params) {
		commit('setMobileState',params);
	},
	[types.MEMBER_SELLER_ORDER_PC_LIST]({
		commit
	}, params) {
		return new Promise((resolve, reject) => {
			commit('setPCallLoaded', true);
			api.memberSeller.getOrderListbyPC(params).then(
				res => {
					if (res.data.success) {
						let data = JSON.parse(res.data.result);
						if (!data.BizResult.Data)return;

						if (data.BizResult.Data.Datas.length < params.pageSize) {
							commit('setPCallLoaded', true);
						} else {
							commit('setPCallLoaded', false);
						}
						commit('setOrderPCList',data.BizResult.Data.Datas);
					} else {
						commit('setPCallLoaded', true);
					}
					resolve();
				},
				err => {
					reject()
					console.log(err)
				}
			)
		})
	},
	[types.MEMBER_SELLER_ORDER_PC_CLEAR_LIST]({
		commit
	}, params) {
		commit('clearOrderPCList',[]);
	},
	 [types.MEMBER_SELLER_ORDER_COUNT_LIST]({
    commit
  }, params) {
    api.memberSeller.getPcgoodsNum(params).then(
      res => {
        let orderMobileCount = res[0];
        let orderPcCount = res[1];
        if (orderMobileCount.data.success) {
          commit('setMobileOrderCount', orderMobileCount.body.result);
        };
        if (orderPcCount.data.success) {
          commit('setPcOrderCount', orderPcCount.body.result);
        };
      },
      err => {
        console.log(err)
      }
    )
  },
  [types.MEMBER_SELLER_ORDER_MOBILE_DETAIL]({
    commit
  }, params) {
		commit('setMobileDetail', {});
    api.memberSeller.getMobileDetail(params).then(
      res => {
       if (res.data.success && res.data.result) {
       		commit('setMobileDetail',res.data.result);
       };
      },
      err => {
        console.log(err)
      }
    )
  },
   [types.MEMBER_SELLER_ORDER_PC_STATE]({
    commit
  }, params) {
  	commit('setPcState',params)
  },
   [types.MEMBER_SELLER_ORDER_PC_DETAIL]({
    commit
  }, params) {
		commit('setPcDetail', {});
    api.memberSeller.getPCDetail(params).then(
      res => {
      	let result =JSON.parse(res.body.result);
       if (result.BizResult && result.BizResult.Data) {
       		console.log(result.BizResult.Data);
       		commit('setPcDetail',result.BizResult.Data);
       };
      },
      err => {
        console.log(err)
      }
    )
  },

}


export default {
  state,
  mutations,
  actions
}
