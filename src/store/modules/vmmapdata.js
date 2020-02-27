//vmmapdata.js

import mapData from "../../assets/vm.json"

const state = {
  defaultvmMapData: mapData.map_graphs,
  speed: 0.4,
  vmmaplistbox: false,
  maplist: mapData
}

const getters = {
  getVmMapData(state) {
    return state.defaultvmMapData
  },

  getspeed(state) {
    return state.speed * 1
  },

  getmaplistbox(state) {
    return state.vmmaplistbox
  },

  getmaplist(state) {
    return state.maplist
  }
}

const mutations = {
  //定义改变vmMapData的方法
  changeVmMapData(state, newMapName) {
    state.defaultvmMapData = mapData[newMapName]
  },

  changespeed(state, speed) {
    state.speed = speed
  },

  changemaplistbox(state, flag) {
    state.vmmaplistbox = flag
  }
}

const actions = {
  invokeChangeVmMapData(context, newMapName) {
    context.commit('changeVmMapData', newMapName)
  },

  invokeChangeSpeed(context, speed) {
    context.commit('changespeed', speed)
  },

  invokeChangeMaplistbox(context, flag) {
    context.commit('changemaplistbox', flag)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

