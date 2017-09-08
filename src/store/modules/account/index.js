import * as types from './type.js'
import { AccountApi, ChoiceApi } from '../../../api'
import * as _ from 'lodash'
export default {
  state: {
    goodsEO: {},
    imageList: [],
    pList: [],
    errMsg: {},
    goodsInfo: {},
    warnMsg: {}
  },
  mutations: {
    [types.A_GOODS] (state, EO) {
      state.goodsEO = EO
    },

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

    [types.A_GOODSINFO] (state, info) {
      state.goodsInfo = info
    },

    [types.A_PLIST] (state, list) {
      state.pList = list
    },

    [types.A_IMAGELIST] (state, list) {
      state.imageList = list
    },

    [types.A_PCIMAGELIST] (state, list) {
      let lst = []
      if (list) {
        if (list.length>0) {
          list.forEach(elem => {
            lst.push({
              bigPicUrl: elem.OriginalUrl
            })
          })
          state.imageList = lst
        }
      }
    },

    [types.A_PCPROPERTY] (state, list) {
      let lst = []
      if (list) {
        if (Array.isArray(list)) {
          list.forEach(elem => {
            lst.push({
              attributeName: elem.Key,
              attributeVal: elem.Value
            })
          })
        } else if (typeof(list) === 'string') {
          let alist = JSON.parse(list)
          if (Array.isArray(alist)) {
            for ( let key in alist[0]) {
              lst.push({
                attributeName: key,
                attributeVal: alist[0][key]
              })
            }
          } else if(Object.keys(alist).length>0) {
            for ( let key in alist) {
              lst.push({
                attributeName: key,
                attributeVal: alist[key]
              })
            }
          }
        }
        state.pList = lst
      }
    }


  },
  actions: {
    [types.A_GETGOODS] ({commit}, params) {
      return new Promise((resolve, reject) => {
        if (params.goodsId) {
          AccountApi.selectGoodsDetail(params).then(
            res => {
              if (res.body.goodsEO && res.body.success) {
                commit(types.A_GOODS, res.body.goodsEO)
                commit(types.A_PLIST, res.body.goodsPropertyList)
                commit(types.A_IMAGELIST, res.body.picList)
                resolve()
              } else {
                resolve()
              }
            },
            err => {
              console.log(err);
              reject()
            }
          )
        } else if(params.BizOfferId) {
          AccountApi.selectPcGoodsDetail(params).then(
            res => {
              if(res.body.responseStatus.code == '00') {
                let rs = JSON.parse(res.body.result).BizResult
                //console.log(rs);
                if (rs.ErrorMessage) {
                  resolve()
                } else {
                  commit(types.A_GOODS, rs)
                  commit(types.A_PCPROPERTY, rs.PropertyValues)
                  commit(types.A_PCIMAGELIST, rs.TCImagePaths)
                  resolve()
                }
              }
            },
            err => {
              console.log(err);
              reject()
            }
          )
        } else if (params.PcGoodsId) {
          let np = {goodsId: params.PcGoodsId}
          AccountApi.selectPcMobGoodsDetail(np).then(
            res => {
              if (res.body.goodsEO && res.body.success) {
                commit(types.A_GOODS, res.body.goodsEO)
                commit(types.A_PLIST, res.body.goodsPropertyList)
                commit(types.A_IMAGELIST, res.body.picList)
                resolve()
              } else {
                resolve()
              }
            },
            err => {
              console.log(err);
              reject()
            }
          )
        }
      })
    },

    //清除错误提示
    [types.CLEAR_ERR] ({commit}) {
      commit(types.ERRMSG, null)
    },

    //清除警告提示
    [types.CLEAR_WARN] ({commit}) {
      commit(types.WARNMSG, null)
    },

    [types.A_GETGOODSINFO] ({commit}, goodsid) {
      commit(types.A_GOODSINFO, [])
      return new Promise((resolve, reject) => {
        ChoiceApi.goodsSearchList({
          page: 1,
          pageCount: 10,
          //fetchField: ["browse_count"],
          accurateMap: {"id":[goodsid.toString()]}
        }).then(
          res => {
            if (res.body.success && res.body.result) {
              let goodsResult = JSON.parse(res.body.result)
              //console.log(goodsResult);
              if (goodsResult.viewtotal === 0) {
                //commit(types.ERRMSG, '没有详细信息')
              } else if ( goodsResult.items.length > 0) {
                commit(types.A_GOODSINFO, goodsResult.items[0])
                commit(types.A_PCPROPERTY, goodsResult.items[0].property_values)
              } else {
              //  console.log('done');
              }
              resolve()
            }
            else {
              commit(types.ERRMSG, res.body.responseStatus.message)
              reject()
            }
          },
          err => {
            console.log(err);
            reject()
          }
        )
      })
    },

    [types.A_ADDBROWERNUM] ({commit}, params) {
      return new Promise((resolve, reject) => {
        AccountApi.addBrowseAmount(params).then(
          res => {
            resolve()
          },
          err => {
            console.log(err);
            reject('d')
          }
        )
      })
    },

    [types.A_CLEARGOODSEO] ({commit}) {
      commit(types.A_GOODS, {})
      commit(types.A_IMAGELIST, [])
      commit(types.A_PLIST, [])
    }

  },
  getters: {
    [types.OVERTIME] (state) {
      if (state.goodsEO.createTime) {
        let time = new Date(state.goodsEO.createTime +  60*24*3600*1000)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()
        return year + '-' + month + '-' + date
      } else {
        return null
      }
    },

    [types.PTRLIST] (state) {
      return state.pList.filter(elem => {
        return elem.attributeName != '是否绑定身份证' && elem.attributeName != '是否绑定邮箱' && elem.attributeName != '是否绑定手机号'
      })
    },

    [types.BINDCARD] (state) {
      let bc =  state.pList.filter(elem => {
        return elem.attributeName == '是否绑定身份证'
      })
      if (bc.length > 0) {
        return bc[0].attributeVal
      } else {
        return null
      }
    },

    [types.BINDEMAIL] (state) {
      let bc =  state.pList.filter(elem => {
        return  elem.attributeName == '是否绑定邮箱'
      })
      if (bc.length > 0) {
        return bc[0].attributeVal
      } else {
        return null
      }
    },

    [types.BINDEMOB] (state) {
      let bc = state.pList.filter(elem => {
        return elem.attributeName == '是否绑定手机号'
      })
      if (bc.length > 0) {
        return bc[0].attributeVal
      } else {
        return null
      }
    },

    [types.FIRSTIMAGE] (state) {
      if(state.imageList.length > 0) {
        if (state.imageList[0].bigPicUrl) {
          if (state.imageList[0].bigPicUrl.indexOf('x-oss-process=image')>-1 && state.imageList[0].bigPicUrl.indexOf('img1.5173.com')>-1) {
            return state.imageList[0].bigPicUrl
          } else if (state.imageList[0].bigPicUrl.indexOf('img1.5173.com')>-1) {
            return state.imageList[0].bigPicUrl + '?x-oss-process=image/resize,m_fixed,w_420'
          } else {
            return state.imageList[0].bigPicUrl
          }
        } else if (state.imageList[0].sImgUrl) {
          if (state.imageList[0].sImgUrl.indexOf('x-oss-process=image')>-1 && state.imageList[0].sImgUrl.indexOf('img1.5173.com')>-1) {
            return state.imageList[0].sImgUrl
          } else if (state.imageList[0].sImgUrl.indexOf('img1.5173.com')>-1) {
            return state.imageList[0].sImgUrl + '?x-oss-process=image/resize,m_fixed,w_420'
          } else {
            return state.imageList[0].sImgUrl
          }
        }
      } else {
        return null
      }
    },

    [types.EOSIGNS] (state) {
      if (state.goodsEO.Signs) {
        let arr = []
        state.goodsEO.Signs.forEach(elem => {
          arr.unshift(elem)
        })
        return arr
      } else {
        return []
      }
    },

    [types.DISABLESTATUS] (state) {
      if (state.goodsEO.isOnline && state.goodsEO.auditorStatus===1) {
        return false
      } else if (state.goodsEO.Title) {
        return false
      } else if (parseInt(state.goodsEO.goodsSource) === 1) {
        if (state.goodsEO.mainGoodsStatus == 2) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }

  }
}
