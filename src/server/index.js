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
      cns: '293 8480 6382 0008',

      address() {
        return {
          zipcode: faker.address.zipCode(),
          city: faker.address.cityName(),
          state: faker.address.state(),
          street: faker.address.streetName(),
          neighborhood: faker.address.ordinalDirection(),
          number: faker.address.buildingNumber()
        }
      }
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

    this.put('/patients/:id', function (schema, request) {
      let id = request.params.id
      let attrs = JSON.parse(request.requestBody)

      return schema.patients.find(id).update(attrs)
    })

    this.del('/patients/:id', (schema, request) => {
      let id = request.params.id

      schema.patients.find(id).destroy()
    })

    this.passthrough('https://viacep.com.br/ws/**')
  }
})
