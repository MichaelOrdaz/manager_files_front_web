<template>
  <div class="modal-container">
    <PText
      variant="subtitle-2"
      class="text-left"
    >
      1.-Compartir con usuarios
    </PText>
    <PDropdown :options="dropdownOptions">
      <template #options="item">
        <PText variant="text-5">
          {{ item.option.label }}
        </PText>
      </template>
    </PDropdown>
    <div class="action-btns">
      <PButton
        size="plg"
        variant="white"
        @click="$emit('cancel')"
      >
        Cancelar
      </PButton>
      <PButton
        size="plg"
        class="q-ml-lg"
      >
        Enviar
      </PButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import PDropdown from '@/components/Molecules/PDropdown.vue'
import type {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import {ref, watch} from 'vue'
import {getDepartmentsList} from '@/Composables/useGetDepartmentsList'
import {useGetUsersList} from '@/Composables/useUsersClientMethods'

defineEmits<{(e: 'cancel'):void}>()

const dropdownOptions = ref<DropdownOption[]>([{label: 'Chido', action: () => []}])
const {users, getUsers} = useGetUsersList(undefined, undefined, undefined)
const {departmentsList} = getDepartmentsList()

watch(departmentsList, () => {
    dropdownOptions.value = departmentsList.value.map(dep => ({
        label: dep.name,
        action: () => {
            getUsers(undefined,undefined, dep.id)
            console.log(users.value)
        },
        extraData: dep
    }))
})
</script>
<style scoped lang="scss">
.modal-container {
    width: 652px;
    height: 790px;
    max-height: 700px;
    background-color: white;
    padding: 45px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}
</style>
