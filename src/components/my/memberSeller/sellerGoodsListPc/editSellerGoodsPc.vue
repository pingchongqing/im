<template>
	
	<div id="wrapper" class="pb-200" v-if="sourceData">
    <!--填补fixed的块-->
    <!--填写商品信息-->
    <div class="mt-97" v-if="step ===1">
    <div class="order-container bg-fff f30 color-000 border-bottom">
        <span>商品标题</span>
        <input maxlength='20' type="text" placeholder="请输入商品标题，40字以内" v-model="sourceData.Title">
    </div>
    <div class="order-container bg-fff f30 color-000 border-bottom">
        <span>出售价格</span>
      <input type="tel" maxlength="7"  @input="Replace()" v-model="sourceData.Price"
                           placeholder="请输入出售价格">
    </div>
	<p class="f22 mt-30 mb-30 color-999 pl-20 pr-20 p-tip" style="text-align: right;"><span class=" color-666 lh-46">包括手续费8元</span></p>

    <selectComponents v-for="v in sourceData.BizCategoryPropertyList" 
    :item="v.AppCategoryProperty" :values="v.Names" :select-list="v.List" :select-item="v.selectItem"></selectComponents>

    <div class="order-container bg-fff f30 mt-20 color-000 border-bottom border-top">
        <span>游戏帐号</span>
        <input maxlength='20' type="text" placeholder="请输入游戏帐号" v-model="sourceData.GameAccount">
    </div>
    <div class="order-container bg-fff f30 color-000 border-bottom">
        <span>游戏密码</span>
        <input maxlength='20' type="text" placeholder="请输入游戏密码" v-model="sourceData.GamePassword">
    </div>
    
    <div class="order-container bg-fff f30 color-000 border-bottom mt-20">
        <span>角色名1</span>
        <input maxlength="20" type="text" placeholder="请输入游戏角色" v-model="gameName1">
    </div>
       <div class="order-container bg-fff f30 color-000 border-bottom ">
        <span>角色名2</span>
        <input maxlength="20" type="text" placeholder="请输入游戏角色" v-model="gameName2">
    </div>
       <div class="order-container bg-fff f30 color-000 border-bottom ">
        <span>角色名3</span>
        <input maxlength="20" type="text" placeholder="请输入游戏角色" v-model="gameName3">
    </div>
    <div class="order-container bg-fff f30 color-000 border-bottom">
        <span class="qukep">商品描述</span>
        <textarea v-model="sourceData.Description"  placeholder="例：四个角色都有，歌姬一套，重要徽章：界限解除，幻影，雅典娜，荧光眷属和喷雾，火焰之电枪，冰炮台，索尔，业火凶牙"></textarea>
    </div>

    <div class="release mt-30  trlect-btn border-top">
        <a class="next" @click="nextUpload()">
            <input class="bg-f54" type="button" name="" value="下一步" >
        </a>
    </div>

</div>

<div v-show="step === 2">
<div class="fixedFill-mx"></div>
<div class="top-header border-bottom fixed-top">
    <div class="top-back">
        <a @click="step = 1;$bus.emit('showHeader',true)">返回</a>
    </div>
    <h2 class="f36 color-000">{{$route.query.game_name}}</h2>

</div>
<!--上传图片-->

<uploadComponents
        ref="upload"
        :server="upload.server"
        :api="upload.api"
        :params="upload.params"
        :success="upload.success"
        :file.sync="upload.file"
        :crop="upload.crop"
        :width="upload.width"
        :height="upload.height"
        :ok="upload.ok"
        :cancel="upload.cancel"
        :filename="upload.filename"
        >
</uploadComponents>


<!--底部确认是否发布商品-->
<div class="release  trlect-btn">
    <a class="next" @click="nextStep()">
        <!--未上传图片的时候背景色为灰色，只需要去掉“bg-f54”类名-->
        <input :class="{'bg-f54':isUpload} " type="button" value="下一步">
    </a>
</div>
</div>

