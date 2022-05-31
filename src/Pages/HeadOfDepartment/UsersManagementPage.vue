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
        :icon-text="user.fullName"
        :itemSubtitleText="`${user.role[0]} / ${user.authorization[0] ?? 'Sin permiso'}`"
        itemTitleVariant="text-1"
        itemSubtitleVariant="text-2"
      >
        <template #default>
          <PDropdown
            :text="user.authorization[0] ? user.authorization[0] : 'Sin permiso'"
            :options="optionsDropdown"
          >
            <template #options="data">
              <PText
                variant="text-4 full-width"
                @click="setPermissionToUser(user.id, data.option.label)"
              >
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
import {computed, ref, watch} from 'vue'
import UserItem from '@/components/Organism/ShareDocsModal/UserItem.vue'
import type {DropdownOption} from '@/components/Molecules/PDropdown.vue'
import {useGetUsersList} from '@/Composables/useUsersClientMethods'
import HeaderInput from '@/Pages/HeadOfDepartment/HeaderInput.vue'
import {User} from '@/Types/User'
import store from '@/store'
import {useGetPermissions} from '@/Composables/useShareDocumentClientMethods'
import {UsersApi} from '@/services/api/api'
import {Notify} from 'quasar'

const searchValue = ref<string>('')
const optionsDropdown = ref<DropdownOption[]>([])
const {users} = useGetUsersList(undefined, undefined, store.getters.getUserDepartment.id)
const {permissions} = useGetPermissions()

const usersList = computed<User[]>(() => users.value
    .filter((user) => user.name?.toLowerCase().match(searchValue.value) && user.role[0] !=='Jefe de Departamento'))

async function setPermissionToUser(userId: number, permission: string) {
    const foundUser = users.value.find(user => userId === user.id)
    try {
        await new UsersApi().saveUserPermission(userId, {permission: permission})
        foundUser.authorization[0] = permission
        Notify.create({message: 'Se han aplicado los permisos', color: 'blue', type: 'positive'})
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error, intentalo de nuevo', color: 'red', type: 'negative'})
    }

}
watch([permissions, users], () => {
    if (permissions.value.length && users.value.length) {
        permissions.value.forEach((permission, index) => {
            optionsDropdown.value[index] = {label: permission.name, extraData: {},action: () => []}
        })
        users.value.forEach((user, index) => {
            if (optionsDropdown.value[index]) {
                optionsDropdown.value[index].extraData = user
            }
        })
    }
})
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
