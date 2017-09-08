<template>
    <div class="app app-touch " ref="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        mounted: function () {
            this.$setScreenHeight();
        },
    }
</script> 

<style>
    @import "./assets/css/style.css";
    @import './assets/css/animate.css';
    @import "./assets/css/fost-base.css";
    @import "assets/css/common/mintUI-5173.css";

    .app {
        width: 100%;
    }

    .app-touch {
        -webkit-overflow-scrolling: touch;
    }

    .app-auto {
        -webkit-overflow-scrolling: auto;
    }

    #cnzz_stat_icon_1261744584 {
        display: none;
    }

    .no-select {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>


