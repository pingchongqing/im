/*
* @Author: fredlee
* @Date:   2017-04-19 13:27:00
* @Last Modified by:   fredlee
* @Last Modified time: 2017-06-23 20:55:04
*/

import Vue from 'vue';
import seller from './seller.js';
import memberSeller from './memberSeller.js'
import pay from './pay.js'
import user from './user.js'

//import goodsList from './goodsList'

const vm = new Vue()


function searchGoodsList (params) {
	return vm.$http.get(vm.$CONSTANTS.APIRecharge+'publishAliYun/publishSearch',{params:params});
}

function searchgamelistbytype (params) {
	return vm.$http.get(vm.$CONSTANTS.APIRecharge+'category/searchgamelistbytype',{params:params});
}

export const ChoiceApi = {
	// 获取游戏列表数据
	// 参数格式：
	// {
	// 	pageIndex: 1,
	// 	pageSize: 80,
	// 	isShowInHome: true,
	// 	goodsType: 2
	// }
	searchGameListByType: function searchGameListByType (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'category/searchgamelistbygoodstype' , {
			params:params
		})
	},
	// 获取游戏首字母列表
	// 参数格式：
	// {
	// 	gameType:1，
	// 	goodsTypeId:2
	// }
	getGamePy: function getGamePy (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'category/getgamepy' , {
			params:params
		})
	},
	// 类型：post
	// 参数：
	// {
	// 	accurateMap: {
	// 		goods_type: [goodsType.toString()],
	// 		game_id: [gameId],
	// 		server_id: [serverId],
	// 		region_id: [areaId]
	// 	},
	// 	keyWordMap: {},
	// 	betweenMap: {},
	// 	page: this.page,
	// 	pageCount: pageCount,
	// 	sortMap: {
	// 		goods_source_type: "+",
	// 		create_time: "-"
	// 	}
	// }
	goodsSearchList: function goodsSearchList (params) {
		return vm.$http.post(vm.$CONSTANTS.APISearch + 'goodsSearch/goodsSearchList', params)
	},
	// 根据游戏区服获取快销号列表：
	// 参数：
	// {aid=a9788cd93b7c4a90b8a0605dd269d806}
	getQuickList: function getgameServer (params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'fast_sale_account/getQuickPublishInfoList', {params:params})
	},
	// 参数：
	// {serverId:serverId}
	convertgoodsurl: function convertgoodsurl (params) {
		return vm.$http.get(vm.$CONSTANTS.APIGoods + 'mainsite/convertgoodsurl', {params:params})
	},
	// 根据游戏ID获取商品类型：
	// 参数：
	// {gameId:gameId}
	searchGoodsTypeByGameid: function searchGoodsTypeByGameid (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'category/searchgoodstypebygameid', {params:params})
	},
	// 根据游戏ID获取游戏阵营：
	// 参数：
	// {parentId:YX16060613502502300005}
	searchFactionByGameid: function searchFactionByGameid (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'category/searchfactionbygameid', {params:params})
	},

	// 根据游戏ID获取平台：
	// 参数：
	// {gameId:YX17051511021172700019}
	getplatforminfobygameid: function getplatforminfobygameid (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'mainMobileGame/getplatforminfobygameid', {params:params})
	},

	// 根据游戏ID,平台ID获取客户端：
	// 参数：
	// {gameId=YX17051511021172700019&platformId=5c3c40536c6e4c359244e1107074e7f4}
	getgameareasbygameandplatform: function getgameareasbygameandplatform (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'mainMobileGame/getgameareasbygameandplatform', {params:params})
	},

	// 根据客户端ID获取区服：
	// 参数：
	// {aid=a9788cd93b7c4a90b8a0605dd269d806}
	getgameServer: function getgameServer (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'mainMobileGame/getgameServer', {params:params})
	},

	// 端游根据游戏ID获取区：
	// 参数：
	// {parentId=YX16060613502502300005&gid=YX16060613502502300005}
	searchbyparentid: function searchbyparentid (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'category/searchbyparentid', {params:params})
	},

	// 端游根据游戏ID获取服：
	// 参数：
	// {parentId=YX16060613502502300005}
	searchserverbyparentid: function searchserverbyparentid (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'category/searchserverbyparentid', {params:params})
	},

	// 获取端游筛选：
	// 参数：
	// goodsTypeId=1&gameName=dnf
	queryFilterProperty: function queryFilterProperty (params) {
		return vm.$http.get(vm.$CONSTANTS.APICategory + 'gamePropertyRelation/queryFilterProperty', {params:params})
	},


}

