/**
 * Created by yanjd on 2017/7/10.
 */
import apiList from './list'
import apiFilter from './filter'
import apiSpecial from './special'
import apiSwitch from './switch'

export default {
  ...apiList,
  ...apiFilter,
  ...apiSpecial,
  ...apiSwitch
}
