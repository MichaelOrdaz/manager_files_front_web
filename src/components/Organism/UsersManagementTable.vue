<template>
  <QTable
    class="table"
    :columns="columns"
    :rows="users"
    hide-pagination
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
            Rol
          </PText>
        </q-td>
        <q-td class="text-left">
          <PText
            variant="subtitle-3"
          >
            Departamento
          </PText>
        </q-td>
        <q-td class="text-left">
          <PText
            variant="subtitle-3"
          >
            Teléfono
          </PText>
        </q-td>
        <q-td class="text-left">
          <PText
            variant="subtitle-3"
          >
            Correo
          </PText>
        </q-td>
        <q-td class="text-center">
          <PIcon
            iconName="edit"
            size="pmd"
          />
          <PIcon
            iconName="delete"
            size="pmd"
            color="red"
          />
        </q-td>
      </q-tr>
    </template>
  </QTable>
</template>

<script setup lang="ts">
import {QTable} from 'quasar'
import {ref} from 'vue'
import type {User} from '@/Types/User'
const columns: any[] = [
    { name: 'Foto del usuario', align: 'left', label: 'Foto del usuario', field: 'name'},
    {
        name: 'Nombre de usuario', align: 'left', label: 'Nombre de usuario', field: 'name'
    },
    { name: 'Rol', align: 'left', label: 'Rol', field: 'name' },
    { name: 'Departamento', align: 'left', label: 'Departamento', field: 'name' },
    { name: 'Teléfono', align: 'left', label: 'Teléfono', field: 'name' },
    { name: 'Correo', align: 'left', label: 'Correo', field: 'name' },
    { name: 'Acciones', align: 'center', label: 'Acciones', field: 'name' },
]
const users = ref<User[]>([{id: 1, name: 'José'}])

</script>

<style scoped>
.table{
    width: 90%;
    height: 550px;
}
</style>