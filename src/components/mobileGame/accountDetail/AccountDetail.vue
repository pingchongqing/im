<template>
  <div>
    <div v-if="!isApp">
      <vue-head :propMoreHead="false" :ifGoBackHome="true"></vue-head>
    </div>
    <div class="fixedFill"></div>
    <div v-if="!isApp" class="fixedspace"></div>
    <!-- 详情 -->
    <div class="detail-main pb-200 bg-f1 fw">
      <div class="detail-content  fw bg-fff">
        <!-- 大于8张图片 -->
        <div v-if="firstImage" class="swiper-container border-bottom piccont" @click="show(0)">
          <div class="swiper-wrapper text-center middle" :style="{width:midwidth}" style="background-color:#000">
            <img v-show="firstImageNext" :src="firstImageNext" class="previewer-demo-img"/>
            <!--<img v-show="!firstImage" src="~images/default_img_info.jpg" style="width:100%;margin-top:-3px;"-->
            <!--class="previewer-demo-img"/>-->
          </div>
          <div class="swiper-tip text-center color-fff f28" v-show="imageList.length>0">
            <span v-show="imageList.length>0">点击查看（共{{imageList.length}}张图片）</span>
          </div>
        </div>
        <div class="detail-bt fw text-left">
          <span
             class="detail-left fl f32 color-000">{{goodsInfo.title || goodsEO.Title || goodsEO.propertyValuesTitle || goodsEO.title}}</span>
          <span v-if="!isApp" class="detail-right shareopen fr f24 text-center mr-30 mt-30"
                @click="shareClick">分享</span>
        </div>
        <!--首次出售 截图认证 安心买-->
        <div class="detail-tutorial f32 fr text-left border-bottom bg-f8 "
             v-show="goodsInfo.is_robot_capture==='true'||goodsEO.isAxm||goodsEO.isCloudAccount==true"
             @click="popupVisible=true">
          <div class="hrgames-cfi f26 color-666 fl">
            <i class="firm mr-30 hide">首次出售</i>
            <i class="firm mr-30 " v-show="goodsInfo.is_robot_capture==='true'">截图认证</i>
            <i class="firm mr-20 " v-show="goodsEO.isCloudAccount ==true">云验号</i>
            <i class="firm mr-30 " v-show="goodsEO.isAxm">安心买</i></div>
          <a href="javascript:;" @click="popupVisible=true" class="sharembgs"></a>
        </div>
        <!--首次出售 截图认证 安心买 说明-->
        <mt-popup
           v-model="popupVisible"
           position="bottom" style="width: 100%">
          <div class="sv-guarantee border-top bg-fff">
            <div class="scgtee-titl f32 color-666 border-bottom">
              <a class="close mr-30" @click="popupVisible=false"></a>服务保障
            </div>
            <div class="scgtee-demo px-30 border-bottom" v-if="goodsInfo.is_robot_capture==='true'">
              <div class="sgde-lf fl"><i class="tu"></i></div>
              <div class="sgde-tn">
                <div class="tn-til f28 color-000">截图认证</div>
                <div class="tn-txt f28 color-666 mt-10">此帐号已通过5173上号截图认证！</div>
              </div>
            </div>
            <div class="scgtee-demo px-30 border-bottom" v-if="goodsEO.isAxm">
              <a href="/vue/help/relieved">
                <div class="sgde-lf fl"><i class="an"></i></div>
                <div class="sgde-tn">
                  <div class="tn-til f28 color-000">安心买</div>
                  <div class="tn-txt f28 color-666 mt-10">此帐号卖家已开通安心买服务，承诺帐号如被找回将全额赔付！<a class="axmore">查看详情></a></div>
                </div>
              </a>
            </div>
            <div class="p-30 border-bottom" v-if="goodsEO.isCloudAccount">
              <span class="span-icon-yyh f28 color-000">云验号</span>
              <p class="f28 color-666 pl-52 lh-52">买家付款后可直接进入游戏查看帐号信息</p>
            </div>
            <div class="scgtee-demo px-30 border-bottom" style="display: none">
              <div class="sgde-lf fl"><i class="shou"></i></div>
              <div class="sgde-tn">
                <div class="tn-til f28 color-000">首次出售</div>
                <div class="tn-txt f28 color-666 mt-10">此帐号首次在5173出售！</div>
              </div>
            </div>
            <div class="scgtee-demo px-30 border-bottom" style="display: none">
              <div class="sgde-lf fl"><i class="shou"></i></div>
              <div class="sgde-tn">
                <div class="tn-til f28 color-000">云验号</div>
                <div class="tn-txt f28 color-666 mt-10">买家付款后可直接进入游戏查看帐号信息！</div>
              </div>
            </div>
            <div class="mt-80 bg-m1 f36 color-fff text-center sgde-btn" @click="popupVisible=false">朕知道了</div>
          </div>
        </mt-popup>
        <div class="search-game border-bottom fw border-20" v-if="binds.hasCard || binds.hasEmail || binds.hasMob">
          <div class="sgame fw bg-fff f32">
            <span>绑定信息</span>
          </div>
        </div>
        <div class="mbgamelist-auth bg-fff  f32 border-bottom fw pl-30">
          <ul>
            <li v-if="binds.hasCard" class="fl" :class="{active: !binds.bindCard}"><span class="card f26 ">
              <i v-text="binds.bindCard? '已':'未'"></i>绑定身份证</span></li>
            <li v-if="binds.hasMob" class="fl" :class="{active: !binds.bindMob}"><span class="mobile f26">
              <i v-text="binds.bindMob? '已':'未'"></i>绑定手机号</span></li>
            <li v-if="binds.hasEmail " class="fl" :class="{active: !binds.bindEmail}"><span class="email f26 ">
              <i v-text="binds.bindEmail? '已':'未'"></i>绑定邮箱</span></li>
          </ul>
        </div>
        <div class="mbgame-iftion fw border-20">
          <div class="iftdemo fl "><a class="text-center bg-f8 f32" :class="{active: barShow}" @click="barShow = true">商品描述</a>
          </div>
          <div class="iftdemo fl "><a class="text-center bg-f8 f32" :class="{active: !barShow}"
                                      @click="barShow = false">交易说明</a></div>
        </div>
        <!--商品描述-->
        <div class="describe" v-show="barShow">
          <div class="rechseach-titl bg-fff border-bottom  fw px-30">
            <div class="sto_rent f30 fl">所在区服</div>
            <div class="sto_rerg f30 fr text-left sto-height">{{qf}}</div>
          </div>
          <div class="rechseach-titl bg-fff border-bottom  fw px-30"
               v-for="elem in ptrList" :key="elem.id" v-if="elem.attributeName !== '亮点描述'&&elem.attributeVal!=''">
            <div class="sto_rent f30 fl">{{elem.attributeName}}</div>
            <div class="sto_rerg f30 fr text-left sto-height">{{elem.attributeVal}}</div>
          </div>
          <div class="rechseach-titl bg-fff border-bottom  fw px-30"
               v-for="elem in ptrList" :key="elem.id" v-if="elem.attributeName === '亮点描述'&&elem.attributeVal!=''">
            <div class="sto_rent f30 fl">帐号亮点</div>
            <div class="sto_rerg f30 fr text-left sto-height">{{elem.attributeVal}}</div>
          </div>
          <div v-if="overtime!=null&&overtime!=''" class="rechseach-titl bg-fff border-bottom  fw px-30">
            <div class="sto_rent f30 fl">商品有效期</div>
            <div class="sto_rerg f30 fr text-left">{{overtime}}</div>
          </div>
        </div>
        <!--交易说明-->
        <div class="clearfix"></div>
        <div class="explainn" v-show="!barShow">
          <div class="explain-coner">
            <div class="excon-titl color-m1"><i class="one fl">1</i><span class="fl ml-15 f30">下单支付</span></div>
            <div class="excon-titl excon-hihg py-20"><i class="fl">1</i><span
               class="fl ml-15 f28 color-666">选择商品后付款</span></div>
            <div class="excon-titl color-m1"><i class="two fl">1</i><span class="fl ml-15 f30">验证帐号信息</span></div>
            <div class="excon-titl excon-hihg py-20"><i class="fl">1</i><span class="fl ml-15 f28 color-666">查看帐号最新截图，联系客服确认是否购买</span>
            </div>
            <div class="excon-titl color-m1"><i class="three fl">1</i><span class="fl ml-15 f30">更换帐号绑定信息</span></div>
            <div class="excon-titl excon-hihg py-20"><i class="fl">1</i><span class="fl ml-15 f28 color-666">确认购买后，客服将绑定信息更换成买家信息</span>
            </div>
            <div class="excon-titl color-m1"><i class="four fl">1</i><span class="fl ml-15 f30">提取帐号</span></div>
            <div class="excon-titl excon-hihg py-20"><i class="fl">1</i><span class="fl ml-15 f28 color-666">绑定信息更换成功后，买家即可提取帐号</span>
            </div>
            <div class="excon-titl color-m1"><i class="five fl">1</i><span class="fl ml-15 f30">交易成功</span></div>
            <div class="excon-hihg py-20"><i class="fl">1</i><span
               class="fl ml-15 f28 color-666">5173将货款转账给卖家，交易成功</span></div>
          </div>
          <div class="search-game border-bottom border-20">
            <div class="sgame bg-fff f32">
              <span>如果遇到以下情况，请警惕是骗子</span>
            </div>
            <ul>
              <li class="px-30 border-bottom f30 color-000"><i class="fl sgm-ico"></i><em>向您索要游戏帐号和密码</em></li>
              <li class="px-30 border-bottom f30 color-000"><i class="fl sgm-ico"></i><em>向您索要绑定手机号、验证码</em></li>
              <li class="px-30 border-bottom f30 color-000"><i class="fl sgm-ico"></i><em>向买卖家索要【保证金】【手续费】【诚信金】要求支付宝转账等以各种名目索要金钱的</em>
              </li>
              <li class="px-30 border-bottom f30 color-000"><i class="fl sgm-ico"></i><em>发送假冒链接(钓鱼链接)给买卖家，在您输入帐号密码后盗取您的游戏、支付宝、银行卡等帐号密码</em>
              </li>
              <li class="px-30 border-bottom f30 color-000"><i class="fl sgm-ico"></i><em>自称是5173客服，并添加您的QQ，但官网验证不符的100%是骗子</em>
              </li>
            </ul>
          </div>
          <div class="guess-more f32 color-000 px-30 text-center fw bg-fff border-20">
            <span>
              <router-link :to="{ name: 'ValidateCenter',query:{typeName:'验证中心'}}">验证客服真假</router-link></span>
          </div>
        </div>
      </div>

      <div>
        <div class="similar-tip">
          <span class="span-icon-up f30 color-666 px-30" v-if="isShow">
          猜你喜欢
          </span>
        </div>
        <mt-loadmore
           :bottom-all-loaded="allLoaded" ref="loadmore" id="boxs"
           v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"
           infinite-scroll-immediate-check=false>
          <div v-show="index>4?isIndexy:isIndex" v-for="(item,index) in personLists" @click="goSimilarity(item)"
               class="mobilegames-conn border-bottom border-top mb-20 pr bg-fff">
            <div class="mbilegames-list ml-30 ">
              <div class="listware pr-30 py-30">
                <div class="mbgmes-img pr fl">
                  <div v-if="item.id">

                  </div>

                  <img v-if="(!item.goods_img)||item.goods_img=='null'" src="~images/default_img_info.jpg"
                       style="width:100%;" class="previewer-demo-img"/>
                  <img style="min-width: 1.5rem!important;" v-else :src="item.goods_img">
                </div>
                <a>
                  <div class="mbgmes-con">
                    <div class="mbl-title f30 color-000" style="
                     overflow: hidden;
                      line-height: 0.4rem;
                      max-height: 1.2rem;
                      height: auto !important"
                    >{{item.title}}
                    </div>
                    <div class="mbl-cper mt-10">
                      <div class="mbl-money color-m1 f32 fl font-arial">￥<span class="font-bold">{{item.price}}</span>
                      </div>
                      <div class="mbl-icon fr"><i class="an" v-show="item.is_axm && item.is_axm === 'true'"></i>
                        <!--<i class="shou"></i>-->
                        <i class="tu" v-show="item.is_robot_capture && item.is_robot_capture==='true'"></i></div>
                    </div>
                    <div class="mbl-parea color-666 f24 clearfix">
                      <p class="mbl-qf fl w100" style="
                    width: 100%;
                      white-space: nowrap;
                     text-overflow: ellipsis;
                     overflow: hidden;
                     ">{{item.game_name}}/{{item.region_name}}/{{item.server_name}}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <p id="coins_id" v-if="showCoins">
            <img src="~images/coins/loading-sm.gif">
            <span>请等待。。。</span>
          </p>
        </mt-loadmore>

        <div class="tab-empty" v-if="isNostore">
          <div class="empty-conn px-30">
            <div class="list-img"><img src="~images/gamelist.png"></div>
            <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
          </div>
        </div>

        <div v-if="isShowMore">
          <div @click="chakangeng()" v-if="personLists.length>5"
               class="guess-more f32 color-000 px-30 text-center fw bg-fff border-20">
            <span>查看更多</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 固定底部 -->
    <div class="fixed-button3 border-top" data-style="fixed-bottom" v-show="!processShow">
      <div class="redbutton">
        <span>一口价：<em>￥{{goodsEO.price || goodsEO.Price}}</em></span>
        <a class="tobuy" :class="{'button-disable':disableStatus}" @click="Buy">{{buytext}}</a>
      </div>
    </div>
    <!--商品列表下拉-更多消息-->
    <!--<div class="more_message border f36" v-show="moreStatus">
      <ul>
        <li class="list-more border-bottom" @click="messageClick"><i class="android"></i>消息</li>
        <li class="list-more border-bottom shareopen" @click="shareClick"><i class="sharew"></i>分享</li>
        <li class="list-more" @click="homeClick"><i class="home_back"></i>首页</li>
      </ul>
    </div>
    <div class="mstfiv" style="z-index:45" v-show="moreStatus" @click="mstfivClick"></div>-->
    <share></share>
    <pcess :processShow="processShow" @sonProcessShow="sonProcessShow"></pcess>
    <previewer :list="imageList" ref="previewer"></previewer>
    <loading-component></loading-component>
    <vue-go-top></vue-go-top>
  </div>
