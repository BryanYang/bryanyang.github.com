var IsShow = true;
$(document).ready(function () {
    $(".dp").each(function () {
        $(".oper").click(function () {
            $(this).parents(".list_relevant").find(".relevant_tips").show();
            setInterval(function () { $(".relevant_tips").hide() }, 3000)
        })
    })
    //切换本周和本月热门省钱够
    $("#li_week_promotion").click(function () {
        $("#div_week_promotion").css("display", "block");
        $("#div_month_promotion").css("display", "none");
        $(this).addClass("selected");
        $("#li_month_promotion").removeClass();
    });
    $("#li_month_promotion").click(function () {
        if (IsShow) {
            IsShow = false;
            $.post("/home/GetPromotionByMonth", {}, function (data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var a = "<dl class=\"clearfix\"><dt><span class=\"num\">" + (i + 1);
                        if (data[i].ActionType == "6") {
                            a = a + "</span><a target=\"_blank\" title=\"title\" href=\"http://www.yifen.com/haitao/detail-" + data[i].Id + ".html\">";
                        }
                        else {
                            a = a + "</span><a target=\"_blank\" title=\"title\" href=\"http://www.yifen.com/deals/detail-" + data[i].Id + ".html\">";
                        }
                        a = a + "<img alt=\"" + data[i].Title + "\" src=\"" + data[i].ImgPath + "\" width=\"50\" height=\"50\" /></a></dt><dd><p>";
                        if (data[i].ActionType == "6") {
                            a = a + "<a target=\"_blank\" href=\"http://www.yifen.com/haitao/detail-" + data[i].Id + ".html\">";
                        }
                        else {
                            a = a + "<a target=\"_blank\" href=\"http://www.yifen.com/deals/detail-" + data[i].Id + ".html\">";
                        }
                        a = a + data[i].Title + data[i].HtmlTitle + "</a></p></dd></dl>";
                        $("#div_month_promotion").append(a);
                    }
                }
                $("#div_month_promotion").css("display", "block");
                $("#div_week_promotion").css("display", "none");
                $("#li_month_promotion").addClass("selected");
                $("#li_week_promotion").removeClass();
            });
        } else {
            $("#div_month_promotion").css("display", "block");
            $("#div_week_promotion").css("display", "none");
            $(this).addClass("selected");
            $("#li_week_promotion").removeClass();
        }
    });
})
$(window).scroll(function () {
    is_opera = /opera/i.test(navigator.userAgent);
    var is_ie = (/msie/i.test(navigator.userAgent) && !is_opera)
    //代码
    var scrollTopHeight = $("html,body").height();
    if ($(window).scrollTop() > 0) {
        if ($(window).scrollTop() >= 1350) {//如果加谷歌广告就要加上广告的高度
            if (!!window.ActiveXObject && !window.XMLHttpRequest) {
                $(".promotionforday").css("position", "absolute");
                $(".promotionforday").css("top", $(window).scrollTop() - 20)
            }
            else {
                $(".promotionforday").css("position", "fixed");
                $(".promotionforday").css("top", "0")
            }
        }
        else {
            $(".promotionforday").css("position", "static");
        }
        if ($(window).scrollTop() >= scrollTopHeight - 800) {
            $(".promotionforday").css("position", "absolute");
            $(".promotionforday").css("top", $(window).scrollTop() - 270)
           //$(".promotionforday").css("top", $(window).scrollTop() - 250);
        }
    }
    else {
        $(".promotionforday").css("position", "none");
        $(".promotionforday").css("top", "0")
    }
    if ($(window).scrollTop() == 0) {
        $(".promotionforday").css("position", "static");
        $(".promotionforday").css("top", "0")
     }
});
