import * as types from './type.js'
import * as accounttypes from '../account/type.js'
import { BuyerCenterApi } from '../../../api'
import * as _ from 'lodash'
import Vue from 'vue';
const vm = new Vue()
export default {
  state: {
    errMsg: {},
    warnMsg: {},
    pageIndex: 1,
    pageSize: 16,
    payStatus: 1,
    loading: false,
    isOrderLoadAll1: false,
    isOrderLoadAll2: false,
    isOrderLoadAll3: false,
    isOrderLoadAll4: false,
    orderDetail: {},
    orderMob1:[],
    orderMob2:[],
    orderMob3:[],
    orderMob4:[],
    shouyouOrderList1:[],
    shouyouOrderList2:[],
    shouyouOrderList3:[],
    shouyouOrderList4:[],
    PcOrderList4: [],
    PcOrderList3:[],
    PcOrderList2:[],
    PcOrderList1:[],
    accountInfo:{},
    serviceData:{},
    buyerCenterCount:{
      buyerMobCount: {},
      buyerPcCount: {},
      buyerShouyouCount: {},
      buyerMallCount: {}
    },
    payUrl: '',
    maypayUrl: ''
  },
  mutations: {
    [types.ERRMSG] (state, msg) {
      let msgObj = {}
      if (typeof(msg) === 'string') {
        msgObj.message = msg
      } else if (msg instanceof Object) {
        msgObj = msg
      }
      state.errMsg = msgObj
    },

    [types.WARNMSG] (state, msg) {
      state.warnMsg = msg
    },
    [types.PAGEINDEX] (state, obj) {
      state['pageIndex'] = obj
    },
    [types.SHOUYOUORDERLIST] (state, obj) {
      if (obj.list.length > 0) {
        obj.list.forEach(elem => {
          state['shouyouOrderList'+obj.listname].push(elem)
        })
      }
    },

    [types.PAYSTATUS] (state, sta) {
      state.payStatus = sta
    },

    [types.MAINSHOUYOUDETAIL] (state, detail) {
      state.orderDetail = detail
    },

    [types.ORDERDATA] (state, obj) {
      if (obj.list.length > 0) {
        obj.list.forEach(elem => {
          state['orderMob'+obj.listname].push(elem)
        })
      }
    },

    [types.MAINGOODSORDERLIST] (state, obj) {
      if (obj.list.length > 0) {
        obj.list.forEach(elem => {
          state['PcOrderList'+obj.listname].push(elem)
        })
      }
    },

    [types.LOADING] (state, sta) {
      state.loading = sta
    },

    [types.ISORDERLOADALL1] (state, sta) {
      state.isOrderLoadAll1 = sta
    },

    [types.ISORDERLOADALL2] (state, sta) {
      state.isOrderLoadAll2 = sta
    },

    [types.ISORDERLOADALL3] (state, sta) {
      state.isOrderLoadAll3 = sta
    },

    [types.ISORDERLOADALL4] (state, sta) {
      state.isOrderLoadAll4 = sta
    },

    [types.CLIST] (state, obj) {
      switch (obj.orderType) {
        case 'mob':
          state['orderMob'+obj.status] = []
          break;
        case 'pc':
          state['PcOrderList'+obj.status] = []
          break;
        case 'shouyou':
          state['shouyouOrderList'+obj.status] = []
          break;
        default:

      }
    },

    [types.ACCOUNTINFO] (state, info) {
      state.accountInfo = info
    },

    [types.SERVICEDATA] (state, data) {
      state.serviceData = data
    },

    [types.CENTERCOUNT] (state, params) {
      state.buyerCenterCount[params.name] = params.data
    },

    [types.PAYURL] (state, url) {
      state.payUrl = url
    },

    [types.MAYPAYURL] (state, url) {
      state.maypayUrl = url
    }


  },
  actions: {
    [types.MAYPAY] ({commit}, params) {
      commit(types.MAYPAYURL, '')
      return new Promise((resolve, reject) => {
        BuyerCenterApi.maypay(params).then(
          res => {
            if (res.body.success) {
              commit(types.MAYPAYURL, res.body.url)
            } else {
              commit(types.ERRMSG, res.body.responseStatus.message)
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
    [types.CANCELORDER] ({commit}, params) {
      return new Promise((resolve, reject) => {
        BuyerCenterApi.cancelOrder(params).then(
          res => {
            if (res.body.responseStatus.code == "00") {
              commit(types.ERRMSG, {message: '订单超时,已被系统取消', returnUrl: 'self'})
            } else {
              commit(types.ERRMSG, {message: res.body.responseStatus.message, returnUrl: '/vue/buyerCenter/buyerMob/1'})
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
    [types.MOBILEORDERPAY] ({commit}, params) {
      commit(types.PAYURL, '')
      return new Promise((resolve, reject) => {
        BuyerCenterApi.mobileOrderPay(params).then(
          res => {
            if (res.body.responseStatus.code == "00") {
              let rst = JSON.parse(res.body.result)
              commit(types.PAYURL, rst.BizResult.Data.payUrl)
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
    [types.APPEALRECEIVE] ({commit}, params) {
      BuyerCenterApi.appealReceive(params).then(
        res => {
          if (res.body.responseStatus.code == "00") {
            commit(types.WARNMSG, {message:'申诉成功'})
          } else {
            commit(types.ERRMSG, res.body.responseStatus.message)
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    [types.GETBUYERMOBCOUNT] ({commit}) {
      return new Promise((resolve, reject) => {
        BuyerCenterApi.buyerMobCount().then(
          res => {
            if (res.body.responseStatus.code == '00') {
              commit(types.CENTERCOUNT, {name:'buyerMobCount', data:res.body})
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
    [types.GETBUYERPCCOUNT] ({commit}) {
      return new Promise((resolve, reject) => {
        BuyerCenterApi.buyerPcCount().then(
          res => {
            if (res.body.responseStatus.code == '00') {
              commit(types.CENTERCOUNT, {name:'buyerPcCount', data:res.body.result})
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
    [types.GETBUYERSHOUYOUCOUNT] ({commit}) {
      return new Promise((resolve, reject) => {
        BuyerCenterApi.buyerShouyouCount().then(
          res => {
            if (res.body.responseStatus.code == '00') {
              commit(types.CENTERCOUNT, {name:'buyerShouyouCount', data:res.body.result})
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
    [types.GETBUYERMALLCOUNT] ({commit}) {
      return new Promise((resolve, reject) => {
        BuyerCenterApi.buyerMallCount().then(
          res => {
            if (res.body.responseStatus.code == '00') {
              commit(types.CENTERCOUNT, {name:'buyerMallCount', data:res.body})
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
    [types.OPENSERVICEQQ] ({commit}, params) {
      commit(types.SERVICEDATA, {})
      return new Promise((resolve, reject) => {
        BuyerCenterApi.openServiceQQ(params).then(
          res => {
              if (res.body.responseStatus.code === '00') {
                commit(types.SERVICEDATA, res.body)
              }
              resolve()
          },
          err => {
            reject()
            console.log(err);
          }
        )
      })

    },
    [types.GETPCACCOUNTINFO] ({commit}, params) {
      commit(types.ACCOUNTINFO, {})
      BuyerCenterApi.getPcAccountInfo(params).then(
        res => {
          if (res.body.success) {
            commit(types.ACCOUNTINFO, res.body.data)
          } else {
            commit(types.ACCOUNTINFO, {})
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    [types.MAINGOODSORDERDETAILED] ({commit}, params) {
      commit(types.MAINSHOUYOUDETAIL, {})
      return new Promise((resolve, reject) => {
        BuyerCenterApi.mainGoodsOrderDetailed(params).then(
          res => {
            if (res.body.responseStatus.code === '00' && res.body.result) {
              let rst = JSON.parse(res.body.result)
              if (rst.BizResult) {
                commit(types.MAINSHOUYOUDETAIL, rst.BizResult)
              }
            }
            resolve()
          },
          err => {
            reject()
            console.log(err);
          }
        )
      })
    },
    [types.GETMOBACCOUNTINFO] ({commit}, params) {
      commit(types.ACCOUNTINFO, {})
      BuyerCenterApi.getMobAccountInfo(params).then(
        res => {
          if (res.body.orderList&&res.body.responseStatus.code == "00") {
            commit(types.ACCOUNTINFO, res.body.orderList)
          } else {
            commit(types.ACCOUNTINFO, {})
            if (res.body.responseStatus.code == '99988') {
              commit(types.ERRMSG, {message: '订单状态异常，提取账号资料失败'})
            } else {
              commit(types.ERRMSG, {message: res.body.responseStatus.message})
            }
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    [types.QUERYORDERDETAIL] ({commit}, params) {
      commit(types.MAINSHOUYOUDETAIL, {})
      BuyerCenterApi.queryOrderDetail(params).then(
        res => {
          if (res.body.orderEO&&res.body.responseStatus.code == "00") {
            commit(types.ERRMSG, {message: `账号：${res.body.orderEO.buyerRoleAccount}</br>
              密码：${res.body.orderEO.buyerRolePwd}`})
          } else {
            commit(types.ERRMSG, res.body.responseStatus.message)
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    //清除错误提示
    [types.CLEAR_ERR] ({commit}) {
      commit(types.ERRMSG, null)
    },

    //清除警告提示
    [types.CLEAR_WARN] ({commit}) {
      commit(types.WARNMSG, null)
    },
    [types.APPEALSURE] ({commit}, params) {
      BuyerCenterApi.appealSure(params).then(
        res => {
          if (res.body.responseStatus.code == "00") {
            commit(types.WARNMSG, {message:'申诉成功'})
            setTimeout("location.reload()",2500)
          } else {
            commit(types.ERRMSG, res.body.responseStatus.message)
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    [types.RECHARGEREFUND] ({commit}, params) {
      BuyerCenterApi.rechargeRefund(params).then(
        res => {
          if (res.body.responseStatus.code == "00") {
            commit(types.WARNMSG, {message:'申请退款成功'})
             setTimeout("location.reload()",2500)
          } else {
            commit(types.ERRMSG, res.body.responseStatus.message)
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    [types.GETMOBORDERDETAIL] ({commit}, params) {
      commit(types.MAINSHOUYOUDETAIL, {})
      return new Promise( (resolve, reject) => {
        BuyerCenterApi.getOrderDetail(params.orderId).then(
          res => {
            if (res.body.result&&res.body.responseStatus.code == '00') {
              commit(types.MAINSHOUYOUDETAIL, res.body)
            } else {
              commit(types.ERRMSG, res.body.responseStatus.message)
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
    [types.GETACCOUNTINFO] ({commit}, params) {
      commit(types.ACCOUNTINFO, {})
      return new Promise ((resolve, reject) => {
        BuyerCenterApi.mainShouYouOrderGetGameAccountInfo(params).then(
          res => {
            if (res.body.result&&res.body.success && res.body.responseStatus.code == '00') {
              let rst = JSON.parse(res.body.result)
              if (Object.keys(rst.BizResult.Data).length > 0) {
                commit(types.ACCOUNTINFO, rst.BizResult.Data)
              } else {
                commit(types.ACCOUNTINFO, {})
              }
            }
            resolve()
          },
          err => {
            reject()
            console.log(err);
          }
        )
      })
    },
    [types.CLEARLIST] ({commit}, obj) {
      commit(types.CLIST, obj)
    },
    [types.SETLOADING] ({commit}, sta) {
      commit(types.LOADING, sta)
    },
    [types.SETPAGEINDEX] ({commit}, obj) {
      commit(types.PAGEINDEX, obj)
    },
    [types.CHANGEPAYSTATUS] ({commit}, sta) {
      commit(types.PAYSTATUS, sta)
    },
    [types.GETMERGEORDERDATA] ({commit}, params) {
      return new Promise((resolve, reject) => {
        commit(types['ISORDERLOADALL'+params.status], true)
        BuyerCenterApi.getMergeOrderData(params).then(
          res => {
            if (res.ok&&res.body.data) {
              if (res.body.data.length < params.pageSize/2) {
                commit(types.ORDERDATA, {
                  listname:params.status,
                  list:res.body.data
                })
                commit(types['ISORDERLOADALL'+params.status], true)
              } else {
                commit(types.ORDERDATA, {
                  listname:params.status,
                  list:res.body.data
                })
                commit(types['ISORDERLOADALL'+params.status], false)
              }
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
    [types.GETORDERDATA] ({commit}, params) {
      return new Promise((resolve, reject) => {
        BuyerCenterApi.getOrderData(params).then(
          res => {
            if (res.ok&&res.body.responseStatus.code=='00'&&res.body.data) {
              commit(types.ORDERDATA, {
                listname:params.status,
                list:res.body.data
              })
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
    [types.MAINSHOUYOUORDERLIST] ({commit}, params) {
      // var status = false;
      return new Promise((resolve, reject) => {
        commit(types['ISORDERLOADALL'+params.payStatus], true)
        // BuyerCenterApi.mainShouYouOrderList(params).then(
        //   res => {
        //     if (res.ok&&res.body.success && res.body.responseStatus.code == '00') {
        //       let result = JSON.parse(res.body.result)
        //       if (result.BizResult.Data.Datas.length < params.pageSize) {
        //         commit(types['ISORDERLOADALL'+params.payStatus], true&&status)
	     //         status = true
        //       } else {
        //         commit(types['ISORDERLOADALL'+params.payStatus], false)
        //       }
        //       commit(types.SHOUYOUORDERLIST, {
        //         listname:params.payStatus,
        //         list:result.BizResult.Data.Datas
        //       })
        //     } else {
        //       console.log(res)
        //     }
        //     resolve()
        //   },
        //   err => {
        //     console.log(err)
        //     reject()
        //   }
        // )
        BuyerCenterApi.mainSYFastOrderList(params).then(
          res => {
	          if (res.ok&&res.body.success && res.body.responseStatus.code == '00') {
		          let result = res.body.data
		          result.Datas.forEach(function (data) {
			          data.IsFast = true
		          })
		          if (result.Datas.length < params.pageSize) {
			          commit(types['ISORDERLOADALL'+params.payStatus],  true)
			          status = true;
		          } else {
			          commit(types['ISORDERLOADALL'+params.payStatus], false)
		          }
		          commit(types.SHOUYOUORDERLIST, {
			          listname:params.payStatus,
			          list:result.Datas
		          })
	          } else {
		          console.log(res)
	          }
              resolve()
          },
          err => {
            console.log(err)
            reject()
          }
        )
      })
    },
    [types.GETMAINGOODSORDERLIST] ({commit}, params) {
      let pdname;
      return new Promise((resolve, reject) => {
        switch (params.jsonStr.Oc) {
          case 1:
            params.jsonStr.Oc = '1'
            pdname = 1
            break;
          case 2:
            params.jsonStr.Oc = '2|3'
            pdname = 2
            break;
          case 3:
            params.jsonStr.Oc = '4'
            pdname = 3
            break;
          case 4:
            params.jsonStr.Oc = '5'
            pdname = 4
            break;
          default:

        }
        commit(types['ISORDERLOADALL'+pdname], true)
        commit(types.MAINGOODSORDERLIST, {listname:pdname,list:[]})
        BuyerCenterApi.mainGoodsOrderList(params).then(
          res => {
            if (res.ok&&res.body.success && res.body.responseStatus.code == '00') {
              let result = JSON.parse(res.body.result)
              if (result.BizResult) {
                if (result.BizResult.OrderList) {
                  if (result.BizResult.OrderList.length < params.jsonStr.PS) {
                    commit(types['ISORDERLOADALL'+pdname], true)
                  } else {
                    commit(types['ISORDERLOADALL'+pdname], false)
                  }
                  commit(types.MAINGOODSORDERLIST, {listname:pdname,list:result.BizResult.OrderList})
                }
              }
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
    [types.GETMAINSHOUYOUDETAIL] ({commit}, params) {
      commit(types.MAINSHOUYOUDETAIL, {})
      return new Promise((resolve, reject) => {
        BuyerCenterApi.mainShouYouOrderDetailed(params).then(
          res => {
            if (res.ok&&res.body.success && res.body.responseStatus.code == '00') {
              let result = JSON.parse(res.body.result)
              commit(types.MAINSHOUYOUDETAIL, result.BizResult.Data)
              commit(accounttypes.A_PCIMAGELIST, result.BizResult.Data.Images)
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
    [types.GETMAINSHOUYOUFAST] ({commit}, params) {
      commit(types.MAINSHOUYOUDETAIL, {})
      return new Promise((resolve, reject) => {
        BuyerCenterApi.mainShouYouOrderFast(params).then(
          res => {
            if (res.ok&&res.body.success && res.body.responseStatus.code == '00') {
              let result = res.body.data
                if(result.SyBizOfferType==7){
	                result.IsQuickPublishOrder = true
                }
              commit(types.MAINSHOUYOUDETAIL, result)
              commit(accounttypes.A_PCIMAGELIST, result.Images)
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
    [types.GETPCIMGINFO] ({commit}, params) {
      return new Promise((resolve, reject) => {
        BuyerCenterApi.getAccountOrderImgInfo(params).then(
          res => {
            if (res.body.success) {
              let result = JSON.parse(res.body.result)
              commit(accounttypes.A_PCIMAGELIST, result.BizResult.OrderImages)
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