<div v-show="step === 3 ">
   
   <div class="fixedFill-mx"></div>
    <!--top-->
    <div class="top-header border-bottom fixed-top">
        <div class="top-back">
            <a @click="step = 2">返回</a>
        </div>
        <h2 class="f36 color-000">填写验证信息</h2>
    </div>

    <div class="order-container bg-fff f30 color-000 border-bottom " v-for="v in sourceData.GameProList">
        <span>{{v.Title}}</span>
        <input maxlength="20" type="text" :placeholder="'请输入' + v.Title" v-model="v.Value">
    </div>
    <!--底部确认是否发布商品-->
    <div class="release  trlect-btn border-top">
        <a class="next" @click="nextStepPublish()">
            <!--未上传图片的时候背景色为灰色，只需要去掉“bg-f54”类名-->
            <input class="bg-f54" type="button" name="" value="下一步">
        </a>
    </div>
</div>
   

 <div  v-show="step === 4">
    <!--top-->
   <!-- <div class="fixedFill-mx"></div> -->
    <div class="top-header border-bottom fixed-top">
        <div class="top-back">
            <a @click="back()">返回</a>
        </div>
        <h2 class="f36 color-000">填写验证信息</h2>
    </div>
  
    <div class="order-container bg-fff f30 border-bottom mt-97">
        <span>游戏帐号</span>
        <input maxlength='20' type="text" placeholder="请输入游戏帐号" v-model="sourceData.GameAccount">
    </div>
    <div class="order-container bg-fff f30 border-bottom">
        <span>游戏密码</span>
        <input maxlength='20' type="text" placeholder="请输入游戏密码" v-model="sourceData.GamePassword">
    </div>
    <div class="order-container bg-fff f30 border-bottom">
        <span>手机号码</span>
        <input maxlength='20' type="tel" placeholder="请输入手机号码" v-model="sourceData.ContactMobile">
    </div>
    <div class="order-container bg-fff f30 border-bottom">
        <span>QQ号</span>
        <input maxlength='20' type="tel" placeholder="请输入QQ号" v-model="sourceData.ContactQQ">
    </div>
    <div class="order-container bg-fff f30 border-bottom py-15">
        <span class="nkre fl">发布期限</span>
        <em class="nkre fr">天</em>
        <span class="list fr mr-30" id="buyCountSpan">
            <em><a id="xxredu" class="ch_redu_hov" @click="sub()"></a></em>
            <input class="char-fabu f30" readonly= "true " type="tel" v-model="sourceData.AvailableDay">
            <em><a id="xxadd" class="ch_add" @click="add()"></a></em>
        </span>
        
    </div>
   <!--  <div class="order-container bg-fff f30 border-bottom">
        <span>我已阅读并同意<a href="http://aid.5173.com/sjyxjy_01/sjyxjjxy_6/1422.html" target="_blank" class="color-05e">《5173交易协议》</a></span>
        <em class="seqk-ico fr seqk-ico-hov"></em>
    </div> -->
    <!--底部确认是否发布商品-->
    <div class="release mt-20 trlect-btn border">
        <a class="next" @click="publish()">
            <input class="bg-f54" type="button"   :class="{'button-disable':buttonStatus}"
                               :value="buttonText">
        </a>
    </div>
