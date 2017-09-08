<template>
    <div>
        <div id="pageWrapper" style="height:100%;">
            <!-- top -->
            <div class="top-header border-bottom">
                <div class="top-back">
                </div>
                <div class="top-bt">
                    消息
                </div>
            </div>

            <!-- 买家列表 -->
            <div class="member-tab padding-b4 container" ref="container" :style="{'height':containerHight!='auto'?containerHight+'px':containerHight}" id="myhtml" style="overflow-y: auto;overflow-x:hidden;padding-bottom: 50px;">
                <div class="pro-col border-bottom2" v-for="(item,index) in mesList" :id="item.oppId">
                    <div class="pro-list" :class="item.oppState | hideClass">
                        <a href="javascript:void(0);" :style="{display:(item.msgType==11 || item.msgType==12 || item.msgType==14) ? 'none' : 'black'}">
                            <div class="pro-pic">
                                <img :src="(item.imgUrl) ? item.imgUrl : 'https://m.5173.com//images/default_img.jpg'">
                                <div :class="{'pro-cata': item.goodsType==2 , 'pro-cata3': item.goodsType==1 , 'pro-cata2': item.goodsType==3 || item.goodsType==7 || item.goodsType==59 || item.goodsType==57 || item.goodsType==56 || item.goodsType==58 || item.goodsType==62, 'pro-cata4': item.goodsType==4 , 'pro-cata5': item.goodsType==5}">
                                    {{item.goodsType | gameName}}
                                </div>
                            </div>
                            <div class="pro-title">
                                <p class="catagory">{{item.gameName+"/"+item.regionName+"/"+item.serverName | qufu(item.oppState,item.gameName,item.regionName,item.serverName,item.operatorName,item.goodsType)}}</p>
                                <p class="title" :style="{display:(item.goodsType==56 || item.goodsType==57 || item.goodsType==58 || item.goodsType==59 || item.goodsType==62 ||item.goodsType==0) ? 'none' : 'block'}">{{item.title | messageTitle(item.goodsType,item.num,item.unitName)}}</p>
                                <p class="catagory" :style="{display:(item.goodsType==56 || item.msgType==57 || item.msgType==58 || item.msgType==59) ? 'block' : 'none'}">{{item.msgType}}</p>
                                
                                <p class="price">{{item.totalAmount | messageMoney(item.totalAmount,item.goodsType,item.unitPrice)}}
                                    <span class="f28 color999" :style="{display:(item.goodsType==61) ? 'block' : 'none'}">{{"押金：￥" + item.totalAmount}}</span>
                                    <span class="f28 color999" :style="{display:(item.goodsType==62) ? 'block' : 'none'}">{{item.unitName}}</span>
                                    <span class="f28 color999" :style="{display:(item.goodsType==1 && item.msgType==1) ? 'block' : 'none'}">库存 {{item.num+item.unitName}}</span>
                                    <span class="f28 color999" :style="{display:(item.goodsType==1 && item.msgType!=1) ? 'block' : 'none'}">购买数量{{item.num+item.unitName}}</span>
                                </p>
                            </div>
                        </a>
                        <a href="javascript:void(0);" :style="{display:(item.msgType==11 || item.msgType==12 || item.msgType==14) ? 'black' : 'none'}" @click="kfLink(item.msgType,item.oppId)">
                            <div class="pro-pic">
                                <img :src="(item.imgUrl) ? item.imgUrl : 'https://m.5173.com//images/default_img.jpg'">
                                <div>
                                    {{item.goodsType | gameName}}
                                </div>
                            </div>
                            <div class="pro-title">
                                <p class="title" style="color:#888; margin-top:.1rem;">{{kfMessage | kfFile(item.msgType)}}</p>
                                <p class="f28">点击查看</p>
                            </div>
                        </a>
                    </div>
                    <a href="javascript:" :style="{display:(item.msgType==11 || item.msgType==12 || item.msgType==14) ? 'none' : 'black'}" :class="item.oppState | hideClass" @click="dsLick(item.oppId,item.isSeller,item.goodsType,item.msgType)">
                        <div class="pro-list2 border-bottom">
                            <span class="buyer-status6">
                                {{item.msg | mess(item.msgType,item.oppState,item.goodsType,item.isSeller,item.count)}}
                            </span>
                            <span class="buyer-change f30" v-if="(item.oppState == 1 && item.msgType == 1) || item.oppState == 32" @click.stop="goZhifu(item.oppId,item.oppState,item.msgType)">
                               支付押金
                            </span>
                            <span class="buyer-change f30" v-if="item.oppState == 37 || item.oppState==67 || item.oppState==78 || item.oppState==100008 || item.oppState==100002 || item.oppState == 26 || (item.oppState == 1 && item.msgType == 2)" @click.stop="goZhifu(item.oppId,item.oppState,item.msgType)">
                               去付款
                            </span>
                            <span class="buyer-change f30" v-if="item.oppState == 34" @click.stop="goZhifu(item.oppId,item.oppState,item.msgType)">
                               提供账号信息
                            </span>
                            <span class="buyer-change f30" v-if="item.oppState == 77" @click.stop="goZhifu(item.oppId,item.oppState,item.msgType)">
                               去修改
                            </span>
                            <span class="buyer-chat" v-if="item.oppState==10 && item.msgType==1">聊天</span>
                        </div>
                    </a>
                    <div class="shipingren" v-if="item.oppState == 29">
                        <div class="tuis-titl">微信视频认证</div>
                        <div class="tuis-conn">
                            <p>为了防止恶意抢单，成为打手需要视频认证</p>
                            <p>1.5173客服会在10分钟内加您微信进行视频认证</p>
                            <p>2.加5173客服微信(DB18657995932)进行视频认证</p>
                        </div>
                    </div>
                    <div class="shipingren" v-if="item.oppState == 30">
                        <div class="tuis-titl">打手视频认证成功</div>
                        <div class="tuis-conn">
                            <p>恭喜您，您已成为5173代练打手，快去接单赚钱吧！</p>
                            <div class="pro-list2" style="padding-right: 0px;">
                                <em class="buyer-btn-zf" style="float: right;">
                                    <a href="/dl/seek-game.html?usertype=2">去接单</a>
                                </em>
                            </div>
                        </div>
                    </div>
                    <div class="shipingren" v-if="item.oppState == 31">
                        <div class="tuis-titl">打手视频认证失败</div>
                        <div class="tuis-conn">
                            <p>{{item.msg}}</p>
                        </div>
                    </div>
                </div>
                <div class="list-empty" v-show="isList">
                    <p>
                        <img src="http://gcm.5173.com:8088/src/assets/images/wu-message.png">
                    </p>
                    <span>暂无新消息</span>
                </div>
            </div>
            <div id="dropload" class="pro-col border-bottom2"></div>

            <FooterComponent :active="'message'"></FooterComponent>
        </div>
    </div>
