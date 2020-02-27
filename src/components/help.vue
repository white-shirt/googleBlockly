<template>
  <div id="help">
    <div class="contentwrap">
      <div class="back" @click="close"><img :src="closePic"></div>
      <div class="content">
        <div class="tabwrap">
          <div class="tabcontent">
            <banner :curTab="curTab"></banner>
          </div>  
          <div class="tablist">
            <ul class="tablistul">
              <li :class="['tabitem', curTab == 'Introduction' ? 'active' : 'unactive']" @click="tabtoggle('Introduction')"><span>Introduction</span></li>
              <li :class="['tabitem', curTab == 'Block' ? 'active' : 'unactive']" @click="tabtoggle('Block')"><span>Block</span></li>
              <li :class="['tabitem', curTab == 'About' ? 'active' : 'unactive']" @click="tabtoggle('About')"><span>About App</span></li>
            </ul>  
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import closePic from "../../static/img/help/close.png";
import banner from "components/banner.vue";

export default {
  name: "help",
  data() {
    return {
      closePic,
      curTab: "Introduction",
      banner
    }
  },
  components: { banner },
  methods: {
    close: function () {
      this.$emit("exit", "help");
    },
    tabtoggle: function (msg) {
      this.curTab = msg;  
    }
  }
}
</script>

<style scoped>
#help {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  overflow: hidden;
  z-index: 100;
}

img {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.back {
  position: absolute;
  width: 0.4em;
  height: 0.4em;
  top: 0.4em;
  left: 0.4em;
  z-index: 2;
}

.contentwrap {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.6em 0.6em;
  box-sizing: border-box;
  z-index: 1;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.2em;
  background: #00C1BA;
  overflow: hidden;
}

.tabwrap {
  display: flex;
  flex-direction: column;
  display: -webkit-flex;
  -webkit-flex-direction: column;
  width: 100%;
  height: 100%;
}

.tabcontent {
  flex: 1;
  -webkit-flex: 1;
  width: 100%;
  height: 0;
}

.tablist {
  width: 100%;
  height: 0.6em;
  background: #555;
}

.tablistul {
  display: flex;
  flex-direction: row;
  display: -webkit-flex;
  -webkit-flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.tabitem {
  flex: 1;
  height: 100%;
  position: relative;
}

.tabitem span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  font-size: 0.2em;
  color: #fff;
}

.active {
  background: #00C1BA;
}

.unactive {
  background: #00A49E;
}




</style>
