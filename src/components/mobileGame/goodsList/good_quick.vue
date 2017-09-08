<template>
 <div id="wrapper">
  <!--top-->
  <div class="top-header border-bottom fixed-top">
   <div class="top-back">
    <a href="javascript:history.go(-1)">返回</a>
   </div>
   <h2 class="f36 color-000">下单</h2>
  </div>
  <!------------------------*填补fixed留下的下方空块*------------------------>
  <div class="member-tab mt-97 pb-200">
   <div class="list-main">
    <div class="register-conn">
     <div class="pro-list-01">
      <div class="pro-pic">
       <img  :src="info.image">
      </div>
      <div class="pro-title erro-title" v-if="!info.price">
       <p  class="title3">{{info.title}}{{info.goods_img}}</p>
       <p  class="title3" v-if="info.infotitle">{{info.infotitle}}</p>
      </div>
      <div class="pro-title" v-if="info.price">
       <p  class="title3">{{info.title}}{{info.goods_img}}</p>
       <div  class="price3 f30 color-666 seheight fw pt-15">
        <div  class="fl" v-if="info.price">
         {{info.operatorname}}/{{info.gameservername}}
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div class="pcOrder01 px-30 bg-fff border-bottom" @click="openSelect()">
    <p class="p1 f32 fl color-000">{{info.categorytypename}}</p>
    <p class="p1 f32 fr color-000"><span class="fr out-ico">{{info.gamestartaccountunit}} </span></p>
   </div>
   <div class="pcOrder01 px-30 bg-fff border-bottom">
    <p class="p1 f32 fl">商品价格</p>
    <p class="p1 f32 fr "  v-if="info.price">￥{{info.price}}</p>
   </div>
   <div class="fastpin-titl f28 color-666 px-30">
    联系方式
   </div>
   <mt-field label="我的手机号" maxlength='11' type="tel" placeholder="请输入手机号" v-model="buyTel"></mt-field>
   <mt-field label="我的QQ号" maxlength='11' type="tel" placeholder="请输入QQ号" v-model="buyQ"></mt-field>
   <!--底部确认是否发布商品-->
   <div class="fixed-button4 border-top fixed-bottom p-30 bg-fff">

    <div class="fleft fl "><em class="e1 f32">合计</em><em class="e2 f36"  v-if="info.price">￥</em><em class="e3 f40">{{info.price}}</em></div>
    <a class="fright f36 fr" :class="info.price?'':'disabled'"  @click="subBotton()">
     提交订单
    </a>
   </div>
   <transition name="fade">
    <aside class="ConBox" v-if="isSelect">
     <div class="top-header border-bottom">
      <div class="top-back" @click="openSelect()"><a class="return conBack" href="javascript:void(0);"></a></div>
      <h2 class="f36">选择</h2>
     </div>
     <div class="propertytxtdiv0 BoxLink Jbox">
      <a v-for="item in  info.unitlist" :class="item==info.gamestartaccountunit?'color-m1':''" @click="openSelect(item)">{{item}}</a>
     </div>
    </aside>
   </transition>
  </div>
 </div>
