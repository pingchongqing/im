/**
 * Created by 严俊东 on 2017/3/14.
 */

/**
 * 搜索返回数据
 * @param num 数量
 * @returns {Promise} 返回一个含游戏名数组的一个对象
 *  {
   *    list: [<Object>]
   *  }
 */

function getSearch(num = 10, str = '', gtype) {
    return new Promise((resolve, reject) => {
        if (str.trim().length == 0) {
            resolve({list: []});
            return
        }
        let mq = {'keyword': str}
        if (gtype) {
          Object.assign(mq, {'goodsType':gtype})
        }
        this.vm.$http.post(
            this.vm.$CONSTANTS.APISearchCenter + 'gameSearch/searchKeyword',
            {
                mapRequest: mq,
                pageIndex: 1,
                pageSize: num
            }
        ).then((res) => {
            if (
                res != null
                && res['body'] != null
                && res['body']['result'] != null
                && res['body']['result']['gameSearchEOList'] != null
            ) {
                resolve({list: res.body.result.gameSearchEOList})
            } else {
                console.error("服务返回参数异常", res);
                reject();
            }
        }, () => {
            console.error("请求错误： getSearch(搜索引擎)");
            reject();
        });
    })
}

export {getSearch}
