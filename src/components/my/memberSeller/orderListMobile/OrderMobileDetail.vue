<template>
    <div id="wrapper" class="pb-150">
    <!--顶部fixed部分-->
    <div class="mt-97"></div>
    <div class="bg-m1 f32 color-fff order_top_tip" v-show="mobileDetail.status == 2 || mobileDetail.status == 3 || mobileDetail.status == 8 || mobileDetail.status == 9 ||  mobileDetail.status == 10 ">
        <p class="line-40">
         <span class="icon_wait">交易中</span>
         </p>
    </div>

    <div class="bg-2a f32 color-fff order_top_tip" v-show="mobileDetail.status == 4">
        <span class="icon_firm">交易成功</span>
    </div>
    <div class="bg-999 f32 color-fff order_top_tip" v-show=" mobileDetail.status == 5 ||
            mobileDetail.status == 7 || mobileDetail.status == 6">
        <span class="icon_fail">交易取消
             <em class="f28 ml-20" v-if="mobileDetail.cancelReason"> 取消原因：{{mobileDetail.cancelReason|cancelReasonFilter}}</em>
             <em class="f28 ml-20" v-else-if="mobileDetail.complainResult">取消原因：
             {{mobileDetail.complainResult|complainResultFilter}}</em>
             <em class="f28 ml-20" v-else-if="mobileDetail.otherReason">取消原因：
             {{mobileDetail.otherReason}}</em>
        </span>
    </div>

    <div class="detail_container bg-fff clearfix">
        <img class="game_logo fl" src="../../../../assets/images/default_img.jpg" v-if="!mobileDetail.goodsImg">
        <img class="game_logo fl" :src="mobileDetail.goodsImg" v-if="mobileDetail.goodsImg">
        <div>
            <p class="f30 color-000">{{mobileDetail.title}}</p>
            <p class="f30 mt-20 color-000">￥{{mobileDetail.totalAmount}}</p>
        </div>
    </div>

    <div class="detail_container bg-fff mt-20 border-bottom">
        <p class="f30 mb-30"><span class="color-666 pr-30">游戏区服</span><span class="color-000">{{mobileDetail.regionName}} /{{mobileDetail.serverName}}</span></p>
        <p class="f30"><span class="color-666 pr-30">商品类型</span><span class="color-000">
        {{mobileDetail.goodsType|getGoodsTypeText}}</span></p>
    </div>

    <div class="detail_container bg-fff">
        <p class="f30 mb-30"><span class="color-666 pr-30">订单编号</span><span class="color-666">{{mobileDetail.orderId}}</span>
        <a class="copy ml-20 color-666 f24" id="copy" :data-clipboard-text="mobileDetail.orderId" @click="copy()">复制</a></p>
        <p class="f30"><span class="color-666 pr-30">下单时间</span>
            <span class="color-666">{{mobileDetail.createTime|format}}</span>
        </p>
    </div>

    <div class="detail_container bg-fff mt-20 border-bottom">
        <p class="f30 mb-30">
            <span class="color-666 pr-30">商品价格</span>
            <span class="color-666 fr">￥{{mobileDetail.totalAmount}}</span>
        </p>
        <p class="f30 mb-30" v-if="mobileDetail.isAxm && this.mobileDetail.axmType == 1">
            <span class="color-666 pr-30">安心买</span>
            <span class="color-666 fr">-￥{{mobileDetail.insurance}}</span>
        </p>
        <p class="f30 mb-30">
            <span class="color-666 pr-30">交易服务费</span>
            <span class="color-666 fr">-￥{{mobileDetail.commission}}</span>
        </p>
    </div>
    <div class="total_container bg-fff border-bottom" v-if="mobileDetail.status != 6">
        <p class="f30 mb-30">
            <span class="color-m1 fr ml-30">￥{{Profit}}</span>
            <span class="color-666 fr">实际收益</span>
        </p>
    </div>

    <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="mobileDetail.goodsType==2">
    <a class="f30 color-m1 border border-color cancel fr" @click="contactCustom()">联系客服</a><i class="titcur fr"
     @click="whyClick(orderId)"></i></div>
</div>
</template>
<script >
    import { mapState, mapGetters, mapActions } from 'vuex';
    import api from '../../../../api';
    import {complainResultFilter,cancelReasonFilter} from 'components/common/filters';
    import Clipboard from 'clipboard';
    export default{
        data(){
            return{
                orderId:this.$route.query.orderId,
                id:this.$route.query.Id
            }
        },
        created(){
            let vm = this;
            vm.$bus.emit('headerText','订单详情');
            vm.getDetail(vm.orderId + '_' + vm.id);
        },
        mounted(){
            this.$bus.emit('isBack',true);
        },
        computed:{
            ...mapState({
                mobileDetail:state =>{
                    return state.orderMange.mobileDetail;
                }
            }),
            Profit:function  () {
                // - this.mobileDetail.insurance * 10000
                let price = parseInt(this.mobileDetail.totalAmount * 10000  - this.mobileDetail.commission * 10000);

                if (this.mobileDetail.isAxm && this.mobileDetail.axmType == 1) {
                    price = price - this.mobileDetail.insurance * 10000;
                };
                return price/10000;
            }
        },
        methods:{
            ...mapActions({
                getDetail:'member/MEMBER_SELLER_ORDER_MOBILE_DETAIL'
            }),
             whyClick(id) {
                let params ={
                    orderId:id
                }
                  api.memberSeller.openServicesQQ(params)
                    .then((res)=>{
                      if (!res.data.success && !res.data.serviceQQ) {
                            this.$messagebox({
                             message: `正在分配客服中，请稍后`
                          })
                        return;
                      };
                      this.$messagebox({
                         message: `如点击联系客服无法启动QQ，请加客服QQ号(${res.data.serviceQQ})`
                      })
                  })
             },
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
            contactCustom(){
                let vm = this;
                let params = {
                    orderId:vm.mobileDetail.orderId
                }
                api.memberSeller.openServicesQQ(params)
                    .then((res)=>{

                        if (res.data.success && res.data.isOpenQQ) {
                          if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
                            this.$messagebox({
                              message: "如点击联系客服无法启动QQ，请加客服QQ号("+res.data.serviceQQ+")"
                            })
                          }else {
                            window.location.assign(`mqqwpa://im/chat?chat_type=wpa&uin=${res.data.serviceQQ}&version=1&src_type=web&web_src=oicqzone.com`)
                          }
                        }else{
                            window.location.assign(`/member/huanxin.html?orderId=${vm.mobileDetail.orderId}_${vm.mobileDetail.subOrderId}&isSeller=true`);
                        }
                    })
            },
        },
          filters:{
            getGoodsTypeText(val){
                return val  === 1 ?'游戏装备':val === 2 ? '游戏帐号' : val === 3 ?'游戏金币':'游戏帐号';
            },
             format:function (val){
                return moment(val).format('YYYY-MM-DD HH:mm:ss');
            },
            complainResultFilter,
            cancelReasonFilter
        }
    }
</script>
<style  src="css/member/member-order.css" scoped></style>
