<template>
  <div >
    <div id="wrapper" class="pb-150" v-show="!yyhXyShow">
    <!--顶部fixed部分-->
    <div class="fixed-top fixed-box" v-if="!app">
        <div class="top-header border-bottom">
            <div class="top-back"><a @click="goRouter"></a></div>
            <h2 class="f36">订单详情</h2>
            <div class="top-right"></div>
        </div>
    </div>
	<div class="mt-97" v-if="!app"></div>

    <template v-if="type==='shouyou'&& orderDetail">

      <template v-if="orderDetail.OrderStatus===2||orderDetail.OrderStatus===3||orderDetail.OrderStatus===4">
        <div class="bg-m1 f32 color-fff order_top_tip">
         <span class="icon_mon" v-if="!orderDetail.IsQuickPublishOrder">您已付款，请 <a class="bg-fff color-m1" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a> 确认购买</span>
         <span class="icon_mon" v-if="orderDetail.IsQuickPublishOrder&&orderDetail.OrderStatus!=4">支付成功，请 <a class="bg-fff color-m1" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a> 提取账号资料</span>
         <span class="icon_firm" v-if="orderDetail.IsQuickPublishOrder&&orderDetail.OrderStatus==4">交易成功</span>
       </div>
     <div class="testSteps_box bg-fff border-bottom" v-if="!orderDetail.IsQuickPublishOrder" >
      <div class="testStep_num">
          <ul class="lineUl">
              <li class="line ok"></li>
              <li class="line ok"></li>
              <li class="line ok"></li>
              <li class="line" :class="{ok:orderDetail.OrderStatus===3}"></li>
              <li class="line" :class="{ok:orderDetail.OrderStatus===3}"></li>
              <li class="line" :class="{ok:orderDetail.OrderStatus===4}"></li>
              <li class="line" :class="{ok:orderDetail.OrderStatus===4}"></li>
              <li class="line" :class="{ok:orderDetail.OrderStatus===4}"></li>
          </ul>
          <ul class="stepNum">
              <li class="ok">
                  <i></i>
                  <span>支付下单</span>
              </li>
              <li class="ok">
                  <i></i>
                  <span>验证帐号</span>
              </li>
              <li :class="orderDetail.OrderStatus===3?'ok':'no'">
                  <i></i>
                  <span>确认购买</span>
              </li>
              <li :class="orderDetail.OrderStatus===4?'ok':'no'">
                  <i></i>
                  <span>提取帐号</span>
              </li>
          </ul>
      </div>
  </div>



     <div class="test_img_box bg-fff" v-if="orderDetail.OrderStatus===3||orderDetail.OrderStatus===4&&!orderDetail.IsQuickPublishOrder" @click="show(0)">
         <div class="test_img">
             <img :src="orderDetail.Images[0].OriginalUrl" v-if="orderDetail.Images&&orderDetail.Images[0]">
             <img src="~images/default_img.jpg" v-else>
             <div class="img_total f20 color-fff">
                 <i class="icon-phone fl"></i>
                 <span class="fl">{{orderDetail.Images.length}}</span>
             </div>
         </div>
         <a class="refresh color-666 f26 pt-20" >点击图片查看大图</a>
         <p class="f32 color-m1 mt-20">亲！若您对帐号满意，请联系客服确认购买<br>若您不满意，请联系客服退款</p>
     </div>
     <div class="test_img_box mt-20 bg-fff" v-else-if="orderDetail.OrderStatus===2&&!orderDetail.IsQuickPublishOrder" @click="reload">
       <a >
         <div class="test_img">
             <img src="~images/test.png" alt="">
         </div>
         </a>
         <a class="refresh color-666 f26 pt-20" >点击刷新</a>
         <p class="f32 mt-20 color-m1">亲！客服人员正帮您验证帐号信息<br>请在10分钟后刷新页面，即可查看最新截图</p>
     </div>

     <div class="detail_container bg-fff mt-20 clearfix">
         <img class="game_logo fl" v-if="imgpath&&!orderDetail.IsQuickPublishOrder" :src="imgpath" >
         <img class="game_logo fl" v-else src="~images/default_img.jpg" >
         <div>
             <p class="f30 color-000 detal-hg">{{orderDetail.GoodsName}}</p>
             <p class="f30 mt-10 color-000">￥{{orderDetail.Price}}</p>
         </div>
     </div>

     <div class="detail_container bg-fff mt-20 border-bottom">
         <p class="f30 mb-30"><span class="color-666 pr-30">游戏区服</span><span class="color-000">{{orderDetail.GameName}} /{{orderDetail.OperatorName}} /{{orderDetail.AreaName}}</span></p>
         <p class="f30"><span class="color-666 pr-30">商品类型</span><span class="color-000">游戏帐号</span><span v-if="orderDetail.IsQuickPublishOrder">--{{orderDetail.CategoryTypeName}}</span></p>
     </div>
     <div class="detail_container bg-fff border-bottom" v-if="orderDetail.IsQuickPublishOrder">
         <p class="f30"><span class="color-666 pr-30 quick">{{orderDetail.CategoryTypeName}}</span><span class="color-000">{{orderDetail.GameStartAccountUnit}}</span></p>
     </div>

     <div class="detail_container bg-fff">
         <p class="f30 mb-30"><span class="color-666 pr-30">订单编号</span><span class="color-666" >{{orderDetail.OrderId}}</span>
           <a class="copy ml-20 color-666" @click="Copy" :data-clipboard-text="orderDetail.OrderId" id="copy">复制</a></p>
         <p class="f30"><span class="color-666 pr-30">下单时间</span><span class="color-666">{{orderDetail.CreatedDate}}</span></p>
     </div>

     <div class="detail_container bg-fff mt-20 border-bottom">
         <p class="f30 mb-30"><span class="color-666 pr-30">商品价格</span><span class="color-666 fr">￥{{orderDetail.Price}}</span></p>
     </div>
     <div class="total_container bg-fff border-bottom">
         <p class="f30 mb-30"><span class="color-m1 fr ml-30">￥{{orderDetail.Price}}</span><span class="color-666 fr">合计</span></p>
     </div>

     <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.OrderStatus===4">
       <a class="f30 color-fff border border-color bg-m1 fr" @click="getAccount(orderDetail.OrderId, 'shouyou')" v-if="!orderDetail.IsQuickPublishOrder">提取帐号</a>
       <a class="f30 color-m1 border border-color cancel fr" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a>
       <i class="titcur fr" @click="whyClick(orderDetail.CustomServiceQQ)"></i>
     </div>

     <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-else>
       <a class="f30 color-m1 border border-color cancel fr" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a>
       <i class="titcur fr" @click="whyClick(orderDetail.CustomServiceQQ)"></i>
     </div>
      </template>


    <template v-else>

    <div class="bg-999 f32 color-fff order_top_tip" v-show="orderDetail.OrderStatus > 5">
        <span class="icon_fail">交易取消<em class="f28 ml-20"> 取消原因：{{CancelRemark}}</em></span>
    </div>
    <div class="bg-m1  f32 color-fff order_top_tip clearfix" v-if="orderDetail.OrderStatus == 1">
      <p class="line-40"><span class="icon_wait">等待付款</span>
        <!-- <span class="fr f26">剩余时间：
          <clocker
                :time="Date.parse(orderDetail.CreatedDate)+30*60*1000"
                @on-finish="onFinish('shouyou')"
                :format="' %M 分 %S 秒'"></clocker>
        </span> -->
      </p>
      <p class="line-40"><span class="fr f26">需付款：{{orderDetail.Price}}元</span></p>
    </div>
    <div class="bg-2a f32 color-fff order_top_tip" v-show="!orderDetail.IsQuickPublishOrder&&orderDetail.OrderStatus == 5">
      <span class="icon_firm">交易成功，请提取帐号资料</span>
    </div>
        <div class="bg-m1 f32 color-fff order_top_tip" v-if="orderDetail.IsQuickPublishOrder&&orderDetail.OrderStatus==5">
            <span class="icon_firm"> 交易成功</span>
        </div>
    <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-show="orderDetail.OrderStatus == 2">
      <p class="line-40"><span class="icon_firm">已付款，请等待客服发货</span></p>
    </div>
    <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-show="orderDetail.OrderStatus == 3">
      <p class="line-40"><span class="icon_firm">已付款，请等待客服发货</span></p>
    </div>
    <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-show="orderDetail.OrderStatus == 4">
      <p class="line-40"><span class="icon_firm">已付款，客服已发货</span></p>
    </div>

    <div class="detail_container bg-fff clearfix">
        <img class="game_logo fl" v-if="imgpath&&!orderDetail.IsQuickPublishOrder" :src="imgpath" >
        <img class="game_logo fl" v-else src="~images/default_img.jpg" >
        <div>
            <p class="f30 color-000">{{orderDetail.GoodsName}}</p>
            <p class="f30 mt-20 color-000">￥{{orderDetail.Price}}</p>
        </div>
    </div>

    <div class="detail_container bg-fff mt-20 border-bottom">
        <p class="f30 mb-30"><span class="color-666 pr-30">游戏区服</span><span class="color-000">{{orderDetail.GameName}} /{{orderDetail.OperatorName}} /{{orderDetail.AreaName}}</span></p>
        <p class="f30"><span class="color-666 pr-30">商品类型</span><span class="color-000">游戏帐号</span><span v-if="orderDetail.IsQuickPublishOrder">--{{orderDetail.CategoryTypeName}}</span></p>
    </div>
        <div class="detail_container bg-fff border-bottom" v-if="orderDetail.IsQuickPublishOrder">
            <p class="f30"><span class="color-666 pr-30 quick">{{orderDetail.CategoryTypeName}}</span><span class="color-000">{{orderDetail.GameStartAccountUnit}}</span></p>
        </div>
    <div class="detail_container bg-fff">
        <p class="f30 mb-30"><span class="color-666 pr-30">订单编号</span><span class="color-666" >{{orderDetail.OrderId}}</span>
          <a class="copy ml-20 color-666" @click="Copy" :data-clipboard-text="orderDetail.OrderId" id="copy">复制</a></p>
        <p class="f30"><span class="color-666 pr-30">下单时间</span><span class="color-666">{{orderDetail.CreatedDate}}</span></p>
    </div>

    <div class="detail_container bg-fff mt-20 border-bottom">
        <p class="f30 mb-30"><span class="color-666 pr-30">商品价格</span><span class="color-666 fr">￥{{orderDetail.Price}}</span></p>
    </div>
    <div class="total_container bg-fff border-bottom">
        <p class="f30 mb-30"><span class="color-m1 fr ml-30">￥{{orderDetail.Price}}</span><span class="color-666 fr">合计</span></p>
    </div>



    <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.OrderStatus == 2">
      <a class="f30 color-m1 border border-color cancel fr" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a>
      <i class="titcur fr" @click="whyClick(orderDetail.CustomServiceQQ)"></i>
    </div>

    <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.OrderStatus == 1">
      <a class="f30 color-fff border border-color fr" :class="paysta?'bg-m1':'bg-666'"  @click="shouyouPay(orderDetail.OrderId)">{{paytext}}</a>
      <!-- <a class="f30 color-m1 border border-color cancel fr" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a>
      <i class="titcur fr" @click="whyClick(orderDetail.CustomServiceQQ)"></i> -->
    </div>

    <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.OrderStatus == 3||orderDetail.OrderStatus == 4||orderDetail.OrderStatus == 5">
      <a class="f30 color-fff border border-color bg-m1 fr" v-if="!orderDetail.IsQuickPublishOrder" @click="getAccount(orderDetail.OrderId, 'shouyou')">提取帐号</a>
      <a class="f30 color-m1 border border-color cancel fr" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a>
      <i class="titcur fr" @click="whyClick(orderDetail.CustomServiceQQ)"></i>
    </div>
    </template>
  </template>

    <template v-if="type==='pcgoods'&& orderDetail">
    <template v-if="((orderDetail.OrderStatusValue=='0'&&orderDetail.PayStatus=='2')||orderDetail.OrderStatusValue=='3')&&orderDetail.BasicType=='2'">
      <div class="bg-m1 f32 color-fff order_top_tip">
       <span class="icon_mon" v-if="!orderDetail.IsQuickPublishOrder">您已付款，请 <a class="bg-fff color-m1" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a> 确认购买</span>
       <span class="icon_mon" v-if="orderDetail.IsQuickPublishOrder">交易成功，请 <a class="bg-fff color-m1" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a> 提取账号资料</span>
      </div>
      <div class="testSteps_box bg-fff border-bottom" v-if="!orderDetail.IsQuickPublishOrder">
      <div class="testStep_num">
        <ul class="lineUl">
            <li class="line ok"></li>
            <li class="line ok"></li>
            <li class="line ok"></li>
            <li class="line" :class="{ok:orderDetail.OrderFlowStatusValue=='113'||orderDetail.OrderFlowStatusValue=='112'}"></li>
            <li class="line" :class="{ok:orderDetail.OrderFlowStatusValue=='113'||orderDetail.OrderFlowStatusValue=='112'}"></li>
            <li class="line" :class="{ok:orderDetail.OrderStatusValue=='3'}"></li>
            <li class="line" :class="{ok:orderDetail.OrderStatusValue=='3'}"></li>
            <li class="line" :class="{ok:orderDetail.OrderStatusValue=='3'}"></li>
        </ul>
        <ul class="stepNum">
            <li class="ok">
                <i></i>
                <span>支付下单</span>
            </li>
            <li class="ok">
                <i></i>
                <span>验证帐号</span>
            </li>
            <li :class="orderDetail.OrderFlowStatusValue=='113'||orderDetail.OrderFlowStatusValue=='112'?'ok':'no'">
                <i></i>
                <span>确认购买</span>
            </li>
            <li :class="orderDetail.OrderStatusValue=='4'?'ok':'no'">
                <i></i>
                <span>提取帐号</span>
            </li>
        </ul>
      </div>
      </div>



      <div class="test_img_box bg-fff" v-if="(orderDetail.OrderFlowStatusValue=='113'||orderDetail.OrderFlowStatusValue=='112')&&!orderDetail.IsQuickPublishOrder" @click="show(0)">
       <div class="test_img">
         <img :src="firstImage" v-if="firstImage">
         <img src="~images/default_img.jpg" v-else>
           <div class="img_total f20 color-fff">
               <i class="icon-phone fl"></i>
               <span class="fl">{{imageList.length}}</span>
           </div>
       </div>
       <a class="refresh color-666 f26 pt-20" >点击图片查看大图</a>
       <p class="f32 color-m1 mt-20">亲！若您对帐号满意，请联系客服确认购买<br>若您不满意，请联系客服退款</p>
      </div>
      <div class="test_img_box mt-20 bg-fff" v-else-if="orderDetail.OrderStatusValue=='0'&&!orderDetail.IsQuickPublishOrder"  @click="reload">
      <a >
       <div class="test_img">
           <img src="~images/test.png" alt="">
       </div>
       </a>
       <a class="refresh color-666 f26 pt-20" >点击刷新</a>
       <p class="f32 mt-20 color-m1">亲！客服人员正帮您验证帐号信息<br>请在10分钟后刷新页面，即可查看最新截图</p>
      </div>

      <div class="detail_container bg-fff mt-20 clearfix">
       <img class="game_logo fl" v-if="imgpath" :src="imgpath" >
       <img class="game_logo fl" v-else src="~images/default_img.jpg" >
       <div>
           <p class="f30 color-000 detal-hg">{{orderDetail.Name}}</p>
           <p class="f30 mt-10 color-000">￥{{orderDetail.Price}}</p>
       </div>
      </div>

      <div class="detail_container bg-fff mt-20 border-bottom">
       <p class="f30 mb-30"><span class="color-666 pr-30">游戏区服</span><span class="color-000">{{orderDetail.GameName}} /{{orderDetail.OperatorName||orderDetail.AreaName}} /{{orderDetail.OperatorName?orderDetail.AreaName:orderDetail.ServerName}}</span></p>
       <p class="f30"><span class="color-666 pr-30">商品类型</span><span class="color-000">游戏帐号</span><span v-if="orderDetail.IsQuickPublishOrder">--【快销号】</span></p>
      </div>

      <div class="detail_container bg-fff">
       <p class="f30 mb-30"><span class="color-666 pr-30">订单编号</span><span class="color-666" >{{orderDetail.OrderId}}</span>
         <a class="copy ml-20 color-666" @click="Copy" :data-clipboard-text="orderDetail.OrderId" id="copy">复制</a></p>
       <p class="f30"><span class="color-666 pr-30">下单时间</span><span class="color-666">{{orderDetail.CreatedDate}}</span></p>
      </div>

      <div class="detail_container bg-fff mt-20 border-bottom">
       <p class="f30 mb-30"><span class="color-666 pr-30">商品价格</span><span class="color-666 fr">￥{{orderDetail.Price}}</span></p>
          <p class="f30"  v-if="orderDetail.PostSaleIndemnityFee"><span class="color-666 pr-30">交易安全险</span><span class="color-666 fr">￥{{orderDetail.PostSaleIndemnityFee}}</span></p>
          <p class="f30"  v-if="orderDetail.VipKefuFee"><span class="color-666 pr-30">vip客服服务费</span><span class="color-666 fr">￥{{orderDetail.VipKefuFee}}</span></p>
          <p class="f30"  v-if="orderDetail.IncrementFee"><span class="color-666 pr-30">增值服务费</span><span class="color-666 fr">￥{{orderDetail.IncrementFee}}</span></p>
          <p class="f30"  v-if="orderDetail.AdditionalServiceFee"><span class="color-666 pr-30">流程服务费</span><span class="color-666 fr">￥{{orderDetail.AdditionalServiceFee}}</span></p>
          <p class="f30"  v-if="orderDetail.ActivityServiceFee"><span class="color-666 pr-30">活动服务费</span><span class="color-666 fr">￥{{orderDetail.ActivityServiceFee}}</span></p>

      </div>
      <div class="total_container bg-fff border-bottom">
          <p class="f30 mb-30"><span class="color-m1 fr ml-30">￥{{orderDetail.PaySumPrice}}</span><span class="color-666 fr">合计</span></p>
      </div>

      <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.OrderStatusValue===3">
      <a class="f30 color-fff border border-color bg-m1 fr" @click="getAccount(orderDetail.OrderId,'pcgoods')">提取帐号</a>
      <a v-if="orderDetail.KefuQQ" class="f30 color-m1 border border-color cancel fr" @click="getPcService(orderDetail.OrderId, orderDetail.ServiceType, orderDetail.KefuQQ)" >联系客服</a>
      <a v-if="!orderDetail.KefuQQ" class="f30 color-fff border bg-ddd fr">联系客服</a>
      <i class="titcur fr" @click="whyClick(orderDetail.KefuQQ)" v-if="orderDetail.KefuQQ"></i>
      </div>
      <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-else>
        <a v-if="orderDetail.KefuQQ" class="f30 color-m1 border border-color cancel fr" @click="getPcService(orderDetail.OrderId, orderDetail.ServiceType, orderDetail.KefuQQ)" >联系客服</a>
        <a v-if="!orderDetail.KefuQQ" class="f30 color-fff border bg-ddd fr">联系客服</a>
        <i class="titcur fr" @click="whyClick(orderDetail.KefuQQ)" v-if="orderDetail.KefuQQ"></i>
      </div>
    </template>

    <template v-else>
   
    <div v-if="!orderDetail.IsQuickPublishOrder" class="bg-2a f32 color-fff order_top_tip" v-show="parseInt(orderDetail.OrderStatusValue) === 4||parseInt(orderDetail.OrderStatusValue) === 5">
        <span class="icon_firm" >交易成功<template v-if="orderDetail.BasicType == '2'">，请提取帐号资料</template></span>
    </div>
    <div class="bg-m1 f32 color-fff order_top_tip" v-if="orderDetail.IsQuickPublishOrder"  v-show="parseInt(orderDetail.OrderStatusValue) === 4||parseInt(orderDetail.OrderStatusValue) === 5">
        <span class="icon_mon" >交易成功，请 <a class="bg-fff color-m1" @click="getShouyouService(orderDetail.CustomServiceQQ)">联系客服</a> 提取账号资料</span>
    </div>
  <div class="bg-999 f32 color-fff order_top_tip" v-show="parseInt(orderDetail.OrderStatusValue) === 2">
      <span class="icon_fail">交易取消<em class="f28 ml-20"> <template v-show="orderDetail.buyerCancelReason">取消原因：</template>{{orderDetail.buyerCancelReason}}</em></span>
  </div>
  <div class="bg-m1  f32 color-fff order_top_tip clearfix" v-if="parseInt(orderDetail.OrderStatusValue) === 0&&parseInt(orderDetail.PayStatus) === 0">
    <p class="line-40"><span class="icon_wait">等待付款</span>
      <!-- <span class="fr f26">剩余时间：
        <clocker
          :time="Date.parse(orderDetail.CreatedDate)+30*60*1000"
          @on-finish="onFinish('pcgoods')"
          :format="' %M 分 %S 秒'"></clocker>
      </span> -->
      </p>
    <p class="line-40"><span class="fr f26">需付款：{{orderDetail.PaySumPrice}}元</span></p>
  </div>

  <div class="detail_container bg-fff clearfix">
      <img class="game_logo fl" v-if="imgpath" :src="imgpath" >
      <img class="game_logo fl" v-else src="~images/default_img.jpg" >
      <div>
          <p class="f30 color-000">{{orderDetail.Name}}</p>
          <p class="f30 mt-20 color-000">￥{{orderDetail.Price}}</p>
      </div>
  </div>

  <div class="detail_container bg-fff mt-20 border-bottom">
      <p class="f30 mb-30"><span class="color-666 pr-30">游戏区服</span><span class="color-000">{{orderDetail.GameName}} /{{orderDetail.AreaName}} /{{orderDetail.ServerName}}</span></p>
      <p class="f30"><span class="color-666 pr-30">商品类型</span><span class="color-000">{{orderDetail.BasicType|BasicTypeFilter}}</span><span v-if="orderDetail.IsQuickPublishOrder">--【快销号】</span></p>
  </div>

  <div class="detail_container bg-fff">
      <p class="f30 mb-30"><span class="color-666 pr-30">订单编号</span><span class="color-666" >{{orderDetail.OrderId}}</span>
        <a class="copy ml-20 color-666" @click="Copy" :data-clipboard-text="orderDetail.OrderId" id="copy">复制</a></p>
      <p class="f30"><span class="color-666 pr-30">下单时间</span><span class="color-666">{{orderDetail.CreatedDate}}</span></p>
  </div>

  <div class="detail_container bg-fff mt-20 border-bottom">
    <p class="f30 mb-30"><span class="color-666 pr-30">商品价格</span><span class="color-666 fr">￥{{orderDetail.Price}}×{{parseInt(orderDetail.Qty?orderDetail.Qty:1)}}</span></p>
    <p class="f30"  v-if="orderDetail.PostSaleIndemnityFee"><span class="color-666 pr-30">交易安全险</span><span class="color-666 fr">￥{{orderDetail.PostSaleIndemnityFee}}</span></p>
    <p class="f30"  v-if="orderDetail.VipKefuFee"><span class="color-666 pr-30">vip客服服务费</span><span class="color-666 fr">￥{{orderDetail.VipKefuFee}}</span></p>
    <p class="f30"  v-if="orderDetail.IncrementFee"><span class="color-666 pr-30">增值服务费</span><span class="color-666 fr">￥{{orderDetail.IncrementFee}}</span></p>
    <p class="f30"  v-if="orderDetail.AdditionalServiceFee"><span class="color-666 pr-30">流程服务费</span><span class="color-666 fr">￥{{orderDetail.AdditionalServiceFee}}</span></p>
    <p class="f30"  v-if="orderDetail.ActivityServiceFee"><span class="color-666 pr-30">活动服务费</span><span class="color-666 fr">￥{{orderDetail.ActivityServiceFee}}</span></p>
  </div>
  <div class="total_container bg-fff border-bottom">
      <p class="f30 mb-30"><span class="color-m1 fr ml-30">￥{{orderDetail.PaySumPrice}}</span><span class="color-666 fr">合计</span></p>
  </div>



  <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" >
    <a class="f30 color-fff border border-color bg-m1 fr" v-if="parseInt(orderDetail.PayStatus) === 0&&parseInt(orderDetail.OrderStatusValue) === 0" @click="pay(orderDetail.OrderId, orderDetail.PaySign, orderDetail.ServiceType)">去付款</a>
    <a class="f30 color-fff border border-color bg-m1  fr" v-if="!orderDetail.IsQuickPublishOrder&&(orderDetail.OrderStatusValue=='4'||orderDetail.OrderStatusValue=='5')&&parseInt(orderDetail.BasicType)===2" @click="getAccount(orderDetail.OrderId,'pcgoods')">提取帐号</a>
    <a v-if="orderDetail.KefuQQ" class="f30 color-m1 border border-color cancel fr" @click="getPcService(orderDetail.OrderId, orderDetail.ServiceType, orderDetail.KefuQQ)">联系客服</a>
    <a v-if="!orderDetail.KefuQQ" class="f30 color-fff border bg-ddd fr">联系客服</a>
    <i v-if="orderDetail.KefuQQ" class="titcur fr" @click="whyClick(orderDetail.KefuQQ)"></i>
  </div>
