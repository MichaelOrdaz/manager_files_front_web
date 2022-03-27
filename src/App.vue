<script setup lang="ts">
import PInput from './components/Molecules/PInput.vue'
import PForm from '@/components/Organism/PForm.vue'
import { ref } from 'vue'

const nombre = ref('')
const nombre2 = ref('')
const form = ref<InstanceType<typeof PForm>>(null)
function validarFormulario(): void {
    const isValid = form.value.validate()
    // eslint-disable-next-line no-console
    console.log(isValid)
}
</script>

<template>
    <PForm ref="form">
        <PInput
            v-model="nombre"
            :rules="[value => value === 'Error' || 'Valida el campo']"
        />
        <PInput
            v-model="nombre2"
            :rules="[value => value === 'Error' || 'Valida el campo']"
        />
    </PForm>
    <PButton @click="validarFormulario">Click</PButton>
</template>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
