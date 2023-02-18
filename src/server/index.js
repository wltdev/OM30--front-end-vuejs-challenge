import { faker } from '@faker-js/faker'
import { Server, Model, Factory } from 'miragejs'

new Server({
  models: {
    patient: Model
  },

  factories: {
    patient: Factory.extend({
      photo() {
        return faker.image.avatar()
      },
      name() {
        return faker.name.fullName()
      },
      motherName() {
        return faker.name.fullName({ sex: 'female' })
      },

      birthday() {
        return faker.date.birthdate()
      },

      cpf: '011.687.987-51',

      cns() {
        return faker.random.numeric(15)
      },

      address() {
        return faker.address.streetAddress(true)
      },
      createdAt: '01/10/2023'
    })
  },

  seeds(server) {
    server.createList('patient', 20)
  },

  routes() {
    this.namespace = 'api'

    this.get('/patients', (schema) => {
      return schema.patients.all()
    })

    this.post('/patients', (schema, request) => {
      const doc = JSON.parse(request.requestBody)

      return schema.patients.create(doc)
    })
  }
})
