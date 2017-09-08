<template>
	<div ref="tab">
       <section data-i="选择职业" propertyid="32" style="position:relative">
        <a href="javascript:;" class="aRight" v-if="item.PropertyType !== 3 && item.PropertyType !== 4">
            <div class="order-container bg-fff f30  border-bottom " @click="show()">
                <span>{{item.Name}}</span>
                <span class=" danwei " >{{selectItem.Value !== undefined ?selectItem.Value:'请选择' }}

                </span>
                <i class="toRight fr"></i>
            </div>
        </a>
        <aside class="ConBox" v-if="isShow && item.PropertyType === 1">
            <div class="top-header border-bottom">
                <div class="top-back" @click="closeModal()"><a class="return conBack" href="javascript:void(0);"></a></div>
                <h2 class="f36">选择{{item.Name}}</h2>
		    </div>

		     <div class="propertytxtdiv0 BoxLink Jbox">
				<a v-for="v in values" @click="selectValue(v)">{{v}}</a>
            </div>
		 
      </aside>
    </section>
    	<div class="order-container bg-fff f30 color-000 border-bottom" v-if="item.PropertyType === 3">
	        <span>{{item.Name}}</span>
	        <input  type="text"  :placeholder="'请输入' + item.Name"  v-model="value">
	    </div>
		<div class="order-container bg-fff f30 color-000 border-bottom" v-if="item.PropertyType === 4">
	        <span>{{item.Name}}</span>
            <div class="propertytxtdiv0 BoxLink Jbox">
		
	        <input  type="tel" @input="Replace()" :placeholder="'请输入' + item.Name" v-model="value">
	    </div>
   	</div>

   	<aside class="ConBox" v-if="item.PropertyType === 2 && isShow">
   	 <div class="top-header border-bottom">
                <div class="top-back" @click="closeModal()"><a class="return conBack" href="javascript:void(0);"></a></div>
                <h2 class="f36">选择{{item.Name}}</h2>
		    </div>

	   	<div class="p-30 bg-fff border-bottom">
	        <span class="span_tip f32 color-000 pl-20">请选择商品的卖点</span>
	    </div>
	    <div class="tese_item p-30">
	        <ul class="color-000 f30 clearfix">
	             <li  v-for="v in watchList" @click="multiselect(v)" :class="{'selected':v.selected}" >
		                <span>{{v.name}}</span>
		                <i></i>
		            </li>
	            </ul>
	     </div>
        <div class="release fixed-bottom">
	        <a class="next" @click="saveMultise()"><input class="bg-f54" type="button" name="" value="确定"></a>
	    </div>
   	</aside>
   	</div>
</template>
<script type="text/javascript">
import api from '../../../../api'
	export default{
		props:['item','values','selectItem','selectList'],
		data(){
			return{
				isShow:false,
				list:[],
				tabHeight:0,
				value: '',
				PY:'',
				scrollTop:0,
				watchList:[]
			}
		},
		watch: {
			value(val) {
				let vm = this;

				if (vm.item.PropertyType === 4) {
					if (val > vm.item.MaxNumber || val < vm.item.MinNumber) {
						vm.$toast(`请重新输入最高${vm.item.MaxNumber}最小${vm.item.MinNumber}`);
						return false;
					};
				}
				vm.saveParent(val);
			}
		},  
		created:function  () {
			let vm = this;
			//多选状态下list处理
			vm.watchList = vm.selectList || [];

			//文本框输入
			vm.value = vm.selectItem.Value;

		},
		methods:{
			show:function  () {
				let vm = this;
				vm.isShow = true;
          		vm.scrollTop = document.body.scrollTop;

				if (vm.values.length < 20 && vm. watchList.length < 20) {
          			document.body.style.position = 'fixed';
          		} 
			},
			Replace(){
                let vm = this;
                vm.value = vm.value.replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

            },
			selectValue:function  (item) {
				let vm = this;
				vm.selectItem.Value = item;

				
				vm.saveParent(item);

				vm.isShow = false;
				document.body.style.position = 'relative';
				document.body.scrollTop = vm.scrollTop;
			},
			multiselect:function (item) {
				let vm = this;
				let entity = vm.watchList.find(x=>x.name  === item.name);	
				entity.selected = !entity.selected;

			},
			saveMultise(){
				let vm = this;
				vm.selectItem.Value = '';
				for(let item of vm.watchList){
					if (item.selected)
					vm.selectItem.Value += item.name + ',';

				}

				vm.selectItem.Value = vm.selectItem.Value.substring(0,vm.selectItem.Value.length - 1);

				vm.saveParent(vm.selectItem.Value);
				vm.isShow = false;

				document.body.style.position = 'relative';
				document.body.scrollTop = vm.scrollTop;
			},
			closeModal:function  () {
				let vm = this;
				vm.isShow = false;
				document.body.style.position = 'relative';
				document.body.scrollTop = vm.scrollTop;
			},
			saveParent(v){
				let vm = this;

				let entity = vm.$parent.sourceData.BizCategoryPropertyVerList.find(x=>x.Key === vm.item.FieldName);

				if (!entity) {
					vm.$parent.sourceData.BizCategoryPropertyVerList.push({
						Key:vm.item.FieldName,
						Value:v
					})	
				}else{
					entity.Value = v;
				}


			  let parentItem = vm.$parent.sourceData.BizCategoryPropertyList
								.find(x=>x.AppCategoryProperty.FieldName === vm.item.FieldName);

				if (!parentItem.selectItem.Value) {
					 parentItem.selectItem = {
						Key:vm.item.FieldName,
						Value:v
					 }
				}else{
					parentItem.selectItem.Value = v;
				}	

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
	}
	.ConBox .Jbox{
		width: 100%;
	    background: white;
	    overflow: scroll;
	    /*position: fixed;*/
	    height: 100vh;
		top:0;
		z-index: 20;
		padding-bottom: 2rem;
	}

</style>
