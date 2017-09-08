<template>
  <div>
    <div id="wrapper">
      <!--top-->
      <div class="top-header border-bottom fixed-top" v-if="isTopApp">
        <div class="top-back">
          <a href="javascript:history.go(-1)">返回</a>
        </div>
        <h2 class="f36 color-000">下单</h2>
      </div>




        <div class="fixedspace" v-if="isTopApp"></div>
        <div class="order-container bg-fff f30 border-bottom">
          <i class="tip"></i>
          <span>为确保购买成功，请填写本人的联系方式</span>
        </div>
        <div class="order-container bg-fff f30 border-bottom">
          <span>收货角色名</span>
          <input maxlength='50' placeholder="请输入收货角色名" v-model="buyRole" >
        </div>
        <div class="order-container bg-fff f30 border-bottom">
          <span>我的手机号</span>
          <input maxlength='11' type="tel" placeholder="请输入手机号" v-model="buyTel">
        </div>

        <div class="order-container color-000 bg-fff border-bottom  mt-20" v-if="isAnxin">
          <span class="f32 sec-buy-server">开通安心买服务<i class="wenhao1 mt-10" @click="anxinmaiTit()"></i></span>
          <div class="sec-buy mt-20 f30">
            <span class="sec-price">￥{{anxinmaiMon}}</span>
            <div class="fr">
              <i class="chrd-inp" :class="{'selected': closeClass2}" @click="clickAnClass2()"></i>
              <span>不开通</span>
            </div>
            <div class="fr">
              <i class="chrd-inp" :class="{'selected': closeClass1}" @click="clickAnClass1()"></i>
              <span>开通</span>
            </div>
          </div>
          <div class="sec-text mt-20 f22 color-999">开通安心买服务，如若帐号被找回和封号，将优先为您找回帐号或全额退款。费用为订单金额的{{anxinmaiLv}}%</div>
        </div>
        <!--底部确认是否发布商品-->
        <div class="release mt-20 trlect-btn border fixed-bottom">
          <a class="next" href="javascript:void(0);">
            <input class="bg-f54" type="button" name="" value="确定" @click="subBotton()">
          </a>
        </div>
        <!--安心买服务规定-->
        <div class="phlog" id="pop_register" v-if="isAnxinm" @click="isAnxinm = !isAnxinm"
           style="left: 207px; top: 368px; margin-left: -186px; margin-top: -209px; position: fixed; z-index: 1001; display: block;">
        <div class="pgbis">
          <h2 class="f30 color-000">安心买服务规定</h2>
          <p class="f28">
            鉴于5173作为网络第三方交易平台，仅能对卖家、买家、商品信息进行形式审查，为此5173特引入安心买服务。若卖家、买家任何一方选择了安心买服务，则卖家出售的商品，买家购买该商品出现被卖家找回、被运营商收回、封号等情况，您可以申请安心买服务，安心买保障体系会优先帮您找回帐号或者给予您购买商品的全额退款；并且本网站将根据该用户违规的情节和程度，对违规用户直接作出删除商品信息，限制交易权限甚至冻结用户帐号的处罚。若发生上述情况造成买家损失的，由本网站代卖家先行向买家退还购买上述商品的货款（服务费不退还）</p>
        </div>
        </div>
        <div class="dialog_cover" v-if="isAnxinm" @click="isAnxinm = !isAnxinm"></div>

        </div>
