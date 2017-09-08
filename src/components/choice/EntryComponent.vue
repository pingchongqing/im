<template id="entry">
    <div class="game-list bg-fff border-top fw">
        <!-- 游戏 -->
        <div class="tab-panel active" :style="{ 'min-height': tabHeight + 'px'}">
            <!-- 列表显示 -->
            <div class="tab-class01"  ref="gameTab">
                <ul>

                    <li v-for="item in list">
                      <router-link  :to="{name:'ChooseClass', query:{gid:item.catagoryId,gname:item.name,gameType: item.type} ,type:'special'}">
                                <span>
                                <img :src="item.gameImageUrl"></span>
                        <p>{{item.name}}</p>
                        </router-link>
                    </li>

                </ul>
            </div>
            <div class="tab-letter" :class="{'tab-letter-fixed': isLetterFixed }" >
                <a @click="getGameList" :class="{active:active === ''}"><span
                        class="hot-img"></span></a>
                <a v-for="(item,index) in pyList" @click="searchGameListPy(item)"
                   :class="{active:active === item}">
                    {{item}}
                </a>
            </div>
        </div>
        <loadingComponent></loadingComponent>
        <goTopComponent></goTopComponent>
    </div>
</template>

<script >
    import goTopComponent from "components/common/GoTop.vue"
    import loadingComponent from "components/common/Loading.vue"
    import { mapState, mapGetters, mapActions } from 'vuex'
    import Debounce from 'lodash.debounce'
    export default{
        template: '#entry',
        data(){
          return {
            isLetterFixed: false,
            tabTop: 0,
            pageIndex: 1,
            pageSize: 20
          }
        },
        components: {
            goTopComponent,
            loadingComponent
        },
        props: ['tabHeight', 'goodsType'],
        watch: {
          errMsg (msg) {
            if (msg && Object.keys(msg).length > 0) {
              this.$messagebox({
                title: '提示',
                message: msg.message,
                closeOnClickModal: false
              }).then(()=>{
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
            if (willLoadScrollPosition) {
              this.$nextTick(() => {
                this.$refs.gameTab.scrollTop = this.scrollPosition
              })
            } else {
              this.$refs.gameTab.scrollTop = 0
            }
          }
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
          this.getPyList({
            gameType:1,
            goodsTypeId:2
          })
          if (this.list.length===0){
            this.setDefaultPage()
          } else {
            if (this.loadScrollPosition){
              this.$nextTick(() => {
                this.$refs.gameTab.scrollTop = this.scrollPosition
              })
            }
          }
        },
        mounted: function () {
          this.$nextTick(function () {
              this.listScroll('gameTab');
          });
        },
        methods: {
          listScroll(scrollContainer) {
            var self = this
            let container = self.$refs[scrollContainer]
            container.addEventListener('scroll', Debounce(function () {
              if (self.loadScrollPosition) {
                self.saveScrollPosition(this.scrollTop)
              }
              if (this.scrollHeight - this.scrollTop - self.tabHeight < 250 && self.pageStatus==='loadopen' && self.loadScrollPosition) {
                self.setPageStatus('loadclose')
                self.pageIndex++
                self.showGamePage({
                  pageIndex: self.pageIndex,
                  pageSize: self.pageSize
                })
                if (self.pageStatus != 'loadall') {
                  self.setPageStatus('loadopen')
                }
              }
            }, 150))
          },
          goList(item) {
            switch (item.type) {
              case '1':
                this.$router.push({
                  path:'/vue/search/searchArea',
                  query:{
                    gameId: item.catagoryId,
                    gName: item.name,
                    goodsType: this.goodsType
                  }
                })
                break;
              case '2':
                this.$router.push({
                  path:'/vue/search/searchPlatForm',
                  query:{
                    gameId: item.catagoryId,
                    gName: item.name,
                    goodsType: this.goodsType
                  }
                })
                break;
              default:

            }

          },
          async setDefaultPage() {
            await this.searchGameList({
              pageIndex: 1,
              pageSize: 9999,
              isShowInHome: true,
              goodsType: this.goodsType
            })
            this.showGamePage({
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            })
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

    .game-list .tab-panel {
        display: block;
        overflow: hidden;
        height: auto;
        position: relative;
    }
    .tab-class01 {
      overflow-y: scroll;
      overflow-x: hidden;
    }


    .game-list .tab-letter {
        overflow-y: auto;
        padding-bottom: 1rem;
        z-index: 19 !important;
        position: absolute;
        display: block;
        overflow-x: hidden;
        height: 100%;
    }

    .game-list .tab-letter-relative {
        position: relative;
    }

    .game-list .tab-letter-fixed {
        position: fixed !important;
        top: .96rem;
        overflow-y: auto;
    }
</style>
