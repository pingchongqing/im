<template>
    <div class="ValidateCenter">
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
            <!---------------------------- 防骗中心 ---------------------------->
            <!-- <div class="pt-head pl-30 bg-f1 case-title pb-20 f32 color-666">
                 验证中心
             </div>-->
            <!---------------------------- 标题 ---------------------------->
            <div class="search-title pt-head bg-f1">
                <p class="px-30 py-30 lh48 border-top f32 color-000">为确保您的交易安全，在您遇到有疑问的时候可
                    以来验证中心进行客服QQ号的验证。</p>
            </div>
            <!---------------------------- 验证输入框 ---------------------------->
            <div class="mt-20 bg-fff verify px-30 pr border-top border-bottom py-20">
                <input type="tel" name="" id="" placeholder="请输入客服QQ号" onfocus="this.placeholder='' "
                       v-model="qqenter" ref="qqenter"/>
            </div>
            <div class="f28 color-666 px-30 lh78">输入客服QQ号，可以为您验证是否为5173官方客服。</div>
            <!---------------------------- 验证按钮 ---------------------------->
            <div class="bg-fff px-30 py-25 border-top border-bottom">
                <a href="javascript:void(0);" class="verify-btn" @click="isNull()">立即验证</a>
                <!-- 立即验证
               </router-link>-->
            </div>
            <!--<FooterComponent></FooterComponent>-->
        </div>
    </div>
</template>

<script>
    import FooterComponent from "components/Footer.vue"
    export default {
        name: 'ValidateCenter',
        data () {
            return {
                qqenter: '',
                typeName: '',
            }
        },
        components: {
            FooterComponent
        },
        props: [],
        watch: {
            qqenter: function (Val, odlVal) {
                if (!(/^[0-9]*$/.test(Val)) || this.qqenter.length > 12) {
                    this.qqenter = odlVal;//禁止输入除0-9以外的字符
                }
            }
        },
        created(){
            this.typeName = this.$route.query.typeName;
        },
        mounted(){

        },
        methods: {
            isNull: function () {
                if (this.qqenter == "" || this.qqenter == null) {
                    alert("请输入QQ号码！");
                } else {
                    this.$router.push({name: 'ValidateResult', params: {qnum: this.qqenter, typeName: this.typeName}});
                }
            }
        }
    }
</script>


<style scoped>

</style>
