<template>
    <div class="ValidateResult">
        <div id="wrapper">
            <!---------------------------- top ---------------------------->
            <div class="top-header fixed-top border-bottom">
                <div class="top-back">
                    <a href="javascript:history.go(-1)"></a>
                </div>
                <h2 class="f36">{{typeName}}</h2>
                <div class="top-right">
                    <a href="/index.html" class="back-home"></a>
                </div>
            </div>
            <!---------------------------- 标题 ---------------------------->
            <div class="search-title pt-head bg-f1">
                <p class=" px-30 py-30 lh48 border-top f32 color-000">为确保您的交易安全，在您遇到有疑问的时候可
                    以来验证中心进行客服QQ号的验证。</p>
            </div>
            <!---------------------------- 验证真状态 ---------------------------->
            <div class="bg-fff px-30 py-30 mt-20 clearfix" v-if="isTrue==true">
                <div class="verify-l fl">
                    <img src="~images/kefu/success.png" alt=""/>
                </div>
                <div class="verify-r fl">
                    <p class="f32 color-000 mb-15 mt-45">经验证，QQ客服{{_serviceQq}}为真客服。 </p>
                </div>
            </div>
            <!---------------------------- 验证假状态 ---------------------------->
            <div class="pb-200" v-if="isTrue==false">
                <div class="bg-fff px-30 py-30 mt-20 clearfix border-top border-bottom">
                    <div class="verify-l fl">
                        <img src="~images/kefu/error.png" alt=""/>
                    </div>
                    <div class="verify-r fl">
                        <p class="f32 color-000 mb-15">经验证，QQ客服{{_serviceQq}}为假客服。</p>
                        <span class="f26 color-666">若您有疑问，请点击下方在线咨询进行解答。</span>
                    </div>
                </div>
                <!---------------------------- 在线咨询 ---------------------------->
                <!--   <div class="pb-200">
                       <div class="mt-20" ref="fix">
                           <div class="f30 color-666 text-center lh88">
                               <a class="color-469df7" onclick="NTKF.im_openInPageChat('bq_1000_1472795888825')">在线咨询</a>
                               <span>或</span>
                               <a class="color-469df7" href="tel:0579-83225173">热线咨询</a>
                           </div>
                       </div>
                   </div>-->
                <div class="bg-fff px-30 py-25 border-top border-bottom kf mt-20">
                    <a onclick="NTKF.im_openInPageChat('bq_1000_1472795888825')"><img src="~images/kefu/kf.png" alt=""/>在线咨询</a>
                </div>
            </div>
            <!--<FooterComponent></FooterComponent>-->
        </div>

    </div>
</template>

<script>
    import FooterComponent from "components/Footer.vue"
    export default {
        name: 'ValidateResult',
        data () {
            return {
                typeName: '',
                _serviceQq: '',
                isTrue: '',
            }
        },
        components: {
            FooterComponent
        },
        created(){
            this.typeName = this.$route.params.typeName;
            this._serviceQq = this.$route.params.qnum;
        },
        mounted(){
            this.verify();
        },
        methods: {
            verify: function () {
                var self = this;
                self.$http.get(self.$CONSTANTS.APIQuestion + 'serviceqq/checkserviceqq', {params: {serviceQq: self._serviceQq}}).then(function (res) {
                    self.isTrue = res.body.isTrue;
                }, function (res) {
                    console.log(res);
                });
            }
        }
    }
</script>


<style scoped>

</style>
