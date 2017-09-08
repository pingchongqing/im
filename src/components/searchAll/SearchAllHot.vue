<template>
    <div v-if="show && hotList !=null && hotList.length > 0" class="hot pl-30 bg-fff border-bottom ">
        <h4 class="f30 color-999 border-bottom">5173热搜</h4>
        <div v-for="item in showList" class="search-all-hot game-n ps-r clearfix border-bottom">
            <!--<div  class="game-n ps-r clearfix border-bottom">-->
            <router-link v-if="type !== 'seller' &&item[1] != null && item[0].gameType === 1 && goodsType==2"
                    :to="{name:'PcGoodsList', params:{gameId:item[0]?item[0].gameId:'', gameName:item[0]?item[0].gameName:'',goodsType:goodsType} }"
                    class="fl f30 color-000" v-text="item[0].gameName"></router-link>
            <router-link v-else-if="type !== 'seller' && item[0].gameType === 1"
                    :to="{name:'ChooseClass', query:{gid:item[0]?item[0].gameId:'', gname:item[0]?item[0].gameName:'',gameType:item[0]?item[0].gameType:null,type:type,goodsType:goodsType} }"
                    class="fl f30 color-000" v-text="item[0].gameName"></router-link>

            <router-link v-if="type !== 'seller' && item[0].gameType === 2 && goodsType==3"
                    :to="{name:'ChooseClass', query:{gid:item[0]?item[0].gameId:'', gname:item[0]?item[0].gameName:'',gameType:item[0]?item[0].gameType:null,type:type,goodsType:goodsType} }"
                    class="fl f30 color-000" v-text="item[0].gameName"></router-link>

            <router-link v-else-if="type !== 'seller' && item[0].gameType === 2"
                         :to="{name:'MobileGameList',
                    params:{gameId:item[0]?item[0].gameId:'', gameName:item[0]?item[0].gameName:'', goodsType:2} }"
                         class="fl f30 color-000" v-text="item[0].gameName"></router-link>


                     <router-link v-if="type === 'seller'"
                    :to="{name:'goodsPublish',
                    query:{game_id:item[0]?item[0].gameId:'',game_name:item[0]?item[0].gameName:'',
                    game_type:item[0]?item[0].gameType:null,type:type} }"
                    class="fl f30 color-000" v-text="item[0].gameName"></router-link>

            <i class="pa"></i>
            <router-link v-if="type !== 'seller' &&item[1] != null && item[1].gameType === 1 && goodsType==2"
                    :to="{name:'PcGoodsList', params:{gameId:item[1]?item[1].gameId:'', gameName:item[1]?item[1].gameName:'',goodsType:goodsType} }"
                    class="fl f30 color-000" v-text="item[1].gameName"></router-link>
            <router-link v-else-if="type !== 'seller'  &&  item[1] != null && item[1].gameType === 1"
                    :to="{name:'ChooseClass', query:{gid:item[1]?item[1].gameId:'', gname:item[1]?item[1].gameName:'', gameType:item[1]?item[1].gameType:null,type:type,goodsType:goodsType} }"
                    class="fl f30 color-000"><span v-text="item[1]?item[1].gameName:'' "></span></router-link>

            <router-link v-if="type !== 'seller' &&  item[1] != null  && item[1].gameType  == 2 && goodsType==3"
                      :to="{name:'ChooseClass', query:{gid:item[1]?item[1].gameId:'', gname:item[1]?item[1].gameName:'', gameType:item[1]?item[1].gameType:null,type:type,goodsType:goodsType} }"
                      class="fl f30 color-000"><span v-text="item[1]?item[1].gameName:'' "></span></router-link>

            <router-link v-else-if="type !== 'seller' &&  item[1] != null  && item[1].gameType  == 2"
                         :to="{name:'MobileGameList',
                        params:{gameId:item[1]?item[1].gameId:'', gameName:item[1]?item[1].gameName:'', goodsType:2} }"
                         class="fl f30 color-000"><span v-text="item[1]?item[1].gameName:'' "></span></router-link>


                     <router-link v-if="type  === 'seller'"
                    :to="{name:'goodsPublish', query:{game_id:item[1]?item[1].gameId:'', game_name:item[1]?item[1].gameName:'', game_type:item[1]?item[1].gameType:null,type:type} }"
                    class="fl f30 color-000"><span v-text="item[1]?item[1].gameName:'' "></span></router-link>
        </div>
    </div>
</template>

<script>
    /**
     * 历史记录方案：
     *  方案一：
     *    数据自己请求
     *  方案二：
     *    数据父组件传入 √
     */
    export  default {
      data() {
        return {
          goodsType: this.$route.query.goodsType
        }
      },
        props: {
            hotList: {
                type: Array,
                default(){
                    return [];
                }
            },
            show: {
                default: false
            },
            type:{}
        },
        computed: {
            showList(){
                // 如果hotList为空，返回[]
                if (this.hotList == null) {
                    return [];
                }
                else {
                    let ret = [];
                    this.hotList.map((val, index) => {
                        if (index % 2 == 0) ret[index / 2] = [];
                        ret[parseInt(index / 2)].push(val);
                    });
                    return ret;
                }
            }
        }

    }
</script>
<style scoped>
    .search-all-hot a {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 0.2rem;
    }
</style>
