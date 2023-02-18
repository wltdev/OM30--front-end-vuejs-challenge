import '@assets/styles/global.scss'
import { createApp } from 'vue'
import { IMaskDirective } from 'vue-imask'

import App from './App.vue'
import { router } from './router'
import store from './store'

import './middlewares/auth'
import './server'

const app = createApp(App)
app.directive('imask', IMaskDirective)
app.use(store)
app.use(router)

app.mount('#app')
