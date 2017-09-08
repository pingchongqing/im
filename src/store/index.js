
/*
* @Author: fredlee
* @Date:   2017-04-19 13:09:20
* @Last Modified by:   txm
* @Last Modified time: 2017-08-16 17:51:38
*/

import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import * as getters from './getters'
import goodsList from './modules/goodsList'
import choice from './modules/choice'
import account from './modules/account'
import seller from './modules/seller'
import memberSeller from './modules/memberSeller'
import buyerCenter from './modules/buyerCenter'
import orderMange from './modules/orderMange'
import common from './modules/coomon'
import coins from './modules/coins'
import equipment from './modules/equipment'
import VueResource from 'vue-resource'
import {CONSTANTS} from '../assets/js/config/constants.js' // ��ȡ������Ϣ
import history from './modules/history'
import mobileGame from './modules/mobileGame'
Vue.use(Vuex)
Vue.use(VueResource);
const vm = new Vue()
export default  new Vuex.Store({
  state: {
    CONSTANTS: JSON.parse(JSON.stringify(CONSTANTS)), // api ������ǰ׺
    axios: vm.$http, // ���� ������������
  },
  actions,
  getters,
  modules:{
	goodsList,
    mobileGame,
  	choice,
    account,
  	seller,
  	memberSeller,
    buyerCenter,
    orderMange,
    common,
    coins,
    history,
    equipment
  },
  strict: process.env.NODE_ENV !== 'production',
})



//  new Vuex.Store({
//   state: state,
//   getters: getters,
//   mutations: mutations,
//   actions: actions
// });
