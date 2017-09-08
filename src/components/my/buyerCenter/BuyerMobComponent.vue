<template>
<div>
  <!--待付款-->
  <div class="seller-01" v-show="payStatus===1">
    <template v-for="elem in orderMob1">

    <div class="sellnage-connt mb-20" v-if="elem.orderListVO">
      <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.orderListVO.orderId, elem.orderListVO.goodsType)">
        <div class="manage-titl py-30 f28">
          <span class=" fl mr-30 fontbold" v-if="elem.orderListVO.propertyValuesTitle">{{elem.orderListVO.propertyValuesTitle}}</span>
          <span class=" fl mr-30 fontbold" v-else>{{elem.orderListVO.title}}</span>
        </div>
          <div class="manage-contn bg-faf">
              <div class="mancon-img fl">
                <i class="f22 color-fff bg-000">{{elem.orderListVO.goodsType|goodsTypeFilter}}</i>
                <span class="middle"></span><img :src="elem.orderListVO.goodsImg" v-if="elem.orderListVO.goodsImg"><img v-else src="~images/default_img.jpg"></div>
              <div class="mancon-tn py-15">
                  <div class="tn-hxtxt f26 color-666">{{elem.orderListVO.gameName}} /{{elem.orderListVO.regionName}} /{{elem.orderListVO.serverName}} </div>
                  <div class="tn-hxtxt f26 color-666 " v-if="elem.orderListVO.goodsType!=3">订单编号：{{elem.orderListVO.orderId}}</div>
                  <div class="tn-hxtxt f26 color-666" v-if="elem.orderListVO.goodsType===3">购买数量：{{elem.orderListVO.unitNum}}{{elem.orderListVO.unitName}}</div>
                  <div class="tn-hxtxt f26 color-666" >商品价格：{{elem.orderListVO.totalAmount}}元</div>
              </div>
          </div>
      </div>
          <div class="mancon-titl px-30 py-30 bg-fff border-bottom "><span class="title-curent f30 pl-30 color-000 buyct-why">等待付款</span></div>
          <div class="mancon-btn pr-20 py-20 bg-fff border-bottom "><a class="f30 color-fff bg-m1" @click="mobPay(elem.orderListVO.orderId, elem.orderListVO.goodsType)">去付款</a></div>
      </div>

      <div class="sellnage-connt mb-20" v-else>
        <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.rechargeOrderVO.orderId, 'recharge', elem.rechargeOrderVO.rechargeType===2?1:0)">
          <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.rechargeOrderVO.gameName}}{{elem.rechargeOrderVO.platformType|platformTypeFilter}}{{elem.rechargeOrderVO.rechargeType|rechargeTypeFilter}}</span></div>
            <div class="manage-contn bg-faf">
                <div class="mancon-img fl"><i class="f22 color-fff bg-000">{{elem.rechargeOrderVO.rechargeType|rechargeTypeFilter}}</i>
                  <span class="middle"></span><img :src="elem.rechargeOrderVO.gameImg" v-if="elem.rechargeOrderVO.gameImg"><img v-else src="~images/default_img.jpg"></div>
                <div class="mancon-tn py-15">
                    <div class="tn-hxtxt f26 color-666">{{elem.rechargeOrderVO.denomination}}{{elem.rechargeOrderVO.unitName?elem.rechargeOrderVO.unitName:''}}{{'='+elem.rechargeOrderVO.price+'元'}}</div>
                    <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.rechargeOrderVO.orderId}}</div>
                    <div class="tn-hxtxt f26 color-666">商品价格：{{elem.rechargeOrderVO.totalAmount}}元</div>
                </div>
            </div>
        </div>
        <div class="mancon-titl px-30 py-30 bg-fff border-bottom "><span class="title-curent f30 pl-30 color-000 buyct-why">{{elem.rechargeOrderVO.status|rechargeStatusFilter}}</span></div>
        <div class="mancon-btn pr-20 py-20 bg-fff border-bottom "><a class="f30 color-fff bg-m1" @click="rechargePay(elem.rechargeOrderVO.orderId)">去付款</a></div>

        </div>

    </template>

      <div class="loading" v-show="loading" >加载中...</div>
      <div  class="list-empty bg-fff" v-show="orderMob1.length===0&&!loading">
        <p ><img src="~images/gamelogo.png"></p>
        <span >您还没有订单</span>
      </div>

  </div>

  <!--待付款-->
  <!--已付款-->
        <div class="seller-02" v-show="payStatus===2">
          <template v-for="elem in orderMob2">
          <div class="sellnage-connt mb-20" v-if="elem.orderListVO">
            <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.orderListVO.orderId, elem.orderListVO.goodsType)">
              <div class="manage-titl py-30 f28">
                <span class=" fl mr-30 fontbold" v-if="elem.orderListVO.propertyValuesTitle">{{elem.orderListVO.propertyValuesTitle}}</span>
                <span class=" fl mr-30 fontbold" v-else>{{elem.orderListVO.title}}</span>
              </div>
                <div class="manage-contn bg-faf">
                    <div class="mancon-img fl">
                      <i class="f22 color-fff bg-000">{{elem.orderListVO.goodsType|goodsTypeFilter}}</i>
                      <span class="middle"></span><img :src="elem.orderListVO.goodsImg" v-if="elem.orderListVO.goodsImg"><img v-else src="~images/default_img.jpg"></div>
                    <div class="mancon-tn py-15">
                        <div class="tn-hxtxt f26 color-666">{{elem.orderListVO.gameName}} /{{elem.orderListVO.regionName}} /{{elem.orderListVO.serverName}} </div>
                        <div class="tn-hxtxt f26 color-666 " v-if="elem.orderListVO.goodsType!=3">订单编号：{{elem.orderListVO.orderId}}</div>
                        <div class="tn-hxtxt f26 color-666" v-if="elem.orderListVO.goodsType===3">购买数量：{{elem.orderListVO.unitNum}}{{elem.orderListVO.unitName}}</div>
                        <div class="tn-hxtxt f26 color-666" >商品价格：{{elem.orderListVO.totalAmount}}元</div>
                    </div>
                </div>
            </div>
                <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                  <span class="title-curent f30 pl-30 color-000 buyct-why" v-if="elem.orderListVO.insuranceOrderStatus">
                    {{elem.orderListVO.insuranceOrderStatus|insuranceOrderStatusFilter}}
                  </span>
                  <span class="title-curent f30 pl-30 color-000 buyct-why" v-else>
                    <template v-if="elem.orderListVO.status==8&&elem.orderListVO.goodsType==3">
                      已付款
                    </template>
                    <template v-else>
                    {{elem.orderListVO.status|mobGoodsStatusFilter}}
                    </template>
                  </span>
                </div>
                <div class="mancon-btn pr-20 py-20 bg-fff border-bottom " v-if="elem.orderListVO.goodsType===1">
                  <a class="f30 color-fff border border-color bg-m1 fr" @click="confirmEq(elem.orderListVO.orderId)" v-if="elem.orderListVO.status===3">确认收货</a>
                  <template v-if="elem.orderListVO.isAxm">
                    <a class="f30 color-m1 border border-color fr"  @click="appeal(elem.orderListVO.orderId)"
                      v-if="
                      (elem.orderListVO.insuranceOrderStatus==55||
                      elem.orderListVO.insuranceOrderStatus==53||
                      elem.orderListVO.insuranceOrderStatus==7||
                      elem.orderListVO.insuranceOrderStatus==8)&&elem.orderListVO.goodsType!=2
                      ">申诉</a>
                   <a class="f30 color-m1 border border-color fr"
                     @click="eqRefund(elem.orderListVO.orderId, elem.orderListVO.goodsType, elem.orderListVO.gameType)"
                     v-else-if="!elem.orderListVO.insuranceOrderStatus&&(elem.orderListVO.status===3||elem.orderListVO.status===2)">申请退款</a>
                  </template>
                  <template v-else>
                    <a class="f30 color-m1 border border-color fr"
                      @click="eqRefund(elem.orderListVO.orderId, elem.orderListVO.goodsType, elem.orderListVO.gameType)"
                      v-if="elem.orderListVO.status===3||elem.orderListVO.status===2">申请退款</a>
                  </template>

                </div>
                <div class="mancon-btn pr-20 py-20 bg-fff border-bottom " v-else-if="elem.orderListVO.goodsType===2">
                  <a class="f30 color-fff border border-color bg-m1 fr" @click="getAccount(elem.orderListVO.orderId, 'mobgoods')" v-if="elem.orderListVO.status===3">提取账号</a>

                    <a class="f30 color-m1 border border-color fr" @click="getService(elem.orderListVO.orderId)">联系客服</a>
                    <!--<a class="f30 color-fff bgm1 fr"  @click="goCloudCheck(elem.orderListVO.goodsId,elem.orderListVO.orderId)" >查验账号</a>-->
                    <i class="titcur fr" @click="mwhyClick(elem.orderListVO.orderId)"></i>
                </div>
                 <!-- <div class="mancon-btn pr-20 py-20 bg-fff border-bottom " v-else>
                   <a class="f30 color-m1 border border-color fr" @click="getService(elem.orderListVO.orderId)">联系客服</a></i>
                   <i class="titcur fr" @click="mwhyClick(elem.orderListVO.orderId)"></i>
                 </div> -->
            </div>

            <div class="sellnage-connt mb-20" v-else>
              <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.rechargeOrderVO.orderId, 'recharge', elem.rechargeOrderVO.rechargeType===2?1:0)">
                <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.rechargeOrderVO.gameName}}{{elem.rechargeOrderVO.platformType|platformTypeFilter}}{{elem.rechargeOrderVO.rechargeType|rechargeTypeFilter}}</span></div>
                  <div class="manage-contn bg-faf">
                      <div class="mancon-img fl"><i class="f22 color-fff bg-000">{{elem.rechargeOrderVO.rechargeType|rechargeTypeFilter}}</i>
                        <span class="middle"></span><img :src="elem.rechargeOrderVO.gameImg" v-if="elem.rechargeOrderVO.gameImg"><img v-else src="~images/default_img.jpg"></div>
                      <div class="mancon-tn py-15">
                          <div class="tn-hxtxt f26 color-666">{{elem.rechargeOrderVO.denomination}}{{elem.rechargeOrderVO.unitName?elem.rechargeOrderVO.unitName:''}}{{'='+elem.rechargeOrderVO.price+'元'}}</div>
                          <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.rechargeOrderVO.orderId}}</div>
                          <div class="tn-hxtxt f26 color-666">商品价格：{{elem.rechargeOrderVO.totalAmount}}元</div>
                      </div>
                  </div>
              </div>
                  <div class="mancon-titl px-30 py-30 bg-fff border-bottom "><span class="title-curent f30 pl-30 color-000 buyct-why">{{elem.rechargeOrderVO.status|rechargeStatusFilter}}</span></div>
                   <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                     <a class="f30 color-fff border border-color bg-m1 fr"
                      @click="rechargeAccount({orderId:elem.rechargeOrderVO.orderId})" v-if="elem.rechargeOrderVO.status===3&&elem.rechargeOrderVO.rechargeType===2">提取账号</a>
                     <a class="f30 color-m1 border border-color fr" :href="'/recharge/buyerHuanxin.html?buyerHxAccount='+elem.rechargeOrderVO.buyerHxAccount+'&buyerHxPassword='+elem.rechargeOrderVO.buyerHxPassword+'&sellerHxAccount='+elem.rechargeOrderVO.sellerHxAccount+'&orderId='+elem.rechargeOrderVO.orderId+'&shopsId='+elem.rechargeOrderVO.shopsId" >联系卖家<div v-if="elem.rechargeOrderVO.buyerHxMessage > 0" class="contantSeller">{{elem.rechargeOrderVO.buyerHxMessage}}</div></a>
                     <a class="f30 color-m1 border border-color fr" :href="'tel:'+elem.rechargeOrderVO.sellerPhone">拨打电话</a>
                     <a class="f30 color-m1 border border-color fr" v-if="elem.rechargeOrderVO.status!=10" @click="refund({orderId:elem.rechargeOrderVO.orderId,status:elem.rechargeOrderVO.status})">我要退款</a>
                   </div>

              </div>
          </template>

          <div class="loading" v-show="loading" >加载中...</div>
          <div  class="list-empty bg-fff" v-show="orderMob2.length===0&&!loading">
            <p ><img src="~images/gamelogo.png"></p>
            <span >您还没有订单</span>
          </div>

        </div>
        <!--已付款-->

        <!--交易成功-->
        <div class="seller-03" v-show="payStatus===3">
          <template v-for="elem in orderMob3">
          <div class="sellnage-connt mb-20" v-if="elem.orderListVO">
            <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.orderListVO.orderId, elem.orderListVO.goodsType)">
              <div class="manage-titl py-30 f28">
                <span class=" fl mr-30 fontbold" v-if="elem.orderListVO.propertyValuesTitle">{{elem.orderListVO.propertyValuesTitle}}</span>
                <span class=" fl mr-30 fontbold" v-else>{{elem.orderListVO.title}}</span>
              </div>
                <div class="manage-contn bg-faf">
                    <div class="mancon-img fl">
                      <i class="f22 color-fff bg-000">{{elem.orderListVO.goodsType|goodsTypeFilter}}</i>
                      <span class="middle"></span><img :src="elem.orderListVO.goodsImg" v-if="elem.orderListVO.goodsImg"><img v-else src="~images/default_img.jpg"></div>
                    <div class="mancon-tn py-15">
                        <div class="tn-hxtxt f26 color-666">{{elem.orderListVO.gameName}} /{{elem.orderListVO.regionName}} /{{elem.orderListVO.serverName}} </div>
                        <div class="tn-hxtxt f26 color-666 " v-if="elem.orderListVO.goodsType!=3">订单编号：{{elem.orderListVO.orderId}}</div>
                        <div class="tn-hxtxt f26 color-666" v-if="elem.orderListVO.goodsType===3">购买数量：{{elem.orderListVO.unitNum}}{{elem.orderListVO.unitName}}</div>
                        <div class="tn-hxtxt f26 color-666" >商品价格：{{elem.orderListVO.totalAmount}}元</div>
                    </div>
                </div>
            </div>
              <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                <span class="title-curent f30 pl-30 color-000 buyct-why" v-if="elem.orderListVO.insuranceOrderStatus">
                  {{elem.orderListVO.insuranceOrderStatus|insuranceOrderStatusFilter}}
                </span>
                <span class="title-curent f30 pl-30 color-000 buyct-why" v-else>
                  {{elem.orderListVO.status|rechargeStatusFilter}}
                </span>
              </div>
                <div class="mancon-btn pr-20 py-20 bg-fff border-bottom " v-if="elem.orderListVO.goodsType===1">
                  <a class="f30 color-fff border border-color bg-m1 fr" @click="confirmEq(elem.orderListVO.orderId)" v-if="elem.orderListVO.status===3">确认收货</a>
                  <template v-if="elem.orderListVO.isAxm">
                    <a class="f30 color-m1 border border-color fr"  @click="appeal(elem.orderListVO.orderId)"
                      v-if="
                      (elem.orderListVO.insuranceOrderStatus==55||
                      elem.orderListVO.insuranceOrderStatus==53||
                      elem.orderListVO.insuranceOrderStatus==7||
                      elem.orderListVO.insuranceOrderStatus==8)&&elem.orderListVO.goodsType!=2
                      ">申诉</a>
                    <a class="f30 color-m1 border border-color fr"
                       @click="accountRefund(elem.orderListVO.orderId)" v-else-if="!elem.orderListVO.insuranceOrderStatus&&elem.orderListVO.status===4">申请退款</a>
                  </template>
                  <template v-else>
                    <a class="f30 color-m1 border border-color fr" v-if="elem.orderListVO.goodsType!=2"  @click="appeal(elem.orderListVO.orderId)" >申诉</a>
                  </template>
                </div>
                 <!-- <div class="mancon-btn pr-20 py-20 bg-fff border-bottom " v-if="elem.orderListVO.goodsType===3">
                   <a class="f30 color-m1 border border-color fr"  @click="appeal(elem.orderListVO.orderId)">申诉</a></i>
                 </div> -->
                <div class="mancon-btn pr-20 py-20 bg-fff border-bottom " v-if="elem.orderListVO.goodsType===2">
                  <a class="f30 color-fff border border-color bg-m1 fr" @click="getAccount(elem.orderListVO.orderId, 'mobgoods')">提取账号</a>
                  <template v-if="elem.orderListVO.isAxm">
                    <!-- <a class="f30 color-m1 border border-color fr"  @click="appeal(elem.orderListVO.orderId)"
                      v-if="
                      elem.orderListVO.insuranceOrderStatus==55||
                      elem.orderListVO.insuranceOrderStatus==53||
                      elem.orderListVO.insuranceOrderStatus==7||
                      elem.orderListVO.insuranceOrderStatus==8
                      ">申诉</a> -->
                    <a class="f30 color-m1 border border-color fr"
                       @click="accountRefund(elem.orderListVO.orderId)" v-if="!elem.orderListVO.insuranceOrderStatus&&elem.orderListVO.status===4">申请退款</a>
                  </template>
                  <template v-else>
                    <a class="f30 color-m1 border border-color fr" v-if="elem.orderListVO.goodsType!=2"  @click="appeal(elem.orderListVO.orderId)" >申诉</a>
                  </template>
                  <template v-if="elem.orderListVO.goodsType!=1">
                    <a class="f30 color-m1 border border-color fr" @click="getService(elem.orderListVO.orderId)">联系客服</a>
                    <i class="titcur fr" @click="mwhyClick(elem.orderListVO.orderId)"></i>
                  </template>
                </div>
            </div>

            <div class="sellnage-connt mb-20" v-else>
              <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.rechargeOrderVO.orderId, 'recharge', elem.rechargeOrderVO.rechargeType===2?1:0)">
                <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.rechargeOrderVO.gameName}}{{elem.rechargeOrderVO.platformType|platformTypeFilter}}{{elem.rechargeOrderVO.rechargeType|rechargeTypeFilter}}</span></div>
                  <div class="manage-contn bg-faf">
                      <div class="mancon-img fl"><i class="f22 color-fff bg-000">{{elem.rechargeOrderVO.rechargeType|rechargeTypeFilter}}</i>
                        <span class="middle"></span><img :src="elem.rechargeOrderVO.gameImg" v-if="elem.rechargeOrderVO.gameImg"><img v-else src="~images/default_img.jpg"></div>
                      <div class="mancon-tn py-15">
                          <div class="tn-hxtxt f26 color-666">{{elem.rechargeOrderVO.denomination}}{{elem.rechargeOrderVO.unitName?elem.rechargeOrderVO.unitName:''}}{{'='+elem.rechargeOrderVO.price+'元'}}</div>
                          <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.rechargeOrderVO.orderId}}</div>
                          <div class="tn-hxtxt f26 color-666">商品价格：{{elem.rechargeOrderVO.totalAmount}}元</div>
                      </div>
                  </div>
              </div>
                  <div class="mancon-titl px-30 py-30 bg-fff border-bottom "><span class="title-curent f30 pl-30 color-000 buyct-why">{{elem.rechargeOrderVO.status|rechargeStatusFilter}}</span></div>
                   <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
                     <a class="f30 color-m1 border border-color cancel fr" @click="appealReceive({orderId:elem.rechargeOrderVO.orderId})">申诉</a>
                     <a class="f30 color-m1 border border-color fr" :href="'/recharge/buyerHuanxin.html?buyerHxAccount='+elem.rechargeOrderVO.buyerHxAccount+'&buyerHxPassword='+elem.rechargeOrderVO.buyerHxPassword+'&sellerHxAccount='+elem.rechargeOrderVO.sellerHxAccount+'&orderId='+elem.rechargeOrderVO.orderId+'&shopsId='+elem.rechargeOrderVO.shopsId">联系卖家</a>
                     <a class="f30 color-m1 border border-color cancel fr"
                      v-if="elem.rechargeOrderVO.buyAgain&&elem.rechargeOrderVO.rechargeType==1"
                      :href="'/vue/recharge/order/'+elem.rechargeOrderVO.publishId+
                      '?buyerRoleAccount='+elem.rechargeOrderVO.buyerRoleAccount+
                      '&buyerRoleName='+elem.rechargeOrderVO.buyerRoleName+
                      '&buyerRolePwd='+elem.rechargeOrderVO.buyerRolePwd+
                      '&serverName='+elem.rechargeOrderVO.serverName+
                      '&buyerPhone='+elem.rechargeOrderVO.buyerPhone+
                      '&num='+elem.rechargeOrderVO.num"
                      >再来一单</a>
                      <a class="f30 color-m1 border border-color cancel fr"
                       v-if="elem.rechargeOrderVO.buyAgain&&(elem.rechargeOrderVO.rechargeType==2||elem.rechargeOrderVO.rechargeType==3)"
                       :href="'/vue/recharge/refill/refillInfo/'+elem.rechargeOrderVO.buyerRoleAccount"
                       >我要续充</a>
                       <a class="f30 color-m1 border border-color cancel fr"
                        v-if="elem.rechargeOrderVO.buyAgain&&elem.rechargeOrderVO.rechargeType==4"
                        :href="'/vue/recharge/quickRecharge?buyerRoleAccount='+elem.rechargeOrderVO.buyerRoleAccount+
                        '&num='+elem.rechargeOrderVO.num+
                        '&buyerPhone='+elem.rechargeOrderVO.buyerPhone+
                        '&buyerRolePwd='+elem.rechargeOrderVO.buyerRolePwd+
                        '&denomination='+elem.rechargeOrderVO.denomination
                        "
                        >再来一单</a>
                   </div>


              </div>
          </template>

          <div class="loading" v-show="loading" >加载中...</div>
          <div  class="list-empty bg-fff" v-show="orderMob3.length===0&&!loading">
            <p ><img src="~images/gamelogo.png"></p>
            <span >您还没有订单</span>
          </div>

        </div>
        <!--交易成功-->

        <!--交易取消-->
        <div class="seller-04" v-show="payStatus===4">
          <template v-for="elem in orderMob4">
          <div class="sellnage-connt mb-20" v-if="elem.orderListVO">
            <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.orderListVO.orderId, 2)">
              <div class="manage-titl py-30 f28">
                <span class=" fl mr-30 fontbold" v-if="elem.orderListVO.propertyValuesTitle">{{elem.orderListVO.propertyValuesTitle}}</span>
                <span class=" fl mr-30 fontbold" v-else>{{elem.orderListVO.title}}</span>
              </div>
                <div class="manage-contn bg-faf">
                    <div class="mancon-img fl">
                      <i class="f22 color-fff bg-000">{{elem.orderListVO.goodsType|goodsTypeFilter}}</i>
                      <span class="middle"></span><img :src="elem.orderListVO.goodsImg" v-if="elem.orderListVO.goodsImg"><img v-else src="~images/default_img.jpg"></div>
                    <div class="mancon-tn py-15">
                        <div class="tn-hxtxt f26 color-666">{{elem.orderListVO.gameName}} /{{elem.orderListVO.regionName}} /{{elem.orderListVO.serverName}} </div>
                        <div class="tn-hxtxt f26 color-666 " v-if="elem.orderListVO.goodsType!=3">订单编号：{{elem.orderListVO.orderId}}</div>
                        <div class="tn-hxtxt f26 color-666" v-if="elem.orderListVO.goodsType===3">购买数量：{{elem.orderListVO.unitNum}}{{elem.orderListVO.unitName}}</div>
                        <div class="tn-hxtxt f26 color-666" >商品价格：{{elem.orderListVO.totalAmount}}元</div>
                    </div>
                </div>
            </div>
            <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
              <span class="title-curent f30 pl-30 color-000 fl buyct-why " v-if="elem.orderListVO.cancelReason">取消原因：{{elem.orderListVO.cancelReason|cancelReasonFilter}}</span>
              <span class="title-curent f30 pl-30 color-000 fl buyct-why " v-else-if="elem.orderListVO.complainResult">取消原因：{{elem.orderListVO.complainResult|complainResultFilter}}</span>
              <span class="title-curent f30 pl-30 color-000 fl buyct-why " v-else-if="elem.orderListVO.otherReason">取消原因：{{elem.orderListVO.otherReason}}</span>
            </div>

            <template v-if="elem.orderListVO.goodsType!=1&&elem.orderListVO.goodsType!=3&&elem.orderListVO.status!=6">
            <div class="mancon-btn pr-20 py-20 bg-fff border-bottom ">
              <a class="f30 color-m1 border border-color fr" @click="getService(elem.orderListVO.orderId)">联系客服</a>
              <i class="titcur fr" @click="mwhyClick(elem.orderListVO.orderId)"></i>
            </div>
            </template>

            </div>

            <div class="sellnage-connt mb-20" v-else>
              <div class="manage-caption px-30  bg-fff" @click="goOrder(elem.rechargeOrderVO.orderId, 'recharge', elem.rechargeOrderVO.rechargeType===2?1:0)">
                <div class="manage-titl py-30 f28"><span class=" fl mr-30 fontbold">{{elem.rechargeOrderVO.gameName}}{{elem.rechargeOrderVO.platformType|platformTypeFilter}}{{elem.rechargeOrderVO.rechargeType|rechargeTypeFilter}}</span></div>
                  <div class="manage-contn bg-faf">
                      <div class="mancon-img fl"><i class="f22 color-fff bg-000">{{elem.rechargeOrderVO.rechargeType|rechargeTypeFilter}}</i>
                        <span class="middle"></span><img :src="elem.rechargeOrderVO.gameImg" v-if="elem.rechargeOrderVO.gameImg"><img v-else src="~images/default_img.jpg"></div>
                      <div class="mancon-tn py-15">
                          <div class="tn-hxtxt f26 color-666">{{elem.rechargeOrderVO.denomination}}{{elem.rechargeOrderVO.unitName?elem.rechargeOrderVO.unitName:''}}{{'='+elem.rechargeOrderVO.price+'元'}}</div>
                          <div class="tn-hxtxt f26 color-666 ">订单编号：{{elem.rechargeOrderVO.orderId}}</div>
                          <div class="tn-hxtxt f26 color-666">商品价格：{{elem.rechargeOrderVO.totalAmount}}元</div>
                      </div>
                  </div>
              </div>
              <div class="mancon-titl px-30 py-30 bg-fff border-bottom ">
                <span class="title-curent f30 pl-30 color-000 fl buyct-why ">取消原因：{{elem.rechargeOrderVO.status|rechargeStatusFilter}}</span>
              </div>

              </div>
          </template>

          <div class="loading" v-show="loading" >加载中...</div>
          <div  class="list-empty bg-fff" v-show="orderMob4.length===0&&!loading">
            <p ><img src="~images/gamelogo.png"></p>
            <span >您还没有订单</span>
          </div>
        </div>
        <!--交易取消-->
