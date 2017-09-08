<template>
  <div id="wrapper">
    <div v-show="!isScreenShow">
      <headerComponent></headerComponent>
      <div id="#goodslist">
        <div class="fixed-top fixed-box" style="z-index:39;">
          <!-- 筛选条件 -->
          <div class="mobilegames-nav border-bottom mt-97 bg-fff" @touchmove.prevent>
            <div class="gmnav-mle">
              <div class="navdemo" @click="goodsTypeShow" :class="{active:isTypeShow&&!isServerShow&&!isSortShow}">
                <a><span class="mold color-666 f30"
                v-text="selectGoodsTypeName || '游戏帐号'"></span></a>
              </div>
              <div class="navdemo" @click="serverShow" :class="{active:isServerShow}"><a> <span
                 class="server color-666 f30" v-text="displayServerName"></span></a></div>
              <div class="navdemo" @click="sortShow" v-if="sortList && !sortList.isSingleChoice"
                   :class="{active:isSortShow}"><a><span
                 class="sortin color-666 f30" v-text="selectSortName"> </span></a></div>
              <div class="navdemo" v-else>
                <a><span
                   class="price color-666 f30" v-text="selectSortName"> </span></a></div>
              <div class="navdemo" @click="toggleScreen">
                <a><span
                 class="screen color-666 f30">筛选</span></a>
              </div>
            </div>
          </div>
          <!--类型 -->
          <div class="default_numb" v-show="isTypeShow" >
            <div class="typescroll" >
              <ul>
                <li v-for="elem in goodsTypeList"
                    :key="elem.goodsType"
                    :class="{active: elem.goodsType == selectGoodsTypeId}"
                    @click="changeGoodsType(elem)"
                ><a>{{elem.goodsTypeName}}</a></li>
              </ul>
            </div>
            <div class="mstfiv" @click="mstfivClick" style="margin-top: 0.96rem" @touchmove.prevent></div>

          </div>


          <serverComponent v-if="isServerShow"></serverComponent>
          <!--排序-->
          <div class="default_numb" v-show="isSortShow" @touchmove.prevent>
            <ul ref="sortUl" v-if="sortList">
              <li v-for="elem in sortList.list"
                  :key="elem.sortTypeId"
                  :class="{active: elem.sortTypeId == postData.selectSortType}"
                  @click="changeSortType(elem)"
              ><a>{{elem.sortTypeName}}</a></li>
            </ul>
            <div class="mstfiv" @click="mstfivClick" style="margin-top: 0.96rem"></div>
          </div>
        </div>
        <div class="goods-container" ref="goodsContainer" >
          <!-- 列表为空时的样式 -->

          <div ref="getMarginHeight" style="height: 1.93rem;"></div>

          <!-- 商品列表 -->
          <!--装备搜索  -->
           <div class="equipment-seach" >
              <div class="container-ms px-30" :class="{nobg:keyword}">
                <div class="container-inp bg-fff" @click.prevent="searchshow=!searchshow">
                  <span class="color-ccc f30" >{{keyword?keyword:'输入关键字搜索'}}</span>
                </div>
                <i class="fr del-icon" @click="clearKeyword" v-show="keyword"></i>
              </div>
           </div>

           <div class="list-main2" v-show="goodsList.length===0 && showNoResult && !loading">
               <div class="list-empty" id="list-empty">
                   <p><img src="~images/gamelogo.png"></p>
                   <span class="f32">竟然一件商品都没有</span>
                   <span v-if="(postData.keyWordList && postData.keyWordList.length>0)||(postData.betweenMap && Object.keys(postData.betweenMap).length>0)" class="f30 color-ccc">或许筛选条件太多了，去掉一些试试看</span>
                   <span
                    @click="rescreen"
                    class="bg-m1 px-20 py-30 color-fff f32 mt-30" style="width:30%;margin-left:35%;margin-right:35%;color:#fff;" >重新筛选</span>
               </div>
           </div>


          <div class="list-main content " v-show="goodsList.length>0">
            <div class="lists bg-f1" :style="{height: containerHeight + 'px'}"
                  @scroll="handleScroll"
                 ref="goodsContainerList">

              <div v-for="item in goodsList" :key="item.id" @click="nextPage(item)">
                <!--帐号 切换1-->
                <div class="equipment-conn"
                     v-show="selectGoodsTypeId == 1 && !switchStatus">

                  <div class="equipment-list">
                    <li class="listware px-30 py-30 bg-fff border-bottom border-top mb-20">
                        <div class="mbgmes-img fl">
                          <img :src="item.goods_img|imgfilter" v-if="item.goods_img"/>
                          <img src="~images/default_img.jpg" v-else/>
                        </div>
                        <div class="mbgmes-con">
                            <div class="mbl-title f32 color-000">{{item.title}}</div>
                            <div class="mbl-cper mt-10 mb-10">
                                <div class="mbl-money color-m1 f36 fl">￥{{item.price}}</div>
                                <div class="mbl-icon fr">
                                    <i class="ji" name="寄售交易" v-if="item.trading_service_type==2&&item.goods_source_type=='1'"></i>
                                    <i class="bao" name="担保交易" v-if="item.trading_service_type==1&&item.goods_source_type=='1'"></i>
                                    <i class="ktou" name="可投保" v-if="item.biz_offer_flag.indexOf('保')>-1"></i>
                     								<i class="tou" name="已投保" v-if="item.biz_offer_flag.indexOf('~')>-1"></i>
                     								<i class="pei" name="无货赔付" v-if="parseInt(item.deposit)>0&&item.goods_source_type=='1'"></i>
                     								<i class="an" name="买家安心买" v-if="item.biz_offer_flag.indexOf('心买')>-1||(safebuyConfig.isEnable&&item.is_axm!='true'&&item.goods_source_type!='1')"></i>
                                    <i class="an-seller" name="卖家安心买" v-if="item.biz_offer_flag.indexOf('安买')>-1||(item.is_axm=='true'&&item.goods_source_type!='1')"></i>
                                    <i class="shi" name="超时赔付" v-if="parseInt(item.unit_promise_time_locked)>0"></i>
                                </div>
                            </div>
                            <div class="mbl-parea color-666 f30"><span class="fr f28">库存 {{item.delivery_num}}</span>{{item.region_name}}/{{item.server_name}}</div>
                        </div>
                    </li>
                  </div>
                </div>

              </div>

              <div class="tab-empty" v-show="isGoodsLoadAll && !loading">
                <div class="empty-conn">
                  <div class="list-img"><img src="~images/gamelist.png"></div>
                  <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
                </div>
              </div>
            </div>

            <div class="xiaoneng" @click="xiaonengClick"><em></em></div>
            <shareComponent v-show="shareStatus"></shareComponent>
            <goTopComponent :controlId='controlId'></goTopComponent>
          </div>

          <div class="loading" v-show="loading">加载中...</div>

          <navigationModalComponent></navigationModalComponent>
        </div>
      </div>
    </div>

    <screenComponent :isScreenShow='isScreenShow' @toggleScreen='toggleScreen' :clearScreen='clearscreen'></screenComponent>
    <previewerComponent :list="previewerImgList" :isForList=true
                        ref="previewer"></previewerComponent>
    <searchComponent v-if="searchshow"></searchComponent>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions} from 'vuex'
  import headerComponent from 'components/Header.vue'
  import shareComponent from 'components/common/NewShare.vue'
  import goTopComponent from 'components/common/GoTop.vue'
  import navigationModalComponent from 'components/common/NavigationModal.vue'
  import FooterComponent from "components/Footer.vue"
  import previewerComponent  from 'components/account/AccountPreviwer.vue'
  import screenComponent from './screen'
  import searchComponent from './EquipmentSearch'
  import serverComponent from './ChoiceServer.vue'
  export default {
    template: '#goodslist',
    data(){
      return {
        searchshow: false,
        previewerImgList: [],
        queryData: null,
        sortList: null,
        pageCount: 20,
        loading: null,
        showNoResult: false,
        containerHeight: window.innerHeight,
        isSortShow: false,
        isServerShow: false,
        isTypeShow: false,
        isScreenShow: false,
        shareStatus: false,
        clearscreen: false,
        selectSortName: "排序",
        postDataForAccount: {},
        controlId: 'goodsContainerList',
        bottxt: '',
        showBottxt: false,
        //商品类型
        selectGoodsTypeName: "",
        selectGoodsTypeId: null,
        //筛选
        isAXM: false,
        isScreenShot: false,
        maxPrice: 9999999,
        choised: false,
        moreStatus: false,
        selectMoneyId: 0,
        minValue: [],
        maxValue: [],
        textFilter:[],
        filterNumber:[],
        filterInput: '',
        keyword:'',
        //区服
        selectLeftId: 2,
        selectPlatFormId: null,
        selectPlatFormName: "平台",
        selectGameAreaId: null,
        selectGameAreaName: "选择区",
        selectGameServerId: null,
        selectGameServerName: "选择服",
        displayServerName: "区服",
        pfSearchInput: "",
        gaSearchInput: "",
        gsSearchInput: "",
        //切换
        switchStatus: false,
        swiperOption: {
          autoplay: 0,
          freeMode: true,
          slidesPerView: 3,
          cssWidthAndHeight: true,
          preloadImages: false,
        },
        //具体某个商品的图片列表，目前后端没有，暂时用测试数据
      }
    },
    components: {
      shareComponent,
      goTopComponent,
      navigationModalComponent,
      FooterComponent,
      headerComponent,
      previewerComponent,
      screenComponent,
      searchComponent,
      serverComponent
    },
    computed: {
      platFormListFilter: function () {
        let str = this.pfSearchInput.toLowerCase();
        if (this.platFormList) {
          if (str) {
            return this.platFormList.filter(function (item) {
              return item.name.toLowerCase().indexOf(str) !== -1;
            });
          }
          else {
            return this.platFormList;
          }
        }
      },
      gameAreaListFilter: function () {
        let str = this.gaSearchInput.toLowerCase();
        if (this.gameAreaList) {
          if (str) {
            return this.gameAreaList.filter(function (item) {
              return item.name.toLowerCase().indexOf(str) !== -1;
            });
          }
          else {
            return this.gameAreaList;
          }
        }
      },
      gameServerListFilter: function () {
        var str = this.gsSearchInput.toLowerCase();
        if (this.gameServerList) {
          if (str) {
            return this.gameServerList.filter(function (item) {
              return item.name.toLowerCase().indexOf(str) !== -1;
            });
          }
          else {
            return this.gameServerList;
          }
        }
      },
      goodsList() {
        /*处理图片*/
        return this.$store.state.choice.goodsList.map(v => {
          let obj = JSON.parse(JSON.stringify(v)) //拷贝
          obj.big_img_list = v.big_img_list.split(';').filter(v => v.length) // 切成数组
          obj.small_img_list = v.small_img_list.split(';').filter(v => v.length) // 切成数组
          if (obj.big_img_list.length == 0) {
            obj.big_img_list.push(obj.goods_img.split('?')[0])
          }
          if (obj.small_img_list.length == 0) {
            obj.small_img_list.push(obj.goods_img)
          }
          return obj
        })
      },
      ...mapState({
        goodsScrollPosition: state => {
          return state.choice.goodsScrollPosition
        },
        isGoodsLoadAll: state => {
          return state.choice.isGoodsLoadAll
        },
        errMsg: state => {
          return state.choice.errMsg
        },
        warnMsg: state => {
          return state.choice.warnMsg
        },
        pcUrl: state => {
          return state.choice.pcUrl
        },
        goodsTypeList: state => {
          return state.choice.goodsTypeList
        },
        postData: state => {
          return state.choice.postData
        },
        gameAreaList: state => {
          return state.choice.gameAreaList
        },
        gameServerList: state => {
          return state.choice.gameServerList
        },
        filterPretyList: state => {
          return state.choice.filterPretyList
        },
        subFilterList: state => {
          return state.choice.subFilterList
        },
        safebuyConfig: state => {
          return state.equipment.safebuyConfig
        },
      }),
      ...mapGetters({
        screenfilters: 'choice/SCREENPRETY',
        filterNumberData: 'choice/FILTERNUMBERDATA',
        filterBetweenData: 'choice/FILTERBETWEENDATA',
        filterTextData: 'choice/FILTERTEXTDATA',
        screenfilters: 'choice/SCREENPRETY',
      })
    },
    filters: {
      imgfilter: function (path) {
        if (path == '//img1.5173.com/') {
          return '/dist/default_img.jpg'
        } else if (path.indexOf('img1.5173.com') > -1 && path.indexOf('x-oss-process=image') > -1) {
          return path
        } else if (path.indexOf('img1.5173.com') > -1) {
          return path + '?x-oss-process=image/resize,m_fixed,w_112'
        } else {
          return path
        }
      }
    },
    watch: {
      isGoodsLoadAll(curVal){
        if (curVal) {
          this.bottxt = '没有更多了'
          this.showBottxt = true
        }
      },
      errMsg (msg) {
        if (msg && Object.keys(msg).length > 0) {
          this.$messagebox({
            title: '提示',
            message: msg.message,
            closeOnClickModal: false
          }).then(() => {
            this.clearErr()
            if (msg.returnUrl) {
              location.href = msg.returnUrl
            }
          })
        } else {
          if (document.getElementsByClassName("mint-msgbox-wrapper").length > 0) {
            this.$messagebox.close()
          }
        }
      },
      warnMsg (msg) {
        if (msg && Object.keys(msg).length > 0) {
          this.$toast({
            message: msg.message,
            duration: msg.duration || 2500,
            position: msg.position || 'middle'
          })
          if (msg.duration) {
            setTimeout(() => {
              this.clearWarn()
            }, msg.duration)
          } else {
            setTimeout(() => {
              this.clearWarn()
            }, 3000)
          }
        }
      },
      loadScrollPosition (willLoadScrollPosition) {
        if (willLoadScrollPosition) {
          this.$nextTick(() => {
            this.$refs.goodsContainerList.scrollTop = this.goodsScrollPosition
          })
        }
      },
    },
    beforeRouteEnter (to, from, next) {
      if (from.name != 'CoinsSales' && from.name != 'equipmentDetail') {
        next(vm => {
          vm.clearGoodsList()
          vm.clearPlatformList()
          vm.clearGameAreaList()
          vm.clearGameServerList()
          vm.clearTypeList()
          vm.clearPostData()
          vm.setDefault()
        })
      } else {
        next(vm => {
          vm.setDefault()
        })
      }
    },
    mounted: function () {
      this.setXiaoNeng();
      this.setSwitch();
      this.$bus.emit('isMore', true);
//      this.$bus.emit('sshow', true);
    },
    beforeDestroy: function beforeDestroy() {
      this.$bus.emit('shareShow', false)
      this.$bus.emit('isSwitch', false)
      this.postData.switchStatus = this.switchStatus;
      this.actPostData(this.postData);
    },
    methods: {
      showImages (index, item) {
        let targetUrl = {
          name: 'MGAccountDetail',
          params: {
            goodsId: item.id,
            goods_source_type: item.goods_source_type ? item.goods_source_type : 0,
          }
        };
        while (this.previewerImgList.length) {
          this.previewerImgList.pop()
        }
        // 初始化
        item.big_img_list.map(v => {
          let obj = {
            "src": v,
            "w": 375,
            "h": 667
          }
          this.previewerImgList.push(obj)
        });
        this.$refs.previewer.show(index, targetUrl)
      },
      setSwitch(){
//        this.$bus.emit('isSwitch', true)
        this.$bus.emit('isSwitch', false)
        if (this.postData.switchStatus != null) {
          this.switchStatus = this.postData.switchStatus;
          this.$bus.emit('switchStatus', this.switchStatus)
        }

        this.$bus.on('switchStatus', sta => {
          this.switchStatus = sta;
        })
      },
      setXiaoNeng(){
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
      },
      wsz() {
        this.$nextTick(() => {
          this.containerHeight = this.$getScreenHeight()
        })
      },
      goodsTypeShow: function goodsTypeShow() {
        this.isSortShow = false
        this.isServerShow = false
        this.isTypeShow = !this.isTypeShow
      },
      serverShow: function serverShow() {
        this.isSortShow = false
        this.isServerShow = !this.isServerShow
        this.isTypeShow = false

      },
      sortShow: function sortShow() {
        this.isSortShow = !this.isSortShow
        this.isServerShow = false
        this.isTypeShow = false

      },
      toggleScreen: function toggleScreen() {
        this.isScreenShow = !this.isScreenShow
        this.isSortShow = false
        this.isServerShow = false
        this.isTypeShow = false
      },
      mstfivClick() {
        this.isSortShow = false
        this.isServerShow = false
        this.isTypeShow = false
        /*
         1. 如果没有选中
         1. 平台没有选中
         列表本省没有选中，不处理
         之后没有选中，处理
         2. 客户端没有选中
         不限处理
         3. 服务器没有选中
         不限处理
         4. 无数据问题
         列表为空
         如果没有选中*/
        if (this.displayServerName === '区服') {
          // if (this.selectLeftId == 1 && this.selectPlatFormId == null) {
          //   if (this.choised) { // 之前是选中的
          //     this.choised = false
          //     this.refreshList("SERVER");
          //   } else { // 之前是不选中的，
          //   }
          // }
          if (this.selectLeftId == 2) {
            this.changeGameArea(0)
            this.isServerShow = false
            this.choised = true
          }
          if (this.selectLeftId == 3) {
            this.changeGameServer(0)
            this.isServerShow = false
            this.choised = true
          }
        } else {
          this.choised = true
        }
      },
      xiaonengClick() {
        NTKF.im_openInPageChat('bq_1000_9999');
      },
      shareClick() {
        this.shareStatus = true
        this.moreStatus = true
        this.$bus.emit('shareShow', this.shareStatus)
        this.$bus.emit('busShareUrl', window.location.href)
      },
      homeClick() {
        location.href = '/'
      },
      messageClick() {
        location.href = '/member/message.html'
      },
      moreClick() {
        this.moreStatus = !this.moreStatus
      },
      mapSelectedItems(){
        if (this.goodsTypeList != null) {
          this.goodsTypeList.forEach(elem => {
            if (elem.goodsType == this.selectGoodsTypeId) {
              this.selectGoodsTypeName = elem.goodsTypeName;
              this.selectGoodsTypeId = elem.goodsType;
              return false;
            }
          })
        }

        //排序
        if (this.sortList && this.sortList.list) {
          let isMatch = false;
          this.sortList.list.forEach(elem => {
            if (elem.sortTypeId == this.postData.selectSortType) {
              this.selectSortName = elem.sortTypeName
              isMatch = true;
              return false;
            }
          })
          if (!isMatch) {
            this.selectSortName = "单价最低";
          }
        }

        //筛选
        if (this.postData.isAXM != null)
          this.isAXM = this.postData.isAXM;
        if (this.postData.isScreenShot != null)
          this.isScreenShot = this.postData.isScreenShot;
        if (this.postData.minValue != null)
          this.minValue = this.postData.minValue;
        if (this.postData.maxValue != null)
          this.maxValue = this.postData.maxValue;
        if (this.postData.selectMoneyId != null)
          this.selectMoneyId = this.postData.selectMoneyId;

        //区服
        if (this.postData.selectLeftId != null)
          this.selectLeftId = this.postData.selectLeftId;
        if (this.postData.selectPlatFormId != null)
          this.selectPlatFormId = this.postData.selectPlatFormId;
        if (this.postData.selectPlatFormName != null)
          this.selectPlatFormName = this.postData.selectPlatFormName;
        if (this.postData.selectGameAreaId != null)
          this.selectGameAreaId = this.postData.selectGameAreaId;
        if (this.postData.selectGameAreaName != null)
          this.selectGameAreaName = this.postData.selectGameAreaName;
        if (this.postData.selectGameServerId != null)
          this.selectGameServerId = this.postData.selectGameServerId;
        if (this.postData.selectGameServerName != null)
          this.selectGameServerName = this.postData.selectGameServerName;
        if (this.postData.displayServerName != null)
          this.displayServerName = this.postData.displayServerName;
      },
      getSortList(){
        switch (this.selectGoodsTypeId.toString()) {
          case "1":
            this.sortList = {
              isSingleChoice: false,
              list: [
                {
                  "sortTypeId": 1,
                  "sortTypeName": "最新发布"
                },
                {
                  "sortTypeId": 3,
                  "sortTypeName": "价格最低"
                },
                {
                  "sortTypeId": 4,
                  "sortTypeName": "价格最高"
                }
              ]
            };
            break;
          case "2":
            this.sortList = {
              isSingleChoice: false,
              list: [
                {
                  "sortTypeId": 1,
                  "sortTypeName": "最新发布"
                },
                {
                  "sortTypeId": 3,
                  "sortTypeName": "价格最低"
                },
                {
                  "sortTypeId": 4,
                  "sortTypeName": "价格最高"
                }
              ]
            };
            break;
          case "3":
            this.sortList = {
              isSingleChoice: true,
              list: [
                {
                  "sortTypeId": 5,
                  "sortTypeName": "单价最低"
                },
              ]
            };
            break;
        }
      },
      rescreen() {
        this.clearscreen = true
        this.toggleScreen()
      },
      async setDefault () {
        this.$bus.emit('headerText', this.$route.params.gameName);
        if (this.goodsList.length === 0) {
          await this.updatePostData();
        } else {
          let p = this.postData.page
          await this.updatePostData();
          await this.updatePostData('PAGE', p)
        }
        //通过游戏ID获得 类型列表
        if (this.goodsTypeList == null || this.goodsTypeList.length === 0) {
          await this.getGoodsType({
            gameId: this.postData.gameId
          })
        }
        //通过游戏ID获得 区列表
        if (this.gameAreaList == null || this.gameAreaList.length === 0) {
          await this.getPcGameAreaList({
            parentId: this.postData.gameId,
            gid: this.postData.gameId
          })
          if (this.gameAreaList.length>0) {
            await this.getPcGameServerList({
              parentId: this.gameAreaList[0].catagoryId,
            })
          }
        }
        //根据商品类型，获取排序列表
        this.getSortList()

        //匹配当前列表
        this.mapSelectedItems()



        //获取当前商品页
        if (this.goodsList.length === 0) {
          await this.updateListData();
          //获取筛选属性
          await this.getPretyList({
            goodsTypeId: 1,
            gameName: this.$route.params.gameName
          })
          await this.GetSafeBuyConfig({
            gameId: this.$route.params.gameId,
            goodsType: 1
          })
        } else {
          this.$refs.goodsContainerList.scrollTop = this.goodsScrollPosition
        }
        this.wsz();
        this.showNoResult = true
      },
      handleScroll: async function () {
        this.saveGoodsListScrollPosition(this.$refs.goodsContainerList.scrollTop)
        if (this.$refs.goodsContainerList.scrollHeight - this.$refs.goodsContainerList.scrollTop - this.containerHeight < 600) {
          if (!this.isGoodsLoadAll) {
            await this.updatePostData("PAGE", this.postData.page + 1);
            await this.updateListData();
          }
        }
      },
      nextPage: function nextPage(item) {
        if (this.selectGoodsTypeId == 2) {
          this.$router.push({
              name: 'accountDetail',
              path: '/vue/account/accountDetail',
              params: {goodsId: item.id, goods_source_type: item.goods_source_type ? item.goods_source_type : 0, gameType:1}
          })
        }
        else if (this.selectGoodsTypeId == 3) {
          if (item.goods_source_type == 0) {
            location.href = '/order/order-coins-check.html' +
              '?unitNum=' + (item.total_amount || '') +
              '&rowCat=' + 2 +
              '&goodsId=' + (item.id || '') +
              '&buyerType=' + 2 +
              '&gameId=' + (item.game_id || '') +
              '&regionId=' + (item.region_id || '') +
              '&serverId=' + (item.server_id || '') +
              '&raceId=' + (item.race_id || '') +
              '&gname=' + (item.game_name || '') +
              '&areaname=' + (item.region_name || '') +
              '&servername=' + (item.server_name || '') +
              '&racename=' + (item.race_name || '')
          } else {
            this.$router.push(
              {
                name: 'CoinsSales', query: {
                'gid': item.game_id,
                'gname': item.gname,
                'goodsType': 3,
                'raceId': this.selectPlatFormId,
                'racename': this.selectPlatFormName,
                'areaid': this.selectGameAreaId,
                'areaname': this.selectGameAreaName,
                'serverid': this.selectGameServerId,
                'servername': this.selectGameServerName,
                'title': item.title,
                'blancenum': item.delivery_num,
                'unit_num': item.total_amount,
                'unit_addition': item.unit_addition,
                'id': item.id,
                'isJis': item.trading_service_type,
                'Price': item.unit_price,
                'locked': item.unit_promise_time_locked > 0 ? true : false,
                'flag': item.biz_offer_flag.indexOf('保') > 0 ? true : false,
                'c_deposit': item.deposit > 0 ? true : false,
                'yitoubao': item.biz_offer_flag == '~',
              }
              }
            )
          }
        } else if (this.selectGoodsTypeId == 1) {
          this.$router.push({
              name: 'equipmentDetail',
              path: '/vue/equipment/equipmentDetail',
              params: {goodsId: item.id, goods_source_type: item.goods_source_type ? item.goods_source_type : 0, gameType:1}
          })
        }

      },
      //改变商品类型
      changeGoodsType(item) {
        if (this.selectGoodsTypeId == item.goodsType) {
          this.isTypeShow = false;
          return false;
        }
        //由于三通，目前该页面只处理帐号
        if (item.goodsType == 2) {
          this.$router.push({
            name:'PcGoodsList',
            path:'/vue/pcGoodsList',
            params:{
              gameId:this.$route.params.gameId,
              gameName:this.$route.params.gameName,
              goodsType:2,
            }
          })
        }
        else if (item.goodsType == 3) {
          location.href = '/vue/search/searchArea?gameId='+this.postData.gameId+'&gName='+this.$route.params.gameName+'&goodsType=3&gameType=1&tradeType=3&typename=游戏币'
        }
        else if (item.tradeType == 5) {
          location.href = '/vue/search/searchArea?gameId='+this.postData.gameId+'&gName='+this.$route.params.gameName+'&goodsType='+item.goodsType+'&gameType=1&tradeType='+item.tradeType+'&typename='+item.goodsTypeName
        }
        else {
          location.href = '/search/search-game-area.html?gid=' + this.postData.gameId + '&gname=' + this.$route.params.gameName + '&goodsType=' + item.goodsType + '&typename=' + item.goodsTypeName
        }
      },
      //改变搜索顺序，多个选项的情况
      changeSortType(e){
        if (this.postData.selectSortType === e.sortTypeId || this.goodsList.length == 0) {
          this.postData.selectSortType = e.sortTypeId;
          this.selectSortName = e.sortTypeName;
          this.isSortShow = false
          return false;
        } else {
          this.postData.selectSortType = e.sortTypeId;
          this.selectSortName = e.sortTypeName;
          this.refreshList("SORT")
          this.isSortShow = false
        }
      },



      //更新post对象
      updatePostData: async function (t, p) {
        let type = arguments[0] ? arguments[0] : "";
        let page = arguments[1] ? arguments[1] : 1;
        switch (type) {
          case "SORT":
            this.postData.page = 1;
            switch (this.postData.selectSortType) {
              case 1:
                this.postData.sortMap = {
                  create_time: "-"
                }
                break;
              case 2:
                this.postData.sortMap = {
                  browse_count: "-",
                  create_time: "-"
                }
                break;
              case 3:
                this.postData.sortMap = {
                  price: "+",
                  create_time: "-"
                }
                break;
              case 4:
                this.postData.sortMap = {
                  price: "-",
                  create_time: "-"
                }
                break;
              case 5:
                this.postData.sortMap = {
                  unit_price: "-"
                }
                break;
              default:
                this.postData.sortMap = {
                  create_time: "-"
                }
            }
            break;
          case "GOODSTYPE":
            this.postData.page = 1;
            this.postData.selectGoodsTypeId = this.selectGoodsTypeId;
            this.postData.selectGoodsTypeName = this.selectGoodsTypeName;
            break;
          case "SERVER":
            this.postData.page = 1;
            this.postData.selectLeftId = this.selectLeftId;
            this.postData.selectGameAreaId = this.selectGameAreaId;
            this.postData.selectGameAreaName = this.selectGameAreaName;
            this.postData.selectGameServerId = this.selectGameServerId;
            this.postData.selectGameServerName = this.selectGameServerName;
            break;
          case "SCREEN":
            this.postData.page = 1;
            this.postData.accurateMap = {}
            this.postData.betweenMap = {}
            this.postData.keyWordList = []
            this.postData.minValue = this.minValue;
            this.postData.maxValue = this.maxValue;
            // this.postData.isAXM = this.isAXM;
            // this.postData.isScreenShot = this.isScreenShot;
            // this.postData.selectMoneyId = this.selectMoneyId;
            for (let jh of this.screenfilters) {
              for (let val in jh) {

                let arr = []
                let m = {}
                let axm = {}
                let wh = {}
                let sub = {}
                let ktb = {}
                let ytb = {}
                if(jh[val].length>0) {
                  for (let jk of jh[val]) {
                    if (val != 'keyWordList') {
                      if (!this.postData[val][jk.filterAlyField]){
                        this.postData[val][jk.filterAlyField] = []
                      }
                      this.postData[val][jk.filterAlyField].push(jk.filterValue.toString())
                    }  else {
                      if (jk.filterAlyField == 'is_axm') {
                        axm.is_axm = [jk.filterValue]
                      } else if (jk.filterAlyField == 'biz_offer_flag'&&jk.filterValue=='保') {
                        ktb.biz_offer_flag = [jk.filterValue]
                      } else if (jk.filterAlyField == 'biz_offer_flag'&&jk.filterValue=='~') {
                        ytb.biz_offer_flag = [jk.filterValue]
                      }
                       else if(jk.filterValue == '无货赔付:true') {
                        wh.filter_property = [jk.filterValue]
                      } else if (jk.filterAlyField=='filter_subcate') {
                        if (sub.filter_property) {
                          sub.filter_property.push(jk.filterValue)
                        } else {
                          sub.filter_property = [jk.filterValue]
                        }
                      } else {
                        if (m[jk.filterAlyField]) {
                          m[jk.filterAlyField].push(jk.filterValue)
                        } else {
                          m[jk.filterAlyField] = [jk.filterValue]
                        }
                      }
                    }

                  }
                }
                if (Object.keys(m).length>0) {
                  this.postData.keyWordList.push(m)
                }
                if (Object.keys(sub).length>0) {
                  this.postData.keyWordList.push(sub)
                }
                if (Object.keys(axm).length>0) {
                  this.postData.keyWordList.push(axm)
                }
                if (Object.keys(wh).length>0) {
                  this.postData.keyWordList.push(wh)
                }
                if (Object.keys(ktb).length>0) {
                  this.postData.keyWordList.push(ktb)
                }
                if (Object.keys(ytb).length>0) {
                  this.postData.keyWordList.push(ytb)
                }
              }
            }
            //获取数字输入的筛选数据
            if (this.filterNumber.length>0) {
              for (let val in this.filterNumberData) {
                this.filterNumberData[val].forEach(elem => {
                  if (this.filterNumber[elem.filterValue]) {
                    if (val == 'keyWordList') {
                      if (!this.postData[val]){
                        this.postData[val] = []
                      }
                      let m = {}
                      if (elem.filterAlyField == 'filter_property') {
                        m[elem.filterAlyField] = [elem.propertyName+':'+this.filterNumber[elem.filterValue]]
                      } else {
                        m[elem.filterAlyField] = [this.filterNumber[elem.filterValue]]
                      }
                      this.postData[val].push(m)

                    }
                    if (val == 'accurateMap') {
                      if (!this.postData[val][elem.filterAlyField]){
                        this.postData[val][elem.filterAlyField] = []
                      }
                      this.postData[val][elem.filterAlyField].push(this.filterNumber[elem.filterValue].toString())
                    }
                  }
                });
              }
            }
            //获取区间筛选数据
            if (this.minValue.length>0||this.maxValue.length>0) {
              for (let val in this.filterBetweenData) {
                this.filterBetweenData[val].forEach(elem => {
                  let minvalue = this.minValue[elem.filterValue]?this.minValue[elem.filterValue]:''
                  let maxvalue = this.maxValue[elem.filterValue]?this.maxValue[elem.filterValue]:''
                  if (this.maxValue[elem.filterValue]||this.minValue[elem.filterValue]) {
                    if (val == 'keyWordList') {
                      if (!this.postData[val]){
                        this.postData[val] = []
                      }
                      let m = {}
                      if (elem.filterAlyField == 'filter_property') {
                        m[elem.filterAlyField] = [elem.propertyName+':'+minvalue+'-'+maxvalue]
                      } else {
                        m[elem.filterAlyField] = [minvalue+'-'+maxvalue]
                      }
                      this.postData[val].push(m)
                    }
                    if (val == 'betweenMap') {
                      if (!this.postData[val][elem.filterAlyField]){
                        this.postData[val][elem.filterAlyField] = []
                      }
                      this.postData[val][elem.filterAlyField].push(minvalue+'-'+maxvalue)
                    }
                  }
                });
              }
            }
            //获取文字输入筛选数据
            if (this.textFilter.length>0) {
              for (let val in this.filterTextData) {
                this.filterTextData[val].forEach(elem => {
                  if (this.textFilter[elem.filterValue]) {
                    if (!this.postData[val][elem.filterAlyField]){
                      this.postData[val][elem.filterAlyField] = []
                    }
                    if (val == 'keyWordList') {
                      let m = {}
                      if (elem.filterAlyField == 'filter_property') {
                        m[elem.filterAlyField] = [elem.propertyName+':'+this.textFilter[elem.filterValue]]
                      } else {
                        m[elem.filterAlyField] = [this.textFilter[elem.filterValue]]
                      }
                      this.postData[val].push(m)
                    }
                    if (val == 'accurateMap') {
                      this.postData[val][elem.filterAlyField].push(this.textFilter[elem.filterValue])
                    }
                  }
                });
              }
            }
            break;
          case "PAGE":
            this.postData.page = page;
            break;
          default:
            this.postData.selectSortType = 1;
            this.postData.gameId = this.$route.params.gameId;
            this.postData.selectGoodsTypeId = this.postData.selectGoodsTypeId || this.$route.params.goodsType;
            this.selectGoodsTypeId = this.postData.selectGoodsTypeId;
            this.postData.page = 1
            if (this.selectGoodsTypeId == 3) {
              this.postData.sortMap = {
                unit_price: "-"
              }
            }
            else {
              this.postData.sortMap = {
                create_time: "-"
              }
            }
            break;
        }
        this.mapSelectedItems();
        await this.actPostData(this.postData);
      },
      //更新列表，重新加载
      refreshList: async function (e) {
        this.clearGoodsList()
        await this.updatePostData(e);
        await this.updateListData();
        this.$refs.goodsContainerList.scrollTop = 0
      },
      //更新列表数据
      updateListData: async function () {


        this.postDataForAccount = {
          accurateMap: {
            goods_type: [this.postData.selectGoodsTypeId.toString()],
            game_id: [this.postData.gameId.toString()],
          },
          keyWordList: this.postData.keyWordList,
          betweenMap: this.postData.betweenMap,
          page: this.postData.page,
          pageCount: this.pageCount,
          sortMap: this.postData.sortMap,
          gameName:this.$route.params.gameName,
          goodsType:this.$route.params.goodsType
        }

        this.postDataForAccount.accurateMap = Object.assign(this.postDataForAccount.accurateMap, this.postData.accurateMap)


        //区服
        //不限
        if (this.selectGameAreaId == 0) {
          //this.postDataForAccount.accurateMap.service_provider_id = [this.selectPlatFormId.toString()]
        }
        //不限
        else if (this.selectGameAreaId != null && this.selectGameAreaId != 0 && this.selectGameServerId == 0) {
          //this.postDataForAccount.accurateMap.service_provider_id = [this.selectPlatFormId.toString()]
          this.postDataForAccount.accurateMap.region_id = [this.selectGameAreaId.toString()]
        }
        //具体一个服
        else if (this.selectGameAreaId != null && this.selectGameAreaId != 0 && this.selectGameServerId != null && this.selectGameServerId != 0) {
          //this.postDataForAccount.accurateMap.service_provider_id = [this.selectPlatFormId.toString()]
          this.postDataForAccount.accurateMap.region_id = [this.selectGameAreaId.toString()]
          this.postDataForAccount.accurateMap.server_id = [this.selectGameServerId.toString()]
        }

        this.loading = true
        if(this.selectGoodsTypeName) {
          //神策开始
          var isLog,map,keyWord,between,shoppingType;
          if(this.postDataForAccount.goodsType==1){
            shoppingType = "装备";
          }else if(this.postDataForAccount.goodsType==2){
            shoppingType = "账号";
          }else if(this.postDataForAccount.goodsType==3){
            shoppingType = "游戏币";
          }else{
            shoppingType = "其他";
          };
          isLog = this.$CONSTANTS.isLogin;
          map = JSON.stringify(this.postDataForAccount.accurateMap);
          keyWord = JSON.stringify(this.postDataForAccount.keyWordList ? this.postDataForAccount.keyWordList : "");
          between = JSON.stringify(this.postDataForAccount.betweenMap ? this.postDataForAccount.betweenMap : "");
          sa.track("goodsList",{
            platfromType:"H5",
            belongGame:this.postDataForAccount.gameName,
            gameType:this.postDataForAccount.gameName,
            accurateMap:map,
            keyWordList:keyWord,
            betweenMap:between,
            goodsType:shoppingType,
            isLogin:isLog
          });
          //神策结束
          await this.getListData(this.postDataForAccount)
        }
        this.loading = false
      },
      clearKeyword() {
        this.$store.commit('clearKeyword')
        this.keyword = ''
        this.refreshList()
      },
      clearKeywordnotfresh() {
        this.$store.commit('clearKeyword')
        this.keyword = ''
      },
      ...mapActions({
        getListData: 'choice/GET_LISTDATA',
        clearGoodsList: 'choice/CLEAR_GOODSLIST',
        clearTypeList: 'choice/CLEAR_TYPELIST',
        saveGoodsListScrollPosition: 'choice/SAVEGOODSLISTSCROLLPOSITION',
        getGoodsType: 'choice/GET_GOODSTYPELIST',
        setDefaultPage: 'choice/SETDEFAULTPAGE',
        clearErr: 'choice/CLEAR_ERR',
        clearWarn: 'choice/CLEAR_WARN',
        actPostData: 'choice/ACTPOSTDATA',
        clearPostData: 'choice/CLEARPOSTDATA',
        getPlatformList: 'choice/ACTPLATFORMLIST',
        getPcGameAreaList: 'choice/ACTPCGAMEAREALIST',
        getPcGameServerList: 'choice/ACTPCGAMESERVERLIST',
        getGameAreaList: 'choice/ACTGAMEAREAlIST',
        getGameServerList: 'choice/ACTGAMESERVERLIST',
        clearPlatformList: 'choice/CLEARPLATFORMLIST',
        clearGameAreaList: 'choice/CLEARGAMEAREAlIST',
        clearGameServerList: 'choice/CLEARGAMESERVERLIST',
        getPretyList: 'choice/GETFILTERPRETYLIST',
        checkFilterPrety: 'choice/UPDATEFILTERPRETYLIST',
        clearFilterPrety: 'choice/CLEARFILTERPRETY',
        manychoilce: 'choice/MANYCHOILCE',
        actsubchoice: 'choice/ACTSUBCHOILCELIST',
        GetSafeBuyConfig: 'equipment/GETSAFEBUYCONFIG',
      })
    }
  }
