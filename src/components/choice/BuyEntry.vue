<template>
    <div class="classCommon">
        <div class="top-search py-20 px-30 bg-c9c" @click="goSearchAll">
            <div class="container-ms">
                <!-- <img src="~images/search4.png"
                     alt=" 搜索">
                <input v-model="searchText" type="url" placeholder="搜索游戏" class="search">-->

                <div class="container-inp">
                    <span>搜索游戏</span>
                </div>
            </div>
        </div>
        <div ref="tab" >
            <buy-entry-component
              :goodsType="goodsType"
              :tabHeight="tabHeight" ></buy-entry-component>
        </div>
    </div>
</template>

<script>
    import buyEntryComponent from "./BuyEntryComponent.vue"
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default{
        data() {
            return {
                tabHeight: 0,
                goodsType: null,
                searchText: ''
            }
        },
        components: {
            buyEntryComponent,
        },
        watch: {
          searchText(val) {
            this.goSearchGame(val)
          }
        },
        created: function created() {
          this.goodsType = this.$route.query.goodsType
        },
        mounted: function () {
            var self = this;
            this.$bus.emit('headerText', "请选择游戏");
            this.$bus.emit('isShowRightHome', true)
            self.$nextTick(function () {
                self.calHeights();
            });
            window.addEventListener('resize', self.resize)
        },
        beforeDestroy: function beforeDestroy() {
          window.removeEventListener('resize', self.resize)
        },
        methods: {
          resize() {
            this.$nextTick(function () {
                this.calHeights();
            });
          },
            calHeight: function () {
                this.tabHeight = document.documentElement.clientHeight - this.$refs.tab.getBoundingClientRect().top;
            },
            goSearchAll: function () {
              this.$router.push({
                  name: "SearchAll",
                  query:{type:'special',goodsType:this.$route.query.goodsType.toString()}
              })
            },
            calHeights: function () {
              if (this.$refs.tab) {
                this.tabHeight = document.documentElement.clientHeight - this.$refs.tab.getBoundingClientRect().top - 2;
              }
            },
            goSearchGame(val) {
              this.searchGame(val)
            },
            ...mapActions({
              searchGame: 'choice/SEARCHGAME'
            })
        },
    }
</script>

<style src="css/mobile-recharge/mobile-recharge-zyp.css" scoped></style>
<style scoped>

    .classCommon {
       background: #fff;
        margin-top: .96rem;
        width: 100%;
        max-width: 768px;
        /* top: 0rem; */
        z-index: 20;
    }
    .container-ms {
        padding: 0;
        text-align: center;
    }

    .container-ms .container-inp {
        display: block;
        background-color: #fff;
        height: 0.62rem;
        line-height: 0.62rem;
        color: #8e8e93;
        border-radius: 0.1rem;

    }

    .container-ms span {
        display: inline-block;
        padding-left: 0.45rem;
        background: url(/dist/search4.png?f1c7c4fe050302588bbeed8011ab1ff2) no-repeat left center;
        background-size: 0.33rem;
        font-size: .3rem;
    }

</style>
