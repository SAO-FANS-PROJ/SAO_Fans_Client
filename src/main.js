import { createApp } from 'vue'
import app from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios"
import lax from 'lax.js'


let App = createApp(app)
App.config.globalProperties.Axios = axios
App.config.globalProperties.LaxAnime = lax
App.use(store)
App.use(router)
// App.use(ElementPlus)
App.mount('#app')