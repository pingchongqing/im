<template id="history-modal">
    <div>
        <div :class="fixedSpaceClass"></div>
        <div class="server-histore fw" v-show="browseModalEnable">
            <div class="histore-head f32 border-bottom fw" @click="toggleHistoryList">
                <span></span>最近浏览过的游戏区服<i :class="{'rotate-180':browseHistoryListEnable}"></i>
            </div>
            <transition name="fadeDown">
                <div v-show="browseHistoryListEnable" id="browseHistoryList">
                    <div class="histore-list fw" v-for="browseHistory in browseHistoryData">
                        <a :href="browseHistory.href"
                           class="f32 border-bottom fw">
                            <span>{{browseHistory.name}}</span><i></i></a></div>
                    <div class="fw grey20"></div>
                </div>
            </transition>
        </div>
        <div class="mb-20" v-show="browseModalEnable"></div>
        <div id="maskDiv" class="maskdiv" @click="toggleHistoryList" v-show="browseHistoryListEnable"></div>
    </div>
</template>
<script>
    export default {
        template: 'history-modal',
        data() {
            return {
                //是否显示此控件
                browseModalEnable: false,
                //是否显示下拉框内容
                browseHistoryListEnable: false,
                browseHistoryData: [],
                fixedSpaceClass: "fixedspace",
                name: "",
                fullPath: "",
                queryData: ""
            }
        },
        mounted: function () {
            this.disableTouchMove("browseHistoryList");
            this.disableTouchMove("maskDiv");
            this.getUrlData();
            this.getHistoryData();
        },
        methods: {
            getHistoryData: function () {
                var self = this;
                if (self.$isLocalStorageSupported() && localStorage.getItem("browseHistory")) {
                    self.browseHistoryData = JSON.parse(localStorage.getItem("browseHistory"));
                    self.browseModalEnable = true;
                    self.fixedSpaceClass = "fixedspace2";
                }
                else {
                    self.browseModalEnable = false;
                    self.fixedSpaceClass = "fixedspace";
                }
            },
            getUrlData: function () {
                var self = this;
                var name = "";
                if (self.$route.query.gName)
                    name += self.$route.query.gName;
                if (self.$route.query.aName)
                    name += "/" + self.$route.query.aName;
                if (self.$route.query.sName)
                    name += "/" + self.$route.query.sName;
                self.name = name;
                self.fullPath = self.$route.fullPath;
                self.queryData = self.$route.query;
            },
            disableTouchMove: function (id) {
                document.getElementById(id).addEventListener('touchmove', function (event) {
                    event.preventDefault();
                }, false);
            },
            toggleHistoryList: function () {
                this.browseHistoryListEnable = !this.browseHistoryListEnable;
            },
            updateHistoryData: function () {
                var self = this;
                if (self.name != "" && self.$isLocalStorageSupported() ) {
                    var newHistoryData = {href: self.fullPath, name: self.name};
                    //如果记录有重复的，先删除重复
                    for (var index in self.browseHistoryData) {
                        if (self.name == self.browseHistoryData[index].name && self.fullPath == self.browseHistoryData[index].href) {
                            self.browseHistoryData.splice(index, 1);
                        }
                    }
                    //如果超过5条，删除最老一条
                    if (self.browseHistoryData && self.browseHistoryData.length == 5)
                        self.browseHistoryData.pop();

                    self.browseHistoryData.unshift(newHistoryData);
                    localStorage.setItem("browseHistory", JSON.stringify(self.browseHistoryData));
                }
            }
        },
        beforeDestroy: function () {
            this.updateHistoryData();
        }
    }
</script>
<style scoped>
    @import "../../assets/css/common/common-zyp.css";

    .server-histore {
        display: block;
    }

    .server-histore .histore-list {
        display: block !important;
    }

    .histore-head i {
        background: url("../../assets/images/down4.png") 100% 50% no-repeat;
    }

    .maskdiv {
        z-index: 60;
    }

    .rotate-180 {
        transform: rotate(180deg);
    }

    .fadeDown-enter-active {
        animation: fadeInDown 0.5s;
        -webkit-animation: fadeInDown 0.5s;
    }

    .fadeDown-leave-active {
        animation: fadeOutUpBig;
        -webkit-animation: fadeOutUpBig;
    }

</style>
