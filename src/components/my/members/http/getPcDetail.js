/**
 * Created by 340097 on 2017/5/19.
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

function getPcDetail(orderId,serviceType) {
  var request = {};
  var jsonStr={};
  jsonStr.ServiceType = serviceType;
  jsonStr.OrderId= orderId;
  /**测试*/
  //jsonStr.UserId="US16121746439001-0333";
  //jsonStr.OrderId="DB201612175847206039";
  //jsonStr.ServiceType=5;



  request.jsonStr=jsonStr;
  return this.vm.$http.post(this.vm.$CONSTANTS.APIMainGoods + 'mainGoodsOrder/mainGoodsOrderDetailed',
    request)
    .then(resp => {
      // 成功
      resp = resp.body
      console.log("-------------------",resp.result)
      if(resp.result==null) {
        return;
      }
      console.log("-------------------",resp)
      var result = JSON.parse(resp.result);

      if(resp.responseStatus.code="00"&&resp.result!=null) {
        console.log(result.BizResult)
        return result.BizResult;
      }
      // let resq = res.body;
      // if (resq['responseStatus']
      //   && resq['responseStatus']['code'] === '00'
      //   && resq['order']) {
      //   return resq.order;
      // } else {
      //   // console.log("参数错误： 商城中的商品列表");
      //   return null;
      // }
    }, () => {
      console.log("服务请求错误： 获取订单列表");
      return null
    });
}
export {getPcDetail}