</template>
</template>

     <template v-if="type==='mobgoods'&&orderDetail.result">
    <template v-if="(orderDetail.result.status===2||orderDetail.result.status===3)&&orderDetail.result.goodsType==2">
      <div class="bg-m1 f32 color-fff order_top_tip">
       <span class="icon_mon">您已付款，请
           <a class="bg-fff color-m1" v-show="yyhCount>=1||!yyhShow||!orderDetail.result.isCloudAccount==true||orderDetail.result.status>2" @click="getService(orderDetail.result.orderId)">联系客服</a>
           <a class="bg-fff color-m1"  v-show="yyhShow&&yyhCount<1&&orderDetail.result.status == 2" @click="goCloudCheck()" >查验帐号</a>
           确认购买</span>
     </div>
   <div class="testSteps_box bg-fff border-bottom">
    <div class="testStep_num">
        <ul class="lineUl">
            <li class="line ok"></li>
            <li class="line ok"></li>
            <li class="line ok"></li>
            <li class="line" :class="{ok:orderDetail.result.serviceUploadImg||orderDetail.result.status==3||goodsEO.isRobotCapture}"></li>
            <li class="line" :class="{ok:orderDetail.result.serviceUploadImg||orderDetail.result.status==3||goodsEO.isRobotCapture}"></li>
            <li class="line" :class="{ok:orderDetail.result.status==3}"></li>
            <li class="line" :class="{ok:orderDetail.result.status==3}"></li>
            <li class="line" :class="{ok:orderDetail.result.status==3}"></li>
        </ul>
        <ul class="stepNum">
            <li class="ok">
                <i></i>
                <span>支付下单</span>
            </li>
            <li class="ok">
                <i></i>
                <span>验证帐号</span>
            </li>
            <li :class="orderDetail.result.serviceUploadImg||orderDetail.result.status==3||goodsEO.isRobotCapture?'ok':'no'">
                <i></i>
                <span>确认购买</span>
            </li>
            <li :class="orderDetail.result.status==3?'ok':'no'">
                <i></i>
                <span>提取帐号</span>
            </li>
        </ul>
    </div>
