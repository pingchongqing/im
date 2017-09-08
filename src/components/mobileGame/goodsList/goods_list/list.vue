<template>
  <div class="mobilegames-conn mt-20" style="overflow: visible" v-show="show">
    <!--列表1-->
    <div class="mbilegames-list border-top" style="overflow: visible">
      <v-infinite-scroll
         :pageCount="pageCount"
         :start="start"
         :dataArr="list"
         :updateBottom="updateBottom">
        <div v-if="special" class="king-ad" @click="goSpecial">
          <img src="~images/evaulation/king/king-activity.jpg" alt="王者荣耀活动图片">
        </div>
        <!--快销号-->
        <div class="ftsales-main bg-fff py-30 mb-20 border-top border-bottom" v-if="quickList&&quickList.length">
          <div class="fthero-conn px-30 fl" v-for="(item,index) in quickList" @click="nextPage(item)" :class="{'border-right':index==0&&quickList.length>1,'w100':quickList.length==1}">
            <div class="fthero-wards">
              <div class="thpic f30 color-333"><span :class="item.categorytypename=='英雄号'?'k-hero':'k-gold'">{{item.categorytypename}}</span></div>
              <div class="thtxt f24 color-888 mt-10">{{getQuickTitle(item)}}</div>
            </div>
          </div>
          <!--<div class="fthero-conn fr">-->
          <!--<div class="thpic f30 color-333 text-center"><span class="k-gold">金币号</span></div>-->
          <!--<div class="f26 color-888 text-center mt-15">官方直销，安全有保障！</div>-->
          <!--</div>-->
        </div>
        <ul>
          <!--<a class="bg-fff border-bottom mb-20" v-for="(item,index) in quickList">-->
            <!--<div class="border-bottom clearfix listware">-->
              <!--<div class="mbgmes-img fl">-->
                <!--<img :src="item.image">-->
              <!--</div>-->
              <!--<div class="mbgmes-con ">-->
                <!--<div class="mbl-title f32 color-000 quick-title">{{item.title}}</div>-->
                <!--<div class="mbl-parea color-666 f30 pt-15" v-if="item.operatorname">-->
                  <!--{{item.operatorname}}/{{item.gameservername}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="quantity-num px-30 py-20 bg-fff mb-20">-->
              <!--<div class="qannum-out border fl" @click="openSelect(item.unitlist,index)">-->
                <!--<span class="fl out-lay f30 color-666 text-center">{{item.categorytypename}}</span>-->
                <!--<em class="out-input fl fontarial f32 color-000">{{item.gamestartaccountunit}}</em>-->
                <!--<i class="out-ico fr"></i>-->
              <!--</div>-->
              <!--<div class="qannum-mon fl f36 color-m1" v-if="item.price">￥{{item.price}}</div>-->
              <!--<div class="qannum-btn fr bg-f54 f30 text-center"-->
                   <!--:class="item.price?'':'disabled'"><span disabled="item.price?'':'disabled'" @click="nextPage(item)">立即购买</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</a>-->
          <!--<li class="listware px-30 py-30 bg-fff border-bottom mb-20"-->
          <li class="listware bg-fff border-bottom mb-20"
              v-for="item in list">
            <router-link
               :to="{name: 'MGAccountDetail',  params: {goodsId: item.id, goods_source_type: item.goods_source_type ? item.goods_source_type : 0},
                query: {source: filted ? '0001': undefined}}"
               v-if="switchState">
              <div class="mbgmes-img fl">
                <img @click.prevent="clickImg(item)"
                     :src="item.goods_img" v-if="item.goods_img && item.goods_img.length > 1">
                <img src="~images/default_img.jpg" v-else/>
                <div class="picmun" v-if="item.small_img_list && item.small_img_list.length && item.small_img_list.length > 0">
                  <span class="f22 color-fff fontarial">{{item.small_img_list.length}}</span>
                </div>
              </div>
              <div class="mbgmes-con">
                <div class="mbl-title f30 color-000">{{item.title}}</div>
                <div class="mbl-cper">
                  <div class="mbl-money color-m1 f32 fl">￥{{item.price}}</div>
                  <div class="mbl-icon fr">
                    <i class="an" v-show="item.is_axm && item.is_axm === 'true'"></i>
                    <!--<i class="shou"></i>-->
                    <i class="tu"
                       v-show="item.is_robot_capture && item.is_robot_capture==='true'"></i>
                  </div>
                </div>
                <div class="mbl-parea color-666 f30">{{item.region_name}}/{{item.server_name}}</div>
              </div>
            </router-link>
            <router-link
               :to="{name: 'MGAccountDetail',
                params: {goodsId: item.id, goods_source_type: item.goods_source_type ? item.goods_source_type : 0},
                query: {source: filted ? '0001': undefined}}"
               v-else>
              <div class="hrgames-titl f30 color-000">{{item.title}}</div>
              <div class="hrgames-img my-20 row">
                <v-slide
                   :item="item"
                   @anyImgClick="anyImgClick"
                   :paddingLeft="paddingLeft"
                   :imgs="item.small_img_list"
                   :key="item.id"></v-slide>
              </div>
              <div class="hrgames-tne"><span class="hr-price color-m1 f32">￥{{item.price}}</span> <span
                 class="hr-area f26 color-666 ml-30">{{item.region_name}}/{{item.server_name}}</span>
              </div>
              <div class="hrgames-cfi f26 color-666"
                   v-if="(item.is_axm && item.is_axm === 'true') || (item.is_robot_capture && item.is_robot_capture==='true')">
                <i class="firm mr-30 " v-show="item.is_axm && item.is_axm === 'true'">安心买</i>
                <i class="firm mr-30 " v-show="item.is_robot_capture && item.is_robot_capture==='true'">截图认证</i>
              </div>
            </router-link>
          </li>
        </ul>
        <!-- 没有更多商品 -->
        <div class="tab-empty" v-if="(start&&noNext)||(start&&list.length < pageCount)">
          <div class="empty-conn px-30">
            <div class="list-img"><img src="~images/gamelist.png"></div>
            <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
          </div>
        </div>
      </v-infinite-scroll>
    </div>
    <!--<transition name="fade">-->
      <!--<aside class="ConBox" v-if="isSelect">-->
        <!--<div class="top-header border-bottom">-->
          <!--<div class="top-back" @click="openSelect()"><a class="return conBack"-->
                                                         <!--href="javascript:void(0);"></a></div>-->
          <!--<h2 class="f36">选择</h2>-->
        <!--</div>-->
        <!--<div class="propertytxtdiv0 BoxLink Jbox">-->
          <!--<a v-for="item in  selectList" :class="item==quickList[selectIndex].gamestartaccountunit?'color-m1':''"-->
             <!--@click="selectItem(item)">{{item}}</a>-->
        <!--</div>-->
      <!--</aside>-->
    <!--</transition>-->
    <div style="width: .3rem;height: 0;" ref="padding"></div>
  </div>
