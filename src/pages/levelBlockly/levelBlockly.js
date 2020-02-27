import Vue from "vue";
import levelBlockly from "./levelBlockly.vue";
import store from "../../store";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  template: '<levelBlockly/>',
  components: { levelBlockly }
})