</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import loadingComponent from 'components/common/Loading.vue'
import { rechargeTypeFilter,
    rechargeStatusFilter,
    platformTypeFilter,
    goodsTypeFilter,
    cancelReasonFilter,
    complainResultFilter,
    mobGoodsStatusFilter,
    insuranceOrderStatusFilter } from 'components/common/filters'

export default {
  data() {
    return {

    }
  },
  components: {
    loadingComponent
  },
  watch: {
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
        loading: state => {
          return state.buyerCenter.loading
        },
        orderMob1: state => {
          return state.buyerCenter.orderMob1
        },
        orderMob2: state => {
          return state.buyerCenter.orderMob2
        },
        orderMob3: state => {
          return state.buyerCenter.orderMob3
        },
        orderMob4: state => {
          return state.buyerCenter.orderMob4
        },
        serviceData: state => {
          return state.buyerCenter.serviceData
        },
        maypayUrl: state => {
          return state.buyerCenter.maypayUrl
        }

    }),
    ...mapGetters({
        //curSort: 'choice/SORTSTATUSNAME',
    })
  },
  filters:{
    rechargeTypeFilter,
    rechargeStatusFilter,
    platformTypeFilter,
    goodsTypeFilter,
    mobGoodsStatusFilter,
    complainResultFilter,
    insuranceOrderStatusFilter,
    cancelReasonFilter
  },
  methods: {
      goCloudCheck(goodsId,orderId){
          var hostname = window.location.hostname;
          var port = window.location.port;
          //console.log(hostname+":"+port+"/vue/buyerCenter/cloudCheck?goodsId="+goodsId)
          window.location.href="http://"+hostname+":"+port+"/vue/buyerCenter/cloudCheck?goodsId="+goodsId+"&orderId="+orderId;
      },
    eqRefund(orderId, goodsType, gameType) {
      location.href = '/member/member-buyer-refund.html?orderId='+orderId+'&goodsType='+goodsType+'&gameType='+gameType
    },
    async mwhyClick(orderId) {
      await this.openServiceQQ({orderId:orderId})
      if (this.serviceData.serviceQQ) {
        this.$messagebox({
          message: "如点击联系客服无法启动QQ，请加客服QQ号("+this.serviceData.serviceQQ+")"
        })
      } else {
        this.$messagebox({
          message: "该订单正在分配客服"
        })
      }
    },
    confirmEq(orderId) {
      location.href = '/member/member-buyer-equipment-transaction.html?orderId=' + orderId
    },
    rechargePay(orderId) {
      location.href = '/recharge/recharge-paying.html?orderId=' + orderId
    },
    async mobPay(orderId, goodsType) {
      let returnUrl;
      if (goodsType == 1) {
        returnUrl = location.protocol + '//' +location.hostname + '/member/member-buyer-equipment-transaction.html?orderId='+ orderId
      } else {
        returnUrl = location.protocol + '//' +location.hostname + '/vue/buyerCenter/buyerOrder/mobgoods/'+orderId+'?from=payed'
      }
      if (orderId.indexOf('MAO')>-1||orderId.indexOf('MEO')>-1||orderId.indexOf('MGO')>-1) {
        await this.maypay({
          orderId: orderId,
          returnUrl: returnUrl
        })
        if (this.maypayUrl) {
          location.href = this.maypayUrl
        }
      } else {
        this.$router.push({
          name:'singlePay',
          params: {
            orderId: orderId
          }
        })
      }
    },
    appeal(orderId) {
      location.href = '/member/member-buyer-appeal.html?orderId='+orderId
    },
    appealReceive(orderId) {
      this.$messagebox({
        title:'提示',
        message: "交易已经成功，发起申诉，将由客服鉴定是否退款？",
        showCancelButton: true
      }).then((action)=>{
        if (action === 'confirm') {
          this.appealReceiveAction(orderId)
        }
      })
    },
    accountRefund(orderId) {
      location.href = '/member/complaint-axm.html?orderId='+orderId
    },
    async getService(orderId) {
      await this.openServiceQQ({orderId:orderId})
      if (this.serviceData.isOpenQQ) {
         if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
           this.$messagebox({
             message: "如点击联系客服无法启动QQ，请加客服QQ号("+this.serviceData.serviceQQ+")"
           })
         }else {
           window.location.assign('mqqwpa://im/chat?chat_type=wpa&uin=' + this.serviceData.serviceQQ + '&version=1&src_type=web&web_src=oicqzone.com')
         }
      } else {
        location.href="/member/huanxin.html?orderId="+orderId+"&isSeller=false"
      }
    },
    getAccount(orderId, type) {
      this.$router.push({
        name: 'getAccount',
        params: {type:type,orderId:orderId}
      })
    },
    refund(params) {
      if (params.status === 2) {
        this.$messagebox({
          title:'提示',
          message: "确定发起退款吗？",
          showCancelButton: true
        }).then((action)=>{
          if (action === 'confirm') {
            this.rechargeRefund({orderId:params.orderId})
          }
        })
      } else {
        this.$messagebox({
          title:'提示',
          message: "卖家已发货！发起申诉，将由客服鉴定是否退款？",
          showCancelButton: true
        }).then((action)=>{
          if (action === 'confirm') {
            this.appealSure({orderId:params.orderId})
          }
        })
      }

    },
    goOrder(orderId, type, isFirstRecharge) {
      if (type === 'recharge') {
        location.href = '/recharge/recharge-buyer-detail1.html?isFirstRecharge='+isFirstRecharge+'&isCallPhone=1&orderId='+orderId+'&payStatus='+this.payStatus
      } else {
        if (type == 2||type == 3) {
          this.$router.push({
            name: 'buyerOrder',
            params: {orderId:orderId, type:'mobgoods'}
          })
        } else if(type ==1&&this.payStatus==2) {
          location.href = '/member/member-buyer-equipment-transaction.html?orderId='+orderId
        }
      }
    },
    ...mapActions({
      rechargeRefund: 'buyerCenter/RECHARGEREFUND',
      appealSure: 'buyerCenter/APPEALSURE',
      openServiceQQ: 'buyerCenter/OPENSERVICEQQ',
      appealReceiveAction:'buyerCenter/APPEALRECEIVE',
      rechargeAccount: 'buyerCenter/QUERYORDERDETAIL',
      maypay: 'buyerCenter/MAYPAY',
      clearErr: 'buyerCenter/CLEAR_ERR',
      clearWarn: 'buyerCenter/CLEAR_WARN',
    })
  }
}
</script>
<style src="css/common/member-cxy.css" ></style>
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
.mancon-btn a{
  position: relative;
}
.contantSeller{
  position: absolute;
  top: -.2rem;
  background: #C92025;
  color: #fff;
  width: .45rem;
  height: .45rem;
  right: -.1rem;
  line-height: 0.45rem !important;
  border-radius: 10rem;
}
.bgm1{ background-color:#f75e46;}
</style>
