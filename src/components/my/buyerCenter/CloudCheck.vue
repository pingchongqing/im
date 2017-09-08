<template>
    <div>
        <div id="wrapper" class="pb-200" v-show="!this.checkBox&&!this.lockShow">
            <!--顶部fixed部分-->
            <div class="fixed-top fixed-box">
                <div class="top-header border-bottom">
                    <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
                    <h2 class="f36">云验号</h2>
                    <div class="top-right"></div>
                </div>
            </div>
            <div class="yun-img-box mt-97 clearfix">
                <ul class="clear">
                    <li class="fl"  v-if="getYYH"><img src="../../../assets/images/yyhloading.gif" alt="云验号">

                    </li>
                    <li class="fl"  v-if="!getYYH"><img src="../../../assets/images/yyhbanner.jpg" alt="云验号">
                    </li>
                    <div></div>
                </ul>
            </div>
            <div class="yun-post bg-fff">
                <!--进度条-->
                <!--<div class="progress">-->
                    <!--<div class="progress-bar progress-bar-striped active" style="width: 99%;"> </div>-->
                    <!--<span>{{Percentage}}%</span>-->
                <!--</div>-->
            </div>

            <div class="bg-fff py-30">
                <!--<p class="text-center color-000 f32 "></p>-->
                <p class="f30 text-center color-m1 mt-20">{{message}}</p>
            </div>
            <div class="search-game border-bottom mt-20">
                <div class="sgame bg-fff f32">
                    <span class="color-000">登录信息</span>
                </div>
            </div>
            <div class="rechseach-titl clearfix bg-fff border-bottom px-30">
                <div class="sto_rent f30 fl">商品标题</div>
                <div class="sto_rerg f30 fr text-left color-000" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{this.goodsTitle}}</div>
            </div>
            <div class="rechseach-titl clearfix bg-fff border-bottom px-30">
                <div class="sto_rent f30 fl">区服信息</div>
                <div class="sto_rerg f30 fr text-left color-000">{{this.regionName}}</div>
            </div>
            <div class="rechseach-titl clearfix bg-fff border-bottom px-30">
                <div class="sto_rent f30 fl">登录时间</div>
                <div class="sto_rerg f30 fr text-left color-000">{{initTime(this.loginTime)}}</div>
            </div>
            <div class="rechseach-titl clearfix bg-fff border-bottom px-30">
                <div class="sto_rent f30 fl">登录次数</div>
                <div class="sto_rerg f30 fr text-left color-000">{{this.yyhCount}}/2次</div>
            </div>
            <div class="rechseach-titl clearfix bg-fff border-bottom px-30 ">
                <div class="sto_rent f30 fl">验号结果</div>
                <div class="sto_rerg f30 fr text-left sto-height">
                    <p v-for="item in this.checkRes" class=" color-000">{{initTime(item.creatTime)}}/{{doneOrFalse(item.validateState)}}</p>

                </div>
            </div>

            <!--状态1-->
            <div class="yun-confirm fixed-bottom border-top clearfix bg-fff px-30 py-25">
                <router-link :to="'/vue/buyerCenter/buyerOrder/mobgoods/'+this.orderId">
                    <a class="f36 border-radius border-666 color-666 text-center" >返回</a>
                </router-link>

            </div>
            <!--状态2-->
            <!--<div class="yun-confirm fixed-bottom clearfix bg-fff px-30 py-25">-->
            <!--<a class="color-666 f36 bg-fff fl text-center border mr-4" href="javascript:void(0)">再验一次</a>-->
            <!--<a class="color-fff f36 bg-m1 fl text-center" href="javascript:void(0)">联系客服</a>-->
            <!--</div>-->
            <!--验证失败弹框-->
            <div class="bomb-box bg-fff" v-show="dialogBoxShow" style="margin-top: -1.6rem">
                <div class="f32 color-000 text-center p-50 border-bottom">
                    <p class="lh-60">帐号登陆失败，客服将联系卖家为你提供最新的帐号截图</p>
                </div>
                <div class="bomb-one-confirm">
                    <router-link :to="'buyerOrder/mobgoods/'+orderId">
                        <a class="f32 color-m2 text-center" href="javascript:history.go(-1)">返回</a>
                    </router-link>
                </div>
            </div>

            <!--弹框背景-->
            <div class="maskDiv2" v-show="dialogBoxShow"></div>
            <!--<redfinger-js src="http://gztest.eplay.gc.com.cn/websocket/js/redfinger.min.js"></redfinger-js>-->
            <redfinger-js src="https://m.5173.com/js/redfinger.min.js"></redfinger-js>
        </div>
        <div id="redFingerPhone" v-show="this.checkBox">
            <div v-drag="greet" id="closeBox" class="clearfix">
                <div class="fl f30" id="closeRedFinger">{{initTime1(this.countTime)}}</div>
                <p class="close fl f32" @click="this.closeBox"></p>
            </div>
        </div>
        <div id="lockBox" v-show="this.lockShow">
            <img src="../../../assets/images/lock.jpg" alt="">
        </div>
    </div>

