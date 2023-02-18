import { faker } from '@faker-js/faker'
import { unformatBirthday } from '../helpers/date'

export const getPatients = async () => {
  const request = await fetch('/api/patients')
  const { patients } = await request.json()

  return patients
}

export const addPatient = async (payload) => {
  payload.birthday = unformatBirthday(payload.birthday) // it's not good approach for store date

  const request = await fetch('/api/patients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const { patient } = await request.json()

  return patient
}

export const updatePatient = async (id, payload) => {
  payload.birthday = unformatBirthday(payload.birthday) // it's not good approach for store date

  const request = await fetch(`/api/patients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const { patient } = await request.json()

  return patient
}

export const deletePatient = async (id) =>
  fetch(`/api/patients/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
