/**
 * Created by 严俊东 on 2017/3/20.
 */

import Vue from 'vue'
import {getBuyerStoreOrderList} from './getBuyerStoreOrderList'
import {getBuyerPcOrderList} from './getBuyerPcOrderList'
import {getStoreDetail} from './getStoreDetail'
import {getPcDetail} from './getPcDetail'
export default {
  vm: new Vue(),
  getBuyerStoreOrderList,
  getBuyerPcOrderList,
  getStoreDetail,
  getPcDetail
}