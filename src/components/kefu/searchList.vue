<template>
    <div class="">
        <div id="wrapper">
            <!---------------------------- top ---------------------------->
            <div class="top-header fixed-top border-bottom">
                <div class="top-back">
                    <a href="javascript:history.go(-1)"></a>
                </div>
                <h2 class="f36">客服中心</h2>
                <div class="top-right"></div>
            </div>
            <!---------------------------- search ---------------------------->
            <div class="pl-30 bg-fa call-search pt-head border-bottom pr clearfix" ref="callSearch">
                <input type="text" name="" id="call-search" class="search1" :class="{'focus-search':focus==true}"
                       :value="key"
                       placeholder="请使用关键词搜索" v-model.trim="key"
                       onfocus="this.placeholder=''" ref="searchQuestion"/>
                <a href="javascript:void(0);" class="search-btn" @click="searchAgain">搜索</a>
                <i class="close pa" @click="clear()" v-if="clearShow"><img src="~images/kefu/call-close.png"/></i>
            </div>
            <!---------------------------- 搜索结果 ---------------------------->
            <div class="bg-fff pl-30 border-bottom list-auto" v-show="!noneShow" ref="wrapper"
                 :style="{ height:(heightauto) ? 'auto' : wrapperHeight +'px'}">
                <ul class="search-result">
                    <li class="f32 color-32 lh100 resultLi" v-for="(item,index) in getList" ref="resultLi">
                        <a @click="next(item)" class="pr-30">
                            {{item.question_name}}
                        </a>
                    </li>
                </ul>
                <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
            <span slot="no-more">
              没有更多了
            </span>
                </infinite-loading>
            </div>
            <!---------------------------- 没有搜索结果 ---------------------------->
            <div class="bg-fff px-30 mt-20 border-top border-bottom search-none" v-if="noneShow">
                <p class="f32 color-c5 text-center pt-162">额...还木有您想要的答案...</p>
                <img src="~images/kefu/notfound.png" alt=""/>
            </div>
            <!---------------------------- 在线咨询 ---------------------------->
            <!--<div class="pb-200">
                <div class="mt-20 bg-fff border-top pl-30 border-bottom online" id="result-show"
                     ref="fix">
                    <div class="f30 color-666 lh88 border-bottom">没有找到相关问题？</div>
                    <div class="kf pr-30 py-30">
                        <a onclick="NTKF.im_openInPageChat('bq_1000_1472795888825')"><img src="~images/kefu/kf.png"
                                                                                          alt=""/>在线咨询</a>
                    </div>
                </div>
            </div>-->
            <div class="pb-200">
                <div class="mt-20" ref="fix">
                    <div class="f30 color-666 text-center lh88">
                        <span>没有找到相关问题？</span>
                        <a class="color-469df7" onclick="NTKF.im_openInPageChat('bq_1000_1472795888825')">在线咨询</a>
                        <span>或</span>
                        <a class="color-469df7" href="tel:0579-83225173">热线咨询</a>
                    </div>
                </div>
            </div>
            <!---------------------------- 底部 ---------------------------->
           <!-- <div ref="footer">
                <FooterComponent></FooterComponent>
            </div>-->
            <!--<div class="newfooter fixed-bottom" data-style="fixed-bottom" ref="foot">
                <ul>
                    <a href="/" class="foot-home">
                        <li :class="">
                            <span class="i_home">主页</span>
                        </li>
                    </a>
                    <a href="/vue/seller" class="foot-home">
                        <li class="">
                            <span class="i_mysell">我要卖</span>
                        </li>
                    </a>
                    <a href="../member/message.html" class="foot-message">
                        <li class="">
                            <span class="i_message">消息</span>
                            <span class="tsme"></span>
                        </li>
                    </a>
                    <a href="/vue/center" class="foot-home">
                        <li class="active">
                            <span class="i_tx">我的</span>
                        </li>
                    </a>
                </ul>
            </div>-->

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
                key: '',
                focus: false,
                clearShow: true,
                //请求参数
                hits: '-',
                pageCount: 8,
                pagestart: 0,
                getList: [],
                //无结果
                noneShow: false,
                //固定咨询
                fixed: false,
                //loadmore组件
                wrapperHeight: "auto",
                //总条数
                heightauto: true,
                fixHeight: 0,
                isFirstLoad: true
            }
        },
        components: {
            InfiniteLoading,
            FooterComponent
        },
        watch: {
            key: function (Val, oldVal) {
                if (this.key) {
                    if (this.key.length > 20) {
                        this.key = oldVal;
                    }
                    this.clearShow = true;
                }
            }
        },
        created(){
            this.key = localStorage.getItem("sqQuery") || this.$route.query.searchQ;
        },
        mounted(){
            var self = this;
            self.$refs.wrapper.scrollTop = 0;
            if (self.$refs.searchQuestion.value == "" || self.$refs.searchQuestion.value == null) {
                self.focus = false;
            } else {
                self.focus = true;
            }
            /*self.fixHeight = localStorage.getItem("fixHeight") - self.$refs.callSearch.getBoundingClientRect().height - self.$refs.fix.getBoundingClientRect().height - self.$refs.footer.getBoundingClientRect().height;*/
            self.fixHeight = localStorage.getItem("fixHeight") - self.$refs.callSearch.getBoundingClientRect().height;
            console.log("页面进入时中间部分的高度" + self.fixHeight);
        },
        beforeDestroy(){
            if (this.key)
                localStorage.setItem("sqQuery", this.key);
        },
        methods: {
            clear: function () {
                this.key = "";
                this.clearShow = false;
                this.$refs.searchQuestion.focus();
            },
            searchAgain: function () {
                var self = this;
                self.$refs.wrapper.scrollTop = 0;
                if (self.key == "" || self.key == null) {
                    this.$messagebox.alert("请输入搜索内容");
                } else {
                    self.pagestart = 0;
                    self.getList = [];
                    self.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                }
                if (self.key)
                    localStorage.setItem("sqQuery", self.key);
            },
            onInfinite() {
                var self = this;
                self.pagestart += 1;
                console.log("当前页数" + self.pagestart);
                self.$http.post(self.$CONSTANTS.APIQuestion + 'questionSearchAliyun/searchQuestionList', {
                    keyWordMap: {default: [self.key]},
                    sortMap: {hits: self.hits},
                    pageCount: self.pageCount,
                    page: self.pagestart
                }).then(res => {
                    if (res.body.result.length) {
                        self.noneShow = false;
                        res.body.result.forEach(function (item, index) {
                            self.getList.push(item);
                        });
                        self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    } else {
                        self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                        self.pagestart = 1;
                    }
                }, (res) => {
                }).then(function () {
                    self.$nextTick(function () {
                        if (self.getList.length == 0) {
                            self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                            self.noneShow = true;
                        } else if (self.getList.length > 0 && self.getList.length < 5) {
                            self.noneShow = false;
                            self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                            self.heightauto = true;
                            self.wrapperHeight = "auto";
                        } else {
                            self.heightauto = false;
                            self.wrapperHeight = self.fixHeight;
                        }
                    })
                });
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
            }
        }
    }
</script>


<style scoped>
    .list-auto {
        overflow: auto;
        max-height: 428px;
    }
    ul{
        border-bottom: 1px solid #e8e8e8;
    }
</style>
