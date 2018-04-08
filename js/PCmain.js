/* blocks constructor function */
var move = function move(a, b, c) {
    var action;
    switch (a) {
        case "front":
            action = 1;
            break;
        case "back":
            action = 1;
            c = -c;
            break;
        case "left":
            action = 5;
            break;
        case "right":
            action = 6;
            break;
        case "rotate":
            action = 2;
            moveData = { "cmd": 1, "data": [b * 1000, c, action] };
            codeArr.push(moveData);
            break;
        case "turnleft":
            action = 2;
            b = 650;
            c = 110;
            moveData = { "cmd": 1, "data": [b, c, action] };
            codeArr.push(moveData);
            break;
        case "turnright":
            action = 2;
            b = 650;
            c = -110;
            moveData = { "cmd": 1, "data": [b, c, action] };
            codeArr.push(moveData);
            break;
        default:
    };
    var moveData = { "cmd": 1, "data": [b, c, action] };
    var step = b;
    var actionValue = moveData.data[moveData.data.length - 1];
    if (actionValue == 1 || actionValue == 5 || actionValue == 6) {
        for (var i = 0; i < step; i++) {
            moveData = { "cmd": 1, "data": [1500, c, action] };
            codeArr.push(moveData);
        };
    };
};
var control = function control(a, b) {
    switch (a) {
        case "pause":
            var controlData = { "cmd": 1, "data": [b * 1000, 0, 7] }
            codeArr.push(controlData);
            break;
        default:
    };
};
var earColor = function earColor(b, c, d, e) {
    var action;
    c == 0 ? (action = 2) : (action = 1);
    var colorData = { "cmd": 3, "data": [action, b, c, d, e] };
    codeArr.push(colorData);
};
var animalTime = [4623, 3578, 7836, 4127, 5381, 7157, 4937, 3657, 7235, 9534];
var speakTime = [12826, 2568, 1440, 936, 3168, 2352, 1680, 3720, 1944, 624, 2184];
var musicTime = [15516, 12434, 20950, 20009, 21655, 17554, 15360, 14863, 22987, 24111];
var secretTime = [6138, 17580, 7209, 3004, 4022, 3213, 5093, 6164, 3448, 2795];
var play = function play(a, b, c) {
    var SDindex;
    switch (a) {
    case "music":
        SDindex = 23;
        c == 0 ? (c = musicTime[b - 41]) : (c = 1000);
        break;
    case "animal":
        SDindex = 23;
        c == 0 ? (c = animalTime[b - 1]) : (c = 1000);
        break;
    case "note":
        SDindex = 10;
        c = 1000;
        break;
    case "speak":
        SDindex = 23;
        c == 0 ? (c = speakTime[b - 12]) : (c = 1000);
        break;
    case "secret":
        SDindex = 23;
        c == 0 ? (c = secretTime[b - 31]) : (c = 1000);
        break;
    };
    var playData = { "cmd": 2, "data": [7, SDindex, b, c] };
    codeArr.push(playData);
};
var mode = function mode(a, b) {
    var modeData = { "cmd": a, "data": [b] };
    codeArr.push(modeData);
};
var differential = function differential(a, b, c) {
    a > 0 ? (a = Math.ceil(a / 50)) : (a = Math.ceil(Math.abs(a) / 50) + 4);
    b > 0 ? (b = Math.ceil(b / 50)) : (b = Math.ceil(Math.abs(b) / 50) + 4);
    var speedMark = (a + "" + b) * 1;
    var differentialData = { "cmd": 1, "data": [c * 1000, speedMark, 8] };
    codeArr.push(differentialData);
};
var start = function start(a) {
    var startData = { "cmd": a, "data": [] };
    codeArr.push(startData);
};
var onground = function onground(a) {
    switch (a) {
        case "start":
            var ongroundData = { "cmd": 5, "data": [5]};
            break;
        case "end":
            var ongroundData = { "cmd": 6, "data": [1] };
            break;
        default:
            break;
    }
    codeArr.push(ongroundData);
};
var pickUp = function pickUp(a) {
    switch (a) {
        case "start":
            var pickUpData = { "cmd": 5, "data": [4] };
            break;
        case "end":
            var pickUpData = { "cmd": 6, "data": [1] };
            break;
        default:
            break;
    };
    codeArr.push(pickUpData);
};
var eyeSensor = function eyeSensor(a,b) {
    var distanceData;
    switch (b) {
        case "farDistance":
            distanceData = 1; 
            break;
        case "midDistance":
            distanceData = 2;
            break;
        case "litDistance":
            distanceData = 3;
            break;
    };
    switch (a) {
        case "start":
            var eyeSensorData = { "cmd": 5, "data": [distanceData] };
            break;
        case "end":
            var eyeSensorData = { "cmd": 6, "data": [1] };
            break;
    };
    codeArr.push(eyeSensorData);
}
/* blocks constructor function end */
var startEvt, moveEvt, endEvt;
if ('ontouchstart' in window) {
    startEvt = 'touchstart';
    moveEvt = 'touchmove';
    endEvt = 'rouchend';
} else {
    startEvt = 'mousedown';
    moveEvt = 'mousemove';
    endEvt = 'mouseup';
};
var btn = document.querySelector('.btn');
var progress = document.querySelector('.progress');
var progressPercent = document.querySelector('.progress .percent');
var progressCircle = document.querySelector('.progress .circle');
var progressMask = document.querySelector('.progressMask');
progressMask.style.display = 'none';
var count = 0;
var codeArr = [];
var code;

//捕获工作区代码字符串
function UpdateFunction(event) {
    codeArr = [];
    code = Blockly.JavaScript.workspaceToCode(workspace);
    eval(code);
    if (codeArr.length > 0) {
        for (var i = 0; i < codeArr.length; i++) {
            codeArr[i].data.unshift(i);
        };
        var firstOrder = { "cmd": 0, "data": [codeArr.length] }
        codeArr.unshift(firstOrder);
    };
    console.log(codeArr)
};

btn.addEventListener(startEvt, function (e) {
    e.stopPropagation();
    e.preventDefault();
    var userDevid = userDeviceId.deviceId;
    progressPercent.innerHTML = "0%";
    count = 0;
    deltaTime = delay();
    UpdateFunction();
    if (deltaTime > 1000 && codeArr.length > 0) {
        btnJump();
        var t;
        t = setInterval(send, 500);
        function send() {
            progressMask.style.display = 'block';
            console.log(codeArr[count]);
            count++;
            progressPercent.innerHTML = parseInt(100 * count / codeArr.length) + "%";
            if (count == codeArr.length) {
                clearInterval(t);
                progressCircle.classList.add("circleBig");
                setTimeout(function () {
                    progressMask.style.display = 'none';
                    progressCircle.classList.remove("circleBig");
                }, 2000);
            };
        };
    };
});

//开始按钮动画
function btnJump() {
    btn.classList.add("btnJump");
    var btnTimer;
    btnTimer = setTimeout(function () { btn.classList.remove("btnJump") }, 500);
};

//防快速点击
var BtnLastTime = 0;
var nowTime;
var deltaTime;
function delay() {
    nowTime = Date.now();
    deltaTime = nowTime - BtnLastTime;
    BtnLastTime = nowTime;
    return deltaTime;
};


