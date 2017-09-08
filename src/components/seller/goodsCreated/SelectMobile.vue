<template>
  <div ref="tab">
      <div class="dialog_cover" v-if="isShow" @touchmove.prevent @click="isShow = false"></div>
       <section data-i="选择职业" propertyid="32" >
        <a href="javascript:;" class="aRight" v-if="item.controlType == 1 || item.controlType == 2">
            <div class="order-container bg-fff f30  border-bottom " @click="show()">
                <span :class="{'span-icon-xinhao':item.isRequired}">{{item.propertyName}}<em v-if="item.unitName&&item.unitName!='null'">({{item.unitName}})</em>
                </span>
                <span class="danwei" >{{selectItemValue !== '' ?selectItemValue:'请选择' }}
                {{!selectItemValue && item.controlType == 2 ?'(多选)':''}}
                <!-- <img class="toRight fr" src="../../../assets/images/pllist-ico.png" alt="toRight"> -->
                </span>
                 <i class="toRight fr"></i>
            </div>
        </a>
        <div class="bottom-bomb bomb-danxuan bg-f1" v-if="item.controlType == 1 && isShow">
            <div class="bomb-title border-bottom border-top bg-fff">
                <h1 class="f32 color-666 text-center">{{item.propertyName}}</h1>
                <i class="bomb-close" @click="closeModal()"></i>
            </div>
            <div class="bomb-content">
                <ul class="bomb-li-item bg-fff">
                <li v-for="v in sourceList" @click="selectValue(v)" class="border-bottom">{{v}}</li>
                </ul>
            </div>
       </div>
    </section>
    <div class="order-container bg-fff f30 color-000 border-bottom"
    v-if="item.controlType == 3" >
          <span :class="{'span-icon-xinhao':item.isRequired}">{{item.propertyName}}</span>
          <input  type="text"  :placeholder="'请输入' + item.propertyName"  v-model="value" >
  </div>
  <div class="order-container bg-fff f30 color-000 border-bottom"
    v-if="item.controlType == 4" >
          <span :class="{'span-icon-xinhao':item.isRequired}">{{item.propertyName}}</span>
          <input  type="text" @input="checkNumer()"  :maxlength="item.textMaxLength" :placeholder="'请输入' + item.propertyName"  v-model="value" >
  </div>

      <div class="bottom-bomb bomb-duoxuan " v-if="item.controlType == 2 && isShow" >
            <div class="bomb-title border-bottom border-top bg-fff">
                <h1 class="f32 color-666 text-center">{{item.propertyName}}</h1>
                <i class="bomb-close" @click="closeModal()"></i>
            </div>
            <div class="bomb-content bg-fff">
                <ul class="bomb-li-item clearfix px-30 pt-30 ">
                     <li class="fl border text-center"  v-for="v in watchList" @click="multiselect(v)"
                     :class="{'selected':v.selected}" >
                        <span class="f30 color-000">{{v.name}}</span>
                        <i  class="icon-select"></i>
                    </li>
                </ul>
            </div>
            <div class="bomb-commit bg-m1 text-center" @click="saveMultise()"><span class="color-fff f36">确定</span></div>
        </div>
    <div class="contaner-qq fw border-bottom"  :id="'showError'+item.id" v-if="error || showError">
          <p class="f24">{{errorText}}</p>
    </div>
    </div>
</template>
<script type="text/javascript">
import api from '../../../api'
  export default{
    props:['item','saveSelected','getSelected'],
    data(){
      return{
        isShow:false,
        list:[],
        tabHeight:0,
        value: '',
        PY:'',
        scrollTop:0,
        watchList:[],
        selectItemValue:'',
        required:false,
        error:false,
        errorText:'请选择或填写'+this.item.propertyName,
        showError:false
      }
    },
    watch: {
      value(val) {
        this.addPropValue(val);
      }
    },
    created:function  () {
      let vm = this;
      vm.getList();
      vm.$on('getSelected',(data)=>{
        vm.setSelected(data);
        vm.getList();
      })

      vm.$on('showError',(list)=>{
         vm.error = list['showError'+vm.item.id];
      })

    },
    methods:{
      checkNumer(){
        let vm = this;
        vm.value = vm.value.replace(/[^\d]/g, "")
                .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

        if (vm.value > vm.item.maxNumber || vm.value < vm.item.minNumber) {
            vm.showError = true;
            vm.errorText = `请输入最大${vm.item.maxNumber}最小${vm.item.minNumber}`;
        }else{
            vm.showError = false;
        }
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
      },
      multiselect:function (item) {
        let vm = this;
        let entity = vm.watchList.find(x=>x.name  === item.name);
        entity.selected = !entity.selected;

      },
      saveMultise(){
        let vm = this;
        vm.selectItemValue = '';
        for(let item of vm.watchList){
          if (item.selected)
          vm.selectItemValue += item.name + ',';

        }
        vm.selectItemValue = vm.selectItemValue.substring(0,vm.selectItemValue.length - 1);

        vm.addPropValue(vm.selectItemValue);

        vm.isShow = false;

      },
      getList:function  () {
        let vm = this;
        vm.watchList = [];
        vm.sourceList = [];

        if (!vm.item || !vm.item.propertyVal) {
          return;
        };
        if (vm.item.controlType !==2 && vm.item.controlType !==4) {
          vm.sourceList = vm.item.propertyVal.split(',');
        }else{
          let arr =  vm.item.propertyVal.split(',');
          for(let item of arr){
            vm.watchList.push({
              name:item,
              selected:vm.selectItemValue.split(',').find(x=>x === item)?true:false
            })
          }
        }

      },
      selectValue:function  (item) {
        let vm = this;
        vm.selectItemValue = item;

        vm.addPropValue(item);
        vm.isShow = false;
      },
      closeModal:function  () {
        let vm = this;
        vm.isShow = false;
      },
      addPropValue(val){
        let vm = this;
        let value = val;
        if (vm.saveSelected) {
           if (value) {
              vm.error = false;
              //动态属性加上单位
              value += vm.item.unitName ? vm.item.unitName : '';
            };
          vm.saveSelected({
            attributeId:vm.item.id,
            attributeVal:value,
            mainGamePropertyId:vm.item.fieldName,
            attributeName:vm.item.propertyName
          })
        };
      },
      setSelected(list){
        let vm = this;
        for(let item of list){
           if (vm.item.fieldName && (vm.item.fieldName === item.mainGamePropertyId)) {

                         vm.selectItemValue = item.attributeVal;
                         vm.value = item.attributeVal;

                         vm.addPropValue(vm.selectItemValue);
                         break;
                    }
                    if (vm.item.id && vm.item.id === item.attributeId) {
                         vm.selectItemValue = item.attributeVal;
                         vm.value = item.attributeVal;
                         vm.addPropValue(vm.selectItemValue);
                         break;
                    };
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

.bottom-bomb{
  z-index: 20;
}
.dialog_cover{
  z-index: 19;
}
</style>
