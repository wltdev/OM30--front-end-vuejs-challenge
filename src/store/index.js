import { createStore } from 'vuex'
import { SET_GLOBAL_LOADING } from './mutations'
import auth from './auth'
import patients from './patients'

export default createStore({
  state: {
    globalLoading: false
  },
  getters: {
    getGlobalLoading: (state) => state.globalLoading
  },
  mutations: {
    [SET_GLOBAL_LOADING]: (state, value) => {
      state.globalLoading = value
    }
  },
  actions: {
    setGlobalLoading: ({ commit }, value) => {
      commit(SET_GLOBAL_LOADING, value)
    }
  },
  modules: {
    auth,
    patients
  }
})
