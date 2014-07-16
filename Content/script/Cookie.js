function setCookie(name, value, expires, domain) {
    if (!expires) {
        expires = new Date();
        expires.setYear(expires.getFullYear() + 10);
    }
    document.cookie = name + " = " + escape(value) + "; path=/; " + (domain && "domain=" + domain + ";" || "")
     + " expires=" + expires.toGMTString();
}
function GetCookieVal(_) {
    var $ = document.cookie.indexOf(";", _);
    if ($ == -1) {
        $ = document.cookie.length;
    }
    return unescape(document.cookie.substring(_, $));
}
function GetCookie(A) {
    var _ = A + "=", $ = _.length, B = document.cookie.length, D = 0;
    while (D < B) {
        var C = D + $;
        if (document.cookie.substring(D, C) == _) {
            return GetCookieVal(C);
        }
        D = document.cookie.indexOf(" ", D) + 1;
        if (D == 0) {
            break;
        }
    }
    return null;
}
function window_onerror(A, $, _) {
    return true;
}
window.onerror = window_onerror;
if (window.location.href.indexOf(".yifen.com") > 0) {
    window.onerror = window_onerror;
}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$E)/g, "");
};