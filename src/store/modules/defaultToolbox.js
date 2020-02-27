//defaultToolbox.js

const state = {
  defaultBlocks: `<block id="front" type="iconblockly_front"></block>
                  <block id="back" type="iconblockly_back"></block>
                  <block id="turnleft" type="iconblockly_turnleft"></block>
                  <block id="turnright" type="iconblockly_turnright"></block>
                  <block id="turnround" type="iconblockly_turnround"></block>
                  `
}

const getters = {
  //承载变化的defaultBlocks
  getDefaultXml(state) {
    return `<xml id="toolbox" style="display: none">` + state.defaultBlocks + `</xml>`
  }
}

const mutations = {
  //定义改变defaultBlocks的方法
  defineBlocks(state, blocks) {
    state.defaultBlocks = blocks
  }
}

const actions = {
  //触发mutations里面的defineBlocks方法，传入的blocks参数对应到defineBlocks方法里的blocks参数
  invokeDefineBlocks(context, blocks) {
    context.commit('defineBlocks', blocks);
  }
}

export default {
  namespaced: true,  //用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}