<template>
  <div id="levelGuide" v-show="isShow">
    <div class="mask" @click="closeGuide"></div>
    <div class="contentWrap centerEle">
      <div class="box" :style="{background: 'url(' + bg + ') no-repeat', backgroundSize: '100% 100%'}">
        <div class="animationContent" :style="{width: boxWidth + 'px', height: boxHeight + 'px'}" v-show="animationOrBlock == 'animation'">
          <img class="animation_item" :src="animationImgSrc[curAnimationIndex]" @load="ImgLoad(animationImgSrc[curAnimationIndex])" />
          <ul class="index_bot">
            <li :class="[index == curAnimationIndex ? 'IndexActive' : 'IndexunActive']" v-for="(item, index) in animationImgSrc" :key="index"></li>
          </ul>
          <div class="preBtn" v-show="curAnimationIndex !== 0" @click="pre"><img class="arrow centerEle" :src="preBtn" /></div>
          <div class="nextBtn" v-show="curAnimationIndex !== animationImgSrc.length - 1" @click="next"><img class="arrow centerEle" :src="nextBtn" /></div>
        </div>
        <div class="blockContent" :style="{width: boxWidth + 'px', height: boxHeight + 'px'}" v-show="animationOrBlock == 'block'">
          <img class="block_item" :src="blockImgSrc">
        </div>
      </div>
      <div :class="['animationBtn', animationOrBlock == 'animation' ? 'active' : 'unactive']" @click="toggleAnimation">
        <img class="leftBtnImg centerEle" :src="animationBtn" />
      </div>  
      <div :class="['blockBtn', animationOrBlock == 'block' ? 'active' : 'unactive']" @click="toggleBlock">
        <img class="leftBtnImg centerEle" :src="blockGuideBtn" />  
      </div>
      <div class="closeBtn" @click="closeGuide">
        <img class="closeImg centerEle" :src="closeBtn" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import levelGuide from "../assets/levelGuide.json";
import animationBtn from "../../static/img/level/animation_btn.png";
import blockGuideBtn from "../../static/img/level/blockGuide_btn.png";
import closeBtn from "../../static/img/level/close.png";
import nextBtn from "../../static/img/level/next_btn.png";
import preBtn from "../../static/img/level/pre_btn.png";
import bg from "../../static/img/level/guide_bg.png";


export default {
  name: "levelGuide",
  props: ["curlevel"],
  data() {
    return {
      sWidth: "",
      sHeight: "",
      boxWidth: "",
      boxHeight: "",
      animationImgSrc: "",
      blockImgSrc: "",
      curAnimationIndex: 0,
      levelGuide: "",
      animationOrBlock: "animation",
      animationBtn, blockGuideBtn, closeBtn, bg, nextBtn, preBtn,
      isShow: false
    }
  },
  methods: {
    ImgLoad: function (src) {
      var Img = new Image();
      Img.src = src;
      var ImgWidth = Img.width;
      var ImgHeight = Img.height;
      var ratio = ImgWidth / ImgHeight;
      this.boxHeight = this.sHeight * 0.65;
      this.boxWidth = ratio * this.boxHeight;
      this.isShow = true;
    },
    toggleAnimation: function () {
      this.animationOrBlock = "animation";
    },
    toggleBlock: function () {
      this.animationOrBlock = "block";
    },
    pre: function () {
      this.curAnimationIndex = --this.curAnimationIndex;
    },
    next: function () {
      this.curAnimationIndex = ++this.curAnimationIndex
    },
    closeGuide: function () {
      this.$emit("closeGuide");
    }
  },
  mounted: function () {
    this.levelGuide = levelGuide[this.curlevel];
    this.animationImgSrc = this.levelGuide.GuideAnimation;
    this.blockImgSrc = this.levelGuide["block_" + this.curLanguage];
    this.sWidth = document.documentElement.clientWidth;
    this.sHeight = document.documentElement.clientHeight;
  },
  computed: {
    ...mapGetters("aieggy", {
      curLanguage: "getLanguage"
    })
  }
}
</script>

<style scoped>
#levelGuide {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 101;
}

.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.box {
  padding: 0.25em 0.4em;
  box-sizing: border-box;
}

.animationContent {
  position: relative;
}

.animation_item {
  display: block;
  width: 100%;
  height: 100%
}

.blockContent {
  overflow-y: scroll;
}

.block_item {
  display: block;
  width: 100%;
  height: auto;
}

.animationBtn, .blockBtn {
  position: absolute;
  width: 0.5em;
  height: 0.6em;
  left: -0.5em;
  border-top-left-radius: 0.1em;
  border-bottom-left-radius: 0.1em;
  box-sizing: border-box;
}

.active {
  background: rgb(48, 185, 186);
  border-left: 2px solid rgb(76, 232, 222);
  border-top: 2px solid rgb(76, 232, 222);
  border-bottom: 2px solid rgb(76, 232, 222);
}

.unactive {
  background: rgb(191, 185, 185);
  border-left: 2px solid rgb(204, 204, 204);
  border-top: 2px solid rgb(204, 204, 204);
  border-bottom: 2px solid rgb(204, 204, 204);
}

.animationBtn {
  top: 0;
}

.blockBtn {
  top: 0.7em;
}

.leftBtnImg {
  display: block;
  width: 60%;
  height: auto;
}

.closeBtn {
  position: absolute;
  top: 0.08em;
  right: 0.08em;
  width: 0.26em;
  height: 0.26em;
}

.closeImg {
  display: block;
  width: 100%;
  height: 100%;
}

.index_bot {
  position: absolute;
  width: 25%;
  height: 10px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 0.03em;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
}

.index_bot li {
  flex-shrink: 1;
  width: 5px;
  height: 5px;
  border-radius: 5px;
}

.IndexActive {
  background: rgb(0, 143, 193);
}

.IndexunActive {
  background: rgb(172, 172, 172);
}

.preBtn, .nextBtn {
  position: absolute;
  width: 0.24em;
  height: auto;
}

.preBtn {
  top: 50%;
  left: -0.3em;
  transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  border-top-left-radius: 0.08em;
  border-bottom-left-radius: 0.08em;
}

.nextBtn {
  top: 50%;
  right: -0.3em;
  transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  border-top-right-radius: 0.08em;
  border-bottom-right-radius: 0.08em;
}

.arrow {
  display: block;
  width: 100%;
  height: auto;
}

</style>


