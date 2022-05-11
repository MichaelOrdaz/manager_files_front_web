<script setup lang="ts">
import store from '@/store/index'
store.commit('RESET_CURRENT_FOLDER')
store.commit('RESET_BREADCRUMB_STRUCTURE')
</script>

<template>
  <router-view :key="$route.name" />
</template>

<style lang="scss">
*{
    box-sizing: border-box;
}
body, html{
    height: 100%;
    width: 100%;
}
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    height: 100%;
    width: 100%;
}
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 4px;
}
::-webkit-scrollbar-thumb {
    background-color: $grey-8;
    border-radius: 4px;
}

</style>
