import * as types from './type.js'
import * as acctypes from '../account/type.js'
import EquipmentApi from './api'

export default {
  state:{
    creatOrderConfig:{},
    historyRole:[],
    addreciver:false,
    searchHistory:[],
    safebuyConfig: {}
  },
  mutations: {
    [types.MUTORDERCONFIG] (state, obj) {
      state.creatOrderConfig = obj
    },
    [types.MUTHISTORYROLE] (state, list) {
      state.historyRole = list
    },
    [types.MUADDRECIVER] (state, sta) {
      state.addreciver = sta
    },
    [types.MUTSEARCHHISTORY] (state, list) {
      state.searchHistory = list
    },
    [types.MUTSAFEBUYCONFIG](state, obj) {
      state.safebuyConfig = obj
    }
  },
  actions: {
    //获取安心买
    [types.GETSAFEBUYCONFIG]({commit}, params) {
      commit(types.MUTSAFEBUYCONFIG, {})
      return new Promise((resolve, reject) => {
        EquipmentApi.GetSafeBuyConfig(params).then(
          res => {
            console.log(res);
            if (res.body.success&&res.body.safeBuyConfig) {
              commit(types.MUTSAFEBUYCONFIG, res.body.safeBuyConfig)
            }
            resolve()
          },
          err => {
            console.log(err);
            reject()
          }
        )
      })
    },
    //获取搜索记录
    [types.QUERYUSERSEARCHHISTORY]({commit}, params) {
      commit(types.MUTSEARCHHISTORY, [])
      return new Promise((resolve, reject) => {
        EquipmentApi.selectHistorySearchList(params).then(
          res => {
            if (res.body.success) {
              commit(types.MUTSEARCHHISTORY, res.body.result)
            } else {
              // if (res.body.responseStatus.code == '11') {
              //   commit(acctypes.ERRMSG, {message:res.body.responseStatus.message, returnUrl:'login'})
              //   return
              // }
            }
            resolve()
          },
          err => {
            console.log(err);
            reject()
          }
        )
      })
    },

    [types.ACTORDERCONFIG] ({commit}, params) {
      commit(types.MUTORDERCONFIG, {})
      return new Promise((resolve, reject) => {
        EquipmentApi[params.apiname]({BizOfferId:params.BizOfferId}).then(
          res => {
            if (res.body.success) {
              if (JSON.parse(res.body.result).BizResult.ErrorMessage) {
                commit(acctypes.ERRMSG, {message:JSON.parse(res.body.result).BizResult.ErrorMessage, returnUrl:'back'})
              } else {
                commit(types.MUTORDERCONFIG, JSON.parse(res.body.result).BizResult)
              }
            } else {
              if (res.body.responseStatus.code == '11') {
                commit(acctypes.ERRMSG, {message:res.body.responseStatus.message, returnUrl:'login'})
                return
              }
              commit(acctypes.ERRMSG, res.body.responseStatus.message)
            }
            resolve()
          },
          err => {
            console.log(err);
            reject()
          }
        )
      })
    },
    [types.ACTHISTORYROLE] ({commit}, params) {
      commit(types.MUTHISTORYROLE, [])
      return new Promise((resolve, reject) => {
        EquipmentApi.selectHistoryRole(params).then(
          res => {
            console.log(res);
            if (res.body.success) {
              commit(types.MUTHISTORYROLE, res.body.data)
            } else {
              if (res.body.responseStatus.code == '11') {
                commit(acctypes.ERRMSG, {message:res.body.responseStatus.message, returnUrl:'login'})
                return
              }
              commit(acctypes.ERRMSG, res.body.responseStatus.message)
            }
            resolve()
          },
          err => {
            console.log(err);
            reject()
          }
        )
      })
    },
    [types.ACTADDRECIVER] ({commit}, params) {
      commit(types.MUADDRECIVER, false)
      return new Promise((resolve, reject) => {
        EquipmentApi.addHistoryRole(params).then(
          res => {
            console.log(res);
            if (res.body.success) {
              commit(types.MUADDRECIVER, true)
            }
            resolve()
          },
          err => {
            console.log(err);
            reject()
          }
        )
      })
    }

  },
  getters: {

  }
}
