<template id="entry">
    <div class="game-list bg-fff border-top fw" :style="{ 'min-height': tabHeight + 'px'}">
        <!-- 游戏 -->
        <div class="tab-panel active" :style="{ 'min-height': tabHeight + 'px'}">
            <!-- 列表显示 -->
            <div class="tab-class01" :style="{ 'height': tabHeight + 'px'}" :class="tbcls" ref="gameTab">
                <ul>
                    <li v-for="item in list" @click="goList(item)">
                    <span>
                    <img :src="item.gameImageUrl"></span>
                        <p>{{item.name}}</p>
                    </li>
                    <div v-show="list.length==0 && loading" style="height: 100vh">
                        <div class="preloader-indicator-modal" style=" "><span
                                class="preloader preloader-white"></span></div>
                    </div>
                </ul>
            </div>
            <div class="tab-letter" :class="{'tab-letter-fixed': isLetterFixed }"
                 :style="{ 'height': tabHeight + 'px'}">
                <a @click="clickHot" :class="{active:active === ''}"><span
                        class="hot-img"></span></a>
                <a v-for="(item,index) in pyList" @click="clickPy(item)"
                   :class="{active:active === item}">
                    {{item}}
                </a>
            </div>
        </div>
        <go-top :controlId="controlId"></go-top>
    </div>
</template>

