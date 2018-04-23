/**
 * @author         [zk]
 * @description    [draw track and send to robot]
 * @date           [2018.04.12]
 */
var canvasBg = document.querySelector('#canvasBg');
var Connections = document.querySelector('#Connections');
var drawLine = document.querySelector('#drawLine');
var sendAnimation = document.querySelector('#sendAnimation');
var btngroup = document.querySelectorAll('.btngroup');
var ctxBg = canvasBg.getContext('2d');
var ctxConnections = Connections.getContext('2d');
var ctxDrawline = drawLine.getContext('2d');
var ctxsendAnimation = sendAnimation.getContext('2d');
var canvasWidth = canvasBg.parentElement.offsetWidth;
/**
 * init canvasBg canvasConnections canvasdrawLine
 */
(function initBg() {
  canvasBg.width = canvasWidth;
  canvasBg.height = canvasWidth;
  canvasBg.style.background = 'rgb(255, 255, 255)';
})();
(function initConnections() {
  Connections.width = canvasWidth;
  Connections.height = canvasWidth;
  Connections.style.background = "rgba(255,255,255,0)";
  var width = canvasWidth, height = canvasWidth;
  if (window.devicePixelRatio) {
    Connections.style.width = width + "px";
    Connections.style.height = height + "px";
    Connections.height = height * window.devicePixelRatio;
    Connections.width = width * window.devicePixelRatio;
    ctxConnections.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
})();
(function initDrawLine() {
  drawLine.width = canvasWidth;
  drawLine.height = canvasWidth;
  drawLine.style.background = "rgba(255,255,255,0)";
  var width = drawLine.width, height = drawLine.height;
  if (window.devicePixelRatio) {
    drawLine.style.width = width + "px";
    drawLine.style.height = height + "px";
    drawLine.height = height * window.devicePixelRatio;
    drawLine.width = width * window.devicePixelRatio;
    ctxDrawline.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
})();
(function initsendAnimation(){
  sendAnimation.style.display = "none";
  sendAnimation.width = canvasWidth;
  sendAnimation.height = canvasWidth;
  sendAnimation.style.background = "rgba(255,255,255,0)";
  var width = sendAnimation.width, height = sendAnimation.height;
  if (window.devicePixelRatio) {
    sendAnimation.style.width = width + "px";
    sendAnimation.style.height = height + "px";
    sendAnimation.height = height * window.devicePixelRatio;
    sendAnimation.width = width * window.devicePixelRatio;
    ctxsendAnimation.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
})();
(function initBtngroup(){
    document.querySelector('.BtnWrap').style.top = canvasWidth + "px";
    document.querySelector('.wakeupBtn').style.top = canvasWidth + "px";
})();
/**
 * order Array
 */
var sendOrderArr = [];
/**
 * class ConnectionsObj
 * this.x,this.y     [x,y coordinate array]
 * this.num          [matrix density]
 * this.r            [connections radius]
 * this.width        [connections width]
 */
var ConnectionsObj = function () {
  this.x = [];
  this.y = [];
  this.num = 225;
  this.r = 3;
  this.width = 1;
  this.color = "#efe1f2";
};
ConnectionsObj.prototype.init = function () {
  for (var i = 1; i < Math.sqrt(this.num) - 1; i++) {
    this.x[i] = new Array();
    this.y[i] = new Array();
    for (var j = 1; j < Math.sqrt(this.num) - 1; j++) {
      this.x[i][j] = Math.round(canvasWidth / (Math.sqrt(this.num) - 1)) * i;
      this.y[i][j] = Math.round(canvasWidth / (Math.sqrt(this.num) - 1)) * j;
    }
  }
};
ConnectionsObj.prototype.draw = function () {
  ctxConnections.clearRect(0, 0, canvasWidth, canvasWidth);
  for (var i = 1; i < Math.sqrt(this.num) - 1; i++) {
    for (var j = 1; j < Math.sqrt(this.num) - 1; j++) {
      ctxConnections.strokeStyle = this.color;
      ctxConnections.fillStyle = this.color;
      ctxConnections.lineWidth = this.width;
      ctxConnections.beginPath();
      ctxConnections.arc(this.x[i][j], this.y[i][j], this.r, 0, 2 * Math.PI);
      ctxConnections.fill();
    }
  }
};
/**
 *  new connectionsObj
 *  draw connections
 */
var matrix = new ConnectionsObj();
matrix.init();
matrix.draw();
/**
 * class  DrawLineObj
 * this.connectionsArr       [clicked points Array]
 * this.cirR                 [clicked points radius]
 * this.lineW                [line width between points]
 */
var DrawLineObj = function () {
  this.connectionsArr = [];
  this.cirR = 5;
  this.lineW = 2;
};
DrawLineObj.prototype.init = function () {
  this.connectionsArr = [];
  ctxDrawline.clearRect(0, 0, drawLine.width, drawLine.height);  
};
DrawLineObj.prototype.choosePoint = function (x, y) {
  var xIndex = Math.round(x / (canvasWidth / (Math.sqrt(matrix.num) - 1)));
  var yIndex = Math.round(y / (canvasWidth / (Math.sqrt(matrix.num) - 1)));
  xIndex === 0 ? xIndex = 1 : xIndex = xIndex;
  yIndex === 0 ? yIndex = 1 : yIndex = yIndex;
  xIndex === matrix.x[1].length ? xIndex = matrix.x[1].length - 1 : xIndex = xIndex;
  yIndex === matrix.y[1].length ? yIndex = matrix.y[1].length - 1 : yIndex = yIndex;
  console.log(xIndex, yIndex)
  console.log(matrix.x[xIndex][1], matrix.y[1][yIndex])
  this.connectionsArr.push({ "x": matrix.x[xIndex][1], "y": matrix.y[1][yIndex] });
  return this.connectionsArr;
};
DrawLineObj.prototype.drawCircle = function () {
  ctxDrawline.fillStyle = "#555";
  for (var i = 0; i < this.connectionsArr.length; i++) {
    ctxDrawline.beginPath();
    ctxDrawline.arc(this.connectionsArr[i].x, this.connectionsArr[i].y, this.cirR, 0, 2 * Math.PI);
    if (i == this.connectionsArr.length - 1) {
      ctxDrawline.arc(this.connectionsArr[i].x, this.connectionsArr[i].y, this.cirR + 2, 0, 2 * Math.PI); 
    }
    ctxDrawline.fill();
  }
};
DrawLineObj.prototype.drawline = function () {
  ctxDrawline.clearRect(0, 0, drawLine.width, drawLine.height);
  ctxDrawline.strokeStyle = "#555";
  this.drawCircle();
  ctxDrawline.beginPath();
  for (var i = 0; i < this.connectionsArr.length - 1; i++) {
    ctxDrawline.moveTo(this.connectionsArr[i].x, this.connectionsArr[i].y);
    ctxDrawline.lineTo(this.connectionsArr[i + 1].x, this.connectionsArr[i + 1].y);
  }
  ctxDrawline.stroke();
};
var points = new DrawLineObj();

/***************************Ball Animation**********************************/
var raf;
var ball = {
  x: canvasWidth * Math.random() / 1.2,
  y: canvasWidth * 0.1,
  vx: 2,
  vy: 1,
  radius: 15,
  color: 'yellowgreen',
  draw: function() {
    if (this.y > canvasWidth - this.radius) this.y = canvasWidth - this.radius;
    ctxsendAnimation.beginPath();
    ctxsendAnimation.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctxsendAnimation.closePath();
    ctxsendAnimation.fillStyle = this.color;
    ctxsendAnimation.fill();
  },
  init: function () {
    window.cancelAnimationFrame(raf);
    sendAnimation.style.display = "none";
    this.x = canvasWidth * Math.random() / 1.2;
    this.y = canvasWidth * 0.1;
    this.vx = 2;
    this.vy = 1;
  }
};
function drawBall() {
  sendAnimation.style.display = "block";
  ctxsendAnimation.clearRect(0, 0, canvasWidth, canvasWidth);
  ball.draw();
  ball.vy *= 0.991;
  ball.vy += .4;
  ball.x += ball.vx * 2;
  ball.y += ball.vy;
  if (ball.y + ball.vy > canvasWidth - ball.radius || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvasWidth - ball.radius || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  raf = window.requestAnimationFrame(drawBall);
};
/****************************Ball Animation end*********************************/

/**
 * @param {connectionsArr}  arr
 */
function toOrder(arr) {
  if (arr.length > 1) {
    for (var i = 0; i < arr.length - 1; i++) {
      var disX = Math.pow(arr[i].x - arr[i + 1].x, 2);
      var disY = Math.pow(arr[i].y - arr[i + 1].y, 2);
      var step = Math.round(Math.sqrt(disX + disY) / (canvasWidth / (Math.sqrt(matrix.num) - 1)));
      sendOrderArr.push({ "cmd": 1, "data": [1500 * step, 50, 1] });
      if (i < arr.length - 2) {
        var toAngle = new toAngleObj(arr[i].x,arr[i].y,arr[i + 1].x,arr[i + 1].y,arr[i + 2].x,arr[i + 2].y);
      }
    }
  }
};
/**
 * @param {points.x} x1 
 * @param {points.y} y1 
 * @param {points.x} x2 
 * @param {points.y} y2 
 * @param {points.x} x3 
 * @param {points.y} y3 
 */
var toAngleObj = function (x1,y1,x2,y2,x3,y3) {
  this.Angle;
  this.getRotateAngle = function () {
    var va_x = x3 - x2;
    var va_y = y3 - y2;
    var vb_x = x1 - x2;
    var vb_y = y1 - y2;
    var productValue = (va_x * vb_x) + (va_y * vb_y);
    var va_val = Math.sqrt(va_x * va_x + va_y * va_y);
    var vb_val = Math.sqrt(vb_x * vb_x + vb_y * vb_y);
    var cosValue = productValue / (va_val * vb_val);
    if (cosValue < -1 && cosValue > -2) {
      cosValue = -1;
    } else if (cosValue > 1 && cosValue < 2) {
      cosValue = 1;
    }
    return Math.round(Math.acos(cosValue) * 180 / Math.PI);
  };
  this.direction = function () {
    var dir;
    var flag = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
    if (flag > 0) {
      this.Angle = 180 - this.getRotateAngle();
      dir = { "cmd": 1, "data": [Math.round(7.78 * this.Angle), -110, 2] };
    } else if (flag == 0) {
      this.Angle = 180 - this.getRotateAngle();
      dir = { "cmd": 1, "data": [Math.round(7.78 * this.Angle), 110, 2] };
    } else {
      this.Angle = 180 - this.getRotateAngle();
      dir = { "cmd": 1, "data": [Math.round(7.78 * this.Angle), 110, 2] };
    }
    sendOrderArr.push(dir);
  }
  this.direction();
};
/**
 * class AddSubBtnObj
 */
var AddSubBtnObj = function () {
  this.index = Math.sqrt(matrix.num);
};
AddSubBtnObj.prototype.tap = function (attr) {
  if (attr === 'add') {
    this.index++;
    if (this.index >= 20) {
      this.index = 20;
    }
    sendOrderArr = [];
  }
  if (attr === 'sub') {
    this.index--;
    if (this.index <= 5) {
      this.index = 5;
    }
    sendOrderArr = [];
  };
  if (attr === 'repeal') {
    if (points.connectionsArr.length >= 1) {
      points.connectionsArr.splice(points.connectionsArr.length - 1, 1);
      points.drawline();
      sendOrderArr = [];
      return;
    }
  };
  if (attr === 'start') {
    sendOrderArr = [];
    toOrder(points.connectionsArr);
    console.log(sendOrderArr);
    // var Datas = document.getElementById("DeviceId").value;
    if (sendOrderArr.length > 0) {
      raf = window.requestAnimationFrame(drawBall);
      btnSwitch('off');
      for (var i = 0; i < sendOrderArr.length; i++) {
        sendOrderArr[i].data.unshift(i);
      }
      var firstOrder = { "cmd": 0, "data": [sendOrderArr.length] };
      sendOrderArr.unshift(firstOrder);
      sendDatas();
    }
    return;
  };
  matrix.num = Math.pow(this.index, 2);
  points.init();
  matrix.init();
  matrix.draw();
}
var addSubBtn = new AddSubBtnObj();
/**
 * @param {event} e 
 */
drawLine.onclick = function (e) {
  sendOrderArr = [];
  var event = e || window.event;
  var tapX = event.offsetX, tapY = event.offsetY;
  points.choosePoint(tapX, tapY);
  points.drawline();
}
function btnSwitch(state) {
  for (var i = 0; i < btngroup.length; i++) {
    if (state === "on") {
      btngroup[i].disabled = "";
      btngroup[i].style.background = "yellowgreen";
      btngroup[i].onclick = function () {
        addSubBtn.tap(this.getAttribute('data-attr')); 
      }
    } else {
      btngroup[i].style.background = "#b1b1b1";
      btngroup[i].disabled = "disabled";
    }
  }
};
btnSwitch('on');
/**
 * @param {Array} arr 
 */
function sendDatas() {
  var count = 0;
  var timer;
  timer = setInterval(send, 600);
  function send() {
    // $.ajax({
    //   type: "POST",
    //   url: "BlocklyOnenet",
    //   data: {
    //     "deviceId": Datas,
    //     "cmd": sendOrderArr[count].cmd,
    //     "BlocklyData": sendOrderArr[count].data
    //   },
    //   traditional: true,
    //   success: function () {

    //   },
    //   error: function () {
    //     alert("指令遗失在外太空啦，再试一次");
    //   }
    // });
    console.log(sendOrderArr[count]);
    count++;
    if (count == sendOrderArr.length) {
      clearInterval(timer);
      btnSwitch('on');
      ball.init();
    }
  }
};
/********************************wakeupBtn**********************************/
var wakeupBtn = document.querySelector('.wakeupBtn');
wakeupBtn.addEventListener('touchstart', wakeup, false);

function wakeup() {
  var BtnWrap = document.querySelector('.BtnWrap');
  if (BtnWrap.style.display === 'none') {
    BtnWrap.style.display = 'inline-block';
    BtnWrap.classList.add('slideleft');
  } else if (BtnWrap.style.display === 'inline-block') {
    BtnWrap.style.display = 'none';
    BtnWrap.classList.add('slideright');
  }
}









































