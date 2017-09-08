<template>
  <div>

    <!--待付款-->
    <div class="seller-01 " v-show="payStatus==1">
        <div class="mobile-order-tips py-20 px-30 mt-183 mb-20 bg-fffdf4" v-show="tips">
            <i class="fl icon-close-yellow" @click="closeTips"></i>
            <p class="ml-20 fl f26 ">部分电脑版订单暂未同步至手机版,如需查看，请登录电脑版查询</p>
            <a class="fr text-center f26" href="http://trading.5173.com/list/viewmyorderlist.aspx">去电脑版</a>
        </div>
        <div class="sellnage-connt mb-20" v-for="elem in PcOrderList1" :key="elem.Id">
            <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.Id, elem.ServiceType)">
              <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.Name}}</span></div>
                <div class="manage-contn bg-faf">
                    <div class="mancon-img fl">
                      <i class="f22 color-fff bg-000">{{elem.BasicType|BasicTypeFilter}}</i>
                      <span class="middle"></span>
                      <img src="~images/default_img.jpg">
                    </div>
                    <div class="mancon-tn py-15">
                        <div class="tn-hxtxt f26 color-666">{{elem.GameName}} /{{elem.AreaName}} /{{elem.ServerName}} </div>
                        <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.Id}}</div>
                        <div class="tn-hxtxt f26 color-666">商品价格：{{elem.RawSum}}元</div>
                    </div>
                </div>
            </div>

            <div class="mancon-titl px-30 py-30 bg-fff border-bottom "><span class="title-curent f30 pl-30 color-000 buyct-why">{{elem|OrderFlowStatusValueFilter}}</span></div>
            <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                <a class="f30 color-fff bg-m1 fr" @click="pay(elem.Id, elem.PaySign, elem.ServiceType)">去付款</a>
                <a class="f30 color-m1 border border-color cancel fr" @click="getPcService(elem.Id, elem.ServiceType, elem.KefuQQ)" v-if="elem.KefuQQ&&elem.IsFast">联系客服</a>
                <i class="titcur fr" @click="whyClick(elem.KefuQQ)" v-if="elem.KefuQQ&&elem.IsFast"></i>
            </div>
        </div>

        <div class="loading" v-show="loading" >加载中...</div>
        <div  class="list-empty bg-fff" v-show="PcOrderList1.length===0&&!loading">
          <p ><img src="~images/gamelogo.png"></p>
          <span >您还没有订单</span>
        </div>


    </div>

    <!--待付款-->
    <!--已付款-->
          <div class="seller-02" v-show="payStatus==2">
              <div class="mobile-order-tips py-20 px-30 mt-183 mb-20 bg-fffdf4" v-if="tips">
                  <i class="fl icon-close-yellow" @click="closeTips"></i>
                  <p class="ml-20 fl f26 ">部分电脑版订单暂未同步至手机版,如需查看，请登录电脑版查询</p>
                  <a class="fr text-center f26" href="http://trading.5173.com/list/viewmyorderlist.aspx">去电脑版</a>
              </div>
          	<div class="sellnage-connt mb-20" v-for="elem in PcOrderList2" :key="elem.Id">
              <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.Id, elem.ServiceType)">
                <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.Name}}</span></div>
                  <div class="manage-contn bg-faf">
                      <div class="mancon-img fl">
                        <i class="f22 color-fff bg-000">{{elem.BasicType|BasicTypeFilter}}</i>
                        <span class="middle"></span>
                        <img src="~images/default_img.jpg">
                      </div>
                      <div class="mancon-tn py-15">
                          <div class="tn-hxtxt f26 color-666">{{elem.GameName}} /{{elem.AreaName}} /{{elem.ServerName}} </div>
                          <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.Id}}</div>
                          <div class="tn-hxtxt f26 color-666">商品价格：{{elem.RawSum}}元</div>
                      </div>
                  </div>
              </div>
                <div class="mancon-titl px-30 py-30 bg-fff border-bottom "><span class="title-curent f30 pl-30 color-000 buyct-why">{{elem|OrderFlowStatusValueFilter}}</span></div>
                  <div class="mancon-btn pr-20 py-20 bg-fff border-bottom " v-if="elem.KefuQQ>0">
                    <a class="f30 color-m1 border border-color cancel fr" @click="getPcService(elem.Id, elem.ServiceType, elem.KefuQQ)">联系客服</a>
                    <i class="titcur fr" @click="whyClick(elem.KefuQQ)"></i>
                  </div>
                  <div class="mancon-btn pr-20 py-20 bg-fff border-bottom " v-else>
                    <a class="f30 color-fff border bg-ddd fr">联系客服</a>
                  </div>
              </div>

              <div class="loading" v-show="loading" >加载中...</div>
              <div  class="list-empty bg-fff" v-show="PcOrderList2.length===0&&!loading">
                <p ><img src="~images/gamelogo.png"></p>
                <span >您还没有订单</span>
              </div>
          </div>
          <!--已付款-->

          <!--交易成功-->
          <div class="seller-03" v-show="payStatus==3">
              <div class="mobile-order-tips py-20 px-30 mt-183 mb-20 bg-fffdf4" v-if="tips">
                  <i class="fl icon-close-yellow" @click="closeTips"></i>
                  <p class="ml-20 fl f26 ">部分电脑版订单暂未同步至手机版,如需查看，请登录电脑版查询</p>
                  <a class="fr text-center f26" href="http://trading.5173.com/list/viewmyorderlist.aspx">去电脑版</a>
              </div>
              <div class="sellnage-connt mb-20"  v-for="elem in PcOrderList3" :key="elem.Id">
                <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.Id, elem.ServiceType)">
                  <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.Name}}</span></div>
                    <div class="manage-contn bg-faf">
                        <div class="mancon-img fl">
                          <i class="f22 color-fff bg-000">{{elem.BasicType|BasicTypeFilter}}</i>
                          <span class="middle"></span>
                          <img src="~images/default_img.jpg">
                        </div>
                        <div class="mancon-tn py-15">
                            <div class="tn-hxtxt f26 color-666">{{elem.GameName}} /{{elem.AreaName}} /{{elem.ServerName}} </div>
                            <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.Id}}</div>
                            <div class="tn-hxtxt f26 color-666">商品价格：{{elem.RawSum}}元</div>
                        </div>
                    </div>
                </div>
                  <div class="mancon-titl px-30 py-30 bg-fff border-bottom "><span class="title-curent f30 pl-30 color-000 buyct-why">{{elem|OrderFlowStatusValueFilter}}</span></div>
                  <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                    <a class="f30 color-fff bg-m1 fr" v-if="!elem.IsFast&&(elem.OrderPayStatusValue==4||elem.OrderPayStatusValue==5)&&parseInt(elem.BasicType)===2" @click="getAccount(elem.Id,'pcgoods')">提取帐号</a>
                    <a class="f30 color-m1 border border-color cancel fr" @click="getPcService(elem.Id, elem.ServiceType, elem.KefuQQ)" v-if="elem.KefuQQ>0">联系客服</a>
                    <a class="f30 color-fff border bg-ddd fr" v-else>联系客服</a>
                    <i class="titcur fr" @click="whyClick(elem.KefuQQ)" v-if="elem.KefuQQ>0"></i>
                  </div>
              </div>

              <div class="loading" v-show="loading" >加载中...</div>
              <div  class="list-empty bg-fff" v-show="PcOrderList3.length===0&&!loading">
                <p ><img src="~images/gamelogo.png"></p>
                <span >您还没有订单</span>
              </div>
          </div>

          <!--交易成功-->

          <!--交易取消-->
          <div class="seller-04" v-show="payStatus==4">
              <div class="mobile-order-tips py-20 px-30 mt-183 mb-20 bg-fffdf4" v-if="tips">
                  <i class="fl icon-close-yellow" @click="closeTips"></i>
                  <p class="ml-20 fl f26 ">部分电脑版订单暂未同步至手机版,如需查看，请登录电脑版查询</p>
                  <a class="fr text-center f26" href="http://trading.5173.com/list/viewmyorderlist.aspx">去电脑版</a>
              </div>
              <div class="sellnage-connt mb-20"  v-for="elem in PcOrderList4" :key="elem.Id">
                <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.Id, elem.ServiceType)">
                  <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.Name}}</span></div>
                    <div class="manage-contn bg-faf">
                        <div class="mancon-img fl">
                          <i class="f22 color-fff bg-000">{{elem.BasicType|BasicTypeFilter}}</i>
                          <span class="middle"></span>
                          <img src="~images/default_img.jpg">
                        </div>
                        <div class="mancon-tn py-15">
                            <div class="tn-hxtxt f26 color-666">{{elem.GameName}} /{{elem.AreaName}} /{{elem.ServerName}} </div>
                            <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.Id}}</div>
                            <div class="tn-hxtxt f26 color-666">商品价格：{{elem.RawSum}}元</div>
                        </div>
                    </div>
                </div>
                  <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                     <!-- <span class="title-curent f30 pl-30 color-000 fl buyct-why ">取消原因：{{elem.OrderFlowStatus}}</span> -->
                   </div>
                   <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                     <a class="f30 color-m1 border border-color cancel fr" @click="getPcService(elem.Id, elem.ServiceType, elem.KefuQQ)" v-if="elem.KefuQQ>0">联系客服</a>
                     <a class="f30 color-fff border bg-ddd fr" v-else>联系客服</a>
                     <i class="titcur fr" @click="whyClick(elem.KefuQQ)" v-if="elem.KefuQQ>0"></i>
                   </div>

              </div>
              <div class="loading" v-show="loading" >加载中...</div>
              <div  class="list-empty bg-fff" v-show="PcOrderList4.length===0&&!loading">
                <p ><img src="~images/gamelogo.png"></p>
                <span >您还没有订单</span>
              </div>
          </div>
          <!--交易取消-->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
    tips:true
    }
  },
  components: {

  },
  computed: {
    ...mapState({
        errMsg: state => {
            return state.buyerCenter.errMsg
        },
        warnMsg: state => {
            return state.buyerCenter.warnMsg
        },
        pageIndex: state => {
            return state.buyerCenter.pageIndex1
        },
        pageSize: state => {
          return state.buyerCenter.pageSize
        },
        payStatus: state => {
          return state.buyerCenter.payStatus
        },
        PcOrderList4: state => {
          return state.buyerCenter.PcOrderList4
        },
        loading: state => {
          return state.buyerCenter.loading
        },
        PcOrderList3: state => {
          return state.buyerCenter.PcOrderList3
        },
        PcOrderList2: state => {
          return state.buyerCenter.PcOrderList2
        },
        PcOrderList1: state => {
          return state.buyerCenter.PcOrderList1
        },
    }),
    ...mapGetters({
        //curSort: 'choice/SORTSTATUSNAME',
    })
  },
  filters: {
    goodsTypeFilter(type) {
      switch (type) {
        case 1:
          return '装备'
          break;
        case 2:
          return '游戏帐号'
          break;
        case 3:
          return '游戏币'
          break;
        case 65:
          return '租号'
          break;
        default:
          return '其他'
      }
    },
    PayStatusFilter(status) {
      switch (parseInt(status)) {
        case 0:
          return '待付款'
          break;
        case 1:
          return '支付中'
          break;
        case 2:
          return '已付款'
          break;
      }
    },
    BasicTypeFilter(type) {
      switch (parseInt(type)) {
        case 0:
          return '装备'
          break;
        case 1:
          return '游戏币'
          break;
        case 2:
          return '游戏帐号'
          break;
        case 3:
          return '升级'
          break;
        case 4:
          return '包裹'
          break;
        case 5:
          return '点卡'
          break;
      }
    },
    OrderFlowStatusValueFilter(item) {
	  var status =  item. OrderFlowStatusValue
	    if(item.IsFast&&status==105){
            return "交易成功，请联系客服提取账号资料"
	    }
      switch (parseInt(status)) {
        //寄售
        case 51:
          return '待付款'
          break;
        case 52:
          return '已付款'
          break;
        case 53:
          return '已付款'
          break;
        case 54:
          return '交易成功'
          break;
        case 55:
          return '交易成功'
          break;
        case 56:
          return '订单取消'
          break;
        case 57:
          return '已付款'
          break;
        case 58:
          return '已付款，已移交'
          break;
        case 59:
          return '已付款，未选交易地点(无客服，固定交易地点)'
          break;
        case 60:
          return '已付款，已选交易地点'
          break;
        case 61:
          return '已付款，已移交'
          break;
        case 62:
          return '已付款，已移交，延时转账'
          break;
        case 63:
          return '已付款，已移交，延时转账'
          break;
        case 64:
          return '系统自动评价'
          break;
        //担保交易
        case 1:
          return '待付款'
          break;
        case 2:
          return '已付款，固定交易地点'
          break;
        case 3:
          return '已付款，邮寄类'
          break;
        case 4:
          return '已付款，卖家直充'
          break;
        case 5:
          return '已付款'
          break;
        case 6:
          return '已付款，已发货，固定交易地点'
          break;
        case 7:
          return '已付款，已发货，邮寄类'
          break;
        case 8:
          return '已付款，已发货，卖家直充'
          break;
        case 9:
          return '已付款'
          break;
        case 10:
          return '已付款，物品已移交'
          break;
        case 11:
          return '交易成功'
          break;
        case 12:
          return '交易成功'
          break;
        case 13:
          return '订单已取消'
          break;
        case 14:
          return '已付款，买家账号有误，卖家直充'
          break;
        case 15:
          return '已付款，买家已修改账号'
          break;
        case 16:
          return '已付款，卖家申诉'
          break;
        case 17:
          return '已付款，买家申诉'
          break;
        case 18:
          return '已付款，固定交易地点，未选客服'
          break;
        case 19:
          return '已付款，邮寄类'
          break;
        case 20:
          return '已付款，固定交易地点'
          break;
        case 21:
          return '已付款，邮寄类'
          break;
        case 22:
          return '已付款，有货，固定交易地点'
          break;
        case 23:
          return '已付款，已发货'
          break;
        case 24:
          return '已发货，已设置固定交易地点'
          break;
        case 25:
          return '已发货，已设置角色名'
          break;
        case 26:
          return '卖家申诉'
          break;
        case 27:
          return '买家申诉'
          break;
        case 28:
          return '已移交，买家申诉，订单挂起'
          break;
        case 29:
          return '物品已移交'
          break;
        case 30:
          return '延时转账'
          break;
        case 31:
          return '延时转账'
          break;
        case 32:
          return '延时转账，卖家直冲'
          break;
        case 33:
          return '无客服，卖家未操作'
          break;
        case 34:
          return '卖家反馈有货'
          break;
        case 35:
          return '无货取消'
          break;
        case 36:
          return '卖家已发货'
          break;
        case 37:
          return '卖家交易出错'
          break;
        case 38:
          return '买家未收到货或数量有误'
          break;
        case 39:
          return '延时转账，交易成功'
          break;
        case 40:
          return '买家未收到货或数量有误分配仲裁员'
          break;
        case 41:
          return '卖家客服反馈卖家已发货'
          break;
        case 42:
          return '物品移交'
          break;
        case 43:
          return '买家已评价，卖家未评价'
          break;
        case 44:
          return '交易成功'
          break;
        case 45:
          return '买家已评价，卖家未评价'
          break;
        case 46:
          return '买家未评价，卖家已评价'
          break;
        case 47:
          return '交易成功'
          break;
        case 48:
          return '系统自动评价'
          break;
        //账号
        case 101:
          return '待付款'
          break;
        case 102:
          return '已付款'
          break;
        case 103:
          return '已付款，未审核'
          break;
        case 104:
          return '已付款，已审核'
          break;
        case 105:
          return '已审核,已确认购买'
          break;
        case 106:
          return '已付款，已审核'
          break;
        case 107:
          return '已付款，已审核'
          break;
        case 108:
          return '交易成功'
          break;
        case 109:
          return '交易成功'
          break;
        case 110:
          return '已付款，反馈问题'
          break;
        case 111:
          return '订单取消'
          break;
        case 112:
          return '已审核，查看注册资料'
          break;
        case 113:
          return '已付款，已审核'
          break;
        case 114:
          return '已付款，未审核'
          break;
        case 115:
          return '已审核,已移交'
          break;
        case 116:
          return '已付款，问题已解决'
          break;
        case 117:
          return '已审核,已确认购买，已评价'
          break;
        case 118:
          return '已审核，增值服务已处理完成'
          break;
        case 119:
          return '等待转账'
          break;
        case 129:
          return '上号体验有损坏,交易完成，未评价'
          break;
        case 130:
          return '上号体验无损坏,交易完成，未评价'
          break;
        case 131:
          return '帐号角色交易, 已支付'
          break;
        case 132:
          return '卖家确认发货'
          break;
        case 133:
          return '卖家取消交易,等买家确认'
          break;
        case 134:
          return '买家确认取消，订单取消'
          break;
        case 135:
          return '交易成功'
          break;
        case 136:
          return '交易成功'
          break;
        case 137:
          return '仲裁中'
          break;
        case 138:
          return '系统自动评价'
          break;
        case 139:
          return '更换手机绑定'
          break;
        case 140:
          return '延时转账已评价'
          break;
      }
    }
  },
  created: function created() {
  },
  methods: {
    whyClick(qq) {
      this.$messagebox({
        message: "如点击联系客服无法启动QQ，请加客服QQ号("+qq+")"
      })
    },
    getPcService(Id, ServiceType, KefuQQ) {
      if (KefuQQ) {
        if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
          this.$messagebox({
            message: "如点击联系客服无法启动QQ，请加客服QQ号("+KefuQQ+")"
          })
        }else {
          window.location.assign('mqqwpa://im/chat?chat_type=wpa&uin=' + KefuQQ + '&version=1&src_type=web&web_src=oicqzone.com');
        }
      } else {
        window.location.assign("/pc/huanxin.html?orderId="+Id+"&serviceType="+ServiceType+"&isSeller=false")
      }
    },
    pay(Id,PaySign,ServiceType) {
      location.href = "https://mypay.5173.com/PaymentWap/PayOrderV3.aspx?OrderId="+Id+"&Key="+PaySign+"&ServiceType="+ServiceType
    },
    getAccount(orderId, type) {
      this.$router.push({
        name: 'getAccount',
        params: {type:type,orderId:orderId}
      })
    },
    goOrder(orderId, ServiceType) {
      this.$router.push({
        name: 'buyerOrder',
        params: {orderId:orderId,type:'pcgoods'},
        query: {ServiceType:ServiceType}
      })
    },
      closeTips(){
          var sellermain = document.getElementsByClassName("sellmanage-main");
          var tips1 = document.getElementsByClassName("mobile-order-tips");
          var tipsHeight = tips1[0].offsetHeight;
          sellermain[0].setAttribute("class","mt-183");
          this.tips = false
      },
    ...mapActions({
        getMainGoodsOrderList: 'buyerCenter/GETMAINGOODSORDERLIST',
        clearErr: 'buyerCenter/CLEAR_ERR',
        clearWarn: 'buyerCenter/CLEAR_WARN',
    })
  }
}
</script>
<style src="css/common/member-cxy.css" scoped></style>
<style scoped>
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
</style>
