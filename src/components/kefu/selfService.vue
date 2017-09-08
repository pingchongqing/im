<template>
    <div class="">
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
            <!---------------------------- 问题搜索 ---------------------------->
            <!-- <div class="py-20 px-30 bg-c9c mt-97 border-bottom clearfix">
                 <div class="fl bg-fff search-left-input border-radius">
                     <i class="icon-fdj"></i>
                     <input class="border-none f30" type="text" placeholder="有问题请用关键词搜索" v-model.trim="searchKey"
                            ref="searchQuestion">
                     <i class="close pa" @click="clear()" v-if="clearShow"><img src="~images/kefu/call-close.png"/></i>
                 </div>
                 <div class="fl search-right-word" @click="search">
                     <span class="color-m1 f32">搜索</span>
                 </div>
             </div>-->
            <div class="pl-30 bg-fa call-search pt-head border-bottom pr clearfix">
                <input type="text" name=""  class="search focus-search"
                       value=""
                       placeholder="有问题请用关键词搜索" v-model.trim="searchKey" ref="searchQuestion"/>
                <a @click="search" class="search-btn">搜索</a>
                <i class="close pa" v-if="clearShow" @click="clear()"><img
                        src="~images/kefu/call-close.png"/></i>
            </div>
            <!---------------------------- 页面标题 ---------------------------->
            <div class="bg-fff px-30 pt-30 f32 clearfix" v-show="!noneShow">
                <p class="title-tip color-999 mb-30"><i class="fl"></i><span class="pl-20">热门问题</span></p>
            </div>
            <!---------------------------- 热门问题推荐 ---------------------------->
            <div class="bg-fff my-20 border-top border-bottom result-list" v-show="!noneShow">
                <ul v-if="!findBtn">
                    <li class="pl-30" v-for="(item,index) in questionList">
                        <a @click="next(item)"
                           class="f32 color-000 lh100 d-block w-100 border-bottom pr-30">
                            {{item.question_name}}
                        </a>
                    </li>
                </ul>
                <ul class="border-bottom" v-if="findBtn">
                    <li class="pl-30" v-for="(item,index) in searchList">
                        <a @click="next(item)"
                           class="f32 color-000 lh100 d-block w-100 border-bottom pr-30">
                            {{item.question_name}}
                        </a>
                    </li>
                </ul>
                <infinite-loading :isComplete="findBtn" :on-infinite="onInfinite" ref="infiniteLoading" v-if="findBtn">
            <span slot="no-more">
              没有更多了
            </span>
                </infinite-loading>
            </div>
            <!---------------------------- 没有搜索结果 ---------------------------->
            <div class="bg-fff px-30 mt-20 border-top border-bottom search-none"
                 v-if="noneShow">
                <p class="f32 color-c5 text-center pt-162">额...还木有您想要的答案...</p>
                <img src="~images/kefu/notfound.png" alt=""/>
            </div>
            <!---------------------------- 在线咨询 ---------------------------->
            <div class="pb-200">
                <div class="mt-20">
                    <div class="f30 color-666 text-center lh88">
                        <span>没有找到相关问题？</span>
                        <a class="color-469df7" onclick="NTKF.im_openInPageChat('bq_1000_1472795888825')">在线咨询</a>
                        <span>或</span>
                        <a class="color-469df7" href="tel:0579-83225173">热线咨询</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- <FooterComponent></FooterComponent>-->
    </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import FooterComponent from "components/Footer.vue"
    export default {
        name: '',
        data () {
            return {
                //参数
                typeName: '',
                questionType: '',
                hits: '-',
                pageCount: 5,
                //列表
                questionList: [],
                searchList: null,
                noneShow: false,
                searchKey: '',
                searchData: '',
                findBtn: false,
                pagestart: 0,
                clearShow: false,
            }
        },
        watch: {
            searchKey(Val, oldVal){
                if (this.searchKey) {
                    if (this.searchKey.length > 20) {
                        this.searchKey = oldVal;
                    }
                    this.clearShow = true;
                } else {
                    this.clearShow = false;
                }
            }
        },
        components: {
            InfiniteLoading,
            FooterComponent
        },
        created(){
            this.typeName = this.$route.query.typeName;
            this.questionType = this.$route.query.typeId;
        },
        mounted(){
            this.getQuestion();
        },
        methods: {
            clear: function () {
                this.searchKey = "";
                this.clearShow = false;
                this.$refs.searchQuestion.focus();
            },
            getQuestion: function () {
                var self = this;
                self.$http.post(self.$CONSTANTS.APIQuestion + 'questionSearchAliyun/searchQuestionList', {
                    accurateMap: {question_type: [self.questionType.toString()]},
                    sortMap: {hits: self.hits},
                    pageCount: self.pageCount
                }).then(self.successFunction), (self.failedFunction);
            },
            successFunction: function (res) {
                var self = this;
                self.questionList = res.body.result;
                if (self.questionList.length == 0) {
                    self.noneShow = true;
                } else {
                    self.noneShow = false;
                }
            },
            failedFunction: function (res) {
                console.log(res);
            },
            next: function (item) {
                var self = this;
                console.log(item.id);
                self.$http.get(self.$CONSTANTS.APIQuestion + 'questionSearchAliyun/increaseHits', {params: {id: item.id}}).then(function (res) {
                    console.log(res);
                }, function (res) {
                    console.log(res);
                });
                self.$router.push({name: 'result', query: {questionName: item.question_name, questionId: item.id}});
            },
            search () {
                //debugger
                if (this.searchKey == "") {
                    this.$messagebox.alert('请输入搜索内容');
                    return false
                }
                this.noneShow = false;
                this.findBtn = true;
                this.pagestart = 0;
                this.searchList = [];
                if (this.$refs.infiniteLoading) {
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                }
            },
            onInfinite() {
                var self = this;
                self.pagestart += 1;
                console.log("当前页数" + this.pagestart);
                self.$http.post(this.$CONSTANTS.APIQuestion + 'questionSearchAliyun/searchQuestionList', {
                    keyWordMap: {default: [this.searchKey]},
                    accurateMap: {question_type: [this.questionType.toString()]},
                    sortMap: {hits: this.hits},
                    pageCount: this.pageCount,
                    page: self.pagestart
                }).then((res) => {
                    console.log(res);
                    if (res.body.result.length) {
                        res.body.result.forEach(function (item, index) {
                            self.searchList.push(item);
                        });
                        self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    } else {
                        self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }
                }, (res) => {
                    console.log(res);
                }).then(() => {
                    self.$nextTick(function () {
                        if (!self.searchList.length) {
                            self.noneShow = true;
                        }
                    })
                });
            }
        }
    }
</script>


<style scoped>

</style>
