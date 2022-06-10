<template>
  <div class="users-list">
    <PText
      variant="text-4"
      fontWeight="600"
      color="gray-6"
    >
      Gestionar permisos
    </PText>
    <div class="chip-list" />
    <div
      v-if="store.getters.getAnalystHasAllPermission"
      class="flex justify-between"
    >
      <PLinkText @click="showPermissionsModal = true">
        Gestionar permisos
      </PLinkText>
    </div>
    <div v-else>
      <PText variant="text-4">
        Usted no tiene acceso agestionar los permisos
      </PText>
    </div>
    <PModal
      v-if="showPermissionsModal"
      width="630px"
      heigth="652px"
      @cancel="() => { showPermissionsModal = false; usersWithPermission = [...selectedItem.share]}"
      @accept="savePermissions"
    >
      <template #header>
        <div class="column text-left">
          <PText variant="subtitle-1">
            Gestionar permisos
          </PText>
          <PText variant="text-1">
            Usuarios con permiso
          </PText>
        </div>
      </template>
      <template #body>
        <div
          v-if="usersWithPermission?.length && models?.length"
          class="users"
        >
          <UserItem
            v-for="(user, index) in usersWithPermission"
            :key="user.id"
            :item-title-text="user.name"
            :item-subtitle-text="user.email"
          >
            <template #default>
              <div class="prox">
                <q-select
                  v-model="models[index].permission"
                  class="select"
                  option-label="name"
                  borderless
                  :options="permissionsList"
                  label="Selecciona un permiso"
                  @update:model-value="takeUser($event,user.id, index)"
                />
                <PIcon
                  color="gray"
                  iconName="close"
                  @click="removeUser(index)"
                />
              </div>
            </template>
          </UserItem>
        </div>
        <PText
          v-else
          variant="subtitle-2"
        >
          No hay usuarios
        </PText>
      </template>
    </PModal>
  </div>
</template>

<script setup lang="ts">
import PModal from '@/components/Molecules/PModal.vue'
import UserItem from '@/components/Organism/ShareDocsModal/UserItem.vue'
import {computed, ref, watch} from 'vue'
import store from '@/store'
import {Document} from '@/Types/Document'
import {
    useGetShareDocumentsPermissions,
    useSaveUsersDocumentPermissionShare
} from '@/Composables/useShareDocumentClientMethods'
import {UserDocsPermission} from '@/Types/UserDocsPermission'
import {Notify} from 'quasar'
import {User} from '@/Types/User'

const showPermissionsModal = ref<boolean>(false)
const models = ref<{id: number, permission: string }[]>([])
const {permissionsList} = useGetShareDocumentsPermissions()
const usersWithPermissionsList = ref<{permission: string, id: number}[]>([])
const usersWithPermission = ref<User[]>([])

function takeUser(permission: UserDocsPermission, userId: number, index: number) {
    usersWithPermissionsList.value[index] = {permission: permission.name, id: userId}
}
async function savePermissions() {
    if (!models.value.length) {
        Notify.create({message: 'Se deben asignar permisos a los usuarios seleccionados', color: 'red', type: 'negative', position: 'top-right'})
        return
    }
    try {
        await useSaveUsersDocumentPermissionShare(selectedItem.value.id, models.value.map(el => ({id: el.id, permission: el.permission?.name ? el.permission.name : el.permission})))
        Notify.create({message: 'Se han aplicado los permisos', color: 'blue', type: 'positive', position: 'top-right'})
        showPermissionsModal.value = false
    }catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red', type: 'negative', position: 'top-right'})
    }
}
const selectedItem = computed<Document>(() => store.getters.getSelectedItem ?? [])
function setModels() {
    if (selectedItem.value.share?.length) {
        selectedItem.value.share.forEach((user, index) => {models.value[index] = {id: user.id, permission: user.permission}})
    }
}
function removeUser(index:number) {
    usersWithPermission.value.splice(index, 1)
}
watch(selectedItem, () => {
    setModels()
    if (selectedItem.value.share) {
        usersWithPermission.value = [...selectedItem.value.share]
        return
    }
    usersWithPermission.value = []
})
</script>

<style scoped lang="scss">
.users-list{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12px;
    border-bottom: solid 1px $gray-4;
    .chip-list{
        margin-top: 6px;
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .flex{
        width: 100%;
    }
    .users{
        height: 450px;
    }
    .prox{
        display: flex;
        .select{
            width: 225px;
        }
    }
}
div :deep(.pchip-container){ width: 117px; margin-right: 8px; margin-top: 4px }
</style>
