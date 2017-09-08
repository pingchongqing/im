<template>
    <div>
        <div v-show="!isShowSelectServer" ref="tab">
            <div id="wrapper" class="pb-30"
                 v-show="step === 1">

                <!--填写商品信息-->
                <div class="order-container bg-fff color-000 f30 border-bottom mt-97">
                    <span>商品类型</span>

                    <span style="position: absolute;top: 0.24rem;left:2.4rem">{{params.goodsType|getGoodstypeText}}</span>

                </div>
                <div class="order-container bg-fff color-000 f30" v-if="game_type == 2 ">
                    <span>平台</span>
                    <span style="position: absolute;top: 0.24rem;left:2.4rem">{{$route.query.chooseOperator}}</span>
                </div>


                <div class="order-container bg-fff f30 color-000 mt-20   border-bottom border-top"
                     @click="showSelectServer" >
                    <span>所属服务器</span>
                    <span class="danwei">{{serverName}}</span>
                     <i class="toRight fr"></i>
                </div>
                <section data-i="所属阵营" propertyid="32" v-if="categoryList.length > 0">
                    <a href="javascript:;" class="aRight">
                        <div class="order-container bg-fff f30  border-bottom " @click="isCategoryShow = true;">
                            <span>所属阵营</span>
                            <span class=" danwei ">{{selectCategory.name !== undefined ?selectCategory.name:'请选择' }}
                            </span>
                             <i class="toRight fr"></i>
                        </div>
                    </a>
                    <aside class="ConBox" v-if="isCategoryShow">
                        <div class="top-header border-bottom">
                            <div class="top-back" @click="isCategoryShow = false"><a class="return conBack"
                                                                                     href="javascript:void(0);"></a>
                            </div>
                            <h2 class="f36">选择阵营</h2>
                        </div>
                        <div class="propertytxtdiv0 BoxLink Jbox">
                            <a v-for="v in categoryList" @click="selectedCategory(v)">{{v.name}}</a>
                        </div>
                    </aside>
                </section>

                <div class="order-container bg-fff color-000 f30 border-bottom">
                    <span>出售数量</span>
                    <input class="bg-fff" maxlength="8" type="tel" v-model="params.unitNum" placeholder="请输入游戏币数量"
                     @input="Replace('unitNum');totalPrice()">
                    <span class="danwei2">{{unit}}</span>
                </div>
                 <div class="order-container bg-fff color-000 f30 border-bottom">
                    <span>出售总价</span>
                    <input class="bg-fff" maxlength="8" type="tel" v-model="params.totalAmount" placeholder="请输入游戏币价格"
                    @input="Replace('totalAmount');totalPrice()">
                    <span class="danwei2">元</span>
                </div>
                <div class="order-container bg-fff f30 color-000 border-bottom">
                    <span>出售单价</span>
                    <span class="price">{{unitpriceText}}</span>
                </div>
                <div class="order-container bg-fff f30 color-000 border-bottom">
                     <span>本区服游戏币参考价：1元={{repositoryNum}}{{unit}}</span>
                </div>
                <!-- <p class="f22 mt-30 mb-30 color-999 pl-20 pr-20 p-tip" style="text-align: right">
                    <span class="coll lh-46" @click="collshow()">了解收费标准</span>
                </p>
 -->
                <div class="mt-20"></div>


                <div class="order-container bg-fff f30 mt-20 color-000 border-bottom border-top">
                    <span>游戏帐号</span>
                    <input maxlength="32" type="text" v-model="params.gameAccount" @blur="onBlur('gameAccount')"
                           placeholder="请输入游戏帐号">
                </div>
                <div class="order-container bg-fff f30 color-000 border-bottom">
                    <span>游戏密码</span>
                    <input maxlength="20" type="text" v-model="params.gamePwd" @blur="onBlur('gamePwd')"
                           @input="onReplace('gamePwd')"
                           placeholder="请输入游戏密码">
                </div>

                <div class="order-container bg-fff f30 color-000 border-bottom">
                    <span>角色名</span>
                    <input maxlength="20" type="text" v-model="params.gameRoleName" @blur="onBlur('gameRoleName')"
                           placeholder="请输入游戏角色名">
                </div>

                <!--安心买服务-->
                <p class="sec-tip">本站所有信息经过安全加密，请安心填写</p>
                <div class="order-container color-000 bg-fff border-bottom" v-if="safeBuyConfig.isEnable">
                    <span class="f32 sec-buy-server">开通安心买服务<i class="wenhao1 mt-10" @click="popshow()"></i></span>
                    <div class="sec-buy mt-20 f30">
                        <span class="sec-price">￥{{price}}</span>
                        <div class="fr" @click="anxinBuy(false)">
                            <i class="chrd-inp" :class="{selected:params.isAxm == false}"></i>
                            <span>不开通</span>
                        </div>
                        <div class="fr" @click="anxinBuy(true)">
                            <i class="chrd-inp" :class="{selected:params.isAxm == true}"></i>
                            <span>开通</span>
                        </div>

                    </div>
                    <div class="sec-text mt-20 f22 color-999">开通安心买服务，花费{{safeBuyConfig.pricePercent *
                        100}}%的服务费，提升50%出售率，仅成功后收取
                    </div>
                </div>
                <!--&lt;!&ndash;填补fixed&ndash;&gt;-->
                <!--<div class="fixedFill-md"></div>-->
                <!--底部确认是否发布商品-->
                <div class="release mt-30  trlect-btn border-top">
                    <a class="next" @click="nextStep()"><input class="bg-f54 " type="button" name=""
                                                                     value="下一步"></a>
                </div>
            </div>


            <div class="pb-200" v-show="step === 2">
                <!--填补fixed的块-->
                <div class="fixedFill-mx"></div>
                <!--top-->
                <div class="top-header border-bottom fixed-top">
                    <div class="top-back" @click="back()">
                        <a>返回</a>
                    </div>
                    <h2 class="f36 color-000">填写联系方式</h2>
                </div>

                <div class="order-container bg-fff f30 border-bottom">
                    <i class="tip"></i>
                    <span>为确保出售成功，请填写本人的联系方式</span>
                </div>
                <input-component
                        :iclass="'rest-fabu'"
                        v-model="params.tel"
                        required
                        :isType="'china-mobile'"
                        :title="'我的手机号'"
                        @BackValid="aBackValid"
                        type="tel"
                        placeholder="请输入手机号码"></input-component>
                <div class="order-container bg-fff f30 border-bottom">
                    <span>我的QQ号</span>
                    <input v-model="params.qq" maxlength="10"
                           type="tel" placeholder="请输入正确QQ号">
                </div>
                <div v-if="!isBindIdNsumber">
                    <div class="order-container bg-fff f30 border-bottom mt-20 border-top">
                        <i class="tip"></i>
                        <span>为了您的资金安全，请填写本人真实信息</span>
                    </div>
                    <div class="order-container bg-fff f30 border-bottom">
                        <span>真实姓名</span>
                        <input maxlength='14' type="text" placeholder="请输入您的真实姓名" v-model="nickName">
                    </div>
                    <div class="order-container bg-fff f30 border-bottom">
                        <span>身份证号</span>
                        <input maxlength='18' @input="Replace" type="tel" placeholder="请输入您的身份证号" v-model="IDcard" >
                    </div>
                    <div class="text-center color-m1 line-h46 f30 py-20">
                    信息请认真填写，提交后如需修改<br>需提供本人真实信息资料</div>
                </div>

                <!--底部确认是否发布商品-->
                <div class="release mt-20 trlect-btn border">
                    <a class="next" @click="save()">
                        <input class="bg-f54" type="button" :class="{'button-disable':buttonStatus}"
                               :value="buttonText">
                    </a>
                </div>
            </div>


            <div class="phlog hide" id="pop_register"
                 style="position: fixed; z-index: 1001;left: 50%; top: 50%; margin-left: -44%; "
                 :style="{'margin-top':popMarginTop}"
                 :class="{show:isPopshow}" @touchmove.prevent ref="pop">
                <div class="pgbis">
                    <h2 class="f30 color-000">安心买服务规定</h2>
                    <p class="f28">
                        鉴于5173作为网络第三方交易平台，仅能对卖家、买家、商品信息进行形式审查，为此5173特引入安心买服务。若卖家、买家任何一方选择了安心买服务，则卖家出售的商品，买家购买该商品出现被卖家找回、被运营商收回、封号等情况，您可以申请安心买服务，安心买保障体系会优先帮您找回帐号或者给予您购买商品的全额退款；并且本网站将根据该用户违规的情节和程度，对违规用户直接作出删除商品信息，限制交易权限甚至冻结用户帐号的处罚。若发生上述情况造成买家损失的，由本网站代卖家先行向买家退还购买上述商品的货款（服务费不退还）</p>
                </div>
            </div>
            <div class="dialog_cover hide" :class="{show:isPopshow || isCollshow}" @click="dialogshow();"
                 @touchmove.prevent></div>

            <!-- <notification
                :options.sync="options"
                :show.sync="showNotification"></notification> -->
        </div>

        <selectServerComponent v-show="isShowSelectServer && game_type == 1"></selectServerComponent>
        <selectServerMobileComponent v-show="isShowSelectServer && game_type == 2"></selectServerMobileComponent>

        <!--移动端帐号收费标准：-->
        <div class="phlog" v-show="isCollshow"
             style="opacity: 1; position: fixed; z-index: 1001; left: 0px; right: 0px; top: 25%;">

            <div class="ts-rate">
                <h3 class="f30 color-000">移动端帐号收费标准：</h3>
                <table>
                    <thead>
                    <tr>
                        <th class="t1">交易金额（元）</th>
                        <th>收取比例</th>
                        <th>服务费（元）</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="t1">8 < 交易金额 ≤ 50</td>
                        <td>固定</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td class="t1">50 < 交易金额 ≤ 100</td>
                        <td>100×10%</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td class="t1">100 < 交易金额 ≤ 150</td>
                        <td>150×10%</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td class="t1">150 < 交易金额 ≤ 200</td>
                        <td>200×10%</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td class="t1">以此类推</td>
                        <td>以此类推</td>
                        <td>以此类推</td>
                    </tr>
                    <tr>
                        <td class="t1">10000 < 交易金额</td>
                        <td>固定</td>
                        <td>1000</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<!-- <script type="text/javascript" src="./assets/js/uploadImg/plupload-2.3.1/js/plupload.full.min.js"></script> -->
