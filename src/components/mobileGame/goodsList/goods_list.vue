<template>
  <div id="wrapper">
    <!-- 头部 公共组价
      title<String> 给头部组件配置一个标题
    -->
    <v-header
       :fromName="fromName"
       :show="!show.filter"
       :showSwitch="true"
       :switchState="switchState"
       @switchClick="switchClick"
       :title="gameName"></v-header>
    <!-- top -->
    <div v-show="!show.filter" class="goodslist-01">
      <div class="mobilegames-nav  mt-97 bg-fff fixed-top">
        <div class="gmnav-mle border-bottom">
          <!-- 商品类型 -->
          <div class="navdemo" @click="changeShow(showKey._TYPE)"><a href="javascript:void(0)"><span
             class="mold color-666 f30" v-text="goodsType.checked ? goodsType.checked.goodsTypeName || '' : ''"></span></a>
          </div>
          <!-- 服务器选择 -->
          <div class="navdemo" :class="{active: show.server}" @click="changeShow(showKey._SERVER);"><a
             href="javascript:void(0)"><span
             class="server color-666 f30">{{serverMenuName}}</span></a></div>
          <!-- 排序方式选择 -->
          <div class="navdemo" :class="{active: show.sort}" @click="changeShow(showKey._SORT)"><a
             href="javascript:void(0)"><span
             class="sortin color-666 f30"
             v-text="sort.list[sort.index].sortTypeName">排序</span></a></div>
          <!-- 筛选 -->
          <div class="navdemo" :class="{active: filted}" @click="changeShow(showKey._FILTER)"><a
             href="javascript:void(0)"><span
             class="screen color-666 f30">筛选</span></a></div>
        </div>
        <!-- 快捷筛选 -->
        <v-quick-filter
           @quickFilterClear="filterClear"
           @quickFilterConfirm="quickFilterConfirm"
           :showBox="show.quickFilter"
           @clickItem="quickFilterClickItem"
           :list="quickFilterList"></v-quick-filter>
        <div class="gmnav-list">
          <!-- 商品类型选择列表 -->
          <v-nav-type
             :show="show.type"
             :goodsType="goodsType"
             @clickItem="typeClick">
          </v-nav-type>
          <!-- 区服选择列表 -->
          <v-nav-server
             :show="show.server"
             :server="server"
             @clickItem="serverClickRight"
             @clickLeft="serverClickLeft">
          </v-nav-server>
          <!-- 排序方式 -->
          <v-nav-sort
             :show="show.sort"
             :sort="sort"
             @clickItem="sortClick">
          </v-nav-sort>
        </div>
      </div>
      <!-- 头部和第一菜单 -->
      <div style="height: 1.95rem; width: 100%"></div>
      <!-- 快捷筛选菜单 -->
      <div style="height: 1rem;" v-if="quickFilterPadding"></div>
      <!-- 列表 -->
      <v-list
         :specialId="specialId"
         :special="special"
         :filted="filted"
         @clickImg="clickImg"
         :show="showGoodsList"
         :switchState="switchState"
         :goodsList="goodsList"
         :quickList="quickList"
         :scrollButton="setGoodsListAdd"></v-list>
      <div class="mstfiv" v-show="mstfivShow" @click="mstfivClick" @touchmove.prevent></div>
    </div>
    <v-filter
       :filter="filter"
       @clickItem="filterClickItem"
       @clear="filterClear"
       @confirm="filterConfirm"
       :show="show.filter"></v-filter>
    <v-previewer :list="previewerImgList" :isForList=true
                 ref="previewer"></v-previewer>
    <div class="smallfood" @click="smallfoodClick" v-show="!show.filter"><em></em></div>
    <go-top-component v-show="!show.filter"></go-top-component>
    <navigation-modal-component v-show="!show.filter"></navigation-modal-component>
    <div class="xiaoneng" @click="xiaonengClick" v-show="!show.filter"><em></em></div>
    <!--07-21新加指引层-->
    <div v-if="showGuide">
      <div class="zhiyin-box">
        <div class="switch-icon-box pr-20 clearfix"><i class="switch-icon fr"></i></div>
        <div class="zhiyin-img-box"><i class="zhiyin-img"></i></div>
        <div class="zhiyin-over text-center"><a class="f30 color-fff" @click="guided">我知道了</a></div>
      </div>
      <div class="maskdiv02"></div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import headCom from './common/header.vue'
  import filterCom from './goods_list/filter.vue' // 列表
  import goTopComponent from '../common/GoTop.vue'
  import navigationModalComponent from 'components/common/NavigationModal.vue'
  import listCom from './goods_list/list.vue' // 列表
  import navTypeCom from './goods_list/nav_type.vue' // 类型选择
  import navServerCom from './goods_list/nav_server.vue' // 服务器选择
  import navSortCom from './goods_list/nav_sort.vue' // 服务器选择
  import navQuickFilterCom from './goods_list/quick-filter.vue' // 快捷筛选
  import previewerComponent from '../common/previwer.vue'
  //  let previewerComponent = r => require.ensure([], () =>
  //    r(require('../common/previwer.vue')), '/mobile-game/previwer'
  //  )
  export default {
    components: {
      goTopComponent,
      navigationModalComponent,
      'v-quick-filter': navQuickFilterCom,
      'v-previewer': previewerComponent,
      'v-header': headCom,
      'v-list': listCom,
      'v-nav-type': navTypeCom,
      'v-nav-sort': navSortCom,
      'v-nav-server': navServerCom,
      'v-filter': filterCom
    },
    data() {
      return {
        specialId: 0,
        special: false,
        quickFilterPadding: false, // 快捷筛选填充块
        leave: false, // 页面刷新时变为 true
        showGoodsList: true, // 是否显示列表，当刷新页面时不显示列表
        showGuide: false, // 引导页显示
        fromName: '',
        quickList: [],
        saveListData: this.$store.state.mobileGame.saveListData,
        scrollTop: 0,
        previewerImgList: [],
        switchState: true, // true 为单图，false 为多图
        gameName: '', // 游戏名
        gameId: null, // 游戏id
        goodsType: {list: [], checked: {}}, // 商品类型以及默认选中项
        show: {type: false, server: false, sort: false, filter: false, quickFilter: false}, // 控制第二层菜单的显示
        showKey: {_TYPE: 'type', _SERVER: 'server', _SORT: 'sort', _FILTER: 'filter', _QUICK_FILTER: 'quickFilter'},
        server: {  // 客户端 服务器 平台
          TYPE: {_PLATFORM: 'platform', _CLIENT: 'client', _SERVER: 'server'}, // 三个变量名常亮
          list: {platform: [], client: [], server: []}, // 列表
          checked: {platform: null, client: null, server: null}, // 选中项
          menuLeftName: {platform: '平台', client: '客户端', server: '服务器'}, // 子菜单左侧名
          menuLeftNameDefault: {platform: '平台', client: '客户端', server: '服务器'},
          outId: 0 // 特殊id， 点击后直接算结束
        },
        sort: {
          list: [
            {sortTypeId: 0, sortTypeName: '默认排序', sortMap: {goods_source_type: '+', sort_score: '-', create_time: '-'}},
            {sortTypeId: 1, sortTypeName: '最新发布', sortMap: {goods_source_type: '+', create_time: '-'}},
            {sortTypeId: 3, sortTypeName: '价格最低', sortMap: {price: '+', goods_source_type: '+', create_time: '-'}},
            {sortTypeId: 4, sortTypeName: '价格最高', sortMap: {price: '-', goods_source_type: '+', create_time: '-'}}
          ],
          index: 0
        },
        goodsList: {
          list: null,
          page: 1,
          pageCount: 15,
          nowParams: '' // 当前商品列表的请求参数
        },
        filter: {
          list: null,
          TYPE: {RADIO: '1', CHECK: '2', RANGE: '3'}
        }
      }
    },
    computed: {
      /* 快捷筛选列表 */
      quickFilterList() {
        if (this.filter.list === null) return []
        return this.filter.list.filter(v => {
//          v.isQuickFilter
          return v.listSon.length > 1
        })
      },
      /* 是否有筛选值 */
      filted() {
        if (!this.filter.list) return false
        else {
          for (let i = 0; i < this.filter.list.length; i++) {
            for (let j = 0; j < this.filter.list[i].listSon.length; j++) {
              if (this.filter.list[i].listSon[j].checked) return true
            }
          }
          return false
        }
      },
      /* 服务器菜单名 */
      serverMenuName() {
        /*
         * 1. 服务器选中 - 标题为 服务器选中名
         * 2. 客户端选中 服务器不限 - 客户端选中名
         * 3. 客户端不限 - 平台选中名
         * 4. 平台无选 - '服务器'
         * */
        let checked = this.server.checked
        if (checked.server && checked.server.id !== this.server.outId) {
          return checked.server.name
        } else if (checked.client && checked.client.id !== this.server.outId) {
          return checked.client.name
        } else if (checked.client && checked.client.id === this.server.outId) {
          return checked.platform.name
        } else {
          return '服务器'
        }
      },
      /* 通过四个菜单是否显示控制幕布的显示 */
      mstfivShow() {
        for (let key in this.show) {
          if (this.show[key]) return true
        }
        return false
      },
      /* 计算获取列表需要的params */
      params() {
        const TYPE = this.filter.TYPE
        let betweenMap = {}
        let serverParams = {}
        let accurateMap = {}
        let keyWordList = []

        /* --------------  品台、客户端、服务器 ----------------- */
        if (this.server.checked.platform) {
          serverParams.service_provider_id = [this.server.checked.platform.id]
        }
        if (this.server.checked.client && this.server.checked.client.id !== this.server.outId) {
          serverParams.region_id = [this.server.checked.client.id]
        }
        if (this.server.checked.server && this.server.checked.server.id !== this.server.outId) {
          serverParams.server_id = [this.server.checked.server.id]
        }
        /* ------------ 筛选参数 -------------------------- */
        if (this.filter.list) {
          this.filter.list.map(v => {
            // keyWordList 填充
            if (v.filterType === 2) { // keyWordList 一般情况下区间是不会以这种方式传递的，只有在后台配置错误的情况下
              let obj = {}
              if (v.type === TYPE.RANGE) { // 区间
                if (v.minValue || v.maxValue) {
                  obj[v.filterAlyField] = [(v.minValue ? v.minValue : 0) + '-' + (v.maxValue ? v.maxValue : 999999999)]
                  keyWordList.push(obj)
                }
              } else { // 单选和多选
                let haveChecked = false
                v.listSon.map(({filterAlyField, filterValue, checked}) => {
                  if (!checked) return
                  if (v.server) { // 服务保障特殊处理
                    let ser = {}
                    ser[filterAlyField] = []
                    ser[filterAlyField].push(filterValue)
                    keyWordList.push(ser)
                    return
                  }
                  haveChecked = true
                  if (!obj[filterAlyField]) obj[filterAlyField] = []
                  obj[filterAlyField].push(filterValue)
                })
                if (haveChecked) keyWordList.push(obj)
              }
              return
            }
            if (v.type === TYPE.CHECK) { // 多选
              v.listSon.map(itemSon => {
                if (itemSon.checked) _push(v, itemSon)
              })
            } else if (v.type === TYPE.RADIO) { // 单选
              let itemSon = v.listSon.filter(v => v.checked)[0]
              if (itemSon) _push(v, itemSon)
            } else if (v.type === TYPE.RANGE) { // 区间
              if (v.minValue || v.maxValue)
                map(v.filterType)[v.filterAlyField] = [(v.minValue ? v.minValue : 0) + '-' + (v.maxValue ? v.maxValue : 999999999)]
            }

            function _push({filterType}, {filterAlyField, filterValue}) {
              if (!map(filterType)[filterAlyField]) map(filterType)[filterAlyField] = []
              map(filterType)[filterAlyField].push(filterValue)
            }

            function map(filterType) {
              /* 1 对应 accurateMap 2 对应 keyWordList 3 对应 betweenMap */
              switch (filterType) {
                case 1:
                  return accurateMap
                  break
                case 2:
                  return keyWordList
                  break
                case 3:
                  return betweenMap
                  break
              }
            }
          })
        }
        /* ------------ 请求结构 --------------------------- */
        let p = {
          accurateMap: {
            goods_type: ['2'],
            game_id: [this.gameId],
            ...accurateMap,
            ...serverParams // 区服、服务保障
          },
          betweenMap: {...betweenMap}, // 价格区间
          keyWordList: keyWordList,
          pageCount: this.goodsList.pageCount,
          gameName:this.$route.params.gameName,
          goodsType:this.$route.params.goodsType,
          sortMap: this.sort.list[this.sort.index].sortMap // 排序方式
        }
        return p
      }
    },
    watch: {
      mstfivShow(val, old) {
        if (old === true && val === false) {
          this.asyncSetGoodsListInit()
//          document.body.style['overflow'] = 'auto'
        } else {
          if (!this.show.filter) {
          }
//            document.body.style['overflow'] = 'hidden' // 禁止商品列表滚动
        }
      },
      fromName(val) {
        this.init()
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fromName = from.name
      })
    },
    beforeRouteLeave(to, from, next) {
      if (_hmt) _hmt.push(['_trackPageview', to.fullPath])
      next()
    },
    created() {
      /* 获取到 gameId */
      let params = this.$route.params
      this.gameId = params.gameId
      this.gameName = params.gameName
      this.setSpecial() // 是否开启活动页配置
      /* 当刷新页面时，先置顶 */
      window.onbeforeunload = () => {
        this.showGoodsList = false
        this.leave = true
        window.scrollTo(0, 1);
      };
    },
    mounted() {
     
      /*
       * 小能客服配置
       *
       */
      const s1 = document.createElement('script');
      s1.type = 'text/javascript';
      s1.text = 'NTKF_PARAM = {' +
        'siteid: "bq_1000",' +
        'settingid: "bq_1000_9999",' +
        'uid: "",' +
        'uname: "",' +
        'isvip: "0",' +
        'userlevel: "1",' +
        'erpparam: "abc"' +
        '}';
      document.body.appendChild(s1);
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = encodeURI('https://dl.ntalker.com/js/b2b/ntkfstat.js?siteid=bq_1000');
      s.charset = "utf-8";
      document.body.appendChild(s);

//      this.init()
      let self = this
      /* 开关状态提取 */
      let state = window.localStorage.MG_SWITCH_STATE ? JSON.parse(window.localStorage.MG_SWITCH_STATE) : null
      if (state && (new Date().getTime() - state.d) / 1000 < 60 * 60) {
        this.switchState = state.switch
      }
      if (!window.localStorage.MG_SHOW_GUIDE && this.isLocalStorageSupported()) {
        this.showGuide = true
      }
      window.onscroll = function () {
        if (!self.show.filter)
          self.scrollTop = document.body.scrollTop
      }
    },
    beforeDestroy() {
      let save = {
        quickFilterPadding: this.quickFilterPadding,
        gameId: this.gameId,
        quickList: this.quickList,
        goodsType: this.goodsType,
        scrollTop: this.scrollTop,
        server: this.server,
        sort: this.sort,
        goodsList: this.goodsList,
        filter: this.filter
      }
      this.$store.commit('saveListData', save)
    },
    methods: {
      listGame(){
        var isLog;
        isLog = this.$CONSTANTS.isLogin;
        // sa.track("goodsList",{
        //   platfromType:"H5",
        //   belongGame:this.gameName,
        //   gameType:this.gameName,
        //   filtrate:"",
        //   goodsType:this.$route.params.goodsType,
        //   isLogin:isLog
        // });
      },
      /* -------------------- 筛选数据 公共 控制区 ----------------- */
      /* 改变选中状态 */
      changeCheck(item, itemSon) {
        const TYPE = this.filter.TYPE
//      （0.文本 1.下拉单选框 2.下拉多选框 3.单选框 4.多选框 5.区间）
        /* 多选框改变状态 */
        if (item.type === TYPE.CHECK) {
          /*
          * 如果点击==无绑定==则其它选中项都会自动清除选中框
          * 如果点击==无绑定==项，则==无绑定==会自动清除选中框
          * */
          if (item.propertyName === '帐号绑定' && itemSon.propertyName === '无绑定') {
            item.listSon.filter(v => v.propertyName !== '无绑定').map(v => v.checked = false)
          } else if (item.propertyName === '帐号绑定') {
            item.listSon.filter(v => v.propertyName === '无绑定')[0].checked = false
          }
          itemSon.checked = !itemSon.checked
        }
        /* 单选 */
        else if (item.type === TYPE.RADIO || item.type === TYPE.RANGE) {
          if (itemSon.checked) {
            // itemSon.checked = false
          } else {
            item.listSon.map(v => v.checked = false)
            itemSon.checked = true
          }
        }
      },
      /* 筛选点击重置, 或是手动清理 */
      filterClear(item) {
        if (item) { // 手动清理某一项选中状态
          item.listSon.map(v => v.checked = false)
          return
        }
        this.filter.list.map(v => {
          v.listSon.map(v => v.checked = false)
          /* 清理输入框中的值 */
          if (v.type === this.filter.TYPE.RANGE) {
            v.maxValue = v.minValue = ''
          }
        })
      },
      /* -------------------- 快捷筛选 数据控制区 ----------------- */
      quickFilterClickItem({item, itemSon, isListSon, isCurrent}) {
        const TYPE = this.filter.TYPE
        /* 点击菜单子项 */
        if (isListSon) {
          this.changeCheck(item, itemSon) // 改变选中状态
          /* 如果是多选，则结束。 如果是单选，关闭下拉列表 */
          if (item.type === TYPE.RADIO) this.changeShow(this.showKey._QUICK_FILTER, false)
          return
        }
        /* 点击菜单项 */
        if (item.server) { // 服务保障
          itemSon.checked = !itemSon.checked
          if (!this.show.quickFilter) this.asyncSetGoodsListInit() // 如果快捷筛选没有下拉框，则直接触发列表重置
        } else { // 非服务保障
          if (isCurrent) { // 当前点击的菜单时当前已选中的菜单，则收回或放子菜单框
            this.changeShow(this.showKey._QUICK_FILTER)
          } else if (!this.show.quickFilter) {
            /* 1. 幕布已开，切换菜单不收回幕布(无操作)  2. 幕布没有开启，则放开幕布*/
            this.changeShow(this.showKey._QUICK_FILTER)
          }
        }
      },
      quickFilterConfirm() {
        this.changeShow(this.showKey._QUICK_FILTER, false)
      },
      /* -------------------- 筛选 数据控制区 --------------------- */
      /* 筛选点击确定 */
      filterConfirm() {
        this.filter.list.map(v => {
          /* 查看最大值和最小值是否正确 */
          if (parseInt(v.maxValue) < parseInt(v.minValue)) {
            v.maxValue ^= v.minValue
            v.minValue ^= v.maxValue
            v.maxValue ^= v.minValue
          }
        })
        this.changeShow(this.showKey._FILTER, false)
      },
      /* 点击任何一个选项框 */
      filterClickItem({item, itemSon}) {
        const TYPE = this.filter.TYPE
        this.changeCheck(item, itemSon)
        /* 区间特殊处理 */
        if (item.type === TYPE.RANGE) {
          item.maxValue = itemSon.maxValue
          item.minValue = itemSon.minValue
        }
      },
      /* 筛选数据初始化 */
      init_filterList(list) {
        /* 配置 checked 属性，默认为false,
         配置 server 属性，默认为true， 只保障服务中的每一项添加 和 服务保障主体
         配置 type 属性，定义单选或多选属性
         配置 listSon 属性, 筛选项
         */
        list.map(v => {
          v.checked = false // 第一层级列表的checked只有在快捷筛选中使用
          v.listSon = v.subEOList
          delete v.subEOList
          if (v.propertyName === '服务保障') {
            v.server = true
            v.listSon.map(val => {
              val.server = true
              if (val.isQuickFilter) this.quickFilterPadding = true
            })
          } else {
            if (v.isQuickFilter) this.quickFilterPadding = true
          }
          switch (v.filterControlType) {
            case 1:
            case 3:
              v.type = this.filter.TYPE.RADIO
              break
            case 2:
            case 4:
              v.type = this.filter.TYPE.CHECK
              break
            case 5:
              v.type = this.filter.TYPE.RANGE
              v.maxValue = ''
              v.minValue = ''
              break
          }
          v.listSon.map(val => {
            val.checked = false
            if (v.type === this.filter.TYPE.RANGE) {
              let vals = val.filterValue.split('-')
              val.minValue = vals[0].trim()
              val.maxValue = vals[1].trim()
            }
          })
        })
        list = list.filter(v => v.listSon && v.listSon.length > 0)
        /* 根据排序值排序 */
        this.filter.list = list.sort((v, n) => {
          if (v.filterSort.length === 0) v.filterSort = 0
          if (n.filterSort.length === 0) v.filterSort = 0
          return parseInt(n.filterSort) - parseInt(v.filterSort)
        })
      },
      /* -------------------- 其他 --------------------- */
      /* 引导页面点击 ‘我知道了’ */
      guided() {
        window.localStorage.MG_SHOW_GUIDE = 'true'
        this.showGuide = false
      },
      /* 客服按钮 */
      xiaonengClick() {
        NTKF.im_openInPageChat('bq_1000_1491043276538');
      },
      /* 浏览记录按钮 */
      smallfoodClick() {
        location.href = '/vue/browsing-history/history-lists'
        //        location.href = '/vue/browsing-history/history-lists'

      },
      /* 点击图片时处理 */
      clickImg({index, item}) {
        while (this.previewerImgList.length) {
          this.previewerImgList.pop()
        }
        item.big_img_list.map(v => {
          let obj = {
            "src": v,
            "w": 375,
            "h": 667
          }
          this.previewerImgList.push(obj)
        });
        let targetUrl = {
          name: 'MGAccountDetail',
          params: {
            goodsId: item.id,
            goods_source_type: item.goods_source_type ? item.goods_source_type : 0,
          },
          query: {
            source: this.filted ? '0001' : undefined
          }
        };
        this.$refs.previewer.show(index, targetUrl)
      },
      /* 列表处理  1.大图小图处理（压缩） */
      listImgFilter(list) {
        list.map(obj => {
          obj.goods_img = imgfilterMain(obj.goods_img) // 主图处理
          /* 大图小图处理 */
          obj.big_img_list = obj.big_img_list.split(';').filter(v => v.length) // 切成数组
          obj.small_img_list = obj.small_img_list.split(';').filter(v => v.length) // 切成数组
          /* 如果big_img_list 或 small_img_list 没有传东西，填入一张主图 */
          if (obj.big_img_list.length === 0) {
            obj.big_img_list.push(obj.goods_img.split('?')[0])
          }
          if (obj.small_img_list.length === 0) {
            obj.small_img_list.push(obj.goods_img)
          }
          obj.small_img_list = obj.small_img_list.map(v => {
            if (v.indexOf('img1.5173.com') > -1) { // 处理img1来源的图片
//              return v.split('?')[0] + '?x-oss-process=image/resize,m_fixed,w_130,h_81/format,jpg/quality,q_90'
//              return v.split('?')[0] + '?x-oss-process=image/resize,m_fixed,w_130/format,jpg/quality,q_90/crop,x_0,y_0,w_130,h_81'
              return v.split('?')[0] + '?x-oss-process=image/resize,m_fill,h_81,w_130/format,jpg/quality,q_90'
            }
            return v
          })
          obj.big_img_list = obj.big_img_list.map(v => imgfilter(v))

          /* 大图处理 */
          function imgfilter(path) {
            if (path.indexOf('http://m5173.img-cn-hangzhou.aliyuncs.com') > -1 || path.indexOf('img1.5173.com') > -1) {
              return path + '?x-oss-process=image/resize,m_fixed,w_880/format,jpg/quality,q_60'
            } else {
              return path
            }
          }

          /* 主图处理 */
          function imgfilterMain(path) {
            if (path === '//img1.5173.com/') {
              return '/dist/default_img.jpg'
            } else if (path.indexOf('img1.5173.com') > -1) {
              return path.split('?')[0] + '?x-oss-process=image/resize,m_fixed,w_112,h_112/format,jpg/quality,q_90'
            } else {
              return path
            }
          }
        })
      },
      /* 多图切换按钮点击 */
      switchClick() {
        this.scrollTop = 0
        this.switchState = !this.switchState
        window.localStorage.MG_SWITCH_STATE = JSON.stringify({switch: this.switchState, d: new Date().getTime()})
        this.asyncSetGoodsListInit(true)
      },
      isEmptyObject(obj) {
        for (var name in obj) {
          return false;//返回false，不为空对象
        }
        return true;//返回true，为空对象
      },
      /**
       * 初始化列表
       * @param forceInit 如果为true，强制初始化列表
       */
      async asyncSetGoodsListInit(forceInit = false) {
        /* 1. 当幕布回收的时候，判断请求参数（params）是否改变，如果有改变，重启发送请求
         * 2. 数据初始化完毕（init）时, 触发
         */
        var self = this;
        if (JSON.stringify(this.params) === this.goodsList.nowParams) { // 筛选回来，位置记录触发
          this.$nextTick(function () {
            document.body.scrollTop = this.scrollTop
          })
        }
        if (JSON.stringify(this.params) !== this.goodsList.nowParams || forceInit) {
          document.body.scrollTop = 0
          /* null 是用来判断列表是否第一次请求（list组件需要），所以第一次请求不能先赋值一个空数组 */
//          if (this.goodsList.list !== null) this.goodsList.list = []
          this.goodsList.list = null
          this.goodsList.page = 1
          this.goodsList.nowParams = JSON.stringify(this.params)
          let data = await this.getGoodsList({...this.params, page: 1},this.$route.params.goodsType)
          if (!data) { // 后台数据异常时返回null
            this.$toast('筛选条件已达上限，请减少筛选项重试！', 2500)
            data = []
          }
          this.listImgFilter(data)
          this.goodsList.list = this.clone(data)
          var gameId = this.params.accurateMap.game_id[0]
          var gamePlatformId
          if (this.params.accurateMap.service_provider_id) {
            gamePlatformId = this.params.accurateMap.service_provider_id[0]
          }
          self.quickList = []
          if (!this.params.keyWordList || this.params.keyWordList.length == 0) {
            if (!this.params.betweenMap || this.isEmptyObject(this.params.betweenMap)) {
              self.getFastsList({gameId: gameId, gamePlatformId: gamePlatformId}).then(data => {
                self.quickList = self.clone(data)
                self.quickList.forEach(function (quick) {
                  quick.gameId = gameId
                })
              })
            }
          }
        }
      },
//	    setQuick(params){
//		    var gameId = this.params.accurateMap.game_id[0]
//		    params.gameId = gameId
//		    return this.getFastsInfo(params).then(data => {
//			    return data
//		    })
//	    },
      /* 列表滚动到底部时, 自动执行该方法 */
      setGoodsListAdd() {
        if (this.show.filter || this.leave) {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve(false)
            }, 1)
          })
        }
        this.goodsList.list = this.goodsList.list || [] // 切换列表时，采用自动填充
        this.goodsList.page += 1
        return this.getGoodsList({...this.params, page: this.goodsList.page}).then(data => {
          if (!data) { // 后台数据异常时返回null，这里是翻页逻辑，正常情况是进不来的，会卡在第一次请求，但以防万一还是需要防止一些异常出现
            data = []
          }
          this.listImgFilter(data)
          this.goodsList.list.push(...this.clone(data))
          return data.length < this.goodsList.pageCount
        })
        /* 2. 当无限加载被触发的时候，发送请求 */
      },
      /* 排序方式选择，返回的是当前点击的第几个 */
      sortClick(index) {
        this.sort.index = index
        this.changeShow(this.showKey._SORT, false)
      },
      /* 服务器菜单 左侧点击 （平台、客户端、服务器） */
      serverClickLeft(type) {
        switch (type) {
          case this.server.TYPE._PLATFORM :
            clear.call(this, [this.server.TYPE._PLATFORM, this.server.TYPE._CLIENT, this.server.TYPE._SERVER])
            break
          case this.server.TYPE._CLIENT :
            clear.call(this, [this.server.TYPE._CLIENT, this.server.TYPE._SERVER])
            break
          case this.server.TYPE._SERVER :
            clear.call(this, [this.server.TYPE._SERVER])
            break
        }

        function clear(types) {
          types.map(v => {
            this.server.checked[v] = null
            this.server.menuLeftName[v] = this.server.menuLeftNameDefault[v]
          })
        }
      },
      /* 服务器菜单 右侧点击（列表） */
      serverClickRight({type, item}) {
        /* 如果选中的是 ‘不限’ 则不进入下一页  选择`不限`，然后直接退出 */
        if (item.id === this.server.outId) {
          this.changeShow(this.showKey._SERVER, false)
          this.server.checked[type] = item
          return
        }
        /* 改变选中项 */
        this.server.checked[type] = item
        /* 获取下个值 */
        switch (type) {
          case this.server.TYPE._PLATFORM :
            this.setClient(item.id)
            break
          case this.server.TYPE._CLIENT :
            this.setServer(item.id)
            break
          case this.server.TYPE._SERVER :
            this.changeShow(this.showKey._SERVER, false)
            break
        }
      },
      /* 商品类型选择 */
      typeClick(item) {
        /* 如果 是帐号, 收回菜单，如果是其它，跳转页面 */
        if (item.goodsType === this.goodsType.checked.goodsType) {
          this.changeShow(this.showKey._TYPE)
        }
        if (item.goodsType !== 2) {
          location.href = '/search/search-game-area.html?gid=' + this.gameId + '&gname=' + this.$route.params.gameName + '&goodsType=' + item.goodsType + '&typename=' + item.goodsTypeName
        }
      },
      changeShow(getKey, val) {
        if (val === undefined) val = !this.show[getKey]
        if (!val) this.show[getKey] = false
        else {
          for (let key in this.show) {
            if (getKey === key) this.show[key] = true
            if (getKey !== key) this.show[key] = false
          }
        }
      },
      init() {
        /* 所有初始化需要的数据，或是需要执行的方法 放置在此处 */
        this.$store.commit('clearSaveListData')
        /* 回归数据 */
        if (this.saveListData && this.saveListData.gameId === this.gameId && (this.fromName === 'MGAccountDetail' || this.fromName === 'mobileGameQuick' )) {
          for (let key in this.saveListData) {
            this[key] = this.saveListData[key]
          }
          this.$nextTick(function () {
            let self = this
            setTimeout(function () {
              document.body.scrollTop = Number(self.saveListData.scrollTop)
            }, 1)
          })
        } else {
          /* 配置平台 异步 */
          this.setPlatform()
          /* 配置商品类型,以及默认选中的项 */
//          this.goodsType.list = await this.getGoodsTypes({gameId: this.gameId})
          this.getGoodsTypes({gameId: this.gameId}).then(d => {
            this.goodsType.list = d
            this.goodsType.checked = this.goodsType.list.filter(v => v.goodsType === 2)[0] // 暂时只显示帐号
          })
          /* 获取列表 */
          this.asyncSetGoodsListInit()
          /* 获取筛选配置列表 */
          this.getFilterInner({goodsTypeId: 2, gameName: this.gameName}).then(list => {
            this.init_filterList(list)
          })
        }
      },
      /* 获取平台列表 */
      setPlatform() {
        this.server.list.platform = []
        this.getGamePlants({gameId: this.gameId}).then(d => {
          this.server.list.platform = this.clone(d)
        })
      },
      /* 获取客户端列表 */
      async setClient(platformId) {
        this.server.list.client = []
        this.server.list.client = this.clone(await this.getGameClients({
          gameId: this.gameId,
          platformId
        }))
        this.server.list.client.unshift({name: '不限', id: this.server.outId})
      },
      /* 获取服务器列表 */
      async setServer(aid) {
        this.server.list.server = []
        this.server.list.server = this.clone(await this.getGameServers({aid}))
        this.server.list.server.unshift({name: '不限', id: this.server.outId})
      },
      /* 活动页开关获取 */
      setSpecial() {
        /* 目前只有王者荣耀有活动页 */
        if (this.gameName !== '王者荣耀(手游)') return
        if (localStorage.getItem('OpenTheDoor')) this.special = true
        this['MG_GET_KING_SWITCH']({topicTitle: '王者荣耀(手游)'}).then(list => {
          if (!!list[0] && !list[0].isDelete) {
            this.specialId = list[0].id
            this.special = true
          }
        })
      },
      /* 幕布点击 */
      mstfivClick() {
        /* 因为控制幕布显示是通过计算属性得到，所有这里不能直接改变值 */
        for (let key in this.show) {
          this.show[key] = false
        }
      },
      ...mapActions([
        'MG_GET_KING_SWITCH', // 获取活动页开关
        'getGoodsTypes',  // 获取商品类型
        'getGamePlants', // 获取平台
        'getFastsList', // 获取平台
        'getFastsInfo', // 获取平台
        'getGameClients', // 获取客户端
        'getGoodsList', // 获取商品列表
        'getGameServers', // 获取服务器
        'getFilterInner', // 获取默认筛选
        'getFilterOuter' // 获取快捷筛选
      ]),
      clone(obj) { // 克隆方法
        return JSON.parse(JSON.stringify(obj))
      },
      objMap(obj, fun) {
        for (let key in obj) {
          fun(obj[key])
        }
      },
      isLocalStorageSupported() {
        let testKey = 'test',
          storage = window.sessionStorage;
        try {
          storage.setItem(testKey, 'testValue');
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }
    }
  }
</script>
<style scoped>
  .disabled {
    background-color: #999;
  }

  .mobilegames-conn .listware .hrgames-img {
    width: 100%;
  }

  .mstfiv {
    z-index: 61;
  }

  .mobilegames-nav {
    z-index: 62;
  }

  .smallfood {
    z-index: 30;
    bottom: 1.4rem;
    right: .28rem;
    max-width: 768px;
    text-align: right;
    position: fixed;
  }

  .smallfood em {
    width: 0.912rem;
    height: 0.912rem;
    padding: .24rem;
    border-radius: 100%;
  }

  .smallfood em {
    float: right;
    display: block;
    background: url(~images/common/smallfood.png) center center no-repeat;
    background-size: .9rem;
  }
</style>
