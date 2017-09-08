/**
 * Created by 张宸昊 on 2017/4/17.
 */
const Main = resolve => {
    require.ensure(['./../components/kefu/Main.vue'], () => {
        resolve(require('./../components/kefu/Main.vue'));
    }, 'Main');
}

//客服中心主页
const index = resolve => {
    require.ensure(['./../components/kefu/index.vue'], () => {
        resolve(require('./../components/kefu/index.vue'));
    }, 'index');
}

//问题搜索
const serviceSearch = resolve => {
    require.ensure(['./../components/kefu/serviceSearch.vue'], () => {
        resolve(require('./../components/kefu/serviceSearch.vue'));
    }, 'serviceSearch');
}

//搜索列表
const searchList = resolve => {
    require.ensure(['./../components/kefu/searchList.vue'], () => {
        resolve(require('./../components/kefu/searchList.vue'));
    }, 'searchList');
}

//搜索结果
const result = resolve => {
    require.ensure(['./../components/kefu/result.vue'], () => {
        resolve(require('./../components/kefu/result.vue'));
    }, 'result');
}

//自助服务
const selfService = resolve => {
    require.ensure(['./../components/kefu/selfService.vue'], () => {
        resolve(require('./../components/kefu/selfService.vue'));
    }, 'selfService');
}

//防骗中心
const avoidFraud = resolve => {
    require.ensure(['./../components/kefu/avoidFraud.vue'], () => {
        resolve(require('./../components/kefu/avoidFraud.vue'));
    }, 'avoidFraud');
}
//验证中心
const ValidateCenter = resolve => {
    require.ensure(['./../components/kefu/ValidateCenter.vue'], () => {
        resolve(require('./../components/kefu/ValidateCenter.vue'));
    }, 'ValidateCenter');
}

//验证结果
const ValidateResult = resolve => {
    require.ensure(['./../components/kefu/ValidateResult.vue'], () => {
        resolve(require('./../components/kefu/ValidateResult.vue'));
    }, 'ValidateResult');
}

export const kf = {
    path: '/vue/kf',
    component: Main,
    children: [
        {
            path: "",
            component: index,
            name: 'index',
            meta: {isPublish: true, requireAuth: false}
        },
        {
            path: "service-search",
            component: serviceSearch,
            name: 'serviceSearch',
            meta: {isPublish: true, requireAuth: false}
        },
        {
            path: "search-list",
            component: searchList,
            name: 'searchList',
            meta: {isPublish: true, requireAuth: false}
        },
        {
            path: "result",
            component: result,
            name: 'result',
            meta: {isPublish: true, requireAuth: false}
        },
        {
            path: "self-service",
            component: selfService,
            name: 'selfService',
            meta: {isPublish: true, requireAuth: false}
        },
        {
            path: "avoid-fraud",
            component: avoidFraud,
            name: 'avoidFraud',
            meta: {isPublish: true, requireAuth: false}
        },
        {
            path: "validate-center",
            component: ValidateCenter,
            name: 'ValidateCenter'
        },
        {
            path: "validate-result/:qnum",
            component: ValidateResult,
            name: 'ValidateResult',
            meta: {isPublish: true, requireAuth: false}
        }
    ],
    meta: {isPublish: true, requireAuth: false}
}

