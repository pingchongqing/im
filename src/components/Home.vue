<template>
    <div id="wrapper">
        <!-- top -->
        <div class="index-header fixed-top" ref="header">
            <div class="index-header-logo" @click="getGameList"><img src="~images/logo.png" alt="5173游戏交易平台"
                                                                     class="img-responsive"></div>
            <div class="index-header-search">
                <div class="text-input" @click="goSearchAll"><span>搜索游戏</span></div>


            </div>
            <a rel=”nofollow” href="http://www.5173.com/home" title="返回5173主站"><span></span></a>

        </div>
        <div class="home">
            <div class="swiper-container3 fw margin-bottom">
                <div class="swiper-wrapper clearfix">
                    <div class="swiper-slide fl">
                        <a class="open-indicator"
                           title="游戏币交易"
                           href="/vue/choice/buyEntry?goodsType=3"
                        ><span class="class01">游戏币</span></a>
                    </div>
                    <div class="swiper-slide fl">
                        <a class="open-indicator"
                           title="帐号交易"
                           href="/vue/choice/buyEntry?goodsType=2"
                        ><span class="class02">帐号</span></a>
                    </div>
                    <div class="swiper-slide fl">
                        <a class="open-indicator" href="/vue/recharge" title="手游首充，手游代充"><span
                                class="class07">手游充值</span></a>
                    </div>
                    <div class="swiper-slide fl">
                        <a class="open-indicator" href="/dl/seek-usertype.html" title="游戏代练"><span
                                class="class03">代练</span></a>
                    </div>
                    <div class="swiper-slide fl">
                        <a class="open-indicator" href="https://evaluation.5173.com/newwzry" title="王者荣耀估价">
                        	<span class="class09">王者估价</span>
                        </a>
                    </div>
                </div>
            </div>
            <!--<div class="swiper-container3 fw margin-bottom">-->
            <!--<div class="swiper-wrapper clearfix">-->
            <!--<div class="swiper-slide fl">-->
            <!--<a class="open-indicator"-->
            <!--title="游戏币交易"-->
            <!--href="/search/search-game.html?goodsType=3&typename=游戏币"-->
            <!--&gt;<span class="class01">游戏币</span></a>-->
            <!--</div>-->
            <!--<div class="swiper-slide fl">-->
            <!--<a class="open-indicator"-->
            <!--title="帐号交易"-->
            <!--href="/search/search-game.html?goodsType=2&typename=帐号"-->
            <!--&gt;<span class="class02">帐号</span></a>-->
            <!--</div>-->
            <!--<div class="swiper-slide fl">-->
            <!--<a class="open-indicator" href="/vue/recharge" title="手游首充，手游代充"><span-->
            <!--class="class07">手游充值</span></a>-->
            <!--</div>-->
            <!--<div class="swiper-slide fl">-->
            <!--<a class="open-indicator" href="/dl/seek-usertype.html" title="游戏代练"><span-->
            <!--class="class03">代练</span></a>-->
            <!--</div>-->
            <!--<div class="swiper-slide fl">-->
            <!--<a class="open-indicator" href="/rent/rent-index.html" title="帐号租赁"><span-->
            <!--class="class08">租号</span></a>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!---------------------------- 游戏列表 ------------------------------>
            <div class="search-game mt-20 mb-100">
                <div class="tab">
                    <div class="tab-head border-top">
                        <ul class="tab-nav">
                            <li :class="{'active': selectGameType == 1}" @click="changeGameType(1)"><a class="dn">端游</a>
                            </li>
                            <li :class="{'active': selectGameType != 1}" @click="changeGameType(2)"><a class="sj">手游</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-body" ref="tab">
                        <div v-show="!finishFirstLoad" style="height: 100vh">
                            <div class="preloader-indicator-modal" style=" "><span
                                    class="preloader preloader-white"></span></div>
                        </div>
                        <template v-show="finishFirstLoad">
                            <div class="tab-class01" :style="{ 'min-height': tabHeight + 'px'}" ref="tabClass"
                                 v-show="displayList.length>0">
                                <div>
                                    <ul>
                                        <li v-for="(item,index) in displayList" :key="item.id" >
                                            <a @click="nextPage(item)">
                                                <img :src="item.gameImageUrl">
                                                <p>{{item.name}}</p></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-letter" :class="{'tab-letter-fixed': isLetterFixed }"
                                 :style="{  'height':isLetterFixed? fixLetterHeight+'px' :tabHeight+'px '}"
                                 ref="tabLetter">
                                <a @click="checkHot" :class="{'active':isHotActive}"><span class="hot-img"></span></a>
                                <a @click="checkMenu(item,index)" v-for="(item,index) in menuList"
                                   :class="{'active':menuIndex==index && isHotActive==false}">{{item}}</a>
                            </div>
                        </template>
                    </div>
                </div>
                <goTopComponent></goTopComponent>
            </div>


        </div>
        <!--添加书签收藏网址到桌面提示语(安卓)-->
        <!--<div class="ts fw p-30 fixed-bottom mb-100" v-if="!mobileType" v-show="first">-->
        <!--<div class="messgae_and border fw px-20 py-15 bg-fff">-->
        <!--<span class="fl close" @click="tipClose"></span>-->
        <!--<span class="fl logo_index ml-20"></span>-->
        <!--<span class="f28 fr font_ts pt-10 color-000">添加书签或收藏网址可一键快速访问！ 点击菜单按钮，再点“添加书签或收藏 网址”。</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--添加书签收藏网址到桌面提示语(苹果)-->
        <!--<div class="ts fw p-30 fixed-bottom mb-30" v-if="mobileType" v-show="first">-->
        <!--<div class="messgae_and border fw px-20 py-15 bg-fff">-->
        <!--<span class="fl close" @click="tipClose"></span>-->
        <!--<span class="fl logo_index ml-20"></span>-->
        <!--<span class="f28 fr font_ts pt-20 color-000">添加到手机屏幕可一键访问！点击下方 <img src="~images/Icon/ios_sc.png"> 再点“添加到主屏幕”。</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--消息弹窗-->
        <div class="dialog-box bg-fff" id="dialog_show" ref="dialog-box" v-show="dialogBoxShow">
            <div class="dialog-main">
                <div class="dialog-message px-30 pt-15">
                    <li class="pt-30 text-center f36 color-000">最新消息</li>
                    <ul v-for="(item,index) in msgList">
                        <a @click="deleteMsg(1)">
                            <li class="py-30 fw">
                                <div class="fw">
                                    <div class="tile f30 color-000 fl" style="width:85%;"><i class="fontarial">{{msgHeadList[index]}}{{msgBodyList[index]}}{{item.title}}</i>，{{moreMsgList[index]}}。
                                    </div>
                                    <span class="fr fwright"></span>
                                </div>
                                <div class="see f24 color-999 fw"><span class="fr fontarial" href="#">{{fTime(item.messageTime)}}</span>{{orderMsg}}
                                </div>
                            </li>
                        </a>
                    </ul>
                </div>

                <div class="dialog-foot">
                    <a class="dialog_close border-right f36" @click='deleteMsg'>关闭</a>
                    <a class="dialog_close f36" @click="deleteMsg(1)">我的消息中心</a>
                </div>
            </div>
        </div>
        <div class="dialog_cover" v-show="dialogBoxShow"></div>
        <!-- foot lock -->
        <div ref="footer">
            <FooterComponent :active="'home'"></FooterComponent>
        </div>
    </div>
