<template>
  <div id="cptbanner">
    <div class="arrow left" @touchstart="pre"><span>&lt;</span></div>  
    <div class="banner">
      <div class="banneritem" v-if="curTab == key" v-for="(item, key) in bannerconfig" :key="key">
        <div class="imgwrap">
          <div class="curImg">
            <img :class="[ widthmax ? 'widthMax' : 'heightMax']" :src="item[curIndex - 1]" @load="imginfo(item[curIndex - 1])">
          </div>
        </div>
      </div>
    </div>
    <div class="arrow right" @touchstart="next"><span>&gt;</span></div>
  </div>
</template>

<script>
import bannerconfig from "../assets/banner.json";

export default {
  name: "cptbanner",
  props: ['curTab'],
  data() {
    return {
      bannerconfig: bannerconfig,
      imgratio: "",
      widthmax: true,
      bannerLength: "",
      curIndex: 1
    }
  },
  methods: {
    imginfo: function (img) {
      var Img = new Image();
      Img.src = img;
      var imgwidth = Img.width;
      var imgheight = Img.height;
      var ratio = imgwidth / imgheight;
      if (ratio < this.imgratio) this.widthmax = false;
      else this.widthmax = true;
    },
    pre: function () {
      --this.curIndex
      if (this.curIndex < 1) this.curIndex = this.bannerLength;
    },
    next: function () {
      ++this.curIndex;
      if (this.curIndex > this.bannerLength) this.curIndex = 1;
    }
  },
  mounted: function () {
    var imgwrap = document.getElementsByClassName('imgwrap')[0];
    this.imgratio = imgwrap.offsetWidth / imgwrap.offsetHeight;
    this.bannerLength = this.bannerconfig[this.curTab].length;
  },
  watch: {
    curTab: {
      handler(val) {
        this.curIndex = 1;
        this.bannerLength = this.bannerconfig[val].length;
      }
    }
  }
}
</script>

<style scoped>
#cptbanner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  display: -webkit-flex;
  -webkit-flex-direction: row;
}

.arrow {
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  height: 100%;
  width: 0.6em;
  position: relative;
}

.arrow span {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  display: inline-block;
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 0.4em;
  color: #fff;
}

.banner {
  flex: 1;
  -webkit-flex: 1;
  height: 100%;
  width: 0;
  overflow: hidden;
}

.banneritem {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.imgwrap {
  width: 100%;
  height: 100%;
  padding: 0.1em;
  box-sizing: border-box;
  overflow: hidden;
}

.curImg {
  position: relative;
  width: 100%;
  height: 100%;
}

.curImg img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.widthMax {
  width: 100%;
}

.heightMax {
  height: 100%;
}


</style>

