<template>
    <div>
        <div class="header pl-30 clearfix border-bottom">
            <div class="header-l ps-r">
                <input
                        class="f30"
                        ref="input"
                        type="text"
                        placeholder="请输入游戏名称或首字母"
                        :value="value"
                        @input="updateValue($event.target.value)">
                <div v-if="value != null && value.length > 0" class="header-l-ico ps-a" @click="clearValue">
                    <img src="../../assets/images/common/del.png">
                </div>
            </div>
            <a class="color-f7 f30 header-r" @click='routerBack()'>取消</a>
        </div>

        <div v-if="!showOther" class="rake pl-30 bg-fff " style="position: absolute;width: 100%">
            <div class=" rake-con clearfix border-bottom" v-for="item in searchList">
                <router-link v-if="type !== 'seller' && item.gameType===1 && goodstype==2"
                        :to="{name:'PcGoodsList',
                        params:{gameId:item.gameId, gameName:item.name, goodsType: goodstype} }"
                        class="dis-b clearfix ps-r" @click="shenCeSa(item.name)">
                    <div class="search-all-head rake-con-l  ps-a">
                        <i></i>
                        <h4 class=" f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>
                <router-link v-else-if="type !== 'seller' && item.gameType===1"
                        :to="{name:'ChooseClass',
                        query:{gid:item.gameId, gname:item.name, gameType:item.gameType,type:type, goodsType:goodstype} }"
                        class="dis-b clearfix ps-r" @click="shenCeSa(item.name)">
                    <div class="search-all-head rake-con-l  ps-a" @click="shenCeSa(item.name)">
                        <i></i>
                        <h4 class=" f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>

                <router-link v-if="type !== 'seller' && item.gameType===2 && goodstype==3"
                             :to="{name:'ChooseClass',
                             query:{gid:item.gameId, gname:item.name, gameType:item.gameType,type:type, goodsType:goodstype} }"
                             class="dis-b clearfix ps-r" @click="shenCeSa(item.name)">
                    <div class="search-all-head rake-con-l  ps-a">
                        <i class="ph"></i>
                        <h4 class=" f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>
                <router-link v-else-if="type !== 'seller' && item.gameType===2"
                             :to="{name:'MobileGameList',
                             params:{gameId:item.gameId, gameName:item.name, goodsType:2} }"
                             class="dis-b clearfix ps-r">
                    <div class="search-all-head rake-con-l  ps-a" @click="shenCeSa(item.name)">
                        <i class="ph"></i>
                        <h4 class=" f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>
                <router-link v-if="type === 'seller'"
                        :to="{name:'goodsPublish',
                        query:{game_id:item.gameId, game_name:item.name, game_type:item.gameType,type:type} }"
                        class="dis-b clearfix ps-r">
                    <div class="search-all-head rake-con-l  ps-a" @click="shenCeSa(item.name)">
                        <i :class="{'ph': item.gameType == 2}"></i>
                        <h4 class=" f30 color-000 dis-in" v-text="item.name"></h4>
                    </div>
                    <img src="../../assets/images/common/right.png" class="ps-a "/>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export  default {
        props: {
            value: {
                default: ''
            },
            searchList: {
                type: Array,
                default(){
                    return [];
                }
            },
            showOther: {},
            type:{}
        },
        data(){
            return {
                host: this.$CONSTANTS.HOST,
                goodstype: this.$route.query.goodsType?this.$route.query.goodsType:''
            }
        },
        methods: {
            routerBack(){
             this.$router.go(-1);
            },
            updateValue: function (val) {
                /**
                 * 得到新输入的
                 * 有空格
                 *    回退输入的值
                 *
                 *    触发回调事件，传回新的value值
                 *
                 */
                let filterVal = val.trim().substr(0, 20);
                if (filterVal !== val) { //不等于，还原（有空格）
                    this.$refs.input.value = filterVal;
                } else {
                    this.$emit('input', val)
                }
            },
            clearValue(){
                if (this.value != null && this.value.length > 0) {
                    this.$refs.input.value = '';
                    this.$emit('input', '');
                }
            },
            shenCeSa(gameName){
                this.$getAccount().then(account=>{
                    if(account){
                        if(account.pcUserId){
                            sa.login(account.pcUserId);
                            sa.setProfile({isLogin:true,keywords:gameName});
                        }else{
                            sa.setProfile({isLogin:true,keywords:gameName});
                            sa.quick('autoTrack');
                        } 
                    }else{
                        sa.setProfile({isLogin:false,keywords:gameName});
//                      sa.quick('autoTrack');
                    }
                });
            }
        }
    }
</script>
<style>
    .search-all-head {
        width: 100%;
    }

    .search-all-head i {
        position: absolute;
        top: 37%;
    }

    .search-all-head h4 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 0.2rem;
        width: 91%;
        padding-left: 0.5rem;
    }

</style>