</template>
<script>
    import FooterComponent from "components/Footer.vue"
    import api from '../../../api'
    export default{
        data(){
            return{
                mesList:[],
                params:{
                    page:0,
                    pageSize:10
                },
                isfu:true,
                isfus:false,
                isList:false,
                fukuan:"",
                allLoaded: false,
                containerHight: "auto",
                scrollTop: 0,
                myPayParams:{
                    orderId: "",
                    returnUrl: ""
                },
                kfMessage:"建议回复",
            }
        },
        components: {
            FooterComponent,
        },
        mounted(){
            this.messageList();
            this.containerHight = this.$getScreenHeight() - this.$refs.container.getBoundingClientRect().top;
            this.watchGoTop();
        },
        watch: {
            scrollTop: {
                handler: function (val, oldVal) {
                    if (this.$refs.container.scrollHeight - this.$refs.container.scrollTop - this.containerHight < 200  && !this.allLoaded) {
                        this.loadBottom();
                    }
                },
                deep: true
            }
        },
        methods:{
            watchGoTop: function () {
                var self = this;
                self.$refs.container.addEventListener('scroll', function () {
                    self.$nextTick(() => {
                        self.scrollTop = self.$refs.container.scrollTop;
                    });
                })
            },
            //dl跳转
            dsLick(oppId,isSeller,goodsType,msgType){
                oppId = oppId.split("_");
                if(msgType==2||msgType==3){
                    if(isSeller){
                        if(goodsType == 1){
                            location.href = "/member/member-seller-equipment-transaction.html?orderId=" + oppId[0];
                        }
                    }else{
                        if(goodsType == 1){
                            location.href = "/member/member-buyer-equipment-transaction.html?orderId=" + oppId[0];
                        }
                    }
                }else if(msgType == 4){
                    if (isSeller){
                        location.href = "/dl/member/member-dl-seller-transaction.html?orderNum=" + oppId[0];
                    }else {
                        location.href = "/dl/member/member-dl-dashou-transaction.html?orderNum=" + oppId[0];
                                                    
                    }
                }else if(msgType==5){
                    if (isSeller){
                        location.href = "/dl/member/member-dl-dashou-transaction.html?orderNum=" + oppId[0];
                    }else {
                        location.href = "/dl/member/member-dl-seller-transaction.html?orderNum=" + oppId[0];
                    }
                }
            },
            //去付款
            goZhifu(oppId,oppState,msgType){
                var self = this;
                oppId = oppId.split("_");
                if(oppState ==32){
                    location.href="/dl/order/order-fee.html?orderNum="+oppId[0];
                }else if(oppState ==37){
                    location.href="/pl/order/order-fee.html?orderNum="+oppId[0];
                }else if(oppState ==26){
                    location.href="/dl/order/publish-fee.html?releaseNum="+oppId[0];
                }else if(oppState ==67){
                    location.href="/recharge/recharge-paying.html?orderId="+oppId[0];
                }else if(oppState ==78){
                    location.href="/rent/pay.html?rentOrderCode="+oppId[0];
                }else if(oppState ==77){
                    location.href="/rent/revise-account.html?rentGoodsCode="+oppId[0];
                }else if(oppState == 1){
                    if(msgType == 1){
                        location.href="/publish/publish-deposit.html?goodsId="+oppId[0];
                    }else if(msgType == 2){
                        self.myPayParams.orderId = oppId[0];
                        self.myPayParams.returnUrl = location.protocol + "//" + window.location.host + '/vue/buyerCenter/buyerOrder/mobgoods/' + oppId[0] + '?from=payed';
                        if (oppId[0].substring(0, 3) == "MAO" || oppId[0].substring(0, 3) == "MEO" || oppId[0].substring(0, 3) == "MGO") {
                            api.user.mypay(self.myPayParams).then((data)=>{
                                if (data.body.success) {
                                    if (data.body.url != undefined || data.body.url != null) {
                                        window.location.href = data.body.url;
                                    } else {
                                        self.$toast("支付出现问题，请联系客服！");
                                    }

                                } else {
                                    self.$toast(data.body.responseStatus.message);
                                }
                            });
                        } else {
                            self.$router.push({
                                name: 'singlePay',
                                params: {
                                    orderId:oppId[0],
                                }
                            });

                        };

                    }
                };
                
            },
            //获取数据
           messageList(){
               var self = this;
               api.user.selectmessagelist(self.params).then((data)=>{
                    if(data.body.success){
                        if(data.body.messageStatisEOList && data.body.messageStatisEOList.length>0){
                            for(let i=0; i<data.body.messageStatisEOList.length; i++){
                                self.mesList.push(data.body.messageStatisEOList[i]);
                            };
                            if(data.body.messageStatisEOList.length < self.params.pageSize){
                                self.allLoaded = true;
                            }else {
                                self.allLoaded = false;
                                self.params.page++;
                            }
                        }else{
                            self.isList = !self.isList;
                        }

                    }
               });
           },
            loadBottom: function () {
                var self = this;
                self.allLoaded = true;
                self.messageList();
            },
            kfLink(msgType,oppId){
                if(msgType == 12 || msgType == 14){
                    location.href = "http://sc.5173.com/?question/detail/"+oppId+".html";
                }else if(msgType == 11){
                    location.href = "http://sc.5173.com/?question/ts_detail/"+oppId+".html";  
                }
                
            }
        },
        filters:{
            //消息
            mess(a,msgType,oppState,goodsType,isSeller,count){
                if(oppState == 10){
                    if(msgType == 1){
                        a = "您的商品有"+count+"条新消息";
                    }else if(msgType == 2 || msgType == 3){
                        if(goodsType==2){
                            a = "帐号正在交易中";
                        }else{
                            if(isSeller&&count==0){
                                a = "联系买家";
                            }else if(!isSeller&&count==0){
                                a = "联系卖家";
                            }else{
                                a = "您有"+count+"条新消息";
                            }
                        }
                    }else if(msgType == 4){
                        if(isSeller&&count==0){
                            a = "联系打手";
                        }else if(!isSeller&&count==0){
                            a = "联系玩家";
                        }else{
                            a = "您有"+count+"条新消息";
                        }
                    }else if(msgType == 5){
                        if(isSeller&&count==0){
                            a = "联系玩家";
                        }else if(!isSeller&&count==0){
                           a = "联系打手"; 
                       }else{
                           a = "您有"+count+"条新消息"; 
                       }
                    }else{
                        a = "未正确处理消息"; 
                    }
                }else if((oppState==21 || oppState==22) && msgType==4){
                    a = a;
                }else if(oppState==1){
                    if(msgType == 1){
                        a = "预交10元押金，让您的商品立即通过审核，交易成功后全额退还";
                    }else if(msgType == 2){
                        a = "等待您付款";
                    }
                }else if(oppState==17){
                    a = a;
                }else if(oppState==90){
                    a = a;
                }else if(oppState==26 || oppState==67 || oppState==78){
                    a = "等待您付款";
                }else if(oppState==32){
                    a = "等待您支付押金";
                }else if(oppState==27 || oppState==28 || oppState==38 || oppState==40 || oppState==77 || oppState==100008 || oppState==100002){
                    a = a;
                }else if(oppState==34){
                    a = a;
                }else if(oppState==37){
                    a = "等待您预付陪练费";
                }else if(oppState==41 || oppState==42 || oppState==43 || oppState==44 || oppState==45 || oppState==47  || oppState==50){
                    a = a;
                }
                return a;
            },
            //视频认证
            hideClass(h){
                switch (h){
                    case 29:
                        h = "hide"
                        break;
                    case 30:
                        h = "hide"
                        break;
                    case 31:
                        h = "hide"
                        break;
                    default:
                        return
                }
                return h;
            },
            //区服
            qufu(q,opp,gameName,regionName,serverName,operatorName,goodsType){
                if(opp ==57 || opp==100001 || opp==100003 || opp==100009 || opp==100003 || opp==100007 || opp==100008){
                    q = gameName;
                }else if(opp == 64 || opp == 60 || opp == 66  || opp == 65   || opp == 67 || opp == 61 || opp == 0){
                    if(goodsType==59){
                        q = gameName;
                    }else{
                        q = gameName+"/"+operatorName+"/"+serverName;
                    }
                }else{
                    q = q;
                }
                return q;
            },
            //价格加上小数点
            messageMoney(money,goodsType,unitPrice){
                if(money){
                    if(goodsType == 1){
                        money = "￥"+unitPrice.toFixed(2);
                    }else if(goodsType == 2){
                        money = "￥"+money.toFixed(2);
                        
                    }else if(goodsType == 3){
                        money = "￥"+money.toFixed(2);
                    }else if(goodsType == 4||goodsType == 5){
                        money = "￥"+money.toFixed(2);
                    }else if(goodsType == 55){
                        money = "￥"+unitPrice.toFixed(2);
                     }else if(goodsType == 53 || goodsType == 54){
                        money = "金豆："+money.toFixed(2);
                     }else if(goodsType == 56 || goodsType == 57 || goodsType == 58 || goodsType == 59){
                        money = "￥"+money.toFixed(2);
                    }else if(goodsType == 61){
                        money = "租金：￥"+ unitPrice.toFixed(2);
                    }else if(goodsType == 62){
                        money = "租金：￥"+ money.toFixed(2);
                    }else{
                        money = "￥"+ money.toFixed(2);
                    }
                    return money;
                }else{
                    return "￥0.00";
                }   
            },
            //消息title
            kfFile(kfMess,msgType){
                if(msgType == 12){
                    kfMess = kfMess
                }else if(msgType==14){
                    kfMess = "咨询回复";
                }else{
                    kfMess = "投诉回复";
                }
                return kfMess;
            },            
            //标题
            messageTitle(t,goodsType,num,unitName){
                var self = this;
                if(goodsType==2 || goodsType==1 || goodsType == 4 || goodsType == 5 || goodsType == 55){
                    t = t;
                }else if(goodsType == 3){
                    t = "购买数量："+num+unitName
                }else{
                    t = t;
                }
                return t;
            },
            //分类
            gameName(v){
                switch(v){
                    case 1:
                        v = "装"
                        break;
                    case 2:
                        v = "号"
                        break;
                    case 3:
                        v = "币"
                        break;
                    case 4:
                        v = "代"
                        break;
                    case 7:
                        v = "店"
                        break;
                    case 5:
                        v = "陪"
                        break;
                    case 53:
                        v = "竞"
                        break;
                    case 54:
                        v = "豆"
                        break;
                    case 55:
                        v = "推"
                        break;
                    case 56:
                        v = "代"
                        break;
                    case 57:
                        v = "首"
                        break;
                    case 58:
                        v = "续"
                        break;
                    case 59:
                        v = "A"
                        break;
                    case 61:
                        v = "租"
                        break;
                    case 62:
                        v = "租"
                        break;
                    default:
                        return
                }
                return v
            }

        }
    }
