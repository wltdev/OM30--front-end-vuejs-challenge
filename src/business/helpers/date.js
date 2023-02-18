import moment from 'moment'

export const formatBirthday = (date) => {
  return moment(date).format('LL')
}

export const unformatBirthday = (date) => {
  return moment(`${date} 00:00:00`, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
}
