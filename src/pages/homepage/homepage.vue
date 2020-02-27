<template>
  <div id="homepage" :style="{ background: 'url(' + bg + ') no-repeat', backgroundSize: 'cover' }">
    <div class="BleBox" v-if="false">
      <Ble></Ble>
    </div>
    <div class="languageBox">
      <language></language>
    </div>
    <div class="navboxwrap">
      <div class="navbox levelbox" @click="nav('level.html')">
        <div class="levelBg">
          <img :src="levelBg">
          <div class="levelitem1">
            <img :src="levelbgitem1">
          </div>
          <div :class="['levelitem2', timeoutmove ? '' : '']">
            <img :src="levelbgitem2">
          </div>
          <div class="boxtitle">
            <span>{{languageConfig[curLanguage]["card_title_guide"]}}</span>  
          </div>
        </div>
      </div>
      <div class="navbox createbox" @click="nav('blockly.html')">
        <div class="createBg">
          <img :src="createBg">
          <div class="createitem1">
            <img :src="createbgitem1">
          </div>
          <div class="createitem2">
            <img :src="createbgitem2">
          </div>
          <div :class="['createitem3', timeoutmove ? 'timeoutcreatemove' : '']">
            <img :src="createbgitem3">
          </div>
          <div class="boxtitle">
            <span>{{languageConfig[curLanguage]["card_title_explore"]}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Ble from "components/bluetooth.vue";
import language from "components/language.vue";
import languageConfig from "../../assets/language.json";

import createBg from "../../../static/img/homepage/create_bg.png";
import levelBg from "../../../static/img/homepage/level_bg.png";
import createbgitem1 from "../../../static/img/homepage/createbg_item1.png";
import createbgitem2 from "../../../static/img/homepage/createbg_item2.png";
import createbgitem3 from "../../../static/img/homepage/createbg_item3.png";
import levelbgitem1 from "../../../static/img/homepage/levelbg_item1.png";
import levelbgitem2 from "../../../static/img/homepage/levelbg_item2.png";
import bg from "../../../static/img/homepage/bg.jpg";

export default {
  name: "homepage",
  data() {
    return {
      createBg,
      levelBg,
      createbgitem1,
      createbgitem2,
      createbgitem3,
      levelbgitem1,
      levelbgitem2,
      bg,
      timeoutmove: false,
      languageConfig
    };
  },
  components: { Ble, language },
  methods: {
    nav: function(url) {
      window.location.replace(url);
    }
  },
  mounted() {
    var _this = this;
    setTimeout(function() {
      _this.timeoutmove = true;
    }, 100);
  },
  computed: {
    ...mapGetters("aieggy", {
      curLanguage: "getLanguage"
    })
  }
};
</script>

<style scoped>
#homepage {
  position: relative;
  width: 100%;
  height: 100%;
}

.languageBox {
  position: absolute;
  width: auto;
  height: auto;
  top: 0.1em;
  right: 0.4em;
  z-index: 111;
}

.navboxwrap {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.navbox {
  width: 2.2rem;
  height: auto;
  font-size: 0;
}

.navbox img {
  width: 100%;
  height: auto;
}

.levelBg,
.createBg {
  position: relative;
  width: 100%;
  height: 100%;
}

.levelitem1 {
  position: absolute;
  bottom: 0.8rem;
  right: 0.35rem;
  width: 45%;
}

.levelitem2 {
  position: absolute;
  width: 45%;
  bottom: 1.28rem;
  left: 0.35rem;
  -webkit-transform: rotate(1deg);
  transform: rotate(1deg);
  -webkit-transform-origin: 65% 100%;
  transform-origin: 65% 100%;
}

.timeoutlevelmove {
  animation: linear levelmove 2s infinite;
  -webkit-animation: linear levelmove 2s infinite;
}

@keyframes levelmove {
  0% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
  }
  25% {
    transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
  }
  50% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
  }
  75% {
    transform: rotate(-20deg);
    -webkit-transform: rotate(-20deg);
  }
  100% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
  }
}

@-webkit-keyframes levelmove {
  0% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
  }
  25% {
    transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
  }
  50% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
  }
  75% {
    transform: rotate(-20deg);
    -webkit-transform: rotate(-20deg);
  }
  100% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
  }
}

.createitem1 {
  position: absolute;
  width: 45%;
  bottom: 0.7rem;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

.createitem2,
.createitem3 {
  position: absolute;
}

.createitem2 {
  width: 45%;
  top: 0.2rem;
  left: 0.2rem;
}

.createitem3 {
  width: 60%;
  left: 0.2rem;
  top: 0.85rem;
}

.timeoutcreatemove {
  -webkit-animation: ease-in-out createmove 1.5s infinite;
  animation: ease-in-out createmove 1.5s infinite;
}

@keyframes createmove {
  0% {
    top: 0.85rem;
  }
  100% {
    top: 0.65rem;
  }
}

@-webkit-keyframes createmove {
  0% {
    top: 0.85rem;
  }
  100% {
    top: 0.65rem;
  }
}

.boxtitle {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 0.2rem;
  width: 100%;
  height: 0.5rem;
  bottom: 0.1rem;
  padding: 0 0.3rem;
  left: 0;
  box-sizing: border-box;
}

.boxtitle span {
  word-break: break-all;
}

.createBg .boxtitle {
  color: #ffaa00;
}

.levelBg .boxtitle {
  color: #7335af;
}

.BleBox {
  position: fixed;
  width: 0.48rem;
  height: 0.48rem;
  top: 0.15rem;
  right: 0.15rem;
}
</style>


