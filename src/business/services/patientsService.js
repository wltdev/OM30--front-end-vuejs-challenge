import { faker } from '@faker-js/faker'

export const getPatients = async () => {
  const request = await fetch('/api/patients')
  const { patients } = await request.json()

  return patients
}

export const addPatient = async (payload) => {
  const data = {
    ...payload,
    address: faker.address.streetAddress(true)
  }

  const request = await fetch('/api/patients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const { patient } = await request.json()

  return patient
}
