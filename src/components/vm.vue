<template>
  <div id="vm">
    <canvasbackground class="bg" :VmWidth="VmWidth" :MapPicData="vmMapData"></canvasbackground>
    <!--<canvasLine v-on:warn="onwarn" :VmWidth="VmWidth" :lineCode="lineCode"></canvasLine>-->
    <canvasLine v-on:warn="onwarn" :VmWidth="VmWidth"></canvasLine>
    <vmbtn></vmbtn>
  </div>
</template>

<script>

import {mapState,mapGetters,mapActions} from 'vuex';
import canvasbackground from "components/drawbackground.vue";
import canvasLine from "components/drawLine.vue";
import npc from "components/npc.vue";
import vmbtn from "components/vmbtn.vue";

export default {
  name: "vm",
  props: ["receivedCode"],
  data() {
    return {
      npcMsg: "",
      VmWidth: "",
      lineCode: ""
    };
  },
  components: { canvasbackground, canvasLine, npc, vmbtn },
  methods: {
    init: function() {
      var _this = this;

    },
    onwarn: function(msg) {
      var _this = this;
      _this.npcMsg = msg;
    }
  },
  created: function() {
    var _this = this;
  },
  mounted: function() {
    var _this = this;
    _this.init();
    _this.VmWidth = $("#vm").width();
  },
  computed: {
    ...mapGetters("vmmapdata", {
      vmMapData: "getVmMapData"
    })
  },
  watch: {
    receivedCode: {
      handler(val, oldVal) {
        var _this = this;
        if (val) {
          var line = [];
          var aieggy = [];
          val = val.replace(/ /g, "");
          val = val.replace(/}{/g, "}&{");
          val = val.split("&");
          val.forEach(function(item) {
            var item = JSON.parse(item);
            if (item.type == "line") line.push(item);
            if (item.type == "aieggy") aieggy.push(item);
          });
          _this.lineCode = line;
          if (aieggy.length < 150) {
            _this.$store.dispatch("aieggy/invokeOrder", aieggy);
          } else {
            window.plugins.toast.showLongTop("Too many commands");
          }
        } else {
          _this.$store.dispatch("aieggy/invokeOrder", [])
        }
      },
      deep: true
    }
  }
};
</script>


<style scoped>
#vm {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bg {
  background: rgb(209, 209, 209);
}

.npcbox {
  position: absolute;
  width: 100%;
  height: 40px;
  margin-top: 5px;
  overflow: hidden;
}
</style>

