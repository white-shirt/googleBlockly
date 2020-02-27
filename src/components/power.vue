<template>
  <div class="power1">
    <img v-if="energy >= 80 && energy < 100" :src="powerpic100">
    <img v-if="energy >= 60 && energy < 80" :src="powerpic80">
    <img v-if="energy >= 40 && energy < 60" :src="powerpic60">
    <img v-if="energy >= 20 && energy < 40" :src="powerpic40">
    <img v-if="energy >= 0 && energy < 20" :src="powerpic20">
  </div>
</template>

<script>
import powerpic100 from "../../static/img/power/power100.png";
import powerpic80 from "../../static/img/power/power80.png";
import powerpic60 from "../../static/img/power/power60.png";
import powerpic40 from "../../static/img/power/power40.png";
import powerpic20 from "../../static/img/power/power20.png";
export default {
  name: "power1",
  data() {
    return {
      powerpic100,
      powerpic80,
      powerpic60,
      powerpic40,
      powerpic20,
      energy: 90 
    }
  },
  methods: {
    init: function () {
      var _this = this;
      var tempenergy;
      function getenergy() {
        tempenergy = window.localStorage.getItem("AIeggy_energy");
        if (parseInt(tempenergy) > 0 && parseInt(tempenergy) < 100) {
          _this.energy = parseInt(tempenergy);
        }
      }
      getenergy();
      setInterval(function () {
        getenergy();
      }, 30000)
    }
  },
  mounted: function () {
    this.init()
  }
}
</script>

<style scoped>
img {
  display: block;
  width: 100%;
}

.power1 {
  position: absolute;
  display: inline-block;
  width: 0.29em;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>


