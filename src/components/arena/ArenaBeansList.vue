<template>
    <div class="arena-main">
        <div v-infinite-scroll="loadMore"
             infinite-scroll-disabled="finishLoading"
             infinite-scroll-distance="10"
        >
            <div class="beanslist-rank px-30 f24 color-666 border-bottom">2016年12月</div>
            <div class="arepern-list bg-fff px-30 py-20 border-bottom beanslist-list">
                <div class="pern-img fl"><span class="middle"></span><img
                        src="/src/assets/images/arena/pern-list-kda.png">
                </div>
                <div class="beans-etn fl">
                    <div class="etn-h2 f32 color-000">挑战五杀</div>
                    <div class="etn-income f24 color-666 ">收入&nbsp;10000&nbsp;&nbsp;支出&nbsp;500</div>
                    <div class="etn-time f24 color-666">12月20日 14:47</div>
                </div>
                <div class="beans-money color-m1 f32 fr">余额 54891</div>
            </div>
            <div class="arepern-list bg-fff px-30 py-20 border-bottom beanslist-list">
                <div class="pern-img fl"><span class="middle"></span><img
                        src="/src/assets/images/arena/pern-list-kda.png">
                </div>
                <div class="beans-etn fl">
                    <div class="etn-h2 f32 color-000">挑战五杀</div>
                    <div class="etn-income f24 color-666 ">收入&nbsp;10000&nbsp;&nbsp;支出&nbsp;500</div>
                    <div class="etn-time f24 color-666">12月20日 14:47</div>
                </div>
                <div class="beans-money color-m1 f32 fr">余额 54891</div>
            </div>
            <div class="beanslist-rank px-30 f24 color-666 border-bottom">2015年6月</div>
            <div class="arepern-list bg-fff px-30 py-20 border-bottom beanslist-list">
                <div class="pern-img fl"><span class="middle"></span><img
                        src="/src/assets/images/arena/pern-list-kda.png">
                </div>
                <div class="beans-etn fl">
                    <div class="etn-h2 f32 color-000">挑战五杀</div>
                    <div class="etn-income f24 color-666 ">收入&nbsp;10000&nbsp;&nbsp;支出&nbsp;500</div>
                    <div class="etn-time f24 color-666">12月20日 14:47</div>
                </div>
                <div class="beans-money color-m1 f32 fr">余额 54891</div>
            </div>

            <div class="arepern-list bg-fff px-30 py-20 border-bottom beanslist-list" v-for="item in list">
                <div class="pern-img fl"><span class="middle"></span>
                    <img v-lazy="item.image">
                </div>
                <div class="beans-etn fl">
                    <div class="etn-h2 f32 color-000">{{item.title}}</div>
                    <div class="etn-income f24 color-666 ">收入&nbsp;10000&nbsp;&nbsp;支出&nbsp;500</div>
                    <div class="etn-time f24 color-666">12月20日 14:47</div>
                </div>
                <div class="beans-money color-m1 f32 fr">{{item.detail}}</div>
            </div>
            <div class="page-infinite-loading" v-if="!finishLoading">加载中...</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        "title": "挑战五杀1",
                        "detail": "余额 1",
                        image: "/src/assets/images/arena/pern-list-kda.png"
                    },
                    {
                        "title": "挑战五杀2",
                        "detail": "余额 2",
                        image: "/src/assets/images/arena/pern-list-kda.png"
                    },
                    {
                        "title": "挑战五杀3",
                        "detail": "余额 3",
                        image: "/src/assets/images/arena/pern-list-kda.png"
                    },

                ],
                finishLoading: false,
                page: 0,
            }
        },
        beforeMount() {
            this.$bus.emit('showShop', false);
            this.$bus.emit('headerText', "金豆明细");
        },
        created(){
            console.log("id: " + this.$route.params.serviceId);
            console.log("name: " + this.$route.params.name);
        },
        beforeDestroy(){
            this.$bus.emit('transitionName', "fadeLeft");
        },
        methods: {
            loadMore() {
                let vm = this;
                let testItem = {
                    "title": "测试",
                    "detail": "余额",
                    image: "/src/assets/images/arena/pern-list-kda.png"
                };
                vm.finishLoading = false;
                setTimeout(function () {
                            vm.page++;
                            testItem.title = "测试" + vm.page;
                            vm.list.push(testItem);
                            if (vm.page == 10)
                            vm.finishLoading = true;
                        },
                        500);
            }
        },
    }
</script>

<style scoped>
    .page-infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }

    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>