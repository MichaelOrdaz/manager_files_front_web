<template>
  <QTable
    class="table full-width"
    :columns="columns"
    :rows="props.users"
    :filter="props.filter"
    row-key="name"
    :rows-per-page-options="[25]"
  >
    <template #pagination>
      <PText variant="text-5">
        {{ users.length }}
      </PText>
    </template>
    <template #body="item">
      <q-tr>
        <q-td class="text-left">
          <PAvatar src="https://www.w3schools.com/howto/img_avatar.png" />
        </q-td>
        <q-td class="text-left">
          <PText
            variant="subtitle-3"
          >
            {{ item.row.name }}
          </PText>
        </q-td>
        <q-td class="text-left">
          <PText
            variant="subtitle-3"
          >
            {{ item.row.role[0] || 'Sin rol' }}
          </PText>
        </q-td>
        <q-td class="text-left">
          <PText
            variant="subtitle-3"
          >
            {{ item.row?.department?.name || 'Sin departamento' }}
          </PText>
        </q-td>
        <q-td class="text-left">
          <PText
            variant="subtitle-3"
          >
            {{ item.row?.phone || 'Sin télefono' }}
          </PText>
        </q-td>
        <q-td class="text-left">
          <PText
            variant="subtitle-3"
          >
            {{ item.row?.email || 'Sin correo' }}
          </PText>
        </q-td>
        <q-td class="text-center">
          <PIcon
            class="cursor-pointer"
            iconName="edit"
            size="pmd"
            data-cy="edit-user-icon"
            title="Editar usuario"
            @click.prevent="$emit('edit-user', item.row)"
          />
          <PIcon
            class="cursor-pointer p-mx-xl"
            iconName="vpn_key"
            size="pmd"
            color="black"
            data-cy="update-password-icon"
            title="Cambiar contraseña de usuario"
            @click.prevent="openUpdatePasswordModal(item.row)"
          />
          <PIcon
            class="cursor-pointer"
            iconName="delete"
            size="pmd"
            color="red"
            data-cy="delete-user-icon"
            title="Eliminar usuario"
            @click.prevent="$emit('delete-user', item.row)"
          />
        </q-td>
      </q-tr>
    </template>
  </QTable>
  <PModal
    v-if="showUpdatePasswordModal"
    class="text-left"
    modal-title="Cambiar contraseña"
    width="411px"
    heigth="364px"
    @accept="validatePasswords"
    @cancel="showUpdatePasswordModal = false"
  >
    <template #body>
      <PForm ref="formRef">
        <PInput
          v-model="newPssword"
          label="Nueva contraseña"
          width="320px"
          data-cy="new-password"
          :rules="[(value: string) => value.length >= 8 || 'La contraseña debe tener 8 caracteres']"
        />
        <PInput
          v-model="passwordConfirmation"
          label="Confirma la cotraseña"
          width="320px"
          data-cy="password-confirmation"
          :rules="[(value: string) => value.length >= 8 || 'La contraseña debe tener 8 caracteres',
                   (value: string) => value === newPssword || 'Las contraseñas son diferentes']"
        />
      </PForm>
    </template>
  </PModal>
</template>

<script setup lang="ts">
/* eslint-disable */
import {Notify, QTable} from 'quasar'
import type {User} from '@/Types/User'
import PModal from '@/components/Molecules/PModal.vue'
import {ref} from 'vue'
import {useUpdateUserPassword} from '@/Composables/useUsersClientMethods'
import PForm from '@/components/Organism/PForm.vue'
import PFormComp from '@/Types/PFormComp'
interface Props {users: User[], filter: string}

defineEmits<{
    (e: 'delete-user', payload: User):void,
    (e: 'edit-user', payload: User):void,
}>()
const formRef = ref<PFormComp | null>(null)
const props = withDefaults(defineProps<Props>(), {users: () => [], filter: ''})
const newPssword = ref<string>('')
const passwordConfirmation = ref<string>('')
const showUpdatePasswordModal = ref<boolean>(false)
const selectedUSer = ref<User | undefined>(undefined)
const columns: any[] = [
    { name: 'Foto del usuario', align: 'left', label: 'Foto del usuario', field: (row) => row.name},
    {
        name: 'Nombre de usuario', align: 'left', label: 'Nombre de usuario', field: 'name'
    },
    { name: 'Rol', align: 'left', label: 'Rol', field: 'name' },
    { name: 'Departamento', align: 'left', label: 'Departamento', field: 'name' },
    { name: 'Teléfono', align: 'left', label: 'Teléfono', field: 'name' },
    { name: 'Correo', align: 'left', label: 'Correo', field: 'name' },
    { name: 'Acciones', align: 'center', label: 'Acciones', field: 'name' },
]
function openUpdatePasswordModal(user: User) {
    showUpdatePasswordModal.value = true
    selectedUSer.value = user
}
function validatePasswords() {
    const isValidForm = formRef.value.validate()
    if (isValidForm) {
        updatePassword()
    }
}

async function updatePassword() {
    try {
        await useUpdateUserPassword(selectedUSer.value.id, newPssword.value, passwordConfirmation.value)
        Notify.create({message: 'La contraseña se ha actualizado', color: 'blue', type: 'positive'})
        showUpdatePasswordModal.value = false
    }catch (e) {
        Notify.create({message: 'Ha ocurrido un error', color: 'red', type: 'negative'})
    }
}
</script>

<style scoped>
.table{
    width: 90%;
    height: 100%;
    max-height: 80vh;
}
.p-mx-xl{margin: 0 18px}
@media (max-height: 700px){
    .table{
        width: 90%;
        height: 75vh;
    }
}
</style>
