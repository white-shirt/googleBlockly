import Vue from 'vue';
import Vuex from 'vuex';
import defaultToolbox from './modules/defaultToolbox';
import vmmapdata from './modules/vmmapdata';
import aieggy from './modules/aieggy';
import mask from './modules/mask';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    defaultToolbox,
    vmmapdata,
    aieggy,
    mask
  }
});
