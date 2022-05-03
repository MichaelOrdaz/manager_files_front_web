<template>
  <PForm
    ref="formRef"
    class="advanced-search-container"
  >
    <div class="filter-row">
      <PText variant="text-4">
        Tipo archivo
      </PText>
      <PSelect
        label="Tipo"
        :options="[1,2,3,4]"
        width="258px"
      />
    </div>
    <div class="filter-row p-mt-24">
      <PText variant="text-4">
        Nombre
      </PText>
      <PInput
        label="Nombre"
        width="258px"
      />
    </div>
    <div class="filter-row p-mt-24">
      <PText variant="text-4">
        Etiquetas
      </PText>
      <PInput
        label="Etiquetas"
        width="258px"
      />
    </div>
    <div class="filter-row p-mt-24">
      <PText variant="text-4">
        Ordenes
      </PText>
      <PInput
        label="Números de orden"
        width="258px"
      />
    </div>
    <div class="filter-row p-mt-24">
      <PText variant="text-4">
        Ordenes
      </PText>
      <div class="row">
        <PInputDate
          v-model="startDate"
          inputLabel="Inicio"
          width="126px"
        />
        <PInputDate
          v-model="endDate"
          class="q-ml-sm"
          inputLabel="Fin"
          width="126px"
        />
      </div>
    </div>
    <div class="row justify-end">
      <div class="flex">
        <PButton
          variant="white"
          @click.prevent="$emit('cancel')"
        >
          Cancelar
        </PButton>
        <PButton>
          Aceptar
        </PButton>
      </div>
    </div>
  </PForm>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import PForm from '@/components/Organism/PForm.vue'
import PInputDate from '@/components/Molecules/PInputDate.vue'
defineEmits(['cancel'])

interface PFormComp{ validate: () => boolean, component: typeof PForm }
const formRef = ref<PFormComp | null>(null)
const startDate = ref<string>('')
const endDate = ref<string>('')
</script>

<style scoped lang="scss">
@import "Styles/AdvancedSearchStyles";
</style>
