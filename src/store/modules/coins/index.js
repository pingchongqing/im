/**
 * Created by 340097 on 2017/6/13.
 */
export default {
  state : {},
  mutations: {
    SET_SCROLL(state, scrollTop){
      state.scrollTop = scrollTop;
    },
    SET_TRADE(state, scroll){
      state.scroll = scroll;
    },
    SET_DJNAME(state, namesx){
      state.namesx = namesx;
    },
    kaiguan(state,x){
      state.kaiguan = x.kaiguan
    },
    sort_paixu(state,x){
      state.count = x.count
      state.index = x.index
    },
    sort_jy(state,x){
      state.jy_index = x.jy_index
    },
    coins_min(state,x){
      state.coins_min = x.coins_min
    },
    coins_max(state,x){
      state.coins_max = x.coins_max
    },
    active1(state,x){
      state.active1 = x.active1
    },
    active2(state,x){
      state.active2 = x.active2
    },
    tObject(state,x){
      state.tObject = x.tObject
    },
    class_yx(state,x){
      state.class_yx = x.class_yx
    },
    class_dj(state,x){
      state.class_dj = x.class_dj
    },
    class_sx(state,x){
      state.class_sx = x.class_sx
    }
  }
}

