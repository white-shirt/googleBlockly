<template>
  <div id="category">
    <div v-if="trashStatus" class="trashMask">
      <img class="centerEle" :src="trashIcon" />
    </div>
    <ul class="cateUl">
      <li :class="['cateItem', activeCateId == item.id ? 'active' : '']" v-for="(item, index) in categoryConfig" :index="index" :key="item.id">
        <div class="mask" v-if="disable[item.id]"></div>
        <div class="cateIconwrap" :style="{ background: item.color }" @click="cateclick(item.id)">
          <img class="cateImg" :src="cateIcon.cateIcon[item.url]" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import cateIcon from "../assets/img.json";
import categoryConfig from "../assets/category.json";
import trashIcon from "../../static/img/system/trash.png";

export default {
  name: "category",
  props: ["createorlevel", "curlevel", "trashStatus"],
  data() {
    return {
      trashIcon,
      categoryConfig: "",
      xmlConfig: "",
      cateIcon: cateIcon,
      activeCateId: "",
      disable: { "direction": false, "sound": false, "light": false, "mode": false, "logic": false }
    }
  },
  methods: {
    cateclick: function(id) {
      var _this = this;
      if (this.createorlevel == "create") {
        this.activeCateId = id;
        this.xmlConfig.forEach(function (data, index) {
          if (data.id == id) _this.$emit("onXml", data.xml);
        })
      }
      if (this.createorlevel == "level") {
        _this.activeCateId = id;
        _this.$emit("onXml", this.xmlConfig[this.curlevel].xml[id]);
      }
    }
  },
  created: function () {
    var urlname = this.createorlevel;
    this.categoryConfig = categoryConfig.category;
    this.xmlConfig = categoryConfig[urlname];
    if (this.createorlevel == "create") {
      this.activeCateId = this.categoryConfig[0].id;
    }
    if (this.createorlevel == "level") {
      this.disable = this.xmlConfig[this.curlevel].categoryDisable;
      var activeCategory = this.xmlConfig[this.curlevel].activeCategory;
      this.activeCateId = this.xmlConfig[this.curlevel].activeCategory;
      this.$emit("onXml", this.xmlConfig[this.curlevel].xml[activeCategory]);
    }
  },
  mounted: function () {
    document.getElementById("category").style.fontSize = document.documentElement.clientWidth / 750 * 100 + "px";
  },
  watch: {

  }
};
</script>

<style scoped>
#category {
  position: relative;
  width: 0.7em;
  height: 100%;
  overflow: auto;
  text-align: center;
  font-size: 0;
}

.trashMask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 101;
}

.trashMask img {
  display: block;
  width: 80%;
  height: auto;
}

.cateUl {
  width: 100%;
  height: 100%;
  padding-top: 0.1em;
  box-sizing: border-box;
  background: rgb(237, 249, 250);
  overflow: auto;
}

.cateItem {
  position: relative;
  width: 0.7em;
  height: 0.65em;
  font-size: inherit;
}

.cateIconwrap {
  position: absolute;
  width: 0.54em;
  height: 0.54em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border-radius: 0.1em;
  overflow: hidden;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(107, 107, 107, 0.4);
  z-index: 100;
}

.cateImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  width: 0.4em;
  height: 0.4em;
}

.active {
  background:rgb(255, 255, 255);
}

</style>

