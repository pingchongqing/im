<template>
    <div>
        <div id="demo" :style="{height:boxHeight}" style="background: #000 !important;">
            <!-- 遮罩层 -->
            <div class="container" v-show="panel">
                <div :style="picStyle" id="picbox">
                    <img id="image" :src="url" alt="Picture" style="display: block">
                </div>
                <button type="button" id="button" @click="crop">确定</button>

            </div>


            <div class="top-header border-bottom fixed-top">
                <div class="top-back">
                    <a @click="go"></a>
                </div>
                <h2 class="f36 text-left">头像</h2>
                <div class="top-right mr-30">
                    <a href="javascript:void(0);" class="input-file button01 bg-m1 color-fff f32 text-center">更换</a>
                    <input type="file" id="change" accept="image/*" @change="change">
                </div>
            </div>
            <div class="recharge-content bg-fff color-000 mt-30 ">
                <div class="recharge-tx" id="member-tx" :style="txStyle" style="height:7.5rem;"><img id="img" :src="imgTopUrl"></div>
                <div class="hide" id="clipArea"></div>
            </div>
        </div>

    </div>
</template>
<script>
    import Cropper from 'cropperjs'
    import api from '../../../api'
    export default {
        components: {

        },
        data () {
            return {
                headerImage:'',
                picValue:'',
                cropper:'',
                croppable:false,
                panel:false,
                url:'',
                imgTopUrl:"",//头像
                txStyle:{
                    opacity:1,
                    marginLeft:"",
                    marginTop:"",
                    position:"fixed",
                    zIndex:"55"
                },
                picStyle:{
                    marginTop:""
                },
                boxHeight:""
            }
        },
        mounted () {
            //设置样式
            //初始化这个裁剪框
            var self = this;
            var image = document.getElementById('image');
            this.cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                background:false,
                zoomable:false,
                ready: function () {
                    self.croppable = true;
                }
            });
            this.boxStyle();
        },
        created(){
            var vm = this;
            vm.$getAccount().then(account=>{
                if(account){
                    if(account.avatarUrl){
                        vm.imgTopUrl = account.avatarUrl;
                    }else{
                        vm.imgTopUrl = "https://m.5173.com/images/Icon/tx_nologin.png";
                    };
                }
            });
        },
        methods: {
            boxStyle(){
                let self = this;
                var clieHeight = document.documentElement.clientHeight;
                self.boxHeight = clieHeight + "px";
                var txHeight = document.getElementById("member-tx").clientHeight;
                setTimeout(function () {
                    var txWidth = document.getElementById("member-tx").clientWidth;
                    var winWidth = document.documentElement.clientWidth;
                    if(txWidth<winWidth){
                        self.txStyle.marginLeft = ((winWidth-txWidth)/2) + "px";
                    }else if(txWidth==0){
                        self.txStyle.marginLeft = ((winWidth-txWidth)/6) + "px";
                    }
                },400);

                this.txStyle.marginTop = ((clieHeight-txHeight)/2) + "px";
            },
            getObjectURL (file) {
                var url = null ;
                console.log(file);
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            },
            change (e) {
                let self = this;
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                self.panel = true;
                self.picValue = files[0];
                self.url = self.getObjectURL(self.picValue);
                //每次替换图片要重新得到新的url
                if(self.cropper){
                    self.cropper.replace(self.url);
                };
                setTimeout(function () {
                    var clieHeight = document.documentElement.clientHeight;
                    var picRopper = document.getElementsByClassName("cropper-container");
                    console.log(picRopper[0].clientHeight);
                    console.log(clieHeight);
                    console.log((clieHeight-picRopper[0].clientHeight)/2-60);
                    if(((clieHeight-picRopper[0].clientHeight)/2-60)<0){
                        self.picStyle.marginTop = "0px";
                    }else{
                        self.picStyle.marginTop = ((clieHeight-picRopper[0].clientHeight)/2-60) + "px";
                    }
                    self.panel = true;
                },150);



            },
            crop () {
                var croppedCanvas;
                var roundedCanvas;

                if (!this.croppable) {
                    return;
                }
                // Crop
                croppedCanvas = this.cropper.getCroppedCanvas();
                console.log(this.cropper)
                // Round
                roundedCanvas = this.getRoundedCanvas(croppedCanvas);

                console.log(roundedCanvas)

                this.headerImage = roundedCanvas.toDataURL();

                this.updateTx();

            },
            updateTx(){
                api.user.updateFace(this.headerImage).then((data)=>{
                    if(data.body.success && data.body.responseStatus.message == "操作成功"){
                        location.href = "/vue/center/member-setup-info"
                    }else{
                        this.$toast(data.body.responseStatus.message);
                    }
                });
            },
            getRoundedCanvas (sourceCanvas) {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                if(sourceCanvas.width>750){
                    var width = sourceCanvas.width/4;
                    var height = sourceCanvas.height/4;
                }else{
                    var width = sourceCanvas.width;
                    var height = sourceCanvas.height;
                }


                canvas.width = width;
                canvas.height = height;

                context.imageSmoothingEnabled = true;
                context.drawImage(sourceCanvas, 0, 0, width, height);
                context.globalCompositeOperation = 'destination-in';
                context.beginPath();
                context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
                context.fill();

                return canvas;
            },
            go(){
                location.href = "/vue/center/member-setup-info"
            }
        }
    }
</script>
<style src="css/user/memberTx.css"></style>
