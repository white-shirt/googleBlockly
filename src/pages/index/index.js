import Vue from 'vue'
import Index from './index.vue'
import store from '../../store'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<Index/>',
  components: { Index },
  render: h => h(Index)
})
