<template>
  <div >

	<!-- 详情 -->
	<div class="detail-main pb-200 bg-f1 fw mt-97">
		<div class="detail-content  fw bg-f1">
			<!-- 大于8张图片 -->
			<div class="swiper-container border-bottom piccont  bg-000" @click="show(0)" v-show="firstImage && !noImage">
				<div class="swiper-wrapper text-center middle" :style="{width:midwidth}">
          <img v-show="firstImage" :src="firstImage" class="previewer-demo-img" />
          <img v-show="!firstImage && noImage" src="~images/default_img_info.jpg" style="width:100%;" class="previewer-demo-img" />
				</div>
				<div class="swiper-tip text-center color-fff f28" v-show="imageList.length>0">
					<span v-show="imageList.length>0">点击查看（共{{imageList.length}}张图片）</span>
				</div>
		</div>

      <div class="detail-bt border-bottom p-30 bg-fff ">
        <span class="detail-left fl ">
                  <p class="f32 color-000">{{goodsInfo.title||goodsEO.Title||goodsEO.propertyValuesTitle||goodsEO.title}}</p>
                    <em class="mt-20 f30 color-666">库存<i class="color-m1 ml-15">{{goodsEO.Quantity||goodsEO.blanceNum}}件</i></em>
                </span>
        <span class="detail-right mt-15 fr f24 text-center" @click="shareClick" v-show="!isApp">分享</span>
      </div>

      <!--首次出售 截图认证 安心买-->
      <div class="detail-tutorial f32 border-bottom bg-f8 px-30 " v-if="eosigns.length>0" @click="popupVisible=true">
        <div class="hrgames-cfi f26 color-666 fl">
        <i class="firm mr-30 " v-for="elem in eosignsFilter" >{{idfilter(elem.Id)}}</i></div>
        <a href="javascript:;" class="sharembgs"  @click="popupVisible=true"></a>
      </div>

      <div class="detail-tutorial f32 border-bottom bg-f8 px-30 " v-if="goodsEO.isAxm&&goodsInfo.goods_source_type!='1'"  @click="popupVisible=true">
        <div class="hrgames-cfi f26 color-666 fl">
        <i class="firm mr-30 " v-if="goodsEO.isAxm" >安心买</i></div>
        <a href="javascript:;" class="sharembgs"  @click="popupVisible=true"></a>
      </div>

      <div class="detail-tutorial f32 bg-fff border-top mt-20" v-show="goodsInfo.goods_source_type!='1'">
        <NumberInput
          :min=1
          :max="parseInt(goodsEO.blanceNum?goodsEO.blanceNum:goodsEO.Quantity)"
          :fillable=false
          v-model="eqNum"
          :title="'购买数量'"
        >
        </NumberInput>
      </div>

      <!--首次出售 截图认证 安心买 说明-->
      <mt-popup
        v-model="popupVisible"
        position="bottom" style="width: 100%">
        <div class="sv-guarantee border-top bg-fff">
          <div class="scgtee-titl f32 color-666 border-bottom">
            <a class="close mr-30" @click="popupVisible=false"></a>服务保障
          </div>
          <div class="scgtee-demo px-30 border-bottom" v-if="goodsEO.isAxm&&goodsInfo.goods_source_type!='1'">
            <div class="sgde-lf fl">
              <i class="an-seller" name="安心买" ></i>
            </div>
            <div class="sgde-tn">
              <div class="tn-til f28 color-000">安心买</div>
              <div class="tn-txt f28 color-666 mt-10">该商品已加入安心买，若发生找回，封号时，卖家承诺最高全款退款。</div>
            </div>
          </div>
          <div class="scgtee-demo px-30 border-bottom" v-for="item in eosignsFilter">
            <div class="sgde-lf fl">
              <i class="ji" name="寄售交易" v-if="item.Id=='寄售交易'"></i>
              <i class="ktou" name="可投保" v-if="(item.Id=='商品保障险'||item.Id=='交易安全险')&&isketou"></i>
              <i class="tou" name="已投保" v-if="(item.Id=='商品保障险'||item.Id=='交易安全险')&&isyitou"></i>
              <i class="tou" name="已投保" v-if="item.Id=='卖家保险'"></i>
              <i class="pei" name="无货赔付" v-if="item.Id=='无货赔付'"></i>
              <i class="an" name="安心买" v-if="item.Id=='安心买'&&goodsInfo.biz_offer_flag&&goodsInfo.biz_offer_flag.indexOf('心买')>-1"></i>
              <i class="an-seller" name="安心买" v-else-if="item.Id=='安心买'"></i>
              <i class="shi" name="超时赔付" v-if="item.Id=='超时赔付'"></i>
              <i class="bao" name="担保交易" v-if="item.Id=='担保交易'"></i>
            </div>
            <div class="sgde-tn">
              <div class="tn-til f28 color-000">{{idfilter(item.Id)}}</div>
              <div class="tn-txt f28 color-666 mt-10">{{item.Value}}</div>
            </div>
          </div>
          <div class="mt-30 bg-m1 f36 color-fff text-center sgde-btn" @click="popupVisible=false">朕知道了</div>
        </div>
      </mt-popup>



      <!-- 绑定信息开始 -->
			<div class="search-game border-bottom fw border-20" v-show="bindCard||bindMob||bindEmail">
				<div class="sgame fw bg-fff f32">
					<span>绑定信息</span>
				</div>
			</div>
			<div class="mbgamelist-auth bg-fff  f32 border-bottom fw pl-30" v-show="bindCard||bindMob||bindEmail">
        <ul>
          <li v-if="bindCard" class="fl" :class="{active: bindCard=='身份证未绑定'}"><span class="card f26 ">
            {{bindCard}}</span></li>
          <li v-if="bindMob" class="fl" :class="{active: bindMob=='手机号未绑定'}"><span class="mobile f26">
            {{bindMob}}</span></li>
          <li v-if="bindEmail" class="fl" :class="{active: bindEmail=='邮箱未绑定'}"><span class="email f26 ">
            {{bindEmail}}</span></li>
        </ul>
			</div>
      <!-- 绑定信息结束 -->


      <div class="mbgame-iftion border-bottom mt-20">
        <div class="iftdemo fl "><a class="text-center bg-f8 f32 " :class="{active: barShow}" @click="barShow = true">商品描述</a></div>
          <div class="iftdemo fl "><a class="text-center bg-f8 f32 " :class="{active: !barShow}"
                                      @click="barShow = false">交易说明</a></div>
      </div>


      <!-- 商品描述开始 -->
      <div class="describe" v-show="barShow">
  			<div class="rechseach-titl bg-fff   border-bottom  fw px-30">
  				<div class="sto_rent f30 fl">游戏区服</div>
  				<div class="sto_rerg f30 fr text-left">
            {{qf}}
          </div>
  			</div>
  			<div
          class="rechseach-titl bg-fff   border-bottom  fw px-30"
          v-for="elem in ptrList" :key="elem.id"
          v-if="elem.attributeVal&&elem.attributeName&&elem.attributeName!='精品属性'"
        >
  				<div class="sto_rent f30 fl">{{elem.attributeName}}</div>
  				<div class="sto_rerg f30 fr text-left">{{elem.attributeVal}}</div>
  			</div>

        <div class="rechseach-titl bg-fff   border-bottom  fw px-30" v-show="goodsEO.Content||goodsEO.description">
          <div class="sto_rent f30 fl">卖家描述</div>
          <div class="sto_rerg f30 fr text-left sto-height">
          {{goodsEO.Content||goodsEO.description}}
          </div>
        </div>

      </div>
      <!-- 商品描述结束 -->
      <!-- 交易说明开始 -->
      <div class="clearfix"></div>
      <div class="explainn bg-fff" v-show="!barShow">
        <div class="explain-coner">
          <div class="excon-titl color-m1"><i class="one fl">1</i><span class="fl ml-15 f30">下单支付</span></div>
          <div class="excon-titl excon-hihg py-20"><i class="fl">1</i><span
            class="fl ml-15 f28 color-666">选择商品后付款</span></div>
          <div class="excon-titl color-m1"><i class="two fl">1</i><span class="fl ml-15 f30">等待发货</span></div>
          <div class="excon-titl excon-hihg py-20"><i class="fl">1</i><span class="fl ml-15 f28 color-666">联系客服进行交易</span>
          </div>
          <div class="excon-titl color-m1"><i class="three fl">1</i><span class="fl ml-15 f30">验证收货</span></div>
          <div class="excon-titl excon-hihg py-20"><i class="fl">1</i><span class="fl ml-15 f28 color-666">确认商品是否与订单描述一致，如有异议及时反馈</span>
          </div>
          <div class="excon-titl color-m1"><i class="four fl">1</i><span class="fl ml-15 f30">交易完成</span></div>
          <div class="excon-hihg  py-20"><i class="fl">1</i><span class="fl ml-15 f28 color-666">5173将货款转账给卖家，交易成功</span>
          </div>

        </div>

      </div>
      <!-- 交易说明结束 -->

		</div>



	</div>
	<!-- 固定底部 -->

  <div class="fixed-bottom border-top" v-show="!processShow">
    <div class="goodslist-btn px-30 py-30 bg-fff">
      <a class="total f32 color-000 fl" >价格<em class="color-m1 f37 ml-10">￥<i class="fontarial f40">{{goodsprice}}</i></em></a>
        <a class="subuy f32 bg-f54 color-fff fr text-center" :class="{'button-disable':equipmentDisableStatus}" @click="Buy"><span>{{buytext}}</span></a>
    </div>
  </div>



  <share></share>
  <pcess :processShow="processShow" @sonProcessShow="sonProcessShow"></pcess>
  <previewer :list="imageList" ref="previewer" ></previewer>
  <loading-component></loading-component>

