<template>
  <div class="seach-list" >
     <div class="gmvst-profile ">
         <div class="gmvst-server fl forscroll">
            <ul>
                <li
                  v-for="(elem, index) in gameAreaList"
                  :class="{curren:matchCurren(index)}"
                  @click="areaClick(elem)"
                ><span class="border-bottom f30 color-000 pl-30 mr-30">{{elem.name}}</span></li>
            </ul>
         </div>
         <div class="gmvst-area bg-fff">
            <div class="gmvst-server" >
            	<div class="gvst-seach mx-30 my-20 border py-15 px-20">
                	<input class="server-input color-333 f30" type="text" placeholder="请输入服务器名称" v-model="gsSearchInput">
                    <div class="login-del hide" style="display: block;">
                           <a class="del" href="#"></a>
                      </div>
                 </div>
             </div>
            <ul class="pl-30" v-if="gameServerListFilter.length>0">
                <li
                  v-for="(elem, index) in gameServerListFilter"
                  :class="{active:postData.selectGameServerId==elem.catagoryId}"
                  @click="serverClick(elem)"
                  class="border-bottom pr-30">
                  <span class="f30 color-000">{{elem.name}}</span>
                </li>
            </ul>
            <ul class="pl-30" v-else>
                <li
                  class="border-bottom pr-30">
                  <span class="f30 color-000">暂无服务器</span>
                </li>
            </ul>
         </div>
     </div>
     <div class="shade"></div>
 </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      gsSearchInput:''
    }
  },
  computed:{
    gameServerListFilter: function () {
      var str = this.gsSearchInput.toLowerCase();
      if (this.gameServerList) {
        if (str) {
          return this.gameServerList.filter(function (item) {
            return item.name.toLowerCase().indexOf(str) !== -1;
          });
        }
        else {
          return this.gameServerList;
        }
      }
    },
    ...mapState({
      postData: state => {
        return state.choice.postData
      },
      gameAreaList: state => {
        return state.choice.gameAreaList
      },
      gameServerList: state => {
        return state.choice.gameServerList
      },
    }),
  },
  methods: {
    matchCurren(i) {
      if (this.postData.selectGameAreaId) {
        if (this.gameAreaList[i].catagoryId==this.postData.selectGameAreaId) {
          return true
        }
      } else {
        if (i==0) {
          return true
        }
      }
      return false
    },
    serverClick(e){
      this.$parent.selectGameServerId = e.catagoryId
      if (!this.$parent.selectGameAreaId) {
        this.$parent.selectGameAreaId = this.gameAreaList[0].catagoryId
      }
      this.$parent.selectGameServerName = e.name
      this.$parent.displayServerName = e.name
      this.$parent.refreshList('SERVER')
      this.$parent.isServerShow = false
    },
    areaClick(e) {
      this.getPcGameServerList({
        parentId: e.catagoryId,
      })
      this.$parent.selectGameAreaId = e.catagoryId
      this.$parent.updatePostData('SERVER')
    },
    ...mapActions({
      getPcGameAreaList: 'choice/ACTPCGAMEAREALIST',
      getPcGameServerList: 'choice/ACTPCGAMESERVERLIST',
    })
  }

}
</script>
<style src='css/equipment/equipment-wjr.css' scoped></style>
<style scoped>
.seach-list{
  position: relative;
  top: 1.92rem;
}
.gmvst-profile {
  z-index: 100;
  height: 8.34rem;
  overflow: hidden;
}
.shade {
  top: 2rem;
}
.gmvst-area ul{
  margin-top: 1.1rem;
}
.gmvst-area {
  height: 8.37rem;
}
.forscroll {
  height: 8.34rem;
  overflow-y: scroll;
}
.gmvst-area ul{
  height: 8.38rem;
}
.noserver {
   margin-top: .32rem;
   display: block;
}
</style>
