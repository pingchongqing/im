<template>
	<div id="wrapper" style="height:100%;">
    <!-- top -->
		<!-- <div class="top-header border-bottom">
				 <div class="top-back"><a href="/vue/memberseller"></a></div>
				 <h2 class="f36 ">我是卖家</h2>
				 <div class="top-right"><a class="back-home" href="/"></a></div>
		 </div> -->
	<div style="margin-top: 2.03rem"></div>
        <div class="sellnage-nav tab mt-97 fixed-top border20-bottom">
            <ul class="tab-nav">
                <li class="fl border-bottom f30" :class="{'active':params.status == 0}" @click="selectStatus(0)">
                    <a class="nav-01">审核中</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.status == 1}" @click="selectStatus(1)">
                    <a class="nav-02" >在售中</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.status == 4}" @click="selectStatus(4)">
                    <a class="nav-03">已售出</a>
                </li>
                <li class="fl border-bottom f30" :class="{'active':params.status == 2}" @click="selectStatus(2)">
                    <a class="nav-04" >已下架</a>
                </li>
            </ul>
        </div>
   <div class="sellmanage-main">

        <!--审核中-->
        <div class="seller-01 " ref="tab">
            <div class="sellnage-connt mb-20" v-for="v in mobileList">

                <div class="manage-caption px-30  bg-fff">
                	<div class="manage-titl py-30 f28">
						<span v-if="v.goodsEO.propertyValuesTitle" class=" fl mr-30 fontbold">
								{{v.goodsEO.propertyValuesTitle}}
						</span>
                        <span class=" fl mr-30 fontbold" v-else>
                            <!-- <em v-if="v.goodsPropertyEOList.length > 0">
                            【<em :class="{'ml8':index != 0}" v-for="(entity,index) in v.goodsPropertyEOList">
                             {{entity.attributeVal}}</em>】
                            </em> -->
                        {{v.goodsEO.title}}
                        </span>
                    </div>
                    <!-- <router-link :to="{name:'accountDetail',
                    params:{goodsId:v.goodsEO.goodsId,goods_source_type:0,gameType:v.goodsEO.gameType}}"
                    @click.native="saveSrollTop()"> -->
                    <a @click="goToDetail(v.goodsEO)">
                        <div class="manage-contn bg-faf">
                            <div class="mancon-img fl">
                                <i class="f22 color-fff bg-000">
                                    {{v.goodsEO.goodsType|getGoodsTypeText}}
                                </i>
                                <span class="middle"></span>
                                <img src="../../../../assets/images/default_img.jpg" v-if="!v.goodsEO.goodsImg">
                                <img :src="v.goodsEO.goodsImg" v-if="v.goodsEO.goodsImg">
                            </div>
                            <div class="mancon-tn py-15">
                                <div class="tn-hxtxt f26 color-666">
                                {{v.goodsEO.gameName}}/{{v.goodsEO.regionName}}/{{v.goodsEO.serverName}}
                                </div>
                                <div class="tn-hxtxt f26 color-666 " v-if = "v.goodsEO.goodsType==3">商品单价：{{v.goodsEO.price}}元</div>
                                <div class="tn-hxtxt f26 color-666 " v-if = "v.goodsEO.goodsType!=3">商品价格：{{v.goodsEO.price}}元</div>
                                <div class="tn-hxtxt f26 color-666" v-if="params.status != 2">发布时间：{{v.goodsEO.createTime|format}}</div>

                                <div class="tn-hxtxt f26 color-666" v-if="params.status == 2">下架时间：{{v.goodsEO.lastUpdateTime|format}}</div>
                            </div>
                        </div>
                    </a>
                    <!-- </router-link> -->
                </div>

                <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                	<span class="title-curent f30 pl-30 color-000 buyct-why">{{v.goodsEO.auditorStatus|getStatusText}}
                    <em class="color-m1">{{v.goodsEO.auditorStatus|getReason(params.status,v.goodsEO)}}</em>
                    </span>
                </div>
                <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                  <a class="f30 color-666 border"
                    v-if="v.goodsEO.goodsType === 2 &&  params.status != 0 && (params.status == 1 & v.goodsEO.isOnline)"
                     @click="shareClick(v)" >分享</a>

                    <router-link class="f30 color-666 border" @click.native="saveSrollTop()"
                    :to="{name:'EditAccountGoods',
                    query:{goodsId:v.goodsEO.goodsId,
                           gameId:v.goodsEO.gameId,goodsType:v.goodsEO.goodsType
                           }}"
                    v-if="params.status == 1 && v.goodsEO.goodsType === 2 && v.goodsEO.isOnline ">修改</router-link>

                    <!--金币编辑跳转-->
                    <a class="f30 color-666 border" @click="goToConins(v.goodsEO)"
                    v-if="params.status == 1 && v.goodsEO.goodsType === 3">编辑</a>

                    <!--装备编辑跳转-->
                    <a class="f30 color-666 border" @click="goToEquios(v.goodsEO)"
                    v-if="params.status == 1 && v.goodsEO.goodsType === 1">编辑</a>


                    <a class="f30 color-666 border" @click="isOnline(v.goodsEO.goodsId)"
                    v-if="params.status == 1 && v.goodsEO.isOnline && v.goodsEO.goodsType === 2">下架</a>
                    <!--账号pc账号编辑-->
                   <!--  <router-link class="f30 color-666 border" v-if="params.status == 2 && v.goodsEO.gameType !== 2
                    && v.goodsEO.goodsType === 2" @click.native="saveSrollTop()"
                    :to="{name:'goodsCreated',
                    query:{goodsId:v.goodsEO.goodsId,game_id:v.goodsEO.gameId,isquick:false,game_name:v.goodsEO.gameName,operation:2}}">
                    编辑上架</router-link> -->
                    <!--账号手游账号编辑-->
                    <router-link class="f30 color-666 border" v-if="params.status == 2 && v.goodsEO.goodsType === 2" @click.native="saveSrollTop()"
                    :to="{name:'GoodsCreatedMobile',
                    query:{goodsId:v.goodsEO.goodsId,game_id:v.goodsEO.gameId,isquick:false,game_name:v.goodsEO.gameName,chooseOperatorId:v.goodsEO.serviceProviderId,chooseOperator:v.goodsEO.serviceProviderName,operation:2,game_type:v.goodsEO.gameType}}">
                    编辑上架</router-link>
                    <!-- -->
                    <a class="f30 color-666 border" @click="deleteGoods(v.goodsEO.goodsId)"
                    v-if="params.status == 2 && v.goodsEO.goodsType == 2">删除</a>

                    <!--装备删除-->
                    <a class="f30 color-666 border" @click="deleteGoods(v.goodsEO.goodsId)"
                    v-if="(params.status == 1 || params.status == 0) && (v.goodsEO.goodsType == 1 ||v.goodsEO.goodsType == 3)">删除</a>

                    <a class="f30 color-666 border" @click="payDeposit(v.goodsEO.goodsId)"
                    v-if="params.status == 0 && v.goodsEO.goodsType == 1  && v.goodsEO.payStatus === 1">去支付</a>

                </div>
            </div>
        </div>
   </div>
   <shareComponent v-show="shareStatus" :shareUrl='sharemsg'></shareComponent>

    <div class="loading" v-show="loading" >加载中...</div>
      <div  class="list-empty bg-fff" v-show="mobileList.length===0 && !loading">
        <p ><img src="~images/gamelogo.png"></p>
        <span >您还没有商品</span>
      </div>
   </div>
