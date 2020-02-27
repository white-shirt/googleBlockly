<template>
  <canvas id="drawLine"></canvas>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "drawLine",
  props: ["lineCode", "VmWidth"],
  data() {
    return {
      pointData: "",
      width: "",
      height: "",
      ctx: "",
      startPoint: "",
      currentPoint: "",
      curOrientation: "N",
      allPoint: [],
      allPointXY: [],
      index: 0,
      animationX: 0,
      animationY: 0,
      timer: null,
      transformOrientation: {
        N: { left: "E", right: "W", back: "S" },
        S: { left: "W", right: "E", back: "N" },
        E: { left: "S", right: "N", back: "W" },
        W: { left: "N", right: "S", back: "E" }
      }
    };
  },

  methods: {
    init: function(Data) {
      var _this = this;
      //地图全部点的信息
      _this.pointData = Data.pointData;
      _this.width = _this.VmWidth;
      // console.log(_this.width)
      _this.height = _this.VmWidth / Data.ratio;
      _this.startPoint = _this.pointData[Data.startPoint];
      _this.currentPoint = _this.startPoint;
      _this.allPoint.push(_this.startPoint);
      var canvasEle = $("#drawLine");
      var ctx = $("#drawLine")[0].getContext("2d");
      _this.ctx = ctx;
      var canvasW = _this.width;
      var canvasH = _this.height;
      if (window.devicePixelRatio) {
        canvasEle.css({
          width: canvasW + "px",
          height: canvasH + "px"
        });
        canvasEle.attr("width", canvasW * window.devicePixelRatio + "px");
        canvasEle.attr("height", canvasH * window.devicePixelRatio + "px");
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      _this.drawPoint(_this.allPoint);
    },

    initMapData: function () {
      var _this = this;
      //停止动画
      _this.cancelAnimation();
      //清空所有路径点
      _this.allPoint = [];
    },

    drawPoint: function(Data) {
      var _this = this;
      var ctx = _this.ctx;
      ctx.clearRect(0, 0, _this.width, _this.height);
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(
        _this.width * Data[0].x,
        _this.height * Data[0].y,
        2,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
      ctx.closePath();
    },

    cancelAnimation: function() {
      var _this = this;
      window.cancelAnimationFrame(_this.timer);
      _this.index = 0;
      _this.animationX = 0;
      _this.animationY = 0;
      _this.allPointXY = [];
      _this.curOrientation = "N";
    },

    startdrawLine: function() {
      var _this = this;
      var Data = _this.allPoint;
      _this.cancelAnimation();
      for (var i = 0; i < Data.length; i++) {
        _this.allPointXY.push({
          X: parseInt(Data[i].x * _this.width),
          Y: parseInt(Data[i].y * _this.height)
        });
      }
      _this.drawLine();
    },

    drawLine: function() {
      var _this = this;
      var ctx = _this.ctx;
      var speed;
      ctx.beginPath();
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#fff";
      if (_this.index < _this.allPointXY.length - 1) {
        _this.timer = window.requestAnimationFrame(_this.drawLine);
        var disX =
          _this.allPointXY[_this.index + 1].X - _this.allPointXY[_this.index].X;
        var disY =
          _this.allPointXY[_this.index + 1].Y - _this.allPointXY[_this.index].Y;
        ctx.moveTo(
          _this.allPointXY[_this.index].X,
          _this.allPointXY[_this.index].Y
        );
        if (disX > 0 || disY > 0) speed = _this.vmspeed;
        if (disX < 0 || disY < 0) speed = -_this.vmspeed;
        if (disX !== 0 && disY == 0) {
          if (Math.abs(disX) - Math.abs(_this.animationX) < 1) {
            _this.index++;
            _this.animationX = 0;
          } else {
            _this.animationX += speed;
            ctx.lineTo(
              _this.allPointXY[_this.index].X + _this.animationX,
              _this.allPointXY[_this.index].Y
            );
          }
        }
        if (disY !== 0 && disX == 0) {
          console.log(_this.animationY);
          if (Math.abs(disY) - Math.abs(_this.animationY) < 1) {
            _this.index++;
            _this.animationY = 0;
          } else {
            _this.animationY += speed;
            ctx.lineTo(
              _this.allPointXY[_this.index].X,
              _this.allPointXY[_this.index].Y + _this.animationY
            );
          }
        }
        if (disX == 0 && disY == 0) {
          _this.index++;
          ctx.lineTo(
            _this.allPointXY[_this.index].X,
            _this.allPointXY[_this.index].Y
          );
        }
        ctx.stroke();
      } else {
        _this.cancelAnimation();
      }
    },

    blockData: function(Data) {
      //处理命令指令
      var _this = this;
      _this.allPoint = [_this.currentPoint];
      var msg;
      var nextName;
      for (var i = 0; i < Data.length; i++) {
        var i_num = i;
        if (Data[i].mode == "rotate") {
          var angle = Data[i_num].angle;
          _this.rotate(angle);
          _this.allPoint.push(_this.currentPoint);
          msg = { type: "wran", Msg: "“蛋仔”正在转弯!" };
        }
        if (Data[i].mode == "forward") {
          nextName = _this.currentPoint[_this.curOrientation];
          if (nextName == "warn") {
            msg = { type: "wran", Msg: "“蛋仔”要跑出去啦!" };
            break;
          }
          var nextPoint = _this.pointData[nextName];
          _this.allPoint.push(nextPoint);
          _this.currentPoint = nextPoint;
          _this.drawPoint(_this.allPoint);
          msg = { type: "wran", Msg: "“蛋仔”正在" + nextName };
        }
        _this.$emit("warn", msg);
      }
      _this.startdrawLine();
    },

    rotate: function(Data) {
      var _this = this;
      var curOrientation = _this.curOrientation;
      _this.curOrientation = _this.transformOrientation[curOrientation][Data];
    }
  },
  created: function() {
    var _this = this;
  },
  mounted: function() {
    var _this = this;
  },
  computed: {
    ...mapGetters("vmmapdata", {
      vmMapData: "getVmMapData"
    }),

    ...mapGetters("vmmapdata", {
      vmspeed: "getspeed"
    })
  },
  watch: {
    vmMapData: {
      handler(val, oldval) {
        var _this = this;
        if (_this.VmWidth) {
          _this.initMapData();
          _this.init(val);
        }
      },
      deep: true
    },
    lineCode: {
      handler(val, oldVal) {
        var _this = this;
        _this.blockData(val);
      },
      deep: true
    },
    VmWidth: {
      handler(val, oldVal) {
        var _this = this;
        _this.init(_this.vmMapData)
      }
    }
  }
};
</script>

<style scoped>
#drawLine {
  position: absolute;
  top: 0;
}
</style>

