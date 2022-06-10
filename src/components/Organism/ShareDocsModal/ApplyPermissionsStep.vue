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
      2.-Seleccionar permiso
    </PText>
    <div class="users-list text-left">
      <PText variant="text-3">
        Usuarios seleccionados
      </PText>
      <div v-if="users.length">
        <UserItem
          v-for="(user, index) in props.users"
          :key="user.id"
          :icon-text="user.name"
          :item-title-text="user.fullName"
          :item-subtitle-text="user.role[0] ? user.role[0] : 'Sin rol'"
          icon-color="ocean"
        >
          <template #default>
            <div class="prox">
              <q-select
                v-model="models[index]"
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
                @click="removeSelectedUser(index)"
              />
            </div>
          </template>
        </UserItem>
      </div>
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
        @click.prevent.stop="savePermissions"
      >
        Guardar
      </PButton>
    </div>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable */
import UserItem from './UserItem.vue'
import {User} from '@/Types/User'
import {ref} from 'vue'
import {
    useGetShareDocumentsPermissions,
    useSaveUsersDocumentPermissionShare
} from '@/Composables/useShareDocumentClientMethods'
import {ShareDocumentPermission} from '@/services/api/models'
import {Document} from '@/Types/Document'
import {Notify} from 'quasar'
interface Props {   document: Document, users?: User[] }

const emit = defineEmits<{
    (e:'cancel'):void,
    (e: 'remove-selected-user', payload: number): void
}>()
const props = withDefaults(defineProps<Props>(), {users: () => []})

const {permissionsList} = useGetShareDocumentsPermissions()
const models = ref([])
const usersWithPermissionList = ref<{id: number, permission: string}[]>([])

function takeUser(permission: ShareDocumentPermission, userId: number, index: number) {
    usersWithPermissionList.value[index] = {id: userId, permission: permission.name}
}

function removeSelectedUser(index: number) {
    usersWithPermissionList.value.splice(index, 1)
    emit('remove-selected-user', index)
}

async function savePermissions() {
    if (!usersWithPermissionList.value.length) {
        Notify.create({message: 'Se deben asignar permisos a los usuarios seleccionados', color: 'red', type: 'negative', position: 'top-right'})
        return
    }
    try {
        await useSaveUsersDocumentPermissionShare(props.document.id, usersWithPermissionList.value)
        Notify.create({message: 'Se han aplicado los permisos', color: 'blue', type: 'positive', position: 'top-right'})
        emit('cancel')
    }catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red', type: 'negative', position: 'top-right'})
    }
}
</script>

<style scoped lang="scss">
@import "UserSelectionStep";
</style>
