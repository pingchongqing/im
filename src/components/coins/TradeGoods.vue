<template>
  <div id="wrapper">
    <!--填补fixed的块-->
    <div class="fixedFill-mx"></div>
    <!---------------------------- top ---------------------------->
    <div class="top-header fixed-top border-bottom">
      <div class="top-back">
        <a href="javascript:history.go(-1)"></a>
      </div>
      <h2 class="f36">交易安全险</h2>
      <div class="top-right">
        <a href="javascript:history.go(-1)" class="f30 pr-30">关闭</a>
      </div>
    </div>

    <div class="risk-header bg-fff border-bottom">
      <p class="risk-title f36 mb-30 color-000">交易安全险介绍及常见问题</p>
      <p class="f24 color color-000">更新时间: 2015-07-09</p>
    </div>

    <div class="risk-body bg-fff">

      <p class="f36 title text-center color-000">交易安全险</p>
      <p class="risk-item color-333 f28">交易安全险（标志为<img class="ml-10" src="~images/Icon/ketbao.png" alt="保障险标志">）是一项为5173用户专项提供的用于保障买家所购买的游戏币、装备、道具、游戏帐号等虚拟财产安全的服务，交易安全险保费由买家承担</p>
      <p class="risk-item color-333 f28">例：您购买某游戏装备的同时购买了交易安全险，如果该装备出现被卖家找回、被运营商收回、封号等情况，您可以申请交易安全险服务，交易安全险体系会帮您找回装备或者给予您经济赔偿。</p>

      <p class="f36 title text-center color-000">交易安全险期</p>
      <p class="risk-item color-333 f28">交易安全险期从获得交易安全险服务时起到交易安全险服务结束时止，自购买成功之日起算。游戏币、装备、道具交易安全险期为15天，帐号交易安全险期为60天。交易安全险期外，交易安全体系将不提供该商品的交易安全险服务。</p>
      <p class="risk-item color-333 f28">例：某用户购买商品，交易安全险期为15天，当购买成功后第14天该商品被收回，则用户可以申请理赔，若完成理赔申请单，则交易安全险体系就会受理该用户的理赔申请，而处理完成时间可能在该用户购买完成的15天以后，与交易安全险期没有关联。</p>

      <p class="f36 title text-center color-000">交易安全险保障额度</p>
      <p class="risk-item color-333 f28">为购买商品的保障金额（简称“保额”）。一般情况下指订单成交金额。例：购买订单金额为1000元人民币的游戏币，同时购买了交易安全险，那这个交易安全险的订单保额就是1000元，涉及交易安全险赔偿时以保额为基础计算赔偿金额，如购买的金币部分被没收或找回，我们将按订单比例退还被没收或找回的部分金额。</p>

      <p class="f36 title text-center color-000">交易安全险服务费</p>
      <p class="risk-item color-333 f28">交易安全险服务费简称保费，即买家购买交易安全险时支付的费用。</p>
      <p class="risk-item color-333 f28">游戏币、游戏装备、道具类商品，由买家按照订单金额的1%-5.5%支付交易安全险服务费（按游戏不同收取），最低1.1元，最高1100元，最高赔偿20000元；游戏帐号类商品，由买家按照订单金额的5%-22%支付交易安全险服务费（按游戏不同收取），最低2.2元，最高4400元，最高赔偿20000元。15天以后，与交易安全险期没有关联。</p>
      <p class="risk-item color-333 f28">注：交易取消后，交易安全险服务费全额退还买家；交易成功后，交易安全险服务费一律不退还。<br>游戏帐号的交易安全险服务费，如果帐号资料修改服务失败，但订单仍成功的，该订单不享有交易安全险服务，交易安全险服务费将退还至您的5173账户。</p>

      <p class="f36 title text-center color-000">交易安全险保障范围</p>
      <div class="risk-item color-333 f28">
        <table>
          <tbody><tr>
            <td class="text-center" colspan="1" width="34%"></td>
            <td class="text-center" colspan="3">保障范围</td>
          </tr>
          <tr>
            <td class="text-center" colspan="1">游戏帐号</td>
            <td class="p-10 pl-20 pr-20" colspan="3">购买的帐号被卖家找回、被游戏运营商收回、被官方封号</td>
          </tr>
          <tr>
            <td class="text-center" rowspan="2" colspan="1">游戏装备、道具</td>
            <td class="p-10 pl-20 pr-20" colspan="3">购买的游戏装备、道具被官方收回</td>
          </tr>
          <tr>
            <td class="p-10 pl-20 pr-20" colspan="3">因为购买的装备、道具原因导致的游戏帐号被封</td>
          </tr>
          <tr>
            <td class="text-center" rowspan="2" colspan="1">游戏币</td>
            <td class="p-10 pl-20 pr-20" colspan="3">购买的游戏币被官方收回</td>
          </tr>
          <tr>
            <td class="p-10 pl-20 pr-20" colspan="3">因为购买的游戏币原因导致的游戏帐号被封</td>
          </tr>
          </tbody></table>
      </div>
      <p class="f36 title text-center color-000" style="width: 56%;margin-left: 22%;line-height: 0.5rem">下列原因造成的损失、费用，保险人不负责赔偿</p>
      <p class="risk-item color-333 f28">（一）行政行为或司法行为；</p>
      <p class="risk-item color-333 f28">（二）投保人、被保险人或其代表的故意、重大过失或犯罪行为；</p>
      <p class="risk-item color-333 f28">（三）被保险人或其代表正常交易下主动向他人账户进行交易；</p>
      <p class="risk-item color-333 f28">（四）被保险人的交易行为违反游戏规则；</p>
      <p class="risk-item color-333 f28">（五）因游戏运营商改变游戏内容和游戏规则导致的帐号装备消灭；</p>
      <p class="risk-item color-333 f28">（六）因用户操作失误、密码泄露、被黑客盗取导致保险标的的丢失；</p>
      <p class="risk-item color-333 f28">（七）游戏中对决掉落、被游戏角色打死掉落，以及游戏内拍卖、摆摊出售等符合游戏规则的装备转移；</p>
      <p class="risk-item color-333 f28">（八）游戏运营商、交易平台等服务相关平台服务器崩溃、数据丢失导致的损失；</p>
      <p class="risk-item color-333 f28">（九）被保险人交易角色名及举证时显示的游戏角色名与5173交易时所使用的角色名不一致；（十）被保险人举证时显示的商品名称、商品数量与5173所购买的不一致。</p>
      <p class="risk-item color-333 f28">（十）被保险人举证时显示的商品名称、商品数量与5173所购买的不一致。</p>
      <p class="risk-item color-333 f28">（十一）保额在1000元内，被保险人举证时无法提供视频认证；1000元＜保额≤2000元，被保险人举证时无法提供视频认证、本人户口本；保额大于2000元，被保险人举证时无法提供视频认证、本人户口本、当地机关报案凭证。</p>


      <p class="f36 title text-center color-000">理赔周期</p>
      <div class="risk-item color-333 f28">
        <table>
          <tbody><tr>
            <td class="text-center" colspan="1" width="10%">1</td>
            <td class="text-center" colspan="2" width="20%">实名认证</td>
            <td class="text-left pl-20" colspan="3 " width="35%">2小时内</td>
            <td class="text-left p-10" colspan="3">请填写真实身份信息以免无法通过</td>
          </tr>
          <tr>
            <td class="text-center" colspan="1" width="10%">2</td>
            <td class="text-center" colspan="2">材料审核</td>
            <td class="text-left pl-20" colspan="3">证据材料提供后10个工作日内</td>
            <td class="text-left p-10" colspan="3">理赔客服与运营商核实材料的真实性</td>
          </tr>
          <tr>
            <td class="text-center" colspan="1" width="10%">3</td>
            <td class="text-center" colspan="2">处理赔偿</td>
            <td class="text-left pl-20" colspan="3">证据材料提供后1个工作日内</td>
            <td class="text-left p-10" colspan="3">理赔到银行账户方便再次购买商品</td>
          </tr>
          </tbody></table>
      </div>

      <p class="f36 title text-center color-000" style="width: 56%;margin-left: 22%;line-height: 0.5rem">
        申请交易安全险赔付时 除基本举证资料外，还需要特别提供哪些资料？
      </p>
      <div class="risk-item color-333 f28">
        <table>
          <tbody><tr>
            <td class="text-center" colspan="1" width="40%">保额</td>
            <td class="text-center p-10" colspan="2">需提供资料</td>
          </tr><tr>
            <td class="text-center" colspan="1" width="33%">0＜保额≤1000元</td>
            <td class="text-center p-10" colspan="2">视频认证</td>
          </tr>
          <tr>
            <td class="text-center" colspan="1" width="33%">1000＜保额≤2000元</td>
            <td class="text-center p-10" colspan="2">视频认证、本人户口本</td>
          </tr>
          <tr>
            <td class="text-center" colspan="1" width="33%">保额&gt;2000元</td>
            <td class="text-center p-10" colspan="2">视频认证、本人户口本、当地机关报案凭证</td>
          </tr>
          </tbody></table>
      </div>

      <p class="f36 title text-center color-000">常见问题</p>
      <p class="risk-item color-333 f28">1、已经申请理赔，但是离购买成功已经超过15天，还会理赔吗？<br>如果您已经完成了理赔申请，交易安全险体系就已经受理了您的申请，在审核通过后会对您的保单进行赔付，不受售后保障期的影响。</p>
      <p class="risk-item color-333 f28">2、关于角色名不符<br>申请商品保障险服务时填写的交易角色名及举证时显示的游戏角色名应与5173交易时所使用的角色名一致。为了保障您的个人权益，交易时购买了商品保障险服务的商品在商品保障险期内请不要转移给其它角色，若转移将无法理赔。</p>
      <p class="risk-item color-333 f28">3、关于商品不符<br>申请商品保障险服务举证时显示的商品名称、商品数量应与5173所购买的一致，若不一致无法理赔。<br>本商品保障险体系由中国网络服务网（www.5173.com）与中国人寿财产保险股份有限公司合作推出，由中国人寿提供本商品保障险体系的服务支持。</p>
    </div>

  </div>
</template>
<script>
  export default{
    name: "TradeGoods"
  }
</script>