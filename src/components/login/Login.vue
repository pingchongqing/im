<template>
    <div>
        <div id="pageWrapper" class="fixheight" >
            <!-- 登录第一步 -->
            <div class="login-step-first">
                <!-- top -->
                <div class="top-header border-bottom">
                    <div class="top-back">
                        <a  href="javascript:history.go(-1)">返回</a>
                    </div>
                    <div class="top-bt">
                        手机登录
                    </div>
                </div>
                <!-- 登录框 -->
                <div class="login-mobile">
                    <div class="login-content ">
                        <div class="login-bt">
                            <span>手机号</span>
                        </div>
                        <div class="login-input2">
                            <input maxlength="11" type="tel" class="mobile-num" id="phoneNumber" v-model="phoneNumber" placeholder="请输入手机号">
                        </div>
                        <div class="login-del" v-if="delClose"  @click="delPhone">
                            <a href="#"><img src="~images/del.png"></a>
                        </div>
                    </div>
                    <div class="newlogin-content fw po-re bg-f1 text-center color-999 f26">未注册手机 验证后自动登录</div>
                    <div class="login-content f36">
                        <div id="slider" style="position: relative;">
                            <div id="slider_bg"></div>
                            <span id="label" :style="labelStyle" @touchstart="slider" @mousedown="slider"  @mousemove="slider01"  @touchmove="slider01" @touchend="slider02" @mouseup="slider02"  style="position: absolute;top:0; z-index: 10;">>></span>
                            <span id="labelTip" style="left: 0;"></span>
                            <span id="green" :style="greenStyle"></span>
                            <span id="fontSlider" :style="fontSlider">向右滑动获取验证码</span>
                        </div>
                    </div>
                    <a href="javascript:void(0)" ><div id="pc_tc" class="newlogin-content fw po-re bg-f1 text-center color-07f f32 mt-30" @click="otherLogin">其他登录方式</div></a>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="css/user/public.css"></style>
<style src="css/user/layout.css"></style>

<script>
    import api from '../../api'
    export default{
        data(){
            return{
                sliderWidth:"",
                labelWidth:"",
                oW:"",
                phoneNumber:"",
                isMove: false,
                returnUrl:encodeURIComponent(this.$route.query.returnUrl),
                isStylr:true,
                greenStyle:{
                    width:''
                },
                fontSlider:{
                    color:""
                },
                labelStyle:{
                    left:""
                },
                delClose:false
            }
        },
        created(){
            this.$getAccount().then(account=>{
                if(account){
                    location.href = "/vue/center";
                }
            });
        },
        mounted(){
            this.sliderWidths();
            this.phoneNumber = this.$getCookie("phoneNumberOk");
            this.isDelClose();
        },
        methods:{
            isDelClose(){//清楚按钮
                if(this.phoneNumber.length>0){
                    this.delClose = true;
                }else{
                    this.delClose = false;
                }
            },
            delPhone(){//清楚手机号码
                this.phoneNumber = "";
                this.delClose = !this.delClose;
            },
            sliderWidths:function () {
                this.sliderWidth = document.getElementById("slider").offsetWidth;
                this.labelWidth = document.getElementById("label").offsetWidth;
            },
            slider:function (e) {//触摸按下事件
                var label = document.getElementById("label");
                var touches ;
                if(e.touches){
                    touches = e.touches[0];
                }else{
                    touches = e;
                }
                this.oW = touches.clientX - label.offsetLeft;
                if(this.phoneNumber == ""){
                    this.$toast("手机号码不能为空！");
                }else if(!(/^1[34578]\d{9}$/.test(this.phoneNumber))){
                    this.$toast("手机号码格式有误！");
                }else{
                    this.isMove = true;
                };
                
            },
            slider01:function (e) {//触摸滑动事件
                var self = this;
                if(self.isMove) {
                    var label = document.getElementById("label");//拖动按钮
                    var slider = document.getElementById("slider");//拖动按钮外框
                    var green = document.getElementById("green");//拖动时的绿色背景
                    var fontSlider = document.getElementById("fontSlider");//拖动文字
                    var touches ;
                    if(e.touches){
                        touches = e.touches[0];
                    }else{
                        touches = e;
                    }
                    var oLeft = touches.clientX - self.oW;  //计算拖动的距离
                    if (oLeft < 0) {
                        oLeft = 0;
                    };

                    var chaWidth = self.sliderWidth - self.labelWidth;
                    self.greenStyle.width = oLeft+"px";
                    if (label) {
                        if (label.offsetLeft == chaWidth || label.offsetLeft > chaWidth) {
                            self.labelStyle.left = chaWidth + "px";
                            self.fontSlider.color = "#FFFFFF";
                            self.greenStyle.width = chaWidth + "px";
                            if(self.returnUrl){
                                self.$setCookie("returnUrl",self.returnUrl);
                            };
                            if(self.returnUrl){
                                self.$router.push({
                                    name:'registerLogin',
                                    query:{
                                        returnUrl:self.returnUrl,
                                    }
                                });
                            }else{
                                self.$router.push({
                                    name:'registerLogin',
                                });
                            }
                            this.$setCookie("phoneNumberOk",this.phoneNumber,"/");
                        } else if (label.offsetLeft < chaWidth) {
                            self.labelStyle.left = oLeft + "px";
                        } else if (label.offsetLeft > chaWidth) {
                            self.labelStyle.left = chaWidth + "px";
                        };
                    }
                    e.preventDefault();
                }
            },
            slider02:function () {//触摸离开事件
                var label = document.getElementById("label");
                var green = document.getElementById("green");//拖动时的绿色背景
                if (label) {
                    if(label.offsetLeft<(this.sliderWidth-this.labelWidth)){
                        this.labelStyle.left = "0px";
                        this.greenStyle.width = "0px";
                    }
                }
                this.isMove = false;
            },
            //其他登录方式
            otherLogin:function () {
                let self = this;
                if(self.returnUrl && self.returnUrl!="undefined") {
                    location.href = "https://passport.5173.com/m?returnUrl="+encodeURIComponent(self.returnUrl);
                }else{
                    location.href="https://passport.5173.com/m?returnUrl=http://"+window.location.host+"/vue/center";
                }
            }

        }
    }
</script>