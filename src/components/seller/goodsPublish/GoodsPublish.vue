<template>
    <div>
        <div id="wrapper" v-show="!khdshow && !isShowSelectServer">
            <!--一屏显示-->
            <div class="one-screen">
                <!--填补fixed的块-->
                <!--发布商品-->
                <div class="order-container bg-fff f30 border-bottom mb-20 mt-97">
                    <span class="fontwgh">所属游戏</span>
                    <span class="fr">{{params.game_name}}</span>
                </div>

              <div class="p-30 bg-fff  f30 border-bottom fw">
                  <span class="f32 span-icon-xinhao color-000">交易类型</span>
              </div>
                <div class="px-30 pt-30 pb-10 bg-fff border-bottom publish-type new-publish-type f30 clearfix fw">
                    <ul>
                        <li class="border mb-20  fl color-000"v-for="v in goodsTypeList"
                            :class="{selected:v.goodsType == goodsType}"
                            @click="selectGoodsType(v)"
                            v-if="v.goodsType === 1 || v.goodsType === 2 || v.goodsType === 3 || v.goodsType === 65 ">
                            {{v.goodsTypeName}}
                        </li>
                    </ul>
                </div>

                <selectClient v-if="params.game_type  == 2" ref="opertorName" ></selectClient>

                 <div class="p-30 bg-fff border-top mt-20 f30 border-bottom fw" @click="showSelectServer" v-if="goodsType == 2">
                    <span class="f32 color-000 span-icon-xinhao fl">所属服务器</span>
                    <span class="fr f32 color-000 span-icon-toRight">{{serverName}}</span>
                 </div>
                  <div class="contaner-qq fw" v-if="serverError">
                     <p class="f24">请选择所属服务器</p>
                  </div>
                <!--底部确认是否发布商品-->
                <div class="clearfix bg-fff fw mt-20" v-if="isOpen">
                    <div class="order-container f30 border-top border-bottom select-kjfb">
                        <span class="sec-title fontwgh">快捷发布</span>
                        <span class="f24 color-666 exp"><!--<i class="wenhao"></i>-->专业客服帮您截图，商品更易出售</span>
                        <div class="button-switch fr"><label class="label-switch">
                            <input type="checkbox" id="label-switch" v-model="isQuick">
                            <div class="checkbox"></div>
                        </label></div>
                    </div>
                </div>
                <div class="release  fw mt-20">
                    <a @click="next()">
                        <input class="bg-f54" type="button"
                               :style="{background:(params.game_type == 2 && params.serviceProviderId == '') ||(params.game_type == 1 && goodsType == '') ||(goodsType == 2 &&  !params.regionId && !params.serverId)?'#bbb':'#f75e46'}"
                               value="下一步">
                    </a>
                </div>
                <div  @click="processMain = true" class="mt-20  fw ">
                   <a class="proclo fr px-30 f30 color-06c">发布流程</a>
               </div>
            </div>

        </div>

        <div class="process-main " v-show="processMain == true">
            <div class="top-header border-bottom">
                <div class="top-back" @click="processMain = false">
                    <a class="goBack">返回</a>
                </div>
                <h2 class="f36 color-000">商品发布流程</h2>
            </div>
            <div class="process-conn">
                <ul>
                    <li>
                        <div class="pro-left pro-left-bj"><span class="hover">1</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>卖家提交帐号登录信息</h2>
                            <!-- <p>需2分钟</p> -->
                        </div>
                    </li>
                    <li>
                        <div class="pro-left"><span>2</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>5173客服登录游戏审核帐号</h2>
                            <!-- <p>需5分钟</p> -->
                        </div>
                    </li>
                    <li>
                        <div class="pro-left"><span>3</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>发布成功，等待买家购买</h2>
                        </div>
                    </li>
                    <li>
                        <div class="pro-left"><span>4</span></div>
                        <div class="pro-right" id="seller-help4">
                            <i class="prico"></i>
                            <h2>买家购买后，5173客服帮买家绑定密保手机</h2>
                            <!--<p><a id="bindingsmb" target="_blank" href="https://aq.qq.com/cn2/mobile_index">点击绑定</a></p>-->
                        </div>
                    </li>
                    <li class="bacder">
                        <div class="pro-left"><span>5</span></div>
                        <div class="pro-right" id="seller-help5">
                            <i class="prico"></i>
                            <h2>绑定密保手机成功后，交易成功</h2>
                        </div>
                    </li>
                </ul>
            </div>


        </div>


        <selectServerComponent v-show="isShowSelectServer && params.game_type == 1" :check-atuomation="checkAtuomation"></selectServerComponent>

        <selectServerMobileComponent v-show="isShowSelectServer && params.game_type == 2" :check-atuomation="checkAtuomation"></selectServerMobileComponent>
    </div>
