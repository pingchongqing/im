<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp vux-previewer" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe.
           It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>
      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <!-- Container that holds slides.
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
          Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  Controls are self-explanatory. Order can be changed. -->
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import UI from 'photoswipe/dist/photoswipe-ui-default'
import objectAssign from 'object-assign'

export default {
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  methods: {
    init (index) {
      let options = objectAssign({
        history: false,
        shareEl: false,
        tapToClose: true,
        index: index
      }, this.options)
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.list, options)
      this.photoswipe.init()
    },
    show (index) {
      this.init(index)
    },
    close () {
      this.photoswipe.close()
    }
  },
  watch: {
    list(val) {
      if (val.length>0) {
        val.forEach(elem => {
          var pw = new Image()
          if (elem.bigPicUrl) {
            pw.src = elem.bigPicUrl
            elem.src = elem.bigPicUrl
          } else {
            pw.src = elem.sImgUrl
            elem.src = elem.sImgUrl
          }
          elem.w = pw.width?pw.width:window.innerWidth
          elem.h = window.innerHeight
        });
      }
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';
.pswp__zoom-wrap {
  position: static !important;
  display: table-cell !important;
  vertical-align: middle;
  text-align: center !important;
  line-height: 100%;
  height: 100%;
  width: 100%;
  height: 100vh;
  width: 100vw;
}
.pswp__img {
  max-width: 100% !important;
  height: auto !important;
  width: auto !important;
  position: static !important;
  display: inline !important;
}

</style>
