<template>
  <div id="wrapper" style="background: #1f66d8" class="special-wrapper">
    <router-link to="/"><div class="top-back-homg"></div></router-link>
    <div class="index-box">
      <div class="index-top-title">
        <img src="~images/evaulation/king/king-index-bg01.jpg" alt="5173王者荣耀专区">
      </div>
      <div class="index-nav" ref="indexNav" :class="{'nav-fixed': indexNavFixed}">
        <ul class="clearfix" ref="menu">
          <li class="fl color-fff f24"
              @click="menuClick(item)"
              v-for="item in menus">{{item.name}}
          </li>
        </ul>
      </div>
    </div>
    <!--精品账号-->
    <div class="jpzh clearfix" ref="ref01">
      <div class="jpzh-word">
        <p class="color-fff f22 pl-30 word-p">绝版英雄，稀有皮肤，<br>满级铭文，高等战队，<br>你想要的，这里都有！</p>
      </div>
      <div class="right-box">
        <ul>
          <li
             v-if="index < 5"
             v-for="(item, index) in listMain['精品账号'] ? listMain['精品账号'].listSon : []">
            <div><p class="f30 color-fff">{{item.goodsName}}</p></div>
            <div class="clearfix ">
              <p class="buy-p">
                <span class="fl color-fff015">抢购价:{{item.goodsPrice}}元</span>
                <a :href="item.goodsUrl">
                  <i class="fr icon-buy-btn"></i>
                </a>
              </p>
            </div>
          </li>
        </ul>
        <div class="more-box" v-if="listMain['精品账号']">
          <a :href="listMain['精品账号'].classMoreUrl">
            <div class="more color-fff f24 text-center">更多帐号</div>
          </a>
        </div>
      </div>
    </div>
    <!--帐号估价-->
    <div class="zhgj">
      <div class="more-box">
        <a href="https://evaluation.5173.com/newwzry">
          <div class="more color-fff f24 text-center">立即估价</div>
        </a>
      </div>
    </div>
    <!--皮肤购买-->
    <div class="pfgm" ref="ref03">
      <div class="pfgm-word">
        <p class="color-fff f22 pl-10 word-p">
          超值价格买皮肤，喜欢随便买，不再心疼钱包！
        </p>
      </div>
      <div class="right-box1">
        <ul class="clearfix">
          <li class="fl" v-for="(item, index) in listSkin" v-if="index < 6" @click="skinClick(item)">
            <div class="text-center pr">
              <i class="icon-discount" :class="'icon-discount0' + item.discount"></i>
              <img :src=" item.skinImg + '?x-oss-process=image/resize,m_fixed,w_123,h_123/format,jpg/quality,q_90'">
            </div>
            <p class="f24 mt-15 color-fff text-center">{{item.skinName}}</p>
            <p class="f24 mt-5 color-fff text-center">现价:<span class="color-fff015">{{item.skinPrice}}元</span></p>
          </li>
        </ul>
        <div class="more-box">
          <router-link :to="{name: 'SpecialKingSkin'}">
            <div class="more1 color-fff f24 text-center more-zuhe">更多皮肤</div>
          </router-link>
        </div>
      </div>
    </div>
    <!--点券-->
    <div class="dianquan">
      <div class=" dq-word">
        <p class="color-fff f22 pr-10 word-p">
          IOS充值，点券有折扣，惊喜不断，充越多省越多！
        </p>
      </div>
      <div class="left-box">
        <ul class="clearfix">
          <li class="fl"
              v-if="index < 4"
              :data-a="index"
              v-for="(item, index) in listMain['点券'] ? listMain['点券'].listSon : []">
            <a :href="item.goodsUrl">
              <div class="jinbi-img text-center">
                <div class="dianquan-box">
                  <p class="f20 text-center color-705d23 fontbold">{{item.couponNums}}点券</p>
                </div>
              </div>
              <p class="text-center del-price">
                <del class="f22 color-ccc">官方充值价:{{item.goodsOldPrice}}元</del>
              </p>
              <p class="color-fff f24 mt-5 text-center">5173充值价:<span class="color-fff015">{{item.goodsPrice}}元</span>
              </p>
            </a>
          </li>
        </ul>
        <div v-if="listMain['点券']">
          <a :href="listMain['点券'].classMoreUrl">
            <div class=" color-fff f30 text-center more-zuhe">更多组合</div>
          </a>
        </div>
      </div>
    </div>
    <!--转移号-->
    <div class="zyh" ref="ref02">
      <div class=" zyh-word">
        <p class="color-fff f22 pl-10 word-p">
          转移号是指以游客方式练至30级的角色，拥有金币、钻石、英雄、铭文等，可直接转移到您的帐号下。
        </p>
      </div>
      <div class="right-box">
        <ul>
          <li
             v-if="index < 5"
             :data-a="index"
             v-for="(item, index) in listMain['转移号'] ? listMain['转移号'].listSon : []">
            <div>
              <p class="f30 color-fff">
                {{item.goodsName}}
                <a :href="item.goodsUrl">
                  <span class="color-fff015 span-price fr">抢购价:{{item.goodsPrice}}元</span>
                </a>
              </p>
            </div>
          </li>
        </ul>
        <div class="more-box" v-if="listMain['转移号']">
          <a :href="listMain['转移号'].classMoreUrl">
            <div class="more color-fff f24 text-center">更多帐号</div>
          </a>
        </div>
      </div>
    </div>
    <!--金币小号-->
    <div class="jbxh">
      <div class=" jbxh-word">
        <p class="color-fff f22 pl-10 word-p">
          金币号就是一个新的帐号，其中有大量的金币和钻石供您使用。
        </p>
      </div>
      <div class="right-box1">
        <ul class="clearfix">
          <li class="fl"
              v-if="index < 4"
              :data-a="index"
              v-for="(item, index) in listMain['金币小号'] ? listMain['金币小号'].listSon : []">
            <a :href="item.goodsUrl">
              <div class="jinbi-img text-center">
                <div class="jinbi-icon mt-10">
                  <span class="jinbi-coin color-fff f36 fontbold fontarial">{{item.goldNums}}</span>
                </div>
                <div class="jinbi-icon">
                  <span class="jinbi-zuans color-fff f36 fontbold fontarial">{{item.diamondNums}}</span>
                </div>
              </div>
              <p class="color-fff f24 text-center">限时抢购价:<span class="color-fff015">{{item.goodsPrice}}元</span></p>
            </a></li>
        </ul>
        <div class="mt-25" v-if="listMain['金币小号']">
          <a :href="listMain['金币小号'].classMoreUrl">
            <div class=" color-fff f30 text-center more-zuhe">更多组合</div>
          </a>
        </div>
      </div>
    </div>
    <!--超神代练-->
    <div class="csdl" ref="ref04">
      <div class="csdl-word">
        <p class="color-fff f22 word-p">王者操刀，火速升星，来一段奇幻之旅！</p>
      </div>
      <div class="left-box">
        <ul>
          <li class="f30 text-center mb-20"
              v-if="index < 5"
              :data-a="index"
              v-for="(item, index) in listMain['超神代练'] ? listMain['超神代练'].listSon : []">
            <a class="color-1cb1d6" :href="item.goodsUrl">{{index + 1}}.{{item.goodsName}}</a>
          </li>
        </ul>
        <div class="mt-30" v-if="listMain['超神代练']">
          <a :href="listMain['超神代练'].classMoreUrl">
            <div class="color-fff f30 text-center more-zuhe">其他代练套餐</div>
          </a>
        </div>
      </div>
    </div>
    <!--底部导航-->
    <div class="footer-nav">
      <ul style="overflow: hidden;">
        <li class="fl to-index">
          <router-link to="/" class="f30 color-fff">首页</router-link>
        </li>
        <li class="fl to-buy">
          <router-link to="/vue/choice/buyEntry?goodsType=2" class="f30 color-fff">买帐号</router-link>
        </li>
        <li class="fl to-seller">
          <router-link to="/vue/seller" class="f30 color-fff">卖帐号</router-link>
        </li>
      </ul>
    </div>
    <!--客服-->
    <div class="fixed-kf" ref="serviceLogo" v-move style="top: 0; left: 0;" @click="serviceLogoClick"></div>
    <!--选择游戏版本弹框-->
    <div class="king-bomb-box" v-show="showAlert" @touchmove.prevent>
      <div class="select-ios bg-fff">
        <h3 class="color-000 f30 text-center">请先选择游戏版本哦！<i class="close" @click="showAlert = false"></i></h3>
        <div class="clearfix">
          <a class="ios fl color-fff text-center" :href="alertLinks.ios">IOS版本</a>
          <a class="android fl bg-fff text-center" :href="alertLinks.android">安卓版本</a>
        </div>
      </div>
    </div>
    <div class="maskDiv" v-show="showAlert" @touchmove.prevent></div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        menus: [
          {name: '精品帐号', ref: 'ref01'},
          {name: '皮肤点券', ref: 'ref03'},
          {name: '转移号', ref: 'ref02'},
          {name: '超神代练', ref: 'ref04'},
        ],
        query: this.$route.query,
        showAlert: false,
        alertLinks: {ios: '', android: ''},
        listSkin: [], // 皮肤单独接口录入
        listMain: {}, // 精品账号， 转移号， 金币小号， 点券， 超神代练
        indexNavTop: null,
        indexNavFixed: false,
        screenHeight: window.screen.availHeight
      }
    },
    created () {
      this.init()
    },
    mounted () {
      this.indexNavTop = Number(this.$refs.indexNav.offsetTop) // 获取菜单栏离屏幕顶部的距离
      window.addEventListener('scroll', this.scroll)
      // 客服图片位置初始化
      let serviceLogoEle = this.$refs.serviceLogo
      serviceLogoEle.style.top = Math.floor(this.screenHeight * 2 / 3) + 'px'
      serviceLogoEle.style.left = document.body.clientWidth - serviceLogoEle.clientWidth + 'px'
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.scroll) // 销毁滚动监听
    },
    beforeRouteLeave (to, from, next) {
      if (_hmt) _hmt.push(['_trackPageview', to.fullPath])
      next()
    },
    directives: {
      /* 可拖动指令 */
      move: {
        bind (el) {
          let downX = 0, downY = 0, x = 0, y = 0
          const clientWidth = document.body.clientWidth, clientHeight = window.screen.availHeight
          el.addEventListener('touchstart', _start)
          el.addEventListener('mousedown', _start)
          function _start(event) {
            x = parseInt(el.style.left) // 获取到图标的初始化位置
            y = parseInt(el.style.top) // 获取到图标的初始化位置
            el.style['transition-duration'] = '0ms'
            if (event.type === 'touchstart') {
              downX = event.touches[0].screenX - x;
              downY = event.touches[0].screenY - y;
              el.addEventListener('touchmove', mousemove)
              document.body.addEventListener('touchend', touchend)
            } else {
              downX = event.screenX - x;
              downY = event.screenY - y;
              document.body.addEventListener('mousemove', mousemove)
              document.body.addEventListener('mouseup', mouseup)
            }
          }

          function mousemove(event) {
            // 根据拖动的差值，改变元素 top & left
            event.preventDefault()
            if (event.type === 'touchmove') {
              x = event.touches[0].screenX - downX;
              y = event.touches[0].screenY - downY;
            } else {
              x = event.screenX - downX;
              y = event.screenY - downY;
            }
            if (x < 0) x = 0
            if (x > clientWidth - el.clientWidth) x = clientWidth - el.clientWidth
            if (y < 0) y = 0
            if (y > clientHeight - el.clientHeight) y = clientHeight - el.clientHeight
            el.style.top = y + 'px'
            el.style.left = x + 'px'
          }

          function touchmove(event) {
            // 根据拖动的差值，改变元素 top & left
            event.preventDefault()
            x = event.touches[0].screenX - downX;
            y = event.touches[0].screenY - downY;
            if (x < 0) x = 0
            if (x > clientWidth - el.clientWidth) x = clientWidth - el.clientWidth
            if (y < 0) y = 0
            if (y > clientHeight - el.clientHeight) y = clientHeight - el.clientHeight
            el.style.top = y + 'px'
            el.style.left = x + 'px'
          }

          function mouseup(event) {
            // 触摸结束，控制元素贴边，利用过渡产生动画效果
            if (x < clientWidth / 2) {
              x = 0
              el.style.left = x
            } else {
              x = clientWidth - el.clientWidth
              el.style.left = clientWidth - el.clientWidth + 'px'
            }
            el.style['transition-duration'] = '300ms'
            document.body.removeEventListener('mousemove', mousemove)
            document.body.removeEventListener('mouseup', mouseup)
          }

          function touchend() {
            // 触摸结束，控制元素贴边，利用过渡产生动画效果
            if (x < clientWidth / 2) {
              x = 0
              el.style.left = x
            } else {
              x = clientWidth - el.clientWidth
              el.style.left = clientWidth - el.clientWidth + 'px'
            }
            el.style['transition-duration'] = '300ms'
            el.removeEventListener('touchmove', touchmove)
            document.body.removeEventListener('touchend', touchend)
          }
        }
      }
    },
    methods: {
      /* 皮肤点击 */
      skinClick (item) {
        this.showAlert = true
        this.alertLinks.ios = item.skinIosUrl
        this.alertLinks.android = item.skinAndroidUrl
      },
      /* 数据初始化处理 */
      init () {
//          ?topicId=1&limit=6
        this['MG_GET_KING_HOME']({topicId: this.query.id, limit: 6}).then(list => {
          this.listMain = this.prettyList(list)
        })
        this['MG_GET_KING_SKIN_HOME']().then(list => {
          list.map(v => {
            let num = 0
            if (this._num(v.skinOfficalPrice) !== 0) {
              num = Math.floor(this._num(v.skinPrice) * 100 / this._num(v.skinOfficalPrice)) || 1
            }
            v.discount = num // 折扣计算
            v.skinAndroidUrl = this._link(v.skinAndroidUrl)
            v.skinIosUrl = this._link(v.skinIosUrl)
          })
          this.listSkin = list
        })
      },
      /* 列表数据结构优化 */
      prettyList (list) {
        /* name 项名 listSon 子项 , 以name为键名，创建对象*/
        /* 金币小号 点券 数据从标题中获取 */
        let obj = {}
        list.map(v => {
          v.name = v.classTitle.trim()
          delete v.classTitle
          delete v.classDesc
          v.listSon = v.classGoodsEOList
          delete v.classGoodsEOList
          v.listSon.map(valSon => {
            switch (v.name) {
              case '金币小号':
                valSon.goldNums = this._num(valSon.goodsName.split('金币')[0])
                valSon.diamondNums = this._num(valSon.goodsName.split('金币')[1])
                break
              case '点券':
                valSon.couponNums = this._num(valSon.goodsName.split('点券')[0])
                valSon.goodsPrice = this._num(valSon.goodsName.split('点券')[1])
            }
            valSon.goodsUrl = this._link(valSon.goodsUrl)
          })
          obj[v.name] = v
        })
        return obj
      },
      /* 菜单点击事件 */
      menuClick (item) {
        document.body.scrollTop = this.$refs[item.ref].offsetTop - this.$refs.menu.clientHeight
      },
      /* 小人点击 */
      serviceLogoClick () {
        const qq = '2561158626'
        if (/baidu/i.test(navigator.userAgent.toLowerCase()) || /MicroMessenger/i.test(navigator.userAgent.toLowerCase())) {
          this.$messagebox({
            message: "如点击联系客服无法启动QQ，请加客服QQ号(" + qq + ")"
          })
        } else {
          location.href = 'mqqwpa://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web&web_src=oicqzone.com'
        }
      },
      /* 滚动监听 */
      scroll () {
        if (document.body.scrollTop > this.indexNavTop) {
          if (!this.indexNavFixed) this.indexNavFixed = true
        } else {
          if (this.indexNavFixed) this.indexNavFixed = false
        }
      },
      /* 处理数据 */
      _num(str) {
        if (!str) return 0
        let num = parseFloat(str)
        if (isNaN(num)) num = 0
        return num
      },
      /* 链接处理 */
      _link(link) {
        let url = link.split('?')[0]
        let query = link.split('?')[1]
        let querys = {}
        if (query && query.length > 0) {
          query.split('&').map(v => {
            querys[v.split('=')[0]] = v.split('=')[1]
          })
        }
        if (querys['source']) querys.source = '0002'
        else querys['source'] = '0002'
        query = ''
        for (let key in querys) {
          if (query.length !== 0) query += '&'
          query += key + '=' + querys[key]
        }
        return url + '?' + query
      },
      ...mapActions([
        'MG_GET_KING_SKIN_HOME', // 首页皮肤
        'MG_GET_KING_HOME' // 获取活动页主页数据接口
      ])
    }
  }
</script>

<style src="css/mobgame/special-king.css" scoped></style>
<style src="css/mobgame/special-king2.css" scoped></style>
<style scoped>
  .zyh .right-box ul li p span.span-price {
    margin-top: .05rem;
  }

  .right-box ul {
    padding-bottom: 0;
    margin-bottom: .2rem;
  }

  .nav-fixed {
    position: fixed;
    top: 0;
    z-index: 99;
  }

  .fixed-kf {
    z-index: 100;
  }

  @media screen and (min-width: 540px) and (max-width: 720px) {
    .special-wrapper {
      max-width: 540px !important;
    }
    .nav-fixed {
      width: 540px
    }
  }

  .index-top-title img {
    width: 100%;
  }
</style>