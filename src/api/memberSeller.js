/*
* @Author: fredlee
* @Date:   2017-05-23 10:41:56
* @Last Modified by:   fredlee
* @Last Modified time: 2017-06-13 11:29:49
*/

import Vue from 'vue';

const vm = new Vue()

function getMgoodsNum () {

	return Promise.all([vm.$http.get(vm.$CONSTANTS.APIGoods+'goods/goodsNum/getGoodsNumOfMobile'),
						vm.$http.get(vm.$CONSTANTS.APIGoods+'goods/goodsNum/getGoodsNumOfPC')
		]);
}

function getPcgoodsNum () {
		return Promise.all([vm.$http.get(vm.$CONSTANTS.APIOrder+'main/seller/order/querySellerOrderNums'),
						vm.$http.get(vm.$CONSTANTS.APIOrder+'main/seller/order/queryMainSellerOrderNums')
		]);
}


//*********商品管理*************************商品管理*************************商品管理****************
function getGoodsListbyMobile (params) {
	return vm.$http.get(vm.$CONSTANTS.APIGoods+'goods/selectgoodslistnew',{
    before(xhr) {
        if (this.lastRequest) {
            this.lastRequest.abort()
        }
        this.lastRequest = xhr
        //this.params = params;
    },
    params:params
});
}

function getGoodsListbyPc (params) {
	return vm.$http.post(vm.$CONSTANTS.APIMainGoods+'mainMobileGoods/getSellerGoodsList',params,{
	    before(xhr) {
	        if (this.lastRequest) {
	            this.lastRequest.abort()
	        }
	        this.lastRequest = xhr
	    }
});
}
function online (params) {
	return vm.$http.post(vm.$CONSTANTS.APIGoods+'goods/online',params);
	//return vm.$http.post('/mobile-goods-service/rs/goods/online',params);
}
function deleteMoblieGoods (params) {
	return vm.$http.post(vm.$CONSTANTS.APIGoods+'goods/deleteGoods',params);
	//return vm.$http.post('/mobile-goods-service/rs/goods/deleteGoods',params);
}

function initMainGoods(params){
	return vm.$http.post(vm.$CONSTANTS.APIMainGoods+'mainGoods/updatemaingoodsinit',params);
	//return vm.$http.post('/mobile-mainGoods-service/rs/mainGoods/updatemaingoodsinit',params);
}
function onlinPc (params) {
	return vm.$http.post(vm.$CONSTANTS.APIMainGoods+'mainGoods/updatemaingoodsonline',params);
	//return vm.$http.post('/mobile-mainGoods-service/rs/mainGoods/updatemaingoodsonline',params);
}
function deletePcGoods (params) {
	return vm.$http.post(vm.$CONSTANTS.APIMainGoods+'mainGoods/deletemaingoods',params);
	//return vm.$http.post('/mobile-mainGoods-service/rs/mainGoods/deletemaingoods',params);
}

function updatePcGoods (params) {
	return vm.$http.post(vm.$CONSTANTS.APIMainGoods+'mainGoods/updatemaingoods1',params);
	//return vm.$http.post('/mobile-mainGoods-service/rs/mainGoods/updatemaingoods1',params);
}

//*********订单管理*************************订单管理*************************订单管理****************
function getOrderListbyMobile (params) {
	return vm.$http.get(vm.$CONSTANTS.APIOrder+'seller/order/list',{
	    before(xhr) {
	        if (this.lastRequest) {
	            this.lastRequest.abort()
	        }
	        this.lastRequest = xhr
	    },
	    params:params
});
}

function getOrderListbyPC (params) {
	return vm.$http.get(vm.$CONSTANTS.APIOrder+'main/seller/order/querySellerOrderList',{
	    before(xhr) {
	        if (this.lastRequest) {
	            this.lastRequest.abort()
	        }
	        this.lastRequest = xhr
	    },
	    params:params
});
}

function getMobileDetail (params) {
	return vm.$http.get(vm.$CONSTANTS.APIOrder+'seller/order/'+params);
}

function getPCDetail (params) {
	return vm.$http.get(vm.$CONSTANTS.APIOrder+'main/seller/order/querySellerOrderDetail',{params:params});
}

function openServicesQQ (params) {
	return vm.$http.post(vm.$CONSTANTS.APIOrder+'assignCustomServie/openServiceQQ',params);
}

function updatemaingoodsonline (params) {
	return vm.$http.post(vm.$CONSTANTS.APIMainGoods+'mainGoods/updatemaingoodsonline',params);
}
export default{    
	getMgoodsNum,
	//商品管理
	getGoodsListbyMobile,
	getGoodsListbyPc,
	online,
	onlinPc,
	deleteMoblieGoods,
	deletePcGoods,
	initMainGoods,
	updatePcGoods,
	//订单管理
	getOrderListbyMobile,
	getOrderListbyPC,
	getPcgoodsNum,
	getMobileDetail,
	getPCDetail,
	openServicesQQ,
	updatemaingoodsonline
}
