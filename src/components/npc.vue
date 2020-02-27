<template>
  <div id="npc">
    <div class="eggavatar">
      <img v-bind:src="eggavatar" alt="" />
    </div>
    <div class="eggsay">
      <span>{{msg}}</span>
    </div>  
  </div>
</template>

<script>
import egghappy from "../assets/img/eggavatar_1.png";
import eggwarn from "../assets/img/eggavatar_2.png";
import eggsad from "../assets/img/eggavatar_3.png";
export default {
  name: "npc",
  props: ["npcMsg"],
  data() {
    return {
      eggavatar: egghappy,
      msg: ""
    };
  },
  methods: {

  },
  watch: {
    npcMsg: {
      handler(val, oldVal) {
        console.log(val.Msg);
        var _this = this;
        _this.msg = val.Msg; 
      },
      deep: true
    }
  }
};
</script>

<style scoped>
#npc {
  position: absolute;
  width: 95%;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  overflow: hidden;
}

.eggavatar {
  width: 40px;
  height: 40px;
  background: rgb(223, 222, 222);
  text-align: center;
}

.eggavatar img {
  width: 90%;
  height: 90%;
  margin-top: 5%;
}

.eggsay {
  position: absolute;
  top: 0;
  width: 100%;
  padding-left: 45px;
  box-sizing: border-box;
  height: 40px;
  overflow: hidden;
}

.eggsay span {
  display: inline-block;
  font-size: 12px;
  width: 100%;
  height: 100%;
  line-height: 40px;
  overflow: hidden;
}
</style>
