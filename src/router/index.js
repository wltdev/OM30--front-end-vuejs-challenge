import { createRouter, createWebHistory } from 'vue-router'
import Home from '@views/Home.vue'
import Patients from '@views/Patients.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/patients',
      component: Patients
    }
  ]
})

export { router }
