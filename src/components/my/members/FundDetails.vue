<template>
    <div>
        <div id="wrapper">
            <!--填充fixed留下的块-->
            <div class="fixedFill-mx"></div>
            <!--顶部fixed部分-->
            <div class="fixed-top fixed-box">
                <div class="top-header border-bottom">
                    <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
                    <h2 class="f36">资金明细</h2>
                    <div class="top-right">
                        <a class="color-000 f30" @click="queryCurrentUserInfo">旧账户明细</a>
                    </div>
                </div>
            </div>
            <div class="container" ref="container" :style="{'height':containerHight!='auto'?containerHight+'px':containerHight}" style="overflow-y: auto;overflow-x:hidden">
                <div class="f36" style="width: 100%; line-height: 1rem; text-align: center;" v-if="showGc">暂无数据</div>
                <div class="border-bottom bg-fff pos-re p-30"  v-for="item in fundMoneyList" v-if="item.changeType != 4 "
                     ref="containerList">
                    <div class="new-fundDetail-left clearfix">
                        <i class="fl" :class="{  'icon-cnyGreed': item.moneyRequest<=0 , 'icon-cnyRed': item.moneyRequest>0}"></i>
                        <p class="fl ml-30">
                            <span class="f32 mb-20 color-000">{{item.changeTypeName}}</span><br>
                            <span class="f24 color-999">{{item.createdDate | capitalize}}</span>
                        </p>
                    </div>
                    <div class="new-fundDetail-right">
                        <span class="f40 color-000">{{(item.moneyRequest>0) ? '+'+item.moneyRequest : item.moneyRequest}}</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                fundMoneyList: [],
                allLoaded: false,
                showGc: "",
                containerHight: "auto",
                scrollTop: 0,
                pageIndex: 1,
                pageSize: 500,
            }
        },
        mounted: function () {
            this.getAccountDetails();
            this.containerHight = this.$getScreenHeight() - this.$refs.container.getBoundingClientRect().top ;
            this.watchGoTop();
        },
        watch: {
            scrollTop: {
                handler: function (val, oldVal) {
                    if (this.$refs.container.scrollHeight - this.$refs.container.scrollTop - this.containerHight < 200  && !this.allLoaded) {
                        this.loadBottom();
                    }
                },
                deep: true
            }
        },
        methods: {
            watchGoTop: function () {
                var self = this;
                self.$refs.container.addEventListener('scroll', function () {
                    self.$nextTick(() => {
                            self.scrollTop = self.$refs.container.scrollTop;
                        });
                })
            },
            getAccountDetails: function () {
                var self = this;
                self.$http.post(self.$CONSTANTS.APIMainpay + "mainUser/getAccountDetails", {
                    paymentTypeAlias: "1000",
                    pageIndex: self.pageIndex,
                    pageSize: self.pageSize
                }).then(function (data) {
                    if (data.body.success == true) {

                        if (data.body.accountDetails && data.body.accountDetails.length > 0) {

                            for (let i = 0; i < data.body.accountDetails.length; i++) {
                                self.fundMoneyList.push(data.body.accountDetails[i]);
                            }
                            if (data.body.accountDetails.length < self.pageSize) {
                                self.allLoaded = true;
                            }
                            else {
                                self.allLoaded = false;
                                self.pageIndex++;
                            }

                            let item = self.fundMoneyList.find(x=> x.changeType != 4);
                            
                            if (!item) {
                                self.allLoaded = true;    
                            };
                        }
                        else if (self.pageIndex != 1) {
                            self.allLoaded = true;
                        }
                        else {
                            self.showGc = true;
                        }
                    }
                });

            },
            queryCurrentUserInfo:function () {
                var self = this;
                self.$http.post(self.$CONSTANTS.APILogin + "account/queryCurrentUserInfo").then(function (data) {
                    if(data.body.success){
                        this.$router.push({
                            name:'oldFundDetails',
                            params: {
                                userId:data.body.userInfo.id,
                            }
                        });
                    }
                })
            },
            loadBottom: function () {
                var self = this;
                self.allLoaded = true;
                self.getAccountDetails();
            },
        },
        filters: {
            capitalize: function (value) {
                function add0(m) {
                    return m < 10 ? '0' + m : m
                }

                var time = new Date(parseInt(value));
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();

                return add0(m) + '-' + add0(d);
            }
        }
    }
</script>
<style src="css/member/member-order.css"></style>