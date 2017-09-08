<template>
    <div class="">
        <!--商品列表下拉-更多消息-->
        <div class="more_message border f36" v-show="moreStatus" @touchmove.prevent>
            <ul>
                <li class="list-more border-bottom" @click="messageClick"><i class="android"></i>消息</li>
                <li class="list-more border-bottom shareopen" @click="shareClick"><i class="sharew"></i>分享</li>
                <li class="list-more" @click="homeClick"><i class="home_back"></i>首页</li>
            </ul>
        </div>
        <!-- 分享 -->
        <transition name="bottom-fade">
            <div class="sharediv bg-fff" v-show="shareShow">
                <div class="sharediv03 color-666">
                    分享到
                </div>
                <div class="new-sharediv" v-if="!isUC">
                    <a class="tip2" @click="copyt" :data-clipboard-text="urlAddress"><i
                            class="new-sharediv04"></i>微信</a>
                    <a class="tip2" @click="copyt" :data-clipboard-text="urlAddress"><i
                            class="new-sharediv05"></i>朋友圈</a>
                    <a class="tip2" @click="copyt" :data-clipboard-text="urlAddress"><i class="new-sharediv06"></i>QQ好友</a>
                    <a @click="Weibo" class="mt-40">
                        <i class="new-sharediv01"></i>
                        新浪微博
                    </a>
                    <a @click="ShareZone" class="mt-40">
                        <i class="new-sharediv02"></i>
                        QQ空间
                    </a>
                    <a @click="Copy" :data-clipboard-text="urlAddress" class="mt-40 copybtn">
                        <i class="new-sharediv03"></i>
                        复制链接
                    </a>
                </div>
                <div class="new-sharediv" id="nativeShare" v-if="isUC">
                    <a data-app="weixin" class="nativeShare"><i class="new-sharediv04"></i>微信</a>
                    <a data-app="weixinFriend" class="nativeShare"><i class="new-sharediv05"></i>朋友圈</a>
                    <a data-app="QQ" class="nativeShare"><i class="new-sharediv06"></i>QQ好友</a>
                    <a data-app="sinaWeibo" class="fr-wb mt-40 nativeShare"><i class="new-sharediv01"></i>新浪微博</a>
                    <a data-app="QZone" class="fr-zone mt-40 nativeShare"><i class="new-sharediv02"></i>QQ空间</a>
                    <a class="copybtn mt-40" @click="Copy" :data-clipboard-text="urlAddress"><i
                            class="new-sharediv03"></i>复制链接</a>
                </div>
                <div @click="Cancel" class="cancel border-top f32 color-000 lh110 text-center">取消</div>
            </div>
        </transition>
        <div class="guide" v-if="isWeixin" @click="isWeixin=false"></div>
        <div class="sc-tip" v-if="otherUA"><p class="f30 color-666 text-center">网址复制成功~ 分享给好友吧</p>
            <div class="cancel border-top f32 color-000 lh110 text-center" @click="Cancel">朕知道了</div>
        </div>
        <div class="maskdiv" v-show="shareShow" @click="maskClick"></div>
        <div class="shade" v-if="hide" @click="hideShade"></div>
        <div class="shade2" v-show="shade2" @click="shadet"></div>
        <div v-show="errbox" class="errbox">
            <div class="close" @click="errboxClick"></div>
            复制链接失败，请长按复制以下链接：<br>
            {{urlAddress}}
        </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    export default {
        name: 'share',
        data() {
            return {
                moreStatus: false,
                shareShow: false,
                shareDocShow: false,
                shareQqData: {},
                shareQqUrl: '',
                shareQzoneData: '',
                urlAddress: window.location.href,
                errbox: false,
                isUC: false,
                isWeixin: false,
                otherUA: false,
                hide: false,
                shade2: false,
            }
        },
        props: ['shareUrl'],
        mounted() {
	        var self = this
	        setTimeout(function () {
		        var link = location.href;
		        var obj = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据
		        var url = '/api/mobile-category-service/rs/Inteface/getSignature?url='+link
		        obj.open('GET', url, true);
		        obj.onreadystatechange = function() {
			        if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4说明请求已完成
				        var data = JSON.parse(obj.responseText)
				        wx.config({
					        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
					        appId: 'wx0bd18cdd09002255', // 必填，公众号的唯一标识
					        nonceStr: data.noncestr, // 必填，生成签名的随机串
					        timestamp: data.timestamp, // 必填，生成签名的时间戳
					        signature: data.signature,// 必填，签名，见附录1
					        jsApiList: [
						        "onMenuShareTimeline",
						        "onMenuShareAppMessage"
					        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				        });
				        wx.error(function (res) {
//				             alert(JSON.stringify(res));
				        });
				        wx.ready(function(res) {
					        var src = '',i = 0;
					        var temp = ''
					        if(document.getElementsByTagName('img').length>0){
						        var temp = document.getElementsByTagName('img')[0].src
					        }else {
						        temp = '/dist/default_img_info.jpg'
                            }
					        // 创建对象
					        var img = new Image();
					        img.src = temp;
					        img.onload = function () {
						        i++
						        if ((img.width > 300 || img.height > 300)&&!src) {
							        src = temp
						        }else if(!src&&i<document.getElementsByTagName('img').length){
							        temp = document.getElementsByTagName('img')[i].src
							        img.src = temp
						        }else if(!src){
							        src = '/dist/default_img_info.jpg'
						        }
						        if(src){
							        var config = {
								        url: window.location.href,
								        title: document.title,
								        desc:document.title,
								        img: src,
								        img_title: '',
								        from: ''
							        };
							        self.$nativeShare('nativeShare', config);
							        wx.onMenuShareAppMessage({
								        title: document.title,
								        desc:document.title,
								        link: link,
								        imgUrl:src,
								        trigger: function(res) {},
								        success: function(res) {},
								        cancel: function(res) {},
								        fail: function(res) {}
							        });
							        wx.onMenuShareTimeline({
								        title: document.title,
								        link: link,
								        imgUrl: src,
								        trigger: function(res) {},
								        success: function(res) {},
								        cancel: function(res) {},
								        fail: function(res) {}
							        });
						        }
					        };
				        });
			        }
		        };
		        obj.send();
	        },1500)
            this.$bus.on('moreStatus', s => {
                this.moreStatus = s;
                this.shade2 = s;
            })
            this.$bus.on('shareShow', dis => {
                this.shareShow = dis
            })
            this.$bus.on('busShareQZone', dis => {
                this.shareQqData = dis
            });
            this.$bus.on('urlAddress', address => {
                this.urlAddress = address;
            })
            this.$nextTick(() => {
                if (this.$refs.zin) {
                    this.$refs.zin.style.height = document.documentElement.getBoundingClientRect().height + 'px'
                }
//                var config = {
//                    url: window.location.href,
//                    title: document.title,
//                    desc:document.title,
//                    img: '',
//                    img_title: '',
//                    from: ''
//                };
//                this.$nativeShare('nativeShare', config);
            });
            var UA = navigator.appVersion;
            //var isqqBrowser = (UA.split("MQQBrowser/").length > 1);
            //var isucBrowser =;
            //alert(navigator.userAgent.toLowerCase());
            if ((/MQQBrowser/i.test(navigator.userAgent.toLowerCase())&& !/MicroMessenger/i.test(navigator.userAgent.toLowerCase())) ||  /UCBrowser/i.test(navigator.userAgent.toLowerCase())) {

                //alert('是UC或者QQ浏览器');
                this.isUC = true;
            }
        },
        destroyed(){
            this.$bus.emit('moreStatus', this.moreStatus);
        },
        watch: {
            shareUrl(val) {
                if (val) {
                    this.urlAddress = val
                }
            },
            shareQqData () {
                this.Concat()
            },
            moreStatus(){

            },
            shareShow(val) {
                if (val) {
                    this.$parent.$el.addEventListener('touchmove', this.prede, false);
                } else {
                    this.$parent.$el.removeEventListener('touchmove', this.prede, false);
                }
            }
        },
        methods: {
            shareClick() {
                //this.shareStatus = true
                this.shareShow = true
                this.moreStatus = false
                this.$bus.emit('busShareUrl', window.location.href)
            },
            homeClick() {
                location.href = '/'
            },
            messageClick() {
                location.href = '/vue/message'
            },
            errboxClick() {
                this.errbox = false
                this.hide = false
            },
            maskClick() {
                this.shareShow = false
                this.$bus.emit('moreStatus', this.moreStatus);
                this.$parent.moreShow = false;
            },
            Weibo() {
                window.location.href = 'http://service.weibo.com/share/mobile.php?url=' + this.shareQqUrl
            },
            Copy() {
                var clipboard = new Clipboard('.copybtn');
                //alert(Clipboard.isSupported());
                if (Clipboard.isSupported()) {
                    clipboard.on('success', e => {
                        this.$toast('复制链接成功')
                        this.shareShow = false
                        this.moreStatus = false;
                        this.$bus.emit('moreStatus', this.moreStatus);
                        e.clearSelection();
                    });
                } else {
                    this.$toast('复制链接失败')
                    this.shareShow = false
                    this.errbox = true
                }

                /* clipboard.on('error', e => {
                 this.$toast('复制链接失败')
                 this.shareShow = false
                 this.errbox = true
                 });*/
            },
            copyt(){
                this.shareShow = false;
                //var ua = navigator.userAgent.toLowerCase();
               // if (ua.match(/MicroMessenger/i) == "micromessenger") {
                if (/MicroMessenger/i.test(navigator.userAgent.toLowerCase())) {
                    this.isWeixin = true;
                    this.shade2=false;
                } else {
                    var clipboard = new Clipboard('.tip2');
                    if (Clipboard.isSupported()) {
                        clipboard.on('success', e => {
                            this.$toast('复制链接成功')
                            this.otherUA = true;
                            this.moreStatus = false;
                            this.hide = true;
                            this.$bus.emit('moreStatus', this.moreStatus);
                            e.clearSelection();
                        });
                    } else {
                        this.$toast('复制链接失败');
                        this.hide = true;
                        this.errbox = true
                    }


                    /*clipboard.on('error', e => {
                     this.$toast('复制链接失败');
                     this.hide = true;
                     this.errbox = true
                     });*/
                }
            },
            Cancel(){
                this.shareShow = false;
                this.otherUA = false;
                this.hide = false;
                this.$bus.emit('moreStatus', this.moreStatus);
            },
            hideShade(){
                this.hide = false;
                this.otherUA = false;
                this.errbox = false;
                this.$bus.emit('moreStatus', this.moreStatus);
                this.$parent.moreShow = false;
            },
            shadet(){
                this.shade2 = false;
                this.moreStatus = false;
                this.$bus.emit('moreStatus', this.moreStatus);
                this.$parent.moreShow = false;
                console.log(this.$parent.moreShow);
            },
            ShareZone () {
                window.location.href = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.shareQqUrl
            },
            prede(event) {
                if (event.cancelable) {
                    // 判断默认行为是否已经被禁用
                    if (!event.defaultPrevented) {
                        event.preventDefault();
                    }
                }
            },
            Concat () {
                var url = this.shareQqData.url ? this.shareQqData.url : encodeURIComponent(window.location.href);
                var title = this.shareQqData.title ? this.shareQqData.title : '';
                var summary = encodeURIComponent(this.shareQqData.summary ? this.shareQqData.summary : '');
                var pics = this.shareQqData.pics ? this.shareQqData.pics : '';
                var desc = this.shareQqData.desc ? this.shareQqData.desc : '';
                var hlink = url + '&desc=' + desc + '&title=' + title + '&summary=' + summary + '&pics=' + pics + '&flash=&site=&style=201&width=50&height=50'
                this.shareQqUrl = hlink
            },
        }
    }
