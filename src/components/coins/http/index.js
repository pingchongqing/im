/**
 * Created by 340097 on 2017/4/17.
 */

import Vue from 'vue'


/**
 * 根据游戏名旧版打通新版打通开关
 * @param vgname 游戏名
 * return <boolean>
 *  1 新版打通
 *  2 新版不打通
 *  3 旧版
 */
function getSwitchAll(vgname) {
  return this.vm.$http.get(
    this.vm.$CONSTANTS.APIGoods + "purchaseData/getGoldMallOpenedStatus",
    {
      params: {
        gameName: vgname
      }
    },
    {
      headers: {
        contentType: "aplication/json; charset = UTF-8",
        dataType: 'json'
      }
    }).then(res => {
    let resp = res.body;
    if (resp.isGoldMallEnable == 1) {
      console.log('新版打通')
      return 1;
    } else if(resp.isGoldMallEnable == 2){
      console.log('新版不打通')
      return 2;
    } else {
      console.log('旧版')
      return 3;
    }
  }, () => {
    console.log("开关请求失败！");
    return 1;
  })
}


/**
 * 根据游戏名获取金币开关
 * @param vgname 游戏名
 * return <boolean>
 *  false 开关关闭
 *  true 开关开启
 */
function getSwitch(vgname) {
  return this.vm.$http.get(
    this.vm.$CONSTANTS.APIGoods + "purchaseData/getGoldMallOpenedStatus",
    {
      params: {
        gameName: vgname
      }
    },
    {
      headers: {
        contentType: "aplication/json; charset = UTF-8",
        dataType: 'json'
      }
    }).then(res => {
    let resp = res.body;
    if (resp.responseStatus.code == "00" && resp.isGoldMallEnable == 3) {
      console.log("金币开关-关闭");
      return false;
    } else {
      console.log("金币开关-开启");
      return true;
    }
  }, () => {
    console.log("开关请求失败！");
    return false;
  })
}

/**
 * 根据游戏名旧版打通新版打通开关
 * @param vgname 游戏名
 * return <boolean>
 *  false 开关关闭
 *  true 开关开启
 */
function getSwitch2(vgname) {
  return this.vm.$http.get(
    this.vm.$CONSTANTS.APIGoods + "purchaseData/getGoldMallOpenedStatus",
    {
      params: {
        gameName: vgname
      }
    },
    {
      headers: {
        contentType: "aplication/json; charset = UTF-8",
        dataType: 'json'
      }
    }).then(res => {
    let resp = res.body;
    if (resp.responseStatus.code == "00" && resp.isGoldMallEnable == 3) {
      console.log("金币开关-关闭");
      return false;
    } else if(resp.isGoldMallEnable == 2){
      console.log("九宫格-关闭");
      return false;
    } else {
      console.log("金币开关-开启");
      return true;
    }
  }, () => {
    console.log("开关请求失败！");
    return false;
  })
}


/*  $.ajax({
 type: "get",
 url: CONSTANTS.APIGoods + "purchaseData/getGoldMallOpenedStatus",
 data: {
 gameName: vgname
 },
 contentType: "application/json; charset=UTF-8",
 dataType: "json",
 }).done(function (resp) {
 if (resp.responseStatus.code == "00" && resp.isGoldMallEnable != 3) {
 coninsUrl = "/vue/coins-type/list-coins";
 console.log("金币开关-开启")
 } else {
 console.log("金币开关-关闭")
 }
 }).fail(function () {

 }).always(function () {
 searchMainFun()
 });
 });*/


export default {
  vm: new Vue(),
  getSwitch,
  getSwitch2,
  getSwitchAll
};