<template>
  <div id="levelBlockly">
    <levelnotice v-if="noticeShow" v-on:onclose="noticeClose" :style="{ fontSize: fontSize }" :noticeDataObj="noticeDataObj"></levelnotice>
    <levelGuide v-if="guideStatus" v-on:closeGuide="closeGuide" :curlevel="curlevel" :style="{ fontSize: fontSize }"></levelGuide>
    <div class="levelblockly" :style="{ fontSize: fontSize }">
      <div class="navhead">
        <navhead :backurl="'level.html'" v-on:openGuide="openGuide"></navhead>
      </div>
      <div class="content">
        <div class="defaultVm" :style="{ fontSize: fontSize }">
          <div class="vmbox">
            <vm :receivedCode="receivedCode" :createorlevel="createorlevel"></vm>
          </div>
        </div>
        <div class="contentWrap">
          <div class="category" :style="{ fontSize: fontSize }">
            <category v-on:onXml="changeBlockXml" :createorlevel="createorlevel" :curlevel="curlevel" :trashStatus="trashStatus"></category>
          </div>
          <div class="workspacecontent" v-if="blockxml !== ''">
            <workspace :createorlevel="createorlevel" :blockxml="blockxml" :workspacexml="workspacexml" v-on:ontrashStatus="ontrashStatus" v-on:onCode="recCode"></workspace>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import categoryconfig from "../../assets/category.json";
import navhead from "components/navhead.vue";
import category from "components/category.vue";
import vm from "components/vm.vue";
import workspace from "components/workspace.vue";
import levelnotice from "components/levelnotice.vue";
import levelGuide from "components/levelGuide.vue";

export default {
  name: "levelBlockly",
  data() {
    return {
      categoryconfig: categoryconfig.level,
      fontSize: "",
      receivedCode: "",
      createorlevel: "level",
      blockxml: "",
      curlevel: "",
      noticeShow: false,
      guideStatus: false,
      trashStatus: false,
      noticeDataObj: { "status": "", "data": "" },
      workspacexml: '<xml><block id="hat" type="iconblockly_hat" x="20" y="20" deletable="false"></block></xml>'
    }
  },
  components: { navhead, category, vm, workspace, levelnotice, levelGuide },
  methods: {
    changeBlockXml: function (data) {
      this.blockxml = data;
    },
    recCode: function(code) {
      this.receivedCode = code;
    },
    ArrayIsEqual: function (arr1, arr2) {
      if (arr1 == arr2) {
        return true;
      } else {
        if (arr1.length !== arr2.length) {
          return false;
        } else {
          for (var i in arr1) {
            if (arr1[i] !== arr2[i]) {
              return false;
            }
          }
          return true;
        }
      }
    },
    noticeData: function (statusVal, dataVal) {
      this.noticeDataObj.status = statusVal;
      this.noticeDataObj.data = dataVal;
      this.noticeShow = true;
    },
    noticeClose: function () {
      this.noticeShow = false;
    },
    openGuide: function () {
      this.guideStatus = true;
    },
    closeGuide: function () {
      this.guideStatus = false;
    },
    ontrashStatus: function (res) {
      this.trashStatus = res;
    }
  },
  created: function () {
    var searchUrl = window.location.search;
        searchUrl = searchUrl.substr(1);
        searchUrl = searchUrl.split("&");
    if (searchUrl.indexOf("guide=true") !== -1) this.guideStatus = true;
    this.curlevel = searchUrl[0];
    this.$store.dispatch("aieggy/invokeCurLevel", this.curlevel);
  },
  mounted: function () {
    this.fontSize = document.documentElement.clientWidth / 750 * 100 + "px";
  },
  computed: {
    ...mapGetters("aieggy", {
      levelstatus: "getlevelconfig"
    }),
    ...mapGetters("aieggy", {
      UserBlocks: "getUserBlocks"
    }),
    ...mapGetters("aieggy", {
      Order: "getOrder"
    }),
    ...mapGetters("aieggy", {
      BleConnectStatus: "getBleConnectStatus"
    })
  },
  watch: {
    Order: {
      handler(val) {
        if (this.BleConnectStatus) {
          var levelNameArr = [];
          var OrderLength = val.length;
          var UserBlocks = this.UserBlocks;
          for (var key in this.categoryconfig) {
            levelNameArr.push(key);
          }
          var verifyBlocks = this.categoryconfig[this.curlevel].verify.blocks;
          var verifyOrderLength = this.categoryconfig[this.curlevel].verify.orderLength;
          if (this.ArrayIsEqual(UserBlocks, verifyBlocks) && OrderLength == verifyOrderLength) {
            var nextlevel;
            var curlevelIndex = levelNameArr.indexOf(this.curlevel);
            var nextlevelIndex = curlevelIndex + 1;
            nextlevelIndex > levelNameArr.length - 1 ? nextlevelIndex = levelNameArr.length - 1 : nextlevelIndex = nextlevelIndex;
            nextlevel = levelNameArr[nextlevelIndex];
            this.levelstatus[nextlevel].status = "unlock";
            window.localStorage.setItem("AIeggy_levelStatus", JSON.stringify(this.levelstatus));
            this.noticeData("levelSuccess", { "curlevel": this.curlevel, "nextlevel": nextlevel });
            this.$store.commit("aieggy/VerifyResult", "success");
          } else {
            this.noticeData("levelFail", "")
            this.$store.commit("aieggy/VerifyResult", "fail");
          }
        } else {
          this.noticeData("BleDisconnect", "")
        }

      },
      deep: true
    }
  }
}
</script>

<style scoped>
  #levelBlockly {
    width: 100%;
    height: 100%;
  }

  .levelblockly {
    position: relative;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .navhead {
    flex-shrink: 0;
    width: 100%;
    height: 0.6em;
    z-index: 100;
  }

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
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

  .contentWrap {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;;
  }

  .category {
    flex-shrink: 0;
    width: auto;
    height: 100%;
    box-sizing: border-box;
    z-index: 80;
  }

  .workspacecontent {
    width: 100%;
    height: 100%;
  }

</style>