</div>



   <div class="test_img_box bg-fff" v-if="orderDetail.result.status===3||(orderDetail.result.serviceUploadImg||(goodsEO.isRobotCapture && goodsEO.gameType=='2'))" v-show="showScreenshot||!orderDetail.result.isCloudAccount||!yyhSwitch" @click="show(0)">
       <div class="test_img">
           <img :src="firstImage" v-if="firstImage">
           <img src="~images/default_img.jpg" v-else>
           <div class="img_total f20 color-fff">
               <i class="icon-phone fl"></i>
               <span class="fl">{{imageList.length}}</span>
           </div>
       </div>
       <a class="refresh color-666 f26 pt-20" >点击图片查看大图</a>
       <p class="f32 color-m1 mt-20">亲！若您对帐号满意，请联系客服确认购买<br>若您不满意，请联系客服退款</p>
   </div>
   <div class="test_img_box mt-20 bg-fff" v-else-if="!orderDetail.result.serviceUploadImg"  v-show="showScreenshot||!orderDetail.result.isCloudAccount||!yyhSwitch" @click="reload">
     <a >
       <div class="test_img">
           <img src="~images/test.png" alt="">
       </div>
       </a>
       <a class="refresh color-666 f26 pt-20" >点击刷新</a>
       <p class="f32 mt-20 color-m1">亲！客服人员正帮您验证帐号信息<br>请在10分钟后刷新页面，即可查看最新截图</p>
   </div>

   <div class="detail_container bg-fff mt-20 clearfix">
       <img class="game_logo fl" :src="orderDetail.result.goodsImg" v-if="orderDetail.result.goodsImg">
       <img class="game_logo fl" src="~images/default_img.jpg" v-else>
       <div>
           <p class="f30 color-000 detal-hg" v-if="orderDetail.result.propertyValuesTitle">{{orderDetail.result.propertyValuesTitle}}</p>
           <p class="f30 color-000 detal-hg" v-else>{{orderDetail.result.title}}</p>
           <p class="f30 mt-10 color-000">￥{{orderDetail.result.totalAmount}}</p>
       </div>
   </div>

   <div class="detail_container bg-fff mt-20 border-bottom">
       <p class="f30 mb-30"><span class="color-666 pr-30">游戏区服</span><span class="color-000">{{orderDetail.result.gameName}} /{{orderDetail.result.regionName}}/ {{orderDetail.result.serverName}}</span></p>
       <p class="f30"><span class="color-666 pr-30">商品类型</span><span class="color-000">{{orderDetail.result.goodsType|goodsTypeFilter}}</span></p>
   </div>

   <div class="detail_container bg-fff">
       <p class="f30 mb-30"><span class="color-666 pr-30">订单编号</span><span class="color-666">{{orderDetail.result.orderId}}</span>
         <a class="copy ml-20 color-666" @click="Copy" :data-clipboard-text="orderDetail.result.orderId" id="copy">复制</a></p>
       <p class="f30"><span class="color-666 pr-30">下单时间</span><span class="color-666">{{orderDetail.result.createTime|createTimeFilter}}</span></p>
   </div>

   <div class="detail_container bg-fff mt-20 border-bottom">
       <p class="f30 mb-30"><span class="color-666 pr-30">商品价格</span><span class="color-666 fr">￥{{orderDetail.result.totalAmount}}</span></p>
       <!-- <p class="f30"><span class="color-666 pr-30">安全交易险</span><span class="color-666 fr">￥15</span></p> -->
   </div>
   <div class="total_container bg-fff border-bottom">
       <p class="f30 mb-30"><span class="color-m1 fr ml-30">￥{{orderDetail.result.totalAmount}}</span><span class="color-666 fr">合计</span></p>
   </div>

   <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.result.status===3||orderDetail.result.status===4">
     <a class="f30 color-fff border bg-ml fr" @click="getAccount(orderDetail.result.orderId, 'mobgoods')">提取帐号</a>
     <a class="f30 color-m1 border border-color cancel fr" @click="getService(orderDetail.result.orderId)">联系客服</a>
     <i class="titcur fr" @click="mwhyClick(orderDetail.result.orderId)"></i>
   </div>
   <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-else>

     <a class="f30 color-m1 border border-color cancel fr" @click="getService(orderDetail.result.orderId)">联系客服</a>
       <a class="f30    fr" :class="{'bg-m1':this.yyhCount<1,'color-fff':yyhCount<1,'color-m1':yyhCount>=1,'border-color':this.yyhCount>=1,'border':this.yyhCount>=1}" v-show="yyhShow&&yyhCount<2"   @click="goCloudCheck()" >查验帐号</a>
     <i class="titcur fr" @click="mwhyClick(orderDetail.result.orderId)"></i>
   </div>
    </template>
    <template v-else>

      <div class="bg-999 f32 color-fff order_top_tip" v-show="orderDetail.result.status==5||orderDetail.result.status==6">
        <span class="icon_fail" v-if="orderDetail.result.cancelReason">取消原因：{{orderDetail.result.cancelReason|cancelReasonFilter}}</span>
        <span class="icon_fail" v-else-if="orderDetail.result.complainResult">取消原因：{{orderDetail.result.complainResult|complainResultFilter}}</span>
        <span class="icon_fail" v-else-if="orderDetail.result.otherReason">取消原因：{{orderDetail.result.otherReason}}</span>
        <span class="icon_fail" v-else>订单取消</span>
      </div>
      <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-if="orderDetail.result.status == 1">
        <p class="line-40"><span class="icon_wait">等待付款</span>
          <span class="fr f26">剩余时间：
            <!-- <clocker
            :time="orderDetail.result.createTime+30*60*1000"
            @on-finish="onFinish('mobgoods')"
            :format="' %M 分 %S 秒'"></clocker> -->
            <countdown slot="value" v-model="time1" @on-trip="onTrip"  @on-finish="onFinish('mobgoods')" ></countdown>
          </span>
        </p>
        <p class="line-40"><span class="fr f26">需付款：{{orderDetail.result.totalAmount}}元</span></p>
      </div>
      <div class="bg-2a f32 color-fff order_top_tip" v-show="orderDetail.result.status == 4">
        <span class="icon_firm">交易成功<template v-if="orderDetail.result.goodsType == 2">，请提取帐号资料</template></span>
      </div>
      <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-show="orderDetail.result.status == 2||orderDetail.result.status == 8">
        <p class="line-40"><span class="icon_firm">已付款，请等待客服发货</span></p>
      </div>
      <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-show="orderDetail.result.status == 3">
        <p class="line-40"><span class="icon_firm">已付款，客服已发货</span></p>
      </div>
      <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-show="orderDetail.result.status == 7">
        <p class="line-40"><span class="icon_firm">退款中</span></p>
      </div>
      <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-show="orderDetail.result.status == 9">
        <p class="line-40"><span class="icon_firm">申请退款中</span></p>
      </div>
      <div class="bg-m1 f32 color-fff order_top_tip clearfix" v-show="orderDetail.result.status == 10">
        <p class="line-40"><span class="icon_firm">客服已介入</span></p>
      </div>

      <div class="detail_container bg-fff clearfix">
          <img class="game_logo fl" v-if="orderDetail.result.goodsImg" :src="orderDetail.result.goodsImg" >
          <img class="game_logo fl" v-else src="~images/default_img.jpg" >
          <div>
              <p class="f30 color-000" v-if="orderDetail.result.propertyValuesTitle">{{orderDetail.result.propertyValuesTitle}}</p>
              <p class="f30 color-000" v-else>{{orderDetail.result.title}}</p>
              <p class="f30 mt-20 color-000">￥{{orderDetail.result.totalAmount}}</p>
          </div>
      </div>

      <div class="detail_container bg-fff mt-20 border-bottom">
          <p class="f30 mb-30"><span class="color-666 pr-30">游戏区服</span><span class="color-000">{{orderDetail.result.gameName}} /{{orderDetail.result.regionName}} /{{orderDetail.result.serverName}}</span></p>
          <p class="f30"><span class="color-666 pr-30">商品类型</span><span class="color-000">{{orderDetail.result.goodsType|goodsTypeFilter}}</span></p>
      </div>

      <div class="detail_container bg-fff">
          <p class="f30 mb-30"><span class="color-666 pr-30">订单编号</span><span class="color-666" >{{orderDetail.result.orderId}}</span>
            <a class="copy ml-20 color-666" @click="Copy" :data-clipboard-text="orderDetail.result.orderId" id="copy">复制</a></p>
          <p class="f30"><span class="color-666 pr-30">下单时间</span><span class="color-666">{{orderDetail.result.createTime|createTimeFilter}}</span></p>
      </div>

      <div class="detail_container bg-fff mt-20 border-bottom">
          <p class="f30 mb-30"><span class="color-666 pr-30">商品价格</span><span class="color-666 fr">￥{{orderDetail.result.totalAmount}}</span></p>
      </div>
      <div class="total_container bg-fff border-bottom">
          <p class="f30 mb-30"><span class="color-m1 fr ml-30">￥{{orderDetail.result.totalAmount}}</span><span class="color-666 fr">合计</span></p>
      </div>

      <template v-if="orderDetail.result.goodsType!=1&&orderDetail.result.goodsType!=3">
        <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.result.status == 2||orderDetail.result.status == 5">
            <a class="f30 color-m1 border border-color cancel fr"  @click="getService(orderDetail.result.orderId)">联系客服</a>
            <i class="titcur fr" @click="mwhyClick(orderDetail.result.orderId)"></i>
        </div>
      </template>

      <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.result.status == 1">
        <a class="f30 color-fff border border-color bg-m1 fr" @click="mobPay(orderDetail.result.orderId, orderDetail.result.goodsType)">去付款</a>
      </div>

      <template v-if="orderDetail.result.goodsType==2">
      <div class="fixed-bottom mancon-btn pr-30 py-20 bg-fff border-top" v-if="orderDetail.result.status == 3||orderDetail.result.status == 4">
        <a class="f30 color-fff border border-color bg-m1 fr" @click="getAccount(orderDetail.result.orderId, 'mobgoods')" v-if="orderDetail.result.goodsType==2">提取帐号</a>
        <a class="f30 color-m1 border border-color cancel fr" @click="accountRefund(orderDetail.result.orderId)" v-if="orderDetail.result.isAxm&&!orderDetail.result.insuranceOrderStatus">申请退款</a>
        <a class="f30 color-m1 border border-color fr"  @click="appeal(orderDetail.result.orderId)" v-if="!orderDetail.result.isAxm && orderDetail.result.goodsType!='2'">申诉</a>
        <a class="f30 color-m1 border border-color cancel fr" @click="getService(orderDetail.result.orderId)" >联系客服</a>
        <i class="titcur fr" @click="mwhyClick(orderDetail.result.orderId)" ></i>
      </div>
      </template>
    </template>

