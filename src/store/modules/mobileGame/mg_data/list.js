/**
 * Created by yanjd on 2017/7/10.
 */

import {typeList} from '../type'

const CLIENT_GAME = '1'
const MOBILE_GAME = '2'
let api = {}

function _cutList(list, pageIndex, pageCount) {
  let arr = []
  for (let i = (pageIndex - 1) * pageCount; i < Math.min(pageIndex * pageCount, list.length); i++) {
    arr.push(list[i])
  }
  return arr
}

/*
 * 提供分页参数，但是真正请求时是全部拉取
  * */
/***
 * 获取“我要卖”手游游戏列表
 * @param state
 * @param commit
 * @param rootState
 * @param params = {gameType(游戏类型), pageIndex, pageSize, pyfirst(不传则是返回热度)}
 * @returns {Promise}
 * @constructor
 */
api.MG_GET_GAMES_NEW = function ({state, commit, rootState}, params) {
  const gameType = params.gameType
  const pageIndex = params.pageIndex
  const pageSize = params.pageSize
  params.pageIndex = 1
  params.pageSize = 9999
  if (gameType === MOBILE_GAME) { // 手游
    delete params.gameType
    return new Promise((resolve, reject) => {
      if (!params.pyfirst) {
        //console.log('获取我要卖手游列表-热门：', state._sell_games['hot'])
        if (state._sell_games['hot'] && state._sell_games['hot'].length) {
          setTimeout(resolve(state._sell_games['hot']), 0)
          return
        }
        params.pageSize = 21 // 热门游戏前端限死
        rootState.axios.get(rootState.CONSTANTS.APICategory + 'category/searchsygamelistbyhot', {params}).then(res => {
          resolve(res.data.categoryList || [])
          commit(typeList.setSellGames, {k: 'hot', d: res.data.categoryList || []})
        }, () => {
          //console.error('手游我要卖游戏列表请求错误 (╯‵□′)╯︵┻━┻')
          resolve([])
        })
      } else {
        //console.log('获取我要卖手游列表-首字母' + params.pyfirst + ':', state._sell_games[params.pyfirst])
        if (state._sell_games[params.pyfirst] && state._sell_games[params.pyfirst].length) {
          setTimeout(resolve(_cutList(state._sell_games[params.pyfirst], pageIndex, pageSize)), 0)
          return
        }
        rootState.axios.get(rootState.CONSTANTS.APICategory + 'category/searchallsygamelist', {params}).then(res => {
          resolve(_cutList(res.data.categoryList || [], pageIndex, pageSize))
          commit(typeList.setSellGames, {k: params.pyfirst, d: res.data.categoryList || []})
        }, () => {
          //console.error('手游我要卖游戏列表请求错误 (╯‵□′)╯︵┻━┻')
          resolve([])
        })
      }
    })
  }
  return new Promise((resolve, reject) => {
    const pyfirst = params.pyfirst
    delete params.pyfirst
    //console.log('获取游戏列表：', state._games[params.gameType])
    if (state._games[params.gameType] && state._games[params.gameType].length) {
      setTimeout(() => {
        resolve(_cutList(state._games[params.gameType].filter(gameItem => {
          return !pyfirst ? true : gameItem.pyfirst.toLowerCase() === pyfirst.toLowerCase()
        }), pageIndex, pageSize))
      }, 1)
      return
    }
    rootState.axios.get(rootState.CONSTANTS.APICategory + 'category/searchgamelistbytype', {params}).then(res => {
      let categoryList = res.data.categoryList || []
      resolve(_cutList(categoryList.filter(gameItem => {
        return !pyfirst ? true : gameItem.pyfirst.toLowerCase() === pyfirst.toLowerCase()
      }), pageIndex, pageSize))
      commit(typeList.setGames, {k: params.gameType, d: res.data.categoryList || []})
    }, () => {
      //console.error('手游游戏列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
/***
 * 获取游戏首拼列表
 * @param state
 * @param commit
 * @param rootState
 * @param params = {gameType： 1 | 2} 1端游 2手游
 * @returns {Promise}
 * @constructor
 */
api.MG_GET_GAMES_PY = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    //console.log('获取游戏首拼：', state._game_py[params.gameType])
    if (state._game_py[params.gameType] && state._game_py[params.gameType].length) {
      setTimeout(resolve(state._game_py[params.gameType]), 0)
      return
    }
    rootState.axios.get(rootState.CONSTANTS.APICategory + 'category/getgamepy', {params}).then(res => {
      resolve(res.data.py || [])
      commit(typeList.setGamePy, {k: params.gameType, d: res.data.py || []})
    }, () => {
      //console.error('游戏首拼请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
/**
 * 获取游戏列表
 * @param state
 * @param commit
 * @param fn  # 回调函数
 * @param params
 * {gameType: 1 | 2, pageIndex: 1, pageSize: 9999} 1端游 2是手游
 */
api.MG_GET_GAMES = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    //console.log('获取游戏列表：', state._games[params.gameType])
    if (state._games[params.gameType] && state._games[params.gameType].length) {
      setTimeout(resolve(state._games[params.gameType]), 0)
      return
    }
    rootState.axios.get(rootState.CONSTANTS.APICategory + 'category/searchgamelistbytype', {params}).then(res => {
      resolve(res.data.categoryList || [])
      commit(typeList.setGames, {k: params.gameType, d: res.data.categoryList || []})
    }, () => {
      //console.error('手游游戏列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 获取游戏商品类型
 * @param state
 * @param commit
 * @param params = {gameId}
 * @returns {Promise}
 */
api.getGoodsTypes = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    let id = params.gameId
    if (state._goods_types.list.length && state._goods_types.id === id) {
      //console.log('获取商品列表：', state._goods_types.list.length)
      setTimeout(resolve(state._goods_types.list), 0)
      return
    }
    rootState.axios.get(rootState.CONSTANTS.APICategory + 'category/searchgoodstypebygameid', {params}).then(res => {
      res = {list: res.data.goodsTypeList || [], id}
      resolve(res.list)
      commit(typeList.setGoodsTypes, res)
    }, () => {
      //console.error('手游商品列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 获取游戏平台
 * @param state
 * @param commit
 * @param params {gameId}
 * @returns {Promise}
 */
api.getGamePlants = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    let id = params.gameId
    if (state._game_platform.list.length && state._game_platform.id === id) {
      //console.log('获取平台列表：', state._game_platform.list.length)
      setTimeout(resolve(state._game_platform.list), 0)
      return
    }
    rootState.axios.get(rootState.CONSTANTS.APICategory + '/mainMobileGame/getplatforminfobygameid', {params}).then(res => {
      res = {list: res.data.data || [], id}
      resolve(res.list)
      commit(typeList.setGamePlatform, res)
    }, () => {
      //console.error('平台列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 获取游戏客户端
 * @param state
 * @param commit
 * @param params = {gameId, platformId}
 * @returns {Promise}
 */
api.getGameClients = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    let id = JSON.stringify(params)
    if (state._game_client.list.length && state._game_client.id === id) {
      //console.log('缓存客户端列表', state._game_client.list.length)
      setTimeout(resolve(state._game_client.list), 0)
      return
    }
    rootState.axios.get(rootState.CONSTANTS.APICategory + '/mainMobileGame/getgameareasbygameandplatform', {params}).then(res => {
      res = {list: res.data.data || [], id}
      resolve(res.list)
      commit(typeList.setGameClient, res)
    }, () => {
      //console.error('客户端列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}

/**
 * 获取服务器列表
 * @param state
 * @param commit
 * @param params = {aid}
 * @returns {Promise}
 */
api.getGameServers = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    let id = JSON.stringify(params)
    if (state._game_server.list.length && state._game_server.id === id) {
      //console.log('缓存服务器列表', state._game_server.list.length)
      setTimeout(resolve(state._game_server.list), 0)
      return
    }
    rootState.axios.get(rootState.CONSTANTS.APICategory + '/mainMobileGame/getgameServer', {params}).then(res => {
      res = {list: res.data.data || [], id}
      resolve(res.list)
      commit(typeList.setGameServer, res)
    }, () => {
      //console.error('服务器列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
/**
 *  获取快销号列表
 * @param state
 * @param commit
 * @param params {...}
 * @returns {Promise}
 */
api.getFastsList = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    rootState.axios.get(rootState.CONSTANTS.APIMainGoods + 'mainFastSalesAccount/getGameStartAccountConfig', {params}).then(({data}) => {
      resolve(data.data || [])
    }, () => {
      //console.log('快销号列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
/**
 *  获取快销号信息
 * @param state
 * @param commit
 * @param params {...}
 * @returns {Promise}
 */
api.getFastsInfo = function ({state, commit, rootState}, params) {
  return new Promise((resolve, reject) => {
    rootState.axios.get(rootState.CONSTANTS.APIMainGoods + 'mainFastSalesAccount/getBizofferGameStartAccount', {params}).then(({data}) => {
      resolve(data.data || {})
    }, () => {
      //console.log('快销号列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
/**
 *  创建快销号单子
 * @param state
 * @param commit
 * @param params {...}
 * @returns {Promise}
 */
api.createFasts = function ({state, commit, rootState}, params) {

  return new Promise((resolve, reject) => {
    rootState.axios.post(rootState.CONSTANTS.APIMainGoods + 'mainFastSalesAccount/createOrder', params).then(({data}) => {
      resolve(data || {})
    }, () => {
      //console.log('快销号列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
/**
 *  获取商品列表
 * @param state
 * @param commit
 * @param params {...}
 * @returns {Promise}
 */
api.getGoodsList = function ({state, commit, rootState}, params) {
  //神策开始
  var isLog,map,keyWord,between,shoppingType;
  if(params.goodsType==1){
    shoppingType = "装备";
  }else if(params.goodsType==2){
    shoppingType = "账号";
  }else if(params.goodsType==3){
    shoppingType = "游戏币";
  }else{
    shoppingType = "其他";
  };
  isLog = rootState.CONSTANTS.isLogin;
  map = JSON.stringify(params.accurateMap);
  keyWord = JSON.stringify(params.keyWordList);
  between = JSON.stringify(params.betweenMap);
  sa.track("goodsList",{
    platfromType:"H5",
    belongGame:params.gameName,
    gameType:params.gameName,
    accurateMap:map,
    keyWordList:keyWord,
    betweenMap:between,
    goodsType:shoppingType,
    isLogin:isLog
  });
  //神策结束
  return new Promise((resolve, reject) => {
    rootState.axios.post(rootState.CONSTANTS.APISearch + '/goodsSearch/goodsSearchList', params).then(({data}) => {
      data = JSON.parse(data.result || '{}')
      resolve(data.items || [])
    }, () => {
      //console.error('商品列表请求错误 (╯‵□′)╯︵┻━┻')
      resolve([])
    })
  })
}
api.test = function () {
  return new Promise((resolve, reject) => {
    //console.log('test in ')
    setTimeout(function () {
      resolve(1)
      //console.log('test out ')
    }, 1000)
  })
}

export default {
  ...api
}
