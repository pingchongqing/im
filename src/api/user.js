/**
 * Created by Administrator on 2017/7/4. 高晨
 */
import Vue from 'vue';

const vm = new Vue()

//获取我的账户余额（新资金）
function getAccountBrief () {
    return vm.$http.post(vm.$CONSTANTS.APIMainpay+'mainUser/getAccountBrief');
}
//获取我的账户余额（老资金）
function queryuserbalanceinfo (params) {
    return vm.$http.post(vm.$CONSTANTS.APIUser+'account/queryuserbalanceinfo',params);
}
//获取手机号码
function checkBindMobile () {
    return vm.$http.get(vm.$CONSTANTS.APIUser+'account/checkBindMobile');
}
//退出登录
function unionLoginout () {
    return vm.$http.post(vm.$CONSTANTS.APIUser+'account/unionLoginout');
}
//修改用户名和个人签名
function updateUserInfo (params) {
    return vm.$http.post(vm.$CONSTANTS.APIUser+'account/updateUserInfo',params);
}
//发短信前置接口
function actionstart () {
    return vm.$http.post(vm.$CONSTANTS.APISms+'sms/actionstart');
}
//短信接口
function sendloginverifycode (params) {
    return vm.$http.post(vm.$CONSTANTS.APISms+'sms/sendloginverifycode',params);
}
//登录接口
function unionLoginByMobile (params) {
    return vm.$http.get(vm.$CONSTANTS.APILogin+'account/login/unionLoginByMobile',{params:params});
}
//客服中心开关
function selectOnoff (params) {
    return vm.$http.post(vm.$CONSTANTS.APISearchCenter+'OnoffService/selectOnoff',params);
}
//修改头像
function updateFace (params) {
    return vm.$http.post(vm.$CONSTANTS.APIUser+'account/updateFace',params);
}
//消息接口
function selectmessagelist (params) {
    return vm.$http.get(vm.$CONSTANTS.APIGoods+'message/selectmessagelist',{params:params});
}
//支付mypay
function mypay (params) {
    return vm.$http.get(vm.$CONSTANTS.APIOrder+'payment/mypay',{params:params});
}
export default{
    getAccountBrief,
    queryuserbalanceinfo,
    checkBindMobile,
    unionLoginout,
    updateUserInfo,
    actionstart,
    sendloginverifycode,
    unionLoginByMobile,
    selectOnoff,
    updateFace,
    selectmessagelist,
    mypay
}
