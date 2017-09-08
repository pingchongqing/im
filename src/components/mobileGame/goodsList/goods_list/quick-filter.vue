<template>
  <div v-if="show">
    <div class="gmnav-pkoten" style="display: block;">
      <!-- 菜单列表 -->
      <div class="gmnav-type pl-30 border-bottom">
        <!--
          1. 菜单选中  div.active
          2. 菜单下拉子菜单 div.status span.dern-plc
          3. 有下拉菜单有向下的箭头，如果有选中则无 div.have-box-default
         -->
        <div class="typedern"
             v-for="(item, index) in quickFilterList"
             @click="clickItem(item)"
             :class="{active: isCheckMenu[index] && ((item !== currentItem && showBox) || !showBox),
             'have-box-default': !isCheckMenu[index] && item.listSon && ((item !== currentItem && showBox) || !showBox),
             status: showBox && item.listSon && item === currentItem}">
          <a href="javascript:void(0)">
            <span class="ellipsis" :class="{'dern-plc': showBox && item.listSon && item === currentItem} ">
              {{showBox && currentItem === item ? item.propertyName : menuName[index]}}
            </span>
          </a>
        </div>
      </div>
      <!-- 下拉框 -->
      <div class="gvtyden-con" v-if="showBox">
        <ul class="list-son">
          <li
             @click="clickItem(item, true)"
             :class="{current: item.checked}"
             v-for="item in currentListSon">
            <span class="f30">{{item.propertyName}}</span>
          </li>
        </ul>
        <div class="gvtyden-btn mt-30">
          <div class="goodslist-btn  bg-fff">
            <a class="btn-options f32 color-666 fl text-center"
               @click="clear"
               href="javascript:void(0)">重置</a>
            <a class="btn-purchase f32 bg-f54 color-fff fr text-center"
               @click="confirm"
               href="javascript:void(0)">确定</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list', 'showBox'],
    data () {
      return {
        currentItem: null,
        currentListSon: [] // 当前子列表
      }
    },
    computed: {
      /* 从筛选中提取出服务保障 */
      serverList () {
        return this.list.filter(v => v.server)[0]
      },
      /* 配置快捷筛选列表，只取前四个 */
      quickFilterList () {
        let ret = []
        this.list.map(v => {
          if (v.isQuickFilter && ret.length < 4) {
            if (v.server) {
              v.listSon.map(val => {
                if (val.isQuickFilter) {
                  ret.push(val)
                }
              })
            } else {
              ret.push(v)
            }
          }
        })
        return ret.sort((v, n) => {
          return n.quickFilterSort - v.quickFilterSort
        })
      },
      /* 计算每个菜单名是否显示红框 */
      isCheckMenu () {
        let ret = []
        this.quickFilterList.map(v => {
          if (v.server) { // 保障服务
//            v.listSon.every()
            ret.push(v.checked)
          } else { // 非保障服务
            ret.push(v.listSon.some(val => val.checked))
          }
        })
        return ret
      },
      /* 计算每个快捷筛选对应的菜单名 */
      menuName () {
        let ret = []
        this.quickFilterList.map(v => {
          if (v.server) { // 保障服务
//            v.listSon.every()
            ret.push(v.propertyName)
          } else { // 非保障服务
            if (v.listSon.some(v => v.checked)) {
              let names = []
              v.listSon.map(val => {
                if (val.checked) names.push(val.propertyName)
              })
              if (names.length > 1) ret.push(names.join('、'))
              else ret.push(names[0])
            } else {
              ret.push(v.propertyName)
            }
          }
        })
        return ret
      },
      /* 计算是否需要显示快捷筛选 */
      show () {
        return this.quickFilterList && this.quickFilterList.length > 0
      }
    },
    methods: {
      clear () {
        this.$emit('quickFilterClear', this.currentItem)
      },
      confirm () {
        this.$emit('quickFilterConfirm')
      },
      /* 触发点击事件 1. 点击菜单名 2. 点击子列表 */
      clickItem (item, isListSon) {
        /* 点击菜单子项 */
        if (isListSon) {
          this.$emit('clickItem', {item: this.currentItem, itemSon: item, isListSon})
          return
        }
        /* 点击菜单项 */
        if (item.server) { // 服务保障
          this.$emit('clickItem', {item: this.serverList, itemSon: item})
        } else { // 非服务保障
          let isCurrent = false
          if (this.currentItem !== item) { // 当前点击了其它有列表的菜单
            this.currentListSon = item.listSon
            this.currentItem = item
            this.$emit('clickItem', {item: item, isCurrent})
          } else { // 点击了当前的菜单
            isCurrent = true
            this.$emit('clickItem', {item: item, isCurrent})
          }
        }
      }
    }
  }
</script>

<style scoped>
  ul.list-son {
    max-height: 8rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  span.ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  div.status span.ellipsis, div.have-box-default span.ellipsis{
    width: auto
  }

  .gvtyden-con {
    top: 1.01rem
  }

  .gmnav-type .status{border: 1px solid #e8e8e8;}
  div.status {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .have-box-default span {
    display: inline-block;
    background: url(~images/Icon/typedern-ico.png) no-repeat right center;
    height: 0.6rem;
    padding-right: 0.25rem;
    background-size: 0.15rem;
  }

</style>
