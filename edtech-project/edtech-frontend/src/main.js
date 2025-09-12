// src/main.js (versão final com tudo)

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// Vuetify ... (código anterior)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// ... imports do vuetify

// Toastification
import Toast from 'vue-toastification' // 1. Importe o Toast
import 'vue-toastification/dist/index.css' // 2. Importe o CSS

const vuetify = createVuetify({
  /* ... opções ... */
})
const pinia = createPinia()
const app = createApp(App)

app.use(vuetify)
app.use(pinia)
app.use(Toast, {
  // 3. Adicione o Toast com opções (opcional)
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
})

app.mount('#app')
