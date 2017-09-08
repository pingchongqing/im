/**
 * Created by 严俊东 on 2017/3/23.
 */
/**
 * 获取账号信息
 * @returns {Promise}
 */
function getAccount() {
    return new Promise((resolve,reject) => {
        this._http.post(
            '/api/mobile-user-service/rs/account/queryCurrentUserInfo').then((res) => {
            let resq = res.body;
            resolve(resq);
        }, () => {
            reject();
            console.error("请求异常： getAccount")
        })
    })

};

export  {getAccount}
