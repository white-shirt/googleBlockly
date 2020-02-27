<template>
  <canvas id="background"></canvas>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "drawbackground",
  props: ["MapPicData", "VmWidth"],
  data() {
    return {};
  },
  methods: {
    init: function(Data) {
      var _this = this;
      var bgImg = new Image();
      bgImg.src = Data.src;
      bgImg.crossOrigin = true;
      var canvasEle = $("#background");
      var ctx = $("#background")[0].getContext("2d");
      var canvasW = _this.VmWidth;
      var canvasH = canvasW / Data.ratio;
      if (window.devicePixelRatio) {
        canvasEle.css({
          width: canvasW + "px",
          height: canvasH + "px"
        });
        canvasEle.attr("width", canvasW * window.devicePixelRatio + "px");
        canvasEle.attr("height", canvasH * window.devicePixelRatio + "px");
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      bgImg.onload = function() {
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.drawImage(bgImg, 0, 0, canvasW, canvasH);
      };
    }
  },
  created: function() {
    var _this = this;
  },
  mounted: function() {
    var _this = this;
  },
  computed: {},
  watch: {
    MapPicData: {
      handler(val, oldVal) {
        var _this = this;
        _this.init(val);
      }
    },
    VmWidth: {
      handler(val, oldVal) {
        var _this = this;
        // console.log(_this.MapPicData);
        _this.init(_this.MapPicData);
      }
    }
  }
};
</script>

<style scoped>
#background {
  border-radius: 10px;
}

</style>