</div>
</div>
</template>
<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex';
import api from '../../../../api';
import selectComponents from './select.vue';
import uploadComponents from 'components/common/upload/upload.vue';
	export default{
		data(){
			return{
				sourceData:{},
				gameName1:'',
        gameName2:'',
        gameName3:'',
        modify:this.$route.query.modify,
        step:1,
        isUpload:true,
        uploadImgCount:0,
        upload: {
            server: "/api/mobile-mainGoods-service/rs/mainGoods/sendImg",
            api: "",
            preview: true,
            crop: false,
            width: 400,
            height: 400,
            cancel: "取消",
            filename:'file',
            success:(data,i)=>this.uploadSuccess(data,i)
        },
        buttonText:'发布',
        buttonStatus:false
			}
		},
		created(){
		 let vm = this;
         vm.$bus.emit('headerText','填写商品描述');
         // if (vm.modify) {
         //     vm.updatemaingoodsonline();
         // }else{
		     vm.initMainGoods();
         //}
		},
    components: {
        selectComponents,
        uploadComponents
    },
    computed:{
        ...mapState({
            publicStatePc:state =>{
                return state.memberSeller.publicStatePc;
            }
        })
    },
   mounted:function(){
          let vm = this;
          vm.$bus.emit('isBack',true);
      },
		methods:{
            ...mapActions({
                setUpdateStatus:'member/MEMBER_SELLER_GOODS_UPDATE_STATUS'
            }),
            Replace(){
                let vm = this;
                vm.sourceData.Price = vm.sourceData.Price.replace(/[^\d.]/g, "").
                //只允许一个小数点
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

            },
            sub(){
                let vm = this;
                if (vm.sourceData.AvailableDay<=1) {
                    return;
                };
                --vm.sourceData.AvailableDay;
            },
            add(){
                let vm = this;
                if (vm.sourceData.AvailableDay >= 33) {
                  return;
                };
                ++vm.sourceData.AvailableDay;
            },
            updatemaingoodsonline(){
                let vm = this;
                let params ={
                    goodsId:vm.$route.query.goodsId,
                    isOnline:false
                }
                api.memberSeller.updatemaingoodsonline(params)
                    .then((res)=>{
                        if (res.data.success) {
                            vm.initMainGoods();
                        };
                })  
            },
            nextUpload:function  () {
                let vm = this;
                if (!vm.checkParams()) {
                    return;
                };
                vm.sourceData.GameRole =[vm.gameName1,vm.gameName2,vm.gameName3];

                vm.step = 2;
                vm.$bus.emit('showHeader', false);
             },
             nextStep:function  () {
                 let vm  = this;
                 if (!vm.isUpload) {
                    return;
                 };

                 if (vm.$children[0].list && vm.$children[0].list.length > 0) {
                    vm.sourceData.ImageList = []; 

                    for(let item of vm.$children[0].list){
                        vm.sourceData.ImageList.push({
                            ThumbnailsUrl:item.sImgUrl,
                            OriginalUrl:item.bigPicUrl
                        })
                    }
                 };

                 if (vm.sourceData.ImageList.length <= 0) {
                    vm.$toast('请上传图片');
                    return;
                 };

                 if (vm.sourceData.GameProList.length > 0) {
                     vm.step = 3;
                 }else{
                     vm.step = 4;
                 }
             },
             nextStepPublish:function  () {
                 let vm = this;


                 for(let item of vm.sourceData.GameProList){

                    if (item.IsRequire && !item.Value) {
                      vm.$toast(`请输入${item.Title}`);
                      return false;
                    };

                    if (item.ValiadRegex) {
                      let reg = new RegExp(item.ValiadRegex);
                      if (!reg.test(item.Value)) {
                        vm.$toast(`请输入正确的${item.Title}`);
                        return false;
                      };
                    };
                    let selectItem = vm.sourceData.GameProVerList.find(x=>x.Key === item.Field);
                    if (selectItem) {
                        selectItem.Value = item.Value;
                    }else{
                        vm.sourceData.GameProVerList.push({
                            Key:item.Field,
                            Value:item.Value
                        });
                    }
                 }
                 vm.step = 4;
             },
             checkGamePro(){
                let vm = this;

             },
             back(){
                 let vm  = this;
                 if (vm.sourceData.GameProList.length > 0) {
                     vm.step = 3;
                 }else{
                    vm.step = 2;
                 }
             },
             checkParams(){
                let vm = this;

                if (!vm.sourceData.Title) {
                    vm.$toast('请填写商品标题');
                    return false; 
                };
                if (!vm.sourceData.Price) {
                    vm.$toast('请填写出售价格');
                    return false; 
                };
                if (vm.sourceData.Price < vm.sourceData.MinPrice) {
                   vm.$toast(`请输入不能小于${vm.sourceData.MinPrice}的价格`);
                   return false; 
                };
                if (!vm.sourceData.GameAccount) {
                    vm.$toast('请填写游戏帐号');
                    return false; 
                };
                if (!vm.sourceData.GamePassword) {
                    vm.$toast('请填写游戏密码');
                    return false; 
                };
                for(let item of vm.sourceData.BizCategoryPropertyList){
                    if (item.AppCategoryProperty.IsRequired) {
                        let entity = vm.sourceData.BizCategoryPropertyVerList
                                    .find(x=>x.Key === item.AppCategoryProperty.FieldName);
                        if (!entity.Value) {
                            vm.$toast('请选择或填写' + item.AppCategoryProperty.Name);
                            return false;
                        };
                    };
                }

                return true;
             },
             async publish(){
                let vm = this;
                let params = {...vm.sourceData};

                delete params.BizCategoryPropertyList;
                delete params.GameProList;
                delete params.ImgList;
                delete params.GameServerName;
                delete params.OperatorName;
                delete params.GamePlatformName;
                delete params.GameName;
                delete params.CategoryName;
                delete params.BizOfferTypeName;
                delete params.MinPrice;

                vm.buttonText = '修改中'
                if (!vm.buttonStatus) {
                       vm.buttonStatus = true;
                       await  api.memberSeller.updatePcGoods({data:JSON.stringify(params)})
                       .then((res)=>{
                        if (res.data.success) {
                            vm.$toast('修改成功');
                            vm.setUpdateStatus(true);
                            vm.$router.push({name:'SellerGoodsListOfPc',query:{status:vm.publicStatePc.status}})
                        }else{
                            vm.$toast(res.data.responseStatus.message);
                        }
                     }); 
                }
                    vm.buttonStatus = false;
                    vm.buttonText = '修改成功'
             },
             uploadSuccess:function  (data,i) {
                 let vm = this;
                 if (data) {
                
                 let entity = {sImgUrl:data.imgs.small_pic,
                               bigPicUrl:data.imgs.big_pic}

                    if (vm.$refs.upload.list) 
                    {
                        vm.$refs.upload.$emit('getImg',entity);
                    }
                 vm.isUpload =vm.uploadImgCount === i || false;

              }else{
                vm.$toast('只能上传18张图片,请删除一张后再尝试!');
              }

             },
      			initMainGoods:function  () {
      				let vm = this;
      				let params={
      					goodsId:vm.$route.query.goodsId
      				}
      				api.memberSeller.initMainGoods(params)
      					.then((res)=>{
      						if (res.data.success) {
      							vm.sourceData = JSON.parse(res.data.result);
                                  vm.sourceData.ImageList = [];
                                  //处理角色名,最多只有3个
                                  if (!vm.sourceData) {
                                      //vm.$router.go(-1);
                                      return;
                                  };
                                  console.log(vm.sourceData);
                                  vm.sourceData.GameRole =vm.sourceData.GameRole || [];
                                  if(vm.sourceData.GameRole && vm.sourceData.GameRole.length > 0){
                                     vm.gameName1 = vm.sourceData.GameRole[0] || '';
                                     vm.gameName2 = vm.sourceData.GameRole[1] || '';
                                     vm.gameName2 = vm.sourceData.GameRole[2] || '';
                                  }
      							
                                  //处理动态属性
                                  for(let item of vm.sourceData.BizCategoryPropertyList){
                                      
                                      let selectItem = vm.sourceData.BizCategoryPropertyVerList
                                              .find(x=>x.Key === item.AppCategoryProperty.FieldName);

                                      if (selectItem) {
                                          item.selectItem = selectItem || {};
                                      }else{
                                          item.selectItem = {};
                                      }

                                       //多选状态下
                                      if (item.AppCategoryProperty.PropertyType === 2) {
                                         var arr =[];
                                          if (selectItem) {
                                             arr = selectItem.Value.split(',');
                                          };
                                          item.List = [];
                                          for(let childItem of item.Names){
                                              item.List.push({
                                                  name:childItem,
                                                  selected:arr.find(x=>x === childItem)?true:false
                                              })
                                          }
                                      };
                                  }
                                  //图片处理
                                  for(let item of vm.sourceData.ImgList){
                                      if (vm.$children[0].list) {
                                          vm.$children[0].list.push({
                                               sImgUrl:item.small_pic,
                                               bigPicUrl:item.big_pic
                                          });
                                      };
                                      vm.sourceData.ImageList.push({
                                          ThumbnailsUrl:item.small_pic,
                                          OriginalUrl:item.big_pic
                                      })
                                  }

      						};
      				})
      			}
		}
	}
</script>
<style src="css/common/publish-cl.css" scoped></style>
<style type="text/css" scoped>
	  .fixedFill-mx {
        width: 100%;
        height: .96rem;
    }
     .show {
        display: block !important;
    }
    .order-container input{
      left: 2.6rem;
    }
    .nkre{
          line-height: 0.82rem;
          display: inline-block;
    }
</style>