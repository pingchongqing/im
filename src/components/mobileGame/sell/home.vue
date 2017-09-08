<template>
  <div id="wrapper" style="height:100%">
    <div style="width: 3rem;" ref="width_3rem">
    </div>
    <!--填补fixed的块-->
    <div class="fixedspace"></div>
    <div class="fixedspace"></div>
    <!-- top -->
    <div class="top-header fixed-top border-bottom" style="z-index:61;">
      <div class="top-back">
        <a href="JavaScript:history.go(-1)"></a>
      </div>
      <h2 class="f36">我要卖</h2>
      <div class="top-right"></div>
    </div>
    <!---------------------------- 历史浏览记录 ---------------------------->
    <!--搜索区服-->
    <div class="search-container bg-c9c fixed-top" style="margin-top: .97rem;z-index:61;" @click="goSearchGame">
      <div class="new-search border-radius bg-fff text-center color-999 ">
        <span class="span-icon-fdx f30 clearfix"><span>搜索游戏</span></span>
      </div>
    </div>
    <!-- 游戏列表 -->
    <div class="search-game new-search-game">
      <div class="tab">
        <div class="tab-head border-top">
          <ul class="tab-nav">
            <li :class="{active: type !== CLIENT_GAME}" @click="changeType(MOBILE_GAME)">
              <router-link class="sj" :to="{name: 'MGSellHome', params: {type: MOBILE_GAME}}" replace>手游</router-link>
            </li>
            <li :class="{active: type === CLIENT_GAME}" @click="changeType(CLIENT_GAME)">
              <router-link class="dn" :to="{name: 'MGSellHome', params: {type: CLIENT_GAME}}" replace>端游</router-link>
            </li>
          </ul>
        </div>
        <div class="tab-body">
          <div class="tab-panel active">
            <div class="tab-class01 new-sell-game-list">
              <v-infinite :dataArr="gameList" :started="infiniteStart" :updateBottom="updateBottom"
                          :pageCount="pageCount">
                <ul style="background-color: white" ref="gameListUl">
                  <li
                     v-for="item in gameList">
                    <router-link :to="{name:'goodsPublish', query:{game_id:item.catagoryId,game_name:item.name,
                        game_type: item.type,mainCatagoryId:item.mainCatagoryId} }">
                      <center><img :src="item.gameImageUrl" @load="imgLoaded($event)"></center>
                      <p>{{item.name}}</p></router-link>
                  </li>
                  <div style="clear: both"></div>
                </ul>
              </v-infinite>
            </div>
            <div
               ref="pyListDiv"
               class="tab-letter fixed" :style="{height: pyHeight + 'px', right: pyRight + 'px'}"
                 style="padding-bottom: 2.3rem"
                 :class="{'py-fixed': pyFixed}">
              <a href="JavaScript:void(0)" :class="{active: pyFirst === 'hot'}" @click="changePyFirst('hot')"><span
                 class="hot-img"></span></a>
              <a href="JavaScript:void(0)" :class="{active: pyFirst === item}" @click="changePyFirst(item)"
                 v-for="item in gamePyList">{{item}}</a>
              <div class="letter-bottom"></div>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </div>
    <v-go-top></v-go-top>
  </div>
</template>

