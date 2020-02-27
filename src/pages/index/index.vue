<template>
    <div id="app" :style="{ background: 'url(' + bg + ') no-repeat', backgroundSize: 'cover' }">
      <div class="languageBox">
        <language></language>
      </div>
        <div class="searchbox">
            <div class="bg_item bgitem1"><img :src="bgItem1" /></div>
            <div class="bg_item bgitem2"><img :src="bgItem2" /></div>
            <div class="bg_item bgitem4" @click="search"><img :src="bgItem4"></div>
            <div class="eggbg"><img :src="eggbg"></div>
        </div>
    </div>
</template>

<script>
import language from "components/language.vue";

import bg from "../../../static/img/system/bg.jpg";
import eggbg from "../../../static/img/index/bg_item3.png";
import bgItem1 from "../../../static/img/index/bg_item1.png";
import bgItem2 from "../../../static/img/index/bg_item2.png";
import bgItem4 from "../../../static/img/index/bg_item4.png";

export default {
  name: "app",
  data() {
    return {
        eggbg,
        bgItem1,
        bgItem2,
        bgItem4,
        bg,
        searchflag: false,
    };
  },
  components: { language },
  methods: {
    search: function () {
        window.location.replace('ble.html');
    },
  },
  mounted () {},
  computed: {

  },
  watch: {}
};
</script>

<style scoped>
#app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.languageBox {
  position: absolute;
  width: auto;
  height: auto;
  top: 0.1em;
  right: 0.4em;
  z-index: 111;
}

.searchbox {
    position: absolute;
    width: 100%;
    height: 100%;
}

.eggbg {
    position: absolute;
    width: 1.8rem;
    height: auto;
    right: 0.9rem;
    bottom: 0.5rem;
}

.eggbg img {
    width: 100%;
}

.bg_item {
    width: 1.7rem;
    font-size: 0;
}

.bgitem2 {
    position: absolute;
    top: 50%;
    left: 1.25rem;
}

.bgitem1 {
    position: absolute;
    bottom: 50%;
    left: 1.25rem;
    transform: translate(0, 0.1rem);
}

.bgitem4 {
    position: absolute;
    width: 1.2rem;
    top: 50%;
    left: 1.5rem;
    transform: translate(0, -50%);
    -webkit-transform: translate(0, -50%);
}

.bg_item img {
    width: 100%;
}

#devicebox {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
  z-index: 110;
}

.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle1, .circle2 {
   position: absolute;
   width: 0.5rem;
   height: 0.5rem;
   border-radius: 50%;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   -webkit-transform: translate(-50%, -50%);
}

.circle1 {
    background: rgba(230, 229, 229, 0.5);
    animation: linear circle1move 2s infinite;
    -webkit-animation: linear circle1move 2s infinite;
}

.circle2 {
    background: rgba(230, 229, 229, 0.8);
    animation: linear circle2move 2s infinite;
    -webkit-animation: linear circle2move 2s infinite;
}

@keyframes circle1move {
    from { width: 0.5rem; height: 0.5rem; }
    to { width: 3.5rem; height: 3.5rem }
}

@keyframes circle2move {
    from { width: 0.5rem; height: 0.5rem; }
    to { width: 2.5rem; height: 2.5rem }
}

@-webkit-keyframes circle1move {
    from { width: 0.5rem; height: 0.5rem; }
    to { width: 3.5rem; height: 3.5rem }
}

@-webkit-keyframes circle2move {
    from { width: 0.5rem; height: 0.5rem; }
    to { width: 2.5rem; height: 2.5rem }
}


.devicebox {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 90%;
  margin-left: 10%;
  height: 3rem;
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
  width: auto;
  height: 100%;
  overflow-x: scroll;
}

.deviceul .devicelist {
  position: relative;
  flex-shrink: 0;
  width: 1.8rem;
  height: 2.6rem;
  margin: 0 0.2rem;
  border-radius: 0.1rem;
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0;
}

.deviceul .devicelist .deviceIcon {
  position: absolute;
  width: 100%;
  height: 2.2rem;
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

.deviceul .devicelist .devicename {
  position: absolute;
  bottom: -0.2rem;
  width: 200%;
  line-height: 0.8rem;
  text-align: center;
  -webkit-transform-origin: left;
  transform-origin: left;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  font-size: 0.3rem;
  background: #1293b2;
}


.searching {
  position: relative;
  display: block;
  top: 50%;
  left: 50%;
  width: 0.8rem;
  height: 0.8rem;
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
  width: 0.39rem;
  height: 0.39rem;
}

.toidxbox img, .refresh img {
  position: absolute;
  width: 100%;
}

.refresh {
  position: absolute;
  width: 0.39rem;
  height: 0.39rem;
  top: 0.19rem;
  right: 0.19rem;
}

</style>
