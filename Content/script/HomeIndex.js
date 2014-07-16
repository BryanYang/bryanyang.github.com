document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        $("#J_SlidePlayer_510").slideImg({
            speed: "normal",
            timer: 3000
        });
    }
}
var pagenum = 2;

$(function () {
    SetHuiContentHeight();
});
function SetHuiContentHeight() {
    var minHeight = 0; //默认最小文字块高
    $(".list_con_text").each(function () {
        var finalHeight = 0;
        var huiContentText = $(this).children(".hui-content-text");
        if (huiContentText.length > 0) {
            var huiContentHeight = huiContentText.height(); //当前文字块图
            var huiContentLineHeight = parseInt(huiContentText.css("line-height").replace("px", "")); //文字行高
            var imgHeight = $(this).siblings("dt").find("img").attr("height"); //图高
            var paragraphs = huiContentText.find("p");
            if (minHeight == 0)
                minHeight = huiContentLineHeight * 5 + 1; 
            if (huiContentHeight > imgHeight) {

                if (imgHeight < minHeight) {
                    if (huiContentHeight > minHeight) {

                        finalHeight = minHeight;

                    }
                    else {
                        finalHeight = huiContentHeight
                    }
                } else {
                    //                var modlineNum = (imgHeight % huiContentLineHeight);
                    //                if (modlineNum != 0) {
                    //                    finalHeight = ( modlineNum - 1) * huiContentLineHeight + 1; // -1 将文本块设的比图片高度低一些
                    //                }
                    //                else {
                    finalHeight = (Math.floor(imgHeight / huiContentLineHeight) - 2) * huiContentLineHeight; //+ 1将文本块设的比图片高度低一些
                    finalHeight = calcParagraphs(finalHeight, paragraphs);
                    //                }
                }
                $(this).css("height", finalHeight);
            }
            else {
                finalHeight = 144;
                if (huiContentHeight > finalHeight) {
                    finalHeight = calcParagraphs(finalHeight, paragraphs);
                    $(this).css("height", finalHeight);
                }
            }
        }
    });
}

function calcParagraphs(finalHeight, paragraphs)
{
    var result = finalHeight;
    if (paragraphs.length >= 2) {
        var tempParagraphsHeight = 0;
        for (var i = 0; i < paragraphs.length; i++) {
            tempParagraphsHeight += $(paragraphs[i]).height();
            if (tempParagraphsHeight < finalHeight)
                result += 10;
            else
                break;
        }
    }
    return result;    
}

document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();