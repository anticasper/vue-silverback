import '@/assets/css/style.css'
import '@/assets/fontawesome/css/fontawesome.css'
import '@/assets/fontawesome/css/brands.css'
import '@/assets/fontawesome/css/solid.css'

import SBButton from './components/SBButton.vue'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.component('sb-button', SBButton).mount('#app')
