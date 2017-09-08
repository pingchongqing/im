import {typeFilter} from '../type'

let api = {}

/**
 * 精准筛选接口
 * @param state
 * @param commit
 * @param rootState
 * @param params
 * @returns {Promise} {goodsTypeId: 游戏类型 2手游， gameName: 游戏名}
 */
api.getFilterInner = function ({state, commit, rootState}, params) {
  // params = {goodsTypeId: 2, gameName: '地下城与勇士'}
  return new Promise((resolve, reject) => {
    rootState.axios.get(rootState.CONSTANTS.APICategory + 'gamePropertyRelation/queryFilterProperty', {params}).then(({data}) => {
      resolve(data.gamePropertyRelationAllEOList || [])
    }, () => {
      console.error('默认筛选请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 快捷筛选接口
 * @param state
 * @param commit
 * @param rootState
 * @param params
 * @returns {Promise}
 */
api.getFilterOuter = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    rootState.axios.get(rootState.CONSTANTS.APICategory + 'gamePropertyRelation/queryRapidFilterProperty', {params}).then(({data}) => {
      resolve(data.gamePropertyQuickVOList || [])
    }, () => {
      console.error('快捷筛选请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

export default {
  ...api
}
