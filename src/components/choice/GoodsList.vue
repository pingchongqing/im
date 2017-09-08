<template>
  <div >
    <div v-show="!isScreenShow">
      <v-header
         :show="true"
         :showSwitch="true"
         :switchState="switchState"
         @switchClick="switchClick"
         :title="gameName"></v-header>
      <div id="#goodslist">
        <div class="fixed-top fixed-box" style="z-index:39;">
          <!-- 筛选条件 -->
          <div class="mobilegames-nav border-bottom mt-97 bg-fff" @touchmove.prevent>
            <div class="gmnav-mle">
              <div class="navdemo" @click="goodsTypeShow" :class="{active:isTypeShow}">
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
              <div class="navdemo" @click="toggleScreen" >
                <a><span
                 class="screen color-666 f30" >筛选</span></a>
              </div>
            </div>
          </div>
          <!--类型 -->
          <div class="default_numb" v-show="isTypeShow" @touchmove.prevent>
            <ul>
              <li v-for="elem in goodsTypeList"
                  :key="elem.goodsType"
                  :class="{active: elem.goodsType == selectGoodsTypeId}"
                  @click="changeGoodsType(elem)"
              ><a>{{elem.goodsTypeName}}</a></li>
            </ul>
            <div class="mstfiv" @click="mstfivClick" style="margin-top: 0.96rem"></div>
          </div>
          <!--区服-->
          <div class="default_numb" v-show="isServerShow">

            <div class="gmvst-profile ">
              <div class="gmvst-server fl" @touchmove.prevent>
                <ul>
                  <li class="border-bottom"
                      :class="{'curren': selectLeftId==2, 'choice':selectGameAreaId!=null}"
                      @click="changeLeft(2)">
                    <a><span
                       class="f30 color-000">{{selectGameAreaName}}<i
                       class="close"></i></span></a>
                  </li>
                  <li class="border-bottom"
                      :class="{'curren': selectLeftId==3, 'choice':selectGameServerId!=null}"
                      @click="changeLeft(3)">
                    <a><span class="f30 color-000">{{selectGameServerName}} <i
                       class="close"></i></span></a>
                  </li>
                </ul>
              </div>

              <div class="gmvst-area bg-fff" v-show="selectLeftId==2">
                <div class="gvst-seach mx-30 my-20 border py-15 px-20"
                     v-if="gameAreaList && gameAreaList.length>8">
                  <input class="server-input"
                         name="" type="text"
                         placeholder="请输入区名称" maxlength="20" v-model.trim="gaSearchInput">
                </div>
                <ul ref="refClientList" class="pl-30"
                    :class="{'hasSearch':gameAreaList && gameAreaList.length<=8 }">
                  <li v-for="elem in gameAreaListFilter"
                      :key="elem.id"
                      class="border-bottom pr-30"
                      @click="changeGameArea(elem)" :class="{'active': elem.id==selectGameAreaId}"
                  ><span class="f30 color-000">{{elem.name}}</span></li>
                  <li v-if="gameAreaList.length==0"
                      class="border-bottom"
                  ><span class="f30 color-000">暂无数据</span></li>
                </ul>
              </div>
              <div class="gmvst-area bg-fff" v-show="selectLeftId==3">
                <div class="gvst-seach mx-30 my-20 border py-15 px-20"
                     v-if="gameServerList && gameServerList.length>8">
                  <input class="server-input"
                         name="" type="text"
                         placeholder="请输入服务器名称" maxlength="20" v-model.trim="gsSearchInput">
                </div>
                <ul ref="refServerList" class="pl-30"
                    :class="{'hasSearch':gameServerList && gameServerList.length<=8}">
                  <li v-for="elem in gameServerListFilter"
                      :key="elem.id"
                      class="border-bottom pr-30" :class="{'active': elem.id==selectGameServerId}"
                      @click="changeGameServer(elem)"
                  ><span class="f30 color-000">{{elem.name}}</span></li>
                  <li v-if="gameServerList.length==0"
                      class="border-bottom "
                  ><span class="f30 color-000">暂无数据</span></li>

                </ul>
              </div>
            </div>

            <div class="mstfiv" @click="mstfivClick" style="margin-top: 0.96rem" @touchmove.prevent></div>
          </div>
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
        <div class="goods-container" ref="goodsContainer" style="overflow: visible">
          <!-- 列表为空时的样式 -->

          <div ref="getMarginHeight" style="height: 2.12rem;"></div>
          <!-- 商品列表 -->
          <div class="list-main content " ref="goodsContainerListbig" v-show="goodsList.length>0||quickList.length>0" style="overflow: visible">
            <div class="lists bg-f1" :style="{height: containerHeight + 'px'}"
                  @scroll="handleScroll"
                 ref="goodsContainerList">

                 <a v-for="(item,index) in quickList" v-if="postData.selectGameAreaId&&postData.selectGameServerId" >
                     <div class="pro-list-01 ">
                         <div class="pro-pic">
                             <img :src="item.goods_img|imgfilter" v-if="item.goods_img"/>
                             <img src="~images/default_img.jpg" v-else/>
                         </div>
                         <div class="pro-title">
                             <p class="title3">{{item.select.title||'【快销号】--'+item.FileterDes}}</p>
                             <div class="price3 f30 color-666 seheight fw pt-15">
                                 <div class="fl">
                                     {{item.service_provider_name?item.service_provider_name+'/':''}}
                                     {{item.region_name}}/{{item.server_name}}
                                 </div>
                             </div>
                         </div>
                     </div>

                     <div class="quantity-num px-30 py-20 bg-fff border-bottom mb-20">
                         <div class="qannum-out border fl" @click="openSelect(item,index)">
                             <span class="fl out-lay f30 color-666 text-center">{{item.FileterDes}}</span>
                             <em class="out-input fl fontarial f32 color-000">{{item.select.name2}}</em>
                             <i class="out-ico fr"></i>
                         </div>
                         <div class="qannum-mon fl f36 color-m1" v-if="item.select.value ">￥{{item.select.value}}</div>
                         <div class="qannum-btn fr bg-f54 f30 text-center" :class="item.select.id?'':'disabled'"><span @click="nextquickPage(item,item.select.id)"  :disabled="!item.select.id">立即购买</span></div>
                     </div>
                 </a>

              <a v-for="item in goodsList" :key="item.id" @click="nextPage(item)" style="display:block; width:100%;">
                <!--帐号 切换1-->
                <div class="account-01 pro-list-01 mb-20"
                     v-if="switchState" style="overflow: visible">
                  <div class="mbilegames-list" style="overflow: visible">
                    <div class="listware">
                      <!--    <div class="mbgmes-img fl" @click.stop="showImages(0,item)">-->
                      <div class="mbgmes-img fl">
                        <img :src="item.goods_img|imgfilter" v-if="item.goods_img"/>
                        <img src="~images/default_img.jpg" v-else/>
                        <div class="picmun" v-if="item.small_img_list && item.small_img_list.length && item.small_img_list.length > 0">
                          <span class="f22 color-fff fontarial">{{item.small_img_list.length}}</span>
                        </div>
                      </div>
                      <div class="mbgmes-con">
                        <div class="mbl-title f32 color-000">{{item.title}}</div>
                        <div class="mbl-cper">
                          <div class="mbl-money color-m1 f32 fl">￥{{item.price}}</div>
                          <div class="mbl-icon fr">
                            <i class="an"
                               v-show="item.is_axm && item.is_axm==='true'"></i>
                            <!--<i class="shou"></i>-->
                            <i class="tu"
                               v-show="item.is_robot_capture && item.is_robot_capture==='true'"></i>
                           <i class="zhao"
                              v-show="item.qualified && item.qualified==='10'"></i>
                            <i class="pei"
                               v-show="parseInt(item.deposit)>0&&item.goods_source_type=='1'"></i>
                          </div>
                        </div>
                        <div class="mbl-parea color-666 f26">
                          {{item.region_name}}/{{item.server_name}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--帐号 切换2-->
                <div  class="account-02 pro-list-01 mb-20"
                     v-if="!switchState" style="overflow: visible">
                  <div class="mbilegames-list" style="overflow: visible">
                    <div class="listware bg-fff mb-20 pr-30">
                      <div class="hrgames-titl f32 color-000">{{item.title}}</div>
                      <!-- <div class="hrgames-img my-20 row">
                        <v-slide
                           :item="item"
                           @anyImgClick="anyImgClick"
                           :paddingLeft="paddingLeft"
                           :imgs="item.small_img_list"
                           :key="item.id"></v-slide>
                      </div> -->
                      <div class="hrgames-img my-20 row">
                      <swiper class=" margin-bottom" :options="swiperOption"
                                  ref="mySwiper">
                            <swiper-slide v-for="(src,index) in item.small_img_list" @click.stop.native="showImages(index,item)">
                              <div class="img-demopic fl">
                                <div style="height:80px; background:#000;">
                                <img v-if="src!==''" :src="src">
                                <img v-if="src==''" src="~images/default_img_info.jpg">
                              </div>
                              </div>
                            </swiper-slide>
                          </swiper>
                      </div>
                      <div class="hrgames-tne"><span
                         class="hr-price color-m1 f32 fl">￥{{item.price}}</span>
                        <span
                           class="hr-area f28 color-666 ml-30">{{item.region_name}}/{{item.server_name}}</span>
                      </div>
                      <div class="hrgames-cfi f26 color-666"
                           v-show="(item.is_axm && item.is_axm==='true') || (item.is_robot_capture && item.is_robot_capture==='true') || (item.qualified && item.qualified==='10') || (parseInt(item.deposit)>0&&item.goods_source_type=='1')">
                        <i class="firm mr-30"
                           v-show="item.is_axm && item.is_axm==='true'">安心买</i>
                        <!-- <i class="firm mr-30">首次出售</i>-->
                        <i class="firm mr-30"
                           v-show="item.is_robot_capture && item.is_robot_capture==='true'">截图认证</i>
                       <i class="firm mr-30"
                          v-show="item.qualified && item.qualified==='10'">找回包赔</i>
                        <i class="firm mr-30"
                           v-show="parseInt(item.deposit)>0&&item.goods_source_type=='1'">无货赔付</i>
                      </div>
                    </div>
                  </div>

                </div>

              </a>


            <div class="tab-empty" v-show="isGoodsLoadAll && !loading ">
              <div class="empty-conn">
                <div class="list-img"><img src="~images/gamelist.png"></div>
                <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
              </div>
            </div>
            </div>
            <shareComponent v-show="shareStatus"></shareComponent>
            <goTopComponent :controlId='controlId'></goTopComponent>
          </div>
          <div class="xiaoneng" @click="xiaonengClick"><em></em></div>
           <div class="smallfood" @click="smallfoodClick"><em></em></div>
          <div class="tab-empty" v-show="goodsList.length==0 && !loading && isGoodsLoadAll &&quickList.length==0">
            <div class="empty-conn">
              <div class="list-img"><img src="~images/gamelist.png"></div>
              <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
            </div>
          </div>

          <div class="loading" v-show="loading">加载中...</div>
          <navigationModalComponent></navigationModalComponent>
        </div>
      </div>
    </div>
    <!--筛选-->
    <div class="goodslist-02 pb-300" v-show="isScreenShow">
      <div class="top-header border-bottom fixed-top">
        <div class="top-back"><a @click="toggleScreen"></a></div>
        <h2 class="f36 ">精准筛选</h2>
        <div class="top-right"></div>
      </div>


    <div class="mt-97"></div>
    <template v-if="filterPretyList.length>0" v-for="(elem, index) in filterPretyList" >
      <template v-if="elem.subEOList" >
      <div class="screen-titl border-bottom mt-30 px-30 color-000 f32 bg-fff screen-ico" v-if="!((elem.filterControlType==1||elem.filterControlType==2)&&elem.subEOList.length==0)">
        <i class="fr src-ico manycheck" v-if="elem.subEOList.length>=9" :class="{'color-m1':manychecked(index)}" @click="manychoilce({index:index, manychoilce: true})">{{manychecked(index)?manychecked(index):'不限'}}</i>
        {{elem.propertyName}}
        <template  v-if="elem.filterControlType==4">
          <span class="fr px-10">{{elem.unitName?elem.unitName:''}}</span>
          <input class="number-input f30" type="tel" placeholder="请输入数字" maxlength="7"
                 v-model.number="filterNumber[index]" />
        </template>
      </div>
    </template>
      <div class="screen-price bg-fff">
        <template v-if="elem.filterControlType == 5 && elem.filterAlyField!='filter_property'">
          <div class="price-list px-30 py-30">
            <input class="price-input fl f30" type="tel" placeholder="最低" maxlength="7"
                   :value="minValue[index]"
                   @input="updateminMoney($event,index)">
            <span class="hern fl"></span>
            <input class="price-input fl f30" type="tel" placeholder="最高" maxlength="7"
                   :value="maxValue[index]"
                   @input="updatemaxMoney($event,index)">
          </div>
        </template>

        <template v-if="elem.subEOList">
        <div class="price-type pl-30 pt-30"  v-if="elem.subEOList.length<9&&elem.subEOList.length>0">
          <ul>
            <li class="fl mb-30" v-for="(subElem, subindex) in elem.subEOList"
                :key="subElem.id"
                :class="{state: subElem.checked&&elem.filterControlType==2, active:subElem.checked&&(elem.filterControlType==1||elem.filterControlType==5)}"
                @click="checkPrety(index, subindex, elem.filterControlType, subElem)"
            ><a><span class="border f30" v-text="subElem.propertyName"></span></a></li>

          </ul>
          <div class="pr-30 pb-30" v-if="elem.filterControlType ==3"><input class="text-input f30"  placeholder="输入筛选内容" /></div>
        </div>
      </template>

        <div class="price-type pl-30 pt-30 pt-30"  v-if="elem.filterControlType ==3">
          <div class="pr-30 pb-30" ><input class="text-input f30"  placeholder="输入筛选内容" v-model="textFilter[index]" /></div>
        </div>

        <!--多选-->
        <div v-show="elem.manychoilce">
          <div class="filter-mask"   style="height: 100%;bottom:0" @click="manychoilce({index:index, manychoilce: false})"></div>
          <transition name="fade_sx">
          <div class="filter-content bg-fff" style="height: 100%;overflow-y: scroll">
            <!-- top -->
            <div class="top-header border-bottom fixed-top">
              <div class="top-back">
                <a @click="manychoilce({index:index, manychoilce: false})">返回</a>
              </div>
              <h2 class="f36">{{elem.propertyName}}</h2>
            </div>
            <div class="chore-seach mt-97 border-bottom">
                <div class="gvst-seach mx-30 my-20 border py-15 px-20">
                  <input class="server-input" name="" type="text" placeholder="请输入关键字" v-model="filterInput" @input="filterChange(index)" />
                </div>
            </div>
            <div class="filter-list" ref="abcd" style="height: auto;overflow-y: scroll">
              <ul class="manyul" style="overflow-y: scroll">
                <li class="" @click="checkPrety(index, subindex, elem.filterControlType, subElem)"  v-for="(subElem, subindex) in subFilterList">
                  {{subElem.propertyName}}
                  <a class="chore-ico fr " :class="{'chore-ico-hov':subElem.checked}" ></a>
                </li>
              </ul>

            </div>
            <div class="filter-confirm  bg-fff" >
              <a class="sure text-center f32 fl bg-f54 color-fff" @click="manychoilce({index:index, manychoilce: false})">确定</a>
            </div>
          </div>
          </transition>
        </div>


      </div>


    </template>

      <div class="fixed-bottom border-top">
        <div class="goodslist-btn px-30 py-30 bg-fff">
          <a class="options f32 color-666 fl text-center" @click="clearScreen">清除选项</a>
          <a class="purchase f32 bg-f54 color-fff fr text-center" @click="confirmScreen">确定</a>
        </div>
      </div>




    </div>
    <previewerComponent :list="previewerImgList" :isForList=true
                        ref="previewer"></previewerComponent>

                        <transition name="fade">
                        <aside class="ConBox" v-if="isSelect">
                            <div class="top-header border-bottom">
                                <div class="top-back" @click="openSelect()"><a class="return conBack" href="javascript:void(0);"></a></div>
                                <h2 class="f36">选择</h2>
                            </div>
                            <div class="propertytxtdiv0 BoxLink Jbox">
                                <a v-for="item in  selectList.list" @click="selectItem(item)">{{item.name2}}</a>
                            </div>
                        </aside>
                    </transition>

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

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions} from 'vuex'
  import headerComponent from './common/switchHeader.vue'
  import shareComponent from 'components/common/NewShare.vue'
  import goTopComponent from 'components/common/GoTop.vue'
  import navigationModalComponent from 'components/common/NavigationModal.vue'
  import FooterComponent from "components/Footer.vue"
  import previewerComponent  from 'components/account/AccountPreviwer.vue'
  import slide from './swipe_slide.vue'
  export default {
    template: '#goodslist',
    data(){
      return {
        previewerImgList: [],
        queryData: null,
        sortList: null,
        pageCount: 20,
        loading: null,
        containerHeight: window.innerHeight,
        isSortShow: false,
        isServerShow: false,
        isTypeShow: false,
        isScreenShow: false,
        shareStatus: false,
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
        str:'',
        //区服
        selectLeftId: 2,
        selectPlatFormId: null,
        selectPlatFormName: "平台",
        selectGameAreaId: null,
        selectGameAreaName: "选择区",
        selectGameServerId: null,
        selectGameServerName: "选择服",
        displayServerName: "全区全服",
        pfSearchInput: "",
        gaSearchInput: "",
        gsSearchInput: "",
        filterNumber:[],
        quickList:[],
         isSelect:false,
        //切换
        switchStatus: false,
        swiperOption: {
          autoplay: 0,
          freeMode: true,
          slidesPerView: window.innerWidth>768?768/145:window.innerWidth/145,
          cssWidthAndHeight: true,
          preloadImages: false,
        },
        //具体某个商品的图片列表，目前后端没有，暂时用测试数据
        filterInput: '',
        switchState: true, // true 为单图，false 为多图
        gameName: this.$route.params.gameName, // 游戏名
        showGuide:false,
        paddingLeft: 0
      }
    },
    components: {
      shareComponent,
      goTopComponent,
      navigationModalComponent,
      FooterComponent,
      'v-header':headerComponent,
      previewerComponent,
      'v-slide': slide
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
        platFormList: state => {
          return state.choice.platFormList
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
      }),
      ...mapGetters({
        screenfilters: 'choice/SCREENPRETY',
        filterNumberData: 'choice/FILTERNUMBERDATA',
        filterBetweenData: 'choice/FILTERBETWEENDATA',
        filterTextData: 'choice/FILTERTEXTDATA'
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
      if (from.name != 'CoinsSales' && from.name != 'accountDetail' && from.name != 'quickorder') {
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
      anyImgClick({index, item}) {
        //this.$emit('clickImg', {index, item})
        this.showImages(index, item)
      },
      /* 引导页面点击 ‘我知道了’ */
      guided () {
        window.localStorage.MG_SHOW_GUIDE = 'true'
        this.showGuide = false
      },
      /* 多图切换按钮点击 */
      switchClick () {
        this.$refs.goodsContainerList.scrollTop = 0
        this.switchState = !this.switchState
        window.localStorage.MG_SWITCH_STATE = JSON.stringify({switch: this.switchState, d: new Date().getTime()})
        this.clearGoodsList();
        this.quickList = []
        this.updatePostData('PAGE')
        this.updateListData();
      },
      checkSendLength() {
        this.str = JSON.stringify(this.postData.keyWordList)
      },
      openSelect(list,index){
            this.isSelect = !this.isSelect;
            if(list){
              this.selectList = list;
              this.selectIndex = index;
            }
        },
      selectItem(item){
        this.isSelect = !this.isSelect;
        this.selectList.select = item
            if(!item.value){
              this.$toast("该类型已售罄！");
            }
        this.quickList.splice(this.selectIndex,1,this.selectList)
        },
      filterChange(i) {
        let arr = this.filterPretyList[i].subEOList
        let str = this.filterInput.toLowerCase();
        if (arr.length>0) {
          if (str) {
            arr = arr.filter(function (item) {
              return item.propertyName.toLowerCase().indexOf(str) !== -1;
            });
          }
        }
        this.actsubchoice(arr)
      },
      manychecked(i) {
        let pd = '';
        this.filterPretyList[i].subEOList.forEach(elem => {
          if (elem.checked && elem.propertyName != '不限') {
            pd +=  elem.propertyName+','
          }
        });
        return pd
      },
    checkPrety(index, subindex, filterControlType, elem) {

        if (filterControlType == 5) {
          if (Number(elem.filterValue.split('-')[0])>0) {
            this.minValue[index] = Number(elem.filterValue.split('-')[0])
          } else {
            this.minValue[index] = ''
          }
          if (Number(elem.filterValue.split('-')[1])>0) {
            this.maxValue[index] = Number(elem.filterValue.split('-')[1])
          } else {
            this.maxValue[index] = ''
          }
        }
        this.checkFilterPrety({
          index:index,
          subindex:subindex,
          propertyName:elem.propertyName,
          filterControlType:filterControlType
        })
        setTimeout(()=>{
          this.actsubchoice(this.filterPretyList[index].subEOList)
        }, 300)
        this.filterInput = ''
        this.updatePostData('SCREEN')
        this.checkSendLength()

        if (this.str.replace(/[^\x00-\xff]/g, 'xx').length>488) {
          this.$toast('筛选条件已达上限')
          this.checkFilterPrety({
            index:index,
            subindex:subindex,
            propertyName:elem.propertyName,
            filterControlType:filterControlType
          })
          this.updatePostData('SCREEN')
          this.checkSendLength()
        }

      },
      showImages (index, item) {
        let targetUrl = {
          name: 'accountDetail',
          params: {
            goodsId: item.id,
            goods_source_type: item.goods_source_type ? item.goods_source_type : 0,
            gameType:1
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
        if (this.isServerShow) {
          this.mstfivClick()
          return
        }
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
        if (this.filterPretyList.length>0) {
          this.isScreenShow = !this.isScreenShow
          this.isSortShow = false
          this.isServerShow = false
          this.isTypeShow = false
        }
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
        if (this.displayServerName === '全区全服') {
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
      /* 浏览记录按钮 */
      smallfoodClick () {
        location.href = '/vue/browsing-history/history-lists'
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
      },
      async setDefault () {
        /* 开关状态提取 */
        let state = window.localStorage.MG_SWITCH_STATE ? JSON.parse(window.localStorage.MG_SWITCH_STATE) : null
        if (state && (new Date().getTime() - state.d) / 1000 < 60 * 60) {
          this.switchState = state.switch
        }
        if (!window.localStorage.MG_SHOW_GUIDE && this.isLocalStorageSupported()) {
          this.showGuide = true
        }
        this.$bus.emit('headerText', this.$route.params.gameName);
        await this.updatePostData();
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
            goodsTypeId: 2,
            gameName: this.$route.params.gameName
          })
        } else {
          if (this.$store.state.choice.quickList) {
            this.quickList = this.$store.state.choice.quickList.Configs
          }
          this.$refs.goodsContainerList.scrollTop = this.goodsScrollPosition
        }
        this.wsz();
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
      nextquickPage(item,quickId) {
        if (quickId) {  // 1是端游 2是手游
          this.$router.push({
            name: 'quickorder',
            params: {id: quickId},
            query:{
              AccountType:item.AccountType,
              gameId:this.postData.gameId,
              serverId: this.postData.selectGameServerId,
              areaId: this.postData.selectGameAreaId
            }
          })
          return
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
        }
      },
      //改变商品类型
      changeGoodsType(item) {
        if (this.selectGoodsTypeId == item.goodsType) {
          this.isTypeShow = false;
          return false;
        }
        //由于三通，目前该页面只处理帐号
        if (item.goodsType == 1) {
          this.$router.push({
            name:'EquipmentList',
            params:{
              gameId:this.$route.params.gameId,
              gameName:this.$route.params.gameName,
              goodsType:1,
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
      //筛选下
      toggleAXM(){
        this.isAXM = !this.isAXM;
      },
      toggleScreenShot(){
        this.isScreenShot = !this.isScreenShot;
      },
      changeMoneyButton(e){
        this.selectMoneyId = e.moneyId;
        this.updateMaxAndMin(e.minValue, e.maxValue);
      },
      updateMaxAndMin(min, max){
        this.minValue = min;
        this.maxValue = max;
      },
      updateminMoney(e,i){
        //输入价格时取消选中
        this.filterPretyList[i].subEOList.forEach(subelem => {
          subelem.checked = false
        });
        this.$set(this.minValue, i, e.target.value.replace(/[^\d]/g,''))
      },
      updatemaxMoney(e,i){
        //输入价格时取消选中
        this.filterPretyList[i].subEOList.forEach(subelem => {
          subelem.checked = false
        });
        this.$set(this.maxValue, i, e.target.value.replace(/[^\d]/g,''))
      },
      clearScreen(){
        this.isAXM = false;
        this.isScreenShot = false;
        this.selectMoneyId = 0;
        this.clearFilterPrety()
        this.maxValue = []
        this.minValue = []
      },
      confirmScreen(){
        // 处理价格区间
        this.minValue.forEach((elem,index) => {
          this.maxValue.forEach((melem, mindex) => {
            if (index == mindex) {
              if(elem > melem && elem && melem) {
                let big = melem
                this.maxValue[index] = this.minValue[index]
                this.minValue[index] = big
              }
            }
          });
        });
        this.refreshList("SCREEN")
        this.toggleScreen();
      },
      //区服
      //改变左侧选择
      changeLeft(index){
        // 上个选中的 this.selectLeftId 当前选中的 this.index
        /*同级选中必定清除*/
        if (this.selectLeftId == index) {
          let arg = [false, false, false]
          arg[index - 1] = true
          this.clearLeft(...arg)
          return false;
        }
        // 如果选中的是上一级
        if (this.selectLeftId > index) {
          /*选中的是平台 -- 清理三个*/
          if (index === 1) this.clearLeft(true, true, true)
          /*选中的是客户端 -- 清理客户端 和 服务器*/
          if (index === 2) this.clearLeft(false, true, true)
        }
        // if ((index == 2 || index == 3) && this.selectPlatFormId == null) {
        //   this.$toast({
        //     message: "请先选择平台",
        //   })
        //   return false;
        // }
        if (index == 3 && (this.selectGameAreaId == null || this.selectGameAreaId == 0)) {
          this.$toast({
            message: "请先选择游戏区",
          })
          return false;
        }
        this.selectLeftId = index;
      },
      /*清理左侧菜单 abc 对应 123*/
      clearLeft(a, b, c) {
        if (a || b || c) {
          this.displayServerName = '全区全服'
        }
        // if (a) {
        //   this.selectPlatFormName = '平台'
        //   this.selectPlatFormId = null
        // }
        if (b) {
          this.selectGameAreaName = '选择区'
          this.selectGameAreaId = null
        }
        if (c) {
          this.selectGameServerName = '选择服'
          this.selectGameServerId = null
        }
      },
      //改变平台
      changePlatForm: async function (e) {
        if (this.selectPlatFormId == e.id) {
          this.changeLeft(2);
          return false;
        }
        this.selectPlatFormId = e.id;
        this.selectPlatFormName = e.name;
        this.selectGameAreaId = null;
        this.selectGameAreaName = "选择区";
        this.selectGameServerId = null;
        this.selectGameServerName = "选择服";
        await this.getGameAreaList({
          gameId: this.postData.gameId,
          platformId: this.selectPlatFormId
        })
        this.changeLeft(2);
        this.$nextTick(function () {
          this.$refs.refClientList.scrollTop = 0
        })
      },
      // 客户端 切换
      changeGameArea: async function (e) {
        if (e === 0) {
          this.selectGameAreaId = 0;
//          this.selectGameAreaName = "不限";
          this.selectGameServerId = null;
          this.selectGameServerName = "选择服";
          this.displayServerName = '全区全服'; // 不限菜单名选平台
          this.refreshList("SERVER");
          this.serverShow();
          this.$refs.refClientList.scrollTop = 0
        }
        else {
          if (this.selectGameAreaId == e.catagoryId) {
            this.changeLeft(3);
            return false;
          }
          this.displayServerName = '全区全服' // 进入下一级重置名字
          this.selectGameAreaId = e.catagoryId;
          this.selectGameAreaName = e.name;
          this.selectGameServerId = null;
          this.selectGameServerName = "选择服";
          await this.getPcGameServerList({
            parentId: this.selectGameAreaId,
          })
          this.changeLeft(3);
          this.$nextTick(function () {
            this.$refs.refServerList.scrollTop = 0
          })
        }
      },
      //改变区服
      changeGameServer(e){
        if (e === 0) {
          this.selectGameServerId = 0;
//          this.selectGameServerName = "不限";
          this.displayServerName = this.selectGameAreaName // 不限菜单选 客户端
          this.$refs.refServerList.scrollTop = 0
        }
        else {
          this.selectGameServerId = e.catagoryId;
          this.selectGameServerName = e.name;
          this.displayServerName = this.selectGameServerName;
        }
        this.refreshList("SERVER");
        this.serverShow();
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
                  goods_source_type: "+",
                  create_time: "-"
                }
                break;
              case 2:
                this.postData.sortMap = {
                  browse_count: "-",
                  goods_source_type: "+",
                  create_time: "-"
                }
                break;
              case 3:
                this.postData.sortMap = {
                  price: "+",
                  goods_source_type: "+",
                  create_time: "-"
                }
                break;
              case 4:
                this.postData.sortMap = {
                  price: "-",
                  goods_source_type: "+",
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
                  goods_source_type: "+",
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
            this.postData.selectPlatFormId = this.selectPlatFormId;
            this.postData.selectPlatFormName = this.selectPlatFormName;
            this.postData.selectGameAreaId = this.selectGameAreaId;
            this.postData.selectGameAreaName = this.selectGameAreaName;
            this.postData.selectGameServerId = this.selectGameServerId;
            this.postData.selectGameServerName = this.selectGameServerName;
            this.postData.displayServerName = this.displayServerName;
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
                let rob = {}
                let axm = {}
                let zh = {}
                let wh = {}
                if(jh[val].length>0) {
                  for (let jk of jh[val]) {
                    if (jk.filterAlyField == 'is_axm') {
                      axm.is_axm = [jk.filterValue]
                    } else if(jk.filterAlyField == 'qualified') {
                      zh.qualified = [jk.filterValue]
                    } else if(jk.filterValue == '无货赔付:true') {
                      wh.filter_property = [jk.filterValue]
                    } else if (jk.filterAlyField == 'is_robot_capture') {
                      rob.is_robot_capture = [jk.filterValue]
                    } else {
                      if (m[jk.filterAlyField]) {
                        m[jk.filterAlyField].push(jk.filterValue)
                      } else {
                        m[jk.filterAlyField] = [jk.filterValue]
                      }
                    }
                    if (val != 'keyWordList') {
                      if (!this.postData[val][jk.filterAlyField]){
                        this.postData[val][jk.filterAlyField] = []
                      }
                      this.postData[val][jk.filterAlyField].push(jk.filterValue.toString())
                    }
                  }
                }
                if (Object.keys(m).length>0) {
                  this.postData.keyWordList.push(m)
                }
                if (Object.keys(rob).length>0) {
                  this.postData.keyWordList.push(rob)
                }
                if (Object.keys(axm).length>0) {
                  this.postData.keyWordList.push(axm)
                }
                if (Object.keys(zh).length>0) {
                  this.postData.keyWordList.push(zh)
                }
                if (Object.keys(wh).length>0) {
                  this.postData.keyWordList.push(wh)
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
            //this.postData.accurateMap = this.screenfilters.accurateMap

            break;
          case "PAGE":
            this.postData.page = page;
            break;
          default:
            this.postData.selectSortType = this.postData.selectSortType?this.postData.selectSortType:1;
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
                goods_source_type: "+",
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
        this.updatePostData(e);
        await this.updateListData();
        document.body.scrollTop = 0
        this.$refs.goodsContainerList.scrollTop = 0
        this.$refs.goodsContainerListbig.scrollTop = 0
      },
      openSelect(list,index){
          this.isSelect = !this.isSelect;
          if(list){
            this.selectList = list;
            this.selectIndex = index;
          }
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

        //筛选保障服务
        if (this.postData.selectGoodsTypeId == 2 && this.isAXM) {
          this.postDataForAccount.accurateMap.is_axm = [this.isAXM.toString()]
        }
        if (this.postData.selectGoodsTypeId == 2 && this.isScreenShot) {
          this.postDataForAccount.accurateMap.is_robot_capture = [this.isScreenShot.toString()]
        }

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
          if (this.postDataForAccount.accurateMap.region_id&&this.postDataForAccount.accurateMap.server_id) {
            var promise = this.getQuickList({
              gameId: this.postData.gameId,
              gameServerId: this.selectGameServerId.toString(),
              gameAreaId: this.selectGameAreaId.toString()
            })
            promise.then(quick => {
              if(quick&&quick.Configs){
                  this.quickList = quick.Configs
              }
            })
          }
          //神策开始
          var isLog,map,keyWord,between,shoppingType;
          isLog = this.$CONSTANTS.isLogin;
          if(this.postDataForAccount.goodsType==1){
            shoppingType = "装备";
          }else if(this.postDataForAccount.goodsType==2){
            shoppingType = "账号";
          }else if(this.postDataForAccount.goodsType==3){
            shoppingType = "游戏币";
          }else{
            shoppingType = "其他";
          };
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
      ...mapActions({
        getListData: 'choice/GET_LISTDATA',
        clearGoodsList: 'choice/CLEAR_GOODSLIST',
        clearTypeList: 'choice/CLEAR_TYPELIST',
        saveGoodsListScrollPosition: 'choice/SAVEGOODSLISTSCROLLPOSITION',
        getGoodsType: 'choice/GET_GOODSTYPELIST',
        getQuickList: 'choice/GET_QUICKLIST',
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
        actsubchoice: 'choice/ACTSUBCHOILCELIST'
      })
    }
  }
</script>

<style src='css/common/list-cl.css' scoped></style>
<style src="css/plugin/swiper.css" ></style>
<style >
.img-demopic img {
  width:100% !important;
  height:auto !important;
  max-height: 100% !important;
  max-width: 100% !important;
}
</style>
<style scoped>
  .loading {
    text-align: left;
    text-indent: .6rem;
    line-height: .5rem;
    height: .5rem;
    background: url('~images/loading.gif') left center no-repeat;
    background-size: .5rem;
    margin-top: -.1rem;
    margin-left: 2.5rem;
  }
  .price-type ul li span {
    display: block;
    line-height: 0.99rem;
    height: .99rem;
    text-align: center;
    overflow: hidden;
}

  .goods-container .lists {
    overflow-y: auto;
    overflow-scroll: touch;
  }

  .more_message {
    display: block;
    position: fixed;
    z-index: 999;
  }

  .fade-enter-active {
    transition: all .3s ease;
}
.fade-leave-active {
    transition: all 1s ease;
}
.fade-enter,  .fade-leave-active{
    transform: translateX(100%);
}
.ConBox{
    margin: 0;
    left: 0;
    z-index: 999;
    position: fixed;
    overflow: hidden;
}
.ConBox .Jbox{
    width: 100%;
    background: white;
    overflow: scroll;
    height: 100vh;
    top:0;
    z-index: 20;
    padding-bottom: 2rem;
}
.hrgames-img {
    height: auto;
    display: block;
    overflow: hidden;
    width: 120%;
}
.row {
    height: 81px!important;
    margin-right: -15px;
    width: auto!important;
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

    .default_numb {
        top: 1.92rem !important;
        /*max-height: 5.48rem;*/
        overflow-y: scroll;
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
    margin-top: 0 !important;
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
    width: 90%;
    position: fixed;
    top: 0;
    max-width: 768px;
    margin-left: 10%;
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
  background: #fff;
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
    width: 76%;
    margin: 2% 7%;
    height: .92rem;
    line-height: .92rem;
    border: 1px solid #f75e46;
}
.filter-content .top-header h2 {
  margin-left: 0;
}
.disabled{
    background-color: #999;
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
.mbgmes-con .mbl-title{ max-height:1.2rem; height:auto !important;}
.manycheck {
  width: 60%;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  text-align: right;
  padding-left: 0;
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
  .picmun {
    position: absolute;
    right: 0;
    bottom: 0;
    width: .52rem;
    height: .28rem;
    line-height: .26rem;
    background: rgba(0,0,0,.5);
    text-align: center;
}
.picmun span {
    display: inline-block;
    background: url('~images/Icon/picmun-ico.png') no-repeat 0;
    height: .22rem;
    background-size: .18rem;
    padding-left: .22rem;
}

</style>
