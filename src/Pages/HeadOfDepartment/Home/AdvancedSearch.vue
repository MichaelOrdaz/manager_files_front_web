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
      <PInput
        label="Números de orden"
        width="258px"
      />
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
defineEmits(['cancel'])

interface PFormComp{ validate: () => boolean, component: typeof PForm }
const formRef = ref<PFormComp | null>(null)
</script>

<style scoped lang="scss">
.advanced-search-container{
    width: 450px;
    height: 577px;
    background-color: white;
    border-radius: 3px;
    z-index: 50;
    box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 41px 58px 20px 22px;
    .filter-row{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
.p-mt-24{margin-top: 24px}
</style>
