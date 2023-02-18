import store from '@/store'
import { SET_USER } from '@/store/mutations'
;(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    store.commit(SET_USER, user)
  }
})()
