<template>
  <div id="level" :style="{ background: 'url(' + bg + ') no-repeat', backgroundSize: 'cover' }">
    <div class="previewCpt" v-if="isShow">
      <component :is="curComponent" v-on:close="previewClose" :data="preview"></component>
    </div>
    <div class="content" :style="{ fontSize: fontSize }">
      <div class="navhead">
        <navhead></navhead>
      </div>
      <div class="levellistcontent">
        <div class="contentWrap">
          <ul class="listul">
            <li class="listbox" v-for="(item, index) in levellist" :key="index">
              <div class="listcontent centerEle" @click="levelblockly(item.level, levelStatus[item.level].status)">
                <div class="mask" v-if="levelStatus[item.level].status == 'lock'">
                  <img class="lock centerEle" :src="level_lock" />
                </div>
                <div class="previewSm">
                  <img class="pre_sm_pic" :src="item.preview_smpic" />
                </div>
                <div class="previewTitle">
                  <span class="text centerEle">{{languageConfig[curLanguage][item.language_flag]}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import languageConfig from "../../assets/language.json";

import $ from "jquery";
import level_lock from "../../../static/img/level/level_lock.png";
import bg from "../../../static/img/homepage/bg.jpg";
import categoryconfig from "../../assets/category.json";
import navhead from "components/navhead.vue";

export default {
  name: "level",
  data() {
    return {
      isShow: false,
      curComponent: "",
      levellist: categoryconfig.level,
      categoryconfig: "",
      fontSize: "",
      createorlevel: "level",
      level_lock, bg,
      preview: "",
      levelStatus: "",
      languageConfig
    };
  },
  components: { navhead,
    preview: function (resolve) {
      require(["../../components/preview.vue"], resolve)
    }
  },
  methods: {
    previewClose: function () {
      this.isShow = false;
    },
    //进入闯关预览大图
    levelblockly: function (data, status) {
      if (status == "unlock") {
        this.preview = data;
        this.curComponent = "preview";
        this.isShow = true;
      }
    }
  },
  created: function () {
    this.levelStatus = this.levelconfig;
  },
  mounted: function() {
    this.fontSize = document.documentElement.clientWidth / 750 * 100 + "px";
    var searchUrl = window.location.search;
    if (searchUrl !== "") {
      searchUrl = searchUrl.substr(1);
      this.levelblockly(searchUrl, "unlock");
    }
  },
  computed: {
    ...mapGetters("aieggy", {
      levelconfig: "getlevelconfig"
    }),
    ...mapGetters("aieggy", {
      curLanguage: "getLanguage"
    })
  }
};
</script>

<style scoped>
#level {
  font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
}

.previewCpt {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
}

.content {
  position: relative;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.navhead {
  flex-shrink: 0;
  width: 100%;
  height: 0.6em;
  z-index: 100;
}

.levellistcontent {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.contentWrap {
  width: 100%;
  height: 100%;
}

.listul {
  width: 100%;
  height: 100%;
  font-size: 0;
}

.listbox {
  position: relative;
  display: inline-block;
  width: 33.33vw;
  height: 33.33vw;
}

.listcontent {
  width: 20vw;
  height: 26vw;
  border-radius: 15px;
  border: 3px solid #fff;
  overflow: hidden;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 21;
}

.previewSm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20vw;
  overflow: hidden;
  z-index: 20;
}

.pre_sm_pic {
  display: block;
  width: 100%;
  height: 100%;
}

.lock {
  display: inline-block;
  width: 30%;
  height: auto;
  z-index: 22;
}

.previewTitle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6vw;
  padding: 0 10px;
  box-sizing: border-box;
  background: rgb(0, 104, 124);
  z-index: 20;
}

.previewTitle .text {
  display: inline-block;
  width: 100%;
  height: auto;
  font-size: 15px;
  text-align: center;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  overflow: hidden;
  color: #fff;
}
</style>


