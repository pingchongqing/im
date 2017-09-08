/**
 * Created by 严俊东 on 2017/3/23.
 */

function getAccount() {
  return this.$http.post(
    this.$CONSTANTS.APILogin + 'account/queryCurrentUserInfo',
    {},
    {
      headers: {
        contentType: "application/json; charset=UTF-8",
        dataType: "json"
      }
    }
  ).then((res) => {
    console.log(res);
    let resq = res.body;
    if (resq.responseStatus != null
      && resq.responseStatus.code != null) {
      if (resq.responseStatus.code == '00') {
        this.account = resq.userInfo;
        return resq.userInfo
      }
    } else {
      console.error("服务器返回参数异常", resq);
    }
  }, (res) => {
    console.log(res);
    console.error("请求异常： getAccount")
  }).then(account => account || null)
}
export  {getAccount}
