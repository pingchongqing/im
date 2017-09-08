/**
 * Created by Administrator on 2017/5/22.
 */
function isLocalStorageSupported() {
    var testKey = 'test',
        storage = window.localStorage;
    try {
        storage.setItem(testKey, 'testValue');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

export {isLocalStorageSupported}