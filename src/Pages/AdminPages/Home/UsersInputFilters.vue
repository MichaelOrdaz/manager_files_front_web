<template>
  <div class="filters-container">
    <PText variant="subtitle-2">
      Gestión de usuarios
    </PText>
    <div class="input-filters">
      <PInput
        v-model="filterValue"
        width="468px"
        placeHolder="Buscar por nombre"
        data-cy="text-filter"
      />
      <PSelect
        v-model="rolSelectedId"
        class="p-mb-13"
        label="Filtro de usuarios"
        :options="props.roles"
        optionValue="id"
        optionLabel="name"
        data-cy="rol-filter"
      />
      <PButton
        class="p-mb-13"
        @click.prevent="$emit('create-user')"
      >
        Crear usuario
      </PButton>
    </div>
  </div>
</template>
<script setup lang="ts">
/* eslint-disable no-unused-vars */
import {ref, watch} from 'vue'
import {Role} from '@/services/api/models'

const emit = defineEmits<{
    (e: 'update-filter-values', payload: {text: string, rolId: number}): void,
    (e: 'create-user'): void,
}>()
interface Props{roles: Role[]}
const props = defineProps<Props>()

const filterValue = ref<string>('')
const rolSelectedId = ref<number>(0)


watch([filterValue, rolSelectedId], () => {
    emit('update-filter-values', {text: filterValue.value, rolId: rolSelectedId.value})
})
</script>
<style scoped lang="scss">
.filters-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .input-filters{
        width: 70%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
}
.p-mb-13 {
    margin-bottom: 13px
}
</style>
