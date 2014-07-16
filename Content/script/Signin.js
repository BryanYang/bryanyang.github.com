function DoSignin() {
    $.post("/home/dosignin", SigninBack);
}

function SigninBack(data) {
    if (data == null) {
        return;
    }
    switch (data["Code"]) {//到最后根据具体的不同实现不同处理
        case "0":
            $("#qdSignin").show();
            $("#closeQDDiv").click(function () {
                $("#qdSignin").hide();
            });
            $("#qDContent").html(data["ContentStr"]);
            break;
        case "1":
            $("#qdSignin").show();
            $("#closeQDDiv").click(function () {
                $("#qdSignin").hide();
            });
            $("#qDContent").html("您还未登陆，请点<a href=\"/member/logon\" style=\"color:green;\" >这里</a>登陆");
            break;
        case "2":
            $("#qdSignin").show();
            $("#closeQDDiv").click(function () {
                $("#qdSignin").hide();
            });
            $("#qDContent").html(data["ContentStr"]);
            break;
        case "3":
            $("#qdSignin").show();
            $("#closeQDDiv").click(function () {
                $("#qdSignin").hide();
            });
            $("#qDContent").html(data["ContentStr"]);
            break;
        default:
            break;
    }
}