</div>
</template>
<script>
  import switchComponent from 'components/common/formComponent/switchComponent'
  export default{
    data() {
      return {
        anxinmaiLv: "",//安心买金额利率
        anxinmaiMon: "",//安心买服务费
        buyTel: "",//获取本地cookie电话号码
        buyRole:'',
        goodsId: this.$route.params.goodsId,//获取url里面的goodsId
        gameId: "",
        goodsType: "",
        price: "",
        buyQ: "",//做QQ验证
        closeClass2: false,
        closeClass1: false,
        description: "支付描述",
        requirement: "支付要求",
        isAnxin: false,
        isTopApp: true,
        isAnxinm: false,
        goods_source_type: this.$route.params.goods_source_type,
        num: this.$route.query.eqNum,//购买数量
        gameType: this.$route.params.gameType,
        IncrementItems: [],
        pcEO: {}
      }
    },
    components: {
      switchComponent
    },
    computed: {
      totoalAmount() {
        let price=0
        this.IncrementItems.forEach(elem => {
          if (elem.Show) {
            price = price + parseInt(elem.Price)
          }
        });
        return parseInt(this.pcEO.SumPrice) + price
      },
      postInc() {
        let items = [];
        this.IncrementItems.map(elem => {
          if (elem.Show) {
            items.push({
              Id: elem.Id,
              Name: elem.Name,
              NeedInfo: elem.NeedInfo
            })
          }
        })
        return items
      }
    },
    watch: {
      buyQ: function (Val, oldVal) {
        if (!(/^[0-9]*$/.test(Val)) || this.buyQ.length > 10) {
          this.buyQ = oldVal;//禁止输入除0-9以外的字符
        }
      },
    },
    created(){
      this.checkBindMobile();
      this.selectgoodsdetail();
      this.name();
    },
    methods: {
      anxinmaiTit: function () {
        this.isAnxinm = true;
      },
      name(){
        var self = this;
        if (location.href.indexOf("App") > 0) {
          self.isTopApp = false
        }
      },
      selectgoodsdetail: function () {
        var self = this;
        if (self.goods_source_type == 0) {
          var pcDuanKou = self.$CONSTANTS.APIGoods + 'goods/selectgoodsdetail';
          var typeData = self.$http.get(pcDuanKou, {params: {goodsId: self.goodsId}});

        }
        typeData.then(function (res) {
          if (res.body.success == true) {
            if (res.body.goodsEO) {
              self.goodsType = res.body.goodsEO.goodsType;
              if (res.body.goodsEO.isAxm == true) {
                self.isAnxin = false;
              } else {
                self.isAnxin = true;
                self.GetSafeBuyConfig(res.body.goodsEO.gameId, res.body.goodsEO.goodsType, res.body.goodsEO.price);  //成功之后调用安心买接口
              }
            } else if (res.body.result) {
              let rst = JSON.parse(res.body.result)
              if (rst.BizResult.ErrorMessage) {
                self.$messagebox({
                  message:'商品状态异常,暂时无法购买',
                  closeOnClickModal: false
                }).then(action => {
                  history.go(-1)
                })
              } else if (rst.BizResult.IncrementConfigs) {
                if (rst.BizResult.IncrementConfigs.length > 0) {
                  rst.BizResult.IncrementConfigs.forEach(elem => {
                    self.IncrementItems.push({
                      'Show': false,
                      'OldShow': false,
                      'DialogShow': true,
                      ...elem
                    })
                  })
                }
              }
            }
          }
        });
      },
      //安心买接口
      GetSafeBuyConfig: function (gameId, goodsType, price) {
        var self = this;
        self.$http.post(self.$CONSTANTS.APISafebuy + 'SafeBuyConfigService/GetSafeBuyConfig', {
          gameId: gameId,
          goodsType: goodsType
        }).then(function (res) {
          if (res.body.success == true) {
            self.isAnxin = true;
            self.anxinmaiLv = res.body.safeBuyConfig.pricePercentBuyer * 100;//安心买利率
            var pice = parseInt(price * res.body.safeBuyConfig.pricePercentBuyer * 10000 * this.num) / 10000;//计算安心买费用->下面的判断是用来做安心买费用的限制
            if (pice < res.body.safeBuyConfig.minPrice) {
              self.anxinmaiMon = res.body.safeBuyConfig.minPrice;//安心买费用最小限制
            } else if (pice > res.body.safeBuyConfig.maxPrice) {
              self.anxinmaiMon = res.body.safeBuyConfig.maxPrice;//安心买费用最大限制
            } else {
              self.anxinmaiMon = pice;//安心买费用
            }
          } else {
            self.isAnxin = false;
          }
        });
      },
      clickAnClass2: function () {//安心买选择事件
        this.closeClass2 = true;
        this.closeClass1 = false;
      },
      clickAnClass1: function () {//安心买选择事件
        this.closeClass1 = true;
        this.closeClass2 = false;
      },
      subBotton: function () {
        var self = this;
        if ((self.buyRole + "").length < 1) {
          this.$toast("请填写收货角色名！");
          return false;
        }
        ;
        if (self.closeClass1 == false && self.closeClass2 == false && self.isAnxin == true) { //判断安心买是否被选择
          this.$toast("请选择开通安心买服务！");
          return false;
        }
        ;
        self.$http.post(self.$CONSTANTS.APILogin + "account/queryCurrentUserInfo").then(function (res) {
          if (res.body.success == true) {
            if (self.goods_source_type == 0) {
              self.create(self.buyTel, self.buyRole, self.goodsId, self.goodsType, self.num);
            } else {
              if (self.$route.params.gameType == 2) {
                self.createMobileOrder(self.goodsId, self.buyTel, self.buyQ);
              } else if(self.$route.params.gameType == 1) {
                self.createPcOrder(self.goodsId, self.buyQ)
              }
            }
          } else {
            location.href = '/vue/login?returnUrl=' + encodeURIComponent(location.href);
          }
        });
      },
      //手机下单生成订单
      create: function (buyerPhone, buyRole, goodsId, goodsType, num) {
        var self = this;
        let postData = {
          buyerPhone: buyerPhone,
          buyerRoleName: buyRole,
          buyerWeixin: "",
          description: "支付描述",
          goodsId: goodsId,
          goodsType: goodsType,
          num: num,
          requirement: "支付要求",
          spreadId: this.$route.query.st,
          channelId:(self.$getCookie("source")) ? (self.$getCookie("source")) : "",//备用参数->渠道
          orderSource:1//订单来源
        }
        if (self.isAnxin) {
          if (self.closeClass1) {
            Object.assign(postData, {axmType: 2})
          }
        }
        self.$http.post(self.$CONSTANTS.APIOrder + "order/equip/create", postData).then(function (res) {
          if (res.body.success == true) {
            if (!self.isTopApp) {  // 如果是app进入的 直接进入固定支付页面
              location.href = '/order/single-pay.html?orderId=' + res.body.orderId
              return
            }
            if (res.body.orderId.substring(0, 3) == "MAO" || res.body.orderId.substring(0, 3) == "MEO" || res.body.orderId.substring(0, 3) == "MGO") {
              self.maoMyPay(res.body.orderId);
            } else {
              this.$router.push({
                name: 'singlePay',
                params: {
                  orderId: res.body.orderId,
                }
              });
            }
            ;
          } else {
            self.$toast(res.body.responseStatus.message);
          }
        });
      },
      //pc手游订单支付
      createMobileOrder: function (goodsId, mobilePhone, buyQ) {
        var self = this;
        self.$http.get(self.$CONSTANTS.APIMainGoods + "mainGoodsAccountOrder/createMobileOrder", {
          params: {
            bizOfferId: goodsId,
            buyerPhone: mobilePhone,
            buyerQQ: buyQ,
            sourceChannel: "2"
          }
        }).then(function (res) {
          if (res.body.success == true) {
            var json_result = JSON.parse(res.body.result);
            //json_result.BizResult.Data.id        创建订单的orderId
            if (json_result.BizResult.Data) {
              /*if (!self.isTopApp) {  // 如果是app进入的 直接进入固定支付页面（app 他们主站单子不收）
                location.href = '/order/single-pay.html?orderId=' + json_result.BizResult.Data.id
                return
              }*/
              self.mobileOrderPay(json_result.BizResult.Data.id);
            } else {
              self.$toast(json_result.BizResult.Message);
            }
          } else {
            self.$toast(res.body.responseStatus.message);
          }
        });
      },
      createPcOrder(BizOfferId,BuyerQQ) {
        let params = {
          BizOfferId:BizOfferId,
          BuyerQQ:BuyerQQ,
        }
        if (this.postInc.length> 0) {
          Object.assign(params, {IncrementItems: JSON.stringify(this.postInc)})
        }
        this.$http.get(this.$CONSTANTS.APIMainGoods + 'mainGoodsAccountOrder/createAccountOrder', {
          params: params
        }).then(
          res => {
            if (res.body.success) {
              var json_result = JSON.parse(res.body.result)
              console.log(json_result);
              if (json_result.BizResult.OrderId) {
                location.href='https://mypay.5173.com/PaymentWap/PayOrderV3.aspx?OrderId='+json_result.BizResult.OrderId+'&Key='+json_result.BizResult.Key+'&ServiceType='+json_result.BizResult.ServiceType
              }
            } else {
              this.$toast(res.body.responseStatus.message)
            }
          },
          err => {
            console.log(err);
          }
        )
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
//            location.href = "https://mypay.5173.com/PaymentWap/PayExtex?" + json_result.BizResult.Data.payUrl;
            location.href = "https://mypay.5173.com/PaymentWap/PayExternalV2.aspx?"+json_result.BizResult.Data.payUrl;
          }
        });
      },
      //获取手机号码
      checkBindMobile: function () {
        var self = this;
        self.$http.get(self.$CONSTANTS.APILogin + "account/checkBindMobile").then(function (res) {
          if (res.body.success == true) {
            self.buyTel = res.body.mobilePhone;
          }
        });
      },
      //手游支付订单
      maoMyPay: function (orderId) {
        var self = this;
        self.$http.get(self.$CONSTANTS.APIOrder + "payment/mypay", {
          params: {
            orderId: orderId,
            returnUrl: location.protocol + "//" + window.location.host + '/member/member-buyer-equipment-transaction.html?orderId=' + orderId
          }
        }).then(function (res) {
          if (res.body.success == true) {
            if (res.body.url != undefined || res.body.url != null) {
              window.location.href = res.body.url;
            } else {
              self.$toast("支付出现问题，请联系客服！");
            }

          } else {
            self.$toast(res.body.responseStatus.message);
          }
        });
      }
    }
  }
</script>
<style src='css/common/list-cl.css' scoped></style>
<style src="css/member/member-order.css" scoped></style>
<style src="css/common/publish-cl.css" scoped></style>
<style src="css/order/order-cl.css" scoped></style>
<style scoped>
.slide-fade-enter-active {
  transition: all .3s .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
.goodslist-03{
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 50;
  min-height: 100vh;
  background: #fff;
}
.separa-conn .para-titl{
  line-height: .5rem;
  padding: .2rem 0;
  height: auto;
}

</style>
