

<template>
  <div >
    <div class="fixedFill"></div>
	<div class="fixedspace"></div>
	<!-- 详情 -->
	<div class="detail-main pb-200 bg-f1 fw">
		<div class="detail-content  fw bg-fff">
			<!-- 大于8张图片 -->
			<div class="swiper-container border-bottom piccont" @click="show(0)">
				<div class="swiper-wrapper text-center middle" :style="{width:midwidth}">
          <img v-show="firstImage" :src="firstImage" class="previewer-demo-img" />
          <img v-show="noImage" src="~images/default_img_info.jpg" style="width:100%;margin-top:-3px;" class="previewer-demo-img" />
				</div>
				<div class="swiper-tip text-center color-fff f28" v-show="imageList.length>0">
					<span v-show="imageList.length>0">点击查看（共{{imageList.length}}张图片）</span>
				</div>
		</div>
			<div class="detail-bt fw text-left">
				<span class="detail-left fl f32 color-000">{{goodsInfo.title||goodsEO.Title||goodsEO.propertyValuesTitle||goodsEO.title}}</span>
				<span class="detail-right shareopen fr f24 text-center mr-30 mt-30" @click="shareClick">分享</span>
			</div>
			<div class="detail-tutorial f32 border-top fr text-left border-bottom lh">
        <div class="fl" v-show="overtime">商品有效期：{{overtime}}</div>
        <div class="fr">
  				<span v-show="goodsInfo.browse_count">浏览<em>{{goodsInfo.browse_count}}</em></span>
  				<a @click="processClick">购买流程</a>
        </div>
			</div>
			<div class="search-game border-bottom fw border-20" v-show="bindCard||bindMob||bindEmail">
				<div class="sgame fw bg-fff f32">
					<span>绑定信息</span>
				</div>
			</div>
			<div class="rechseach-titl bg-fff  f32 border-bottom fw" v-show="bindCard||bindMob||bindEmail">
				<span class="identity f30 ml-30" v-show="bindCard" :class="{'color-m1': bindCard=='身份证已绑定'}">
          <i :class="bindCard=='身份证已绑定'?'icon_identity_red':'icon_identity'"></i>
          {{bindCard}}
        </span>
				<span class="phone f30 " v-show="bindMob" :class="{'color-m1': bindMob=='手机号已绑定'}">
          <i :class="bindMob=='手机号已绑定'?'icon_phone_red':'icon_phone'"></i>
          {{bindMob}}
        </span>
				<span class="emain f30" v-show="bindEmail" :class="{'color-m1': bindEmail=='邮箱已绑定'}">
          <i :class="bindEmail=='邮箱已绑定'?'icon_emain_red':'icon_emain'"></i>
          {{bindEmail}}
        </span>
			</div>
			<div class="search-game border-bottom fw border-20">
				<div class="sgame fw bg-fff f32">
					<span>商品描述</span>
				</div>
			</div>
			<div class="rechseach-titl bg-fff   border-bottom  fw px-30">
				<div class="sto_mes f30 fl">游戏区服</div>
				<div class="sto_right f30 fr text-left">
          {{qf}}
        </div>
			</div>

			<div
        class="rechseach-titl bg-fff   border-bottom  fw px-30"
        v-for="elem in ptrList" :key="elem.id"

      >
				<div class="sto_mes f30 fl">{{elem.attributeName}}</div>
				<div class="sto_right f30 fr text-left">{{elem.attributeVal}}</div>
			</div>

		</div>

		<div class="search-game border-bottom fw border-20" v-show="goodsEO.isAxm||goodsInfo.is_robot_capture==='true'">
			<div class="sgame fw bg-fff f32">
				<span>安全保障服务</span>
			</div>
		</div>
		<div class="rechseach-titl bg-fff  f32 border-bottom fw pl-30">
			<span class="axm f30 color-m1 pl-20" v-show="goodsEO.isAxm" @click="axmClick">安心买服务</span>
			<span class="rech_ge f30 pl-40" v-show="goodsInfo.is_robot_capture==='true'">官方截图认证</span>
		</div>

    <div class="search-game border-bottom fw border-20" v-show="eosigns.length>0">
      <div class="sgame fw bg-fff f32">
        <span>安全保障服务</span>
      </div>
    </div>
    <div class="pcOrder03 bg-fff  f32 border-bottom fw pl-30" v-show="eosigns.length>0">
      <ul>
        <li v-for="elem in eosigns" :key="elem.Id">
          <i></i>{{elem.Id}}
        </li>
      </ul>
    </div>

	</div>
	<!-- 固定底部 -->
	<div class="fixed-button3 border-top" data-style="fixed-bottom" v-show="!processShow">
		<div class="redbutton">
			<span>一口价：<em>￥{{goodsEO.price||goodsEO.Price}}</em></span></span>
      <a class="tobuy" :class="{'button-disable':disableStatus}" @click="Buy">{{buytext}}</a>
		</div>
	</div>
  <!--安心买弹窗提示-->
	<!-- <div class="axm_alert bg-fff" v-show="axmStatus">
		<div class="fortunel-main">
			<div class="rtun-plo f36">提示</div>
			<div class="rtun_lf f32">该商品已加入安心买，若发生找回、封号时，卖家承诺最高全退款</div>
			<div class="rtun-btn" @click="axmClick"><a class="dialog_close bg-m1 color-fff f36">关闭</a></div>
		</div>
	</div>
  <div class="dialog_cover1" v-show="axmStatus" @click="axmClick"></div> -->

  <!--商品列表下拉-更多消息-->
  <!--<div class="more_message border f36" v-show="moreStatus">
  <ul>
    <li class="list-more border-bottom"  @click="messageClick"><i class="android"></i>消息</li>
    <li class="list-more border-bottom shareopen" @click="shareClick"><i class="sharew"></i>分享</li>
    <li class="list-more" @click="homeClick"><i class="home_back"></i>首页</li>
  </ul>
