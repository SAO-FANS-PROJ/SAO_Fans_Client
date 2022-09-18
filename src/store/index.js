import { createStore } from 'vuex'

export default createStore({
  state: {
    activeRole: '',
    roleExpandAnimation: {}
  },
  mutations: {
    updateActiveRole (state, payload) {
      state.activeRole = payload
    },
    updateRoleExpandAnimation (state, payload) {
      state.roleExpandAnimation = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