</template>

<script>
import Vue from "vue"
//import countdown from 'components/common/timecountdown'
Vue.directive('drag',//自定义指令
    {bind:function (el, binding) {
        let oDiv = el;   //当前元素
        let self = this;  //上下文
        oDiv.addEventListener("touchstart",function (e) {
            //鼠标按下，计算当前元素距离可视区的距离
            let disX = e.changedTouches[0].clientX - oDiv.offsetLeft;
            let disY = e.changedTouches[0].clientY - oDiv.offsetTop;

            oDiv.addEventListener("touchmove",function (e) {
                //通过事件委托，计算移动的距离
                let l = e.changedTouches[0].clientX - disX;
                let t = e.changedTouches[0].clientY - disY;
                //移动当前元素
                oDiv.style.left = l + 'px';
                oDiv.style.top = t + 'px';
                //将此时的位置传出去
                binding.value({x:e.pageX,y:e.pageY})
            })
            document.addEventListener("touchend",function (e) {
                document.ontouchmove = null;
                document.ontouchend = null;
            })
        })

    }
    }
);
export default {
  data() {
    return {
        threeSec:0,
        Percentage:0,
        lockShow:false,
    checkBox:false,
        validateId:"",
        goodsId:"",
        orderId:"",
        goodsTitle:"",
        regionName:"",
        yyhCount:0,
        countTime:300000,
        padCode:"",
        resultCode:0,
        webControlCode:"",
        controlIp:"",
        controlPort:0,
        sessionId:"",
        userId:0,
        getYYH:true,
        val:'',
        loginTime:0,
        endTime:0,
        interval:null,
        reloadinterval:null,
        checkRes:[],
        serviceQQ:"",
        link:false,
        redfingerInit:false,
        dialogBoxShow:false,
        message:"客官稍等,游戏登录后会自动为您加载画面",
        code:0,
        source:0,
        messageIndex:0,
        messageArr:["正在登陆游戏，平均等待时间为2-5分钟","云验号需要稳定的网络环境，建议在wifi下使用","使用云验号，需关闭手机自动旋转屏幕功能","每个账号仅可以查验2次","买家查验过程中仅有查看角色装备权限","如买家任何行为导致卖家帐号损失","则默认买家同意购买该商品，交易继续进行"],
    }
  },
  components: {
      'redfinger-js': {
          render(createElement) {
              return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
          },

          props: {
              src: { type: String, required: true },
          },
      },
  },

  watch: {

  },
    created: function created() {
        this.goodsId = this.$route.query.goodsId;
        this.validateId = this.$route.query.validateId;
        this.orderId = this.$route.query.orderId;
        this.getVideoParams()
    },
    mounted: function mounted() {
      var self = this;

        window.addEventListener("orientationchange", function() {
// Announce the new orientation number
//            alert(window.orientation);
             var redfingerDiv = document.getElementById("redFingerPhone");
             var closeBoxDiv = document.getElementById("closeBox");
             if(self.checkBox == true){
                 if(window.orientation == 90){
                     self.lockShow = true;
                     self.checkBox = false;
//                redfingerDiv.style.transform = 'rotate(-' + window.orientation + 'deg)';
//                redfingerDiv.style.width = "100%"
//                closeBoxDiv.style.transform = 'rotate(-' + window.orientation + 'deg)';
                 }else if(window.orientation == -90) {
                     self.lockShow = true;
                     self.checkBox = false;
//                redfingerDiv.style.transform = 'rotate(' + window.orientation + 'deg)';
//                redfingerDiv.style.width = "100%"
//                closeBoxDiv.style.transform = 'rotate(' + window.orientation + 'deg)';
                 }else if(window.orientation == 180){
                     self.lockShow = false;
                     self.checkBox = true;
//                redfingerDiv.style.transform = 'rotate(' + window.orientation + 'deg)';
//                redfingerDiv.style.width = "100%"
//                closeBoxDiv.style.transform = 'rotate(' + window.orientation + 'deg)';

                 }else if(window.orientation == 0){
                     self.lockShow = false;
                     self.checkBox = true;
//                redfingerDiv.style.transform = 'rotate(' + window.orientation + 'deg)';
//                redfingerDiv.style.width = "100%"
//                closeBoxDiv.style.transform = 'rotate(' + window.orientation + 'deg)';
                 }
             }else {
                 if(self.lockShow == true){
                     self.lockShow = false;
                     self.checkBox = true;
                 }
             }

//            alert(window.orientation)

        }, false);
//        self.$toast("为获得最佳的体验，请锁定屏幕旋转为竖屏后查验")
        this.getCheckHistory();
        clearInterval(this.reloadinterval);
       this.$http.get(this.$CONSTANTS.APIGoods+"goods/selectgoodsdetail",{
            params:{
                goodsId:this.goodsId
            }
        }).then(
            function (res) {
                this.goodsTitle = res.body.goodsEO.title;
               this.regionName = res.body.goodsEO.serviceProviderName+"/"+res.body.goodsEO.regionName+"/"+res.body.goodsEO.serverName
            }
        )
        this.getCloudCount();
        this.$nextTick(
            function () {
                this.onLoadCheck()
            }
        )
       this.interval = setInterval(()=>this.onLoadCheck(),1000)
        this.messageInterval = setInterval(()=>this.messageFunc(),3000)
        this.getServiceQQ()
    },

  methods: {
      messageFunc(){
        var self = this;
        self.message = self.messageArr[self.messageIndex];
        if(self.messageIndex<6){
            self.messageIndex++
        }else {
            self.messageIndex = 0;
        }
      },
      onLoadCheck(){
          var self = this;
//          var bar = document.getElementsByClassName("progress");
//         console.log("1111111111",bar.style.width)
//          self.threeSec++;
//          if (self.threeSec == 2){
//              self.Percentage++;
//              self.threeSec = 0;
//              if (self.Percentage >= 99){
//                  self.Percentage = 99
//              }
//          }
         // http://122.225.242.98:8099/CloudVerification-cloudvalidate-service/rs/valOrder/query_order_validateState?orderId=123&times=1497941705&sign=505e770097ebebbd5dc8aa3b3ad447d4
          this.$http.jsonp("https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/valOrder/query_order_validateState",{
              params:{
                  valorderId:this.validateId,
                  times:"1497941705",
                  sign:'505e770097ebebbd5dc8aa3b3ad447d4'
              },
              jsonp: 'callback'
          }).then(
              function (res) {
                  this.redfinger = window.redfinger;
                  self.loginTime = res.body.json.startTime;
                  if(res.body.json.scriptErrorCold&&res.body.json.scriptErrorCold!= 0){
                        self.dialogBoxShow=true;
//                      clearInterval(this.interval)
                      self.closeBox()
                  }
//                  if(res.body.json.validateState == 1||res.body.json.validateState == 2){
//                      self.message = "正在分配设备!"
//                  }
//                  if(res.body.json.validateState == 3||res.body.json.validateState == 4){
//                      self.message = "正在登录游戏!"
//                  }
                  if (res.body.json.validateState == 5){
                      if (self.link == false){
                          if (this.redfinger){
                              if(self.redfingerInit==false){
                                  redfinger.init();
//                                  alert()
                                  self.redfingerInit=true
                              }
                              if (self.padCode.length>1){
                                  var code1 = 0;
                                  var source1 = 0;
                                  this.link = true;
                                  }

//                                      this.play(this.padCode,this.resultCode,this.webControlCode,this.controlIp,this.controlPort,this.sessionId,this.userId)
                              }
                          }
                      if(res.body.json.ClickEventTime>0){
                          self.countTime = res.body.json.ClickEventTime-res.body.json.currentTime
                          console.log(self.countTime)
                      }
                      if(this.countTime<1000){
                          clearInterval(this.interval)
                          self.closeBox()
                          this.checkBox = false;
                          this.getYYH = false
                      }else {
                          redfinger.onReady = function (code,source) {
//                                          alert("code:"+code)
//                              self.$toast("code:"+code)
//                                          alert("source:"+source)
//                              self.$toast("source:"+source)
                              code1 = code;
                              source1 = source;
                              self.cloudCheck(code1,source1)
                          };
                      }
                  }else if(res.body.json.validateState >= 6){
                      this.closeBox()
                      this.checkBox = false;
                      this.getYYH = false
                      console.log(res.body.json.validateStateEnum)

                  }
              }
          )
      },
      doneOrFalse(status){
          if (status == 0){
              return "成功"
          }else if(status == 1){
              return "查验中"
          }else if(status == 2){
              return "失败"
          }else if (status == 3){
              return "未查验"
          }
      },
      initTime:function(needTime) {
          //needTime是整数，否则要parseInt转换
          var time = new Date(needTime);
          var y = time.getFullYear();
          var m = time.getMonth()+1;
          var d = time.getDate();
          var h = time.getHours();
          var mm = time.getMinutes();
          var s = time.getSeconds();
//          return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
          if(!needTime){
              return"暂无"
          }else {
              return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
          }

      },
      initTime1:function(needTime) {
          //needTime是整数，否则要parseInt转换
          var time = new Date(needTime);
          var y = time.getFullYear();
          var m = time.getMonth()+1;
          var d = time.getDate();
          var h = time.getHours();
          var mm = time.getMinutes();
          var s = time.getSeconds();
//          return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
          console.log("needTime",needTime)
          if(!needTime){
              return"暂无"
          }else {
              return this.add0(mm)+':'+this.add0(s);
          }

      },
      add0:function(m){
          return m<10?'0'+m:m
      },
      getServiceQQ(){
          this.$http.post(this.$CONSTANTS.APIOrder+"assignCustomServie/openServiceQQ",{
                  orderId:this.orderId,
          }).then(
              function (res) {
                  if (res.isOpenQQ==true) {
                      this.serviceQQ  = res.serviceQQ;
                  }
              }
          )
      },
      contactService(){
        if(this.serviceQQ.length>=4){
            if(/baidu/i.test(navigator.userAgent.toLowerCase())||/MicroMessenger/i.test(navigator.userAgent.toLowerCase())){
                alert("暂不支持该浏览器，请添加客服QQ："+res.serviceQQ)
            }else {
                window.location.assign('mqqwpa://im/chat?chat_type=wpa&uin=' + res.serviceQQ + '&version=1&src_type=web&web_src=oicqzone.com')
            }
        }else {
            location.href="/member/huanxin.html?orderId="+this.orderId+"&isSeller=false"
        }
      },
      getCloudCount(){
          this.$http.jsonp("https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/cloudWeb/order_count_callBalk",{
              params:{
                  orderId:this.orderId,
                  times:"1497941705",
                  sign:'505e770097ebebbd5dc8aa3b3ad447d4'
              },
              jsonp: 'callback'
          }).then(
              function (res) {
//                  console.log("22222222222",res.body.count)
                  this.yyhCount = res.body.count;
                  if ( res.body.count<=2){
                      this.getYYH = true
                  }else {
                      this.getYYH = false
                  }
              }
          )
      },

      greet(val){
          this.val = val;
      },
      loginGameCheck(){
         // http://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/valOrder/query_order?deviceId=987654321L&times=1497941705&sign=505e770097ebebbd5dc8aa3b3ad447d4
      },
      getVideoParams(){
          this.$http.jsonp("https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/device/device_video_stream_callback",{
              params:{
                  validateId:this.validateId,
                  uuid:"123456",
                  times:"1497941705",
                  sign:"505e770097ebebbd5dc8aa3b3ad447d4"
              },
              jsonp: 'callback'
          }).then(
              function (res) {
                  if(res.data.cold == 0){
                      this.padCode = res.body.json.padCode;
                      this.resultCode = res.body.json.resultCode;
                      this.webControlCode = res.body.json.webControlCode;
                      this.controlIp = res.body.json.controlIp;
                      this.controlPort = res.body.json.controlPort;
                      this.sessionId = res.body.json.sessionId;
                      this.userId = res.body.json.userId;
                      this.loginTime = res.body.json.time;
                  }else {
                      console.log(res.body.responseStatus.message);
                      clearInterval(this.interval);
                      this.reloadinterval = setInterval(()=>{
                          window.location.reload()
                      },10000)
                  }
              }
          )
      },
      getCheckHistory (){
          var self = this;
        this.$http.jsonp(
            "https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/valOrder/query_order_validate_history",
            {
                params:{
                       orderId:this.orderId,
                       times:1497941705,
                       sign:"505e770097ebebbd5dc8aa3b3ad447d4"
              },
                jsonp: 'callback'
            }
        ).then(
            function (res) {
                self.checkRes = res.data.validateOrderList
//                console.log(self.checkRes.length)
            }
        )
      },
      timeDown () {
          const endTime = new Date(this.endTime)
          const nowTime = new Date();
          let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
          let d = parseInt(leftTime/(24*60*60))
          let h = this.formate(parseInt(leftTime/(60*60)%24))
          let m = this.formate(parseInt(leftTime/60%60))
          let s = this.formate(parseInt(leftTime%60))
          if(leftTime <= 0){
              this.closeBox()
          }
          this.time = `${m}分${s}秒`
      },
      formate (time) {
          if(time>=10){
              return time
          }else{
              return `0${time}`
          }
      },
      closeBox(){
         http://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/device/close_device_connection?orderId=3333&uuid=123456&times=1497941705&sign=505e770097ebebbd5dc8aa3b3ad447d4
          this.$http.jsonp("https://yyh.5173.com/api/CloudVerification-cloudvalidate-service/rs/device/close_device_connection",{
              params:{
                  orderId:this.orderId,
                  uuid:"123456",
                  times:"1497941705",
                  sign:"505e770097ebebbd5dc8aa3b3ad447d4"
              },jsonp: 'callback'
          }).then(
              function (res) {
//                  this.getCloudCount()
              }
          )

          window.setTimeout(redfinger.destory(),1000)
          clearInterval(this.interval)
          clearInterval(this.messageInterval);
          this.checkBox = false;
          this.getYYH = false
          this.message = "验号完成，请您联系客服确认购买"
      },
        cloudCheck(code,source){
          var self = this;
          this.checkBox = true;

            this.play(this.padCode,this.resultCode,this.webControlCode,this.controlIp,this.controlPort,this.sessionId,this.userId,code,source)
        },
    play(padCode,resultCode,webControlCode,controlIp,controlPort,sessionId,userId,code,source){
    console.log("play")
        console.log("++++++++++",code)
        console.log("------------",source)
          console.log("padCode",padCode);
          console.log("webControlCode", webControlCode);
          console.log("controlIp",controlIp);
          console.log("controlPort",controlPort);
          console.log("sessionId",sessionId);
          console.log("userId",userId);
          var configInfo = {
              "padCode":padCode,
              "resultCode": 0,
              "resultInfo": {
                  "webControlList": [
                      {
                          "webControlCode": webControlCode,
                          "webControlInfoList": [
                              {
                                  "controlIp": controlIp,
                                  "controlPort": controlPort
                              }
                          ]
                      }
                  ],
                  "sessionId": sessionId,
                  "userId": userId
              }
          };
            if(code == 1 &&source <150){
//                alert("480p 标准码率")
                redfinger.play('redFingerPhone', redfinger.VIDEO_BITRATE_NORMAL, '', configInfo);
            }else if (code>1&&source>=150){
//                alert("360p 高速码率")
                redfinger.play('redFingerPhone', redfinger.VIDEO_BITRATE_HIGH_SPEED, '', configInfo);
            }
          redfinger.onOpen = function(code,result){
              console.log(code);
              if(code==102)
              {}};
//          redfinger.onTimeOut=function(code)
//          {
//              if(code==2) {
//                  window.setTimeout(redfinger.destory(),1000)
//              }
//          }
      },
  }
}
</script>
<style src="css/common/list-cl.css" scoped></style>
<style scoped>
    #lockBox{
        width: 100%;
        height: 100%;
    }
    #lockBox img{
        width: 100%;
    }
