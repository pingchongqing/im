/**
 * Created by Administrator on 2017/3/15.
 */
import Header from './../components/Header.vue';

//搜索
const Search = resolve => {
    require.ensure(['./../components/search/Search.vue'], () => {
        resolve(require('./../components/search/Search.vue'));
    }, 'search');
}

const SearchComponent = resolve => {
    require.ensure(['./../components/search/SearchComponent.vue'], () => {
        resolve(require('./../components/search/SearchComponent.vue'));
    }, 'search');
};

//搜索游戏平台
const SearchPlatForm = resolve => {
    require.ensure(['./../components/search/SearchPlatForm.vue'], () => {
        resolve(require('./../components/search/SearchPlatForm.vue'));
    }, 'search');
};

//搜索游戏区
const SearchArea = resolve => {
    require.ensure(['./../components/search/SearchArea.vue'], () => {
        resolve(require('./../components/search/SearchArea.vue'));
    }, 'search');
};

//搜索游戏服
const SearchServer = resolve => {
    require.ensure(['./../components/search/SearchServer.vue'], () => {
        resolve(require('./../components/search/SearchServer.vue'));
    }, 'search');
};

//搜索商品类型
const SearchGoodType = resolve => {
    require.ensure(['./../components/search/SearchGoodType.vue'], () => {
        resolve(require('./../components/search/SearchGoodType.vue'));
    }, 'search');
};

//搜索游戏
const SearchGame = resolve => {
    require.ensure(['./../components/search/SearchGame.vue'], () => {
        resolve(require('./../components/search/SearchGame.vue'));
    }, 'search');
};

//搜索阵营
const SearchFaction = resolve => {
    require.ensure(['./../components/search/SearchFaction.vue'], () => {
        resolve(require('./../components/search/SearchFaction.vue'));
    }, 'search');
};


//搜索结果列表
const SearchList = resolve => {
    require.ensure(['./../components/search/SearchList.vue'], () => {
        resolve(require('./../components/search/SearchList.vue'));
    }, 'search');
};

export const searchRoute =

{
    path: '/vue/search', components: {
    default: Search,
},
    children: [
        {
            path: '/vue/search/searchPlatForm',
            components: {
                default: SearchPlatForm,
                'search-header': Header,
            }
        },
        {
            path: '/vue/search/searchArea',
            components: {
                default: SearchArea,
                'search-header': Header,
            }
        },
        {
            name: 'searchServer',
            path: '/vue/search/searchServer',
            components: {
                default: SearchServer,
                'search-header': Header,
            }
        },
        {
            name: 'SearchFaction',
            path: '/vue/search/searchFaction',
            components: {
                default: SearchFaction,
                'search-header': Header,
            }
        },
        {
            path: '/vue/search/searchGoodType',
            components: {
                default: SearchGoodType,
                'search-header': Header,
            }
        },
        {
            path: '/vue/search/searchList',
            components: {
                default: SearchList,
                'search-header': Header,
            }
        },
        {
            path: '/vue/search/searchGame',
            components: {
                default: SearchGame,
                'search-header': Header,
            }
        },
    ],
    meta: {isPublish: true, requireAuth: false}
};
