$(document).ready(function () {
    $(".dp_category_left").css("position", "fixed");
    $(".dp_category_left").css("top", "160");
    imgscroll($("#act_subject"));
    imgscroll($("#banner"));

    showtabs($("#hot_sales"))
    $("#jf_exchange").jMarquee({
        visible: 3,
        step: 1,
        direction: "up"
    });
    $("#getquan").jMarquee({
        visible: 5,
        step: 1,
        direction: "up"
    });

    $(".dp_category_left li").hover(function () {
        $(".dp_category_left li").css("z-index", "0")
        $(this).css("z-index", "10000")
        if ($(this).find(".sub_category").length > 0) {
            $(this).find(".sub_category").show();
            $(this).find(".cat").addClass("cat_hover")
        }
    }).mouseleave(function () {
        $(this).find(".sub_category").hide();
        $(this).find(".cat").removeClass("cat_hover")
    })
    $(".sub_category").hover(function () {
        $(this).css("z-index", "-100")
    }

)
    $(".gotomall").hover(function () {
        $(this).find("ul").show();
    }).mouseleave(function () {
        $(this).find("ul").hide();
    })
});