</template>
<script>
	import { Field } from 'mint-ui';
	import {mapActions} from 'vuex'
	export default{
		data() {
			return {
				buyTel: "",//获取本地cookie电话号码
				gameId: "",
				price:'',
				isAnxinm:false,
				isTopApp:true,
				isSelect:false,
				goodsType: "",
				PageHint:'',
				Name:'',
				QueckSelect:{},
				info: {},
				buyQ: "",//做QQ验证
			}
		},
		components: {
			Field
		},
		created(){
			this.checkBindMobile();
			this.getConfig();
		},
		methods: {
			getMoney(pricc){
				return pricc.toFixed(2)
			},
			openSelect(item){
				var self = this;
				if(item){
					var params = self.$route.params;
					params.gameStartAccountUnit = item
					self.isSelect = !self.isSelect;
					self.getFastsInfo(params).then(data => {
						if(data.BizOfferId){
							self.info.title = data.Title
							self.info.gamestartaccountunit = data.GameStartAccountUnit
							self.info.price = data.Price
							self.info.gameservername = data.GameServerName
							self.info.operatorname = data.OperatorName
							self.info.bizofferid = data.BizOfferId;
						}else {
							self.info.price = '';
							self.info.gameservername =''
							self.info.operatorname = ''
							self.info.bizofferid = ''
							self.info.title  = "该"+self.info.categorytypename+"数量已售罄"
							self.info.infotitle  ="请选择其他数量！"
							self.$toast( self.info.title+ self.info.infotitle);
							self.info.gamestartaccountunit = params.gameStartAccountUnit
						}
					})
				}else {
					self.isSelect = !self.isSelect;
                }
			},
			//获取手机号码
			checkBindMobile: function () {
				var self = this;
				self.$http.get(self.$CONSTANTS.APILogin + "account/checkBindMobile").then(function (res) {
					if (res.body.success == true) {
						self.buyTel = res.body.mobilePhone;
					}else{
						location.href = '/vue/login?returnUrl=' + encodeURIComponent(location.href);
					}
				});
			},
			...mapActions([
				'getFastsList',  // 获取快销号列表类型
				'getFastsInfo',  // 获取快销号列表类型
				'createFasts',  // 创建快销号订单
			]),

			//获取配置信息
			getConfig: function () {
				var self = this;
				var params = self.$route.params
				self.getFastsInfo(params).then(info => {
					var temp = {};
					self.getFastsList(params).then(dataList => {
						dataList.forEach(function (data) {
							if(params.categoryTypeName==data.categorytypename){
								temp = data
							}
						})
                        if(info&&info.Price){
	                        temp.price = info.Price;
	                        temp.title = info.Title;
	                        temp.gameservername = info.GameServerName
	                        temp.operatorname = info.OperatorName
	                        temp.bizofferid = info.BizOfferId;
	                        temp.gamestartaccountunit = info.GameStartAccountUnit;
                        }else {
	                        temp.gameservername =''
	                        temp.operatorname = ''
	                        temp.bizofferid = ''
	                        temp.title  = "该"+temp.categorytypename+"数量已售罄"
	                        temp.infotitle  ="请选择其他数量！"
	                        this.$toast( temp.title+ temp.infotitle);
	                        temp.gamestartaccountunit =  temp.unitlist[0];
                        }
						self.info =  temp
					})
				})

			},
			mobileOrderPay: function (orderId) {
				var self = this;
				self.$http.get(self.$CONSTANTS.APIMainGoods + "mainGoodsAccountOrder/mobileOrderPay", {
					params: {
						orderId: orderId,
						sourceChannel: "2"
					}
				}).then(function (res) {
					if (res.body.success == true) {
						var json_result = JSON.parse(res.body.result);
						location.href = "https://mypay.5173.com/PaymentWap/PayExternalV2.aspx?"+json_result.BizResult.Data.payUrl;
					}
				});
			},
			subBotton(){
				var self = this;
				if(!self.info.price){
//					self.$toast("该类型已售罄！");
					return false;
				}
				if ((self.buyQ + "").length < 5||(self.buyQ + "").length >11||!(/^[0-9]*$/.test(self.buyQ))) {//判断QQ号
					this.$toast("请填写正确QQ号！");
					return false;
				};
				var rex =/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
				if (!self.buyTel||!rex.test(self.buyTel)) {//判断手机号
					this.$toast("请填写正确手机号！");
					return false;
				};
				var params  = {
					bizOfferId:self.info.bizofferid,
					buyerPhone:self.buyTel,
					buyerQQ:self.buyQ,
					sourceChannel:2
				}
				self.createFasts(params).then(data => {
					debugger
					if(data.success&&data.data){
						self.mobileOrderPay(data.data.id)
                    }else{
						var  message = data.responseStatus.message
						if(message.indexOf('从主站创建订单发生异常')>=0){
							message = message.split('从主站创建订单发生异常:')[1]
                        }
						this.$toast(message);
                    }
                })
			}
		}
	}
</script>
<style src='css/common/list-cl.css' scoped></style>
<style>
 .erro-title{
   line-height: 0.6rem!important;
   padding-top: 0.1rem!important;
 }
 .order-container span.sec-title {
  width: 105px;
  text-align: right;
  padding-right: 15px;
  left: 0;
 }

 .mint-cell-wrapper{height:auto; min-height:1.1rem; display:block;  position:relative; padding: 0 0.3rem; border-bottom: 1px solid #e8e8e8;background: none;}
 .mint-field .mint-cell-title{float:left; width:28%; }
 .mint-field .mint-cell-title .mint-cell-text{padding:0.3rem 0 0.18rem; line-height:0.5rem;color: #000; font-size: 0.32rem; display: inline-block;}
 .mint-field .mint-cell-value{float:left; padding:0 3%; width:66%; }
 .mint-cell-value input{width:100%; padding:0.2rem 0 0.18rem; line-height:0.7rem; border:none;font-size: 0.32rem;}
 .mint-field-clear .mintui{height: 1.1rem; width: .36rem; background:url(~images/del.png) no-repeat right center; background-size:0.34rem; display:inline-block;}
 .mint-field-clear{ opacity: 1;position:absolute; top:0; right:0.3rem;}
 .mintui-field-error:before { content: ""; }

</style>
<style scoped>
 .fade-enter-active {
  transition: all .3s ease;
 }
 .fade-leave-active {
  transition: all 1s ease;
 }
 .fade-enter, .fade-leave-active {
  transform: translateX(100%);
 }
 .ConBox{
  margin: 0;
  left: 0;
  z-index: 999;
  position: fixed;
  overflow: hidden;
 }
 .ConBox .Jbox{
  width: 100%;
  background: white;
  overflow: scroll;
  height: 100vh;
  top:0;
  z-index: 20;
  padding-bottom: 2rem;
 }
 .pro-pic{
  float: left;
  width: 25%;
 }
 .pro-pic img{
  width: 100%;
 }
 .pro-title{
  width: 75%;
  float: left;
  padding-left: 15px;
 }
 .order-container span.exp {
  text-align: right;
  padding-right: 15px;
  font-size: 0.3rem;
  line-height: 0.6rem;
 }
 .wenhao1 {
  left: 70%;
  top: 0;
  margin-left: 15px;
 }
 /*.order-container{*/
 /*color: #666666;*/
 /*}*/
 .bg-fff{
  color: black;
  font-size: 0.3rem;
 }
 .bg-fff input{
  font-size: 0.3rem;
 }
 .bg-fff .f30{
  font-size: 0.3rem;
 }
 .float-right{
  float: right;
 }
 .order-container span img {
  width: 0.2rem;
  margin-bottom: 0.13rem;
 }
 .release a {
  width: 50%;
  float: right;
 }
 .release span {
  font-size: 0.32rem;
  line-height: 0.9rem;
  float: left;
 }
 .release span em{
  color: #f75e46;
 }
 .disabled {
   background-color: #999!important;
 }
</style>