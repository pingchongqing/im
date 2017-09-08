<template>
  <div class="goodslist-02 pb-300" v-show="show" style="z-index: 3">
    <div style="height: .97rem;"></div>
    <div class="top-header border-bottom fixed-top">
      <div class="top-back">
        <a href="javascript:void(0)"
           @click="goOut"></a></div>
      <h2 class="f36 ">精准筛选</h2>
      <div class="top-right"></div>
    </div>
    <div v-for="(item, index) in list">
      <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">{{item.propertyName}}</div>
      <div class="screen-price bg-fff mb-20  border-bottom">
        <div class="price-list px-30 pt-30" v-if="item.type === TYPE.RANGE">
          <v-input
             @change="changeValue(item)"
             inputClass="price-input fl f30"
             inputType="tel"
             :inputPlaceholder="item.propertyName === '价格区间' ? '最低价' : '最低值'"
             v-model="item.minValue">
          </v-input>
          <span class="hern fl"></span>
          <v-input
             @change="changeValue(item)"
             inputClass="price-input fl f30"
             inputType="tel"
             :placeholder="item.propertyName === '价格区间' ? '最高价' : '最高值'"
             v-model="item.maxValue">
          </v-input>
        </div>
        <div class="price-type pl-30 pt-30">
          <ul>
            <li class="fl mb-30"
                :class="{state: itemSon.checked && item.type === TYPE.CHECK,
                active: itemSon.checked && (item.type === TYPE.RADIO || item.type === TYPE.RANGE)}"
                @click="clickItemNew(item, itemSon)"
                v-show="sonIndex < maxItemNum || showAll[index]"
                v-for="(itemSon, sonIndex) in item.listSon">
              <a href="javascript:void(0)">
                <span class="border f30">{{itemSon.propertyName}}</span>
              </a></li>
          </ul>
        </div>
        <div
           @click="showMore(index)"
           v-if="item.listSon.length > maxItemNum" class="prty-btn pb-30">
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
  import inputCom from '../common/input.vue'
  export default {
    components: {
      'v-input': inputCom
    },
    props: [
      'show', // 是否显示筛选
      'filter'
    ],
    data () {
      return {
        maxItemNum: 9,
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
      }
    },
    /*
     * 1. 选中后 隐藏值以及显示值改变
     * 2. 显示值改变后 选中框消失
     * 3. 退出时，按显示值为真值
     * */
    watch: {
      /* 进入筛选时置顶 */
      show (val, old) {
        if (val === true && old === false) {
          document.body.scrollTop = 0
        }
      }
    },
    methods: {
      /* 改变输入框的值 */
      changeValue (item, leave) {
        let itemSon = null
        item.listSon.map(v => {
          if (!leave && _compare(v, item)) {
            itemSon = v
          }
          if (leave && _compare(v, item, true)) {
            itemSon = v
          }
        })
        function _compare(v, item, leave) {
          if (leave) {
            return String(v.minValue) === String(item.maxValue) && String(v.maxValue) === String(item.minValue)
          } else {
            return String(v.maxValue) === String(item.maxValue) && String(v.minValue) === String(item.minValue)
          }
        }
        /* 如果没有选中则选中，选中那就不选了 */
        if (itemSon && !itemSon.checked) this.$emit('clickItem', {item, itemSon})
        else if (!itemSon) {
          this.$emit('clear', item)
        }
      },
      /* 显示更多 */
      showMore (index) {
        if (this.showAll[index]) {
          this.showAll[index] = false
        } else {
          this.$set(this.showAll, index, true)
        }
      },
      clickItemNew (item, itemSon) {
        this.$emit('clickItem', {item, itemSon})
      },
      /* 清除选择 */
      clear () {
        this.$emit('clear')
      },
      /* 退出 */
      goOut () {
        this.list.map(v => {
          /* 查看最大值和最小值是否正确，如果不正确去判断是否和选中框匹配，如果匹配则兑换值，不匹配在父组件中换值 */
          if (parseInt(v.maxValue) < parseInt(v.minValue)) {
            this.changeValue(v, true)
          }
        })

        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped>
  .price-type ul li span {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .turn {
    transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg); /* Safari and Chrome */
    -moz-transform: rotateX(180deg); /* Firefox */
  }
</style>