</template>

<script>
    import goTopComponent from "components/common/GoTop.vue"
    import FooterComponent from "components/Footer.vue"
    import {mapState, mapGetters, mapActions} from 'vuex';
    export default {
        data() {
            return {
                //浏览器获得的参数
                listQueryData: {},
                menuQueryData: {},
                //需要传给下个页面的参数
                postData: {},
                //从服务端获得的游戏列表，菜单列表,点首字母获得的列表
                gameList: [],
                gameList1: [],
                gameList2: [],
                menuList: [],
                isHotActive: true,
                menuIndex: -1,
                //显示列表
                selectGameType: 1,
                displayList: [],
                displayIndex: 1,
                displaySize: 60,
                //loadmore 组件使用
                allLoaded: false,
                swiperOption: {
                    autoplay: 0,
                    freeMode: true,
                    pagination: '.swiper-pagination',
                    slidesPerView: 4,
                },
                finishFirstLoad: false,
                //样式
                isLetterFixed: false,
                tabTop: 0,
                tabHeight: 0,
                fixLetterHeight: 0,
                scrollTop: 0,
                //消息推送
                mobileType: false,
                first: true,
                dialogBoxShow: false,
                msgList: [],
                msgHeadList: [],
                msgBodyList: [],
                msgTime: '',
                moreMsgList: [],
                orderMsg:'订单消息'
            }
        },
        components: {
            goTopComponent,
            FooterComponent,
        },
        created: function () {
            this.getGameType();
            this.setDefaultValues();
            this.isIos();
            this.isFirst();
        },
        mounted: function () {
            this.getGameList();
            this.getMenuList();
            this.getMsgList();
            this.getislogin();
        },
        watch: {
            scrollTop: {
                handler: function (val, oldVal) {
                    let self = this;
                    self.tabHeight = this.$getScreenHeight() - self.$refs.tab.getBoundingClientRect().top - self.$refs.footer.getBoundingClientRect().height - 1;
                    self.tabHeight = self.tabHeight > self.fixLetterHeight ? self.fixLetterHeight : self.tabHeight;

                    if (val > self.tabTop) {
                        self.isLetterFixed = true;
                    }
                    else {
                        self.isLetterFixed = false;
                    }

                    if (self.$isBottom(200) && !self.allLoaded) {

                        self.loadBottom();
                    }
                },
                deep: true
            }
        },
        methods: {
            indexGMClick(){
                // this.$getAccount().then(account=>{
                //     if(account){
                //         sa.login(account.pcUserId);
                //         sa.incrementProfile({gnamName: 1});
                //         sa.quick('autoTrack');  
                //     }else{
                //         sa.incrementProfile({gnamName: 1});
                //         sa.quick('autoTrack');   
                //     }
                // });
            },
            ...mapActions({
                getislogin: 'common/COMMON_ISLOGIN'
            }),
            setDefaultValues: function () {
                let self = this;

                self.listQueryData.gameType = self.selectGameType;
                self.listQueryData.pageIndex = 1;
                self.listQueryData.pageSize = 9999;

                self.menuQueryData.gameType = self.selectGameType;
                self.$bus.emit('headerText', self.$route.query.tName);

            },
            watchGoTop: function () {
                var self = this;
                window.addEventListener('scroll', function () {
                    self.scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
                });
            },
            calHeights: function () {
                let self = this;
                this.tabTop = this.$refs.tab.getBoundingClientRect().top - this.$refs.header.getBoundingClientRect().height;
                this.tabHeight = this.$getScreenHeight() - this.$refs.tab.getBoundingClientRect().top - this.$refs.footer.getBoundingClientRect().height - 1;
                this.fixLetterHeight = this.$getScreenHeight() - this.$refs.header.getBoundingClientRect().height - this.$refs.footer.getBoundingClientRect().height - 1;
            }
            ,
            getGameList: function () {
                let self = this;

                self.$http.get(self.$CONSTANTS.APICategory + 'category/searchgamelistbytype', {
                    params: self.listQueryData,
                }).then(function (response) {
                    if (response.data && response.data.responseStatus.code == "00" && response.data.categoryList &&
                        response.data.categoryList.length > 0) {
                        self.gameList = response.data.categoryList;

                        if (self.listQueryData.gameType == 1) {
                            self.gameList1 = self.gameList;
                        }
                        else {
                            self.gameList2 = self.gameList;
                        }
                    }
                }).then(function (response) {
                    self.$nextTick(function () {
                        self.finishFirstLoad = true;
                        self.calHeights();
                        self.watchGoTop();
                        self.checkHot();
                    });
                }), (function (response) {
                })
            }
            ,
            getMenuList: function () {
                let self = this;

                self.$http.get(self.$CONSTANTS.APICategory + 'category/getgamepy', {
                    params: self.menuQueryData,
                }).then
                (function (response) {
                    if (response.data && response.data.responseStatus.code == "00") {
                        self.menuList = response.data.py;
                        if (self.menuQueryData.gameType == 1) {
                            self.menuList1 = self.menuList;
                        }
                        else {
                            self.menuList2 = self.menuList;
                        }
                    }
                });
            }
            ,
            nextPage: function (item) {
                let self = this;

                if (self.selectGameType == 1) {
                    self.$router.push({
                        name: "ChooseClass",
                        query: {
                            gid: item.catagoryId,
                            mainGid: item.mainCatagoryId,
                            gname: item.name,
                            gameType: item.type,
                            type: 'special'
                        },
                    })
                }
                else {
                    if (_hmt) _hmt.push(['_trackPageview', `/vue/mobile-game/goods-list/${item.catagoryId}/${item.name}/2`]);
                    self.$router.push({
                        name: "MobileGameList",
                        params: {
                        gameId: item.catagoryId,
                        gameName: item.name,
                        goodsType: 2
                    }
                  })
                }
            }
            ,
            checkHot: function () {
                let self = this;
                self.isHotActive = true;
                self.allLoaded = false;
                self.displayList = [];
                self.displayIndex = 1;
                self.$refs.tabLetter.scrollTop = 0;
                if (self.selectGameType == 1) {
                    self.gameList = self.gameList1;
                    self.menuList = self.menuList1;
                }
                else {
                    self.gameList = self.gameList2;
                    self.menuList = self.menuList2;
                }

                self.updateDisplayList();
                self.$nextTick(function () {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                });
            }
            ,
            checkMenu: function (item, index) {
                let self = this;
                self.isHotActive = false;
                self.allLoaded = true;
                self.displayList = [];
                self.displayIndex = 1;
                self.menuIndex = index;
                self.updateDisplayListByFirst(item);
                self.$nextTick(function () {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                });
            }
            ,
            loadBottom()
            {
                let self = this;
                self.displayIndex++;
                self.updateDisplayList();
            }
            ,
            updateDisplayList: function () {
                let self = this;

                let max = self.displayIndex * self.displaySize < self.gameList.length ? self.displayIndex * self.displaySize :
                    self.gameList.length;
                for (let i = (self.displayIndex - 1) * self.displaySize; i < max; i++) {

                    self.displayList.push(self.gameList[i]);
                }

                if (max == self.gameList.length) {
                    self.allLoaded = true;
                }

            }
            ,
            updateDisplayListByFirst: function (item) {
                let self = this;
                for (let i = 0; i < self.gameList.length; i++) {
                    if (self.gameList[i].pyfirst.toUpperCase() == item)
                        self.displayList.push(self.gameList[i]);
                }
            }
            ,
            changeGameType: function (gameType) {
                let self = this;
                if (!self.finishFirstLoad || self.selectGameType == gameType)
                    return false;
                self.selectGameType = gameType;
                self.setGameType();
                if (self.gameList1.length == 0 || self.gameList2.length == 0) {
                    self.menuQueryData.gameType = self.selectGameType;
                    self.listQueryData.gameType = self.selectGameType;
                    self.displayList = [];
                    self.finishFirstLoad = false;
                    self.getMenuList();
                    self.getGameList();
                    self.$nextTick(function () {
                        self.checkHot();
                    });
                }
                else {
                    self.checkHot();
                }
            }
            ,
            goSearchAll: function () {
                this.$router.push({
                    name: "SearchAll",
                    query: {type: 'special'}
                })
            },
            isIos: function () {
                //alert(navigator.userAgent);
                if (navigator.userAgent.indexOf("Safari") > 0 && navigator.userAgent.indexOf("iPhone") > 0 && navigator.userAgent.indexOf("MQQBrowser") < 0 && navigator.userAgent.indexOf("CriOS") < 0 && navigator.userAgent.indexOf("FxiOS") < 0) {
                    this.mobileType = true;
                } else {
                    this.mobileType = false;
                }
            },
            tipClose: function () {
                this.first = false;
            },
            isFirst: function () {
                var date = new Date;
                var nowDate = date.getDate();

                if (!this.$isLocalStorageSupported()) {
                    this.first = true;
                }
                else if (localStorage.getItem('first') && nowDate == parseInt(localStorage.getItem('first'))) {
                    this.first = false;
                } else {
                    setTimeout(() => {
                        this.first = false;
                    }, 10000);
                    localStorage.setItem('first', nowDate);
                }
            },
            getMsgList: function () {
                let self = this;
                self.$http.get(self.$CONSTANTS.APIGoods + 'message/selectmessageindexlist', {
                    headers: {
                        "Cache-Control": "no-cache"
                    },
                    params: {
                        page: 0,
                        pageSize: 3
                    }
                }).then
                (function (res) {
                    if (res.data && res.data.responseStatus.code == "00") {
//                        console.log(res.data)
                        if (res.data.totalCount > 0) {
                            self.msgList = res.data.messageStatisEOList;
                            for (var i = self.msgList.length - 1; i >= 0; i--) {
                                if (self.msgList[i].isSeller == true) {
                                    if (self.msgList[i].msgType == 11 || self.msgList[i].msgType == 12 || self.msgList[i].msgType == 14) {
                                        var msgTitle;
                                        if (self.msgList[i].msgType == 11) {
                                            msgTitle = '投诉'
                                        } else if (self.msgList[i].msgType == 12) {
                                            msgTitle = '建议'
                                        } else if (self.msgList[i].msgType == 14) {
                                            msgTitle = '咨询'
                                        }
                                        self.msgHeadList.unshift(`您的${msgTitle}`);
                                    } else {
                                        self.msgHeadList.unshift("您发布的");
                                    }
                                } else {
                                    if (self.msgList[i].msgType == 11 || self.msgList[i].msgType == 12 || self.msgList[i].msgType == 14) {
                                        var msgTitle;
                                        if (self.msgList[i].msgType == 11) {
                                            msgTitle = '投诉'
                                        } else if (self.msgList[i].msgType == 12) {
                                            msgTitle = '建议'
                                        } else if (self.msgList[i].msgType == 14) {
                                            msgTitle = '咨询'
                                        }
                                        self.msgHeadList.unshift(`您的${msgTitle}`);
                                    } else {
                                        self.msgHeadList.unshift("您购买的");
                                    }
                                }
                                ;
                                if (self.msgList[i].msgType == 1) {
                                    self.msgBodyList.unshift("商品")
                                } else if (self.msgList[i].msgType == 2) {
                                    self.msgBodyList.unshift("订单")
                                }
                                if (self.msgList[i].oppState == 10) {
                                    if (self.msgList[i].msgType == 11 || self.msgList[i].msgType == 12 || self.msgList[i].msgType == 14) {
                                        self.moreMsgList.unshift("客服已回复，请您点击消息查看")
                                        self.orderMsg='回复时间'
                                    }else{
                                        self.moreMsgList.unshift("正在交易中")
                                    }
                                } else {
                                    self.moreMsgList.unshift(self.msgList[i].msg)
                                }
//                                this.msgHeadList.push(this.msgList.isSeller);
//                                this.msgBodyList.push(this.msgList.msgType);
                            }
                            self.dialogBoxShow = true;
                        } else {
                            self.dialogBoxShow = false;
                        }

                    } else {
                        // alert();
                        self.dialogBoxShow = false;
                    }
                });
            },
            fTime: function (e) {
                var date = new Date(parseInt(e))
                var year = date.getFullYear()
                var month = date.getMonth() + 1
                var day = date.getDate()
                var hours = date.getHours()
                var min = date.getMinutes()
                var time = year + "年" + month + "月" + day + "日" + hours + "时" + min + "分";
                return time
            },
            async deleteMsg(n) {
                let self = this;
                await self.delmsg()
                self.dialogBoxShow = false;
                if (n === 1) {
                    location.href = '/vue/message'
                }

            },
            delmsg() {
                return new Promise((resolve, reject) => {
                    this.$http.get(this.$CONSTANTS.APIGoods + 'message/deletemessageindexlist', {}).then(
                        res => {
                            if (res.body.success) {
                                resolve()
                            } else {
                                resolve()
                            }
                        },
                        err => {
                            reject()
                            console.log(err);
                        }
                    )
                })
            },
            setGameType(){
                if (this.$isLocalStorageSupported()) {
                    sessionStorage.setItem("homeGameType", JSON.stringify(this.selectGameType));
                }
            },
            getGameType(){
                if (this.$isLocalStorageSupported() && JSON.parse(sessionStorage.getItem("homeGameType"))) {
                    this.selectGameType = parseInt(sessionStorage.getItem("homeGameType"));
                }
            }
        }
        ,
    }
