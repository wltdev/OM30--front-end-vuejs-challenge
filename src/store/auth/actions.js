import { faker } from '@faker-js/faker'
import { SET_USER, SET_USER_ERROR } from '../mutations'

export const actions = {
  signIn: async ({ commit }, { email, password }) => {
    try {
      const fakeUser = {
        id: faker.database.mongodbObjectId(),
        name: faker.name.fullName(),
        email
      }

      commit(SET_USER, fakeUser)
    } catch (error) {
      commit(SET_USER_ERROR, 'Invalid email or password')
      throw new Error('Invalid email or password')
    }
  }
}
