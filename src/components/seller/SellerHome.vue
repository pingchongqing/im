<template>
<div>
    <div class="classCommon">
        <div class="fixedFill-mx"></div>
        <div class="top-search py-20 px-30 bg-c9c" @click="goSearchAll" ref="search">
             <div class="container-ms">
                <!-- <img src="~images/search4.png"  alt=" 搜索">
                <input disabled="disabled"  type="text" placeholder="搜索" class="search"> -->
                <div class="container-inp">
                    <span>搜索游戏</span>
                </div>
            </div>
        </div>
    </div>

        <div ref="tab" style="position:relative;top: 2rem;">
            <sellerListComponent :tabHeight="tabHeight"></sellerListComponent>
        </div>
    </div>
</template>

<script>
    import sellerListComponent from "components/seller/sellerList/SellerListComponent.vue"
    import { mapState, mapGetters, mapActions } from 'vuex';
    export default{
        data() {
            return {
                tabTop: 0,
                tabHeight: 0,
                fixHeight: 0
            }
        },
        created(){
            this.$bus.emit('headerText','我要卖');
            this.getislogin();
        },
        components: {
            sellerListComponent,
        },
        mounted: function () {
            var self = this;
            self.$nextTick(function () {
                self.calHeights();
            });
            self.$bus.emit('isShowRightHome', true)
        },
        beforeDestroy: function beforeDestroy() {
            this.$bus.emit('isShowRightHome', false)
        },
        methods: {
             ...mapActions({
                getislogin:'common/COMMON_ISLOGIN'
            }),
            calHeight: function () {
                this.tabHeight = this.$getScreenHeight()  - this.$refs.tab.getBoundingClientRect().top;
            },
           goSearchAll: function () {
                this.$router.push({
                    name: "SearchAll",
                    query:{type:'seller'}
                })
            },
            calHeights: function () {
                this.tabTop = 0;
                this.tabHeight = this.$getScreenHeight()  - this.$refs.tab.getBoundingClientRect().top - 2;
                this.fixHeight = this.$getScreenHeight()  - this.$parent.$children[0].$refs.header.getBoundingClientRect().height;
                this.$bus.emit('tabTop', this.tabTop);
                this.$bus.emit('tabHeight', this.tabHeight);
                this.$bus.emit('fixHeight', this.fixHeight);
            }
            ,
        },
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>
    .fixedFill-mx {
        width: 100%;
        height: .96rem;
    }
    .classCommon {
       background: #fff;
        position: fixed;
        width: 100%;
        max-width: 768px;
        /* top: 0rem; */
        z-index: 20;
    }
     .container-ms{ padding: 0; text-align: center;}
   .container-ms .container-inp{ display: block;
       background-color: #fff;
       height: 0.62rem;
       line-height: 0.62rem;
       color: #8e8e93;
       border-radius: 0.1rem;}
   .container-ms span{display: inline-block; padding-left: 0.45rem;background:url(/dist/search4.png?f1c7c4fe050302588bbeed8011ab1ff2) no-repeat left center; background-size: 0.33rem;font-size: .3rem;}

</style>
