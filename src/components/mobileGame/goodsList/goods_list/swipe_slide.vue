<template>
  <div class="imgs-srcoll" @scroll="scroll" ref="imgsScroll" >
    <div class="swiper-box" :style="{width: imgSize * imgs.length + 'px'}">
      <div
         class="swiper-item"
         v-for="(src, imgIndex) in imgs">
        <div @click.prevent="imgClick(imgIndex)">
          <img v-if="imgIndex < max" class="min-src" :src="imgIndex < max ? src : null" @load="imgLoaded($event)">
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['imgs', 'paddingLeft', 'item'],
    data () {
      return {
        scrollLeftVal: 0,
        startX: 0,
        max: Math.ceil((document.body.clientWidth - 15) / 140),
        maxNow: Math.ceil((document.body.clientWidth - 15) / 140),
        imgSize: 140
      }
    },
    mounted () {
    },
    methods: {
      imgLoaded (e) {
        e = e.target
        e.setAttribute('class', e.getAttribute('class') + ' loaded')
        e = e.parentNode
        e.setAttribute('class', e.getAttribute('class') + ' loaded')
      },
      imgClick (index) {
        this.$emit('anyImgClick', {index, item: this.item})
      },
      touchstart (e) {
        this.startX = e.changedTouches[0].pageX
      },
      touchmove (e) {
        return
        let pageX = e.changedTouches[0].pageX
        let direction = pageX > this.startX // 右滑ture, 左滑false
        if (direction && this.scrollLeftVal === 0) {
          e.preventDefault()
        } else if (!direction && this.scrollLeftVal === 0) {
        } else if (direction && this.scrollLeftVal >= (this.imgSize * this.imgs.length - document.body.clientWidth - 15)) {
        } else if (!direction && this.scrollLeftVal >= (this.imgSize * this.imgs.length - document.body.clientWidth - 15)) {
          e.preventDefault()
        }
        this.startX = e.changedTouches[0].pageX
      },
      scroll (e) {
        e.preventDefault()
        this.scrollLeftVal = this.$refs.imgsScroll.scrollLeft
        let num = Math.ceil((document.body.clientWidth - 15 + this.$refs.imgsScroll.scrollLeft) / this.imgSize)
        if (num > this.max) this.max = num
        return
      }
    }
  }
</script>

<style scoped>

  .swiper-box {
    /*width: 100%;*/
    /*height: 100%;*/
    height: 280px;
    /*margin: 0 auto;*/
  }

  .swiper-item {
    /*background-color: silver;*/
    position: relative;
    float: left;
    margin-right: 10px;
    line-height: 81px !important;
    width: 130px !important;
    height: 81px !important;
    /*text-align: center;*/
  }
  .swiper-item > div {
    background: url("~images/img-onload.png") center center no-repeat;
  }
  .swiper-item > div.loaded {
    background: none;
  }
  .min-src {
    vertical-align: unset;
    /*display: none;*/
    opacity: 0;
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -ms-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
    max-width: 100%;
  }

  .min-src.loaded {
    opacity: 1;
  }

  .imgs-srcoll {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
</style>
