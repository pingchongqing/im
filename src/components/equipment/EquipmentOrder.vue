<template>
<div id="wrapper" style="height:100%;">
	<div class="goodslist-01" style="display:block;">
        <!-- top -->
        <div class="top-header border-bottom fixed-top">
             <div class="top-back">
                  <a href="javascript:history.go(-1)">返回</a>
             </div>
             <h2 class=" f32">
                 下单
             </h2>
        </div>

        <!-- 买家列表 -->
        <div class="member-tab mt-97">
            <div class="pro-list p-30 border-bottom bg-fff">
                 <a href="#">
                     <div class="pro-pic mr-20 bg-f1">
                           <img :src="firstImage" v-if="firstImage">
													 <img src="~images/default_img.jpg" v-else>
                           <div class="photoNumBg"  v-show="imageList.length"></div>
                           <div class="photoNum f24 pl-30 color-fff" v-show="imageList.length">{{imageList.length}}</div>
                      </div>
                      <div class="tabPc-title">
                           <p class="title2 f30">{{goodsEO.Title||goodsEO.title}}</p>
                      </div>
                  </a>
            </div>
            <div class="pcOrder01 px-30 bg-fff border-bottom">
                 <p class="p1 f30 fl color-000">游戏区服</p>
                 <p class="p1 f30 fr color-000"> {{qf}} </p>
            </div>
            <div class="pcOrder01 px-30 bg-fff border-bottom">
                 <p class="p1 f30 fl">商品单价</p>
                 <p class="p1 f30 fr color-m1">￥{{Math.ceil(parseInt(this.goodsEO.Price*1000)/10)/100||Math.ceil(parseInt(this.goodsEO.price*1000)/10)/100}}</p>
            </div>
            <div class="pcOrder01 bg-fff" :class="{'mb-20':!goodsEO.GameRestoreInfo}">
              <NumberInput
								:min=1
                :max="parseInt(goodsEO.blanceNum?goodsEO.blanceNum:goodsEO.Quantity)"
								:fillable=false
                v-model="eqNum"
                :title="'购买数量'"
              >
              </NumberInput>
            </div>

            <div class="pcOrder01 px-30 border-bottom mb-20 bg-f8" @click="friendlyTip" v-if="creatOrderConfig.BuyModeExplains">
                 <p class="p2 f26 color-666 fl">友情提示</p>
                 <p class="p2 f32 fr color-m1"><i class="right"></i></p>
            </div>

            <switchComponent
						v-if="configTitle!='无保险'"
            :title="configTitle"
            :price="'￥'+getBaoxianMoney"
						:showtip=true
						@tipclick='tipclick'
            v-model="isBaoxian"
            ></switchComponent>

            <div class="pcOrder03 bthead bg-fff border-top">
                 <h3 class="border-bottom px-30 color-000 f30"><em class="fl pr-20"></em>收货信息</h3>
								 <eqform :coinsBoay='coinsBoay' :isJis='isJis'></eqform>
            </div>

            <!-- 固定底部 -->
            <div class="fixed-button4 border-top  p-30 bg-fff">
                 <div class="fleft fl "><em class="e1 f32">合计</em><em class="e2 f36">￥</em><em class="e3 f40">{{totalMoney}}</em></div>
                 <a class="fright f36 fr" @click='confirm'>提交订单</a>
            </div>
        </div>

    </div>
		<transition name="fade_sxv">
    <friendlyTip v-if="hint_box" :spstr="spstr"></friendlyTip>
    </transition>

