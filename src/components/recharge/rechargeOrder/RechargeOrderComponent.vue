<template id='recharge-order-template'>
    <div ref="rechargeMain" class="recharge">
        <div class="recharge-main" v-if="publishEO.rechargeType===2" :style="{ 'height': tabHeight + 'px'}">
            <recharge-order-header :publishEO="publishEO" @click.native="mskclick"></recharge-order-header>
            <div class="recharge-content color-000 mb-20 bg-fff">
                <div class="rechcon-list">
                    <input-component
                            :iclass="'rest-fabu'"
                            v-model="serverName"
                            :title="'所在区服'"
                            required
                            :max="50"
                            @on-focus="ListFocus"
                            @on-blur="otherBlur"
                            placeholder="请输入区服"></input-component>
                    <ul class="select" v-show="listShow && filterList.length>0">
                        <li v-for="elem in filterList" @mousedown="ListClick(elem)">{{elem.serverName}}</li>
                    </ul>
                    <div class="selectmsk" @click="mskclick" v-show='msk'></div>
                    <input-component
                            :iclass="'rest-fabu'"
                            v-model="buyerRoleName"
                            required
                            :title="'游戏角色名'"
                            :max="50"
                            @on-focus="otherFocus"
                            @on-blur="otherBlur"
                            placeholder="游戏角色名"></input-component>
                </div>
            </div>
            <div class="recharge-content color-000 border-top bg-fff mb-20">
                <div class="rechcon-list">
                    <textarea-component
                            v-model="remark"
                            :iclass="'chorder mt-20'"
                            :max="500"
                            @on-focus="otherFocus"
                            @on-blur="otherBlur"
                            placeholder=" 请输入备注信息，如：职业、性别"></textarea-component>
                </div>
            </div>

            <div class="recharge-content color-000 border-top bg-fff">
                <div class="rechcon-list">
                    <input-component
                            :iclass="'rest-fabu'"
                            v-model="buyerPhone"
                            required
                            :isType="'china-mobile'"
                            :title="'我的手机号'"
                            @on-focus="otherFocus"
                            @on-blur="otherBlur"
                            @BackValid="aBackValid"
                            placeholder="请输入手机号码"></input-component>

                </div>
            </div>
        </div>


        <div class="recharge-main" v-if="publishEO.rechargeType===1" :style="{ 'height': tabHeight + 'px'}">
            <recharge-order-header :publishEO="publishEO"></recharge-order-header>
            <div class="recharge-content color-000 mb-20 bg-fff mt-20">
                <div class="rechcon-list">
                    <number-component
                            :title="'购买数量'"
                            v-model="num"
                            :width="'1.21rem'"
                            :min="1"></number-component>
                      <input-component
                              :iclass="'rest-fabu'"
                              v-model="serverName"
                              :title="'所在区服'"
                              required
                              :max="50"
                              @on-focus="ListFocus"
                              @on-blur="otherBlur"
                              placeholder="请输入区服"></input-component>
                      <ul class="select" v-show="listShow && filterList.length>0">
                          <li v-for="elem in filterList" @mousedown="ListClick(elem)">{{elem.serverName}}</li>
                      </ul>
                      <div class="selectmsk" @click="mskclick" v-show='msk'></div>
                </div>
            </div>
            <div class="recharge-content color-000 border-top mb-20 bg-fff">
                <div class="rechcon-list">
                    <input-component
                            :iclass="'rest-fabu'"
                            v-model="buyerRoleAccount"
                            :title="'游戏帐号'"
                            required
                            :max="50"
                            @on-focus="otherFocus"
                            @on-blur="otherBlur"
                            placeholder="请输入游戏帐号"></input-component>
                    <input-component
                            :iclass="'rest-fabu'"
                            v-model="buyerRolePwd"
                            :title="'游戏密码'"
                            required
                            :max="50"
                            @on-focus="otherFocus"
                            @on-blur="otherBlur"
                            placeholder="请输入游戏密码"></input-component>
                    <input-component
                            :iclass="'rest-fabu'"
                            v-model="buyerRoleName"
                            :title="'游戏角色名'"
                            required
                            :max="50"
                            @on-focus="otherFocus"
                            @on-blur="otherBlur"
                            placeholder="请输入游戏角色名"></input-component>
                </div>
            </div>
            <div class="recharge-content color-000 border-top bg-fff">
                <div class="rechcon-list">
                    <input-component
                            :iclass="'rest-fabu'"
                            v-model="buyerPhone"
                            required
                            :title="'我的手机号'"
                            :isType="'china-mobile'"
                            @on-focus="otherFocus"
                            @on-blur="otherBlur"
                            @BackValid="aBackValid"
                            placeholder="请输入手机号码"></input-component>
                </div>
            </div>
            <div class="recharge-notes f26 color-666 px-30 py-30">注：充值期间请勿登录游戏，如果顶号导致充值失败则由您自己负责。</div>
        </div>

        <div class="border-top " :class="botcls" ref="rechargeFooter">
          <div class="recharge-btn px-30 py-30 bg-fff">
                    <span class="btn-payment f32 color-000">实付：<i class="f36 color-m1">￥</i><em class="f48 color-m1"
                                                                                                v-if="!isNaN(getTotalAmount)">{{getTotalAmount}}</em></span>
                <a class="f36 bg-f54 color-fff btn-a" @click="Submit" v-if="getTotalAmount">立即购买</a>
            </div>
        </div>


        <loadingComponent></loadingComponent>
    </div>
