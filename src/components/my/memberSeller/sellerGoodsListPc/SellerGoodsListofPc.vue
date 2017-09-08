<template>
    <div id="wrapper" style="height:100%;">
    <!-- top -->
   <!--   <div class="top-header border-bottom">
         <div class="top-back"><a href="/vue/memberseller"></a></div>
         <h2 class="f36 ">我是卖家</h2>
         <div class="top-right"><a class="back-home" href="/"></a></div>
     </div> -->
    <div class="fixedspace" style="margin-top: 1.03rem"></div>
        <div class="sellnage-nav fixed-top mt-97 border20-bottom">
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
            <div class="sellnage-connt mb-20" v-for="v in pcList">

                <div class="manage-caption px-30  bg-fff">
                    <div class="manage-titl py-30 f28">
                        <span class=" fl mr-30 fontbold">{{v.GoodsName}}</span>
                        <!-- <i class="manage-titl-ico"></i> -->
                    </div>
                    <!--  <router-link :to="{name:'accountDetail', 
                    params:{goodsId:v.BizOfferId,goods_source_type:1,gameType:2}}"
                    @click.native="saveSrollTop()"> -->
                    <a @click="goDetail(v)">
                    <div class="manage-contn bg-faf">
                        <div class="mancon-img fl">
                            <i class="f22 color-fff bg-000">
                                游戏帐号
                            </i>
                            <span class="middle"></span>
                            <img v-if="v.Image" :src="v.Image.OriginalUrl">
                            <img v-if="!v.Image" src="../../../../assets/images/default_img.jpg">
                        </div>
                        <div class="mancon-tn py-15">
                            <div class="tn-hxtxt f26 color-666">
                            {{v.GameName}}/
                            {{v.GameServerName}}
                            <!-- /{{v.goodsEO.regionName}}/{{v.goodsEO.serverName}} -->
                            </div>
                            <div class="tn-hxtxt f26 color-666 ">商品价格：{{v.Price}}元</div>
                            <div class="tn-hxtxt f26 color-666" v-if="params.status != 2">发布时间：{{v.CreatedDate|format}}</div>
                            <div class="tn-hxtxt f26 color-666" v-if="params.status == 2">下架时间：{{v.LastModified|format}}</div>
                        </div>
                    </div>
                    </a>
                    <!-- </router-link> -->
                </div>
                <div class="mancon-titl py-30 px-30 bg-fff border-bottom ">
                    <span class="title-curent f30 pl-30 color-000 buyct-why">{{v.PublishStatus|getStatusText}}
                     <em class="color-m1" v-if="v.PublishStatus === 4">{{v.CancelReason}}</em>
                    </span>
                </div>
                <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                    <a class="f30 color-666 border" v-if="v.PublishStatus === 2 "  @click="shareClick(v)" >分享</a>

                   <!--  <router-link class="f30 color-666 border" @click.native="saveSrollTop()"
                    :to="{name:'EditSellerGoodsPc',query:{goodsId:v.BizOfferId,modify:true,game_name:v.GameName}}"
                    v-if="v.PublishStatus == 2 ">修改</router-link> -->

                    <a class="f30 color-666 border" @click="isOnline(v.BizOfferId)"
                    v-if="v.PublishStatus == 2">下架</a>

                    <router-link class="f30 color-666 border" v-if="v.PublishStatus == 5 || v.PublishStatus == 4"
                     @click.native="saveSrollTop()"
                    :to="{name:'EditSellerGoodsPc',query:{goodsId:v.BizOfferId,game_name:v.GameName}}">
                    编辑上架</router-link>
                    <a class="f30 color-666 border" @click="deleteGoods(v.BizOfferId)" 
                    v-if="v.PublishStatus == 4 || v.PublishStatus == 5">
                    删除</a>
                </div>
            </div>
        </div>
   </div>
   <shareComponent v-show="shareStatus" :shareUrl='sharemsg'></shareComponent>
    <div class="loading" v-show="loading" >加载中...</div>
      <div  class="list-empty bg-fff" v-show="pcList.length===0 && !loading">
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
                    status:this.$route.query.status,
                },
                loading:false,
                scrollTop:0,
                shareStatus:false,
                sharemsg:'',
            }
        },
        components:{
            shareComponent
        },
         beforeRouteEnter (to, from, next){
            let vm = this;
            if ((from.name === 'EditSellerGoodsPc' || from.name === 'accountDetail' || from.name === 'MGAccountDetail')) {
                next(vm=>{
                    if (!vm.isUpdate && vm.pcList.length > 0) {
                        vm.params.status = vm.publicStatePc.status;
                    }else{
                        if (from.name === 'EditSellerGoodsPc' && vm.isUpdate) {
                            vm.params.status = 0;    
                        }else{
                            vm.params.status = vm.$route.query.status;
                        }
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
                pcList: state => {
                    return state.memberSeller.pcList;
                },
                allLoadedPc:state =>{
                    return state.memberSeller.allLoadedPc;
                },
                publicStatePc:state =>{
                    return state.memberSeller.publicStatePc;
                },
                isUpdate:state =>{
                    return state.memberSeller.isUpdate;
                }
            })
        },
        watch: {
            scrollTop(val, oldVal) {
                    var vm = this;
                    if (vm.$isBottom(200) && !vm.allLoadedPc) {
                        ++vm.params.page;
                        vm.getList();
                        //vm.getMobileList(vm.params);
                    }
             }
        },
        created:function  () {
            let vm = this;
            vm.$bus.emit('headerText','电脑端发布的手游商品');
            vm.$bus.emit('showHeader',true);

            vm.$bus.emit('isBack',false);
            vm.$bus.emit('callback',()=>{
                vm.$router.push({name:'MemberSeller'});
            });
            vm.$nextTick(() => {
                document.body.scrollTop = vm.publicStatePc.scrollTop;
                document.documentElement.scrollTop = vm.publicStatePc.scrollTop;
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
             watchGoTop: function () {
                var vm = this;
                window.addEventListener('scroll', function () {
                    vm.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                });
            },
             shareClick(v) {
//              let url = `${v.GoodsName} ${window.location.origin}/vue/account/accountDetail/${v.BizOfferId}/1/2`;
              let url = `${v.GoodsName} ${window.location.origin}/vue/mobile-game/account-detail/${v.BizOfferId}/1`;
               this.sharemsg =url;

               this.$bus.emit('busShareQZone',{
                title: v.title,
                url: encodeURIComponent(url),
                summary: v.GoodsName
              })
              this.shareStatus = true
              this.$bus.emit('shareShow', this.shareStatus)
              this.$bus.emit('busShareUrl', url)

            },
            goDetail(v){
                let vm = this;
                if (v.PublishStatus  === 4 || v.PublishStatus === 5) {
                    return;
                };
                vm.saveSrollTop();
//                vm.$router.push({name:'accountDetail',
//                    params:{goodsId:v.BizOfferId,goods_source_type:1,gameType:2}})
                vm.$router.push({name:'MGAccountDetail',
                    params:{goodsId:v.BizOfferId,goods_source_type:1}})
            },
            saveSrollTop:function  () {
                let vm = this;

                let params={
                    scrollTop:vm.scrollTop,
                    status:vm.params.status,
                    update:false
                }
                vm.setPublicStatePc(params);
                vm.setUpdateStatus(false);
            },
            initParams(){
                 this.params.page = 1;
                 this.clearPcList();
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
                let params={
                    goodsId:id
                }
                 vm.$messagebox.confirm('确定要删除吗?').then((action)=>{
                      api.memberSeller.deletePcGoods(params)
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
              let params ={
                    goodsId:goodsId,
                    isOnline:false
              }
              vm.$messagebox.confirm('确定要下架吗?').then((action) => {
                    api.memberSeller.onlinPc(params)
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
                let vm = this;
                vm.loading = true;
               await this.getPcList(this.params).then((res)=>{
                vm.loading = false;
               });
            },
            ...mapActions({
                getPcList:'member/MEMBER_SELLER_PC_LIST',
                clearPcList:'member/MEMBER_SELLER_CLEAR_PCLIST',
                setPublicStatePc:'member/MEMBER_SELLER_GOODS_PC_PUBLICSTATE',
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
                if (val === 1) {
                    text = '商品审核中';
                }else if(val === 2){
                    text = '商品已上架出售';
                }else if(val === 3){
                    text = '暂停';
                }else if(val === 4){
                    text = '审核失败';
                }else if(val === 5){
                    text = '停止出售';
                }else if(val === 6){
                    text = '商品已售出';
                }else if(val === 7){
                    text = '商品已有买家购买，目前正在交易中';
                }else if(val === 8){
                    text = '已删除';
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
