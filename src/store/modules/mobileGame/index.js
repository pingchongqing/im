import { typeList } from './type'
import mgData from './mg_data'

export default  {
  state: {
    saveListData: null, // 存储手游列表相关数据
    saveSellHomeDate: null, // 存储我要卖主页相关数据
    _game_py: {}, // 游戏首拼（端游手游）
    _games: {},  // 游戏列表（端游和手游）
    _sell_games: {}, // 我要卖手游列表
    _account_goods: { list: [], id: '' },  // 账号商品列表页
    _goods_types: {list: [], id: ''}, // 游戏商品类型
    _game_platform: {list: [], id: ''}, // 游戏平台
    _game_client: {list: [], id: ''}, // 游戏客户端
    _game_server: {list: [], id: ''} // 游戏服务器
  },
  mutations: {
    clearSaveListData (state, t) {state.saveListData = null },
    saveListData (state, t) { state.saveListData = t },
    clearSaveSellHomeData (state, t) {state.saveSellHomeDate = null },
    saveSellHomeDate (state, t) { state.saveSellHomeDate = t },
    [typeList.setGamePy] (state, {k, d}) { state._game_py[k] = d }, // 设置游戏 列表
    [typeList.setSellGames] (state, {k, d}) { state._sell_games[k] = d }, // 设置游戏 列表
    [typeList.setGames] (state, {k, d}) { state._games[k] = d }, // 设置游戏 列表
    [typeList.setAccountGoods] (state, d) { state._account_goods = d }, // 设置 账号商品列表
    [typeList.setGoodsTypes] (state, d) { state._goods_types = d }, // 设置 账号商品列表
    [typeList.setGamePlatform] (state, d) { state._game_platform = d }, // 设置 平台
    [typeList.setGameClient] (state, d) { state._game_client = d }, // 设置 客户端
    [typeList.setGameServer] (state, d) { state._game_server = d } // 设置 服务器
  },
  actions : {
    ...mgData
  }
}