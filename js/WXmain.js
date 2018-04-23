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

/*********************Hamburger Btn*********************************/
var sideBarBtn = document.querySelector('.sideBarBtn');
sideBarBtn.state = 'closed';
var sidebarWrap = document.querySelector('.sidebarWrap');
var $sidebarWrap = $('.sidebarWrap');
var $Btn_lines = $('.Btn_line');
var mask = document.querySelector('.mask');
var sidebarWrapHeight = sidebarWrap.offsetHeight;
$sidebarWrap.css('display', 'none');
var BtnTimer = null;
sideBarBtn.addEventListener(startEvt, function (e) {
    e.stopPropagation();
    e.preventDefault();
    var workspaceToCode = document.querySelector(".workspaceToCode");
    loopCount = 0;
    workspaceToCode.innerHTML = Blockly.JavaScript.workspaceToCode(workspace);
    BtnMove();
}, false);
mask.addEventListener(startEvt, function () {
    sideBarBtn.state = 'opened';
    BtnMove();
}, false);
/******************************Hamburger Btn animation****************************/
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
}, false);
contentWrap.addEventListener(moveEvt, function (e) {
    disX = e.changedTouches[0].clientX - touchX;
}, false);
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
    contentLogo.style.backgroundPositionX = -100 * contentIndex + "px";
    disX = 0;
}, false);
function contentMove(direction, ele) {
    if (direction == 'up') {
        ele.css('display', 'block').animate({ 'bottom': 0 + 'px' }, 300);
        mask.style.display = 'block';
    } else {
        ele.animate({ 'bottom': -sidebarWrapHeight + 'px' }, 300, function () {
            ele.css('display', 'none');
            mask.style.display = 'none';
        });
    };
};
/****************************Hamburger Btn end*****************************/
/****************************save and share********************************/
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
/*********************************save blocks*******************************/
saveBtn.addEventListener(startEvt, function (e) {
    e.preventDefault();
}, false);
saveBtn.addEventListener(endEvt, save, false);
function save() {
    var blocks = workspace.getAllBlocks();
    var saveName = saveFile.value;
    /********allow to save***************/
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
            console.log("保存的模块:" + "----" + xmlText);
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
/*************************share to friend******************************/



/******************************get blocks*****************************/
clickGetFile.addEventListener(startEvt, function (e) {
    e.preventDefault();
}, false);
clickGetFile.addEventListener(endEvt, getBlocks, false);
function getBlocks() {
    $.ajax({
        url: "./json/mock.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
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
        error: function () {
            clickGetFile.innerHTML = "";
            fileWrap.style.display = "block";
        }
    });
};
/******************************delete Or share File****************************/
function delOrshareFile() {
    /***********when delete the file get .filelist DOM again**************/
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
            /********deleteTimestamp************/
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
            /*****************shareXml****************/
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
/*****************************save and share end******************************/