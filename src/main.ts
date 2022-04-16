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
import componentsRegister from './components/componentsRegister'
import PButton from '@/components/Atoms/PButton.vue'
import PText from '@/components/Atoms/PText.vue'
import PIcon from '@/components/Atoms/PIcon.vue'
import PInput from '@/components/Molecules/PInput.vue'
import PSelect from '@/components/Molecules/PSelect.vue'
import PLetterIcon from '@/components/Atoms/PLetterIcon.vue'
import PMiniCard from '@/components/Molecules/MiniCard.vue'
import PLinkText from '@/components/Atoms/PLinkText.vue'
import PModal from '@/components/Molecules/PModal.vue'
import PChip from '@/components/Atoms/PChip.vue'
import PTab from '@/components/Atoms/PTab.vue'
import PTabs from '@/components/Molecules/PTabs.vue'
import PAvatar from '@/components/Atoms/PAvatar.vue'
import PSidebarIconButton from '@/components/Atoms/PSidebarIconButton.vue'
import POptionList from '@/components/Molecules/POptionList.vue'
import PDropdown from '@/components/Molecules/PDropdown.vue'
import PForm from '@/components/Organism/PForm.vue'

const myApp = createApp(App)
myApp.use(store)
myApp.use(Router)
myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})
// componentsRegister(myApp)
myApp.component('PButton', PButton)
myApp.component('PText', PText)
myApp.component('PIcon', PIcon)
myApp.component('PInput', PInput)
myApp.component('PSelect', PSelect)
myApp.component('PLetterIcon',PLetterIcon)
myApp.component('PMiniCard', PMiniCard)
myApp.component('PLinkText', PLinkText)
myApp.component('PModal', PModal)
myApp.component('PChip', PChip)
myApp.component('PTab', PTab)
myApp.component('PTabs', PTabs)
myApp.component('PAvatar', PAvatar)
myApp.component('PSidebarIconButton', PSidebarIconButton)
myApp.component('POptionList', POptionList)
myApp.component('PDropdown', PDropdown)
myApp.component('PForm', PForm)
myApp.mount('#app')
