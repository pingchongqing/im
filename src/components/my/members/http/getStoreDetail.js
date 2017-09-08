/**
 * Created by 严俊东 on 2017/4/4.
 */

/**
 * 获取订单详情
 *
 * 传入值
 *  @param orderId 订单号
 * 传出值
 *  <Object> | null  订单详情
 *
 */

function getStoreDetail(orderId) {
  return this.vm.$http.get(this.vm.$CONSTANTS.APIGoods + 'purchaseData/getOrder',
    {
      params: {
        orderId
      }
    })
  .then(res => {
    let resq = res.body;
    if (resq['responseStatus']
      && resq['responseStatus']['code'] === '00'
      && resq['order']) {
      return resq.order;
    } else {
      // console.log("参数错误： 商城中的商品列表");
      return null;
    }
  }, () => {
    console.log("服务请求错误： 获取订单列表");
    return null
  });
}
export {getStoreDetail}