<script type="text/ecmascript-6">
    import goTop from "components/common/GoTop.vue"
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default{
        template: '#entry',
        data(){
            return {
                isLetterFixed: false,
                tabTop: 0,
                pageIndex: 1,
                pageSize: 36,
                loading: false,
                controlId: 'gameTab',
                clear: false,
                tbcls: 'tab-scroll'
            }
        },
        components: {
            goTop,
        },
        props: ['tabHeight', 'goodsType'],
        watch: {
            pageStatus(status) {
                var self = this
                if (status === 'loadall') {
                    self.loading = false
                } else {
                    self.loading = true
                }
                if (status === 'loadclose') {
                    self.pageIndex++
                    self.showGamePage({
                        pageIndex: self.pageIndex,
                        pageSize: self.pageSize
                    })
                    if (self.pageStatus != 'loadall') {
                        self.setPageStatus('loadopen')
                    }
                }
            },
            errMsg (msg) {
                if (msg && Object.keys(msg).length > 0) {
                    this.$messagebox({
                        title: '提示',
                        message: msg.message,
                        closeOnClickModal: false
                    }).then(()=> {
                        this.clearErr()
                        location.href = msg.returnUrl
                    })
                } else {
                    if (document.getElementsByClassName("mint-msgbox-wrapper").length > 0) {
                        this.$messagebox.close()
                    }
                }
            },
            loadScrollPosition (willLoadScrollPosition) {
                if (willLoadScrollPosition === 'hot') {
                    this.$nextTick(() => {
                        this.$refs.gameTab.scrollTop = this.scrollPosition
                    })
                }
            },
        },
        computed: {
            ...mapState({
                list: state => {
                    return state.choice.pageList
                },
                pyList: state => {
                    return state.choice.pyList
                },
                pageStatus: state => {
                    return state.choice.pageStatus
                },
                scrollPosition: state => {
                    return state.choice.scrollPosition
                },
                loadScrollPosition: state => {
                    return state.choice.loadScrollPosition
                },
                gameListPy: state => {
                    return state.choice.gameListPy
                },
                active: state => {
                    return state.choice.activeLetter
                },
                errMsg: state => {
                    return state.choice.errMsg
                },
                warnMsg: state => {
                    return state.choice.warnMsg
                },
            })
        },
        created: function () {
            if (this.pyList.length === 0) {
                this.getPyList({
                    gameType: 1,
                    goodsTypeId: this.goodsType
                })
                this.getPyList({
                    gameType: 2,
                    goodsTypeId: this.goodsType
                })
            }
            if (this.list.length === 0) {
                this.setDefaultPage()
            } else {
                if (this.loadScrollPosition === 'hot') {
                    this.$nextTick(() => {
                        this.$refs.gameTab.scrollTop = this.scrollPosition
                    })
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.listScroll('gameTab')
            });
        },
        methods: {
            listScroll(scrollContainer) {
                var self = this
                let container = self.$refs[scrollContainer]

                if (container.scrollHeight <= self.tabHeight) {
                    self.pageIndex++
                    self.showGamePage({
                        pageIndex: self.pageIndex,
                        pageSize: self.pageSize
                    })
                }
                container.addEventListener('scroll', function () {
                    if (self.loadScrollPosition === 'hot') {
                        self.saveScrollPosition(this.scrollTop)
                        if (self.pageStatus != 'loadall') {
                            self.loading = true
                        }
                    }
                    if (this.scrollHeight - this.scrollTop - self.tabHeight < 500 && self.pageStatus === 'loadopen' && self.loadScrollPosition === 'hot') {
                        self.setPageStatus('loadclose')
                    }
                })
            },
            goList(item) {
              if (item.type == 2 && parseInt(this.$route.query.goodsType) === 2) {
                  this.$router.push({
                      name: "MobileGameList",
                      params: {
                          gameId: item.catagoryId,
                          gameName: item.name,
                          goodsType: this.goodsType
                      }
                  })
                  return false;
              }
              switch (item.type) {
                  case '1':
                    if (this.goodsType==2) {
                      this.$router.push({
                          name: "PcGoodsList",
                          params: {
                              gameId: item.catagoryId,
                              gameName: item.name,
                              goodsType: this.goodsType
                          }
                      })
                    } else if(this.goodsType==1) {
                      this.$router.push({
                        name:'EquipmentList',
                        params:{
                          gameId:item.catagoryId,
                          gameName:item.name,
                          goodsType:this.goodsType
                        }
                      })
                    } else {
                      this.$router.push({
                          path: '/vue/search/searchArea',
                          query: {
                              gameId: item.catagoryId,
                              gName: item.name,
                              gameType: item.type,
                              goodsType: this.goodsType
                          }
                      })
                    }
                      break;
                  case '2':
                      this.$router.push({
                          path: '/vue/search/searchPlatForm',
                          query: {
                              gameId: item.catagoryId,
                              gName: item.name,
                              gameType: item.type,
                              goodsType: this.goodsType
                          }
                      })
                      break;
                  default:

              }
                // if (parseInt(this.$route.query.goodsType) === 3) {
                //     if (parseInt(item.type) === 1) {
                //         location.href = '/search/search-game-area.html?gid=' +
                //                 item.catagoryId + '&gname=' +
                //                 item.name + '&gameImageUrl=&goodsType=3&typename=游戏币'
                //     }
                //     if (parseInt(item.type) === 2) {
                //         location.href = '/search/search-ptyys.html?gid=' +
                //                 item.catagoryId + '&gname=' +
                //                 item.name + '&gameImageUrl=&goodsType=3&typename=游戏币'
                //     }
                // } else {
                //     switch (item.type) {
                //         case '1':
                //             this.$router.push({
                //                 path: '/vue/search/searchArea',
                //                 query: {
                //                     gameId: item.catagoryId,
                //                     gName: item.name,
                //                     gameType: item.type,
                //                     goodsType: this.goodsType
                //                 }
                //             })
                //             break;
                //         case '2':
                //             this.$router.push({
                //                 path: '/vue/search/searchPlatForm',
                //                 query: {
                //                     gameId: item.catagoryId,
                //                     gName: item.name,
                //                     gameType: item.type,
                //                     goodsType: this.goodsType
                //                 }
                //             })
                //             break;
                //         default:
                //
                //     }
                // }
            },
            async setDefaultPage() {
                this.loading = true
                await this.searchGameList({
                    pageIndex: 1,
                    pageSize: 5000,
                    isShowInHome: true,
                    goodsType: this.goodsType
                })
                this.showGamePage({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                })
                this.loading = false
            },
            clickPy(item) {
                this.loading = false
                this.searchGameListPy(item)
                this.$nextTick(()=> {
                    this.$refs.gameTab.scrollTop = 0
                    if (parseInt(this.$refs.gameTab.scrollHeight - this.tabHeight) < 2) {
                        this.tbcls = 'tab-visible'
                    } else {
                        this.tbcls = 'tab-scroll'
                    }
                })
            },
            clickHot() {
                this.tbcls = 'tab-scroll'
                this.getGameList()
            },
            ...mapActions({
                // 映射 this.searchGameList() 为 this.$store.dispatch('account/SEARCH_GAMELIST')
                searchGameList: 'choice/SEARCH_GAMELIST',
                getPyList: 'choice/GET_GAMEPY',
                clearErr: 'choice/CLEAR_ERR',
                searchGameListPy: 'choice/GET_GAMELIST_PY',
                getGameList: 'choice/GET_GAMELISTHOT',
                showGamePage: 'choice/SHOWGAMEPAGE',
                setPageStatus: 'choice/SET_PAGESTATUS',
                saveScrollPosition: 'choice/SAVE_SCROLLPOSITION'
            })
        },
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>
    body {
        -webkit-overflow-scrolling: touch
    }

    .game-list .tab-panel {
        display: block;
        overflow: hidden;
        height: auto;
        position: relative;
    }

    .game-list .tab-class01 ul li {
        height: 2.27rem !important;
    }

    .tab-scroll {
        overflow: auto;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch
    }

    .tab-visible {
        overflow: visible;
    }

    .game-list .tab-letter {
        z-index: 19 !important;
    }
</style>