</template>
<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import api from '../../../../api';
    import shareComponent from 'components/common/NewShare.vue'
	export default{
		data(){
			return{
                params:{
                    page:1,
                    pageSize:10,
                    status:this.$route.query.status
                },
                scrollTop:0,
                shareStatus:false,
                sharemsg:'',
                loading:false
			}
		},
         beforeRouteEnter (to, from, next){
            let vm = this;
            if ((from.name === 'EditAccountGoods'
                || from.name === 'accountDetail' || from.name === 'MGAccountDetail'
                || from.name === 'goodsCreated' ||
                from.name === 'GoodsCreatedMobile' || from.name === 'CreatedGold')) {
                next(vm=>{
                    if (!vm.isUpdate && vm.mobileList.length > 0) {
                        vm.params.status = vm.publicState.status;
                    }else{
                        if (vm.isUpdate) {
                            vm.params.status = 0;
                        }else{
                            vm.params.status = vm.$route.query.status;
                        }
                        vm.initParams();
                        vm.getList();
                    }
                });
            }else{
                next((vm)=>{
                     vm.initParams();
                     vm.getList();
                });
            }
         },
         components:{
            shareComponent
         },
         computed: {
            ...mapState({
                mobileList: state => {
                    return state.memberSeller.mobileList;
                },
                allLoaded:state =>{
                    return state.memberSeller.allLoaded;
                },
                publicState:state =>{
                    return state.memberSeller.publicState;
                },
                isUpdate:state =>{
                    return state.memberSeller.isUpdate;
                }
            })
        },
        watch: {
            scrollTop(val, oldVal) {
                    var vm = this;
                    if (vm.$isBottom(200) && !vm.allLoaded) {
                        ++vm.params.page;
                        vm.getList();
                    }
             }
        },
		created:function  () {
			let vm = this;
			//vm.$bus.emit('headerText','手机端发布的商品');

            vm.$nextTick(() => {
                document.body.scrollTop = vm.publicState.scrollTop;
                document.documentElement.scrollTop = vm.publicState.scrollTop
            })

		},
    mounted:function(){
        let vm = this;
        vm.watchGoTop();
        vm.$bus.emit('headerText','手机端发布的商品');
        vm.$bus.emit('isBack',false);
        vm.$bus.emit('callback',()=>{
            vm.$router.push({name:'MemberSeller'});
        });
        vm.$bus.emit('isMore',true);
    },
		methods:{
             goToDetail(v){
                let vm = this;
                vm.saveSrollTop();
                if (v.goodsType === 1) {

                };
                if (v.goodsType === 2) {
                    if (v.gameType === 2) { // 手游
                      vm.$router.push(
                        {name:'MGAccountDetail',
                          params:{goodsId:v.goodsId,goods_source_type:0}})
                    } else {
                      vm.$router.push(
                        {name:'accountDetail',
                          params:{goodsId:v.goodsId,goods_source_type:0,gameType:v.gameType}})
                    }

                };
                if (v.goodsType === 3) {

                };
             },
             payDeposit(id){
                let vm = this;
                window.location.href=`/publish/publish-deposit.html?goodsId=${id}`;
             },
             watchGoTop: function () {
                var vm = this;
                window.addEventListener('scroll', function () {
                    vm.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                });
            },
            goToConins(v){
                let vm = this;
                vm.saveSrollTop();
                vm.$router.push(
                {name:'CreatedGold',query:{
                    goodsId:v.goodsId,
                    game_type:v.gameType,
                    game_id:v.gameId,
                    mainGid:v.mainGid,
                    chooseOperatorId:v.serviceProviderId,
                    game_name:v.gameName,
                    chooseOperator:v.serviceProviderName
                }})
                // window.location.href = `/member/member-seller-gold-edit.html?goodsId=${v.goodsId}&gameId=${v.gameId}&raceId=&regionId=${v.regionId}&serverId=${v.serverId}&goodsType=${v.goodsType}`;

            },
            goToEquios(v){
                let vm = this;

                window.location.href = `/member/member-seller-equipment-edit.html?goodsId=${v.goodsId}&gameId=${v.gameId}&raceId=&regionId=${v.regionId}&serverId=${v.serverId}&goodsType=${v.goodsType}`;
            },
            shareClick(v) {
              let title =v.goodsEO.propertyValuesTitle || v.goodsEO.title;
              let url = '';
              if(v.goodsEO.gameType === 2){ // 手游
                url = `${title} ${window.location.origin}/vue/mobile-game/account-detail/${v.goodsEO.goodsId}/0`;
              } else {
                url = `${title} ${window.location.origin}/vue/account/accountDetail/${v.goodsEO.goodsId}/0/${v.goodsEO.gameType}`;
              }

              this.sharemsg =url;
               this.$bus.emit('busShareQZone',{
                title: v.goodsEO.title,
                url: encodeURIComponent(url),
                summary: v.goodsEO.title
              })
              this.shareStatus = true
              this.$bus.emit('shareShow', this.shareStatus)
              this.$bus.emit('busShareUrl', url)

            },
            saveSrollTop:function  () {
                let vm = this;
                let params = {
                    scrollTop:vm.scrollTop,
                    status:vm.params.status
                }
                vm.setPublicState(params);
                vm.setUpdateStatus(false);
            },
            initParams(){
                 this.params.page = 1;
                 this.clearMobilelist();
            },
			selectStatus:function  (val) {
				let vm = this;
                vm.params.status = val;
                //设置为初始值
                vm.initParams();
                vm.getList();
			},
            deleteGoods(id){
                let vm = this;
                let params = {
                    goodsId:id
                }
             vm.$messagebox.confirm('确定要删除吗?').then((action)=>{
                  api.memberSeller.deleteMoblieGoods(params)
                     .then((res)=>{
                        if (res.data.success) {
                            vm.$toast('删除成功');
                            vm.initParams();
                            vm.getList();
                        };
                     })
             })

            },
            isOnline:function  (goodsId) {
              let vm = this;
              let params = {
                    goodsId:goodsId,
                    isOnline:false
              }
              vm.$messagebox.confirm('确定要下架吗?')
              .then((action) => {
                    api.memberSeller.online(params)
                     .then((res)=>{
                        if (res.data.success) {
                            vm.$toast('下架成功');
                            vm.initParams();
                            vm.getList();
                        };
                     })
                });
            },
            async getList(){
              this.loading = true;
              await this.getMobileList(this.params)
                         .then((res)=>{
                                this.loading = false;
               });
            },
            ...mapActions({
                getMobileList:'member/MEMBER_SELLER_MOBILE_LIST',
                clearMobilelist:'member/MEMBER_SELLER_CLEAR_MOBILELIST',
                setPublicState:'member/MEMBER_SELLER_GOODS_MOBILE_PUBLICSTATE',
                setUpdateStatus:'member/MEMBER_SELLER_GOODS_UPDATE_STATUS'
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
                if (val == 0) {
                    text = '商品审核中';
                }else if(val == 1){
                    text = '商品已上架出售';
                }else if(val == 2){
                    text = '商品已下架';
                }else if(val == 4){
                    text = '商品已售出';
                }

                return text;
            },
            getReason:function  (value,status,v) {
                let vm = this;
                let text ='';
                if (v.goodsType != 2) {
                    return;
                };
                if (status == 0) {
                    text = '提交成功，为使帐号尽快出售，5173客服会马上登录您的游戏，进行帐号确认，请您20分钟内不要进游戏';
                }
                if (status == 1 && !v.isOnline) {
                    text = '商品已有买家购买，目前正在交易中';
                };
                if (status == 2) {
                    switch(v.auditorReason){
                        case 1:
                            text = '帐号密码错误'
                            break;
                        case 2:
                            text = '标题带联系方式或者违规字眼';
                            break;
                        case 3:
                            text = '图片违规或者带有联系方式';
                            break;
                        case 4:
                            text = v.auditorOtherReason;

                    return '审核失败，原因:' + text;
                    }
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
    .ml8{
        margin-left: 8px;
    }

  /*  .sellnage-nav{
            position: fixed;
    width: 100%;
    z-index: 99;
    }*/
</style>
