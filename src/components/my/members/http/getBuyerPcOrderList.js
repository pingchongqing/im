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
var distinction = {}
function getBuyerPcOrderList(orderState, length, pageSize = 10) {
  let start = Math.ceil(length / pageSize);
  var request={}, jsonStr={};
  jsonStr.OrderType="buyer";
//jsonStr.OrderType="seller";
  jsonStr.Gm="";
  jsonStr.Ga="";
  jsonStr.Gs="";
  jsonStr.RaceId="";
  jsonStr.Ts="";
  jsonStr.Bt="";
  jsonStr.Oc=orderState;//订单状态
  jsonStr.Keyword="";
  jsonStr.P=start+1;
  jsonStr.PS=pageSize;
  var da=new Date();
  var dd=new Date();
  dd.setDate(dd.getDate()+1);
  jsonStr.MaxDate=dd;
  da.setMonth(da.getMonth()-1)
  jsonStr.MinDate=da;
  request.jsonStr=jsonStr;
  distinction = request;
  return this.vm.$http.post(this.vm.$CONSTANTS.APIMainGoods +"mainGoodsOrder/mainGoodsOrderList",
    request)
    .then(res => {
      if(res.body.result==null||distinction!=request){
          return false
      }
      if(res.body.responseStatus.cod="00"&&res.body.result){
        let resq = JSON.parse(res.body.result);
        if(resq.BizResult.OrderList){
          console.log(resq.BizResult.OrderList)
          return resq.BizResult.OrderList;
        }
        console.log(res.body)
      }else{
        return null;
      }
    }, () => {
      console.log("服务请求错误： 获取订单列表");
      return null
    });
}


export  {getBuyerPcOrderList}
// function getBuyerPcOrderList(orderState, length, pageSize = 10) {
//   let start = Math.ceil(length / pageSize);
//   return this.vm.$http.get(this.vm.$CONSTANTS.APIGoods + 'purchaseData/myBuyOrderList',
//     {
//       params: {
//         orderState,
//         pageSize,
//         start
//       }
//     })
//     .then(res => {
//       let resq = res.body;
//       if (resq['responseStatus']
//         && resq['responseStatus']['code'] === '00'
//         && resq['data']) {
//         return resq.data;
//       } else {
//         // console.log("参数错误： 商城中的商品列表");
//         return null;
//       }
//     }, () => {
//       console.log("服务请求错误： 获取订单列表");
//       return null
//     });
// }
//
// export  {getBuyerPcOrderList}