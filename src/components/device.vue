<template>
    <div id="device" :style="{ background: 'url(' + bg + ') no-repeat', backgroundSize: 100 + '%' }">
        <div class="wrap">
          <div :class="['circle1', timeoutmove ? 'timeoutCircle1move' : '']" v-if="devices.length == 0"></div>
          <div :class="['circle2', timeoutmove ? 'timeoutCircle2move' : '']" v-if="devices.length == 0"></div>
          <div class="searching" v-if="devices.length == 0"><img :src="searchpic"></div>
          <div class="devicebox">
            <ul class="deviceul">
              <li class="devicelist" v-for="(item, index) in devices" :key="index" @click="connect(item)">
                <div class="deviceIcon"><img :src="deviceIcon"></div>
                <div class="devicename"><span>{{ "aieggy_" + item.slice(-3) }}</span></div>
              </li>
            </ul>
          </div>
          <div class="toidxbox" @click="close"><img :src="backpic"></div>
          <div class="refresh" @click="refresh"><img :src="refreshpic"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import deviceIcon from "../../static/img/system/device.png";
import backpic from "../../static/img/system/toindex.png";
import refreshpic from "../../static/img/system/refresh.png";
import searchpic from "../../static/img/system/search.png";
import bg from "../../static/img/system/bg.jpg";

export default {
  name: "device",
  data() {
    return {
      deviceIcon,
      backpic,
      refreshpic,
      searchpic,
      bg,
      fontSize: "",
      timeoutmove: false
    };
  },
  methods: {
    connect: function(id) {
      var _this = this;
      window.plugins.toast.showLongCenter("connecting");
      ble.connect(id, function() {
          window.plugins.toast.showLongCenter("connect success");
          window.localStorage.setItem("Ble_device_id", id);
          _this.close();
        }, function(reason) {
          window.plugins.toast.showLongCenter(JSON.stringify(reason));
        }
      );
    },
    refresh: function() {
      this.scan();
    },
    scan: function() {
      // this.$store.dispatch("aieggy/invokeChangeRefresh");
    },
    close: function() {
      this.$emit("exit", "device");
    }
  },
  mounted: function() {
    var _this = this;
    this.scan();
    this.fontSize = document.documentElement.clientWidth / 750 * 100 + 'px';
    setTimeout(function () {
      _this.timeoutmove = true;
    }, 100)
  },
  computed: {
    ...mapGetters("aieggy", {
      devices: "getDevice"
    })
  }
};
</script>

<style scoped>
#device {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle1, .circle2 {
   position: absolute;
   width: 0.5em;
   height: 0.5em;
   border-radius: 50%;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   -webkit-transform: translate(-50%, -50%);
}


.circle1 {
    background: rgba(230, 229, 229, 0.5);
}

.circle2 {
    background: rgba(230, 229, 229, 0.8);
}

.timeoutCircle1move {
    animation: linear circle1move 2s infinite;
    -webkit-animation: linear circle1move 2s infinite;
}

.timeoutCircle2move {
    animation: linear circle2move 2s infinite;
    -webkit-animation: linear circle2move 2s infinite;
}

@keyframes circle1move {
    from { width: 0.5em; height: 0.5em; }
    to { width: 3.5em; height: 3.5em }
}

@keyframes circle2move {
    from { width: 0.5em; height: 0.5em; }
    to { width: 2.5em; height: 2.5em }
}

@-webkit-keyframes circle1move {
    from { width: 0.5em; height: 0.5em; }
    to { width: 3.5em; height: 3.5em }
}

@-webkit-keyframes circle2move {
    from { width: 0.5em; height: 0.5em; }
    to { width: 2.5em; height: 2.5em }
}

.devicebox {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 90%;
  margin-left: 10%;
  height: 3em;
  overflow: hidden;
}

.devicebox .deviceul {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.deviceul .devicelist {
  position: relative;
  flex-shrink: 0;
  width: 1.8em;
  height: 2.6em;
  margin: 0 0.2em;
  border-radius: 0.1em;
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
}

.deviceul .devicelist .deviceIcon {
  position: absolute;
  width: 100%;
  height: 2.2em;
  top: 0;
  left: 0;
}

.deviceIcon img {
  position: absolute;
  width: 80%;
  top: 10%;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

.devicename {
  position: absolute;
  bottom: -0.2em;
  width: 200%;
  height: 0.8em;
  text-align: center;
  -webkit-transform-origin: left;
  transform-origin: left;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  background: #1293b2;
}

.devicename span {
  display: inline-block;
  position: absolute;
  font-size: 0.3em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
} 

.searching {
  position: relative;
  display: block;
  top: 50%;
  left: 50%;
  width: 0.8em;
  height: 0.8em;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.searching img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.toidxbox {
  width: 0.39em;
  height: 0.39em;
  top: 0.19em;
  left: 0.19em;
}

.toidxbox img, .refresh img {
  position: absolute;
  width: 100%;
}

.refresh {
  position: absolute;
  width: 0.39em;
  height: 0.39em;
  top: 0.19em;
  right: 0.19em;
}
</style> 

