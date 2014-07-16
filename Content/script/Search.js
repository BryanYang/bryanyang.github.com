var hasSearch = 0;
//5月需求
$(document).ready(function () {
    $("#custom41").attr("checked", "true");
    var strCookie = document.cookie;
    if (strCookie) {
        var a = strCookie.split(";");
        for (var kFinve = 0; kFinve < a.length; kFinve++) {
            var b = a[kFinve].split("=");
            var b0 = b[0];
            var b1 = b[1];
            if (b0 == "searchKey" || b0 == " searchKey") {
                hasSearch = b1;
                $("#SearchId").val(b1);
                if (b1 == "0") {
                    $(".search_option").find("span").text("省钱购");
                } else if (b1 == "1") {
                    $(".search_option").find("span").text("海 淘");
                } else if (b1 == "2") {
                    $(".search_option").find("span").text("优惠券");
                } else if (b1 == "3") {
                    $(".search_option").find("span").text("购攻略");
                }
                GetHotKey(b1);
            } else if (b0 == "productId" || b0 == " productId") {
                var valueId = b1.split(",");
                for (var j = 0; j < valueId.length; j++) {
                    for (var i = 0; i < 11; i++) {
                        if ($("#spancategory" + i).attr("value") == valueId[j]) {
                            $("#spancategory" + i).attr("class", "selected");
                        };
                    }
                }
            } else if (b0 == "cateId" || b0 == " cateId") {
                var valueId = b1.split(",");
                for (var z1 = 0; z1 < valueId.length; z1++) {
                    if (valueId[z1] == 1) {
                        $("#custom11").attr("class", "selected");
                    }
                    else if (valueId[z1] == 6) {
                        $("#custom12").attr("class", "selected");
                    }
                }
            } else if (b0 == "exper" || b0 == " exper") {
                var valueId = b1.split(",");
                for (var x1 = 0; x1 < valueId.length; x1++) {
                    if (valueId[x1] == 1) {
                        $("#RadioGroup1_0").attr("checked", "checked");
                        $("#RadioGroup1_1").removeAttr("checked");
                    }
                    else if (valueId[x1] == 2) {
                        $("#RadioGroup1_0").removeAttr("checked");
                        $("#RadioGroup1_1").attr("checked", "checked");
                    }
                }
            }
        }
    }
    $("#inputSearch").keyup(
    function (event) {
        if ($("#SearchId").val() == 2) {
            if (!(event.keyCode > 36 && event.keyCode < 41)) {
                $.post("/search/SearchKey", { key: $("#inputSearch").val(), type: 2 }, function (data) {
                    //搜索
                    $('#inputSearch').AutoComplete({
                        'data': data,
                        'itemHeight': 20,
                        'width': 330
                    }).AutoComplete('show');
                });
            }
        }
        else {
            //搜索
            $('#inputSearch').AutoComplete({
                'data': null,
                'itemHeight': 20,
                'width': 330
            }).AutoComplete('show');
        }
    });
    //所有类别
    $(".index_category ").hover(function () {
        $(this).find("ul").slideDown();
        $(this).find(".title").addClass("on")
    }).mouseleave(function () {
        $(this).find("ul").hide();
        $(this).find(".title").removeClass("on")
    })
    //自定义浏览设置
    $(".index_custom .title").click(function () {

        if ($(".index_custom .on ").length > 0) {
            $(this).parents(".index_custom").find(".options").hide();
            $(this).removeClass("on")
        }
        else {
            $(this).parents(".index_custom").find(".options").slideDown();
            $(this).addClass("on")
        }
    });
    //重置
    $("#reset_btn").click(function () {
        $(".options span").removeClass("selected")
        $(".options input[type='radio'],.options input[type='checkbox']").attr("checked", false);
    })
    //
    $("#sx_btn").click(function () {
        $(".options").hide();
        $(".index_custom .title").removeClass("on");
        $(".index_custom .title").html("<i></i>您的自定义选项");
        SetCookies();
    })
    $(".options span").click(function () {
        $(this).toggleClass("selected")
    })
    //搜索框选择菜单
    $(".search_option span").click(function () {
        if ($(".search_option .on ").length > 0) {
            optionHide($(this))
        }
        else {
            optionShow($(this))
        }
    })
    $(".search_option li").click(function () {
        var typeId = $(this).index();
        GetHotKey(typeId);
        $("#SearchId").val($(this).index());
        if (hasSearch != typeId) {
            document.cookie = "searchKey=" + $(this).index();
        }
        var selectedValue = $(this).text();
        $(this).parents(".search_option").find("span").text(selectedValue);
        optionHide($(".search_option span"))
    })
    function optionHide(obj) {
        obj.removeClass("on");
        obj.parents(".search_option").find("ul").hide();
    }
    function optionShow(obj) {
        obj.addClass("on");
        obj.parents(".search_option").find("ul").slideDown();
    }

    //以前的 start------------------------------------------
    /*绑定搜索按钮事件*/
    $("#btn_search").click(PostSearch);
    /*如果用户按下的是回车键则触发搜索事件*/
    $(".search-input").keydown(function () {
        var keycode = event.which;
        if (keycode == 13) {
            PostSearch();
        }
    });
    /*搜索*/
    function PostSearch() {
        var key = $(".search-input").val();
        if (awan.IsNull(key)) {
            $(".search-input").focus();
            alert("请输入搜索关键字");
        }
        else {
            var tag = $("#SearchId").val();
            window.location.href = "/search/?tap=" + tag + "&keyword=" + escape(key);
        }
    }
    /*搜索输入*/
    $(".search-input").focus(function () {
        if (this.value == "请输入搜索关键词") {
            this.value = "";
            $(this).css("color", "#000");
        }
    });
    //以前的 end-----------------------------------------
});
function PromotionSearchKey() {
    $(".search_option").find("span").text("省钱购");
    $("#SearchId").val(0);
    GetHotKey(0);
}
function HaiTaoSearchKey() {
    $(".search_option").find("span").text("海 淘");
    $("#SearchId").val(1);
    GetHotKey(1);
}
function QuanSearchKey() {
    $(".search_option").find("span").text("优惠券");
    $("#SearchId").val(2);
    GetHotKey(2);
}
function JCSearchKey() {
    $(".search_option").find("span").text("购攻略");
    $("#SearchId").val(3);
    GetHotKey(3);
}
function GetHotKey(typeId) {
    $.post("/search/SearchHotKey", { type: typeId }, function (data) {
        var result = "";
        if (data.length > 0) {
            result = "<span class='red'>热门关键词:</span>";
        }
        for (var i = 0; i < data.length; i++) {
            result += "<a onclick='addClick(" + data[i].HkId + "," + typeId + ")' href='" + data[i].Url + "' alt='" + data[i].HkATitle + "' rel='nofollow'>" + data[i].HkWord + "</a>"
        }
        $("#hotKey").html(result);
    });
}

function SetCookies() {
    var temp = 0;
    var cateId = "";
    var productId = "";
    var guoqi = 0;
    var custom11 = $("#custom11").attr("class") == "selected" ? 1 : 0;
    var custom12 = $("#custom12").attr("class") == "selected" ? 6 : 0;
    if (custom11 != 0) {
        cateId += custom11 + ",";
    }
    if (custom12 != 0) {
        cateId += custom12;
    }
    for (var i = 0; i < 11; i++) {
        temp = $("#spancategory" + i).attr("class") == "selected" ? $("#spancategory" + i).attr("value") : 0;
        if (temp != 0) {
            productId += temp + ",";
        }
    }
    if ($("#RadioGroup1_0").is(":checked")) {
        guoqi = 1;
    }
    else if ($("#RadioGroup1_1").is(":checked")) {
        guoqi = 2;
    }
    $.post("/home/SetCookies", { cateId: cateId, productId: productId, exper: guoqi, setData: $("#custom41").is(":checked") }, function (data) {
        if (data["Code"] == "0") {
            window.location.href = window.location.href;
        }
    });
}
function bindCookies() {

}