</template>

<script >
    import api from '../../../api'
    import selectClient from './selectClient.vue'
    import { mapState, mapGetters, mapActions } from 'vuex';
    import selectServerComponent from '../goodsCreated/SelectServer.vue';
    import selectServerMobileComponent from '../goodsCreated/SelectServerMobile.vue';
    export default{
        data(){
            return {
                goodsTypeList: [],
                goodsType: 2,
                Operator: [],
                isQuick: false,
                khdshow: false,
                isShowSelectServer: false,
                serverError:false,
                isOpen:false,
                serverName: "请选择",
                params: {
                    game_id: this.$route.query.game_id,
                    game_name: this.$route.query.game_name,
                    game_type: this.$route.query.game_type || 1,
                    mainCatagoryId:this.$route.query.mainCatagoryId,
                    serviceProviderId:'',
                    chooseOperator: '请选择',
                    supplyServerName:''
                },
                choose: '请选择',
                processMain: false,
                autoGameList:[],
                from:""
            }
        },
        components: {
            selectClient,
            selectServerComponent,
            selectServerMobileComponent
        },
        beforeRouteEnter (to, from, next) {
            if (from.name === 'goodsCreated' || from.name === 'GoodsCreatedMobile' || from.name === 'CreatedGold' ) {
                next(vm => {
                    vm.routerGoodsType(from.query.goodsType,
                                       from.query.serviceProviderId,
                                       from.query.chooseOperator)
                })
            } else {
                next();
            }
        },
        created: function () {
            let vm = this;
            let params = {
                gameId:vm.params.game_id
            }
            vm.$bus.emit('headerText', '商品发布');
            vm.getGoodsType();

            vm.from5173();

        },
        mounted(){
            var self = this;
            const key = 'MG_SAVE_SELL_HOME_DEFAULT_GAME_TYPE';

            self.$bus.on('getServicesProviderId',(val)=>{
                self.params.serviceProviderId = val;
                self.$bus.emit('setServiceProviderId',val);
            })

            // self.$bus.emit('isBack',false);
            // self.$bus.emit('callback',()=>{
            //   if (self.$isLocalStorageSupported()) {
            //       self.$router.push({name:'MGSellHome',params:{type:localStorage.getItem(key)}});
            //   }else{
            //     self.$router.push({name:'MGSellHome',params:{type:1}});
            //   }
            // });

            self.$bus.emit('isShowRightHome', true);
        },
        computed:{
            ...mapState({
                isLogin:state=>{
                   return state.common.isLogin;
                }
            })
        },
        methods: {
            from5173(){
                var self = this;
                if(self.$route.query.from == "www.5173.com"){
                     self.from = true;
                     self.$setCookie("from5173","true","/");
                }else{
                    self.from = false;
                    self.$setCookie("from5173","false","/");
                }
            },
             ...mapActions({
                getislogin:'common/COMMON_ISLOGIN'
            }),
            showSelectServer: function () {
                this.$bus.emit('showHeader', false);
                this.isShowSelectServer = true;

                this.scrollTop = document.body.scrollTop;
            },
            routerGoodsType(...args) {

                this.goodsType = args[0];

                this.chooseOperator = args [2];
                this.params.serviceProviderId = args [1];
                // this.params.regionId = args[3];
                // this.params.serverId = args[4];
                // this.serverName = args[5];
                this.$bus.emit('selectId',this.params.serviceProviderId);

            },
            getGoodsType: function () {
                let vm = this;
                let params = {
                    gameId: vm.params.game_id
                }
                api.seller.getGoodstype(params)
                        .then((res)=> {
                            if (res.data.success && res.data.responseStatus.code === '00' && res.data.goodsTypeList) {
                                vm.goodsTypeList = res.data.goodsTypeList;

                                if (vm.goodsTypeList.length <= 0) {
                                    vm.goodsType = '';
                                    vm.$toast('此游戏暂无交易类型,请等待后续开放!');
                                    return;
                                }
                                if (!vm.goodsType) {
                                    vm.goodsType = vm.goodsTypeList[0].goodsType;
                                }
                                //判断是否为账号 如果为账号判断是否为自动化
                                // if (vm.goodsType == 2) {
                                //     vm.isGoodsAutomation();
                                // }
                            } else {
                                vm.goodsType = '';
                                vm.$toast('此游戏暂无交易类型,请等待后续开放!');
                            }

                        })
            },
            next(){
                let vm = this;

                if (vm.params.game_type == 2 && vm.params.serviceProviderId === '') {
                    vm.$toast('请选择平台');
                    return;
                }




                if (vm.goodsType == 2) {
                    if (!vm.params.regionId && !vm.params.serverId) {
                        vm.serverError = true;
                        return;
                    };
                    //if (vm.params.game_type == 2) {
                        this.$router.push({
                            name: 'GoodsCreatedMobile',
                            query: {
                                game_name: vm.params.game_name,
                                game_id: vm.params.game_id,
                                isquick: vm.isQuick,
                                game_type: vm.params.game_type,
                                chooseOperator: vm.params.chooseOperator,
                                chooseOperatorId: vm.params.serviceProviderId,
                                goodsType: vm.goodsType,
                                mainGid:vm.params.mainCatagoryId,
                                regionId:vm.params.regionId,
                                serverId:vm.params.serverId,
                                serverName:vm.serverName,
                                supplyServerName:vm.params.supplyServerName,
                                operation: 1
                            }
                        })

                }
                else if(vm.goodsType == 3){
                     this.$router.push({
                            name: 'CreatedGold',
                            query: {
                                game_name: vm.params.game_name,
                                game_id: vm.params.game_id,
                                game_type: vm.params.game_type,
                                chooseOperator: vm.params.chooseOperator,
                                chooseOperatorId: vm.params.serviceProviderId,
                                goodsType: vm.goodsType
                            }
                        })
                }
                else {
                   location.href = `/publish/publish-game-area.html?gid=${vm.params.game_id}&gname=${vm.params.game_name}&goodsType=${vm.goodsType}&operatorId=${vm.params.serviceProviderId}&operatorName=
                   ${vm.params.chooseOperator}`
                }

            },
           async checkAtuomation(val){
                let vm = this;
                let params = {
                    gameId:vm.params.game_id,
                    platformId:vm.params.serviceProviderId,
                    regionId:val.regionId,
                    serverId:val.serverId
                }
                if (val.regionId && val.serverId) {
                  vm.serverError = false;
                };
             await  api.seller.getOpenAutomation(params)
                   .then((res)=>{
                    if (res.data.success) {
                       vm.isOpen = res.data.open;
                    };
                });
            },
            isGoodsAutomation: function () {
                let vm = this;
                let params = {
                    gameId: vm.params.game_id
                }

                api.seller.isGoodsAutomation(params)
                        .then((res)=> {
                            vm.isRightFromServer = res.data.isRight;
                            vm.isRight = vm.isRightFromServer;

                        })
            },
            selectGoodsType: function (item) {
                let vm = this;
                vm.goodsType = item.goodsType;

                vm.params.regionId = '';
                vm.params.serverId = '';
                vm.serverName = '请选择'

                vm.isQuick = false;
                vm.isOpen = false;


                // if (item.goodsType == 2) {
                //     vm.isQuick = false;
                // } else {
                    vm.isOpen = false;
                //}
            },
            hide: function (operatorName) {
                this.khdshow = false;
                this.choose = operatorName;
            }
        }
    }

</script>
<style src="css/common/publish-cl.css" scoped></style>
<style type="text/css" scoped>
    .fixedFill-mx {
        width: 100%;
        height: .96rem;
    }

    .gray {
        background: gray;
    }
    .one-screen{
        overflow: auto;
    }
    .release{
        margin-top: 0.2rem;
    }
</style>
