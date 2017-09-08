<template>
    <div class="arena-main">
        <div class="arepern-part bg-fff px-30 py-20 border-bottom ">
            <a class=" bg-f54 fr color-fff f32" href="#"><h6 class="f32 pt-10">立即参与</h6>
                <p class="f20">中奖最高500倍奖励</p></a>
            <span class="f30 kda-titl">
                <h6>3天12小时12分</h6>
                <p class="f22 color-666">本周揭晓倒计时</p>
            </span>
        </div>
        <div class="kda-rank px-30 f28 color-333"><a href="#"><span class="rk-titl">最新比赛情况</span></a></div>
        <div class="kda-list bg-fff border-top">
            <ul>
                <li class="border-bottom py-20">
                    <div class="kli-01 fl"><span class="fl f36 color-000 ml-30">1</span></div>
                    <div class="kli-02 fl">
                        <h6 class="color-000 f32">殇无离</h6>
                        <p class="color-666 f24">电信/艾欧尼亚</p>
                    </div>
                    <div class="kli-03 fl">
                        <h6 class="color-000 f32">10/10/10</h6>
                        <p class="color-666 f24">杀/死/助</p>
                    </div>
                    <div class="kli-06 fl">
                        <h6 class="color-000 f32">2017/12/24</h6>
                        <p class="color-666 f24">24时59分59秒</p>
                    </div>
                </li>

                <li class="border-bottom py-20">
                    <div class="kli-01 fl"><span class="fl f36 color-000 ml-30">2</span></div>
                    <div class="kli-02 fl">
                        <h6 class="color-000 f32">给我快乐</h6>
                        <p class="color-666 f24">电信/艾欧尼亚</p>
                    </div>
                    <div class="kli-03 fl">
                        <h6 class="color-000 f32">10/10/10</h6>
                        <p class="color-666 f24">杀/死/助</p>
                    </div>
                    <div class="kli-06 fl">
                        <h6 class="color-000 f32">2017/12/24</h6>
                        <p class="color-666 f24">24时59分59秒</p>
                    </div>
                </li>

                <li class="border-bottom py-20">
                    <div class="kli-01 fl"><span class="fl f36 color-000 ml-30">3</span></div>
                    <div class="kli-02 fl">
                        <h6 class="color-000 f32">梦一场</h6>
                        <p class="color-666 f24">电信/艾欧尼亚</p>
                    </div>
                    <div class="kli-03 fl">
                        <h6 class="color-000 f32">10/10/10</h6>
                        <p class="color-666 f24">杀/死/助</p>
                    </div>
                    <div class="kli-06 fl">
                        <h6 class="color-000 f32">2017/12/24</h6>
                        <p class="color-666 f24">24时59分59秒</p>
                    </div>
                </li>

                <li class="border-bottom py-20">
                    <div class="kli-01 fl"><span class="fl f36 color-000 ml-30">4</span></div>
                    <div class="kli-02 fl">
                        <h6 class="color-000 f32">殇无离</h6>
                        <p class="color-666 f24">电信/艾欧尼亚</p>
                    </div>
                    <div class="kli-03 fl">
                        <h6 class="color-000 f32">10/10/10</h6>
                        <p class="color-666 f24">杀/死/助</p>
                    </div>
                    <div class="kli-06 fl">
                        <h6 class="color-000 f32">2017/12/24</h6>
                        <p class="color-666 f24">24时59分59秒</p>
                    </div>
                </li>

                <li class="border-bottom py-20">
                    <div class="kli-01 fl"><span class="fl f36 color-000 ml-30">5</span></div>
                    <div class="kli-02 fl">
                        <h6 class="color-000 f32">刀尽浮生</h6>
                        <p class="color-666 f24">电信/艾欧尼亚</p>
                    </div>
                    <div class="kli-03 fl">
                        <h6 class="color-000 f32">10/10/10</h6>
                        <p class="color-666 f24">杀/死/助</p>
                    </div>
                    <div class="kli-06 fl">
                        <h6 class="color-000 f32">2017/12/24</h6>
                        <p class="color-666 f24">24时59分59秒</p>
                    </div>
                </li>
            </ul>
        </div>
        <a href="#">
            <div class="kda-more bg-fff f32 color-000 border-bottom mb-20">点击加载更多</div>
        </a>


        <div class="kda-option px-30 py-30 bg-fff border-top border-bottom">
            <div class="option-case fl"><a class=" color-m1 f30" href="#">上周中奖情况</a></div>
            <div class="option-join fl">
                <router-link :to="{ name: 'arenaServicesList'}" class="color-m1 f30">我参与的</router-link>
            </div>
            <div class="option-join fl"><a class="color-m1 f30" href="#">立即参加</a></div>
        </div>

        <div class="kda-explain px-30">
            <dl>
                <dt class="f28 color-333 mt-15">KDA竞技场大乐透规则说明：</dt>
                <dd class="f24 color-333">
                    ①玩家报名后参与个人排位比赛，根据杀敌、死亡、助攻数参与大乐透。<br/>②每周日21：00截止报名，至22：00开奖前，取最后20位成功报名且在有效时间内完成比赛的玩家报名时间的分钟数及秒数之和。分别除以杀敌/死亡/助攻常规区间数：25、20、30后取余，分别得到杀敌、助攻、死亡3组大乐透号码。<br/>③玩家取得的杀敌、助攻、死亡数与大乐透号码对应位置相同即可获得高额奖励：杀敌、助攻、死亡其中1组相同，获得报名费5倍奖励，2组相同，获得报名费50倍奖励，3组相同，获得报名费500倍奖励。
                </dd>
                <dt class="f28 color-333 mt-15">举例：</dt>
                <dd class="f24 color-333">截止开奖时间最后20个报名的人比赛时间分别为：<br/>
                    20：30：16<br/>
                    20：35：33<br/>
                    20：41：25<br/>
                    20：45：39<br/>
                    20：48：05······<br/>
                    此20个时间分钟与秒数相加<br/>
                    3016+3533+4125+4539+4855······<br/>
                    分别除以杀敌、死亡、助攻固定区间数：25、20、30<br/>
                    得到本期大乐透号码：杀敌x、死亡y、助攻z<br/>
                    小明本次参赛战绩为：杀敌5、死亡4、助攻13<br/>
                    若其中杀敌5与大乐透号码杀敌x相同即可获得1000金豆奖励<br/>
                    其中两项与对应位置的大乐透号码相同即可获得10000金豆奖励<br/>
                    其中三项与对应位置的大乐透号码相同即可获得100000金豆奖励
                </dd>

            </dl>
        </div>

    </div>
</template>

<script>
    export default {
        beforeMount() {
            this.$bus.emit('showShop', false);
            this.$bus.emit('headerText', "竞技场大乐透");
        },
        beforeDestroy(){
            this.$bus.emit('transitionName', "fadeLeft");
        },

    }
</script>