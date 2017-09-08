import Vue from 'vue';
const vm = new Vue()

export default {
  GetSafeBuyConfig: function GetSafeBuyConfig(params) {
    return vm.$http.post(vm.$CONSTANTS.APISafebuy + 'SafeBuyConfigService/GetSafeBuyConfig' ,params)
  },
  addHistory: function addHistory(params) {
    return vm.$http.post(vm.$CONSTANTS.APIGoods + 'historyEquipSearchService/addHistory' ,params)
  },
  selectHistorySearchList: function selectHistorySearchList(params) {
    return vm.$http.get(vm.$CONSTANTS.APIGoods + 'historyEquipSearchService/selectHistorySearchList' , {
      params:params
    })
  },
  addHistoryRole: function addHistoryRole(params) {
    return vm.$http.get(vm.$CONSTANTS.APIGoods + 'purchaseData/addHistoryRole' , {
      params:params
    })
  },
  getCreateOrderConfig: function getCreateOrderConfig (params) {
    return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainGoodsOrderConfig/getCreateOrderConfig' , {
      params:params
    })
  },
  getJSOrderConfig: function getJSOrderConfig (params) {
    return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainGoodsOrderConfig/getJSOrderConfig' , {
      params:params
    })
  },

//   参数名	必须	类型	说明
// gameName	是	String	游戏名
// regionName	是	String	游戏区
// serverName	是	String	游戏服
// roleName	是	String	角色名
// raceName	否	String	阵营
// goodsType	是	String	商品类型
  selectHistoryRole: function selectHistoryRole(params) {
    return vm.$http.get(vm.$CONSTANTS.APIGoods + 'purchaseData/selectHistoryRole' , {
      params:params
    })
  }

}
