<template>
  <div id="bluetooth" @click="scan">
    <img v-if="BleConnectStatus == true" class="blestate" :src="bleIcon.connected"/>
    <img v-if="BleConnectStatus == false" class="blestate" :src="bleIcon.disconnect"/>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
import bleIcon from "../assets/img.json";

export default {
  name: "bluetooth",
  data() {
    return {
      bleIcon: bleIcon.bleIcon,
      BleConnectStatus: false,
      timer: null
    }
  },
  methods: {
    init: function () {
      var _this = this;
      clearInterval(this.timer);
      this.timer = setInterval(function () {
        ble.isEnabled(function () {
          if (cordova.platformId.toLowerCase() == "ios") {
            ble.connectedPeripheralsWithServices(["ae00"], function (device) {
              ble.connect(window.localStorage.getItem("Ble_device_id"), function () {
                _this.BleConnectStatus = true;
              }, function () {
                _this.BleConnectStatus = false;
              })
            }, function () {
              _this.BleConnectStatus = false;
            })
          } else if (cordova.platformId.toLowerCase() == "android") {
            ble.isConnected(window.localStorage.getItem("Ble_device_id"), function () {
              _this.BleConnectStatus = true;
            }, function () {
              _this.BleConnectStatus = false;
            })
          }
        }, function () {
          _this.BleConnectStatus = false;
        })
      }, 1000)
    },
    scan: function () {
      var _this = this;
      var pathname = window.location.pathname.split("/");
      window.location.replace("ble.html?" + pathname[pathname.length - 1] + "?" +  this.curlevel);
    }
  },
  created: function () {
  },
  beforeDestroy: function () {
    clearInterval(this.timer);
  },
  mounted: function () {
    this.init();
  },
  computed: {
    ...mapGetters("aieggy", {
      curlevel: "getCurLevel"
    })
  },
  watch: {
    BleConnectStatus: {
      handler(val) {
        this.$store.dispatch("aieggy/invokeBleConnectStatus", val);
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  #bluetooth {
    width: 100%;
    height: 100%;
  }

  .blestate {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
