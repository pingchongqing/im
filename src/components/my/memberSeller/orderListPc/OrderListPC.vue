<template>
	<div id="wrapper" style="height:100%;">
    <!-- top -->
        <div class="sellnage-nav tab fixed-top mt-97 border20-bottom">
            <ul class="tab-nav">
                <li class="fl border-bottom f30" :class="{'active':params.orderStatus == 1}" @click="selectStatus(1)">
                    <a class="nav-01">交易中</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.orderStatus == 2}" @click="selectStatus(2)">
                    <a class="nav-02" >交易完成</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.orderStatus == 3}" @click="selectStatus(3)">
                    <a class="nav-03">交易取消</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.orderStatus == 0}" @click="selectStatus(0)">
                    <a class="nav-04" >全部</a>
                </li>
            </ul>
        </div>

   <div class="sellmanage-main mt-205">


        <!--审核中-->
        <div class="seller-01 " ref="tab">
            <div class="sellnage-connt mb-20" v-for="v in orderPCList">

                <div class="manage-caption px-30  bg-fff">
                	<div class="manage-titl py-30 f28">
                        <span class=" fl mr-30 fontbold">{{v.GoodsName}}</span>
                        <!-- <i class="manage-titl-ico" v-if="v.GoodsType == 2"></i> -->
                    </div>
                     <router-link :to="{name:'OrderPCDetail',
                    query:{orderId:v.Id} }" @click.native="saveSrollTop()">
                    <div class="manage-contn bg-faf">
                        <div class="mancon-img fl">
                            <i class="f22 color-fff bg-000">
                                {{v.GoodsType|getGoodsTypeText}}
                            </i>
                            <span class="middle"></span>
                            <img src="../../../../assets/images/default_img.jpg" v-if="!v.Image">
                            <img  :src="v.Image.ThumbnailsUrl" v-if="v.Image">
                        </div>
                        <div class="mancon-tn py-15">
                            <div class="tn-hxtxt f26 color-666">
                            {{v.GameName}}/{{v.AreaName}}
                            </div>
                            <div class="tn-hxtxt f26 color-666 ">商品价格：{{v.GoodsTotalPrice}}元</div>
                            <div class="tn-hxtxt f26 color-666">发布时间：{{v.CreatedDate|format}}</div>
                        </div>
                    </div>
                    </router-link>
                </div>
                <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                	<span class="title-curent f30 pl-30 color-000 buyct-why">{{v.OrderStatus|getStatusText}}</span>
                </div>
              <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                <a class="f30 color-m1 border border-color cancel fr" @click="contactCustom(v.CustomServiceQQ)">联系客服</a>
                <i class="titcur fr" @click="whyClick(v.CustomServiceQQ)"></i>
              </div>
            </div>
        </div>
   </div>

    <div class="loading" v-show="loading" >加载中...</div>
      <div  class="list-empty bg-fff" v-show="orderPCList.length===0 && !loading">
        <p ><img src="~images/gamelogo.png"></p>
        <span >您还没有订单</span>
      </div>
   </div>
