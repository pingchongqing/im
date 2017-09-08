<template>
  <div>
    <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <div
         ref="loadmore"
         :autoFill=false
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-immediate-check="test"
         infinite-scroll-distance="600"
      >
        <slot></slot>
        <slot name="noDataShow" v-if="true"></slot>
        <!-- !start（start===false） 第一次加载的时候显示 -->
        <!-- loading && !allLoading 加载中的时候显示 -->
        <div class="page-infinite-loading" >
          <p  v-show="(loading && !allLoading) || started === false">
            <mt-spinner  type="fading-circle"></mt-spinner>
            加载中...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: [
      'dataArr',  // 主数据列表
      'updateBottom', // 上拉加载
      'started', // false -> true 第一次完成  true -> false 关停
      'pageCount'
    ],
    data () {
      /**
       * 皆为内部状态，组件内部独立使用。
       */
      return {
        noDataShow: false, // 是否显示 slot.name = noDataShow 内的html
        loading: false, // true 不会触发， false 会触发
        allLoading: false, // 是否数据接收完毕
        wrapperHeight: 0,
        loadmoreDom: null
      }
    },
    watch: {
      started (val) {
//        console.log('infinite start val', val)
        if (!val) {
//          console.log('startEnd 初始', val)
          this.allLoading = false
          this.loading = false
        } else {
//          console.log('startEnd 标记第一次请求结束', val)
        }
      }
    },
    computed: {
      list () {
        return this.dataArr
      }
    },
    mounted () {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
      this.loadmoreDom = this.$refs.loadmore.$el
    },
    methods: {
      loadMore () {
        if (!this.started) return
        /* 第一次列表请求是在核心组件中执行， 需要防止二次无效请求, 如端游请求99999条数据，如果端游列表< 99999 则不再发送请求 */
        if (this.list && this.list.length < this.pageCount) {
          this.allLoading = true
          this.loading = true // 不再触发 loadMore
          return
        }
        if (this.list === null) {
          return
        }
        this.loading = true
        this.updateBottom().then((noData) => {
          if (noData) {
            if (this.list.length === 0) {
              this.noDataShow = true // 显示页面空白部分
            }
            this.allLoading = true
          } else {
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mint-loadmore-top {
    z-index: -100;
  }

  .mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .mint-loadmore {
    overflow: visible;
  }

</style>

<style>
  /*转动刷新 居中*/

  .page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }

  .page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }

</style>