</template>



</div>
      <div id="yyhXY" v-show="yyhXyShow">
          <div class="top-header border-bottom">
              <h2 class=" f32">
                  云验号交易协议
              </h2>
          </div>
          <div class="trade-main">
              <div class="trade-conn bg-fff p-30  border-bottom">
                  <p class="py-10 px-30 f30">
                      <span class="color-m1">1、买家可以通过云验号功能登录到游戏中查看卖家账号的角色装备。</span>
                      <br>
                      2、买家如不使用该功能，客服将提供账号的角色装备截图给买家查看并确认是否继续交易。
                      <br>
                      <span class="color-m1">3、在查验过程中，买家仅有查看账号的角色装备属性的权利，若买家操作的行为导致卖家账号任何程度的损失，则视为买家同意购买该商品，交易继续进行。</span>
                      <br>
                      4、买家破坏账号的行为，包括但不限于以下几类：
                      <br>
                      1）使用该账号进行购买、交易、卸载、更换、使用虚拟财产等行为。
                      <br>
                      2）参加游戏副本、比赛、活动。
                      <br>
                      3）创建、修改，删除角色。
                      <br>
                      4）更改账号信息。如：修改登录密码、手机号码、邮箱、身份证号码等信息。
                      <br>
                      5）更改账号角色、虚拟财产任意属性值。如：增加、删除，修改角色属性、技能点、天赋等操作。
                      <br>
                      5、为了保证买卖双方的利益，我们会对买家登陆游戏后的操作进行全程录像。
                      <br>
                  </p>
              </div>
              <div class="trade-btn p-30 bg-fff border-top">
                  <a class="agree fl text-center f32 color-fff border border-color bg-f54" @click="yyhXyAgreed()" >同意</a>
                  <a class="wait fr text-center f32 color-888 border" @click="yyhXyNotAgreed()">否，等待截图验号</a>
              </div>


          </div>

      </div>
