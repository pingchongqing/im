<template>
  <div id="wrapper">
    <!---------------------------- top ---------------------------->
    <div class="top-header fixed-top border-bottom">
      <div class="top-back">
        <a href="/vue/buyerCenter/buyerCenterMain"></a>
      </div>
      <h2 class="f36 ">商城订单</h2>
      <div class="top-right">
        <a class="back-home" href="/index.html"></a>
      </div>
    </div>
    <!---------------------------- tab3 ---------------------------->
    <div class="bg-fff clearfix tab3">
      <!--<ul class="clearfix ">-->
        <!--<li class="fl text-center">-->
          <!--<a class="f32 color-000" href="/member/member-buyer.html">手机端的商品</a>-->
        <!--</li>-->
        <!--<li class="fl text-center" @click="pc_isclick" id="pc">-->
          <!--&lt;!&ndash;<li class="fl text-center">&ndash;&gt;-->
          <!--<router-link class="f32 color-000" :to="{name:'PcGoods',params:{state:'pcstate'}}">-->
            <!--电脑端的商品-->
          <!--</router-link>-->
          <!--&lt;!&ndash;<a class="f32 color-000" href="/pc/member-buyer-pc.html">电脑端的商品</a>&ndash;&gt;-->
        <!--</li>-->
        <!--<li class="fl text-center" @click="pc_click" id="st">-->
          <!--&lt;!&ndash;<li class="fl text-center">&ndash;&gt;-->
          <!--<router-link class="f32 color-000" :to="{name:'sStoreGoods',params:{state:'state'}}">-->
            <!--商城商品-->
          <!--</router-link>-->
          <!--&lt;!&ndash;<a class="f32 color-000 on" href="javascript:void(0);">商城商品</a>&ndash;&gt;-->
        <!--</li>-->
      <!--</ul>-->
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    name: 'memberBuyer',
    data(){
      return{
        pcstate:"paying",
        state:"paying"
      }
    },
  }
</script>
<style scoped>
  /*.clearfix .active{*/
  /*border-bottom: 2px solid #f75e46;*/
  /*}*/
  /*.router-link-active{*/
  /*border-bottom: 2px solid #f75e46;*/
  /*}*/
  .top-right a {
    padding-right: 0.3rem;
    height: 100%;
  }
</style>
