<template>
  <ModalMask>
    <UserSelectionStep
      v-if="actualStep === 1"
      @capture-users="captureUsers"
      @cancel="$emit('cancel')"
      @next-step="nextStep"
    />
    <ApplyPermissionsStep
      v-if="actualStep === 2"
      :users="selectedUsers"
      :document="props.selectedDoc"
      @cancel="$emit('cancel')"
      @remove-selected-user="selectedUsers.splice($event, 1)"
    />
  </ModalMask>
</template>

<script setup lang="ts">
import ModalMask from '@/components/Atoms/ModalMask.vue'
import {ref} from 'vue'
import {User} from '@/Types/User'
import UserSelectionStep from '@/components/Organism/ShareDocsModal/UserSelectionStep.vue'
import ApplyPermissionsStep from '@/components/Organism/ShareDocsModal/ApplyPermissionsStep.vue'
import {Notify} from 'quasar'
import {Document} from '@/Types/Document'

defineEmits<{ (e: 'cancel'): void }>()
const props = defineProps<{selectedDoc: Document}>()
const selectedUsers = ref<User[]>([])
const actualStep = ref<number>(1)
function captureUsers(payload: User[]) {
    selectedUsers.value = payload
}
function nextStep() {
    if (!selectedUsers.value.length){
        Notify.create({message: 'Se deben seleccionar usuarios para continuar', color: 'red', type: 'negative'})
        return
    }
    actualStep.value = 2
}
</script>

