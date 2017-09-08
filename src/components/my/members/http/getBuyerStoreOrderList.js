/**
 * Created by 严俊东 on 2017/3/29.
 */
/**
 * 获取我是买家-商城商品的 订单列表
 * 传入值
 *  @param orderState 订单状态（1,2,3,4,5,6,7,8）
 *  @param length 当前列表的长度
 *  @param pageSize 一页的条数，默认是10
 * 返回值
 *  <Array> | null
 */
var distinction = {};
function getBuyerStoreOrderList(orderState, length, pageSize = 10) {
  var request = {};
  let start = Math.ceil(length / pageSize);
  request = {
    orderState,
    pageSize,
    start
  };
  distinction = request;
  return this.vm.$http.get(this.vm.$CONSTANTS.APIGoods + 'purchaseData/myBuyOrderList',
    {
      params: request
    })
    .then(res => {
      if(distinction!=request){
        return false
      }
      let resq = res.body;
      if (resq['responseStatus']
        && resq['responseStatus']['code'] === '00'
        && resq['data']) {
        return resq.data;
      } else {
        // console.log("参数错误： 商城中的商品列表");
        return null;
      }
    }, () => {
      console.log("服务请求错误： 获取订单列表");
      return null
    });
}

export  {getBuyerStoreOrderList}