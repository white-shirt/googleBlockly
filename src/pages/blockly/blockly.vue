<template>
  <div id="app">
    <notice v-if="noticeShow" v-on:onclose="noticeClose" :style="{fontSize: fontSize}" :noticeDataObj="noticeDataObj"></notice>
    <div class="navhead" :style="{ fontSize: fontSize }">
      <navhead v-on:Save="onSave"></navhead>
    </div>
    <div class="content">
      <div class="defaultVm" :style="{ fontSize: fontSize }">
        <div class="vmbox">
          <vm :receivedCode="receivedCode"></vm>
        </div>
      </div>
      <div class="category" :style="{ fontSize: fontSize }">
        <category v-on:onXml="changeBlockXml" :createorlevel="createorlevel" :trashStatus="trashStatus"></category>  
      </div>
      <workspace class="workspacebox" :createorlevel="createorlevel" :blockxml="blockxml" :workspacexml="workspacexml" v-on:ontrashStatus="ontrashStatus" v-on:onCode="recCode"></workspace>  
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import $ from "jquery";
import navhead from "components/navhead.vue";
import category from "components/category.vue";
import workspace from "components/workspace.vue";
import vmmaplist from "components/vmmaplist.vue";
import notice from "components/levelnotice.vue";
import vm from "components/vm.vue";

export default {
  name: "app",
  data() {
    return {
      noticeShow: false,
      noticeDataObj: { "status": "BleDisconnect", "data": "" },
      blockxml: null,
      workspacexml: `<xml><block id="hat" type="iconblockly_hat" x="20" y="20" deletable="false"></block></xml>`,
      fontSize: "",
      receivedCode: "",
      helpStatus: false,
      createorlevel: "create",
      trashStatus: false
    };
  },
  components: { navhead, workspace, vmmaplist, category, vm, notice },
  methods: {
    changeBlockXml: function(data) {
      this.blockxml = data;
    },
    recCode: function(code) {
      this.receivedCode = code;
      if (this.BleStatus == false) {
        this.noticeShow = true;
      }
    },
    exit: function (msg) {
      switch (msg) {
      }
    },
    ontrashStatus: function (res) {
      this.trashStatus = res;
    },
    noticeClose: function () {
      this.noticeShow = false;
    },
    onSave: function () {
      this.workspacexml = `<xml><block id="hat" type="iconblockly_hat" x="30" y="30" deletable="false"></block></xml>`;
    }
  },
  created() {
    this.blockxml = this.defaultBlockxml;
  },
  mounted: function() {
    this.fontSize = document.documentElement.clientWidth / 750 * 100 + 'px';
  },
  computed: {
    ...mapGetters("defaultToolbox", {
      defaultBlockxml: "getDefaultXml"
    }),
    ...mapGetters("aieggy", {
      BleStatus: "getBleConnectStatus"
    })
  }
};
</script>


<style scoped>
#app {
  font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  font-size: 0;
}

.navhead {
  width: 100%;
  height: auto;
  z-index: 100;
}

.content {
  position: absolute;
  width: 100%;
  z-index: 90;
  overflow: hidden;
}

.category {
  float: left;
  width: auto;
  height: 100%;
  box-sizing: border-box;
  z-index: 80;
}

.workspacebox {
  position: absolute;
}

.helpBox, .deviceBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.defaultVm {
  position: absolute;
  width: 2em;
  height: 100%;
  top: 0;
  right: 0;
  overflow: hidden;
  z-index: 0;
  visibility: hidden;
}

.vmbox {
  position: absolute;
  width: 90%;
  height: 95%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 10px;
}

</style>