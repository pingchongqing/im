<template>
    <div class="callSearch">
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
            <div class="pl-30 bg-fa call-search pt-head border-bottom pr clearfix">
                <input type="text" name="" id="call-search" class="search" :class="{'focus-search':close==true}"
                       value=""
                       placeholder="请您输入问题的关键字" v-model.trim="searchText" ref="searchInput" autofocus="autofocus"/>
                <a @click="searchNext()" class="search-btn">搜索</a>
                <i class="close pa" v-show="notNull" @click="clear()" ref="close"><img
                        src="~images/kefu/call-close.png"/></i>
            </div>
            <!---------------------------- 热门问题查询 ---------------------------->
            <div class="pb-200">
                <div class="bg-fff border-bottom pl-30">
                    <div class="bg-fff pt-30 f32 clearfix" v-show="!noneShow">
                        <p class="title-tip color-999 mb-30"><i class="fl"></i><span class="pl-20">热门问题查询</span></p>
                    </div>
                    <ul class="hot-search">
                        <li v-for="(item,index) in hotQuestionList">
                            <a @click="next(item)">
                                {{item.question_name}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="mt-20">
                    <div class="f30 color-666 text-center lh88">
                        <span>没有找到相关问题？</span>
                        <a class="color-469df7" onclick="NTKF.im_openInPageChat('bq_1000_1472795888825')">在线咨询</a>
                        <span>或</span>
                        <a class="color-469df7" href="tel:0579-83225173">热线咨询</a>
                    </div>
                </div>
            </div>
            <!--<FooterComponent></FooterComponent>-->
        </div>
    </div>
</template>

<script>
    import FooterComponent from "components/Footer.vue"
    export default {
        name: 'callSearch',
        data () {
            return {
                close: false,
                notNull: false,
                searchText: '',
                //问题查询
                hits: '-',
                pageCount: 8,
                hotQuestionList: []
            }
        },
        components: {
            FooterComponent
        },
        watch: {
            searchText: function (Val, oldVal) {
                if (this.searchText) {
                    this.notNull = true;
                    if (this.searchText.length > 20) {
                        this.searchText = oldVal;
                    }
                } else {
                    this.notNull = false;
                }
            }
        },
        mounted(){
            this.close = true;
            this.getHot();
            if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
                var bodyTag = document.getElementsByTagName('body')[0];
                bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
            }
        },
        methods: {
            clear: function () {
                this.searchText = "";
                this.$refs.searchInput.focus();
            },
            getHot: function () {
                var self = this;
                self.$http.post(self.$CONSTANTS.APIQuestion + 'questionSearchAliyun/searchQuestionList', {
                    sortMap: {hits: self.hits},
                    pageCount: self.pageCount
                }).then(self.successFunction), (self.failedFunction);
            },
            successFunction: function (res) {
                var self = this;
                self.hotQuestionList = res.body.result;
            },
            failedFunction: function (res) {
                console.log(res);
            },
            searchNext: function () {
                if (this.searchText == "" || this.searchText == null) {
                    this.$messagebox.alert("请输入搜索关键词");
                } else {
                    if (window.localStorage)
                        localStorage.removeItem("sqQuery");
                    this.$router.push({name: 'searchList', query: {searchQ: this.searchText}})
                }
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

</style>
