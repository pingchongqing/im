/**
 * Created by yanjd on 2017/8/1.
 */
import { typeList } from '../type'
let api = {}

/**
 *  王者荣耀活动页 主页5项
 * @param state
 * @param commit
 * @param params
 * @returns {Promise} 无
 * @constructor
 */
api.MG_GET_KING_HOME = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    rootState.axios.get(rootState.CONSTANTS.APISpecial + 'topicClass/getTopicClassList', {params}).then(res => {
      res = res.data
      resolve(res.topicClassVOList || [])
    }, () => {
      console.error('王者荣耀活动页请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 王者荣耀活动页 主页皮肤
 * @param state
 * @param commit
 * @param params
 * @returns {Promise} 无
 * @constructor
 */
api.MG_GET_KING_SKIN_HOME = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    rootState.axios.get(rootState.CONSTANTS.APISpecial + 'skin/getSkinTypeList?limit=6', {}).then(res => {
      res = res.data
      resolve(res.skinEOList || [])
    }, () => {
      console.error('王者荣耀活动页请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 王者荣耀活动页皮肤专题
 * @param state
 * @param commit
 * @param params
 * @returns {Promise}
 * @constructor
 */
api.MG_GET_KING_SKIN = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    rootState.axios.get(rootState.CONSTANTS.APISpecial + 'skin/getSkinList', {}).then(res => {
      res = res.data
      resolve(res.skinEOList || [])
    }, () => {
      console.error('王者荣耀活动页请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

export default {
  ...api
}
