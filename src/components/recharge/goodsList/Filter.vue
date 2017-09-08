<template>
     <div class="recharge-02 pb-300" >
        <div class="top-header border-bottom">
             <div class="top-back" @click="closeFilter()">
                  <a class="backruter" >返回</a>
             </div>
             <h2 class="f36">精准筛选</h2>
        </div>
        <div class="rechar-seach">
            <div class="rechseach-titl bg-fff px-30 f32 border-bottom">价格区间</div>
            <div class="rech-conn bg-fff tab pl-30 mb-20 border-bottom">
                <ul class="tab-nav">
                <li class="fl f32 " :class="{active:v.active}" v-for="v in price_range"
                    @click="selectPrice(v)"><a>{{v.name}}</a></li>
                </ul>
            </div>

            <div class="rechseach-titl bg-fff px-30 f32 border-bottom border-top">客户端</div>
            <div class="rech-conn bg-fff tab pl-30 mb-20 border-bottom" style="height: 5rem;overflow-y: auto;
            padding-bottom: 2rem;">
                <ul class="tab-nav">
                    <li class="fl f32 " :class="{active:v.active}" v-for="v in operator_name"
                    @click="selectOperator(v)"><a>{{v.name}}</a></li>
                </ul>
            </div>

        </div>
        <div class="fixed-bottom01 border-top zindex">
            <div class="recharge-btn px-30 py-30 bg-fff">
                <a class="f36 bg-f54 color-fff recherbtn"  :class="{disabled:goodsCount <=0}" @click="showFileter()"><span>共精选出{{goodsCount}}件商品</span></a>
            </div>
        </div>
    </div>

