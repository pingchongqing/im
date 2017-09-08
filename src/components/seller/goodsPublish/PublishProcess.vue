<template>
    <div id="wrapper">
        <!--填补fixed的块-->
        <div class="fixedFill-mx"></div>
        <!--top-->
        <div class="top-header border-bottom fixed-top">
            <h2 class="f36 color-000">商品发布成功</h2>
            <div class="top-right">
                <a class="top-header-more" ></a>
            </div>
        </div>
        <!--交易流程-->
        <div class="process-main ">
            <div class="top-header border-bottom">
                <div class="top-back">
                    <a href="javascript:history.go(-1)" class="goBack">返回</a>
                </div>
                <h2 class="f36 color-000">交易流程</h2>
            </div>
            <div class="process-conn">
                <ul>
                    <li>
                        <div class="pro-left pro-left-bj"><span v-bind:class="{'hover':goodsStatus==1}">1</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>商品通过5173审核上架</h2>
                        </div>
                    </li>
                    <li>
                        <div class="pro-left"><span v-bind:class="{'hover':goodsStatus==2}">2</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>卖家等待买家线上购买</h2>
                        </div>
                    </li>
                    <li>
                        <div class="pro-left"><span v-bind:class="{'hover':goodsStatus==3}">3</span></div>
                        <div class="pro-right">
                            <i class="prico"></i>
                            <h2>买家在线购买完成付款</h2>
                        </div>
                    </li>
                    <li>
                        <div class="pro-left"><span v-bind:class="{'hover':goodsStatus==4}">4</span></div>
                        <div class="pro-right" id="seller-help4">
                            <i class="prico"></i>
                            <h2>客服联系买卖双方，完成在线换绑</h2>
                            <!--<p><a id="bindingsmb" target="_blank" href="https://aq.qq.com/cn2/mobile_index">点击绑定</a></p>-->
                        </div>
                    </li>
                    <li class="bacder">
                        <div class="pro-left"><span v-bind:class="{'hover':goodsStatus==5}">5</span></div>
                        <div class="pro-right" id="seller-help5">
                            <i class="prico"></i>
                            <h2>交易成功，等待收款</h2>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>
<script >
    export default{
        data(){
            return{
                goodsId:'',
                goodsIdStatus:'',
                goodsStatus:1
            }

        },
        created:function  () {
            var self = this;
            self.orderId = self.$route.query.orderId;
        },
        mounted(){
            this. getOrderState();
        },
        methods: {
            liuchengshow(){
                console.log(this.s);
        this.s=true;
            },
           getOrderState:function () {
//               var self = this;
//               self.$http.post(self.$CONSTANTS.APIQuestion + 'questionSearchAliyun/searchQuestionList', {
//
//               }).then(self.successFunction), (self.failedFunction);
           },
            successFunction: function (res) {

            },
            failedFunction: function (res) {

    },
    choose:function () {
       console.log(this)
    }


        }
    }


</script>
<style src="css/fost-base.css" scoped></style>
<style src="css/common/publish-cl.css" scoped></style>
<style type="text/css" scoped>

</style>
