/**
 * Created by Administrator on 2017/7/3高晨
 */
//个人中心页面
const center = resolve => {
    require.ensure(['components/my/user/Center.vue'], () => {
        resolve(require('components/my/user/Center.vue'));
    }, 'center');
}
const memberCenter = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/user/memberCenter.vue'));
    }, 'memberCenter');
}
//个人信息页面
const memberSetupInfo = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/user/memberSetupInfo.vue'));
    }, 'memberSetupInfo');
}
//修改用户昵称页面
const memberSetupName = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/user/memberSetupName.vue'));
    }, 'memberSetupName');
}
//修改个性签名页面
const memberSetupSignature = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/user/memberSetupSignature.vue'));
    }, 'memberSetupSignature');
}
//修改头像
const memberSetupTx = resolve => {
    require.ensure([], () => {
        resolve(require('components/my/user/memberSetupTx.vue'));
    }, 'memberSetupTx');
}
export const centers = {
    path: '/vue/center',
    component: center,
    children:[
        {
            name:"center",
            path: '',
            component: memberCenter,
            meta: {isPublish: true, requireAuth: false}
        },
        {
            name:"memberSetupInfo",
            path: 'member-setup-info',
            component: memberSetupInfo,
            meta: {isPublish: true, requireAuth: false}
        },
        {
            name:"memberSetupName",
            path: 'member-setup-name/:nickName',
            component: memberSetupName,
            meta: {isPublish: true, requireAuth: false}
        },
        {
            name:"memberSetupSignature",
            path: 'member-setup-signature/:signature',
            component: memberSetupSignature,
            meta: {isPublish: true, requireAuth: false}
        },
        {
            name:"memberSetupTx",
            path: 'member-setup-tx',
            component: memberSetupTx,
            meta: {isPublish: true, requireAuth: false}
        },
    ]
}