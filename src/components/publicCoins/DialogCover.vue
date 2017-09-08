<template>
    <!---------------------------- 遮料层 ---------------------------->
    <div class="dialog_cover" @click="dialogBox_hide"></div>
</template>

<script>
export default {
    name:"DropDown",
    props: ['xianshi'],
    data () {
      return {
        
      }
    },
    methods:{
      dialogBox_hide:function(){
        	this.$parent.dialog_cover = false;
        	this.$parent.dialog_box = false;
        	this.$parent.dialog_server = false;
          this.$parent.hint_box = false;
          this.$parent.tishi_box = false;
          this.$parent.hint_server = false;
        }

    },
    created:function(){
     
    }
}
</script>

<style>

</style>