</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import NumberInput from 'components/common/formComponent/numberComponent'
import switchComponent from 'components/common/formComponent/switchComponent'
import eqform from './eqform.vue'
import friendlyTip from './friendlyTip.vue'
export default {
  data() {
    return {
      eqNum: 1,
      isBaoxian: false,
			coinsBoay:{},
			postData:{},
			postJSData:{},
			hint_box:false
    }
  },
  components: {
    NumberInput,
    switchComponent,
		eqform,
		friendlyTip
  },
  computed: {
		spstr() {
			if (this.creatOrderConfig.BuyModeExplains) {
				return this.creatOrderConfig.BuyModeExplains.replace("友情提示","").replace("：","").replace("</br>","<br>").split("<br>");
			}
		},
		IsBuyerBaoXian() {
			if (this.isBaoxian) {
				if (this.configTitle.indexOf('险')>-1) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		},
		IsBuyerAnxinBuy() {
			if (this.isBaoxian) {
				if (this.configTitle.indexOf('安心')>-1) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		},
		isJis() {
			if (this.$route.params.goodsId.indexOf('DB')>-1) {
				return 1
			} else if (this.$route.params.goodsId.indexOf('JS')>-1) {
				return 2
			} else {
				return 0
			}
		},
    configTitle() {
			if (this.creatOrderConfig&&this.creatOrderConfig.BaoXianType&&this.creatOrderConfig.BaoXianType.Key){
				if(this.creatOrderConfig.BaoXianType.Key.indexOf('安心买')>-1) {
					return '安心买'
				}
			}
      return this.creatOrderConfig.BaoXianType?this.creatOrderConfig.BaoXianType.Key?this.creatOrderConfig.BaoXianType.Key:'':''
    },
    totalMoney() {
      if (this.creatOrderConfig.Price * this.eqNum) {
        return this.isBaoxian?parseInt((this.creatOrderConfig.Price * this.eqNum + this.getBaoxianMoney)*1000)/1000:parseInt(this.creatOrderConfig.Price*1000) * this.eqNum/1000
      } else {
        return ''
      }
    },
    getBaoxianMoney() {
      let val = ''
      if (this.creatOrderConfig.BaoXianType) {
        let tm = parseInt(this.creatOrderConfig.Price * this.eqNum * this.creatOrderConfig.BaoXianRate*100)/100
        if (parseInt(this.creatOrderConfig.BaoXianRate) > 1) {
          tm = tm/100
        }
        if (tm >= this.creatOrderConfig.BaoXianMaxMoney) {
          val = this.creatOrderConfig.BaoXianMaxMoney
        } else if(tm<=this.creatOrderConfig.BaoXianMinMoney) {
          val = this.creatOrderConfig.BaoXianMinMoney
        } else {
          val = tm
        }
      }
			return val?parseInt(val*10000)/10000:''
    },
    qf() {
      let spname = this.goodsEO.serviceProviderName?this.goodsEO.serviceProviderName+'/':''
      let regname = this.goodsEO.regionName?this.goodsEO.regionName+'/':''
      let sername = this.goodsEO.serverName?this.goodsEO.serverName:''
      let pca = this.goodsEO.GameAreaName?this.goodsEO.GameAreaName+'/':''
      let pcs = this.goodsEO.GameServerName?this.goodsEO.GameServerName:''
      return spname + regname + sername + pca + pcs
    },
    ...mapState({
      goodsEO: state => {
        return state.account.goodsEO
      },
      imageList: state => {
        return state.account.imageList
      },
      creatOrderConfig: state => {
        return state.equipment.creatOrderConfig
      },
      errMsg: state => {
        return state.account.errMsg
      },
      warnMsg: state => {
        return state.account.warnMsg
      }
    }),
    ...mapGetters({
      firstImage: 'account/FIRSTIMAGE',
    })
  },
  watch: {
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
					} else if(msg.returnUrl=='back') {
						history.go(-1)
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
  created: function created() {
    //do something after creating vue instance
    this.setDefault()
  },
	beforeDestroy: function beforeDestroy() {
	  this.clearGoodsEO()
		this.$store.commit('equipment/MUTORDERCONFIG', {})
	},
  methods: {
		tipclick() {
			if (this.creatOrderConfig.BaoXianType.Key.indexOf('买家安心买')>-1) {
				this.$messagebox({
					title:'安心买',
					message:'购买后，当商品发生找回，封号时，卖家承诺最高全款退款。',
					confirmButtonText: '朕知道了'
				})
			} else if (this.creatOrderConfig.BaoXianType.Key.indexOf('卖家安心买')>-1) {
				this.$messagebox({
					title:'安心买',
					message:'该商品已加入安心买，若发生找回，封号时，卖家承诺最高全款退款。',
					confirmButtonText: '朕知道了'
				})
			} else if(this.creatOrderConfig.BaoXianType.Key.indexOf('交易安全')>-1) {
				this.$messagebox({
					title:'交易安全险',
					message:`<div style=\"text-align\:left\">1、本商品交易安全由中国人保财险承保</div>
					<div style="text-align:left">2、购买后，如出现商品被回收、被找回、被封号，最高可赔付您所购买的订单金额。
					购买前请仔细阅读<a href="/vue/help/purchase" style="color:#007aff; text-decoration:underline">《购买须知》</a>和<a href="/vue/help/security" style="color:#007aff; text-decoration:underline">《交易安全险》</a>，购买即表示您已阅读并同意所有条款</div>`,
					confirmButtonText: '朕知道了'
				})
			} else if(this.creatOrderConfig.BaoXianType.Key.indexOf('商品保障')>-1) {
				this.$messagebox({
					title:'商品保障险',
					message:`<div style=\"text-align\:left\">1、本商品交易安全由中国人保财险承保</div>
					<div style="text-align:left">2、购买后，如出现商品被回收、被找回、被封号，最高可赔付您所购买的订单金额。
					购买前请仔细阅读<a href="/vue/help/commodity" style="color:#007aff; text-decoration:underline">《购买须知》</a>和<a href="/vue/help/guarantee" style="color:#007aff; text-decoration:underline">《商品保障险》</a>，购买即表示您已阅读并同意所有条款</div>`,
					confirmButtonText: '朕知道了'
				})
			} else if(this.creatOrderConfig.BaoXianType.Key.indexOf('卖家保险')>-1) {
				this.$messagebox({
					title:'卖家保险',
					message:`卖家已为商品投保，如出现商品被回收、被找回、被封号、最高可赔付您所购买订单的金额`,
					confirmButtonText: '朕知道了'
				})
			}

		},
		async	confirm() {

			let childData = this.$children[2]
			var qqReg = /^[1-9]\d{4,10}$/;
			var mobileReg = /(^0{0,1}1[3|4|5|7|8][0-9]{9}$)/;
			if (childData.buyNum == "") {
				this.$toast('请输入购买数量')
				return false
			} else if(childData.IsjueseName&&(childData.receiver==""||childData.receiver.replace(/(^\s*)|(\s*$)/g, "")=="")){
				this.$toast('请填写收货角色名')
				return false;
			} else if (childData.phoneName == "") {
				this.$toast('请填写手机号')
				return false;
			}else if (childData.dengjiName === ""&&childData.Isshouhuo) {
				this.$toast('请填写收货角色等级')
				return false;
			}else if (childData.juese === ""&&childData.Isjuese) {
				this.$toast('请填写角色数字ID')
				return false;
			} else if (childData.qufuName == ""&&childData.coins_qufu) {
				this.$toast('请选择交易区服')
				return false;
			} else if (!mobileReg.test(childData.phoneName)) {
				this.$toast('手机号格式错误')
				return false;
			} else if (childData.qqName == "") {
				this.$toast('请填写QQ号')
				return false
			} else if (!qqReg.test(childData.qqName)) {
				this.$toast('QQ号格式错误')
				return false;
			}

			await this.setDefault()
			if (parseInt(this.goodsEO.NotBuyStatus)==1||parseInt(this.goodsEO.NotBuyStatus)==2) {
				this.$store.commit('account/ERRMSG', {title:null,message:'游戏正在维护、请维护结束后购买',confirmButtonText: '朕知道了',returnUrl:'back'})
			}
			if(Object.keys(this.errMsg).length>0) {
				return false
			}



			this.postData.BizOfferId = childData.BizOfferId
			this.postData.UserId = childData.account.pcUserId
			this.postData.BuyMode = childData.wayActive
			this.postData.BuyerSourceSiteId = 'm.5173.com'
			this.postData.Quantity = this.eqNum
			this.postData.BuyerGameRole = childData.receiver
			this.postData.BuyerTel = childData.phoneName
			this.postData.BuyerQQ = childData.qqName
			this.postData.RoleGrade = childData.dengjiName
			this.postData.IsAutoAssignOp = true //是否自动分配客服
			this.postData.goodsType = 1
			this.postData.IsBuyerBaoXian = this.IsBuyerBaoXian//保险
			this.postData.IsBuyerAnxinBuy = this.IsBuyerAnxinBuy//是否购买安全
			if (this.$cookie.get("trace_5173")) {
				this.postData.TraceId = this.$cookie.get("trace_5173")
			}
			if (this.$cookie.get("5173_HZ")) {
				this.postData.PartnerInfo = this.$cookie.get("5173_HZ")
			}
			if (childData.dengjiName) {
				this.postData.RoleGrade = childData.dengjiName
			}
			if (childData.juese) {
				this.postData.RoleNumId = childData.juese
			}
			if (childData.GameAreaId) {
				this.postData.ExchangeAreaId = childData.GameAreaId
			}
			if (childData.GameServerId) {
				this.postData.ExchangeServerId = childData.GameServerId
			}



			this.postJSData.BizOfferId = childData.BizOfferId
			this.postJSData.BuyerId = childData.account.pcUserId
			this.postJSData.BuyMode = childData.wayActive
			this.postJSData.BuyerGameRole = childData.receiver
			if (childData.dengjiName) {
				this.postJSData.BuyerGameGrade = childData.dengjiName
			}
			this.postJSData.BuyerQQ = childData.qqName
			this.postJSData.goodsType = 1
			if (childData.GameAreaId) {
				this.postJSData.ExchangeAreaId = childData.GameAreaId
			}
			if (childData.GameServerId) {
				this.postJSData.ExchangeServerId = childData.GameServerId
			}
			this.postJSData.IsBuyerAnxinBuy = this.IsBuyerAnxinBuy//是否购买安全
			this.postJSData.Quantity = this.eqNum
			this.postJSData.BuyerSourceSiteId = 'm.5173.com'
			this.postJSData.Price = this.totalMoney
			if (childData.juese) {
				this.postJSData.BuyerRoleId = childData.juese
			}
			this.postJSData.BuyerTelephone = childData.phoneName
			this.postJSData.IsAutoAssignOp = true //是否自动分配客服
			this.postJSData.IsPostSaleIndemnity=this.IsBuyerBaoXian//保险

			await this.addHistoryRole({
				gameName:this.goodsEO.GameName,
				regionName:this.goodsEO.GameAreaName,
				serverName:this.goodsEO.GameServerName,
				mobileNumber:childData.phoneName,
				roleName:childData.receiver,
				raceName:childData.zyActive?(childData.zyActive=='0'?'联盟':'部落'):'',
				qqNumber:childData.qqName,
				goodsType:1
			})



			if (this.postData.BizOfferId.indexOf('DB')>-1) {
				this.$http.get(this.$CONSTANTS.APIMainGoods+'mainGoodsAccountOrder/createDBOrder', {params:this.postData}).then(
					res => {
						if (res.body.success) {
							let rst = JSON.parse(res.body.result)
							if (!rst.BizResult.ErrorMessage&&rst.BizResult.NotBuyStatus!='1') {
								location.href = 'https://mypay.5173.com/PaymentWap/PayOrderV3.aspx?OrderId='+rst.BizResult.OrderId+'&Key='+rst.BizResult.Key+'&ServiceType=1'
							} else {
								this.$store.commit('account/ERRMSG', {title:null,message:'游戏正在维护，请维护结束后购买',confirmButtonText: '朕知道了'})
							}
						} else {
							this.$messagebox({message:res.body.responseStatus.message})
						}
					},
					err => {
						console.log(err);
					}
				)
			} else if (this.postData.BizOfferId.indexOf('JS')>-1) {
				this.$http.get(this.$CONSTANTS.APIMainGoods+'mainGoodsAccountOrder/createJSOrder', {params:this.postJSData}).then(
					res => {
						if (res.body.success) {
							let rst = JSON.parse(res.body.result)
							if (!rst.BizResult.ErrorMessage&&rst.BizResult.NotBuyStatus!='1') {
								location.href = 'https://mypay.5173.com/PaymentWap/PayOrderV3.aspx?OrderId='+rst.BizResult.OrderId+'&Key='+rst.BizResult.PayInfoSign+'&ServiceType='+rst.BizResult.ServiceType
							} else {
								this.$store.commit('account/ERRMSG', {title:null,message:'游戏正在维护，请维护结束后购买',confirmButtonText: '朕知道了'})
							}
						} else {
							this.$messagebox({message:res.body.responseStatus.message})
						}
					},
					err => {
						console.log(err);
					}
				)
			}


		},
    setDefault:  async function setDefault() {
      let arg;
      let pname, rname, sname;
      if (this.$route.params.goods_source_type == 1) {
        arg = {
          BizOfferId: this.$route.params.goodsId
        }
				if (this.isJis==1) {
	        await this.getCreateOrderConfig({apiname:'getCreateOrderConfig',...arg})
				} else if (this.isJis==2) {
					await this.getCreateOrderConfig({apiname:'getJSOrderConfig',...arg})
				}
      } else {
        arg = {
          goodsId: this.$route.params.goodsId
        }
      }
      await this.getGoodsEO(arg)
			this.coinsBoay = {
				gameName:this.goodsEO.GameName,
				regionName:this.goodsEO.GameAreaName,
				serverName:this.goodsEO.GameServerName,
				goodsType:1
			}

    },
    friendlyTip() {
			this.hint_box = !this.hint_box
    },
    ...mapActions({
      getGoodsEO: 'account/A_GETGOODS',
      getCreateOrderConfig: 'equipment/ACTORDERCONFIG',
      clearGoodsEO: 'account/A_CLEARGOODSEO',
			selectHistoryRole: 'equipment/ACTHISTORYROLE',
			addHistoryRole: 'equipment/ACTADDRECIVER',
      clearErr: 'account/CLEAR_ERR',
      clearWarn: 'account/CLEAR_WARN',
    })
  }
}
</script>
<style src='css/equipment/equipment-wjr.css' scoped></style>
<style scoped>
.fade_sxv-enter-active {
	transition: all .3s ease;
}
.fade_sxv-leave-active {
	transition: all .3s ease;
}
.fade_sxv-enter{
	transform: translateX(100%);
}
.fade_sxv-leave-active{
	transform: translateX(100%);
}
</style>