</template>
<script>
  import GoTop from 'components/common/SortList_GoTop.vue'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import loadingComponent from 'components/common/Loading.vue' // 加载时图片
  import share from 'components/common/NewShare.vue' // 分享
  import vueHead from 'components/Header.vue' // 分享
  import pcess from 'components/help/Process' // tm的购买流程
  import previewer from '../common/previwer.vue' // 查看图片
  export default {
    components: {
      'vue-go-top': GoTop,
      share,
      pcess,
      loadingComponent,
      previewer,
      vueHead,
    },
    data() {
      return {
        isIndex: true,
        isIndexy: false,
        allLoaded: false,
        busy: false,
        pageSize: 50,
        start: 1,
        isKaiGuan: true,
        isButton: false,
        isShowMore: true,
        showCoins: false,
        personLists: [],
        barShow: true,
        popupVisible: false,
        axmStatus: false,
        shareStatus: false,
        moreStatus: false,
        processShow: false,
        relievedShow: false,
        noImage: false,
        isShow: true,
        sharemsg: '',
        isNostore: false,
        midwidth: window.innerWidth + 'px',
        isApp: false,
        firstImageNext: this.$route.query.goods_img === '' || this.$route.query.goods_img === undefined ?
          null : this.imgfilter(this.$route.query.goods_img),
        shareType: ''
      }
    },
    beforeRouteLeave(to, from, next) {
      if (_hmt) _hmt.push(['_trackPageview', to.fullPath]);
      next()
    },
    computed: {
      qf() {
        let spname = this.goodsEO.serviceProviderName ? this.goodsEO.serviceProviderName + '/' : ''
        let regname = this.goodsEO.regionName ? this.goodsEO.regionName + '/' : ''
        let sername = this.goodsEO.serverName ? this.goodsEO.serverName : ''
        let pca = this.goodsEO.GameAreaName ? this.goodsEO.GameAreaName + '/' : ''
        let pcs = this.goodsEO.GameServerName ? this.goodsEO.GameServerName : ''
        return spname + regname + sername + pca + pcs
      },
      buytext() {
        if (this.disableStatus) {
          return '无法购买'
        } else {
          return '立即购买'
        }
      },
      xqtitle() {
        if (this.pList.length > 0) {
          let attr = '';
          this.pList.forEach(elem => {
            attr += ' ' + elem.attributeVal
          })
          return '【' + attr + '】' + this.goodsEO.title
        } else {
          return this.goodsEO.title
        }
      },
      ...mapState({
        goodsEO: state => {
          return state.account.goodsEO
        },
        goodsInfo: state => {
          return state.account.goodsInfo
        },
        pList: state => {
          return state.account.pList
        },
        imageList: state => {
          return state.account.imageList
        },
        errMsg: state => {
          return state.account.errMsg
        },
        warnMsg: state => {
          return state.account.warnMsg
        },
      }),
      binds() {
        /*
         手机绑定选择     对应的值：未绑定手机,已绑定手机
         身份证绑定选择   对应的值：未绑定身份证,已绑定身份证
         邮箱绑定选择     对应的值：未绑定邮箱,已绑定邮箱

         手机绑定选择     对应的值：已绑定,未绑定
         邮箱身份证选择   对应的值：已设置,未设置   */
        /**
         * 1. 手机 、 邮箱、 身份证 抽出三个键对应的值 （子字符串在当前字符串的位置）
         *
         * */
        let bindCard = '';
        let bindEmail = '';
        let bindMob = '';
        let bindAllMessage = this.pList.filter(v => v.attributeName === '帐号绑定')[0] || undefined
        if (bindAllMessage) {
          let binds = bindAllMessage.attributeVal.split(',')
          binds.some(v => v === '身份证') ?
            bindCard = '已绑定身份证' : bindCard = '未绑定身份证'
          binds.some(v => v === '密保邮箱') ?
            bindEmail = '已绑定邮箱' : bindEmail = '未绑定邮箱'
          binds.some(v => v === '密保手机') ?
            bindMob = '已绑定手机号' : bindMob = '未绑定手机号'
        } else
          this.pList.map(v => {
            if (v.attributeName.indexOf('选择') > -1) {
              if (v.attributeName.indexOf('手机') > -1)
                bindMob = v.attributeVal
              if (v.attributeName.indexOf('邮箱') > -1)
                bindEmail = v.attributeVal
              if (v.attributeName.indexOf('身份证') > -1)
                bindCard = v.attributeVal
            }
          })
        let ret = {bindCard, bindEmail, bindMob}
        for (let key in ret) {
          if (ret[key] === '')
            continue  // 如果未空，则不设置为布尔值
          ret[key] = ret[key].indexOf('已') > -1
        }
        return {
          ...ret, text: {bindCard, bindEmail, bindMob}, ...{
            hasCard: bindCard !== '',
            hasEmail: bindEmail !== '',
            hasMob: bindMob !== ''
          }
        }
      },
      ptrList() {
        let obj = JSON.parse(JSON.stringify(this.pList))
//        return obj  //测试使用
        return obj.filter(v => {
          return !(v.attributeName.indexOf('手机') > -1
            || v.attributeName.indexOf('邮箱') > -1
            || v.attributeName.indexOf('身份证') > -1)
        })
      },
      ...mapGetters({
        overtime: 'account/OVERTIME',
        firstImage: 'account/FIRSTIMAGE',
        eosigns: 'account/EOSIGNS',
        disableStatus: 'account/DISABLESTATUS'
      })
    },
    watch: {
      moreStatus(sta) {
        this.$bus.emit('headMoreStatus', sta)
      },
      errMsg(msg) {
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
      warnMsg(msg) {
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
    },
    created() {
      this.isApp = !!this.$route.query.app;
    },
    mounted: function mounted() {
      if (location.href.indexOf('account') > -1) {
        this.shareType = '帐号'
      }
      this.setDefault()
      this.$nextTick(() => {
        setTimeout(() => {
          if (!this.firstImage) {
            this.noImage = true
          } else {
            if (!this.firstImageNext) {
              this.firstImageNext = this.imgfilter(this.firstImage)
            }
          }
        }, 500)
      })
      this.$bus.emit('isMore', true)
      this.$bus.on('moreStatus', sta => {
        this.moreStatus = sta
      })
    },
    methods: {
      chakangeng() {
        this.isButton = true;
        this.isShowMore = false;
        this.isIndexy = true;
        this.isNostore = true

      },
      gagaMethod() {
        //猜你喜欢接口
        this.$http.post(
          this.$CONSTANTS.APIGoods + 'goodsSimilarAndGuessLike/guessLikeGoods',
          {
            gameId: this.goodsInfo.game_id || this.goodsEO.gameId,
            goodsId: this.goodsEO.BizOfferId || this.goodsEO.goodsId,
            regionId: this.goodsInfo.region_id,
            serviceProviderId: this.goodsEO.serviceProviderId,
            gameType: 2,
            price: Number(this.goodsEO.price),
            page: this.start,
            pageCount: this.pageSize,
          }).then((res) => {
          this.showCoins = false;
          var self = this;
          if (res.body.responseStatus.code == "00") {
            const object = JSON.parse(res.body.result)
            if (this.start == 1 && object.length == 0) {
              this.isShow = false;
            } else {
              this.isShow = true
            }
            if (this.start == 1 && object.length == 5) {
              this.isShowMore = false;

            }

            object.forEach(
              (item, index) => {

                if (item.id == this.$route.query.goodsId) {

                } else {
                  this.personLists.push(item);
                  if (this.personLists.length == 0) {
                    this.isShow = false
                  }
                  self.showCoins = false;
                }
              })
            if (object.length == this.pageSize) {
              if (this.isButton) {
                self.busy = true
              } else {
                self.busy = true
              }

            } else {
              self.showCoins = false;
            }

          }
          else {
            this.isShow = false
          }
        }, () => {
          console.log("请求错误！");
        })


      },
      loadMore: function () {
        if (this.isFirse) {
          var self = this;
          this.busy = true;
          this.isKaiGuan = false
          this.showCoins = true;
          this.gagaMethod()
        }
      },
      goSimilarity(item) {

//      this.$store.commit('SET_HISTORY',document.body.scrollTop)
        let goods_source_type = item.goods_source_type ? item.goods_source_type : 0
        // 手游和端游详情页分离
        if (Number(this.$route.params.gameType) === 1) {  // 1是端游 2是手游
          location.href = "/vue/account/accountDetail/" + item.id + "/" + goods_source_type + "/" + 1
        } else {
          location.href = "/vue/mobile-game/account-detail/" + item.id + "/" + goods_source_type
//          this.$router.push({
//            name: 'MGAccountDetail',
//            params: {goodsId:item.id,goods_source_type: item.goods_source_type ? item.goods_source_type : 0}
//          })
        }
      },
      imgfilter: function (path) {
        path = path.split('?')[0]
        if (!path) {
          return path;
        }
        if (path === '//img1.5173.com/') {
          return '/dist/default_img.jpg'
        } else if (path.indexOf('img1.5173.com') > -1 && path.indexOf('x-oss-process=image') > -1) {
          return path
        } else if (path.indexOf('img1.5173.com') > -1) {
          return path + '?x-oss-process=image/resize,m_fixed,w_880/format,jpg/quality,q_60'
        } else if (path.indexOf('http://m5173.img-cn-hangzhou.aliyuncs.com') > -1) {
          return path + '?x-oss-process=image/resize,m_fixed,w_880/format,jpg/quality,q_60'
        } else {
          return path
        }
      },
      mstfivClick() {
        this.moreStatus = false
      },
      show(index) {
        if (this.firstImage) {
          this.$refs.previewer.show(index)
        }
      },
      Buy() {
        if (!this.disableStatus) {
          /*手游 type=1 */
          /* 如果是app的详情，使用lh 跳转 */
          if (this.isApp) {
            let str = `/vue/account/orderAccoApp/${this.$route.params.goodsId}/${this.$route.params.goods_source_type}/2`
            str = this.$route.query.st ? str + '?st=' + this.$route.query.st : str
            location.href = str
          } else {
            this.$router.push({
              name: 'orderAcco',
              params: {
                goodsId: this.$route.params.goodsId,  // 商品id
                goods_source_type: this.$route.params.goods_source_type, // 商品源0是m站  1是主站
                gameType: 2,
              },
              query: {
                st: this.$route.query.st,
              }
            })
          }
        }
      },
      processClick() {
        this.processShow = !this.processShow
      },
      sonProcessShow(val) {
        this.processShow = val
      },
      shareClick() {
        this.shareStatus = true
        this.moreStatus = false
        this.$bus.emit('shareShow', this.shareStatus)
        this.$bus.emit('busShareUrl', window.location.href)
      },
      homeClick() {
        location.href = '/'
      },
      messageClick() {
        location.href = '/member/message.html'
      },
      setDefault: async function setDefault() {
        let arg;
        let pname, rname, sname;
        if (this.$route.params.goods_source_type == 1) { // 主站单子
          arg = {
            PcGoodsId: this.$route.params.goodsId
          }
        } else {
          arg = {
            goodsId: this.$route.params.goodsId
          }
        }
        await this.getGoodsInfo(this.$route.params.goodsId)
        await this.getGoodsEO(arg);
        this.isFirse = true
        this.firstImageNext = this.imgfilter(this.firstImage)
        this.loadMore()
        //神策开始
        var gameTypeName, isLog;
        this.$getAccount().then(account => {
          if (account) {
            isLog = true;
          } else {
            isLog = false;
          }
          ;
          if (this.goodsEO.gameType == 1) {
            gameTypeName = "端游"
          } else {
            gameTypeName = "手游"
          };
          sa.track("goodsDetails",{
            platfromType:this.goodsEO.regionName,
            belongGame:this.goodsEO.gameName,
            gameType:gameTypeName,
            belongArea:this.goodsEO.regionName+this.goodsEO.gameName+this.goodsEO.serverName,
            gameCompany:this.goodsEO.gameName,
            goodsDynamicProperties:this.goodsEO.filterProperty ? this.goodsEO.filterProperty : "",
            goodsWeight:this.goodsInfo.sort_score,
            goodsSum:Number(this.goodsEO.totalAmount),
            goodsPrice:this.goodsEO.totalAmount.toString(),
            isLogin:isLog
          });
          sa.quick('autoTrack');
        });

        //神策结束

        var attr = [];
        var dateTime = "";
        var data = new Date()
        var newItem = {};
        dateTime = data.getTime()
        if (this.goodsEO.goodsId) {
          var storage = window.localStorage;
          if (window.localStorage.history) {
            attr = JSON.parse(window.localStorage.history)
            if (attr.length > 299) {
              attr.pop()
            }
            for (var i = 0; i < attr.length; i++) {
              if (attr[i].id == this.goodsEO.goodsId) {
                attr.splice(i, 1)
              }

            }
          }
          newItem.id = this.goodsEO.goodsId;
          if (this.goodsInfo.title) {
            newItem.title = this.goodsInfo.title;
          } else {
            newItem.title = this.goodsEO.title;
          }
          newItem.game_id = this.goodsInfo.game_id || this.goodsEO.gameId,
            newItem.goodsId = this.goodsEO.BizOfferId || this.goodsEO.goodsId,
            newItem.region_id = this.goodsInfo.region_id || this.goodsEO.regionId,
            newItem.serviceProviderId = this.goodsEO.serviceProviderId,
            newItem.price = this.goodsEO.price;
          newItem.is_robot_capture = this.goodsEO.isRobotCapture;
          newItem.goods_img = this.firstImage;
          newItem.is_axm = this.goodsEO.isAxm;
          newItem.game_name = this.goodsEO.gameName;
          newItem.region_name = this.goodsEO.regionName;
          newItem.server_name = this.goodsEO.serverName;
          newItem.dateTime = dateTime;
          newItem.gameType = 2;
          newItem.goodsSource = this.$route.params.goods_source_type;
          attr.unshift(newItem)
          storage.setItem('history', JSON.stringify(attr))
        }
        else if (this.goodsEO.BizOfferId) {
          var storage = window.localStorage;
          if (window.localStorage.history) {
            attr = JSON.parse(window.localStorage.history)
            if (attr.length > 299) {
              attr.pop()
            }
            for (var i = 0; i < attr.length; i++) {
              if (attr[i].id == this.goodsEO.BizOfferId) {
                attr.splice(i, 1)
              }

            }
          }
          newItem.id = this.goodsEO.BizOfferId;//this.goodsEO详情
          if (this.goodsInfo.title) {
            newItem.title = this.goodsInfo.title;
          } else {
            newItem.title = this.goodsEO.title;
          }
          newItem.game_id = this.goodsInfo.game_id || this.goodsEO.gameId,
            newItem.goodsId = this.goodsEO.BizOfferId || this.goodsEO.goodsId,
            newItem.region_id = this.goodsInfo.region_id || this.goodsEO.regionId,
            newItem.serviceProviderId = this.goodsEO.serviceProviderId,
            newItem.price = this.goodsEO.Price;
          newItem.is_robot_capture = this.goodsInfo.is_robot_capture;
          newItem.goods_img = this.firstImage;
          newItem.is_axm = this.goodsInfo.is_axm;
          newItem.game_name = this.goodsEO.GameName;
          newItem.region_name = this.goodsEO.GameAreaName;
          newItem.server_name = this.goodsEO.GameServerName;
          newItem.dateTime = dateTime;
          newItem.gameType = 2;
          newItem.goodsSource = this.$route.params.goods_source_type;
          attr.unshift(newItem)
          storage.setItem('history', JSON.stringify(attr))
        }
        var strItem = JSON.stringify(newItem)
        this.$getAccount().then(account => {
          if (account) {
//          this.pcdUserId = account.pcUserId
            this.$http.post(
              this.$CONSTANTS.APIGoods + 'goodsBrowseHistory/addBrowseHistory',
              {
                userId: account.pcUserId,
                jsonBrowse: strItem, //发布单编号
                dateTime: dateTime
              }).then((res) => {
              if (res.body.responseStatus.code == "00") {
              }
            })
          } else {
          }
        })

        document.title = `${this.goodsEO.gameName || this.goodsEO.GameName}  ${this.goodsInfo.title || this.goodsEO.Title || this.goodsEO.propertyValuesTitle || this.goodsEO.title} ${this.goodsEO.price || this.goodsEO.Price}元`
        this.$bus.emit('headerText', this.goodsEO.gameName || this.goodsEO.GameName)
        this.$bus.emit('urlAddress', `${this.goodsEO.gameName || this.goodsEO.GameName}  ${this.shareType}  ${this.goodsInfo.title || this.goodsEO.Title || this.goodsEO.propertyValuesTitle || this.goodsEO.title}  ${this.goodsEO.price || this.goodsEO.Price}元  ${window.location.href}`)
        /*
         * 分享数据，可选参数
         * url, 分享的链接，如果不传则会自动获取浏览器地址
         * title, 分享的标题
         * summary, 分享的简介
         */
        this.$bus.emit('busShareQZone', {
          title: pname + rname + sname,
          url: encodeURIComponent(location.href),
          summary: this.xqtitle || this.goodsEO.Title
        })
        this.sharemsg = this.xqtitle + ' ' + location.href
        this.addBrowerNum({goodsId: this.$route.params.goodsId})
      },
      ...mapActions({
        getGoodsEO: 'account/A_GETGOODS',
        getGoodsInfo: 'account/A_GETGOODSINFO',
        addBrowerNum: 'account/A_ADDBROWERNUM',
        clearGoodsEO: 'account/A_CLEARGOODSEO',
        clearErr: 'account/CLEAR_ERR',
        clearWarn: 'account/CLEAR_WARN',
      })
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.clearGoodsEO()
      })
    },
    beforeDestroy: function beforeDestroy() {
      this.$bus.emit('shareShow', false)
    },

  }
</script>
<style scoped>
  .axmore {
    color: #1864ff;
  }

  .lh {
    line-height: .8rem;
  }

  .piccont {
    width: 100%;
    position: relative;
  }

  .middle {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    height: 4.32rem;
    line-height: 4.32rem;
  }

  .more_message {
    display: block;
    position: fixed;
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

  .swiper-container img {
    max-height: 100%;
    max-width: 100%;
    display: inline;
  }

  .pcOrder03 ul {
    padding-top: .3rem;
  }

  .pcOrder03 ul li {
    float: left;
    width: 33.33%;
    box-sizing: border-box;
    padding-left: .1rem;
    padding-bottom: .3rem;
    line-height: .5rem;
  }

  .pcOrder03 ul li i {
    float: left;
    display: inline-block;
    margin-right: .1rem;
    background: url(~images/icon-gou.png) center center no-repeat;
    background-size: .2rem;
    border: 1px solid #34bb3a;
    width: .45rem;
    height: .45rem;
    border-radius: 100%;
  }

  .similar-tip {
    line-height: 0.9rem;
  }

  #coins_id {
    background: #fff !important;
    line-height: 50px !important;
    font-size: 12px !important;
    width: 100% !important;
    text-align: center !important;
  }
</style>