<script>
  import Infinite from '../common/infinite_scroll.vue'
  import {mapActions} from 'vuex'
  import goTopComponent from 'components/common/GoTop.vue'

  export default {
    data() {
      return {
        CLIENT_GAME: '1',
        MOBILE_GAME: '2',
        infiniteStart: false, // 用于表示父组件第一次加载是否结束，以及决定是否重启启动列表
        pyFirst: 'hot', // 右侧栏位的选择
        pageIndex: {
          '1': 1,
          '2': 1
        },
        historyPyFirst: {
          '1': 'hot',
          '2': 'hot'
        }, // 用于区分端游和手游的首字母
        historyPyScrollTop: { // 用于保存字母菜单浏览的位置
          '1': 0,
          '2': 0
        },
        pyFixed: false, // 是否固定右侧
        pyHeight: 0, // 真实高度
        pyHeightStart: 0, // 初始高度
        pyRight: null, // 宽屏往左移动
        gameList: [], // 游戏列表
        gamePyList: [], // 游戏首拼列表
        type: null, // 1是端游 2是手游
        fromName: '', // 上个页面的路由名
        scrollTop: 0,
        timeStamp: -1, // 存储时间戳
        timeoutControl: null,
        saveData: this.$store.state.mobileGame.saveSellHomeDate,
        screenHeight: window.screen.availHeight
      }
    },
    computed: {
      pageCount() {
        return this.type ===  this.CLIENT_GAME ? 36 : 36
      }
    },
    components: {
      'v-go-top': goTopComponent,
      'v-infinite': Infinite
    },
    mounted() {
      /* 当刷新页面时，先置顶 */
      window.onbeforeunload = () => {
        this.showGoodsList = false
        this.leave = true
        window.scrollTo(0, 1);
      }
      this.$refs['pyListDiv'].addEventListener('scroll', this.pyScroll)
      window.addEventListener('scroll', this.scroll)
      window.addEventListener('resize', this.scroll)
      this.initPy()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fromName = from.name
      })
    },
    beforeDestroy() {
      let save = {
        historyPyScrollTop: this.historyPyScrollTop,
        historyPyFirst: this.historyPyFirst,
        pyFirst: this.pyFirst,
        gameList: this.gameList,
        gamePyList: this.gamePyList,
        scrollTop: this.scrollTop
      }
      this.$store.commit('saveSellHomeDate', save)
      window.removeEventListener('scroll', this.scroll) // 销毁滚动监听
      window.removeEventListener('resize', this.scroll)
      this.$refs['pyListDiv'].removeEventListener('scroll', this.pyScroll)
    },
    watch: {
      fromName() {
        this.init()
      }
    },
    directives: {
      'set-top': {
        /* 在插入到页面后，给该元素添加 data-top属性，属性值为当前元素的 offsetTop */
        inserted: function (ele) {
          ele.setAttribute('data-top', ele.offsetTop)
        },
      }
    },
    methods: {
      /* init */
      init() {
        if (Number(this.$route.params.type) === this.CLIENT_GAME) this.type = this.CLIENT_GAME
        else this.type = this.MOBILE_GAME
        const defaultGameType = this.defaultGameType()
        if (defaultGameType !== undefined) { // 防止游戏类型为 0（目前只有1和2），为了统一管理游戏类型，此处禁止 if(defaultGameType)
          this.type = defaultGameType
        }
        this.$store.commit('clearSaveSellHomeData')
        if (this.saveData && (this.fromName === 'goodsPublish' || this.fromName === 'SearchAll')) {
          for (let key in this.saveData) {
            if(key !== 'gameList')
              this[key] = this.saveData[key]
          }
          this.$nextTick(() => {
            setTimeout(() => {
              this.gameList = this.saveData['gameList']
              this.$nextTick(() => {
                document.body.scrollTop = Number(this.saveData.scrollTop)
                this.$refs['pyListDiv'].scrollTop = this.historyPyScrollTop[this.type]
                this.infiniteStart = true // 标记第一次请求已经结束
                this.lazy()
              })
            }, 10)
          })
        } else {
          this.$nextTick(() => {
            setTimeout(() => {
              this.getList(this.type)
            }, 10)
          })
        }
      },
      /* 搜索游戏框点击 */
      goSearchGame() {
        this.$router.push({
          name: "SearchAll",
          query: {type: 'seller'}
        })
      },
      /* 右侧栏位改变选中 */
      changePyFirst(key) {
        if (this.pyFirst === key) return
        this.historyPyFirst[this.type] = key // 存储下当前选中的字母值，当切换端游和手游时，选中的首字母会采用最后一次收录的
        this.pyFirst = key
        this.getList(this.type, true)
      },
      /* 懒加载控制是否显示图片 */
      lazy() {
        return
        let eleLis = this.$refs['gameListUl'].getElementsByTagName('li')
        for (let i = 0; i < eleLis.length; i++) {
          /* 当改元素出现在视口中，以及元素含有 data-src 属性 */
          if (eleLis[i].getElementsByTagName('img')[0].getAttribute('data-src') && document.body.scrollTop + window.innerHeight + 400 > eleLis[i].getAttribute('data-top')) {
            let img = eleLis[i].getElementsByTagName('img')[0]
            img.setAttribute('src', img.getAttribute('data-src'))
            img.removeAttribute('data-src')
          }
        }
      },
      /* 字母菜单滚动监听 */
      pyScroll(e) {
        this.historyPyScrollTop[this.type] = e.target.scrollTop
      },
      /* 滚动监听 */
      scroll(e) {
        window.clearTimeout(this.timeoutControl)
        this.timeoutControl = setTimeout(this.lazy, 100)
        if (this.timeStamp > 0 && e.timeStamp - this.timeStamp > 100) {
          this.lazy()
        }
        this.timeStamp = e.timeStamp
        this.scrollTop = document.body.scrollTop
        if (e.type === 'resize') { // 如果改变视口尺寸，置顶然后初始化首拼列表的高度
          if (Number(document.body.clientWidth) > 768) document.body.scrollTop = 0
          this.initPy()
          return
        }
        /**
         * 1. top > 1.03rem  固定到顶部 高度为总高-2rem
         * 2. top < 1.03rem  不固定 高度增加
         * 3. width > 768 && top > 1.03rem right = (document.body.clientWidth - 768) / 2
         */
        if (document.body.scrollTop > this.$refs['width_3rem'].offsetWidth / 3) {
          this.pyFixed = true
          this.pyHeight = this.pyHeightStart + this.$refs['width_3rem'].offsetWidth / 3
          if (Number(document.body.clientWidth) > 768) {
            this.pyRight = (document.body.clientWidth - 768) / 2
          } else {
            this.pyRight = 0
          }
        } else {
          this.pyFixed = false
          this.pyRight = 0
          this.pyHeight = this.pyHeightStart + document.body.scrollTop
        }
      },
      /* 图片加载完成 */
      imgLoaded(e) {
        e = e.target
        e.setAttribute('class', e.getAttribute('class') + ' loaded')
      },
      /* 初始化首拼列表的高度 */
      initPy() {
        this.pyHeight = window.innerHeight - this.$refs['width_3rem'].offsetWidth
        this.pyHeightStart = this.pyHeight
      },
      /* 默认是端游还是手游 存储于LS中*/
      defaultGameType(type) {
        const key = 'MG_SAVE_SELL_HOME_DEFAULT_GAME_TYPE'
        const hasLS = this.$isLocalStorageSupported()
        /*
          业务需求
          1. 获取功能：获取本地存储的gameType, 如果有则传值，无则传递 undefined
          1. 存储功能：存储传递进来的type值
        */
        if (type && hasLS) {
          localStorage.setItem(key, type)
        } else if (hasLS) {
          const lsType = localStorage.getItem(key)
          if (this.type !== lsType) { // 根据历史切路径
            this.$router.replace({name: 'MGSellHome', params: {type: lsType ? lsType : this.MOBILE_GAME}})
          }
          if (lsType) {
            return localStorage.getItem(key)
          } else {  // 没有存储的历史
            localStorage.setItem(key, this.MOBILE_GAME) // 配置 LS，手游
            return this.MOBILE_GAME
          }
        } else {
          return undefined
        }
      },
      /* 改变游戏类型（端游 | 手游） */
      changeType(type) {
        if (Number(type) === Number(this.type)) return
        this.defaultGameType(type)
        this.type = type
        this.gamePyList = [] // 切换后清空字母
        this.$refs['pyListDiv'].scrollTop = this.historyPyScrollTop[this.type]
        this.pyFirst = this.historyPyFirst[type] // 回复右侧选中的值
        this.getList(this.type, true)
      },
      updateBottom() {
        return this.getList(this.type)
      },
      /***
       * 获取游戏列表
       * @param type 游戏类型（1端游 2手游）
       * @param first 是否是第一次请求
       * 端游获取全部
       * 手游根据指定参数获取列表
       */
      getList(type, first) {
        if (this.gamePyList.length < 1) { // 只有切换的时候更新字母列表，切换的时候会清空字母列表
          this['MG_GET_GAMES_PY']({gameType: type}).then(list => { // 更新右侧字母选择菜单
            this.gamePyList = list
          })
        }
        if(first) {
          this.pageIndex[this.type] = 1
          this.gameList = []
          this.$nextTick(document.body.scrollTop = 0)
          this.infiniteStart = false // 表示是第一次触发
        }
        let params = {gameType: type, pageIndex: this.pageIndex[type] ++, pageSize: this.pageCount}
        if (this.pyFirst !== 'hot') params.pyfirst = this.pyFirst
        return this['MG_GET_GAMES_NEW'](params).then(list => {
          this.gameList.push(...list)
          this.$nextTick(() => {
            this.infiniteStart = true
            this.lazy()
          })
          return list.length === 0
        })
      },
      ... mapActions([
        'MG_GET_GAMES_NEW', // 手游我要卖专属接口
        'MG_GET_GAMES_PY', // 获取游戏首拼
        'MG_GET_GAMES' // 获取游戏列表
      ])
    }
  }
</script>
<style>
  .tab-class01.new-sell-game-list .page-infinite-loading {
    background-color: white;
  }
</style>
<style scoped>
  .search-game ul li img {
    opacity: 0;
    transition: opacity .3s ease;
  }
  .search-game ul li img.loaded {
    opacity: 1;
  }
  .py-fixed {
    position: fixed !important;
    top: 1.97rem
  }

  .search-game ul li {
    padding: 0;
  }
  .span-icon-fdx span:first-child {
    display: inline-block;
    padding-left: .45rem;
    width: auto;
    height: 0.6rem;
    background: url(~images/common/search.jpg) no-repeat 0;
    background-size: 0.33rem;
  }
  @media screen and (min-width: 769px) {
    .py-fixed {
      width: 108px !important;
    }
  }
</style>
<style src='css/dl/dl-cxy.css' scoped></style>
