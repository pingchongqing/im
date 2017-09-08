<template>
    <div id="wrapper" class="pb-150">
    <!--顶部fixed部分-->
    <div class="bg-m1 mt-97 f32 color-fff order_top_tip"
    v-if="pcDetail.OrderStatus === 1 || pcDetail.OrderStatus === 2 || pcDetail.OrderStatus === 3
     || pcDetail.OrderStatus === 4">
        <p class="line-40">
         <span class="icon_wait">交易中</span>
         </p>
    </div>

    <div class="bg-2a mt-97 f32 color-fff order_top_tip" v-if="pcDetail.OrderStatus === 5">
        <span class="icon_firm">交易成功</span>
    </div>
    <div class="bg-999 mt-97 f32 color-fff order_top_tip" v-if="pcDetail.OrderStatus === 6 || pcDetail.OrderStatus === 7 || pcDetail.OrderStatus === 8">
        <span class="icon_fail">交易取消
             <em class="f28 ml-20"> 取消原因：{{pcDetail.CancelRemark}}</em>
        </span>
    </div>

    <div class="detail_container bg-fff clearfix">
        <img class="game_logo fl" :src="pcDetail.Images[0].OriginalUrl" v-if="pcDetail.Images">
        <div>
            <p class="f30 color-000">{{pcDetail.GoodsName}}</p>
            <p class="f30 mt-20 color-000">￥{{pcDetail.Price}}</p>
        </div>
    </div>
    <div class="detail_container bg-fff mt-20 border-bottom">
        <p class="f30 mb-30">
            <span class="color-666 pr-30">游戏区服</span>
            <span class="color-000">{{pcDetail.AreaName}}</span>
        </p>
        <p class="f30"><span class="color-666 pr-30">商品类型</span><span class="color-000">
        {{pcDetail.GoodsType|getGoodsTypeText}}</span></p>
    </div>

    <div class="detail_container bg-fff">
        <p class="f30 mb-30"><span class="color-666 pr-30">订单编号</span><span class="color-666">{{pcDetail.OrderId}}</span>
        <a class="copy ml-20 color-666 f24" id="copy" :data-clipboard-text="pcDetail.OrderId" @click="copy()">复制</a></p>
        <p class="f30"><span class="color-666 pr-30">下单时间</span>
            <span class="color-666">{{pcDetail.CreatedDate}}</span>
        </p>
    </div>

    <div class="detail_container bg-fff mt-20 border-bottom">
        <p class="f30 mb-30">
            <span class="color-666 pr-30">商品价格</span>
            <span class="color-666 fr">￥{{pcDetail.Price}}</span>
        </p>
        <p class="f30 mb-30">
            <span class="color-666 pr-30">佣金</span>
            <span class="color-666 fr">-￥{{pcDetail.SubCommission}}</span>
        </p>
        <!-- <p class="f30 mb-30">
            <span class="color-666 pr-30">交易服务费</span>
            <span class="color-666 fr">-￥{{pcDetail.commission}}</span>
        </p> -->
    </div>
    <div class="total_container bg-fff border-bottom">
        <p class="f30 mb-30">
            <span class="color-m1 fr ml-30">￥{{Profit}}</span>
            <span class="color-666 fr">实际收益</span>
        </p>
    </div>

    <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top">
        <a class="f30 color-m1 border border-color cancel fr" @click="contactCustom(pcDetail.CustomServiceQQ)">联系客服</a>
        <i class="titcur fr" @click="whyClick(pcDetail.CustomServiceQQ)"></i>
    </div>
</div>
</template>
<script >
    import { mapState, mapGetters, mapActions } from 'vuex';
    import api from '../../../../api';
    import Clipboard from 'clipboard'
    export default{
        data(){
            return{
                orderId:this.$route.query.orderId,
            }
        },
        created(){
            let vm = this;
            vm.$bus.emit('headerText','订单详情');
            vm.getDetail({orderId:vm.orderId});
        },
        computed:{
            ...mapState({
                pcDetail:state =>{
                    return state.orderMange.pcDetail;
                }
            }),
            Profit:function  () {
                return this.pcDetail.SellerIncome;
            }
        },
        mounted:function(){
            let vm = this;
            vm.$bus.emit('isBack',true);
        },
        methods:{
            ...mapActions({
                getDetail:'member/MEMBER_SELLER_ORDER_PC_DETAIL'
            }),
            copy(){
                 var clipboard = new Clipboard('#copy');
                clipboard.on('success', e => {
                  this.$toast('复制成功')
                  this.shareShow = false
                  e.clearSelection();
                });
                clipboard.on('error', e => {
                  this.$toast('复制失败')
                  this.shareShow = false
                  this.errbox = true
                });
             },
             whyClick(qq) {
                 if (!qq) {
                    this.$messagebox({
                     message: `如点击联系客服无法启动QQ，请加客服QQ号(${qq})`
                  })
                    return;
                 };
                  this.$messagebox({
                     message: `如点击联系客服无法启动QQ，请加客服QQ号(${qq})`
                  })
             },
            contactCustom(qq){
              if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
                this.$messagebox({
                  message: "如点击联系客服无法启动QQ，请加客服QQ号("+qq+")"
                })
              }else {
                 window.location.assign('mqqwpa://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web&web_src=oicqzone.com');
              }
            },
        },
          filters:{
            getGoodsTypeText(val){
                return val  === 1 ?'游戏装备':val === 2 ? '游戏帐号' : val === 3 ?'游戏金币':'游戏帐号';
            },
        }
    }
</script>
<style  src="css/member/member-order.css" scoped></style>
