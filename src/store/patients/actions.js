import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient
} from '@/business/services/patientsService'
import { SET_PATIENTS } from '../mutations'

export const actions = {
  loadPatients: async ({ commit }) => {
    try {
      const docs = await getPatients()

      commit(SET_PATIENTS, docs)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  storePatient: async ({ commit, state }, payload) => {
    const { patients } = state

    try {
      const newPatient = await addPatient(payload)
      patients.unshift(newPatient)

      commit(SET_PATIENTS, patients)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updatePatient: async ({ commit, state }, { id, payload }) => {
    try {
      const { patients } = state

      const updatedDoc = await updatePatient(id, payload)

      console.log({ updatedDoc })

      for (let i = 0; i < patients.length; i++) {
        if (patients[i].id === id) {
          patients[i] = updatedDoc
          break
        }
      }

      commit(SET_PATIENTS, patients)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  removePatient: async ({ commit, state }, id) => {
    const { patients } = state
    try {
      await deletePatient(id)
      const docs = patients.filter((item) => item.id !== id)
      commit(SET_PATIENTS, docs)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
