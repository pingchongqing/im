<template>
  <div class="rechdtl-caption border-bottom mb-20 px-30 bg-fff">
      <div class="capt-title f32 color-000">
        {{publishEO.denomination}}{{publishEO.unitName}}={{publishEO.rechargePrice}}元 {{publishEO.title}}</div>
        <div class="capt-money f34 " style="display: inline-block; white-space: nowrap">
          <span class="color-m1 fl">￥<i>{{publishEO.rechargePrice}}</i></span>
          <span class="pl-30 f26 fl"  >原价:<em class="ml-10" >￥<del>{{publishEO.originalPrice}}</del></em></span>
        </div>
      <div class="capt-discount" v-if="publishEO.discount && publishEO.discount<10 && publishEO.discount>0">
        <div class="discount-conn">
          <span class="ct-folded f26 color-fff"><em class="f28">{{publishEO.discount}}</em>折</span>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  props:['publishEO']
}
</script>
<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
