<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import PInput from './components/Molecules/PInput.vue'
import {ref} from 'vue'

const nombre = ref<string>('')
</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <PInput
    v-model="nombre"
    :rules="[value => !!value || 'Error']"
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
