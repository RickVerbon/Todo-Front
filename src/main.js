import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/router.js'
import './assets/main.css'


const app = createApp(App)
app.use(Router)
app.mount('#app')
