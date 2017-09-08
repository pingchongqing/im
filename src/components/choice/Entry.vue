<template>
    <div class="classCommon">
        <div class="fixedFill-mx"></div>
        <div class="top-search" @click="goSearchAll">
            <div class="container-ms">
                <img src="~images/search4.png"
                     alt=" 搜索">
                <input disabled="disabled" type="text" placeholder="搜索" class="search" @click="goSearchAll">
            </div>
        </div>
        <div ref="tab">
            <entry-component
              :goodsType="goodsType"
              :tabHeight="tabHeight" ></entry-component>
        </div>
    </div>
</template>

<script>
    import entryComponent from "./EntryComponent.vue"
    export default{
        data() {
            return {
                tabHeight: 0,
                goodsType: null,
            }
        },
        components: {
            entryComponent,
        },
        created: function created() {
          this.goodsType = this.$route.query.goodsType
        },
        mounted: function () {
            var self = this;
            this.$bus.emit('headerText', "请选择游戏");
            self.$nextTick(function () {
                self.calHeights();
            });
        },
        methods: {
            calHeight: function () {
                this.tabHeight = document.documentElement.clientHeight - this.$refs.tab.getBoundingClientRect().top;
            },
            goSearchAll: function () {
              this.$router.push({
                  name: "SearchAll",
                  query:{type:'special'}
              })
            },
            calHeights: function () {
                this.tabTop = this.$refs.tab.getBoundingClientRect().top - this.$parent.$children[0].$refs.header.getBoundingClientRect().height;
                this.tabHeight = document.documentElement.clientHeight - this.$refs.tab.getBoundingClientRect().top - 2;
                this.$bus.emit('tabTop', this.tabTop);
                this.$bus.emit('tabHeight', this.tabHeight);
            }
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
        max-width:768px;
    }
</style>