<script >
    import api from '../../../api'
    import { mapState, mapGetters, mapActions } from 'vuex';
    import {InputComponent} from '../../common/formComponent'
    import selectServerComponent from './SelectServer.vue';
    import selectServerMobileComponent from './SelectServerMobile.vue';

    export default{
        data(){
            return {
                type:'gold',
                game_type: this.$route.query.game_type,
                mainGid:this.$route.query.mainGid,
                params: {
                    gameId: this.$route.query.game_id,
                    goodsType: 3,
                    isAxm: 2,
                    serviceProviderId: this.$route.query.chooseOperatorId,
                    totalAmount: '',
                    unitNum:'',
                    regionId:this.$route.query.regionId,
                    serverId:this.$route.query.serverId,
                },
                categoryList: [],
                isPopshow: false,
                isCategoryShow: false,
                isCollshow: false,
                selectCategory: {},
                step: 1,
                safeBuyConfig: {},
                scrollTop: 0,
                error: '',
                price: 0,
                isShowSelectServer: false,
                serverName: "请选择",
                labelWidth: '2.1rem',
                buttonStatus: false,
                buttonText: '确定',
                goodsId: this.$route.query.goodsId,
                popMarginTop: 0,
                isUpload:true,
                uploadImgCount:0,
                nickName:'',
                IDcard:'',
                unitPrice:'',
                unitpriceText:''
            }
        },
        created: function () {
            let vm = this;

            //vm.$bus.emit('headerText', vm.$route.query.game_name);
            vm.searchUserLogin();
            vm.getUnit({gameId:vm.params.gameId});
            vm.GetSafeBuyConfig();
            vm.searchfactionbygameid();

            if (vm.goodsId) {
                vm.selectgoodsdetail();
            }

            vm.checkUserBind({getIdNumber:false});
            vm.$bus.on('getrepositorynum',(data)=>{
                let params ={
                        gameId:vm.params.gameId,
                        regionId:vm.params.regionId,
                        serverId:vm.params.serverId,
                        raceId:vm.params.raceId
                }
                vm.getrepositorynum(params);
            });
        },
        mounted(){
          this.$bus.emit('showHeader', true);
           this.$bus.emit('headerText', this.$route.query.game_name);
        },
        components: {
            selectServerComponent,
            InputComponent,
            selectServerMobileComponent
        },
        methods: {
            onBlur(target) {
                if (this.params[target]) {
                    this.params[target] = this.params[target].replace(/\s/ig, '')
                }
            },
            aBackValid(val) {
                this.error = val
            },
            onReplace(target){
                if (this.params[target]) {
                    this.params[target] = this.params[target].replace(/[\u4e00-\u9fa5]/gm, '');
                }
                ;
            },
            totalPrice(){
                let vm = this;
                if (!vm.params.unitNum) {
                    vm.unitpriceText = '';
                    vm.unitPrice = '';
                    return;
                };
                if (!vm.params.totalAmount) {
                    vm.unitpriceText = '';
                    vm.unitPrice = '';
                    return;
                };
                vm.unitPrice = vm.changeTwoDecimal(vm.params.unitNum/vm.params.totalAmount);

                vm.unitpriceText = `1元=${vm.unitPrice}${vm.unit}`;
            },
            anxinBuy: function (value) {
                let vm = this;
                vm.params.isAxm = value;
            },
            popshow: function () {
                let vm = this;
                vm.isPopshow = !vm.isPopshow;
                vm.$nextTick(function () {
                    this.popMarginTop = -this.$refs.pop.getBoundingClientRect().height * 0.5 + "px";
                });
            },
            collshow: function () {
                let vm = this;
                vm.isCollshow = !vm.isCollshow;
            },
            dialogshow: function () {
                let vm = this;
                vm.isCollshow = false;
                vm.isPopshow = false;
            },
            nextStep: function () {
                let vm = this;
                let maxPrice = vm.repositoryNum * 2;
                let minPrice = vm.repositoryNum / 2;
                    if (!vm.checkParams()) {
                        return false;
                     }
                    if (vm.safeBuyConfig.isEnable && (vm.params.isAxm === 1 || vm.params.isAxm)) {
                        vm.params.servicePrice = vm.price;
                        vm.params.isAxm = vm.params.isAxm === 1 || vm.params.isAxm ? true : false;
                    } else {
                        vm.params.isAxm = false;
                    }
                 if (vm.repositoryNum) {
                     if (vm.unitPrice < minPrice || vm.unitPrice>maxPrice) {
                        vm.$toast(`单价应该在${minPrice}至${maxPrice}之间`);
                        return false;
                     };
                 };
                vm.step = 2;
                this.$bus.emit('showHeader', false);
            },
            back(){
                this.step = 1;
                this.$bus.emit('showHeader', true);
            },
            checkParams: function () {
                let vm = this;


                if (!vm.params.regionId || !vm.params.serverId) {
                    vm.$toast('请选择区服');
                    return false;
                };


                if (!vm.params.unitNum) {
                    vm.$toast('请输入出售数量');
                    return false;
                }

                if (!vm.params.totalAmount) {
                    vm.$toast('请输入出售总价');
                    return false;
                }
                if (!vm.params.gameAccount) {
                    vm.$toast('请输入游戏帐号');
                    return false;
                }
                if (!vm.params.gamePwd) {
                    vm.$toast('请输入游戏密码');
                    return false;
                }
                if (!vm.params.gameRoleName) {
                    vm.$toast('请输入角色名');
                    return false;
                }


                if (vm.safeBuyConfig.isEnable && vm.params.isAxm === 2) {
                    vm.$toast('请选择是否开通安心买');
                    return false;
                };

                return true;

            },
            saveMainUserInfo(){
                let vm = this;
                let params ={
                    realName:vm.nickName,
                    idNumber:vm.IDcard
                }
               return api.seller.saveMainUserInfo(params);

            },
            save: async function () {
                let vm = this;
                let isSaveUser = vm.isBindIdNsumber;

                 if (!vm.isBindIdNsumber) {

                    if (!vm.nickName || !/^[\u4e00-\u9fa5]+$/.test(vm.nickName)) {
                         vm.$toast('真实姓名必须为中文');
                        return;
                    };
                    if (vm.nickName.length < 2) {
                        vm.$toast('请输入最少2位中文姓名');
                        return;
                    };
                    if (!vm.IDcard || !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(vm.IDcard)) {
                        vm.$toast('请填写正确的身份证号码');
                        return;
                    };
                    if (!vm.isAdult()) {
                        vm.$toast('很抱歉，身份证号码显示您未满18岁，5173无法为您服务');
                        return;
                    };
                     vm.buttonStatus = true
                     await vm.saveMainUserInfo()
                             .then((res)=>{
                                vm.buttonStatus = false;
                                if (res.data.success) {
                                       isSaveUser = true;
                                       vm.isBindIdNsumber =  true;
                                }

                     },(res)=>{
                        vm.$toast(res.data.responseStatus.message);
                     });
                };

                if (!vm.params.tel) {
                    vm.$toast('请填写手机号码');
                    return false;
                }

                if (!vm.params.qq || !/^[1-9][0-9]{4,9}$/.test(vm.params.qq)) {
                    vm.$toast('请填写正确的QQ号');
                    return false;
                }

                else if (Object.keys(this.error).length > 0) {
                    if (this.error.format) {
                        this.$toast({
                            message: this.error.format
                        })
                        return false;
                    }
                }
                delete vm.params.signs;

                // if (vm.params.goodsId) {
                //
                // };

            if (!vm.buttonStatus && isSaveUser) {
                vm.buttonStatus = true
                vm.buttonText = '发布中';

                if (!vm.goodsId) {
                    await api.seller.createGold(vm.params).then((res)=> {
                        if (res.data.responseStatus.code && res.data.responseStatus.code == "11") {
                            //location.href = "/vue/login?returnUrl=" + encodeURIComponent(this.$route.fullPath)
                        } else if (res.data.success) {
                            this.$router.push({
                                path: "/vue/seller/PublishSuccess",
                                query: {goodsId: res.data.goodsId,goodsType:vm.params.goodsType}
                            })
                        } else {
                            this.$toast(res.data.responseStatus.message);
                        }
                    })
                }else{
                     await api.seller.updateGold(vm.params).then((res)=> {
                        if (res.data.responseStatus.code && res.data.responseStatus.code == "11") {
                            //location.href = "/vue/login?returnUrl=" + encodeURIComponent(this.$route.fullPath)
                        } else if (res.data.success) {
                            this.$router.push({
                                path: "/vue/seller/PublishSuccess",
                                query: {goodsId: res.data.goodsId,goodsType:vm.params.goodsType}
                            })
                        } else {
                            this.$toast(res.data.responseStatus.message);
                        }
                    })
                }
                vm.buttonText = '确定'
                vm.buttonStatus = false
             }

            },
            isAdult(){
               let vm = this;
               let nowDate = new Date();
               let birstr = vm.IDcard.substring(6,14);//截取身份证上的出生年月
               let birYear = birstr.substring(0,4);
               let birMonth = birstr.substring(4,6);
               let birDate = birstr.substring(6,8);
               let date = nowDate - new Date(birYear,birMonth,birDate);//当前时间减去出生时间
               let age;

               if (birMonth == nowDate.getMonth() + 1 && birDate <= nowDate.getDate()) {
                age = Math.round(date/(365*24*60*60*1000));
               }else{
                 age = parseInt(date/(365*24*60*60*1000));
               }
               return age >= 18;
            },
            GetSafeBuyConfig: function () {
                let vm = this;
                let params = {
                    gameId: vm.params.gameId,
                    goodsType: vm.params.goodsType
                };
                api.seller.GetSafeBuyConfig(params)
                        .then((res)=> {
                            if (res.data.success && res.data.safeBuyConfig) {
                                vm.safeBuyConfig = res.data.safeBuyConfig;
                            }
                        });
            },
            Replace(target){
                let vm = this;
                if (!vm.params[target]) {return;};

                vm.params[target] = vm.params[target].replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

            },
            CountSafeBuy: function () {
                let vm = this;
                //vm.params.totalAmount = parseInt(vm.params.totalAmount*100)/100;
                vm.price = parseInt(vm.params.totalAmount * vm.safeBuyConfig.pricePercent * 10000) / 10000;
                if (vm.price > vm.safeBuyConfig.maxPrice) {
                    vm.price = vm.safeBuyConfig.maxPrice;
                } else if (vm.price < vm.safeBuyConfig.minPrice) {
                    vm.price = vm.safeBuyConfig.minPrice;
                }
                vm.price = vm.price.toFixed(2);
            },
            searchfactionbygameid: function () {
                let vm = this;
                let params = {
                    parentId: vm.params.gameId
                }
                api.seller.searchfactionbygameid(params)
                        .then((res)=> {
                            if (res.data.success && res.data.categoryList) {
                                vm.categoryList = res.data.categoryList;
                            }
                            ;
                        })
            },
            selectedCategory: function (v) {
                this.params.raceId = v.catagoryId;
                this.selectCategory = v;
                this.isCategoryShow = false;
            },
            showSelectServer: function () {
                this.$bus.emit('showHeader', false);
                this.isShowSelectServer = true;

                this.scrollTop = document.body.scrollTop;
            },
            searchUserLogin: function () {
                let vm = this;
                api.seller.queryCurrentUserInfo()
                        .then((res)=> {
                         if (!res.data.success) {
                              location.href='/vue/login?returnUrl='+ encodeURIComponent(location.href);
                            } else {
                                vm.$http.get('/api/mobile-user-service/rs/account/checkBindMobile').then((res)=>{
                                    if(res.data.success){
                                        vm.params.tel = res.data.mobilePhone;
                                    }
                                })
                            }
                        }, (res)=> {
                            vm.$toast(res.data.responseStatus.message);
                        })
            },
            changeTwoDecimal(v){
                var val = parseFloat(v);

                if (isNaN(val))
                {
                return false;
                }
                val = Math.round(val * 10)/10;
                return val;
            },
            selectgoodsdetail: function () {
                let vm = this;
                let params = {
                    goodsId: vm.goodsId
                }
                api.seller.selectgoodsdetail(params)
                        .then((res)=> {
                            if (res.data && res.data.success) {
                                vm.params = res.data.goodsEO;
                                vm.serverName = vm.params.regionName + '/' + vm.params.serverName;
                                vm.selectCategory.name = vm.params.raceName;
                                vm.price = vm.params.servicePrice;
                                //审核失败写死为FALSE
                                vm.params.isRobotCapture = false;
                                vm.CountSafeBuy();


                                 vm.getrepositorynum({
                                    gameId:vm.params.gameId,
                                    regionId:vm.params.regionId,
                                    serverId:vm.params.serverId,
                                    raceId:vm.params.raceId
                                 });
                                 vm.totalPrice();
                            } else {
                                vm.$toast(res.data.responseStatus.message);
                            }
                        }, (res)=> {
                            vm.$toast(res.data.responseStatus.message);
                        })
            },
            ...mapActions({
                checkUserBind:'seller/SELLER_IS_MAINAUTHENTICATION',
                getrepositorynum:'seller/SELLER_REPOSITORYNUM',
                getUnit:'seller/SELLER_UNIT'
            })
        },
        filters: {
            getGoodstypeText: function (type) {
                return parseInt(type) === 1 ? '游戏装备' : parseInt(type) === 2 ? '游戏帐号' : parseInt(type) === 3 ? '游戏金币' : ''
            }
        },
        computed: {
            ...mapState({
               isBindIdNsumber:state=>{
                return state.seller.isMainAuthentication;
               },
               repositoryNum:state=>{
                return state.seller.repositoryNum;
               },
               unit:state=>{
                return state.seller.unit;
               }
            })
        }
    }
</script>
<style src="css/common/publish-cl.css" scoped></style>
<style type="text/css" scoped>
    .show {
        display: block !important;
    }

    .coll {
        color: #0000D3;
        font-size: .25rem;
    }

    .ConBox {
        margin: 0;
        left: 0;
        position: fixed;
    }
    .mt-97{ margin-top: 0.97rem;}
    .price{
            left: 2.4rem;
    position: absolute;
    }
</style>
<style type="text/css">
    /* html,body{
         position: fixed;
         overflow-x: hidden;
     }
 */
</style>
