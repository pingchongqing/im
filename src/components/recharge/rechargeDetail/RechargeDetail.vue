<template>

  <div>
    <recharge-detail-component></recharge-detail-component>
  </div>

</template>

<script>
  import rechargeDetailComponent from"./RechargeDetailComponent.vue"
  export default {
    data() {
      return {
        /*
        * recharge_type[1:代充，2：首充，续充:3,]
        * platform_type[1:安卓, 2：苹果]
        */
      }
    },
    components: {
      rechargeDetailComponent
    },
    mounted() {
      this.$bus.emit('requireSpecialBack', true)
    },
    beforeDestroy() {
      this.$bus.emit('requireSpecialBack', false)
    }
  }
</script>
<style scoped>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}

</style>
