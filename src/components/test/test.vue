<template>
    <div>
        <div>
            <br/>
            <section>我不是主页内容</section>
            <a href="/vue/search/searchGame?goodsType=2&tName=%E5%B8%90%E5%8F%B7"> 账号</a>
            <br/>
            <a href="/vue/search/searchArea?gName=地下城与勇士&gameId=YX16060613502502300005"> 端游/地下城与勇士</a>
            <br/>
            <a href="/vue/search/searchPlatForm?gameId=YX16082513452512600006&gName=手游/王者荣耀(手游)"> 手游/王者荣耀(手游)</a>
            <br/>
            <a href="/vue/detail/detailDefault?goodsId=MZH170327000000951"> 详情</a>
        </div>
        <img src="~images/app.jpg">
        <com></com>
    </div>
</template>

<script>
//    import testComponent from './testComponent.vue'  // 相对 （可行）
    import testComponent from 'components/test/testComponent.vue' // 绝对 （可行）
    export default {
        components: {
            com: testComponent
        }
    }
</script>

<style>
    @import "~css/fost-base.css";
</style> 