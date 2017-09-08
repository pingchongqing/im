<template>
    <div >
        <div class="order-container bg-fff f30 border-bottom border-top">
                    <span class="fontwgh">平台</span>
             </div>
                <div class="order-container publish-type f30 clearfix bg-fff pt-0 mb-20">
                    <ul>
                        <li class="border mt-20 fl" v-for="v in Operator"
                            :class="{selected:v.id == operatorId}"
                            @click="getOpertor(v)">
                            {{v.operatorName}}
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
        mounted(){
            var self = this;
            
           self.$http.get(self.$CONSTANTS.APICategory + "category/getGameToOperator", {
                params: {
                    gameId: self.$route.query.game_id
                }
            }).then(self.successFunction), (self.failedFunction);

        },
        methods: {
            successFunction: function (res) {
                var self = this;
                self.Operator = res.data.gameToOperatorEOList;
                self.getOpertor(res.data.gameToOperatorEOList[0]);
            },
            failedFunction: function (res) {
            },
            getOpertor(item){
              if (!item) {
                return;
               };
              this.operatorName = item.name;
              this.operatorId = item.id;
              this.$parent.params.chooseOperator = item.operatorName;
              this.$parent.params.serviceProviderId = item.operatorId;


              this.$parent.serverName = '请选择';
              this.$parent.params.regionId = '';
              this.$parent.params.serverId = '';
            }
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