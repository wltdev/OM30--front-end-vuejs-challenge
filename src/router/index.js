import { createRouter, createWebHistory } from 'vue-router'
import Home from '@views/Home.vue'
import Login from '@views/Login.vue'
import Patients from '@views/Patients.vue'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/patients',
      component: Patients,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  const isLogged = store.getters['getIsLogged']
  if (!isLogged && requiresAuth) {
    next({ name: 'Login' })
  } else if (isLogged && to.name === 'Login') {
    next({ name: 'Home' })
  }

  next()
})

export { router }
