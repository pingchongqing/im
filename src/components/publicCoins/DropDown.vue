<template>
  <div v-show="xianshi" id="drop_down">
    <div class="drop-down-list w-100 showlist pa">
      <ul id="coins_list" @click="show()">
        <li class="bg-fff f28 color-000 border-bottom pr" v-for="(dropDown,index) in dropDowns"
            @click="drop_show(dropDown,index)">
          <a :class="{active:active==index}">
            <span class="pl-30 lh110 d-block w-100 f32" style="
                      white-space: nowrap;
                     text-overflow: ellipsis;
                     overflow: hidden;
                     padding-right: 1.5rem;">{{dropDown.roleName}}</span>
            <em v-if="index == i" class="pa coinok"></em>
          </a>
        </li>
      </ul>
    </div>
    <!--遮罩-->
    <div @click="show()" class="shade"  :class="eqshade" style="display: block;"></div>
  </div>
</template>

<script>
  export default {
    name: "DropDown",
    props: ['xianshi', 'roleList','eqshade'],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        i: 0,
        active:0
      }
    },
    computed: {
      dropDowns: function () {
        return this.roleList
      }
    },
    methods: {
      show: function () {
        this.$emit("change");
      },
      drop_show: function (dropDown, index) {
        self = this;
        this.i = index;
        this.active = index;
        this.$emit('ee', dropDown.roleName);
        this.dropDowns.forEach(function (item, index) {
          if (self.i == index) {
            self.$emit('ff', item.mobileNumber);
            self.$emit('gg', item.qqNumber)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .showlist {
    display: block;
  }
  #coins_list {
    /*min-height: 2.2rem;*/
    background: #fff;
  }
  .active{
    color: #f75e46;
  }
  .eqshade {
    position: absolute;
    z-index: 50;
    height: 12rem;
  }



</style>
