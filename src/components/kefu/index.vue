<template>
    <div class="">
        <div id="wrapper">
            <!---------------------------- top ---------------------------->
            <div class="top-header fixed-top border-bottom">
                <div class="top-back">
                    <a href="/vue/center"></a>
                </div>
                <h2 class="f36 ">客服中心</h2>
                <div class="top-right">
                    <a href="/index.html" class="back-home"></a>
                </div>
            </div>
            <!---------------------------- 占位 ---------------------------->
            <div class="pt-head"></div>
            <!---------------------------- search ---------------------------->
            <div class="px-30 bg-c9 call-search border-bottom pt-20" v-if="searchShow">
                <router-link :to="{ name: 'serviceSearch', params: { userId: 123 }}" class="w-100">
                    <!--<input type="text" name="" id="" class="search" value="" disabled="disabled" placeholder="有问题搜一搜"/>-->
                    <div class="bg-fff go-next"><span class="">有问题搜一搜</span></div>
                </router-link>
            </div>
            <!---------------------------- 公告 ---------------------------->
            <div class="border-bottom bg-fff  px-30" v-if="proclamationShow">
                <div class="f32 color-01 text-center pt-50">{{proclamationList.noticeTitle}}</div>
                <div class="f32 color-000 text-center lh40 pb-50 mt-30 proclamation">
                    {{proclamationList.noticeMessage}}
                </div>
            </div>
            <!---------------------------- 服务 ---------------------------->
            <div v-if="selfShow">
                <div class="px-30 pt-30 pb-20 f32 color-666">自助服务</div>
                <!---------------------------- callMenu ---------------------------->
                <div class="">
                    <ul class="call-menu call-list bg-fff px-66 pb-40 border-top border-bottom clearfix">
                        <li>
                            <router-link :to="{ name: 'selfService', query: { typeName:'游戏币',typeId: 6 }}">
                                <img src="~images/kefu/callmenu1.png"/>
                                <span class="f28 color-000">游戏币</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'selfService', query: { typeName:'装备',typeId: 1 }}">
                                <img src="~images/kefu/callmenu2.png"/>
                                <span class="f28 color-000">装备</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'selfService', query: { typeName:'帐号',typeId: 2 }}">
                                <img src="~images/kefu/callmenu3.png"/>
                                <span class="f28 color-000">帐号</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'selfService', query: { typeName:'手游',typeId: 7 }}">
                                <img src="~images/kefu/callmenu4.png"/>
                                <span class="f28 color-000">手游</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'selfService', query: { typeName:'代练',typeId: 4 }}">
                                <img src="~images/kefu/callmenu5.png"/>
                                <span class="f28 color-000">代练</span>
                            </router-link>
                        </li>
                        <!-- <li>
                             <router-link :to="{ name: 'selfService', query: { typeName:'租号',typeId: 8 }}">
                                 <img src="~images/kefu/callmenu6.png"/>
                                 <span class="f28 color-000">租号</span>
                             </router-link>
                         </li>-->
                        <li>
                            <router-link :to="{ name: 'avoidFraud', query: { typeName:'防骗中心',typeId: 9 }}">
                                <img src="~images/kefu/callmenu8.png"/>
                                <span class="f28 color-000">防骗中心</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'ValidateCenter',query:{typeName:'验证中心'}}">
                                <img src="~images/kefu/callmenu7.png"/>
                                <span class="f28 color-000">验证中心</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'selfService', query: { typeName:'综合问题',typeId: 10 }}">
                                <img src="~images/kefu/callmenu9.png"/>
                                <span class="f28 color-000">综合问题</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!---------------------------- 反馈 ---------------------------->
            <div class="pb-100" v-if="underSwitch">
                <div class="px-30 pt-30 pb-20 f32 color-666">问题反馈</div>
                <!---------------------------- callMenu2 ---------------------------->
                <ul class="call-menu call-menut bg-fff pb-40 border-top border-bottom clearfix pr px-66"
                    id="switchList">
                    <li class=" clearfix" ref="li" v-if="askShow">
                        <a class="" href="http://sc.5173.com/?question/ask/41.html">
                            <img src="~images/kefu/callmenu10.png"/>
                            <span class="f28 color-000">咨询</span>
                        </a>
                    </li>
                    <li class=" clearfix" ref="li" v-if="complainShow">
                        <a :class="{'a-center':askShow&&complainShow&&suggestShow || (suggestShow==false && askShow!=false)}"
                           href="http://sc.5173.com/?question/complain/41.html">
                            <img src="~images/kefu/callmenu11.png"/>
                            <span class="f28 color-000">投诉</span>
                        </a>
                    </li>
                    <li class="clearfix" ref="li"
                        v-if="suggestShow">
                        <a :class="{'a-center':((askShow==false && complainShow!=false) || (askShow!=false && complainShow==false)),'fr':askShow&&complainShow&&suggestShow}"
                           href="http://sc.5173.com/?question/suggest/41.html">
                            <img src="~images/kefu/callmenu12.png"/>
                            <span class="f28 color-000">建议</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- <FooterComponent></FooterComponent>-->
        </div>
    </div>
