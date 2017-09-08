<template>
    <div class="avoidFraud">
        <div id="wrapper">
            <!---------------------------- top ---------------------------->
            <div class="top-header fixed-top border-bottom">
                <div class="top-back">
                    <a href="javascript:history.go(-1)"></a>
                </div>
                <h2 class="f36">{{typeName}}</h2>
                <div class="top-right"></div>
            </div>
            <!---------------------------- 页面标题 ---------------------------->
            <div class="pt-head px-30 bg-f1 menu-title f32 color-666 pb-20">为确保您的安全，请您耐心观看防骗内容</div>
            <!---------------------------- 防骗提示 ---------------------------->
            <!---------------------------- swiper ---------------------------->
            <div class="mt-20 border-top border-bottom bg-fff py-20 pr">
                <mt-swipe :auto="autoplay" ref="swiper" :showIndicators="false">
                    <mt-swipe-item><img src="~images/kefu/swiper1.jpg"/></mt-swipe-item>
                    <mt-swipe-item><img src="~images/kefu/swiper2.jpg"/></mt-swipe-item>
                    <mt-swipe-item><img src="~images/kefu/swiper3.jpg"/></mt-swipe-item>
                    <mt-swipe-item><img src="~images/kefu/swiper4.jpg"/></mt-swipe-item>
                </mt-swipe>
                <div class="pa swiper-control" :class="{'swiper-stop':stopShow}" @click="play()"></div>
            </div>
            <!---------------------------- 案例学习 ---------------------------->
            <div class="pb-200">
                <div class="border-bottom">
                    <div class="f32 color-666 lh80 pl-30 pr caseStudy"><span class="bl-f75e46">学习案例</span></div>
                    <ul class="study bg-fff">
                        <li class="pl-30" v-for="(item,index) in caseList">
                            <router-link
                                    :to="{ name: 'result', query: {typeName:'防骗中心',questionName: item.question_name, questionId: item.id}}"
                                    class="f32 color-32 lh100">{{item.question_name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!--<FooterComponent></FooterComponent>-->
        </div>
    </div>
</template>

<script>
    import FooterComponent from "components/Footer.vue"
    export default {
        name: 'avoidFraud',
        data () {
            return {
                mySwiper: '',
                autoplay: 5000,
                stopShow: "",
                //请求参数
                typeName: '',
                typeId: '',
                hits: '-',
                pageCount: 2,
                caseList: [],
                animate: '',
            }
        },
        components: {
            FooterComponent
        },
        created(){
            this.typeName = this.$route.query.typeName;
            this.questionType = this.$route.query.typeId;
        },
        mounted(){
            this.$refs.swiper.animating = true;
            console.log(this.$refs.swiper);
            this.getCase();
        },
        methods: {
            play: function () {
                if (this.$refs.swiper.animating == true) {
                    this.$refs.swiper.animating = false;
                    this.stopShow = true;
                } else {
                    this.$refs.swiper.animating = true;
                    this.stopShow = false;
                }
            },
            getCase: function () {
                var self = this;
                self.$http.post(self.$CONSTANTS.APIQuestion + 'questionSearchAliyun/searchQuestionList', {
                    accurateMap: {question_type: [self.questionType.toString()]},
                    sortMap: {hits: self.hits},
                    pageCount: self.pageCount
                }).then(self.successFunction), (self.failedFunction);
            },
            successFunction: function (res) {
                var self = this;
                self.caseList = res.body.result;
            },
            failedFunction: function (res) {
                console.log(res);
            }
        }
    }
</script>


<style scoped>
    .mint-swipe {
        height: 5rem;
    }

    .mint-swipe-item img {
        width: 100%;
    }
</style>