</script>


<style scoped>
    .errbox {
        background: #fff;
        padding: .5rem;
        line-height: .4rem;
        position: fixed;
        bottom: 0;
        z-index: 999;
        word-break: break-all;
    }

    .errbox .close {
        background: url(~images/fortun-close.png) no-repeat;
        height: .3rem;
        width: .3rem;
        position: absolute;
        top: .3rem;
        right: .3rem;
        background-size: 100%;
    }

    .bottom-fade-enter-active {
        transition: all .3s ease;
    }

    .bottom-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .bottom-fade-enter, .bottom-fade-leave-active {
        transform: translateY(100px);
        opacity: 0;
    }

    .frs-share {
        z-index: 101;
    }

    .frs-share p {
        line-height: 1.1rem;
        text-align: center;
        margin-top: .5rem;
    }

    .frs-share .frs03 {
        background: #fff;
        padding: .3rem .15rem;
    }

    .frs-share .frs03 h3 {
        color: #666;
        text-align: center;
        margin-bottom: .2rem;
    }

    .frs-share .frs03 a {
        float: left;
        width: 25%;
        color: #333;
        text-align: center;
    }

    .frs-share .frs03 a em {
        display: block;
        width: 1.1rem;
        height: 1.1rem;
        line-height: 1.1rem;
        text-align: center;
        border-radius: 15%;
        margin: .2rem auto;
    }

    .frs-share .frs03 a.fr-wx em {
        background: url(~images/recharge/rech-weix.png) center center no-repeat;
        background-size: 1.08rem;
    }

    .frs-share .frs03 a.fr-friend em {
        background: url(~images/recharge/rech-pyq.png) center center no-repeat;
        background-size: 1.08rem;
    }

    .frs-share .frs03 a.fr-qq em {
        background: url(~images/recharge/rech-qq.png) center center no-repeat;
        background-size: 1.08rem;
    }

    .frs-share .frs03 a.fr-zone em {
        background: url(~images/recharge/rech-kongj.png) center center no-repeat;
        background-size: 1.08rem;
    }

    .share-code {
        padding: .15rem .3rem;
        box-sizing: border-box;
    }

    .share-code h3 {
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
        color: #000;
    }

    .share-code h3 span {
        color: #f65e47;
    }

    .share-code #qrcontainer {
        margin-top: .5rem;
        margin: 0 auto;
        text-align: center;
        max-width: 768px;
    }

    .share-code #qrcontainer canvas {
        min-width: 80%;
        min-height: 5.4rem;
        margin-top: .5rem;
        max-width: 768px;
    }

    .share-code #qrcontainer img {
        min-width: 80%;
        min-height: 5.4rem;
        margin-top: .5rem;
        max-width: 768px;
    }

    .share-doc {
        z-index: 80;
        top: 0;
        position: fixed;
    }

    .maskdiv {
        z-index: 62 !important;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for <2.1.8 */
    {
        transform: translateX(100%);
        opacity: 0;
    }

    .shade2 {
        z-index: 48;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #000;
        filter: alpha(opacity=50);
        opacity: .5;
        overflow-x: hidden;
        overflow-y: auto;
    }

</style>
