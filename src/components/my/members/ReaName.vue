<template>
<div>
    <div id="wrapper">
        <!--填充fixed留下的块-->
        <div class="fixedFill-mx"></div>
        <!--顶部fixed部分-->
        <div class="fixed-top fixed-box">
            <div class="top-header border-bottom">
                <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
                <h2 class="f36">实名信息认证</h2>
                <div class="top-right"></div>
            </div>
        </div>
        <div class="pl-30 pr-30 real-container f32 color-000 border-bottom">
            <span class="text-left">真实姓名</span>
            <input class="input" id="autonym" v-model="autonym" type="text" placeholder="请输入真实姓名" 
            :readOnly="isBindIdNsumber">
        </div>
        <div class="pl-30 pr-30 real-container f32 color-000 border-bottom">
            <span class="text-left">身份证号</span>
            <input class="input" id="card" type="text" v-model="card"  placeholder="请输入身份证号" :readOnly="isBindIdNsumber">
        </div>
        <div class="pl-30 pr-30 real-container f32 color-000 mt-20 border-bottom">
            <span class="">提现支付宝账户设置</span>
        </div>
        <div class="pl-30 pr-30 real-container f32 color-000 border-bottom">
            <span class="text-left">支付宝账户</span>
            <input class="input" id="alipay"  v-model="alipay" type="text" placeholder="请输入支付宝账户">
        </div>
        <p class="real-tip f32 color-666">为了您的资金安全，请正确填写实名信息及提现的支付宝帐号。</p>
        <div class="release mt-30 fixed-bottom border-top trlect-btn">
            <a class="next" href="javascript:void(0);"><input class="bg-f54" type="button" name="" @click="present" value="确认提交"></a>
        </div>
    </div>
</div>
</template>
<script>
    //type="text"
     import api from '../../../api'
    export default{
        data() {
            return {
                autonym:"",
                card:"",
                alipay:"",
                isBindIdNsumber:""
            }
        },
        mounted: function () {
            this.checkUserBindIdNumber();
        },
        methods:{
            number(target){
                let vm = this;
                if (!vm[target]) {return;};
                vm[target] = vm[target].replace(/\D/g,'');
            },
            present:function () {
                var self = this;

                if (!self.isBindIdNsumber) {
                    //验证姓名
                    
                   if(!(/^[\u4e00-\u9fa5]+$/.test(self.autonym))){
                        self.$toast('真实姓名不能为空且必须为中文');
                        return false;
                   }
                   if (self.autonym.length < 2) {
                       self.$toast('请输入最少2位中文姓名');
                       return;
                   };
                   // else if(self.autonym.length<2 || self.autonym.length>6){
                   //     console.log(self.autonym.length);
                   //     document.getElementById("autonym").focus();
                   //     return false;
                   // };
                   //验证身份证号码->因为后台做了跟户口本的匹配，所以前端的验证暂时注释掉
                    // if(document.getElementById("card").value.length==0){
                    //     self.$toast('请输入身份证号码');
                    //     document.getElementById("card").focus();
                    //     return false;
                    // };
                    
                    if(!self.card || !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(self.card)){
                        self.$toast('请填写正确的身份证号');
                        return false;
                    };
                };
                self.alipay = self.alipay.replace(/\s/g,"");//去除空格
                self.autonym = self.autonym.replace(/\s/g,"");//去除空格
                self.card = self.card.replace(/\s/g,"");//去除空格

                if(self.isBindIdNsumber=="") {
                    if (!self.isAdult()) {
                        self.$toast('很抱歉，身份证号码显示您未满18岁，5173无法为您服务');
                        return false;
                    };
                }


                if (!self.alipay) {
                    self.$toast('请输入支付宝账号');
                    return false;
                };


                // 验证支付宝账户
                // if(self.alipay.length<=0 || self.alipay.length>120){
                //     self.$toast('请填写正确支付宝账号');
                //     document.getElementById("alipay").focus();
                //     return false;
                // };
                
                let params ={
                    realName:self.autonym,
                    idNumber:self.card,
                    account:self.alipay
                }
               api.pay.saveMainUserInfo(params)
                      .then((res)=>{
                            if (res.data.success) {
                                window.location.href = "/vue/my-account";
                            }else{
                                self.$toast(res.data.responseStatus.message);
                                if(res.data.responseStatus.message=="已经进行过实名认证"){
                                    setTimeout(function () {
                                        window.location.href = "/vue/my-account";
                                    },3000);
                                }
                            };
               })
            },
            isAdult(){
               let vm = this;
               let nowDate = new Date();
               let birstr = vm.card.substring(6,14);//截取身份证上的出生年月
               let birYear = birstr.substring(0,4);
               let birMonth = birstr.substring(4,6);
               let birDate = birstr.substring(6,8);
               let date = nowDate - new Date(birYear,birMonth,birDate);//当前时间减去出生时间
               let age;

               if (birMonth == nowDate.getMonth() + 1 && birDate <= nowDate.getDate()) {
                age = Math.round(date/(365*24*60*60*1000));
               }else{
                 age = parseInt(date/(365*24*60*60*1000));
               }
               return age >= 18;
            },
            checkUserBindIdNumber:function () {
                var self = this;
                self.$http.post(self.$CONSTANTS.APIUser+"account/checkUserBindIdNumber",{
                    getIdNumber:true
                }).then(function (data) {
                    if(data.body.success == true){
                        self.isBindIdNsumber = data.body.isBindIdNsumber;
                        self.autonym = data.body.realName;
                        self.card = data.body.idNumber;
                        //self.isDisabled = true;
                    }
                });
            }
        }

    }
</script>
<style src="css/member/member-order.css" scoped></style>
