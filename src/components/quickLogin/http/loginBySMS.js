/**
 * Created by 严俊东 on 2017/3/23.
 */

/**
 * 验证验证码
 * @param params
 */
function loginBySMS(params) {
    return new Promise((resolve) => {
        this._http.jsonp(
            '/api/mobile-user-service/rs/account/login/unionLoginByMobile',
            {
                params: params,
                headers: {
                    contentType: "application/json; charset=UTF-8",
                    dataType: "jsonp"
                }
            }
        ).then((res) => {
            resolve(res)
        }, () => {
            console.error("请求异常： loginBySMS")
        })
    })
};

function unionLoginByMobile (params) {
     return   this._http.get('/api/mobile-user-service/rs/account/login/unionLoginByMobile',{params:params});
}

export {loginBySMS,unionLoginByMobile}
