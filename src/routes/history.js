const browsingHistory = resolve => {
  require.ensure(['./../components/history/browsingHistory.vue'], () => {
    resolve(require('./../components/history/browsingHistory.vue'));
  }, 'browsingHistory');
};
const historyLists = resolve => {
  require.ensure(['./../components/history/historyLists.vue'], () => {
    resolve(require('./../components/history/historyLists.vue'));
  }, 'browsingHistory');
};
const historySimilarity = resolve =>{
  require.ensure(['./../components/history/historySimilarity.vue'], () => {
    resolve(require('./../components/history/historySimilarity.vue'));
  }, 'browsingHistory');
}

export const history =
  {
    path:'/vue/browsing-history',
    components:{
      default:browsingHistory,
    },
    children:[
      {
        path:'history-lists',
        components:{
          default:historyLists
        },
        name:'historyLists',
        meta: {isPublish: true, requireAuth: false}
      },
      {
        path:'history-similarity',
        components:{
          default:historySimilarity
        },
        name:'historySimilarity',
        meta: {isPublish: true, requireAuth: false}
      }

    ]
  }