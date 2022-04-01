import type {App} from 'vue'
import PButton from './Atoms/PButton.vue'
import PText from './Atoms/PText.vue'
import PIcon from './Atoms/PIcon.vue'
import PInput from './Molecules/PInput.vue'
import PSelect from './Molecules/PSelect.vue'
import PLetterIcon from './Atoms/PLetterIcon.vue'
import PMiniCard from './Molecules/MiniCard.vue'
import PModal from './Molecules/PModal.vue'

export default function componentsRegister (app:App): void {
    app.component('PButton', PButton)
    app.component('PText', PText)
    app.component('PIcon', PIcon)
    app.component('PInput', PInput)
    app.component('PSelect', PSelect)
    app.component('PLetterIcon',PLetterIcon)
    app.component('PMiniCard', PMiniCard)
    app.component('PModal', PModal)
}
