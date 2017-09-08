/**
 * Created by 严俊东 on 2017/3/17.
 */

import {CONSTANTS} from './constants'
import math from './math'
import {getAccount,setAccountInfo,getAccountInfo} from './getAccount'
import {createHistorys} from './createHistorys'
import {isBottom} from './watchScroll'
import {setScreenHeight,getScreenHeight} from './screenHight'
import Pingyin from './pingyin.js'
import {isLocalStorageSupported} from './isLocalStorageSupported'
import {setCookie,getCookie} from './cookie'
import {nativeShare} from './nativeShare'
const CONFIG = {};
CONFIG.install = function (Vue, options) {
    Vue.CONSTANTS = CONSTANTS;
    Vue.MATH = math;
    Vue.prototype.$CONSTANTS = CONSTANTS;
    Vue.prototype.$getAccount= getAccount;
    Vue.prototype.$getAccountInfo= getAccountInfo;
    Vue.prototype.$setAccountInfo= setAccountInfo;
    Vue.prototype.$createHistorys= createHistorys;
    Vue.prototype.$isBottom= isBottom;
    Vue.prototype.$setScreenHeight= setScreenHeight;
    Vue.prototype.$getScreenHeight= getScreenHeight;
    Vue.prototype.$isLocalStorageSupported= isLocalStorageSupported;
    Vue.prototype.$pingyin = Pingyin;
    Vue.prototype.$pingyin.initialize();//初始化
    Vue.prototype.$setCookie= setCookie;
    Vue.prototype.$getCookie= getCookie;
    Vue.prototype.$nativeShare=nativeShare;
    //Vue.prototype.$uploader = uploader;
};

export {CONFIG};