</template>

<script>
    import FooterComponent from "components/Footer.vue"
    export default {
        name: 'callindex',
        data () {
            return {
                //公告
                proclamationStatus: '',
                proclamationShow: '',
                proclamationList: [],
                //搜索
                searchStatus: '',
                searchShow: '',
                //自助
                selfStatus: '',
                selfShow: '',
                suggestShow: '',
                askShow: '',
                complainShow: '',
                underSwitch: true,
                len: ''
            }
        },
        components: {
            FooterComponent
        },
        mounted(){
            this.getSwitch();
            this.getProclamation();
            this.threeSwitch();
            console.log(this.getAllSwitch());
        },
        methods: {
            getSwitch: function () {
                var self = this;
                //公告开关
                self.$http.post(self.$CONSTANTS.APISearchCenter + 'OnoffService/selectOnoff', {"mapRequest": {"type": "客服中心公告开关"}})
                    .then((res) => {
                        self.proclamationStatus = res.body.result.status;
                        if (self.proclamationStatus == 0) {
                            self.proclamationShow = false;
                        } else {
                            self.proclamationShow = true;
                        }
                    })
                    .catch(function (res) {
                        console.log(res)
                    });
                //搜索问题开关
                self.$http.post(self.$CONSTANTS.APISearchCenter + 'OnoffService/selectOnoff', {"mapRequest": {"type": "客服中心问题开关"}})
                    .then((res) => {
                        self.searchStatus = res.body.result.status;
                        if (self.searchStatus == 0) {
                            self.searchShow = false;
                        } else {
                            self.searchShow = true;
                        }

                    })
                    .catch(function (res) {
                        console.log(res)
                    });
                //自助服务开关
                self.$http.post(self.$CONSTANTS.APISearchCenter + 'OnoffService/selectOnoff', {"mapRequest": {"type": "客服中心自助开关"}})
                    .then((res) => {
                        self.selfStatus = res.body.result.status;
                        if (self.selfStatus == 0) {
                            self.selfShow = false;
                        } else {
                            self.selfShow = true;
                        }

                    })
                    .catch(function (res) {
                        console.log(res)
                    });
            },
            //获取公告
            getProclamation: function () {
                var self = this;
                self.$http.get(self.$CONSTANTS.APIQuestion + 'noticeService/noticeList')
                    .then((res) => {
                        self.proclamationList = res.body.data[0];
                        //console.log(self.proclamationList);
                        if (self.proclamationList == "" || self.proclamationList == null) {
                            self.proclamationShow = false;
                        }
                    })
                    .catch(function (res) {
                        console.log(res)
                    })
            },
            async getAllSwitch(){
                //客服中心建议咨询投诉总开关
                return this.$http.post(this.$CONSTANTS.APISearchCenter + 'OnoffService/selectOnoff', {"mapRequest": {"type": "客服中心建议咨询投诉总开关"}})
                    .then((res) => {
                        return res.body.result.status;
                    })
                    .catch(function (res) {
                        console.log(res)
                    });
            },
            async getAsk(){
                //咨询
                return this.$http.post(this.$CONSTANTS.APISearchCenter + 'OnoffService/selectOnoff', {"mapRequest": {"type": "客服中心咨询入口开关"}})
                    .then((res) => {
                        return res.body.result.status;
                        /*if (this.selfStatus == 0) {
                         return false;
                         } else {
                         return true;
                         }*/
                    })
                    .catch(function (res) {
                        console.log(res)
                    });

            },
            async getSug(){
                //建议入口开关
                return this.$http.post(this.$CONSTANTS.APISearchCenter + 'OnoffService/selectOnoff', {"mapRequest": {"type": "客服中心建议入口开关"}})
                    .then((res) => {
                        return res.body.result.status;
                    })
                    .catch(function (res) {
                        console.log(res)
                    });
            },
            async getTs(){
                //投诉
                return this.$http.post(this.$CONSTANTS.APISearchCenter + 'OnoffService/selectOnoff', {"mapRequest": {"type": "客服中心投诉入口开关"}})
                    .then((res) => {
                        return res.body.result.status;
                    })
                    .catch(function (res) {
                        console.log(res)
                    });
            },
            async threeSwitch(){
                if (this.underSwitch = await this.getAllSwitch() == 0) {
                    this.underSwitch = false
                } else {
                    this.askShow = await this.getAsk() == 0 ? false : true;
                    this.suggestShow = await this.getSug() == 0 ? false : true;
                    this.complainShow = await this.getTs() == 0 ? false : true;
                    if (!this.askShow && !this.suggestShow && !this.complainShow) {
                        this.underSwitch = false
                    } else {
                        this.underSwitch = true
                    }
                }
            }
        }
    }
</script>


<style scoped>
    a {
        text-decoration: none;
    }
</style>
