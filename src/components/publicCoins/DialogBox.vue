<template>
  <!--弹出框-->
  <div class="dialog-box bg-fff" id="dialog_show2" @click="dialogBox_hide">
    <div class="dialog-main">
      <div class="dialog-body" id="errortx">{{title}}</div>
      <div class="dialog-foot">
        <a class="dialog_close " href="javascript:void(0);" id="Ise">朕知道了</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DropDown",
    props: ['xianshi', 'title'],
    data () {
      return {}
    },
    methods: {
      dialogBox_hide: function () {
        if (this.title == '价格已更新，请重新下单！') {
          location.href = '/'
        }else if(this.title == '九宫格页面显示金额为估算值 请以实际支付金额为准。'){
          this.$parent.dialog_cover = false;
          this.$parent.dialog_box = false;
        }else if(this.title == "客服繁忙，请稍后再试"){
          this.$parent.dialog_cover = false;
          this.$parent.dialog_box = false;
        }else if(this.title == "抱歉，手慢一步，该宝贝所剩无几了"){
          this.$parent.dialog_cover = false;
          this.$parent.dialog_box = false;
          history.go(0)
        }else {
          this.$parent.dialog_cover = false;
          this.$parent.dialog_box = false;
          if(document.referrer.split('?')[0].split('/')[4]=="login"){
            history.go(-3);
          }else {
            history.go(-1);
          }
        }
      }
    },
    created: function () {

    }
  }
</script>

<style>

</style>
