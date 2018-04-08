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
    endEvt = 'touchend';
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

/* workspace to code */
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
    console.log(codeArr);
};
/* workspace to code end */
btn.addEventListener(startEvt, function (e) {
    e.stopPropagation();
    e.preventDefault();
    progressPercent.innerHTML = "0%";
    count = 0;
    deltaTime = delay();
    UpdateFunction();
    if (deltaTime > 1000 && codeArr.length > 0) {
        btnJump(btn);
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
},false);

/* Hamburger Btn */
var sideBarBtn = document.querySelector('.sideBarBtn');
sideBarBtn.state = 'closed';
var sidebarWrap = document.querySelector('.sidebarWrap');
var $sidebarWrap = $('.sidebarWrap');
var $Btn_lines = $('.Btn_line');
var mask = document.querySelector('.mask');
var sidebarWrapHeight = sidebarWrap.offsetHeight;
var BtnTimer = null;
var BtnLastTime = 0;
var nowTime;
var deltaTime;
sideBarBtn.addEventListener(startEvt, function (e) {
    e.stopPropagation();
    e.preventDefault();
    var workspaceToCode = document.querySelector(".workspaceToCode");
    loopCount = 0;
    workspaceToCode.innerHTML = Blockly.JavaScript.workspaceToCode(workspace);
    BtnMove();
},false);
/* Hamburger Btn animation */
function BtnMove() {
    if (sideBarBtn.state == 'closed') {
        $Btn_lines[0].classList.add('Btn_top_clockwise');
        $Btn_lines[1].classList.add('Btn_mid_hide');
        $Btn_lines[2].classList.add('Btn_bottom_anticlockwise');
        sideBarBtn.state = 'opened';
        contentMove('up', $sidebarWrap);
    } else {
        $Btn_lines.removeClass('Btn_top_clockwise Btn_mid_hide Btn_bottom_anticlockwise');
        $Btn_lines[0].classList.add('Btn_top_anticlockwise');
        $Btn_lines[1].classList.add('Btn_mid_show');
        $Btn_lines[2].classList.add('Btn_bottom_clockwise');
        BtnTimer = setTimeout(function () {
            $Btn_lines.removeClass('Btn_top_anticlockwise Btn_mid_show Btn_bottom_clockwise');
        }, 500);
        sideBarBtn.state = 'closed';
        contentMove('down', $sidebarWrap);
    };
};
var contentWrap = document.querySelector(".contentWrap");
var sidebarContent = document.querySelectorAll(".sidebarContent");
var contentLogo = document.querySelector(".contentLogo");
var navList = document.querySelectorAll(".navList");
var contentIndex = 0;
var touchX
var disX;
contentWrap.addEventListener(startEvt, function (e) {
    touchX = e.changedTouches[0].clientX;
},false);
contentWrap.addEventListener(moveEvt, function(e) {
    disX = e.changedTouches[0].clientX - touchX;
},false);
contentWrap.addEventListener(endEvt, function () {
    if (disX > 150) {
        contentIndex--; 
        if (contentIndex < 0) contentIndex = sidebarContent.length - 1;
    } else if (disX < -150) {
        contentIndex++;
        if (contentIndex > sidebarContent.length - 1) contentIndex = 0;
    }
    for (var i = 0; i < sidebarContent.length; i++) {
        sidebarContent[i].style.display = "none";
    }
    sidebarContent[contentIndex].style.display = "block";
    contentLogo.style.backgroundPositionX = -104 * contentIndex - 104 + "px";
    disX = 0;
},false);
/* Hamburger Btn animation end */
/* save and share */
var saveFile = document.querySelector("#saveFile");
var shareBtn = document.querySelector(".shareBtn");
var saveBtn = document.querySelector(".saveBtn");
var saveError = document.querySelector(".saveError");
var fileWrap = document.querySelector(".fileWrap");
var fileUl = document.querySelector(".fileUl");
var filelist = document.querySelector(".filelist");
var clickGetFile = document.querySelector(".clickGetFile");
var deleteFile;
var shareFile;
var fileInfo;
var allSavedXml = [];
var allSavedTime = [];
/* save blocks */
saveBtn.addEventListener(startEvt, function(e) {
    e.preventDefault();
}, false);
saveBtn.addEventListener(endEvt, save, false);
function save() {
    var blocks = workspace.getAllBlocks();
    var saveName = saveFile.value;
    /* allow to save */
    if (blocks.length !== 0 && saveName.length !== 0 && saveName.length < 10) {
        var confirmtoSave = confirm("确定保存当前模块？");
        if (confirmtoSave) {
            saveError.innerHTML = "";
            var Timestamp = new Date().getTime();
            var xml = Blockly.Xml.workspaceToDom(workspace);
            var xmlText = Blockly.Xml.domToText(xml);
            xmlText = xmlText.replace(/"/g, "'");
            if (fileWrap.style.display == "block") {
                var clonedNode = document.querySelector(".filelist");
                var newList = clonedNode.cloneNode(true);
                newList.style.display = "block";
                newList.querySelector(".fileName").innerHTML = saveName;
                fileUl.insertBefore(newList, clonedNode);
                allSavedXml.unshift(xmlText);
                allSavedTime.unshift(Timestamp);
            };
            /*
            *  
            *  此处写ajax
            *  
            */
            console.log("保存的模块:" + "----" +  xmlText);
            console.log("保存的名字:" + "----" + saveName);
            console.log("保存的时间戳:" + "----" + Timestamp);
            document.querySelector("#saveFile").value = "";
        }
    } else if (blocks.length === 0) {      
        saveError.innerHTML = "还没添加模块";
    } else if (saveName.length === 0 || saveName.length >= 10) {
        saveError.innerHTML = "名字长度1-9";
    }
    delOrshareFile();
}
/* share to friend */




/* get blocks */
clickGetFile.addEventListener(startEvt, function (e) {
    e.preventDefault();
},false);
clickGetFile.addEventListener(endEvt, getBlocks, false);
function getBlocks () {
    $.ajax({
        url : "./json/mock.json",
        type : "GET",
        dataType : "json",
        success : function (data) {
            clickGetFile.style.display = "none";
            fileWrap.style.display = "block";
            var saveFileLen = data.length;
            for (var i = 0; i < saveFileLen; i++) {
                var newList = filelist.cloneNode(true);
                newList.style.display = "block";
                newList.querySelector(".fileName").innerHTML = data[i].saveName;
                fileUl.insertBefore(newList, filelist);
                allSavedXml.push(data[i].xmlText);
                allSavedTime.push(data[i].Timestamp);
            }
            delOrshareFile();
        },
        error : function () {
            clickGetFile.innerHTML = "";
            fileWrap.style.display = "block";
        }
    });
};

/* delete Or share File  */
function delOrshareFile () {
    /*
     *  when delete the file 
     *  get .filelist DOM again
     */
    deleteFile = document.querySelectorAll(".deleteFile");
    shareFile = document.querySelectorAll(".shareFile");
    fileInfo = document.querySelectorAll(".fileInfo");
    for (var i = 0; i < deleteFile.length; i++) {
        deleteFile[i].index = i;
        deleteFile[i].onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            delOrshareFile();
            var confirmDelete = confirm("确定要删除" + "(" + this.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML + ")");
            /* deleteTimestamp 要删除的时间戳 */
            if (confirmDelete) {
                var deleteTimestamp = allSavedTime[this.index];
                fileUl.removeChild(this.parentNode.parentNode);
                allSavedXml.splice(this.index, 1);
                allSavedTime.splice(this.index, 1);
                console.log("删除" + "----" + deleteTimestamp);
            }
        }
    };
    for (var i = 0; i < shareFile.length; i++) {
        shareFile[i].index = i;
        shareFile[i].onclick = function (e, callback) {
            e.preventDefault();
            e.stopPropagation();
            delOrshareFile();
            /* shareXml 要分享的Xml */
            var shareXml = allSavedXml[this.index];
            console.log("分享" + "----" + shareXml);
        }
    };
    for (var i = 0; i < fileInfo.length; i++) {
        fileInfo[i].index = i;
        fileInfo[i].onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            delOrshareFile();
            var loadXml = confirm("是否要将模块替换成" + "(" + this.firstElementChild.innerHTML + ")");
            if (loadXml) {
                workspace.clear();
                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(allSavedXml[this.index]), workspace);
            }
        }
    }
}
/* save and share end */
/* sidebarContent animation */
$sidebarWrap.css('display', 'none');
function contentMove(direction, ele) {
    if (direction == 'up') {
        ele.css('display', 'block').animate({ 'bottom': 0 + 'px' }, 300, function () {
            mask.style.display = 'block';
        });
    } else {
        ele.animate({ 'bottom': -sidebarWrapHeight + 'px' }, 300, function () {
            mask.style.display = 'none';
            ele.css('display', 'none');
        });
    };
};

/* sidebarContent animation end */
/* prevent quickly click */
function delay() {
    nowTime = Date.now();
    deltaTime = nowTime - BtnLastTime;
    BtnLastTime = nowTime;
    return deltaTime;
};
/* prevent quickly click end */
/* start Btn jump */
function btnJump(ele) {
    ele.classList.add("btnJump");
    var btnTimer;
    btnTimer = setTimeout(function () { ele.classList.remove("btnJump") }, 500);
};
/* start Btn jump end */

