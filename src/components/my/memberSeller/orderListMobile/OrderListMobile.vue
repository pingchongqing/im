<template>
	<div id="wrapper" style="height:100%;">
    <!-- top -->
        <div class="sellnage-nav tab fixed-top mt-97 border20-bottom">
            <ul class="tab-nav">
                <li class="fl border-bottom f30" :class="{'active':params.status == 1}" @click="selectStatus(1)">
                    <a class="nav-01">交易中</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.status == 2}" @click="selectStatus(2)">
                    <a class="nav-02" >交易完成</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.status == 3}" @click="selectStatus(3)">
                    <a class="nav-03">交易取消</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.status == 0}" @click="selectStatus(0)">
                    <a class="nav-04" >全部</a>
                </li>
            </ul>
        </div>
   <div class="sellmanage-main mt-205">


        <!--审核中-->
        <div class="seller-01 " ref="tab">
            <div class="sellnage-connt mb-20" v-for="v in orderMobileList">

                <div class="manage-caption px-30  bg-fff">
                	<div class="manage-titl py-30 f28">
                        <span class=" fl mr-30 fontbold">{{v.title}}</span>
                        <!-- <i class="manage-titl-ico" v-if="v.goodsType == 2"></i> -->
                    </div>
                    <router-link :to="{name:'OrderMobileDetail',
                    query:{orderId:v.orderId,Id:v.id} }" @click.native="saveSrollTop()" v-if="v.goodsType !== 1">
                    <div class="manage-contn bg-faf">
                        <div class="mancon-img fl">
                            <i class="f22 color-fff bg-000">
                                {{v.goodsType|getGoodsTypeText}}
                            </i>
                            <span class="middle"></span>
                            <img src="../../../../assets/images/default_img.jpg" v-if="!v.goodsImg">
                            <img :src="v.goodsImg" v-if="v.goodsImg">
                        </div>
                        <div class="mancon-tn py-15">
                            <div class="tn-hxtxt f26 color-666">
                            {{v.gameName}}/{{v.regionName}}/{{v.serverName}}
                            </div>
                            <div class="tn-hxtxt f26 color-666 ">商品价格：{{v.totalAmount}}元</div>
                            <div class="tn-hxtxt f26 color-666" v-if="params.status != 2">发布时间：{{v.createTime|format}}</div>
                            <div class="tn-hxtxt f26 color-666" v-if="params.status == 2">下单时间：{{v.createTime|format}}</div>
                        </div>
                    </div>
                </router-link>
                <a  v-if="v.goodsType === 1"  @click="goToEquip(v)">
                       <div class="manage-contn bg-faf">
                        <div class="mancon-img fl">
                            <i class="f22 color-fff bg-000">
                                {{v.goodsType|getGoodsTypeText}}
                            </i>
                            <span class="middle"></span>
                            <img src="../../../../assets/images/default_img.jpg" v-if="!v.goodsImg">
                            <img :src="v.goodsImg" v-if="v.goodsImg">
                        </div>
                        <div class="mancon-tn py-15">
                            <div class="tn-hxtxt f26 color-666">
                            {{v.gameName}}/{{v.regionName}}/{{v.serverName}}
                            </div>
                            <div class="tn-hxtxt f26 color-666 ">商品价格：{{v.totalAmount}}元</div>
                            <div class="tn-hxtxt f26 color-666">发布时间：{{v.createTime|format}}</div>
                        </div>
                    </div>
                </a>
                </div>
                <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                	<span class="title-curent f30 pl-30 color-000 buyct-why">{{v.status|getStatusText}}　<em v-if="v.status==3 && v.sendTime && v.goodsType==2 && v.gameType==1" class="f26">预计到账时间：{{(v.sendTime+86700000)|format}}</em>　<i v-if="v.status!=4 &&v.complainResult">退款原因:{{v.complainResult|complainResultFilter}}</i></span>
                </div>
              <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                <a class="f30 color-m1 border border-color cancel fr" v-if="v.goodsType === 2" @click="
                contactCustom(v.orderId,v.id)">联系客服</a>
                <i class="titcur fr" @click="whyClick(v.orderId)" v-if="v.goodsType === 2"></i>
              </div>
            </div>
        </div>
   </div>
     <div class="loading" v-show="loading" >加载中...</div>
      <div  class="list-empty bg-fff" v-show="orderMobileList.length===0 && !loading">
        <p ><img src="~images/gamelogo.png"></p>
        <span >您还没有订单</span>
      </div>
   </div>
   </div>
