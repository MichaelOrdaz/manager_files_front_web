<template>
  <div class="modal-container">
    <PIcon
      iconName="close"
      class="close-icon cursor-pointer"
      @click="$emit('cancel')"
    />
    <PText
      variant="subtitle-2"
      class="text-left"
    >
      1.-Compartir con usuarios
    </PText>
    <PText
      variant="text-4"
      class="text-left"
    >
      Selecciona un departamento
    </PText>
    <PDropdown
      :text="dropdownText"
      :options="dropdownOptions"
    >
      <template #options="item">
        <PText variant="text-5">
          {{ item.option.label }}
        </PText>
      </template>
    </PDropdown>
    <div class="users-list text-left">
      <PText variant="text-3">
        Selecciona usuarios
      </PText>
      <div v-if="usersList.length && currentUserDepartment && !isLoading">
        <UserItem
          v-for="user in filterListOfUsers"
          :key="user.id"
          :icon-text="user.name"
          :item-title-text="user.fullName"
          :item-subtitle-text="user.role[0] ? user.role[0] : 'Sin rol'"
          icon-color="ocean"
          @click.stop.prevent="addUserToSelectedList(user)"
        >
          <template #default>
            <div class="prox">
              <PIcon
                v-if="selectedUsers.some(val => val.id === user.id)"
                color="link"
                iconName="done"
              />
            </div>
          </template>
        </UserItem>
      </div>
      <PText
        v-else
        variant="subtitle-1"
      >
        El departamento no tiene usuarios
      </PText>
    </div>
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
        @click.stop.prevent="nextStep"
      >
        Siguiente
      </PButton>
    </div>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable */
import PDropdown from '@/components/Molecules/PDropdown.vue'
import type {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import {computed, ref, watch} from 'vue'
import {getDepartmentsList} from '@/Composables/useGetDepartmentsList'
import UserItem from './UserItem.vue'
import {User} from '@/Types/User'
import store from '@/store'
import {Department} from '@/Types/Department'
import {Notify} from 'quasar'
import {useGetUsersOfDocumentList} from '@/Composables/useShareDocumentClientMethods'
import {Document} from '@/Types/Document'

const emit = defineEmits<{
    (e: 'cancel'):void,
    (e: 'capture-users', payload: User[]): void,
    (e: 'next-step'): void }>()
const props = defineProps<{selectedDoc: Document}>()
const dropdownOptions = ref<DropdownOption[]>([{label: 'Chido', action: () => []}])
const selectedUsers = ref<User[]>([])
const currentUserDepartment = ref<Department | undefined>(undefined)
const {departmentsList} = getDepartmentsList()
const {usersList, getUsersDocumentList} = useGetUsersOfDocumentList(props.selectedDoc.id, currentUserDepartment?.value?.id ? currentUserDepartment.value.id : undefined)
const dropdownText = ref<string>('')
const isLoading = ref<boolean>(true)
const filterListOfUsers = computed<User[]>(() => usersList.value.filter(user => user.role[0] !== 'Administrador'))
function addUserToSelectedList(user: User) {
    const index = selectedUsers.value.findIndex(el => el.id === user.id)
    if (index > -1){
        selectedUsers.value.splice(index,1)
        emit('capture-users',selectedUsers.value)
        return
    }
    selectedUsers.value.push(user)
    emit('capture-users',selectedUsers.value)
}

function nextStep() {
    if (usersList.value.length && !selectedUsers.value.length) {
        Notify.create({message: 'Debes seleccionar por lo menos un usuario', color: 'red', type: 'negative', position: 'top-right'})
        return
    }
    emit('next-step')
}

watch(departmentsList, async () => {
    currentUserDepartment.value = departmentsList.value.find(el => el.id === store.getters.getUserData.user_data.department.id)
    dropdownText.value = departmentsList.value.filter(el => el.name !== currentUserDepartment.value.name)[0].name ?? ''
    dropdownOptions.value = departmentsList.value.filter(val => val.name !== currentUserDepartment.value.name)
        .map(dep => ({
            label: dep.name,
            action: () => {
                dropdownText.value = dep.name
                getUsersDocumentList(props.selectedDoc.id, dep.id)
                selectedUsers.value = []
            },
            extraData: dep
        }))
    await getUsersDocumentList(props.selectedDoc.id, departmentsList.value[0].id)
    isLoading.value = false
})
</script>
<style scoped lang="scss">
@import "UserSelectionStep";
</style>
