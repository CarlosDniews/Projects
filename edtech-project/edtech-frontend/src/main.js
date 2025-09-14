import { createApp } from 'vue'
import App from './App.vue'

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import pt from './locales/pt.json'

import router from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  messages: { en, pt },
  legacy: false,
})

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(Toast)

app.mount('#app')
