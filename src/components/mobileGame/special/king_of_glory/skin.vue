<template>
  <div id="wrapper">
    <router-link to="/"><div class="top-back-homg"></div></router-link>
    <!--头部-->
    <div class="king-top-box">
      <div class="king-top-search-box">
        <div class="king-top-search">
          <input class="fl f26" type="text" maxlength="" v-model.trim="inputFilter" placeholder="请输入英雄或皮肤名称">
          <i class="icon-search-btn fr"></i>
        </div>
      </div>
      <div class="skin-list-nav" ref="homeNav" :class="{'nav-fixed': indexNavFixed}">
        <ul class="clearfix">
          <li class="tab fl color-fff f26"
              @click="skin.menuCheckIndex = index"
              :class="{active: index === skin.menuCheckIndex}"
              v-for="(item, index) in skin.menus">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--皮肤列表-->
    <div class="skin-list-box">
      <div class="shadow"></div>
      <ul class="clearfix">
        <li class="fl"
            @click="skinClick(item)"
            v-if="item.skinName.indexOf(inputFilter) > -1 || item.skinHero.indexOf(inputFilter) > -1"
            v-for="item in skin.menus[skin.menuCheckIndex].list">
          <div class="skin-img-box fl">
            <img :src=" item.skinImg + '?x-oss-process=image/resize,m_fixed,w_123,h_123/format,jpg/quality,q_90'"
                 :alt="item.skinName">
          </div>
          <div class="fl skin-detail-box">
            <p class="f30 color-000 skin-name">{{item.skinName}}</p>
            <p class="f26 color-333 skin-other-name">{{item.skinHero}}</p>
            <p class="f26 skin-price"><span class="color-m1 ">{{item.skinPrice}}元</span><span class="color-333">/</span><del class="color-333">{{item.skinOfficalPrice}}</del>
            </p>
          </div>
        </li>
      </ul>
    </div>
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
    <div class="maskDiv" v-show="showAlert" @touchmove.preven></div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import SkinClass from './SkinClass.js'
  export default {
    data () {
      return {
        indexNavFixed: false, // 控制菜单
        indexNavTop: null,
        alertLinks: {ios: '', android: ''},
        inputFilter: '',
        skin: new SkinClass(),
        showAlert: false
      }
    },
    created () {
      this['MG_GET_KING_SKIN']().then(list => {
        list.map(v => {
          v.skinAndroidUrl = this._link(v.skinAndroidUrl)
          v.skinIosUrl = this._link(v.skinIosUrl)
        })
        this.skin.setList(list)
      })
    },
    mounted () {
      this.indexNavTop = Number(this.$refs.homeNav.offsetTop) // 获取菜单栏离屏幕顶部的距离
      window.addEventListener('scroll', this.scroll)
    },
    beforeDestroy () { window.removeEventListener('scroll', this.scroll) },
    beforeRouteLeave (to, from, next) {
      if (_hmt) _hmt.push(['_trackPageview', to.fullPath])
      next(true)
    },
    methods: {
      /* 滚动监听 */
      scroll () {
        if (document.body.scrollTop > this.indexNavTop) {
          if (!this.indexNavFixed) this.indexNavFixed = true
        } else {
          if (this.indexNavFixed) this.indexNavFixed = false
        }
      },
      /* 皮肤点击 */
      skinClick (item) {
        this.showAlert = true
        this.alertLinks.ios = item.skinIosUrl
        this.alertLinks.android = item.skinAndroidUrl
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
      ...mapActions(['MG_GET_KING_SKIN']) // 获取商品列表（所有）
    }
  }
</script>

<style src="css/mobgame/special-king.css" scoped></style>
<style src="css/mobgame/special-king2.css" scoped></style>

<style scoped>
  .skin-list-box li {
    padding: .2rem;
  }
  .nav-fixed {
    position: fixed;
    top: 0;
    z-index: 99;
  }
</style>