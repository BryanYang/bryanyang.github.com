//0赞一个  1不咋样  2过期
$(".fir").click(function () {
    userMessage($(this).attr("msgId"), 0, $(this).attr("typeId"));
});
$(".sec").click(function () {
    userMessage($(this).attr("msgId"), 1, $(this).attr("typeId"));
});
$(".thi").click(function () {
    userMessage($(this).attr("msgId"), 2, $(this).attr("typeId"));
});
$(document).ready(function () {
    $(".gotoshop").each(
        function () {
            var link = $(this).attr("link");
            link = encode64(link);
            $(this).attr("link", link);
            var mallId = $(this).attr("mallId");
            $(this).removeAttr("mallId");
            $(this).attr("onmouseup", "bindHref(this," + mallId + ",'" + link + "')");
        });
});
$(document).ready(function () {
    $(".gotoMallshop").each(
        function () {
            //            var mid = $(this).attr("onc");
            //            $(this).attr("onclick", "clickAd('deals', " + mid + ")");
            //            $(this).removeAttr("onc");
            var link = $(this).attr("link");
            link = encode64(link);
            $(this).attr("link", link);
            //            var mallId = $(this).attr("mallId");
            //            $(this).removeAttr("mallId");
            $(this).attr("onmouseup", "bindPromotionHref(this,'" + link + "')");
        });
});
function bindHref(a, mallId, href) {
    href = decode64(href);
    if (mallId == "0") {
        $(a).attr("href", href);
    } else {
        var Ahref = "/redirect/index?i=" + mallId + "&f=22&u=" + href;
        $(a).attr("href", Ahref);
    }
}
function bindPromotionHref(a, href) {
    href = decode64(href);
    //    if (mallId == "0") {
    $(a).attr("href", href);
    doH();
    //    } else {
    //        var Ahref = "/redirect/index?mallId=" + mallId + "&qnum=Qf22NMBP"+proId+"&selfUrl=" + href;
    //        $(a).attr("href", Ahref);
    //    }
}
function userMessage(discoveryId, categoryId, typeId) {
    $.post("/discovery/SubMitUserMessage", { "discoveryId": discoveryId, "categoryId": categoryId, "typeId": typeId }, callback);
}
function callback(data) {
    if (data.Code == 0) {
        alert(data.Desc);
    }
    else if (data.Code == 3) {
        setTimeout(function () { $("#bl_vote_tips" + data.Desc).attr("style", "display:none;"); }, 5000);
        $("#bl_vote_tips" + data.Desc).attr("style", "display:block;");
    } else if (data.Code == 555) {
        $("#" + data.Desc).text(parseInt($("#" + data.Desc).text()) + 1);
        $("#span" + data.Desc).removeAttr("style");
    } else {
        alert(data.Desc);
    }
}
function doH() {
    var tag = $("#mallTag").val();
    var mallUrl = $("#mallUrlName").val();
    var mallCPSUrl = $("#mallCPSUrl").val();
    var obj = $("#to_url");
    var href = $("#to_url").attr("href");
    if (href.indexOf(mallUrl) >= 0 || (mallUrl.indexOf('yihaodian') >= 0 && href.indexOf('1mall') >= 0)) {
        if (window.RegExp && window.encodeURIComponent) {
            var enCodeHref = encodeURIComponent(href);
        }
        var id = SetUrl(mallCPSUrl, enCodeHref, tag, href);
        $("#to_url").bind('click', function () {
            $("#to_url").attr("href", id);
            setTimeout(function () {
                obj.href = href;
            }, 500);
        });
    }
    function SetUrl(p, u, t, h) {
        if (p.indexOf("{0}") >= 0) {
            p = p.replace("{0}", t);
        }
        var secondHttpIndex = p.lastIndexOf("http");
        if (secondHttpIndex > 4) {
            return p.substring(0, secondHttpIndex) + u;
        } else {
            return h;
        }
    }
}