</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import loadingComponent from 'components/common/Loading.vue' //
import NumberInput from 'components/common/formComponent/numberComponent'
import share from '../common/NewShare.vue' // 分享
import pcess from 'components/help/Process' // tm的购买流程
import previewer  from '../account/AccountPreviwer.vue' // 查看图片

export default {
  data() {
    return {
      axmStatus: false,
      barShow: true,
      shareStatus: false,
      popupVisible: false,
      moreStatus: false,
      processShow: false,
      relievedShow: false,
      noImage: false,
      sharemsg: '',
      midwidth: window.innerWidth + 'px',
      isApp: false,
      buytext: '立即购买',
      account:null,
      eqNum:1,
    }
  },
  components: {
    share,
    pcess,
    loadingComponent,
    previewer,
    NumberInput
  },
  computed: {
    goodsprice() {
      if(this.goodsEO.price) {
        return Math.ceil(parseInt(this.goodsEO.price*1000*this.eqNum)/10)/100
      } else if (this.goodsEO.Price) {
        return Math.ceil(parseInt(this.goodsEO.Price*1000)/10)/100
      }
    },
    isyitou() {
      if(this.goodsInfo.biz_offer_flag) {
        if(this.goodsInfo.biz_offer_flag.indexOf('~')>-1) {
          return true
        } else {
          return false
        }
      }
      return false
    },
    isketou() {
      if(this.goodsInfo.biz_offer_flag) {
        if(this.goodsInfo.biz_offer_flag.indexOf('保')>-1) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    eosignsFilter() {
      let elist =  this.eosigns.filter( elem => {
        return elem.Id == '交易安全险' ||
        elem.Id == '商品保障险' ||
        elem.Id == '无货赔付' ||
        elem.Id == '寄售交易' ||
        elem.Id == '担保交易' ||
        elem.Id == '安心买' ||
        elem.Id == '卖家保险' ||
        elem.Id == '超时赔付'
      })
      return elist
    },
    equipmentDisableStatus() {
      let sta = false
      if (this.account) {
        if (this.account.id == this.goodsEO.useraccountId) {
          this.buytext = '不能购买自己的商品'
          sta = true
        }
      }
      if (this.goodsEO) {
        switch (parseInt(this.goodsEO.NotBuyStatus)) {
          case 1:
            this.buytext = '游戏维护中，请稍候购买'
            this.$store.commit('account/ERRMSG', {title:null,message:'游戏正在维护、请维护结束后购买',confirmButtonText: '朕知道了'})
            sta = true
            break;
          case 2:
            this.buytext = '游戏维护中，请稍候购买'
            this.$store.commit('account/ERRMSG', {title:null,message:'游戏正在维护、请维护结束后购买',confirmButtonText: '朕知道了'})
            sta = true
            break;
          case 3:
            this.buytext = '该商品已停止出售，请选择其他同类商品'
            sta = true
            break;
          case 4:
            this.buytext = '该商品已售罄，请选择其他同类商品'
            this.$store.commit('account/ERRMSG', {title:null,message:'抱歉，手慢一步，该宝贝被抢光了',confirmButtonText: '朕知道了'})
            sta = true
            break;
          case 5:
            this.buytext = '该商品正在交易中，请选择其他同类商品'
            sta = true
            break;
          case 6:
            this.buytext = '该商品已暂停出售'
            sta = true
            break;
          case 7:
            this.buytext = '购买方式未开启，请选择其他同类商品'
            sta = true
            break;
          case 8:
            this.buytext = '卖家不在线'
            this.$store.commit('account/ERRMSG', {title:null,message:'卖家当前不在线，暂时无法交易',confirmButtonText: '朕知道了'})
            sta = true
            break;
          case 9:
            this.buytext = '卖家不方便交易，请在'+this.goodsEO.GameRestoreInfo.split("：")[1].replace('）',"")+'内购买'
            this.$store.commit('account/ERRMSG', {
              title:null,
              message:'当前卖家不方便交易，请在以下交易时间段购买</br><span style="color:#666">交易时段：'+this.goodsEO.GameRestoreInfo.split("：")[1].replace('）',"")+'</span>',
              confirmButtonText: '朕知道了'})
            sta = true
            break;
          case 10:
            this.buytext = '不能购买自己的商品'
            sta = true
            break;
          case 11:
            this.buytext = '审核失败，请选择其他同类商品'
            sta = true
            break;
          case 12:
            this.buytext = '商品已过期'
            sta = true
            break;
          default:

        }
      }
      if (Object.keys(this.goodsEO).length==0) {
        sta = true
      }
      return sta
    },
    qf() {
      let spname = this.goodsEO.serviceProviderName?this.goodsEO.serviceProviderName+'/':''
      let regname = this.goodsEO.regionName?this.goodsEO.regionName+'/':''
      let sername = this.goodsEO.serverName?this.goodsEO.serverName:''
      let pca = this.goodsEO.GameAreaName?this.goodsEO.GameAreaName+'/':''
      let pcs = this.goodsEO.GameServerName?this.goodsEO.GameServerName:''
      return spname + regname + sername + pca + pcs
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
      }
    }),
    ...mapGetters({
      overtime: 'account/OVERTIME',
      ptrList: 'account/PTRLIST',
      bindCard: 'account/BINDCARD',
      bindEmail: 'account/BINDEMAIL',
      bindMob: 'account/BINDEMOB',
      firstImage: 'account/FIRSTIMAGE',
      eosigns: 'account/EOSIGNS',
      disableStatus: 'account/DISABLESTATUS',
    })
  },
  watch: {
    moreStatus(sta) {
      this.$bus.emit('headMoreStatus', sta)
    },
    errMsg (msg) {
      if (msg && Object.keys(msg).length > 0) {
        this.$messagebox({
          title: msg.title,
          message: msg.message,
          closeOnClickModal: false,
          confirmButtonText:msg.confirmButtonText
        }).then(()=>{
          this.clearErr()
          if (msg.returnUrl=='login') {
            location.href = '/vue/login?returnUrl=' + this.location.href
          } else if(msg.returnUrl) {
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
    if (to.name === 'accountDetailApp') {
      next(vm => {
        vm.isApp = true
      })
    } else {
      next(vm => {
        vm.clearGoodsEO()
      })
    }
  },
  mounted: function mounted() {
      if(location.href.indexOf('account')>-1){
          this.shareType='帐号'
      }
    this.setDefault()
    this.$nextTick(()=>{
      setTimeout(()=>{
        if (!this.firstImage) {
          this.noImage = true
        }
      }, 500);
    })
    this.$bus.emit('isMore', true)
    this.$bus.emit('isMoreHead', false)
    this.$bus.on('moreStatus', sta => {
      this.moreStatus = sta
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$bus.emit('shareShow', false)
    this.clearGoodsEO()
  },
  methods: {
    idfilter(id) {
      if (id=='商品保障险'||id=='交易安全险') {
        if (this.goodsInfo.biz_offer_flag) {
          if (this.goodsInfo.biz_offer_flag.indexOf('保')>-1) {
            return '本商品可投保'
          } else if(this.goodsInfo.biz_offer_flag.indexOf('~')>-1) {
            return '本商品已投保'
          } else {
            return id
          }
        } else {
          return '本商品可投保'
        }
      } else if (id=='卖家保险') {
        return '本商品已投保'
      } else {
        return id
      }
    },
    mstfivClick() {
      this.moreStatus = false
    },
    show (index) {
      if (this.firstImage) {
        this.$refs.previewer.show(index)
      }
    },
    Buy() {
      if (!this.equipmentDisableStatus) {
        if (this.$route.params.goods_source_type==0) {
          this.$router.push({
            name:'equipmentMOrder',
            params: {
                goodsId:this.$route.params.goodsId,
                goods_source_type:this.$route.params.goods_source_type
            },
            query:{
              eqNum:this.eqNum
            }
          })
        } else {
          this.$router.push({
            name:'equipmentOrder',
              params: {
                  goodsId:this.$route.params.goodsId,
                  goods_source_type:this.$route.params.goods_source_type
              }
          })
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
      if (this.$route.params.goods_source_type == 1&&this.$route.params.gameType==1) {
        arg = {
          BizOfferId: this.$route.params.goodsId
        }
      } else if(this.$route.params.goods_source_type == 1&&this.$route.params.gameType==2) {
        arg = {
          PcGoodsId: this.$route.params.goodsId
        }
      } else {
        arg = {
          goodsId: this.$route.params.goodsId
        }
      }
      await this.getGoodsEO(arg)
      await this.getGoodsInfo(this.$route.params.goodsId)
      await this.$getAccount()
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
        if(this.$route.params.gameType==1){
          gameTypeName = "端游"
        }else{
          gameTypeName = "手游"
        };
        sa.track("goodsDetails",{
          platfromType:"H5",
          belongGame:this.goodsEO.GameName||this.goodsEO.gameName,
          gameType:gameTypeName,
          belongArea:this.goodsEO.GameName+this.goodsEO.GameAreaName+this.goodsEO.GameServerName||this.goodsEO.gameName+this.goodsEO.gameAreaName+this.goodsEO.gameServerName,
          gameCompany:this.goodsEO.GameName||this.goodsEO.gameName,
          goodsDynamicProperties:property,
          goodsWeight:this.goodsInfo.sort_score,
          goodsSum:Number(this.goodsEO.Price)||Number(this.goodsEO.totalAmount),
          goodsPrice:this.goodsEO.Price.toString()||this.goodsEO.totalAmount.toString(),
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
       document.title = `${this.goodsEO.gameName||this.goodsEO.GameName}  ${this.goodsInfo.title||this.goodsEO.Title||this.goodsEO.propertyValuesTitle||this.goodsEO.title} ${this.goodsEO.price || this.goodsEO.Price}元`
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
<style src='css/equipment/equipment-wjr.css' scoped></style>
<style scoped>
.lh {
  line-height: 1rem !important;
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
  height: 5rem;
  line-height: 5rem;
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
.explain-coner .excon-hihg {
  min-height: 0;
}
.explain-coner{
    height: auto;
    display: block;
    overflow: hidden;
    padding: 0.56rem 0.44rem 0.5rem 0.44rem;
    margin: 0;
}
.goodslist-btn .subuy{line-height: 0.9rem; }
.goodslist-btn .subuy span{line-height: 0.40rem; display: inline-block; padding: 0.06rem 0.1rem;}
</style>