</template>
<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import api from '../../../../api';
    import {complainResultFilter,cancelReasonFilter} from 'components/common/filters';
	export default{
		data(){
			return{
				params:{
                    status:this.$route.query.status,
                    pageIndex:1,
                    pageSize:10,
                },
                scrollTop:0,
                isAysnc:true,
                loading:false
			}
		},
         beforeRouteEnter (to, from, next){
            let vm = this;
            if (from.name === 'OrderMobileDetail') {
                next(vm=>{
                    vm.params.status = vm.mobileState.status;

                      if (vm.orderMobileList.length > 0) {
                        vm.params.status = vm.mobileState.status;
                    }else{
                        vm.params.status = vm.$route.query.status;
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
                orderMobileList: state => {
                    return state.orderMange.orderMobileList;
                },
                mobileAllLoaded:state =>{
                    return state.orderMange.mobileAllLoaded;
                },
                mobileState:state =>{
                    return state.orderMange.mobileState;
                }
            })
        },
        watch: {
            scrollTop(val, oldVal) {
                    var vm = this;
                    if (vm.$isBottom(200) && !vm.mobileAllLoaded) {
                        ++vm.params.pageIndex;
                        vm.getList();
                        //vm.getOrderMobileList(vm.params);
                    }
             }
        },
		created:function  () {
			let vm = this;
			vm.$bus.emit('headerText','手机端订单');
            vm.$nextTick(() => {
                document.body.scrollTop = vm.mobileState.scrollTop;
                document.documentElement.scrollTop = vm.mobileState.scrollTop;
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
             watchGoTop: function () {
                var vm = this;
                window.addEventListener('scroll', function () {
                    vm.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                });
            },
            goToEquip(v){
                if (v.status !== 2 && v.status !== 3 && v.status !== 8 && v.status !== 9 && v.status !== 10) {
                    return;
                };
                window.location.href = `/member/member-seller-equipment-transaction.html?orderId=${v.orderId}_${v.id}`
            },
            contactCustom(item,id){
                let vm = this;
                let params = {
                    orderId:item
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
                            window.location.assign(`/member/huanxin.html?orderId=${item}_${id}&isSeller=true`);
                        }
                    })
            },
            saveSrollTop:function  () {
                let vm = this;

                let params = {
                    scrollTop:vm.scrollTop,
                    status:vm.params.status
                }

                vm.setState(params);
            },
            initParams(){
                 this.params.pageIndex = 1;
                 this.clearMobilelist();
            },
			selectStatus:async function  (val) {
				let vm = this;

                vm.params.status = val;
                //设置为初始值
                vm.initParams();
                vm.getList();
			},
            async getList(){
              this.loading = true;
              this.getOrderMobileList(this.params).then((res)=>{
                   this.loading = false;
              });
            },
            ...mapActions({
                getOrderMobileList:'member/MEMBER_SELLER_ORDER_MOBILE_LIST',
                clearMobilelist:'member/MEMBER_SELLER_ORDER_MOBILE_CLEAR_LIST',
                setState:'member/MEMBER_SELLER_ORDER_MOBILE_STATE'
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
                        text = '待发货';
                        break;
                    case 3:
                        text = '已发货';
                        break;
                    case 4:
                        text = '交易完成';
                        break;
                    case 5:
                        text = '已退款';
                        break;
                    case 6:
                        text = '已取消';
                        break;
                    case 7:
                        text = '退款中';
                        break;
                    case 8:
                        text = '已付款';
                        break;
                    case 9:
                        text = '申请退款中';
                        break;
                    case 10:
                        text = '客服介入';
                        break;

                }
                return text;
            },
            complainResultFilter,
            cancelReasonFilter
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
