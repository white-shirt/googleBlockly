import Vue from "vue";
import level from "./level.vue";
import store from "../../store";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  template: '<level/>',
  components: { level }
})