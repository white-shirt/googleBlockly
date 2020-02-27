const state = {
    maskStatus: false
}

const getters = {
    getmaskStatus(state) {
        return state.maskStatus
    }
}

const mutations = {
    changeMaskStatus(state, booleanflag) {
        state.maskStatus = booleanflag
    }
}

const actions = {
    invokeChangeMaskStatus(context, booleanflag) {
        context.commit("changeMaskStatus", booleanflag)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
