<template>
    <div v-if="isShow && show && historySwitch" class="pl-30 bg-fff mb-20  ">
        <div class="his clearfix border-bottom">
            <h3 class="f30 fl color-999">搜索历史</h3>
            <div class="fr del-icon" @click="isShow = false">
                <img src="../../assets/images/common/del.png"/>
            </div>
        </div>
        <div v-for="item in historyList" class="Warrior clearfix border-bottom">
            <div class="rake-con clearfix border-bottom">
                <router-link v-if="type !== 'seller' && item.gameType===1 && goodstype==2"
                        :to="{name:'PcGoodsList',
                        params:{gameId:item.gameId, gameName:item.name, goodsType: goodstype} }"
                        class="dis-b clearfix ps-r">
                    <div class="search-all-head rake-con-l  ps-a">
                        <i></i>
                        <h4 class=" f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>
                <router-link v-else-if="type !== 'seller' && item.gameType===1"
                        :to="{name:'ChooseClass',
                        query:{gid:item.gameId, gname:item.name, gameType:item.gameType,type:type, goodsType:goodstype} }"
                        class="dis-b clearfix ps-r">
                    <div class="search-all-head rake-con-l  ps-a">
                        <i></i>
                        <h4 class=" f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>
                <router-link  v-if="type !== 'seller' && item.gameType === 2 && goodstype==3"
                              :to="{name:'ChooseClass',
                              query:{gid:item.gameId, gname:item.name, gameType:item.gameType,type:type, goodsType:goodstype} }"
                              class="dis-b clearfix ps-r">
                    <div class="search-all-head rake-con-l  ps-a">
                        <i class="ph"></i>
                        <h4 class="f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>
                <router-link  v-else-if="type !== 'seller' && item.gameType === 2"
                              :to="{name:'MobileGameList',
                        params:{gameId:item.gameId, gameName:item.name, goodsType:2} }"
                              class="dis-b clearfix ps-r">
                    <div class="search-all-head rake-con-l  ps-a">
                        <i class="ph"></i>
                        <h4 class="f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>
                 <router-link  v-if="type === 'seller'"
                        :to="{name:'goodsPublish',
                        query:{game_id:item.gameId, game_name:item.name,game_type:item.gameType,type:type} }"
                        class="dis-b clearfix ps-r">
                    <div class="search-all-head rake-con-l  ps-a">
                        <i :class="{'ph': item.gameType == 2}"></i>
                        <h4 class="f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>

            </div>
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
        props: {
            historyList: {
                type: Array,
                default(){
                    return [];
                }
            },
            show: {
                default: false
            },
            historySwitch: {
                /**
                 *  开关状态
                 */
            },
            type:{
                type:String,
                default(){
                    return '';
                }
            }
        },
        data(){
            return {
                isShow: false,
                goodstype: this.$route.query.goodsType?this.$route.query.goodsType:''
            }
        },
        watch: {
            historyList: function (val, oldVal) {
//        console.log(val, oldVal);
                if (this.historyList != null && this.historyList.length > 0) {
                    this.isShow = true
                }
            }
        }

    }
</script>
<style>
    .search-all-head {
        width: 100%;
    }

    .search-all-head h4 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 0.2rem;
        width: 91%;
        padding-left: 0.5rem;
    }
    .del-icon{
    height: 0.9rem;
    width: .8rem;
    }
</style>
