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
        var inputCode = document.getElementById("input").value.toUpperCase(); //ȡ���������֤�벢ת��Ϊ��д
        if(inputCode.length <= 0) { //���������֤�볤��Ϊ0
            createCode();//ˢ����֤��
            $("#input").val('');//����ı���
            return false;
        }
        else if(inputCode != code ) { //���������֤�����������֤�벻һ��ʱ
            createCode();//ˢ����֤��
            $("#input").val('');//����ı���
            return false;
        }
        else { //������ȷʱ
            return true;
            // alert("^-^"); //����^-^
        }
    }

    //������֤��
    function createCode(){
        code = "";
        var codeLength = 4;//��֤��ĳ���
        var checkCode = document.getElementById("code");
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
            'S','T','U','V','W','X','Y','Z');//���������
        for(var i = 0; i < codeLength; i++) {//ѭ������
            var index = Math.floor(Math.random()*36);//ȡ���������������0~35��
            code += random[index];//��������ȡ��������ӵ�code��
        }
        checkCode.value = code;//��codeֵ������֤��
    }

//��ȡ������֤��
    var validCode=true;
    $(".msgs").click (function  () {
        if (validate()) {
            //$('#form').submit();
            var data = $('#form').serialize();
            $.post('/uploads/uplogin.php',data,function(res){
                if (res =="1") {
                    $('#umsg').text('');
                    return $('#umsg').text('��Ա�Ų���ȷ');
                }else if(res =="2"){
                    $('#umsg').text('');
                    return $('#umsg').text('�ֻ��Ų���ȷ');
                }else if(res =="4"){
                    $('#umsg').text('');
                    return $('#umsg').text('û�������Ա');
                }else if(res =="5"){
                    $('#umsg').text('');
                    return $('#umsg').text('�����Ѿ���������60�������');
                }else{
                    $('.c_code_msg').attr('readonly','');
                    $('#umsg').text('');
                    return $('#umsg').text('�����Ѿ�����');
                    // alert(res);
                }
            });
        }else{
            $('#umsg').text('');

            return $('#umsg').text('ͼƬ��֤����ȷ����Ϊ��');
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