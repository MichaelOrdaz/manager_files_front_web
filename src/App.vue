<script setup lang="ts">
import PInput from './components/Molecules/PInput.vue'
import PForm from '@/components/Organism/PForm.vue'
import { ref } from 'vue'
import {QTree} from 'quasar'

const nombre = ref('')
const nombre2 = ref('')
const sample = ref( [
    {
        label: 'Satisfied customers (with avatar)',
        icon: 'folder',
        children: [
            {
                label: 'Good food (with icon)',
                icon: 'folder',
                children: [
                    { label: 'Quality ingredients', icon: 'folder' },
                    { label: 'Good recipe', icon: 'folder' }
                ]
            },
            {
                label: 'Good service (disabled node with icon)',
                icon: 'folder',
                disabled: true,
                children: [
                    { label: 'Prompt attention', icon: 'folder' },
                    { label: 'Professional waiter', icon: 'folder' }
                ]
            },
            {
                label: 'Pleasant surroundings (with icon)',
                icon: 'folder',
                children: [
                    {
                        label: 'Happy atmosphere (with image)',
                        icon: 'folder',
                    },
                    { label: 'Good table presentation', icon: 'folder' },
                    { label: 'Pleasing decor', icon: 'folder' }
                ]
            }
        ]
    }
])
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
            placeHolder="Prueba"
        />
        <PInput
            v-model="nombre2"
            :rules="[value => value === 'Error' || 'Valida el campo']"
        />
    </PForm>
    <PButton @click="validarFormulario">Click</PButton>
    <QTree :nodes="sample"
           node-key="label"
           no-connectors
           />
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
