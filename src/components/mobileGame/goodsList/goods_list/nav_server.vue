<template>
  <div class="seach-list" v-show="show">
    <div class="gmvst-profile ">
      <div class="gmvst-server fl">
        <ul>
          <!-- 平台 -->
          <li class="border-bottom"
              :class="{choice: checked[PLATFORM], curren: current === PLATFORM }"
              @click="clickLeft(PLATFORM)">
            <a href="javascript:void(0)">
              <span class="f30 color-000"> {{checked[PLATFORM] ? checked[PLATFORM].name : menuLeftName[PLATFORM]}}<i class="close"></i>
              </span></a></li>
          <!-- 客户端 -->
          <li class="border-bottom"
              :class="{choice: checked[CLIENT], curren: current === CLIENT }"
              @click="clickLeft(CLIENT)">
            <a href="javascript:void(0)">
              <span class="f30 color-000">{{checked[CLIENT] && checked[CLIENT].id !== outId ? checked[CLIENT].name : menuLeftName[CLIENT]}}<i class="close"></i>
              </span></a></li>
          <!-- 服务器 -->
          <li class="border-bottom"
              :class="{choice: checked[SERVER], curren: current === SERVER }"
              @click="clickLeft(SERVER)">
            <a href="javascript:void(0)">
            <span class="f30 color-000">{{checked[SERVER] && checked[SERVER].id !== outId ? checked[SERVER].name : menuLeftName[SERVER]}}<i class="close"></i>
            </span></a></li>
        </ul>
      </div>
      <div class="gmvst-area bg-fff">
        <div class="gmvst-server" v-if="showInput">
          <div class="gvst-seach mx-30 my-20 border py-15 px-20">
            <input class="server-input" name="" type="text" v-model.trim="inputFilter"
                   placeholder="请输入服务器名称"></div>
        </div>
        <!-- 平台 -->
        <ul class="pl-30" :class="{'top0': platformLen < 20}" v-show="current === PLATFORM">
          <li class="border-bottom"
              @click="clickItem(PLATFORM, item)"
              :class="{active: item === checked[PLATFORM]}"
              v-for="item in platforms">
            <span class="f30 color-000" v-text="item.name"></span>
          </li>
        </ul>
        <!-- 客户端 -->
        <ul class="pl-30" :class="{'top0': clientLen < 20}" v-show="current === CLIENT">
          <li class="border-bottom"
              @click="clickItem(CLIENT, item)"
              :class="{active: item === checked[CLIENT]}"
              v-for="item in clients">
            <span class="f30 color-000" v-text="item.name"></span></li>
        </ul>
        <!-- 服务器 -->
        <ul class="pl-30" :class="{'top0': serverLen< 20}" v-show="current === SERVER">
          <li class="border-bottom"
              @click="clickItem(SERVER, item)"
              :class="{active: item === checked[SERVER]}"
              v-for="item in servers">
            <span class="f30 color-000" v-text="item.name"></span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['show', 'server'],
    data () {
      return {
        inputFilter: ''
      }
    },
    computed: {
      TYPE () { return this.server.TYPE },
      /**
       * @returns {string}
       */
      PLATFORM () { return this.server.TYPE._PLATFORM },
      /**
       * @returns {string}
       */
      CLIENT () { return this.server.TYPE._CLIENT },
      /**
       * @returns {string}
       */
      SERVER () { return this.server.TYPE._SERVER },
      list () { return this.server.list },
      checked () { return this.server.checked },
      menuLeftName () { return this.server.menuLeftName },
      menuLeftNameDefault () { return this.server.menuLeftNameDefault },
      outId () { return this.server.outId },
      showInput () {
        let t = {
          platform: this.platformLen,
          client: this.clientLen,
          server: this.serverLen
        }
        return t[this.current] > 19
      },
      platformLen () { return this.list.platform.length },
      clientLen () { return this.list.client.length },
      serverLen () { return this.list.server.length },
      platforms () {
        return this.list.platform.filter(item => {
          return item.name.toLowerCase().indexOf(this.inputFilter.toLowerCase()) !== -1;
        })
      },
      clients () {
        return this.list.client.filter(item => {
          return item.name.toLowerCase().indexOf(this.inputFilter.toLowerCase()) !== -1;
        })
      },
      servers () {
        return this.list.server.filter(item => {
          return item.name.toLowerCase().indexOf(this.inputFilter.toLowerCase()) !== -1;
        })
      },
      current () {
        let checked = this.checked
        let TYPE = this.TYPE
        if (checked.server) {
          return TYPE._SERVER
        } else if (checked.client && checked.client.id === this.outId) {
          return TYPE._CLIENT
        } else if (checked.client) {
          return TYPE._SERVER
        } else if (checked.platform) {
          return TYPE._CLIENT
        } else {
          return TYPE._PLATFORM
        }
      }
    },
    watch: {
      /* 如果没有选中右侧列表的任何一项，则退出时自动选中`不限`，平台除外 */
      show (val) {
        if (!val) {
          if (this.checked[this.current] === null && this.current !== this.PLATFORM) {
            this.clickItem(this.current, this.list[this.current][0])
          }
        }
      },
      current () {
        this.inputFilter = ''
      }
    },
    methods: {
      /* 点击左侧菜单 */
      clickLeft (type) {
        // 当前的和点击的菜单不是同一个，同时点击的菜单并没有东西选中
        if (this.current !== type && this.checked[type] === null) {
          let message
          switch (this.current) {
            case this.PLATFORM:
              message = '请先选择平台'
              break
            case this.CLIENT:
              message = `请先选择客户端`
              break
          }
          this.$toast({message, duration: 3000})
        } else {
          this.$emit('clickLeft', type)
        }
      },
      /* 点击右侧列表 */
      clickItem (type, item) {
        this.$emit('clickItem', {type, item})
      }
    }
  }
</script>

<style scoped>
  .gmvst-server ul li {
    position: relative;
  }
  .gmvst-server ul li.curren:after {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    right: -3px;
    z-index: 9;
    width: 4px;
    padding-bottom: 1px;
    background: #fff;
    box-sizing: content-box;
  }
  .gmvst-server ul li.choice:after {
    width: 0;
    height: 0;
  }
  .top0 {
    margin-top: 0!important;
  }
</style>
