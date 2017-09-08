<template>
  <div>
    <router-view></router-view>
    <v-go-top></v-go-top>
  </div>
</template>

<script>
  import goTopComponent from 'components/common/GoTop.vue'
  export default {
    components: {
      'v-go-top': goTopComponent
    }
  }
</script>