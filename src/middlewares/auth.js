import store from '@/store'
import { SET_USER } from '@/store/mutations'
;(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(store)
  if (user) {
    store.commit(SET_USER, user)
  }
})()
