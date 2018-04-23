/**
 * @description   send order
 * @author    zk
 */
var aieggy = {
  codeArr: [],
  animalTime: [4623, 3578, 7836, 4127, 5381, 7157, 4937, 3657, 7235, 9534],
  speakTime: [12826, 2568, 1440, 936, 3168, 2352, 1680, 3720, 1944, 624, 2184],
  musicTime: [15516, 12434, 20950, 20009, 21655, 17554, 15360, 14863, 22987, 24111],
  secretTime: [6138, 17580, 7209, 3004, 4022, 3213, 5093, 6164, 3448, 2795],
  move: function (a, b, c) {
    var action;
    var step;
    switch (a) {
      case "front":
        action = 1;
        step = b;
        break;

      case "back":
        action = 1;
        c = -c;
        step = b;
        break;

      case "keepwalking":
        action = 1;
        b = b * 1000;
        moveData = { "cmd": 1, "data": [b, c, action] };
        this.codeArr.push(moveData);
        break;

      case "left":
        action = 5;
        step = b;
        break;

      case "right":
        action = 6;
        step = b;
        break;

      case "rotate":
        action = 2;
        moveData = { "cmd": 1, "data": [b * 1000, c, action] };
        this.codeArr.push(moveData);
        break;

      case "turnleft":
        action = 2;
        b = 650;
        c = 110;
        moveData = { "cmd": 1, "data": [b, c, action] };
        this.codeArr.push(moveData);
        break;

      case "turnright":
        action = 2;
        b = 650;
        c = -110;
        moveData = { "cmd": 1, "data": [b, c, action] };
        this.codeArr.push(moveData);
        break;
    };
    var moveData = { "cmd": 1, "data": [b, c, action] };
    var actionValue = moveData.data[moveData.data.length - 1];
    if (actionValue == 1 || actionValue == 5 || actionValue == 6) {
      for (var i = 0; i < step; i++) {
        moveData = { "cmd": 1, "data": [1500, c, action] };
        this.codeArr.push(moveData);
      }
    }
  },

  control: function (a, b) {
    switch (a) {
      case "pause":
      var controlData = { "cmd": 1, "data": [b * 1000, 0, 7] }
      this.codeArr.push(controlData);
      break; 
    }
  },

  earColor: function (b, c, d, e) {
    var action;
    c == 0 ? (action = 2) : (action = 1);
    var colorData = { "cmd": 3, "data": [action, b, c, d, e] };
    this.codeArr.push(colorData);  
  },

  turnOff: function () {
    var turnOffEar = { "cmd": 3, "data": [2, 8, 0, 0, 0] };
    var turnOffEye = { "cmd": 4, "data": [0, 0, 60000] };
    this.codeArr.push(turnOffEar);
    this.codeArr.push(turnOffEye);
  },

  customEarColor: function (a, b, c) {
    var customEarColorData = { "cmd": 3, "data": [3, a, b, 0, c] };
    this.codeArr.push(customEarColorData);
  },

  play: function (a, b, c) {
    var SDindex;
    switch (a) {
    case "music":
        SDindex = 23;
        c == 0 ? (c = this.musicTime[b - 41]) : (c = 1000);
        break;
    case "animal":
        SDindex = 23;
        c == 0 ? (c = this.animalTime[b - 1]) : (c = 1000);
        break;
    case "note":
        SDindex = 10;
        c = 1000;
        break;
    case "speak":
        SDindex = 23;
        c == 0 ? (c = this.speakTime[b - 12]) : (c = 1000);
        break;
    case "secret":
        SDindex = 23;
        c == 0 ? (c = this.secretTime[b - 31]) : (c = 1000);
        break;
    };
    var playData = { "cmd": 2, "data": [7, SDindex, b, c] };
    this.codeArr.push(playData);  
  },

  mode: function (a, b, c) {
    var modes;
    switch (a) {
        case 'pattern':
            modes = 31;
            break;
        case 'elude':
            modes = 32;
            break;
        case 'follow':
            modes = 33;
            break;
    }
    var modeData = { "cmd": 8, "data": [modes, b, c] };
    this.codeArr.push(modeData);  
  },

  patternFront: function (a) {
    var patternFrontData = { "cmd": 7, "data": [a] };
    this.codeArr.push(patternFrontData);  
  },

  differential: function (a, b, c) {
    a > 0 ? (a = Math.ceil(a / 50)) : (a = Math.ceil(Math.abs(a) / 50) + 4);
    b > 0 ? (b = Math.ceil(b / 50)) : (b = Math.ceil(Math.abs(b) / 50) + 4);
    var speedMark = (a + "" + b) * 1;
    var differentialData = { "cmd": 1, "data": [c * 1000, speedMark, 8] };
    this.codeArr.push(differentialData);  
  },

  onground: function (a) {
    switch (a) {
      case 'start':
        var ongroundData = { "cmd": 5, "data": [5]};
        break;
      case 'end':
        var ongroundData = { "cmd": 6, "data": [1] };
        break;
    }
    this.codeArr.push(ongroundData);
  },

  pickUp: function (a) {
  switch (a) {
    case "start":
      var pickUpData = { "cmd": 5, "data": [4] };
      break;
    case "end":
      var pickUpData = { "cmd": 6, "data": [1] };
      break;
  };
  this.codeArr.push(pickUpData);  
  },

  eyeSensor: function (a, b) {
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
    this.codeArr.push(eyeSensorData);  
  },

  eyeSwitch: function (a, b, c) {
    var eyeswitchData = { "cmd": 4, "data":[a, b, c] };
    this.codeArr.push(eyeswitchData);  
  }
}



