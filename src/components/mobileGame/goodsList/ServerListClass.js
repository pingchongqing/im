/**
 * Created by yanjd on 2017/7/29.
 */
export default class ServerList {
  constructor () {
    this._TYPE = {_PLATFORM: 'platform', _CLIENT: 'client', _SERVER: 'server'} // 三个变量名常亮
    this._list = {platform: [], client: [], server: []} // 列表
    this._checked = {platform: null, client: null, server: null} // 选中项
    this._menuLeftName = {platform: '平台', client: '客户端', server: '服务器'} // 子菜单左侧名
    this._menuLeftNameDefault = {platform: '平台', client: '客户端', server: '服务器'}
    this._outId = 0 // 特殊id， 点击后直接算结束
  }
  /* 平台、客户端、服务器*/
  set platform (val) { this._list.platform = val }
  get platform () { return this._list.platform }

  set client (val) { this._list.client = val }
  get client () { return this._list.client }

  set server (val) { this._list.server = val }
  get server () { return this._list.server }
 /* 其它参数 */
  get list () { return this._list }
  get TYPE () { return this._TYPE }
  get checked () { return this._checked}
  get menuLeftName () { return this._menuLeftName}
  get menuLeftNameDefault () { return this._menuLeftNameDefault}
  get outId () { return this._outId}

  /***
   * 改变菜单层级
   * @param type 菜单常亮名，对应 this._TYPE
   */
  changeLeftMenu (type) {
    switch (type) {
      case this._TYPE._PLATFORM :
        clear.call(this, [this._TYPE._PLATFORM, this._TYPE._CLIENT, this._TYPE._SERVER])
        break
      case this._TYPE._CLIENT :
        clear.call(this, [this._TYPE._CLIENT, this._TYPE._SERVER])
        break
      case this._TYPE._SERVER :
        clear.call(this, [this._TYPE._SERVER])
        break
    }
    function clear(types) {
      types.map(v => {
        this._checked[v] = null
        this._menuLeftName[v] = this._menuLeftNameDefault[v]
      })
    }
  }
  /* 服务器菜单名 */
  get serverMenuName () {
    /*
     * 1. 服务器选中 - 标题为 服务器选中名
     * 2. 客户端选中 服务器不限 - 客户端选中名
     * 3. 客户端不限 - 平台选中名
     * 4. 平台无选 - '服务器'
     * */
    let checked = this._checked
    if (checked.server && checked.server.id !== this._outId) {
      return checked.server.name
    } else if (checked.client && checked.client.id !== this._outId) {
      return checked.client.name
    } else if (checked.client && checked.client.id === this._outId) {
      return checked.platform.name
    } else {
      return '服务器'
    }
  }
}
