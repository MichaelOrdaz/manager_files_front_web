import type {App} from 'vue'
import PButton from './Atoms/PButton.vue'
import PText from './Atoms/PText.vue'
import PIcon from './Atoms/PIcon.vue'
import PInput from './Molecules/PInput.vue'

export default function componentsRegister (app:App): void {
    app.component('PButton', PButton)
    app.component('PText', PText)
    app.component('PIcon', PIcon)
    app.component('PInput', PInput)
}
