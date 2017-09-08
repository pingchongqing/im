/*
 * @Author: fredlee
 * @Date:   2017-05-23 10:46:50
 * @Last Modified by:   fredlee
 * @Last Modified time: 2017-06-24 15:16:31
 */


import * as types from '../../type'
import api from '../../../api'

const state = {
  mobileGoodsCount: {},
  pcGoodsCount: {},
  mobileOrderCount: {},
  pcOrderCount: {},
  mobileList: [],
  pcList:[],
  allLoaded: false,
  safeBuyConfig: {},
  goodsDetail: {},
  publicState: {},
  allLoadedPc:false,
  publicStatePc:{},
  isUpdate:false
}

const mutations = {
  setMobileGoodsCount: function(state, list) {
    state.mobileGoodsCount = list;
  },
  setPcGoodsCount: function(state, list) {
    state.pcGoodsCount = list;
  },
  setMobileOrderCount: function(state, list) {
    state.mobileOrderCount = list;
  },
  setPcOrderCount: function(state, list) {
    state.pcOrderCount = list;
  },
  setMobileList: function(state, list) {
    for (let item of list) {
      state.mobileList.push(item);
    }
    //state.mobileList = list;
  },
  setPcList:function (state,list) {
    for (let item of list) {
      state.pcList.push(item);
    }
  },
  clearMobileList: function(state) {
    state.mobileList = [];
  },
  clearPcList: function(state) {
    state.pcList = [];
  },
  setallLoaded: function(state, val) {
    state.allLoaded = val;
  },
  setSafeBuyConfig: function(state, item) {
    state.safeBuyConfig = item;
  },
  setGoodsDetail: function(state, item) {
    state.goodsDetail = item;
  },
  setPublicState: function(state, item) {
    state.publicState = item;
  },
  setallLoadedPc:function  (state,val) {
    state.allLoadedPc = val;
  },
  setPublicStatePc:function  (state,item) {
    
    state.publicStatePc = item;
  },
  setUpdate:function  (state,val) {
    state.isUpdate = val;
  }
}

const actions = {
  [types.MEMBER_SELLER_COUNT_LIST]({
    commit
  }, params) {
    api.memberSeller.getMgoodsNum(params).then(
      res => {
        let goodsMobileCount = res[0];
        let goodsPcCount = res[1];

        if (goodsMobileCount.data.success) {
          commit('setMobileGoodsCount', goodsMobileCount.data.result);
        };
        if (goodsPcCount.data.success) {
          commit('setPcGoodsCount', goodsPcCount.data.result);
        };
      },
      err => {
        console.log(err)
      }
    )

  },
  [types.MEMBER_SELLER_MOBILE_LIST]({
    commit
  }, params) {
   return new Promise((resolve, reject) => {
    commit('setallLoaded', true);
      api.memberSeller.getGoodsListbyMobile(params).then(
        res => {
          if (res.data.success) {
            if (res.data.goodsDataList.length < params.pageSize) {
              commit('setallLoaded', true);
            } else {
              commit('setallLoaded', false);
            }
            commit('setMobileList', res.data.goodsDataList);
          } else {
            commit('setallLoaded', true);
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
  [types.MEMBER_SELLER_PC_LIST]({
    commit
  }, params) {
    commit('setallLoadedPc', true);
   return new Promise((resolve, reject) => {
      api.memberSeller.getGoodsListbyPc(params).then(
        res => {
          if (res.data.success) {
            let data =JSON.parse(res.data.goodsDataList);
            if (data.length < params.pageSize) {
              commit('setallLoadedPc', true);
            } else {
              commit('setallLoadedPc', false);
            }
            commit('setPcList', data);
          } else {
            commit('setallLoadedPc', true);
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
  [types.MEMBER_SELLER_CLEAR_MOBILELIST]({
    commit
  }, params) {
    commit('clearMobileList');
  },
  [types.MEMBER_SELLER_CLEAR_PCLIST]({
    commit
  }, params) {
    commit('clearPcList');
  },
  [types.MEMBER_SELLER_GETCONF]({
    commit
  }, params) {
    api.seller.GetSafeBuyConfig(params).then(
      res => {
        if (res.data.success) {
          commit('setSafeBuyConfig', res.data.safeBuyConfig);
        }
      },
      err => {
        console.log(err)
      }
    )
  },
  [types.MEMBER_SELLER_GOODS_DETAIL]({
    commit
  }, params) {
    api.seller.selectgoodsdetail(params).then(
      res => {
        if (res.data.success) {
          commit('setGoodsDetail', res.data.goodsEO);
        }
      },
      err => {
        console.log(err)

      }
    )
  },
  [types.MEMBER_SELLER_GOODS_MOBILE_PUBLICSTATE]({
    commit
  }, item) {
    commit('setPublicState', item);
  },
  [types.MEMBER_SELLER_GOODS_PC_PUBLICSTATE]({
    commit
  }, item) {
    commit('setPublicStatePc', item);
  },
  [types.MEMBER_SELLER_GOODS_UPDATE_STATUS]({
    commit
  }, item) {
    commit('setUpdate', item);
  }

}


//selectgoodsdetail
export default {
  state,
  mutations,
  actions
}