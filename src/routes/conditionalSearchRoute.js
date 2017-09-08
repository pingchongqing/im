/**
 * Created by Administrator on 2017/3/15.
 */
const ConditionalSearch = resolve => {
    require.ensure(['./../components/conditionalSearch/ConditionalSearch.vue'], () => {
        resolve(require('./../components/conditionalSearch/ConditionalSearch.vue'));
    }, 'conditionalSearch');
};

export const conditionalSearchRoute = {
    path: '/vue/conditionalSearch',
    name: 'conditionalSearch',
    component: ConditionalSearch,
    meta: {isPublish: false, requireAuth: false}
};