<template>
  <div>
    <!---------------------------- tab4 ---------------------------->
    <div class="tab4 clearfix bg-fff fixed-top mt-97 border20-bottom" style="z-index: 60;">
      <ul>
        <li v-for="(value, key) in menus.list" class="fl text-center"
            :class="{actives: key == menus.checked }"
            @click="changeMenu(key)"
        >
          <router-link :to="{ name: 'sStoreGoods', params: { state: value.state }}" v-text="value.name"
                       replace></router-link>
        </li>
      </ul>
    </div>
    <!---------------------------- 商品 ---------------------------->
    <div id="tab-content" class="mt-205">
      <single-list
        :start="startSingleList"
        :dataArr="nowMenu.list"
        :updateBottom="updateBottom"
      >
        <ul>
          <li v-for="item in nowMenu.list">
            <div class="mt-20 coin-goods bg-fff">
              <router-link
                :to="{name: 'sGoodsDetail', query: {orderId: item.orderId, qq:item.qq }}"
              >
                <div class="p-30 border-bottom clearfix">
                  <a class="fl pr" href="javascript:void(0);">
                    <em class="pa bi">币</em>
                    <img :src="item.gameImage"/>
                  </a>
                  <dl class="fl ml-20" style="width:-moz-calc(100% - 1.6rem);width:-webkit-calc(100% - 1.6rem);width: calc(100% - 1.6rem);">
                    <dt class="f28 color-888" style="
                     white-space: nowrap;
                     text-overflow: ellipsis;
                     overflow: hidden;
                     padding-right: .3rem;
                    ">
                      <span v-text="item.gameName"></span>/
                      <span v-text="item.regionName"></span>/
                      <span v-text="item.serverName"></span>
                      <span v-if="item.raceName">/</span>
                      <span v-text="item.raceName"></span>
                    </dt>
                    <dd class="f30 color-000   mt-15">购买
                      <span v-text="item.count"></span>
                      <span v-text="item.moneyName"></span>
                    </dd>
                    <dd class="f30 color-000 mt-15">￥
                      <span v-text="(item.count * item.unitPrice).toFixed(2)"></span></dd>
                  </dl>
                </div>
              </router-link>
              <div class="bg-fff clearfix px-30">
                <div class="fl"><span class="pl-20 f30 color-000 lh110 bl" v-text="nowMenu.describe"></span></div>
                <div class="fr goods-btn lh110 clearfix">
                  <button class="d-inline-block color-f75e46 bg-fff border-f75e46 f30"
                          @click="goToServe(item.qq)">联系客服
                  </button>
                  <a :href="'http://yxbmall.5173.com/gamegold-facade-frontend/mPayment?orderId='+ item.orderId">
                    <button v-if="nowMenu.state == 'paying'" class="ml-20 d-inline-block color-fff bg-f75e46 f30">去付款</button>
                  </a>
                </div>
              </div>
            </div>

          </li>
        </ul>
        <div slot="noDataShow">
          <ul>
            <li>
              <div class="list-empty bg-fff">
                <p><img src="~images/gamelogo.png"></p>
                <span>您还没有订单</span>
              </div>
            </li>
          </ul>
        </div>
      </single-list>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import singleList from './InfiniteScrollComponent.vue'
  import {buyerStoreMenu} from './data/buyerStoreMenu.js'
  Vue.component('singleList', singleList);
  import http from './http'
  export  default{
    name: 'BuyerStoreGoods',
    data(){
      return {
        menus: buyerStoreMenu,
        list: null,
        startSingleList: false, // 启动列表显示的指令
      }
    },
    computed: {
      nowMenu(){  // 计算属性获取当前菜单对象
        return this.menus.list[this.menus.checked]
      }
    },
    created(){
      setTimeout(() => {
        this.list = [];
        this.startSingleList = true;
      }, 10)
    },
    beforeRouteEnter(to, from, next){
      /**
       * 根据传入的路径判断相应的状态（根据路径，选中相应菜单）
       */
      if (to.params.state) {
        next(vm => {
          let pathIsTrue = false;
          for (let key in vm.menus.list) {
            if (vm.menus.list[key].state == to.params.state) {
              pathIsTrue = true;
              vm.menus.checked = key;
            }
          }
          if (!pathIsTrue) {
            console.log("路径不对")
          }
        })
      }
      next()
    },
    methods: {
      /**
       * 列表滚动到底部时触发，获取列表
       * 传入无限滚动组件的一个添加数据方法。
       *
       * 传出值
       *  '加载完毕' || null
       */
      updateBottom(){
        return http.getBuyerStoreOrderList(this.nowMenu.code, this.nowMenu.list.length).then(list => {
          if (list && list.length > 0) {
            this.nowMenu.list.push(...list);
            return null
          } else {
            return "加载完毕"
          }
        });
      },
      /**
       * 点击“联系客服”，触发链接
       * @param qq
       */
      goToServe(qq){
        if(/baidu/i.test(navigator.userAgent.toLowerCase())){
          alert('"联系客服"暂不支持当前浏览器，建议使用QQ浏览器、UC浏览器')
        }else {
          location.href = 'mqqwpa://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web&web_src=oicqzone.com'
        }
      },
      /**
       * 点击菜单时路径变化，但路由无法监听到。手动配置更换显示菜单
       * @param key
       */
      changeMenu(key){
        this.menus.checked = key;
        this.nowMenu.list = [];
        this.startSingleList = false;
        this.$nextTick(() => {
          this.startSingleList = true;
        })
      }
    }
  }
</script>
<style scoped>
  .actives{
    border-bottom: 0.04rem solid #f75e46;
    background: #fff;
  }
  .actives a{
    color:  #f75e46;

  }
  .tab4 li:after {
    background-color: #fff;
  }
  .border20-bottom{border-bottom:0.2rem solid #f1f1f1;}
</style>
