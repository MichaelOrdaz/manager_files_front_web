import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import '@quasar/extras/roboto-font/roboto-font.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import store from './store'
import Router from './router'
import registroDeComponentesGlobales from './components/registroDeComponentesGlobales'

const myApp = createApp(App)
myApp.use(store)
myApp.use(Router)
myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})
registroDeComponentesGlobales(myApp)
myApp.mount('#app')
