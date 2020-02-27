<template>
  <div id="ble" :style="{background: 'url(' + cardbg + ') no-repeat', backgroundSize: 'cover'}">
    <div class="languageBox">
      <language></language>
    </div>
    <div class="noticebox centerEle">
      <div class="noticeTitle text"><span class="centerEle" v-if="noticeTitleKey">{{languageConfig[curLanguage][noticeTitleKey]}}</span></div>
      <div class="close" @click="close"><img :src="offBtn"></div>
      <div class="content">
        <div class="noticeMsg text centerEle" v-if="uniqDevices.length == 0 && !searching && noticeMsgKey" v-html="languageConfig[curLanguage][noticeMsgKey]"></div>
        <div class="searchBox centerEle" v-if="searching">
          <div class="spinner centerEle">
            <div class="spinner-container container1">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
          </div>
        </div>
        <div class="devicebox">
          <div class="deviceWrap">
            <ul :style="{width: uniqDevices.length * 1.2 + 'rem'}">
              <li v-for="(item, index) in uniqDevices" :key="index" @click="connect(item)" class="deviceList">
                <div class="deviceIcon"><img class="centerEle" :src="deviceIcon"></div>
                <div class="devicename"><span class="centerEle">{{ "aieggy_" + item.slice(-3) }}</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottomBtn">
        <div class="refresh centerEle" v-if="!searching" @click="scanble"><img :src="refreshpic"></div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapState,mapGetters,mapActions} from 'vuex';
import language from "components/language.vue";
import languageConfig from "../../assets/language.json";

import cardbg from "../../../static/img/system/bg.jpg";
import refreshpic from "../../../static/img/system/refresh.png";
import offBtn from "../../../static/img/system/off.png";
import deviceIcon from "../../../static/img/system/device.png";

export default {
  name: 'ble',
  data() {
    return {
      width: "",
      offBtn,
      refreshpic,
      deviceIcon,
      url: "",
      cardbg,
      noticeTitleKey: "",
      noticeMsgKey: "",
      searching: false,
      devices: [],
      uniqDevices: [],
      languageConfig
    }
  },
  components: { language },
  methods: {
    scan: function () {
      var _this = this;
      ble.isEnabled(function () {
        var timer = null;
        clearTimeout(timer);
        _this.bleEnable();
        _this.devices = [];
        ble.scan([], 5, function (device) {
          if (device.name == "AIeggy_Code") {
            _this.devices.push(device.id);
            _this.searching = false;
            _this.noticeTitleKey = "noticeTitle_choose_robot";
          }  
        }, function (reason) {
            
        })
        timer = setTimeout(function () {
          if (_this.devices.length == 0) {
            _this.searching = false;
            _this.noticeTitleKey = "noticeTitle_no_robot";
            _this.noticeMsgKey = "noticeMsg_no_robot";
          }
        }, 5000);
      },function () {
        _this.blenoEnable();
      })
    },
    scanble: function () {
      var _this = this;
      if (cordova.platformId.toLowerCase() == "ios") {
        ble.connectedPeripheralsWithServices(["ae00"], function (device) {
          for (var i = 0; i < device.length; i++) {
            if (device[i].name == "AIeggy_Code") {
              var index = i;
              _this.connect(device[index].id);
            }
          }
        }, function () {})
        _this.scan();
      } else if (cordova.platformId.toLowerCase() == "android") {
        _this.scan();
      }
    },
    connect: function (id) {
      var _this = this;
      window.plugins.toast.showLongCenter(_this.languageConfig[_this.curLanguage]["toast_connecting"]);
      ble.connect(id, function () {
        window.plugins.toast.showLongCenter(_this.languageConfig[_this.curLanguage]["toast_con_successful"]);
        window.localStorage.setItem("Ble_device_id", id);
        _this.close();
      }, function (reason) {
        window.plugins.toast.showLongCenter(_this.languageConfig[_this.curLanguage]["toast_con_fail"]);
      })
    },
    bleEnable: function () {
      this.noticeTitleKey = "noticeTitle_searching";
      this.searching = true;
    },
    blenoEnable: function () {
      this.uniqDevices = [];
      this.devices = [];
      this.noticeTitleKey = "noticeTitle_Ble_off";
      this.noticeMsgKey = "noticeMsg_Ble_off";
    },
    uniqDevice: function (devices){
      this.uniqDevices = devices;
    },
    close: function () {
      var url = this.url;
      if (url == "") {
        window.location.replace("homepage.html");
      } else {
        window.location.replace(url);
      }
    }
  },
  mounted: function () {
    var _this = this;
    var searchUrl = window.location.search;
    if (searchUrl == "") _this.url = "";
    else {
      searchUrl = searchUrl.substr(1);
      _this.url = searchUrl;
    }
    setTimeout(function () {
      _this.scanble();
    }, 200)
  },
  computed: {
    ...mapGetters("aieggy", {
      curLanguage: "getLanguage"
    })
  },
  watch: {
    devices: {
      handler(val) {
        var temp = [];
        for (var i = 0; i < val.length; i++) {
          if (temp.indexOf(val[i]) == -1) {
            temp.push(val[i])
          }
        }
        this.uniqDevice(temp);
      },
      deep: true
    }
  }
}
</script>


