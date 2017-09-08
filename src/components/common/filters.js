const orderStatusFilter = function orderStatusFilter(sta) {
  switch (parseInt(sta)) {
    case 1:
      return '等待付款'
      break;
    case 2:
      return '已付款'
      break;
    case 3:
      return '待发货'
      break;
    case 4:
      return '已发货'
      break;
    case 5:
      return '交易完成'
      break;
    case 6:
      return '已退款'
      break;
    case 7:
      return '已取消'
      break;
    case 8:
      return '待退款'
      break;
    default:

  }
}
const mobGoodsStatusFilter = function mobGoodsStatusFilter(type) {
  switch (type) {
    case 1:
      return '等待付款'
      break;
    case 2:
      return '已付款，待发货'
      break;
    case 3:
      return '已付款，已发货'
      break;
    case 4:
      return '交易完成'
      break;
    case 5:
      return '已退款'
      break;
    case 6:
      return '已取消'
      break;
    case 7:
      return '退款中'
      break;
    case 8:
      return '您购买的商品已被他人购买，请等待客服退款'
      break;
    case 9:
      return '申请退款中'
      break;
    case 10:
      return '客服介入'
      break;
    default:

  }
}
const goodsTypeFilter = function goodsTypeFilter(type) {
  switch (type) {
    case 1:
      return '装备'
      break;
    case 2:
      return '游戏帐号'
      break;
    case 3:
      return '游戏币'
      break;
    case 65:
      return '租号'
      break;
    default:
      return ''
  }
}
const BasicTypeFilter = function BasicTypeFilter(type) {
  switch (parseInt(type)) {
    case 0:
      return '装备'
      break;
    case 1:
      return '游戏币'
      break;
    case 2:
      return '游戏帐号'
      break;
    case 3:
      return '升级'
      break;
    case 4:
      return '包裹'
      break;
    case 5:
      return '点卡'
      break;
  }
}
const complainResultFilter = function complainResultFilter(sta) {
  switch (parseInt(sta)) {
    case 1:
      return '买家买错商品'
      break;
    case 2:
      return '买家对帐号不满意'
      break;
    case 3:
      return '买家看上其他帐号'
      break;
    case 4:
      return '买家担心帐号的安全问题，放弃购买'
      break;
    case 5:
      return '卖家无法及时上线协助交易'
      break;
    case 6:
      return '长时间联系不上买家，卖家取消交易'
      break;
    case 7:
      return '帐号已出售或卖家不卖了'
      break;
    case 8:
      return '买家填错QQ和电话，无法确认买家身份'
      break;
    case 9:
      return '买家无法提供增值物服所需资料（扫描、邮箱等）'
      break;
    case 10:
      return '帐号实际与卖家描述不符合'
      break;
    case 11:
      return '帐号一号多卖'
      break;
    case 12:
      return '卖家个人行为导致增值服务失败'
      break;
    case 13:
      return '帐号无身份证扫描或不清晰导致增值服务失败'
      break;
    case 14:
      return '支持增值服务，但卖家提供不了所需资料或押金'
      break;
    case 15:
      return '帐号修改资料服务次数已达上线，无法再次提交'
      break;
    case 16:
      return '帐号绑定了密保卡、手机等密宝问题'
      break;
    case 17:
      return '帐号无点卡，无法正常登录游戏'
      break;
    case 18:
      return '游戏官方结束内测，服务器已关闭'
      break;
    case 19:
      return '游戏官方不支持替换或解绑手机'
      break;
    case 20:
      return '帐号异常（如坐牢、红名）'
      break;
    case 21:
      return '5173不支持此类帐号交易'
      break;
    case 22:
      return '帐号被封，无法正常登录游戏'
      break;
    case 23:
      return '增值服务时间过长，买家要求取消'
      break;
    case 24:
      return '官方原因收不到信'
      break;
    case 25:
      return '交易纠纷，买卖双方协商取消'
      break;
    case 26:
      return '买卖双方协商价格，重新购买'
      break;
    case 27:
      return '其他原因'
      break;
    case 28:
      return '买家无法及时上线协助交易'
      break;
    default:
      return sta
  }
}
const rechargeTypeFilter = function rechargeTypeFilter(type) {
  switch (type) {
    case 1:
      return '代充'
      break;
    case 2:
      return '首充'
      break;
    case 3:
      return '续充'
      break;
    case 4:
      return '快充'
      break;
    default:

  }
}
const rechargeStatusFilter = function rechargeStatusFilter(type, goodsType) {
  switch (type) {
    case 1:
      return '等待付款'
      break;
    case 2:
      return '已付款，待发货'
      break;
    case 3:
      return '已付款，已发货'
      break;
    case 4:
      return '交易完成'
      break;
    case 5:
      return '已退款'
      break;
    case 6:
      return '已取消'
      break;
    case 7:
      return '退款中'
      break;
    case 8:
      return '已付款'
      break;
    case 9:
      return '申请退款中'
      break;
    case 10:
      return '客服介入'
      break;
    default:

  }
}
const platformTypeFilter = function platformTypeFilter(type) {
  switch (type) {
    case 1:
      return '安卓'
      break;
    case 2:
      return '苹果'
      break;
    default:

  }
}
const cancelReasonFilter = function cancelReasonFilter(sta) {
  switch (sta) {
    case 27:
      return '超时未支付'
      break;
    default:
      return sta
  }
}
const insuranceOrderStatusFilter = function insuranceOrderStatusFilter(sta) {
  switch (sta) {
    case -10:
      return '申诉提交成功，5173客服10分钟内会与您联系'
      break;
    case -1:
      return '不可申保'
      break;
    case 0:
      return '申诉提交成功，5173客服10分钟内会与您联系'
      break;
    case 1:
      return '申诉提交成功，5173客服10分钟内会与您联系'
      break;
    case 2:
      return '客服已联系并确认您的信息，请等待审核结果'
      break;
    case 3:
      return '客服已联系并确认您的信息，请等待审核结果'
      break;
    case 4:
      return '客服已联系并确认您的信息，请等待审核结果'
      break;
    case 5:
      return '客服已联系并确认您的信息，请等待审核结果'
      break;
    case 6:
      return '客服已审核您的申诉信息，请等待处理结果'
      break;
    case 7:
      return '很抱歉，您的申诉未通过'
      break;
    case 8:
      return '很抱歉，您的申诉未通过'
      break;
    case 9:
      return '客服已审核您的申诉信息，请等待处理结果'
      break;
    case 50:
      return '客服已审核您的申诉信息，请等待处理结果'
      break;
    case 51:
      return '客服已审核您的申诉信息，请等待处理结果'
      break;
    case 52:
      return '客服已审核您的申诉信息，请等待处理结果'
      break;
    case 53:
      return '很抱歉，您的申诉未通过'
      break;
    case 54:
      return '申诉退款已打款成功，请留意查收款项'
      break;
    case 55:
      return '很抱歉，您的申诉未通过'
      break;
    default:
      return sta
  }
}

export {
  orderStatusFilter,
  mobGoodsStatusFilter,
  goodsTypeFilter,
  BasicTypeFilter,
  complainResultFilter,
  cancelReasonFilter,
  rechargeTypeFilter,
  rechargeStatusFilter,
  platformTypeFilter,
  insuranceOrderStatusFilter

}
