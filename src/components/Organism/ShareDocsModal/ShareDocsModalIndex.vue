<template>
  <ModalMask>
    <UserSelectionStep @cancel="$emit('cancel')" />
  </ModalMask>
</template>

<script setup lang="ts">
import ModalMask from '@/components/Atoms/ModalMask.vue'
import {ref} from 'vue'
import {User} from '@/Types/User'
import UserSelectionStep from '@/components/Organism/ShareDocsModal/UserSelectionStep.vue'

defineEmits<{ (e: 'cancel'): void }>()
const users = ref<User[]>([])
const userPer = ref<string>('')
const notificationMsg = ref<string>('')
function removeUser(index:number) {
    users.value.splice(index,1)
}
function addUser(params: User): void {
    users.value.push(params)
}

</script>