export const AccountApi = {
	// {
	// 	goodsId:xxxx
	// }
	selectGoodsDetail: function selectGoodsDetail (params) {
		return vm.$http.get(vm.$CONSTANTS.APIGoods + 'goods/selectgoodsdetail', {params:params})
	},
	// {
	// 	BizOfferId:DB047-20170508-76448621
	// }
	selectPcGoodsDetail: function selectPcGoodsDetail (params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainGoods/selectpcgoodsdetail', {params:params})
	},
	selectPcMobGoodsDetail: function selectPcMobGoodsDetail (params) {
		return vm.$http.post(vm.$CONSTANTS.APIMainGoods + 'mainMobileGoods/getMainGoodsDetail', params)
	},
	// 参数：
	// {goodsId:this.$route.params.goodsId}
	addBrowseAmount: function addBrowseAmount (params) {
		return vm.$http.post(vm.$CONSTANTS.APIGoods + 'goodsBrowse/addBrowseAmount', params)
	}
}

export const BuyerCenterApi = {
	// {
	// 	status:2, 1是交易中，2是
	//  pageIndex:1,
	//  pageSize:10,
	// }
	getOrderData: function getOrderData (params) {
		return vm.$http.get(vm.$CONSTANTS.APIOrder + 'buyer/order/list', {params:params})
	},
	getMergeOrderData: function getMergeOrderData (params) {
		return vm.$http.get(vm.$CONSTANTS.APIOrder + 'buyer/order/mergeList', {params:params}, {
			before(xhr) {
				if (this.LastRequest) {
					this.LastRequest.abort()
				}
				this.LastRequest = xhr
			}
		})
	},
	getOrderDetail: function getOrderDetail (orderId) {
		return vm.$http.get(vm.$CONSTANTS.APIOrder + 'buyer/order/'+orderId)
	},
	queryOrderDetail: function queryOrderDetail (params) {
		return vm.$http.get(vm.$CONSTANTS.APIRecharge + 'buyer/order/queryOrderDetail', {params:params})
	},
	mainShouYouOrderList: function mainShouYouOrderList (params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainShouYouOrderService/mainShouYouOrderList', {params:params}, {
			before(xhr) {
				if (this.LastRequest) {
					this.LastRequest.abort()
				}
				this.LastRequest = xhr
			}
		})
	},
	mainSYFastOrderList: function mainShouYouOrderList (params) {
		params ={
			orderStatus:params.payStatus,
			pageSize:params.pageSize,
			pageIndex:params.pageIndex,
			syBizOfferType:'6,7'
		}
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainFastSalesAccount/getOrderList', {params:params}, {
			before(xhr) {
				if (this.LastRequest) {
					this.LastRequest.abort()
				}
				this.LastRequest = xhr
			}
		})
	},
	//提取M站账号资料
	getMobAccountInfo: function getMobAccountInfo(params) {
		return vm.$http.get(vm.$CONSTANTS.APIOrder + 'orderdata/data', {params:params})
	},
	getPcAccountInfo: function getPcAccountInfo(params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainGoodsAccountOrder/buyerViewAccountInfo', {params:params})
	},
	openServiceQQ: function openServiceQQ(params) {
		return vm.$http.post(vm.$CONSTANTS.APIOrder + 'assignCustomServie/openServiceQQ', params)
	},
	//获取pc端商品订单详情
	mainGoodsOrderDetailed: function mainGoodsOrderDetailed(params) {
		return vm.$http.post(vm.$CONSTANTS.APIMainGoods + 'mainGoodsOrder/mainGoodsOrderDetailed', params)
	},
	mainShouYouOrderDetailed: function mainShouYouOrderDetailed (params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainShouYouOrderService/mainShouYouOrderDetailed', {params:params})
	},
	mainShouYouOrderFast: function mainShouYouOrderDetailed (params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainFastSalesAccount/getOrderDetail', {params:params})
	},
	mainShouYouOrderGetGameAccountInfo: function mainShouYouOrderGetGameAccountInfo (params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainShouYouOrderService/mainShouYouOrderGetGameAccountInfo', {params:params})
	},
	rechargeRefund: function rechargeRefund (params) {
		return vm.$http.post(vm.$CONSTANTS.APIRecharge + 'buyer/order/refund', params)
	},
	appealSure: function appealSure(params) {
		return vm.$http.post(vm.$CONSTANTS.APIRecharge + 'buyer/order/appeal', params)
	},
	//手游充值交易成功申述
	appealReceive: function appealReceive(params) {
		return vm.$http.post(vm.$CONSTANTS.APIRecharge + 'buyer/order/appealReceive', params)
	},
	//主站手游订单付款
	mobileOrderPay: function mobileOrderPay(params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainGoodsAccountOrder/mobileOrderPay', {params:params})
	},
	appealReceive: function appealReceive(params) {
		return vm.$http.post(vm.$CONSTANTS.APIRecharge + 'buyer/order/appealReceive', params)
	},
