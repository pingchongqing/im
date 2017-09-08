/*  WaitPayment(1, "待付款"),
 Paid(2, "已付款"),
 WaitDelivery(3, "待发货"),
 Delivery(4, "已发货"),
 Statement(5, "结单"),
 Refund(6, "已退款"),
 Cancelled(7, "已取消"),
 Receive(8, "已收货");*/

let buyerStoreMenu = {
  list: {
    paying: {
      state: 'paying',
      name: '待付款',
      code: '1',
      describe: '待付款',
      list: []
    },
    payed: {
      state: 'payed',
      name: '已付款',
      code: '2,3,4,8',
      describe: '已付款，客服正在为您发货',
      list: []
    },
    buySuccess: {
      state: 'buy-success',
      name: '交易成功',
      code: '5',
      describe: '交易完成',
      list: []
    },
    buyCancel: {
      state: 'buy-cancel',
      name: '交易取消',
      code: '6,7',
      describe: '交易取消',
      list: []
    },
  },
  STATE: {
    waitPayment: 1, // 待付款
    paid: 2, // 已付款
    waitDelivery: 3, //
    delivery: 4,
  },
  checked: "paying"
};
/**
 * 更加code值找出相应的菜单，因为一个菜单可能对应多个code
 * @param code
 * @returns {*}
 */
let getMenu = code => {
  /**
   * 1. 循环菜单
   * 2. 如果传入的code和当前的菜单code匹配，则返回改菜单
   */
  let ret = {
    name: '',
    state: ''
  };
  for (let key in buyerStoreMenu.list) {
    buyerStoreMenu.list[key].code.split(',').forEach(v => {
      if (v == code) {
        ret.name = buyerStoreMenu.list[key].name;
        ret.state = buyerStoreMenu.list[key].state;
      }
    });
    if (ret.name.length > 0) return ret;
  }
  console.log('详情传入的state不在 1~8 范围内');
  return null;
};
export {buyerStoreMenu, getMenu};
