<template>
  <div class="filter-masks">
    <!---------------------------- top ---------------------------->
    <div class="top-header fixed-top border-bottom">
      <div class="top-back">
        <a @click="showTips"></a>
      </div>
      <h2 class="f36 ">友情提示</h2>
      <div class="top-right"></div>
    </div>

    <div class="friend-tip-content mt-140 px-30">
      <div class="lh-48 f30 color-333 mt-50" v-for="list in spstr">{{list.replace(/<\/?.+?>/g,"").replace(/&nbsp;/g,"")}}</div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'TradeTips',
    data(){
      return{

      }
    },
    props: ['spstr'],
    methods:{
      showTips(){
        this.$parent.hint_box = false
      }
    }
  }
</script>
<style scoped src="css/currency/currency-zch.css"></style>
<style scoped src="css/currency/currency-cl.css"></style>

<style scoped>
  .filter-masks{
    background: #ffffff;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 999;


  }
</style>
