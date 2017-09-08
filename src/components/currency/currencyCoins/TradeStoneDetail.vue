<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div v-if="dingdan">
    <coins-head :title="$route.query.gname+'/'+$route.query.areaname+'/'+$route.query.servername"></coins-head>
    <!---------------------------- 购买信息 ---------------------------->
    <div class="mt-100 bg-fff" @click="dropDrow_hide">

      <div class="border-bottom p-sp bg-fff">
        <a href="javascript:void(0)">
          <div class="clearfix">
            <span class="fl f32 color-010101">{{total_money}}{{biz_category_name}}</span>
            <b class="fr f32 color-f75e46">{{price}}元</b>
          </div>
          <div class="clearfix mt-25">
            <div class="fl f28 color-010101">
              <span class="color-888 mr-20">单价</span><span>1元 = {{unit_addition}}{{biz_category_name}}</span>
            </div>
            <div class="fr">
              <!--<i v-if="icon_pei" @click="click_tishi1" class="icon-pei icon fl mr-20"></i>-->
              <!--<i v-if="icon_bao" @click="click_tishi2" class="icon-bao icon fl mr-20"></i>-->
              <!--<i v-if="icon_che" @click="click_tishi3" class="icon-che icon fl mr-20"></i>-->
              <!--<i v-if="icon_yi" @click="click_tishi4" class="icon-yibao icon fl mr-20"></i>-->
              <!--<i v-if="icon_anxinmai" @click="click_tishi5" class="icon-anximmai icon fl mr-20"></i>-->
              <!--<i v-if="maianxinmai" @click="click_tishi6" class="mai-axm icon fl mr-20"></i>-->
              <span class="f28 va15 color-888">库存 {{blancenum}} 件</span>
            </div>
          </div>
        </a>
      </div>



    </div>

    <div class="box border-bottom">
      <div class="line py-10">
        <span class="f32 color-000">购买件数</span>
        <div class="count2">
          <input class="reduce fl f48" name="" type="button" value="-" @click="coins_reduce" :class="{coinsGray:iscoinsGray}">
          <input class="num fl f36" name=""  type="tel" v-model="coins_num" v-on:blur="coins_blur">
          <input class="add fl common-color f48" name="" type="button" value="+" @click="coins_add" :class="{coinsGray:iscoinsGrays}">
        </div>
        <span class="f32 color-000 fr">件</span>
      </div>
    </div>

    <div v-if="ji_shou||icon_pei||icon_che||icon_bao||icon_yi||icon_anxinmai||maianxinmai||dan_bao" class="fwbz-tip clearfix f26 color-666 px-30 py-20 border-bottom" @click="showFixed()">
      <div class="fl fwbz-tip-list">
        <span v-if="ji_shou" class="span-icon-right">寄售交易</span>
        <span v-if="dan_bao" class="span-icon-right">担保交易</span>
        <span v-if="icon_pei" class="span-icon-right">超时赔付</span>
        <span v-if="icon_che" class="span-icon-right">无货赔付</span>
        <span v-if="icon_bao" class="span-icon-right">本商品可投保</span>
        <span v-if="icon_yi" class="span-icon-right">本商品已投保</span>
        <span v-if="icon_anxinmai" class="span-icon-right">安心买</span>
        <span v-if="maianxinmai" class="span-icon-right">安心买</span>
      </div>
      <i class="fr icon-more"></i>
    </div>





    <div class="bg-fff friend-tip border-bottom px-30 mb-20 " v-if="coinsBuy" @click="click_hint">
        <span class="f30 color-666 ">友情提示</span>
        <span class="fr icon-right"></span>
    </div>


    <div class="axm-box border-top border-bottom"  v-if="baoxian" >
      <span class="f32 ml-30 color-000 fl mr-20">{{coinsServer}}</span>
      <i @click="coins_server" class="axm-tip fl"></i>
      <div class="button-switch ml-20 mt-30 mr-30 fr"><label class="label-switch"><input type="checkbox" v-model="switch_box" id="label-switch"><div class="checkbox"></div></label></div>
      <!--<mt-switch class="button-switch ml-20 mt-30 mr-30 fr" v-model="value"></mt-switch>-->
      <span class="f36 fr f-arial">￥{{danjia.toFixed(2)}}</span>
    </div>

    <div class="axm-box border-top border-bottom" v-if="anxinmai">
      <span class="f32 ml-30 color-000 fl mr-20">安心买服务</span>
      <i @click="coins_server" class="axm-tip fl"></i>
    </div>

    <div class="axm-box border-top border-bottom" v-if="seller">
      <span class="f32 ml-30 color-000 fl mr-20">卖家保险</span>
      <i @click="coins_seller" class="axm-tip fl"></i>
    </div>

    <!---------------------------- 购买 ---------------------------->
    <div class="order-submit bg-fff clearfix border-top fixed-bottom" style="z-index: 40">
      <div class="fl w50" style="white-space: nowrap;
               text-overflow: ellipsis;
               overflow: hidden;">
        <span class="color-000 f32">合计</span>
        <span class="color-m1 f-arial f40">￥{{unit_nums.toFixed(2)}}</span>
      </div>

      <div class="fr w50">
        <a class="submits text-center color-fff f32" @click="getSwitch" v-if="dingdan=='提交订单'">{{dingdan}}</a>
        <a class="submit_no text-center color-fff f30"  v-else-if="dingdan=='您不能购买自己的商品'">{{dingdan}}</a>
        <a class="submit_no text-center color-fff f30"  v-else-if="dingdan=='该卖家不在线，无法交易'">{{dingdan}}</a>
        <a class="submit_no text-center color-fff f30"  v-else-if="dingdan=='发布单不存在'">{{dingdan}}</a>
        <a class="submit_no text-center color-fff f30"  v-else-if="dingdan=='数据请求失败'">{{dingdan}}</a>
        <a class="submit_no text-center color-fff f30"  v-else-if="dingdan=='商品已过期'">{{dingdan}}</a>
        <a class="submit_no text-center color-fff f30"  v-else-if="dingdan=='游戏维护中，请稍候购买'">{{dingdan}}</a>
        <a class="submit_no text-center color-fff f30"  v-else-if="dingdan=='该商品已暂停出售'">{{dingdan}}</a>
        <a class="submit_shijian text-center color-fff f30"  v-else v-html="dingdan"></a>
        <!--<a class="submit text-center color-fff f32" @click="getSwitch">{{dingdan}}</a>-->
      </div>




    </div>
    <!---------------------------- 角色信息 ---------------------------->
    <coins-form :url="isTest" v-on:total="total" v-on:formjuese="formjuese" v-on:formRoleName="formRoleName" v-on:formDengji="formDengji"
                v-on:formQufu="formQufu" v-on:formWay="formWay" v-on:formZhenying = "formZhenying"
                v-on:formQqname="formQqname" v-on:formPhoneName="formPhoneName" v-on:formzhanghao="formzhanghao" ref="child_coins"

    ></coins-form>

    <!---------------------------- 遮料层 ---------------------------->
    <dialog-cover v-if="dialog_cover"></dialog-cover>
    <!--弹出框1-->
    <dialog-smbox v-if="smBox" :smbox="smboxMessage"></dialog-smbox>
    <!--弹出框2-->
    <dialog-box v-if="dialog_box" :title="boxMessage"></dialog-box>

    <div @click="tishi_close" v-if="tishi_box" class="mask-content bg-fff baoxian-tip" style="margin-top: -2rem; display: block;z-index: 600">

      <h2 class="f32 color-000 pb-60 pt-60 text-center">
        <p style="text-align: center;margin-bottom: 0.2rem;" class="f38" v-if="tishi_anxinmai">{{tishi_anxinmai}}</p>
        {{tishi_news}}
      </h2>
    </div>

    <!--服务保障-->
    <transition name="fade_sx">
    <div class="fwbz-box fadeUp border-top bg-fff" v-if="hint_server" style="overflow-y: scroll;max-height: 8.5rem;overflow-x: hidden">
      <div class="title border-bottom">
        <h2 class="color-666 f36">服务保障</h2>
        <i class="icon-close" @click="hint_hide"></i>
      </div>
      <div class="bg-fff p-30 border-bottom clearfix" v-if="ji_shou">
        <p class="lh-50" style="overflow: hidden"><i class="icon-jishou mr-20 mt-6 fl"></i><span class="f32 color-000 fl">寄售交易</span></p>
        <p class="lh-50 color-666 fontarial f32 fl pl-50">货在5173，款到立即发货。</p>
      </div>
      <div class="bg-fff p-30 border-bottom clearfix" v-if="!ji_shou">
        <p class="lh-50"><i class="icon-danbao mr-20 mt-6 fl"></i><span class="f32 color-000 fl">担保交易</span></p>
        <p class="lh-50 color-666 fontarial f32 fl pl-50">此商品由5173移交给您，保证安全。</p>
      </div>
      <div class="bg-fff p-30 border-bottom clearfix" v-if="icon_pei">
        <p class="lh-50"><i class="icon-chaoshi mr-20 mt-6 fl"></i><span class="f32 color-000 fl">超时赔付</span></p>
        <p class="lh-50 color-666 fontarial f32 fl pl-50">卖家承诺，15分钟内未完成发货，您将获得2.00元超时赔款。</p>
      </div>
      <div class="bg-fff p-30 border-bottom clearfix" v-if="icon_che">
        <p class="lh-50"><i class="icon-new-pei mr-20 mt-6 fl"></i><span class="f32 color-000 fl">无货赔付</span></p>
        <p class="lh-50 color-666 fontarial f32 fl pl-50">如果您付款后因为卖家的原因而撤销交易，您将获得10.00元赔款。</p>
      </div>

      <div class="bg-fff p-30 border-bottom clearfix" v-if="icon_bao">
        <p class="lh-50"><i class="icon-ketbao mr-20 mt-6 fl"></i><span class="f32 color-000 fl">本商品可投保</span></p>
        <p class="lh-50 color-666 f32 fl pl-50">购买保险，如有商品被找回、封号等，保险公司将对您进行赔付。</p>
      </div>
      <div class="bg-fff p-30 border-bottom clearfix" v-if="icon_yi">
        <p class="lh-50"><i class="icon-new-xian mr-20 mt-6 fl"></i><span class="f32 color-000 fl">本商品已投保</span></p>
        <p class="lh-50 color-666 f32 fl pl-50">卖家已为商品投保，如商品被找回、封号等，您将获得赔偿。</p>
      </div>
      <div class="bg-fff p-30 border-bottom clearfix" v-if="icon_anxinmai">
        <p class="lh-50"><i class="icon-new-axm mr-20 mt-6 fl"></i><span class="f32 color-000 fl">安心买</span></p>
        <p class="lh-50 color-666 f32 fl pl-50">购买后，当商品发生找回，封号时，卖家承诺最高全款退款</p>
      </div>
      <div class="bg-fff p-30 border-bottom clearfix" v-if="maianxinmai">
        <p class="lh-50"><i class="maijia mr-20 mt-6 fl"></i><span class="f32 color-000 fl">安心买</span></p>
        <p class="lh-50 color-666 f32 fl pl-50">该商品已加入安心买，若发生找回，封号时，卖家承诺最高全款退款。</p>
      </div>

      <div class=" bg-m1 color-fff f32 text-center h-90 lh-90" @click="hint_hide">
        朕知道了
      </div>
    </div>
    </transition>



    <!--友情提示-->
    <!--<transition name="fade_sx">-->
      <!--<div class="fadeUp border-top friendly-tip bg-fff" v-if="hint_box">-->
        <!--<div class="title border-bottom">-->
          <!--<h2>友情提示</h2>-->
          <!--<i class="icon-close" @click="hint_hide"></i>-->
        <!--</div>-->
        <!--<div class="p-30">-->
          <!--<ul>-->
            <!--&lt;!&ndash;<li class="f30 color-666" v-html="hint_txt1"></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="f30 color-666">1.由于魔兽世界游戏币交易的特殊性，建议您下线前使用完所购买的游戏币。</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="f30 color-666">2.任何一个以黑货或者其他理由取回交易商品的人都是骗子，谨防被骗。</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="f30 color-666">为快速交易，请您支付后及时加接手客服QQ进行交易，感谢您的配合。</li>&ndash;&gt;-->
            <!--<li class="f30 color-666" v-for="list in spstr">{{list.replace(/<\/?.+?>/g,"").replace(/&nbsp;/g,"")}}</li>-->
            <!--&lt;!&ndash;<li class="f30 color-666">{{hint_txt2}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="f30 color-666">{{hint_txt3}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="f30 color-666">{{hint_txt4}}</li>&ndash;&gt;-->

          <!--</ul>-->
        <!--</div>-->
        <!--<div class="sure f32" @click="hint_hide">-->
          <!--<span>朕知道了</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</transition>-->
    <!--友情提示结束-->
    <!--服务弹出框-->
    <dialog-serverbox v-if="dialog_server" :serverTitle="serverMessage">
      <div v-if="coinsServer === '安心买服务'">
        <p class="f32 pt-40 pb-40 text-center color-000">安心买服务</p>
        <h2 class="f30 color-666 pb-40 text-center border-bottom">购买后，当商品发生找回，封号时，卖家承诺最高全额退款。</h2>
      </div>
      <div v-if="coinsServer === '卖家保险'">
        <p class="f32 pt-40 pb-40 text-center color-000">卖家保险</p>
        <h2 class="f30 color-666 pb-40 text-center border-bottom">卖家已为商品投保，如出现商品被回收、被找回、被封号，最高可赔付您所购买的订单金额</h2>
      </div>

      <div v-if="coinsServer === '卖家安心买'">
        <p class="f32 pt-40 pb-40 text-center color-000">安心买服务</p>
        <h2 class="f30 color-666 pb-40 text-center border-bottom">该商品已加入安心买，若发生找回，封号时，卖家承诺最高全款退款</h2>
      </div>

      <div v-if="coinsServer === '商品保障险'">
        <p class="f32 pt-40 pb-40 text-center color-000">商品保障险</p>
        <ul>
          <li class="f30 color-666">1、本商品交易安全由中国人寿财险承保</li>
          <li class="f30 color-666 border-bottom pb-40">2、购买后，出现商品被回收、被找回、被封号，最高可赔付您所购买的订单金额。购买前请您仔细阅读
            <router-link :to="{name:'ProtectNotes'}">《购买须知》</router-link>和<router-link :to="{name:'ProtectGoods'}">《商品保障险》</router-link>，购买即表示您已阅读并同意所有条款。</li>
        </ul>
      </div>

      <div v-if="coinsServer === '交易安全险'">
        <p class="f32 pt-40 pb-40 text-center color-000">交易安全险</p>
        <ul>
          <li class="f30 color-666">1、本商品交易安全由中国人保财险承保</li>
          <li class="f30 color-666 border-bottom pb-40">2、购买后，出现商品被回收、被找回、被封号，最高可赔付您所购买的订单金额。购买前请您仔细阅读
            <router-link :to="{name:'TradeNotes'}">《购买须知》</router-link>和<router-link :to="{name:'TradeGoods'}">《交易安全险》</router-link>，购买即表示您已阅读并同意所有条款。</li>
        </ul>
      </div>

    </dialog-serverbox>
    <transition name="fade_sxv">
    <trade-tips v-if="hint_box" :spstr="spstr"></trade-tips>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Head from "../../publicCoins/Head.vue"
  import CoinsForm from "../../coins/CoinsForm2.vue"
  import DialogCover from "../../publicCoins/DialogCover.vue"
  import DialogBox from "../../publicCoins/DialogBox.vue"
  import Smbox from "./TradeSmbox.vue"
  import ServerBox from "../../coins/ServerBox.vue"
  import TradeTips from "./TradeTips.vue";

  //import {getCookie} from './http/cookie.js'

  Vue.filter('mathFilter',function(value){
    return value.split('_')[0]
  });
  export default{
    props: {
      buyPrice: {
        type: Number,
        default: 40.2
      }
    },
    name: "TradeStoneDetail",
    data() {
      return {
        biz_category_name:this.$route.query.biz_category_name,
        unit_num:this.$route.query.price,
        unit_addition:this.$route.query.Price,
        price:this.$route.query.price,
        total_money:this.$route.query.unit_num,
        blancenum:"",
        gid:this.$route.query.gid,
        Price:'',
        icon_bao:false,
        icon_che:false,
        icon_pei:false,
        icon_yi:false,
        hit_tishi:false,
        hint_box:false,//友情提示弹出框
        coinsBuy:false,  //友情提示
        switch_box:false,   //保险
        tishi_box:false,  //提示
        baoxian:false,
        BaoXianRate:"",
        danjia:0,
        hint_txt1:'',
        hint_txt2:'',
        hint_txt3:'',
        hint_txt4:'',
        perPrice: 10,
        isActive: false,
        dialog_box: false,
        dialog_cover: false,
        msg: "订单详情",
        receiver: "",
        qqName: '',
        phoneName: '',
        smBox: false,
        smboxMessage: "",
        indicator: false,
        numMoney: this.$route.query.numMoney,
        boxMessage: '很抱歉，该商品类型手机版尚未开通,建议您去电脑版发布出售。',
        isTest: '',
        coins_num: 1,
        serverMessage:'',
        coinsServer:'',
        dialog_server:false,
        id:this.$route.query.id,//商品id
        dengjiName:undefined,
        qufuName:'',
        wayName:'',
        zhenyignName:'',
//                BizOfferId:this.$route.query.id,//发布单编号
        BizOfferId:this.$route.query.id,//
        PartnerId:'',//来源单号
        totolstr:null,
        IsBuyerAnxinBuy:undefined,
        IsBuyerBaoXian:undefined,
        GameAccount:undefined,
        GameAreaId:"",//区Id
        GameServerId:"",//服id
        BaoXianMaxMoney:"",
        BaoXianMinMoney: "",
        anxinmai:false,
        seller:false,
        tishi_news:"购买保险，如有商品被找回、封号等，保险公司将对您进行赔付",
        iscoinsGray:false,
        iscoinsGrays:false,
        ExchangeInfos:false,
        spstr:[],
        IsSupportRoleGrade:false,//收货等级
        IsZhanghoa:false,
        PostUserId:"",//id
        juese:undefined,
        IsSupportRoleId:false,
        icon_anxinmai:false,
        tishi_anxinmai:'',
        GameRestoreInfo:'',
        maianxinmai:false,
        dingdan:'',
        pcdUserId:'',
        isKai1:false,
        isKai2:false,
        hint_server:false,
        ji_shou:false,
        dan_bao:false,
        IsSupportRole:false,

      }
    },
    components: {
      TradeTips,
      "coins-head": Head,
      "coins-form": CoinsForm,
      "dialog-cover": DialogCover,
      "dialog-box": DialogBox,
      "dialog-smbox": Smbox,
      "dialog-serverbox" : ServerBox,
      "trade-tips":TradeTips

    },
    computed:{
      unit_nums:function (val,olaval) {
        var abc = this.unit_num * this.coins_num
        if(this.switch_box == true){
          if(this.danjia!=""){
            abc = Number(abc) +Number(this.danjia.toFixed(2))
            console.log(Number(abc))
            console.log(Number(this.danjia.toFixed(2)))
          }
          if(this.coinsServer=="安心买服务"){
            this.IsBuyerAnxinBuy = true
          }else{
            this.IsBuyerBaoXian = true
          }
        }else{
          if(this.coinsServer=="安心买服务"){
            this.IsBuyerAnxinBuy = false
          }else{
            this.IsBuyerBaoXian = false
          }
        }
        return abc
      }
    },
    watch: {
      coins_num: function (val, oldVal) {
        if (val == "") {
          return
        }
        var patrn = /^[0-9]+$/;
        if (patrn.test(val)) {
          this.coins_num = this.coins_num
        } else {
          this.coins_num = oldVal
        }
        if(val < 1){
          this.coins_num = 1
        }
        if (Number(val) > this.blancenum) {
          this.coins_num = this.blancenum
        } else if (val < 1) {
          this.coins_num = 1
        }
        if(this.coinsServer=="安心买服务"){
          if(this.BaoXianRate<1){
            this.danjia = this.BaoXianRate * this.unit_num * this.coins_num;
          }else{
            this.danjia = this.BaoXianRate * this.unit_num * this.coins_num/100;
          }
        }else{
          if(this.BaoXianRate<1){
            this.danjia = this.BaoXianRate * this.unit_num * this.coins_num;
          }else{
            this.danjia = this.BaoXianRate * this.unit_num * this.coins_num/100;
          }

        }
//              this.danjia =  this.BaoXianRate * this.unit_num * this.coins_num/100;

        if(this.danjia>this.BaoXianMaxMoney){
          this.danjia = this.BaoXianMaxMoney
        }else if(this.danjia<this.BaoXianMinMoney){
          this.danjia = this.BaoXianMinMoney
        }
      }
    },
    deactivated(){
      this.$destroy(true)
    },
    created(){
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.icon_bao =  this.$route.query.flag+""=="true"?true:false;
      this.icon_che = this.$route.query.c_deposit+""=="true"?true:false;
      this.icon_pei = this.$route.query.locked+""=="true"?true:false;
      this.icon_yi = this.$route.query.yitoubao+""=="true"?true:false;
      this.icon_anxinmai = this.$route.query.anxinmai+""=="true"?true:false;
      this.maianxinmai = this.$route.query.maianxinmai+""=="true"?true:false;
      this.dan_bao = this.$route.query.jishou+""=="true"?false:true;
      this.ji_shou = this.$route.query.jishou+""=="true"?true:false;
      this.$http.get(
        this.$CONSTANTS.APIMainGoods+'/mainGoods/selectpcgoodsdetail',
        {
          params:{
            BizOfferId:this.BizOfferId,//发布单编号
          }
        },
        {
          headers: {
            contentType: "aplication/json; charset = UTF-8",
            dataType: 'json'
          }
        }
      ).then((res)=>{

        if(res.body.responseStatus.code == "00"){
          this.isKai1 = true;
          if(res.body.result){
            this.isKai1 = true;
            var strs = JSON.parse(res.body.result).BizResult;
            this.blancenum = strs.Quantity;
            if (this.blancenum==1) {
              this.iscoinsGrays = true
            }



            this.dingdan ="提交订单";
            console.log("PostUserId",strs.PostUserId);
            this.PostUserId = strs.PostUserId;
            this.GameAreaId = strs.GameAreaId;
            this.GameServerId = strs.GameServerId;
            this.GameRestoreInfo = strs.GameRestoreInfo;
            if(this.isKai1&&this.isKai2){
              this.$indicator.close();
            }

            console.log("xiadanpeizhji",strs);

            if(strs.NotBuyStatus==1){
              this.dingdan ="游戏维护中，请稍候购买";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==2){
              this.dingdan ="游戏维护中，请稍候购买";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }

            if(strs.NotBuyStatus==9){
              console.log(strs.GameRestoreInfo.split("："))
              this.dingdan ="卖家不方便交易，</br>请在"+strs.GameRestoreInfo.split("：")[1].replace('）',"")+"内购买";

              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==8){
              this.dingdan ="该卖家不在线，无法交易";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==3){
              this.dingdan ="该商品已停止出售，请选择其他同类商品";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==12){
              this.dingdan ="商品已过期";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==4){
              this.dingdan ="该商品已售罄，请选择其他同类商品";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==6){
              this.dingdan ="该商品已暂停出售";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==10){
              this.dingdan ="不能购买自己的商品";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==7){
              this.dingdan ="购买方式未开启，请选择其他同类商品";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==11){
              this.dingdan ="审核失败，请选择其他同类商品";
              //this.boxMessage = this.GameRestoreInfo;
              return false
            }
            if(strs.NotBuyStatus==5){
//              this.dialog_box = true;
//              this.dialog_cover = true;
//              this.boxMessage = "该商品正在交易中，请选择其他同类商品";
              this.dingdan ="该商品正在交易中，请选择其他同类商品";
              //this.boxMessage = this.GameRestoreInfo;

            }
            if(strs.PostUserId==this.$getAccountInfo().pcUserId){
              this.$indicator.close();
              this.dingdan = "您不能购买自己的商品";

            }
            if(strs.ErrorMessage=="未获取到发布单！"){
//              this.dialog_box = true;
//              this.dialog_cover = true;
//              this.boxMessage = "发布单不存在"
              this.dingdan = "发布单不存在";


            }
            if(strs.ErrorMessage=="商品不存在或者已下架。！"){
              this.dialog_box = true;
              this.dialog_cover = true;
              this.boxMessage = "商品不存在或者已下架。！"
              return false

            }

          }
        }
        else{
          this.dingdan="数据请求失败"
        }
      },() => {

//             this.dialog_box = true;
//             this.dialog_cover = true;
//             this.boxMessage =  "系统异常，请稍后再试！"

      });


    },
    mounted(){
      if(this.coins_num == 1){
        this.iscoinsGray = true
      }

//          this.$getAccount().then(account => {
//            if (account) {
//              console.log("---------",account.pcUserId);
//              this.pcdUserId = account.pcUserId
//            } else {
//              console.log("没登入");
//              location.href = "/login-mobile.html?returnUrl=" + encodeURIComponent(location.href);
//            }
//          })
    },
    methods: {
      showFixed(){
       this.hint_server = true
        this.dialog_cover = true;
      },
      //卖家保险
      coins_seller:function () {
        this.dialog_server = true;
        this.dialog_cover =true;
      },
      //商品超市赔付
      click_tishi1:function () {
        this.tishi_anxinmai = "超时赔付"
        this.tishi_box = true;
        this.dialog_cover =true;
        this.tishi_news = '5173承诺：超过10分钟未完成发货，赔付给您1—3元。'
      },
      //本商品可投保
      click_tishi2:function () {
        this.tishi_anxinmai = "本商品可投保"
        this.tishi_box = true;
        this.dialog_cover =true;
        this.tishi_news = '购买保险，如有商品被找回、封号等，保险公司将对您进行赔付。'
      },
      //本商品无货赔付
      click_tishi3:function () {
        this.tishi_anxinmai = "无货赔付"
        this.tishi_box = true;
        this.dialog_cover =true;
        this.tishi_news = '如果您付款后因卖家的原因而撤销交易，您将获得10元赔款。'
      },
      click_tishi4:function () {
        this.tishi_anxinmai = "本商品已投保"
        this.tishi_box = true;
        this.dialog_cover =true;
        this.tishi_news = '卖家已为商品投保，如商品被找回、封号等，您将获得赔偿。'
      },
      click_tishi5:function () {
        this.tishi_box = true;
        this.dialog_cover =true;
        this.tishi_news = '购买后，当商品发生找回，封号时，您将获得赔偿。'
        this.tishi_anxinmai = "买家安心买"
      },
      click_tishi6:function () {
        this.tishi_box = true;
        this.dialog_cover =true;
        this.tishi_news = '该商品已加入安心买，若发生找回，封号时，卖家承诺最高全款退款。'
        this.tishi_anxinmai = "卖家安心买"
      },
      tishi_close:function () {
        this.tishi_box = false;
        this.dialog_cover =false;
      },
      //友情提示
      click_hint:function () {
        if(this.hint_box==true){
          this.hint_box = false;
        }else {
          this.hint_box = true;

        }

      },
      hint_hide:function () {
        this.hint_box = false;
        this.dialog_cover = false;
        this.hint_server = false;
      },
      //安心买服务点击
      coins_server:function () {
        this.dialog_server = true;
        this.dialog_cover =true;

      },
      coins_blur: function () {
        if (this.coins_num == "") {
          this.coins_num = 1
        }
        if(Number(this.coins_num) > Number(this.blancenum)){
          this.coins_num = 5
        }
      },
      formzhanghao:function (str) {
          this.GameAccount = str
      },
      //收货角色名
      formRoleName: function (str) {
        this.receiver = str
      },
      formjuese:function (str) {
        this.juese = str
      },
      total:function (str) {
        console.log("配置",str)
        this.isKai2 = true;
        if(this.isKai1&&this.isKai2){
          this.$indicator.close();
        }
//        if(str.ErrorMessage=="当前卖家不在线，暂时无法交易。"){
//          this.dialog_box = true;
//          this.dialog_cover = true;
//          this.boxMessage = "当前卖家不在线，暂时无法交易。"
//          return false
//        }
        if(str.ErrorMessage=="未获取到发布单！"){
          this.dialog_box = true;
          this.dialog_cover = true;
          this.boxMessage = "发布单不存在"
          return false

        }
        if(str.ErrorMessage=="商品不存在或者已下架。！"){
//          this.dialog_box = true;
//          this.dialog_cover = true;
//          this.boxMessage = "商品不存在或者已下架。！"
//          return false

        }
        if(str.IsSupportGameAccount){
          this.IsZhanghoa = true
        }else{
          this.IsZhanghoa = false
        }
        if(str.IsSupportRoleGrade){
          this.IsSupportRoleGrade = true
        }else{
          this.IsSupportRoleGrade = false
        }

        if(str.IsSupportRole){
          this.IsSupportRole = true
        }else{
          this.IsSupportRole = false
        }
        if(str.IsSupportRoleId){
          this.IsSupportRoleId  = true
        }else{
          this.IsSupportRoleId = false
        }
        if(str.ExchangeInfos){
          this.ExchangeInfos = true
        }else{
          this.ExchangeInfos = false
        }

        if(str.Quantity==0){
//          this.dialog_box = true;
//          this.dialog_cover = true;
//          this.boxMessage = "商品不存在或者已下架。"
//          return false
        }
//        this.blancenum = str.Quantity
//        if(this.blancenum==0){
//          this.coins_num = 0
//        }
        if(str.BaoXianType.Key=="交易安全险"){
          this.baoxian = true
        }else if(str.BaoXianType.Key=="商品保障险"){
          this.baoxian = true
        }else if(str.BaoXianType.Key=="买家安心买"){
          str.BaoXianType.Key="安心买服务";
          this.baoxian = true
        }else if(str.BaoXianType.Key=="卖家安心买"){
          str.BaoXianType.Key="卖家安心买";
          this.baoxian = false;
          this.anxinmai = true;
        }else if(str.BaoXianType.Key=="卖家保险"){
          str.BaoXianType.Key="卖家保险";
          this.baoxian = false;
          this.seller = true;
        }else{
          this.baoxian = false
        }

        this.coinsServer = str.BaoXianType.Key;

        if(str.BuyModeExplains){
          this.coinsBuy = true;
          this.hint_txt1 = str.BuyModeExplains;
          console.log("-----------",str.BuyModeExplains)
          const spstr = str.BuyModeExplains.replace("友情提示","").replace("：","").split("<br>");
          console.log(spstr)
          this.spstr = spstr
        }

        this.BaoXianMaxMoney = str.BaoXianMaxMoney;
        this.BaoXianMinMoney = str.BaoXianMinMoney;
        this.BaoXianRate = str.BaoXianRate;

        console.log(this.unit_num * this.coins_num)
//              if(this.coinsServer=="安心买服务"){
//                this.danjia = this.BaoXianRate * this.unit_num * this.coins_num;
//              } else
        if(this.$route.query.isJis == 1&&this.coinsServer!="安心买服务"){
          if(this.BaoXianRate<1){
            this.danjia = this.BaoXianRate * this.unit_num * this.coins_num;
          }else{
            this.danjia = this.BaoXianRate * this.unit_num * this.coins_num/100;
          }
        }else{
          if(this.BaoXianRate<1){
            this.danjia = this.BaoXianRate * this.unit_num * this.coins_num;
          }else{
            this.danjia = this.BaoXianRate * this.unit_num * this.coins_num/100;
          }

        }
        console.log("------",this.danjia)
        if(this.danjia>this.BaoXianMaxMoney){
          this.danjia = this.BaoXianMaxMoney
        }else if(this.danjia<this.BaoXianMinMoney){
          this.danjia = this.BaoXianMinMoney
        }
      },
      //收货等级
      formDengji:function (str) {
        this.dengjiName = str
      },
      //交易区服
      formQufu:function (str) {
        this.qufuName = str
      },
      //交易方式
      formWay:function (str) {
        this.wayName = str
      },
      //交易阵营
      formZhenying:function (str) {
        this.zhenyignName = str
      },
      //qq名
      formQqname: function (str) {
        this.qqName = str
      },
      //手机号
      formPhoneName: function (str) {
        this.phoneName = str
      },
      coins_add: function () {
        this.coins_num++;
        this.iscoinsGray = false;
        if (this.coins_num > this.blancenum) {
          this.coins_num = this.blancenum;
        }
        if (this.coins_num == this.blancenum) {
          this.iscoinsGrays = true
        }
      },
      coins_reduce: function () {
        this.coins_num--;
        this.iscoinsGrays = false;
        if (this.coins_num < 1) {
          this.coins_num = 1;

        }
        if (this.coins_num == 1) {
          this.iscoinsGray = true
        }
      },
      dropDrow_hide: function () {
        document.getElementById('drop_down').style.display = "none"
      },
//            提交订单
      getSwitch: function () {
        this.dialogBox();
      },
      //提交订单
      dialogBox: function () {
        const self = this;
        var qqReg = /^[1-9]\d{4,10}$/;
        var mobileReg = /(^0{0,1}1[3|4|5|7|8][0-9]{9}$)/;
        if (this.buyNum == "") {
          this.smBox = true;
          this.smboxMessage = "请输入购买数量";
          return false
        } else if(this.receiver==""||this.receiver.replace(/(^\s*)|(\s*$)/g, "")==""&&this.IsSupportRole===true){
          this.smBox = true;
          this.smboxMessage = "请填写收货角色名";
          return false;
        } else if (this.receiver.trim().length != this.receiver.length&&this.IsSupportRole===true) {
          this.smBox = true;
          this.smboxMessage = "角色名不能含有空格";
          return false;
        }else if (this.GameAccount === ""&&this.IsZhanghoa===true) {
          console.log(this.dengjiName)
          this.smBox = true;
          this.smboxMessage = "请填写游戏账号名";
          return false;
        } else if (this.phoneName == "") {
          this.smBox = true;
          this.smboxMessage = "请填写手机号";
          return false;
        }else if (this.dengjiName === ""&&this.IsSupportRoleGrade===true) {
          console.log(this.dengjiName)
          this.smBox = true;
          this.smboxMessage = "请填写收货角色等级";
          return false;
        }else if (this.juese === ""&&this.IsSupportRoleId===true) {
          this.smBox = true;
          this.smboxMessage = "请填写角色数字ID";
          return false;
        } else if (this.qufuName == ""&&this.ExchangeInfos) {
          this.smBox = true;
          this.smboxMessage = "请选择交易区服";
          return false;
        } else if (!mobileReg.test(this.phoneName)) {
          this.smBox = true;
          this.smboxMessage = "手机号格式错误";
          return false;
        } else if (this.qqName == "") {
          this.smBox = true;
          this.smboxMessage = "请填写QQ号";
          return false
        } else if (!qqReg.test(this.qqName)) {
          this.smBox = true;
          this.smboxMessage = "QQ号格式错误";
          return false;
        }
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });

        this.$getAccount().then(account => {
          if (account) {
            console.log("---------",account.pcUserId);
            if(account){
              //添加角色信息
              this.$http.get(
                '/api/mobile-goods-service/rs/purchaseData/addHistoryRole',
                {
                  params: {
                    gameName: this.$route.query.gname,
                    regionName: this.$route.query.areaname,
                    serverName: this.$route.query.servername,
                    mobileNumber: this.phoneName,        //手机号
                    roleName: this.receiver,             //角色名
                    qqNumber: this.qqName,                //qq号
                    raceName: this.$route.query.racename,
                  }
                },
                {
                  headers: {
                    contentType: "aplication/json; charset = UTF-8",
                    dataType: 'json'
                  }
                }
              ).then((res) => {

                this.$http.get(
                  this.$CONSTANTS.APIMainGoods+'/mainGoods/selectpcgoodsdetail',
                  {
                    params:{
                      BizOfferId:this.BizOfferId,//发布单编号
                    }
                  },
                  {
                    headers: {
                      contentType: "aplication/json; charset = UTF-8",
                      dataType: 'json'
                    }
                  }
                ).then((res)=>{

                  if(res.body.responseStatus.code == "00"){

                    if(res.body.result){
                      var strs = JSON.parse(res.body.result).BizResult;

                      if(strs.NotBuyStatus==1){
                        this.$indicator.close();
                        this.dialog_box = true;
                        this.dialog_cover = true;
                        this.boxMessage = "当前游戏正在维护，请您维护结束后购买。";
                        return false
                      }

                      //添加担保订单
                      if(this.$route.query.isJis == 1){
                        this.$http.get(
                          this.$CONSTANTS.APIMainGoods+'mainGoodsOrderConfig/getCreateOrderConfig',
                          {
                            params:{
                              BizOfferId:this.BizOfferId,//发布单编号
                            }
                          },
                          {
                            headers: {
                              contentType: "aplication/json; charset = UTF-8",
                              dataType: 'json'
                            }
                          }
                        ).then((res)=>{
                          if(res.body.responseStatus.code == "00"){
                            if(res.body.result){
//                      console.log("下单前配置",JSON.parse(res.body.result).BizResult);
                              var str = JSON.parse(res.body.result).BizResult;
                              if(str.ErrorMessage){
                                if(str.ErrorMessage.indexOf('不在交易')>-1){
                                  this.$indicator.close();
                                  this.dialog_box = true;
                                  this.dialog_cover = true;
                                  this.boxMessage = str.ErrorMessage;
                                  return false
                                }
                              }
                              if(str.ErrorMessage=="当前卖家不在线，暂时无法交易。"){
                                this.$indicator.close();
                                this.dialog_box = true;
                                this.dialog_cover = true;
                                this.boxMessage = "当前卖家不在线，暂时无法交易。"
                                return false
                              }else if(str.ErrorMessage=="当前游戏正在维护，请您维护结束后购买。"){
                                this.$indicator.close();
                                this.dialog_box = true;
                                this.dialog_cover = true;
                                this.boxMessage = "当前游戏正在维护，请您维护结束后购买。";
                                return false
                              }else if(str.Quantity==0){
                                this.$indicator.close();
                                this.dialog_box = true;
                                this.dialog_cover = true;
                                this.boxMessage = "抱歉，手慢一步，该宝贝已经被抢光";
                                return false
                              }else if(this.coins_num > str.Quantity){
                                this.$indicator.close();
                                this.dialog_box = true;
                                this.dialog_cover = true;
                                this.boxMessage = "抱歉，手慢一步，该宝贝所剩无几了";
                                return false
                              }else{
                                this.$http.get(
                                  this.$CONSTANTS.APIMainGoods+'mainGoodsAccountOrder/createDBOrder',
                                  {
                                    params:{
                                      BizOfferId:this.BizOfferId,//发布单编号
                                      UserId:account.pcUserId,//买家id
                                      //BuyMode:this.wayName=="当面交易"?0:2,
//                                TraceId:getCookie("m.5173.com"),
//                                PartnerInfo:getCookie("5173_HZ"),
                                      IsBuyerBaoXian:this.IsBuyerBaoXian,//保险
                                      IsBuyerAnxinBuy:this.IsBuyerAnxinBuy,//是否购买安全
                                      IsActivitySevice:undefined,
                                      GameAccount:this.GameAccount,
                                      GameAccountType:undefined,
                                      Quantity:this.coins_num,//购买数量
                                      BuyerGameRole:this.receiver,
                                      RoleNumId:this.juese===""?undefined:this.juese,//角色数字ID
                                      RoleGrade:this.dengjiName===""?undefined:this.dengjiName,
                                      BuyerQQ:this.qqName,
                                      BuyerTel:this.phoneName,
                                      VipKefu:undefined,
                                      IsAutoAssignOp:true,
                                      PartnerID:undefined,
                                      ExchangeAreaId:this.GameAreaId,
                                      ExchangeServerId:this.GameServerId,
                                      goodsType:3
                                    }
                                  },
                                  {
                                    headers: {
                                      contentType: "aplication/json; charset = UTF-8",
                                      dataType: 'json'
                                    }
                                  }
                                ).then((res) => {
                                  res = res.body;
                                  this.$indicator.close();
                                  if (res.responseStatus.code == '00') {
                                    const att = JSON.parse(res.result);
                                    if(att.BizResult.IsSucceed==false){
                                      this.dialog_box = true;
                                      this.dialog_cover = true;
                                      this.boxMessage = "该商品暂时无法购买";
                                      return false
                                    }
                                    location.href="https://mypay.5173.com/PaymentWap/PayOrderV3.aspx?OrderId="+att.BizResult.OrderId+"&Key="+att.BizResult.Key+"&ServiceType="+att.BizResult.ServiceType;
                                  } else {
                                    if (res.responseStatus.code == '50004') {
                                      this.dialog_box = true;
                                      this.dialog_cover = true;
                                      this.boxMessage = "抱歉，手慢一步，价格已变动"
                                      return false
                                    }else if(res.responseStatus.code == '不存在当前商品'){
                                      this.dialog_box = true;
                                      this.dialog_cover = true;
                                      this.boxMessage = "当前商品不存在";
                                    }else if(str.Quantity==0){
                                      this.dialog_box = true;
                                      this.dialog_cover =true;
                                      this.boxMessage = str.ErrorMessage;
                                      return false
                                    }else if(res.responseStatus.code == '40027'){
                                      this.dialog_box = true;
                                      this.dialog_cover =true;
                                      this.boxMessage = "抱歉，手慢一步，库存已不足"
                                    }else{
                                      this.dialog_box = true;
                                      this.dialog_cover =true;
                                      this.boxMessage = "发生未知错误"

                                    }

                                  }
                                }, () => {
                                  this.dialog_box = true;
                                  this.dialog_cover =true;
                                  this.boxMessage = "发生未知错误"
                                });
                              }

                            }
                          }

                        },() => {

                        })

                      }
                      else {

                        this.$http.get(
                          this.$CONSTANTS.APIMainGoods+'mainGoodsOrderConfig/getJSOrderConfig',
                          {
                            params:{
                              BizOfferId:this.BizOfferId,//发布单编号
                            }
                          },
                          {
                            headers: {
                              contentType: "aplication/json; charset = UTF-8",
                              dataType: 'json'
                            }
                          }
                        ).then((res)=>{
                          console.log("this.dengjiName",this.dengjiName)
                          if(res.body.responseStatus.code == "00"){
                            if(res.body.result){
                              var str = JSON.parse(res.body.result).BizResult;
                              if(str.ErrorMessage){
                                if(str.ErrorMessage.indexOf('不在交易')>-1){
                                  this.$indicator.close();
                                  this.dialog_box = true;
                                  this.dialog_cover = true;
                                  this.boxMessage = str.ErrorMessage;
                                  return false
                                }
                              }
                              if(str.ErrorMessage=="当前游戏正在维护，请您维护结束后购买。"){
                                this.$indicator.close();
                                this.dialog_box = true;
                                this.dialog_cover = true;
                                this.boxMessage = "当前游戏正在维护，请您维护结束后购买。";
                                return false
                              }
                              if(str.Quantity==0){
                                this.$indicator.close();
                                this.dialog_box = true;
                                this.dialog_cover = true;
                                this.boxMessage = "抱歉，手慢一步，该宝贝已经被抢光";
                                return false
                              }else if(this.coins_num > str.Quantity){
                                this.$indicator.close();
                                this.dialog_box = true;
                                this.dialog_cover = true;
                                this.boxMessage = "抱歉，手慢一步，该宝贝所剩无几了";
                                return false
                              }else{
                                this.$http.get(
                                  this.$CONSTANTS.APIMainGoods+'mainGoodsAccountOrder/createJSOrder',
                                  {
                                    params:{
                                      BizOfferId:this.BizOfferId,//发布单编号
                                      BuyerId:account.pcUserId,//买家id
                                      BuyerSourceSiteId:"m.5173.com",//来源站点
                                      Quantity:this.coins_num,//购买数量
                                      Price:this.unit_nums,//购买价格
                                      GameAccount:this.GameAccount,//游戏账号
                                      BattleNetId	:undefined,//战网通行证
                                      BuyerGameRole	:this.receiver,//买家游戏角色名或者游戏账号
                                      BuyerGameGrade:this.dengjiName===""?undefined:this.dengjiName,//买家游戏等级
                                      BuyerRoleId:this.juese===""?undefined:this.juese,//角色数字ID
                                      BuyerTelephone:this.phoneName,//买家下单联系电话
                                      BuyerQQ:this.qqName,//买家下单联系QQ
                                      IsAutoAssignOp:true,
                                      IsPostSaleIndemnity:this.IsBuyerBaoXian,//保险
                                      IsBuyerAnxinBuy:this.IsBuyerAnxinBuy,//是否购买安全
                                      ExchangeAreaId:this.GameAreaId,
                                      ExchangeServerId:this.GameServerId,
                                      goodsType:3
                                    }
                                  },
                                  {
                                    headers: {
                                      contentType: "aplication/json; charset = UTF-8",
                                      dataType: 'json'
                                    }
                                  }
                                ).then((res) => {
                                  res = res.body;
                                  this.$indicator.close();
                                  if (res.responseStatus.code == '00') {
                                    const att = JSON.parse(res.result);
                                    console.log("购买成功",att);
                                    console.log(att.BizResult.OrderId);
                                    if(att.BizResult.IsSucceed==false){
                                      this.dialog_box = true;
                                      this.dialog_cover = true;
                                      this.boxMessage = "该商品暂时无法购买";
                                      return false
                                    }
                                    location.href="https://mypay.5173.com/PaymentWap/PayOrderV3.aspx?OrderId="+att.BizResult.OrderId+"&Key="+att.BizResult.PayInfoSign+"&ServiceType="+att.BizResult.ServiceType;
                                  } else {
                                    if (res.responseStatus.code == '50004') {
                                      this.dialog_box = true;
                                      this.dialog_cover = true;
                                      this.boxMessage = "抱歉，手慢一步，价格已变动"
                                      return false
                                    }else if(res.responseStatus.code == '不存在当前商品'){
                                      this.dialog_box = true;
                                      this.dialog_cover = true;
                                      this.boxMessage = "当前商品不存在";
                                    }else if(str.Quantity==0){
                                      this.dialog_box = true;
                                      this.dialog_cover =true;
                                      this.boxMessage = str.ErrorMessage;
                                      return false
                                    }else if(res.responseStatus.code == '40027'){
                                      this.dialog_box = true;
                                      this.dialog_cover =true;
                                      this.boxMessage = "抱歉，手慢一步，库存已不足"
                                    }else{
                                      this.dialog_box = true;
                                      this.dialog_cover =true;
                                      this.boxMessage = "发生未知错误"
                                    }

                                  }
                                }, () => {
                                  this.dialog_box = true;
                                  this.dialog_cover =true;
                                  this.boxMessage = "发生未知错误"
                                });
                              }
                            }
                          }

                        },() => {

                        })

                      }






                    }
                  }

                },() => {


                });



              }, () => {
                this.dialog_box = true;
                this.dialog_cover =true;
                this.boxMessage = "发生未知错误"
              });


            }

          } else {
            console.log("没登入");
            location.href = "/login-mobile.html?returnUrl=" + encodeURIComponent(location.href);
          }
        })



      },
    }

  };
</script>


<style scoped>
  .dialog-box2 {
    display: block;
  }
  .fade_sx-enter-active {
    transition: all .3s ease;
  }
  .fade_sx-leave-active {
    transition: all .3s ease;
  }
  .fade_sx-enter, .fade_sx-leave-active {
    transform: translateY(100%);
  }
  /*.fade_hide-enter-active {*/

  /*transition: all .1s ease;*/
  /*}*/
  /*.fade_hide-leave-active {*/

  /*transition: all 1s ease;*/
  /*}*/
  /*.fade_hide-enter,.fade_hide-leave-active {*/
  /*opacity: 0;*/
  /*}*/



  .coinsGray{
    color: #999;
  }
  .order-submit .submit_no {
    display: inline-block;
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #808080;
  }
  .order-submit .submit_shijian {
    display: inline-block;
    width: 100%;
    height: 0.9rem;
    background: #808080;
    padding: 0.1rem 0;
  }
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

