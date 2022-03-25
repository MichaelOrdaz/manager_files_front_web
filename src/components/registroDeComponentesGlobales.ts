import { App } from 'vue'
import PButton from './Atoms/PButton.vue'
import PText from './Atoms/PText.vue'
import PIcon from './Atoms/PIcon.vue'

export default function registroDeComponentesGlobales (app:App): void {
    app.component('PButton', PButton)
    app.component('PText', PText)
    app.component('PIcon', PIcon)
}
