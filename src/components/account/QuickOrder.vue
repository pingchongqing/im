<template>
    <div id="wrapper">
        <!--top-->
        <div class="top-header border-bottom fixed-top" v-if="isTopApp">
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
                            <img  :src="QueckSelect.goods_img">
                        </div>
                        <div class="pro-title">
                            <p data-v-417b98ae="" class="title3">{{info.BizOferName}}</p>
                            <div data-v-417b98ae="" class="price3 f30 color-666 seheight fw pt-15">
                                <div data-v-417b98ae="" class="fl">
                                    {{info.GameAreaName}}/{{info.GameServerName}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pcOrder01 px-30 bg-fff border-bottom" @click="openSelect()">
                <p class="p1 f32 fl color-000">{{QueckSelect.FileterDes}}</p>
                <p class="p1 f32 fr color-000"><span class="fr out-ico">{{QueckSelect.name2}} </span></p>
            </div>
            <div class="pcOrder01 px-30 bg-fff border-bottom">
                <p class="p1 f32 fl">商品价格</p>
                <p class="p1 f32 fr ">￥{{QueckSelect.value}}</p>
            </div>
            <div class="fastpin-titl f28 color-666 px-30" v-if="info.IncrementConfigs">
                增值服务
            </div>
            <!--底部确认是否发布商品-->
            <div class="clearfix bg-fff" v-for="(config,index) in info.IncrementConfigs">
                <div class="pcOrder02 px-30 bg-fff border-bottom margin-top">
                    <div class="pcOrder02-left fl f32 color-000"><em class="fl mr-20">{{config.Name}}</em><i class="fl" @click="anxinmaiTit(config)"></i></div>
                    <div class="pcOrder02-right f32 fr">
                        <em class="fl color-000 mr-20">￥{{getMoney(config.Price)}}</em>

                        <span class="fl"><label class="label-switch" @click="update(index,config)">
                            <input type="checkbox"v-model="config.value">
                            <div class="checkbox"></div>
                        </label></span>
                    </div>

                </div>
                <mt-field v-if="config.value" v-for="need in config.NeedInfo" :label="need.Key" :placeholder="'请输入'+need.Key"  v-model="need.Value"></mt-field>
            </div>
            <div class="fastpin-titl f28 color-666 px-30">
                联系方式
            </div>
            <mt-field label="我的手机号" maxlength='11' type="tel" placeholder="请输入手机号" v-model="buyTel"></mt-field>
            <mt-field label="我的QQ号" maxlength='11' type="tel" placeholder="请输入QQ号" v-model="buyQ"></mt-field>
            <!--底部确认是否发布商品-->
            <div class="fixed-button4 border-top fixed-bottom p-30 bg-fff">

                <div class="fleft fl "><em class="e1 f32">合计</em><em class="e2 f36">￥</em><em class="e3 f40">{{price}}</em></div>
                <a class="fright f36 fr" @click="subBotton()">
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
                        <a v-for="item in  QueckSelect.selectList" @click="openSelect(item)">{{item.name2}}</a>
                    </div>
                </aside>
            </transition>
            <!--安心买服务规定-->
            <div class="phlog" id="pop_register" v-if="isAnxinm" @click="isAnxinm = !isAnxinm"
                 style="left: 207px; top: 368px; margin-left: -186px; margin-top: -209px; position: fixed; z-index: 1001; display: block;">
                <div class="pgbis">
                    <h2 class="f30 color-000">{{Name}}</h2>
                    <p class="f28">{{PageHint}}</p>
                </div>
            </div>
            <div class="dialog_cover" v-if="isAnxinm" @click="isAnxinm = !isAnxinm"></div>
        </div>
    </div>
</template>
<script>
	import { Field } from 'mint-ui';
	export default{
		data() {
			return {
				buyTel: "",//获取本地cookie电话号码
				goodsId: this.$route.params.goodsId,//获取url里面的goodsId
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
//		watch: {
//			buyQ: function (Val, oldVal) {
//				if (!(/^[0-9]*$/.test(Val)) || this.buyQ.length > 10) {
//					this.buyQ = oldVal;//禁止输入除0-9以外的字符
//				}
//			}
//		},
		created(){
			this.checkBindMobile();
			this.getConfig();
			this.name();
		},
		methods: {
			getMoney(pricc){
                return pricc.toFixed(2)
            },
			getPrice(){
				var self = this
                this.price = this.QueckSelect.value
                if(!this.price){
	                this.$toast("该类型已售罄！");
                }else {
	                if( this.info.IncrementConfigs){
		                this.info.IncrementConfigs.forEach(function (info) {
			                if(info.value){
				                self.price =  self.price + info.Price
			                }
		                })
	                }
	                self.price = self.price.toFixed(2)
                }
			},
			update(index,config){
                this.info.IncrementConfigs.splice(index,1,config)
                this.getPrice()
            },
			anxinmaiTit: function (config) {
				this.PageHint = config.PageHint
				this.Name = config.Name
				this.isAnxinm = true;
			},
			openSelect(item){
				this.isSelect = !this.isSelect;
				if(item){
					if(item.value){
						this.QueckSelect.name = item.name;
						this.QueckSelect.name2 = item.name2;
						this.QueckSelect.value = item.value;
						this.QueckSelect.id = item.id;
						this.info.BizOferName = item.title
						this.getPrice()
                    }else{
						this.$toast("该类型已售罄！");
                    }
				}
			},
			name(){
				var self = this;
				if (location.href.indexOf("App") > 0) {
					self.isTopApp = false
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
			//获取配置信息
			getConfig: function () {
				var QuickTemp={
					'YX16060614453952100011':{
						0:{
							img:"/dist/lol2.jpg",
							"100001":'招募令'
						},
						1:{
							img:"/dist/lol1.jpg",
							"100-max":'100以上'
						}
					},
					'YX16063012173644300001':{
						0:{
							img:"/dist/wow.jpg",
							"1":'套餐1',
							"2":'套餐2'
						},
					},
					'YX16063014064728700455':{
						0:{
							img:"/dist/sword3_2.jpg",
							"10":'联系客服',
							"20":'专属定制',
							"30":'极速分离',
							"31":'捏脸数据',
							"40":'捏脸数据',
						},
						1:{
							img:"/dist/sword3_1.jpg",
							"1-1":'成男',
							"2-2":'成女',
							"3-3":'萝莉',
							"4-4":'正太',
						},
					}

				}
				var self = this;
				self.$http.get(self.$CONSTANTS.APIMainGoods + "fast_sale_account/mainQuickPublishOrderConfig", {
					params:{quickPublishItemId:self.$route.params.id}
				}).then(function (res) {
					if (res.body.success == true) {
						self.info = res.body.data;
					}
				});
				var params = {
					gameId: this.$route.query.gameId,
					gameServerId: this.$route.query.serverId,
					gameAreaId: this.$route.query.areaId
				}
				var gameId = this.$route.query.gameId
				self.$http.get(self.$CONSTANTS.APIMainGoods + "fast_sale_account/getQuickPublishInfoList", {
					params:params
				}).then(function (res) {
					if (res.body.success == true) {
						var  quick = res.body.data
                        var AccountType = this.$route.query.AccountType
						quick.Configs.forEach(function (config) {
                            if(config.AccountType==AccountType){
	                            self.QueckSelect.FileterDes = config.FileterDes
	                            self.QueckSelect.selectList = []
	                            config.Options.forEach(function (option) {
	                            	var name = option;
		                            if(QuickTemp[gameId]&&QuickTemp[gameId][config.AccountType]&&QuickTemp[gameId][config.AccountType][option]){
			                            name = QuickTemp[gameId][config.AccountType][option]
		                            }
		                            self.QueckSelect.selectList.push({name:option,name2:name})
	                            })
                            }
						})
						quick.List.forEach(function (list) {
							if(list.AccountType==AccountType){
								self.QueckSelect.GameName = list.GameName
								self.QueckSelect.server_name = list.GameServer
								self.QueckSelect.region_name = list.GameArea
								self.QueckSelect.title = list.Title
								if(QuickTemp[gameId]&& QuickTemp[gameId][list.AccountType]){
									self.QueckSelect.goods_img = QuickTemp[gameId][list.AccountType].img||quick.gameImageUrl
								}else {
									self.QueckSelect.goods_img = quick.gameImageUrl
								}
								var lastNum = 0
								self.QueckSelect.selectList.forEach(function (data) {
									var temp = data.name.split('-')
									if(temp.length==2&&Number(temp[0])<=list.Number&&(Number(temp[1])>=list.Number||temp[1]=='max')){
										data.value = list.Price
										data.title = list.Title
										data.id = list.ID
									}else if(lastNum<list.Number&&Number(data.name)>=list.Number){
										data.value = list.Price
										data.title = list.Title
										data.id = list.ID
									}
									lastNum = Number(data.name)
								})
							}
						})

						self.QueckSelect.selectList.forEach(function (select) {
							if(select.id==self.$route.params.id){
								self.QueckSelect.name = select.name
								self.QueckSelect.name2 = select.name2
								self.QueckSelect.value = select.value
								self.QueckSelect.id = select.id
								self.QueckSelect.title = select.Title
							}
						})
						self.getPrice();
					}
				});
			},
			subBotton(){
				var self = this;
				if(!self.price){
					self.$toast("该类型已售罄！");
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
					QuickPublishItemId:self.QueckSelect.id,
					BuyerTel:self.buyTel,
					BuyerQQ:self.buyQ,
					IncrementItems:[],
					PayCallBackUrlFormt:location.protocol + "//" + window.location.host + '/vue/buyerCenter/buyerOrder/pcgoods/#PAYID#?ServiceType=5&&from=payed'
                }
                if(self.info.IncrementConfigs){
	                self.info.IncrementConfigs.forEach(function (item) {
                        if(item.value){
	                        params.IncrementItems.push({
		                        Id:item.Id,
		                        Name:item.Name,
		                        NeedInfo:item.NeedInfo
                            })
                        }
	                })
                }
				self.$http.get(self.$CONSTANTS.APIMainGoods + "mainGoodsAccountOrder/createQuickPublishAccountOrder", {
					params:{params:JSON.stringify(params)},
				}).then(function (res) {
					if (res.body.success == true) {
						location.href = "https://mypay.5173.com/PaymentWap/PayOrderV3.aspx?OrderId="+res.body.data.OrderId+"&Key="+res.body.data.Key
                    }else{
						if(res.body.responseStatus.code==11){
							location.href = '/vue/login?returnUrl=' + encodeURIComponent(location.href);
                        }
						this.$toast(res.body.responseStatus.message);
                    }
				});
            }
		}
	}
</script>
<style src='css/common/list-cl.css' scoped></style>
<style>
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
    .fixed-button4 a.fright{
        width: 50%;
    }
    .fade-enter-active {
        transition: all 1s ease;
    }
    .fade-leave-active {
        transition: all 0.3s ease;
    }
    .fade-enter,  .fade-leave-active{
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
</style>