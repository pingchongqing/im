<template>
    <div>
        <router-view name="arena-header"></router-view>
        <transition :name="transitionName">
            <router-view class="arena-router-view"></router-view>
        </transition>
        <router-view name="arena-footer"></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                transitionName: "fadeLeft",
            }
        },
        created() {
            var vm=this;
            vm.$bus.on('transitionName', function (text) {
                vm.transitionName = text;
            });
            console.log(vm.transitionName);
        }
    }
</script>

<style scoped>
    @import "/src/assets/css/fost-base.css";
    @import "/src/assets/css/arena/arena-wjr.css";

    .fadeLeft-enter-active {
        animation: fadeInRight .5s;
        -webkit-animation: fadeInRight .5s;
    }

    .fadeLeft-leave-active {
        animation: fadeOutLeft .5s;
        -webkit-animation: fadeOutLeft .5s;
    }

    .fadeRight-enter-active {
        animation: fadeInLeft .5s;
        -webkit-animation: fadeInLeft .5s;

    }

    .fadeRight-leave-active {
        animation: fadeOutRight .5s;
        -webkit-animation: fadeOutRight .5s;
    }

    .arena-router-view {
        width: 100%;
        position: absolute;
    }
</style>


