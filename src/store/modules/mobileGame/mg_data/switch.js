/**
 * Created by yanjd on 2017/8/7.
 */
/**
 * 活动专题开关获取
 * @param state
 * @param commit
 * @param params = {topicTitle: 活动标题}
 * @returns {Promise}
 * @constructor
 */
let api = {}
api.MG_GET_KING_SWITCH = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    rootState.axios.get(rootState.CONSTANTS.APISpecial + 'specialTopic/getSpecialTopic', {params}).then(res => {
      res = res.data
      resolve(res.specialTopicEOList || [])
    }, () => {
      console.error('手游活动专题接口请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
export default {
  ...api
}