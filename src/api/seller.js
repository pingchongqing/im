/*
* @Author: fredlee
* @Date:   2017-05-05 10:36:07
* @Last Modified by:   fredlee
* @Last Modified time: 2017-07-28 10:17:13
*/
import Vue from 'vue';

const vm = new Vue()

//获取交易类型
function getGoodstype (params) {
	return vm.$http.get(vm.$CONSTANTS.APICategory+'category/searchgoodstypebygameid',{params:params});
	//return vm.$http.get('/mobile-category-service/rs/category/searchgoodstypebygameid',{params:params});
}

//获取是否自动化
function isGoodsAutomation (params) {
	return vm.$http.post(vm.$CONSTANTS.APIGoods+'goods/account/isgoodsneedautoscreenshot',params);
}


function searchdynamic (params) {
	return vm.$http.get(vm.$CONSTANTS.APICategory+'category/searchpropertybygameidandgoodstypeid',{params:params});
}

function searchgameGoodsinfo (params) {
return vm.$http.get(vm.$CONSTANTS.APICategory+'category/searchpropertyvalbygameidandpropertyid',{params:params});
}
function GetSafeBuyConfig (params) {
		return vm.$http.post(vm.$CONSTANTS.APISafebuy+'SafeBuyConfigService/GetSafeBuyConfig',params);
}

function searchfactionbygameid (params) {
	return  vm.$http.get(vm.$CONSTANTS.APICategory+'category/searchfactionbygameid',{params:params});
}

function ossUploadToAly () {
	return vm.$http.get('/api/mobile-goods-service/ossUploadToAly');
}

function upload (url,params) {
	return vm.$http.post(url,params,{
      headers: {
        contentType: "multipart/form-data; charset = UTF-8"
      }
    });
}
function getGameToCompany (params){
	return vm.$http.get(vm.$CONSTANTS.APICategory+'category/getGameToCompany',{params:params});
}
function create (params){
	return vm.$http.post(vm.$CONSTANTS.APIGoods+'goods/account/createaccountgoods',params);
	//return vm.$http.post('/mobile-goods-service/rs/goods/account/createaccountgoods',params);
}

function queryCurrentUserInfo () {
	return vm.$http.post('/api/mobile-user-service/rs/account/queryCurrentUserInfo')
}

function selectgoodsdetail (params) {
	return vm.$http.get(vm.$CONSTANTS.APIGoods+'goods/selectselfgoodsdetail',{params:params});
  //return vm.$http.get('/mobile-goods-service/rs/goods/selectselfgoodsdetail',{params:params});
}

function update (params) {
	//return vm.$http.post('/mobile-goods-service/rs/goods/account/modifyaccountgoods',params)
	return vm.$http.post(vm.$CONSTANTS.APIGoods+'goods/account/modifyaccountgoods',params)
}

function getAllPropertyRelation(params){
	return vm.$http.get(vm.$CONSTANTS.APICategory+'gamePropertyRelation/getAllPropertyRelation',{params:params});
	//return vm.$http.get('/mobile-category-service/rs/gamePropertyRelation/getAllPropertyRelation',{params:params});
}
function checkUserBindIdNumber (params) {
	//return vm.$http.post('/mobile-user-service/rs/account/checkUserBind',params);
	return vm.$http.post(vm.$CONSTANTS.APILogin+'account/checkUserBindIdNumber',params);
}
function saveMainUserInfo (params) {
	//return vm.$http.post('/mobile-user-service/rs/account/saveMainUserInfo',params);
	return vm.$http.post(vm.$CONSTANTS.APILogin+'account/saveMainUserInfo',params);
}

function getrepositorynum (params) {
	return vm.$http.get(vm.$CONSTANTS.APIGoods+'goods/getrepositorynum',{params:params});
}
function getcurrencyunitbygameid (params) {
	return vm.$http.get(vm.$CONSTANTS.APICategory+'category/getcurrencyunitbygameid',{params:params});
}
function  createGold(params) {
	return vm.$http.post(vm.$CONSTANTS.APIGoods+'goods/creategoods',params);
}
function updateGold (params) {
	return vm.$http.post(vm.$CONSTANTS.APIGoods+'goods/modifygoods',params);
}
function getOpenAutomation (params) {
  return vm.$http.post(vm.$CONSTANTS.APICategory+'gameCategoryAutoOpen/getOpen',params);
}
export default{
	getGoodstype,
	isGoodsAutomation,
	searchdynamic,
	searchgameGoodsinfo,
	GetSafeBuyConfig,
	searchfactionbygameid,
	ossUploadToAly,
	upload,
	create,
	queryCurrentUserInfo,
	selectgoodsdetail,
	update,
	getAllPropertyRelation,
	checkUserBindIdNumber,
	saveMainUserInfo,
	getrepositorynum,
	getcurrencyunitbygameid,
	createGold,
	updateGold,
  	getOpenAutomation,
 	getGameToCompany
}
