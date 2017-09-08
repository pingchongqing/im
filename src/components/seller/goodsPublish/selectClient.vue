<template>
    <div >
            <div class="p-30 bg-fff border-top mt-20 f30 border-bottom fw">
               <span class="f32 span-icon-xinhao color-000">平台</span>
          </div>
                <div class="px-30 pt-30 pb-10 bg-fff border-bottom publish-type new-publish-type f30 clearfix fw">
                    <ul>
                        <li class="border mb-20 fl" v-for="v in Operator"
                            :class="{selected:v.id == operatorId}"
                            @click="getOpertor(v)">
                            {{v.name}}
                        </li>
                    </ul>
                </div>
    </div>
</template>
<script >
    export default{
        name:'celectClient',
        data(){
            return{
                Operator:[],
                operatorName:"",
                operatorId:""
            }

        },
        created(){
            var self = this;
            self.$http.get(self.$CONSTANTS.APICategory+"mainMobileGame/getplatforminfobygameid", {
            //self.$http.get("/mobile-category-service/rs/category/mainMobileGame/getplatforminfobygameid", {
                params:{
                    mainGid:self.$route.query.mainCatagoryId,
                    gameId:self.$route.query.game_id,
                    gameType:self.$route.query.game_type,
                }
            }).then(self.successFunction), (self.failedFunction);

            self.$bus.on('selectId',val=>{
                self.operatorId = val;
            })
          },
        methods: {
            successFunction: function (res) {
                var self = this;
                self.Operator = res.data.data;
                self.getOpertor(res.data.data[0]);
            },
            failedFunction: function (res) {
            },
            getOpertor(item){
                if (!item) {
                    return;
                };
                this.operatorName = item.name;
                this.operatorId = item.id;

                this.$parent.params.chooseOperator = item.name;
                this.$parent.params.regionId = '';
                this.$parent.params.serverId = '';
                this.$parent.serverName = '请选择'

                this.$parent.isOpen = false;
                this.$parent.isQuick = false;


                this.$bus.emit('getServicesProviderId',item.id);


            },

        }
    }


</script>
<style src="css/fost-base.css" scoped></style>
<style src="css/common/publish-cl.css" scoped></style>
<style type="text/css" scoped>
    #warpper{
        position: absolute;

    }
</style>
