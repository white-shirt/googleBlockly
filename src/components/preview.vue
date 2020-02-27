<template>
  <div id="preview">
    <div class="mask" @click="close"></div>
    <div class="previewWrap centerEle">
      <div class="previewbox">
        <img class="imgItem" :src="curPreview" />
      </div>
      <div class="step_next" @click="stepNext">
        <img class="BtnPic" :src="stepnext" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import previewconfig from "../assets/preview.json";
import stepnext from "../../static/img/preview/stepnext.png";

export default {
  name: "preview",
  props: ["data"],
  data() {
    return {
      curPreview: "",
      stepnext
    }
  },
  methods: {
    stepNext: function () {
      window.location.replace("levelBlockly.html?" + this.data + "&guide=true");
    },
    close: function () {
      this.$emit("close")
    }
  },
  created: function () {
    this.curPreview = previewconfig[this.data].preview_lgpic;
  },
  mounted: function () {
    var dpr = window.devicePixelRatio || 1;
    document.documentElement.style.fontSize = document.documentElement.clientHeight * dpr / 750 * 100 + 'px';

  }
}
</script>

<style scoped>
  #preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
  }

  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  .previewWrap {
    width: auto;
    height: 65%;
  }

  .previewbox {
    width: auto;
    height: 100%;
  }

  .step_next {
    position: absolute;
    bottom: 0;
    right: -0.45rem;
    width: 0.45rem;
    height: auto;
    overflow: hidden;
  }

  .imgItem {
    display: block;
    height: 100%;
    width: auto;
  }

  .BtnPic {
    display: block;
    width: 100%;
    height: auto;
  }
</style>

