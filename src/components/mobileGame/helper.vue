<template>
  <div>
    <button type="button" @click="open">本地强制打开活动页</button>
    <button type="button" @click="close">关闭强制</button>
    是否启动强制：{{isOpen}}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isOpen: false
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.isOpen = !!localStorage.getItem('OpenTheDoor')
      },
      open () {
        localStorage.setItem('OpenTheDoor', '123')
        this.init()
      },
      close () {
        localStorage.removeItem('OpenTheDoor')
        this.init()
      }
    }
  }
</script>
<style scoped>
  button {
    padding: 5px 8px;
    background-color: #59ee49;
  }
</style>
