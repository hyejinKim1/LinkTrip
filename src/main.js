import './assets/main.css'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
const app = createApp(App)

app.use(pinia);
app.use(router)

app.mount('#app')
