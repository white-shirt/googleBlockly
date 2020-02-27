import Vue from "vue";
import homepage from "./homepage.vue";

import store from "../../store";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  template: "<homepage/>",
  components: { homepage }
})
