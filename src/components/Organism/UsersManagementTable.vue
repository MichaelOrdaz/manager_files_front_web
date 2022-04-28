<template>
  <QTable
    class="table full-width"
    :columns="columns"
    :rows="props.users"
    :filter="props.filter"
    row-key="name"
    :rows-per-page-options="[25]"
  >
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
            @click.prevent="$emit('edit-user', item.row)"
          />
          <PIcon
            class="cursor-pointer"
            iconName="delete"
            size="pmd"
            color="red"
            data-cy="delete-user-icon"
            @click.prevent="$emit('delete-user', item.row)"
          />
        </q-td>
      </q-tr>
    </template>
  </QTable>
</template>

<script setup lang="ts">
/* eslint-disable */
import {QTable} from 'quasar'
import type {User} from '@/Types/User'
interface Props {users: User[], filter: string}

defineEmits<{
    (e: 'delete-user', payload: User):void,
    (e: 'edit-user', payload: User):void,
}>()
const props = withDefaults(defineProps<Props>(), {users: () => [], filter: ''})
const columns: object[] = [
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

</script>

<style scoped>
.table{
    width: 90%;
    height: 550px;
}
</style>
