<template>
    <div v-show="isSelfShowLoading">
        <div class="preloader-indicator-modal" v-show="isShowLoading">
            <span class="preloader preloader-white"></span>
        </div>
    </div>
</template>
<script>
    export default {
        template: '#loading',
        data() {
            return {
                //时间超过1000ms就显示loading，否则不用显示
                isSelfShowLoading: false,
                isShowLoading: true
            }
        },
        created: function () {
            var self = this;
            self.$bus.on('toggleLoading', function (text) {
                self.isShowLoading = text;
                setTimeout(function () {
                    self.isSelfShowLoading = text;
                }, 1000);
            });
        },
    }
</script>
