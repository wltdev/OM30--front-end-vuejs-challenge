import moment from 'moment'

export const formatBirthday = (date) => {
  return moment(date).format('LL')
}
