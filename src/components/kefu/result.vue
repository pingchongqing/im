<template>
    <div class="result">
        <div id="wrapper">
            <!---------------------------- top ---------------------------->
            <div class="top-header fixed-top border-bottom">
                <div class="top-back">
                    <a href="javascript:history.go(-1)"></a>
                </div>
                <h2 class="f36">客服中心</h2>
                <div class="top-right">
                    <a href="/index.html" class="back-home"></a>
                </div>
            </div>
            <!---------------------------- 搜索标题 ---------------------------->
            <div class="search-title pt-head">
                <p class="bg-fff pl-30 my-20 lh100 border-top border-bottom f32 color-000">{{name}}</p>
            </div>
            <!---------------------------- 搜索结果内容 ---------------------------->
            <div class="bg-fff pl-30 border-bottom mt-20 mb-25 clearfix py-30">
                <div class="f32 color-000 result-da fl">答：</div>
                <div class="f32 color-000 fl result-text">
                    <div v-html="answers"></div>
                </div>
            </div>
            <!---------------------------- 是否满意 ---------------------------->
            <div class="border-top border-bottom">
                <div class=" bg-fff  pl-30 border-bottom">
                    <div class="f30 color-666 lh88">以上答案是否满意？</div>
                </div>
                <div class="py-15 bg-fff clearfix">
                    <div class="fl text-center useful border-right">
                        <span class="f36" @click.once="appraise(status=1)"><em class="icon-useful fl"></em><em class="fl text-left pl-10">有用</em></span>
                    </div>
                    <div class="fl text-center useful">
                        <span class="f36" @click.once="appraise(status=2)"><em class="icon-useless fl"></em><em class="fl text-left pl-10">没用</em></span>
                    </div>
                </div>
            </div>
            <!---------------------------- 在线咨询 ---------------------------->
            <div class="pb-200" v-if="noShow">
                <div class="mt-20">
                    <div class="f30 color-666 text-center lh88">
                        <span>没有找到相关问题？</span>
                        <a class="color-469df7" onclick="NTKF.im_openInPageChat('bq_1000_1472795888825')">在线咨询</a>
                        <span>或</span>
                        <a class="color-469df7" href="tel:0579-83225173">热线咨询</a>
                    </div>
                </div>
            </div>
            <!-- <FooterComponent></FooterComponent>-->
        </div>
    </div>
</template>

<script>
    import FooterComponent from "components/Footer.vue"
    export default {
        name: 'result',
        data () {
            return {
                typeName: '',
                name: '',
                id: '',
                answers: '',
                noShow: true,
                canClick: true
            }
        },
        components: {
            FooterComponent
        },
        created(){
            this.typeName = this.$route.query.typeName;
            this.name = this.$route.query.questionName;
            this.id = this.$route.query.questionId;
            if (this.typeName == "防骗中心") {
                this.noShow = false;
            }
        },
        mounted(){
            this.getAnswer();
        },
        methods: {
            getAnswer: function () {
                var self = this;
                self.$http.post(self.$CONSTANTS.APIQuestion + 'questionSearchAliyun/searchQuestionList', {
                    accurateMap: {
                        id: [self.id]
                    }
                }).then(self.successFunction), (self.failedFunction);
            },
            successFunction: function (res) {
                var self = this;
                self.answers = res.body.result[0].answer;
            },
            failedFunction: function (res) {
                console.log(res)
            },
            appraise(status){
                if (this.canClick) {
                    this.$http.get(this.$CONSTANTS.APIQuestion + 'questionSearchAliyun/addUsefulHits', {
                        params: {
                            id: this.id,
                            status: status,
                        }
                    }).then((res) => {
                        // 响应成功回调
                        console.log(res);
                        this.canClick = false;
                        this.$toast({
                            message: '感谢您的反馈',
                            position: 'middle',
                            duration: 2000
                        })
                    }, (res) => {
                        // 响应错误回调
                        console.log(res);
                    });
                }
            }
        }
    }
</script>


<style scoped>

</style>
