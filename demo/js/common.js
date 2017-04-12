/**
 * Created by Administrator on 2017-03-08.
 */

//首页轮播部分
var i =0;//初始化下标
var timer;
$("#btnavul li").mouseover(function () {
    $(this).children().children('img').removeClass('gray').parent().parent().siblings().children().children('img').addClass('gray');
    $(this).children().children('img').addClass('imgActive').parent().parent().siblings().children().children('img').removeClass('imgActive');
    $(this).children().children('p').css("color","#ff8e23").parent().parent().siblings().children().children('p').css("color","white");
    clearInterval(timer);//鼠标移入时暂停定时器
    i = $(this).index(); //获取下标
    $("#header_ul li").eq(i).fadeIn(1000).siblings().fadeOut(1000);
});
$("#btnavul li").mouseout(function () {
    $(this).children().children('img').addClass('gray');
    $(this).children().children('img').removeClass('imgActive').parent().parent().siblings().children().children('img').removeClass('imgActive');
    $(this).children().children('p').css("color","white");
    timer = setInterval(play,2000);//鼠标移出的时候 恢复定时器
});
//定时器
function play(){
    i++;
    if(i>5)i=0;
    $("#header_ul li").eq(i).fadeIn(1000).siblings().fadeOut(1000);
    $("#btnavul li").eq(i).children().children('img').removeClass('gray').parent().parent().siblings().children().children('img').addClass('gray');
    $("#btnavul li").eq(i).children().children('img').addClass('imgActive').parent().parent().siblings().children().children('img').removeClass('imgActive');
    $("#btnavul li").eq(i).children().children('p').css("color","#ff8e23").parent().parent().siblings().children().children('p').css("color","white");
}
//执行定时器
timer = setInterval(play,3000);
/******************************************************/
//主页集团动态部分效果
var $li = $('#news li');
$li.hover(function () {
    $(this).stop().animate({width:'600px'},600).siblings().stop().animate({width:'100px'},600);
    $(this).children('.news').show('fast').parents().siblings().children('.news').hide('slow');
});
/******************************************************/
//旗下产业-韩国化妆品下的roundabout.js插件运行
$(document).ready(function(){
    $('#featured-area ul').roundabout({
        easing: 'easeOutInCirc',
        /*autoplay: true,*/  //是否自动旋转
        speed: 800,//(毫秒) 切换速度，
        duration: 400,   // 运动速度
        minScale: 0.7,
        btnPrev: ".btnPrev", // 右按钮
        btnNext: ".btnNext", // 左按钮
        swipe: true //是否支持触屏切换
    });
});
/******************************************************/
//人力资源-精英团队部分的点击事件
$('.buttonoff').click(function () {
    $(this).parents('li').siblings().removeClass("active");
    if ($(this).parents('li').hasClass("active")) {
        $(this).parents('li').removeClass("active");
        $(this).text('展开');
    } else {
        $(this).parents('li').addClass("active");
        $(this).text('收起');
    }
});
/******************************************************/
//人才战略部分点击事件
$('.rczlStyle li').click(function () {
    $(this).toggleClass('active');
});

/**********************点击缓慢返回顶部****************/
window.onload = function(){
    var obtn = document.getElementById('btn_top');  //获取回到顶部按钮的ID
    var clientHeight = document.documentElement.clientHeight;   //获取可视区域的高度
    var timer = null; //定义一个定时器
    var isTop = true; //定义一个布尔值，用于判断是否到达顶部

    window.onscroll = function(){         //滚动条滚动事件

        //获取滚动条的滚动高度
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;

       /* if(osTop >= clientHeight){  //如果滚动高度大于可视区域高度，则显示回到顶部按钮
            obtn.style.display = 'block';
        }else{         //否则隐藏
            obtn.style.display = 'none';
        }*/

        //主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
        if(!isTop){

            clearInterval(timer);
        }
        isTop = false;

    };

    obtn.onclick = function(){    //回到顶部按钮点击事件
        //设置一个定时器
        timer = setInterval(function(){
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 8);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            isTop =true;  //用于阻止滚动事件清除定时器
            if(osTop == 0){
                clearInterval(timer);
            }
        },30);
    }
};