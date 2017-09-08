<template>
<div>
  <div class="more_message border f36" v-show="moreStatus">
  <ul>
    <li class="list-more border-bottom"  @click="messageClick"><i class="android"></i>消息</li>
    <li class="list-more border-bottom shareopen" @click="shareClick" v-show="sshow"><i class="sharew"></i>分享</li>
    <li class="list-more" @click="homeClick"><i class="home_back"></i>首页</li>
  </ul>
</div>
  <div class="mstfiv" style="z-index:45" v-show="moreStatus" @click="mstfivClick"></div>
  <share v-show="shareStatus" :shareUrl='sharemsg'></share>
</div>
</template>
<script>

import share from '../common/NewShare.vue'
export default {
  data() {
    return {
      moreStatus: false,
      sharemsg:'',
      sshow:false,
      shareStatus: false,
    }
  },
  components: {
    share
  },
  mounted: function mounted() {
    this.sharemsg = location.href
    this.$bus.on('moreStatus', s => {
      this.moreStatus = s
    })
    this.$bus.on('sshow',val =>{
      this.sshow = val;
    })
  },
  methods: {
    mstfivClick() {
      this.moreStatus = false
      this.$bus.emit('headMoreStatus', this.moreStatus)
    },
    homeClick() {
      location.href = '/'
    },
    messageClick() {
      location.href = '/vue/message'
    },
    shareClick() {
      this.shareStatus = true
      this.moreStatus = false
      this.$bus.emit('shareShow', this.shareStatus)
      this.$bus.emit('busShareUrl', window.location.href)
    },
  }
}
</script>
<style scoped>
.more_message{
  display: block;
  height: auto;
  z-index: 100;
}
.mstfiv{position: fixed;left: 0;top: 0;right: 0;bottom: 0;background: #000;filter: alpha(opacity=50);opacity: .5;}
</style>
