<template>
  <div id="wrapper" class="pb-200">
    <!---------------------------- top ---------------------------->
    <div class="top-header fixed-top border-bottom">
      <div class="top-back">
        <router-link :to="{ name: 'sStoreGoods', params: { state: state }}"></router-link>
      </div>
      <h2 class="f36 ">订单详情</h2>
      <div class="top-right"></div>
    </div>
    <!---------------------------- 订单取消 ---------------------------->
    <div class="mt-100 px-30 or-title lh130 pr">
      <img class="pa w-100" src="~images/coins/border-bg.png"/>
      <span class="pl-20 f32" v-text="name"></span>
    </div>
    <!---------------------------- 商品信息 ---------------------------->
    <div class="mt-20 border-bottom bg-fff">
      <dl class="pt-30 px-30">
        <dt class="f28 color-999">商品标题</dt>
        <dd class="f30 color-000 mt-30" v-text="msg.title"></dd>
      </dl>
      <dl class="mt-40 px-30">
        <dt class="f28 color-999">游戏区服</dt>
        <dd class="f30 color-000 mt-30" v-if="msg.gameName&&msg.serverName&&msg.regionName">
          <span v-text="msg.gameName + '/'"></span>
          <span v-text="msg.regionName + '/'"></span>
          <span v-text="msg.serverName"></span>
          <span v-if="msg.raceName">/</span>
          <span v-text="msg.raceName"></span>
        </dd>
      </dl>
      <dl class="mt-40 pb-30 px-30">
        <dt class="f28 color-999">商品类型</dt>
        <dd class="f30 color-000 mt-30" v-text="msg.goodsType"></dd>
      </dl>
      <ul class="pl-30 clearfix">
        <li class="border-top clearfix lh110 pr-30">
          <div class="fl f30 color-000">订单号</div>
          <div class="fr f30 color-000" v-text="msg.orderId">

          </div>
        </li>
        <li class="border-top clearfix lh110 pr-30">
          <div class="fl f30 color-000">价格</div>
          <div v-if="loaded" class="fr f30 color-000">￥ <span v-text="msg.realAmount"></span> x 1</div>
        </li>
        <li class="border-top clearfix  pr-30" style="padding: 0.2rem 0;" v-if="msg.reason && msg.reason.length != 0">
          <div class="fl f30 color-000" v-text="'取消原因：' + msg.reason" style="line-height: .6rem;"></div>
        </li>
        <li v-if="loaded" class="border-top pr-30 py-30">
          <div class="f30 color-666 text-right">合计<span class="color-f75e46 f32"> ￥ <span
            v-text="msg.realAmount"></span></span></div>
          <div class="f24 color-999 text-right mt-25" v-if="msg.createTime">下单时间
            <span v-text="msg.createTime.getFullYear() + '-' +
           ((msg.createTime.getMonth()+1) < 10 ? ('0' +  (msg.createTime.getMonth()+1)) : (msg.createTime.getMonth()+1)) + '-' +
           (msg.createTime.getDate() < 10 ? ('0' + msg.createTime.getDate()) : msg.createTime.getDate()) + ' ' +
           (msg.createTime.getHours() < 10 ? ('0' + msg.createTime.getHours()) : msg.createTime.getHours()) + ':' +
           (msg.createTime.getMinutes() < 10 ? ('0' + msg.createTime.getMinutes()) : msg.createTime.getMinutes()) + ':' +
           (msg.createTime.getSeconds() < 10 ? ('0' + msg.createTime.getSeconds()) : msg.createTime.getSeconds())
          ">
          </span>
          </div>
        </li>
      </ul>
    </div>
    <!---------------------------- 联系客服 ---------------------------->
    <div v-if="loaded" class="fixed-bottom border-top bg-fff coin-kf pr-30">
      <button v-if="state == 'paying'" class="bg-m1 color-fff lh82 ml-30 lh82 my-20 f32 fr" @click="goPay()">去付款

      </button>
      <button class="bg-fff color-f75e46 my-20 f32 lh82 fr" @click="goToServe()">联系客服</button>
    </div>
  </div>

</template>

<script>
  import {getMenu} from './data/buyerStoreMenu'
  import http from "./http"
  export  default {
    data(){
      return {
        loaded: false,
        name: '',
        qq: '',
        msg: {},
        state: 'paying'
      }
    },
    created() {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.qq = this.$route.query.qq;
      // 黑操作处理
      http.getStoreDetail(this.$route.query.orderId).then(res => {
        this.$indicator.close();
        if (res) {
          res.createTime = new Date(res.createTime);
          res.reason = res.reason ? res.reason : '';
          this.msg = res;
          /**
           * 更加返回的状态码， 配置相应的标题和状态（返回的页面）
           */
          let menu = getMenu(res.status);
          this.name = menu.name;
          this.state = menu.state;
          this.loaded = true;
        }
      });
    },
    methods: {
      goToServe(){
        if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
          this.$messagebox({
            message: "如点击联系客服无法启动QQ，请加客服QQ号("+qq+")"
          })
        }else {
          location.href = 'mqqwpa://im/chat?chat_type=wpa&uin=' + this.qq + '&version=1&src_type=web&web_src=oicqzone.com'
        }
      },
      goPay(){
        location.href = "http://yxbmall.5173.com/gamegold-facade-frontend/mPayment?orderId=" + this.$route.query.orderId;
      },
    }
  }
</script>
