<template>
  <div id="vmBtnGroup">
    <div class="changeVmMapBtn" @click="vmmaplist">
      <img class="changeBtn" :src="speedIcon.changeBtn" />
    </div>
    <div class="slideVmSpeed">
      <img v-if="speedstate == 'slow'" class="speedImg" :src="speedIcon.slow" @click="VmSpeed"/>
      <img v-if="speedstate == 'fast'" class="speedImg" :src="speedIcon.fast" @click="VmSpeed"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import speedIcon from "../assets/img.json";

export default {
  name: "vmbtn",
  data() {
    return {
      speedIcon: speedIcon.speedIcon,
      speedstate: "slow"
    };
  },
  methods: {
    VmSpeed: function() {
      var _this = this;
      var speed = 0.4;
      if (_this.speedstate == "slow") {
        _this.speedstate = "fast";
        speed = 0.7;
      } else {
        _this.speedstate = "slow";
        speed = 0.4;
      }
      _this.$store.dispatch("vmmapdata/invokeChangeSpeed", speed);
    },

    vmmaplist: function () {
      var _this = this;
      _this.$store.dispatch("vmmapdata/invokeChangeMaplistbox", true);
    }
  }
};
</script>

<style scoped>
#vmBtnGroup {
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background: #eee;
  padding-left: 10px;
  overflow: hidden;
  box-sizing: border-box;
}

.changeVmMapBtn {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.slideVmSpeed {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 40px;
}

.speedImg, .changeBtn {
  width: auto;
  height: 100%;
}

</style>

