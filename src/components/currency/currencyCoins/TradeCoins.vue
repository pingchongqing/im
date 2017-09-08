<template>
  <div>
    <vue-go-top></vue-go-top>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import GoTop from './TradeGoTop.vue'
  export default {
    name: 'tradeCoins',
    components: {
      'vue-go-top': GoTop
    }
  }
</script>

<style>
  @import "~css/fost-base.css";
  @import "~css/currency/currency-zch.css";
  @import "~css/currency/currency-cl.css";
  @import "~css/style.css";

  .js-msg {
    position: relative !important;
  }
  .showlist {
    display: block !important;
    top: 1.12rem !important;
    left: 0 !important;
    z-index: 51;
  }

  .shade {
    position: fixed;
    display: none;
    top: 5.60rem;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background: #000;
    opacity: .5;
  }
  #coinsbox .shade {
    top: 8.6rem;
  }


  .mint-loadmore {
    width: 100% !important;
  }

  .dialog-box2 {
    display: block !important;
  }

  #coins_id {

    background: #fff !important;
    line-height: 50px !important;
    font-size: 12px !important;
    width: 100% !important;
    text-align: center !important;
  }

  #dialog_show2 {
    left: 50% !important;
    z-index: 1000 !important;
    top: 30% !important;
    position: fixed !important;
    /*transform: translate(-50%, -30%) !important;*/
    margin-left: -44%!important;

  }
  .risk-title{
    font-weight: 600;
  }
  .risk-body .title{font-weight:600}
  .problem {
    /*margin-left: -0.15rem!important;*/
  }
</style>

