<template>
    <div>
        <div class="arena-main">
            <div class="arena-content mb-20 bg-fff">
                <div class="arena-nav tab">
                    <ul class="tab-nav">
                        <li class="fl border-bottom f32 active"><a class="yxlm "><span
                                class="color-000">英雄联盟</span></a></li>
                        <li class="fl border-bottom f32 "><a class="wzly "><span class="color-000">王者荣耀</span></a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="arena-content bg-f8">
                <div class="arepern-part bg-fff px-30 py-20 border-bottom  mb-20">
                    <a class="week bg-f54 fr color-fff f32">点击进入<i class="badge color-m1 bg-fff f20">15</i></a><span
                        class="f30 per-titl">我正在进行的挑战</span>
                </div>
            </div>

            <div class="pattern-challenge">
                <div v-for="item in arenaList" @click="navigateToTarget(item.title)">
                    <div class="arepern-list bg-fff px-30 py-30 border-bottom">
                        <div class="pern-img fl"><span class="middle"></span><img
                                :src="item.image"></div>
                        <div class="pern-ctn">
                            <div class="ctn-h2 f32 color-000"><span>{{item.title}}</span></div>
                            <div class="ctn-p f24 color-666 mt-10 ">{{item.detail}}
                            </div>
                        </div>
                    </div>
                    <div class="arepern-part bg-fff px-30 py-20 border-bottom mb-20">
                        <a class=" bg-f54 fr color-fff f32"><h6 class="f32 pt-10">立即参与</h6>
                            <p class="f20">需消耗1000金豆</p></a><span class="f30 per-titl">最高奖励<em
                            class="color-m1">1000000金豆</em></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                arenaList: [
                    {
                        "title": "最强KDA大奖赛",
                        "detail": "每周日22 : 00本周比赛的所有选手中KDA最高者即为本周KDA之王，将获得本周KDA奖金池内所有奖金！",
                        image: "/src/assets/images/arena/pern-list-kda.png"
                    },
                    {
                        "title": "LOL竞技大乐透",
                        "detail": "每周日22 : 00生成本周竞技场大乐透号码，竞技码与此号码相 同的玩家将获得本周大乐透奖池内所有奖励！",
                        image: "/src/assets/images/arena/pern-list-kda.png"
                    },
                    {
                        "title": "挑战五杀",
                        "detail": "在24小时内，任意一场单人排位赛，打出五杀，即可获得奖励！",
                        image: "/src/assets/images/arena/pern-list-kda.png"
                    },
                    {
                        "title": "挑战五连胜",
                        "detail": "在24小时内，任意一场单人排位赛，打出五杀，即可获得奖励！",
                        image: "/src/assets/images/arena/pern-list-wzws.png"
                    },
                    {
                        "title": "挑战MVP",
                        "detail": "每周日22 : 00生成本周竞技场大乐透号码，竞技码与此号码相同的玩家将获得本周大乐透奖池内所有奖励！",
                        image: "/src/assets/images/arena/pern-list-mvp.png"
                    }
                ]
            }
        },
        beforeMount() {
            this.$bus.emit('showShop', true);
            this.$bus.emit('headerText', "竞技场");
        },
        beforeDestroy(){
            this.$bus.emit('transitionName', "fadeLeft");
        },
        methods: {
            navigateToTarget(title) {
                if (title == "LOL竞技大乐透")
                    this.$router.push({name: 'arenaLotto'});
            }
        },
        watch: {

        }

    }
</script>

