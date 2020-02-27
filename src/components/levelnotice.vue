<template>
  <div id="levelnotice">
    <div class="mask" @click="close"></div>
    <div class="levelcomplete centerEle" v-if="noticeDataObj.status !== 'BleDisconnect'">
      <div class="headbox">
        <img class="headImg" :src="winpic" v-if="noticeDataObj.status == 'levelSuccess'">
        <img class="headImg" :src="failpic" v-if="noticeDataObj.status == 'levelFail'">
      </div>
      <div class="Btnbox">
        <div class="Btn" @click="exit">
          <img class="BtnImg" :src="exitPic" />
        </div>
        <div class="Btn" @click="repeat">
          <img class="BtnImg" :src="repeatPic" />
        </div>
        <div class="Btn" @click="next" v-if="noticeDataObj.status == 'levelSuccess' && this.noticeDataObj.data.curlevel !== this.noticeDataObj.data.nextlevel">
          <img class="BtnImg" :src="nextPic" />
        </div>
      </div>
    </div>
    <div class="BleDisconnect centerEle" v-if="noticeDataObj.status == 'BleDisconnect'">
      <span class="text">{{languageConfig[curLanguage]["notice_Msg"]}}</span>
      <div class="toBle">
        <bluetooth></bluetooth>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import languageConfig from "../assets/language.json";

import exitPic from "../../static/img/level/exit.png";
import repeatPic from "../../static/img/level/repeat.png";
import nextPic from "../../static/img/level/next.png";
import winpic from "../../static/img/level/win.png";
import failpic from "../../static/img/level/fail.png";
import bluetooth from "components/bluetooth.vue";

export default {
  name: "levelcomplete",
  props: ["noticeDataObj"],
  data() {
    return {
      exitPic,
      repeatPic,
      nextPic,
      winpic,
      failpic,
      languageConfig
    }
  },
  components: { bluetooth },
  methods: {
    exit: function () {
      window.location.replace('level.html');
    },
    repeat: function () {
      this.$emit("onclose");
    },
    next: function () {
      if (this.noticeDataObj.data.curlevel !== this.noticeDataObj.data.nextlevel) {
        // window.location.replace("levelBlockly.html?" + this.noticeDataObj.data.nextlevel + "&guide=true");
        window.location.replace("level.html?" + this.noticeDataObj.data.nextlevel);
      }
    },
    close: function () {
      this.$emit("onclose");
    }
  },
  mounted: function () {
    // console.log(this.noticeDataObj.data.curlevel,this.noticeDataObj.data.nextlevel)
  },
  computed: {
    ...mapGetters("aieggy", {
      curLanguage: "getLanguage"
    })
  }
}
</script>

<style scoped>
#levelnotice {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.levelcomplete {
  width: 2em;
  height: auto;
}

.headbox {
  width: 100%;
  height: auto;
  text-align: center;
}

.headImg {
  display: block;
  height: auto;
  width: 1.6em;
  margin: 0 auto;
}

.Btnbox {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  -webkit-align-items: center;
  width: 100%;
  height: 0.6em;
  background: #fff;
  border-radius: 0.15em;
  margin-top: -2px;
}

.Btn {
  width: 0.4em;
  height: 0.4em;
}

.BtnImg {
  display: block;
  width: 100%;
  height: auto;
}

.BleDisconnect {
  height: 40vh;
  width: 60vh;
  background: rgb(0, 157, 157);
  border: 3px solid #fff;
  border-radius: 0.2em;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.BleDisconnect .text {
  position: absolute;
  top: 30%;
  display: inline-block;
  width: 100%;
  font-size: 0.18em;
  text-align: center;
  font-weight: bolder;
  color: #fff;
}

.toBle {
  position: absolute;
  width: 0.4em;
  height: 0.4em;
  bottom: 0.1em;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
}


</style>

