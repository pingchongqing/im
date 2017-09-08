/*
 * @Author: fredlee
 * @Date:   2017-05-23 10:16:11
 * @Last Modified by:   fredlee
 * @Last Modified time: 2017-06-20 17:25:57
 */

const preposeLogin = resolve => {
    require.ensure([], () => {
        resolve(require('components/login/PreposeLogin.vue'));
    }, 'preposeLogin');
}

const login = resolve => {
    require.ensure([], () => {
        resolve(require('components/login/Login.vue'));
    }, 'login');
}

const registerLogin = resolve => {
    require.ensure([], () => {
        resolve(require('components/login/RegisterLogin.vue'));
    }, 'registerLogin');
}

export const logins = {
        path: '/vue/login',
        component: preposeLogin,
        children: [
            {
                name:'login',
                path: '',
                component: login,
            },
            {
                path: 'register-login',
                name:'registerLogin',
                component: registerLogin
            }
        ],
        meta: {isPublish: true, requireAuth: false}
    };
