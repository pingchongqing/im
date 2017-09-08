<template>
    <div class="arena-main">
        <div class="arena-content mb-20 bg-fff">
            <div class="area-titl f32 px-30">请选择您所在的区服</div>
        </div>

        <div class="arena-content bg-f8">
            <div class="arena-nav tab pattern-nav">
                <ul class="tab-nav">
                    <li class="fl border-bottom f32" :class="{ 'active': isShowDianXin,}"><a
                            class="challenge color-000 border-right" @click="ShowDianXin">电信</a></li>
                    <li class="fl border-bottom f32 " :class="{ 'active': !isShowDianXin,}"><a class="battle color-000"
                                                                                               @click="ShowWangTong">网通</a>
                    </li>
                </ul>
            </div>
        </div>
        <!--电信-->
        <div class="pattern-challenge" v-if="isShowDianXin">
            <div class="area-list bg-fff pt-10 pl-30">
                <ul>
                    <li class="fl" v-for="item in serviceList"><a @click="ShowDialog(item.id)"><span
                            class="color-m1 f32">{{item.name}}</span></a>
                    </li>
                </ul>
            </div>
        </div>
        <!--网通-->
        <div class="pattern-battle" v-if="!isShowDianXin">
            <div class="area-list bg-fff pt-10 pl-30">
                <ul>
                    <li class="fl" v-for="item in serviceList"><a @click="ShowDialog(item.id)"><span
                            class="color-m1 f32">{{item.name}}</span></a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="dialog-box bg158" v-if="isShowDialog">
            <div class="for-box pt-30">
                <div class="area-title mx-30"><a class="diaclose dialog_close" @click="CloseDialog"></a><span
                        class="f36 color-fff">艾欧尼亚</span></div>
                <div class="area-con mx-30 mt-30"><input class="area-input bg-fff f38 " type="text" v-model="name"
                                                         placeholder="请输入您的角色名"/></div>
                <div class="area-btn m-30"><a class="dialog_close f36" @click="SureDialog">确定</a></div>
            </div>
        </div>
        <div class="dialog_cover" v-if="isShowDialog"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowDianXin: true,
                isShowDialog: false,
                name: "",
                chooseId: "",
                serviceList: "",
                list1: [{"name": "电信1", "id": "1"}, {"name": "电信2", "id": 2}, {"name": "电信3", "id": 3}],
                list2: [{"name": "网通1", "id": "1"}, {"name": "网通2", "id": 2}, {"name": "网通3", "id": 3}, {
                    "name": "网通4",
                    "id": 4
                }]
            }
        },
        beforeMount() {
            this.$bus.emit('showShop', true);
            this.$bus.emit('headerText', "参加竞技场");
        },
        mounted(){
            this.serviceList = this.list1;
        },
        beforeDestroy(){
            this.$bus.emit('transitionName', "fadeLeft");
        },
        methods: {
            ShowDianXin() {
                this.serviceList = this.list1;
                this.isShowDianXin = true;
            },
            ShowWangTong() {
                this.serviceList = this.list2;
                this.isShowDianXin = false;
            },
            ShowDialog(id){
                this.chooseId = id;
                this.isShowDialog = true;
            },
            CloseDialog(){
                this.chooseId = "";
                this.name = "";
                this.isShowDialog = false;
            },
            SureDialog(){
                if (this.name) {
                    this.$router.push({name: 'arenaBeansList', params: {serviceId: this.chooseId, name: this.name}})
                }
            }

        },
    }
</script>
<style>
    .dialog-box {
        position: fixed;
        z-index: 1001;
        display: block;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 200px;
        height: 200px;
    }
</style>