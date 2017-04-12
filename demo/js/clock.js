/**
 * Created by Administrator on 2017-02-20.
 */
var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var rem = width / 200;

function drawBackground(){
    ctx.save();
    //绘制外圆
    ctx.translate(r,r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0,0,r - 5 * rem,0,2 * Math.PI,false);
    ctx.stroke();

    //绘制小时数
    var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font = 18 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    hourNumbers.forEach(function (number,i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.fillText(number,x,y);
    });

    //绘制分钟点样式
    for(var i=0;i<60;i++){
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();
        if(i % 5 == 0){
            ctx.fillStyle = '#000';
            ctx.arc(x,y,2 * rem,0,2 * Math.PI,false);
        }else{
            ctx.fillStyle = '#ccc';
            ctx.arc(x,y,2 * rem,0,2 * Math.PI,false);
        }
        ctx.fill();
    }
}

//绘制时针
function drawHour(hour,minute){
    ctx.save();//保存
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;//弧度
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0,10 * rem);
    ctx.lineTo(0,-r / 2);
    ctx.stroke();
    ctx.restore();//还原
}

//绘制分针
function drawMinute(minute){
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0,10 * rem);
    ctx.lineTo(0,-r + 30 * rem);
    ctx.stroke();
    ctx.restore();
}

//绘制秒针
function drawSecond(second){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#c14543';
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem,20 * rem);
    ctx.lineTo(2 * rem,20 * rem);
    ctx.lineTo(1,-r + 18 * rem);
    ctx.lineTo(-1,-r + 18 * rem);
    ctx.fill();
    ctx.restore();
}

//绘制中心圆点
function drawDot(){
    ctx.beginPath();
    ctx.arc(0,0,3 * rem,0,2 * Math.PI,false);
    ctx.fill();
}

//动态执行
function draw(){
    ctx.clearRect(0,0,width,height);
    var now = new Date();//获取当前时间
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
setInterval(draw,1000);