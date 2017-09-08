<template>
  <div id="wrapper" class="eqsearch" :style="{height:sheight}"  @touchmove.prevent>
  	<div class="header border-bottom">
           <div class="eqmt-seach">
           	<div class="eqmt-input fl pl-30">
              	<input type="text"
                  placeholder="请输入关键字搜索"
                  v-model.trim="searchInput"
                  class="sch-input f30" >
                  <div class="header-l-ico ps-a">
                      <i class="del" v-if="searchInput" @click="clearInput"></i>
                  </div>
              </div>
              <a class="cancel-btn fr f30 color-m1" v-if="searchInput" @click="doSearch">确定</a>
              <a class="cancel-btn fr f30 color-m1" v-if="!searchInput" @click="back">取消</a>
           </div>
     </div>
     <div class="history-conn px-30 bg-fff mb-20  " v-if="searchHistory.length>0">
     		<div class="history-titl clearfix border-bottom"><h3 class="f30 fl color-999">搜索历史</h3> <i class="fr del-icon" @click="clearSearchHistory"></i></div>
        <div class="history-record  border-bottom" v-for="elem in searchHistory" @click="selectHistory(elem)"><h4 class="f30 fl color-000">{{elem.keyWord}}</h4><i class="fr record-ico"></i></div>
     </div>

  </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      searchInput: '',
      sheight: this.$getScreenHeight()+500+'px'
    }
  },
  computed:{
    ...mapState({
      postData: state => {
        return state.choice.postData
      },
      searchHistory: state => {
        return state.equipment.searchHistory
      },
    }),
  },
  created: function created() {
    this.$nextTick(()=>{
      document.getElementsByClassName('sch-input')[0].focus()
    })
    this.selectHistorySearchList({
      pageSize: 5
    })
  },
  methods: {
    clearSearchHistory() {
      this.$http.get(this.$CONSTANTS.APIGoods + 'historyEquipSearchService/deleteAllHistorySearch').then(
        res => {
          if (res.body.success) {
            this.$store.commit('equipment/MUTSEARCHHISTORY', [])
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    selectHistory(item) {
      this.$store.commit('clearKeyword')
      let searchData = this.postData
      if (searchData.keyWordList) {
        searchData.keyWordList.push({
          title: [item.keyWord]
        })
      } else {
        searchData.keyWordList = [{
          title: [item.keyWord]
        }]
      }
      this.actPostData(searchData)
      this.$parent.keyword = item.keyWord
      this.$parent.refreshList()
      this.$parent.searchshow = false
    },
    clearInput() {
      this.searchInput = ''
    },
    back() {
      this.$parent.searchshow = false
    },
    doSearch() {
      //this.addHistory({keyword: this.searchInput})
      this.$http.post(this.$CONSTANTS.APIGoods + 'historyEquipSearchService/addHistory?keyword='+this.searchInput).then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )

      this.$store.commit('clearKeyword')
      let searchData = this.postData
      if (searchData.keyWordList) {
        searchData.keyWordList.push({
          title: [this.searchInput]
        })
      } else {
        searchData.keyWordList = [{
          title: [this.searchInput]
        }]
      }
      this.actPostData(searchData)
      this.$parent.keyword = this.searchInput
      this.$parent.refreshList()
      this.$parent.searchshow = false
    },
    ...mapActions({
      actPostData: 'choice/ACTPOSTDATA',
      clearSearchKeyWord: 'choice/CLEARSEARCHKEYWORD',
      selectHistorySearchList: 'equipment/QUERYUSERSEARCHHISTORY',
      addHistory: 'equipment/ADDSEARCHHISTORY'
    })
  }
}
</script>
<style src='css/equipment/equipment-wjr.css' scoped></style>
<style scoped>
.eqsearch {
  position: absolute !important;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  z-index: 200
}
</style>
