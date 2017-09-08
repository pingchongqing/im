/*
 * @Author: fredlee
 * @Date:   2017-05-05 19:03:45
 * @Last Modified by:   fredlee
 * @Last Modified time: 2017-07-06 14:34:31
 */

import * as types from '../../type'
import api from '../../../api'

// import getter from '../../getters'

const state = {
  dynamic: [],
  isquick:false,
  isLogin:false,
  isMainAuthentication:false,
  repositoryNum:0,
  unit:''
}

const mutations = {
  getdynamicList: function(state, data) {
      state.dynamic.push(data);
  },
  setQuick:function  (state) {
    state.isquick=state;
  },
  setLogin:function (state,isLogin) {
    state.isLogin=isLogin;
  },
  setisMainAuthentication:function  (state,val) {
    state.isMainAuthentication = val;
  },
  setrepositorynum:function  (state,val) {
    state.repositoryNum = val;
  },
  setUnit:function  (state,val) {
    state.unit = val;
  }
}


const actions = {
  [types.SELLER_DYNAMIC_LIST]({
    commit
  }, params) {
     let id=params.propertyid;
    api.seller.searchgameGoodsinfo(params).then(
      res => {
        if (res.data.success && res.data.gamePropertyValList) {
          commit('getdynamicList', {
            id: id,
            data: res.data.gamePropertyValList
          })
        };
      },
      err => {
        console.log(err)
        reject()
      }
    )

  },
  [types.SELLER_USER_LOGIN]({
    commit
  }, params) {
    api.seller.queryCurrentUserInfo().then(
      res => {
        commit('setLogin', res.data.success)
      },
      err => {
        console.log(err)
        reject()
      }
    )

  },
  [types.SELLER_IS_MAINAUTHENTICATION]({
    commit
  }, params) {
     api.seller.checkUserBindIdNumber(params)
               .then((res)=>{
                  if (res.data.success) {
                    commit('setisMainAuthentication',res.data.isBindIdNsumber);
                  };
            })
  },
  [types.SELLER_REPOSITORYNUM]({
    commit
  }, params) {
     api.seller.getrepositorynum(params)
               .then((res)=>{
                  if (res.data.success) {
                    commit('setrepositorynum',res.data.repositoryNum);
                  };
            })
  },
  [types.SELLER_UNIT]({
    commit
  }, params) {
     api.seller.getcurrencyunitbygameid(params)
               .then((res)=>{
                  if (res.data.success) {
                    commit('setUnit',res.data.unit);
                  };
            })
  }
}

export default {
  state,
  mutations,
  actions

}
