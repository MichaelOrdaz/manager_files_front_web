<template>
  <div class="view-container">
    <HeaderInput v-model="searchValue" />
    <PText
      variant="subtitle-2"
      class="view-title"
    >
      Gestión de usuarios de mi departamento
    </PText>
    <div
      v-if="users && users.length"
      class="items-list-container"
    >
      <UserItem
        v-for="user in usersList"
        :key="user.id"
        itemHight="80px"
        letterIconSize="pmd"
        :itemTitleText="user.fullName"
        :itemSubtitleText="user.name"
        itemTitleVariant="subtitle-1"
        itemSubtitleVariant="text-2"
      >
        <template #default>
          <PDropdown :options="optionsDropdown">
            <template #options="data">
              <PText variant="text-4">
                {{ data.option.label }}
              </PText>
            </template>
          </PDropdown>
        </template>
      </UserItem>
    </div>
    <PText v-else>
      Sin usuarios
    </PText>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import UserItem from '@/components/Organism/ShareDocsModal/UserItem.vue'
import type {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import {useGetUsersList} from '@/Composables/useUsersClientMethods'
import HeaderInput from '@/Pages/HeadOfDepartment/HeaderInput.vue'
import {User} from '@/Types/User'

const searchValue = ref<string>('')
const optionsDropdown = ref<DropdownOption[]>([
    {action: () => [], label: 'Todos los permisos'},
    {action: () => [], label: 'Solo lectura'},
    {action: () => [], label: 'Sin permisos'},
])
const {users} = useGetUsersList(undefined, undefined)

const usersList = computed<User[]>(() => users.value
    .filter((user) => user.name?.toLowerCase().match(searchValue.value)))
</script>

<style scoped lang="scss">
.dropdown{height: 40px}
.view-title{align-self: flex-start; font-weight: bold}
.view-container{
    width: 100%;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
}
div :deep(.slot) {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
