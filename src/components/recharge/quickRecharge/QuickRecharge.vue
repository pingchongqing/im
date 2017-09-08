<template>
<transition name="slide-fade">
  <div>
    <quick-recharge-component></quick-recharge-component>
  </div>
</transition>
</template>

<script>
  import QuickRechargeComponent from"./QuickRechargeComponent.vue"
  export default {
    components: {
      QuickRechargeComponent
    },
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
