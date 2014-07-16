var getQuanClickFlag = 0; //设置领券点击标记,防重复点击
var isIe = true;
var ueserAgent = navigator.userAgent.toLowerCase();
isIe = ueserAgent.match(/msie ([\d.]+)/) != null;
var owFlag = 0;


//滑动门
/*
选项条ul的class为"tabs"；
内容的class为"tabs_con"；
选中项的样式为selected；
*/
function showtabs(container) {
    var tabs = container.find(".tabs li");
    var len = container.find(".tabs li").length;
    var cons = container.find(".tabs_con");
    for (var i = 0; i < len; i++) {
        if (tabs.eq(i).hasClass("selected")) {
            cons.hide();
            cons.eq(i).show();
        }
    }
    tabs.click(function () {
        var index = tabs.index(this);
        tabs.removeClass("selected");
        $(this).addClass("selected");
        cons.hide();
        cons.eq(index).show();
    });
}

$(document).ready(function () {
    $("#logSubmit").keydown(function () {
        var keycode = event.which;
        if (keycode == 13) {
            PageLogon();
        }
    });
    lazyImgLoad($(".lazy_img"));
    var quanBot = document.getElementById("quan_bottom");
    if (quanBot != undefined && quanBot != null && !isIe) {
        $.post("/mall/FromBS", { mallid: $("#mallHiddenId").val(), quanid: $("#hidquanid").val() }, function (data) {
            document.getElementById("quan_bottom").innerHTML = data;
        })
    }

    if (document.getElementById("used_number_table") != null) {
        $("#default_copy_finished_close").click(function () {
            closeDiv("default_copy_finished");
        });
        if (isIe) {
            $("#used_number_table").bind("copy", function (data) {
                var sucHint = data.srcElement.innerHTML + "券号已成功复制";
                if (owFlag == 0) {
                    $("#quan_number_span").html(sucHint);
                    openDiv('default_copy_finished');
                    window.setTimeout(function () { window.open($("#default_copy_finished_a").attr("href")) }, 800);
                    owFlag = 1;
                }
                else {
                    $("#quan_number_span").html(sucHint);
                    $("#default_copy_finished_bottom").html("");
                    openDiv('default_copy_finished');
                }
            });
        }
    }
    /*收藏我们*/
    $("#addFav").click(function () {
        var b = "网购省钱，就上一分网";
        var a = "http://www.yifen.com/?s=bookmark";
        if (document.all) {
            window.external.AddFavorite(a, b)
        } else if (window.sidebar) {
            window.sidebar.addPanel(b, a, "")
        } else {
            alert("对不起，您的浏览器不支持此操作!\n请您拖动该链接到收藏夹或使用Ctrl+D收藏一分网。")
        }
    });
    /*覆盖剪刀*/
    $(".mallrecommand,.mallclass_img,.quan").mouseover(function () {
        if ($(this).find(".commonquan_tips") != null) {
            $(this).find(".scissors").hide()
            $(this).find(".commonquan_tips").animate({ bottom: "0" });
            return;
        }
        $(this).find(".scissors").show();

    }).mouseleave(function () {
        if ($(this).find(".commonquan_tips") != null) {
            $(this).find(".commonquan_tips").animate({ bottom: "-30px" });
            return;
        }
        $(this).find(".scissors").hide()
    });

    if ($("#viewMoreUsedbtn") != undefined) {
        $("#viewMoreUsedbtn").click(function () {
            $.get("/quan/getallusedquan", { id: $("#hidquanid").val() }, function (data) {
                $("#usedQuanTbody").html(data);
                $("#viewMoreUsedbtn").html(""); //置空文字
            });
        });
    }
})
var awan = {
    Write: function Write(text) {
        document.write(text + "<br />");
    },
    IsMobile: function IsMobile(mobile) {
        var reg = /^1(3[0-9]|4[0-9]|5[0-9]|8[0-9])[0-9]{8}$/;
        return reg.test(mobile);
    },
    IsEmail: function IsEmail(email) {
        //var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        //var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(email);
    },
    //长度为6-16个字符,只能有数字和英文组成
    IsPass: function IsPass(pass) {
        var reg = /^[a-zA-Z0-9`~@!#$%^&*()-=_+]{6,16}$/;
        return reg.test(pass);
    },
    //长度为6-16位，包含字母、数字、特殊字符.
    IsPassWord: function IsPassWord(pass) {
        var reg = /^[\w~!@#$%^&*()_+{}:"<>?\-=[\];\',.\/]{6,16}$/;
        return reg.test(pass);
    },
    IsHex: function IsHex(hex) {
        var reg = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
        return reg.test(hex);
    },
    IsSlug: function IsSlug(slug) {
        var reg = /^[a-z0-9-]+$/;
        return reg.test(slug);
    },
    IsUrl: function IsUrl(url) {
        var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return reg.test(url);
    },
    IsIp: function IsIp(ip) {
        var reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return reg.test(ip);
    },
    IsHtmlTag: function IsHtmlTag(tag) {
        var reg = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
        return reg.test(tag);
    },
    //只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
    //    IsNickName: function IsNickName(nickname) {
    //        var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    //        return reg.test(nickname);
    //    },
    IsNickName: function IsNickName(nickname) {
        return (nickname.length >= 5 && nickname.length <= 16);
    },
    IsPhone: function IsPhone(phon) {
        var reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;
        return reg.test(nickname);
    },
    IsNull: function IsNull(val) {
        if (val == "") return true;
        var reg = /^[ ]+$/; ;
        return reg.test(val);
    },
    IsCode: function IsCode(code) {
        var reg = /^[A-Za-z0-9]+$/;
        if (code.length == 4 && reg.test(code)) {
            return true;
        }
        return false;
    },
    IsNum: function IsNum(num) {
        var reg = /^[0-9]*[1-9][0-9]*$/;
        return reg.test(num);
    },
    IsObject: function IsObject(obj) {
        var bl = false;
        if (val != undefined && obj != "undefined")
            bl = true;
        return bl;
    },
    EqualValue: function EqualValue(v1, v2) {
        if (v1 != v2) { return false; }
        return true;
    }, /*checkbox: id选择呢器或类选择器*/
    CheckValue: function CheckValue(ck) {
        if ($('.' + ck).size() > 0) {
            var obj = $('.' + ck);
            if (obj.attr("checked")) {
                obj.val(1);
                return obj.val();
            }
        }
        else if ($('#' + ck).size() > 0) {
            var obj = $('#' + ck);
            if (obj.attr("checked")) {
                obj.val(1);
                return obj.val();
            }
        }
        return -9999;
    },
    /**
    * inputObj: input对象 如：$("input")
    * spanObj: 提示信息控件ID
    * message: 提示信息
    * rw: 1为错误提示,2为正确提示
    * num: 0为显示文字和图片，1为显示只显示图片，默认显示文字
    */
    OperateCss: function OperateCss(inputObj, spanObj, message, rw, num) {
        spanObj = $('#' + spanObj);
        if (rw != 2) {
            inputObj.removeClass("log_input");
            inputObj.addClass("errorinput");
        }
        switch (num) {
            case 0:
                /*显示文字和图片*/
                if (rw == 1) {
                    spanObj.html(message).removeClass("check_right");
                    spanObj.html(message).addClass("check_fault");
                }
                if (rw == 2) {
                    spanObj.html(message).removeClass("check_fault");
                    spanObj.html(message).addClass("check_right");
                }
                break;
            case 1:
                /*只显示文字*/
                if (rw == 1)
                    spanObj.html(message).css("color", "Red");
                if (rw == 2)
                    spanObj.html(message).css("color", "color:#b2d234;");
                break;
        }
    }
}

var MessFault = {
    email: "email为空或格式不正确",
    mobile: "手机号为空或格式不正确",
    nickname: "昵称应在5-16字符之间",
    pass: "密码格式错误",
    password: "重复密码输入错误",
    code: "验证码为空或格式错误",
    mobilecode: "请输入有效的手机验证码",
    check: "请同意一分网的服务条款",
    mobileAsemail: "请输入正确的邮箱或手机号",
    presenceEmail: "此邮箱已被注册"
}
var MessRight = {
    email: "恭喜输入正确",
    nickname: "哇，又输入对了",
    pass: "你真棒，这个密码符合要求",
    password: "请记住你的密码哦！",
    code: "没错，验证码就是4位的整数"
}
var clip = null;

function GetQuan() {
    if (getQuanClickFlag == 1) {
        $(this).text("领取中...");
        return;
    }
    try {
        $(".bdlikebutton-inner").click();
    } catch (e) { }
    var txtword = $("#txtwords").val();
    var num = $("#num").val();
    if (num == 1 && txtword != "yifen.com") {
        alert("输入内容错误！");
        return;
    }
    if (num == 2 && txtword != "www.yifen.com") {
        alert("输入内容错误！");
        return;
    }

    $.post("/quan/getquan", { id: $("#hidquanid").val() }, NewQuanBack);

}
function NewQuanBack(data) {
    if (data == null) {
        $(".gotomall_unload").show();
        $(".close").click(function () {
            $(".gotomall").hide();
            return;
        });
    }
    switch (data["Code"]) {
        case "0":
            if (document.getElementById("create_frendship") != null && $("#create_frendship").val() == 1) {
                //微博关注，QQ分享
                $.get("/openid/creatfriendship", { mallid: $("#mallid").val(), quanname: $("#sendCopyQuanName").text() });
            }
            var mallUrl = $("#getMallUrl").val();
            if (mallUrl == "www.51buy.com" || mallUrl == "www.newegg.com.cn") {
                $("#inputIframe").remove();
            }
            else {
                var requestIframe = document.getElementById("requstIframe");
                if (requestIframe != null) {
                    $("#inputIframe").attr("src", ($("#requstIframe").attr("src")));
                    $(".overtop").remove();
                    $(".header").remove();
                    $("#hidenFootDiv").remove();
                    $("#body_div").remove();
                }
                else {
                    $("#inputIframe").remove();
                }
            }
            $("#goIframe").show();
            $("#indexURL").val(data["Desc"]);
            $("#copy_button").attr("data-clipboard-text", data["Desc"]);
            $("#goIframe").css("z-index", "999");
            break;
        case "1":
            alert(data["Desc"]);
            break;
        case "2":
            $.post("/memberinfo/viewpoint", /*{ desc: data["Desc"] },*/NewDescBack);
            return;
        case "3":
            alert(data["Desc"]);
            break;
        case "4":
            {
                alert(data["Desc"]);
                $("#txtwords").focus();
            }
        default:
            break;
    }
}
function NewDescBack(data) {
    $(".gotomall").show();
    $(".close").click(function () {
        $(".gotomall").hide();
    });
    showtabs($("#gotomall"))
    getQuanClickFlag = 0;
}


/*刷新页面*/
function RefreshHref() {
    window.location.href = window.location.href;
}

/*积分商城*/
function postSwap(id, regStr, isInput, hint, isConfirm) {
    var firstInput = "";
    var confrimInput = "";
    if (isInput) {
        firstInput = $("#firstInput").val();
        if (isConfirm) {
            confrimInput = $("#confirmInput").val();
            if (firstInput != confrimInput) {
                $(".mob_message").html("二次输入不一致，请检查!");
                return false;
            }
        }
        if (regStr.length > 0) {//正则检查
            var reg = new RegExp(regStr);
            if (!reg.test(firstInput)) {
                $(".mob_message").html("输入的" + hint + "不正确，请检查!");
                return false;
            }
        }
    }
try{
    closeDiv("swapDialog");
}catch(ex){console.log(ex.message);}
    $.post("/Swap/PostSwap/", { id: id, input1: firstInput, input2: confrimInput }, function (data) {
        if (data["Code"] == "0") {
            $("#swapHintStrDiv").addClass("successHint");
        }
        $("#swapHintStrDiv").html(data["Desc"]);
        openDiv("swapHintDialog");
    });
}


function doSwap(isLogon, memberPoint, needPoint, memberRegiste, needRegiste, memberGold, needGold, id, hint, isConfirm, regStr) {
    initSwap(); //初始化一些对话框
    if (!isLogon || (memberPoint < needPoint) || (memberRegiste < needRegiste) || (memberGold < needGold)) {
        var errMsg = "";
        if (!isLogon) {
            errMsg = "<p style='margin-bottom:15px;'>对不起,你还未登录一分网帐号</p>";
            errMsg += "<p style='color:#999;font-size:14px;'><a href='/member/logon' class='button'>立即登录</a>还没账号?<a href='/member/register'>马上注册</a></p>";
        } else if (memberPoint < needPoint) {
            errMsg = "对不起该物品需要" + needPoint + "积分，你目前只有";
            errMsg += memberPoint + "积分,如何<a href='/pointrule.html'>获取积分</a>";
        } else if (memberRegiste < needRegiste) {
            errMsg = "对不起该物品需要" + needRegiste + "威望，你目前只有";
            errMsg += memberPoint + "威望,如何<a href='/pointrule.html'>获取威望</a>";
        } else if (memberGold < needGold) {
            errMsg = "对不起该物品需要" + needGold + "金币，你目前只有";
            errMsg += memberGold + "金币,如何<a href='/pointrule.html'>获取金币</a>";
        }
        $("#swapHintStrDiv").html(errMsg);
        openDiv("swapHintDialog");
        return false;
    }
    if (hint.length > 0) {
        $("#firstInputTitleTd").text(hint);
        if (isConfirm) {
            $("#confirmTr").show();
            $("#confirmInputTitleTd").text("再次" + hint);
        }
        openDiv("swapDialog");
        $("#swapAHref").click(function () { postSwap(id, regStr, true, hint, isConfirm); });  //附加事件
    } else {
        postSwap(id, regStr, false, hint, isConfirm)
    }
}

function initSwap() {
    $("#swapHintStrDiv").html("");
    $("#confirmTr").hide();
    $("#firstInputTitleTd").text("");
    $("#confirmInputTitleTd").text("");
    $("#firstInput").val("");
    $("#confirmInput").val("");
}

function supportIeCopy(copyText) {
    owFlag = 1; //已经打开过链接
    if (isIe) {
        window.clipboardData.setData('text', copyText);
        $("#quan_number_span").html(copyText + "券号已成功复制");
        openDiv('default_copy_finished');
    } else {
        $("#quan_number_span").html(copyText + "券号复制失败了");
        $("#default_copy_finished_bottom").html("请手动复制一下吧");
        $(".quan_copy").removeClass("quan_copy_suc");
        openDiv('default_copy_finished');
    }
}


function lazyImgLoad(selector) {
    selector.each(function () {
        var src = $(this).attr("data-src");
        var oSrc = $(this).attr("src");
        if (src != null && src != "" && oSrc.indexOf("blank.png") > 0) {
            $(this).attr("src", src);
            $(this).removeAttr("class");
        }
    });
}

function clickAd(type, id) {
    var dest = "";
    switch (type) {
        case "ad":
            dest = "/ad/click";
            break;
        case "deals":
            dest = "/promotion/click";
            break;
        case "dealsDetail":
            dest = "/promotion/viewdetailclick";
            break;
        default:
            break;

    }
    $.get(dest, { id: id });
}

function lxfEndtime() {
    $(".lxftime").each(function () {
        var lxfday = $(this).attr("lxfday"); //用来判断是否显示天数的变量
        var endtime = new Date($(this).attr("endtime")).getTime(); //取结束日期(毫秒值)
        var nowtime = new Date().getTime();        //今天的日期(毫秒值)
        var youtime = endtime - nowtime; //还有多久(毫秒值)
        var seconds = youtime / 1000;
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var CDay = days;
        var CHour = hours % 24;
        var CMinute = minutes % 60;
        var CSecond = Math.floor(seconds % 60); //"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
        if (endtime < nowtime) {//一个计时结束
            {
                var thisParentNode = $($(this)[0].parentNode);
                var timeDivClass = thisParentNode.attr("class");
                if (timeDivClass.indexOf("start") < 0) {
                    thisParentNode.addClass("start")
                }
                if (timeDivClass.indexOf("start") >= 0) {
                    thisParentNode.removeClass("start");
                }
                var index = $(this).attr("index");
                var isStart = $(this).attr("isStart");
                var btn = $("#qb" + index);
                if (btn.attr("class").indexOf("red_btn") >= 0) {
                    btn.removeClass("red_btn");
                    btn.addClass("gry_btn");
                    btn.attr("href", '');
                    btn.html("即将开始");
                }
                if (btn.attr("class").indexOf("gry_btn") >= 0) {
                    btn.removeClass("gry_btn");
                    btn.addClass("red_btn");
                    btn.attr("href", $(this).attr('data-url'));
                    btn.html("立即抢券");
                }
                var newTime = $(this).attr("endtime2");
                $(this).attr("endtime", newTime);
            }
        } else {

            if ($(this).attr("lxfday") == "no") {
                $(this).html("<span>" + CHour + "</span>时<span>" + CMinute + "</span>分<span>" + CSecond + "</span>秒");          //输出没有天数的数据
            } else {
                $(this).html("<span>" + days + "</span><em>天</em><span>" + CHour + "</span><em>时</em><span>" + CMinute + "</span><em>分</em><span>" + CSecond + "</span><em>秒</em>");          //输出有天数的数据
            }
            //            if (CHour == CMinute && CMinute == CSecond && CSecond == 0) {
            //                
            //                var index = $(this).attr("index");
            //                var isStart = $(this).attr("isStart");
            //                var btn = $("#qb" + index);
            //                if (isStart == "") {
            //                    btn.removeClass("red_btn");
            //                    btn.addClass("gry_btn");
            //                } else {
            //                    btn.removeClass("gry_btn");
            //                    btn.addClass("red_btn");
            //                }
            //            }
        }
    });
    setTimeout("lxfEndtime()", 1000);
};
$(function () {
    lxfEndtime();
});


function toClipboard(copy_id, input_id) {
    var textMsg = document.getElementById(input_id).value;
    var clip = new ZeroClipboard.Client();
    clip.setHandCursor(true);
    clip.setText(textMsg);
    clip.addEventListener('complete', function (client) {
        alert("复制成功");
    });
    clip.glue(copy_id);
}
var IsLogonin = false;
function HideShortCut() {
    $("#SaveShortCutID").hide();
    setCookie("YifenSave", "s");
}
$(function () {
    $("#ShortCutLink").click(function () {
        HideShortCut();
    });
    $("#CloseShortCut").click(function () {
        HideShortCut();
    });
    var cookie = GetCookie("YifenSave");
    setInterval(function () {
        if (IsLogonin) {
            $.ajax({
                type: "POST",
                url: "/Home/GetEmailCount",
                dataType: "text",
                contentType: "application/json;charset=utf-8",
                success: function (msg) {
                    if (msg != "0") {
                        $("#emailSpan").show();
                        $("#emailSpan").html("<a href=\"/memberinfo/viewmessages\" style=\"color:red;\">你有" + msg + "条未读站内信</a>");
                    } else {
                        $("#emailSpan").hide();
                    }
                }
            });
        }
    }, 20000);
    
    /*$.ajax({
        type: "POST",
        url: "/Home/GetUserInfo",
        dataType: "json",
        contentType: "application/json",
        success: function (msg) {
            if (msg.SaveShortCut == "1") {
                if (cookie == null) {
                    $("#ShortCutMsg").html(msg.SaveShortCutTip);
                    $("#SaveShortCutID").show();

                } else {
                    $("#SaveShortCutID").hide();
                }
            }
            if (msg.NickName != "") {
                $("#hiSpan").append(msg.NickName);
            }
            if (msg.IsLogin) {
                IsLogonin = true;
                $("#UserLogin").append($("#LoginExit").html());
                $("#em").after($("#UserScore").html());
                $("#MyScore").append(msg.Score);
            }
            else {
                $("#UserLogin").append($("#RegLogin").html());
            }
            $("#UserScore").remove();
            $("#LoginExit").remove();
            $("#RegLogin").remove();
        }
    });*/
});