#redFingerPhone{
    width: 100%;
    height: 100%;
    z-index: 2000;
    position: fixed;
}
    #closeBox{
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        background-image: url("../../../assets/images/yyhclose.png");
        /*background: no-repeat;*/
        background-size: 1.5rem 1.5rem;
        transform:rotate(90deg);
    }
    #closeRedFinger{
        margin-top: 0.15rem;
        color: #fff;
        width: 100%;
        height: 0.62rem;
        line-height: 0.62rem;
        text-align: center;
    }
    .close{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        color: #fff;
    }
    .yun-post{ height: auto; display: block; overflow: hidden;}
    .progress{ width: 45%; margin: 0 auto; height: 0.25rem; background-color: #dedfe1; border-radius: 0.2rem; position: relative; border:1px solid #c9cacc;}
    .progress,.progress-striped .progress-bar, .progress-bar-striped {
    background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    background-image: -o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    -webkit-background-size: 0.4rem 0.4rem; background-size: 0.4rem 0.4rem;}

    .progress .progress-bar{animation: animate-positive 2s; position: absolute; top:0; left: 0; height:0.25rem; background-color: #00d2d8; border:1px solid #00abb7; border-radius: 0.2rem;-webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);box-shadow: inset 0 -1px 0 rgba(0,0,0,.15); -webkit-transition: width .6s ease;-o-transition: width .6s ease; transition: width .6s ease;}
    .progress span{position: absolute; right: -16%; height: 0.2rem; line-height: 0.2rem; font-size: 0.2rem;  color: #481c00;}
     .progress .active{ animation: reverse progress-bar-stripes 0.40s linear infinite, animate-positive 200s;}
    @-webkit-keyframes animate-positive {
        0% { width: 0%;}
    }
    @keyframes animate-positive {
        0% { width:0%; }
    }
    @-webkit-keyframes progress-bar-stripes {
    from {
        background-position: 0.40rem 0
    }

    to {
        background-position: 0 0
    }
}

@-o-keyframes progress-bar-stripes {
    from {
        background-position: 0.40rem 0
    }

    to {
        background-position: 0 0
    }
}

@keyframes progress-bar-stripes {
    from {
        background-position: 0.40rem 0
    }

    to {
        background-position: 0 0
    }
}
</style>
