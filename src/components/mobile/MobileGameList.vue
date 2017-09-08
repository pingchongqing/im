<template>
  <div id="wrapper">
    <div v-show="!isScreenShow">
      <headerComponent></headerComponent>
      <div style="width: 100%;height: 0;padding-left: .3rem;">
        <div style="width: 100%;height: 0" ref="computedImgList"></div>
      </div>
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
              <div class="navdemo" @click="toggleScreen"
                   :class="{active: maxValue!=null||minValue!=null||isAXM||isScreenShot}"><a><span
                 class="screen color-666 f30">筛选</span></a>
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
                  <li class="border-bottom "
                      :class="{'curren': selectLeftId==1, 'choice':selectPlatFormId!=null}"
                      @click="changeLeft(1)">
                    <a><span class="f30 color-000">{{selectPlatFormName}} <i
                       class="close"></i></span></a>
                  </li>
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
              <div class="gmvst-area bg-fff" v-show="selectLeftId==1">
                <div class="gvst-seach mx-30 my-20 border py-15 px-20"
                     v-if="platFormList && platFormList.length>20">
                  <input class="server-input"
                         name="" type="text"
                         placeholder="请输入平台名称" maxlength="20" v-model.trim="pfSearchInput">
                </div>
                <ul class="pl-30" :class="{'hasSearch':platFormList && platFormList.length<=20}">
                  <li v-for="elem in  platFormListFilter"
                      :key="elem.id"
                      class="border-bottom pr-30" :class="{'active': elem.id==selectPlatFormId}"
                      @click="changePlatForm(elem)"
                  ><span class="f30 color-000">{{elem.name}}</span></li>

                  <li v-if="platFormList.length==0"
                      class="border-bottom"
                  ><span class="f30 color-000">暂无数据</span></li>
                </ul>
              </div>
              <div class="gmvst-area bg-fff" v-show="selectLeftId==2">
                <div class="gvst-seach mx-30 my-20 border py-15 px-20"
                     v-if="gameAreaList && gameAreaList.length>20">
                  <input class="server-input"
                         name="" type="text"
                         placeholder="请输入客户端名称" maxlength="20" v-model.trim="gaSearchInput">
                </div>
                <ul ref="refClientList" class="pl-30"
                    :class="{'hasSearch':gameAreaList && gameAreaList.length<=20 }">
                  <li v-if="gameAreaList.length>0"
                      class="border-bottom pr-30" :class="{'active': 0==selectGameAreaId}"
                      @click="changeGameArea(0)"><span class="f30 color-000">不限</span></li>
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
                     v-if="gameServerList && gameServerList.length>20">
                  <input class="server-input"
                         name="" type="text"
                         placeholder="请输入服务器名称" maxlength="20" v-model.trim="gsSearchInput">
                </div>
                <ul ref="refServerList" class="pl-30"
                    :class="{'hasSearch':gameServerList && gameServerList.length<=20}">
                  <li v-if="gameServerList.length>0"
                      class="border-bottom pr-30" :class="{'active': 0==selectGameServerId}"
                      @click="changeGameServer(0)"><span class="f30 color-000">不限</span></li>
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
        <div class="goods-container" ref="goodsContainer">
          <!-- 列表为空时的样式 -->
          <div class="list-main2" v-show="goodsList.length===0 && loading==false">
            <div class="list-empty" id="list-empty">
              <p><img src="~images/gamelogo.png"></p>
              <span>很抱歉，没有找到商品</span>
              <div class="topc" v-show="pcUrl"><a :href="pcUrl">去电脑版看看</a></div>
            </div>
          </div>
          <div ref="getMarginHeight" style="height: 2.12rem;"></div>
          <!-- 商品列表 -->
          <div class="list-main content " v-if="goodsList.length>0">
            <div class="lists bg-f1" id="gaga" :style="{height: containerHeight + 'px'}"
                 @scroll="handleScroll($event)"
                 ref="goodsContainerList">
              <div v-for="(item, index) in goodsList" :key="item.id" @click="nextPage(item)">
                <!--帐号 切换1-->
                <div class="account-01 pro-list-01 mb-20"
                     v-test="{index,save: saveOffsetTop.single}"
                     v-show="selectGoodsTypeId == 2 && !switchStatus">
                  <div class="mbilegames-list">
                    <div class="listware">
                      <!--    <div class="mbgmes-img fl" @click.stop="showImages(0,item)">-->
                      <div class="mbgmes-img fl">
                        <!--<img :src="item.goods_img|imgfilter" v-if="item.goods_img"/>-->
                        <img
                           :src="(saveOffsetTop.single[index] > scrollTop - 400)&&(saveOffsetTop.single[index] < scrollTop + containerHeight + 400)
                           ?item.goods_img : null" v-if="item.goods_img"/>
                        <img src="~images/default_img.jpg" v-else/>
                      </div>
                      <div class="mbgmes-con">
                        <div class="mbl-title f32 color-000">{{item.title}}</div>
                        <!--<div class="mbl-title f32 color-000">{{saveOffsetTop.single[index]}}-->
                          <!--{{(saveOffsetTop.single[index] > scrollTop - 400)&&(saveOffsetTop.single[index] < scrollTop + containerHeight + 400)}}-->
                        <!--</div>-->
                        <div class="mbl-cper">
                          <div class="mbl-money color-m1 f32 fl">￥{{item.price}}</div>
                          <div class="mbl-icon fr">
                            <i class="an"
                               v-show="item.is_axm && item.is_axm==='true'"></i>
                            <!--<i class="shou"></i>-->
                            <i class="tu"
                               v-show="item.is_robot_capture && item.is_robot_capture==='true'"></i>
                          </div>
                        </div>
                        <div class="mbl-parea color-666 f24">
                          {{item.region_name}}/{{item.server_name}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--帐号 切换2-->
                <div class="account-02 pro-list-01 mb-20"
                     v-test="{index,save: saveOffsetTop.some}"
                     v-if="selectGoodsTypeId == 2 &&  switchStatus">
                  <div class="mbilegames-list" ref="someImgList">
                    <div class="listware">
                      <div class="hrgames-titl f32 color-000">{{item.title}}</div>
                      <swiper class=" margin-bottom" :options="swiperOption"
                              ref="mySwiper">
                        <!--:src="(someImgsNum > imgIndex)&&(saveOffsetTop.some[index] > scrollTop - 400)&&(saveOffsetTop.some[index] < scrollTop + containerHeight + 400)?src:null"-->
                        <swiper-slide v-for="(src, imgIndex) in item.small_img_list" v-if="someImgsNum > imgIndex">
                          <div class="img-demopic fl">
                            <img v-if="src!==''"
                                :src="(someImgsNum > imgIndex)&&(saveOffsetTop.some[index] > scrollTop - 400)&&(saveOffsetTop.some[index] < scrollTop + containerHeight + 400)?src:null"
                                 class="swiper-lazy"
                                 @click.stop="showImages(imgIndex,item)">
                            <!--<img v-if="src!==''"-->
                            <!--:data-src="src"-->
                            <!--class="swiper-lazy"-->
                            <!--@click.stop="showImages(imgIndex,item)">-->
                            <img v-if="src==''" src="~images/default_img.jpg">
                          </div>
                        </swiper-slide>
                        <swiper-slide v-for="(src, imgIndex) in item.small_img_list" v-if="someImgsNum < imgIndex">
                          <div class="img-demopic fl">
                            <img v-if="src!==''"
                                 :data-src="(someImgsNum < imgIndex)&&(saveOffsetTop.some[index] > scrollTop - 400)&&(saveOffsetTop.some[index] < scrollTop + containerHeight + 400)?src:null"
                                 class="swiper-lazy"
                                 @click.stop="showImages(imgIndex,item)">
                            <!--<img v-if="src!==''"-->
                                 <!--:data-src="src"-->
                                 <!--class="swiper-lazy"-->
                                 <!--@click.stop="showImages(imgIndex,item)">-->
                            <img v-if="src==''" src="~images/default_img.jpg">
                          </div>
                        </swiper-slide>
                      </swiper>
                      <div class="hrgames-tne">
                        <span class="hr-price color-m1 f32 fl">￥{{item.price}}</span>
                        <span
                           class="hr-area f26 color-666 ml-30">{{item.region_name}}/{{item.server_name}}</span>
                      </div>
                      <div class="hrgames-cfi f26 color-666"
                           v-show="(item.is_axm && item.is_axm==='true') || (item.is_robot_capture && item.is_robot_capture==='true')">
                        <i class="firm mr-30"
                           v-show="item.is_axm && item.is_axm==='true'">安心买</i>
                        <!-- <i class="firm mr-30">首次出售</i>-->
                        <i class="firm mr-30"
                           v-show="item.is_robot_capture && item.is_robot_capture==='true'">截图认证</i>
                      </div>
                    </div>
                  </div>
                  <!--金币，暂时不用-->
                  <div class="pro-list-01 mb-20" v-if="selectGoodsTypeId==3">
                    <div class="mbilegames-list ">
                      <div class="listware ">
                        <div class="ware-titl f32 color-000">
                          {{item.title}}
                          （1元={{(item.unit_num / item.total_amount).toFixed(2)}}{{item.unit_name}}）
                        </div>
                        <div class="ware-client f28 color-000"><span
                           class="color-888">客户端：</span>
                          {{item.service_provider_name ? item.service_provider_name + '/' : ''}}
                        </div>
                        <div class="ware-client f28 color-000"><span
                           class="color-888">服务器：</span>{{item.region_name}}/{{item.server_name}}
                        </div>
                        <div class="ware-discount">
                          <div class="dcnt-price f32 color-m1 text-right">
                            {{item.total_amount}}元
                          </div>
                          <div class="dcnt-stock f28 color-888">
                            <i class="ovtime mr-20"
                               v-if="item.unit_promise_time_locked>0"></i>
                            <i class="keep mr-20"
                               v-if="item.biz_offer_flag.indexOf('保')>0"></i>
                            <i class="lose mr-20" v-if="item.deposit>0"></i>
                            <i class="yibao mr-20" v-if="item.biz_offer_flag=='~'"></i>
                            库存{{item.delivery_num}}件
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="loading" v-show="loading">加载中...</div>
              <div class="tab-empty" v-show="isGoodsLoadAll && !loading ">
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
      <div class="screen-titl border-bottom px-30 color-000 f32 mt-97 bg-fff">价格范围</div>
      <div class="screen-price bg-fff">
        <div class="price-list px-30 py-30">
          <input class="price-input fl f30" type="tel" placeholder="最低价" maxlength="7"
                 v-model.number="minValue"
                 @keyup="updateMoney">
          <span class="hern fl"></span>
          <input class="price-input fl f30" type="tel" placeholder="最高价" maxlength="7"
                 v-model.number="maxValue"
                 @keyup="updateMoney">
        </div>
        <div class="price-type pl-30">
          <ul>
            <li class="fl mb-30" v-for="(elem,index) in moneyList"
                :key="elem.moneyId"
                :class="{active: elem.moneyId == selectMoneyId}"
                @click="changeMoneyButton(elem)"
            ><a><span class="border f30" v-text="elem.moneyName"></span></a></li>
          </ul>
        </div>
      </div>
      <div v-show="selectGoodsTypeId==2">
        <div class="screen-titl border-bottom px-30 color-000 f32 mt-30 bg-fff">保障服务</div>
        <div class="screen-price bg-fff">
          <div class="price-type pl-30 pt-30">
            <ul>
              <li class="fl mb-30" :class="{'state':isAXM}"><a @click="toggleAXM"><span
                 class="border f30">安心买</span></a>
              </li>
              <li class="fl mb-30" :class="{'state':isScreenShot}"><a @click="toggleScreenShot"><span
                 class="border f30">截图认证</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fixed-bottom border-top">
        <div class="goodslist-btn px-30 py-30 bg-fff">
          <a class="options f32 color-666 fl text-center" @click="clearScreen">清除选项</a>
          <a class="purchase f32 bg-f54 color-fff fr text-center" @click="confirmScreen">确定</a>
        </div>
      </div>

    </div>
    <previewerComponent :list="previewerImgList" :isForList=true
                        ref="previewer"></previewerComponent>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapGetters, mapActions} from 'vuex'
  import Vue from 'vue'
  import headerComponent from 'components/Header.vue'
  import shareComponent from 'components/common/NewShare.vue'
  import goTopComponent from 'components/common/GoTop.vue'
  import navigationModalComponent from 'components/common/NavigationModal.vue'
  import FooterComponent from "components/Footer.vue"
  import previewerComponent  from 'components/account/AccountPreviwer.vue'
  export default {
    template: '#goodslist',
    data(){
      return {
        someImgsNum: Math.ceil(document.body.clientWidth / 133),
        scrollTop: 0, // 存放列表滑动的距离
        saveOffsetTop: {single: {}, some: {}}, // 存放列表项离顶部的距离
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
        moneyList: [
          {
            "moneyId": 1,
            "minValue": null,
            "maxValue": null,
            "moneyName": "不限"
          },
          {
            "moneyId": 2,
            "minValue": 0,
            "maxValue": 50,
            "moneyName": "50元以下"
          },
          {
            "moneyId": 3,
            "minValue": 50,
            "maxValue": 100,
            "moneyName": "50-100元"
          },
          {
            "moneyId": 4,
            "minValue": 100,
            "maxValue": 500,
            "moneyName": "100-500元"
          },
          {
            "moneyId": 5,
            "minValue": 500,
            "maxValue": 1000,
            "moneyName": "500-1000元"
          },
          {
            "moneyId": 6,
            "minValue": 1000,
            "maxValue": 9999999,
            "moneyName": "1000元以上"
          },
        ],
        selectMoneyId: 0,
        minValue: null,
        maxValue: null,
        //区服
        selectLeftId: 1,
        selectPlatFormId: null,
        selectPlatFormName: "平台",
        selectGameAreaId: null,
        selectGameAreaName: "客户端",
        selectGameServerId: null,
        selectGameServerName: "服务器",
        displayServerName: "服务器",
        pfSearchInput: "",
        gaSearchInput: "",
        gsSearchInput: "",
        //切换
        switchStatus: false,
        swiperOption: {
//          autoplay: 0,
//          freeMode: true,
////          slidesPerView: 3,
//          cssWidthAndHeight: true,
//          preloadImages: false,
//          lazyLoadingInPrevNextAmount: parseInt(document.body.clientWidth / 133), // 一页多图延迟加载需配置
//          lazyLoading: true, // 图片延迟加载，src -> data-src
//          lazyLoadingInPrevNext: true, // 提前加载旁边的
//          lazyLoadingOnTransitionStart: false, // 过渡一开始就加载
//          width: 133 // 配置宽度
          passiveListeners : false,
          notNextTick: true,
//          height: 300, // 配置高度 只有在垂直时生效
          freeMode: true, // 没有图片滑动吸引
          freeModeMomentumRatio: 0.2, // 自由状态下，惯性
//          spaceBetween: 20, // 两图之间的间距
//          slidesOffsetBefore: 20, // 第一张图和左边的偏移量
          lazyLoadingInPrevNextAmount: Math.ceil(document.body.clientWidth / 133) - 1,
          lazyLoading: true, // 图片延迟加载，src -> data-src
          preloadImages: false,
          updateOnImagesReady: true,
          lazyLoadingInPrevNext: true, // 提前加载旁边的
          lazyLoadingOnTransitionStart: false, // 过渡一开始就加载
          mousewheelControl: true,
//          slidesPerView: 'auto',
          width: 133 // 配置宽度

        }
        //具体某个商品的图片列表，目前后端没有，暂时用测试数据
      }
    },
    components: {
      shareComponent,
      goTopComponent,
      navigationModalComponent,
      FooterComponent,
      headerComponent,
      previewerComponent
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
          obj.goods_img = imgfilterMain(obj.goods_img) // 主图处理
          /*大图小图处理*/
          obj.big_img_list = v.big_img_list.split(';').filter(v => v.length) // 切成数组
          obj.small_img_list = v.small_img_list.split(';').filter(v => v.length) // 切成数组
          /* 如果big_img_list 或 small_img_list 没有传东西，填入一张主图*/
          if (obj.big_img_list.length == 0) {
            obj.big_img_list.push(obj.goods_img.split('?')[0])
          }
          if (obj.small_img_list.length == 0) {
            obj.small_img_list.push(obj.goods_img)
          }
          obj.big_img_list = obj.big_img_list.map(v => imgfilter(v))
//          item.goods_img|imgfilter
          function imgfilter(path) {
            if (path.indexOf('http://m5173.img-cn-hangzhou.aliyuncs.com') > -1 || path.indexOf('img1.5173.com') > -1) {
              return path + '?x-oss-process=image/resize,m_fixed,w_880/format,jpg/quality,q_60'
            } else {
              return path
            }
          }
          function imgfilterMain(path) {
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
      }),
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
      if (from.name != 'CoinsSales' && from.name != 'MGAccountDetail') {
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
    directives: {
      test: {
        update (el, binding) {
//          let a = {}
//          console.log(binding.value.offsetTop)
//          console.log(a)
//          Vue.set(a, 'offsetTop', el.offsetTop)
//          console.log(a)
          Vue.set(binding.value.save, binding.value.index, el.offsetTop)
//          binding.value.item = null
//          console.log(binding.value.item)
//          console.log(binding.value)
//          binding.value.offsetTop = el.offsetTop
//          console.log(binding.value)
//          console.log(binding.value)

//          console.log(binding.value.offsetTop)
        }
      }
    },
    created () {
    },
    mounted: function () {
      this.setXiaoNeng();
      this.setSwitch();
//      this.swiperOption.lazyLoadingInPrevNextAmount = Math.ceil(this.$refs.computedImgList.clientWidth / 133) - 1
//      console.log(this.$refs.computedImgList.clientWidth)
//      this.$bus.emit('isMore', true);
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
        this.$bus.emit('isSwitch', true)
//        this.$bus.emit('isSwitch', false)
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
//          this.containerHeight = this.$getScreenHeight() - this.$refs.goodsContainerList.getBoundingClientRect().top;
//          this.containerHeight = this.$getScreenHeight() - this.$refs.getMarginHeight.clientHeight
          this.containerHeight = this.$getScreenHeight()
//          this.containerHeight = window.screen.height - this.$refs.getMarginHeight.clientHeight
        })
      },
      goodsTypeShow: function goodsTypeShow() {
        this.isSortShow = false
        this.isServerShow = false
        this.isTypeShow = !this.isTypeShow
      },
      serverShow: function goodsTypeShow() {
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
      toggleScreen: function sortShow() {
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
        if (this.displayServerName === '服务器') {
          if (this.selectLeftId == 1 && this.selectPlatFormId == null) {
            if (this.choised) { // 之前是选中的
              this.choised = false
              this.refreshList("SERVER");
            } else { // 之前是不选中的，
            }
          }
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
        NTKF.im_openInPageChat('bq_1000_1491043276538');
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
      async setDefault () {
        this.$bus.emit('headerText', this.$route.params.gameName);
        await this.updatePostData();
        //通过游戏ID获得 类型列表
        if (this.goodsTypeList == null || this.goodsTypeList.length === 0) {
          await this.getGoodsType({
            gameId: this.postData.gameId
          })
        }
        //通过游戏ID获得 平台列表
        if (this.platFormList == null || this.platFormList.length === 0) {
          await this.getPlatformList({
            gameId: this.postData.gameId
          })
        }
        //根据商品类型，获取排序列表
        this.getSortList();

        //匹配当前列表
        this.mapSelectedItems()

        //获取当前商品页
        if (this.goodsList.length === 0) {
          await this.updateListData();
        } else {
          this.$refs.goodsContainerList.scrollTop = this.goodsScrollPosition
        }
        this.wsz();
      },
      handleScroll: async function (e) {
//        console.log(this.scrollTop, e.target.scrollTop)
        this.scrollTop = e.target.scrollTop
        this.saveGoodsListScrollPosition(this.$refs.goodsContainerList.scrollTop)
        if (this.$refs.goodsContainerList.scrollHeight - this.$refs.goodsContainerList.scrollTop - this.containerHeight < 600) {
          if (!this.isGoodsLoadAll) {
            await this.updatePostData("PAGE", this.postData.page + 1);
            await this.updateListData();
          }
        }
      },
      nextPage: function nextPage(item) {
        if (this.selectGoodsTypeId == 2)
          this.$router.push({
            name: 'MGAccountDetail',
            params: {
              goodsId: item.id,
              goods_source_type: item.goods_source_type ? item.goods_source_type : 0,
            },
            query: {
              goods_img: item.goods_img.split('?')[0]
            }
          })
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
        if (item.goodsType == 2) {
          this.selectGoodsTypeId = item.goodsType;
          this.selectGoodsTypeName = item.goodsTypeName;
          //商品类型会更新搜索列表
          this.getSortList();
          this.refreshList("GOODSTYPE")
          this.isTypeShow = false;
        }
        else if (item.goodsType == 3) {
          location.href = '/vue/search/searchPlatForm?gameId='+this.postData.gameId+'&gName='+this.$route.params.gameName+'&gameType=2&goodsType=3'
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
      updateMoney(){
        this.$nextTick(() => {
          if (this.minValue) {
            this.minValue = parseInt(this.minValue) // 化整
            if (!Number.isInteger(this.minValue)) this.minValue = null // 如果不是数字类型 变为空
          }
          if (this.maxValue) {
            this.maxValue = parseInt(this.maxValue)
            if (!Number.isInteger(this.maxValue)) this.maxValue = null
            console.log('max:', this.maxValue)
          }
        })
      },
      clearScreen(){
        this.isAXM = false;
        this.isScreenShot = false;
        this.minValue = null;
        this.maxValue = null;
        this.selectMoneyId = 0;
        this.refreshList("SCREEN")
      },
      confirmScreen(){
        // 处理价格区间
        if (this.minValue != null && this.maxValue != null) {
          if (this.maxValue < this.minValue) {
            //如果最大比最小的小，互换位置
            let tmp = this.minValue;
            this.minValue = this.maxValue;
            this.maxValue = tmp;
          }
        }
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
        if ((index == 2 || index == 3) && this.selectPlatFormId == null) {
          this.$toast({
            message: "请先选择平台",
          })
          return false;
        }
        if (index == 3 && (this.selectGameAreaId == null || this.selectGameAreaId == 0)) {
          this.$toast({
            message: "请先选择客户端",
          })
          return false;
        }
        this.selectLeftId = index;
      },
      /*清理左侧菜单 abc 对应 123*/
      clearLeft(a, b, c) {
        if (a || b || c) {
          this.displayServerName = '服务器'
        }
        if (a) {
          this.selectPlatFormName = '平台'
          this.selectPlatFormId = null
        }
        if (b) {
          this.selectGameAreaName = '客户端'
          this.selectGameAreaId = null
        }
        if (c) {
          this.selectGameServerName = '服务器'
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
        this.selectGameAreaName = "客户端";
        this.selectGameServerId = null;
        this.selectGameServerName = "服务器";
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
          this.selectGameServerName = "服务器";
          this.displayServerName = this.selectPlatFormName; // 不限菜单名选平台
          this.refreshList("SERVER");
          this.serverShow();
          this.$refs.refClientList.scrollTop = 0
        }
        else {
          if (this.selectGameAreaId == e.id) {
            this.changeLeft(3);
            return false;
          }
          this.displayServerName = '服务器' // 进入下一级重置名字
          this.selectGameAreaId = e.id;
          this.selectGameAreaName = e.name;
          this.selectGameServerId = null;
          this.selectGameServerName = "服务器";
          await this.getGameServerList({
            aid: this.selectGameAreaId,
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
          this.selectGameServerId = e.id;
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
            this.postData.minValue = this.minValue;
            this.postData.maxValue = this.maxValue;
            this.postData.isAXM = this.isAXM;
            this.postData.isScreenShot = this.isScreenShot;
            this.postData.selectMoneyId = this.selectMoneyId;
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
        await this.updatePostData(e);
        await this.updateListData();
        this.$refs.goodsContainerList.scrollTop = 0
      },
      //更新列表数据
      updateListData: async function () {
        //筛选价格
        let price = "";
        if (this.postData.minValue != null && this.postData.maxValue != null) {
          price = {"price": [this.postData.minValue.toString() + "-" + this.postData.maxValue.toString()]};
        }
        else if (this.postData.minValue != null && this.postData.maxValue == null) {
          price = {"price": [this.postData.minValue.toString() + "-" + this.maxPrice.toString()]};
        }
        else if (this.postData.minValue == null && this.postData.maxValue != null) {
          price = {"price": ["0-" + this.postData.maxValue.toString()]};
        }
        else {
          price = {};
        }

        this.postDataForAccount = {
          accurateMap: {
            goods_type: [this.postData.selectGoodsTypeId.toString()],
            game_id: [this.postData.gameId.toString()],
          },
          betweenMap: price,
          page: this.postData.page,
          pageCount: this.pageCount,
          sortMap: this.postData.sortMap
        }
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
          this.postDataForAccount.accurateMap.service_provider_id = [this.selectPlatFormId.toString()]
        }
        //不限
        else if (this.selectGameAreaId != null && this.selectGameAreaId != 0 && this.selectGameServerId == 0) {
          this.postDataForAccount.accurateMap.service_provider_id = [this.selectPlatFormId.toString()]
          this.postDataForAccount.accurateMap.region_id = [this.selectGameAreaId.toString()]
        }
        //具体一个服
        else if (this.selectGameAreaId != null && this.selectGameAreaId != 0 && this.selectGameServerId != null && this.selectGameServerId != 0) {
          this.postDataForAccount.accurateMap.service_provider_id = [this.selectPlatFormId.toString()]
          this.postDataForAccount.accurateMap.region_id = [this.selectGameAreaId.toString()]
          this.postDataForAccount.accurateMap.server_id = [this.selectGameServerId.toString()]
        }

        this.loading = true
        if (this.selectGoodsTypeName) {
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
        setDefaultPage: 'choice/SETDEFAULTPAGE',
        clearErr: 'choice/CLEAR_ERR',
        clearWarn: 'choice/CLEAR_WARN',
        actPostData: 'choice/ACTPOSTDATA',
        clearPostData: 'choice/CLEARPOSTDATA',
        getPlatformList: 'choice/ACTPLATFORMLIST',
        getGameAreaList: 'choice/ACTGAMEAREAlIST',
        getGameServerList: 'choice/ACTGAMESERVERLIST',
        clearPlatformList: 'choice/CLEARPLATFORMLIST',
        clearGameAreaList: 'choice/CLEARGAMEAREAlIST',
        clearGameServerList: 'choice/CLEARGAMESERVERLIST',
      })
    }
  }
</script>

<style src='css/common/list-cl.css'></style>
<style src="css/plugin/swiper.css"></style>
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
</style>
