(function () {
    $backToTopEle = $('<div class="backToTop"></div>').appendTo($("body"))
        .html("<img src='http://www.yifen.com/Content/Images/gotop.jpg' id='goTop' title='返回顶部' /><a href='#' target='_blank'><img src='http://www.yifen.com/Content/Images/wx_btn.jpg' title='关注一分网微信' style='margin-top:10px' /></a>");
    $("#goTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 120);
        $(".promotionforday").css("position", "static");
        $(".promotionforday").css("top", "0");
    }), $backToTopFun = function () {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0) ? $backToTopEle.show() : $backToTopEle.hide();
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);
        }
    };
    var windowWidth = parseInt($(window).width());
    var dp_category_left_width = parseInt($(".ym-g21").outerWidth(true));
    var float_left = ((windowWidth / 2) + 500) + "px";
    $(".backToTop ").css("left", float_left);
    $(window).bind("scroll", $backToTopFun);
    $(function () { $backToTopFun(); });
})();