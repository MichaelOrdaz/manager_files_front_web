<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'

const nombre = ref<string>('pmd')
function cambio():void {
    if (nombre.value === 'pmd') {
        nombre.value = 'plg'
    }else if (nombre.value === 'plg') {
        nombre.value = 'pmd'
    }
}
</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <PButton
    @click="cambio"
    :tamano="nombre"
  >
    Hola
  </PButton>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
