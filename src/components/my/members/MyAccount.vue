<template>
    <div>
        <div id="wrapper">
            <!--填充fixed留下的块-->
            <div class="fixedFill-mx"></div>
            <!--顶部fixed部分-->
            <div class="fixed-top fixed-box">
                <div class="top-header border-bottom">
                    <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
                    <h2 class="f36">我的账户</h2>
                    <div class="top-right">
                        <a class="color-000 f30 mr-30" href="/vue/fund-details" style="padding-right: 0rem;">资金明细</a>
                    </div>
                </div>
            </div>

            <!--<a href="javascript:void(0)">-->
                <!--<div class="member-list border-top po-re fw bg-fff">-->
                    <!--<div class="list-left fl po-re text-left list-left-new py-30">-->
                        <!--<span class="newm-icon42 ml-30 f28 color-333 d-inline-block" style="width: 100%;">我的余额</span>-->
                        <!--<span class="ml-30 f36 color-m1 d-inline-block fontbold" style="width: 100%;">{{OpenMoney}}</span>-->
                    <!--</div>-->
                    <!--<div class="fr po-re text-right color-333 f30 pdrf">-->
                        <!--<span class="tixian color-m1 f30" @click="checkUserBind">提现</span>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</a>-->
            <!--<a href="javascript:void(0)">-->
                <!--<div class="member-list border-top border-bottom po-re fw bg-fff">-->
                    <!--<div class="list-left fl po-re text-left list-left-new py-30">-->
                        <!--<span class="newm-icon43 ml-30 f28 color-333 d-inline-block" style="width: 100%;">我的押金</span>-->
                        <!--<span class="ml-30 f36 color-m1 d-inline-block fontbold" style="width: 100%;">{{Impawn}}</span>-->
                    <!--</div>-->
                    <!--<div class="fr po-re text-right color-333 f30 pdrf">-->
                        <!--<span class="tixian color-m1 f30" @click="checkUserBind">提取押金</span>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</a>-->

            <div class="pl-30 pr-30 pt-70 pb-70 text-center bg-fff">
                <i class="icon_coins"></i>
                <p class="f40 color-000 mt-20">我的余额</p>
                <p class="color-000 f86 mt-20 "><span class="f90 font-yahei">￥</span><span class="f100 font-heiti">{{OpenMoney}}</span></p>
                <a class="color-fff display-block border-radius bg-m1 mt-70 pt-30 pb-30 f36" href="javascript:void(0)" @click="checkUserBind">提现</a>
            </div>


            <a href="javascript:void(0)">
                <div class="member-list border-top border-bottom mt-20 po-re fw bg-fff">
                    <div class="list-left fl po-re text-left">
                        <span class="newm-icon25 ml-30 f32 color-000 d-inline-block">我的押金<i class=" ml-30">{{Impawn}}<span class="ml-10">元</span></i></span>
                    </div>
                    <i class="icon_toRight fr"></i>
                    <span class="fr f32" @click="checkUserBind">提现</span>

                </div>
            </a>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return{
                OpenMoney:"",
                Impawn:""
            }
        },
        beforeMount(){
            var self = this;
            self.$http.post(self.$CONSTANTS.APIMainpay+"mainUser/getAccountBrief").then(function (data) {
                if(data.body.success == true){
                    self.OpenMoney = data.body.openMoney;
                    self.Impawn = data.body.impawn;
                }
            });
        },
        methods:{
            checkUserBind:function () {
                var self = this;
                self.$http.post(self.$CONSTANTS.APIUser+"account/checkUserBind").then(function (data) {
                    if(data.body.isMainAuthentication == true){
                        window.location.href = "http://user.5173.com/m/withdrawals/blance";
                    }else{
                        window.location.href = "/vue/rea-name";
                    }
                });
            }
        }
    }
</script>

<style src="css/member/member-order.css"></style>