</script>
<style src="css/user/member-cxy.css" scoped></style>
<style scoped>
    .top-bt{
        text-align: center;
        font-size: .36rem;
    }
    .member-tab .pro-col{
        float: left;
        width: 100%;
        position: relative;
    }
    .member-tab .pro-list{
        float: left;
        padding: .3rem;
        width: 100%;
        height: 1.88rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e8e8e8;
        background: #fff;
    }
    .member-tab .pro-list a{
        float: left;
        width: 100%;
        color: #333;
        outline: 0;
    }
    .member-tab .pro-list .pro-pic{
        float: left;
        width: 1.28rem;
        margin-right: .2rem;
        overflow: hidden;
        position: relative;
        height: 1.28rem;
        line-height: 1.28rem;
        background-color: #f1f1f1;
        z-index: 3;
    }
    .member-tab .pro-list .pro-pic img{
        height: 1.28rem;
        width: 100%;
        vertical-align: top;
    }
    .pro-list .pro-pic div{

    }
    .pro-list .pro-pic div{
        color: #fff;
        text-align: center;
    }
   .pro-cata{
        color: #fff;
        text-align: center;
    }
    .member-tab .pro-list .pro-title{
        float: left;
        position: relative;
        padding-left: 1.48rem;
        width: 100%;
        top: -1.32rem;
        box-sizing: border-box;
        font-size: .3rem;
        overflow: hidden;
        line-height: .44rem;
        color: #333;
    }
    .member-tab .pro-list .pro-title p.catagory{
        font-size: .25rem;
        color: #888;
        height: .4rem;
        white-space: nowrap;
        overflow: hidden;
    }
    .member-tab .pro-list .pro-title p.title{
        font-size: .3rem;
        height: .44rem;
        line-height: .44rem;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden;
    }
    .member-tab .pro-list .pro-title p.price{
        font-size: .33rem;
        clear: both;
        color: #000;
        line-height: .5rem;
    }
    .member-tab .pro-list2{
        float: left;
        padding: .15rem .3rem;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        background-color: #ffffff;
    }
    .member-tab .pro-list2 .buyer-status6{
        font-size: .3rem;
        background-size: .0624rem;
        line-height: .55rem;
    }
    .member-tab .pro-list2 .buyer-change{
        display: inline-block;
        vertical-align: middle;
        float: right;
        height: .8rem;
        line-height: .8rem;
        color: #2d70ff;
    }
    .member-tab .pro-list .pro-title p.price span{
        float: right;
        color: #999;
        font-size: .28rem;
    }
    .pro-cata4{
        z-index: 1;
        position: absolute;
        top: 0;
        right: 0;
        width: .33rem;
        height: .33rem;
        background-color: #a266f5;
        line-height: .33rem;
    }
    .pro-cata5{
        z-index: 1;
        position: absolute;
        top: 0;
        right: 0;
        width: .33rem;
        height: .33rem;
        background-color: #ee4844;
        line-height: .33rem;
    }
    .shipingren{
        padding: .2rem .3rem;
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px solid #f1f1f1 !important;
    }
    .tuis-titl{
        font-size: .32rem;
        height: .48rem;
        line-height: .48rem;
        color: #000000;
    }
    .tuis-conn{
        margin-top: .1rem;
        overflow: hidden;
        display: block;
    }
    .tuis-conn p{
        font-size: .3rem;
        line-height: .45rem;
        color: #333333;
    }
</style>