</template>
<script>
  import infiniteCom from '../common/infinite_scroll.vue'
  import slide from './swipe_slide.vue'

  export default {
    props: ['goodsList', 'scrollButton', 'switchState', 'show', 'filted', 'special', 'specialId', 'quickList'],
    components: {
      'v-infinite-scroll': infiniteCom,
      'v-slide': slide
    },
    data() {
      return {
        start: false,
        noNext: false,
        selectList: [],
        selectIndex: 0,
        isSelect: false,
        paddingLeft: 0
      }
    },
    computed: {
      list() {
        return this.goodsList.list
      },
      pageCount() {
        return this.goodsList.pageCount
      }
    },
    watch: {
      list(val, old) {
        if (val === null) {
          this.start = false
          this.noNext = false
        }
        if (old === null && val !== null) {
          this.$nextTick(() => {
            this.start = true
          })
        }
      }
    },
    methods: {
      goSpecial() {
        this.$router.push({name: 'SpecialKingHome', query: {id: this.specialId}})
      },
      anyImgClick({index, item}) {
        this.$emit('clickImg', {index, item})
      },
      clickImg(item) {
        this.$emit('clickImg', {index: 0, item})
      },
      nextPage(item) {
      	if(item.unitlist&&item.unitlist.length>0){
	        this.$router.push({
		        name: 'mobileGameQuick',
		        params: {
			        gameId: item.gameId,
			        categoryTypeName: item.categorytypename,
			        gamePlatformId: item.gameplatformid,
			        gameStartAccountUnit: item.unitlist[0]
		        }
	        })
        }
      },
        getQuickTitle(item){
      	  var titileList = ['即买即玩，找回包赔！','官方直销，安全有保障！'],index=0
          if(item.categorytypename!='英雄号'){
      	  	index = 1
          }
          return titileList[index]
        },
//      openSelect(list, index) {
//        this.isSelect = !this.isSelect;
//        if (list) {
//          this.selectList = list;
//          this.selectIndex = index;
//        }
//      },
//      selectItem(item) {
//        var quick = this.quickList[this.selectIndex]
//        var params = {
//          categoryTypeName: quick.categorytypename,
//          gamePlatformId: quick.gameplatformid,
//          gameStartAccountUnit: item,
//        }
//        var self = this
//        self.isSelect = !self.isSelect;
//        return self.setQuick(params).then(data => {
//          quick.title = data.Title
//          quick.gameservername = data.GameServerName
//          quick.operatorname = data.OperatorName
//          quick.gamestartaccountunit = data.GameStartAccountUnit
//          quick.price = data.Price
//          if (!quick.price) {
//            quick.title = "该类型已售罄！"
//            quick.operatorname = ""
//            self.$toast("该类型已售罄！");
//          }
//        })
//      },
      updateBottom() {
        return this.scrollButton().then(d => {
          if (d) this.noNext = true
          return d
        })
      }
    }
  }
</script>
<style scoped>
  .w100{
    width: 100%;
  }
  .picmun {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0.52rem;
    height: 0.28rem;
    line-height: 0.26rem;
    background: rgba(0,0,0,0.5);
    text-align: center;
  }
  .picmun span {
    display: inline-block;
    background: url('~images/Icon/picmun-ico.png') no-repeat left center;
    height: 0.22rem;
    background-size: 0.18rem;
    padding-left: 0.22rem;
  }
  .disabled {
    background-color: #999;
  }

  .king-ad {
    width: 100%;
    max-width: 768px;
    height: 1.80rem;
    max-height: 180px;
  }

  .listware {
    padding: 15px;
  }

  .fade-enter-active {
    transition: all .3s ease;
  }

  .fade-leave-active {
    transition: all 1s ease;
  }

  .fade-enter, .fade-leave-active {
    transform: translateX(100%);
  }

  .ConBox {
    margin: 0;
    left: 0;
    z-index: 999;
    position: fixed;
    overflow: hidden;
  }

  .ConBox .Jbox {
    width: 100%;
    background: white;
    overflow: scroll;
    height: 100vh;
    top: 0;
    z-index: 20;
    padding-bottom: 2rem;
  }

  .quick-title {
    height: inherit;
    max-height: 1.6rem;
  }

  .listware {
    padding: 15px;
  }

  a {
    display: block;
  }

  .row {
    height: 81px !important;
    margin-right: -15px;
    width: auto !important;
  }
</style>