</template>

<script type="text/ecmascript-6">
    import loadingComponent from '../../common/Loading.vue'
    import rechargeOrderHeader from './RechargeOrderHeader.vue'
    import {InputComponent, TextareaComponent, NumberComponent} from '../../common/formComponent'
    export default {
        template: '#recharge-order-template',
        data() {
            return {
                labelWidth: '1.8rem',
                queryData: {},
                publishEO: {},
                buttonDisable: true,
                buyerRoleAccount: '',
                buyerRolePwd: '',
                buyerRoleName: '',
                serverName: '',
                buyerPhone: '',
                num: 1,
                totalAmount: '',
                remark: '',
                iconType: '',
                error: '',
                listShow: false,
                serverList: [],
                botcls: 'fixed-bottom',
                tabHeight: 0,
                msk: false,
            }
        },
        components: {
            rechargeOrderHeader,
            InputComponent,
            TextareaComponent,
            NumberComponent,
            loadingComponent
        },
        computed: {
            filterList() {
                if (this.serverList.length > 0) {
                    return this.serverList.filter((item) => {
                        return item.serverName.indexOf(this.serverName) !== -1
                    })
                } else {
                    return this.serverList
                }
            },
            getRechargeType() {
                /*
                 * recharge_type[1:代充，2:首充，3:续充,]
                 * platform_type[1:安卓, 2:苹果]
                 */
                if (this.publishEO) {
                    switch (this.publishEO.rechargeType) {
                        case 1:
                            return '代充'
                            break;
                        case 2:
                            return '首充'
                            break;
                        case 3:
                            return '续充'
                            break;
                    }
                }
            },
            getPlatformType() {
                if (this.publishEO) {
                    switch (this.publishEO.platformType) {
                        case 1:
                            return '安卓'
                            break;
                        case 2:
                            return '苹果'
                            break;
                    }
                }
            },
            getTotalAmount() {
                return this.num * parseInt(this.publishEO.rechargePrice*1000)/1000
            },
            htmlServerList() {
                var dl = []
                this.serverList.forEach((item) => {
                    dl.push(item.serverName)
                })
                return dl
            }
        },
        created() {
            this.$http.get(this.$CONSTANTS.APILogin + "account/checkBindMobile").then( res => {
              if (res.body.success == true) {
                this.buyerPhone = res.body.mobilePhone;
              }
            });
            //判断是否有本地缓存或是从登陆页跳转
             if (this.$route.params.rechargeType) {
                this.publishEO = this.$route.params
                if (this.publishEO.rechargeType === 3) {
                    this.$router.push({path: '/vue/recharge/refill/verifyAccount'})
                } else if (this.publishEO.rechargeType === 4) {
                    this.$router.push({path: '/vue/recharge/quickRecharge'})
                } else {
                    //获取区服列表
                    this.getServerList().then((res) => {
                        if (res.body.list) {
                            this.serverList = res.body.list
                        }
                    }, (err) => {
                        console.log(err);
                    })
                }
            } else {
                this.$http.get(this.$CONSTANTS.APIRecharge + "publish/getPublishByPublishId", {
                    params: {publishId: this.$route.params.publishId}
                }).then((res) => {
                    if (res.body.responseStatus.code === '00') {
                        this.publishEO = res.body.publishEO
                        if (this.publishEO.rechargeType === 3) {
                            this.$router.push({path: '/vue/recharge/refill/verifyAccount'})
                        } else if (this.publishEO.rechargeType === 4) {
                            this.$router.push({path: '/vue/recharge/quickRecharge'})
                        } else {
                            //获取区服列表
                            this.getServerList().then((res) => {
                                if (res.body.list) {
                                    this.serverList = res.body.list
                                }
                            }, (err) => {
                                console.log(err);
                            })
                        }
                        this.$bus.emit('headerText', this.publishEO.gameName + '/' + this.getPlatformType + this.getRechargeType)
                    } else {
                        this.$toast(res.body.responseStatus.message)
                        console.log(res.body.responseStatus.code + res.body.responseStatus.message);
                    }
                }, (res) => {
                    this.$toast(res.statusText)
                    console.log(res);
                })

                if (this.$route.query.serverName) {
                    this.buyerRoleAccount = this.$route.query.buyerRoleAccount
                    this.buyerRolePwd = this.$route.query.buyerRolePwd
                    this.buyerRoleName = this.$route.query.buyerRoleName
                    this.serverName = this.$route.query.serverName
                    this.buyerPhone = this.$route.query.buyerPhone
                    this.num = this.$route.query.num ? parseInt(this.$route.query.num) : 1
                    this.remark = this.$route.query.remark
                }
                if (this.$isLocalStorageSupported()) {
                  if (localStorage[this.$route.params.publishId + this.buyerPhone]) {
                      let localOrder = JSON.parse(localStorage[this.$route.params.publishId + this.buyerPhone])
                      this.buyerRoleAccount = localOrder.buyerRoleAccount ? localOrder.buyerRoleAccount : ''
                      this.buyerRolePwd = localOrder.buyerRolePwd ? localOrder.buyerRolePwd : ''
                      this.buyerRoleName = localOrder.buyerRoleName ? localOrder.buyerRoleName : ''
                      this.serverName = localOrder.serverName ? localOrder.serverName : ''
                      this.buyerPhone = localOrder.buyerPhone ? localOrder.buyerPhone : ''
                      this.num = localOrder.num ? localOrder.num : 1
                      this.remark = localOrder.remark ? localOrder.remark : ''
                  }
                }


            }

        },
        mounted() {
            if (this.publishEO.gameName) {
                this.$bus.emit('headerText', this.publishEO.gameName + '/' + this.getPlatformType + this.getRechargeType)
            }

            this.$nextTick(function () {
                this.tabHeight = this.$getScreenHeight()  - this.$refs.rechargeMain.getBoundingClientRect().top-this.$refs.rechargeFooter.getBoundingClientRect().height;
            });
        },
        methods: {
            ListFocus() {
                this.listShow = true
                this.msk = true
                this.botcls = 'abs-bottom'
                this.$bus.emit('topcls', 'abs-top')
            },
            otherFocus() {
                this.listShow = false
                this.botcls = 'abs-bottom'
                this.$bus.emit('topcls', 'abs-top')
            },
            ListClick(item) {
                this.serverName = item.serverName
                this.listShow = false
                this.msk = false
            },
            mskclick() {
              this.listShow = false
              this.msk = false
            },
            otherBlur() {
                this.botcls = 'fixed-bottom'
                this.$bus.emit('topcls', 'fixed-top')
            },
            Submit() {
                var orderData = {
                    rechargeType: Number(this.publishEO.rechargeType),
                    publishId: this.publishEO.publishId,
                    buyerRoleAccount: this.buyerRoleAccount,
                    buyerRolePwd: this.buyerRolePwd,
                    buyerRoleName: this.buyerRoleName,
                    serverName: this.serverName,
                    buyerPhone: this.buyerPhone,
                    num: Number(this.num),
                    totalAmount: Number(this.getTotalAmount),
                    remark: this.remark
                }
                switch (orderData.rechargeType) {
                    case 1:
                        if (!orderData.serverName || !orderData.buyerRoleAccount || !orderData.buyerRolePwd || !orderData.buyerRoleName || !orderData.buyerPhone) {
                            this.$toast({
                                message: '还有信息没有填哦'
                            })
                        } else if (Object.keys(this.error).length > 0) {
                            if (this.error.format) {
                                this.$toast({
                                    message: this.error.format
                                })
                            }
                        } else {
                            this.PostData(orderData)
                        }
                        break;
                    case 2:
                        if (!orderData.serverName || !orderData.buyerRoleName || !orderData.buyerPhone) {
                            this.$toast({
                                message: '还有信息没有填哦'
                            })
                        } else if (Object.keys(this.error).length > 0) {
                            if (this.error.format) {
                                this.$toast({
                                    message: this.error.format
                                })
                            }
                        } else {
                            this.PostData(orderData)
                        }
                        break;
                    default:

                }
            },
            ReduClick() {
                if (this.num > 1) {
                    this.num--
                }
            },
            AddClick() {
                this.num++
            },
            PostData(orderData) {
                var localData = orderData
                if (this.$isLocalStorageSupported()) {
                  localStorage.removeItem(localData.publishId + this.buyerPhone)
                  localStorage.setItem(localData.publishId + this.buyerPhone, JSON.stringify(localData))
                }

                this.$http.post(this.$CONSTANTS.APIRecharge + 'createOrder/recharge/create', orderData).then(res => {
                    if (res.ok) {
                        if (res.body.success) {
                            this.$router.push({
                                name: 'RechargePaying',
                                params: {orderId: res.body.orderId}
                            })
                        } else {
                            if (parseInt(res.body.responseStatus.code) === 11) {
                                let serverName = this.serverName ? 'serverName=' + this.serverName : ''
                                let buyerRoleAccount = this.buyerRoleAccount ? '&buyerRoleAccount=' + this.buyerRoleAccount : ''
                                let buyerRolePwd = this.buyerRolePwd ? '&buyerRolePwd=' + this.buyerRolePwd : ''
                                let buyerRoleName = this.buyerRoleName ? '&buyerRoleName=' + this.buyerRoleName : ''
                                let num = this.num ? '&num=' + this.num : ''
                                let buyerPhone = this.buyerPhone ? '&buyerPhone=' + this.buyerPhone : ''
                                let remark = this.remark ? '&remark=' + this.remark : ''

                                location.href = "/vue/login?returnUrl=" +  encodeURIComponent(location.href)
                                // this.$router.push({
                                //   name: 'QuickLogin',
                                //   query: {redirect: this.$route.fullPath}
                                // })
                            } else {
                              console.log(res);
                                this.$messagebox({
                                    title: '提示',
                                    message: res.body.responseStatus.message
                                }).then(() => {
                                  location.reload()
                                })
                            }
                        }
                    }
                }, res => {
                    console.log(res);
                    this.$messagebox({
                        title: '提示',
                        message: '处理订单异常,请稍后重试'
                    })
                })
            },
            aBackValid(val) {
                this.error = val
            },
            getServerList() {
                //获取区服列表
                var getdata = this.$http.get(this.$CONSTANTS.APIRecharge + 'gameService/selectService', {
                    params: {gameId: this.publishEO.gameId}
                })
                return getdata
            }
        }
    }
</script>
<style src="css/mobile-recharge/mobile-recharge-wjr.css" scoped></style>
<style scoped>
    .recharge {
        margin-top: .96rem;
    }
    .selectmsk {
      width: 100%;
      height: 100%;
      position: absolute;;
      z-index: 65;
      background: #000;
      opacity: .001;
      top: 0
    }
    .recharge-main {
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
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

    .recharge-content .rechcon-list .chorder {
        width: 101%;
    }
    .re {
position: relative;
z-index: 65;
    }
    .select {
        margin-left: 2rem;
        width: 70%;
        border: #ccc 1px solid;
        padding: .1rem;
        max-height: 4rem;
        overflow-y: scroll;
        position: absolute;
        z-index: 66;
        background: #fff;
    }

    ul.select li {
        line-height: .5rem;
        height: .5rem;
    }

    .abs-bottom {
        position: relative !important;
        bottom: 0;
        max-width: 768px;
        width: 100%;
        left: 50%;
        margin-left: -50%;
    }
</style>
