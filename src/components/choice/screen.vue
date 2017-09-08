<template>
  <!--筛选-->
  <div class="goodslist-02 pb-200" v-show="isScreenShow">
    <div class="top-header border-bottom fixed-top">
      <div class="top-back"><a @click="toggleScreenAndClearScreen"></a></div>
      <h2 class="f36 ">精准筛选</h2>
      <div class="top-right"></div>
    </div>


  <div class="mt-97"></div>
  <template v-if="filterPretyList.length>0" v-for="(elem, index) in filterPretyList" >
    <template v-if="elem.subEOList" >
    <div class="screen-titl border-bottom mt-30 px-30 color-000 f32 bg-fff screen-ico" v-if="!((elem.filterControlType==1||elem.filterControlType==2)&&elem.subEOList.length==0)">
      <i class="fr ico" v-if="elem.subEOList.length>=9" @click="manychoilce({index:index, manychoilce: true})">{{manychecked(index)?'已选择':'不限'}}</i>
      {{elem.propertyName}}
      <template  v-if="elem.filterControlType==4">
        <span class="fr px-10">{{elem.unitName?elem.unitName:''}}</span>
        <input class="number-input f30" type="tel" placeholder="请输入数字" maxlength="7"
               v-model.number="filterNumber[index]" />
      </template>
    </div>
  </template>
    <div class="screen-price ">
      <template v-if="elem.filterControlType == 5 && elem.filterAlyField!='filter_property'">
        <div class="price-list px-30 pt-30 bg-fff">
          <input class="price-input fl f30 border" type="tel" placeholder="最低" maxlength="7"
                 :value="minValue[index]"
                 @input="updateminMoney($event,index)">
          <span class="hern fl"></span>
          <input class="price-input fl f30 border" type="tel" placeholder="最高" maxlength="7"
                 :value="maxValue[index]"
                 @input="updatemaxMoney($event,index)">
        </div>
      </template>

      <template v-if="elem.subEOList">
      <div class="price-type pl-30 pt-30 bg-fff"  v-if="elem.subEOList.length<9&&elem.subEOList.length>0">
        <ul>
          <li class="fl mb-30" v-for="(subElem, subindex) in elem.subEOList"
              :key="subElem.id"
              :class="{state: subElem.checked&&elem.filterControlType==2, active:subElem.checked&&(elem.filterControlType==1||elem.filterControlType==5)}"
              @click="checkPrety(index, subindex, elem.filterControlType, subElem, 1)"
          ><a><span class="border f30" v-text="subElem.propertyName"></span></a></li>

        </ul>
        <div class="pr-30 pb-30" v-if="elem.filterControlType ==3"><input class="text-input f30"  placeholder="输入筛选内容" /></div>
      </div>
    </template>

      <div v-if="subCateList.length>0&&elem.propertyName=='装备类型'" v-for="(celem,ind) in subCateList" :key="ind">
        <div class="screen-titl border-bottom mt-30 px-30 color-000 f32 bg-fff screen-ico">
          {{celem.name}}类别选择
        </div>
      <div class="price-type pl-30 pt-30 bg-fff" >
        <ul>
          <li class="fl mb-30" v-for="(subCate, cateindex) in celem.sublist"
              :class="{state: subCate.checked}"
              @click="checkSubCate(celem.index, celem.subindex, subCate)"
          ><a><span class="border f30" v-text="subCate.propertyName"></span></a></li>
        </ul>
      </div>
    </div>

      <div class="price-type pl-30 pt-30 pt-30"  v-if="elem.filterControlType ==3">
        <div class="pr-30 pb-30" ><input class="text-input f30"  placeholder="输入筛选内容" v-model="textFilter[index]" /></div>
      </div>

      <!--多选-->
      <div v-show="elem.manychoilce">
        <div class="filter-mask"   style="height: 100%;bottom:0" @click="manychoilce({index:index, manychoilce: false})"></div>
        <transition name="fade_sx">
        <div class="filter-content bg-fff" style="height: 100%;overflow-y: scroll">
          <!-- top -->
          <div class="top-header border-bottom fixed-top">
            <div class="top-back">
              <a @click="manychoilce({index:index, manychoilce: false})">返回</a>
            </div>
            <h2 class="f36">{{elem.propertyName}}</h2>
          </div>
          <div class="chore-seach mt-97 border-bottom">
              <div class="gvst-seach mx-30 my-20 border py-15 px-20">
                <input class="server-input" name="" type="text" placeholder="请输入关键字" v-model="filterInput" @keyup="filterChange(index)" />
              </div>
          </div>
          <div class="filter-list" ref="abcd" style="height: auto;overflow-y: scroll">
            <ul class="manyul" style="overflow-y: scroll">
              <li class="" @click="checkPrety(index, subindex, elem.filterControlType, subElem, 1)"  v-for="(subElem, subindex) in subFilterList">
                {{subElem.propertyName}}
                <a class="chore-ico fr " :class="{'chore-ico-hov':subElem.checked}" ></a>
              </li>
            </ul>

          </div>
          <div class="filter-confirm  bg-fff" >
            <a class="sure text-center f32 fl bg-f54 color-fff" @click="manychoilce({index:index, manychoilce: false})">确定</a>
          </div>
        </div>
        </transition>
      </div>


    </div>


  </template>

    <div class="fixed-bottom border-top">
      <div class="goodslist-btn px-30 py-30 bg-fff">
        <a class="options f32 color-666 fl text-center" @click="clearScreen">清除选项</a>
        <a class="purchase f32 bg-f54 color-fff fr text-center" @click="confirmScreen">确定</a>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      minValue: [],
      maxValue: [],
      textFilter:[],
      filterNumber:[],
      filterInput: '',
    }
  },
  props: ['isScreenShow','clearscreen'],
  computed:{
    ...mapState({
      postData: state => {
        return state.choice.postData
      },
      filterPretyList: state => {
        return state.choice.filterPretyList
      },
      subFilterList: state => {
        return state.choice.subFilterList
      },
    }),
    ...mapGetters({
      subCateList: 'choice/SUBCATELIST',
      screenfilters: 'choice/SCREENPRETY',
      filterNumberData: 'choice/FILTERNUMBERDATA',
      filterBetweenData: 'choice/FILTERBETWEENDATA',
      filterTextData: 'choice/FILTERTEXTDATA'
    })
  },
  watch:{
    clearscreen(val){
      console.log(val);
      if(val) this.clearScreen()
    }
  },
  methods: {
    filterChange(i) {
      let arr = this.filterPretyList[i].subEOList
      let str = this.filterInput.toLowerCase();
      if (arr.length>0) {
        if (str) {
          arr = arr.filter(function (item) {
            return item.propertyName.toLowerCase().indexOf(str) !== -1;
          });
        }
      }
      this.actsubchoice(arr)
    },
    manychecked(i) {
      let pd = false;
      this.filterPretyList[i].subEOList.forEach(elem => {
        if (elem.checked && elem.propertyName != '不限') {
          pd =  true
        }
      });
      return pd
    },
    checkSubCate(index, subindex, subCate){
      this.checkSubCateStore({
        index:index,
        subindex:subindex,
        subCate:subCate
      })
    },
    checkPrety(index, subindex, filterControlType, elem, goodsType) {
      if (filterControlType == 5) {
        if (Number(elem.filterValue.split('-')[0])>0) {
          this.minValue[index] = Number(elem.filterValue.split('-')[0])
        } else {
          this.minValue[index] = ''
        }
        if (Number(elem.filterValue.split('-')[1])>0) {
          this.maxValue[index] = Number(elem.filterValue.split('-')[1])
        } else {
          this.maxValue[index] = ''
        }
      }
      this.checkFilterPrety({
        index:index,
        subindex:subindex,
        propertyName:elem.propertyName,
        filterControlType:filterControlType,
        goodsType:1
      })
      setTimeout(()=>{
        this.actsubchoice(this.filterPretyList[index].subEOList)
      }, 300)
      this.filterInput = ''
    },
    updateminMoney(e,i){
      //输入价格时取消选中
      this.filterPretyList[i].subEOList.forEach(subelem => {
        subelem.checked = false
      });
      this.$set(this.minValue, i, e.target.value.replace(/[^\d]/g,''))
    },
    updatemaxMoney(e,i){
      //输入价格时取消选中
      this.filterPretyList[i].subEOList.forEach(subelem => {
        subelem.checked = false
      });
      this.$set(this.maxValue, i, e.target.value.replace(/[^\d]/g,''))
    },
    clearScreen(){
      this.isAXM = false;
      this.isScreenShot = false;
      this.minValue = null;
      this.maxValue = null;
      this.selectMoneyId = 0;
      this.clearFilterPrety()
      this.maxValue = []
      this.minValue = []
      this.$parent.ifscreen = false
    },
    refreshList: async function (e) {
      this.$parent.clearGoodsList()
      this.$parent.clearKeywordnotfresh()
      await this.$parent.updatePostData(e);
      await this.$parent.updateListData();
      this.$parent.$refs.goodsContainerList.scrollTop = 0
    },
    toggleScreenAndClearScreen(){
      this.$emit('toggleScreen')
    },
    toggleScreen(){
      this.$emit('toggleScreen')
    },
    confirmScreen(){
      // 处理价格区间
      this.minValue.forEach((elem,index) => {
        this.maxValue.forEach((melem, mindex) => {
          if (index == mindex) {
            if(elem > melem && elem && melem) {
              let big = melem
              this.maxValue[index] = this.minValue[index]
              this.minValue[index] = big
            }
          }
        });
      });
      this.$parent.minValue = this.minValue
      this.$parent.maxValue = this.maxValue
      this.$parent.textFilter = this.textFilter
      this.$parent.filterNumber = this.filterNumber
      this.refreshList("SCREEN")
      this.$parent.ifscreen = true
      this.toggleScreen();
    },
    ...mapActions({
      actPostData: 'choice/ACTPOSTDATA',
      clearPostData: 'choice/CLEARPOSTDATA',
      getPretyList: 'choice/GETFILTERPRETYLIST',
      checkFilterPrety: 'choice/UPDATEFILTERPRETYLIST',
      clearFilterPrety: 'choice/CLEARFILTERPRETY',
      manychoilce: 'choice/MANYCHOILCE',
      actsubchoice: 'choice/ACTSUBCHOILCELIST',
      checkSubCateStore: 'choice/CHEKSUBCATESTORE'
    })
  }
}
</script>
<style src='css/common/list-cl.css' scoped></style>
<style src='css/equipment/equipment-wjr.css' scoped></style>
<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.screen-price .price-input.border{
  border: 1px solid #e8e8e8;
  height: .99rem;
}
.screen-price span.hern {
    height: 0.99rem;
    background-size: 0.26rem 0.04rem;
}
</style>
