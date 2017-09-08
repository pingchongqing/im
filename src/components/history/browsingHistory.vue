<template>
  <div>
    <vue-go-top></vue-go-top>
    <router-view></router-view>
  </div>
</template>
<script>
  import GoTop from './historyTop.vue'
  export default {
    name:'browsingHistory',
    components: {
      'vue-go-top': GoTop
    }
  }

</script>
<style>
  #coins_id {
    background: #fff !important;
    line-height: 50px !important;
    font-size: 12px !important;
    width: 100% !important;
    text-align: center !important;
  }
</style>