<style scoped>
#ble {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.text {
  text-align: center;
}

.centerEle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.languageBox {
  position: absolute;
  width: auto;
  height: auto;
  top: 0.1em;
  right: 0.4em;
  z-index: 111;
}

.noticebox {
  width: 80%;
  height: 80%;
  border-radius: 0.15rem;
  background: rgba(0, 0, 0, 0.4);
  overflow-x: scroll;
  overflow-y: hidden;
  transform-origin: center;
  transform: translate(-50%, -50%) scale(0.85);
}

.noticeTitle {
  position: absolute;
  width: 70%;
  height: 15%;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
  border-bottom-right-radius: 0.15rem;
  border-bottom-left-radius: 0.15rem;
  font-size: 0.14rem;
  color: #fff;
  background: rgb(255, 132, 0);
}

.noticeTitle span {
  display: inline-block;
  width: 100%;
}

.content {
  position: absolute;
  width: 100%;
  height: 60%;
  top: 15%;
  left: 0;
  overflow-x: scroll;
  overflow-y: hidden;
}

.searchBox {
  width: 100%;
  height: 100%;
}

.noticeMsg {
  width: 100%;
  height: auto;
  font-size: 0.15rem;
  color: rgb(255, 255, 255);
}

.bottomBtn {
  position: absolute;
  width: 100%;
  height: 25%;
  bottom: 0;
  left: 0;
}

.refresh {
  width: 0.3rem;
  height: 0.3rem;
}

.refresh img {
  display: block;
  width: 100%;
}

.close {
  position: absolute;
  width: 0.15rem;
  height: 0.15rem;
  top: 0.1rem;
  right: 0.15rem;
}

.close img {
  display: block;
  width: 100%;
}


.spinner {
  width: 0.6rem;
  height: 0.6rem;
}
 
.container1 > div, .container2 > div, .container3 > div {
  width: 0.12rem;
  height: 0.12rem;
  background-color: rgb(0, 255, 246);
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
 
.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
 
.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
 
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
 
.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
 
.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
 
.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
 
.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
 
.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
 
.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
 
.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

.devicebox, .deviceWrap {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.deviceWrap ul {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
  height: 100%;
  font-size: 0;
}

.deviceList {
  position: relative;
  float: left;
  width: 1rem;
  height: 80%;
  background: rgba(255, 255, 255, 0.6);
  margin: 0.15rem 0.1rem 0;
  font-size: 0;
  border-radius: 0.1rem;
  overflow: hidden;
}

.deviceIcon img {
  width: 60%;
}

.deviceIcon {
  position: relative;
  width: 100%;
  height: 80%;
}

.devicename {
  position: relative;
  bottom: -1px;
  width: 100%;
  height: 20%;
  font-size: 0.1rem;
  text-align: center;
  background: rgb(255, 132, 0);
}

.devicename span {
  display: inline-block;
  width: 100%;
}

</style>


