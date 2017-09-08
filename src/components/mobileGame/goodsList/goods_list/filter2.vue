<template>
  <div class="goodslist-02 pb-300" v-show="show" style="z-index: 3">
    <div class="top-header border-bottom fixed-top">
      <div class="top-back">
        <a href="javascript:void(0)"
           @click="goOut"></a></div>
      <h2 class="f36 ">精准筛选</h2>
      <div class="top-right"></div>
    </div>
    <div class="screen-titl border-bottom px-30 color-000 f32 mt-97 bg-fff">价格范围</div>
    <div class="screen-price bg-fff mb-20 border-bottom">
      <div class="price-list px-30 py-30">
        <input class="price-input fl f30" name="" type="tel" placeholder="最低价"
               v-model.trim="minv">
        <span class="hern fl"></span>
        <input class="price-input fl f30" name="" type="tel" placeholder="最高价"
               v-model.trim="maxv">
      </div>
      <!-- 价格类型列表 -->
      <div class="price-type pl-30">
        <ul>
          <li class="fl mb-30"
              v-for="(item, index) in prices"
              @click="priceClick(item, index);clickItem(TYPE.PRICES, item, index)"
              :class="{active: item.radio === index && priceCheck}">
            <a href="javascript:void(0)">
              <span class="border f30" v-text="item.name"></span>
            </a></li>
        </ul>
      </div>
    </div>
    <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">保障服务</div>
    <div class="screen-price bg-fff mb-20  border-bottom">
      <!-- 保障服务列表 -->
      <div class="price-type pl-30 pt-30">
        <ul>
          <li class="fl mb-30"
              v-for="(item, index) in services"
              @click="clickItem(TYPE.SERVICES, item, index)"
              :class="{state: item.checked}">
            <a href="javascript:void(0)">
              <span class="border f30" v-text="item.name"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-for="(item, index) in list">
      <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">{{item.propertyName}}</div>
      <div class="screen-price bg-fff mb-20  border-bottom">
        <div class="price-type pl-30 pt-30">
          <ul>
            <!--<li class="fl mb-30 state"><a href="javascript:void(0)"><span class="border f30">未绑定身份证</span></a></li>-->
            <!--<li class="fl mb-30"><a href="javascript:void(0)"><span class="border f30">未绑定手机号</span></a></li>-->
            <li class="fl mb-30"
                :class="{state: itemSon.checked}"
                @click="clickItemNew(item, itemSon)"
                v-show="sonIndex < maxItemNum || showAll[index]"
                v-for="(itemSon, sonIndex) in item.subEOList">
              <a href="javascript:void(0)">
                <span class="border f30">{{itemSon.propertyName}}</span>
              </a></li>
          </ul>
        </div>
        <div
           @click="showMore(index)"
           v-if="item.subEOList.length > maxItemNum" class="prty-btn pb-30">
          <a :class="{turn: showAll[index]}"
             class="prty-more" href="javascript:void(0)"></a>
        </div>
      </div>
    </div>
    <div class="fixed-bottom border-top">
      <div class="goodslist-btn px-30 py-30 bg-fff">
        <a class="options f32 color-666 fl text-center" href="javascript:void(0)"
           @click="clear">清除选项</a>
        <a class="purchase f32 bg-f54 color-fff fr text-center" href="javascript:void(0)"
           @click="goOut">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'show', // 是否显示筛选
      'filter'
    ],
    data () {
      return {
        maxItemNum: 6,
        showAll: {}, // 是否显示多出的选项
        minv: '',
        maxv: ''
      }
    },
    computed: {
      list () {
        return this.filter.list
      },
      TYPE () {
        return this.filter.TYPE
      },
      minValue () {
        return this.filter.price.minValue
      },
      maxValue () {
        return this.filter.price.maxValue
      },
      prices () {
        return this.filter.price.list
      },
      services () {
        return this.filter.service.list
      },
      priceCheck () {
        let t = this.prices.some((v, index) => {
          let min = v.min || ''
          let max = v.max || ''
          if (min == this.minv && max == this.maxv) {
            this.$emit('clickItem', {type: this.TYPE.PRICES, item: v, index})
          }
          return min == this.minv && max == this.maxv
        })
        return t
      }
    },
    /*
     * 1. 选中后 隐藏值以及显示值改变
     * 2. 显示值改变后 选中框消失
     * 3. 退出时，按显示值为真值
     * */
    watch: {
      minv (val, old) {
        if (typeof val === 'object' && val !== null) {
          this.minv = val.v || ''
        } else if ((parseInt(val)).toString().length !== val.toString().length && val.toString().length !== 0) { // 异样字符
          this.minv = old
        } else {

        }
      },
      maxv (val, old) {
        if (typeof val === 'object' && val !== null) {
          this.maxv = val.v || ''
        } else if ((parseInt(val)).toString().length !== val.toString().length && val.toString().length !== 0) { // 异样字符
          this.maxv = old
        } else {

        }
      },
      show (val, old) {
        if (val === true && old === false) {
          document.body.scrollTop = 0
        }
      }
    },

    methods: {
      /* 显示更多 */
      showMore (index) {
        if (this.showAll[index]) {
          this.showAll[index] = false
        } else {
          this.$set(this.showAll, index, true)
        }
      },
      /* 价格框点击 */
      priceClick (item, index) {
        this.maxv = {v: item.max}
        this.minv = {v: item.min}
      },
      clickItemNew (item, itemSon) {
        this.$emit('clickItemNew', {item, itemSon})
      },
      /* 选中任何一项 */
      clickItem (type, item, index) {
        this.$emit('clickItem', {type, item, index})
      },
      /* 清除选择 */
      clear () {
        this.minv = ''
        this.maxv = ''
        this.$emit('clear')
      },
      /* 退出 */
      goOut () {
        let min = parseInt(this.minv) ? parseInt(this.minv) : 0
        let max = parseInt(this.maxv) ? parseInt(this.maxv) : 9999999
        if (max - min < 0) {
          let t = this.minv
          this.minv = this.maxv
          this.maxv = t
        }
        this.$emit('comfirm', {min: this.minv, max: this.maxv})
      }
    }
  }
</script>

<style scoped>
  .turn {
    transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg); /* Safari and Chrome */
    -moz-transform: rotateX(180deg); /* Firefox */
  }
</style>
