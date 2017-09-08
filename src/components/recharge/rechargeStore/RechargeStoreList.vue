<template>
    <div class="storeList" ref="storeList">
        <!--填充fixed留下的块-->
        <div class="fixedFill-mx"></div>
        <div class="shop-list" ref="shopList" :style="{ height: tabHeight + 'px'}">
            <div ref="loadmore">
                <ul>
                    <li v-for="(item,index) in storeList" :key="item.id">
                        <a @click="nextPage(item)">
                            <img class="shopImg" :src="item.shopsImageUrl" alt="店铺图片">
                            <div class="shopName">
                                <div class="shopTitle f30">{{item.shopsName}}</div>
                                <div class="mouSale f26">月销量:&nbsp<span class="saleNum">{{item.monthlySales}}</span>笔
                                </div>
                            </div>
                            <div class="totalSale f30">
                                <span>总销量</span>
                                <span class="totalNum">{{item.successQuantity}}</span>
                                <span>笔</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <loadingComponent></loadingComponent>
        <goTopComponent controlId="shopList"></goTopComponent>
    </div>
</template>

<script>
    import goTopComponent from "components/common/GoTop.vue"
    import loadingComponent from "components/common/Loading.vue"
    export default {
        data() {
            return {
                queryData: {},
                storeList: [],
                allLoaded: false,
                tabHeight: 0,
                scrollTop: 0,
            }
        },
        components: {
            goTopComponent,
            loadingComponent
        },
        watch: {
            scrollTop: {
                handler: function (val, oldVal) {
                    var self = this;
                    if (self.$isBottom(200) && !self.allLoaded) {
                        self.loadBottom();
                    }
                },
                deep: true
            }
        },
        created: function () {
            this.setDefaultValues();
        },
        mounted: function () {
            this.getData();
            this.$bus.emit('busShareUrl', window.location.href);
            this.watchGoTop();
        },
        methods: {
            watchGoTop: function () {
                var self = this;
                window.addEventListener('scroll', function () {
                    self.scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
                });
            },
            setDefaultValues: function () {
                let self = this;
                self.$bus.emit('headerText', "店铺");
                self.queryData.pageSize = 10;
                self.queryData.pageIndex = 1;
            },
            getData: function () {
                let self = this;
                self.$http.get(self.$CONSTANTS.APIRecharge + 'shops/selectAll', {
                    params: self.queryData,
                }).then(function (response) {
                    if (response.data && response.data.responseStatus.code == "00" && response.data.data &&
                            response.data.data.length > 0) {
                        for (var i = 0; i < response.data.data.length; i++) {
                            self.storeList.push(response.data.data[i]);
                        }

                        //如果一次加载不全，说明已经加载完全
                        if (response.data.data.length < self.queryData.pageSize) {
                            self.allLoaded = true;
                        }
                        else {
                            self.queryData.pageIndex++;
                            self.allLoaded = false;
                        }
                        self.$nextTick(function () {
                            self.calHeight();
                        });
                    }
                    else {
                        self.allLoaded = true;
                    }

                }), (function (response) {
                    console.log(response);
                });
            },
            loadBottom: function () {
                var self = this;
                self.allLoaded = true;
                self.getData();
            },
            nextPage: function (item) {
                this.$router.push({name: 'rechargeStore', params: {shopsId: item.shopsId}})
            },
            calHeight: function () {
                let self = this;
                self.tabHeight = this.$getScreenHeight()  - self.$refs.shopList.getBoundingClientRect().top;
            },
        }
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style scoped>
    .shop-list {

        width: 100%;
        height: auto;
    }
    .shop-list ul{
        background: #fff;
    }
</style>
