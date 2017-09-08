<template>
    <div class="">
        <router-view></router-view>
    </div>
</template>


<script>
    export default {
        name: 'Main',
        mounted(){
            const s1 = document.createElement('script');
            s1.type = 'text/javascript';
            s1.text = 'NTKF_PARAM = {' +
                    'siteid: "bq_1000",' +
                    'settingid: "bq_1000_1472795888825",' +
                    'uid: "",' +
                    'uname: "",' +
                    'isvip: "0",' +
                    'userlevel: "1",' +
                    'erpparam: "abc"' +
                    '}';
            document.body.appendChild(s1);
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = encodeURI('https://dl.ntalker.com/js/b2b/ntkfstat.js?siteid=bq_1000');
            s.charset = "utf-8";
            document.body.appendChild(s);
            localStorage.setItem("fixHeight", document.documentElement.clientHeight);
        },
    }


</script>

<style scoped>
    @import "~css/kefu/callCenter-zch.css";
</style>
