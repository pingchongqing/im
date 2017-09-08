/**
 * Created by Administrator on 2016/10/14.
 * 首页我要买 历史记录
 */

//添加到本地cooike
function createHistorys(cooikeName,title,vgid,gameImageUrl,levelType){
  var locationUrl = location.href; //获取url中"?"符后的字串
  //获取页面元素
  var titleName =title; //标题
  titleName = titleName.replace("\'","");
  var gameId =vgid;
  gameId = gameId.replace("\'","");
  var gameImgUrl =  gameImageUrl;
  locationUrl = locationUrl.replace("\'","");
  var canAdd = true; //初始可以插入cookie信息
  var hisGame = this.$cookie.set(cooikeName);
  //console.log("添加前数据",hisGame);
  console.log("添加数据：11");
  var maxlen=5;
  var len = 0;
  //初始化长度
  if(hisGame!=null&&hisGame.length>0){
    hisGame = eval("("+hisGame+")");
    len = hisGame.length;
  }
  //是否是重复访问
  var hisGame_json = eval("("+this.$cookie.set(cooikeName)+")");
  var list = "";

  //添加
  if(GetIsAdds(gameId,locationUrl,hisGame_json) == true){
    console.log("添加数据："+titleName);
    var json ="";
    var start = 0;
    var endJson = "]";
    var isth=false;
    console.log("加len:"+len);
    if(hisGame!=null){
      //alert("hisGame.length:"+hisGame);
      for(var i=start;i<hisGame.length;i++){

        if(gameId== hisGame[i].gameId&&titleName== hisGame[i].titleName&&gameImgUrl== hisGame[i].gameImgUrl){
          if(i == len -1)
            json = json + "{\"titleName\":\""+titleName+"\",\"gameId\":\""+gameId+"\",\"locationUrl\":\""+locationUrl+"\",\"gameImgUrl\":\""+gameImgUrl+"\",\"levelType\":\""+levelType+"\"}";
          else
            json = json + "{\"titleName\":\""+titleName+"\",\"gameId\":\""+gameId+"\",\"locationUrl\":\""+locationUrl+"\",\"gameImgUrl\":\""+gameImgUrl+"\",\"levelType\":\""+levelType+"\"},";
          isth=true;
        }else {
          console.log("i:"+i+";start:"+start+";hisGame.length:"+hisGame.length);
          if(i == len -1)
            json = json + "{\"titleName\":\""+hisGame[i].titleName+"\",\"gameId\":\""+hisGame[i].gameId+"\",\"locationUrl\":\""+hisGame[i].locationUrl+"\",\"gameImgUrl\":\""+hisGame[i].gameImgUrl+"\",\"levelType\":\""+hisGame[i].levelType+"\"}";
          else
            json = json + "{\"titleName\":\""+hisGame[i].titleName+"\",\"gameId\":\""+hisGame[i].gameId+"\",\"locationUrl\":\""+hisGame[i].locationUrl+"\",\"gameImgUrl\":\""+hisGame[i].gameImgUrl+"\",\"levelType\":\""+hisGame[i].levelType+"\"},";}
      }
    }
    var jsonNew="";
    if(isth==false) {
      jsonNew = jsonNew + "{\"titleName\":\"" + titleName + "\",\"gameId\":\"" + gameId + "\",\"locationUrl\":\"" + locationUrl + "\",\"gameImgUrl\":\"" + gameImgUrl + "\",\"levelType\":\"" + levelType + "\"},";
      if(maxlen<=len)
        json= json.substring(0, json.lastIndexOf("{")-1);
    }

    json =  "["+jsonNew+json + endJson;
    //console.log(json);
    this.$cookie.set(cooikeName,json,{expires:30, path: '/'});//如果你有其他页面需要共享该cookie，则必须设置该cookie的作用域，否则获取不到。
  }
}

//判断是否已有缓存浏览的游戏记录
function  GetIsAdds(gameId,locationUrl,hisGame_json) {
  //console.log(gameId,locationUrl);
  if(hisGame_json != null){
    //console.log("判断数据是否存在"+hisGame_json.length);
    //如果cookie中存在该页面访问过的记录，则不放入cookie
    for(var i=0;  i<hisGame_json.length;i++) {
      if(gameId == hisGame_json[i].gameId&&locationUrl == hisGame_json[i].locationUrl){
        //console.log(hisGame_json[i].gameId,hisGame_json[i].locationUrl);
        return false;}
    }
  }
  return true;
}

export {createHistorys};