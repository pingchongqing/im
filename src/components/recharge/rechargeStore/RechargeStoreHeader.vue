<template>
    <div>
        <!--填充fixed留下的块-->
        <div class="fixedFill-mx"></div>
        <div class="store01 bg-fff  border-bottom f28 fw">
            <div class="store01-img fw" :style="{
                background:'url(\'' + store.shopsBackGround + '\')  0 0 no-repeat'
            }" v-if="store.shopsBackGround">
                <img class="mr-30 fl" :src="store.shopsImageUrl ">
                <p class="fl color-fff">
                    {{store.shopsAbstract}}
                </p>
            </div>
            <div class="store01-img fw" v-else>
                <img class="mr-30 fl" :src="store.shopsImageUrl ">
                <p class="fl color-fff">
                    {{store.shopsAbstract}}
                </p>
            </div>
            <div class="store01-info p-30 fw" v-if="showAmount">
                <span class="sp01 fl color-000">月销量：<em class="color-m1">{{store.monthlySales}}</em> 笔</span>
                <span class="sp02 fl text-center color-999">|</span>
                <span class="sp03 fr text-right color-000">总销量：<em
                        class="color-m1">{{store.successQuantity}}</em> 笔</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                queryData: {},
                store: [],
            }
        },
        props: ['showAmount'],
        created: function () {
            this.setDefaultValues();
            this.getShopInfo();
        },
        mounted: function mounted() {
            let self = this;
            self.$bus.emit('isShare', true);
            self.$bus.emit('requireSpecialBack', true);
        },
        beforeDestroy: function () {
            this.$bus.emit('isShare', false);
            this.$bus.emit('shareShow', false)
            this.$bus.emit('shareHead', false)
            this.$bus.emit('requireSpecialBack', false);
        },
        methods: {
            setDefaultValues: function () {
                let self = this;
                self.$bus.emit('headerText', "");
                self.queryData.shopsId = self.$route.params.shopsId;
            },
            getShopInfo: function () {
                let self = this;
                self.$http.get(self.$CONSTANTS.APIRecharge + 'shops/getShopsById', {
                    params: self.queryData,
                }).then(function (response) {
                    if (response.data && response.data.responseStatus.code == "00" && response.data.rechargeShopsEO) {
                        self.store = response.data.rechargeShopsEO;
                        self.$bus.emit('headerText', self.store.shopsName);
                        //qq分享相关
                        self.$bus.emit('busShareQq', {
                            title: self.store.shopsName,
                            summary: "总销量: " + self.store.successQuantity,
                            desc: self.store.shopsAbstract,
                            pics: self.store.shopsImageUrl,
                        })
                    }
                    else {
                        console.log(response);
                    }
                }), (function (response) {
                    console.log(response);
                });
            },
        }
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>
    .fixedFill-mx {
        width: 100%;
        height: 0.96rem;
    }

    .store01 .store01-img {
        background-size: 100% !important;
    }
</style>
