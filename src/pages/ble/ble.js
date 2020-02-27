import Vue from 'vue'
import ble from './ble.vue'
import store from '../../store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  template: '<ble/>',
  components: { ble }
})