<template>
    <div>
        <div id="wrapper" class="pb-100">
            <!--填充fixed留下的块-->
            <div class="fixedFill-mx"></div>
            <!--顶部fixed部分-->
            <div class="fixed-top fixed-box">
                <div class="top-header border-bottom">
                    <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
                    <h2 class="page-title f36 color-000">支付</h2>
                    <div class="top-right"></div>
                </div>
            </div>
            <!--付款金额-->
            <div class="pay-money">
                <span class="color-000">付款金额</span><span class="common-color ml-20 ">￥<i class="fontarial">{{zhifuMoney}}</i></span>
            </div>
            <!--付款方式-->
            <div class="WeChat-pay mt-20">
                <a @click="weixinPay">
                    <img src="~images/pay-weix.png" alt="微信支付"><span class="f36 ml-20 color-000">微信支付</span>
                    <i class="to-right"></i>
                </a>
            </div>
            <div class="Alipay-pay" v-if="isZhiFuBao">
                <a @click="zhifubaoPay">
                    <img src="~images/pay-zfb.png" alt="支付宝支付"><span class="f36 ml-20 color-000">支付宝支付</span>
                    <i class="to-right"></i>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return{
                orderId:this.$route.params.orderId,
                zhifuMoney:"",
                zhifubaoMass:"",
                isOffice:"",
                isZhiFuBao:true
            }
        },
        watch:{

        },
        created(){
            this.orderIdMoney();
            var ua = navigator.userAgent.toLocaleLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                this.isOffice = 2;
                this.isZhiFuBao = false;
            }else{
                this.isOffice = 1;
            }
        },
        methods:{
            //调取订单接口获取订单价格
            orderIdMoney:function () {
                var self = this;
                self.$http.get(self.$CONSTANTS.APIOrder+"buyer/order/"+self.orderId).then(function (res) {
                    if(res.body.success == true){
                        self.zhifuMoney = res.body.result.totalAmount;
                    }
                });
            },
            weixinPay: function () {//微信支付
                var self = this;
                if (self.zhifuMoney < 10000) {
                    self.$http.post(self.$CONSTANTS.APIOrder + "payment/weixin", {
                        orderId: self.orderId,
                        isOffice: self.isOffice
                    }).then(function (res) {
                        if (res.body.success == true) {
                            window.location.href = res.body.url;
                        } else {
                            self.$toast(res.body.responseStatus.message);
                            setTimeout(function () {
                                window.location.go(-1);
                            }, 2000);
                        }
                    });
                } else {
                    self.$toast.messages("金额超限,请选择支付宝支付！");
                    return;
                }
            },
            zhifubaoPay:function () { //支付宝支付
                var self = this;
                self.$http.post(self.$CONSTANTS.APIOrder + "payment/alipay", {
                    orderId: self.orderId,
                }).then(function (res) {
                    if (res.body.success == true) {
                        document.write(res.body.result);
                    } else {
                        self.$toast(res.body.responseStatus.message);
                        setTimeout(function () {
                            window.location.go(-1);
                        }, 2000);
                    }
                });
            }
        }
    }
</script>
<style src="css/rent-Account/rentAccount-cl.css" scoped></style>
