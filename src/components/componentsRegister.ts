import type {App} from 'vue'
import PButton from './Atoms/PButton.vue'
import PText from './Atoms/PText.vue'
import PIcon from './Atoms/PIcon.vue'
import PInput from './Molecules/PInput.vue'
import PSelect from './Molecules/PSelect.vue'
import PLetterIcon from './Atoms/PLetterIcon.vue'
import PMiniCard from './Molecules/MiniCard.vue'
import PLinkText from './Atoms/PLinkText.vue'
import PModal from './Molecules/PModal.vue'
import PChip from './Atoms/PChip.vue'
import PTab from './Atoms/PTab.vue'
import PTabs from './Molecules/PTabs.vue'
import PAvatar from './Atoms/PAvatar.vue'
import PSidebarIconButton from './Atoms/PSidebarIconButton.vue'

export default function componentsRegister (app:App): void {
    app.component('PButton', PButton)
    app.component('PText', PText)
    app.component('PIcon', PIcon)
    app.component('PInput', PInput)
    app.component('PSelect', PSelect)
    app.component('PLetterIcon',PLetterIcon)
    app.component('PMiniCard', PMiniCard)
    app.component('PLinkText', PLinkText)
    app.component('PModal', PModal)
    app.component('PChip', PChip)
    app.component('PTab', PTab)
    app.component('PTabs', PTabs)
    app.component('PAvatar', PAvatar)
    app.component('PSidebarIconButton', PSidebarIconButton)
}
