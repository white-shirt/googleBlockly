<template>
  <div id="vmmaplist" v-if="maplistflag">
    <div class="listWrap">
      <div class="head">更换背景地图</div>
      <ul class="listUl">
        <li class="maplist" v-for="(item, index) in maplist" :key="index" @click="chooseMap(item.map_id)">
          <div class="imgbox">
            <img v-if="flag" :src="item.src" style="width:100%;height:auto;" />
          </div>
          <div class="mapInfo">
            <p class="title">{{ item.name }}</p>
          </div>
        </li>
      </ul>
      <div class="foot">
        <span class="cancel" @click="cancel">取消</span>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "vmmaplist",
  data() {
    return {
      flag: false  
    }
  },

  components: { },

  methods: {
    cancel: function() {
      var _this = this;
      _this.$store.dispatch("vmmapdata/invokeChangeMaplistbox", false);
    },

    chooseMap: function (name) {
      var _this = this;
      _this.$store.dispatch("vmmapdata/invokeChangeVmMapData", [name]);
      _this.cancel(false);
    }
  },

  created: function () {
    var _this = this;
  },

  mounted: function () {
    var _this = this;
  },

  computed: {
    ...mapGetters("vmmapdata", {
      maplistflag: "getmaplistbox"
    }),

    ...mapGetters("vmmapdata", {
      maplist: "getmaplist"
    })
  },

  watch: {
    maplistflag: {
      handler(val, oldval) {
        var _this = this;
        if (val) {
          setTimeout(function () {
            _this.flag = true
          }, 50)
        } else {
          _this.flag = false
        }
      }
    }
  }
}
</script>

<style scoped>

  #vmmaplist {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 20px 40px;
    box-sizing: border-box;
    z-index: 100;
    background: #fff;
    overflow: hidden;
  }

  .listWrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .head {
    width: 100%;
    height: 80px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
    line-height: 60px;
  }

  .listUl {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: scroll;
  }

  .list {
    width: 100%;
    height: 100px;
    background: #999;
    margin-top: 10px;
  }

  .foot {
    width: 100%;
    height: 80px;
    margin-top: 20px;
    text-align: center;
    line-height: 60px;
  }

  .cancel {
    font-size: 16px;
    font-weight: bolder;
    padding: 10px 40px;
    border-radius: 10px;
    background: rgb(163, 163, 163);
  }

  .maplist {
    width: 200px;
    height: 240px;
    border-radius: 10px;
    margin-bottom: 20px;
    background: #eee;
    overflow: hidden;
  }

  .imgbox {
    width: 200px;
    height: 200px;
    overflow: hidden;
  }

  .mapInfo {
    width: 200px;
    height: 40px;
    box-sizing: border-box;
  }

  .title {
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    line-height: 40px;
  }
</style>
