/**
 * Created by 严俊东 on 2017/3/27.
 */

function getSwitch(type = 'isAll') {
    let body = {mapRequest: {}};
    if (type == 'isAll') {
        body.mapRequest[type] = true;
    } else {
        body.mapRequest.type = type;
    }
    return new Promise((resolve, reject) => {
        this.vm.$http.post(
            this.vm.$CONSTANTS.APISearchCenter + 'OnoffService/selectOnoff',
            body
        ).then((res) => {
            if (
                res['body']['result'] != null
            ) {
                resolve(res.body.result);
            } else {
                console.error("服务返回参数异常", res);
                resolve(null);
            }
        }, () => {
            console.error("请求失败： 开关接口");
            reject();
        });
    });
}
export {getSwitch}