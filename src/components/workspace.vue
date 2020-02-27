<template>
  <div class="workspace">
    <div id="blocklyDiv"></div>
    <div class="workspaceZoom">
      <div class="startBtn" @click="start">
        <img class="startBtnImg" :src="startBtn">
      </div>
      <ul class="zoomUl">
        <li class="zoomitem zoomcenter" @click="zoomcenter">
          <img class="zoomImg" :src="zoomIcon.zoomcenter" />
        </li>
        <li class="zoomitem zoomsub" @click="zoomsub">
          <img class="zoomImg" :src="zoomIcon.zoomsub" />
        </li>
        <li class="zoomitem zoomplus" @click="zoomplus">
          <img class="zoomImg" :src="zoomIcon.zoomplus" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import zoomIcon from "../assets/img.json";
import startBtn from "../../static/img/blockIcon/flagGreen.png";


export default {
  name: "workspace",
  //blockxml用来接收父组件传过来的值
  props: ["blockxml", "workspacexml", "createorlevel"],
  data() {
    return {
      workspace: "",
      code: [],
      zoomIcon: zoomIcon.zoomIcon,
      startBtn,
      startScale: 0.6,
      maxScale: 0.9,
      minScale: 0.5,
      scaleSpeed: 1.1,
      mode: ""
    };
  },
  methods: {
    init: function(xml) {
      var _this = this;
      _this.mode = _this.createorlevel;
      //默认在工作区创建一个帽子模块
      // var workspaceXml = xml;
      if (_this.mode == "create" && window.localStorage.getItem("lastSaveCreateXmlText")) {
        xml = window.localStorage.getItem("lastSaveCreateXmlText");
      } else if (_this.mode == "level" && window.localStorage.getItem("lastSaveLevelXmlText")) {
        var lastSaveLevelXmlText = JSON.parse(window.localStorage.getItem("lastSaveLevelXmlText"));
        var savedLevel = lastSaveLevelXmlText.level;
        if (savedLevel == _this.curLevel) {
          xml = lastSaveLevelXmlText.xmlText;
        }
      }
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), _this.workspace);
      //没有和帽子连接的模块自动被禁用
      _this.workspace.addChangeListener(Blockly.Events.disableOrphans);
      //实时保存工作区的积木
      _this.workspace.addChangeListener(_this.SaveXmlText);
      _this.workspace.addChangeListener(_this.onTrashStatus);
    },
    workspaceToCode: function () {
      var _this = this;
      var code = Blockly.JavaScript.workspaceToCode(this.workspace);
      this.code = code;
      if (this.mode == "level") {
        var blocksArr = [];
        for (var i = 0; i < this.workspace.getAllBlocks().length; i++) {
          blocksArr.push(this.workspace.getAllBlocks()[i].type);
        }
        this.$store.dispatch("aieggy/invokeBlocks", blocksArr);
      }
    },
    SaveXmlText: function () {
      var xml = Blockly.Xml.workspaceToDom(this.workspace);
      var xmlText = Blockly.Xml.domToText(xml).replace(/"/g, "'");
      var lastSaveLevelXmlText = { "level": this.curLevel, "xmlText": xmlText }
      if (this.mode == "create") {
        window.localStorage.setItem("lastSaveCreateXmlText", xmlText);
      } else if (this.mode == "level") {
        window.localStorage.setItem("lastSaveLevelXmlText", JSON.stringify(lastSaveLevelXmlText));
      }
    },
    hatClick: function(event) {
      var _this = this;
      _this.workspace.addChangeListener(function(event) {
        if (event.blockId == "hat" && event.element == "click") {
          _this.workspaceToCode();
        }
      });
    },
    start: function () {
      this.workspaceToCode();
    },
    //模块居中
    zoomcenter: function(event) {
      var _this = this;
      // _this.workspace.markFocused();
      _this.workspace.setScale(_this.startScale);
      _this.workspace.scrollCenter();
      // Blockly.Touch.clearTouchIdentifier();
      event.stopPropagation();
      event.preventDefault();
    },
    //模块缩小
    zoomsub: function(event) {
      var _this = this;
      //_this.workspace.markFocused();
      _this.workspace.zoomCenter(-1);
      //Blockly.Touch.clearTouchIdentifier();
      event.stopPropagation();
      event.preventDefault();
    },
    //模块加大
    zoomplus: function(event) {
      var _this = this;
      //_this.workspace.markFocused();
      _this.workspace.zoomCenter(1);
      //Blockly.Touch.clearTouchIdentifier();
      event.stopPropagation();
      event.preventDefault();
    },
    onTrashStatus: function () {
      var _this = this;
      var blocklyPath = $(".blocklyDraggable");
      blocklyPath.off("touchmove");
      blocklyPath.off("touchend");
      blocklyPath.on("touchmove", function () {
        _this.$emit("ontrashStatus", true);
      })
      blocklyPath.on("touchend", function () {
        _this.$emit("ontrashStatus", false);
      })
    }
  },
  mounted: function() {
    var _this = this;
    var navheadH = $(".navhead").height();
    var categoryW = $(".category").width();
    var workspaceboxW = $("body").width() - categoryW;
    var workspaceboxH = $("body").height() - navheadH;
    $(".content").css({
      height: workspaceboxH + "px"
    });
    $(".workspacebox").css({
      width: workspaceboxW + "px",
      height: workspaceboxH + "px",
      marginLeft: categoryW + "px"
    })
    var blocklyDiv = $("#blocklyDiv");
    if (document.documentElement.clientWidth > 1000) {
      _this.startScale = 0.9;
      _this.maxScale = 1.2;
      _this.minScale = 0.6;
    }
    document.getElementsByClassName("workspaceZoom")[0].style.fontSize = document.documentElement.clientWidth / 750 * 100 + 'px';
    _this.workspace = Blockly.inject("blocklyDiv", {
      media: "./static/media/",
      toolbox: _this.blockxml,
      horizontalLayout: false,
      toolboxPosition: "start",
      comments: false,
      disable: false,
      scrollbars: true,
      zoom: {
        controls: false,
        wheel: true,
        startScale: _this.startScale,
        maxScale: _this.maxScale,
        minScale: _this.minScale,
        scaleSpeed: _this.scaleSpeed
      },
      trashcan: false
    });
    _this.init(_this.workspacexml);
    _this.hatClick(event);
  },
  computed: {
    ...mapGetters("aieggy", {
      curLevel: "getCurLevel"
    })
  },
  watch: {
    blockxml(newVal, oldVal) {
      var _this = this;
      _this.workspace.updateToolbox(newVal);
    },
    code: {
      handler(val, oldVal) {
        var _this = this;
        _this.$emit("onCode", val);
      },
      deep: true
    },
    workspacexml: {
      handler(val) {
        //console.log(val)
        this.workspace.clear();
        //this.init(val);
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(val), this.workspace);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.workspace {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  position: relative;
  width: 100%;
  height: 100%;
}

#blocklyDiv {
  width: 100%;
  height: 100%;
}

.blocklyMainWorkspaceScrollbar {
  display: none;
}

.workspaceZoom {
  position: absolute;
  bottom: 0.25em;
  right: 0.3em;
  width: auto;
  height: auto;
  overflow: hidden;
  z-index: 80;
}

.zoomUl {
  width: 1.1em;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.startBtn {
  width: auto;
  height: auto;
  margin-bottom: 0.1em;
}

.startBtn img {
  display: block;
  width: 1.1em;
  height: auto;
}

.zoomitem {
  width: auto;
  height: auto;
}

.zoomImg {
  display: block;
  width: 0.3em;
  height: auto;
}




</style>
