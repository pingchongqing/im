/*
* @Author: fredlee
* @Date:   2017-04-19 13:09:13
* @Last Modified by:   fredlee
* @Last Modified time: 2017-04-19 16:06:35
*/

import {SEARH_GOODS_LIST} from './type'
import api from '../api'


const searchGoodsList=({ commit }, data) => {
 	api.searchGoodsList(data)
 	.then((respone)=>{
 		 commit(SEARH_GOODS_LIST, response.data);
 	},(respone)=>{
 		console.log(respone);
 	})
};

export default{
searchGoodsList,
}