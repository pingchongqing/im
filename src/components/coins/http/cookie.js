function getCookie(name){
  var strCookie=document.cookie;
  var arrCookie=strCookie.split("; ");
  for(var i=0;i<arrCookie.length;i++){
    var arr=arrCookie[i].split("=");
    if(arr[0]==name)return arr[1];
  }
  return "";
}
export {
  getCookie
};