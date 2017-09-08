
// import Test from 'components/test/test.vue'

const Test = resolve => {
    require.ensure(['components/test/test.vue'], () => {
        resolve(require('components/test/test.vue'));
    }, 'quickLogin');
};

export const test = {
    path: '/vue/test',
    name: 'Test',
    component: Test,
    meta: {isPublish: false, requireAuth: false}
};