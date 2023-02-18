import { SET_USER } from '../mutations'
import { actions } from './actions'

export default {
  state: {
    user: {},
    isLogged: false
  },

  getters: {
    getUser: (state) => state.user
  },

  mutations: {
    [SET_USER](state, payload) {
      state.user = payload
    }
  },

  actions
}
