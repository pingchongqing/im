<template>
    <div>
        <div id="pageWrapper" class="fixheight" >
            <!-- top -->
            <div class="top-header">
                <div class="top-back2">
                    <a @click="go">返回</a>
                </div>
                <div class="top-bt2">
                    个性签名
                </div>
                <div class="top-operation">

                </div>
            </div>
            <!-- 修改个性签名 -->
            <div class="member-setup2 border-top margin-bottom">
                <div class="setup-input border-bottom">
                    <input type="text" placeholder="请输入签名内容" id="member-signature" v-model="params.signature" @input="signatureLength">
                </div>
            </div>

            <div class="fixed-button border-top border-bottom "  >
                <div class="redbutton">
                    <a @click="isSignature">保存</a>
                </div>
            </div>

            <!--弹出框-->
            <div class="raffle-box hide" id="dialog_validate">
                <div class="fortunel-main" style="display:block;">
                    <div class="fortun-conn">
                        <div class="rtun-plo" id="errortext"></div>
                        <div class="rtun-btn">
                            <a class="dialog_close" href="javascript:void(0);">知道了</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import api from '../../../api'
    export default{
        data(){
            return{
                params:{
                    signature:""
                }
            }
        },
        beforeMount(){
            let self = this;
            if(self.$route.params.signature=="未填写"){
                self.params.signature = "";
            }else{
                self.params.signature = self.$route.params.signature;
            }
        },
        methods:{
            signatureLength(){
                if(this.params.signature.length>15){
                    this.params.signature = this.params.signature.substr(0,15);
                }
            },
            isSignature:function () {
                var self = this;
                api.user.updateUserInfo(self.params).then((data)=>{
                    if(data.body.success && data.body.responseStatus.message=="操作成功"){
                        self.$router.push({
                            name:"memberSetupInfo"
                        });
                    }else{
                        self.$toast(data.body.responseStatus.message);
                    }
                });
            },
            go(){
                history.go(-1);
            }
        }
    }
</script>
<style src="css/user/memberSetupInfo.css" scoped></style>