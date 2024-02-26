const sha256 = require("js-sha256").sha256;

const dict = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-";

const jm = (secretKey, message) => {
    let str = "", st = 18, arry = sha256.hmac.digest(secretKey, message);
    console.log(arry);
    for (let code of arry) {
        console.log(code);
        str += dict[code%64];
        if (code < st) {
            st = code;
        }
    }
    console.log("st=" + st);
    console.log(str);
    return str.substring(st, st+14);
}

export default {
    jm: jm
}