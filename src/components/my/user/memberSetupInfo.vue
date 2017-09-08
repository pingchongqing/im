<template>
    <div>
        <div id="pageWrapper" >
            <!-- top -->
            <div class="top-header">
                <div class="top-back">
                    <a @click="go">返回</a>
                </div>
                <div class="top-bt">
                    用户信息
                </div>
            </div>
            <!-- 用户信息设置 -->
            <div class="member-setup">
                <a @click="updateTx">
                    <div class="setup-list-tx border-top margin-bottom">
                        <div class="list-left-tx">
                            <span>头像</span>
                        </div>
                        <div class="list-right-tx">
                            <span><img id="member-tx" :src="imgTopUrl"></span>
                        </div>
                    </div>
                </a>
                <a @click="isNickName">
                    <div class="setup-list border-top">
                        <div class="list-left">
                            <span>用户昵称</span>
                        </div>
                        <div class="list-right">
                            <span id="member-name">{{nickName}}</span>
                        </div>
                    </div>
                </a>
                <a @click="isSignature">
                    <div class="setup-list">
                        <div class="list-left">
                            <span>个性签名</span>
                        </div>
                        <div class="list-right">
                            <span id="member-signature">{{signature}}</span>
                        </div>
                    </div>
                </a>
                <!--<a href="member-setup-mobile.html">-->
                <div class="setup-list margin-bottom">
                    <div class="list-left">
                        <span>手机号</span>
                    </div>
                    <div class="list-right">
                        <span id="member-mobile"style="background: none; color:#999999; padding-right: 0;">{{mobilePhone}}</span>
                    </div>
                </div>
                <!--</a>-->


            </div>

            <!-- 固定底部 -->
            <div class="fixed-button5 bgf f36 red border-bottom" >
                <a href="#" @click='IfloginOut'>退出登录</a>
            </div>

            <!--弹出框-->
            <div v-if="tmc" class="dialog-box" id="dialog_show" :style="dialog_showStyle" style="margin-top:0;">
                <!--提示成功-->
                <div class="fortunel-main" style="display:block;">
                    <div class="fortun-conn">
                        <div class="rtun-plo" id="errortext">确认退出</div>
                        <div class="rtun-btn">
                            <a class="dialog_close" href="javascript:void(0)" id="isSure" @click='loginOut'>确定</a>
                            <a class="dialog_close" href="javascript:void(0);" @click='IfloginOutQu'>取消</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="dialog_cover" v-if="tmc"></div>
    </div>
</template>
<script>
    import api from '../../../api'
    export default{
        data(){
            return{
                nickName:"未填写",//用户昵称
                imgTopUrl:"https://m.5173.com/images/Icon/tx_nologin.png",//头像
                signature:"未填写",//个性签名
                mobilePhone:"",//手机号码
                tmc:false,
                dialog_showStyle:{
                    top:""
                },
                winHeight:document.documentElement.clientHeight,
                dialogHeight:""
            }
        },
        created(){
            var self = this;
            self.$getAccount().then(account=>{
                if(account){
                    if(account.avatarUrl){
                        self.imgTopUrl = account.avatarUrl;
                    };
                    if(account.nickName){
                        self.nickName = account.nickName;
                    };
                    if(account.signature){
                        self.signature = account.signature;
                    };
                }
            });
        },
        mounted(){
            this.checkPhone();
        },
        methods:{
            checkPhone:function () {//获取手机号码
                var self = this;
                api.user.checkBindMobile().then((data)=>{
                    if(data.body.mobilePhone){
                        self.mobilePhone = data.body.mobilePhone
                    }
                });
            },
            IfloginOut:function () {//透明层显示
                var self = this;
                setTimeout(function(){
                    self.dialogHeight = document.getElementById('dialog_show').offsetHeight;
                    self.dialog_showStyle.top = (self.winHeight-self.dialogHeight)/2+"px";
                },1);
                self.tmc = !self.tmc;
                
            },
            IfloginOutQu:function () {//透明层隐藏
                this.tmc = !this.tmc;
            },
            loginOut:function () {
                var self = this;
                api.user.unionLoginout().then((data)=>{
                    if(data.body.success && data.body.responseStatus.message=="操作成功"){
                        self.$setCookie("phoneNumberOk","",'/vue/login',"-1");
                        self.$setCookie("phoneNumberOk","",'/vue',"-1");
                        self.$setCookie("phoneNumberOk","",'/',"-1");
                        sa.logout(true);
                        self.$router.push({
                            name:"center"
                        });
                    }else{
                        this.$toast(data.body.responseStatus.message);
                    }
                });
            },
            isNickName:function () {
                var self = this;
                this.$router.push({
                    name:'memberSetupName',
                    params: {
                        nickName:self.nickName,
                    }
                });
            },
            isSignature:function () {
                var self = this;
                this.$router.push({
                    name:'memberSetupSignature',
                    params: {
                        signature:self.signature,
                    }
                });
            },
            go(){
                this.$router.push({
                    name:'center',
                });
            },
            updateTx(){
                this.$router.push({
                    name:'memberSetupTx',
                });
            }
        }
    }
</script>
<style src="css/user/memberSetupInfo.css" scoped></style>
