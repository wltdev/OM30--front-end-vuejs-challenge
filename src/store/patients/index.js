import { SET_PATIENTS } from '../mutations'
import { actions } from './actions'

export default {
  state: {
    patients: []
  },

  getters: {
    getPatients: (state) => state.patients
  },

  mutations: {
    [SET_PATIENTS](state, payload) {
      state.patients = payload
    }
  },

  actions
}
