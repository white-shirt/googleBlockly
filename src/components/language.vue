<template>
  <div id="language" :style="{ fontSize: fontSize + 'px', width: 0.48 * fontSize + 'px', height: 0.48 * fontSize + 'px' }">
    <div class="setIcon" @click="toggleMenu">
      <img :src="setIcon" />
    </div>
    <div class="langBox" v-if="drapdown">
      <span ref="English" :class="['langItem', currentLanguage == 'English' ? 'active' : '']" data-id="English" @click="changeLanguage">English</span>
      <span ref="Russian" :class="['langItem', currentLanguage == 'Russian' ? 'active' : '']" data-id="Russian" @click="changeLanguage">Pусский</span>
      <span ref="CN" :class="['langItem', currentLanguage == 'CN' ? 'active' : '']" data-id="CN" @click="changeLanguage">中文</span>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';

import setIcon from "../../static/img/system/language_set.png";

export default {
  name: "language",
  data() {
    return {
      setIcon,
      drapdown: false,
      currentLanguage: "English",
      fontSize: ""
    }
  },
  methods: {
    toggleMenu() {
      this.drapdown = !this.drapdown;
    },
    changeLanguage(e) {
      console.log(e.target.dataset.id);
      this.currentLanguage = e.target.dataset.id;
      window.localStorage.setItem("language", this.currentLanguage);
      this.$store.dispatch("aieggy/invokeLanguage", this.currentLanguage);
    }
  },
  created() {
    this.fontSize = document.documentElement.clientWidth / 750 * 100;
    console.log(this.fontSize);
  },
  mounted() {
    if (window.localStorage.getItem("language")) this.currentLanguage = window.localStorage.getItem("language");
    else this.currentLanguage = "English";
  }
}
</script>

<style scoped>
#language {
  
}

.setIcon {
  width: 100%;
  height: 100%;
}

.setIcon img {
  display: block;
  width: 100%;
  height: 100%;
} 

.langBox {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  top: 0.6em;
  right: 50%;
  transform: translateX(50%);
}

.langBox::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 0.1em solid;
  border-bottom-color: rgb(76, 232, 222);
  border-top-color: rgba(76, 232, 222, 0);
  border-left-color: rgba(76, 232, 222, 0);
  border-right-color: rgba(76, 232, 222, 0);
  top: -0.2em;
}

.langItem {
  position: relative;
  display: inline-block;
  font-size: 0.15em;
  font-weight: bolder;
  color: #fff;
  width: 7em;
  padding: 0.5em 1em;
  text-align: left;
  text-overflow: ellipsis;
  background: rgb(255, 206, 0);
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
}

.langItem:first-child {
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  border-top-width: 0px;
}

.langItem:last-child {
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  border-bottom-width: 0px;
}

.active {
  background: rgb(255, 170, 0);
}

.active::before {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.5em;
  height: 0.5em;
  top: 50%;
  transform: translate(-0.6em, -50%);
  border-radius: 50%;
  background: #fff;
}

</style>


