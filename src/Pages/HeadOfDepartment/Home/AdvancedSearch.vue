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
        v-model="itemTypeSelected"
        label="Tipo"
        :options="options"
        width="258px"
      />
    </div>
    <div class="filter-row p-mt-24">
      <PText variant="text-4">
        Nombre
      </PText>
      <PInput
        v-model="searchName"
        label="Nombre"
        width="258px"
        :rules="[(value: string) => !!value || 'Agrega por lo menos un carecter']"
      />
    </div>
    <div class="filter-row p-mt-24">
      <PText variant="text-4">
        Etiquetas
      </PText>
      <PInput
        v-model="tagsString"
        label="Etiquetas"
        width="258px"
        :rules="[(value: string) => value[value.length - 1] === ',' || 'Debe incluir una coma al final de cada palabra']"
      />
    </div>
    <div class="filter-row p-mt-24">
      <PText variant="text-4">
        Ordenes
      </PText>
      <PInput
        v-model="identifiersString"
        label="Números de orden"
        width="258px"
        :rules="[(value: string) => value[value.length - 1] === ',' || 'Debe incluir una coma al final de número']"
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
        <PButton @click.prevent="validateFields">
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
import store from '@/store'
import {Notify} from 'quasar'
const emit = defineEmits(['cancel'])

interface PFormComp{ validate: () => boolean, component: typeof PForm }

const itemTypeSelected = ref<string>('')
const searchName = ref<string>('')
const tags = ref<string[]>(undefined)
const identifiers = ref<number[]>(undefined)
const tagsString = ref<string>('')
const identifiersString = ref<string>('')
const options = ref<string[]>(['Carpeta', 'Archivo'])
const formRef = ref<PFormComp | null>(null)
const startDate = ref<string>('')
const endDate = ref<string>('')

function validateFields() {
    if (!searchName.value) {
        Notify.create({message: 'Agrega un nombre para buscar', color: 'red', type: 'negative'})
        return
    }
    if (!itemTypeSelected.value) {
        Notify.create({message: 'Selecciona un tipo de busqueda', color: 'red', type: 'negative'})
        return
    }
    if (tagsString.value && tagsString.value[tagsString.value.length - 1] !== ',') {
        Notify.create({message: 'Las etiquetas deben incluir una coma al final', color: 'red', type: 'negative'})
        return
    }
    if (identifiersString.value && identifiersString.value[identifiersString.value.length - 1] !== ',') {
        Notify.create({message: 'Las etiquetas deben incluir una coma al final', color: 'red', type: 'negative'})
        return
    }
    formatData()
    searchValues()
}
function formatData() {
    if (tagsString.value) {
        tags.value = tagsString.value.split(',').filter(el => !!el)
    }
    if (identifiersString.value) {
        identifiers.value = identifiersString.value.split(',').map(identifier => +identifier).filter(el => !!el)
    }
}
async function searchValues() {
    try {
        await store.dispatch('get_folder_content', {
            name: searchName.value, startDate: startDate.value,
            endDate: endDate.value, tags: tags.value, identifiers: identifiers.value
        })
        Notify.create({message: 'Se ha realizado la busqueda', color: 'blue', type: 'positive'})
        emit('cancel')
    } catch (e) {
        Notify.create({message: 'Ha ocurrido un error, intentalo de nuevo', color: 'red', type: 'negative'})
    }
}
</script>

<style scoped lang="scss">
@import "Styles/AdvancedSearchStyles";
</style>
