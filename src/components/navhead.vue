<template>
  <div id="navhead">
    <div class="navIcon tohomepage"><button @click="nav('homepage.html')"><img :src="backpic"></button></div>
    <div class="rightNavBox">
      <div class="navIcon saveBtn" v-if="saveBtn" @click="save"></div>
      <div class="navIcon bleicon">
        <button>
          <blecpt></blecpt>
        </button>
      </div>
      <div class="languageBox">
        <language></language>
      </div>
      <div class="navIcon Guide" v-if="isLevel" @click="openGuide">
        <img class="guideImg" :src="guideImg" />
      </div>
      <div class="navIcon power">
        <power></power>
      </div>
      <!-- <div class="navIcon helpicon"><button @click="help"></button></div> -->
    </div>
  </div>
</template>

<script>
import blecpt from "./bluetooth.vue";
import power from "./power.vue";
import language from "components/language.vue";


import backpic from "../../static/img/system/toindex.png";
import guideImg from "../../static/img/system/guide.png";
export default {
  name: "navhead",
  props: ['backurl'],
  data() {
    return {
      backpic, guideImg,
      isLevel: false,
      saveBtn: false
    }
  },
  components: { blecpt, power, language },
  methods: {
    nav: function (url) {
      if (this.backurl) {
        window.location.replace(this.backurl);
      } else {
        window.location.replace(url);
      }
    },
    openGuide: function () {
      if (this.backurl == "level.html") {
        this.$emit("openGuide");
      }
    },
    save: function () {
      this.$emit("Save");
    }
  },
  mounted: function () {
    document.getElementById("navhead").style.fontSize = document.documentElement.clientWidth / 750 * 100 + 'px';
    console.log(window.location.pathname.substr(1))
    if (this.backurl == "level.html") this.isLevel = true;
    if (window.location.pathname.substr(1) !== "blockly.html") this.saveBtn = false;
  }
}
</script>

<style scoped>
#navhead {
  position: relative;
  width: 100%;
  height: 0.6em;
  background: rgb(0, 104, 124);
}

.navIcon {
  position: relative;
  width: 0.48em;
  height: 0.48em;
}

.navIcon img {
  display: block;
  width: 100%;
}

button {
  position: absolute;
  width: 100%;
  height: 100%;
}

.tohomepage {
  top: 50%;
  left: 0.3em;
  transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
}

.rightNavBox {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: auto;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
}

.saveBtn {
  background: #eee;
}

.bleicon {
  margin: 0 0.05em;
}

.languageBox {
  position: relative;
  width: auto;  
  height: auto;
  margin: 0 0.05em;
  z-index: 111;
}

.Guide {
  margin: 0 0.05em;
}

.power {
  margin: 0 0.05em;
}

</style>


