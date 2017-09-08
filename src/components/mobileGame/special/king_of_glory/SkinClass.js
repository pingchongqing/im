/**
 * Created by yanjd on 2017/7/31.
 */
/**
 * 皮肤专题对象
 */
export default class SkinClass {
  constructor () {
    let data = getData() // 初始化数据
    this._menus = data.menus
    this._menuCheckIndex = data.menuCheckIndex
  }
  get menus () { return this._menus } // 菜单对象
  set menuCheckIndex (index) { this._menuCheckIndex = index } // 当前选中的菜单在menus的index值
  get menuCheckIndex () { return this._menuCheckIndex }
  get list () { return this._list } //
  // 设置商品列表
  setList (val) {
    // (1坦克，2法师，3战士，4刺客，5辅助，6射手)
    this._menus.map(menu => {
      if (menu.skinHeroJob === 0) {
        menu.list = val
      } else {
        menu.list = val.filter(goods => goods.skinHeroJob === menu.skinHeroJob)
      }
    })
  }
}
function getData() {
  return {
    menus: [
      {name: '全部', skinHeroJob: 0, list: []},
      {name: '坦克', skinHeroJob: 1, list: []},
      {name: '战士', skinHeroJob: 3, list: []},
      {name: '法师', skinHeroJob: 2, list: []},
      {name: '刺客', skinHeroJob: 4, list: []},
      {name: '辅助', skinHeroJob: 5, list: []},
      {name: '射手', skinHeroJob: 6, list: []}
    ],
    menuCheckIndex: 0
  }
}
