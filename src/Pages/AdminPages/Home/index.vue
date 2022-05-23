<template>
  <div class="view-container">
    <UsersInputFilters
      :roles="rolesList"
      @create-user="showUserModal = true"
      @update-filter-values="captureFilters"
    />
    <UsersManagementTable
      :filter="filterValue"
      :users="filterUsers"
      @delete-user="validateUserToDelete"
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
import store from '@/store'

const filterValue = ref<string>('')
const rolSelected = ref<number>(0)
const showUserModal = ref<boolean>(false)
const showDeleteUserModal = ref<boolean>(false)
const selectedUser = ref<User | undefined>(undefined)
const {users, getUsers} = useGetUsersList(filterValue.value,rolSelected.value)
const {rolesList} = useGetRolesList([{id: 0, name: 'Todos'}])

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
    getUsers(filterValue.value,rolSelected.value)
}
function validateUserToDelete(user: User) {
    if (store.getters.getUserData.user_data.id === user.id) {
        Notify.create({color: 'red', type: 'negative', message: 'Eliminar a tu propio usuario podría generar problemas',
            actions: [{label: 'Entendido', color: 'white'}]
        })
        return
    }
    showDeleteModal(user)
}
async function deleteUser() {
    try {
        await useDeleteUser(selectedUser.value)
        showDeleteUserModal.value = false
        selectedUser.value = undefined
        await getUsers(filterValue.value, rolSelected.value)
        Notify.create({message: 'Se ha eliminado al usuario', color: 'green', type: 'positive'})
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red', type: 'negative'})
    }
}
const filterUsers = computed<User[]>(() => users.value.filter(user => user.name.toLowerCase()
    .normalize('NFC').replace(/[\u0300-\u036f]/g, '')
    .match(filterValue.value.toLowerCase().normalize('NFC').replace(/[\u0300-\u036f]/g, ''))))
const deleteUserModalText = computed<string>(() => selectedUser.value ? `¿Está seguro que quiere eliminar al usuario ${selectedUser.value.fullName}?` : '')
watch(rolSelected, () => {getUsers(filterValue.value, rolSelected.value)})
</script>

<style scoped lang="scss">
.view-container{
    padding: 38px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
}
</style>