</div>-->

  <!--<div class="mstfiv" style="z-index:45" v-show="moreStatus" @click="mstfivClick"></div>-->

  <share :shareUrl='sharemsg'></share>
  <pcess :processShow="processShow" @sonProcessShow="sonProcessShow"></pcess>
  <previewer :list="imageList" ref="previewer" ></previewer>
  <loading-component></loading-component>

</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import loadingComponent from 'components/common/Loading.vue'
import share from '../common/NewShare.vue'
import pcess from 'components/help/Process'
import previewer  from './AccountPreviwer.vue'
export default {
  data() {
    return {
      axmStatus: false,
      processShow: false,
      relievedShow: false,
      noImage: false,
      sharemsg: '',
      midwidth: window.innerWidth + 'px',
    }
  },
  components: {
    share,
    pcess,
    loadingComponent,
    previewer
  },
  computed: {
    qf() {
      let spname = this.goodsEO.serviceProviderName?this.goodsEO.serviceProviderName+'/':''
      let regname = this.goodsEO.regionName?this.goodsEO.regionName+'/':''
      let sername = this.goodsEO.serverName?this.goodsEO.serverName:''
      let pca = this.goodsEO.GameAreaName?this.goodsEO.GameAreaName+'/':''
      let pcs = this.goodsEO.GameServerName?this.goodsEO.GameServerName:''
      return spname + regname + sername + pca + pcs
    },
    buytext() {
      if (this.disableStatus) {
        return '无法购买'
      } else {
        return '立即购买'
      }
    },
    xqtitle() {
      if (this.pList.length>0) {
        let attr='';
        this.pList.forEach(elem => {
          attr+=' '+elem.attributeVal
        })
        return '【'+attr+'】'+this.goodsEO.title
      } else {
        return this.goodsEO.title
      }
    },
    ...mapState({
      goodsEO: state => {
        return state.account.goodsEO
      },
      goodsInfo: state => {
        return state.account.goodsInfo
      },
      pList: state => {
        return state.account.pList
      },
      imageList: state => {
        return state.account.imageList
      },
      errMsg: state => {
        return state.account.errMsg
      },
      warnMsg: state => {
        return state.account.warnMsg
      },
    }),
    ...mapGetters({
      overtime: 'account/OVERTIME',
      ptrList: 'account/PTRLIST',
      bindCard: 'account/BINDCARD',
      bindEmail: 'account/BINDEMAIL',
      bindMob: 'account/BINDEMOB',
      firstImage: 'account/FIRSTIMAGE',
      eosigns: 'account/EOSIGNS',
      disableStatus: 'account/DISABLESTATUS'
    })
  },
  watch: {
   /* moreStatus(sta) {
      this.$bus.emit('headMoreStatus', sta)
    },*/
    errMsg (msg) {
      if (msg && Object.keys(msg).length > 0) {
        this.$messagebox({
          title: '提示',
          message: msg.message,
          closeOnClickModal: false
        }).then(()=>{
          this.clearErr()
          if (msg.returnUrl) {
            location.href = msg.returnUrl
          }
        })
      } else {
        if (document.getElementsByClassName("mint-msgbox-wrapper").length > 0) {
          this.$messagebox.close()
        }
      }
    },
    warnMsg (msg) {
      if (msg && Object.keys(msg).length > 0) {
        this.$toast({
          message: msg.message,
          duration: msg.duration || 2500,
          position: msg.position || 'middle'
        })
        if (msg.duration) {
          setTimeout(() => {
            this.clearWarn()
          }, msg.duration)
        } else {
          setTimeout(() => {
            this.clearWarn()
          }, 3000)
        }
      }
    },
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/vue/choice/goodsList') {
      next(vm => {
        vm.clearGoodsEO()
      })
    } else (
      next()
    )

  },
  mounted: function mounted() {
    this.setDefault()
    this.$nextTick(()=>{
      setTimeout(()=>{
        if (!this.firstImage) {
          this.noImage = true
        }
      }, 500)
    })
    this.$bus.emit('isMore', true)
    this.$bus.on('moreStatus', sta => {
      this.moreStatus = sta
    })
  },
  beforeDestroy: function beforeDestroy() {
    this.$bus.emit('shareShow', false)
  },
  methods: {
    mstfivClick() {
      this.moreStatus = false
    },
    show (index) {
      if (this.firstImage) {
        this.$refs.previewer.show(index)
      }
    },
    Buy() {
      if (!this.disableStatus) {
        if (parseInt(this.$route.params.goods_source_type) === 1) {
          location.href = "/pc/pc-order-account.html?vbizOfferId=" + this.$route.params.goodsId
        } else {
          location.href = "/order/order-acco.html?goodsid=" + this.$route.params.goodsId+"&price="+this.goodsEO.price
			cosnole.log(location.href);
        }
      }
    },
    processClick () {
      this.processShow = !this.processShow
    },
    sonProcessShow (val) {
      this.processShow = val
    },
    shareClick() {
      this.shareStatus = true
      this.moreStatus = false
      this.$bus.emit('shareShow', this.shareStatus)
      this.$bus.emit('busShareUrl', window.location.href)
    },
    homeClick() {
      location.href = '/'
    },
    messageClick() {
      location.href = '/member/message.html'
    },
    setDefault:  async function setDefault() {
      let arg;
      let pname, rname, sname;
      if (this.$route.params.goods_source_type == 1) {
        arg = {
          BizOfferId: this.$route.params.goodsId
        }
      } else {
        arg = {
          goodsId: this.$route.params.goodsId
        }
      }
      await this.getGoodsEO(arg)
      await this.getGoodsInfo(this.$route.params.goodsId)
      this.$bus.emit('headerText', this.goodsEO.gameName||this.goodsEO.GameName)
      //神策开始
      var self = this;
      var gameTypeName,isLog,propertyValues = [],property="";
      this.$getAccount().then(account=>{
        if(account){
          isLog = true;
        }else{
          isLog = false;
        };
        if(this.goodsEO.PropertyValues){
          for(let i=0;i<this.goodsEO.PropertyValues.length;i++){
          propertyValues.push(this.goodsEO.PropertyValues[i]);
          };
          for(let i=0;i<propertyValues.length;i++){
            property += propertyValues[i].Key+":"+propertyValues[i].Value+";"
          };
        };
        sa.track("goodsDetails",{
          platfromType:"H5",
          belongGame:this.goodsEO.GameName,
          gameType:"端游",
          belongArea:this.goodsEO.GameName+this.goodsEO.GameAreaName+this.goodsEO.GameServerName,
          gameCompany:this.goodsEO.GameName,
          goodsDynamicProperties:property,
          goodsWeight:this.goodsInfo.sort_score,
          goodsSum:Number(this.goodsEO.Price),
          goodsPrice:this.goodsEO.Price.toString(),
          isLogin:isLog
        });
        sa.quick('autoTrack');
      });
      
      //神策结束
      /*
      * 分享数据，可选参数
      * url, 分享的链接，如果不传则会自动获取浏览器地址
      * title, 分享的标题
      * summary, 分享的简介
      */
      this.$bus.emit('busShareQZone',{
        title: pname + rname + sname,
        url: encodeURIComponent(location.href),
        summary: this.xqtitle ||this.goodsEO.Title
      })
      this.sharemsg = this.xqtitle +' '+ location.href
      this.addBrowerNum({goodsId:this.$route.params.goodsId})
    },
    axmClick: function axmClick() {
      this.$router.push('/vue/help/relieved')
    },
    ...mapActions({
      getGoodsEO: 'account/A_GETGOODS',
      getGoodsInfo: 'account/A_GETGOODSINFO',
      addBrowerNum: 'account/A_ADDBROWERNUM',
      clearGoodsEO: 'account/A_CLEARGOODSEO',
      clearErr: 'account/CLEAR_ERR',
      clearWarn: 'account/CLEAR_WARN',
    })
  }
}
</script>
<style src='css/common/list-cl.css' scoped></style>
<style scoped>
.lh {
  line-height:1rem !important;
}
.txtcont {

}
.piccont {
  width: 100%;
  position: relative;
}
.middle {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 4.32rem;
  line-height: 4.32rem;
}
.more_message {
  display: block;
  position: fixed;
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
.swiper-container img {
  max-height: 100%;
  max-width: 100%;
  display: inline;
}
.pcOrder03 ul {
  padding-top: .3rem;
}
.pcOrder03 ul li {
    float: left;
    width: 33.33%;
    box-sizing: border-box;
    padding-left: .1rem;
    padding-bottom: .3rem;
    line-height: .5rem;
}
.pcOrder03 ul li i {
    float: left;
    display: inline-block;
    margin-right: .1rem;
    background: url(~images/icon-gou.png) center center no-repeat;
    background-size: .2rem;
    border: 1px solid #34bb3a;
    width: .45rem;
    height: .45rem;
    border-radius: 100%;
}

</style>
