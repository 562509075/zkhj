/**
 * Created by Administrator on 2017-03-10.
 */
var code ;
$(function  () {

    $(window).load(function() {
        createCode();
    });
    $('#code').click(function(){
        createCode();
    });
    function validate(){
        var inputCode = document.getElementById("input").value.toUpperCase(); //取得输入的验证码并转化为大写
        if(inputCode.length <= 0) { //若输入的验证码长度为0
            createCode();//刷新验证码
            $("#input").val('');//清空文本框
            return false;
        }
        else if(inputCode != code ) { //若输入的验证码与产生的验证码不一致时
            createCode();//刷新验证码
            $("#input").val('');//清空文本框
            return false;
        }
        else { //输入正确时
            return true;
            // alert("^-^"); //弹出^-^
        }
    }

    //创建验证码
    function createCode(){
        code = "";
        var codeLength = 4;//验证码的长度
        var checkCode = document.getElementById("code");
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
            'S','T','U','V','W','X','Y','Z');//创建随机数
        for(var i = 0; i < codeLength; i++) {//循环操作
            var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
            code += random[index];//根据索引取得随机数加到code上
        }
        checkCode.value = code;//把code值赋给验证码
    }

//获取短信验证码
    var validCode=true;
    $(".msgs").click (function  () {
        if (validate()) {
            //$('#form').submit();
            var data = $('#form').serialize();
            $.post('/uploads/uplogin.php',data,function(res){
                if (res =="1") {
                    $('#umsg').text('');
                    return $('#umsg').text('会员号不正确');
                }else if(res =="2"){
                    $('#umsg').text('');
                    return $('#umsg').text('手机号不正确');
                }else if(res =="4"){
                    $('#umsg').text('');
                    return $('#umsg').text('没有这个会员');
                }else if(res =="5"){
                    $('#umsg').text('');
                    return $('#umsg').text('短信已经发送请您60秒后再试');
                }else{
                    $('.c_code_msg').attr('readonly','');
                    $('#umsg').text('');
                    return $('#umsg').text('短信已经发送');
                    // alert(res);
                }
            });
        }else{
            $('#umsg').text('');

            return $('#umsg').text('图片验证不正确或者为空');
        }


    });
    $('#submit').click(function(){

        var data = $('#form').serialize();
        $.post('/uploads/uplogin1.php',data,function(res){
            var array = eval("("+res+")");
            $("#logina").addClass("hide");
            $("#loginab").removeClass("hide");
            $('#u1').text(array.name);
            $('#u2').text(array.yue);
            $('#u3').text(array.dengji);
            $('#u4').text(array.youhui);
            $('#u5').text(array.uid);
            $('#u6').text(array.jifen);
            $('#u7').text(array.shouji);
        })
    })
})