</div>
</template>
<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import api from '../../../../api';
	export default{
		data(){
			return{
				params:{
                    orderStatus:this.$route.query.status,
                    pageIndex:1,
                    pageSize:10,
                },
                scrollTop:0,
                loading:false
			}
		},
         beforeRouteEnter (to, from, next){
            let vm = this;
            if (from.name === 'OrderPCDetail') {
                next(vm=>{

                    if (vm.orderPCList.length > 0) {
                        vm.params.orderStatus = vm.pcState.status;
                    }else{
                        vm.params.orderStatus = vm.$route.query.status;
                        vm.initParams();
                        vm.getList();
                    }
                });
            }else{
                next(vm=>{
                   vm.initParams();
                   vm.getList();
                });
            }
         },
         computed: {
            ...mapState({
                orderPCList: state => {
                    return state.orderMange.orderPCList;
                },
                pcAllLoaded:state =>{
                    return state.orderMange.pcAllLoaded;
                },
                pcState:state =>{
                    return state.orderMange.pcState;
                }
            })
        },
        watch: {
            scrollTop(val, oldVal) {
                    var vm = this;
                    if (vm.$isBottom(200) && !vm.pcAllLoaded) {
                        ++vm.params.pageIndex;
                        vm.getList();
                        //vm.getOrderMobileList(vm.params);
                    }
             }
        },
		created:function  () {
			let vm = this;
			vm.$bus.emit('headerText','电脑端手游订单');
            vm.$nextTick(() => {
                document.body.scrollTop = vm.pcState.scrollTop;
                document.documentElement.scrollTop = vm.pcState.scrollTop
            })
		},
        mounted:function(){
            let vm = this;
            vm.watchGoTop();
            vm.$bus.emit('isBack',false);
            vm.$bus.emit('callback',()=>{
                vm.$router.push({name:'MemberSeller'});
            });
            vm.$bus.emit('isMore',true);
        },
		methods:{
              whyClick(qq) {
                 if (!qq) {
                    this.$messagebox({
                     message: `正在分配客服中，请稍后`
                  })
                    return;
                 };
                  this.$messagebox({
                     message: `如点击联系客服无法启动QQ，请加客服QQ号(${qq})`
                  })
             },
             watchGoTop: function () {
                var vm = this;
                window.addEventListener('scroll', function () {
                   vm.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                });
            },
            contactCustom(qq){
							if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
								this.$messagebox({
									message: "如点击联系客服无法启动QQ，请加客服QQ号("+qq+")"
								})
							}else {
								 window.location.assign(`mqqwpa://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web&web_src=oicqzone.com`);
							}
            },
            saveSrollTop:function  () {
                let vm = this;

                let params = {
                    scrollTop:vm.scrollTop,
                    status:vm.params.orderStatus
                }

                vm.setState(params);
            },
            initParams(){
                 this.params.pageIndex = 1;
                 this.clearPClist();
            },
			selectStatus:function  (val) {
				let vm = this;
                vm.params.orderStatus = val;
                //设置为初始值
                vm.initParams();
                vm.getList();
			},
            async getList(){
                this.loading = true;
               await this.getOrderPCList(this.params).then((res)=>{
                this.loading = false
               });
            },
            ...mapActions({
                getOrderPCList:'member/MEMBER_SELLER_ORDER_PC_LIST',
                clearPClist:'member/MEMBER_SELLER_ORDER_PC_CLEAR_LIST',
                setState:'member/MEMBER_SELLER_ORDER_PC_STATE'
            })
		},
        filters:{
            getGoodsTypeText(val){

                return val  === 1 ?'游戏装备':val === 2 ? '游戏帐号' : val === 3 ?'游戏金币':'游戏帐号';
            },
            format:function (val){
                return moment(val).format('YYYY-MM-DD HH:mm:ss');
            },
            getStatusText:function  (val) {
                let text = '';

                switch(val){
                    case 1:
                        text = '待付款';
                        break;
                    case 2:
                        text = '已付款';
                        break;
                    case 3:
                        text = '待发货';
                        break;
                    case 4:
                        text = '已发货';
                        break;
                    case 5:
                        text = '交易完成';
                        break;
                    case 6:
                        text = '已退款';
                        break;
                    case 7:
                        text = '已取消';
                        break;
                    case 8:
                        text = '待退款';
                        break;
                    case 9:
                        text = '申请退款中';
                        break;
                    case 10:
                        text = '客服介入';
                        break;

                }
                return text;
            }
        }
	}
</script>
<style src="css/common/member-cxy.css" scoped></style>

<style type="text/css" scoped>
     .fixedFill-mx {
        width: 100%;
        height: .96rem;
    }

    .loading {
    text-align: left;
    text-indent: .6rem;
    line-height: .5rem;
    height: .5rem;
    background: url('~images/loading.gif') left center no-repeat;
    background-size: .5rem;
    margin-top: -.1rem;
    margin-left: 2.5rem;
}
  /*  .sellnage-nav{
            position: fixed;
    width: 100%;
    z-index: 99;
    }*/
</style>
