/**
 * Created by Administrator on 2017/5/10.
 */
var screenHeight;

function getScreenHeight() {
    return screenHeight;
}

function setScreenHeight(){
    screenHeight= Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}
export {getScreenHeight,setScreenHeight}