</template>
<script type="text/javascript">
    export default {
        props:['filter','priceList','operatorList'],
        data(){
            return{
                price_range:[],
                operator_name:[],
                goodsCount:0,
                params:{
                    price_range:'',
                    operator_name:''
                },
                list:[]
            }
        },
         created:function  () {
            let vm = this;
            vm.params=Object.assign(vm.params,vm.$parent._data.params)

            vm.$bus.emit('showHeader', false);
            //vm.init();

            vm.search();
            vm.getOperator();
        },
        methods:{
            init:function  () {
                let vm=this;
                let price_active_list = vm.priceList;
                let operator_active_list = vm.operatorList;//.split(','):'';

                vm.price_range=[{name:'不限',value:'0',active:true},
                                {name:'50元以下',value:'0-50',active:false},
                                {name:'50-100元',value:'50-100',active:false},
                                {name:'100-500元',value:'100-500',active:false},
                                {name:'500-1000元',value:'500-1000',active:false},
                                {name:'1000元以上',value:'1000-999999',active:false}];

                vm.operator_name=[{name:'全部',value:'',active:true}]


                if (vm.list) {

                    for(let item of vm.list){
                        vm.operator_name.push({
                            name:item.operator_name,
                            value:item.operator_name,
                            active:false
                        });
                    }
                };


                //默认选择的状态
                let price_item=vm.price_range.find(x=>x.value === "0");
                let operator_item=vm.operator_name.find(x=>x.value === "");


                if (price_active_list && price_active_list.length > 0){

                    for(let item of price_active_list){
                         vm.price_range.find(x=>x.value === item).active=true;
                    }

                    price_item.active=false;

                }else{
                    price_item.active=true;
                }


                if (operator_active_list && operator_active_list.length > 0){

                    for(let item of operator_active_list){
                         vm.operator_name.find(x=>x.value === item).active=true;
                    }
                    operator_item.active=false;
                }else{
                    operator_item.active=true;
                }



            },
            showFileter:function  () {
                let vm=this;
                if (vm.goodsCount <=0)return;

                vm.$parent._data.showList=!this.$parent._data.showList;
                //debugger;
                //vm.$bus.emit('numList', vm.$parent._data.num);
                if (vm.params.operator_name && vm.params.operator_name.length >0)
                    vm.$parent._data.params.accurateMap.operator_name = vm.params.operator_name.split(',');
                else
                    vm.$parent._data.params.accurateMap.operator_name = [];


                if (vm.params.price_range && vm.params.price_range.length > 0)
                    vm.$parent._data.params.betweenMap.recharge_price = vm.params.price_range.split(',');
                else
                    vm.$parent._data.params.betweenMap.recharge_price = [];

                vm.filter();
                vm.$bus.emit('showHeader', true);
            },
            closeFilter:function  () {
                let vm=this;
                vm.$parent._data.showList=!this.$parent._data.showList;

                //vm.$parent._data.showRecommend=false;
                vm.$bus.emit('showHeader', true);
            },
            selectPrice:function  (item) {
                let vm=this;

                let price_range=''

                let price_item=vm.price_range.find(x=>x.value === "0");


                //等于不限的时候 所有后续条件全部取消选中
                if (item.value === "0") {

                    item.active=true;

                    vm.price_range.forEach(x=>{
                        if (x.value !== "0")
                            x.active=false;
                    })

                }else{
                    item.active=!item.active;
                    price_item.active=false;
                }



                vm.price_range.filter(x=>x.active === true && x.value !== "0").forEach(x=>{
                    price_range+=x.value +',';
                });

                //如果全部取消的情况下自动选中默认
                if (!price_range) {
                    price_item.active=true;
                };

                price_range=price_range.substr(0,price_range.length -1);

                vm.params.price_range=price_range;

                vm.search();
            },
            selectOperator:function  (item) {
                let vm=this;
                let operator_name='';
                let operator_item=vm.operator_name.find(x=>x.value === "");

                //等于不限的时候 所有后续条件全部取消选中
                if (item.value === "") {
                    item.active=true;

                    vm.operator_name.forEach(x=>{
                        if (x.value !== "")
                            x.active=false;
                    })
                }else{
                    item.active=!item.active;
                    operator_item.active=false;
                }
                 vm.operator_name.filter(x=>x.active === true && x.value !== "").forEach(x=>{
                    operator_name+=x.value +',';
                });


                //如果全部取消的情况下自动选中默认
                if (!operator_name) {
                    operator_item.active=true;
                };

                operator_name = operator_name.substr(0,operator_name.length -1);

                vm.params.operator_name = operator_name;
                vm.search();
            },
            search:function  () {
                let vm = this;
                let params ={
                    betweenMap: {
                        recharge_price: vm.params.price_range?vm.params.price_range.split(','):[]
                    },
                    accurateMap: {
                        game_id: vm.$parent._data.params.accurateMap.game_id,
                        shops_id:vm.$parent._data.params.accurateMap.shops_id,
                        operator_name: vm.params.operator_name?vm.params.operator_name.split(','):[],
                        platform_type: vm.$parent._data.params.accurateMap.platform_type,
                        recharge_type: vm.$parent._data.params.accurateMap.recharge_type
                    },
                    sortMap: {
                        "discount": "+"
                    }
                }
                vm.$http.post(vm.$CONSTANTS.APIRecharge+'publishSearchAliYun/getPublishSearchNum',params)
                    .then((response)=>{
                  let data=response.data;
                    if (data.success ) {
                        vm.goodsCount=data.total;
                    }

                },(response)=>{
                    console.log(this);
                })
            },
            getOperator:function (){
                let vm=this;
                let params={
                    distKey:'operator_name',
                    accurateMap:{"game_id":[vm.$parent._data.params.accurateMap.game_id[0]],
                    "shops_id":[],
                    "platform_type":[vm.$parent._data.params.accurateMap.platform_type[0]],
                    "recharge_type":[vm.$parent._data.params.accurateMap.recharge_type[0]]}
                }

                if (vm.$parent._data.params.accurateMap.shops_id) {
                    params.accurateMap.shops_id = vm.$parent._data.params.accurateMap.shops_id;
                };

                vm.$http.post(vm.$CONSTANTS.APIRecharge+'publishSearchAliYun/publishSearchList',params)
                .then((response)=>{
                    let result=response.data.result;

                    vm.list=result;

                    vm.init();
                },(response)=>{

                })
            }
        }
    }
</script>
<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style type="text/css" scoped>
    .recharge-02{
        display:block;left: 0;position: fixed;
    }
    .disabled{
        background: gray;
    }
    ::-webkit-scrollbar {
        -webkit-appearance: none;       /*可去除系统默认的样式*/
        width: 7px;                           /*滚动条宽度*/
    }
    ::-webkit-scrollbar-thumb {    /*当焦点不在当前区域滑块的状态*/
    border-radius: 4px;
    background-color: rgba(0,0,0,.5);
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
    }
</style>
