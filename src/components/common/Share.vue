<template>
    <div id="share">
        <!-- 分享 -->
        <transition name="bottom-fade">
            <div class="frs-share bg-fff fw fixed-bottom" v-if="shareShow">
                <div class="frs03 fw ">
                    <h3 class="fw f30">分享到</h3>
                    <a class="fr-wx f28" @click="ShareWx()"><em></em>微信</a>
                    <a class="fr-friend f28" @click="ShareWx()"><em></em>朋友圈</a>
                    <a class="fr-qq f28" @click="ShareQq()"><em></em>QQ好友</a>
                    <a class="fr-zone f28" @click="ShareZone()"><em></em>QQ空间</a>
                    <p class="fr-cancel border-top fw f32" @click="maskClick">取消</p>
                </div>
            </div>
        </transition>
        <div class="maskdiv" v-show="shareShow" @click="maskClick"></div>
        <transition name="slide-fade">
            <div class="share-doc top-header" ref="zin" v-show="shareDocShow">
                <div class="top-header border-bottom">
                    <div class="top-back"><a @click="BackClick"></a></div>
                    <h2 class="f36">微信分享</h2>
                    <div class="top-right"></div>
                </div>
                <div class="fw mt-30">
                    <div class="share-code fw">
                        <h3>长按二维码<span>保存图片或拷贝</span>后，发送给微信好友</h3>
                        <div id="qrcontainer">
                            <qrcode :size="qrcodeOption.size" :level="qrcodeOption.level"
                                    :text="qrcodeOption.text"></qrcode>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    /*
     * share组件的使用方法：*

     * mounted() {
     *   this.$bus.emit('isShare', true) //不要在created触发
     * },
     * beforeDestroy() {
     *   this.$bus.emit('isShare', false) //销毁前关闭
     this.$bus.emit('shareShow', false)
     this.$bus.emit('shareHead', false)
     * },

     *按以下方法在调用时传入数据，QQ和Qzone用的同一套数据*

     * this.$bus.emit('busShareQq',{
     *  url: string   //如果不传则自动读取浏览器当前地址
     *  title: string,  //分享的标题
     *  summary: string，//分享的简介
     *  pics: string  //图片地址，可不传
     * })
     */
    import qrcode from './Qrcode'
    export default {
        data() {
            return {
                shareShow: false,
                shareDocShow: false,
                qrcodeOption: {
                    size: 300,
                    text: 'https://m.5173.com',
                    level: 'H'
                },
                shareQqData: {},
                shareQqUrl: '',
                shareQzoneData: '',
            }
        },
        components: {
            qrcode
        },
        created() {
            //this.$bus.emit('isShare', true)
        },
        mounted() {
            this.$bus.on('shareShow', dis => {
                this.shareShow = dis
            })
            this.$bus.on('busShareQq', dis => {
                this.shareQqData = dis
            })
            this.$bus.on('busShareQZone', dis => {
                this.shareQzoneData = dis
            })
            this.$bus.on('busShareUrl', dis => {
                this.qrcodeOption.text = dis
            })
            this.$nextTick(() => {
                if (this.$refs.zin) {
                    this.$refs.zin.style.height = document.documentElement.getBoundingClientRect().height + 'px'
                }
                this.qrcodeOption.text = window.location.href
            })


        },
        watch: {
            shareQqData () {
                this.Concat()
            },
            shareShow(val) {
                if (val) {
                    this.$bus.emit('botcls', 'abs-bottom')
                    this.$parent.$el.addEventListener('touchmove', this.prede, false);
                } else {
                    this.$bus.emit('botcls', 'fixed-bottom')
                    this.$parent.$el.removeEventListener('touchmove', this.prede, false);
                }
            }
        },
        methods: {
            maskClick() {
                this.shareShow = false
                this.$bus.emit('shareHead', false)
            },
            ShareWx () {
                this.shareShow = false
                this.$bus.emit('shareHead', false)
                this.shareDocShow = !this.shareShow
            },
            ShareQq () {
                window.location.href = 'http://connect.qq.com/widget/shareqq/index.html?url=' + this.shareQqUrl;
            },
            ShareZone () {
                window.location.href = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + this.shareQqUrl;
            },
            BackClick () {
                this.shareDocShow = false;
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


</style>
