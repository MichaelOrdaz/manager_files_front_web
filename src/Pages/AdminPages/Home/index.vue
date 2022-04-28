<template>
  <div class="view-container">
    <UsersInputFilters
      :roles="rolesList"
      @create-user="showUserModal = true"
      @update-filter-values="captureFilters"
    />
    <UsersManagementTable
      :filter="filterValue"
      :users="users"
      @delete-user="showDeleteModal"
      @edit-user="edit"
    />
    <RegisterUserModal
      v-if="showUserModal"
      :userSelected="selectedUser"
      :roles="rolesList"
      @cancel="cancel"
    />
    <PModal
      v-if="showDeleteUserModal"
      :modalTitle="deleteUserModalText"
      @cancel="showDeleteUserModal = false"
      @accept="deleteUser"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useDeleteUser, useGetUsersList} from '@/Composables/useUsersClientMethods'
import UsersManagementTable from '@/components/Organism/UsersManagementTable.vue'
import RegisterUserModal from '@/components/Organism/RegisterUserModal/index.vue'
import PModal from '@/components/Molecules/PModal.vue'
import UsersInputFilters from '@/Pages/AdminPages/Home/UsersInputFilters.vue'
import {User} from '@/Types/User'
import {useGetRolesList} from '@/Composables/useGetRolesList'
import {Notify} from 'quasar'

const filterValue = ref<string>('')
const rolSelected = ref<number>(0)
const showUserModal = ref<boolean>(false)
const showDeleteUserModal = ref<boolean>(false)
const selectedUser = ref<User | undefined>(undefined)
const {users, getUsers} = useGetUsersList(filterValue.value,rolSelected.value)
const {rolesList} = useGetRolesList()

function captureFilters(params: {text: string, rolId: number}): void {
    filterValue.value = params.text
    rolSelected.value = params.rolId
}
function showDeleteModal(user:User) {
    selectedUser.value = user
    showDeleteUserModal.value = true
}
function edit(user: User) {
    selectedUser.value = user
    showUserModal.value = true
}
function cancel() {
    selectedUser.value = undefined
    showUserModal.value = false
}
async function deleteUser() {
    try {
        await useDeleteUser(selectedUser.value)
        showDeleteUserModal.value = false
        selectedUser.value = undefined
        await getUsers(filterValue.value, rolSelected.value)
        Notify.create({message: 'Se ha eliminado al usuario', color: 'green'})
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red'})
    }
}
const deleteUserModalText = computed<string>(() => selectedUser.value ? `¿Está seguro que quiere eliminar al usuario ${selectedUser.value.fullName}?` : '')
watch(rolSelected, () => {getUsers(filterValue.value, rolSelected.value)})
</script>

<style scoped lang="scss">
.view-container{
    padding: 38px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
