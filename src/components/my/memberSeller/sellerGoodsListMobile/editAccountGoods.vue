<template>
	<div id="wrapper" class="pb-200">
    <!--top-->
    <!--填写商品信息-->


    <div class="order-container bg-fff f30 color-000 border-bottom mt-97">
        <span>游戏帐号</span>
        <input maxlength='20' readonly type="text" placeholder="请输入游戏帐号" readonly v-model="params.gameAccount">
    </div>
    <div class="order-container bg-fff f30 color-000 border-bottom">
        <span>游戏密码</span>
        <input maxlength='20' type="text" placeholder="请输入游戏密码" v-model="params.gamePwd">
    </div>
    <div class="order-container bg-fff f30 color-000 border-bottom">
        <span>出售价格</span>
         <input type="tel" maxlength="7" v-model="params.totalAmount" @change="CountSafeBuy()"
                           @input="Replace()"
                           placeholder="请输入出售价格">
        <span class="fr">元</span>
    </div>
    <!--安心买服务-->
    <div class="order-container color-000 bg-fff border-bottom" v-if="safeBuyConfig.isEnable">
        <span class="f32 sec-buy-server">开通安心买服务<i class="wenhao1 mt-10" @click="popshow()"></i></span>
        <div class="sec-buy mt-20 f30">
            <span class="sec-price">￥{{params.price}}</span>
            <div class="fr" @click="params.isAxm=false;">
                <i class="chrd-inp" :class="{'selected': !params.isAxm}"></i>
                <span>不开通</span>
            </div>
            <div class="fr" @click="params.isAxm=true;">
                <i class="chrd-inp" :class="{'selected': params.isAxm}"></i>
                <span>开通</span>
            </div>

        </div>
        <div class="sec-text mt-20 f22 color-999">开通安心买服务，如若帐号被找回和封号，将优先为您找回帐号或全额退款。费用为订单金额的10%</div>
    </div>

    <!--底部确认是否发布商品-->
    <div class="release mt-30 trlect-btn">
        <a class="next" @click="save()"><input class="bg-f54" type="button" name="" value="完成"></a>
    </div>
   <div class="phlog hide" id="pop_register"
                 style="position: fixed; z-index: 1001;left: 50%; top: 50%; margin-left: -44%; "
                 :style="{'margin-top':popMarginTop}"
                 :class="{show:isPopshow}" @touchmove.prevent ref="pop">
                <div class="pgbis">
                    <h2 class="f30 color-000">安心买服务规定</h2>
                    <p class="f28">
                        鉴于5173作为网络第三方交易平台，仅能对卖家、买家、商品信息进行形式审查，为此5173特引入安心买服务。若卖家、买家任何一方选择了安心买服务，则卖家出售的商品，买家购买该商品出现被卖家找回、被运营商收回、封号等情况，您可以申请安心买服务，安心买保障体系会优先帮您找回帐号或者给予您购买商品的全额退款；并且本网站将根据该用户违规的情节和程度，对违规用户直接作出删除商品信息，限制交易权限甚至冻结用户帐号的处罚。若发生上述情况造成买家损失的，由本网站代卖家先行向买家退还购买上述商品的货款（服务费不退还）</p>
                </div>
     </div>
      <div class="dialog_cover hide" :class="{show:isPopshow}" @click="isPopshow=false;"
                 @touchmove.prevent></div>
</div>
</template>
<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import api from '../../../../api';
	export default{
		data(){
			return{
				isPopshow:false,
				popMarginTop:'',
				params:{
					totalAmount:''
				},
                buttonStatus:false,
                buttonText:'发布'
			}
		},
		created(){
			let vm = this;
			vm.$bus.emit('headerText','手机端发布商品');

				//获取安心买配置
			vm.getSafeBuyConfig({
				gameId:vm.$route.query.gameId,
				goodsType:vm.$route.query.goodsType
			});

			//获取商品详情
			vm.getGoodsDetail();


		},
		mounted(){
			let vm = this;
            vm.$bus.emit('isBack',true);

		},
		 computed: {
            ...mapState({
                safeBuyConfig: state => {
                    return state.memberSeller.safeBuyConfig;
                },
                publicState:state=>{
                	return state.memberSeller.publicState;
                }
            })
        },
		methods:{
			Replace(){
                let vm = this;
                vm.params.totalAmount = vm.params.totalAmount.replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

            },
            isAxm(){
            	let vm = this;
            	vm.params.isAxm = true;
            },
            CountSafeBuy:function  () {
            	 let vm = this;
                //vm.params.totalAmount = parseInt(vm.params.totalAmount*100)/100;
                vm.params.price = parseInt(vm.params.totalAmount * vm.safeBuyConfig.pricePercent * 10000) / 10000;
                if (vm.params.price > vm.safeBuyConfig.maxPrice) {
                    vm.params.price = vm.safeBuyConfig.maxPrice;
                } else if (vm.params.price < vm.safeBuyConfig.minPrice) {
                    vm.params.price = vm.safeBuyConfig.minPrice;
                }
                vm.price = vm.price.toFixed(2);
            },
            getGoodsDetail:function  () {
            	let vm = this;
            	let params ={
            		goodsId:vm.$route.query.goodsId
            	};
            	api.seller.selectgoodsdetail(params)
            		.then((res)=>{
            			if (res.data.success) {
            				vm.params = res.data.goodsEO;
                            vm.CountSafeBuy();
            			};
            	},(res)=>{

            	})
            },
            save:async function  () {
            	let vm = this;
            	delete vm.params.signs;
                if (!vm.buttonStatus){
                    vm.buttonText = '修改中';
               await 	api.seller.update(vm.params)
            	   .then((res)=>{
            	   	if(res.data.success){

                        vm.buttonStatus = true;
                        vm.setPublicState(true);
            	   	    vm.$router.push({name:'SellerGoodsListOfMobile',query:{status:vm.publicState.status}});
            	   	}else{
                        vm.$toast(res.data.responseStatus.message);
                    }
            	})
                   }
            },
            popshow: function () {
                let vm = this;
                vm.isPopshow = !vm.isPopshow;
                vm.$nextTick(function () {
                    this.popMarginTop = -this.$refs.pop.getBoundingClientRect().height * 0.5 + "px";
                });

            },
            ...mapActions({
            	getSafeBuyConfig:'member/MEMBER_SELLER_GETCONF',
                setPublicState:'member/MEMBER_SELLER_GOODS_UPDATE_STATUS'
            })
		}
	}
</script>
<style src="css/common/publish-cl.css" scoped></style>
<style type="text/css" scoped>
	  .fixedFill-mx {
        width: 100%;
        height: .96rem;
    }
     .show {
        display: block !important;
    }
</style>
