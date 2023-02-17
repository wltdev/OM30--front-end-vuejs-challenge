import { faker } from '@faker-js/faker'

export const getFakePatients = () => {
  const patients = []

  for (let i = 0; i < 50; i++) {
    patients.push({
      id: faker.database.mongodbObjectId(),
      photo: faker.internet.avatar(),
      name: faker.name.fullName(),
      motherName: faker.name.fullName({ sex: 'female' }),
      birthday: '10/10/200',
      cpf: '011.687.987-51',
      cns: faker.random.numeric(15),
      address: faker.address.streetAddress(true),
      createdAt: '01/10/2023'
    })
  }

  return patients
}
