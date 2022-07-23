import { createStore } from 'vuex'

export default createStore({
  state: {
    activeRole: ''
  },
  mutations: {
    updateActiveRole (state, payload) {
      state.activeRole = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
