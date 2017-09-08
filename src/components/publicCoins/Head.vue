<template>
  <div class="top-header fixed-top border-bottom">
    <div class="top-back">
      <a href="javascript:void(0);" @click="goBack()"></a>
    </div>
    <h2 class="f36 " v-text="title"></h2>
    <div class="top-right"></div>
  </div>
</template>

<script>
  import http from '../coins/http'
  export default {
    name: "",
    props: {
      title: {
        type: String,
        default: "zy"
      },
      url: {
        type: String,
        default: ""
      }
    },
    methods: {
      goBack(){
        this.$indicator.close();
        if(document.referrer.split('?')[0].split('/')[4]=="login"){
          history.go(-3);
        }else if(document.referrer.split('?')[0].split('/')[3]=="list-coins1.html"){
          history.go(-2);
        }else if(this.url!=""){
          history.go(-1);
        }else{
          history.go(-1);

        }
      }
    }
  }
</script>

<style scoped>
  .top-header{
    z-index: 30!important;
  }
</style>