/****************send order*****************/
var btn = document.querySelector('.btn');
var progressPercent = document.querySelector('.progress .percent');
var progressCircle = document.querySelector('.progress .circle');
var progressMask = document.querySelector('.progressMask');
progressMask.style.display = 'none';
var count = 0;
var code;
function UpdateFunction(event) {
  aieggy.codeArr = [];
  code = Blockly.JavaScript.workspaceToCode(workspace);
  eval(code);
  if (aieggy.codeArr.length > 0) {
      for (var i = 0; i < aieggy.codeArr.length; i++) {
        aieggy.codeArr[i].data.unshift(i);
      };
      var firstOrder = { "cmd": 0, "data": [aieggy.codeArr.length] }
      aieggy.codeArr.unshift(firstOrder);
  };
  console.log(aieggy.codeArr);
};
btn.addEventListener(startEvt, function (e) {
  e.stopPropagation();
  e.preventDefault();
  progressPercent.innerHTML = "0%";
  count = 0;
  deltaTime = delay();
  UpdateFunction();
  if (deltaTime > 1000 && aieggy.codeArr.length > 0) {
      btnJump(btn);
      var t;
      t = setInterval(send, 500);
      function send() {
          progressMask.style.display = 'block';
          console.log(aieggy.codeArr[count]);
          count++;
          progressPercent.innerHTML = parseInt(100 * count / aieggy.codeArr.length) + "%";
          if (count == aieggy.codeArr.length) {
              clearInterval(t);
              progressCircle.classList.add("circleBig");
              setTimeout(function () {
                  progressMask.style.display = 'none';
                  progressCircle.classList.remove("circleBig");
              }, 2000);
          };
      };
  };
},false);
function btnJump(ele) {
  ele.classList.add("btnJump");
  var btnTimer;
  btnTimer = setTimeout(function () { ele.classList.remove("btnJump"); }, 500);
};
var BtnLastTime = 0;
var nowTime;
var deltaTime;
function delay() {
  nowTime = Date.now();
  deltaTime = nowTime - BtnLastTime;
  BtnLastTime = nowTime;
  return deltaTime;
};
/****************send order end*****************/