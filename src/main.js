import Vuex from 'vuex'
import Vue from 'vue'
import App from './App.vue'
import {routes} from './routes/routes'
import VueRouter from 'vue-router'
import store from './store'
import VueBus from 'vue-bus'
import MintUI from 'mint-ui'
import VueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCookie from 'vue-cookie'
import {CONFIG} from './assets/js/config/index.js' // 获取配置信息
import VueValidator from 'vue-validator'

Vue.config.debug = true;
Vue.use(Vuex)
Vue.use(CONFIG); // 注册全局配置信息
Vue.use(VueRouter);
Vue.use(VueBus);
Vue.use(MintUI);
Vue.use(VueAwesomeSwiper);
Vue.use(VueResource);
window.moment = require('moment');
Vue.use(VueCookie);
Vue.use(VueValidator);



// 全局自定义指令自动聚焦元素by Lee
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  update: function (el,{value}) {
    // 聚焦元素
    if (value) {
        el.focus()
    };
  }
})


//拦截器，有ajax请求时候，调用loading
Vue.http.interceptors.push(function (request, next) {
    this.$bus.emit('toggleLoading', true)
    next(function (response) {
        this.$bus.emit('toggleLoading', false);
    })
})
const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {

        return savedPosition || {x: 0, y: 0}
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isPublish)) {
        if (to.matched.some(record => record.meta.requireAuth)) {
            let vm = new Vue();
            vm.$getAccount().then(account => {
                if (account) {
                    vm.$bus.emit('accont', account);
                    vm.$setCookie("pcUserId", account.pcUserId);
                    vm.$CONSTANTS.isLogin = true;
                    vm.$setAccountInfo(account);
                    next();
                    if(account.pcUserId){
                        sa.login(account.pcUserId);
                    }else{
                        sa.quick('autoTrack');
                    } 
                } else {
                    sa.quick('autoTrack');
                  var url = window.location.protocol+"//"+window.location.host;
                  if(to.matched.some(record => record.meta.toFullPath)){
                    location.href = url+"/vue/login?returnUrl=" +  encodeURIComponent(url+to.fullPath);
                  }else{
                    if (to.name == 'goodsPublish') {
                    location.href = url+"/vue/login?returnUrl=" +  encodeURIComponent(url+to.fullPath);
                    }else{
                    location.href = url+"/vue/login?returnUrl=" +  encodeURIComponent(location.href);
                    }
                  }
             //      if(to.matched.some(record => record.meta.toFullPath)){
					  // debugger
             //        location.href = url+"/vue/login?returnUrl=" +  encodeURIComponent(url+to.fullPath);
             //      }else{
             //        location.href = url+"/vue/login?returnUrl=" +  encodeURIComponent(location.href);
             //      }
                    // var toName = to.name ? {name:to.name} : {}
                    // var toParams = to.params ? {params: to.params} : {}
                    // var toQueryOptions = Object.assign({redirect: to.fullPath}, toName)
                    // var nextOptions = {
                    //   name: 'QuickLogin',
                    //   path: '/vue/quick-login',
                    //   query: toQueryOptions,
                    // }
                    //  next(
                    //    Object.assign(nextOptions, toParams)
                    //  )
                }
            })
        }
        else {
            next();
        }
    } else {
        // 开发环境用next，线上用跳转404
        location.href = "/404.html";
        //next();
    }
});

router.afterEach(transition => {
    window.scrollTo(0, 1);
    //NProgress.remove();
});

var root = new Vue({
    store,
    router,
    render: h => h(App)
})

document.addEventListener('DOMContentLoaded', function () {
    root.$mount('#app')
})
/*function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) {
        return unescape(r[2]); return null
    };
}
var source = getQueryString("source");
if(source){
    document.cookie = "source=" + source + ";path=/";
}
*/
