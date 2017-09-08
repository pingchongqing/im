<template>
	<div ref="tab">
       <section data-i="选择职业" propertyid="32" v-if="list.length > 0" style="position:relative">
        <a href="javascript:;" class="aRight">
            <div class="order-container bg-fff f30  border-bottom " @click="show()">
                <span>{{name}}</span>
                <span class=" danwei " >{{selectItem.attributeVal !== undefined ?selectItem.attributeVal:'请选择' }}
                <!-- <img class="toRight fr" src="../../../assets/images/pllist-ico.png" alt="toRight"> -->
                </span>
                 <i class="toRight fr"></i>
            </div>
        </a>
        <aside class="ConBox" v-if="isShow" >
            <div class="top-header border-bottom">
                <div class="top-back" @click="closeModal()"><a class="return conBack" href="javascript:void(0);"></a></div>
                <h2 class="f36">选择{{name}}</h2>
            </div>
            <div  class="search-container bg-c9c" v-if="list.length > 10 ">
            	<div  class="search-box bg-fff">
            		<input  type="url" @input="searchPY()" v-model="PY" maxlength="20" placeholder="请输入中文/首字母搜索" class="f30">
            	</div>
            </div>

            <div class="propertytxtdiv0 BoxLink Jbox">
				<a v-for="v in sourceList" @click="selectValue(v)">{{v.attributeVal}}</a>
            </div>
        </aside>
    </section>
    <!--  <input-component
              :iclass="'rest-fabu'"
              :title="'出售'name"
              required
              :max="50"

              placeholder="请输入" :v-if="list.length <=0"></input-component> -->
	 <div class="order-container bg-fff f30 color-000 border-bottom" v-if="list.length <=0 && name !== '角色等级'">
        <span>{{name}}</span>
        <input  type="text" :placeholder="'请输入' + name" v-model="value">
    </div>

     <div class="order-container bg-fff f30 color-000 border-bottom" v-if="list.length <=0 && name === '角色等级'">
        <span>{{name}}</span>
        <input maxlength="4" @input="levelNumber()" type="tel" placeholder="请输入角色等级" v-model="value">
    </div>
    </div>
</template>
<script type="text/javascript">
import api from '../../../api'
	export default{
		props:['name','id','gameId','index','item'],
		data(){
			return{
				isShow:false,
				list:[],
				tabHeight:0,
				selectItem:this.item||{},
				value: '',
				PY:'',
				scrollTop:0

			}
		},
		watch: {
			value(val) {
				let entity = this.$parent.propertyData.find(x=>x.id === this.id);
				let propertyData = this.$parent.propertyData;

				if (!entity) {
					propertyData.push({
						id:this.id,
						attributeVal:val
					})
				}else{
					entity.attributeVal = val;
				}
			}
		},
		created:function  () {
			let vm = this;
			vm.getList();

			//vm.tabHeight=document.documentElement.clientHeight+80;
		},
		methods:{
			levelNumber(){
				let vm = this;
				vm.value = vm.value.replace(/[^\d]/g, "")
                .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

			},
			searchPY:function  () {
				let vm = this;
				if (!vm.PY) {
					vm.sourceList = vm.list;
				}else{
					vm.sourceList = vm.list.filter(x=>{
						if (x.PY.indexOf(vm.PY.toUpperCase()) != -1 || x.attributeVal.indexOf(vm.PY) != -1) {
							return x;
						};
					});
				}
			},
			show:function  () {
				let vm = this;
				vm.isShow = true;
          		vm.scrollTop = document.body.scrollTop;

				if (vm.list.length < 20 ) {
          			document.body.style.position = 'fixed';
          		}
			},
			getList:function  () {
				let vm = this;
				let params = {
                    gameid:vm.gameId,
                   	propertyid:vm.id
                       }
                 if (vm.name === '角色等级' ) {
                 	vm.list=[];
                 	return false;
                 };
				api.seller.searchgameGoodsinfo(params)
				.then((res)=>{
					if (res.data.success && res.data.gamePropertyValList) {
          				vm.list = res.data.gamePropertyValList;
          				vm.sourceList = res.data.gamePropertyValList;
          				for(let item of vm.list){
          					//let firstPY = item.attributeVal.substring(0,1);
          					item.PY = vm.$pingyin.getCamelChars(item.attributeVal);
          				}
					}
				})
			},
			selectValue:function  (item) {
				let vm = this;
				vm.selectItem=item;
				let entity = vm.$parent.propertyData.find(x=>x.id === vm.id);
				let propertyData = vm.$parent.propertyData
				if (!entity) {
					propertyData.push({
					id:vm.id,
					attributeVal:item.attributeVal
				})
				}else{
					entity.attributeVal = item.attributeVal;
				}
				vm.isShow = false;
				document.body.style.position = 'relative';
				document.body.scrollTop = vm.scrollTop;
			},
			closeModal:function  () {
				let vm = this;
				vm.isShow = false;
				document.body.style.position = 'relative';
				document.body.scrollTop = vm.scrollTop;
			}
		}
	}
</script>
<style src="css/common/publish-cl.css" scoped></style>
<style type="text/css" scoped>
	.ConBox{
		margin: 0;
		left: 0;
		position: fixed;
		overflow: hidden;
		height: 100%;
	}
	.ConBox .Jbox{
		width: 100%;
	    background: white;
	    overflow: scroll;
	    /*position: fixed;*/
	    height: 100%;
		top:0;
		z-index: 20;
		padding-bottom: 2rem;
	}

</style>
