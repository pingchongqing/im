<template>
    <div>
        <div class="login-step-second" v-if="divHide">
            <!-- top -->
            <div class="top-header">
                <div class="top-back">
                    <a href="javascript:void(0)" class="back-login-first" @click="go">返回</a>
                </div>
                <div class="top-bt">
                    验证手机号
                </div>
            </div>
            <!-- 验证手机号 -->
            <div class="withdrawal margin-bottom30">
                <div class="withdrawal-list border-top ">
                    <div class="list-left5 f32">
                        已发送<span>验证码短信</span>至
                        <p class="f42" id="phoneNumberOk">{{this.$getCookie("phoneNumberOk")}}</p>
                    </div>
                </div>
                <div class="withdrawal-list border-top border-bottom ">
                    <div class="list-left3">
                        <span class="margin-left f32" >验证码</span>
                        <input type="tel" class="f32" placeholder="请输入短信验证码" id="smsCode" maxlength="6" v-model="verifyCode">
                    </div>
                    <div class="list-right3">
                        <!-- <a href="#"><span class="margin-right back-login-first">重新获取</span></a> -->
                        <a href="#">
                            <span class="margin-right countdown" v-if="sendMsgDisabled">{{time+'秒'}}</span>
                            <span class="margin-right countdown" v-if="!sendMsgDisabled" @click="congxin">重新发送</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 固定底部 -->
            <div class="fixed-button border-top border-bottom">
                <div class="redbutton">
                    <a href="javascript:void(0);" @click="unionLoginByMobile">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../api'
    export default{
        data(){
            return{
                time:"",
                sendMsgDisabled:true,
                params:{
                    phone:this.$getCookie("phoneNumberOk")
                },
                sendCode:false,
                verifyCode:"",
                returnUrl:this.$route.query.returnUrl,
                divHide:true
            }
        },
        beforeMount(){
            let self = this;
            self.$getAccount().then(account=>{
                if(account){
                    self.divHide = false;
                    if(self.returnUrl){
                        location.href = history.go(-2)   
                    }else{
                        location.href = "/vue/center";
                    }
                }
            });
        },
        mounted(){
            this.send();
            this.actionstart();
        },
        methods:{
            //返回上一页
            go(){
                history.go(-1);
            },
            //倒计时
            send:function () {
                let self = this;
                self.time = 60;
                let interval = window.setInterval(function () {
                    self.time -- ;
                    if(self.time==0){
                        window.clearInterval(interval);
                        self.sendMsgDisabled = false;
                    }
                },1000);
            },
            //发短信前置接口
            actionstart(){
                api.user.actionstart().then((data)=>{
                    if(data.body.success){
                        this.sendloginverifycode();
                    }else{
                        this.$toast(data.body.responseStatus.message);
                    }
                });
            },
            //发短信收取验证码接口
            sendloginverifycode(){
                let self = this;
                api.user.sendloginverifycode(this.params).then((data)=>{
                    if(data.body.success){
                        self.sendCode = true;
                    }else{
                        this.$toast(data.body.responseStatus.message);
                    }
                });
            },
            //登录接口
            unionLoginByMobile(){
                let self = this;
                if(self.sendCode){
                    let params = {"promotionUserId":0,"phone":self.$getCookie("phoneNumberOk"),"verifyCode":self.verifyCode};
                    api.user.unionLoginByMobile(params).then((data)=>{
                        console.log(data.body);
                        if(data.body.success){
                            if(self.returnUrl && self.returnUrl!="undefined") {
                                location.href = decodeURIComponent(self.returnUrl);
                            }else{
                                location.href = "/vue/center";
                            }
                        }else{
                            self.$toast(data.body.responseStatus.message);
                        }
                    });
                }
            },
            //重新发送
            congxin(){
                this.sendMsgDisabled = true;
                this.send();
                this.actionstart();
            }
        }
    }
</script>
<style src="css/user/layout.css" ></style>
<style src="css/user/public.css" ></style>
<style scoped>
    .withdrawal .list-left3{ float:left; width:65%; font-size:0px; letter-spacing: normal;word-spacing: normal;  color:#000;  line-height:2.5rem; }
    .withdrawal .list-left3 span{ float:left; font-size:30px; padding-right:20px;  }
    .withdrawal .list-left3 input{ float:left; width:60%; font-size:30px; color:#000; height:2.5rem; line-height:60px; }
    .withdrawal .list-right3{ float:right; width:35%; font-size:28px; color:#000; line-height:2.5rem; height:2.5rem; text-align:right; }
    .withdrawal .list-right3 span{ display:inline-block; width:4.3rem; text-align:center; color:#f75e46; border:1px solid #f75e46;  line-height:1.67rem; }
    .withdrawal .list-right3 .countdown{  color:#000; border:1px solid #ccc; background:#fff; }
    .withdrawal .list-right3 a span{font-size: .58rem; margin-top: .4rem;}

</style>
