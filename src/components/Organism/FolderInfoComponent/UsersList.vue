<template>
  <div class="users-list">
    <PText variant="text-4">
      Gestionar permisos
    </PText>
    <div class="chip-list" />
    <div class="flex justify-between">
      <PLinkText @click="showPermissionsModal = true">
        Gestionar permisos
      </PLinkText>
    </div>
    <PModal
      v-if="showPermissionsModal"
      width="630px"
      heigth="652px"
      @cancel="showPermissionsModal = false"
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
          v-if="selectedItem?.share?.length && models.length"
          class="users"
        >
          <UserItem
            v-for="(user, index) in selectedItem.share"
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

const showPermissionsModal = ref<boolean>(false)
const models = ref<{id: number, permission: UserDocsPermission | string }[]>([])
const {permissionsList} = useGetShareDocumentsPermissions()
const usersWithPermissionsList = ref<{permission: string, id: number}[]>([])

function takeUser(permission: UserDocsPermission, userId: number, index: number) {
    usersWithPermissionsList.value[index] = {permission: permission.name, id: userId}
}
async function savePermissions() {
    if (!models.value.length) {
        Notify.create({message: 'Se deben asignar permisos a los usuarios seleccionados', color: 'red', type: 'negative'})
        return
    }
    try {
        usersWithPermissionsList.value = models.value.map(user => ({permission: user.permission.name, id: user.id}))
        await useSaveUsersDocumentPermissionShare(selectedItem.value.id, usersWithPermissionsList.value)
        Notify.create({message: 'Se han aplicado los permisos', color: 'blue', type: 'positive'})
        showPermissionsModal.value = false
    }catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red', type: 'negative'})
    }
}
const selectedItem = computed<Document>(() => store.getters.getSelectedItem ?? [])
function setModels() {
    if (selectedItem.value.share?.length) {
        selectedItem.value.share.forEach((user, index) => {models.value[index] = {id: user.id, permission: user.permission}})
    }
}
watch(selectedItem, () => {
    setModels()
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