</script>

<style src='css/common/list-cl.css' scoped></style>
<style src='css/equipment/equipment-wjr.css' scoped></style>
<style src="css/plugin/swiper.css"></style>
<style >
  .loading {
    text-align: left;
    text-indent: .6rem;
    line-height: .5rem;
    height: .5rem;
    background: url('~images/loading.gif') left center no-repeat;
    background-size: .5rem;
    margin-left: 2.5rem;
  }
.seach-list{    border-top: 1px solid #e8e8e8;}
  .goods-container .lists {
    overflow-y: auto;
    overflow-scroll: touch;
  }

  .more_message {
    display: block;
    position: fixed;
    z-index: 999;
  }

  .more_message:before {
    content: "";
    height: 15px;
    width: 15px;
    background: #fff;
    display: block;
    position: absolute;
    top: -7.5px;
    right: 9px;
    border-width: 1px;
    border-style: solid;
    border-color: #e8e8e8 #fff #fff #e8e8e8;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }

  .list-main .lists {
    /*margin-top: 2.12rem;*/
    margin-top: 0rem;
    margin-bottom: 0rem;
    padding-bottom: 0.2rem;
  }

  .default_numb {
    top: 1.86rem !important;
  }

  .mobilegames-nav {
    z-index: 32;
    position: fixed;
    width: 100%;
    max-width: 768px;
  }

  .show-right {
    position: absolute;
    z-index: 63 !important;
    top: 0;
    right: 0;
    min-width: 10%;
    height: .96rem;
    line-height: .96rem;
  }

  .sharelist {
    display: inline-block;
    height: .96rem;
    min-width: .75rem;
    width: 100%;
    text-indent: -9999px;
    background: url(~images/header-member-top.png) 0 center no-repeat;
    background-size: .49rem;
  }

  .shot {
    margin-left: .2rem;
  }

  .gmvst-profile {
    z-index: 31;
  }

  .gmvst-profile ul li {
    padding-left: 0;
  }

  .gmvst-profile ul li.active {
    background: none;
  }

  .gmvst-server ul li {
    background: #fbfbfb;
  }

  .gmvst-area ul {
    /*margin-top: 0 !important;*/
    height: 7rem;
  }

  .default_numb .gmvst-area ul li.active {
    background-color: #fff;
  }

  .gmvst-server ul li.choice span {
    white-space: nowrap;
  }

  .gmvst-server ul li.curren {
    background-color: #fff !important;
  }

  .gmvst-area ul.hasSearch {
    margin-top: 0 !important;
    height: 8.5rem;
  }

  .pro-list-01 .pro-pic .pro-cata {
    left: 1.17rem;
  }

  .img-demopic {
    width: 100%;
    padding: 0.2rem 0.15rem 0.2rem 0;
  }
    .img-demopic img {
        width: 100%;
        height: 1.7rem;
    }
  .swiper-slide {
    float: left;
    height: auto;
  }

  .list-main .account-02 {
    padding: 0.3rem 0 0.3rem 0.3rem;
  }

  .listware .hrgames-tne {
    display: inline-block;
  }
  .filter-content{
    z-index: 101!important;
    height: 100vh;
    width: 73%;
    position: fixed;
    top: 0;
    max-width: 768px;
    margin-left: 27%;
    padding-bottom: 1.2rem;
  }
  .filter-confirm{
    background: #fff;
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;
  }
  .filter-mask {
      width: 100%;
      height: 100%;
    position: fixed;
      top: 0;
      background: rgba(0,0,0,.5);
      z-index: 100;
      max-width: 768px;
      overflow: hidden;
  }
.filter-list {
  padding:0 .3rem;
  background: #fff !important;
}
.manyul {

}
.manyul li{
  border-bottom: #dfdfdf 1px solid; position: relative;;
   height: 1rem; line-height: 1rem;
   font-size: .3rem;
}
.manyul li .chore-ico{ position: absolute; right: 0; top: 0; height: 1rem; background:url(~images/Icon/chore-ico.png) 0 center no-repeat; width: 0.3rem; background-size: 0.3rem; }
.manyul li .chore-ico-hov{background:url(~images/Icon/chore-ico-hov.png) 0 center no-repeat; background-size: 0.3rem; }

.manycheckbox {
  float: right;
}

.filter-confirm a {
    width: 66%;
    margin: 2% 3%;
    height: .92rem;
    line-height: .92rem;
    border: 1px solid #f75e46;
}
.filter-content .top-header h2 {
  margin-left: 0;
}
.chore-seach { display: block; height: auto; overflow: hidden;}
.number-input {
  height: .73rem;
  line-height: .43rem;
  width: 33%;
  background: #f5f5f5;
  border: none;
  text-align: center;
  color: #000;
  float: right;
  margin-top: .18rem;
}
.text-input {
  height: .73rem;
  line-height: .43rem;
  width: 100%;
  background: #f5f5f5;
  border: none;
  text-align: left;
  color: #000;
  float: right;
  margin-bottom: .28rem;
  padding-left: 0.2rem;
}
.list-main2{
  padding-top: .1rem;
}
.f30.color-ccc{
  font-size: .3rem;
  color: #999;
}
.nobg.container-ms span{
  background: none;
}
i.del-icon{
  height: .62rem;
  width: .3rem;
  background: url(~images/del.png) no-repeat right center;
  background-size: 0.3rem;
  margin-right: .3rem;
  position: absolute;
  top: 1.1rem;
  right: .13rem;
}
.typescroll{
  height: 5.3rem;
  overflow: scroll;
  position: relative;
  z-index: 999;
}
</style>