// {
// 	"jsonStr":{
// 		"OrderType":"buyer",
// 		"Gm":"","Ga":"","Gs":"","RaceId":"","Ts":"","Bt":"","Oc":"1",
// 		"Keyword":"","P":1,"PS":10,"MaxDate":"2017-05-25T08:03:38.996Z","MinDate":"2017-04-24T08:03:38.996Z"
// 	}
// }
	mainGoodsOrderList: function mainGoodsOrderList (params) {
		return vm.$http.post(vm.$CONSTANTS.APIMainGoods + 'mainGoodsOrder/mainGoodsOrderList', params, {
			before(xhr) {
				if (this.LastRequest) {
					this.LastRequest.abort()
				}
				this.LastRequest = xhr
			}
		})
	},

	//M站各状态数量
	buyerMobCount: function  buyerMobCount() {
		return vm.$http.get(vm.$CONSTANTS.APIOrder + 'buyer/order/orderCount')
	},
	//PC端各状态数量
	buyerPcCount: function  buyerPcCount() {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainShouYouOrderService/mainOrderEveryStatusCount')
	},
	//主站手游订单数量
	buyerShouyouCount: function buyerShouyouCount() {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainShouYouOrderService/mainShouYouOrderEveryStatusCount')
	},
	//商城订单数量
	buyerMallCount: function buyerMallCount() {
		return vm.$http.get(vm.$CONSTANTS.APIGoods + 'purchaseData/myBuyOrderStatusCount')
	},
	//取消订单
	cancelOrder: function cancelOrder(params) {
		return vm.$http.post(vm.$CONSTANTS.APIOrder + 'buyer/order/cancel', params)
	},
	//手游支付
	maypay: function maypay(params) {
		return vm.$http.get(vm.$CONSTANTS.APIOrder + 'payment/mypay', {params:params})
	},
	//获取PC图片
	getAccountOrderImgInfo: function getAccountOrderImgInfo(params) {
		return vm.$http.get(vm.$CONSTANTS.APIMainGoods + 'mainGoodsAccountOrder/getAccountOrderImgInfo', {params:params})
	},
}
export default {
  searchGoodsList,
  searchgamelistbytype,
  ChoiceApi,
	AccountApi,
	BuyerCenterApi,
  	seller,
	memberSeller,
	pay,
    user
};