</script>

<style src="css/search/search-game-cl.css" scoped></style>
<style src="css/index-cl.css" scoped></style>
<style scoped>
    .swiper-container3 {
        white-space: nowrap;
        width: 100% !important;
        padding: 0;
    }

    .swiper-container3 .swiper-slide {
        display: inline-block;
        width: 20% !important;
    }

    .swiper-container3 .swiper-wrapper {
        width: 100%;
        margin-top: 0.96rem;
        padding: 0.3rem 0;
        height: auto;
    }

    .search-game img {
        margin: auto;
    }

    .home {
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        width: 100%;
        height: auto;
        max-width: 768px;
    }

    .search-game .tab {
        display: block;
        overflow: hidden;
        height: auto;
        position: relative;
    }

    .search-game .tab-letter {
        overflow-y: auto;
        padding-bottom: 2.3rem;
        position: absolute;
        display: block;
        overflow-x: hidden;
    }

    .search-game .tab-class01 {
        margin-bottom: 0 !important;
        background-color: white;
    }

    .search-game .tab-letter-relative {
        position: relative;
    }

    .search-game .tab-letter-fixed {
        position: fixed !important;
        top: .96rem;
        overflow-y: auto;
    }

    .search-game .tab-body {
        background-color: #f1f1f1;
    }
    .search-game ul li{
        padding:0;
    }
    .search-game ul li {
        padding: 0;
    }

    .index-header {
        z-index: 20;
    }

    .index-header .index-header-search {
        width: 59%;
        float: left;
    }

    .index-header .index-header-search .text-input {
        background: #fff;
        padding-left: 0;
        text-align: center;
        width: 100%;
    }

    .index-header .index-header-search .text-input span {
        display: inline-block;
        background: url(/dist/search4.png?f1c7c4fe050302588bbeed8011ab1ff2) no-repeat left center;
        background-size: .33rem;
        height: 0.72rem;
        padding-left: 0.45rem;
    }

    .dialog_cover {
        position: fixed;
        _position: absolute;
        left: 0;
        top: 0;
        display: block;
        z-index: 555;
        width: 100%;
        height: 100%;
        filter: alpha(opacity=70);
        opacity: 0.7;
        background: #000;
    }

    #dialog_show {
        left: 50%;
        margin-left: -3.6rem;
        opacity: 1;
        top: 3rem;
        /*transform: translate3d(-50%, 0, 0);*/
        position: fixed;
        width: 7.2rem;
        z-index: 1001;
        display: block;
    }

    .see {
        height: 0.48rem;
        line-height: 0.68rem;
    }

    .dialog-message {
        height: auto;
        display: block;
        overflow: hidden;
    }

    .fwright {
        display: block;
        background: url(~images/kefu/right.png) right center no-repeat;
        height: .5rem;
        width: .13rem;
        background-size: .13rem;
    }

    .fw > .tile {
        width: 95% !important;
    }

</style>

<style>
    #BackToTop {
        bottom: 1.2rem !important;
    }
</style>