<div class="maskdiv" v-show="maskShow"></div>
<loadingComponent></loadingComponent>
<previewer :list="imageList" ref="previewer" ></previewer>

  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import loadingComponent from 'components/common/Loading.vue'
import Clipboard from 'clipboard'
import previewer  from 'components/account/AccountPreviwer.vue'
import countdown from 'components/common/timecountdown'
import { orderStatusFilter,  mobGoodsStatusFilter,  goodsTypeFilter,  BasicTypeFilter,  complainResultFilter, cancelReasonFilter} from 'components/common/filters'
export default {
  data() {
    return {
	    app: this.$route.query.app,
      orderId: this.$route.params.orderId,
      imgpath: this.$route.query.imgpath?decodeURIComponent(this.$route.query.imgpath):'',
      type: this.$route.params.type,
      CancelRemark: this.$route.query.CancelRemark,
      CustomServiceQQ: this.$route.query.CustomServiceQQ,
      popshowStatus: false,
      paysta: true,
      paytext: '去付款',
      maskShow: false,
        yyhCount:0,
        yyhShow:false,
        yyhXyShow:false,
        xyAgreed:false,
        showScreenshot:false,
        yyhSwitch:false,
    }
  },
  components: {
    loadingComponent,
    previewer,
    countdown
  },
  computed: {
    time1() {
      if (this.orderDetail.currentTime) {
        return Math.floor((this.orderDetail.result.createTime+30*60*1000 - this.orderDetail.currentTime)/1000)
      } else {
        if(this.orderDetail.result) {
          if (this.orderDetail.result.createTime - new Date().getTime() > 30*60*1000) {
            return 30*60
          } else {
            if (localStorage['lefttime']) {
              if ((this.orderDetail.result.createTime+30*60*1000 - new Date().getTime())/1000 > parseInt(localStorage['lefttime'])) {
                return parseInt(localStorage['lefttime'])
              } else {
                return Math.floor((this.orderDetail.result.createTime+30*60*1000 - new Date().getTime())/1000)
              }
            } else {
              return Math.floor((this.orderDetail.result.createTime+30*60*1000 - new Date().getTime())/1000)
            }
          }
        } else {
          return 30*60
        }
      }
    },
    ...mapState({
        errMsg: state => {
            return state.buyerCenter.errMsg
        },
        warnMsg: state => {
            return state.buyerCenter.warnMsg
        },
        orderDetail: state => {
            return state.buyerCenter.orderDetail
        },
        goodsEO: state => {
          return state.account.goodsEO
        },
        imageList: state => {
          return state.account.imageList
        },
        payUrl: state => {
          return state.buyerCenter.payUrl
        },
        serviceData: state => {
          return state.buyerCenter.serviceData
        },
        maypayUrl: state => {
          return state.buyerCenter.maypayUrl
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
          title: '提示',
          message: msg.message,
          closeOnClickModal: false
        }).then(()=>{
          this.clearErr()
          if (msg.returnUrl) {
            if (msg.returnUrl === 'self') {
              location.reload()
            } else {
              location.href = msg.returnUrl
            }
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
  filters: {
    orderStatusFilter,
    mobGoodsStatusFilter,
    goodsTypeFilter,
    BasicTypeFilter,
    complainResultFilter,
    cancelReasonFilter,
    createTimeFilter(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  created: function created() {
    this.getDefaultData()

  },
  mounted: function mounted() {
    this.$bus.emit('headerText', '订单详情');

  },
  methods: {
//      云验号开关验证
      cloudSwitch(){
          var self = this;
          if (this.orderDetail.result.isCloudAccount==true){
              this.$http.post(this.$CONSTANTS.APISearchCenter+"OnoffService/selectOnoff",{
                      mapRequest:{
                          type:"云验号总开关"
                      }
              }).then(
                  function (res) {
                      if(res.data.result.status==1){
                          self.$http.post(this.$CONSTANTS.APICategory+"cloudValidate/getCloudValidateSwitch",{
                                  gameId:this.orderDetail.result.gameId,
                                  platformId:this.goodsEO.serviceProviderId,
                                  regionId:this.goodsEO.regionId,
                          }).then(
                              function (res) {
                                  if (res.data.result==true){
                                      self.yyhSwitch = true;
                                      var dateObj = new Date();
                                      var time = dateObj.getTime();
                                      self.$http.jsonp("https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/cloudWeb/order_count_callBalk",{
                                          params:{
                                              orderId:self.orderId,
                                              times:1497941705,
                                              sign:'505e770097ebebbd5dc8aa3b3ad447d4'
                                          },
                                          jsonp: 'callback'
                                      }).then(
                                          function (res) {
                                              self.yyhCount = res.body.count;
                                              self.showScreenshot = res.body.showScreenshot;
                                              if (self.yyhCount < 2){
                                                  self.yyhShow = true;
                                              }else {
                                                  self.yyhShow = false;
                                              }
                                          }
                                      )
                                  }else {
                                      self.yyhShow = false
                                  }
                              }
                          )
                      }else {
                          self.yyhShow = false;
                      }
                  }
              )
          }else{
              self.yyhShow = false;
          }
      },
//      云验号次数验证

//      用户是否同意验号协议检查
      isXyAgreed(){
          let self = this;
          this.$http.jsonp(
              "https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/cloudWeb/web_selected_isAgreest",
              {
                  params:{
                      orderId:this.orderId,
                      times:1497941705,
                      sign:"505e770097ebebbd5dc8aa3b3ad447d4"
                  },
                  jsonp: 'callback'
              }
          ).then(
              function (res) {
                  if(res.data.status == 1){
                      self.xyAgreed = true;
                  }else {
                      self.xyAgreed = false;

                  }
              }
          )
      },
//      前往验号页面 验证是否同意过协议，如同意过直接进入验号页面，如未同意弹出协议
      goCloudCheck(){
          var self = this;
          var goodsId = this.orderDetail.result.goodsId;
          var hostname = window.location.hostname;
          var port = window.location.port;
//          用户是否同意过验号协议接口 1为同意
          this.$http.get(
              this.$CONSTANTS.APIOrder+"buyer/order/"+this.orderId,
          ).then(
              function (res) {
                  console.log(res.data.result.status)
                  if (res.data.result.status == 2){
                      this.$http.jsonp(
                          "https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/cloudWeb/web_selected_isAgreest",
                          {
                              params:{
                                  orderId:this.orderId,
                                  times:1497941705,
                                  sign:"505e770097ebebbd5dc8aa3b3ad447d4"
                              },
                              jsonp: 'callback'
                          }
                      ).then(
                          function (res) {
                              if(res.data.status == 1){
//                    用户同意过验号协议，根据订单号查询当前对应的验号单
                                  self.$http.jsonp(
                                      "https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/valOrder/query_order_validateOrder",
                                      {
                                          params:{
                                              orderId:this.orderId,
                                              times:1497941705,
                                              sign:"505e770097ebebbd5dc8aa3b3ad447d4"
                                          },
                                          jsonp: 'callback'
                                      }
                                  ).then(
                                      function (res) {
                                          console.log(res.data.responseStatus.code)

                                          if(res.data.responseStatus.code == "00"){
                                              var validateId = res.data.validateOrder.id
                                  window.location.href="/vue/buyerCenter/cloudCheck?goodsId="+goodsId+"&validateId="+validateId+"&orderId="+this.orderId;
                                          }else {
                                              self.$toast(res.data.responseStatus.message)
                                          }
                                      }
                                  )
                              }else {
                                  self.yyhXyShow = true;
                              }
                          }
                      )
                  }else {
                      self.$toast("您的订单状态已改变，已不能查验帐号")
                  }
              }
          )

      },
//      同意验号协议
      yyhXyAgreed:function () {
          var self = this;
          var goodsId = this.orderDetail.result.goodsId;
          var hostname = window.location.hostname;
          var port = window.location.port;
          self.$http.jsonp(
              "https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/cloudWeb/web_isAgreest_callback",
              {
                  params:{
                      orderId:this.orderId,
                      isAgreest:1,
                      times:1497941705,
                      sign:"505e770097ebebbd5dc8aa3b3ad447d4"
                  },
                  jsonp: 'callback'
              }
          ).then(
              function (res) {
                  self.$http.jsonp(
                      "https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/valOrder/query_order_validateOrder",
                      {
                          params:{
                              orderId:this.orderId,
                              times:1497941705,
                              sign:"505e770097ebebbd5dc8aa3b3ad447d4"
                          },
                          jsonp: 'callback'
                      }
                  ).then(
                      function (res) {
                          console.log(res);
                          if(res.data.responseStatus.code == "00"){
                              var validateId = res.data.validateOrder.id;
                              window.location.href="/vue/buyerCenter/cloudCheck?goodsId="+goodsId+"&validateId="+validateId+"&orderId="+this.orderId;
                          }else {
                              self.$toast(res.data.responseStatus.message)
                              self.yyhXyShow = false;
                          }
                      }
                  )
              }
          )

//          self.$http.jsonp(
//              "http://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/cloudWeb/web_isAgreest_callback",
//              {
//                  params:{
//                      orderId:this.orderId,
//                      isAgreest:1,
//                      times:1497941705,
//                      sign:"505e770097ebebbd5dc8aa3b3ad447d4"
//                  },
//                  jsonp: 'callback'
//              }
//          ).then(
//              function (res) {
//                      self.$http.jsonp(
//                          "http://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/valOrder/query_order_validateOrder",
//                          {
//                              params:{
//                                  orderId:this.orderId,
//                                  isAgreest:1,
//                                  times:1497941705,
//                                  sign:"505e770097ebebbd5dc8aa3b3ad447d4"
//                              },
//                          }
//                      ).then(
//                          function (res) {
//                              console.log(res.data.validateOrder.id)
//                          }
////                  window.location.href="http://"+hostname+":"+port+"/vue/buyerCenter/cloudCheck?goodsId="+goodsId+"&orderId="+this.orderId;
//                      )
//
//              }
//          )
      },
//      不同意验号协议
      yyhXyNotAgreed:function () {
          var self = this;
          var goodsId = this.orderDetail.result.goodsId;
          var hostname = window.location.hostname;
          var port = window.location.port;
          this.$http.jsonp(
              "https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/cloudWeb/web_isAgreest_callback",
              {
                  params:{
                      orderId:this.orderId,
                      isAgreest:0,
                      times:1497941705,
                      sign:"505e770097ebebbd5dc8aa3b3ad447d4"
                  },
                  jsonp: 'callback'
              }
          ).then(
              function (res) {
                  self.yyhXyShow = false;
                  self.showScreenshot = true;
//                  self.yyhShow = false;
              }
          )
      },
    appeal(orderId) {
      location.href = '/member/member-buyer-appeal.html?orderId='+orderId
    },
    accountRefund(orderId) {
      location.href = '/member/complaint-axm.html?orderId='+orderId+'&app='+this.app
    },
    onTrip(val) {
      if (localStorage['lefttime']) {
        localStorage.removeItem('lefttime')
      }
      localStorage.setItem('lefttime', val)
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
    whyClick(qq) {
      this.$messagebox({
        message: "如点击联系客服无法启动QQ，请加客服QQ号("+qq+")"
      })
    },
    async onFinish(type) {
      if (localStorage['lefttime']) {
        localStorage.removeItem('lefttime')
      }
      if (type === 'mobgoods') {
        await this.cancelOrder({orderId:this.$route.params.orderId})
        //location.reload()
      }
    },
    async mobPay(orderId, goodsType) {
      let returnUrl;
      if (goodsType == 1) {
        returnUrl = location.protocol  + '//' +location.host + '/member/member-buyer-equipment-transaction.html?orderId='+ orderId
      } else {
        returnUrl = location.protocol  + '//' +location.host + '/vue/buyerCenter/buyerOrder/mobgoods/'+orderId+'?from=payed'
      }
      if (orderId.indexOf('MAO')>-1||orderId.indexOf('MEO')>-1||orderId.indexOf('MGO')>-1) {
        await this.maypay({
          orderId: orderId,
          returnUrl:returnUrl
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
    getPcService(Id, ServiceType, KefuQQ) {
      if (KefuQQ) {
        if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
          this.$messagebox({
            message: "如点击联系客服无法启动QQ，请加客服QQ号("+KefuQQ+")"
          })
        }else {
          window.location.assign('mqqwpa://im/chat?chat_type=wpa&uin=' + KefuQQ + '&version=1&src_type=web&web_src=oicqzone.com')
        }
      } else {
        window.location.assign("/pc/huanxin.html?orderId="+Id+"&serviceType="+ServiceType+"&isSeller=false")
      }
    },
    async shouyouPay(orderId) {
      if (this.paysta) {
        this.paysta = false
        this.paytext = '付款中'
        await this.mobileOrderPay({orderId:orderId,sourceChannel:2})
        this.paysta = true
        this.paytext = '去付款'
        location.href = 'https://mypay.5173.com/PaymentWap/PayExternalV2.aspx?' + this.payUrl
      }
    },
    getShouyouService(qq) {
      if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
        this.$messagebox({
          message: "如点击联系客服无法启动QQ，请加客服QQ号("+qq+")"
        })
      }else {
        window.location.assign('mqqwpa://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web&web_src=oicqzone.com')
      }
    },
    pay(Id,PaySign,ServiceType) {
      location.href = "https://mypay.5173.com/PaymentWap/PayOrderV3.aspx?OrderId="+Id+"&Key="+PaySign+"&ServiceType="+ServiceType
    },
    popshow() {
      this.popshow = true
    },
    reload() {
      location.reload()
    },
    show (index) {
      if (this.firstImage) {
        this.$refs.previewer.show(index)
      }
    },
    goRouter() {
      if (this.orderDetail) {
        if (this.$route.params.type === 'shouyou') {
          if (this.orderDetail.OrderStatus==2||this.orderDetail.OrderStatus==3||this.orderDetail.OrderStatus==4) {
            location.href = '/vue/buyerCenter/pcMobGame/2'
          } else if (this.orderDetail.OrderStatus==1) {
            location.href = '/vue/buyerCenter/pcMobGame/1'
          } else if(this.orderDetail.OrderStatus==5) {
            location.href = '/vue/buyerCenter/pcMobGame/3'
          } else {
            location.href = '/vue/buyerCenter/pcMobGame/4'
          }
        } else if(this.$route.params.type === 'mobgoods') {
          if (this.orderDetail.result) {
            if (this.orderDetail.result.status==2||this.orderDetail.result.status==3||this.orderDetail.result.status==8||this.orderDetail.result.status==9||this.orderDetail.result.status==10) {
              location.href = '/vue/buyerCenter/buyerMob/2'
            } else if (this.orderDetail.result.status==1) {
              location.href = '/vue/buyerCenter/buyerMob/1'
            } else if(this.orderDetail.result.status==4) {
              location.href = '/vue/buyerCenter/buyerMob/3'
            } else {
              location.href = '/vue/buyerCenter/buyerMob/4'
            }
          }
        } else if(this.$route.params.type === 'pcgoods') {
          if (this.orderDetail.OrderStatusValue==1||this.orderDetail.OrderStatusValue==3) {
            location.href = '/vue/buyerCenter/buyerPc/2'
          } else if (this.orderDetail.OrderStatusValue==0) {
            if (this.orderDetail.PayStatus==2) {
	            if(this.orderDetail.IsQuickPublishOrder) {
		            location.href = '/vue/buyerCenter/buyerPc/3'
	            }else{
		            location.href = '/vue/buyerCenter/buyerPc/2'
                }
            } else {
              location.href = '/vue/buyerCenter/buyerPc/1'
            }
          } else if(this.orderDetail.OrderStatusValue==5||this.orderDetail.OrderStatusValue==4) {
            location.href = '/vue/buyerCenter/buyerPc/3'
          } else {
            location.href = '/vue/buyerCenter/buyerPc/4'
          }
        }
      } else {
        location.history.go(-1)
      }

    },
    Copy() {
        var clipboard = new Clipboard('#copy');
        clipboard.on('success', e => {
          this.$toast('订单号已复制到剪贴板')
          this.shareShow = false
          e.clearSelection();
        });
        clipboard.on('error', e => {
          this.$toast('复制失败，请尝试长按复制')
          this.shareShow = false
          this.errbox = true
        });
    },
    getAccount(orderId, type) {
      if (this.app) {
        location.href = '/vue/buyerCenter/getAccount/mobgoods/'+orderId+'?app=true'
      } else {
        this.$router.push({
          name: 'getAccount',
          params: {type:type,orderId:orderId}
        })
      }
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
    getDefaultData: async function getDefaultData() {
      if (this.$route.params.type === 'shouyou') {
	      await this.mainShouYouOrderFast({
		      orderId: this.$route.params.orderId,
	      })
//      	if(this.$route.params.fast){
//	        await this.mainShouYouOrderFast({
//		        orderId: this.$route.params.orderId,
//	        })
//        }else {
//	        await this.mainShouYouOrderDetailed({
//		        orderId: this.$route.params.orderId,
//	        })
//        }
      } else if(this.$route.params.type === 'mobgoods') {
        await this.getMobOrderDetail({
          orderId: this.$route.params.orderId,
        })

        if (this.orderDetail.result) {
          if (this.orderDetail.result.goodsType == 2) {
            await this.getGoodsEO({goodsId: this.orderDetail.result.goodsId})

          }
            this.cloudSwitch()
        }
        //如果是支付后跳转过来的判断是否回调成功
        if (this.$route.query.from) {
          if (this.$route.query.from.indexOf('payed') > -1) {
            if (this.orderDetail.result) {
              if (this.orderDetail.result.status === 1) {
                this.$indicator.open({
                  text: '订单处理中...',
                  spinnerType: 'fading-circle'
                })
                this.maskShow = true
                let Interval = window.setInterval(async ()=>{
                    await this.getMobOrderDetail({
                      orderId: this.$route.params.orderId,
                    })
                    if (this.orderDetail.result.status == 2) {
                      this.$indicator.close()
                      window.clearInterval(Interval)
                      this.maskShow = false
                    }
                  }, 2000
                )
              } else {
                this.$indicator.close()
                this.maskShow = false
              }
            }

          }
        }
      } else if(this.$route.params.type === 'pcgoods') {
        await this.mainGoodsOrderDetailed({"jsonStr":{"ServiceType":this.$route.query.ServiceType,"OrderId":this.$route.params.orderId}})
        await this.getAccountOrderImgInfo({orderId:this.$route.params.orderId})
        if (this.$route.query.from) {
          if (this.$route.query.from.indexOf('payed') > -1) {
              //如果是主站端游
              if (this.orderDetail.PayStatus != 2) {
                this.$indicator.open({
                  text: '订单处理中...',
                  spinnerType: 'fading-circle'
                })
                this.maskShow = true
                let Interval = window.setInterval(async ()=>{
                  await this.mainGoodsOrderDetailed({"jsonStr":{"ServiceType":this.$route.query.ServiceType,"OrderId":this.$route.params.orderId}})
                    if (this.orderDetail.PayStatus == 2) {
                      this.$indicator.close()
                      window.clearInterval(Interval)
                      this.maskShow = false
                    }
                  }, 2000
                )
              } else {
                this.$indicator.close()
                this.maskShow = false
              }
          }
        }
      }
    },
    ...mapActions({
        mainShouYouOrderDetailed: 'buyerCenter/GETMAINSHOUYOUDETAIL',
        mainShouYouOrderFast: 'buyerCenter/GETMAINSHOUYOUFAST',
        getMobOrderDetail: 'buyerCenter/GETMOBORDERDETAIL',
        queryOrderDetail: 'buyerCenter/QUERYORDERDETAIL',
        mainGoodsOrderDetailed: 'buyerCenter/MAINGOODSORDERDETAILED',
        mobileOrderPay: 'buyerCenter/MOBILEORDERPAY',
        openServiceQQ: 'buyerCenter/OPENSERVICEQQ',
        getGoodsEO: 'account/A_GETGOODS',
        getAccountOrderImgInfo: 'buyerCenter/GETPCIMGINFO',
        maypay: 'buyerCenter/MAYPAY',
        cancelOrder: 'buyerCenter/CANCELORDER',
        clearErr: 'buyerCenter/CLEAR_ERR',
        clearWarn: 'buyerCenter/CLEAR_WARN',
    })
  }
}
</script>
<style src="css/member/member-order.css" scoped></style>
<style scoped>
.errbox {
  background: #fff;
  padding: .5rem;
  line-height: .4rem;
  position: fixed;
  bottom: 0;
  z-index: 999;
  word-break: break-all;
}
.errbox .close {
  background: url(~images/fortun-close.png) no-repeat;
  height: .3rem;
  width: .3rem;
  position: absolute;
  top: .3rem;
  right: .3rem;
  background-size: 100%;
}
.bg-ml {
  background-color: #f75e46;
}
.maskdiv {
  opacity: .75;
  background: #000;
  z-index: 0;
}
    .quick{
        width: 1.5rem;
        text-align: right;
    }
.trade-main,.trade-btn{ height:auto; display:block; overflow:hidden;}
.trade-main .trade-conn p{ line-height:0.5rem;}
.trade-btn a{ width:47%; height:0.9rem; line-height:0.9rem;}
</style>
