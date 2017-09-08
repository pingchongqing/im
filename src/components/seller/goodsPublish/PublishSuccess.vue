<template>
    <div id="wrapper">

      <div class="top-header border-bottom fixed-top">
        <div class="top-back">
            <a href="javascript:history.go(-1)" class="goBack">返回</a>
        </div>
          <h2 class="f36 color-000">商品发布成功</h2>
      </div>
<div class="order-container text-center  bg-fff  mx-30 mt-120">
    <p class="f36 mb-30 mt-30 lh-14" v-if="goodsEO.propertyValuesTitle||goodsEO.title">{{goodsEO.propertyValuesTitle||goodsEO.title}}</p>
<p class="f28 mb-30 mt-30 color-666" v-if="goodsEO.totalAmount">商品价格：{{goodsEO.totalAmount}}元</p>
    <p class="f36 mb-30 mt-30 color-m1"><span class="tiem">提交成功！</span></p>
<p class="f28  mt-30 color-666"> 商品会在2小时内完成审核 </p>
<p class="f28  mt-30 color-m1" v-if="from"> 请到<a class="color-m1" style="padding:0 2px;">m.5173.com</a>查看您发布的商品 </p>
    <div class="mt-80 success-continue">
        <!--注意两个a标签在一行-->
        <a class="bg-fff f38 color-000 bord-999" href="/vue/sell-home/2">继续发布</a><a class="bg-m1 f38 color-fff" @click="goMemberList()">查看商品</a>
    </div>
  <p class="f32 mb-30 mt-30 color-07f"><router-link :to="{name:'PublishProcess'} "  class="color-07f">交易流程</router-link></p>
</div>
<div class="success-box p-30 mt-20 bg-fff">
            <p class="f30 mt-20 color-666">其他说明</p>
            <p class="f28 mt-20 color-666 lh-44"><span class="fontbold">1</span>、您可以在<span class="color-m1">个人中心</span>&gt; <span class="color-m1">我是卖家</span> &gt; <span class="color-m1">手机端发布的商品</span>查看审核结果。</p>
            <p class="f28 mt-10 color-666 lh-44"><span class="fontbold">2</span>、交易前请第一时间登录5173查看您的订单，没有订单都是骗子！</p>
            <p class="f28 mt-10 mb-20 color-666 lh-44"><span class="fontbold">3</span>、任何以“兼职”，“刷信誉”，“做任务”，“缴纳保证金”为借口的均为诈骗行为，谨防上当！</p>

</div>



        <share v-show="shareStatus" :shareUrl="this.shareUrl"></share>
        <div class="mstfiv" style="z-index:45" v-show="moreStatus" @click="mstfivClick"></div>
    </div>
</template>
<script >
    import share from '../../common/NewShare.vue'

    export default{
        data(){
            return{
                s:false,
                //请求参数
                moreStatus: false,
                shareStatus: false,
                goodsId:this.$route.query.goodsId,
                shareUrl:"",
                goodsType:this.$route.query.goodsType,
                goodsEO: {},
                from:"",
            }
        },
        created: function created() {
          this.$bus.emit('headerText','商品发布成功');

        },
        mounted(){
          this.$bus.emit('headerText','商品发布成功');
            this. getOrderState();
            this.from5173();
        },
        components: {
            share
        },
        methods: {
          from5173(){
            var self = this;
            if(self.goodsId && self.goodsId.substring(0,3)=="MZH"){
              if(self.$getCookie("from5173")=="true"){
                self.from = true;
              }else{
                  self.from = false;
              }
            }

          },
          mstfivClick() {
            this.moreStatus = false
          },
            liuchengshow(){
        this.s=true;
            },
           getOrderState:function () {
             this.$http.get(this.$CONSTANTS.APIGoods + 'goods/selectgoodsdetail', {params:{goodsId:this.$route.query.goodsId}}).then(
               res => {
                 console.log(res);
                 if (res.body.success) {
                   this.goodsEO = res.body.goodsEO
                 }
               },
               err => {
                 console.log(err);
               }
             )
           },
            homeClick() {
                location.href = '/'
            },
            messageClick() {
                location.href = '/member/message.html'
            },
            shareClick() {
                this.moreStatus = false
                this.shareStatus = true
                this.$bus.emit('shareShow', this.shareStatus)
                this.$bus.emit('busShareQZone',{
                    title: '游戏帐号-m.5173.com',
                    url: "http://mn.5173.cn/vue/account/accountDetail/"+this.goodsId+"/0"
                })
                this.shareUrl = "http://mn.5173.cn/vue/account/accountDetail/"+this.goodsId+"/0"
            },
            moreClick() {
                this.moreStatus = !this.moreStatus;
            },
            goMemberList(){
                let vm = this;
                vm.$router.push({
                    name:'SellerGoodsListOfMobile',query:{status:vm.goodsType != 3 ? 0 : 1,operator:1}
                })
            }
        }
    }


</script>
<style src="css/common/publish-cl.css" scoped></style>
<style src="css/common/list-cl.css" scoped></style>
<style type="text/css" scoped>
.tinfo {
  text-align: left;
  text-indent: 2em;
}
  .show-right {
    position: absolute;
    z-index: 63 !important;
    top: 0;
    right: 0;
    min-width: 10%;
    font-size: 0;
    height: .96rem;
    line-height: .96rem;
    -webkit-text-size-adjust: none;
    text-align: right
  }

    .more_message {
        display: block;
        position: absolute;
    }
    .more_message:before{
        content: "";
        height: 15px;
        width: 15px;
        background: #fff;
        display: block;
        position: absolute;
        top: -7.5px;
        right: 9px;
        border-width: 1px;
        border-style: solid;
        border-color: #e8e8e8 #fff #fff #e8e8e8;
        transform: rotate(45deg);
        -webkit-transform:rotate(45deg) ;
        -moz-transform: rotate(45deg);
        -ms-transform:rotate(45deg) ;
        -o-transform: rotate(45deg);
    }
    .more_message .list-more{
        text-align:left;
        color: #000;
    }
    .more_message .list-more i {
        float: left;
        color: #606060;
        line-height: .96rem;
        text-align: center;
        padding-right: .1rem;
        margin-left: .3rem;
    }
    .mstfiv {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #000;
      filter: alpha(opacity=50);
      opacity: .5;
  }
</style>
