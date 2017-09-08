<template>
  <!--弹框-->

  <div class="mask-content axm-mask bg-fff" style="margin-top: -2.6rem;">
    <slot></slot>
    <div class="mask-confirm text-center">
      <a @click="server_hide" class="sure f32" href="javascript:void(0)">朕知道了</a>
    </div>
  </div>


</template>
<script>
  export default{
    name: "DropDown",
    data(){
      return{

      }

    },
    methods: {
      server_hide:function(){
        this.$parent.dialog_cover = false
        this.$parent.dialog_server = false
      }
    }
  }
</script>
<style scoped>
.mask-content{
  z-index: 560!important;
}

</style>

